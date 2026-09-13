import { Paddle, Environment } from '@paddle/paddle-node-sdk';
import admin from 'firebase-admin';

function getFirebaseAdmin() {
  if (admin.apps && admin.apps.length > 0) return admin.app();

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

  try { return admin.initializeApp({ projectId }); }
  catch (err) { console.error('[Firebase Admin] Fallback error:', err); return null; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, customerEmail, subscriptionId } = req.body || {};

  if (!userId && !customerEmail && !subscriptionId) {
    return res.status(400).json({ error: 'INVALID_REQUEST', message: 'Missing user identification or subscription ID' });
  }

  let apiKey = (
    process.env.PADDLE_API_KEY ||
    process.env.PADDLE_SERVER_API_KEY ||
    ''
  ).trim();
  apiKey = apiKey.replace(/^Bearer\s+/i, '').replace(/^["']|["']$/g, '').trim();

  const environment = (process.env.PADDLE_ENV || 'production').toLowerCase() === 'production'
    ? Environment.production
    : Environment.sandbox;

  if (!apiKey) {
    console.error('[Paddle Upgrade] PADDLE_API_KEY is not configured on server.');
    return res.status(500).json({ error: 'CONFIG_ERROR', message: 'Paddle server API key is not configured' });
  }

  let targetSubId = subscriptionId;
  let userDocRef = null;

  const adminApp = getFirebaseAdmin();
  if (adminApp) {
    try {
      const db = admin.firestore();
      if (userId && typeof userId === 'string' && userId.trim() && userId !== 'unknown') {
        const docRef = db.collection('users').doc(userId.trim());
        const snap = await docRef.get();
        if (snap.exists) {
          userDocRef = docRef;
          if (!targetSubId) {
            targetSubId = snap.data().paddleSubscriptionId;
          }
        }
      }
      if (!targetSubId && customerEmail && customerEmail.includes('@')) {
        const q = await db.collection('users')
          .where('email', '==', customerEmail.toLowerCase().trim())
          .limit(1).get();
        if (!q.empty) {
          userDocRef = q.docs[0].ref;
          targetSubId = q.docs[0].data().paddleSubscriptionId;
        }
      }
    } catch (err) {
      console.warn('[Paddle Upgrade] Firestore lookup warning:', err.message);
    }
  }

  if (!targetSubId) {
    return res.status(400).json({
      error: 'NO_SUBSCRIPTION',
      message: 'No active Paddle subscription found to upgrade. Please use checkout.'
    });
  }

  const proPriceId =
    process.env.PADDLE_PRICE_ID ||
    process.env.REACT_APP_PADDLE_PRICE_ID ||
    'pri_01m1hbkgmff67g3mght6w6bj2q';

  try {
    const paddle = new Paddle(apiKey, { environment });

    console.log(`[Paddle Upgrade] Updating subscription ${targetSubId} to Pro price ${proPriceId}...`);

    const updatedSubscription = await paddle.subscriptions.update(targetSubId, {
      items: [
        {
          priceId: proPriceId,
          quantity: 1
        }
      ],
      prorationBillingMode: 'prorated_immediately',
      onPaymentFailure: 'prevent_change'
    });

    console.log('[Paddle Upgrade] Subscription updated successfully:', updatedSubscription?.id, 'Status:', updatedSubscription?.status);

    if (userDocRef) {
      await userDocRef.set({
        isPro: true,
        isBasic: false,
        planType: 'pro',
        plan: 'Annual Pro Membership',
        subscriptionStatus: updatedSubscription?.status || 'active',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }

    return res.status(200).json({
      success: true,
      subscriptionId: updatedSubscription?.id,
      status: updatedSubscription?.status
    });
  } catch (error) {
    console.error('[Paddle Upgrade] Error updating subscription:', error);
    return res.status(500).json({
      error: 'UPGRADE_FAILED',
      message: error?.message || 'Failed to update subscription in Paddle'
    });
  }
}
