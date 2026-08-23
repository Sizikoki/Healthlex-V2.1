/**
 * =====================================================================
 *  HealthLexMed — Morfem Soru Adaptörü (morphemeAdapter.js)
 *  Converts medical terms (medicalTerms.js / Firestore) into
 *  dynamic Fable/Elmish Morpheme Question objects.
 * =====================================================================
 */
import { getAllTerms } from '@/data/medicalTerms';
import { DEFAULT_QUESTIONS } from '@/components/games/MorphemeGameFable';

const FALLBACK_DISTRACTORS = [
  { id: 'dis_a', text: 'a-', meaning: { tr: 'yokluk, -siz', en: 'without, lack of' }, partType: 'prefix' },
  { id: 'dis_hyper', text: 'hyper-', meaning: { tr: 'fazla, yüksek', en: 'excessive, high' }, partType: 'prefix' },
  { id: 'dis_hypo', text: 'hypo-', meaning: { tr: 'az, düşük', en: 'deficient, low' }, partType: 'prefix' },
  { id: 'dis_gastr', text: 'gastr', meaning: { tr: 'mide', en: 'stomach' }, partType: 'root' },
  { id: 'dis_oste', text: 'oste', meaning: { tr: 'kemik', en: 'bone' }, partType: 'root' },
  { id: 'dis_itis', text: '-itis', meaning: { tr: 'iltihap, yangı', en: 'inflammation' }, partType: 'suffix' },
  { id: 'dis_osis', text: '-osis', meaning: { tr: 'hastalık, durum', en: 'condition, disease' }, partType: 'suffix' },
  { id: 'dis_algia', text: '-algia', meaning: { tr: 'ağrı, sızı', en: 'pain' }, partType: 'suffix' },
];

function parseRootsToSequence(term) {
  const rootsStr = term.roots || term.morphemes || '';
  if (!rootsStr || typeof rootsStr !== 'string') return null;

  const rawParts = rootsStr.split(/\+|\;/).map((p) => p.trim()).filter(Boolean);
  if (rawParts.length === 0) return null;

  const sequence = rawParts.map((rawPart, index) => {
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

    let partType = 'root';
    if (text.endsWith('-') || (index === 0 && rawParts.length >= 3)) {
      partType = 'prefix';
    } else if (text.startsWith('-') || (index === rawParts.length - 1 && rawParts.length >= 2)) {
      partType = 'suffix';
    } else {
      partType = 'root';
    }

    const cleanText = text || rawPart;

    return {
      id: `${term.id || 't'}_p_${index}_${Math.random().toString(36).substr(2, 4)}`,
      text: cleanText,
      meaning: {
        tr: meaningTr || cleanText,
        en: meaningTr || cleanText,
      },
      partType,
    };
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

  // If filtered terms produce less than 3 questions, fall back to global terms
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
