const HIDDEN_BOTTOM_NAV_PATHS = new Set([
  '/flashcards',
  '/match',
  '/quiz',
  '/morpheme',
  '/login',
  '/register',
  '/pricing',
  '/tekrar',
]);

/**
 * Mobil alt gezinme çubuğunun (ve alt boşluk / çerez bandı kaydırmasının)
 * verilen yolda aktif olup olmayacağını belirler.
 * Not: /morpheme (oyun) gizlenir; /morphemes ve /morphemes/:slug gizlenmez.
 */
export function shouldShowBottomNav(pathname) {
  const normalized = (pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
  return !HIDDEN_BOTTOM_NAV_PATHS.has(normalized);
}
