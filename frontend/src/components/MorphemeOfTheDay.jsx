import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const MOTD_DATA = {
  tr: {
    label: 'GÜNÜN MORFEMİ',
    morpheme: '-itis',
    type: 'Son Ek (Suffix)',
    desc: 'İltihap. Bir organ adının sonuna gelir ve o organın iltihabını bildirir. Tıbbın en sık kullanılan son eki.',
    examples: [
      { prefix: 'gastr', suffix: 'itis', meaning: 'mide iltihabı' },
      { prefix: 'arthr', suffix: 'itis', meaning: 'eklem iltihabı' },
      { prefix: 'hepat', suffix: 'itis', meaning: 'karaciğer iltihabı' },
      { prefix: 'dermat', suffix: 'itis', meaning: 'deri iltihabı' }
    ],
    cta: '553+ morfemin tamamı'
  },
  en: {
    label: 'MORPHEME OF THE DAY',
    morpheme: '-itis',
    type: 'Suffix',
    desc: 'Inflammation. Attached to an anatomical root to designate inflammation. One of the most frequently used suffixes in medical terminology.',
    examples: [
      { prefix: 'gastr', suffix: 'itis', meaning: 'stomach inflammation' },
      { prefix: 'arthr', suffix: 'itis', meaning: 'joint inflammation' },
      { prefix: 'hepat', suffix: 'itis', meaning: 'liver inflammation' },
      { prefix: 'dermat', suffix: 'itis', meaning: 'skin inflammation' }
    ],
    cta: 'Explore all 553+ morphemes'
  }
};

export const MorphemeOfTheDay = ({ className = '' }) => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const data = MOTD_DATA[isTr ? 'tr' : 'en'];

  return (
    <section
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-7 sm:p-10 lg:p-11 border border-border bg-card text-card-foreground shadow-xl shadow-primary/5 transition-all duration-300 flex flex-col gap-5 sm:gap-6 ${className}`}
      style={{ fontFamily: "'Outfit', 'Nunito', sans-serif" }}
    >
      {/* Sağ üst hafif Trust Blue ambient glow */}
      <div
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none filter blur-3xl opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)'
        }}
      />

      {/* Üst Etiket */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div
          className="text-xs sm:text-[13px] font-semibold tracking-wider text-muted-foreground uppercase"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {data.label}
        </div>
        <span
          className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {data.type}
        </span>
      </div>

      {/* Büyük Morfem Başlığı */}
      <div
        className="relative z-10 text-5xl sm:text-6xl font-bold tracking-tight text-primary leading-none"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        {data.morpheme}
      </div>

      {/* Açıklama */}
      <p className="relative z-10 text-sm sm:text-base lg:text-[17px] text-muted-foreground leading-relaxed">
        <strong className="text-foreground font-semibold">
          {isTr ? 'İltihap. ' : 'Inflammation. '}
        </strong>
        {isTr
          ? 'Bir organ adının sonuna gelir ve o organın iltihabını bildirir. Tıbbın en sık kullanılan son eki.'
          : 'Attached to an anatomical root to designate inflammation. One of the most frequently used suffixes in medical terminology.'}
      </p>

      {/* Örnek Kelimeler Listesi */}
      <div
        className="relative z-10 grid gap-3 pt-2 text-sm sm:text-[15px]"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        {data.examples.map((ex, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-4 py-2.5 px-3 border-b border-border/60 last:border-0 last:pb-0 hover:bg-muted/40 rounded-xl transition-colors"
          >
            <span className="text-foreground font-semibold text-base sm:text-[17px]">
              {ex.prefix}
              <span className="text-primary font-bold underline decoration-primary/40 underline-offset-4">
                {ex.suffix}
              </span>
            </span>
            <span className="text-muted-foreground text-xs sm:text-sm font-medium">
              {ex.meaning}
            </span>
          </div>
        ))}
      </div>

      {/* Buton / Link */}
      <button
        type="button"
        onClick={() => navigate('/morphemes')}
        className="relative z-10 mt-2 self-start inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <span>{data.cta}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  );
};

export default MorphemeOfTheDay;
