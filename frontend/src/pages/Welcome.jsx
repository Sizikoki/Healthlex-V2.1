import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getUser } from '@/utils/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { getTermCount, getInitialTermCount } from '@/services/termCountService';
import { checkIsPro, checkIsBasic, checkHasPaidPlan } from '@/utils/planAccess';
import { updateCanonicalUrl } from '@/utils/seo';

export const Welcome = () => {
  const [searchParams] = useSearchParams();
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';

  const [firestoreData, setFirestoreData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [termCount, setTermCount] = useState(getInitialTermCount);

  // Scroll to top & set canonical SEO URL on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateCanonicalUrl('https://www.healthlexmed.com/welcome');
  }, []);

  // Fetch dynamic term count
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

  // Listen to auth state and fetch user doc from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      const uid = user?.uid || getUser()?.uid;
      if (uid) {
        try {
          const snap = await getDoc(doc(db, 'users', uid));
          if (snap.exists()) {
            setFirestoreData(snap.data());
          }
        } catch (e) {
          console.warn('[Welcome] Could not fetch user data:', e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // User object and membership status
  const storedUser = useMemo(() => getUser(), []);
  const effectiveUser = useMemo(
    () => ({ ...(storedUser || {}), ...(firestoreData || {}), ...(currentUser || {}) }),
    [storedUser, firestoreData, currentUser]
  );

  const isPro = useMemo(() => checkIsPro(effectiveUser), [effectiveUser]);
  const isBasic = useMemo(() => checkIsBasic(effectiveUser), [effectiveUser]);
  const hasPaidPlan = useMemo(
    () => checkHasPaidPlan(effectiveUser) || isPro || isBasic || searchParams.get('plan') === 'pro' || searchParams.get('plan') === 'basic' || searchParams.get('plan') === 'lifetime',
    [effectiveUser, isPro, isBasic, searchParams]
  );

  // Dynamic user greeting name
  const userName = useMemo(() => {
    const rawName =
      currentUser?.displayName ||
      firestoreData?.name ||
      firestoreData?.displayName ||
      storedUser?.name ||
      '';
    if (!rawName) return '';
    const first = rawName.trim().split(/\s+/)[0];
    return first ? first.charAt(0).toLocaleUpperCase('tr-TR') + first.slice(1) : '';
  }, [currentUser, firestoreData, storedUser]);

  // Header texts
  const badgeText = useMemo(() => {
    if (effectiveUser?.isLifetime || searchParams.get('plan') === 'lifetime') {
      return isTr ? 'HOŞ GELDİN · ÖMÜR BOYU VIP' : 'WELCOME · LIFETIME VIP';
    }
    if (isPro || searchParams.get('plan') === 'pro') {
      return isTr ? 'HOŞ GELDİN · PRO HESAP' : 'WELCOME · PRO ACCOUNT';
    }
    if (isBasic || searchParams.get('plan') === 'basic') {
      return isTr ? 'HOŞ GELDİN · TEMEL PLAN' : 'WELCOME · BASIC PLAN';
    }
    return isTr ? 'HOŞ GELDİN · MİSAFİR HESAP' : 'WELCOME · GUEST ACCOUNT';
  }, [effectiveUser, isPro, isBasic, searchParams, isTr]);

  const greetingTitle = useMemo(() => {
    if (userName) {
      return isTr ? `Hesabın hazır, ${userName}.` : `Your account is ready, ${userName}.`;
    }
    return isTr ? 'Hesabın hazır.' : 'Your account is ready.';
  }, [userName, isTr]);

  const greetingSubtitle = useMemo(() => {
    if (isPro || effectiveUser?.isLifetime) {
      return isTr
        ? 'Pro üyeliğin aktif edildi. Kütüphanenin tamamını, tüm 571+ morfemi ve 4 oyun modunun hepsini sınırsızca kullanabilirsin. Aşağıda tüm ayrıcalıklarını görebilirsin.'
        : 'Your Pro membership is active. Enjoy full unrestricted access to all terms, 571+ morphemes, and 4 game modes. Review your privileges below.';
    }
    if (isBasic) {
      return isTr
        ? 'Temel planın aktif edildi. Tüm kategoriler, 100 temel morfem ve sınırsız Flashcard & Eşleştirme oyunları kullanımına hazır. Aşağıda detayları görebilirsin.'
        : 'Your Basic plan is active. All categories, 100 core morphemes, and unlimited Flashcard & Matching games are ready. Review your plan below.';
    }
    return isTr
      ? 'Şu an misafir olarak giriş yaptın. Kütüphanenin büyük bölümünü ücretsiz gezebilirsin; oyunlar ve morfem listesi sınırlıdır. Aşağıda neye, ne kadar erişebileceğini görürsün.'
      : 'You are currently logged in as a guest. You can explore most of the library for free; games and the morpheme list are limited. Below you can see what and how much you can access.';
  }, [isPro, effectiveUser, isBasic, isTr]);

  // 3 Quotas Cards
  const quotas = useMemo(() => {
    const termsVal = String(termCount || getInitialTermCount());
    if (isPro || effectiveUser?.isLifetime) {
      return [
        {
          label: isTr ? 'TERİM' : 'TERMS',
          v: termsVal,
          unit: isTr ? 'terim detayı' : 'medical terms',
          mobileUnit: isTr ? 'terim detayı' : 'terms',
          note: isTr
            ? 'Tüm terim sayfaları tam içerik, köken ve detaylarla sınırsız görüntülenir.'
            : 'All term pages display full content, origins, and explanations with zero limits.'
        },
        {
          label: isTr ? 'MORFEM' : 'MORPHEMES',
          v: '571+',
          unit: isTr ? 'morfem (tamamı)' : 'morphemes (full)',
          mobileUnit: isTr ? 'tümü açık' : 'all open',
          note: isTr
            ? 'Ön ek, kök ve son ek kütüphanesinin tamamı sınırsız açık.'
            : 'All 571+ prefixes, roots, and suffixes completely unlocked.'
        },
        {
          label: isTr ? 'OYUNLAR' : 'GAMES',
          v: '∞',
          unit: isTr ? 'sınırsız oyun' : 'unlimited plays',
          mobileUnit: isTr ? 'sınırsız' : 'unlimited',
          note: isTr
            ? '4 oyun modu (Flashcard, Eşleştirme, Quiz, Morfem Yapıcı) sınırsız açık.'
            : 'All 4 game modes (Flashcards, Matching, Quiz, Morpheme Builder) open.'
        }
      ];
    }

    if (isBasic) {
      return [
        {
          label: isTr ? 'TERİM' : 'TERMS',
          v: termsVal,
          unit: isTr ? 'terim detayı' : 'medical terms',
          mobileUnit: isTr ? 'terim detayı' : 'terms',
          note: isTr
            ? 'Tüm tıp kategorilerindeki terim sayfaları tam içerikle görüntülenir.'
            : 'Term pages across all medical categories display full content.'
        },
        {
          label: isTr ? 'MORFEM' : 'MORPHEMES',
          v: '100',
          unit: isTr ? '/ 571+ morfem' : '/ 571+ morphemes',
          mobileUnit: isTr ? '/ 571+ açık' : '/ 571+ open',
          note: isTr
            ? 'En çok kullanılan ilk 100 morfem açık. İleri seviye morfemler Pro gerektirir.'
            : 'Top 100 core morphemes unlocked. Advanced morphemes require Pro.'
        },
        {
          label: isTr ? 'OYUNLAR' : 'GAMES',
          v: '∞',
          unit: isTr ? 'sınırsız oyun' : 'unlimited plays',
          mobileUnit: isTr ? 'sınırsız' : 'unlimited',
          note: isTr
            ? 'Flashcard ve Eşleştirme modları sınırsız; Quiz ve Morfem Yapıcı Pro plandadır.'
            : 'Flashcards and Matching modes unlimited; Quiz and Morpheme Builder in Pro.'
        }
      ];
    }

    // Default Guest / Free User Quotas
    return [
      {
        label: isTr ? 'TERİM' : 'TERMS',
        v: termsVal,
        unit: isTr ? 'terim detayı' : 'medical terms',
        mobileUnit: isTr ? 'terim detayı' : 'terms',
        note: isTr
          ? 'Link veya aramayla açılan terim sayfaları tam içerikle görüntülenir.'
          : 'Term pages opened via search or links display full content.'
      },
      {
        label: isTr ? 'MORFEM' : 'MORPHEMES',
        v: '24',
        unit: isTr ? '/ 571+ morfem' : '/ 571+ morphemes',
        mobileUnit: isTr ? '/ 571+ açık' : '/ 571+ open',
        note: isTr
          ? 'İlk 24 morfem açık; gerisinde ad görünür, anlam ve detay bulanık.'
          : 'First 24 morphemes open; remaining show name with blurred meaning.'
      },
      {
        label: isTr ? 'FLASHCARD' : 'FLASHCARDS',
        v: '5',
        unit: isTr ? 'oyun / gün' : 'games / day',
        mobileUnit: isTr ? 'oyun / gün' : 'plays / day',
        note: isTr
          ? 'Günlük hak her gece yenilenir. Diğer oyunlar kilitli.'
          : 'Daily plays refresh every midnight. Other games are locked.'
      }
    ];
  }, [termCount, isPro, isBasic, effectiveUser, isTr]);

  // Feature Comparison Table Rows
  const rows = useMemo(() => {
    const termsCountStr = String(termCount || getInitialTermCount());

    if (isTr) {
      if (isPro || effectiveUser?.isLifetime) {
        return [
          { name: 'Kategoriler', desc: '15 tıp kategorisi', type: 'open', limit: '15 kategori, sınırsız gezinme', sub: 'Tüm kategoriler açık', pro: 'Sınırsız' },
          { name: 'Terim detay sayfaları', desc: 'Link veya arama ile erişim', type: 'open', limit: `${termsCountStr} terim, tam içerik`, sub: 'Link veya aramayla; tanım, köken, örnek açık', pro: 'Tüm terimler' },
          { name: 'Morfem listesi', desc: 'Ön ek, kök, son ek', type: 'open', limit: '571+ morfem açık', sub: 'Tüm kütüphane sınırsız açık', pro: '571+ morfem' },
          { name: 'Flashcard', desc: 'Kartlarla tekrar', type: 'open', limit: 'Sınırsız', sub: 'Kişisel tekrar algoritması aktif', pro: 'Sınırsız' },
          { name: 'Eşleştirme', desc: 'Terim ↔ Türkçe karşılık', type: 'open', limit: 'Sınırsız', sub: 'Tüm kategorilerde açık', pro: 'Açık' },
          { name: 'Quiz', desc: 'Kategoriye özel çoktan seçmeli', type: 'open', limit: 'Sınırsız', sub: 'Tüm zorluk derecelerinde açık', pro: 'Açık' },
          { name: 'Morfem Yapıcı', desc: 'Terimi parçalarından kur', type: 'open', limit: 'Sınırsız', sub: 'Tüm seviyeler açık', pro: 'Açık' },
          { name: 'İlerleme ve seviye', desc: 'Günlük tekrar, seri, seviye', type: 'open', limit: 'Aktif', sub: 'Tüm başarılar ve istatistikler', pro: 'Açık' }
        ];
      }

      if (isBasic) {
        return [
          { name: 'Kategoriler', desc: '15 tıp kategorisi', type: 'open', limit: '15 kategori, sınırsız gezinme', sub: 'Kilit yok', pro: 'Sınırsız' },
          { name: 'Terim detay sayfaları', desc: 'Link veya arama ile erişim', type: 'open', limit: `${termsCountStr} terim, tam içerik`, sub: 'Link veya aramayla; tanım, köken, örnek açık', pro: 'Tüm terimler' },
          { name: 'Morfem listesi', desc: 'Ön ek, kök, son ek', type: 'part', limit: 'İlk 100 morfem açık', sub: 'İleri düzey için Pro gerekir', pro: '571+ morfem' },
          { name: 'Flashcard', desc: 'Kartlarla tekrar', type: 'open', limit: 'Sınırsız', sub: 'Limitsiz kart çalışması', pro: 'Sınırsız' },
          { name: 'Eşleştirme', desc: 'Terim ↔ Türkçe karşılık', type: 'open', limit: 'Sınırsız', sub: 'Temel plan ile sınırsız açık', pro: 'Açık' },
          { name: 'Quiz', desc: 'Kategoriye özel çoktan seçmeli', type: 'lock', limit: 'Kapalı', sub: 'Pro ve üzeri gerekir', pro: 'Açık' },
          { name: 'Morfem Yapıcı', desc: 'Terimi parçalarından kur', type: 'lock', limit: 'Kapalı', sub: 'Pro ve üzeri gerekir', pro: 'Açık' },
          { name: 'İlerleme ve seviye', desc: 'Günlük tekrar, seri, seviye', type: 'part', limit: 'Temel takip', sub: 'Gelişmiş analitikler Pro’da', pro: 'Açık' }
        ];
      }

      // Guest / Free default
      return [
        { name: 'Kategoriler', desc: '15 tıp kategorisi', type: 'open', limit: '15 kategori, sınırsız gezinme', sub: 'Kilit yok', pro: 'Sınırsız' },
        { name: 'Terim detay sayfaları', desc: 'Link veya arama ile erişim', type: 'open', limit: `${termsCountStr} terim, tam içerik`, sub: 'Link veya aramayla; tanım, köken, örnek açık', pro: 'Tüm terimler' },
        { name: 'Morfem listesi', desc: 'Ön ek, kök, son ek', type: 'part', limit: 'İlk 24 morfem açık', sub: 'Gerisi kilitli: ad görünür, anlam bulanık', pro: '571+ morfem' },
        { name: 'Flashcard', desc: 'Kartlarla tekrar', type: 'part', limit: 'Günde 5 oyun', sub: 'Her gece yenilenir', pro: 'Sınırsız' },
        { name: 'Eşleştirme', desc: 'Terim ↔ Türkçe karşılık', type: 'lock', limit: 'Kapalı', sub: 'Temel ve üzeri planlarla açılır', pro: 'Açık' },
        { name: 'Quiz', desc: 'Kategoriye özel çoktan seçmeli', type: 'lock', limit: 'Kapalı', sub: 'Pro ve üzeri gerekir', pro: 'Açık' },
        { name: 'Morfem Yapıcı', desc: 'Terimi parçalarından kur', type: 'lock', limit: 'Kapalı', sub: 'Pro ve üzeri gerekir', pro: 'Açık' },
        { name: 'İlerleme ve seviye', desc: 'Günlük tekrar, seri, seviye', type: 'lock', limit: 'Kapalı', sub: 'Pro ve üzeri gerekir', pro: 'Açık' }
      ];
    }

    // English Rows
    if (isPro || effectiveUser?.isLifetime) {
      return [
        { name: 'Categories', desc: '15 medical categories', type: 'open', limit: '15 categories, unlimited browsing', sub: 'All categories unlocked', pro: 'Unlimited' },
        { name: 'Term detail pages', desc: 'Access via link or search', type: 'open', limit: `${termsCountStr} terms, full content`, sub: 'Definitions, origins & examples open', pro: 'All terms' },
        { name: 'Morpheme list', desc: 'Prefixes, roots, suffixes', type: 'open', limit: '571+ morphemes open', sub: 'Full library unlocked', pro: '571+ morphemes' },
        { name: 'Flashcards', desc: 'Spaced repetition', type: 'open', limit: 'Unlimited', sub: 'Adaptive algorithm active', pro: 'Unlimited' },
        { name: 'Matching Game', desc: 'Term ↔ Meaning', type: 'open', limit: 'Unlimited', sub: 'Unlocked across all categories', pro: 'Unlocked' },
        { name: 'Quiz', desc: 'Category-specific multiple choice', type: 'open', limit: 'Unlimited', sub: 'All difficulty levels', pro: 'Unlocked' },
        { name: 'Morpheme Builder', desc: 'Build terms from parts', type: 'open', limit: 'Unlimited', sub: 'All levels unlocked', pro: 'Unlocked' },
        { name: 'Progress & Streaks', desc: 'Daily reviews & streaks', type: 'open', limit: 'Active', sub: 'Full analytics & achievements', pro: 'Unlocked' }
      ];
    }

    if (isBasic) {
      return [
        { name: 'Categories', desc: '15 medical categories', type: 'open', limit: '15 categories, unlimited browsing', sub: 'No lock', pro: 'Unlimited' },
        { name: 'Term detail pages', desc: 'Access via link or search', type: 'open', limit: `${termsCountStr} terms, full content`, sub: 'Definitions, origins & examples open', pro: 'All terms' },
        { name: 'Morpheme list', desc: 'Prefixes, roots, suffixes', type: 'part', limit: 'Top 100 morphemes open', sub: 'Advanced morphemes require Pro', pro: '571+ morphemes' },
        { name: 'Flashcards', desc: 'Spaced repetition', type: 'open', limit: 'Unlimited', sub: 'Unrestricted card sessions', pro: 'Unlimited' },
        { name: 'Matching Game', desc: 'Term ↔ Meaning', type: 'open', limit: 'Unlimited', sub: 'Fully unlocked with Basic plan', pro: 'Unlocked' },
        { name: 'Quiz', desc: 'Category-specific multiple choice', type: 'lock', limit: 'Locked', sub: 'Requires Pro and above', pro: 'Unlocked' },
        { name: 'Morpheme Builder', desc: 'Build terms from parts', type: 'lock', limit: 'Locked', sub: 'Requires Pro and above', pro: 'Unlocked' },
        { name: 'Progress & Streaks', desc: 'Daily reviews & streaks', type: 'part', limit: 'Core tracking', sub: 'Advanced analytics in Pro', pro: 'Unlocked' }
      ];
    }

    return [
      { name: 'Categories', desc: '15 medical categories', type: 'open', limit: '15 categories, unlimited browsing', sub: 'No lock', pro: 'Unlimited' },
      { name: 'Term detail pages', desc: 'Access via link or search', type: 'open', limit: `${termsCountStr} terms, full content`, sub: 'Definitions, origins and examples open', pro: 'All terms' },
      { name: 'Morpheme list', desc: 'Prefixes, roots, suffixes', type: 'part', limit: 'First 24 morphemes open', sub: 'Rest locked: name visible, meaning blurred', pro: '571+ morphemes' },
      { name: 'Flashcards', desc: 'Spaced repetition with cards', type: 'part', limit: '5 games per day', sub: 'Refreshes every midnight', pro: 'Unlimited' },
      { name: 'Matching Game', desc: 'Term ↔ English meaning', type: 'lock', limit: 'Locked', sub: 'Unlocked with Basic and above', pro: 'Unlocked' },
      { name: 'Quiz', desc: 'Category-specific multiple choice', type: 'lock', limit: 'Locked', sub: 'Requires Pro and above', pro: 'Unlocked' },
      { name: 'Morpheme Builder', desc: 'Build terms from parts', type: 'lock', limit: 'Locked', sub: 'Requires Pro and above', pro: 'Unlocked' },
      { name: 'Progress & Streaks', desc: 'Daily review, streak & leveling', type: 'lock', limit: 'Locked', sub: 'Requires Pro and above', pro: 'Unlocked' }
    ];
  }, [termCount, isTr, isPro, isBasic, effectiveUser]);

  // Style helper for table badges & indicators
  const getRowStyle = (type) => {
    switch (type) {
      case 'open':
        return {
          sym: '✓',
          badgeBg: '#e8f0ff',
          badgeFg: '#2563eb',
          badgeClass: 'bg-[#e8f0ff] text-[#2563eb] dark:bg-blue-900/30 dark:text-blue-400',
          fgClass: 'text-[#0f1b33] dark:text-foreground'
        };
      case 'part':
        return {
          sym: '~',
          badgeBg: '#fff4e6',
          badgeFg: '#b45309',
          badgeClass: 'bg-[#fff4e6] text-[#b45309] dark:bg-amber-900/30 dark:text-amber-400',
          fgClass: 'text-[#0f1b33] dark:text-foreground'
        };
      case 'lock':
      default:
        return {
          sym: '🔒',
          badgeBg: '#f5f7fb',
          badgeFg: '#6b7a90',
          badgeClass: 'bg-[#f5f7fb] text-[#6b7a90] dark:bg-slate-800 dark:text-slate-400',
          fgClass: 'text-[#6b7a90] dark:text-muted-foreground'
        };
    }
  };

  // Bottom Banner Content
  const bannerConfig = useMemo(() => {
    if (isPro || effectiveUser?.isLifetime) {
      return {
        title: isTr ? 'Tüm içerikler hesabında aktif!' : 'All content is active on your account!',
        subtitle: isTr
          ? '15 kategori, 571+ morfem ve 4 oyun modunun tamamına sınırsız erişebilirsin.'
          : 'Enjoy unlimited access to all 15 categories, 571+ morphemes, and 4 game modes.',
        mobileSubtitle: isTr
          ? '15 kategori, 571+ morfem ve 4 oyun modu sınırsız kullanımına hazır.'
          : 'All 15 categories, 571+ morphemes, and 4 game modes are active.',
        secondaryText: isTr ? 'Panelime Git' : 'Go to Dashboard',
        secondaryLink: '/dashboard',
        primaryText: isTr ? 'Çalışmaya Başla →' : 'Start Studying →',
        primaryLink: '/study'
      };
    }

    if (isBasic) {
      return {
        title: isTr ? 'Daha fazlası için Pro’ya yükselt' : 'Upgrade to Pro for more',
        subtitle: isTr
          ? '571+ morfem, Quiz ve Morfem Yapıcı için dilediğin zaman Pro plana geçebilirsin.'
          : 'Upgrade to Pro anytime to unlock all 571+ morphemes and advanced games.',
        mobileSubtitle: isTr
          ? '571+ morfem, Quiz ve Morfem Yapıcı için Pro plana geçebilirsin.'
          : 'Upgrade to Pro for 571+ morphemes, Quiz, and Morpheme Builder.',
        secondaryText: isTr ? 'Çalışmaya Başla' : 'Start Studying',
        secondaryLink: '/study',
        primaryText: isTr ? 'Pro’ya Yükselt →' : 'Upgrade to Pro →',
        primaryLink: '/pricing'
      };
    }

    return {
      title: isTr ? 'Tamamını açmak için bir plan seç' : 'Choose a plan to unlock everything',
      subtitle: isTr
        ? 'Temel ₺790/yıl · Pro lansman fiyatı ₺2.000/yıl · Ömür Boyu ₺5.990 tek ödeme'
        : 'Basic ₺790/yr · Pro launch price ₺2,000/yr · Lifetime ₺5,990 one-time',
      mobileSubtitle: isTr
        ? 'Temel ₺790/yıl · Pro ₺2.000/yıl · Ömür Boyu ₺5.990'
        : 'Basic ₺790/yr · Pro ₺2,000/yr · Lifetime ₺5,990',
      secondaryText: isTr ? 'Misafir olarak devam et' : 'Continue as guest',
      secondaryLink: '/study',
      primaryText: isTr ? 'Tarifeleri gör →' : 'View plans →',
      primaryLink: '/pricing'
    };
  }, [isPro, isBasic, effectiveUser, isTr]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f5f7fb] dark:bg-background py-8 sm:py-12 lg:py-14 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 flex justify-center font-sans antialiased">
      <div className="w-full max-w-[1536px] 2xl:max-w-[1620px] flex flex-col gap-7 sm:gap-9">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 text-left">
          <div className="flex flex-col gap-2.5 sm:gap-3 max-w-3xl">
            <span className="font-extrabold text-[12px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
              {badgeText}
            </span>
            <h1 className="m-0 font-semibold text-3xl sm:text-4xl lg:text-[42px] sm:leading-[1.12] text-[#0f1b33] dark:text-foreground font-['Lora',Georgia,serif]">
              {greetingTitle}
            </h1>
            <p className="m-0 font-normal text-[15px] sm:text-[17px] leading-[1.6] text-[#6b7a90] dark:text-muted-foreground">
              {isTr && !hasPaidPlan ? (
                <>
                  <span className="sm:hidden">
                    Misafir olarak giriş yaptın. Kütüphaneyi ücretsiz gezebilirsin; oyunlar ve morfem listesi sınırlıdır.
                  </span>
                  <span className="hidden sm:inline">
                    Şu an misafir olarak giriş yaptın. Kütüphanenin büyük bölümünü ücretsiz gezebilirsin; oyunlar ve morfem listesi sınırlıdır. Aşağıda neye, ne kadar erişebileceğini görürsün.
                  </span>
                </>
              ) : (
                greetingSubtitle
              )}
            </p>
          </div>

          {/* Hızlı Başla / Panele Git Butonları */}
          <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-auto">
            <Link
              to="/dashboard"
              className="flex-1 sm:flex-initial text-center bg-white dark:bg-card border border-[#e5e9f2] dark:border-border hover:border-[#2563eb]/50 text-[#0f1b33] dark:text-foreground font-bold text-[14px] sm:text-[15px] px-5 py-3 rounded-[12px] shadow-2xs transition-all"
            >
              {isTr ? 'Panelime Git' : 'Go to Dashboard'}
            </Link>
            <Link
              to="/study"
              className="flex-1 sm:flex-initial text-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-[14px] sm:text-[15px] px-5 py-3 rounded-[12px] shadow-xs transition-all whitespace-nowrap"
            >
              {isTr ? 'Kütüphaneyi Keşfet →' : 'Explore Library →'}
            </Link>
          </div>
        </div>

        {/* 3 Quota Metric Cards (Geniş Ekrana Yayılmış) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
          {quotas.map((q, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[16px] p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-3.5 shadow-xs transition-all hover:border-[#2563eb]/40 hover:shadow-md text-left"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
                  {q.label}
                </span>
                <div className="flex items-baseline gap-2.5 mt-1">
                  <span className="font-extrabold text-3xl sm:text-4xl lg:text-[40px] leading-none text-[#0f1b33] dark:text-foreground">
                    {q.v}
                  </span>
                  <span className="font-semibold text-xs sm:text-sm text-[#6b7a90] dark:text-muted-foreground">
                    <span className="sm:hidden">{q.mobileUnit || q.unit}</span>
                    <span className="hidden sm:inline">{q.unit}</span>
                  </span>
                </div>
              </div>
              <div className="font-normal text-[13px] sm:text-[14px] leading-[1.5] text-[#6b7a90] dark:text-muted-foreground pt-2.5 border-t border-[#f0f3f8] dark:border-border/50">
                {q.note}
              </div>
            </div>
          ))}
        </div>

        {/* 4 HIZLI ÇALIŞMA ALANI (Geniş Ekranda Kenarları Dolduran Modül Kartları) */}
        <div className="flex flex-col gap-3.5 text-left">
          <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
            {isTr ? 'HEMEN BAŞLAYABİLECEĞİN MODÜLLER' : 'MODULES READY TO STUDY'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
            <Link
              to="/study"
              className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border hover:border-[#2563eb]/50 hover:shadow-md rounded-[16px] p-5 sm:p-6 flex flex-col justify-between gap-3.5 text-[#0f1b33] dark:text-foreground transition-all group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-[12px] bg-blue-500/10 text-blue-600 dark:text-blue-400 grid place-items-center font-bold text-xl shadow-2xs">
                  📚
                </div>
                <span className="text-[12px] font-bold text-[#2563eb] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  {isTr ? 'İncele' : 'Browse'} →
                </span>
              </div>
              <div>
                <div className="font-extrabold text-[16px] group-hover:text-[#2563eb] transition-colors">
                  {isTr ? 'Tıbbi Terimler Sözlüğü' : 'Medical Dictionary'}
                </div>
                <div className="font-normal text-[13px] leading-[1.45] text-[#6b7a90] dark:text-muted-foreground mt-1">
                  {isTr ? '15 kategori, 880+ detaylı tıbbi terim ve klinik köken.' : '15 categories, 880+ medical terms with origins.'}
                </div>
              </div>
            </Link>

            <Link
              to="/morphemes"
              className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border hover:border-[#2563eb]/50 hover:shadow-md rounded-[16px] p-5 sm:p-6 flex flex-col justify-between gap-3.5 text-[#0f1b33] dark:text-foreground transition-all group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-[12px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 grid place-items-center font-bold text-xl shadow-2xs">
                  🔬
                </div>
                <span className="text-[12px] font-bold text-[#2563eb] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  {isTr ? 'Keşfet' : 'Explore'} →
                </span>
              </div>
              <div>
                <div className="font-extrabold text-[16px] group-hover:text-[#2563eb] transition-colors">
                  {isTr ? 'Morfem Kütüphanesi' : 'Morpheme Library'}
                </div>
                <div className="font-normal text-[13px] leading-[1.45] text-[#6b7a90] dark:text-muted-foreground mt-1">
                  {isTr ? '571 ön ek, kök ve son ek analizi ve türetim mantığı.' : '571 prefixes, roots and suffixes with logic.'}
                </div>
              </div>
            </Link>

            <Link
              to="/flashcards"
              className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border hover:border-[#2563eb]/50 hover:shadow-md rounded-[16px] p-5 sm:p-6 flex flex-col justify-between gap-3.5 text-[#0f1b33] dark:text-foreground transition-all group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-[12px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 grid place-items-center font-bold text-xl shadow-2xs">
                  🃏
                </div>
                <span className="text-[12px] font-bold text-[#2563eb] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  {isTr ? 'Başla' : 'Play'} →
                </span>
              </div>
              <div>
                <div className="font-extrabold text-[16px] group-hover:text-[#2563eb] transition-colors">
                  {isTr ? 'Flashcard & Tekrar' : 'Flashcard & Review'}
                </div>
                <div className="font-normal text-[13px] leading-[1.45] text-[#6b7a90] dark:text-muted-foreground mt-1">
                  {isTr ? 'Aralıklı tekrar algoritması ile kalıcı hafıza çalışması.' : 'Spaced repetition for long-term memorization.'}
                </div>
              </div>
            </Link>

            <Link
              to="/games"
              className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border hover:border-[#2563eb]/50 hover:shadow-md rounded-[16px] p-5 sm:p-6 flex flex-col justify-between gap-3.5 text-[#0f1b33] dark:text-foreground transition-all group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-[12px] bg-amber-500/10 text-amber-600 dark:text-amber-400 grid place-items-center font-bold text-xl shadow-2xs">
                  🎮
                </div>
                <span className="text-[12px] font-bold text-[#2563eb] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  {isTr ? 'Oyna' : 'Play'} →
                </span>
              </div>
              <div>
                <div className="font-extrabold text-[16px] group-hover:text-[#2563eb] transition-colors">
                  {isTr ? 'İnteraktif Oyun Modları' : 'Interactive Games'}
                </div>
                <div className="font-normal text-[13px] leading-[1.45] text-[#6b7a90] dark:text-muted-foreground mt-1">
                  {isTr ? 'Eşleştirme, Quiz ve Morfem Yapıcı ile pekiştir.' : 'Matching, Quiz and Morpheme Builder games.'}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* MOBILE VIEW: Feature Breakdown as Compact Cards (sm:hidden) */}
        <div className="flex flex-col gap-2 sm:hidden text-left">
          <span className="font-extrabold text-[11px] leading-none tracking-[0.12em] text-[#6b7a90] dark:text-muted-foreground uppercase mb-1">
            {isTr
              ? hasPaidPlan
                ? 'ÖZELLİK · SENİN PLANIN · PRO'
                : 'ÖZELLİK · MİSAFİR SINIRI · PRO'
              : hasPaidPlan
              ? 'FEATURE · YOUR PLAN · PRO'
              : 'FEATURE · GUEST LIMIT · PRO'}
          </span>
          {rows.map((r, idx) => {
            const s = getRowStyle(r.type);
            return (
              <div
                key={idx}
                className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[14px] p-3.5 flex gap-3 items-start shadow-xs text-left"
              >
                <span
                  className={`shrink-0 w-[24px] h-[24px] rounded-[7px] grid place-items-center font-extrabold text-[12px] leading-none select-none ${s.badgeClass}`}
                >
                  {s.sym}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-[14px] text-[#0f1b33] dark:text-foreground">
                    {r.name}
                  </div>
                  <div className={`font-bold text-[13px] leading-[1.35] mt-1 ${s.fgClass}`}>
                    {r.limit}
                  </div>
                  <div className="font-normal text-[12px] leading-[1.4] text-[#6b7a90] dark:text-muted-foreground mt-0.5">
                    {r.sub}
                  </div>
                  <div className="font-semibold text-[12px] text-[#2563eb] dark:text-blue-400 mt-1.5">
                    Pro: {r.pro}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW: Feature Comparison Table (hidden sm:block, Genişletilmiş) */}
        <div className="hidden sm:block bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[18px] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              {/* Table Column Headers */}
              <div className="grid grid-cols-[1.3fr_1.4fr_1fr] px-8 py-4 bg-[#f9fafc] dark:bg-muted/40 border-b border-[#e5e9f2] dark:border-border font-extrabold text-[12px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase text-left">
                <span>{isTr ? 'ÖZELLİK & AÇIKLAMA' : 'FEATURE & DESCRIPTION'}</span>
                <span>
                  {isTr
                    ? hasPaidPlan
                      ? 'SENİN PLANIN'
                      : 'MİSAFİR SINIRI'
                    : hasPaidPlan
                    ? 'YOUR PLAN'
                    : 'GUEST LIMIT'}
                </span>
                <span>PRO & ÖMÜR BOYU</span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-[#eef1f6] dark:divide-border/60 text-left">
                {rows.map((r, idx) => {
                  const s = getRowStyle(r.type);
                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-[1.3fr_1.4fr_1fr] px-8 py-4.5 items-center gap-6 hover:bg-[#fafbfc] dark:hover:bg-muted/20 transition-colors"
                    >
                      {/* Column 1: Name & Desc */}
                      <div>
                        <div className="font-extrabold text-[15px] text-[#0f1b33] dark:text-foreground leading-snug">
                          {r.name}
                        </div>
                        <div className="font-normal text-[13px] leading-[1.45] text-[#6b7a90] dark:text-muted-foreground mt-0.5">
                          {r.desc}
                        </div>
                      </div>

                      {/* Column 2: Status / Limit with Badge Icon */}
                      <div className="flex gap-3 items-center">
                        <span
                          className={`shrink-0 w-[24px] h-[24px] rounded-[7px] grid place-items-center font-extrabold text-[13px] leading-none select-none shadow-2xs ${s.badgeClass}`}
                        >
                          {s.sym}
                        </span>
                        <div>
                          <div className={`font-bold text-[14.5px] leading-[1.35] ${s.fgClass}`}>
                            {r.limit}
                          </div>
                          <div className="font-normal text-[12.5px] leading-[1.4] text-[#6b7a90] dark:text-muted-foreground mt-0.5">
                            {r.sub}
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Pro Column */}
                      <div className="font-bold text-[14.5px] text-[#2563eb] dark:text-blue-400">
                        {r.pro}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Bottom CTA Stacked Card (sm:hidden) */}
        <div className="flex flex-col sm:hidden bg-[#0f1b33] dark:bg-[#0b1426] dark:border dark:border-[#1e2e4a] rounded-[16px] p-5 text-white gap-3.5 shadow-md text-left">
          <div>
            <div className="font-semibold text-[19px] leading-snug font-['Lora',Georgia,serif]">
              {bannerConfig.title}
            </div>
            <div className="font-normal text-[13px] leading-[1.5] text-[#b8c4d9] mt-1.5">
              {bannerConfig.mobileSubtitle || bannerConfig.subtitle}
            </div>
          </div>
          <Link
            to={bannerConfig.primaryLink}
            className="block text-center bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:opacity-95 text-white font-bold text-[15px] p-[13px] rounded-[11px] shadow-xs transition-all"
          >
            {bannerConfig.primaryText}
          </Link>
          <Link
            to={bannerConfig.secondaryLink}
            className="block text-center border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-bold text-[14px] p-3 rounded-[11px] transition-all"
          >
            {bannerConfig.secondaryText}
          </Link>
        </div>

        {/* DESKTOP VIEW: Bottom CTA Horizontal Banner (hidden sm:flex) */}
        <div className="hidden sm:flex justify-between items-center bg-[#0f1b33] dark:bg-[#0b1426] dark:border dark:border-[#1e2e4a] rounded-[18px] p-7 lg:p-8 text-white gap-6 shadow-md text-left">
          <div className="max-w-3xl">
            <div className="font-semibold text-2xl leading-snug font-['Lora',Georgia,serif]">
              {bannerConfig.title}
            </div>
            <div className="font-normal text-[15px] text-[#b8c4d9] mt-1.5 leading-relaxed">
              {bannerConfig.subtitle}
            </div>
          </div>

          <div className="flex gap-3 shrink-0">
            <Link
              to={bannerConfig.secondaryLink}
              className="text-center bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-bold text-[15px] px-5 py-3.5 rounded-[11px] transition-all"
            >
              {bannerConfig.secondaryText}
            </Link>
            <Link
              to={bannerConfig.primaryLink}
              className="text-center bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:opacity-95 text-white font-bold text-[15px] px-6 py-3.5 rounded-[11px] shadow-sm transition-all whitespace-nowrap"
            >
              {bannerConfig.primaryText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
