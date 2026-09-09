import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Sparkles,
  BookOpen,
  Gamepad2,
  ArrowRight,
  Crown,
  Clock,
  Target,
  LayoutDashboard,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getUser, getUserTrialState } from '@/utils/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const Welcome = () => {
  const [searchParams] = useSearchParams();
  const { currentLanguage } = useLanguage();
  const [firestoreData, setFirestoreData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const lang = currentLanguage === 'en' ? 'en' : 'tr';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to auth state and fetch user doc from firestore
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

  // Determine active plan (from query param or fallback to current user status)
  const activePlanKey = useMemo(() => {
    const urlPlan = searchParams.get('plan')?.toLowerCase();
    if (urlPlan && ['lifetime', 'pro', 'basic', 'trial'].includes(urlPlan)) {
      return urlPlan;
    }

    if (firestoreData) {
      const planStr = (firestoreData.plan || '').toLowerCase();
      const status = (firestoreData.subscriptionStatus || '').toLowerCase();
      if (firestoreData.isLifetime === true || planStr.includes('lifetime') || status === 'lifetime') {
        return 'lifetime';
      }
      if (firestoreData.isBasic === true || planStr.includes('basic') || status === 'basic') {
        return 'basic';
      }
      if (firestoreData.isPro === true || status === 'active' || status === 'pro') {
        return 'pro';
      }
    }

    const storedUser = getUser();
    const trialState = getUserTrialState(currentUser || storedUser);
    if (trialState?.isActive) return 'trial';

    return 'pro'; // Safe default
  }, [searchParams, firestoreData, currentUser]);

  const planConfigs = {
    lifetime: {
      color: 'amber',
      iconBg: 'bg-amber-500/10 border-amber-500/25 text-amber-500 shadow-amber-500/10',
      badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25',
      checkClass: 'text-amber-500',
      MainIcon: Crown,
      content: {
        tr: {
          badge: 'ÖMÜR BOYU VIP ÜYELİK',
          title: 'Tebrikler, HealthLexMed Ömür Boyu VIP Üyeliğe Hoş Geldiniz! 👑',
          subtitle:
            'Tek seferlik ödemeniz başarıyla tamamlandı. Artık HealthLexMed’in tüm 10 kategorisine, 571’den fazla morfemine ve gelecekte eklenecek tüm yeni modüllere ÖMÜR BOYU sınırsız erişim hakkınız var.',
          featuresTitle: 'Ömür Boyu VIP Üyeliğinizle Kilidi Açılan Özellikler',
          features: [
            '10 anatomik kategorinin tamamına ömür boyu sınırsız erişim (Kemikler, Kaslar, Eklemler vb.)',
            '571+ morfem, kök ve ek kütüphanesinin tamamı',
            '4 oyun modunun tümü (Bilgi Kartları, Eşleştirme, Quiz, Morfem Oyunu)',
            'Kişisel başarı analitikleri, çalışma serisi ve seviye sistemi',
            'Gelecekte eklenecek tüm yeni modüller ve güncellemeler (Ek ücret yok)',
            'Öncelikli kalıcı VIP erişim ve çift dilli (TR ⟷ EN) destek'
          ],
          ctaStudy: 'Çalışmaya Başla',
          ctaGames: 'Oyun Modlarını Keşfet',
          ctaDashboard: 'Panelime Git',
          footerNote:
            'Faturanız ve sipariş detayları e-posta adresinize Paddle tarafından iletilmiştir. Üyeliğinizi dilediğiniz an profilinizden veya panelinizden inceleyebilirsiniz.'
        },
        en: {
          badge: 'LIFETIME VIP MEMBERSHIP',
          title: 'Congratulations, Welcome to HealthLexMed Lifetime VIP! 👑',
          subtitle:
            'Your one-time payment is complete. You now have LIFETIME unlimited access to all 10 categories, over 571 morphemes, and all future modules with zero recurring fees.',
          featuresTitle: 'Features Unlocked With Lifetime Membership',
          features: [
            'Lifetime unlimited access to all 10 anatomical categories (Bones, Muscles, Joints, etc.)',
            'Full library of 571+ morphemes, roots, and affixes',
            'All 4 game modes (Flashcards, Matching, Quiz, Morpheme Game)',
            'Personal progress stats, study streaks, and leveling system',
            'All upcoming modules, exam sets, and updates (No extra charge)',
            'Permanent VIP status and priority bilingual support'
          ],
          ctaStudy: 'Start Studying',
          ctaGames: 'Explore Game Modes',
          ctaDashboard: 'Go to Dashboard',
          footerNote:
            'Your receipt and order details have been sent to your email address by Paddle. You can review your membership anytime from your profile or dashboard.'
        }
      }
    },
    pro: {
      color: 'primary',
      iconBg: 'bg-primary/10 border-primary/25 text-primary shadow-primary/10',
      badgeClass: 'bg-primary/15 text-primary border border-primary/25',
      checkClass: 'text-primary',
      MainIcon: Sparkles,
      content: {
        tr: {
          badge: 'YILLIK PRO AKTİF',
          title: 'Tebrikler, HealthLexMed Pro’ya Hoş Geldiniz! 🚀',
          subtitle:
            'Yıllık Pro Üyeliğiniz başarıyla aktif edildi. 1 yıl boyunca tüm 10 kategori, 571’den fazla morfem ve 4 oyun modunun tamamı sınırsız olarak kullanımınıza hazır.',
          featuresTitle: 'Aboneliğinizle Kilidi Açılan Özellikler',
          features: [
            '10 anatomik kategorinin tamamı (Kemikler, Kaslar, Eklemler vb.)',
            '571+ morfem, kök ve ek kütüphanesine sınırsız erişim',
            '4 oyun modunun tümü (Bilgi Kartları, Eşleştirme, Quiz, Morfem Oyunu)',
            'Kişisel başarı istatistikleri, çalışma serisi ve seviye sistemi',
            'TR ⟷ EN çift dilli arayüz ve terim eşlemeleri',
            '1 yıl boyunca eklenecek tüm güncellemeler ve yeni terimler'
          ],
          ctaStudy: 'Çalışmaya Başla',
          ctaGames: 'Oyun Modlarını Keşfet',
          ctaDashboard: 'Panelime Git',
          footerNote:
            'Faturanız ve ödeme detayları e-posta adresinize Paddle tarafından iletilmiştir. Dilediğiniz zaman profil sayfanızdan veya destek ekibimizden yardım alabilirsiniz.'
        },
        en: {
          badge: 'ANNUAL PRO ACTIVE',
          title: 'Congratulations, Welcome to HealthLexMed Pro! 🚀',
          subtitle:
            'Your Annual Pro Membership is now active. All 10 categories, over 571 morphemes, and all 4 interactive game modes are fully unlocked for 1 year.',
          featuresTitle: 'Features Unlocked With Your Membership',
          features: [
            'All 10 anatomical categories (Bones, Muscles, Joints, etc.)',
            'Unlimited access to 571+ morphemes, roots, and affixes library',
            'All 4 game modes (Flashcards, Matching, Quiz, Morpheme Game)',
            'Personal progress stats, study streaks, and leveling system',
            'TR ⟷ EN bilingual interface and terminology matching',
            'All upcoming modules, exam sets, and feature updates for 1 year'
          ],
          ctaStudy: 'Start Studying',
          ctaGames: 'Explore Game Modes',
          ctaDashboard: 'Go to Dashboard',
          footerNote:
            'Your receipt and order details have been sent to your email address by Paddle. You can reach out to support or review your settings anytime from your profile.'
        }
      }
    },
    basic: {
      color: 'blue',
      iconBg: 'bg-blue-500/10 border-blue-500/25 text-blue-500 shadow-blue-500/10',
      badgeClass: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/25',
      checkClass: 'text-blue-500',
      MainIcon: Target,
      content: {
        tr: {
          badge: 'TEMEL PLAN AKTİF',
          title: 'Tebrikler, HealthLexMed Temel Plana Hoş Geldiniz! 🎯',
          subtitle:
            'Temel Plan aboneliğiniz başarıyla aktif edildi. Temel anatomi kategorileri ve öğrenme araçlarıyla medikal terminolojiye sağlam bir adım attınız.',
          featuresTitle: 'Temel Planınızla Açılan Özellikler',
          features: [
            'İlk 3 temel kategoriye tam erişim (Kemikler, Eklemler, Kaslar)',
            'En çok kullanılan 100 morfem, kök ve ek kütüphanesi',
            '2 temel oyun modu (Bilgi Kartları & Eşleştirme Oyunu)',
            'Kişisel ilerleme takibi ve temel başarı istatistikleri',
            'TR ⟷ EN çift dilli arayüz ve terim telaffuzları',
            'Dilediğiniz an tek tıkla Pro plana yükseltme imkanı'
          ],
          ctaStudy: 'Çalışmaya Başla',
          ctaGames: 'Oyun Modlarını Keşfet',
          ctaDashboard: 'Panelime Git',
          upgradeHint: 'Tüm 10 kategori ve 4 oyun moduna mı ihtiyacınız var?',
          upgradeCta: "Pro'ya Yükselt",
          footerNote:
            'Abonelik faturanız e-posta adresinize Paddle tarafından iletilmiştir. Daha fazla kategori ve oyun için dilediğiniz zaman Pro plana geçebilirsiniz.'
        },
        en: {
          badge: 'BASIC PLAN ACTIVE',
          title: 'Congratulations, Welcome to HealthLexMed Basic! 🎯',
          subtitle:
            'Your Basic Plan is now active. Take a solid first step into medical terminology with core anatomy categories and interactive study tools.',
          featuresTitle: 'Features Unlocked With Basic Plan',
          features: [
            'Full access to the first 3 core categories (Bones, Joints, Muscles)',
            'Top 100 high-yield morphemes, roots, and affixes library',
            '2 core game modes (Flashcards & Matching Game)',
            'Personal progress tracking and core study stats',
            'TR ⟷ EN bilingual interface and audio pronunciations',
            'Option to upgrade to Pro anytime with a single click'
          ],
          ctaStudy: 'Start Studying',
          ctaGames: 'Explore Game Modes',
          ctaDashboard: 'Go to Dashboard',
          upgradeHint: 'Need all 10 categories and all 4 game modes?',
          upgradeCta: 'Upgrade to Pro',
          footerNote:
            'Your subscription receipt has been emailed by Paddle. You can upgrade to Pro anytime for more categories and games.'
        }
      }
    },
    trial: {
      color: 'indigo',
      iconBg: 'bg-indigo-500/10 border-indigo-500/25 text-indigo-500 shadow-indigo-500/10',
      badgeClass: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border border-indigo-500/25',
      checkClass: 'text-indigo-500',
      MainIcon: Clock,
      content: {
        tr: {
          badge: '3 GÜNLÜK ÜCRETSİZ DENEME',
          title: 'HealthLexMed’e Hoş Geldiniz! ⏱️',
          subtitle:
            '3 günlük ücretsiz deneme süreniz başladı! Kredi kartı gerekmeden tüm 10 kategori, 571’den fazla morfem ve 4 oyun modunun tamamını 3 gün boyunca sınırsızca deneyimleyebilirsiniz.',
          featuresTitle: 'Deneme Süresince Sınırsız Keşfedebileceğiniz Özellikler',
          features: [
            '10 anatomik kategorinin tamamı (Kemikler, Kaslar, Eklemler vb.)',
            '571+ morfem, kök ve ek kütüphanesine sınırsız erişim',
            '4 oyun modunun tümü (Bilgi Kartları, Eşleştirme, Quiz, Morfem Oyunu)',
            'Kişisel başarı analitikleri ve çalışma serisi',
            'TR ⟷ EN çift dilli arayüz ve sesli telaffuzlar',
            '3 gün boyunca tamamen ücretsiz ve taahhütsüz tam deneyim'
          ],
          ctaStudy: 'Hemen Öğrenmeye Başla',
          ctaGames: 'Oyun Modlarını Dene',
          ctaDashboard: 'Panelime Git',
          upgradeHint: 'Deneme süreniz boyunca avantajlı paket fiyatlarını inceleyebilirsiniz:',
          upgradeCta: 'Tarifeleri İncele',
          footerNote:
            '3 günlük deneme süreniz dolduğunda ilerlemeniz saklanır. Öğrenmeye devam etmek için dilediğiniz zaman uygun bir paket seçebilirsiniz.'
        },
        en: {
          badge: '3-DAY FREE TRIAL ACTIVE',
          title: 'Welcome to HealthLexMed! ⏱️',
          subtitle:
            'Your 3-day free trial has started! Enjoy full, unrestricted access to all 10 categories, 571+ morphemes, and all 4 interactive games for 3 days — no credit card required.',
          featuresTitle: 'Features Unlocked During Your Trial',
          features: [
            'All 10 anatomical categories (Bones, Muscles, Joints, etc.)',
            'Unlimited access to 571+ morphemes, roots, and affixes',
            'All 4 game modes (Flashcards, Matching, Quiz, Morpheme Game)',
            'Personal learning analytics and study streak',
            'TR ⟷ EN bilingual interface and pronunciation support',
            '100% free and risk-free trial for 3 days'
          ],
          ctaStudy: 'Start Studying Now',
          ctaGames: 'Try Game Modes',
          ctaDashboard: 'Go to Dashboard',
          upgradeHint: 'Explore available membership plans anytime during your trial:',
          upgradeCta: 'View Pricing Plans',
          footerNote:
            'Your progress is saved when your 3-day trial ends. You can choose a plan anytime to continue learning.'
        }
      }
    }
  };

  const currentConfig = planConfigs[activePlanKey] || planConfigs.pro;
  const t = currentConfig.content[lang] || currentConfig.content.tr;
  const MainIcon = currentConfig.MainIcon;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Celebration Icon */}
        <div
          className={`mx-auto flex items-center justify-center w-20 h-20 rounded-full border-2 mb-6 shadow-lg animate-in fade-in zoom-in duration-300 ${currentConfig.iconBg}`}
        >
          <MainIcon className="w-10 h-10" />
        </div>

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 ${currentConfig.badgeClass}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t.badge}
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4 font-serif">
          {t.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          {t.subtitle}
        </p>

        {/* Unlocked Features Card */}
        <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 text-left mb-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/80 mb-4">
            {t.featuresTitle}
          </h2>
          <ul className="space-y-3">
            {t.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${currentConfig.checkClass}`} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upgrade / Pricing Banner for Basic & Trial */}
        {t.upgradeHint && (
          <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border/60 text-xs sm:text-sm text-muted-foreground mb-6 text-left">
            <span>{t.upgradeHint}</span>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              {t.upgradeCta} →
            </Link>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Link
            to="/study"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base bg-primary text-primary-foreground shadow-md hover:opacity-95 hover:shadow-primary/25 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            {t.ctaStudy}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/games"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base bg-card border border-border text-foreground hover:bg-muted/50 transition-all"
          >
            <Gamepad2 className="w-5 h-5 text-primary" />
            {t.ctaGames}
          </Link>

          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-muted-foreground hover:text-foreground transition-all"
          >
            <LayoutDashboard className="w-4 h-4" />
            {t.ctaDashboard}
          </Link>
        </div>

        {/* Footer info note */}
        <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {t.footerNote}
        </p>
      </div>
    </div>
  );
};

export default Welcome;
