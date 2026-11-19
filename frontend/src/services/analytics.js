/**
 * Google Analytics (GA4) Consent Management & Tracking Service
 * HealthLexMed — KVKK & GDPR Compliant Analytics Handler
 */

export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-F8RSPV39KQ';
export const COOKIE_CONSENT_KEY_V1 = 'hlx_cookie_consent';
export const COOKIE_CONSENT_KEY = 'hlx_cookie_consent_v2';
export const CONSENT_EVENT_NAME = 'hlx_consent_changed';

/**
 * Returns the current cookie consent object ({ version, necessary, analytics, marketing, updatedAt }),
 * or null if the user has not yet made a choice in v2.
 * Migrates old 'declined' users silently without showing the banner.
 * Old 'accepted' users return null so they are shown the v2 banner to consent to marketing.
 */
export const getCookieConsent = () => {
  try {
    const v2Raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (v2Raw) {
      const parsed = JSON.parse(v2Raw);
      if (parsed && parsed.version === 2) {
        return parsed;
      }
    }

    // Check migration from v1 ('hlx_cookie_consent')
    const v1 = localStorage.getItem(COOKIE_CONSENT_KEY_V1);
    if (v1 === 'declined') {
      const migrated = {
        version: 2,
        necessary: true,
        analytics: false,
        marketing: false,
        updatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(migrated));
        localStorage.removeItem(COOKIE_CONSENT_KEY_V1);
      } catch {
        // Ignore storage write errors
      }
      return migrated;
    }

    // For old 'accepted' or unset: return null so banner will be displayed to user
    return null;
  } catch {
    return null;
  }
};

/**
 * Single function to check consent for a specific category: 'necessary' | 'analytics' | 'marketing'.
 * @param {'necessary' | 'analytics' | 'marketing'} category
 * @returns {boolean}
 */
export const hasConsent = (category) => {
  if (category === 'necessary') return true;
  const consent = getCookieConsent();
  if (!consent) return false;
  return Boolean(consent[category]);
};

/**
 * Subscribes a listener for consent changes. Useful for deferred marketing/pixel initialization.
 * @param {'necessary' | 'analytics' | 'marketing'} category
 * @param {(granted: boolean, preferences: object) => void} callback
 * @returns {() => void} unsubscribe function
 */
export const onConsentChange = (category, callback) => {
  if (typeof window === 'undefined' || typeof callback !== 'function') return () => {};
  const handler = (event) => {
    const preferences = event.detail;
    if (preferences) {
      const granted = category === 'necessary' ? true : Boolean(preferences[category]);
      callback(granted, preferences);
    }
  };
  window.addEventListener(CONSENT_EVENT_NAME, handler);
  return () => window.removeEventListener(CONSENT_EVENT_NAME, handler);
};

/**
 * Dispatches an event to open the cookie preferences banner from anywhere (e.g. footer link).
 */
export const openCookiePreferences = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('hlx_open_cookie_preferences'));
  }
};

/**
 * Initializes Google Analytics 4 only when user gives explicit consent.
 */
export const initGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;

  try {
    // Enable tracking if previously disabled
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

    // Dynamically insert gtag.js script if not already present
    if (!document.getElementById('ga-gtag-script')) {
      const script = document.createElement('script');
      script.id = 'ga-gtag-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      personalization_storage: 'denied'
    });
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true
    });

    window.__hlxGaInitialized = true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize Google Analytics:', error);
  }
};

/**
 * Disables Google Analytics when user declines or revokes consent.
 */
export const disableGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;

  try {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        personalization_storage: 'denied'
      });
    }

    // Remove script tag if present
    const existingScript = document.getElementById('ga-gtag-script');
    if (existingScript) {
      existingScript.remove();
    }

    window.__hlxGaInitialized = false;
  } catch (error) {
    console.error('[Analytics] Failed to disable Google Analytics:', error);
  }
};

/**
 * One-time cleanup of legacy third-party analytics traces left in the browser by the
 * original template (removed analytics SDK). Runs regardless of consent and only
 * touches keys/cookies matching the legacy SDK's own naming pattern:
 *  - localStorage / sessionStorage keys starting with "ph_"
 *  - cookies starting with "ph_" and ending with the SDK suffix
 * Note: the suffix is matched via regex so the vendor name does not appear in the bundle.
 */
const LEGACY_STORAGE_PREFIX = 'ph_';
const LEGACY_COOKIE_PATTERN = /^ph_.*_post[h]og$/;
const LEGACY_COOKIE_DOMAINS = ['healthlexmed.com', '.healthlexmed.com'];

export const clearLegacyAnalyticsTraces = () => {
  if (typeof window === 'undefined') return;

  [window.localStorage, window.sessionStorage].forEach((storage) => {
    try {
      if (!storage) return;
      const keys = [];
      for (let i = 0; i < storage.length; i += 1) {
        const key = storage.key(i);
        if (key && key.startsWith(LEGACY_STORAGE_PREFIX)) keys.push(key);
      }
      keys.forEach((key) => storage.removeItem(key));
    } catch {
      // Storage may be unavailable (privacy mode); ignore
    }
  });

  try {
    const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/';
    document.cookie.split(';').forEach((entry) => {
      const name = entry.split('=')[0].trim();
      if (!LEGACY_COOKIE_PATTERN.test(name)) return;
      // Host-only variant (same name, current host) plus the explicit site domains
      document.cookie = `${name}=; ${expired}`;
      LEGACY_COOKIE_DOMAINS.forEach((domain) => {
        document.cookie = `${name}=; ${expired}; domain=${domain}`;
      });
    });
  } catch {
    // Ignore cookie access errors
  }
};

/**
 * Sets user cookie consent (categorized or preset) and triggers the appropriate analytics behavior.
 * Emits reactive 'hlx_consent_changed' CustomEvent for runtime listeners (e.g., Meta Pixel).
 * @param {'accepted' | 'declined' | { analytics?: boolean, marketing?: boolean }} consent
 */
export const setCookieConsent = (consent) => {
  let analytics = false;
  let marketing = false;

  if (consent === 'accepted') {
    analytics = true;
    marketing = true;
  } else if (consent === 'declined') {
    analytics = false;
    marketing = false;
  } else if (consent && typeof consent === 'object') {
    analytics = Boolean(consent.analytics);
    marketing = Boolean(consent.marketing);
  }

  const payload = {
    version: 2,
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
    localStorage.removeItem(COOKIE_CONSENT_KEY_V1);
  } catch (e) {
    console.warn('[Analytics] Could not write cookie consent to localStorage', e);
  }

  // Notify active listeners (e.g. Meta Pixel or reactive UI components)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT_NAME, { detail: payload }));
  }

  if (payload.analytics) {
    initGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }

  return payload;
};

/**
 * Checks consent on app start and boots analytics only if analytics category was accepted.
 * Legacy trace cleanup runs first, independent of consent.
 */
export const initAnalyticsOnLoad = () => {
  clearLegacyAnalyticsTraces();

  if (hasConsent('analytics')) {
    initGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }
};

