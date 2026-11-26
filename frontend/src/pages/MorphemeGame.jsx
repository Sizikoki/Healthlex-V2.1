import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MorphemeGameFable from '@/components/games/MorphemeGameFable';
import { GameTrialExhaustedScreen } from '@/components/games/GameTrialNotice';
import { useLanguage } from '@/context/LanguageContext';
import { getAllTerms } from '@/data/medicalTerms';
import {
  adaptTermsToMorphemeQuestions,
  filterTermsForMorphemeGame,
  getEligibleMorphemeCategories,
  termMatchesMorphemeCategory,
  MORPHEME_GAME_CATEGORIES,
} from '@/utils/morphemeAdapter';
import { getUser, isLoggedIn } from '@/utils/storage';
import { checkIsPro, checkHasPaidPlan, getPreviewRole } from '@/utils/planAccess';
import { getGameTrialState, consumeGameTrial } from '@/utils/gameTrials';
import { auth, db } from '@/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { updateCanonicalUrl } from '@/utils/seo';
import { toast } from 'sonner';

export const MorphemeGame = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get('category') || 'all';
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
    updateCanonicalUrl('https://www.healthlexmed.com/morpheme');
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
            console.warn('Error checking pro status in MorphemeGame:', err);
            setPlanReady(true);
          }
        );
      } catch (e) {
        console.warn('Error checking pro status in MorphemeGame:', e);
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
        gameId: 'morpheme',
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
          ? 'Morpheme Builder mode is exclusive to Pro and above plans.'
          : 'Morfem Yapıcı oyunu Pro ve üzeri planlara özeldir.'
      );
      navigate('/pricing');
    }
  }, [planReady, trialState.mode, currentLanguage, navigate]);

  const handleRoundStart = useCallback(() => {
    setHasActiveRound(true);
    consumeGameTrial({
      gameId: 'morpheme',
      isLoggedIn: userIsLoggedIn,
      uid: currentUid,
      isPro,
      hasPlan,
    });
    setTrialTick((n) => n + 1);
  }, [userIsLoggedIn, currentUid, isPro, hasPlan]);

  const allEligibleTerms = useMemo(() => {
    return filterTermsForMorphemeGame(getAllTerms());
  }, []);

  const eligibleCategories = useMemo(() => {
    return getEligibleMorphemeCategories(allEligibleTerms, MORPHEME_GAME_CATEGORIES);
  }, [allEligibleTerms]);

  const category = useMemo(() => {
    if (rawCategory === 'all') return 'all';
    return eligibleCategories.some((c) => c.id === rawCategory) ? rawCategory : 'all';
  }, [rawCategory, eligibleCategories]);

  const handleCategoryChange = useCallback(
    (val) => {
      if (!val || val === 'all') {
        setSearchParams({});
      } else {
        setSearchParams({ category: val });
      }
    },
    [setSearchParams]
  );

  const categoryTerms = useMemo(() => {
    return category === 'all'
      ? allEligibleTerms
      : allEligibleTerms.filter((term) => termMatchesMorphemeCategory(term, category));
  }, [allEligibleTerms, category]);

  const adaptedQuestions = useMemo(() => {
    return adaptTermsToMorphemeQuestions(categoryTerms);
  }, [categoryTerms]);

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
        gameId="morpheme"
        mode={trialState.mode}
        onBack={backToGames}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-3 px-2 sm:py-8 sm:px-4">
      <MorphemeGameFable
        terms={adaptedQuestions}
        language={currentLanguage}
        onBack={backToGames}
        t={t}
        trialMode={trialState.mode}
        trialRemaining={trialState.remaining}
        onRoundStart={handleRoundStart}
        categories={eligibleCategories}
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
};
