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

  // ── 1. Firebase ID Token Doğrulaması ──────────────────────────────────────────
  // İstek gövdesindeki userId / customerEmail / subscriptionId'ye ASLA güvenilmez.
  // Kimlik yalnızca Authorization: Bearer <firebaseIdToken> üzerinden belirlenir.
  const authHeader = req.headers['authorization'] || '';
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  if (!idToken) {
    console.warn('[Upgrade] Missing Authorization header');
    return res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Authorization: Bearer <firebaseIdToken> header is required.'
    });
  }

  const adminApp = getFirebaseAdmin();
  if (!adminApp) {
    console.error('[Upgrade] Firebase Admin could not be initialized.');
    return res.status(500).json({ error: 'CONFIG_ERROR', message: 'Server configuration error.' });
  }

  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch (err) {
    console.warn('[Upgrade] Token verification failed:', err.message);
    return res.status(401).json({
      error: 'INVALID_TOKEN',
      message: 'Firebase ID token is invalid or expired. Please sign in again.'
    });
  }

  // Token'dan çözülen uid — istek gövdesindeki userId tamamen görmezden gelinir
  const uid = decodedToken.uid;

  // ── 2. Firestore'dan Kullanıcı Aboneliği ──────────────────────────────────────
  const db = admin.firestore();
  const userDocRef = db.collection('users').doc(uid);
  let userData;

  try {
    const userSnap = await userDocRef.get();
    if (!userSnap.exists) {
      console.warn(`[Upgrade] Firestore user document not found for uid: ${uid}`);
      return res.status(404).json({ error: 'USER_NOT_FOUND', message: 'User record not found.' });
    }
    userData = userSnap.data();
  } catch (err) {
    console.error('[Upgrade] Firestore read error:', err);
    return res.status(500).json({ error: 'DB_ERROR', message: 'Failed to read user data.' });
  }

  // paddleSubscriptionId yalnızca Firestore'dan alınır — body'den asla
  const currentSubId = userData.paddleSubscriptionId || null;

  // ── 3. Plan Parametreleri (body'den — kimlik bilgisi değil, güvenlidir) ───────
  const {
    targetPriceId,
    prorationBillingMode, // 'prorated_immediately' (yükseltme) | 'full_next_billing_period' (düşürme)
    action                // 'lifetime' → mevcut sub iptal + frontend checkout sinyali
  } = req.body || {};

  // Lifetime geçişi: action=lifetime ile bildirilir, targetPriceId bu durumda zorunlu değil
  if (action !== 'lifetime') {
    if (!targetPriceId || typeof targetPriceId !== 'string') {
      return res.status(400).json({
        error: 'INVALID_REQUEST',
        message: 'targetPriceId is required in the request body.'
      });
    }
  }

  // ── 4. Paddle API Anahtarı Hazırlığı ──────────────────────────────────────────
  let apiKey = (process.env.PADDLE_API_KEY || process.env.PADDLE_SERVER_API_KEY || '').trim();
  apiKey = apiKey.replace(/^Bearer\s+/i, '').replace(/^["']|["']$/g, '').trim();

  if (!apiKey) {
    console.error('[Upgrade] PADDLE_API_KEY is not configured.');
    return res.status(500).json({ error: 'CONFIG_ERROR', message: 'Paddle server API key is not configured.' });
  }

  const isProduction = (process.env.PADDLE_ENV || '').toLowerCase() === 'production' || apiKey.startsWith('pdl_live_');
  const environment = isProduction ? Environment.production : Environment.sandbox;
  const paddle = new Paddle(apiKey, { environment });

  // ── 5. Lifetime Geçişi: Mevcut Aboneliği İptal Et ─────────────────────────────
  if (action === 'lifetime') {
    if (!currentSubId) {
      // Zaten aktif abonelik yok, direkt Lifetime checkout'a yönlendir
      return res.status(200).json({
        success: true,
        requiresCheckout: true,
        message: 'No active subscription to cancel. Proceed to Lifetime checkout.'
      });
    }

    try {
      // Yıllık aboneliği anında iptal et
      // Kısmi iade YAPILMAZ — yalnızca gelecek tahsilat durdurulur (onaylandı)
      console.log(`[Upgrade] Cancelling subscription ${currentSubId} for Lifetime transition (uid: ${uid})`);
      await paddle.subscriptions.cancel(currentSubId, { effectiveFrom: 'immediately' });

      await userDocRef.set({
        paddleSubscriptionId: null,
        subscriptionStatus: 'canceled',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      console.log(`[Upgrade] Subscription ${currentSubId} cancelled. Frontend should open Lifetime checkout.`);
      return res.status(200).json({
        success: true,
        requiresCheckout: true,
        message: 'Previous subscription cancelled. Please proceed to Lifetime checkout.'
      });
    } catch (error) {
      console.error('[Upgrade] Failed to cancel subscription for Lifetime transition:', error);
      return res.status(500).json({
        error: 'CANCEL_FAILED',
        message: error?.message || 'Failed to cancel existing subscription.',
        code: error?.code
      });
    }
  }

  // ── 6. Mevcut Abonelik Yok → Checkout Gerekli ─────────────────────────────────
  if (!currentSubId) {
    console.warn(`[Upgrade] No paddleSubscriptionId in Firestore for uid: ${uid}`);
    return res.status(400).json({
      error: 'NO_SUBSCRIPTION',
      message: 'No active Paddle subscription found. Please use checkout to start a new subscription.'
    });
  }

  // ── 7. Paddle Subscription Update (Yükseltme / Düşürme) ──────────────────────
  try {
    // prorationBillingMode:
    //   Yükseltme (Temel→Pro) → 'prorated_immediately' (frontend gönderir)
    //   Düşürme   (Pro→Temel) → 'full_next_billing_period' (frontend gönderir, onaylandı)
    const billingMode = prorationBillingMode || 'prorated_immediately';

    console.log(`[Upgrade] Updating subscription ${currentSubId} → price ${targetPriceId} | mode: ${billingMode} | uid: ${uid}`);

    const updatedSubscription = await paddle.subscriptions.update(currentSubId, {
      items: [{ priceId: targetPriceId, quantity: 1 }],
      prorationBillingMode: billingMode,
      onPaymentFailure: 'prevent_change'
    });

    console.log(`[Upgrade] Success: sub ${updatedSubscription?.id} status: ${updatedSubscription?.status}`);

    // Firestore planı güncelle — targetPriceId üzerinden plan tipini belirle
    const PRICE_PRO = process.env.PADDLE_PRICE_ID || process.env.REACT_APP_PADDLE_PRICE_ID;
    const PRICE_BASIC = process.env.PADDLE_PRICE_BASIC || process.env.REACT_APP_PADDLE_PRICE_BASIC;
    const isNowPro = targetPriceId === PRICE_PRO;
    const isNowBasic = targetPriceId === PRICE_BASIC;

    await userDocRef.set({
      isPro: isNowPro,
      isBasic: isNowBasic && !isNowPro,
      planType: isNowPro ? 'pro' : (isNowBasic ? 'basic' : 'unknown'),
      plan: isNowPro ? 'Annual Pro Membership' : (isNowBasic ? 'Basic Plan (Yearly)' : 'Unknown'),
      subscriptionStatus: updatedSubscription?.status || 'active',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return res.status(200).json({
      success: true,
      subscriptionId: updatedSubscription?.id,
      status: updatedSubscription?.status,
      items: updatedSubscription?.items?.map(i => ({
        priceId: i.price?.id,
        name: i.price?.name,
        quantity: i.quantity,
        amount: i.price?.unitPrice?.amount,
        currencyCode: i.price?.unitPrice?.currencyCode
      }))
    });
  } catch (error) {
    console.error('[Upgrade] Paddle subscription update failed:', error);
    return res.status(500).json({
      error: 'UPDATE_FAILED',
      message: error?.message || 'Failed to update subscription.',
      code: error?.code,
      detail: error?.detail,
      env: isProduction ? 'production' : 'sandbox'
    });
  }
}
