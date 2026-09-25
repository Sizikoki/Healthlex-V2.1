import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, Shuffle, Brain, ArrowRight, Puzzle, UserPlus, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isLoggedIn, canGuestPlay, getGuestTrialInfo, getFlashcardGuestDailyInfo, getUser } from '@/utils/storage';
import { GuestLimitModal } from '@/components/GuestLimitModal';
import { useLanguage } from '@/context/LanguageContext';
import { auth, db } from '@/firebase/config';
import { collection, getDocs, query, where, doc, onSnapshot } from 'firebase/firestore';
import { getAllTerms, getTermsByCategory } from '@/data/medicalTerms';
import { adaptTermsToMorphemeQuestions } from '@/utils/morphemeAdapter';
import MorphemeGameFable from '@/components/games/MorphemeGameFable';
import QuizGameFable from '@/components/games/QuizGameFable';
import { isGameUnlocked, isGameUnlockedForGuest, checkIsPro, checkHasPaidPlan, getPreviewRole } from '@/utils/planAccess';
import { updateCanonicalUrl } from '@/utils/seo';
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
  const [isPro, setIsPro] = useState(previewRole === 'pro');
  const [hasPlan, setHasPlan] = useState(previewRole === 'pro' || previewRole === 'basic');

  useEffect(() => {
    updateCanonicalUrl('https://www.healthlexmed.com/games');
  }, []);

  useEffect(() => {
    if (previewRole) return;

    const unsubAuth = auth.onAuthStateChanged((firebaseUser) => {
      const targetUser = firebaseUser || getUser();
      const uid = targetUser?.uid;

      if (!uid) {
        const localUser = getUser();
        setIsPro(checkIsPro(localUser));
        setHasPlan(checkHasPaidPlan(localUser));
        return;
      }

      if (checkHasPaidPlan(targetUser)) {
        setHasPlan(true);
      }

      try {
        const userDocRef = doc(db, 'users', uid);
        const unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setIsPro(checkIsPro(data));
            setHasPlan(checkHasPaidPlan(data));
          } else {
            setIsPro(checkIsPro(targetUser));
            setHasPlan(checkHasPaidPlan(targetUser));
          }
        }, (err) => {
          console.warn('[Games] Could not check pro/plan status:', err);
        });
        return () => unsubDoc();
      } catch (e) {
        console.warn('[Games] Error checking pro/plan status:', e);
      }
    });

    return () => unsubAuth();
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
    if (!hasPlan && gameId === 'match') {
      e.preventDefault();
      toast.info(
        isTr
          ? 'Eşleştirme oyunu Temel ve üzeri planlara özeldir. Flashcard oyunu misafir kullanımına açıktır.'
          : 'Matching game is exclusive to Basic and above plans. Flashcards are available in guest mode.'
      );
      navigate('/pricing');
      return;
    }

    if (!isGameUnlocked(gameId, isPro, hasPlan)) {
      e.preventDefault();
      const gameObj = games.find((g) => g.id === gameId);
      toast.info(
        isTr
          ? `${gameObj?.title || 'Bu oyun'} modu Pro ve üzeri planlara özeldir. Flashcard ve Eşleştirme oyunları Temel paketinizde açıktır.`
          : `${gameObj?.title || 'This game'} mode is exclusive to Pro and above plans. Flashcards and Matching games are available in your Basic plan.`
      );
      navigate('/pricing');
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

    if (!userIsLoggedIn && !canGuestPlay()) {
      e.preventDefault();
      setModalMode('general');
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
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {games.map((game) => {
                const Icon = game.icon;
                const locked = !isGameUnlocked(game.id, isPro, hasPlan);
                const isMatch = game.id === 'match';
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
                            {isMatch ? (isTr ? 'Temel' : 'Basic') : (isTr ? 'Pro / Ömür Boyu' : 'Pro / Lifetime')}
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
                            {isMatch
                              ? (isTr ? 'Temel ve Üzeri ile Aç' : 'Unlock with Basic & Above')
                              : (isTr ? 'Pro ve Üzeri' : 'Pro & Above')}
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
          title={
            modalMode === 'match'
              ? t('guestMatchLockedTitle', 'Eşleştirme Oyunu Kayıtlı Kullanıcılara Özeldir! 🎯')
              : modalMode === 'flashcards' || (!userIsLoggedIn && !getFlashcardGuestDailyInfo().canPlay)
              ? t('guestFlashcardDailyLimitTitle', 'Günlük Ücretsiz Kelime Kartı Hakkınız Doldu! 🎯')
              : undefined
          }
          description={
            modalMode === 'match'
              ? t('guestMatchLockedDesc', 'Eşleştirme oyunu yalnızca kayıtlı üyelere açıktır. Terimleri eşleştirerek pratik yapmak ve skorlarınızı kaydetmek için lütfen ücretsiz kayıt olun.')
              : modalMode === 'flashcards' || (!userIsLoggedIn && !getFlashcardGuestDailyInfo().canPlay)
              ? (userIsLoggedIn
                  ? t('userFlashcardDailyLimitDesc', 'Günlük en fazla 5 kelime kartı çalışması hakkınız doldu. Sınırsız pratik yapmak ve tüm içeriklere erişmek için lütfen planınızı yükseltin.')
                  : t('guestFlashcardDailyLimitDesc', 'Misafir kullanıcılar günde en fazla 5 kelime kartı çalışması yapabilir. Sınırsız pratik yapmak için lütfen planınızı yükseltin.'))
              : undefined
          }
          cardTitle={
            modalMode === 'match'
              ? t('guestMatchCardTitle', 'Ücretsiz Üye Olun & Eşleştirmeye Başlayın')
              : modalMode === 'flashcards' || (!userIsLoggedIn && !getFlashcardGuestDailyInfo().canPlay)
              ? (userIsLoggedIn ? t('upgradePlanCardTitle', 'Planınızı Yükseltin') : t('guestLimitCardTitle', 'Ücretsiz Üye Olun'))
              : undefined
          }
          cardDesc={
            modalMode === 'match'
              ? t('guestMatchCardDesc', 'Ücretsiz üyelik oluşturarak Eşleştirme ve Flashcard oyunlarına erişebilir, ilerlemenizi tüm cihazlarınızda takip edebilirsiniz.')
              : modalMode === 'flashcards' || (!userIsLoggedIn && !getFlashcardGuestDailyInfo().canPlay)
              ? (userIsLoggedIn
                  ? t('upgradePlanCardDesc', 'Temel veya Pro plana geçerek tüm kelime kartlarına ve oyunlara sınırsız erişebilirsiniz.')
                  : t('guestLimitCardDesc', 'Üye olarak ilerlemenizi senkronize edebilir ve platform özelliklerinden faydalanabilirsiniz.'))
              : undefined
          }
        />

      </div>
    </div>
  );
};