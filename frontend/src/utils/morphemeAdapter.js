/**
 * =====================================================================
 *  HealthLexMed — Morfem Soru Adaptörü (morphemeAdapter.js)
 *  Converts medical terms (medicalTerms.js / Firestore) into
 *  dynamic Fable/Elmish Morpheme Question objects with Latin affix parsing.
 * =====================================================================
 */
import { getAllTerms } from '@/data/medicalTerms';
import { DEFAULT_QUESTIONS } from '@/components/games/MorphemeGameFable';

export const KNOWN_PREFIXES = [
  'sub-', 'inter-', 'intra-', 'supra-', 'dys-', 'brady-', 'tachy-', 'peri-', 'epi-', 'hypo-', 'hyper-', 'a-', 'an-'
];

export const KNOWN_SUFFIXES = [
  '-ale', '-alis', '-are', '-aris', '-icus', '-ica', '-icum', '-eus', '-ea', '-eum', '-itis', '-osis', '-ia', '-ideus', '-idea'
];

export const PREFIX_MEANINGS = {
  'sub-': { tr: 'altında', en: 'under, below' },
  'inter-': { tr: 'arasında', en: 'between' },
  'intra-': { tr: 'içinde', en: 'within' },
  'supra-': { tr: 'üstünde', en: 'above' },
  'dys-': { tr: 'güçlük, bozukluk', en: 'difficult, impaired' },
  'brady-': { tr: 'yavaş', en: 'slow' },
  'tachy-': { tr: 'hızlı', en: 'fast' },
  'peri-': { tr: 'çevresinde', en: 'around' },
  'epi-': { tr: 'üzerinde', en: 'upon, over' },
  'hypo-': { tr: 'düşük, az', en: 'below, deficient' },
  'hyper-': { tr: 'yüksek, fazla', en: 'excessive, high' },
  'a-': { tr: 'yokluk, -siz', en: 'without, lack of' },
  'an-': { tr: 'yokluk, -siz', en: 'without, lack of' },
};

export const SUFFIX_MEANINGS = {
  '-ale': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-alis': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-are': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-aris': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-icus': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-ica': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-icum': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-eus': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-ea': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-eum': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-ideus': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-idea': { tr: 'ait, ilgili', en: 'pertaining to' },
  '-itis': { tr: 'iltihap, yangı', en: 'inflammation' },
  '-osis': { tr: 'hastalık, durum', en: 'diseased condition' },
  '-ia': { tr: 'durum, hal', en: 'condition' },
};

const FALLBACK_DISTRACTORS = [
  { id: 'dis_a', text: 'a-', meaning: PREFIX_MEANINGS['a-'], partType: 'prefix' },
  { id: 'dis_hyper', text: 'hyper-', meaning: PREFIX_MEANINGS['hyper-'], partType: 'prefix' },
  { id: 'dis_hypo', text: 'hypo-', meaning: PREFIX_MEANINGS['hypo-'], partType: 'prefix' },
  { id: 'dis_sub', text: 'sub-', meaning: PREFIX_MEANINGS['sub-'], partType: 'prefix' },
  { id: 'dis_gastr', text: 'gastr', meaning: { tr: 'mide', en: 'stomach' }, partType: 'root' },
  { id: 'dis_oste', text: 'oste', meaning: { tr: 'kemik', en: 'bone' }, partType: 'root' },
  { id: 'dis_itis', text: '-itis', meaning: SUFFIX_MEANINGS['-itis'], partType: 'suffix' },
  { id: 'dis_osis', text: '-osis', meaning: SUFFIX_MEANINGS['-osis'], partType: 'suffix' },
  { id: 'dis_alis', text: '-alis', meaning: SUFFIX_MEANINGS['-alis'], partType: 'suffix' },
];

function decomposeWord(wordText, wordMeaningTr = '') {
  const lower = wordText.toLowerCase().replace(/^-+|-+$/g, '');
  let foundPrefix = null;
  let foundSuffix = null;
  let stem = lower;

  // Check prefixes
  const sortedPrefixes = [...KNOWN_PREFIXES].sort((a, b) => b.length - a.length);
  for (const p of sortedPrefixes) {
    const pClean = p.replace(/-/g, '');
    if (lower.startsWith(pClean) && lower.length > pClean.length + 2) {
      foundPrefix = p;
      stem = lower.substring(pClean.length);
      break;
    }
  }

  // Check suffixes on stem
  const sortedSuffixes = [...KNOWN_SUFFIXES].sort((a, b) => b.length - a.length);
  for (const s of sortedSuffixes) {
    const sClean = s.replace(/-/g, '');
    if (stem.endsWith(sClean) && stem.length > sClean.length + 1) {
      foundSuffix = s;
      stem = stem.substring(0, stem.length - sClean.length);
      break;
    }
  }

  let stemText = stem;
  if (foundSuffix && !stemText.endsWith('-')) {
    stemText = stemText + '-';
  }

  const parts = [];

  if (foundPrefix) {
    parts.push({
      text: foundPrefix,
      meaning: PREFIX_MEANINGS[foundPrefix] || { tr: wordMeaningTr || foundPrefix, en: wordMeaningTr || foundPrefix },
      partType: 'prefix',
    });
  }

  parts.push({
    text: stemText || wordText,
    meaning: {
      tr: wordMeaningTr || stemText || wordText,
      en: wordMeaningTr || stemText || wordText,
    },
    partType: 'root',
  });

  if (foundSuffix) {
    parts.push({
      text: foundSuffix,
      meaning: SUFFIX_MEANINGS[foundSuffix] || { tr: 'ait, ilgili', en: 'pertaining to' },
      partType: 'suffix',
    });
  }

  return parts;
}

function parseRootsToSequence(term) {
  const rootsStr = term.roots || term.morphemes || '';
  let rawParts = [];

  if (rootsStr && typeof rootsStr === 'string' && rootsStr.trim()) {
    rawParts = rootsStr.split(/\+|\;/).map((p) => p.trim()).filter(Boolean);
  } else if (term.term && typeof term.term === 'string') {
    rawParts = term.term.split(/\s+/).map((p) => p.trim()).filter(Boolean);
  }

  if (rawParts.length === 0) return null;

  const sequence = [];

  rawParts.forEach((rawPart, index) => {
    const parenIndex = rawPart.indexOf('(');
    let text = rawPart;
    let meaningTr = '';

    if (parenIndex !== -1) {
      text = rawPart.substring(0, parenIndex).trim();
      const closeParen = rawPart.indexOf(')', parenIndex);
      meaningTr = closeParen !== -1
        ? rawPart.substring(parenIndex + 1, closeParen).trim()
        : rawPart.substring(parenIndex + 1).trim();
    }

    const cleanText = text.trim();
    if (!cleanText) return;

    if (cleanText.endsWith('-') && !cleanText.startsWith('-')) {
      const pref = cleanText.toLowerCase();
      sequence.push({
        id: `${term.id || 't'}_p_${index}_${Math.random().toString(36).substr(2, 4)}`,
        text: cleanText,
        meaning: PREFIX_MEANINGS[pref] || { tr: meaningTr || cleanText, en: meaningTr || cleanText },
        partType: 'prefix',
      });
    } else if (cleanText.startsWith('-')) {
      const suff = cleanText.toLowerCase();
      sequence.push({
        id: `${term.id || 't'}_p_${index}_${Math.random().toString(36).substr(2, 4)}`,
        text: cleanText,
        meaning: SUFFIX_MEANINGS[suff] || { tr: meaningTr || 'ait, ilgili', en: meaningTr || 'pertaining to' },
        partType: 'suffix',
      });
    } else {
      const decomposed = decomposeWord(cleanText, meaningTr);
      decomposed.forEach((part, subIdx) => {
        sequence.push({
          id: `${term.id || 't'}_p_${index}_${subIdx}_${Math.random().toString(36).substr(2, 4)}`,
          text: part.text,
          meaning: part.meaning,
          partType: part.partType,
        });
      });
    }
  });

  return sequence.length > 0 ? sequence : null;
}

export function adaptTermsToMorphemeQuestions(terms) {
  let sourceTerms = Array.isArray(terms) && terms.length > 0 ? terms : [];

  const questions = [];
  const allParsedParts = [];

  sourceTerms.forEach((term, idx) => {
    const sequence = parseRootsToSequence(term);
    if (sequence && sequence.length > 0) {
      allParsedParts.push(...sequence);

      const targetLatinTerm = term.term || term.name || `Term #${term.id || idx}`;
      const definition = {
        tr: term.turkishShort || term.turkishDefinition || term.definition || term.turkish || '',
        en: term.englishDefinition || term.english || term.turkish || targetLatinTerm,
      };

      questions.push({
        id: term.id || idx + 1,
        targetLatinTerm,
        definition,
        correctSequence: sequence,
        distractors: [],
      });
    }
  });

  if (questions.length < 3) {
    const fallbackTerms = getAllTerms();
    fallbackTerms.forEach((term, idx) => {
      if (!questions.some((q) => q.id === term.id)) {
        const sequence = parseRootsToSequence(term);
        if (sequence && sequence.length > 0) {
          allParsedParts.push(...sequence);
          questions.push({
            id: term.id || `fb_${idx}`,
            targetLatinTerm: term.term,
            definition: {
              tr: term.turkishShort || term.turkishDefinition || term.definition || '',
              en: term.englishDefinition || term.english || term.turkish || term.term,
            },
            correctSequence: sequence,
            distractors: [],
          });
        }
      }
    });
  }

  const pool = allParsedParts.length >= 6 ? allParsedParts : [...allParsedParts, ...FALLBACK_DISTRACTORS];

  questions.forEach((q) => {
    const correctTexts = new Set(q.correctSequence.map((p) => p.text.toLowerCase()));
    const validDistractors = pool.filter((p) => !correctTexts.has(p.text.toLowerCase()));

    const shuffled = [...validDistractors].sort(() => Math.random() - 0.5);
    const uniqueDistractors = [];
    const usedTexts = new Set();

    for (const d of shuffled) {
      const lowerText = d.text.toLowerCase();
      if (!usedTexts.has(lowerText)) {
        usedTexts.add(lowerText);
        uniqueDistractors.push(d);
        if (uniqueDistractors.length >= 3) break;
      }
    }

    q.distractors = uniqueDistractors;
  });

  return questions.length > 0 ? questions : DEFAULT_QUESTIONS;
}
