export const UNLOCKED_CATEGORY_IDS = [
  'skull_bones',
  'face_bones',
  'trunk_bones'
];

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
 * Morfemin kullanıcı için açık olup olmadığını kontrol eder (Temel pakette ilk 100 morfem açık)
 */
export const isMorphemeUnlocked = (index, isPro) => {
  if (isPro) return true;
  return index < MAX_BASIC_MORPHEMES;
};

/**
 * Oyun modunun kullanıcı için açık olup olmadığını kontrol eder (Temel pakette Flashcard & Eşleştirme açık, Quiz & Morfem Yapıcı kapalı)
 */
export const isGameUnlocked = (gameId, isPro) => {
  if (isPro) return true;
  return UNLOCKED_GAMES.includes(gameId);
};
