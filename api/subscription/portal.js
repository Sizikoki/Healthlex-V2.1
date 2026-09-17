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
  // Authorization: Bearer <firebaseIdToken> zorunludur.
  const authHeader = req.headers['authorization'] || '';
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  if (!idToken) {
    console.warn('[Portal] Missing Authorization header');
    return res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Authorization: Bearer <firebaseIdToken> header is required.'
    });
  }

  const adminApp = getFirebaseAdmin();
  if (!adminApp) {
    console.error('[Portal] Firebase Admin could not be initialized');
    return res.status(500).json({ error: 'SERVER_CONFIG_ERROR', message: 'Auth service unavailable' });
  }

  let uid;
  try {
    const decodedToken = await adminApp.auth().verifyIdToken(idToken);
    uid = decodedToken.uid;
  } catch (err) {
    console.warn('[Portal] Invalid or expired Firebase ID token:', err.message);
    return res.status(401).json({
      error: 'INVALID_TOKEN',
      message: 'Firebase ID token verification failed: ' + err.message
    });
  }

  // ── 2. Firestore'dan KENDİ Kullanıcı Verisini Oku ──────────────────────────────
  let userDoc;
  try {
    const docSnap = await adminApp.firestore().collection('users').doc(uid).get();
    if (!docSnap.exists) {
      return res.status(404).json({ error: 'USER_NOT_FOUND', message: 'User profile not found in database.' });
    }
    userDoc = docSnap.data();
  } catch (err) {
    console.error('[Portal] Firestore read error:', err.message);
    return res.status(500).json({ error: 'DB_ERROR', message: 'Could not fetch user record.' });
  }

  const subscriptionId = userDoc.paddleSubscriptionId;
  const customerId = userDoc.paddleCustomerId;

  const apiKey = process.env.PADDLE_API_KEY || process.env.REACT_APP_PADDLE_API_KEY;
  if (!apiKey) {
    console.error('[Portal] Missing PADDLE_API_KEY');
    return res.status(500).json({ error: 'SERVER_CONFIG_ERROR', message: 'Payment gateway unconfigured' });
  }

  const paddleEnv = process.env.PADDLE_ENV || process.env.REACT_APP_PADDLE_ENV || 'production';
  const environment = paddleEnv === 'sandbox' ? Environment.sandbox : Environment.production;
  const paddle = new Paddle(apiKey, { environment });

  // ── 3. Customer ID Belirleme ──────────────────────────────────────────────────
  let targetCustomerId = customerId;
  let targetSubId = subscriptionId;

  // customerId Firestore'da yoksa ama subscriptionId varsa Paddle'dan sub detayını çekip customerId alalım
  if (!targetCustomerId && targetSubId) {
    try {
      const sub = await paddle.subscriptions.get(targetSubId);
      if (sub && sub.customerId) {
        targetCustomerId = sub.customerId;
        // İlerideki istekler için Firestore'a da yazalım
        adminApp.firestore().collection('users').doc(uid).set(
          { paddleCustomerId: targetCustomerId },
          { merge: true }
        ).catch(() => {});
      }
    } catch (err) {
      console.warn('[Portal] Could not fetch subscription from Paddle:', err.message);
    }
  }

  if (!targetCustomerId) {
    return res.status(400).json({
      error: 'NO_CUSTOMER',
      message: 'No Paddle customer associated with this account. Please subscribe first.'
    });
  }

  // ── 4. Paddle Customer Portal Session Oluştur ──────────────────────────────────
  try {
    const subIdsArray = targetSubId ? [targetSubId] : [];
    const portalSession = await paddle.customerPortalSessions.create(targetCustomerId, subIdsArray);

    const subUrls = portalSession?.urls?.subscriptions || [];
    const matchedSubUrl = subUrls.find(s => s.id === targetSubId) || subUrls[0];

    const targetUrl = matchedSubUrl?.cancelSubscription
      || matchedSubUrl?.updateSubscriptionPaymentMethod
      || portalSession?.urls?.general?.overview
      || 'https://paddle.net';

    return res.status(200).json({
      success: true,
      url: targetUrl,
      overviewUrl: portalSession?.urls?.general?.overview || null,
      cancelUrl: matchedSubUrl?.cancelSubscription || null
    });
  } catch (err) {
    console.error('[Portal] Failed to create portal session:', err.message || err);
    return res.status(500).json({
      error: 'PORTAL_FAILED',
      message: err.message || 'Failed to generate customer portal session.',
      detail: err.detail || null
    });
  }
}
