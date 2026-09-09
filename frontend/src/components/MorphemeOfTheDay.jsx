import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

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
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-9 border border-border bg-card text-card-foreground shadow-lg shadow-primary/5 transition-all duration-300 flex flex-col gap-4 ${className}`}
      style={{ fontFamily: "'Outfit', 'Nunito', sans-serif" }}
    >
      {/* Sağ üst hafif Trust Blue ambient glow */}
      <div
        className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none filter blur-3xl opacity-25 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)'
        }}
      />

      {/* Üst Etiket */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div
          className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>{data.label}</span>
        </div>
        <span
          className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {data.type}
        </span>
      </div>

      {/* Büyük Morfem Başlığı */}
      <div
        className="relative z-10 text-4xl sm:text-5xl font-bold tracking-tight text-primary leading-none"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        {data.morpheme}
      </div>

      {/* Açıklama */}
      <p className="relative z-10 text-sm sm:text-base text-muted-foreground leading-relaxed">
        <strong className="text-foreground font-semibold">
          {isTr ? 'İltihap. ' : 'Inflammation. '}
        </strong>
        {isTr
          ? 'Bir organ adının sonuna gelir ve o organın iltihabını bildirir. Tıbbın en sık kullanılan son eki.'
          : 'Attached to an anatomical root to designate inflammation. One of the most frequently used suffixes in medical terminology.'}
      </p>

      {/* Örnek Kelimeler Listesi */}
      <div
        className="relative z-10 grid gap-2.5 pt-2 text-xs sm:text-sm"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        {data.examples.map((ex, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-4 py-2 border-b border-border/60 last:border-0 last:pb-0 hover:bg-muted/40 px-2 rounded-lg transition-colors"
          >
            <span className="text-foreground font-semibold">
              {ex.prefix}
              <span className="text-primary font-bold underline decoration-primary/40 underline-offset-2">
                {ex.suffix}
              </span>
            </span>
            <span className="text-muted-foreground text-xs sm:text-[13px]">
              {ex.meaning}
            </span>
          </div>
        ))}
      </div>

      {/* Buton / Link */}
      <button
        type="button"
        onClick={() => navigate('/morphemes')}
        className="relative z-10 mt-3 self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-sm transition-all duration-200 cursor-pointer group"
      >
        <span>{data.cta}</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  );
};

export default MorphemeOfTheDay;
