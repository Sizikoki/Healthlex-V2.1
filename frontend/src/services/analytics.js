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
 * PostHog Analytics Consent Management & Tracking
 */
export const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY || 'phc_yJW1VjHGGwmCbbrtczfqqNxgBDbhlhOWcdzcIJEOTFE';
export const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST || 'https://us.i.posthog.com';

/**
 * Initializes PostHog ONLY when user gives explicit cookie consent ('accepted').
 */
export const initPostHog = () => {
  if (typeof window === 'undefined') return;
  if (!hasConsent('analytics')) return;

  try {
    if (window.__hlxPostHogInitialized && window.posthog) {
      if (typeof window.posthog.opt_in_capturing === 'function') {
        window.posthog.opt_in_capturing();
      }
      return;
    }

    !(function (t, e) {
      var o, n, p, r;
      e.__SV ||
        ((window.posthog = e),
        (e._i = []),
        (e.init = function (i, s, a) {
          function g(t, e) {
            var o = e.split(".");
            2 == o.length && ((t = t[o[0]]), (e = o[1])),
              (t[e] = function () {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
              });
          }
          ((p = t.createElement("script")).type = "text/javascript"),
            (p.id = "posthog-js-script"),
            (p.crossOrigin = "anonymous"),
            (p.async = !0),
            (p.src =
              s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") +
              "/static/array.js"),
            (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
          var u = e;
          for (
            void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
              u.people = u.people || [],
              u.toString = function (t) {
                var e = "posthog";
                return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
              },
              u.people.toString = function () {
                return u.toString(1) + ".people (stub)";
              },
              o =
                "init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(
                  " "
                ),
              n = 0;
            n < o.length;
            n++
          )
            g(u, o[n]);
          e._i.push([i, s, a]);
        }),
        (e.__SV = 1));
    })(document, window.posthog || []);

    window.posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
    });

    window.__hlxPostHogInitialized = true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize PostHog:', error);
  }
};

/**
 * Disables PostHog and stops/resets capturing when user declines or revokes consent.
 */
export const disablePostHog = () => {
  if (typeof window === 'undefined') return;

  try {
    if (window.posthog) {
      if (typeof window.posthog.opt_out_capturing === 'function') {
        window.posthog.opt_out_capturing();
      }
      if (typeof window.posthog.reset === 'function') {
        window.posthog.reset();
      }
    }

    const script = document.getElementById('posthog-js-script');
    if (script) {
      script.remove();
    }

    window.__hlxPostHogInitialized = false;
  } catch (error) {
    console.error('[Analytics] Failed to disable PostHog:', error);
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

  // Notify active listeners (e.g. Meta Pixel, PostHog, or reactive UI components)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT_NAME, { detail: payload }));
  }

  if (payload.analytics) {
    initGoogleAnalytics();
    initPostHog();
  } else {
    disableGoogleAnalytics();
    disablePostHog();
  }

  return payload;
};

/**
 * Checks consent on app start and boots analytics only if analytics category was accepted.
 */
export const initAnalyticsOnLoad = () => {
  if (hasConsent('analytics')) {
    initGoogleAnalytics();
    initPostHog();
  } else {
    disableGoogleAnalytics();
    disablePostHog();
  }
};

