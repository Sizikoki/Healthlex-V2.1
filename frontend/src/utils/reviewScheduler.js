// Aralıklı tekrar zamanlayıcısı (FSRS, ts-fsrs paketi — MIT lisanslı)
// Algoritmanın kendi varsayılanları kullanılır: hatırlama hedefi %90,
// kısa öğrenme adımları (1 dk, 10 dk) ve yeniden öğrenme adımı (10 dk).
import { fsrs, createEmptyCard, generatorParameters, Rating } from 'ts-fsrs';

// Ücretsiz kayıtlı kullanıcının en fazla tutabileceği terim sayısı (firestore.rules ile aynı)
export const FREE_REVIEW_LIMIT = 20;

// Tekrar oturumunda, cevaptan sonra bu süre içinde vadesi gelen kart aynı oturumda tekrar gösterilir
export const SAME_SESSION_WINDOW_MS = 20 * 60 * 1000;

const scheduler = fsrs(generatorParameters({}));

const toIso = (d) => (d ? new Date(d).toISOString() : null);

// ts-fsrs kartını Firestore'a yazılabilir düz nesneye çevirir (tarihler ISO metin)
const serializeCard = (card) => ({
  due: toIso(card.due),
  stability: card.stability,
  difficulty: card.difficulty,
  elapsed_days: card.elapsed_days ?? 0,
  scheduled_days: card.scheduled_days ?? 0,
  learning_steps: card.learning_steps ?? 0,
  reps: card.reps,
  lapses: card.lapses,
  state: card.state,
  last_review: toIso(card.last_review),
});

// Firestore'daki düz nesneyi ts-fsrs kartına çevirir
const deserializeCard = (stored) => {
  const card = {
    due: stored?.due ? new Date(stored.due) : new Date(),
    stability: Number(stored?.stability) || 0,
    difficulty: Number(stored?.difficulty) || 0,
    elapsed_days: Number(stored?.elapsed_days) || 0,
    scheduled_days: Number(stored?.scheduled_days) || 0,
    learning_steps: Number(stored?.learning_steps) || 0,
    reps: Number(stored?.reps) || 0,
    lapses: Number(stored?.lapses) || 0,
    state: Number(stored?.state) || 0,
  };
  if (stored?.last_review) card.last_review = new Date(stored.last_review);
  return card;
};

/** Yeni eklenen terim için boş kart (vadesi hemen; bugünkü tekrara girer). */
export const newReviewCard = (now = new Date()) => serializeCard(createEmptyCard(now));

/**
 * Cevaba göre kartın yeni durumunu hesaplar.
 * known=true → "Biliyorum" (Good), known=false → "Bilmiyorum" (Again)
 */
export const scheduleAnswer = (stored, known, now = new Date()) => {
  const { card } = scheduler.next(deserializeCard(stored), now, known ? Rating.Good : Rating.Again);
  return serializeCard(card);
};

/** Bugünün (yerel saatle) sonu */
export const endOfLocalToday = (now = new Date()) => {
  const d = new Date(now);
  d.setHours(23, 59, 59, 999);
  return d;
};

/** Kartın vadesi bugün (yerel) bitmeden geliyor mu? */
export const isDueToday = (stored, now = new Date()) => {
  if (!stored?.due) return true;
  return new Date(stored.due).getTime() <= endOfLocalToday(now).getTime();
};

/** "Bugün", "Yarın", "3 gün sonra" gibi okunur vade metni */
export const formatDueLabel = (dueIso, isTr = true, now = new Date()) => {
  if (!dueIso) return isTr ? 'Bugün' : 'Today';
  const due = new Date(dueIso);
  const startToday = new Date(now);
  startToday.setHours(0, 0, 0, 0);
  const startDue = new Date(due);
  startDue.setHours(0, 0, 0, 0);
  const days = Math.round((startDue.getTime() - startToday.getTime()) / 86400000);
  if (days <= 0) return isTr ? 'Bugün' : 'Today';
  if (days === 1) return isTr ? 'Yarın' : 'Tomorrow';
  return isTr ? `${days} gün sonra` : `In ${days} days`;
};
