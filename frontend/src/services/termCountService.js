import { db } from '@/firebase/config';
import { collection, getCountFromServer } from 'firebase/firestore';
import termCountConfig from '@/data/termCount.json';

const BASELINE_COUNT = typeof termCountConfig?.totalTerms === 'number' ? termCountConfig.totalTerms : 947;
let cachedCount = BASELINE_COUNT;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 dakika önbellek

/**
 * Terim sayısını tek bir merkezi kaynaktan döner.
 * Firestore getCountFromServer() API'si ile ucuz ve hızlı sorgu yapar.
 * Hata veya zaman aşımında termCount.json yapılandırmasındaki güncel tabana döner.
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
    console.warn('[termCountService] Could not fetch live count from Firestore, using config fallback:', err?.message);
  }

  return cachedCount;
}

/**
 * Senkron olarak mevcut veya yapılandırma dosyasındaki terim sayısını anında döner (ilk render için).
 */
export function getInitialTermCount() {
  return cachedCount;
}
