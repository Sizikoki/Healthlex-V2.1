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
      {/* Özel Fontlar & Animasyon Stilleri */}
      <style>{`
        @keyframes hlmRise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes hlmTick {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(0.85); }
        }
        .hlm-rise {
          animation: hlmRise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .hlm-tick {
          animation: hlmTick 1.2s infinite ease-in-out;
        }
      `}</style>

      <section
        id="hlmSplit"
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-7 sm:p-11 border border-white/10 shadow-2xl bg-[#0a0a0c] text-[#f2efe9]"
        style={{
          fontFamily: "'Outfit', sans-serif"
        }}
      >
        {/* Sağ üst kırmızı radial ışık efekti */}
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none filter blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(200,16,46,0.32), transparent 70%)'
          }}
        />

        {/* Üst Meta Bilgisi */}
        <div className="relative z-10 flex justify-between items-center gap-4 flex-wrap text-[11px] text-[#f2efe9]/60 tracking-[0.14em] uppercase"
             style={{ fontFamily: "'Fira Code', monospace" }}>
          <span className="flex items-center gap-1.5">
            <span className="hlm-tick text-[#ff4d55] text-sm">●</span>
            <span>
              {isTr ? 'CANLI ÇÖZÜMLEME' : 'LIVE ANALYSIS'} · {currentIndex + 1} / {terms.length}
            </span>
          </span>
          <span className="text-[#f2efe9]/50 normal-case tracking-normal text-xs sm:text-[13px]">
            {isTr ? 'Daha önce görmediğin terimi bile çözersin' : 'Decode any medical term you have never seen before'}
          </span>
        </div>

        {/* Ana Terim Başlığı */}
        <div
          key={`word-${currentIndex}`}
          className="hlm-rise relative z-10 mt-6 font-semibold uppercase tracking-[0.02em] leading-none text-[#f2efe9]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5.5vw, 64px)'
          }}
        >
          {currentTerm.word}
        </div>

        {/* Morfem Parçaları (Kök, Ön Ek, Son Ek Kutucukları) */}
        <div className="relative z-10 flex gap-3 sm:gap-4 mt-6 flex-wrap">
          {currentTerm.parts.map((p, k) => (
            <div
              key={`part-${currentIndex}-${k}`}
              className="hlm-rise flex flex-col gap-2 rounded-xl px-5 py-4 min-w-[130px] sm:min-w-[150px] border transition-all duration-300"
              style={{
                backgroundColor: 'rgba(200, 16, 46, 0.12)',
                borderColor: 'rgba(200, 16, 46, 0.45)',
                animationDelay: `${k * 0.12}s`
              }}
            >
              <b
                className="text-xl sm:text-2xl text-[#ff4d55] font-medium tracking-tight"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                {p[0]}
              </b>
              <span className="text-xs sm:text-sm text-[#f2efe9]/75 font-normal">
                {p[1]}
              </span>
            </div>
          ))}
        </div>

        {/* Anlam Satırı */}
        <div
          key={`meaning-${currentIndex}`}
          className="hlm-rise relative z-10 mt-6 text-base sm:text-lg text-[#f2efe9]/90 flex items-center gap-3 font-medium"
        >
          <em
            className="not-italic text-[#ff4d55] font-bold text-xl sm:text-2xl"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            =
          </em>
          <strong className="font-semibold text-[#f2efe9]">
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
                  ? 'w-7 bg-[#c8102e]'
                  : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LiveMorphemeSplitDemo;
