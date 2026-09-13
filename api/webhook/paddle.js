import { Paddle, Environment } from '@paddle/paddle-node-sdk';
import admin from 'firebase-admin';

/**
 * Vercel Serverless Configuration:
 * MUST disable body parsing so we receive the raw bytes for HMAC verification.
 * If bodyParser is enabled, the body is pre-parsed and the raw bytes are lost,
 * which causes paddle.webhooks.unmarshal() to fail signature verification.
 */
export const config = {
  api: {
    bodyParser: false
  }
};

// ---------------------------------------------------------------------------
// Firebase Admin - singleton initializer
// ---------------------------------------------------------------------------

function getFirebaseAdmin() {
  if (admin.apps && admin.apps.length > 0) return admin.app();

  // Strategy 1: full service-account JSON in one env var
  const serviceAccountJson =
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_ADMIN_CREDENTIALS;
  if (serviceAccountJson) {
    try {
      const parsed = typeof serviceAccountJson === 'string'
        ? JSON.parse(serviceAccountJson)
        : serviceAccountJson;
      return admin.initializeApp({
        credential: admin.credential.cert(parsed),
        projectId: parsed.project_id || process.env.FIREBASE_PROJECT_ID || 'healthlexmed'
      });
    } catch (e) { console.error('[Firebase Admin] JSON parse error:', e); }
  }

  // Strategy 2: individual env vars
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const projectId = process.env.FIREBASE_PROJECT_ID
    || process.env.REACT_APP_FIREBASE_PROJECT_ID
    || 'healthlexmed';

  if (clientEmail && privateKey) {
    try {
      return admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
        projectId
      });
    } catch (e) { console.error('[Firebase Admin] Init error:', e); }
  }

  // Strategy 3: Application Default Credentials
  try { return admin.initializeApp({ projectId }); }
  catch (err) { console.error('[Firebase Admin] Fallback error:', err); return null; }
}

// ---------------------------------------------------------------------------
// Firestore helpers
// ---------------------------------------------------------------------------

/**
 * Upserts subscription/access fields on a Firestore user doc.
 * Lookup: UID first, then email fallback.
 * Uses merge:true so unrelated fields are never overwritten.
 */
async function updateUserSubscription(userId, customerEmail, updateFields) {
  try {
    const adminApp = getFirebaseAdmin();
    if (!adminApp) { console.error('[Paddle Webhook] Firebase Admin init failed'); return false; }
    const db = admin.firestore();
    let ref = null;

    if (userId && typeof userId === 'string' && userId.trim() && userId !== 'unknown') {
      const docRef = db.collection('users').doc(userId.trim());
      const snap = await docRef.get();
      if (snap.exists) ref = docRef;
    }
    if (!ref && customerEmail && customerEmail.includes('@')) {
      const q = await db.collection('users')
        .where('email', '==', customerEmail.toLowerCase().trim())
        .limit(1).get();
      if (!q.empty) ref = q.docs[0].ref;
    }
    if (ref) {
      await ref.set(
        { ...updateFields, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );
      console.log('[Paddle Webhook] User updated:', ref.id, updateFields);
      return true;
    }
    console.warn('[Paddle Webhook] No user found. UID:', userId, 'Email:', customerEmail);
    return false;
  } catch (err) { console.error('[Paddle Webhook] Firestore error:', err); return false; }
}

/**
 * Upserts a Paddle customer record in the paddle_customers collection.
 * Keyed on Paddle customer ID - safe to replay.
 */
async function upsertCustomer(customerId, fields) {
  if (!customerId) return;
  try {
    const app = getFirebaseAdmin();
    if (!app) return;
    await admin.firestore()
      .collection('paddle_customers').doc(customerId)
      .set(
        { ...fields, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );
    console.log('[Paddle Webhook] Customer upserted:', customerId);
  } catch (err) { console.error('[Paddle Webhook] Customer upsert error:', err); }
}

// ---------------------------------------------------------------------------
// Raw-body reader
// ---------------------------------------------------------------------------

/**
 * Reads raw UTF-8 request body.
 *
 * CRITICAL: Pass the exact raw bytes to paddle.webhooks.unmarshal().
 * Do NOT JSON.parse/re-stringify the body - the byte representation changes
 * and HMAC verification will fail on every single request.
 */
async function getRawBody(req) {
  if (req.rawBody && typeof req.rawBody === 'string') return req.rawBody;
  if (typeof req.body === 'string') return req.body;
  // Do NOT: return JSON.stringify(req.body) - this breaks HMAC

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(typeof c === 'string' ? Buffer.from(c) : c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// Idempotency guard
// ---------------------------------------------------------------------------

/**
 * Returns true if this Paddle event was already processed; marks it if not.
 * Paddle delivers at-least-once and events can arrive out of order.
 * Keyed on eventData.eventId in the paddle_webhook_events collection.
 */
async function isAlreadyProcessed(db, eventId) {
  if (!eventId || !db) return false;
  const ref = db.collection('paddle_webhook_events').doc(eventId);
  try {
    const snap = await ref.get();
    if (snap.exists) { console.log('[Paddle] Duplicate ignored:', eventId); return true; }
    await ref.set({
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30-day TTL
    });
    return false;
  } catch (err) {
    // If Firestore is unreachable, proceed rather than drop the event
    console.warn('[Paddle] Idempotency check failed (proceeding):', err.message);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

/**
 * Paddle Webhook Handler - Vercel Serverless Function
 * Route: POST /api/webhook/paddle
 *
 * Security checklist:
 *  - bodyParser: false preserves raw bytes needed for HMAC
 *  - Verified with PADDLE_WEBHOOK_SECRET_KEY (the SIGNING SECRET, not the API key)
 *  - Returns 400 on bad signature so Paddle keeps retrying (2xx = stop retrying)
 *  - Idempotency guard on eventId prevents double-processing on retries
 *  - All Firestore writes are merge upserts - safe to replay
 *  - Returns 500 on handler errors so Paddle retries the valid-but-failed event
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const signature = req.headers['paddle-signature'] || req.headers['Paddle-Signature'] || '';

  // Use the WEBHOOK SIGNING SECRET from Paddle Dashboard > Developer Tools > Notifications.
  // This is NOT the same value as your Paddle API key.
  const webhookSecret = (
    process.env.PADDLE_WEBHOOK_SECRET_KEY ||
    process.env.PADDLE_WEBHOOK_KEY ||
    ''
  ).trim();

  const apiKey = (
    process.env.PADDLE_API_KEY ||
    process.env.PADDLE_SERVER_API_KEY ||
    ''
  ).trim();

  const environment = (process.env.PADDLE_ENV || 'production').toLowerCase() === 'production'
    ? Environment.production
    : Environment.sandbox;

  if (!webhookSecret) {
    console.error('[Paddle Webhook] PADDLE_WEBHOOK_SECRET_KEY is not set.');
    return res.status(500).json({ error: 'Webhook secret not configured on server' });
  }

  // Read raw body - must be done before any parsing
  let rawBody;
  try {
    rawBody = await getRawBody(req);
  } catch (e) {
    console.error('[Paddle Webhook] Failed to read body:', e);
    return res.status(400).json({ error: 'Could not read request body' });
  }

  // Verify signature - unmarshal performs HMAC-SHA256 check
  let eventData;
  try {
    const paddle = new Paddle(apiKey || 'placeholder', { environment });
    eventData = await paddle.webhooks.unmarshal(rawBody, webhookSecret, signature);
  } catch (e) {
    // Return 400, NOT 2xx - a 2xx response tells Paddle the delivery succeeded
    // and it stops all retry attempts. 4xx keeps Paddle retrying.
    console.error('[Paddle Webhook] Signature verification failed:', e.message);
    return res.status(400).json({ error: 'Invalid webhook signature', details: e.message });
  }

  console.log('[Paddle Webhook] Verified:', eventData.eventType, '| eventId:', eventData.eventId);

  // Idempotency guard - prevent double-processing on Paddle retries
  const adminApp = getFirebaseAdmin();
  const db = adminApp ? admin.firestore() : null;
  if (await isAlreadyProcessed(db, eventData.eventId)) {
    return res.status(200).json({ success: true, duplicate: true, eventId: eventData.eventId });
  }

  // Route to typed handlers
  try {
    switch (eventData.eventType) {
      case 'transaction.completed':
      case 'transaction.paid': {
        const tx = eventData.data;
        const email = tx?.customer?.email || tx?.customData?.email || tx?.details?.customer?.email;
        const uid = tx?.customData?.userId;
        const plan = tx?.customData?.plan || 'Annual Pro Membership';
        const pid = (tx?.customData?.planId || '').toLowerCase();
        const isBasic = pid === 'basic' || plan.toLowerCase().includes('basic');
        const isLifetime = pid === 'lifetime' || plan.toLowerCase().includes('lifetime');
        console.log('[Paddle] transaction.completed email:', email, 'plan:', plan);
        await updateUserSubscription(uid, email, {
          isPro: !isBasic, isBasic, isLifetime,
          planType: isLifetime ? 'lifetime' : isBasic ? 'basic' : 'pro',
          subscriptionStatus: 'active', plan,
          paddleTransactionId: tx?.id || null,
          paddleCustomerId: tx?.customerId || null
        });
        break;
      }

      case 'subscription.created':
      case 'subscription.activated': {
        const sub = eventData.data;
        const email = sub?.customData?.email || sub?.customer?.email;
        const uid = sub?.customData?.userId;
        const plan = sub?.customData?.plan || 'Annual Pro Membership';
        const pid = (sub?.customData?.planId || '').toLowerCase();
        const isBasic = pid === 'basic' || plan.toLowerCase().includes('basic');
        const isLifetime = pid === 'lifetime' || plan.toLowerCase().includes('lifetime');
        const status = sub?.status || 'active';
        console.log('[Paddle] subscription.created customer:', sub?.customerId, 'status:', status);
        await updateUserSubscription(uid, email, {
          isPro: !isBasic, isBasic, isLifetime,
          planType: isLifetime ? 'lifetime' : isBasic ? 'basic' : 'pro',
          subscriptionStatus: status, plan,
          paddleSubscriptionId: sub?.id || null,
          paddleCustomerId: sub?.customerId || null,
          trialStartDate: sub?.currentBillingPeriod?.startsAt || new Date().toISOString(),
          trialEndDate: sub?.nextBilledAt || null,
          pastDueSince: null
        });
        break;
      }

      case 'subscription.updated': {
        const sub = eventData.data;
        const status = sub?.status;
        console.log('[Paddle] subscription.updated status:', status);
        await updateUserSubscription(
          sub?.customData?.userId,
          sub?.customData?.email || sub?.customer?.email,
          {
            isPro: status === 'active' || status === 'trialing',
            subscriptionStatus: status || 'updated',
            paddleSubscriptionId: sub?.id || null,
            ...(status === 'active' || status === 'trialing' ? { pastDueSince: null } : {})
          }
        );
        break;
      }

      case 'subscription.canceled': {
        const sub = eventData.data;
        console.log('[Paddle] subscription.canceled id:', sub?.id);
        await updateUserSubscription(
          sub?.customData?.userId,
          sub?.customData?.email || sub?.customer?.email,
          { isPro: false, subscriptionStatus: 'canceled', paddleSubscriptionId: sub?.id || null }
        );
        break;
      }

      case 'subscription.past_due': {
        const sub = eventData.data;
        console.warn('[Paddle] subscription.past_due id:', sub?.id);
        await updateUserSubscription(
          sub?.customData?.userId,
          sub?.customData?.email || sub?.customer?.email,
          {
            subscriptionStatus: 'past_due',
            pastDueSince: new Date().toISOString()
          }
        );
        break;
      }

      case 'customer.created': {
        const c = eventData.data;
        console.log('[Paddle] customer.created id:', c?.id);
        await upsertCustomer(c?.id, {
          paddleCustomerId: c?.id,
          email: c?.email || null,
          name: c?.name || null,
          createdAt: c?.createdAt || null
        });
        break;
      }

      case 'customer.updated': {
        const c = eventData.data;
        console.log('[Paddle] customer.updated id:', c?.id);
        await upsertCustomer(c?.id, {
          paddleCustomerId: c?.id,
          email: c?.email || null,
          name: c?.name || null
        });
        break;
      }

      default:
        // Safely ignore all other event types.
        // Still return 2xx so Paddle does not keep retrying events we intentionally skip.
        console.log('[Paddle Webhook] Ignored event type:', eventData.eventType);
    }
  } catch (err) {
    console.error('[Paddle Webhook] Handler error for', eventData.eventType, ':', err);
    // Return 500 so Paddle retries - our handler failed but the request was valid
    return res.status(500).json({ error: 'Webhook handler error', details: err.message });
  }

  return res.status(200).json({
    success: true,
    eventType: eventData.eventType,
    eventId: eventData.eventId,
    receivedAt: new Date().toISOString()
  });
}
