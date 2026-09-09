import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Gamepad2, CreditCard, Layers, BarChart3, LogOut, User, ArrowRight, Zap, Star, Flame, Sparkles, Clock } from 'lucide-react';
import { getStats, getUser, getStreak, logout, formatTurkishName, getUserTrialState } from '@/utils/storage';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { openPaddleCheckout, PADDLE_PRICE_ID, IS_PAYMENT_ACTIVE } from '@/services/paddle';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

// --- Kullanıcı Plan Çözümleme ---
// Plan Seviyeleri: 'lifetime' | 'pro' | 'basic' | 'trial' | 'expired'
const resolveUserPlan = (userData, trialState, previewRole) => {
  if (previewRole === 'lifetime') return 'lifetime';
  if (previewRole === 'pro') return 'pro';
  if (previewRole === 'basic') return 'basic';
  if (previewRole === 'trial') return 'trial';
  if (previewRole === 'expired') return 'expired';

  if (userData) {
    const planStr = (userData.plan || '').toLowerCase();
    const status = (userData.subscriptionStatus || '').toLowerCase();

    if (userData.isLifetime === true || planStr.includes('lifetime') || status === 'lifetime') {
      return 'lifetime';
    }

    if (userData.isBasic === true || planStr.includes('basic') || status === 'basic') {
      return 'basic';
    }

    if (userData.isPro === true || status === 'active' || status === 'pro') {
      return 'pro';
    }
  }

  if (trialState && !trialState.isExpired) {
    return 'trial';
  }

  return 'expired';
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const previewRole = typeof window !== 'undefined'
    ? (new URLSearchParams(window.location.search).get('previewRole') || localStorage.getItem('healthlex_preview_role'))
    : null;

  // State
  const [firebaseUser, setFirebaseUser] = useState(
    previewRole ? { uid: 'preview-uid', email: 'dr.kaya@healthlexmed.com', displayName: 'Dr. Ahmet Kaya' } : null
  );
  const [authReady, setAuthReady] = useState(!!previewRole);
  const [firestoreData, setFirestoreData] = useState(
    previewRole ? { isPro: previewRole === 'pro', subscriptionStatus: previewRole === 'pro' ? 'active' : 'free', displayName: 'Dr. Ahmet Kaya' } : null
  );
  const [subLoading, setSubLoading] = useState(!previewRole);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Auth Guard
  useEffect(() => {
    if (previewRole) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login', { replace: true });
      } else {
        setFirebaseUser(user);
        setAuthReady(true);
      }
    });
    return () => unsubscribe();
  }, [navigate, previewRole]);

  // Firestore: Abonelik Durumu
  useEffect(() => {
    if (previewRole || !authReady) return;
    const uid = firebaseUser?.uid || getUser()?.uid;
    if (!uid) {
      setSubLoading(false);
      return;
    }
    const fetchSubscription = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists()) {
          const data = snap.data();
          setFirestoreData(data);
        }
      } catch (err) {
        console.warn('[Dashboard] Could not fetch subscription status:', err);
      } finally {
        setSubLoading(false);
      }
    };
    fetchSubscription();
  }, [authReady, firebaseUser, previewRole]);

  // Kullanıcı bilgileri ve plan durumu
  const storedUser = getUser();
  const trialState = getUserTrialState(firebaseUser || storedUser);
  const currentPlan = resolveUserPlan(firestoreData, trialState, previewRole);
  const isPro = currentPlan === 'pro' || currentPlan === 'lifetime';
  const rawName =
    firestoreData?.displayName ||
    firestoreData?.name ||
    firebaseUser?.displayName ||
    storedUser?.name ||
    firebaseUser?.email?.split('@')[0] ||
    storedUser?.email?.split('@')[0] ||
    (isTr ? 'Kullanıcı' : 'User');

  const userName = formatTurkishName(rawName);
  const stats = getStats();
  const streak = getStreak();

  const todayFormatted = new Date().toLocaleDateString(isTr ? 'tr-TR' : 'en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  // Logout
  const handleLogout = async () => {
    try { await signOut(auth); } catch (err) { console.error('Logout error:', err); }
    logout();
    window.location.href = '/login';
  };

  // Paddle Checkout
  const handleUpgrade = useCallback(async () => {
    if (!IS_PAYMENT_ACTIVE) {
      toast.info(isTr ? 'Ödeme sistemi yakında aktif olacak.' : 'Payment system coming soon.');
      return;
    }
    setCheckoutLoading(true);
    try {
      await openPaddleCheckout({
        priceId: PADDLE_PRICE_ID,
        customerEmail: firebaseUser?.email || storedUser?.email,
        customData: {
          plan: 'Annual Pro Membership',
          planId: 'pro',
          userId: firebaseUser?.uid || storedUser?.uid || 'unknown'
        }
      });
    } finally {
      setCheckoutLoading(false);
    }
  }, [firebaseUser, storedUser, isTr]);

  // Loading State
  if (!authReady || subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Quick Actions
  const quickActions = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: isTr ? 'Terimler Kütüphanesi' : 'Term Library',
      desc: isTr ? 'Tüm medikal terimleri keşfet' : 'Explore all medical terms',
      path: '/study',
      accent: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      label: isTr ? 'Oyunlar' : 'Games',
      desc: isTr ? 'Eğlenerek öğren' : 'Learn by playing',
      path: '/games',
      accent: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      label: isTr ? "Flashcard'lar" : 'Flashcards',
      desc: isTr ? 'Kartlarla tekrar yap' : 'Review with cards',
      path: '/flashcards',
      accent: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      label: isTr ? 'Morfem Gezgini' : 'Morpheme Explorer',
      desc: isTr ? 'Kök, ön ve son ekleri keşfet' : 'Explore roots and affixes',
      path: '/morphemes',
      accent: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      label: isTr ? 'İlerleme Takibi' : 'Progress',
      desc: isTr ? 'Öğrenme istatistiklerini gör' : 'Track your learning',
      path: '/progress',
      accent: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Top Bar: Hoş Geldin + Profil / Çıkış */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground font-medium mb-1">{todayFormatted}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {isTr ? `Hoş geldin, ${userName}! 👋` : `Welcome back, ${userName}! 👋`}
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Streak Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full text-sm font-semibold text-amber-700 dark:text-amber-400">
              <Flame className="w-4 h-4" />
              {streak.currentStreak} {isTr ? 'gün' : 'days'}
            </div>
            {/* Profil */}
            <Link
              to="/profile"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium text-foreground"
            >
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="hidden sm:inline">{isTr ? 'Profil' : 'Profile'}</span>
            </Link>
            {/* Çıkış */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition-colors text-sm font-medium text-muted-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{isTr ? 'Çıkış' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* Abonelik Durumu Kartı */}
        {!subLoading && (
          currentPlan === 'lifetime' ? (
            <div className="mb-6 flex items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 rounded-xl px-5 py-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs">
                  <Sparkles className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm flex items-center gap-2">
                    {isTr ? 'Ömür Boyu Pro Üye' : 'Lifetime Pro Member'}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      {isTr ? 'ÖMÜR BOYU' : 'LIFETIME'}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isTr
                      ? 'Tüm 10 kategori, 571+ morfem ve 4 oyun moduna süresiz tam erişiminiz aktif.'
                      : 'You have unlimited lifetime access to all 10 categories, 571+ morphemes, and 4 game modes.'}
                  </p>
                </div>
              </div>
            </div>
          ) : currentPlan === 'pro' ? (
            <div className="mb-6 flex items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/30 rounded-xl px-5 py-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white shadow-xs">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm flex items-center gap-2">
                    {isTr ? 'Yıllık Pro Üye' : 'Annual Pro Member'}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30">
                      PRO
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isTr
                      ? 'Tüm 10 kategori, 571+ morfem ve 4 oyun moduna sınırsız tam erişiminiz aktif.'
                      : 'You have unlimited access to all 10 categories, 571+ morphemes, and 4 game modes.'}
                  </p>
                </div>
              </div>
            </div>
          ) : currentPlan === 'basic' ? (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-blue-500/30 rounded-xl px-5 py-4 shadow-xs">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm flex items-center gap-2">
                    {isTr ? 'Temel Plan Üyesi' : 'Basic Plan Member'}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                      {isTr ? 'TEMEL' : 'BASIC'}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isTr
                      ? 'İlk 3 kategori, 100 morfem ve 2 oyun modu (Flashcard & Eşleştirme) aktif.'
                      : 'First 3 categories, 100 morphemes, and 2 game modes (Flashcards & Matching) unlocked.'}
                  </p>
                </div>
              </div>
              {IS_PAYMENT_ACTIVE && (
                <button
                  onClick={handleUpgrade}
                  disabled={checkoutLoading}
                  className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-violet-600 text-white rounded-lg font-semibold text-sm hover:opacity-95 transition-opacity shadow-sm disabled:opacity-60 cursor-pointer"
                >
                  <Star className="w-4 h-4 fill-white" />
                  {checkoutLoading
                    ? (isTr ? 'Yükleniyor...' : 'Loading...')
                    : (isTr ? "Pro'ya Yükselt" : 'Upgrade to Pro')}
                  {!checkoutLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              )}
            </div>
          ) : currentPlan === 'trial' ? (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-4 shadow-xs">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                  <Flame className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm flex items-center gap-2">
                    {isTr ? '3 Günlük Ücretsiz Deneme' : '3-Day Free Trial'}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500 text-white shadow-xs">
                      <Clock className="w-3 h-3" />
                      {trialState.currentDay >= 3
                        ? (isTr ? 'SON GÜN' : 'LAST DAY')
                        : (isTr ? `${trialState.daysLeft} GÜN KALDI` : `${trialState.daysLeft} DAYS LEFT`)}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isTr
                      ? 'Deneme süreniz boyunca tüm özellikler sınırsız açık. Dilediğiniz zaman paketinizi seçebilirsiniz.'
                      : 'All features are fully unlocked during your trial. Pick a plan anytime.'}
                  </p>
                </div>
              </div>
              <Link
                to="/pricing"
                className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                <span>{isTr ? 'Tarifeleri İncele' : 'View Plans'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border rounded-xl px-5 py-4 shadow-xs">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm flex items-center gap-2">
                    {isTr ? 'Ücretsiz Plan (Süre Doldu)' : 'Free Plan (Trial Expired)'}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                      {isTr ? 'SÜRE DOLDU' : 'EXPIRED'}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isTr
                      ? '3 günlük deneme süreniz sona erdi. Öğrenmeye kesintisiz devam etmek için bir paket seçin.'
                      : 'Your 3-day trial has ended. Select a plan to continue learning.'}
                  </p>
                </div>
              </div>
              <Link
                to="/pricing"
                className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                <span>{isTr ? 'Paket Seç' : 'Choose Plan'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )
        )}

        {/* İstatistik Şeridi */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: isTr ? 'Öğrenilen Terim' : 'Learned Terms', value: stats.learnedTerms, icon: '📚' },
            { label: isTr ? 'Çalışma Serisi' : 'Study Streak', value: `${streak.currentStreak} ${isTr ? 'gün' : 'd'}`, icon: '🔥' },
            { label: isTr ? 'Quiz Ort.' : 'Quiz Avg.', value: `${stats.averageQuizScore}%`, icon: '🎯' },
            { label: isTr ? 'Toplam İnceleme' : 'Total Reviews', value: stats.totalReviews, icon: '🔄' }
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl px-4 py-3.5 flex flex-col gap-1">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Hızlı Erişim Butonları */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            {isTr ? 'Çalışmaya Başla' : 'Start Learning'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="group flex items-center gap-4 bg-card border border-border hover:border-primary/40 hover:shadow-md rounded-xl px-5 py-4 transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${action.accent}`}>
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{action.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{action.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
