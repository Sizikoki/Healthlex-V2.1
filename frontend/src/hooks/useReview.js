// Favorilerim + aralıklı tekrar durumu (tüm uygulama için tek kaynak)
// Veri: Firestore user_review/{uid} belgesi → { userId, cards: { "<termId>": {...} }, updatedAt }
// Kurallar firestore.rules içinde: ücretsiz en fazla 20 terim, ücretli en fazla 1500.
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot, setDoc, deleteField, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useNavAuth } from '@/hooks/useNavAuth';
import { checkIsPro, getPreviewRole } from '@/utils/planAccess';
import { FREE_REVIEW_LIMIT, newReviewCard, scheduleAnswer, isDueToday } from '@/utils/reviewScheduler';

const ReviewContext = createContext(null);

function useReviewInternal() {
  const { firebaseUser, userData, isLifetime, loggedIn } = useNavAuth();
  const previewRole = getPreviewRole();
  // Önizleme rolünde (yalnızca localhost) Firestore'a yazılmaz
  const uid = !previewRole && firebaseUser?.uid ? firebaseUser.uid : null;

  const [cards, setCards] = useState({});
  const [snapshotLoaded, setSnapshotLoaded] = useState(false);

  useEffect(() => {
    setCards({});
    setSnapshotLoaded(false);
    if (!uid) return undefined;
    const ref = doc(db, 'user_review', uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setCards(snap.exists() ? snap.data()?.cards || {} : {});
        setSnapshotLoaded(true);
      },
      (err) => {
        console.warn('[review] user_review okunamadı:', err);
        setSnapshotLoaded(true);
      }
    );
    return () => unsub();
  }, [uid]);

  const isPaid = isLifetime === true || checkIsPro(userData);
  const loaded = uid ? snapshotLoaded : true;

  const favoriteIds = useMemo(
    () => Object.keys(cards).filter((id) => cards[id] && cards[id].fav !== false),
    [cards]
  );
  const count = Object.keys(cards).length;
  const limit = isPaid ? null : FREE_REVIEW_LIMIT;
  const canAdd = isPaid || count < FREE_REVIEW_LIMIT;

  const dueTodayIds = useMemo(() => {
    const now = new Date();
    return Object.keys(cards)
      .filter((id) => isDueToday(cards[id], now))
      .sort((a, b) => new Date(cards[a]?.due || 0) - new Date(cards[b]?.due || 0));
  }, [cards]);

  const nextDueIso = useMemo(() => {
    const now = new Date();
    const future = Object.values(cards)
      .map((c) => c?.due)
      .filter((d) => d && !isDueToday({ due: d }, now))
      .sort();
    return future[0] || null;
  }, [cards]);

  const writeCard = useCallback(
    async (termId, value) => {
      if (!uid) throw new Error('not-signed-in');
      const ref = doc(db, 'user_review', uid);
      await setDoc(
        ref,
        {
          userId: uid,
          cards: { [String(termId)]: value === null ? deleteField() : value },
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    },
    [uid]
  );

  const isFavorite = useCallback((termId) => !!cards[String(termId)], [cards]);

  /**
   * Favori ekler/çıkarır.
   * Dönüş: 'added' | 'removed' | 'needs-auth' | 'limit' | 'error'
   */
  const toggleFavorite = useCallback(
    async (termId) => {
      if (termId === undefined || termId === null) return 'error';
      if (!loggedIn || !uid) return 'needs-auth';
      const key = String(termId);
      try {
        if (cards[key]) {
          await writeCard(key, null);
          return 'removed';
        }
        if (!canAdd) return 'limit';
        await writeCard(key, {
          fav: true,
          src: 'fav',
          addedAt: new Date().toISOString(),
          ...newReviewCard(new Date()),
        });
        return 'added';
      } catch (err) {
        console.warn('[review] favori kaydedilemedi:', err);
        return err?.code === 'permission-denied' ? 'limit' : 'error';
      }
    },
    [loggedIn, uid, cards, canAdd, writeCard]
  );

  /**
   * Tekrar cevabını kaydeder. known=true → Biliyorum, false → Bilmiyorum.
   * Dönüş: yeni kart (due ISO içerir) ya da hata durumunda null.
   */
  const answerCard = useCallback(
    async (termId, known) => {
      const key = String(termId);
      const current = cards[key];
      if (!current) return null;
      const next = { ...current, ...scheduleAnswer(current, known, new Date()) };
      try {
        await writeCard(key, next);
        return next;
      } catch (err) {
        console.warn('[review] cevap kaydedilemedi:', err);
        return null;
      }
    },
    [cards, writeCard]
  );

  return {
    loaded,
    loggedIn,
    isPaid,
    cards,
    count,
    limit,
    canAdd,
    favoriteIds,
    dueTodayIds,
    dueTodayCount: dueTodayIds.length,
    nextDueIso,
    isFavorite,
    toggleFavorite,
    answerCard,
  };
}

export const ReviewProvider = ({ children }) => {
  const value = useReviewInternal();
  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
};

export const useReview = () => {
  const ctx = useContext(ReviewContext);
  if (!ctx) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return ctx;
};
