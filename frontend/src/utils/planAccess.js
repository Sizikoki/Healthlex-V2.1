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

/**
 * Kullanıcının Pro (Tam erişim) durumunda olup olmadığını belirler
 */
export const checkIsPro = (userData) => {
  if (!userData) return false;
  const status = userData.subscriptionStatus;
  if (status === 'trial' || status === 'trialing' || status === 'free') return false;
  if (status === 'active' || status === 'pro') return true;
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
