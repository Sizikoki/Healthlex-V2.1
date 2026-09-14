/**
 * Dynamically updates the canonical link, og:url, and twitter:url meta tags in document.head
 * @param {string} canonicalUrl Full absolute URL (e.g. https://www.healthlexmed.com/pricing)
 */
export const updateCanonicalUrl = (canonicalUrl) => {
  if (typeof document === 'undefined' || !canonicalUrl) return;
  try {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    const twitterUrl = document.querySelector('meta[name="twitter:url"], meta[property="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', canonicalUrl);
    }
  } catch (e) {
    console.warn('[SEO] Failed to update canonical URL:', e);
  }
};
