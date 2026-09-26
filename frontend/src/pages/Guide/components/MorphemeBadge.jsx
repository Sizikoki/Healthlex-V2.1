import React from 'react';
import { Link } from 'react-router-dom';

const MORPHEME_SLUG_MAP = {
  'gastr/o': 'gastr',
  'enter/o': 'enter',
  '-itis': 'itis',
  'epi-': 'epi',
  'cardi/o': 'cardi',
  'derm/o': 'derm',
  'arthr/o': 'arthr',
  'chol/e': 'chol',
  'pelv/i': 'pelv',
  'neur/o': 'neur',
  '-logy': 'logy',
  'endo-': 'endo',
  '-scope': 'scope',
  'my/o': 'my',
  '-pathy': 'pathy',
  'oste/o': 'oste',
  '-gram': 'gram',
  'electr/o': 'electr',
  'ren/o': 'ren',
  'nephr/o': 'nephr',
  'cutane/o': 'cutan',
  'dermat/o': 'dermat',
  'or/o': 'or',
  'stomat/o': 'stomat',
  'pulmon/o': 'pulmon',
  'pneumon/o': 'pneumon',
  'scler/o': 'scler',
  'myel/o': 'myel',
  'hypo-': 'hypo',
  'micro-': 'micro',
};

/**
 * MorphemeBadge Component
 * @param {string} text - Morpheme text (e.g. 'epi-', 'cardi/o', '-itis')
 * @param {'prefix' | 'root' | 'suffix' | 'mp' | 'mr' | 'ms'} type - Type of morpheme
 * @param {boolean} linkable - Whether to wrap with Link to /morphemes/:slug
 * @param {string} className - Optional extra classes
 */
export const MorphemeBadge = ({ text, type = 'root', linkable = true, className = '' }) => {
  // Normalize type
  const normalizedType =
    type === 'prefix' || type === 'mp'
      ? 'mp'
      : type === 'suffix' || type === 'ms'
      ? 'ms'
      : 'mr';

  const typeStyles = {
    mp: 'bg-[#e7f6ec] text-[#166534] border-[#bfe5cb] hover:bg-[#d8f0df]',
    mr: 'bg-[#e8efff] text-[#1e40af] border-[#c7d6fb] hover:bg-[#dce7ff]',
    ms: 'bg-[#fdf1e3] text-[#9a3f07] border-[#f3d3ad] hover:bg-[#fae6ce]',
  };

  const cleanSlug =
    MORPHEME_SLUG_MAP[text] ||
    text.split(/[/;]/)[0].replace(/[-_]/g, '').trim().toLowerCase();

  const baseStyle =
    'inline-block px-[9px] py-[1px] rounded-[7px] font-mono font-bold text-[14px] leading-[1.6] border whitespace-nowrap transition-colors';

  if (!linkable || !cleanSlug) {
    return (
      <span className={`${baseStyle} ${typeStyles[normalizedType]} ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <Link
      to={`/morphemes/${cleanSlug}`}
      title={`${text} morfemini incele`}
      className={`${baseStyle} ${typeStyles[normalizedType]} ${className}`}
    >
      {text}
    </Link>
  );
};
