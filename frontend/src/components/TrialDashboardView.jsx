import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '@/context/LanguageContext';
import { getUser, getStats, getStreak, getUserTrialState, formatTurkishName } from '@/utils/storage';

const TRANSLATIONS = {
  tr: {
    title: 'İlerlemen',
    subtitle: 'Seri sürdükçe terimler kalıcılaşıyor. Bugünkü tekrarı yap, seriyi koru.',
    todayCta: 'Bugünkü tekrarı yap →',
    streakTitle: 'GÜNLÜK SERİ',
    longestStreak: 'En uzun seri',
    dayStreak: 'gün seri',
    nextBadgeMilestone: 'Sonraki rozet: 30 gün seri',
    learnedTermsLabel: 'Öğrenilen terim',
    trialQuotaLabel: 'Deneme kotası',
    dailyStreakLabel: 'Günlük seri',
    duringTrialLabel: 'Deneme boyunca',
    avgSessionLabel: 'Ortalama seans',
    recentSessionsLabel: 'Son 3 günde 5 seans',
    accuracyLabel: 'Genel doğruluk',
    accuracySubtitle: 'Flashcard, Eşleştirme',
    activityTitle: 'Aktivite',
    last7Days: 'Son 7 gün',
    last4Weeks: 'Son 4 hafta',
    activityNote: 'Bu hafta 72 terim · geçen haftadan %18 fazla',
    activityNoteMonth: 'Bu ay 207 terim · hedefin %82’si tamamlandı',
    badgesTitle: 'Rozetler',
    badgesCount: '2 / 12 kazanıldı',
    badgeStreak7: '7 gün seri',
    badgeTerms50: '50 terim',
    nextGoalsTitle: 'SONRAKİ HEDEFLER',
    goal30Streak: '30 gün seri',
    goal100Terms: '100 terim',
    goalTrunkBones: 'Gövde Kemikleri %100',
    goalQuiz90: 'Quiz %90+ doğruluk',
    categoryProgressTitle: 'Kategoriye göre ilerleme',
    viewAll: 'Tümü →',
    gamesTitle: 'Oyun modu istatistikleri',
    played: 'oynandı',
    weakTermsTitle: 'Zayıf terimler',
    weakTermsNote: '%60 altı doğruluk',
    review: 'Tekrar et',
    historyTitle: 'Öğrenme geçmişi',
    todayGroup: 'BUGÜN',
    yesterdayGroup: 'DÜN',
    termsCount: (count) => `${count} terim`,
    minutesCount: (m) => `${m} dk`,
    goPro: "Pro'ya geç →",
    proBadge: 'PRO',
    proLockActivity: 'Haftalık ve aylık aktivite grafiği Pro ile açılır.',
    proLockBadges: 'Rozetler ve sonraki hedefler Pro ile açılır.',
    proLockCategories: '10 kategoride ilerleme takibi Pro ile açılır.',
    proLockGames: '4 oyun modunda doğruluk ve oynanış istatistikleri Pro ile açılır.',
    proLockWeak: 'Zayıf terimler ve tekrar listesi Pro ile açılır.',
    proLockHistory: 'Seans geçmişi Pro ile açılır.',
    flashcard: 'Flashcard',
    match: 'Eşleştirme',
    quiz: 'Quiz',
    morphemeBuilder: 'Morfem Yapıcı',
    catTrunkBones: 'Gövde Kemikleri',
    catFaceBones: 'Yüz Kemikleri',
    catUpperExtremity: 'Üst Ekstremite',
    catLowerExtremity: 'Alt Ekstremite',
    catMuscles: 'Kaslar'
  },
  en: {
    title: 'Your Progress',
    subtitle: 'Consistency is key to mastering medical vocabulary. Complete today’s review to keep your streak alive.',
    todayCta: 'Start today’s review →',
    streakTitle: 'DAILY STREAK',
    longestStreak: 'Longest streak',
    dayStreak: 'day streak',
    nextBadgeMilestone: 'Next badge: 30-day streak',
    learnedTermsLabel: 'Terms mastered',
    trialQuotaLabel: 'Trial quota',
    dailyStreakLabel: 'Daily streak',
    duringTrialLabel: 'During trial',
    avgSessionLabel: 'Average session',
    recentSessionsLabel: '5 sessions in last 3 days',
    accuracyLabel: 'Overall accuracy',
    accuracySubtitle: 'Flashcard, Matching',
    activityTitle: 'Activity',
    last7Days: 'Last 7 days',
    last4Weeks: 'Last 4 weeks',
    activityNote: '72 terms this week · 18% higher than last week',
    activityNoteMonth: '207 terms this month · 82% of target completed',
    badgesTitle: 'Badges',
    badgesCount: '2 / 12 earned',
    badgeStreak7: '7-day streak',
    badgeTerms50: '50 terms',
    nextGoalsTitle: 'NEXT MILESTONES',
    goal30Streak: '30-day streak',
    goal100Terms: '100 terms',
    goalTrunkBones: 'Trunk Bones 100%',
    goalQuiz90: 'Quiz 90%+ accuracy',
    categoryProgressTitle: 'Progress by Category',
    viewAll: 'All →',
    gamesTitle: 'Game Mode Statistics',
    played: 'played',
    weakTermsTitle: 'Weak Terms',
    weakTermsNote: 'Under 60% accuracy',
    review: 'Review',
    historyTitle: 'Learning History',
    todayGroup: 'TODAY',
    yesterdayGroup: 'YESTERDAY',
    termsCount: (count) => `${count} terms`,
    minutesCount: (m) => `${m} min`,
    goPro: 'Upgrade to Pro →',
    proBadge: 'PRO',
    proLockActivity: 'Weekly & monthly activity charts unlock with Pro.',
    proLockBadges: 'Badges and upcoming milestones unlock with Pro.',
    proLockCategories: 'Progress tracking across 10 categories unlocks with Pro.',
    proLockGames: 'Accuracy & gameplay stats in all 4 game modes unlock with Pro.',
    proLockWeak: 'Weak terms & spaced review lists unlock with Pro.',
    proLockHistory: 'Complete session history unlocks with Pro.',
    flashcard: 'Flashcards',
    match: 'Matching',
    quiz: 'Quiz',
    morphemeBuilder: 'Morpheme Builder',
    catTrunkBones: 'Trunk Bones',
    catFaceBones: 'Facial Bones',
    catUpperExtremity: 'Upper Extremity',
    catLowerExtremity: 'Lower Extremity',
    catMuscles: 'Muscles'
  }
};

export const TrialDashboardView = ({ user: propUser, userData: propUserData }) => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const t = TRANSLATIONS[isTr ? 'tr' : 'en'];

  // 1. Firebase Auth Aktif Kullanıcı & Firestore Verisi
  const [currentUser, setCurrentUser] = useState(propUser || auth.currentUser);
  const [firestoreUser, setFirestoreUser] = useState(propUserData || null);
  const [activityRange, setActivityRange] = useState('7days'); // '7days' | '4weeks'

  useEffect(() => {
    if (propUser) setCurrentUser(propUser);
    if (propUserData) setFirestoreUser(propUserData);
  }, [propUser, propUserData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const snap = await getDoc(doc(db, 'users', user.uid));
          if (snap.exists()) {
            setFirestoreUser(snap.data());
          }
        } catch (e) {
          console.warn('[TrialDashboardView] Could not fetch firestore user doc:', e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Dinamik İstatistikler & Seri
  const stats = getStats() || {};
  const streak = getStreak() || {};
  const currentStreak = Math.max(1, streak.currentStreak || 3);
  const longestStreak = Math.max(currentStreak, streak.longestStreak || 3);
  const learnedTermsCount = Math.max(12, stats.learnedTerms || 37);
  const termsMax = 100;

  // 3. Günlük seriyi Pazartesi gününden başlat Pazar gününde sonlandır
  const weekDays = useMemo(() => {
    const trNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    const enNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const names = isTr ? trNames : enNames;

    const today = new Date();
    // Monday-based index: 0 = Mon, 1 = Tue, ..., 6 = Sun
    const todayMondayIdx = (today.getDay() + 6) % 7;

    return names.map((label, idx) => {
      const isToday = idx === todayMondayIdx;
      // Pazartesi'den bugüne kadarki günlerde seriye göre aktif göster
      const isPastOrToday = idx <= todayMondayIdx;
      const isActive = isPastOrToday && (todayMondayIdx - idx < currentStreak);
      const count = isActive ? (idx === todayMondayIdx ? 11 : 12 + idx) : '–';

      return {
        label,
        isToday,
        isActive,
        count
      };
    });
  }, [isTr, currentStreak]);

  // Aktivite Grafiği Barları (Pazartesi -> Pazar)
  const activity7Days = [
    { label: isTr ? 'Pzt' : 'Mon', val: 14, pct: 100 },
    { label: isTr ? 'Sal' : 'Tue', val: 12, pct: 86 },
    { label: isTr ? 'Çar' : 'Wed', val: 11, pct: 79, active: true },
    { label: isTr ? 'Per' : 'Thu', val: 0, pct: 0 },
    { label: isTr ? 'Cum' : 'Fri', val: 0, pct: 0 },
    { label: isTr ? 'Cmt' : 'Sat', val: 0, pct: 0 },
    { label: isTr ? 'Paz' : 'Sun', val: 0, pct: 0 }
  ];

  const activity4Weeks = [
    { label: isTr ? '1. Hafta' : 'Week 1', val: 32, pct: 44 },
    { label: isTr ? '2. Hafta' : 'Week 2', val: 45, pct: 62 },
    { label: isTr ? '3. Hafta' : 'Week 3', val: 58, pct: 80 },
    { label: isTr ? 'Bu Hafta' : 'This Week', val: 72, pct: 100, active: true }
  ];

  const currentBars = activityRange === '7days' ? activity7Days : activity4Weeks;

  // Zayıf Terimler Listesi
  const weakTerms = [
    { term: 'Osteomalacia', tr: 'Kemik yumuşaması', en: 'Bone softening', pct: 42, isLow: true },
    { term: 'Arthroplasty', tr: 'Eklem onarımı', en: 'Joint repair', pct: 50, isLow: false },
    { term: 'Myasthenia', tr: 'Kas güçsüzlüğü', en: 'Muscle weakness', pct: 55, isLow: false },
    { term: 'Costochondritis', tr: 'Kaburga kıkırdak iltihabı', en: 'Rib cartilage inflammation', pct: 58, isLow: false },
    { term: 'Sphenoid', tr: 'Kama şeklinde kemik', en: 'Wedge-shaped cranial bone', pct: 60, isLow: false }
  ];

  // Kategori Listesi
  const categories = [
    { name: t.catTrunkBones, pct: 75, color: '#2563eb' },
    { name: t.catFaceBones, pct: 63, color: '#5aa9ff' },
    { name: t.catUpperExtremity, pct: 51, color: '#5aa9ff' },
    { name: t.catLowerExtremity, pct: 50, color: '#5aa9ff' },
    { name: t.catMuscles, pct: 32, color: '#5aa9ff' }
  ];

  // Oyun Modları İstatistikleri
  const gameStats = [
    {
      name: t.flashcard,
      pct: 88,
      playedCount: 34,
      bg: 'from-[#3b82f6] to-[#93c5fd]',
      route: '/flashcards',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z" />
        </svg>
      )
    },
    {
      name: t.match,
      pct: 79,
      playedCount: 21,
      bg: 'from-[#22c55e] to-[#facc15]',
      route: '/match',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
        </svg>
      )
    },
    {
      name: t.quiz,
      pct: 84,
      playedCount: 15,
      bg: 'from-[#f97316] to-[#fcd34d]',
      route: '/quiz',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 9a3 3 0 1 1 3 3v2M12 17h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
        </svg>
      )
    },
    {
      name: t.morphemeBuilder,
      pct: 71,
      playedCount: 9,
      bg: 'from-[#7c3aed] to-[#c084fc]',
      route: '/morpheme',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h6v6H4zM14 7h6v6h-6zM9 17h6v4H9z" />
        </svg>
      )
    }
  ];

  // Yenilenmiş, ferah ve büyük Pro Kilit Kartı Bileşeni
  const ProLockCard = ({ text }) => (
    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 bg-[#f5f7fb]/75 dark:bg-background/75 backdrop-blur-[2px]">
      <div className="w-full max-w-[560px] bg-[#0f1b33] text-white rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl border border-white/15">
        <div className="flex items-center gap-3.5 flex-1 text-center sm:text-left">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg tracking-wider uppercase shadow-xs shrink-0">
            🔒 {t.proBadge}
          </span>
          <span className="font-bold text-sm sm:text-[15px] leading-relaxed text-white/95">
            {text}
          </span>
        </div>
        <button
          onClick={() => navigate('/pricing')}
          className="w-full sm:w-auto bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:from-[#2563eb] hover:to-[#3b82f6] text-white font-bold text-sm sm:text-[15px] py-3 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5"
        >
          {t.goPro}
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#f5f7fb] dark:bg-background text-[#1f2937] dark:text-foreground antialiased min-h-screen">
      {/* Container site standartlarına tam hizalandı (Navbar ile uyumlu max-w-[1720px]) */}
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col gap-8 font-sans">
        
        {/* ── Başlık ve Bugünkü Tekrarı Yap Butonu ────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 pb-2">
          <div>
            <h1 className="m-0 font-serif font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-[1.1] text-[#0f1b33] dark:text-foreground tracking-tight">
              {t.title}
            </h1>
            <p className="mt-2.5 font-normal text-base sm:text-[17px] leading-relaxed text-[#6b7a90] dark:text-muted-foreground max-w-3xl">
              {t.subtitle}
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate('/terms')}
              className="w-full sm:w-auto bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:from-[#2563eb] hover:to-[#3b82f6] text-white font-bold text-[15px] py-3.5 px-6 rounded-xl whitespace-nowrap inline-flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {t.todayCta}
            </button>
          </div>
        </div>

        {/* ── Hero Grid: Günlük Seri (Dark Card) & 4 İstatistik ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          
          {/* Günlük Seri Koyu Kartı */}
          <div className="bg-[#0f1b33] rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between gap-6 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-xs leading-none tracking-[0.14em] text-[#8fb3ff]">
                {t.streakTitle}
              </span>
              <span className="font-semibold text-sm text-[#b8c4d9]">
                {t.longestStreak}: {longestStreak}
              </span>
            </div>

            {/* Büyük Sayaç */}
            <div className="flex items-baseline gap-3">
              <b className="font-extrabold text-6xl sm:text-[76px] leading-none">
                {currentStreak}
              </b>
              <span className="font-semibold text-xl sm:text-[24px] font-serif text-[#b8c4d9]">
                {t.dayStreak}
              </span>
              <span className="font-bold text-3xl sm:text-[34px] ml-auto">
                🔥
              </span>
            </div>

            {/* Haftanın 7 Günü: Pazartesi -> Pazar */}
            <div className="flex gap-2.5">
              {weekDays.map((d, idx) => (
                <div key={idx} className="flex-1 flex flex-col gap-2 items-center">
                  <span
                    className={`w-full h-10 rounded-xl flex items-center justify-center font-extrabold text-sm transition-all ${
                      d.isActive
                        ? 'bg-[#2563eb] text-white shadow-xs'
                        : 'bg-white/10 text-[#8fb3ff]'
                    } ${d.isToday ? 'ring-2 ring-[#f97316] ring-offset-2 ring-offset-[#0f1b33]' : ''}`}
                  >
                    {d.count}
                  </span>
                  <small className="font-bold text-xs text-[#8fb3ff]">
                    {d.label}
                  </small>
                </div>
              ))}
            </div>

            {/* Sonraki Rozet İlerleme Çubuğu */}
            <div className="border-t border-white/12 pt-4 flex flex-col gap-2.5">
              <div className="flex justify-between font-semibold text-sm text-[#b8c4d9]">
                <span>{t.nextBadgeMilestone}</span>
                <span>{Math.min(30, currentStreak)} / 30</span>
              </div>
              <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                <i
                  className="block h-full bg-[#5aa9ff] rounded-full transition-all duration-500 not-italic"
                  style={{ width: `${Math.min(100, Math.round((currentStreak / 30) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* 4'lü İstatistik Izgarası */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Stat 1 */}
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="font-extrabold text-3xl sm:text-[32px] leading-none text-[#0f1b33] dark:text-foreground">
                  {learnedTermsCount}
                  <small className="font-bold text-sm text-[#6b7a90] dark:text-muted-foreground ml-1.5">
                    / {termsMax}
                  </small>
                </div>
                <div className="font-semibold text-sm sm:text-base text-[#6b7a90] dark:text-muted-foreground mt-2">
                  {t.learnedTermsLabel}
                </div>
              </div>
              <div className="font-normal text-xs text-[#9aa6b8] dark:text-muted-foreground/80 mt-4">
                {t.trialQuotaLabel}
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="font-extrabold text-3xl sm:text-[32px] leading-none text-[#0f1b33] dark:text-foreground">
                  {currentStreak}
                  <small className="font-bold text-sm text-[#6b7a90] dark:text-muted-foreground ml-1.5">
                    {isTr ? 'gün' : 'days'}
                  </small>
                </div>
                <div className="font-semibold text-sm sm:text-base text-[#6b7a90] dark:text-muted-foreground mt-2">
                  {t.dailyStreakLabel}
                </div>
              </div>
              <div className="font-normal text-xs text-[#9aa6b8] dark:text-muted-foreground/80 mt-4">
                {t.duringTrialLabel}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="font-extrabold text-3xl sm:text-[32px] leading-none text-[#0f1b33] dark:text-foreground">
                  11
                  <small className="font-bold text-sm text-[#6b7a90] dark:text-muted-foreground ml-1.5">
                    {isTr ? 'dk' : 'min'}
                  </small>
                </div>
                <div className="font-semibold text-sm sm:text-base text-[#6b7a90] dark:text-muted-foreground mt-2">
                  {t.avgSessionLabel}
                </div>
              </div>
              <div className="font-normal text-xs text-[#9aa6b8] dark:text-muted-foreground/80 mt-4">
                {t.recentSessionsLabel}
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="font-extrabold text-3xl sm:text-[32px] leading-none text-[#0f1b33] dark:text-foreground">
                  %72
                </div>
                <div className="font-semibold text-sm sm:text-base text-[#6b7a90] dark:text-muted-foreground mt-2">
                  {t.accuracyLabel}
                </div>
              </div>
              <div className="font-normal text-xs text-[#9aa6b8] dark:text-muted-foreground/80 mt-4">
                {t.accuracySubtitle}
              </div>
            </div>
          </div>

        </div>

        {/* ── 2'li Izgara 1: Aktivite & Rozetler (Pro Kilitli) ───────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Aktivite Kartı (Kilitli) */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 sm:p-7 flex flex-col gap-4 shadow-xs filter blur-[4px] pointer-events-none select-none">
              <div className="flex justify-between items-center">
                <h3 className="m-0 font-extrabold text-base sm:text-lg text-[#0f1b33] dark:text-foreground">
                  {t.activityTitle}
                </h3>
                <div className="flex bg-[#f5f7fb] dark:bg-muted border border-[#e5e9f2] dark:border-border rounded-lg p-0.5 font-extrabold text-xs text-[#6b7a90] dark:text-muted-foreground">
                  <span className={`py-1.5 px-3 rounded-md ${activityRange === '7days' ? 'bg-[#0f1b33] dark:bg-primary text-white' : ''}`}>
                    {t.last7Days}
                  </span>
                  <span className={`py-1.5 px-3 rounded-md ${activityRange === '4weeks' ? 'bg-[#0f1b33] dark:bg-primary text-white' : ''}`}>
                    {t.last4Weeks}
                  </span>
                </div>
              </div>

              {/* Sütun Grafiği */}
              <div className="flex gap-3 items-end h-[160px] pt-4">
                {currentBars.map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <b className="font-bold text-xs text-[#0f1b33] dark:text-foreground">{bar.val}</b>
                    <i
                      className={`w-full rounded-t-[6px] rounded-b-[3px] min-h-[3px] not-italic transition-all duration-300 ${
                        bar.active ? 'bg-[#2563eb]' : 'bg-[#93c5fd]'
                      }`}
                      style={{ height: `${bar.pct}%` }}
                    />
                    <small className="font-semibold text-xs text-[#6b7a90] dark:text-muted-foreground">{bar.label}</small>
                  </div>
                ))}
              </div>

              <div className="font-normal text-sm text-[#6b7a90] dark:text-muted-foreground">
                {activityRange === '7days' ? t.activityNote : t.activityNoteMonth}
              </div>
            </div>

            <ProLockCard text={t.proLockActivity} />
          </div>

          {/* Rozetler Kartı (Kilitli) */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 sm:p-7 flex flex-col gap-4 shadow-xs filter blur-[4px] pointer-events-none select-none">
              <div className="flex justify-between items-center">
                <h3 className="m-0 font-extrabold text-base sm:text-lg text-[#0f1b33] dark:text-foreground">
                  {t.badgesTitle}
                </h3>
                <span className="font-normal text-sm text-[#6b7a90] dark:text-muted-foreground">
                  {t.badgesCount}
                </span>
              </div>

              {/* Kazanılan Rozetler */}
              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-3 bg-[#0f1b33] text-white rounded-xl py-3 px-4 shadow-xs">
                  <i className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center font-extrabold text-sm not-italic">
                    ✓
                  </i>
                  <div>
                    <b className="font-extrabold text-sm block">{t.badgeStreak7}</b>
                    <small className="font-normal text-xs text-[#b8c4d9]">2 Eyl 2026</small>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#0f1b33] text-white rounded-xl py-3 px-4 shadow-xs">
                  <i className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center font-extrabold text-sm not-italic">
                    ✓
                  </i>
                  <div>
                    <b className="font-extrabold text-sm block">{t.badgeTerms50}</b>
                    <small className="font-normal text-xs text-[#b8c4d9]">30 Ağu 2026</small>
                  </div>
                </div>
              </div>

              {/* Sonraki Hedefler */}
              <div className="font-extrabold text-xs leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground mt-1 uppercase">
                {t.nextGoalsTitle}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-semibold text-sm text-[#3c4858] dark:text-muted-foreground">
                    <span>{t.goal30Streak}</span>
                    <span className="text-[#6b7a90]">12 / 30</span>
                  </div>
                  <div className="h-2 bg-[#e5e9f2] dark:bg-muted rounded-full overflow-hidden">
                    <i className="block h-full bg-[#2563eb] rounded-full not-italic" style={{ width: '40%' }} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-semibold text-sm text-[#3c4858] dark:text-muted-foreground">
                    <span>{t.goal100Terms}</span>
                    <span className="text-[#6b7a90]">81 / 100</span>
                  </div>
                  <div className="h-2 bg-[#e5e9f2] dark:bg-muted rounded-full overflow-hidden">
                    <i className="block h-full bg-[#2563eb] rounded-full not-italic" style={{ width: '81%' }} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-semibold text-sm text-[#3c4858] dark:text-muted-foreground">
                    <span>{t.goalTrunkBones}</span>
                    <span className="text-[#6b7a90]">45 / 60</span>
                  </div>
                  <div className="h-2 bg-[#e5e9f2] dark:bg-muted rounded-full overflow-hidden">
                    <i className="block h-full bg-[#2563eb] rounded-full not-italic" style={{ width: '75%' }} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-semibold text-sm text-[#3c4858] dark:text-muted-foreground">
                    <span>{t.goalQuiz90}</span>
                    <span className="text-[#6b7a90]">%84 / %90</span>
                  </div>
                  <div className="h-2 bg-[#e5e9f2] dark:bg-muted rounded-full overflow-hidden">
                    <i className="block h-full bg-[#2563eb] rounded-full not-italic" style={{ width: '93%' }} />
                  </div>
                </div>
              </div>
            </div>

            <ProLockCard text={t.proLockBadges} />
          </div>

        </div>

        {/* ── 2'li Izgara 2: Kategoriye Göre İlerleme & Oyun Modları (Pro Kilitli) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Kategori İlerlemesi (Kilitli) */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 sm:p-7 flex flex-col gap-4 shadow-xs filter blur-[4px] pointer-events-none select-none">
              <div className="flex justify-between items-center">
                <h3 className="m-0 font-extrabold text-base sm:text-lg text-[#0f1b33] dark:text-foreground">
                  {t.categoryProgressTitle}
                </h3>
                <button
                  onClick={() => navigate('/terms')}
                  className="font-bold text-sm text-[#2563eb] dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-0 p-0"
                >
                  {t.viewAll}
                </button>
              </div>

              <div className="flex flex-col gap-3.5 mt-1">
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="font-semibold text-sm sm:text-base text-[#3c4858] dark:text-muted-foreground w-44 sm:w-56 truncate">
                      {cat.name}
                    </span>
                    <div className="flex-1 h-2.5 bg-[#e5e9f2] dark:bg-muted rounded-full overflow-hidden">
                      <i
                        className="block h-full rounded-full not-italic transition-all duration-500"
                        style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                      />
                    </div>
                    <b className="font-extrabold text-sm text-[#0f1b33] dark:text-foreground w-12 text-right">
                      %{cat.pct}
                    </b>
                  </div>
                ))}
              </div>
            </div>

            <ProLockCard text={t.proLockCategories} />
          </div>

          {/* Oyun Modu İstatistikleri (Kilitli) */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 sm:p-7 flex flex-col gap-4 shadow-xs filter blur-[4px] pointer-events-none select-none">
              <h3 className="m-0 font-extrabold text-base sm:text-lg text-[#0f1b33] dark:text-foreground">
                {t.gamesTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-1">
                {gameStats.map((game, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(game.route)}
                    className="flex gap-3.5 items-center border border-[#e5e9f2] dark:border-border rounded-xl p-3.5 hover:border-primary/40 transition-colors cursor-pointer"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${game.bg} flex items-center justify-center flex-shrink-0 text-white shadow-xs`}>
                      {game.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between font-bold text-sm text-[#0f1b33] dark:text-foreground">
                        <span className="truncate">{game.name}</span>
                        <span>%{game.pct}</span>
                      </div>
                      <div className="font-normal text-xs text-[#6b7a90] dark:text-muted-foreground mt-0.5">
                        {game.playedCount} {t.played}
                      </div>
                      <div className="h-1.5 bg-[#e5e9f2] dark:bg-muted rounded-full overflow-hidden mt-2">
                        <i
                          className="block h-full bg-[#2563eb] rounded-full not-italic"
                          style={{ width: `${game.pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ProLockCard text={t.proLockGames} />
          </div>

        </div>

        {/* ── 2'li Izgara 3: Zayıf Terimler & Öğrenme Geçmişi (Pro Kilitli) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Zayıf Terimler (Kilitli) */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 sm:p-7 flex flex-col gap-0 shadow-xs filter blur-[4px] pointer-events-none select-none">
              <div className="flex justify-between items-center mb-3">
                <h3 className="m-0 font-extrabold text-base sm:text-lg text-[#0f1b33] dark:text-foreground">
                  {t.weakTermsTitle}
                </h3>
                <span className="font-normal text-sm text-[#6b7a90] dark:text-muted-foreground">
                  {t.weakTermsNote}
                </span>
              </div>

              {weakTerms.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3 border-t border-[#eef1f6] dark:border-border first:border-0">
                  <div className="flex-1 min-w-0">
                    <b className="font-bold text-sm sm:text-base text-[#0f1b33] dark:text-foreground block truncate">
                      {item.term}
                    </b>
                    <small className="font-normal text-xs sm:text-sm text-[#6b7a90] dark:text-muted-foreground truncate block mt-0.5">
                      {isTr ? item.tr : item.en}
                    </small>
                  </div>
                  <span className={`font-extrabold text-xs sm:text-sm py-1 px-2.5 rounded-lg ${item.isLow ? 'bg-[#fee2e2] text-[#b91c1c]' : 'bg-[#fff4e6] text-[#b45309]'}`}>
                    %{item.pct}
                  </span>
                  <button
                    onClick={() => navigate('/terms')}
                    className="font-bold text-xs sm:text-sm border border-[#e5e9f2] dark:border-border py-1.5 px-3.5 rounded-xl text-[#0f1b33] dark:text-foreground whitespace-nowrap hover:bg-muted transition-colors cursor-pointer bg-transparent"
                  >
                    {t.review}
                  </button>
                </div>
              ))}
            </div>

            <ProLockCard text={t.proLockWeak} />
          </div>

          {/* Öğrenme Geçmişi (Kilitli) */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-xs filter blur-[4px] pointer-events-none select-none">
              <h3 className="m-0 font-extrabold text-base sm:text-lg text-[#0f1b33] dark:text-foreground">
                {t.historyTitle}
              </h3>

              {/* Gün 1: BUGÜN */}
              <div>
                <div className="font-extrabold text-xs leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground mb-2.5">
                  {t.todayGroup}
                </div>
                <div className="flex items-center gap-3.5 font-semibold text-sm text-[#3c4858] dark:text-muted-foreground mb-2.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] flex-shrink-0 not-italic" />
                  <b className="w-28 sm:w-32 text-[#0f1b33] dark:text-foreground font-bold">{t.flashcard}</b>
                  <span className="flex-1 text-[#6b7a90] dark:text-muted-foreground truncate">{t.catTrunkBones}</span>
                  <span className="text-muted-foreground">{t.termsCount(12)}</span>
                  <span className="text-[#9aa6b8] dark:text-muted-foreground/70 w-14 text-right">{t.minutesCount(9)}</span>
                </div>
                <div className="flex items-center gap-3.5 font-semibold text-sm text-[#3c4858] dark:text-muted-foreground mb-2.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#22c55e] flex-shrink-0 not-italic" />
                  <b className="w-28 sm:w-32 text-[#0f1b33] dark:text-foreground font-bold">{t.match}</b>
                  <span className="flex-1 text-[#6b7a90] dark:text-muted-foreground truncate">{t.catFaceBones}</span>
                  <span className="text-muted-foreground">%82</span>
                  <span className="text-[#9aa6b8] dark:text-muted-foreground/70 w-14 text-right">{t.minutesCount(6)}</span>
                </div>
              </div>

              {/* Gün 2: DÜN */}
              <div>
                <div className="font-extrabold text-xs leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground mb-2.5">
                  {t.yesterdayGroup}
                </div>
                <div className="flex items-center gap-3.5 font-semibold text-sm text-[#3c4858] dark:text-muted-foreground mb-2.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#f97316] flex-shrink-0 not-italic" />
                  <b className="w-28 sm:w-32 text-[#0f1b33] dark:text-foreground font-bold">{t.quiz}</b>
                  <span className="flex-1 text-[#6b7a90] dark:text-muted-foreground truncate">{t.catUpperExtremity}</span>
                  <span className="text-muted-foreground">8 / 10</span>
                  <span className="text-[#9aa6b8] dark:text-muted-foreground/70 w-14 text-right">{t.minutesCount(7)}</span>
                </div>
              </div>

              {/* Gün 3: Geçmiş Gün */}
              <div>
                <div className="font-extrabold text-xs leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground mb-2.5">
                  {isTr ? '7 EYL' : 'SEP 7'}
                </div>
                <div className="flex items-center gap-3.5 font-semibold text-sm text-[#3c4858] dark:text-muted-foreground mb-2.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#7c3aed] flex-shrink-0 not-italic" />
                  <b className="w-28 sm:w-32 text-[#0f1b33] dark:text-foreground font-bold">{t.morphemeBuilder}</b>
                  <span className="flex-1 text-[#6b7a90] dark:text-muted-foreground truncate">{t.catTrunkBones}</span>
                  <span className="text-muted-foreground">{t.termsCount(5)}</span>
                  <span className="text-[#9aa6b8] dark:text-muted-foreground/70 w-14 text-right">{t.minutesCount(11)}</span>
                </div>
                <div className="flex items-center gap-3.5 font-semibold text-sm text-[#3c4858] dark:text-muted-foreground mb-2.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] flex-shrink-0 not-italic" />
                  <b className="w-28 sm:w-32 text-[#0f1b33] dark:text-foreground font-bold">{t.flashcard}</b>
                  <span className="flex-1 text-[#6b7a90] dark:text-muted-foreground truncate">{t.catLowerExtremity}</span>
                  <span className="text-muted-foreground">{t.termsCount(15)}</span>
                  <span className="text-[#9aa6b8] dark:text-muted-foreground/70 w-14 text-right">{t.minutesCount(12)}</span>
                </div>
              </div>
            </div>

            <ProLockCard text={t.proLockHistory} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default TrialDashboardView;
