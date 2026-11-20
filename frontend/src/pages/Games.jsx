import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, Shuffle, Brain, ArrowRight, Puzzle, UserPlus, Lock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isLoggedIn, getFlashcardGuestDailyInfo, getUser } from '@/utils/storage';
import { GuestLimitModal } from '@/components/GuestLimitModal';
import { useLanguage } from '@/context/LanguageContext';
import { auth, db } from '@/firebase/config';
import { collection, getDocs, query, where, doc, onSnapshot } from 'firebase/firestore';
import { getAllTerms, getTermsByCategory } from '@/data/medicalTerms';
import {
  adaptTermsToMorphemeQuestions,
  filterTermsForMorphemeGame,
  getEligibleMorphemeCategories,
  termMatchesMorphemeCategory,
} from '@/utils/morphemeAdapter';
import MorphemeGameFable from '@/components/games/MorphemeGameFable';
import QuizGameFable from '@/components/games/QuizGameFable';
import { checkIsPro, checkHasPaidPlan, getPreviewRole } from '@/utils/planAccess';
import { getGameTrialState, consumeGameTrial, getTrialRemainingText } from '@/utils/gameTrials';
import { updateCanonicalUrl } from '@/utils/seo';
import { toast } from 'sonner';

const GAMES_CATEGORY_KEY = 'healthlex_selected_game_category';

const GAME_CATEGORIES = [
  { id: 'skull_bones', key: 'skullBones', name: 'Kafatası Kemikleri' },
  { id: 'face_bones', key: 'faceBones', name: 'Yüz Kemikleri' },
  { id: 'trunk_bones', key: 'trunkBones', name: 'Gövde Kemikleri' },
  { id: 'upper_extremity_bones', key: 'upperExtremityBones', name: 'Üst Ekstremite Kemikleri' },
  { id: 'upper_extremity_joints', key: 'upperExtremityJoints', name: 'Üst Ekstremite Eklemleri' },
  { id: 'lower_extremity_bones', key: 'lowerExtremityBones', name: 'Alt Ekstremite Kemikleri' },
  { id: 'lower_extremity_joints', key: 'lowerExtremityJoints', name: 'Alt Ekstremite Eklemleri' },
  { id: 'spine_joints', key: 'spineJoints', name: 'Omurga Eklemleri' },
  { id: 'head_and_neck_joints', key: 'headAndNeckJoints', name: 'Kafa ve Boyun Eklemleri' },
  { id: 'head_and_neck_muscles', key: 'headAndNeckMuscles', name: 'Baş ve Boyun Kasları' },
  { id: 'trunk_muscles', key: 'trunkMuscles', name: 'Gövde Kasları' },
  { id: 'upper_extremity_muscles', key: 'upperExtremityMuscles', name: 'Üst Ekstremite Kasları' },
  { id: 'muscle_structures', key: 'muscleStructures', name: 'Kas ve Kasla İlişkili Yapılar' },
  { id: 'bone_structures', key: 'boneStructures', name: 'Kemik / İskelet Yapıları' },
  { id: 'movement_terms', key: 'movementTerms', name: 'Hareket Terimleri' },
  { id: 'anatomic_direction', key: 'anatomicDirection', name: 'Anatomik Yön Terimleri' },
];

// Sayfa içinde (route değişmeden) render edilen Fable/Elmish oyunları
const INLINE_GAMES = ['morpheme', 'quiz'];

export const Games = () => {
  const { currentLanguage, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const paramCategory = searchParams.get('category');

  const isTr = currentLanguage !== 'en';
  const previewRole = getPreviewRole();
  const initialUser = getUser();
  const [currentUid, setCurrentUid] = useState(() => initialUser?.uid || auth?.currentUser?.uid || null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(() => Boolean(previewRole || initialUser?.uid || auth?.currentUser?.uid || isLoggedIn()));
  const [isPro, setIsPro] = useState(() => previewRole === 'pro' || checkIsPro(initialUser));
  const [hasPlan, setHasPlan] = useState(() => previewRole === 'pro' || previewRole === 'basic' || checkHasPaidPlan(initialUser));
  const [trialTick, setTrialTick] = useState(0);

  useEffect(() => {
    updateCanonicalUrl('https://www.healthlexmed.com/games');
  }, []);

  useEffect(() => {
    if (previewRole) return;

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
        const localUser = getUser();
        setIsPro(checkIsPro(localUser));
        setHasPlan(checkHasPaidPlan(localUser));
        setTrialTick((n) => n + 1);
        return;
      }

      setIsPro(checkIsPro(targetUser));
      if (checkHasPaidPlan(targetUser)) {
        setHasPlan(true);
      }

      try {
        const userDocRef = doc(db, 'users', uid);
        unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setIsPro(checkIsPro(data));
            setHasPlan(checkHasPaidPlan(data));
          } else {
            setIsPro(checkIsPro(targetUser));
            setHasPlan(checkHasPaidPlan(targetUser));
          }
          setTrialTick((n) => n + 1);
        }, (err) => {
          console.warn('[Games] Could not check pro/plan status:', err);
        });
      } catch (e) {
        console.warn('[Games] Error checking pro/plan status:', e);
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

  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (paramCategory) return paramCategory;
    try {
      return localStorage.getItem(GAMES_CATEGORY_KEY) || 'all';
    } catch (e) {
      return 'all';
    }
  });

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    try {
      localStorage.setItem(GAMES_CATEGORY_KEY, val);
    } catch (e) {
      console.warn('Error saving game category preference:', e);
    }
  };

  useEffect(() => {
    if (paramCategory) {
      setSelectedCategory((prev) => {
        if (prev !== paramCategory) {
          try {
            localStorage.setItem(GAMES_CATEGORY_KEY, paramCategory);
          } catch (e) {
            console.warn('Error saving game category preference:', e);
          }
          return paramCategory;
        }
        return prev;
      });
    }
  }, [paramCategory]);

  const [activeGame, setActiveGame] = useState(null);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('general'); // 'match' | 'flashcards' | 'general'
  const [liveTerms, setLiveTerms] = useState(() => getAllTerms());
  const [, setIsLoadingTerms] = useState(false);
  const navigate = useNavigate();

  // Canlı Firestore / API verilerini çekme ve yerel fallback mekanizması
  // Misafirde Firestore'a istek atılmaz, yerel senkronize paket kullanılır.
  useEffect(() => {
    if (!userIsLoggedIn) return;
    let isMounted = true;

    const fetchLiveTerms = async () => {
      try {
        setIsLoadingTerms(true);
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Firestore timeout')), 3000);
        });

        const targetSubcat = selectedCategory === 'movement_terms' ? 'motus' : selectedCategory;
        const termsQuery = selectedCategory === 'all'
          ? collection(db, 'terms')
          : query(collection(db, 'terms'), where('subcategory', '==', targetSubcat));

        const querySnapshot = await Promise.race([
          getDocs(termsQuery),
          timeoutPromise
        ]);
        if (timeoutId) clearTimeout(timeoutId);

        const rawTerms = [];
        querySnapshot.forEach((doc) => {
          rawTerms.push(doc.data());
        });

        if (rawTerms.length > 0 && isMounted) {
          const normalized = rawTerms.map((termItem) => ({
            id: termItem.id,
            term: termItem.term,
            turkish: termItem.english || termItem.turkish || '',
            turkishShort: termItem.turkishShort || '',
            definition: termItem.turkishDefinition || termItem.definition || '',
            turkishDefinition: termItem.turkishDefinition || termItem.definition || '',
            english: termItem.english || termItem.turkish || '',
            englishDefinition: termItem.englishDefinition || termItem.english || '',
            roots: termItem.roots || '',
            morphemes: termItem.morphemes || '',
            category: termItem.category || '',
            system: termItem.system || '',
            subcategory: termItem.subcategory === 'motus' ? 'movement_terms' : (termItem.subcategory || ''),
          }));

          setLiveTerms((prev) => {
            if (selectedCategory === 'all') {
              return normalized.sort((a, b) => Number(a.id) - Number(b.id));
            }
            const map = new Map(prev.map((t) => [t.id, t]));
            normalized.forEach((t) => map.set(t.id, t));
            return Array.from(map.values()).sort((a, b) => Number(a.id) - Number(b.id));
          });
        }
      } catch (error) {
        console.warn('Live terms fetch error/timeout, using local fallback:', error);
      } finally {
        if (isMounted) setIsLoadingTerms(false);
      }
    };

    fetchLiveTerms();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, userIsLoggedIn]);

  const categoryTerms = useMemo(() => {
    const baseList = liveTerms.length > 0 ? liveTerms : getAllTerms();

    if (selectedCategory === 'all') {
      return baseList;
    }

    const filtered = baseList.filter(
      (termItem) =>
        termItem.subcategory === selectedCategory ||
        termItem.category === selectedCategory ||
        termItem.system === selectedCategory
    );

    if (filtered.length > 0) {
      return filtered;
    }

    // Fallback to local category terms
    return getTermsByCategory(selectedCategory);
  }, [selectedCategory, liveTerms]);

  const eligibleMorphemeTerms = useMemo(() => {
    const baseList = liveTerms.length > 0 ? liveTerms : getAllTerms();
    return filterTermsForMorphemeGame(baseList);
  }, [liveTerms]);

  const morphemeCategories = useMemo(() => {
    return getEligibleMorphemeCategories(eligibleMorphemeTerms, GAME_CATEGORIES);
  }, [eligibleMorphemeTerms]);

  const [morphemeCategory, setMorphemeCategory] = useState('all');

  useEffect(() => {
    if (selectedCategory === 'all') {
      setMorphemeCategory('all');
    } else if (morphemeCategories.some((c) => c.id === selectedCategory)) {
      setMorphemeCategory(selectedCategory);
    } else {
      setMorphemeCategory('all');
    }
  }, [selectedCategory, morphemeCategories]);

  const morphemeFilteredTerms = useMemo(() => {
    return morphemeCategory === 'all'
      ? eligibleMorphemeTerms
      : eligibleMorphemeTerms.filter((termItem) =>
          termMatchesMorphemeCategory(termItem, morphemeCategory)
        );
  }, [eligibleMorphemeTerms, morphemeCategory]);

  const adaptedQuestions = useMemo(() => {
    return adaptTermsToMorphemeQuestions(morphemeFilteredTerms);
  }, [morphemeFilteredTerms]);

  const games = [
    {
      id: 'flashcards',
      title: t('flashcards'),
      description: t('flashcardDesc'),
      icon: BookOpen,
      color: 'from-primary to-primary-dark',
      path: '/flashcards'
    },
    {
      id: 'match',
      title: t('matchingGame'),
      description: t('matchDesc'),
      icon: Shuffle,
      color: 'from-secondary to-accent',
      path: '/match'
    },
    {
      id: 'quiz',
      title: t('quizMode'),
      description: t('quizDesc'),
      icon: Brain,
      color: 'from-accent to-success',
      path: '/quiz'
    },
    {
      id: 'morpheme',
      title: t('morphemeBuilder'),
      description: t('morphemeDesc'),
      icon: Puzzle,
      color: 'from-violet-500 to-purple-600',
      path: '/morpheme'
    }
  ];

  const getCategoryParam = () => {
    return selectedCategory === 'all' ? '' : `?category=${selectedCategory}`;
  };

  const getTrialForGame = useCallback(
    (gameId) =>
      getGameTrialState({
        gameId,
        isLoggedIn: userIsLoggedIn,
        uid: currentUid,
        isPro,
        hasPlan,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userIsLoggedIn, currentUid, isPro, hasPlan, trialTick]
  );

  const handleInlineRoundStart = useCallback(
    (gameId) => {
      consumeGameTrial({
        gameId,
        isLoggedIn: userIsLoggedIn,
        uid: currentUid,
        isPro,
        hasPlan,
      });
      setTrialTick((n) => n + 1);
    },
    [userIsLoggedIn, currentUid, isPro, hasPlan]
  );

  const handleInlineBack = useCallback(() => {
    setActiveGame(null);
    setTrialTick((n) => n + 1);
  }, []);

  const handleGamePlayClick = (e, gameId, gamePath) => {
    const trial = getTrialForGame(gameId);

    if (trial.mode === 'paid_locked') {
      e.preventDefault();
      const gameObj = games.find((g) => g.id === gameId);
      toast.info(
        isTr
          ? `${gameObj?.title || 'Bu oyun'} modu Pro ve üzeri planlara özeldir. Flashcard ve Eşleştirme oyunları Temel paketinde açıktır.`
          : `${gameObj?.title || 'This game'} mode is exclusive to Pro and above plans. Flashcards and Matching games are available in your Basic plan.`
      );
      navigate('/pricing');
      return;
    }

    if ((trial.mode === 'guest' || trial.mode === 'free_weekly') && !trial.canPlay) {
      e.preventDefault();
      return;
    }

    if (!userIsLoggedIn && gameId === 'flashcards') {
      const guestDaily = getFlashcardGuestDailyInfo();
      if (!guestDaily.canPlay) {
        e.preventDefault();
        setModalMode('flashcards');
        setIsLimitModalOpen(true);
        return;
      }
    }

    if (INLINE_GAMES.includes(gameId)) {
      setActiveGame(gameId);
    } else {
      navigate(`${gamePath}${getCategoryParam()}`);
    }
  };

  const activeTrial = activeGame ? getTrialForGame(activeGame) : null;

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Active Game Render View */}
        {activeGame === 'morpheme' ? (
          <MorphemeGameFable
            terms={adaptedQuestions}
            language={currentLanguage}
            onBack={handleInlineBack}
            t={t}
            trialMode={activeTrial?.mode || 'none'}
            trialRemaining={activeTrial?.remaining ?? Infinity}
            onRoundStart={() => handleInlineRoundStart('morpheme')}
            categories={morphemeCategories}
            selectedCategory={morphemeCategory}
            onCategoryChange={setMorphemeCategory}
          />
        ) : activeGame === 'quiz' ? (
          <QuizGameFable
            terms={categoryTerms}
            categoryId={selectedCategory}
            language={currentLanguage}
            onBack={handleInlineBack}
            t={t}
            trialMode={activeTrial?.mode || 'none'}
            trialRemaining={activeTrial?.remaining ?? Infinity}
            onRoundStart={() => handleInlineRoundStart('quiz')}
          />
        ) : (
          <>
            {/* Guest Banner */}
            {!userIsLoggedIn && (
              <div className="mb-8 p-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3 text-amber-900 dark:text-amber-200">
                  <div className="p-2.5 bg-amber-500/20 rounded-xl">
                    <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{t('guestMode')}</h3>
                  </div>
                </div>
                <Link
                  to="/register"
                  onClick={() => { try { sessionStorage.removeItem('healthlex_selected_plan'); } catch (e) {} }}
                >
                  <Button size="sm" className="gradient-primary whitespace-nowrap shadow-md">
                    <UserPlus className="w-4 h-4 mr-2" />
                    {t('unlimitedPlaySignUp')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t('gamesHeader')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t('gamesSub')}
              </p>

              {/* Category Selector */}
              <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
                <span className="text-sm font-medium text-muted-foreground">{t('category')}:</span>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder={t('selectCategoryPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('allCategories')}</SelectItem>

                    {GAME_CATEGORIES.map((cat) => {
                      return (
                        <SelectItem key={cat.id} value={cat.id}>
                          {t(cat.key, cat.name)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Info Note */}
              <div className="mt-4 max-w-2xl mx-auto px-4 py-3 rounded-xl border border-primary/25 bg-primary/5 flex items-start gap-3 text-left">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Kartlar seçtiğin kategorinin tüm terimlerinden gelir. Bilmediğin terimler çıkması normal; her terimin parçaları kartta yazıyor, onlardan çözmeye çalış.
                </p>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {games.map((game) => {
                const Icon = game.icon;
                const trial = getTrialForGame(game.id);
                const isPaidLocked = trial.mode === 'paid_locked';
                const isGuestTrial = trial.mode === 'guest';
                const isFreeWeekly = trial.mode === 'free_weekly';
                const isTrialMode = isGuestTrial || isFreeWeekly;
                const isTrialExhausted = isTrialMode && !trial.canPlay;
                const trialText = isTrialMode ? getTrialRemainingText(trial.mode, trial.remaining, currentLanguage) : '';
                const isMatch = game.id === 'match';

                return (
                  <Card
                    key={game.id}
                    className={`group flex flex-col justify-between transition-all duration-300 ${
                      isPaidLocked
                        ? 'opacity-90 border-dashed hover:border-amber-500/50'
                        : isTrialExhausted
                        ? 'opacity-95 border-border'
                        : 'hover:shadow-2xl hover:-translate-y-2'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        {isPaidLocked && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            <Lock className="w-3 h-3" />
                            {isMatch ? (isTr ? 'Temel' : 'Basic') : (isTr ? 'Pro / Ömür Boyu' : 'Pro / Lifetime')}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-2xl">{game.title}</CardTitle>
                      <CardDescription className="text-base">{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isPaidLocked ? (
                        <Button
                          onClick={(e) => handleGamePlayClick(e, game.id, game.path)}
                          className="w-full transition-all cursor-pointer bg-muted hover:bg-amber-500/15 text-foreground border border-border hover:border-amber-500/40"
                        >
                          <Lock className="mr-2 w-4 h-4 text-amber-500" />
                          {isMatch
                            ? (isTr ? 'Temel ve Üzeri ile Aç' : 'Unlock with Basic & Above')
                            : (isTr ? 'Pro ve Üzeri' : 'Pro & Above')}
                        </Button>
                      ) : isTrialExhausted ? (
                        <div className="space-y-2.5 text-center">
                          <p className="text-sm font-medium text-foreground">
                            {trialText}
                          </p>
                          {isGuestTrial ? (
                            <>
                              <Button asChild className="w-full gradient-primary shadow-md">
                                <Link
                                  to={`/register?from=games-${game.id}`}
                                  onClick={() => { try { sessionStorage.removeItem('healthlex_selected_plan'); } catch (e) {} }}
                                >
                                  Ücretsiz hesap aç
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                              </Button>
                              <div>
                                <Link
                                  to={`/login?from=games-${game.id}`}
                                  className="text-xs text-primary font-medium hover:underline"
                                >
                                  Giriş yap
                                </Link>
                              </div>
                            </>
                          ) : (
                            <Button asChild className="w-full gradient-primary shadow-md">
                              <Link to={`/pricing?from=games-${game.id}`}>
                                Planları gör
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      ) : (
                        <>
                          <Button
                            onClick={(e) => handleGamePlayClick(e, game.id, game.path)}
                            className="w-full transition-all cursor-pointer gradient-primary group-hover:shadow-lg"
                          >
                            {isGuestTrial ? 'Dene' : isFreeWeekly ? 'Oyna' : t('play')}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          {trialText && (
                            <p className="text-xs text-muted-foreground text-center mt-2">
                              {trialText}
                            </p>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

          </>
        )}

        <GuestLimitModal
          isOpen={isLimitModalOpen}
          onClose={() => setIsLimitModalOpen(false)}
          title={
            modalMode === 'match'
              ? t('guestMatchLockedTitle', 'Eşleştirme Oyunu Kayıtlı Kullanıcılara Özeldir! 🎯')
              : modalMode === 'flashcards' || (!userIsLoggedIn && !getFlashcardGuestDailyInfo().canPlay)
              ? t('guestFlashcardDailyLimitTitle', 'Günlük Ücretsiz Kelime Kartı Hakkın Doldu! 🎯')
              : undefined
          }
          description={
            modalMode === 'match'
              ? t('guestMatchLockedDesc', 'Eşleştirme oyunu yalnızca kayıtlı üyelere açıktır. Terimleri eşleştirerek pratik yapmak ve skorlarını kaydetmek için lütfen ücretsiz kayıt ol.')
              : modalMode === 'flashcards' || (!userIsLoggedIn && !getFlashcardGuestDailyInfo().canPlay)
              ? t('guestFlashcardDailyLimitDesc', 'Misafir kullanıcılar günde en fazla 5 kelime kartı çalışması yapabilir. Sınırsız pratik yapmak için lütfen ücretsiz üye ol.')
              : undefined
          }
          cardTitle={
            modalMode === 'match'
              ? t('guestMatchCardTitle', 'Ücretsiz Üye Ol & Eşleştirmeye Başla')
              : modalMode === 'flashcards' || (!userIsLoggedIn && !getFlashcardGuestDailyInfo().canPlay)
              ? t('guestLimitCardTitle', 'Ücretsiz Üye Ol')
              : undefined
          }
          cardDesc={
            modalMode === 'match'
              ? t('guestMatchCardDesc', 'Ücretsiz üyelik oluşturarak Eşleştirme ve Flashcard oyunlarına erişebilir, ilerlemeni tüm cihazlarında takip edebilirsin.')
              : modalMode === 'flashcards' || (!userIsLoggedIn && !getFlashcardGuestDailyInfo().canPlay)
              ? t('guestLimitCardDesc', 'Üye olarak sınırsız kelime kartı çalışabilir ve ilerlemeni tüm cihazlarında senkronize edebilirsin.')
              : undefined
          }
        />

      </div>
    </div>
  );
};