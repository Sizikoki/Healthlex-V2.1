import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { openPaddleCheckout, PADDLE_PRICE_ID, IS_PAYMENT_ACTIVE } from '@/services/paddle';
import { ArrowRight } from 'lucide-react';

const PRICING_CONTENT = {
  tr: {
    eyebrow: 'TARİFELER',
    title: 'Sana uygun tarifeyi seç',
    sub: 'Tüm kütüphaneye ve oyunlara eriş. İster aylık, ister yıllık, ister tek seferde ömür boyu.',
    monthly: 'Aylık',
    yearly: 'Yıllık',
    saveBadge: '%55',
    perMo: '/ ay',
    perYr: '/ yıl',
    perOnce: 'tek ödeme',
    cancel: 'Tek tıkla iptal, soru sorulmaz',
    vat: 'Fiyatlara KDV dahil',
    secure: '256-bit güvenli ödeme',
    plans: [
      {
        id: 'basic',
        name: 'Temel',
        tag: 'Kütüphanenin tamamı, 2 oyun modu.',
        mo: '₺99',
        yrp: '₺790',
        noteMo: 'Aylık faturalandırılır',
        noteYr: 'Yıllık faturalandırılır · ₺66/ay',
        cta: 'Temel’i seç',
        isPro: false,
        feats: [
          ['✓', '10 kategori · 571+ morfem'],
          ['✓', 'Flashcard ve Eşleştirme'],
          ['✓', 'Temel ilerleme takibi'],
          ['–', 'Quiz ve Morfem Yapıcı'],
          ['–', 'Seviye sistemi ve tekrar']
        ]
      },
      {
        id: 'pro',
        name: 'Pro',
        tag: 'Tam öğrenme deneyimi; 4 mod, seviye, tekrar.',
        badge: 'SINIRLI SÜRE · %55',
        mo: null,
        yrp: '₺2.000',
        old: '₺4.500',
        noteYr: 'Yıllık faturalandırılır · ₺167/ay',
        noteMo: 'Sadece yıllık · ₺167/ay',
        cta: "Pro'ya geç",
        isPro: true,
        feats: [
          ['✓', '10 kategori · 571+ morfem'],
          ['✓', '4 oyun modu'],
          ['✓', 'İlerleme ve seviye sistemi'],
          ['✓', 'Öğrendiğin terimlerle tekrar'],
          ['✓', 'Gelecek modüller dahil']
        ]
      },
      {
        id: 'lifetime',
        name: 'Ömür Boyu',
        tag: 'Bir kez öde süresiz kullan.',
        badge: 'SINIRLI SÜRE · %25',
        old: '₺8.000',
        once: '₺5.990',
        note: 'Tek ödeme · Süresiz erişim',
        cta: 'Ömür boyu al',
        isPro: false,
        isLife: true,
        feats: [
          ['✓', '10 kategori · 571+ morfem'],
          ['✓', '4 oyun modu'],
          ['✓', 'İlerleme ve seviye sistemi'],
          ['✓', 'Öğrendiğin terimlerle tekrar'],
          ['✓', 'Gelecek modüller dahil']
        ]
      }
    ]
  },
  en: {
    eyebrow: 'PRICING',
    title: 'Pick the plan that fits',
    sub: 'Full access to library and games. Choose monthly, yearly, or pay once for lifetime.',
    monthly: 'Monthly',
    yearly: 'Yearly',
    saveBadge: '55% OFF',
    perMo: '/ mo',
    perYr: '/ yr',
    perOnce: 'one-time',
    cancel: 'Cancel in one click, no questions',
    vat: 'VAT included',
    secure: '256-bit secure payment',
    plans: [
      {
        id: 'basic',
        name: 'Basic',
        tag: 'The full library, 2 game modes.',
        mo: '₺99',
        yrp: '₺790',
        noteMo: 'Billed monthly',
        noteYr: 'Billed yearly · ₺66/mo',
        cta: 'Choose Basic',
        isPro: false,
        feats: [
          ['✓', '10 categories · 571+ morphemes'],
          ['✓', 'Flashcard and Matching'],
          ['✓', 'Basic progress tracking'],
          ['–', 'Quiz and Morpheme Builder'],
          ['–', 'Level system and review']
        ]
      },
      {
        id: 'pro',
        name: 'Pro',
        tag: 'The full experience; 4 modes, levels, review.',
        badge: 'LIMITED TIME · 55% OFF',
        mo: null,
        yrp: '₺2,000',
        old: '₺4,500',
        noteYr: 'Billed yearly · ₺167/mo',
        noteMo: 'Yearly only · ₺167/mo',
        cta: 'Go Pro',
        isPro: true,
        feats: [
          ['✓', '10 categories · 571+ morphemes'],
          ['✓', '4 game modes'],
          ['✓', 'Progress and level system'],
          ['✓', 'Review with learned terms'],
          ['✓', 'Future modules included']
        ]
      },
      {
        id: 'lifetime',
        name: 'Lifetime',
        tag: 'Pay once, use forever.',
        badge: 'LIMITED TIME · 25% OFF',
        old: '₺8,000',
        once: '₺5,990',
        note: 'One payment · Lifetime access',
        cta: 'Get Lifetime',
        isPro: false,
        isLife: true,
        feats: [
          ['✓', '10 categories · 571+ morphemes'],
          ['✓', '4 game modes'],
          ['✓', 'Progress and level system'],
          ['✓', 'Review with learned terms'],
          ['✓', 'Future modules included']
        ]
      }
    ]
  }
};

export const HomePricingSection = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const t = PRICING_CONTENT[isTr ? 'tr' : 'en'];
  const [period, setPeriod] = useState('yearly');
  const isYearly = period === 'yearly';
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePlanClick = async (plan) => {
    if (!IS_PAYMENT_ACTIVE) {
      navigate('/study');
      return;
    }

    if (plan.id === 'pro') {
      try {
        setLoadingPlan('pro');
        await openPaddleCheckout({
          priceId: PADDLE_PRICE_ID,
          customData: {
            plan: 'Annual Pro Membership'
          }
        });
      } catch (err) {
        console.error('Checkout error:', err);
        navigate('/pricing');
      } finally {
        setLoadingPlan(null);
      }
    } else {
      navigate('/pricing');
    }
  };

  return (
    <section id="fiyat" className="py-16 sm:py-20 bg-background text-foreground transition-colors">
      <div className="wrap !max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Başlık & Açıklama */}
        <div className="text-center flex flex-col gap-3 items-center max-w-3xl mx-auto mb-8">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground m-0">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed m-0">
            {t.sub}
          </p>

          {/* Aylık / Yıllık Seçici */}
          <div
            onClick={() => setPeriod(isYearly ? 'monthly' : 'yearly')}
            className="inline-flex bg-card border border-border rounded-xl p-1.5 font-bold text-sm cursor-pointer mt-4 shadow-xs select-none"
            role="button"
            tabIndex={0}
          >
            <span
              className={`py-2 px-5 rounded-lg transition-all ${
                !isYearly
                  ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.monthly}
            </span>
            <span
              className={`py-2 px-5 rounded-lg transition-all flex items-center gap-2 ${
                isYearly
                  ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.yearly}
              <span className="text-[11px] font-extrabold bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                {t.saveBadge}
              </span>
            </span>
          </div>
        </div>

        {/* 3 Tarife Kartı Izgarası (Temel, Pro, Ömür Boyu) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-stretch max-w-6xl mx-auto">
          {t.plans.map((p) => {
            const isPro = p.isPro;
            const isLife = p.isLife;

            let price = isYearly ? p.yrp : p.mo;
            let per = isYearly ? t.perYr : t.perMo;
            let note = isYearly ? p.noteYr : p.noteMo;

            if (isLife) {
              price = p.once;
              per = t.perOnce;
              note = p.note;
            } else if (isPro) {
              price = p.yrp;
              per = t.perYr;
              note = isYearly ? p.noteYr : p.noteMo;
            }

            return (
              <div
                key={p.id}
                className={`bg-card border rounded-2xl p-6 sm:p-8 flex flex-col gap-5 relative shadow-sm transition-all duration-200 ${
                  isPro
                    ? 'border-primary ring-2 ring-primary/20 shadow-xl lg:-translate-y-2 relative'
                    : 'border-border hover:border-border/80'
                }`}
              >
                {/* Rozet */}
                {p.badge && (
                  <span
                    className={`absolute -top-3 left-6 text-white font-extrabold text-[11px] tracking-wide py-1 px-3.5 rounded-full shadow-xs ${
                      isLife
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                        : 'bg-amber-500'
                    }`}
                  >
                    {p.badge}
                  </span>
                )}

                <div>
                  <div className="font-extrabold text-xl text-foreground">
                    {p.name}
                  </div>
                  <div className="font-normal text-xs sm:text-sm text-muted-foreground mt-1.5 min-h-[36px]">
                    {p.tag}
                  </div>
                </div>

                {/* Fiyat Alanı */}
                <div className="flex flex-col gap-1">
                  {p.old && (
                    <span className="font-semibold text-sm text-muted-foreground/60 line-through">
                      {p.old}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
                      {price}
                    </span>
                    {per && (
                      <span className="font-semibold text-sm text-muted-foreground">
                        {per}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {note}
                  </span>
                </div>

                {/* Buton */}
                <button
                  type="button"
                  onClick={() => handlePlanClick(p)}
                  disabled={loadingPlan === p.id}
                  className={`w-full text-center font-bold text-sm sm:text-base py-3.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isPro
                      ? 'bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:from-[#2563eb] hover:to-[#3b82f6] text-white shadow-md hover:shadow-lg'
                      : 'bg-primary text-primary-foreground hover:opacity-90 shadow-xs'
                  }`}
                >
                  <span>{loadingPlan === p.id ? '...' : p.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Özellik Maddeleri */}
                <div className="flex flex-col gap-3 border-t border-border/80 pt-5 mt-auto">
                  {p.feats.map((f, fIdx) => {
                    const isChecked = f[0] === '✓';
                    return (
                      <div
                        key={fIdx}
                        className={`flex gap-3 items-start text-xs sm:text-sm leading-snug font-medium ${
                          isChecked ? 'text-foreground' : 'text-muted-foreground/60'
                        }`}
                      >
                        <span
                          className={`font-extrabold flex-none ${
                            isChecked ? 'text-primary' : 'text-muted-foreground/40'
                          }`}
                        >
                          {f[0]}
                        </span>
                        <span>{f[1]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Güven Rozetleri */}
        <div className="text-center font-semibold text-xs sm:text-sm text-muted-foreground mt-10">
          ✓ {t.cancel} · ✓ {t.vat} · 🔒 {t.secure}
        </div>
      </div>
    </section>
  );
};

export default HomePricingSection;
