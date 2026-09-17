import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTermCount, getInitialTermCount } from '@/services/termCountService';

export const TopInfoBar = ({ variant = 'primary' }) => {
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const [count, setCount] = useState(getInitialTermCount);

  useEffect(() => {
    let isMounted = true;
    getTermCount().then((val) => {
      if (isMounted && typeof val === 'number') {
        setCount(val);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const items = isTr ? [
    '571+ MORFEM',
    `${count}+ TERİM`,
    '13 KATEGORİ',
    '4 OYUN MODU',
    'TR ⇄ EN',
    'SINIRLI SÜRE: PRO %55 İNDİRİM',
    '3 GÜN ÜCRETSİZ DENE · DİLEDİĞİN AN İPTAL ET',
    'TEK TIKLA İPTAL'
  ] : [
    '571+ MORPHEMES',
    `${count}+ TERMS`,
    '13 CATEGORIES',
    '4 GAME MODES',
    'TR ⇄ EN',
    'LIMITED TIME: PRO 55% OFF',
    'TRY 3 DAYS FREE · CANCEL ANYTIME',
    'CANCEL IN ONE CLICK'
  ];


  // Renk teması: 'red' (orijinal kırmızı) veya 'primary' (sitenin tıp mavisi)
  const bgClass =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground'
      : 'bg-[#c8102e] text-white';

  return (
    <div
      className={`w-full overflow-hidden h-[30px] sm:h-[32px] flex items-center select-none ${bgClass} transition-colors z-50`}
      style={{
        fontFamily: "'Fira Code', monospace",
        fontSize: '11px',
        letterSpacing: '0.12em'
      }}
      role="region"
      aria-label="Announcement"
    >
      <style>{`
        @keyframes hlmDrift {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hlm-topbar-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          animation: hlmDrift 28s linear infinite;
        }
        .hlm-topbar-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="hlm-topbar-track">
        {/* İki kez render edilerek -50% translateX ile kesintisiz sonsuz kayma sağlanır */}
        {[...items, ...items].map((item, idx) => (
          <span
            key={idx}
            className="px-6 sm:px-7 border-r border-white/35 flex items-center font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopInfoBar;
