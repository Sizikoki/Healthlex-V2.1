import { db } from '@/firebase/config';
import { collection, getCountFromServer } from 'firebase/firestore';
import { getAllTerms } from '@/data/medicalTerms';

let cachedCount = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 dakika önbellek

/**
 * Terim sayısını tek bir merkezi kaynaktan döner.
 * Firestore getCountFromServer() API'si ile ucuz ve hızlı sorgu yapar.
 * Hata veya zaman aşımında yerel getAllTerms().length değerine döner.
 */
export async function getTermCount() {
  const now = Date.now();
  if (cachedCount !== null && (now - lastFetchTime < CACHE_TTL_MS)) {
    return cachedCount;
  }

  try {
    const coll = collection(db, 'terms');
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('TermCount timeout')), 2500)
    );

    const snapshot = await Promise.race([
      getCountFromServer(coll),
      timeoutPromise
    ]);

    const count = snapshot?.data()?.count;
    if (typeof count === 'number' && count > 0) {
      cachedCount = count;
      lastFetchTime = now;
      return count;
    }
  } catch (err) {
    console.warn('[termCountService] Could not fetch live count from Firestore, using local fallback:', err?.message);
  }

  const fallbackCount = getAllTerms().length;
  cachedCount = fallbackCount;
  lastFetchTime = now;
  return fallbackCount;
}

/**
 * Senkron olarak mevcut veya yerel terim sayısını anında döner (ilk render için).
 */
export function getInitialTermCount() {
  if (cachedCount !== null) return cachedCount;
  return getAllTerms().length;
}
