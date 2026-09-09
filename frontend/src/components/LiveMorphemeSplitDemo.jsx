import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TERMS_DATA = {
  tr: [
    {
      word: 'Gastroenteritis',
      parts: [
        ['gastro', 'mide'],
        ['enter', 'bağırsak'],
        ['-itis', 'iltihap']
      ],
      meaning: 'Mide ve bağırsak iltihabı'
    },
    {
      word: 'Kardiyomiyopati',
      parts: [
        ['cardio', 'kalp'],
        ['myo', 'kas'],
        ['-pathy', 'hastalık']
      ],
      meaning: 'Kalp kası hastalığı'
    },
    {
      word: 'Nephrolithiasis',
      parts: [
        ['nephro', 'böbrek'],
        ['lith', 'taş'],
        ['-iasis', 'durum']
      ],
      meaning: 'Böbrek taşı oluşumu'
    },
    {
      word: 'Osteoarthritis',
      parts: [
        ['osteo', 'kemik'],
        ['arthr', 'eklem'],
        ['-itis', 'iltihap']
      ],
      meaning: 'Kemik-eklem iltihabı'
    }
  ],
  en: [
    {
      word: 'Gastroenteritis',
      parts: [
        ['gastro', 'stomach'],
        ['enter', 'intestine'],
        ['-itis', 'inflammation']
      ],
      meaning: 'Inflammation of stomach and intestine'
    },
    {
      word: 'Cardiomyopathy',
      parts: [
        ['cardio', 'heart'],
        ['myo', 'muscle'],
        ['-pathy', 'disease']
      ],
      meaning: 'Heart muscle disease'
    },
    {
      word: 'Nephrolithiasis',
      parts: [
        ['nephro', 'kidney'],
        ['lith', 'stone'],
        ['-iasis', 'condition']
      ],
      meaning: 'Kidney stone formation'
    },
    {
      word: 'Osteoarthritis',
      parts: [
        ['osteo', 'bone'],
        ['arthr', 'joint'],
        ['-itis', 'inflammation']
      ],
      meaning: 'Bone and joint inflammation'
    }
  ]
};

export const LiveMorphemeSplitDemo = () => {
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const terms = TERMS_DATA[isTr ? 'tr' : 'en'];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Otomatik döngü (3.8 saniyede bir sonraki terime geçer)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % terms.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [terms.length, currentIndex]);

  const handleSelect = useCallback((idx) => {
    setCurrentIndex(idx);
  }, []);

  const currentTerm = terms[currentIndex] || terms[0];

  return (
    <div className="w-full">
      {/* Animasyon Stilleri */}
      <style>{`
        @keyframes hlmRise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes hlmTick {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }
        .hlm-rise {
          animation: hlmRise 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .hlm-tick {
          animation: hlmTick 1.4s infinite ease-in-out;
        }
      `}</style>

      <section
        id="hlmSplit"
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-border bg-card text-card-foreground shadow-xl shadow-primary/5 transition-colors duration-300"
        style={{
          fontFamily: "'Outfit', 'Nunito', sans-serif"
        }}
      >
        {/* Sağ üst HealthLex Primary Blue radial glow efekti */}
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none filter blur-3xl opacity-35 dark:opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)'
          }}
        />

        {/* Sol alt ince soft secondary ışık */}
        <div
          className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full pointer-events-none filter blur-3xl opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary)), transparent 70%)'
          }}
        />

        {/* Üst Meta Bilgisi */}
        <div
          className="relative z-10 flex justify-between items-center gap-4 flex-wrap text-xs text-muted-foreground tracking-wider uppercase"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          <span className="flex items-center gap-2">
            <span className="hlm-tick text-primary text-base leading-none">●</span>
            <span className="font-semibold text-foreground/90">
              {isTr ? 'CANLI ÇÖZÜMLEME' : 'LIVE ANALYSIS'}
            </span>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-primary font-bold">
              {currentIndex + 1} / {terms.length}
            </span>
          </span>
          <span className="text-muted-foreground normal-case tracking-normal text-xs sm:text-[13px] font-medium">
            {isTr ? 'Daha önce görmediğin terimi bile çözersin' : 'Decode any medical term you have never seen before'}
          </span>
        </div>

        {/* Ana Terim Başlığı */}
        <div
          key={`word-${currentIndex}`}
          className="hlm-rise relative z-10 mt-6 font-bold tracking-tight text-foreground uppercase"
          style={{
            fontFamily: "'Space Grotesk', 'Playfair Display', sans-serif",
            fontSize: 'clamp(30px, 5vw, 54px)'
          }}
        >
          {currentTerm.word}
        </div>

        {/* Morfem Parçaları (Kök, Ön Ek, Son Ek Kutucukları) */}
        <div className="relative z-10 flex gap-3 sm:gap-4 mt-6 flex-wrap">
          {currentTerm.parts.map((p, k) => (
            <div
              key={`part-${currentIndex}-${k}`}
              className="hlm-rise flex flex-col gap-1.5 rounded-xl px-5 py-4 min-w-[130px] sm:min-w-[150px] bg-primary/[0.06] dark:bg-primary/[0.14] border border-primary/20 dark:border-primary/30 hover:border-primary/40 hover:bg-primary/[0.09] transition-all duration-300 shadow-sm"
              style={{
                animationDelay: `${k * 0.12}s`
              }}
            >
              <span
                className="text-xl sm:text-2xl text-primary font-bold tracking-tight"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                {p[0]}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                {p[1]}
              </span>
            </div>
          ))}
        </div>

        {/* Anlam Satırı */}
        <div
          key={`meaning-${currentIndex}`}
          className="hlm-rise relative z-10 mt-7 text-base sm:text-lg text-foreground flex items-center gap-3 font-medium"
        >
          <span
            className="text-primary font-bold text-2xl font-mono"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            =
          </span>
          <strong className="font-semibold text-foreground">
            {currentTerm.meaning}
          </strong>
        </div>

        {/* Gösterge Noktaları (Dots Navigasyon) */}
        <div className="relative z-10 mt-6 flex gap-2 items-center">
          {terms.map((t, k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleSelect(k)}
              aria-label={t.word}
              className={`h-2 rounded-full border-0 p-0 transition-all duration-300 cursor-pointer ${
                k === currentIndex
                  ? 'w-7 bg-primary shadow-sm shadow-primary/30'
                  : 'w-2 bg-muted-foreground/25 hover:bg-muted-foreground/45'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LiveMorphemeSplitDemo;
