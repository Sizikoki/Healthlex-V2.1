import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, Shuffle, Brain, ArrowRight, Puzzle, UserPlus, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isLoggedIn, canGuestPlay, getGuestTrialInfo, getUser } from '@/utils/storage';
import { GuestLimitModal } from '@/components/GuestLimitModal';
import { useLanguage } from '@/context/LanguageContext';
import { auth, db } from '@/firebase/config';
import { collection, getDocs, query, where, doc, onSnapshot } from 'firebase/firestore';
import { getAllTerms, getTermsByCategory } from '@/data/medicalTerms';
import { adaptTermsToMorphemeQuestions } from '@/utils/morphemeAdapter';
import MorphemeGameFable from '@/components/games/MorphemeGameFable';
import QuizGameFable from '@/components/games/QuizGameFable';
import { isGameUnlocked, isCategoryUnlocked, UNLOCKED_CATEGORY_IDS, checkIsPro } from '@/utils/planAccess';
import { toast } from 'sonner';

const GAMES_CATEGORY_KEY = 'healthlex_selected_game_category';

const GAME_CATEGORIES = [
  { id: 'skull_bones', key: 'skullBones', name: 'Kafatası Kemikleri' },
  { id: 'face_bones', key: 'faceBones', name: 'Yüz Kemikleri' },
  { id: 'trunk_bones', key: 'trunkBones', name: 'Gövde Kemikleri' },
  { id: 'upper_extremity_bones', key: 'upperExtremityBones', name: 'Üst Extremite Kemikleri' },
  { id: 'upper_extremity_joints', key: 'upperExtremityJoints', name: 'Üst Ekstremite Eklemleri' },
  { id: 'lower_extremity_bones', key: 'lowerExtremityBones', name: 'Alt Extremite Kemikleri' },
  { id: 'lower_extremity_joints', key: 'lowerExtremityJoints', name: 'Alt Ekstremite Eklemleri' },
  { id: 'spine_joints', key: 'spineJoints', name: 'Omurga Eklemleri' },
  { id: 'head_and_neck_joints', key: 'headAndNeckJoints', name: 'Kafa ve Boyun Eklemleri' },
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
  const previewRole = typeof window !== 'undefined'
    ? (new URLSearchParams(window.location.search).get('previewRole') || localStorage.getItem('healthlex_preview_role'))
    : null;
  const [isPro, setIsPro] = useState(previewRole === 'pro');

  useEffect(() => {
    if (previewRole) return;
    const uid = auth?.currentUser?.uid || getUser()?.uid;
    if (!uid) {
      const localUser = getUser();
      setIsPro(checkIsPro(localUser));
      return;
    }

    try {
      const userDocRef = doc(db, 'users', uid);
      const unsub = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setIsPro(checkIsPro(docSnap.data()));
        } else {
          setIsPro(false);
        }
      }, (err) => {
        console.warn('[Games] Could not check pro status:', err);
      });
      return () => unsub();
    } catch (e) {
      console.warn('[Games] Error checking pro status:', e);
    }
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
    if (!isPro && val !== 'all' && !isCategoryUnlocked(val, isPro)) {
      toast.info(
        isTr
          ? 'Bu kategori Pro üyelere özeldir. Temel pakette ilk 3 kategori (Kafatası, Yüz ve Gövde Kemikleri) açıktır.'
          : 'This category is exclusive to Pro. The first 3 categories are unlocked in the Basic plan.'
      );
      navigate('/pricing');
      return;
    }
    setSelectedCategory(val);
    try {
      localStorage.setItem(GAMES_CATEGORY_KEY, val);
    } catch (e) {
      console.warn('Error saving game category preference:', e);
    }
  };

  useEffect(() => {
    if (paramCategory) {
      if (!isPro && paramCategory !== 'all' && !isCategoryUnlocked(paramCategory, isPro)) {
        return;
      }
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
  }, [paramCategory, isPro]);

  useEffect(() => {
    if (!isPro && selectedCategory !== 'all' && !isCategoryUnlocked(selectedCategory, isPro)) {
      setSelectedCategory('all');
      try {
        localStorage.setItem(GAMES_CATEGORY_KEY, 'all');
      } catch (e) {}
    }
  }, [isPro, selectedCategory]);

  const [activeGame, setActiveGame] = useState(null);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [liveTerms, setLiveTerms] = useState(() => getAllTerms());
  const [, setIsLoadingTerms] = useState(false);
  const navigate = useNavigate();

  const userIsLoggedIn = isLoggedIn();
  const trialInfo = getGuestTrialInfo();

  // Canlı Firestore / API verilerini çekme ve yerel fallback mekanizması
  useEffect(() => {
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
  }, [selectedCategory]);

  const categoryTerms = useMemo(() => {
    let baseList = liveTerms.length > 0 ? liveTerms : getAllTerms();

    // Temel planda oyunlarda sadece açık olan 3 kategorideki terimler gösterilsin
    if (!isPro) {
      baseList = baseList.filter(
        (t) =>
          UNLOCKED_CATEGORY_IDS.includes(t.subcategory) ||
          UNLOCKED_CATEGORY_IDS.includes(t.category) ||
          UNLOCKED_CATEGORY_IDS.includes(t.system)
      );
    }

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
    const local = getTermsByCategory(selectedCategory);
    if (!isPro) {
      return local.filter(
        (t) =>
          UNLOCKED_CATEGORY_IDS.includes(t.subcategory) ||
          UNLOCKED_CATEGORY_IDS.includes(t.category) ||
          UNLOCKED_CATEGORY_IDS.includes(t.system)
      );
    }
    return local;
  }, [selectedCategory, liveTerms, isPro]);

  const adaptedQuestions = useMemo(() => {
    return adaptTermsToMorphemeQuestions(categoryTerms);
  }, [categoryTerms]);

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

  const handleGamePlayClick = (e, gameId, gamePath) => {
    if (!isPro && !isGameUnlocked(gameId, isPro)) {
      e.preventDefault();
      const gameObj = games.find((g) => g.id === gameId);
      toast.info(
        isTr
          ? `${gameObj?.title || 'Bu oyun'} modu Pro plana özeldir. Flashcard ve Eşleştirme oyunları Temel paketinizde açıktır.`
          : `${gameObj?.title || 'This game'} mode is exclusive to Pro. Flashcards and Matching games are available in your Basic plan.`
      );
      navigate('/pricing');
      return;
    }

    if (!userIsLoggedIn && !canGuestPlay()) {
      e.preventDefault();
      setIsLimitModalOpen(true);
      return;
    }

    if (INLINE_GAMES.includes(gameId)) {
      setActiveGame(gameId);
    } else {
      navigate(`${gamePath}${getCategoryParam()}`);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Active Game Render View */}
        {activeGame === 'morpheme' ? (
          <MorphemeGameFable
            terms={adaptedQuestions}
            language={currentLanguage}
            onBack={() => setActiveGame(null)}
            t={t}
          />
        ) : activeGame === 'quiz' ? (
          <QuizGameFable
            terms={categoryTerms}
            categoryId={selectedCategory}
            language={currentLanguage}
            onBack={() => setActiveGame(null)}
            t={t}
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
                    <p className="text-sm opacity-90">
                      {t('guestPlaysRemaining')}{' '}
                      <strong className="text-amber-700 dark:text-amber-300 font-bold">
                        {trialInfo.isExpired
                          ? t('trialExpired', 'Süre Doldu')
                          : `${trialInfo.daysLeft} ${t('guestDaysRemaining', 'gün kaldı')}`}
                      </strong>
                    </p>
                  </div>
                </div>
                <Link to="/register">
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

                    {(isPro ? GAME_CATEGORIES : GAME_CATEGORIES.slice(0, 3)).map((cat) => {
                      return (
                        <SelectItem key={cat.id} value={cat.id}>
                          {t(cat.key, cat.name)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {games.map((game) => {
                const Icon = game.icon;
                const locked = !isPro && !isGameUnlocked(game.id, isPro);
                return (
                  <Card key={game.id} className={`group transition-all duration-300 ${locked ? 'opacity-90 border-dashed hover:border-amber-500/50' : 'hover:shadow-2xl hover:-translate-y-2'}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        {locked && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            <Lock className="w-3 h-3" />
                            Pro
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-2xl">{game.title}</CardTitle>
                      <CardDescription className="text-base">{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={(e) => handleGamePlayClick(e, game.id, game.path)}
                        className={`w-full transition-all cursor-pointer ${
                          locked
                            ? 'bg-muted hover:bg-amber-500/15 text-foreground border border-border hover:border-amber-500/40'
                            : 'gradient-primary group-hover:shadow-lg'
                        }`}
                      >
                        {locked ? (
                          <>
                            <Lock className="mr-2 w-4 h-4 text-amber-500" />
                            {isTr ? 'Pro ile Aç' : 'Unlock with Pro'}
                          </>
                        ) : (
                          <>
                            {t('play')}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
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
        />

      </div>
    </div>
  );
};