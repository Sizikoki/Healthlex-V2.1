import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, RotateCw, ChevronRight, Check, X, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getRandomTerms, getAllTerms } from '@/data/medicalTerms';
import { saveProgress, saveFlashcardSession, updateStreak, isLoggedIn, getFlashcardGuestDailyInfo, incrementFlashcardGuestPlay, getFlashcardGuestRestartInfo, incrementFlashcardGuestRestart, MAX_GUEST_DAILY_FLASHCARDS, MAX_GUEST_DAILY_RESTARTS, getUser } from '@/utils/storage';
import { auth, db } from '@/firebase/config';
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { formatMedicalTerm } from '@/utils/format';
import { GuestLimitModal } from '@/components/GuestLimitModal';
import { parseRootsToMorphemes } from '@/utils/termHelper';
import { useLanguage } from '@/context/LanguageContext';
import { getPreviewRole } from '@/utils/planAccess';
import { updateCanonicalUrl } from '@/utils/seo';

export const Flashcards = () => {
  const { currentLanguage, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get('category');
  const fromParam = searchParams.get('from');

  const previewRole = getPreviewRole();
  const initialUser = getUser();
  const initialUid = initialUser?.uid || auth?.currentUser?.uid;
  // Giriş yapmış kullanıcıda planReady=false başlar, ilk onSnapshot cevabında true olur. Misafirde baştan true.
  const [planReady, setPlanReady] = useState(() => (previewRole ? true : !Boolean(initialUid)));
  const [currentUserData, setCurrentUserData] = useState(() => getUser());
  const isUserLoggedIn = Boolean(previewRole || currentUserData?.uid || auth?.currentUser?.uid || isLoggedIn());
  const isLimited = !isUserLoggedIn;

  useEffect(() => {
    if (previewRole) {
      setPlanReady(true);
      return;
    }

    let unsubDoc = null;

    const unsubAuth = auth.onAuthStateChanged((firebaseUser) => {
      // Önceki Firestore dinleyicisi varsa kapat (yeni dinleyici açmadan önce veya auth değiştiğinde)
      if (unsubDoc) {
        unsubDoc();
        unsubDoc = null;
      }

      const targetUser = firebaseUser || getUser();
      const uid = targetUser?.uid;

      if (!uid) {
        setCurrentUserData(null);
        setPlanReady(true);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', uid);
        unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setCurrentUserData(docSnap.data());
          } else {
            setCurrentUserData(targetUser);
          }
          setPlanReady(true);
        }, (err) => {
          console.warn('[Flashcards] Could not check live user plan status:', err);
          setCurrentUserData(targetUser);
          setPlanReady(true);
        });
      } catch (e) {
        console.warn('[Flashcards] Error setting up user listener:', e);
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

  useEffect(() => {
    if (!planReady) return;
    if (!isLimited) {
      setShowGuestModal(false);
      setLoading(false);
    } else {
      const guestInfo = getFlashcardGuestDailyInfo();
      setGuestPlayInfo(guestInfo);
      if (!guestInfo.canPlay) {
        setShowGuestModal(true);
      }
    }
  }, [isLimited, planReady]);

  const [terms, setTerms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [completedSummary, setCompletedSummary] = useState(null);

  const initialGuestInfo = (planReady && isLimited) ? getFlashcardGuestDailyInfo() : { canPlay: true, remaining: MAX_GUEST_DAILY_FLASHCARDS };
  const [loading, setLoading] = useState(!planReady || initialGuestInfo.canPlay);
  const [showGuestModal, setShowGuestModal] = useState(planReady && isLimited && !initialGuestInfo.canPlay);
  const [guestModalType, setGuestModalType] = useState('play'); // 'play' | 'restart'
  // Misafir kalan hak sayıları (reaktif state)
  const [guestPlayInfo, setGuestPlayInfo] = useState(
    (planReady && isLimited) ? initialGuestInfo : { remaining: MAX_GUEST_DAILY_FLASHCARDS, canPlay: true }
  );
  const [guestRestartInfo, setGuestRestartInfo] = useState(
    (planReady && isLimited) ? getFlashcardGuestRestartInfo() : { remaining: MAX_GUEST_DAILY_RESTARTS, canRestart: true }
  );

  const loadTerms = useCallback(async (isRestart = false, isLanguageChange = false) => {
    if (!planReady) return;
    // Limit kontrolü: plan almamış herkes (anonim misafir veya kayıtlı ama plansız)
    // Dil değişiminde yeni oyun sayılmaz, kota/sayaç tüketilmez
    if (isLimited && !isLanguageChange) {
      if (isRestart) {
        // Restart hakkını kontrol et ve tüket
        const restartInfo = getFlashcardGuestRestartInfo();
        if (!restartInfo.canRestart) {
          setGuestModalType('restart');
          setShowGuestModal(true);
          return;
        }
        const newRestartInfo = incrementFlashcardGuestRestart();
        setGuestRestartInfo(newRestartInfo);
      } else {
        // Oynama hakkını kontrol et ve tüket
        const guestDaily = getFlashcardGuestDailyInfo();
        if (!guestDaily.canPlay) {
          setGuestModalType('play');
          setShowGuestModal(true);
          setLoading(false);
          return;
        }
        const newPlayInfo = incrementFlashcardGuestPlay();
        setGuestPlayInfo(newPlayInfo);
      }
    }

    try {
      setLoading(true);
      let timeoutId;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Firestore timeout')), 3000);
      });

      const querySnapshot = await Promise.race([
        getDocs(collection(db, 'terms')),
        timeoutPromise
      ]);
      if (timeoutId) clearTimeout(timeoutId);

      let rawTerms = [];
      querySnapshot.forEach((doc) => {
        rawTerms.push(doc.data());
      });

      if (rawTerms.length === 0) {
        rawTerms = getAllTerms();
      }

      let filteredTerms = rawTerms;
      if (categoryId && categoryId !== 'all') {
        filteredTerms = rawTerms.filter(t => t.category === categoryId);
        if (filteredTerms.length === 0) {
          filteredTerms = rawTerms.filter(t => t.system === categoryId || t.subcategory === categoryId);
        }
      }

      if (filteredTerms.length === 0) {
        filteredTerms = rawTerms;
      }

      const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5);
      setTerms(shuffled.slice(0, Math.min(20, shuffled.length)));
    } catch (error) {
      console.error('Error fetching terms in Flashcards:', error);
      const selectedTerms = getRandomTerms(20, categoryId);
      setTerms(selectedTerms);
    } finally {
      setLoading(false);
    }
  }, [categoryId, isLimited, planReady]);

  const lastLoadedKeyRef = useRef('');

  useEffect(() => {
    updateCanonicalUrl('https://www.healthlexmed.com/flashcards');
    if (!planReady) return;

    const currentKey = `${categoryId || 'all'}|${currentLanguage}`;
    if (lastLoadedKeyRef.current === currentKey) return;

    const previousKey = lastLoadedKeyRef.current;
    lastLoadedKeyRef.current = currentKey;

    // Dil değişimi kontrolü: Eğer sadece dil değiştiyse (önceki bir anahtar vardı ve kategori aynı)
    // günlük oyun hakkı sayacı artırılmamalı.
    const isLanguageChangeOnly = Boolean(previousKey) && previousKey.split('|')[0] === (categoryId || 'all');

    loadTerms(false, isLanguageChangeOnly);
    updateStreak();
  }, [planReady, categoryId, currentLanguage, loadTerms]);

  const currentTerm = terms[currentIndex];
  const progress = terms.length > 0 ? ((currentIndex) / terms.length) * 100 : 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    if (currentTerm) {
      saveProgress(currentTerm.id, true);
      setLearnedCount(learnedCount + 1);
    }
    goToNext(true);
  };

  const handleDontKnow = () => {
    setSkippedCount(skippedCount + 1);
    goToNext(false);
  };

  const goToNext = (wasLearned) => {
    setIsFlipped(false);
    const finalLearned = wasLearned ? learnedCount + 1 : learnedCount;
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete
      saveFlashcardSession(categoryId || 'all', finalLearned, terms.length);
      setCompletedSummary({ learned: finalLearned, total: terms.length });
    }
  };

  const handleRestart = () => {
    setCompletedSummary(null);
    setCurrentIndex(0);
    setIsFlipped(false);
    setLearnedCount(0);
    setSkippedCount(0);
    setShowGuestModal(false);
    loadTerms(true, false); // isRestart=true, isLanguageChange=false
  };

  if (!planReady || loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">{t('loadingCards')}</h3>
          <p className="text-muted-foreground">{t('fetchingTerms')}</p>
        </Card>
      </div>
    );
  }

  if (showGuestModal) {
    const isRestartLimit = guestModalType === 'restart';
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <GuestLimitModal
          isOpen={true}
          onClose={() => isRestartLimit ? setShowGuestModal(false) : navigate('/games')}
          title={
            isRestartLimit
              ? t('guestFlashcardRestartLimitTitle', 'Günlük Yeniden Başlatma Hakkın Doldu! 🔄')
              : t('guestFlashcardDailyLimitTitle', 'Günlük Ücretsiz Kelime Kartı Hakkın Doldu! 🎯')
          }
          description={
            isRestartLimit
              ? t('guestFlashcardRestartLimitDesc', `Misafir kullanıcılar günde en fazla ${MAX_GUEST_DAILY_RESTARTS} kez yeniden başlatabilir. Sınırsız pratik yapmak için lütfen ücretsiz üye ol.`)
              : t('guestFlashcardDailyLimitDesc', `Misafir kullanıcılar günde en fazla ${MAX_GUEST_DAILY_FLASHCARDS} kelime kartı çalışması yapabilir. Sınırsız pratik yapmak ve ilerlemeni kaydetmek için lütfen ücretsiz üye ol.`)
          }
          cardTitle={t('guestLimitCardTitle', 'Ücretsiz Üye Ol')}
          cardDesc={t('guestLimitCardDesc', 'Kayıt olarak sınırsız kelime kartı çalışabilir ve ilerlemeni tüm cihazlarında senkronize edebilirsin.')}
        />
      </div>
    );
  }

  if (completedSummary) {
    const registerUrl = `/register?from=${encodeURIComponent(fromParam || 'flashcards-end')}`;
    const gamesUrl = categoryId && categoryId !== 'all' ? `/games?category=${categoryId}` : '/games';

    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-6 sm:p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-[#0f1b33] mb-2">
            Desteyi bitirdin
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            {completedSummary.learned}/{completedSummary.total} terimi biliyorum dedin.
          </p>

          {!isUserLoggedIn && (
            <div className="mb-6 p-4 rounded-xl bg-muted/40 border border-border text-left sm:text-center">
              <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                Ücretsiz hesapla ilerlemen kaydedilir, kartlarla sınırsız çalışırsın.
              </p>
              <Link
                to={registerUrl}
                onClick={() => { try { sessionStorage.removeItem('healthlex_selected_plan'); } catch (e) {} }}
                className="w-full min-h-[48px] inline-flex items-center justify-center rounded-lg bg-[#0f1b33] hover:bg-[#1b2d52] text-white font-semibold text-base px-5 py-3 transition-colors"
              >
                Ücretsiz hesap aç
              </Link>
              <div className="mt-3 text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Zaten hesabım var, giriş yap
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleRestart}
              className="w-full min-h-[48px]"
            >
              Tekrar çalış
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full min-h-[48px]"
            >
              <Link to={gamesUrl}>Oyunlara dön</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (terms.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-destructive">{t('error', 'Hata')}</h3>
          <p className="text-muted-foreground mb-4">{t('noTermsInCategory')}</p>
          <Button asChild className="gradient-primary">
            <Link to={categoryId && categoryId !== 'all' ? `/games?category=${categoryId}` : '/games'}>{t('backToGames')}</Link>
          </Button>
        </Card>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-muted/30 pt-8 pb-24 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(categoryId && categoryId !== 'all' ? `/games?category=${categoryId}` : '/games')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToGames')}
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t('flashcards')}</h1>
              <p className="text-muted-foreground">{t('cardCount')} {currentIndex + 1} / {terms.length}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Sınırlı kullanıcı (misafir/basic) restart hakkı göstergesi */}
              {isLimited && (
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${
                  guestRestartInfo.remaining <= 2
                    ? 'bg-orange-50 border-orange-200 text-orange-700'
                    : 'bg-muted border-border text-muted-foreground'
                }`}>
                  <RotateCw className="w-3 h-3" />
                  <span>{guestRestartInfo.remaining}/{MAX_GUEST_DAILY_RESTARTS}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={handleRestart}
                disabled={isLimited && !guestRestartInfo.canRestart}
                title={isLimited ? `${guestRestartInfo.remaining} restart hakkın kaldı` : t('restart', 'Yeniden Başlat')}
              >
                <RotateCw className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="flex items-center gap-4 mt-4 text-sm flex-wrap">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-success" />
              <span>{t('learnedLabel')}: {learnedCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <X className="w-4 h-4 text-muted-foreground" />
              <span>{t('skippedLabel')}: {skippedCount}</span>
            </div>
            {/* Sınırlı kullanıcı (misafir/basic) günlük oynama hakkı göstergesi */}
            {isLimited && (
              <div className={`flex items-center gap-1.5 ml-auto text-xs font-medium px-2.5 py-1 rounded-full border ${
                guestPlayInfo.remaining <= 1
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : guestPlayInfo.remaining <= 2
                  ? 'bg-orange-50 border-orange-200 text-orange-700'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                <Shield className="w-3 h-3" />
                <span>
                  {currentLanguage === 'en'
                    ? `${guestPlayInfo.remaining} of ${MAX_GUEST_DAILY_FLASHCARDS} daily plays left`
                    : `Günlük ${guestPlayInfo.remaining}/${MAX_GUEST_DAILY_FLASHCARDS} oynama hakkı`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-8">
          <Card
            className={`grid min-h-[390px] sm:min-h-[350px] cursor-pointer transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
              }`}
            onClick={handleFlip}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            }}
          >
            {/* Front */}
            <div
              className="col-start-1 row-start-1 backface-hidden flex flex-col items-center justify-center p-5 sm:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div
                lang={currentLanguage === 'en' ? 'en' : 'tr'}
                className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3 sm:mb-4"
              >
                {t('term', 'Terim')}
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 break-words px-2 max-w-full hyphens-auto font-serif">
                {formatMedicalTerm(currentTerm.term)}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {t('clickToFlip', 'Kartı çevirmek için tıkla')}
              </div>
            </div>

            {/* Back */}
            <div
              className="col-start-1 row-start-1 backface-hidden flex flex-col items-center justify-center py-6 px-4 sm:p-6 bg-gradient-to-br from-secondary/5 to-accent/5"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div
                lang={currentLanguage === 'en' ? 'en' : 'tr'}
                className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1.5"
              >
                {currentLanguage === 'en' ? t('englishDefinitionLabel', 'Definition / English Meaning') : t('turkishDefinitionLabel', 'Türkçe Tanım')}
              </div>
              {currentLanguage === 'en' && (currentTerm.english || currentTerm.turkish) && currentTerm.englishDefinition && (
                <div className="text-base sm:text-lg font-bold text-primary text-center mb-1 break-words">
                  {currentTerm.english || currentTerm.turkish}
                </div>
              )}
              <div className={`text-center text-foreground max-w-md px-1 sm:px-2 leading-relaxed mb-3 break-words ${
                currentLanguage === 'en' && currentTerm.englishDefinition ? 'text-xs sm:text-sm font-medium' : 'text-lg sm:text-xl font-bold'
              }`}>
                {currentLanguage === 'en'
                  ? (currentTerm.englishDefinition || currentTerm.english || currentTerm.turkish || currentTerm.turkishDefinition || currentTerm.definition)
                  : (currentTerm.turkishDefinition || currentTerm.definition)}
              </div>

              {/* Morfem Analizi */}
              {currentTerm && parseRootsToMorphemes(currentTerm?.roots).length > 0 && (
                <div className="mt-1 pt-2 sm:mt-2 sm:pt-3 border-t border-border/50 max-w-md w-full text-center">
                  <div
                    lang={currentLanguage === 'en' ? 'en' : 'tr'}
                    className="mb-1.5 text-[10px] sm:text-[11px] font-bold text-foreground/90 tracking-wide uppercase"
                  >
                    {t('morphemeStructure', 'Morfem Yapısı')}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {parseRootsToMorphemes(currentTerm?.roots).map((part, idx) => {
                      const meaningText = part.meaning || '';


                      return (
                        <React.Fragment key={idx}>
                          {idx > 0 && (
                            <span className="text-[10px] text-muted-foreground/70 font-bold select-none">+</span>
                          )}
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-border/70 bg-muted/60 text-[11px] sm:text-xs font-mono font-medium shadow-xs break-words">
                            <span className="font-semibold text-foreground">{part.root}</span>
                            {meaningText && (
                              <span className="text-[10px] sm:text-[10.5px] font-sans font-normal text-muted-foreground">
                                ({meaningText})
                              </span>
                            )}
                          </span>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </Card>
        </div>

        {/* Actions */}
        {isFlipped && (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDontKnow}
              className="h-16 text-lg"
            >
              <X className="w-5 h-5 mr-2" />
              {t('dontKnow')}
            </Button>
            <Button
              size="lg"
              onClick={handleKnow}
              className="h-16 text-lg gradient-primary"
            >
              <Check className="w-5 h-5 mr-2" />
              {t('know')}
            </Button>
          </div>
        )}

        {!isFlipped && (
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleFlip}
              className="h-16 px-8 text-lg gradient-primary"
            >
              {t('flipCard')}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};