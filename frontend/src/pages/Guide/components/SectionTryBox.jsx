import React from 'react';
import { Link } from 'react-router-dom';
import { MorphemeBadge } from './MorphemeBadge';

/**
 * SectionTryBox Component
 * @param {string} title
 * @param {string} text
 * @param {{category?: string, label: string}} deck
 * @param {Array<{text: string, type: 'prefix' | 'root' | 'suffix'}>} [morphemes]
 * @param {string} [from]
 */
export const SectionTryBox = ({
  title,
  text,
  deck = { category: '', label: 'Karma deste' },
  morphemes = [],
  from = '',
}) => {
  const params = new URLSearchParams();
  if (deck?.category) {
    params.set('category', deck.category);
  }
  if (from) {
    params.set('from', from);
  }
  const query = params.toString();
  const flashcardUrl = query ? `/flashcards?${query}` : '/flashcards';

  const visibleMorphemes = Array.isArray(morphemes) ? morphemes.slice(0, 3) : [];

  return (
    <div className="mt-[10px] bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[22px] flex flex-col gap-[14px] font-['Nunito',sans-serif]">
      <div className="flex flex-col gap-[4px]">
        <h3 className="m-0 font-extrabold text-[17px] sm:text-[18px] leading-[1.35] text-[#0f1b33]">
          {title}
        </h3>
        {text && (
          <p className="m-0 font-normal text-[14px] sm:text-[15px] leading-[1.55] text-[#475569]">
            {text}
          </p>
        )}
      </div>

      <div>
        <Link
          to={flashcardUrl}
          className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-[20px] py-[12px] rounded-[10px] bg-[#0f1b33] text-white font-['Nunito',sans-serif] font-extrabold text-[15px] leading-[1.3] text-center hover:bg-[#1b2d52] transition-colors"
        >
          {deck.label} kartlarıyla çalış →
        </Link>
      </div>

      {visibleMorphemes.length > 0 && (
        <div className="flex flex-wrap items-center gap-[8px] pt-[2px]">
          <span className="font-bold text-[12px] sm:text-[13px] text-[#5b6b82]">
            Morfem sayfaları:
          </span>
          {visibleMorphemes.map((m) => (
            <MorphemeBadge
              key={m.text}
              text={m.text}
              type={m.type}
              className="text-[13px]"
            />
          ))}
        </div>
      )}
    </div>
  );
};
