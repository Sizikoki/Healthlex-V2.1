/**
 * Meta Pixel — Consent-gated loader & SPA PageView tracking
 * HealthLexMed — KVKK & GDPR Compliant Marketing Handler
 *
 * - Pixel ID comes ONLY from process.env.REACT_APP_META_PIXEL_ID. If empty, nothing is loaded.
 * - Pixel is loaded ONLY when hasConsent('marketing') is true. If consent is granted later,
 *   it starts without a page reload (onConsentChange). On revoke: fbq('consent','revoke')
 *   and _fbp / _fbc cookies are deleted; no further events are sent.
 * - Automatic history (pushState) PageViews are disabled (fbq.disablePushState); SPA
 *   PageViews are sent by MetaPixelRouteTracker via trackMetaPageView().
 * - autoConfig is disabled; fbq('init') is called WITHOUT a 2nd (advanced matching) parameter.
 * - fbclid is kept ONLY in memory (never in localStorage/sessionStorage/cookies) until
 *   marketing consent is given; then the _fbc cookie is written from it.
 */

import { hasConsent, onConsentChange } from '@/services/analytics';

export const META_PIXEL_ID = (process.env.REACT_APP_META_PIXEL_ID || '').trim();

const PIXEL_SCRIPT_ID = 'meta-pixel-script';
const PIXEL_SCRIPT_SRC = 'https://connect.facebook.net/en_US/fbevents.js';
const FBC_MAX_AGE_SECONDS = 90 * 24 * 60 * 60; // 90 days

let pixelLoaded = false;
let consentListenerAttached = false;
let lastTrackedUrl = null;

// ── fbclid: captured at module evaluation (before any client-side redirect can strip
//    the query string) and kept in memory only. ───────────────────────────────
let memoryFbclid = null;
try {
  if (typeof window !== 'undefined') {
    const fbclid = new URLSearchParams(window.location.search).get('fbclid');
    if (fbclid) {
      memoryFbclid = { fbclid, capturedAt: Date.now() };
    }
  }
} catch {
  memoryFbclid = null;
}

const isEnabled = () => Boolean(META_PIXEL_ID) && typeof window !== 'undefined';

const getCurrentUrl = () =>
  typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '';

/**
 * Cookie domain: '.healthlexmed.com' on production hosts, host-only elsewhere
 * (localhost, *.vercel.app previews — public suffixes cannot hold domain cookies).
 */
const getCookieDomain = () => {
  const host = window.location.hostname || '';
  if (host === 'healthlexmed.com' || host.endsWith('.healthlexmed.com')) {
    return '.healthlexmed.com';
  }
  return null;
};

const readCookie = (name) => {
  try {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
  } catch {
    return null;
  }
};

/**
 * Writes _fbc from the in-memory fbclid (only called when marketing consent is present).
 */
const writeFbcFromMemory = () => {
  if (!memoryFbclid) return;
  try {
    const existing = readCookie('_fbc');
    if (existing && existing.endsWith(`.${memoryFbclid.fbclid}`)) return;

    const value = `fb.1.${memoryFbclid.capturedAt}.${memoryFbclid.fbclid}`;
    const domain = getCookieDomain();
    document.cookie =
      `_fbc=${encodeURIComponent(value)}; max-age=${FBC_MAX_AGE_SECONDS}; path=/; SameSite=Lax` +
      (window.location.protocol === 'https:' ? '; Secure' : '') +
      (domain ? `; domain=${domain}` : '');
  } catch (error) {
    console.warn('[MetaPixel] Could not write _fbc cookie:', error);
  }
};

/**
 * Deletes _fbp and _fbc on every domain variant the pixel or we may have used.
 */
const deleteMarketingCookies = () => {
  try {
    const host = window.location.hostname || '';
    const domains = new Set([null, host, `.${host}`]);
    const prodDomain = getCookieDomain();
    if (prodDomain) domains.add(prodDomain);
    if (host.startsWith('www.')) domains.add(`.${host.slice(4)}`);

    ['_fbp', '_fbc'].forEach((name) => {
      domains.forEach((domain) => {
        document.cookie =
          `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/` +
          (domain ? `; domain=${domain}` : '');
      });
    });
  } catch (error) {
    console.warn('[MetaPixel] Could not delete marketing cookies:', error);
  }
};

/**
 * Sends a PageView for the given URL (pathname + search) once.
 * No-op without marketing consent, before the pixel is loaded, or for a repeated URL
 * (guards against StrictMode double effects and init + route tracker overlap).
 */
export const trackMetaPageView = (url = getCurrentUrl()) => {
  if (!isEnabled() || !pixelLoaded) return;
  if (!hasConsent('marketing')) return;
  if (typeof window.fbq !== 'function') return;
  if (url === lastTrackedUrl) return;

  lastTrackedUrl = url;
  window.fbq('track', 'PageView');
};

/**
 * Sends a standard/custom Meta Pixel event with an eventID (for CAPI deduplication).
 * No-op without marketing consent or before the pixel is loaded.
 */
export const trackMetaEvent = (name, params = {}, { eventID } = {}) => {
  if (!isEnabled() || !pixelLoaded) return;
  if (!hasConsent('marketing')) return;
  if (typeof window.fbq !== 'function') return;

  try {
    window.fbq('track', name, params, { eventID });
  } catch (error) {
    console.warn(`[MetaPixel] Failed to track ${name}:`, error);
  }
};

/**
 * Injects the Meta Pixel (once) and sends the initial PageView.
 */
const loadPixel = () => {
  if (!isEnabled() || !hasConsent('marketing')) return;

  if (pixelLoaded) {
    window.fbq('consent', 'grant');
    trackMetaPageView();
    return;
  }

  try {
    if (typeof window.fbq !== 'function') {
      const n = function () {
        if (n.callMethod) {
          n.callMethod.apply(n, arguments);
        } else {
          n.queue.push(arguments);
        }
      };
      window.fbq = n;
      if (!window._fbq) window._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];

      // Disable the pixel's automatic history (pushState) PageView tracking;
      // SPA PageViews are sent by MetaPixelRouteTracker.
      n.disablePushState = true;
      n.allowDuplicatePageViews = true;

      if (!document.getElementById(PIXEL_SCRIPT_ID)) {
        const script = document.createElement('script');
        script.id = PIXEL_SCRIPT_ID;
        script.async = true;
        script.src = PIXEL_SCRIPT_SRC;
        const first = document.getElementsByTagName('script')[0];
        if (first && first.parentNode) {
          first.parentNode.insertBefore(script, first);
        } else {
          document.head.appendChild(script);
        }
      }
    } else {
      window.fbq.disablePushState = true;
      window.fbq.allowDuplicatePageViews = true;
    }

    window.fbq('consent', 'grant');
    window.fbq('set', 'autoConfig', false, META_PIXEL_ID);
    window.fbq('init', META_PIXEL_ID);

    pixelLoaded = true;
    writeFbcFromMemory();
    trackMetaPageView();
  } catch (error) {
    console.error('[MetaPixel] Failed to load Meta Pixel:', error);
  }
};

/**
 * Revokes pixel consent, deletes _fbp/_fbc and stops further events.
 */
const revokePixel = () => {
  if (!isEnabled()) return;
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('consent', 'revoke');
    }
  } catch (error) {
    console.warn('[MetaPixel] Failed to revoke consent:', error);
  }
  deleteMarketingCookies();
  lastTrackedUrl = null;
};

/**
 * Boots the Meta Pixel on app start if marketing consent exists, and subscribes to
 * later consent changes (grant → load without reload, revoke → stop + delete cookies).
 */
export const initMetaPixelOnLoad = () => {
  if (!isEnabled()) return;

  if (hasConsent('marketing')) {
    loadPixel();
  }

  if (!consentListenerAttached) {
    consentListenerAttached = true;
    onConsentChange('marketing', (granted) => {
      if (granted) {
        loadPixel();
      } else if (pixelLoaded || readCookie('_fbp') || readCookie('_fbc')) {
        revokePixel();
      }
    });
  }
};
