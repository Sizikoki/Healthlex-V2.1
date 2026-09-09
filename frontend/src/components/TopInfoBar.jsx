import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const BAR_ITEMS = {
  tr: [
    '571+ MORFEM',
    '245+ TERİM',
    '10 KATEGORİ',
    '4 OYUN MODU',
    'TR ⇄ EN',
    'SINIRLI SÜRE: PRO %55 İNDİRİM',
    'ÜCRETSİZ 3 GÜN · KART GEREKMEZ',
    'TEK TIKLA İPTAL'
  ],
  en: [
    '571+ MORPHEMES',
    '245+ TERMS',
    '10 CATEGORIES',
    '4 GAME MODES',
    'TR ⇄ EN',
    'LIMITED TIME: PRO 55% OFF',
    'FREE 3-DAY TRIAL · NO CARD REQUIRED',
    'CANCEL IN ONE CLICK'
  ]
};

export const TopInfoBar = ({ variant = 'primary' }) => {
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const items = BAR_ITEMS[isTr ? 'tr' : 'en'];

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
