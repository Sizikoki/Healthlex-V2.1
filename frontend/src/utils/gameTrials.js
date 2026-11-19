// Local-only game trial counters for guest (2 total per game) and
// registered free users (5 per week per game, resetting Monday 00:00 local time).
// Paid plans (Basic / Pro / Lifetime) are unaffected.

export const TRIAL_GAMES = ['match', 'quiz', 'morpheme'];
export const GUEST_TRIAL_STORAGE_KEY = 'hlx_guest_game_trials_v1';
export const FREE_TRIAL_STORAGE_PREFIX = 'hlx_free_game_trials_v1_';
export const GUEST_TRIAL_LIMIT = 2;
export const FREE_WEEKLY_TRIAL_LIMIT = 5;

const clampInt = (val, min, max, fallback) => {
  if (typeof val !== 'number' || !Number.isFinite(val)) return fallback;
  const n = Math.floor(val);
  if (n < min) return min;
  if (n > max) return max;
  return n;
};

/**
 * Returns the Monday date (YYYY-MM-DD, local timezone) of the week containing `date`.
 * Week resets on Monday at 00:00 local time.
 */
export const getCurrentWeekMondayLocal = (date = new Date()) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${dayOfMonth}`;
};

const defaultGuestTrials = () => ({
  match: GUEST_TRIAL_LIMIT,
  quiz: GUEST_TRIAL_LIMIT,
  morpheme: GUEST_TRIAL_LIMIT,
});

const defaultFreeTrials = (week) => ({
  week,
  match: FREE_WEEKLY_TRIAL_LIMIT,
  quiz: FREE_WEEKLY_TRIAL_LIMIT,
  morpheme: FREE_WEEKLY_TRIAL_LIMIT,
});

export const getGuestGameTrials = () => {
  try {
    const raw = localStorage.getItem(GUEST_TRIAL_STORAGE_KEY);
    if (!raw) return defaultGuestTrials();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaultGuestTrials();
    return {
      match: clampInt(parsed.match, 0, GUEST_TRIAL_LIMIT, GUEST_TRIAL_LIMIT),
      quiz: clampInt(parsed.quiz, 0, GUEST_TRIAL_LIMIT, GUEST_TRIAL_LIMIT),
      morpheme: clampInt(parsed.morpheme, 0, GUEST_TRIAL_LIMIT, GUEST_TRIAL_LIMIT),
    };
  } catch (e) {
    return defaultGuestTrials();
  }
};

export const consumeGuestGameTrial = (gameId) => {
  if (!TRIAL_GAMES.includes(gameId)) return 0;
  const current = getGuestGameTrials();
  const nextRemaining = Math.max(0, current[gameId] - 1);
  const updated = { ...current, [gameId]: nextRemaining };
  try {
    localStorage.setItem(GUEST_TRIAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    // localStorage unavailable — ignore safely
  }
  return nextRemaining;
};

export const getFreeGameTrials = (uid, now = new Date()) => {
  const currentWeek = getCurrentWeekMondayLocal(now);
  if (!uid) return defaultFreeTrials(currentWeek);

  const storageKey = `${FREE_TRIAL_STORAGE_PREFIX}${uid}`;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaultFreeTrials(currentWeek);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.week !== currentWeek) {
      const fresh = defaultFreeTrials(currentWeek);
      try {
        localStorage.setItem(storageKey, JSON.stringify(fresh));
      } catch (writeErr) {
        // ignore write errors
      }
      return fresh;
    }
    return {
      week: currentWeek,
      match: clampInt(parsed.match, 0, FREE_WEEKLY_TRIAL_LIMIT, FREE_WEEKLY_TRIAL_LIMIT),
      quiz: clampInt(parsed.quiz, 0, FREE_WEEKLY_TRIAL_LIMIT, FREE_WEEKLY_TRIAL_LIMIT),
      morpheme: clampInt(parsed.morpheme, 0, FREE_WEEKLY_TRIAL_LIMIT, FREE_WEEKLY_TRIAL_LIMIT),
    };
  } catch (e) {
    return defaultFreeTrials(currentWeek);
  }
};

export const consumeFreeGameTrial = (uid, gameId, now = new Date()) => {
  if (!uid || !TRIAL_GAMES.includes(gameId)) return 0;
  const currentWeek = getCurrentWeekMondayLocal(now);
  const current = getFreeGameTrials(uid, now);
  const nextRemaining = Math.max(0, current[gameId] - 1);
  const updated = {
    ...current,
    week: currentWeek,
    [gameId]: nextRemaining,
  };
  try {
    localStorage.setItem(`${FREE_TRIAL_STORAGE_PREFIX}${uid}`, JSON.stringify(updated));
  } catch (e) {
    // localStorage unavailable — ignore safely
  }
  return nextRemaining;
};

/**
 * Resolves the trial/access state for a game without altering paid plan logic:
 * - Pro / Lifetime: all games unlocked (`paid_unlocked`)
 * - Basic (`hasPlan && !isPro`): flashcards & match unlocked (`paid_unlocked`), quiz & morpheme locked (`paid_locked`)
 * - Registered free (`isLoggedIn && !hasPlan && uid`): 5 weekly trials per game (`free_weekly`)
 * - Guest (`!isLoggedIn`): 2 total trials per game (`guest`)
 */
export const getGameTrialState = ({ gameId, isLoggedIn = false, uid = null, isPro = false, hasPlan = false }) => {
  if (!TRIAL_GAMES.includes(gameId)) {
    return { mode: 'none', canPlay: true, remaining: Infinity, limit: Infinity };
  }

  if (isPro || (hasPlan && gameId === 'match')) {
    return { mode: 'paid_unlocked', canPlay: true, remaining: Infinity, limit: Infinity };
  }

  if (hasPlan && !isPro) {
    return { mode: 'paid_locked', canPlay: false, remaining: 0, limit: 0 };
  }

  if (isLoggedIn && uid) {
    const freeTrials = getFreeGameTrials(uid);
    const remaining = freeTrials[gameId];
    return {
      mode: 'free_weekly',
      canPlay: remaining > 0,
      remaining,
      limit: FREE_WEEKLY_TRIAL_LIMIT,
    };
  }

  const guestTrials = getGuestGameTrials();
  const remaining = guestTrials[gameId];
  return {
    mode: 'guest',
    canPlay: remaining > 0,
    remaining,
    limit: GUEST_TRIAL_LIMIT,
  };
};

export const consumeGameTrial = ({ gameId, isLoggedIn = false, uid = null, isPro = false, hasPlan = false }) => {
  const current = getGameTrialState({ gameId, isLoggedIn, uid, isPro, hasPlan });
  if (current.mode === 'guest') {
    const remaining = consumeGuestGameTrial(gameId);
    return { ...current, remaining, canPlay: remaining > 0 };
  }
  if (current.mode === 'free_weekly') {
    const remaining = consumeFreeGameTrial(uid, gameId);
    return { ...current, remaining, canPlay: remaining > 0 };
  }
  return current;
};

export const getTrialRemainingText = (mode, remaining) => {
  if (mode === 'guest') {
    if (remaining >= 2) return '2 deneme hakkın var';
    if (remaining === 1) return '1 deneme hakkın kaldı';
    return 'Denemelerin bitti.';
  }
  if (mode === 'free_weekly') {
    if (remaining > 0) {
      return `Bu hafta ${remaining}/${FREE_WEEKLY_TRIAL_LIMIT} hakkın kaldı · Pazartesi yenilenir`;
    }
    return 'Bu haftaki 5 hakkını kullandın. Pazartesi yenilenir.';
  }
  return '';
};
