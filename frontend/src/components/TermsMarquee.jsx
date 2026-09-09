import React from 'react';

const TERMS = [
  'Os Frontale',
  'Cardiomyopathy',
  'Sternocleidomastoideus',
  'Nephrolithiasis',
  'Articulatio Genus',
  'Hemiplegia',
  'Os Temporale',
  'Gastroenteritis',
  'Circumduction',
  'Osteoarthritis',
  'Polydipsia',
  'Sustentaculum Tali'
];

export const TermsMarquee = () => {
  return (
    <div className="w-full overflow-hidden border-y border-border bg-muted/40 dark:bg-card/40 backdrop-blur-sm py-3.5 sm:py-4 select-none group">
      <style>{`
        @keyframes hlmMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hlm-marquee-track {
          display: flex;
          width: max-content;
          animation: hlmMarquee 38s linear infinite;
        }
        .group:hover .hlm-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="hlm-marquee-track" aria-hidden="true">
        {/* İki kez tekrar edilerek -50% translateX ile kesintisiz sonsuz döngü sağlanır */}
        {[...TERMS, ...TERMS].map((term, idx) => (
          <span
            key={`${term}-${idx}`}
            className="inline-flex items-center px-6 sm:px-8 text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider text-muted-foreground/80 transition-colors group-hover:text-foreground"
            style={{ fontFamily: "'Space Grotesk', 'Playfair Display', serif" }}
          >
            <span>{term}</span>
            <i
              className="not-italic text-primary font-bold ml-6 sm:ml-8 text-xs sm:text-sm"
              aria-hidden="true"
            >
              ✚
            </i>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TermsMarquee;
