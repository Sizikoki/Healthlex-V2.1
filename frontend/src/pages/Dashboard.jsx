import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  Gamepad2,
  CreditCard,
  Layers,
  BarChart3,
  LogOut,
  User,
  ArrowRight,
  Zap,
  Star,
  Flame,
  Sparkles,
  Clock,
  Search,
  Lock,
  ChevronRight
} from 'lucide-react';
import {
  getStats,
  getUser,
  getStreak,
  updateStreak,
  syncStreakFromFirestore,
  syncMorphemeProgressFromFirestore,
  getLearnedMorphemesCount,
  getUserLevel,
  logout,
  formatTurkishName,
  getUserTrialState,
  getFlashcardGuestDailyInfo
} from '@/utils/storage';
import { getPastDueState, getPreviewRole } from '@/utils/planAccess';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { IS_PAYMENT_ACTIVE } from '@/services/paddle';
import { changePlan } from '@/services/subscriptionService';
import { useLanguage } from '@/context/LanguageContext';
import { getTermCount, getInitialTermCount } from '@/services/termCountService';
import { getTermsByCategory } from '@/data/medicalTerms';
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

    if (status === 'trialing' || userData.isTrial === true) {
      if (trialState && !trialState.isExpired && trialState.isActive) {
        return 'trial';
      }
      return 'expired';
    }

    if (userData.isPro === true || status === 'active' || status === 'pro') {
      return 'pro';
    }

    if (status === 'past_due') {
      const pastDue = getPastDueState(userData);
      if (pastDue.isWithinGracePeriod) {
        return userData.isBasic ? 'basic' : 'pro';
      }
      return 'expired';
    }
  }

  if (trialState && trialState.hasTrial && trialState.isActive && !trialState.isExpired) {
    return 'trial';
  }

  return 'expired';
};

const FREE_DASHBOARD_CATEGORIES = [
  { id: 'skull_bones', key: 'skullBones', name: 'Kafatası Kemikleri', enName: 'Skull Bones', defaultCount: 42 },
  { id: 'face_bones', key: 'faceBones', name: 'Yüz Kemikleri', enName: 'Face Bones', defaultCount: 31 },
  { id: 'trunk_bones', key: 'trunkBones', name: 'Gövde Kemikleri', enName: 'Trunk Bones', defaultCount: 38 },
  { id: 'upper_extremity_bones', key: 'upperExtremityBones', name: 'Üst Extremite Kemikleri', enName: 'Upper Extremity Bones', defaultCount: 46 },
  { id: 'upper_extremity_joints', key: 'upperExtremityJoints', name: 'Üst Ekstremite Eklemleri', enName: 'Upper Extremity Joints', defaultCount: 27 },
  { id: 'lower_extremity_bones', key: 'lowerExtremityBones', name: 'Alt Extremite Kemikleri', enName: 'Lower Extremity Bones', defaultCount: 44 },
  { id: 'lower_extremity_joints', key: 'lowerExtremityJoints', name: 'Alt Ekstremite Eklemleri', enName: 'Lower Extremity Joints', defaultCount: 29 },
  { id: 'spine_joints', key: 'spineJoints', name: 'Omurga Eklemleri', enName: 'Spine Joints', defaultCount: 22 },
  { id: 'head_and_neck_joints', key: 'headAndNeckJoints', name: 'Kafa ve Boyun Eklemleri', enName: 'Head and Neck Joints', defaultCount: 18 },
  { id: 'head_and_neck_muscles', key: 'headAndNeckMuscles', name: 'Baş ve Boyun Kasları', enName: 'Head and Neck Muscles', defaultCount: 77 },
  { id: 'muscle_structures', key: 'muscleStructures', name: 'Kas ve Kasla İlişkili Yapılar', enName: 'Muscles & Related Structures', defaultCount: 64 },
  { id: 'bone_structures', key: 'boneStructures', name: 'Kemik / İskelet Yapıları', enName: 'Bone & Skeletal Structures', defaultCount: 35 },
  { id: 'movement_terms', key: 'movementTerms', name: 'Hareket Terimleri', enName: 'Movement Terms', defaultCount: 26 },
  { id: 'anatomic_direction', key: 'anatomicDirection', name: 'Anatomik Yön Terimleri', enName: 'Anatomical Direction', defaultCount: 24 }
];

const FREE_DASHBOARD_MORPHEMES = [
  // Açık 24 morfem havuzundan seçilen 5 açık morfem (Ön Ekler)
  { name: 'bi-', slug: 'bi', meaningTr: 'iki, çift', meaningEn: 'two, double', unblurred: true },
  { name: 'hemi-', slug: 'hemi', meaningTr: 'yarı, yarım', meaningEn: 'half, one-sided', unblurred: true },
  { name: 'mono-', slug: 'mono', meaningTr: 'tek, bir', meaningEn: 'single, one', unblurred: true },
  { name: 'multi-', slug: 'multi', meaningTr: 'çok, birden fazla', meaningEn: 'many, multiple', unblurred: true },
  { name: 'poly-', slug: 'poly', meaningTr: 'çok, aşırı miktarda', meaningEn: 'many, excessive', unblurred: true },
  // Geriye kalan kilitli morfem havuzundan seçilen 3 kilitli morfem (Kökler & Son Ekler)
  { name: 'oste/o-', slug: 'osteo', meaningTr: 'kemik', meaningEn: 'bone', unblurred: false },
  { name: 'cardi/o-', slug: 'cardio', meaningTr: 'kalp', meaningEn: 'heart', unblurred: false },
  { name: '-itis', slug: 'itis', meaningTr: 'iltihap, yangı', meaningEn: 'inflammation', unblurred: false }
];

const FREE_DASHBOARD_LOCKED_GAMES = [
  {
    id: 'match',
    name: 'Eşleştirme',
    enName: 'Matching Game',
    plan: 'Temel ve üzeri ile açılır',
    enPlan: 'Unlocked with Basic & above'
  },
  {
    id: 'quiz',
    name: 'Quiz',
    enName: 'Quiz Mode',
    plan: 'Pro ve üzeri gerekir',
    enPlan: 'Requires Pro & above'
  },
  {
    id: 'morpheme',
    name: 'Morfem Yapıcı',
    enName: 'Morpheme Builder',
    plan: 'Pro ve üzeri gerekir',
    enPlan: 'Requires Pro & above'
  }
];

// =============================================================================
// YENİ KAYITLI MİSAFİR / ÜCRETSİZ KULLANICI İÇİN DİNAMİK PANEL (8a Şablonu)
// =============================================================================
const FreeUserDashboard = ({ userName, streak, termCount, isTr, flashcardInfo, todayFormatted }) => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentTerms, setRecentTerms] = useState([]);

  // Dinamik Son Bakılan Terimler (localStorage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('healthlex_recent_terms');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentTerms(parsed.slice(0, 4));
        }
      }
    } catch (e) {}
  }, []);

  // ⌘K / Ctrl+K Kısayol Tuşu Dinleyicisi
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dinamik Kategori Terim Sayıları
  const catCounts = useMemo(() => {
    const counts = {};
    FREE_DASHBOARD_CATEGORIES.forEach((cat) => {
      try {
        const terms = getTermsByCategory(cat.id);
        counts[cat.id] = terms && terms.length > 0 ? terms.length : cat.defaultCount;
      } catch (e) {
        counts[cat.id] = cat.defaultCount;
      }
    });
    return counts;
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/study?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/study');
    }
  };

  const streakDays = streak?.currentStreak && streak.currentStreak > 0 ? streak.currentStreak : 1;
  const remainingPlays = flashcardInfo?.playsRemaining ?? 5;
  const totalPlays = flashcardInfo?.maxPlays ?? 5;
  const termsVal = String(termCount || getInitialTermCount());

  const quotas = [
    {
      label: isTr ? 'TERİM' : 'TERMS',
      v: termsVal,
      unit: isTr ? 'detay sayfası' : 'detail pages',
      note: isTr ? 'Link veya aramayla tam içerik' : 'Full content via link or search',
      borderClass: 'border-l-0'
    },
    {
      label: isTr ? 'MORFEM' : 'MORPHEMES',
      v: '24',
      unit: isTr ? '/ 571 açık' : '/ 571 open',
      note: isTr ? 'Gerisi ad görünür, anlam bulanık' : 'Remaining name visible, meaning blurred',
      borderClass: 'sm:border-l sm:border-[#eef1f6] dark:sm:border-border/60 sm:pl-6'
    },
    {
      label: isTr ? 'FLASHCARD' : 'FLASHCARDS',
      v: `${remainingPlays} / ${totalPlays}`,
      unit: isTr ? 'bugün' : 'today',
      note: isTr ? 'Günlük hak her gece yenilenir' : 'Daily plays refresh every midnight',
      borderClass: 'sm:border-l sm:border-[#eef1f6] dark:sm:border-border/60 sm:pl-6'
    },
    {
      label: isTr ? 'KATEGORİ' : 'CATEGORIES',
      v: `${FREE_DASHBOARD_CATEGORIES.length}`,
      unit: isTr ? 'açık' : 'open',
      note: isTr ? 'Sınırsız gezinme, kilit yok' : 'Unlimited browsing, zero locks',
      borderClass: 'sm:border-l sm:border-[#eef1f6] dark:sm:border-border/60 sm:pl-6'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f5f7fb] dark:bg-background py-8 sm:py-11 px-4 sm:px-6 lg:px-8 flex justify-center font-sans antialiased">
      <div className="w-full max-w-[1120px] flex flex-col gap-7 sm:gap-8">
        {/* Üst Karşılama Başlığı ve Arama Kutusu */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5 lg:gap-8">
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-[12px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? `PANELİM · ${streakDays}. GÜN` : `DASHBOARD · DAY ${streakDays}`}
              </span>
              {todayFormatted && (
                <span className="text-[12px] text-[#6b7a90] dark:text-muted-foreground hidden sm:inline opacity-80">
                  · {todayFormatted}
                </span>
              )}
            </div>
            <h1 className="m-0 font-semibold text-2xl sm:text-[36px] sm:leading-[1.1] text-[#0f1b33] dark:text-foreground font-['Lora',Georgia,serif]">
              {isTr
                ? `Merhaba ${userName || 'Öğrenci'}, nereden başlayalım?`
                : `Hello ${userName || 'Student'}, where shall we start?`}
            </h1>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2.5 bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] px-4 w-full lg:w-[420px] h-[50px] shrink-0 shadow-xs focus-within:border-[#2563eb] transition-all"
          >
            <Search className="w-4 h-4 text-[#6b7a90] shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isTr
                  ? 'Terim veya morfem ara… örn. “os frontale”'
                  : 'Search terms or morphemes… e.g. "os frontale"'
              }
              className="bg-transparent border-none outline-hidden text-[14px] sm:text-[15px] font-normal text-[#0f1b33] dark:text-foreground placeholder:text-[#9aa6ba] w-full"
            />
            <span className="font-bold text-[11px] text-[#6b7a90] dark:text-muted-foreground border border-[#e5e9f2] dark:border-border rounded-[5px] px-1.5 py-0.5 select-none shrink-0">
              ⌘K
            </span>
          </form>
        </div>

        {/* 4'lü Kota ve Limit Özet Şeridi */}
        <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[14px] p-4 sm:p-[18px_24px] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 shadow-xs">
          {quotas.map((q, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-1.5 text-left ${q.borderClass}`}
            >
              <span className="font-extrabold text-[11px] leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {q.label}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-2xl sm:text-[26px] leading-none text-[#0f1b33] dark:text-foreground">
                  {q.v}
                </span>
                <span className="font-semibold text-[13px] text-[#6b7a90] dark:text-muted-foreground">
                  {q.unit}
                </span>
              </div>
              <span className="font-normal text-[12px] leading-[1.4] text-[#6b7a90] dark:text-muted-foreground">
                {q.note}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Ana Sütun Bölümü (Kategoriler | Morfemler | Oyunlar) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-5 items-start">
          {/* SÜTUN 1: KATEGORİLER (1.6fr) */}
          <div className="flex flex-col gap-3.5 text-left">
            <div className="flex justify-between items-baseline">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? `KATEGORİLER · ${FREE_DASHBOARD_CATEGORIES.length}` : `CATEGORIES · ${FREE_DASHBOARD_CATEGORIES.length}`}
              </span>
              <Link to="/study" className="font-bold text-[13px] text-[#2563eb] hover:underline">
                {isTr ? 'Tümünü gör →' : 'View all →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FREE_DASHBOARD_CATEGORIES.map((cat) => {
                const count = catCounts[cat.id] || cat.defaultCount;
                const displayName = isTr ? cat.name : cat.enName;
                return (
                  <Link
                    key={cat.id}
                    to={`/study?category=${cat.id}`}
                    className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] p-3.5 sm:px-4 sm:py-3.5 flex justify-between items-center gap-3 text-[#0f1b33] dark:text-foreground hover:border-[#2563eb]/40 hover:shadow-xs transition-all group"
                  >
                    <span className="font-bold text-[14px] leading-[1.3] truncate group-hover:text-[#2563eb] transition-colors">
                      {displayName}
                    </span>
                    <span className="font-semibold text-[12px] text-[#6b7a90] dark:text-muted-foreground shrink-0">
                      {count} {isTr ? 'terim' : 'terms'}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Son Bakılan Terimler Bölümü */}
            {recentTerms.length > 0 ? (
              <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] p-4 sm:p-5 flex flex-col gap-3 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                    {isTr ? 'SON BAKILAN TERİMLER' : 'RECENTLY VIEWED TERMS'}
                  </span>
                  <Link to="/study" className="font-bold text-[12px] text-[#2563eb] hover:underline">
                    {isTr ? 'Sözlük →' : 'Glossary →'}
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recentTerms.map((rt, idx) => (
                    <Link
                      key={idx}
                      to={`/study/${rt.slug || rt.term}`}
                      className="bg-[#f9fafc] dark:bg-muted/30 border border-[#e5e9f2] dark:border-border/60 hover:border-[#2563eb]/40 rounded-[9px] p-2.5 flex justify-between items-center gap-2 transition-all group"
                    >
                      <span className="font-bold text-[13px] text-[#0f1b33] dark:text-foreground truncate group-hover:text-[#2563eb]">
                        {rt.term}
                      </span>
                      {rt.turkish && (
                        <span className="text-[11px] text-[#6b7a90] dark:text-muted-foreground truncate max-w-[110px]">
                          {rt.turkish}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-card border border-dashed border-[#d5dbe7] dark:border-border/80 rounded-[12px] p-5 flex flex-col gap-1.5">
                <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                  {isTr ? 'SON BAKILAN TERİMLER' : 'RECENTLY VIEWED TERMS'}
                </span>
                <span className="font-semibold text-[14px] leading-[1.5] text-[#3c4858] dark:text-foreground/80">
                  {isTr
                    ? 'Henüz bir terime bakmadın. Yukarıdan arayabilir veya bir kategoriden başlayabilirsin.'
                    : 'You have not viewed any terms yet. Search above or start from a category.'}
                </span>
              </div>
            )}
          </div>

          {/* SÜTUN 2: MORFEMLER (1fr) */}
          <div className="flex flex-col gap-3.5 text-left">
            <div className="flex justify-between items-baseline">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'MORFEMLER' : 'MORPHEMES'}
              </span>
              <Link to="/morphemes" className="font-bold text-[13px] text-[#2563eb] hover:underline">
                {isTr ? 'Listeye git →' : 'Go to list →'}
              </Link>
            </div>

            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[14px] p-4 sm:p-[18px] flex flex-col gap-3 shadow-xs">
              {/* Morfem İlerleme Çubuğu */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-bold text-[13px] text-[#0f1b33] dark:text-foreground">
                  <span>{isTr ? '24 / 571 açık' : '24 / 571 open'}</span>
                  <span className="text-[#6b7a90] dark:text-muted-foreground">%4</span>
                </div>
                <div className="h-1.5 bg-[#eef1f6] dark:bg-muted rounded-full overflow-hidden">
                  <div className="w-[4.2%] h-full bg-[#2563eb]" />
                </div>
              </div>

              {/* 8 Örnek Morfem Listesi (Kilitliler Bulanık) */}
              <div className="flex flex-col gap-1.5">
                {FREE_DASHBOARD_MORPHEMES.map((m, idx) => {
                  const meaningText = isTr ? m.meaningTr : m.meaningEn;
                  const targetUrl = m.unblurred
                    ? (m.slug ? `/morphemes/${m.slug}` : `/morphemes?search=${encodeURIComponent(m.name.replace(/[^a-zA-Z]/g, ''))}`)
                    : '/pricing';

                  return (
                    <Link
                      key={idx}
                      to={targetUrl}
                      title={m.unblurred ? `${m.name}: ${meaningText}` : (isTr ? 'Bu morfem Pro planda açıktır' : 'Unlocked in Pro plan')}
                      className={`flex justify-between items-center gap-2.5 px-2.5 py-2 rounded-[8px] transition-colors ${
                        m.unblurred
                          ? 'bg-[#f9fafc] dark:bg-muted/30 hover:bg-[#e8f0ff] dark:hover:bg-primary/15'
                          : 'bg-[#f5f7fb] dark:bg-muted/15 hover:bg-[#f0f4f9]'
                      }`}
                    >
                      <span className="font-extrabold text-[13px] text-[#0f1b33] dark:text-foreground font-mono">
                        {m.name}
                      </span>
                      <span
                        className="font-normal text-[12px] text-[#6b7a90] dark:text-muted-foreground select-none"
                        style={{ filter: m.unblurred ? 'none' : 'blur(4px)' }}
                      >
                        {meaningText}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <span className="font-normal text-[12px] leading-[1.4] text-[#6b7a90] dark:text-muted-foreground">
                {isTr
                  ? 'Kilitli morfemlerde ad görünür, anlam ve detay bulanıktır.'
                  : 'In locked morphemes name is visible, meaning and details are blurred.'}
              </span>
            </div>
          </div>

          {/* SÜTUN 3: OYUNLAR (1fr) */}
          <div className="flex flex-col gap-3.5 text-left">
            <div className="flex justify-between items-baseline">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'OYUNLAR' : 'GAMES'}
              </span>
              <Link to="/games" className="font-bold text-[13px] text-[#2563eb] hover:underline">
                {isTr ? 'Oyunlar →' : 'Games →'}
              </Link>
            </div>

            {/* Aktif Flashcard Kartı (Koyu Zemin) */}
            <div className="bg-[#0f1b33] dark:bg-[#0b1426] dark:border dark:border-[#1e2e4a] rounded-[14px] p-4 sm:p-[18px] text-white flex flex-col gap-3 shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-[15px]">Flashcard</span>
                <span className="font-extrabold text-[12px] bg-white/15 px-2 py-1 rounded-[6px]">
                  {remainingPlays} / {totalPlays} {isTr ? 'hak' : 'plays'}
                </span>
              </div>

              {/* 5 Hak Gösterge Çubuğu (Pips) */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`flex-1 h-[5px] rounded-[3px] transition-colors ${
                      i < remainingPlays ? 'bg-[#5aa9ff]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <span className="font-normal text-[13px] leading-[1.45] text-[#b8c4d9]">
                {isTr
                  ? `Bugün ${remainingPlays} oyun oynayabilirsin. Hak her gece yenilenir.`
                  : `You can play ${remainingPlays} games today. Plays refresh every midnight.`}
              </span>

              <Link
                to="/flashcards"
                className="block text-center bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:opacity-95 text-white font-bold text-[14px] py-2.5 px-3 rounded-[9px] shadow-xs transition-all"
              >
                {isTr ? 'Bir oyun başlat' : 'Start a game'}
              </Link>
            </div>

            {/* Kilitli Oyunlar Listesi */}
            <div className="flex flex-col gap-2">
              {FREE_DASHBOARD_LOCKED_GAMES.map((g) => (
                <Link
                  key={g.id}
                  to="/pricing"
                  className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] p-3 sm:px-3.5 sm:py-3 flex justify-between items-center gap-2.5 opacity-85 hover:opacity-100 hover:border-[#2563eb]/40 transition-all group"
                >
                  <div>
                    <div className="font-extrabold text-[14px] text-[#0f1b33] dark:text-foreground group-hover:text-[#2563eb] transition-colors">
                      {isTr ? g.name : g.enName}
                    </div>
                    <div className="font-normal text-[12px] text-[#6b7a90] dark:text-muted-foreground mt-0.5">
                      {isTr ? g.plan : g.enPlan}
                    </div>
                  </div>
                  <span className="font-extrabold text-[11px] leading-none tracking-[0.06em] px-2 py-1.5 rounded-[6px] bg-[#f5f7fb] dark:bg-muted text-[#6b7a90] dark:text-muted-foreground shrink-0 select-none">
                    🔒 {isTr ? 'KİLİTLİ' : 'LOCKED'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Alt Fiyatlandırma / Paket Seçme Çubuğu */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[14px] p-5 sm:p-[20px_24px] gap-4 sm:gap-6 shadow-xs text-left">
          <div>
            <div className="font-semibold text-lg font-['Lora',Georgia,serif] text-[#0f1b33] dark:text-foreground">
              {isTr ? 'Tamamını açmak için bir plan seç' : 'Choose a plan to unlock everything'}
            </div>
            <div className="font-normal text-[13px] text-[#6b7a90] dark:text-muted-foreground mt-1">
              {isTr
                ? 'Temel ₺790/yıl · Pro lansman fiyatı ₺2.000/yıl · Ömür Boyu ₺5.990 tek ödeme'
                : 'Basic ₺790/yr · Pro launch price ₺2,000/yr · Lifetime ₺5,990 one-time'}
            </div>
          </div>

          <Link
            to="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f1b33] dark:bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-[15px] px-7 py-3.5 rounded-[10px] shrink-0 whitespace-nowrap transition-all shadow-xs"
          >
            <span>{isTr ? 'Tarifeleri gör' : 'View plans'}</span>
            <span className="text-base leading-none">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// TEMEL PLAN SABİTLERİ (9d Şablonu)
// =============================================================================
const BASIC_DASHBOARD_MORPHEMES = [
  { name: 'oste/o-', slug: 'osteo', meaningTr: 'kemik', meaningEn: 'bone' },
  { name: '-itis', slug: 'itis', meaningTr: 'iltihap', meaningEn: 'inflammation' },
  { name: 'arthr/o-', slug: 'arthro', meaningTr: 'eklem', meaningEn: 'joint' },
  { name: 'my/o-', slug: 'myo', meaningTr: 'kas', meaningEn: 'muscle' },
  { name: 'neur/o-', slug: 'neuro', meaningTr: 'sinir', meaningEn: 'nerve' }
];

const BASIC_DASHBOARD_LOCKED_GAMES = [
  {
    id: 'quiz',
    name: 'Quiz',
    enName: 'Quiz Mode',
    plan: 'Pro ve üzeri gerekir',
    enPlan: 'Requires Pro & above'
  },
  {
    id: 'morpheme',
    name: 'Morfem Yapıcı',
    enName: 'Morpheme Builder',
    plan: 'Pro ve üzeri gerekir',
    enPlan: 'Requires Pro & above'
  },
  {
    id: 'level',
    name: 'Seviye ve günlük tekrar',
    enName: 'Level & daily repetition',
    plan: 'Pro ve üzeri gerekir',
    enPlan: 'Requires Pro & above'
  }
];

// =============================================================================
// TEMEL PLAN KULLANICISI İÇİN DİNAMİK PANEL (9d Şablonu)
// =============================================================================
const BasicUserDashboard = ({
  userName,
  streak,
  termCount,
  isTr,
  todayFormatted,
  trialState,
  firestoreData,
  pastDueState,
  handleUpgrade,
  checkoutLoading
}) => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentTerms, setRecentTerms] = useState([]);

  // Dinamik Son Bakılan Terimler (localStorage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('healthlex_recent_terms');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentTerms(parsed.slice(0, 4));
        }
      }
    } catch (e) {}
  }, []);

  // ⌘K / Ctrl+K Kısayol Tuşu Dinleyicisi
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dinamik Kategori Terim Sayıları
  const catCounts = useMemo(() => {
    const counts = {};
    FREE_DASHBOARD_CATEGORIES.forEach((cat) => {
      try {
        const terms = getTermsByCategory(cat.id);
        counts[cat.id] = terms && terms.length > 0 ? terms.length : cat.defaultCount;
      } catch (e) {
        counts[cat.id] = cat.defaultCount;
      }
    });
    return counts;
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/study?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/study');
    }
  };

  // Deneme Bitişi, İlk Tahsilat ve Plan Tutarı Hesaplama
  const billingInfo = useMemo(() => {
    let trialEndObj = null;
    let billingObj = null;

    if (trialState) {
      if (trialState.endDate) trialEndObj = trialState.endDate;
      if (trialState.nextBilledAt) billingObj = trialState.nextBilledAt;
    }

    if (!trialEndObj && firestoreData?.trialEndDate) {
      trialEndObj = firestoreData.trialEndDate.toDate
        ? firestoreData.trialEndDate.toDate()
        : new Date(firestoreData.trialEndDate);
    }
    if (!billingObj && firestoreData?.nextBilledAt) {
      billingObj = firestoreData.nextBilledAt.toDate
        ? firestoreData.nextBilledAt.toDate()
        : new Date(firestoreData.nextBilledAt);
    }

    if (!trialEndObj) {
      if (firestoreData?.createdAt) {
        const created = firestoreData.createdAt.toDate
          ? firestoreData.createdAt.toDate()
          : new Date(firestoreData.createdAt);
        trialEndObj = new Date(created.getTime() + 3 * 24 * 60 * 60 * 1000);
      } else {
        const storedStart = localStorage.getItem('healthlex_user_trial_start');
        const startMs = storedStart ? parseInt(storedStart, 10) : Date.now();
        trialEndObj = new Date(startMs + 3 * 24 * 60 * 60 * 1000);
      }
    }

    if (!billingObj) {
      billingObj = trialEndObj;
    }

    const formatDate = (d) => {
      try {
        const date = new Date(d);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleDateString(isTr ? 'tr-TR' : 'en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      } catch {
        return '';
      }
    };

    return {
      trialEndDateFormatted: formatDate(trialEndObj),
      firstBillingDateFormatted: formatDate(billingObj),
      amount: isTr ? '₺790/yıl' : '₺790/yr'
    };
  }, [trialState, firestoreData, isTr]);

  const streakDays = streak?.currentStreak && streak.currentStreak > 0 ? streak.currentStreak : 0;
  const termsVal = termCount ? String(termCount) : '446';
  const learnedCount = getStats()?.learnedTerms || 0;

  const statsList = [
    { label: isTr ? 'ÖĞRENİLEN' : 'LEARNED', v: String(learnedCount), unit: isTr ? 'terim' : 'terms' },
    { label: isTr ? 'SERİ' : 'STREAK', v: String(streakDays), unit: isTr ? 'gün' : 'days' },
    { label: isTr ? 'KÜTÜPHANE' : 'LIBRARY', v: termsVal, unit: isTr ? 'terim' : 'terms' },
    { label: isTr ? 'MORFEM' : 'MORPHEMES', v: '100', unit: isTr ? 'açık' : 'unlocked' }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f5f7fb] dark:bg-background py-8 sm:py-11 px-4 sm:px-6 lg:px-8 flex justify-center font-sans antialiased">
      <div className="w-full max-w-[1120px] flex flex-col gap-6 sm:gap-7">
        {/* Üst Karşılama Başlığı ve Arama Kutusu */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5 lg:gap-8">
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-[12px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'PANELİM · TEMEL PLAN' : 'DASHBOARD · BASIC PLAN'}
              </span>
              <span className="bg-[#f5f7fb] dark:bg-muted border border-[#dfe4ee] dark:border-border text-[#6b7a90] dark:text-muted-foreground font-extrabold text-[11px] px-2 py-0.5 rounded-[6px]">
                {isTr ? 'Temel' : 'Basic'}
              </span>
              {todayFormatted && (
                <span className="text-[12px] text-[#6b7a90] dark:text-muted-foreground hidden sm:inline opacity-80">
                  · {todayFormatted}
                </span>
              )}
            </div>
            <h1 className="m-0 font-semibold text-2xl sm:text-[34px] sm:leading-[1.15] text-[#0f1b33] dark:text-foreground font-['Lora',Georgia,serif]">
              {isTr
                ? `Merhaba ${userName || 'Öğrenci'}, kütüphane tamamen açık.`
                : `Hello ${userName || 'Student'}, library is fully open.`}
            </h1>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2.5 bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] px-4 w-full lg:w-[420px] h-[50px] shrink-0 shadow-xs focus-within:border-[#2563eb] transition-all"
          >
            <Search className="w-4 h-4 text-[#6b7a90] shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isTr
                  ? 'Terim veya morfem ara… örn. “os frontale”'
                  : 'Search terms or morphemes… e.g. "os frontale"'
              }
              className="bg-transparent border-none outline-hidden text-[14px] sm:text-[15px] font-normal text-[#0f1b33] dark:text-foreground placeholder:text-[#9aa6ba] w-full"
            />
            <span className="font-bold text-[11px] text-[#6b7a90] dark:text-muted-foreground border border-[#e5e9f2] dark:border-border rounded-[5px] px-1.5 py-0.5 select-none shrink-0">
              ⌘K
            </span>
          </form>
        </div>

        {/* Ödeme Gecikmesi / Ek Süre Uyarısı */}
        {pastDueState?.isPastDue && (
          <div className={`rounded-xl p-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs ${
            pastDueState.isWithinGracePeriod
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-950 dark:text-amber-200'
              : 'bg-destructive/10 border-destructive/40 text-destructive'
          }`}>
            <div className="flex items-start sm:items-center gap-3">
              <span className="text-2xl shrink-0">{pastDueState.isWithinGracePeriod ? '⚠️' : '🚫'}</span>
              <div>
                <p className="font-bold text-sm">
                  {pastDueState.isWithinGracePeriod
                    ? (isTr ? 'Ödemeniz Kartınızdan Tahsil Edilemedi' : 'Subscription Renewal Payment Failed')
                    : (isTr ? '5 Günlük Ek Süre Sona Erdi' : '5-Day Grace Period Expired')}
                </p>
                <p className="text-xs opacity-90 mt-0.5">
                  {pastDueState.isWithinGracePeriod
                    ? (isTr
                        ? `Abonelik yenilemeniz alınamadı. Hizmetinizin kesilmemesi için ${pastDueState.daysLeft} gün içerisinde kartınızı güncellemelisiniz.`
                        : `Your subscription renewal failed. Please update your card within ${pastDueState.daysLeft} days to avoid service interruption.`)
                    : (isTr
                        ? '5 günlük ek süre sona erdiği için erişim kısıtlanmıştır. Lütfen kartınızı güncelleyin veya yeni bir plan seçin.'
                        : 'Access is restricted because the 5-day grace period has expired. Please update your card.')}
                </p>
              </div>
            </div>
            <Link
              to="/pricing"
              className="shrink-0 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              {isTr ? 'Kartı Güncelle' : 'Update Card'}
            </Link>
          </div>
        )}

        {/* Deneme Bitişi, İlk Tahsilat ve Plan Tutarı Şeridi (İstenen Özellik) */}
        <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[14px] p-4 sm:p-[14px_20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 shadow-xs text-left">
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-[13px] sm:text-[14px] text-[#0f1b33] dark:text-foreground">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.1em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'Deneme bitişi:' : 'Trial ends:'}
              </span>
              <span className="font-bold text-[#0f1b33] dark:text-foreground">
                {billingInfo.trialEndDateFormatted}
              </span>
            </div>
            <span className="text-[#dfe4ee] dark:text-border hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.1em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'İlk tahsilat:' : 'First billing:'}
              </span>
              <span className="font-bold text-[#0f1b33] dark:text-foreground">
                {billingInfo.firstBillingDateFormatted}
              </span>
            </div>
            <span className="text-[#dfe4ee] dark:text-border hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.1em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'Mevcut Plan:' : 'Current Plan:'}
              </span>
              <span className="font-extrabold text-[12px] px-2.5 py-1 rounded-[6px] bg-[#e8f0ff] dark:bg-blue-950/60 text-[#2563eb] dark:text-blue-400 border border-[#2563eb]/20">
                {isTr ? `Temel Plan · ${billingInfo.amount}` : `Basic Plan · ${billingInfo.amount}`}
              </span>
            </div>
          </div>
          <Link
            to="/pricing"
            className="text-[13px] font-bold text-[#2563eb] hover:underline shrink-0 whitespace-nowrap self-end sm:self-auto"
          >
            {isTr ? 'Planı Yönet →' : 'Manage Plan →'}
          </Link>
        </div>

        {/* 4'lü İstatistik Şeridi (9d Şablonu) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {statsList.map((q, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] p-3.5 sm:p-4 flex flex-col gap-1 text-left shadow-xs"
            >
              <span className="font-extrabold text-[10px] leading-none tracking-[0.1em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {q.label}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-2xl sm:text-[24px] leading-none text-[#0f1b33] dark:text-foreground">
                  {q.v}
                </span>
                <span className="font-semibold text-[11px] text-[#6b7a90] dark:text-muted-foreground">
                  {q.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Ana Sütun Bölümü (Kategoriler | Morfemler | Oyunlar) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-5 items-start">
          {/* SÜTUN 1: KATEGORİLER (14) & SON BAKILAN TERİMLER */}
          <div className="flex flex-col gap-3.5 text-left">
            <div className="flex justify-between items-baseline">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? `KATEGORİLER · ${FREE_DASHBOARD_CATEGORIES.length}` : `CATEGORIES · ${FREE_DASHBOARD_CATEGORIES.length}`}
              </span>
              <Link to="/study" className="font-bold text-[12px] text-[#2563eb] hover:underline">
                {isTr ? 'Tümü →' : 'View all →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FREE_DASHBOARD_CATEGORIES.map((cat) => {
                const count = catCounts[cat.id] || cat.defaultCount;
                const displayName = isTr ? cat.name : cat.enName;
                return (
                  <Link
                    key={cat.id}
                    to={`/study?category=${cat.id}`}
                    className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[10px] p-3 sm:px-3.5 sm:py-3 flex justify-between items-center gap-2.5 text-[#0f1b33] dark:text-foreground hover:border-[#2563eb]/40 hover:shadow-xs transition-all group"
                  >
                    <span className="font-bold text-[13px] leading-[1.3] truncate group-hover:text-[#2563eb] transition-colors">
                      {displayName}
                    </span>
                    <span className="font-semibold text-[12px] text-[#6b7a90] dark:text-muted-foreground shrink-0">
                      {count} {isTr ? 'terim' : 'terms'}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Son Bakılan Terimler Bölümü */}
            {recentTerms.length > 0 ? (
              <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[11px] leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                    {isTr ? 'SON BAKILAN TERİMLER' : 'RECENTLY VIEWED TERMS'}
                  </span>
                  <Link to="/study" className="font-bold text-[12px] text-[#2563eb] hover:underline">
                    {isTr ? 'Sözlük →' : 'Glossary →'}
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recentTerms.map((rt, idx) => (
                    <Link
                      key={idx}
                      to={`/study/${rt.slug || rt.term}`}
                      className="bg-[#f9fafc] dark:bg-muted/30 border border-[#e5e9f2] dark:border-border/60 hover:border-[#2563eb]/40 rounded-[9px] p-2.5 flex justify-between items-center gap-2 transition-all group"
                    >
                      <span className="font-bold text-[13px] text-[#0f1b33] dark:text-foreground truncate group-hover:text-[#2563eb]">
                        {rt.term}
                      </span>
                      {rt.turkish && (
                        <span className="text-[11px] text-[#6b7a90] dark:text-muted-foreground truncate max-w-[110px]">
                          {rt.turkish}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-card border border-dashed border-[#d5dbe7] dark:border-border/80 rounded-[12px] p-4 sm:p-[14px_16px] flex flex-col gap-1.5">
                <span className="font-extrabold text-[11px] leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                  {isTr ? 'SON BAKILAN TERİMLER' : 'RECENTLY VIEWED TERMS'}
                </span>
                <span className="font-semibold text-[13px] leading-[1.5] text-[#3c4858] dark:text-foreground/80">
                  {isTr
                    ? 'Henüz bir terime bakmadın. Aramadan veya bir kategoriden başlayabilirsin.'
                    : 'You have not viewed any terms yet. Search above or start from a category.'}
                </span>
              </div>
            )}
          </div>

          {/* SÜTUN 2: MORFEMLER · 100 TANESİ AÇIK */}
          <div className="flex flex-col gap-3.5 text-left">
            <div className="flex justify-between items-baseline">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'MORFEMLER · 100 TANESİ AÇIK' : 'MORPHEMES · 100 UNLOCKED'}
              </span>
              <Link to="/morphemes" className="font-bold text-[12px] text-[#2563eb] hover:underline">
                {isTr ? 'Liste →' : 'List →'}
              </Link>
            </div>

            <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[14px] p-4 flex flex-col gap-3 shadow-xs">
              {/* Morfem İlerleme Çubuğu */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-bold text-[13px] text-[#0f1b33] dark:text-foreground">
                  <span>{isTr ? '100 / 571 açık' : '100 / 571 open'}</span>
                  <span className="text-[#2563eb] dark:text-blue-400 font-extrabold">%18</span>
                </div>
                <div className="h-1.5 bg-[#eef1f6] dark:bg-muted rounded-full overflow-hidden">
                  <div className="w-[17.5%] h-full bg-[#2563eb]" />
                </div>
              </div>

              {/* 5 Örnek Morfem (9d Şablonu) */}
              <div className="flex flex-col gap-1.5">
                {BASIC_DASHBOARD_MORPHEMES.map((m, idx) => (
                  <Link
                    key={idx}
                    to={`/morphemes?search=${encodeURIComponent(m.name.replace(/[^a-zA-Z]/g, ''))}`}
                    className="flex justify-between items-center gap-2.5 px-3 py-2 rounded-[8px] bg-[#f9fafc] dark:bg-muted/30 hover:bg-[#e8f0ff] dark:hover:bg-primary/15 transition-colors group"
                  >
                    <span className="font-extrabold text-[13px] text-[#0f1b33] dark:text-foreground font-mono group-hover:text-[#2563eb]">
                      {m.name}
                    </span>
                    <span className="font-normal text-[12px] text-[#6b7a90] dark:text-muted-foreground">
                      {isTr ? m.meaningTr : m.meaningEn}
                    </span>
                  </Link>
                ))}
              </div>

              <span className="font-normal text-[12px] leading-[1.4] text-[#6b7a90] dark:text-muted-foreground">
                {isTr
                  ? 'Temel planda 100 morfem sınırsız açıktır. Kalan 471 morfem için Pro’ya geçebilirsiniz.'
                  : '100 morphemes are unlocked in Basic plan. Upgrade to Pro for the remaining 471.'}
              </span>
            </div>
          </div>

          {/* SÜTUN 3: OYUNLAR · 2 AÇIK */}
          <div className="flex flex-col gap-3.5 text-left">
            <div className="flex justify-between items-baseline">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'OYUNLAR · 2 AÇIK' : 'GAMES · 2 UNLOCKED'}
              </span>
              <Link to="/games" className="font-bold text-[12px] text-[#2563eb] hover:underline">
                {isTr ? 'Tümü →' : 'All →'}
              </Link>
            </div>

            {/* 2 Açık Oyun (Flashcard, Eşleştirme) */}
            <div className="flex flex-col gap-2.5">
              {/* Flashcard */}
              <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] p-3.5 flex flex-col gap-2 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[15px] text-[#0f1b33] dark:text-foreground">
                    Flashcard
                  </span>
                  <span className="font-extrabold text-[10px] leading-none px-2 py-1 rounded-[6px] bg-[#e8f0ff] text-[#2563eb] dark:bg-blue-950/60 dark:text-blue-400 select-none">
                    {isTr ? 'AÇIK' : 'OPEN'}
                  </span>
                </div>
                <span className="font-normal text-[12px] leading-[1.4] text-[#6b7a90] dark:text-muted-foreground">
                  {isTr ? 'Kartlarla terim tekrarı. Sınırsız oyna.' : 'Review terms with cards. Play unlimited.'}
                </span>
                <Link
                  to="/flashcards"
                  className="block text-center bg-[#0f1b33] hover:bg-[#1d4ed8] text-white font-bold text-[13px] py-2 px-3 rounded-[9px] transition-colors"
                >
                  {isTr ? 'Başlat' : 'Start'}
                </Link>
              </div>

              {/* Eşleştirme */}
              <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] p-3.5 flex flex-col gap-2 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[15px] text-[#0f1b33] dark:text-foreground">
                    {isTr ? 'Eşleştirme' : 'Matching Game'}
                  </span>
                  <span className="font-extrabold text-[10px] leading-none px-2 py-1 rounded-[6px] bg-[#e8f0ff] text-[#2563eb] dark:bg-blue-950/60 dark:text-blue-400 select-none">
                    {isTr ? 'AÇIK' : 'OPEN'}
                  </span>
                </div>
                <span className="font-normal text-[12px] leading-[1.4] text-[#6b7a90] dark:text-muted-foreground">
                  {isTr ? 'Terimleri Türkçe karşılıklarıyla eşleştir.' : 'Match terms with their definitions.'}
                </span>
                <Link
                  to="/match"
                  className="block text-center bg-[#0f1b33] hover:bg-[#1d4ed8] text-white font-bold text-[13px] py-2 px-3 rounded-[9px] transition-colors"
                >
                  {isTr ? 'Başlat' : 'Start'}
                </Link>
              </div>
            </div>

            {/* 3 Kilitli Oyun (Quiz, Morfem Yapıcı, Seviye ve tekrar) */}
            <div className="flex flex-col gap-2">
              {BASIC_DASHBOARD_LOCKED_GAMES.map((g) => (
                <Link
                  key={g.id}
                  to="/pricing"
                  className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[10px] p-2.5 sm:px-3.5 sm:py-2.5 flex justify-between items-center gap-2.5 opacity-80 hover:opacity-100 hover:border-[#2563eb]/40 transition-all group"
                >
                  <div>
                    <div className="font-extrabold text-[13px] text-[#0f1b33] dark:text-foreground group-hover:text-[#2563eb] transition-colors">
                      {isTr ? g.name : g.enName}
                    </div>
                    <div className="font-normal text-[11px] text-[#6b7a90] dark:text-muted-foreground mt-0.5">
                      {isTr ? g.plan : g.enPlan}
                    </div>
                  </div>
                  <span className="font-extrabold text-[10px] leading-none px-2 py-1 rounded-[6px] bg-[#f5f7fb] dark:bg-muted text-[#6b7a90] dark:text-muted-foreground shrink-0 select-none">
                    🔒 {isTr ? 'KİLİTLİ' : 'LOCKED'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Pro Yükseltme Kartı (9d Şablonu) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[14px] p-4 sm:p-[18px_24px] gap-4 sm:gap-6 shadow-xs text-left">
          <div>
            <div className="font-semibold text-base sm:text-[17px] font-['Lora',Georgia,serif] text-[#0f1b33] dark:text-foreground">
              {isTr
                ? 'Quiz, Morfem Yapıcı ve seviye sistemi Pro’da'
                : 'Quiz, Morpheme Builder and level system in Pro'}
            </div>
            <div className="font-normal text-[12px] sm:text-[13px] text-[#6b7a90] dark:text-muted-foreground mt-1">
              {isTr
                ? 'Pro ₺2.000/yıl · Ömür Boyu ₺5.990 tek ödeme'
                : 'Pro ₺2,000/yr · Lifetime ₺5,990 one-time'}
            </div>
          </div>

          <button
            type="button"
            onClick={handleUpgrade}
            disabled={checkoutLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f1b33] dark:bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-[14px] px-6 py-3 rounded-[10px] shrink-0 whitespace-nowrap transition-all shadow-xs cursor-pointer disabled:opacity-60"
          >
            <span>
              {checkoutLoading
                ? (isTr ? 'Yükleniyor...' : 'Loading...')
                : (isTr ? 'Pro’ya yükselt' : 'Upgrade to Pro')}
            </span>
            {!checkoutLoading && <span className="text-base leading-none">→</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// PRO / LIFETIME KULLANICISI İÇİN DİNAMİK PANEL (10a Şablonu)
// =============================================================================
const ProUserDashboard = ({
  userName,
  streak,
  termCount,
  isTr,
  currentPlan,
  pastDueState,
  todayFormatted
}) => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentTerms, setRecentTerms] = useState([]);
  const [goal, setGoal] = useState(() => {
    try {
      const saved = localStorage.getItem('healthlex_daily_goal');
      return saved ? parseInt(saved, 10) : 15;
    } catch {
      return 15;
    }
  });

  const isLifetime = currentPlan === 'lifetime';

  // Dinamik Son Bakılan Terimler (localStorage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('healthlex_recent_terms');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentTerms(parsed.slice(0, 3));
        }
      }
    } catch (e) {}
  }, []);

  // ⌘K / Ctrl+K Kısayol Tuşu Dinleyicisi
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGoalChange = (newGoal) => {
    setGoal(newGoal);
    try {
      localStorage.setItem('healthlex_daily_goal', String(newGoal));
    } catch (e) {}
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/study?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/study');
    }
  };

  const streakDays = streak?.currentStreak && streak.currentStreak > 0 ? streak.currentStreak : 1;
  const stats = getStats() || {};
  const learnedCount = stats.learnedTerms || 0;
  const learnedMorphemes = stats.learnedMorphemes !== undefined ? stats.learnedMorphemes : getLearnedMorphemesCount();
  const userLevel = stats.userLevel || getUserLevel(learnedCount, learnedMorphemes);
  const morphemePct = Math.round((learnedMorphemes / 571) * 100);

  // Oyun kartları listesi (10a SVG ikonları ve degradeleri ile)
  const games = [
    {
      name: 'Flashcard',
      desc: isTr ? 'Kartlarla hızlı tekrar' : 'Quick review with cards',
      link: '/flashcards',
      bg: 'linear-gradient(135deg,#3b82f6,#93c5fd)',
      d: 'M2 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z'
    },
    {
      name: isTr ? 'Eşleştirme' : 'Matching',
      desc: isTr ? 'Terim ve Türkçe karşılığı' : 'Match term with definition',
      link: '/match',
      bg: 'linear-gradient(135deg,#22c55e,#facc15)',
      d: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5'
    },
    {
      name: 'Quiz',
      desc: isTr ? 'Kategoriye özel sorular' : 'Category-specific questions',
      link: '/quiz',
      bg: 'linear-gradient(135deg,#f97316,#fcd34d)',
      d: 'M9.5 2a4 4 0 0 0-4 4v1.5a3.5 3.5 0 0 0 0 7V16a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4zM14.5 2a4 4 0 0 1 4 4v1.5a3.5 3.5 0 0 1 0 7V16a4 4 0 0 1-8 0'
    },
    {
      name: isTr ? 'Morfem Yapıcı' : 'Morpheme Builder',
      desc: isTr ? 'Terimi parçalarından kur' : 'Build term from morphemes',
      link: '/games/morpheme-builder',
      bg: 'linear-gradient(135deg,#7c3aed,#c084fc)',
      d: 'M14 7a2 2 0 1 0-4 0H7v3a2 2 0 1 0 0 4v3h3a2 2 0 1 0 4 0h3v-3a2 2 0 1 0 0-4V7z'
    }
  ];

  // 11a metin ve stil dinamikleri
  const planLabel = isLifetime ? (isTr ? 'Ömür Boyu' : 'Lifetime') : (isTr ? 'Pro plan' : 'Pro plan');
  const eyebrow = isLifetime
    ? (isTr ? 'PANELİM · ÖMÜR BOYU' : 'DASHBOARD · LIFETIME')
    : (isTr ? 'PANELİM · PRO PLAN' : 'DASHBOARD · PRO PLAN');
  const badgeBg = isLifetime ? '#fff7e6' : '#e8f0ff';
  const badgeBorder = isLifetime ? '#f5d9a0' : '#c9dcff';
  const badgeDot = isLifetime ? '#d97706' : '#2563eb';
  const badgeFg = isLifetime ? '#92400e' : '#1d4ed8';

  const footTitle = isLifetime
    ? (isTr ? 'Ömür boyu erişimin aktif' : 'Lifetime access is active')
    : (isTr ? 'Planın aktif' : 'Your plan is active');
  const footText = isLifetime
    ? (isTr
        ? 'Yenileme yok, ek ödeme yok. Gelecek modüller hesabına otomatik eklenir.'
        : 'No renewals, no extra fees. Future modules will be automatically added to your account.')
    : (isTr
        ? 'Pro planın yenilenene kadar tüm modüller açık. Ömür Boyu’na geçersen yenileme tamamen kalkar.'
        : 'All modules are unlocked until your Pro plan renews. Switch to Lifetime to remove renewals permanently.');
  const footCta = isLifetime
    ? (isTr ? 'Gelecek modülleri gör →' : 'See upcoming modules →')
    : (isTr ? 'Planımı yönet →' : 'Manage my plan →');

  // Dinamik Kategori Terim Sayıları
  const catCounts = useMemo(() => {
    const counts = {};
    FREE_DASHBOARD_CATEGORIES.forEach((cat) => {
      try {
        const terms = getTermsByCategory(cat.id);
        counts[cat.id] = terms && terms.length > 0 ? terms.length : cat.defaultCount;
      } catch (e) {
        counts[cat.id] = cat.defaultCount;
      }
    });
    return counts;
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f5f7fb] dark:bg-background py-7 sm:py-9 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 flex justify-center font-sans antialiased text-[#1f2937] dark:text-foreground">
      <div className="w-full max-w-[1536px] 2xl:max-w-[1620px] flex flex-col gap-7 sm:gap-8">
        {/* Üst Karşılama Başlığı, Özellik Rozetleri ve Arama Kutusu (Genişletilmiş & Dolu Dolu) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-8">
          <div className="flex flex-col gap-2.5 text-left">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-extrabold text-[12px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {eyebrow}
              </span>
              <span
                style={{
                  backgroundColor: badgeBg,
                  borderColor: badgeBorder,
                  color: badgeFg
                }}
                className="border font-extrabold text-[12px] px-2.5 py-1 rounded-[8px] inline-flex items-center gap-1.5 shadow-2xs"
              >
                <span style={{ backgroundColor: badgeDot }} className="w-2 h-2 rounded-full" />
                {planLabel}
              </span>
              {todayFormatted && (
                <span className="text-[12px] text-[#6b7a90] dark:text-muted-foreground hidden sm:inline opacity-80">
                  · {todayFormatted}
                </span>
              )}
            </div>
            <h1 className="m-0 font-semibold text-2xl sm:text-[34px] xl:text-[38px] sm:leading-[1.15] text-[#0f1b33] dark:text-foreground font-['Lora',Georgia,serif]">
              {isLifetime
                ? (isTr
                    ? `Merhaba ${userName || 'Selin'}, ömür boyu erişimin aktif — her şey sınırsız.`
                    : `Hello ${userName || 'there'}, your lifetime access is active — all features unlocked.`)
                : (isTr
                    ? `Merhaba ${userName || 'Selin'}, her şey açık.`
                    : `Hello ${userName || 'there'}, everything is unlocked.`)}
            </h1>

            {/* Dolu Dolu Kapsam Etiketleri */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#4b5563] dark:text-muted-foreground bg-white dark:bg-card border border-[#e5e9f2] dark:border-border px-3 py-1 rounded-full shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                588+ {isTr ? 'Tıbbi Terim' : 'Medical Terms'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#4b5563] dark:text-muted-foreground bg-white dark:bg-card border border-[#e5e9f2] dark:border-border px-3 py-1 rounded-full shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                571 {isTr ? 'Morfem Kütüphanesi' : 'Morphemes'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#4b5563] dark:text-muted-foreground bg-white dark:bg-card border border-[#e5e9f2] dark:border-border px-3 py-1 rounded-full shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                4 {isTr ? 'İnteraktif Oyun Modu' : 'Game Modes'}
              </span>
              {isLifetime && (
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#b45309] bg-[#fef3c7] dark:bg-amber-950/40 dark:text-amber-300 border border-[#fde68a] dark:border-amber-800/60 px-3 py-1 rounded-full shadow-2xs">
                  ✨ {isTr ? 'Ömür Boyu Güncelleme Dahil' : 'Lifetime Updates Included'}
                </span>
              )}
            </div>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2.5 bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[14px] px-4 w-full lg:w-[440px] xl:w-[480px] h-[52px] shrink-0 shadow-xs focus-within:border-[#2563eb] transition-all"
          >
            <Search className="w-4 h-4 text-[#6b7a90] shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isTr
                  ? 'Terim veya morfem ara… örn. “os frontale”'
                  : 'Search terms or morphemes… e.g. "os frontale"'
              }
              className="bg-transparent border-none outline-hidden text-[14px] sm:text-[15px] font-normal text-[#0f1b33] dark:text-foreground placeholder:text-[#9aa6ba] w-full"
            />
            <span className="font-bold text-[11px] text-[#6b7a90] dark:text-muted-foreground border border-[#e5e9f2] dark:border-border rounded-[5px] px-1.5 py-0.5 select-none shrink-0">
              ⌘K
            </span>
          </form>
        </div>

        {/* Ödeme Gecikmesi / Ek Süre Uyarısı */}
        {pastDueState?.isPastDue && (
          <div className={`rounded-xl p-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs ${
            pastDueState.isWithinGracePeriod
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-950 dark:text-amber-200'
              : 'bg-destructive/10 border-destructive/40 text-destructive'
          }`}>
            <div className="flex items-start sm:items-center gap-3">
              <span className="text-2xl shrink-0">{pastDueState.isWithinGracePeriod ? '⚠️' : '🚫'}</span>
              <div>
                <p className="font-bold text-sm">
                  {pastDueState.isWithinGracePeriod
                    ? (isTr ? 'Ödemeniz Kartınızdan Tahsil Edilemedi' : 'Subscription Renewal Payment Failed')
                    : (isTr ? '5 Günlük Ek Süre Sona Erdi' : '5-Day Grace Period Expired')}
                </p>
                <p className="text-xs opacity-90 mt-0.5">
                  {pastDueState.isWithinGracePeriod
                    ? (isTr
                        ? `Abonelik yenilemeniz alınamadı. Hizmetinizin kesilmemesi için ${pastDueState.daysLeft} gün içerisinde kartınızı güncellemelisiniz.`
                        : `Your subscription renewal failed. Please update your card within ${pastDueState.daysLeft} days to avoid service interruption.`)
                    : (isTr
                        ? '5 günlük ek süre sona erdiği için erişim kısıtlanmıştır. Lütfen kartınızı güncelleyin.'
                        : 'Access is restricted because the 5-day grace period has expired. Please update your card.')}
                </p>
              </div>
            </div>
            <Link
              to="/pricing"
              className="shrink-0 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              {isTr ? 'Kartı Güncelle' : 'Update Card'}
            </Link>
          </div>
        )}

        {/* 2'Lİ ÜST IZGARA: BUGÜNKÜ TEKRAR & SEVİYE VE SERİ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.35fr_1fr] gap-5 xl:gap-6 items-stretch">
          {/* Sol Kart: BUGÜNKÜ TEKRAR (11a) */}
          <div className="bg-[#0f1b33] dark:bg-[#0b1426] dark:border dark:border-[#1e2e4a] rounded-[18px] p-6 sm:p-7 xl:p-8 text-white flex flex-col justify-between gap-5 shadow-md text-left">
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#8fb3ff] uppercase">
                  {isTr ? 'BUGÜNKÜ TEKRAR' : 'TODAY’S REVIEW'}
                </div>
                <div className="font-semibold text-2xl sm:text-[28px] leading-[1.2] font-['Lora',Georgia,serif] mt-2 text-white">
                  {learnedCount > 0
                    ? (isTr ? 'Bugünkü tekrarlarına devam et' : 'Continue today’s review')
                    : (isTr ? 'İlk tekrarınla başla' : 'Start your first review')}
                </div>
                <div className="font-normal text-[14px] leading-[1.5] text-[#b8c4d9] mt-2 max-w-xl">
                  {learnedCount > 0
                    ? (isTr
                        ? `${learnedCount} terim öğrendin. Hedefine ulaşmak için günlük tekrarını yap.`
                        : `You have learned ${learnedCount} terms. Complete your daily review to reach your goal.`)
                    : (isTr
                        ? 'Henüz çalıştığın terim yok. Hedefini seç, sistem her gün sana o kadar terim getirsin.'
                        : 'No studied terms yet. Pick your target and the system will present that many terms each day.')}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-extrabold text-3xl sm:text-[36px] leading-none text-white">
                  {Math.min(learnedCount, goal)} / {goal}
                </div>
                <div className="font-semibold text-[12px] text-[#b8c4d9] mt-1">
                  {isTr ? 'bugün' : 'today'}
                </div>
              </div>
            </div>

            {/* Günlük Hedef Seçici */}
            <div className="flex flex-col gap-2">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.12em] text-[#8fb3ff] uppercase">
                {isTr ? 'GÜNLÜK HEDEF' : 'DAILY GOAL'}
              </span>
              <div className="flex gap-2">
                {[10, 15, 20, 25].map((n) => {
                  const on = goal === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleGoalChange(n)}
                      className={`flex-1 text-center py-2.5 rounded-[10px] font-extrabold text-[14px] transition-all cursor-pointer ${
                        on
                          ? 'bg-white text-[#0f1b33] border border-white shadow-xs'
                          : 'bg-white/6 hover:bg-white/10 text-[#dbe4f5] border border-white/18'
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bugünkü Tekrarını Yap Butonu */}
            <Link
              to="/flashcards"
              className="block text-center bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:opacity-95 text-white font-bold text-[15px] py-3.5 px-4 rounded-[12px] shadow-xs transition-all"
            >
              {isTr ? 'Bugünkü tekrarını yap →' : 'Start today’s review →'}
            </Link>
          </div>

          {/* Sağ Kart: SEVİYE VE SERİ (11a + 3'lü İstatistik) */}
          <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[18px] p-6 sm:p-7 xl:p-8 flex flex-col justify-between gap-5 shadow-xs text-left">
            <div className="flex flex-col gap-2.5">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'SEVİYE VE SERİ' : 'LEVEL & STREAK'}
              </span>
              <div
                style={{
                  backgroundColor: badgeBg,
                  borderColor: badgeBorder,
                  color: badgeFg
                }}
                className="inline-flex self-start items-center gap-2.5 border rounded-full py-2 px-4 shadow-2xs"
              >
                <span
                  style={{ backgroundColor: badgeDot }}
                  className="w-[24px] h-[24px] rounded-full text-white font-extrabold text-[12px] grid place-items-center"
                >
                  ★
                </span>
                <span className="font-extrabold text-[14px]">
                  {isTr
                    ? `${userLevel.titleTr} (Seviye ${userLevel.level}) · ${streakDays}. Gün Serisi`
                    : `${userLevel.titleEn} (Level ${userLevel.level}) · Day ${streakDays} Streak`}
                </span>
              </div>
              <span className="font-normal text-[13px] leading-[1.5] text-[#6b7a90] dark:text-muted-foreground">
                {isTr
                  ? 'Giriş yaptıkça günlük seriniz korunur. Terim ve morfem öğrendikçe seviyeniz yükselir.'
                  : 'Daily visits keep your streak alive. Master terms and morphemes to level up.'}
              </span>
            </div>

            {/* Geniş Ekranda 3 Sütunlu İstatistik Kutusu */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <div className="bg-[#f9fafc] dark:bg-muted/40 rounded-[12px] p-3 sm:p-3.5 border border-[#eef1f6] dark:border-border/60">
                <div className="font-extrabold text-xl sm:text-2xl leading-none text-[#0f1b33] dark:text-foreground">
                  {streakDays}
                </div>
                <div className="font-semibold text-[11px] sm:text-[12px] text-[#6b7a90] dark:text-muted-foreground mt-1">
                  {isTr ? 'gün seri' : 'day streak'}
                </div>
              </div>
              <div className="bg-[#f9fafc] dark:bg-muted/40 rounded-[12px] p-3 sm:p-3.5 border border-[#eef1f6] dark:border-border/60">
                <div className="font-extrabold text-xl sm:text-2xl leading-none text-[#0f1b33] dark:text-foreground">
                  {learnedCount}
                </div>
                <div className="font-semibold text-[11px] sm:text-[12px] text-[#6b7a90] dark:text-muted-foreground mt-1">
                  {isTr ? 'öğrenilen terim' : 'learned terms'}
                </div>
              </div>
              <div className="bg-[#f9fafc] dark:bg-muted/40 rounded-[12px] p-3 sm:p-3.5 border border-[#eef1f6] dark:border-border/60">
                <div className="font-extrabold text-xl sm:text-2xl leading-none text-[#0f1b33] dark:text-foreground">
                  {learnedMorphemes}
                </div>
                <div className="font-semibold text-[11px] sm:text-[12px] text-[#6b7a90] dark:text-muted-foreground mt-1">
                  {isTr ? 'öğrenilen morfem' : 'learned morphemes'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OYUN MODLARI · 4 AÇIK (11a Şablonu 4 Sütun) */}
        <div className="flex flex-col gap-3.5 text-left">
          <div className="flex justify-between items-baseline">
            <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
              {isTr ? 'OYUN MODLARI · 4 AÇIK' : 'GAME MODES · 4 UNLOCKED'}
            </span>
            <span className="text-[12px] text-[#6b7a90] dark:text-muted-foreground font-semibold">
              {isTr ? 'Sınırsız Çalışma' : 'Unlimited Practice'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
            {games.map((g, i) => (
              <Link
                key={i}
                to={g.link}
                className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border hover:border-[#2563eb]/50 hover:shadow-md rounded-[16px] p-5 sm:p-6 flex flex-col justify-between gap-4 text-[#0f1b33] dark:text-foreground transition-all group hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div
                    style={{ background: g.bg }}
                    className="w-11 h-11 rounded-[12px] grid place-items-center shrink-0 shadow-xs"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={g.d} />
                    </svg>
                  </div>
                  <span className="font-bold text-[12px] text-[#2563eb] dark:text-blue-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    {isTr ? 'Başla' : 'Play'} →
                  </span>
                </div>
                <div>
                  <div className="font-extrabold text-[16px] group-hover:text-[#2563eb] transition-colors">
                    {g.name}
                  </div>
                  <div className="font-normal text-[13px] leading-[1.45] text-[#6b7a90] dark:text-muted-foreground mt-1">
                    {g.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 3'LÜ ALT IZGARA: ZAYIF TERİMLER · SON BAKILAN TERİMLER · MORFEM İLERLEMESİ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-6 items-stretch text-left">
          {/* 1. ZAYIF TERİMLER (11a) */}
          <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[16px] p-5 sm:p-6 flex flex-col justify-between gap-3 shadow-xs">
            <div className="flex flex-col gap-2.5">
              <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                {isTr ? 'ZAYIF TERİMLER' : 'WEAK TERMS'}
              </span>
              <span className="font-semibold text-[14px] leading-[1.5] text-[#3c4858] dark:text-foreground/90">
                {isTr ? 'Zorlandığın terimler burada birikir.' : 'Terms you struggle with accumulate here.'}
              </span>
              <span className="font-normal text-[13px] leading-[1.5] text-[#6b7a90] dark:text-muted-foreground">
                {isTr
                  ? 'Oyun oynadıkça ve test çözdükçe yanlış bildiğin terimler otomatik olarak bu alana eklenir.'
                  : 'As you play games and solve quizzes, terms you miss will automatically appear here.'}
              </span>
            </div>
            <Link
              to="/flashcards"
              className="mt-2 text-[12px] font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1"
            >
              {isTr ? 'Hafıza Kartlarıyla Başla' : 'Start with Flashcards'} →
            </Link>
          </div>

          {/* 2. SON BAKILAN TERİMLER (11a) */}
          <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[16px] p-5 sm:p-6 flex flex-col justify-between gap-3 shadow-xs">
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-baseline">
                <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                  {isTr ? 'SON BAKILAN TERİMLER' : 'RECENTLY VIEWED TERMS'}
                </span>
                {recentTerms.length > 0 && (
                  <Link to="/study" className="font-bold text-[12px] text-[#2563eb] hover:underline">
                    {isTr ? 'Sözlük →' : 'Glossary →'}
                  </Link>
                )}
              </div>
              {recentTerms.length > 0 ? (
                <div className="flex flex-col gap-2 mt-1">
                  {recentTerms.map((rt, idx) => (
                    <Link
                      key={idx}
                      to={`/study/${rt.slug || rt.term}`}
                      className="bg-[#f9fafc] dark:bg-muted/30 border border-[#e5e9f2] dark:border-border/60 hover:border-[#2563eb]/40 rounded-[10px] p-2.5 px-3 flex justify-between items-center gap-2 transition-all group"
                    >
                      <span className="font-bold text-[13px] text-[#0f1b33] dark:text-foreground truncate group-hover:text-[#2563eb]">
                        {rt.term}
                      </span>
                      {rt.turkish && (
                        <span className="text-[11.5px] text-[#6b7a90] dark:text-muted-foreground truncate max-w-[130px]">
                          {rt.turkish}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <>
                  <span className="font-semibold text-[14px] leading-[1.5] text-[#3c4858] dark:text-foreground/90">
                    {isTr ? 'Henüz bir terime bakmadın.' : 'You have not viewed any terms yet.'}
                  </span>
                  <span className="font-normal text-[13px] leading-[1.5] text-[#6b7a90] dark:text-muted-foreground">
                    {isTr
                      ? 'Yukarıdan arayabilir veya aşağıdaki kategorilerden bir terim inceleyebilirsin.'
                      : 'You can search above or explore terms from the categories below.'}
                  </span>
                </>
              )}
            </div>
            <Link
              to="/study"
              className="mt-2 text-[12px] font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1"
            >
              {isTr ? 'Tüm Terimler Sözlüğüne Git' : 'Browse All Terms'} →
            </Link>
          </div>

          {/* 3. MORFEM İLERLEMESİ (11a + Mikro İstatistikler) */}
          <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[16px] p-5 sm:p-6 flex flex-col justify-between gap-3.5 shadow-xs">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                  {isTr ? 'MORFEM İLERLEMESİ' : 'MORPHEME PROGRESS'}
                </span>
                <Link to="/morphemes" className="font-bold text-[12px] text-[#2563eb] hover:underline">
                  {isTr ? 'Liste →' : 'List →'}
                </Link>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-extrabold text-[28px] leading-none text-[#0f1b33] dark:text-foreground">
                  {learnedMorphemes} / 571
                </span>
                <span className="text-[12px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                  {learnedMorphemes > 0 ? `%${morphemePct} ${isTr ? 'Öğrenildi' : 'Learned'}` : (isTr ? 'Tümü Açık' : 'All Unlocked')}
                </span>
              </div>
              <div className="h-2 bg-[#eef1f6] dark:bg-muted rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.max(learnedMorphemes > 0 ? 3 : 0, morphemePct)}%` }}
                  className="h-full bg-[#2563eb] rounded-full transition-all duration-500"
                />
              </div>
              <span className="font-normal text-[13px] leading-[1.45] text-[#6b7a90] dark:text-muted-foreground">
                {learnedMorphemes > 0
                  ? (isTr
                      ? `571 morfemden ${learnedMorphemes} tanesini öğrendiniz (%${morphemePct}). Morfem Atlası’ndan yenilerini keşfedebilirsiniz.`
                      : `You have learned ${learnedMorphemes} out of 571 morphemes (${morphemePct}%). Keep exploring in the atlas.`)
                  : (isTr
                      ? '571 morfemin tamamı hesabına tanımlı. Morfem Atlası’nda "Öğrendim" butonuna basarak ilerlemeni kaydedebilirsin.'
                      : 'All 571 morphemes are unlocked. Visit Morpheme Atlas and click "Mark Learned" to track progress.')}
              </span>
            </div>

            {/* Ön Ek, Kök, Son Ek Dağılımı */}
            <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-[#f0f3f8] dark:border-border/50 text-center">
              <div className="flex flex-col">
                <span className="font-bold text-[14px] text-[#0f1b33] dark:text-foreground">155</span>
                <span className="text-[11px] text-[#6b7a90] dark:text-muted-foreground font-semibold">{isTr ? 'Ön Ek' : 'Prefix'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14px] text-[#0f1b33] dark:text-foreground">285</span>
                <span className="text-[11px] text-[#6b7a90] dark:text-muted-foreground font-semibold">{isTr ? 'Kök' : 'Root'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14px] text-[#0f1b33] dark:text-foreground">131</span>
                <span className="text-[11px] text-[#6b7a90] dark:text-muted-foreground font-semibold">{isTr ? 'Son Ek' : 'Suffix'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KATEGORİLER KÜTÜPHANESİ · 14 AÇIK + GENEL BAKIŞ (Ekranı zenginleştiren tam genişlik kütüphane) */}
        <div className="flex flex-col gap-3.5 text-left">
          <div className="flex justify-between items-baseline">
            <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
              {isTr ? `KATEGORİLER KÜTÜPHANESİ · ${FREE_DASHBOARD_CATEGORIES.length} AÇIK` : `CATEGORY LIBRARY · ${FREE_DASHBOARD_CATEGORIES.length} UNLOCKED`}
            </span>
            <Link to="/study" className="font-bold text-[12px] text-[#2563eb] hover:underline">
              {isTr ? 'Tüm Kütüphaneyi Gör →' : 'View Full Library →'}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {FREE_DASHBOARD_CATEGORIES.map((cat) => {
              const count = catCounts[cat.id] || cat.defaultCount;
              const displayName = isTr ? cat.name : cat.enName;
              return (
                <Link
                  key={cat.id}
                  to={`/study?category=${cat.id}`}
                  className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[12px] p-3 px-3.5 flex justify-between items-center gap-2 text-[#0f1b33] dark:text-foreground hover:border-[#2563eb]/50 hover:shadow-xs transition-all group"
                >
                  <span className="font-bold text-[13px] leading-[1.3] truncate group-hover:text-[#2563eb] transition-colors">
                    {displayName}
                  </span>
                  <span className="font-semibold text-[11.5px] text-[#6b7a90] dark:text-muted-foreground shrink-0 bg-[#f5f7fb] dark:bg-muted px-2 py-0.5 rounded-[5px]">
                    {count} {isTr ? 'terim' : 'terms'}
                  </span>
                </Link>
              );
            })}

            {/* Ekranı 5 Sütunda Tamamlayan 2 Önemli Hızlı Erişim Kartı */}
            <Link
              to="/study"
              className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-900/40 rounded-[12px] p-3 px-3.5 flex justify-between items-center gap-2 text-[#1d4ed8] dark:text-blue-300 hover:shadow-xs transition-all group"
            >
              <span className="font-extrabold text-[13px] leading-[1.3] truncate group-hover:underline">
                {isTr ? '📚 Tüm Terimler Sözlüğü' : '📚 All Terms Glossary'}
              </span>
              <span className="font-bold text-[11.5px] bg-white/90 dark:bg-blue-900/60 px-2 py-0.5 rounded-[5px]">
                588+ {isTr ? 'terim' : 'terms'}
              </span>
            </Link>

            <Link
              to="/morphemes"
              className="bg-gradient-to-r from-amber-50/70 to-orange-50/70 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900/40 rounded-[12px] p-3 px-3.5 flex justify-between items-center gap-2 text-[#b45309] dark:text-amber-300 hover:shadow-xs transition-all group"
            >
              <span className="font-extrabold text-[13px] leading-[1.3] truncate group-hover:underline">
                {isTr ? '🔬 Morfem & Kök Atlası' : '🔬 Morpheme Atlas'}
              </span>
              <span className="font-bold text-[11.5px] bg-white/90 dark:bg-amber-900/60 px-2 py-0.5 rounded-[5px]">
                571 {isTr ? 'morfem' : 'morphemes'}
              </span>
            </Link>
          </div>
        </div>

        {/* ALT BİLGİ & PLAN YÖNETİM ŞERİDİ (11a Şablonu) */}
        <div className={`border rounded-[16px] p-5 sm:p-[20px_24px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 shadow-xs text-left ${
          isLifetime
            ? 'bg-gradient-to-r from-amber-50/40 via-white to-amber-50/20 dark:from-amber-950/15 dark:via-card dark:to-amber-950/10 border-amber-200 dark:border-amber-900/50'
            : 'bg-white dark:bg-card border-[#e5e9f2] dark:border-border'
        }`}>
          <div>
            <div className="font-semibold text-lg font-['Lora',Georgia,serif] text-[#0f1b33] dark:text-foreground flex items-center gap-2">
              {isLifetime && <span className="text-amber-600 dark:text-amber-400">👑</span>}
              {footTitle}
            </div>
            <div className="font-normal text-[13px] leading-[1.5] text-[#6b7a90] dark:text-muted-foreground mt-1">
              {footText}
            </div>
          </div>
          <Link
            to="/pricing"
            className={`text-white font-bold text-[14px] py-3 px-5 rounded-[11px] shrink-0 transition-all self-stretch sm:self-auto text-center shadow-xs ${
              isLifetime
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800'
                : 'bg-[#0f1b33] dark:bg-[#2563eb] hover:bg-[#1d4ed8]'
            }`}
          >
            {footCta}
          </Link>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// ANA DASHBOARD BİLEŞENİ
// =============================================================================
export const Dashboard = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const previewRole = getPreviewRole();

  // State
  const [firebaseUser, setFirebaseUser] = useState(
    previewRole ? { uid: 'preview-uid', email: 'dr.kaya@healthlexmed.com', displayName: 'Dr. Ahmet Kaya' } : null
  );
  const [authReady, setAuthReady] = useState(!!previewRole);
  const [firestoreData, setFirestoreData] = useState(
    previewRole ? {
      isPro: previewRole === 'pro' || previewRole === 'lifetime',
      isBasic: previewRole === 'basic',
      isLifetime: previewRole === 'lifetime',
      plan: previewRole,
      subscriptionStatus: previewRole === 'basic' ? 'basic' : (previewRole === 'pro' ? 'active' : (previewRole === 'lifetime' ? 'lifetime' : 'free')),
      displayName: 'Dr. Ahmet Kaya'
    } : null
  );
  const [subLoading, setSubLoading] = useState(!previewRole);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [termCount, setTermCount] = useState(getInitialTermCount);

  // Term count fetching
  useEffect(() => {
    let isMounted = true;
    getTermCount().then((val) => {
      if (isMounted && typeof val === 'number') {
        setTermCount(val);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Auth Guard
  useEffect(() => {
    if (previewRole) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login', { replace: true });
        return;
      }
      setFirebaseUser(user);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, [navigate, previewRole]);

  // Firestore Kullanıcı ve Abonelik Verisi Çekme
  useEffect(() => {
    if (previewRole) return;
    if (!authReady || !firebaseUser) return;

    const fetchSubscription = async () => {
      try {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setFirestoreData(userDocSnap.data());
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
  const effectiveUserData = { ...(storedUser || {}), ...(firestoreData || {}), ...(firebaseUser || {}) };
  const trialState = getUserTrialState(effectiveUserData);
  const currentPlan = resolveUserPlan(firestoreData, trialState, previewRole);
  const pastDueState = getPastDueState(firestoreData);
  const hasPaidPlan = currentPlan === 'pro' || currentPlan === 'lifetime' || currentPlan === 'basic';

  const rawName =
    firestoreData?.displayName ||
    firestoreData?.name ||
    firebaseUser?.displayName ||
    storedUser?.name ||
    firebaseUser?.email?.split('@')[0] ||
    storedUser?.email?.split('@')[0] ||
    (isTr ? 'Kullanıcı' : 'User');

  const userName = formatTurkishName(rawName);
  const [streakState, setStreakState] = useState(() => getStreak());

  // Günlük giriş serisi güncelleme ve Firestore senkronizasyonu
  useEffect(() => {
    let isMounted = true;
    const initStreakAndMorphemes = async () => {
      try {
        if (firebaseUser?.uid) {
          await syncStreakFromFirestore().catch(() => {});
          await syncMorphemeProgressFromFirestore().catch(() => {});
        }
        const updated = await updateStreak();
        if (isMounted && updated) {
          setStreakState(updated);
        }
      } catch (err) {
        console.warn('[Dashboard] Error initializing streak on visit:', err);
      }
    };
    initStreakAndMorphemes();
    return () => { isMounted = false; };
  }, [firebaseUser]);

  const streak = streakState;
  const flashcardInfo = getFlashcardGuestDailyInfo();

  const todayFormatted = new Date().toLocaleDateString(isTr ? 'tr-TR' : 'en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  // Logout
  const handleLogout = async () => {
    try { await signOut(auth); } catch (err) { console.error('Logout error:', err); }
    logout();
    window.location.href = '/login';
  };

  // Plan Değişikliği (Yükseltme / Düşürme / Lifetime) — Tek Merkezi Mantık
  const handlePlanChange = useCallback(async (targetPlanKey) => {
    if (!IS_PAYMENT_ACTIVE) {
      toast.info(isTr ? 'Ödeme sistemi yakında aktif olacak.' : 'Payment system coming soon.');
      return;
    }

    if (targetPlanKey === currentPlan) {
      navigate('/pricing');
      return;
    }

    const currentRank = { basic: 1, pro: 2, lifetime: 3 }[currentPlan] || 0;
    const targetRank  = { basic: 1, pro: 2, lifetime: 3 }[targetPlanKey] || 0;
    if (targetRank < currentRank && targetPlanKey !== 'lifetime') {
      const confirmed = window.confirm(
        isTr
          ? `${currentPlan === 'pro' ? 'Pro' : 'mevcut'} planınızdan Temel plana düşürüleceksiniz. Mevcut dönem sonunda yeni fiyat uygulanacak, anlık iade yapılmayacak. Onaylıyor musunuz?`
          : `You will downgrade to the Basic plan. The new price takes effect at the end of your current billing period. No immediate refund. Proceed?`
      );
      if (!confirmed) return;
    }

    if (targetPlanKey === 'lifetime' && firestoreData?.paddleSubscriptionId) {
      const confirmed = window.confirm(
        isTr
          ? 'Mevcut yıllık aboneliğiniz ANINDA iptal edilecek ve Ömür Boyu satın alma ekranı açılacak. Kalan Pro süreniz için iade yapılmayacak. Onaylıyor musunuz?'
          : 'Your current subscription will be cancelled immediately and the Lifetime purchase screen will open. No refund for unused Pro time. Proceed?'
      );
      if (!confirmed) return;
    }

    setCheckoutLoading(true);
    try {
      const result = await changePlan({
        firebaseUser,
        firestoreData,
        targetPlanKey,
        currentPlanKey: currentPlan,
        isTr
      });

      if (result.success && !result.requiresCheckout) {
        toast.success(
          isTr
            ? `Planınız başarıyla değiştirildi 🎉`
            : `Your plan has been updated successfully 🎉`
        );
      } else if (!result.success && result.error) {
        toast.error(result.error);
      }
    } finally {
      setCheckoutLoading(false);
    }
  }, [firebaseUser, firestoreData, currentPlan, isTr, navigate]);

  const handleUpgrade = useCallback(() => handlePlanChange('pro'), [handlePlanChange]);

  // Loading State
  if (!authReady || subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // ÜCRETSİZ / MİSAFİR KAYITLI KULLANICI İÇİN ÖZEL PANEL (8a TASARIMI)
  // ─────────────────────────────────────────────────────────────────────────────
  if (!hasPaidPlan) {
    return (
      <FreeUserDashboard
        userName={userName}
        streak={streak}
        termCount={termCount}
        isTr={isTr}
        flashcardInfo={flashcardInfo}
        todayFormatted={todayFormatted}
      />
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // TEMEL PLAN KULLANICISI İÇİN DİNAMİK PANEL (9d ŞABLONU)
  // ─────────────────────────────────────────────────────────────────────────────
  if (currentPlan === 'basic') {
    return (
      <BasicUserDashboard
        userName={userName}
        streak={streak}
        termCount={termCount}
        isTr={isTr}
        todayFormatted={todayFormatted}
        trialState={trialState}
        firestoreData={firestoreData}
        pastDueState={pastDueState}
        handleUpgrade={handleUpgrade}
        checkoutLoading={checkoutLoading}
      />
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PRO / LIFETIME ABONE İÇİN GELİŞMİŞ PANEL (10a ŞABLONU)
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <ProUserDashboard
      userName={userName}
      streak={streak}
      termCount={termCount}
      isTr={isTr}
      currentPlan={currentPlan}
      pastDueState={pastDueState}
      todayFormatted={todayFormatted}
    />
  );
};

export default Dashboard;
