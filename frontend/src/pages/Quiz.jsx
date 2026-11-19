import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuizGameFable from '@/components/games/QuizGameFable';
import { GameTrialExhaustedScreen } from '@/components/games/GameTrialNotice';
import { useLanguage } from '@/context/LanguageContext';
import { getAllTerms, getTermsByCategory } from '@/data/medicalTerms';
import { getUser, isLoggedIn } from '@/utils/storage';
import { checkIsPro, checkHasPaidPlan, getPreviewRole } from '@/utils/planAccess';
import { getGameTrialState, consumeGameTrial } from '@/utils/gameTrials';
import { auth, db } from '@/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { updateCanonicalUrl } from '@/utils/seo';
import { toast } from 'sonner';

export const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const { currentLanguage, t } = useLanguage();

  const previewRole = getPreviewRole();
  const initialUser = getUser();
  const initialUid = initialUser?.uid || auth?.currentUser?.uid || null;

  const [planReady, setPlanReady] = useState(() => (previewRole ? true : !Boolean(initialUid)));
  const [currentUid, setCurrentUid] = useState(initialUid);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(() => Boolean(previewRole || initialUid || isLoggedIn()));
  const [isPro, setIsPro] = useState(() => {
    try {
      if (previewRole === 'pro') return true;
      if (previewRole === 'basic') return false;
      return checkIsPro(initialUser);
    } catch (e) {
      return false;
    }
  });
  const [hasPlan, setHasPlan] = useState(() => {
    try {
      if (previewRole === 'pro' || previewRole === 'basic') return true;
      return checkHasPaidPlan(initialUser);
    } catch (e) {
      return false;
    }
  });

  const [hasActiveRound, setHasActiveRound] = useState(false);
  const [trialTick, setTrialTick] = useState(0);

  useEffect(() => {
    updateCanonicalUrl('https://www.healthlexmed.com/quiz');
    if (previewRole) {
      setPlanReady(true);
      return;
    }

    let unsubDoc = null;
    const unsubAuth = auth.onAuthStateChanged((firebaseUser) => {
      if (unsubDoc) {
        unsubDoc();
        unsubDoc = null;
      }

      const targetUser = firebaseUser || getUser();
      const uid = targetUser?.uid || null;
      setCurrentUid(uid);
      setUserIsLoggedIn(Boolean(uid || isLoggedIn()));

      if (!uid) {
        setIsPro(false);
        setHasPlan(false);
        setPlanReady(true);
        return;
      }

      setIsPro(checkIsPro(targetUser));
      setHasPlan(checkHasPaidPlan(targetUser));

      try {
        unsubDoc = onSnapshot(
          doc(db, 'users', uid),
          (snap) => {
            if (snap.exists()) {
              const data = snap.data();
              setIsPro(checkIsPro(data));
              setHasPlan(checkHasPaidPlan(data));
            } else {
              setIsPro(checkIsPro(targetUser));
              setHasPlan(checkHasPaidPlan(targetUser));
            }
            setPlanReady(true);
          },
          (err) => {
            console.warn('Error checking pro status in Quiz:', err);
            setPlanReady(true);
          }
        );
      } catch (e) {
        console.warn('Error checking pro status in Quiz:', e);
        setPlanReady(true);
      }
    });

    return () => {
      if (unsubDoc) {
        unsubDoc();
        unsubDoc = null;
      }
      unsubAuth();
    };
  }, [previewRole]);

  const trialState = useMemo(
    () =>
      getGameTrialState({
        gameId: 'quiz',
        isLoggedIn: userIsLoggedIn,
        uid: currentUid,
        isPro,
        hasPlan,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userIsLoggedIn, currentUid, isPro, hasPlan, trialTick]
  );

  useEffect(() => {
    if (!planReady) return;
    if (trialState.mode === 'paid_locked') {
      toast.info(
        currentLanguage === 'en'
          ? 'Quiz mode is exclusive to Pro and above plans. Flashcards and Matching games are available in your Basic plan.'
          : 'Quiz modu Pro ve üzeri planlara özeldir. Flashcard ve Eşleştirme oyunları Temel paketinde açıktır.'
      );
      navigate('/pricing');
    }
  }, [planReady, trialState.mode, currentLanguage, navigate]);

  const handleRoundStart = useCallback(() => {
    setHasActiveRound(true);
    consumeGameTrial({
      gameId: 'quiz',
      isLoggedIn: userIsLoggedIn,
      uid: currentUid,
      isPro,
      hasPlan,
    });
    setTrialTick((n) => n + 1);
  }, [userIsLoggedIn, currentUid, isPro, hasPlan]);

  const categoryTerms = useMemo(() => {
    return category === 'all'
      ? getAllTerms()
      : getTermsByCategory(category);
  }, [category]);

  const backToGames = () =>
    navigate(category && category !== 'all' ? `/games?category=${category}` : '/games');

  if (!planReady) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (trialState.mode === 'paid_locked') {
    return null;
  }

  if (
    (trialState.mode === 'guest' || trialState.mode === 'free_weekly') &&
    !trialState.canPlay &&
    !hasActiveRound
  ) {
    return (
      <GameTrialExhaustedScreen
        gameId="quiz"
        mode={trialState.mode}
        onBack={backToGames}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <QuizGameFable
        terms={categoryTerms}
        categoryId={category}
        language={currentLanguage}
        onBack={backToGames}
        t={t}
        trialMode={trialState.mode}
        trialRemaining={trialState.remaining}
        onRoundStart={handleRoundStart}
      />
    </div>
  );
};
