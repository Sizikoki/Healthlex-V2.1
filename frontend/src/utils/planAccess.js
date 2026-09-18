export const UNLOCKED_CATEGORY_IDS = [
  'skull_bones',
  'face_bones',
  'trunk_bones'
];

export const MAX_GUEST_MORPHEMES = 24;
export const MAX_BASIC_MORPHEMES = 100;

export const UNLOCKED_GAMES = [
  'flashcards',
  'match'
];

export const LOCKED_GAMES = [
  'quiz',
  'morpheme'
];

export const PAST_DUE_GRACE_PERIOD_MS = 5 * 24 * 60 * 60 * 1000; // 5 tam gün ek süre

/**
 * Kullanıcının ödeme gecikmesi durumunu ve 5 günlük ek süresini kontrol eder
 */
export const getPastDueState = (userData) => {
  if (!userData) return { isPastDue: false, isWithinGracePeriod: false, daysLeft: 0 };
  const status = (userData.subscriptionStatus || '').toLowerCase();
  if (status !== 'past_due') return { isPastDue: false, isWithinGracePeriod: false, daysLeft: 0 };

  const pastDueSince = userData.pastDueSince ? new Date(userData.pastDueSince).getTime() : Date.now();
  const elapsed = Math.max(0, Date.now() - pastDueSince);
  const remainingMs = Math.max(0, PAST_DUE_GRACE_PERIOD_MS - elapsed);
  const isWithinGracePeriod = remainingMs > 0;
  const daysLeft = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));

  return {
    isPastDue: true,
    isWithinGracePeriod,
    daysLeft,
    pastDueSince
  };
};

/**
 * Kullanıcının Temel planda olup olmadığını belirler
 */
export const checkIsBasic = (userData) => {
  if (!userData) return false;
  if (userData.isLifetime === true) return false;
  const planStr = (userData.plan || '').toLowerCase();
  const status = (userData.subscriptionStatus || '').toLowerCase();
  return (
    userData.isBasic === true ||
    userData.planType === 'basic' ||
    planStr.includes('basic') ||
    planStr.includes('temel') ||
    status === 'basic'
  );
};

/**
 * Kullanıcının Pro (Tam erişim) durumunda olup olmadığını belirler
 */
export const checkIsPro = (userData) => {
  if (!userData) return false;

  // Ömür boyu VIP
  if (userData.isLifetime === true) return true;

  // Temel plan ise Pro değildir
  if (userData.isBasic === true) return false;

  const status = (userData.subscriptionStatus || '').toLowerCase();

  // Kart gecikmesi (past_due) - 5 günlük ek süre kuralı
  if (status === 'past_due') {
    const { isWithinGracePeriod } = getPastDueState(userData);
    return isWithinGracePeriod && userData.isPro === true;
  }

  // İptal edilmiş veya süresi bitmiş
  if (status === 'canceled' || status === 'free') return false;

  // Paddle deneme (trialing) veya aktif (active) abonelik
  if (status === 'active' || status === 'pro' || status === 'trialing') {
    return userData.isPro === true || !userData.isBasic;
  }

  if (userData.isPro === true) return true;
  return false;
};

/**
 * Kategorinin kullanıcı için açık olup olmadığını kontrol eder
 */
export const isCategoryUnlocked = (categoryId, isPro) => {
  if (isPro) return true;
  if (!categoryId || categoryId === 'all') return false;
  return UNLOCKED_CATEGORY_IDS.includes(categoryId);
};

/**
 * Morfemin kullanıcı için açık olup olmadığını kontrol eder:
 * - Pro/Ömür Boyu: tüm morfemler (571+) açık
 * - Temel plan (isBasic true): ilk 100 morfem açık
 * - Misafir (giriş yapmamış): ilk 24 morfem açık
 */
export const isMorphemeUnlocked = (index, isPro, isBasic = false) => {
  if (isPro) return true;
  if (isBasic) return index < MAX_BASIC_MORPHEMES;
  return index < MAX_GUEST_MORPHEMES;
};

/**
 * Oyun modunun kullanıcı için açık olup olmadığını kontrol eder (Temel pakette Flashcard & Eşleştirme açık, Quiz & Morfem Yapıcı kapalı)
 */
export const isGameUnlocked = (gameId, isPro) => {
  if (isPro) return true;
  return UNLOCKED_GAMES.includes(gameId);
};

/**
 * Oyun modunun misafir (giriş yapmamış) kullanıcı için açık olup olmadığını kontrol eder.
 * Misafir kullanıcılar yalnızca Flashcard moduna (günlük 5 oyun kotası ile) erişebilir;
 * Eşleştirme, Quiz ve Morfem oyunları misafir kullanıcılara kapalıdır.
 */
export const isGameUnlockedForGuest = (gameId) => {
  return gameId === 'flashcards';
};

/**
 * Test / Preview rolü:
 * Geliştirme/test kolaylığı sağlamak için URL parametresi (?previewRole=pro/basic) veya localStorage'dan okunur.
 * GÜVENLİK KURALI:
 * Canlı / üretim ortamında (production build veya canlı domain) TAMAMEN devre dışıdır, her zaman null döner.
 * Yalnızca localhost ortamında geliştirme/test amaçlı çalışır.
 */
export const getPreviewRole = () => {
  if (typeof window === 'undefined') return null;

  // 1. Production build ortamında kesinlikle devre dışı
  if (process.env.NODE_ENV === 'production') return null;

  // 2. Canlı domain / IP kontrolü (yalnızca yerel geliştirme ortamında izin verilir)
  try {
    const hostname = window.location.hostname;
    const isLocalhost =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '[::1]' ||
      hostname === '0.0.0.0';

    if (!isLocalhost) return null;

    return (
      new URLSearchParams(window.location.search).get('previewRole') ||
      localStorage.getItem('healthlex_preview_role') ||
      null
    );
  } catch (e) {
    return null;
  }
};
