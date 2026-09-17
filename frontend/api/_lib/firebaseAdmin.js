import admin from 'firebase-admin';

let cachedApp = null;

export function getFirebaseAdmin() {
  if (admin.apps && admin.apps.length > 0) return admin.app();
  if (cachedApp) return cachedApp;

  // Strateji 1: Tam service-account JSON tek bir ortam değişkeninde
  const serviceAccountJson =
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_ADMIN_CREDENTIALS;
  if (serviceAccountJson) {
    try {
      const parsed = typeof serviceAccountJson === 'string'
        ? JSON.parse(serviceAccountJson)
        : serviceAccountJson;
      cachedApp = admin.initializeApp({
        credential: admin.credential.cert(parsed),
        projectId: parsed.project_id || process.env.FIREBASE_PROJECT_ID || 'healthlexmed'
      });
      return cachedApp;
    } catch (e) {
      console.error('[Firebase Admin] JSON parse error:', e.message);
    }
  }

  // Strateji 2: Bireysel ortam değişkenleri
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const projectId = process.env.FIREBASE_PROJECT_ID
    || process.env.REACT_APP_FIREBASE_PROJECT_ID
    || 'healthlexmed';

  if (clientEmail && privateKey) {
    try {
      cachedApp = admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
        projectId
      });
      return cachedApp;
    } catch (e) {
      console.error('[Firebase Admin] Credential init error:', e.message);
    }
  }

  // Strateji 3: Application Default Credentials
  try {
    cachedApp = admin.initializeApp({ projectId });
    return cachedApp;
  } catch (err) {
    console.error('[Firebase Admin] Fallback error:', err.message);
    return null;
  }
}
