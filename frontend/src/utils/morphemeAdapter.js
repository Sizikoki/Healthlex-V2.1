/**
 * =====================================================================
 *  HealthLexMed — Morfem Soru Adaptörü (morphemeAdapter.js)
 *  Converts medical terms (medicalTerms.js / Firestore) into
 *  dynamic Fable/Elmish Morpheme Question objects with Latin affix parsing.
 *  Powered by the comprehensive morphemesData database (116 prefixes,
 *  318 roots, 125 suffixes).
 * =====================================================================
 */
import { getAllTerms } from '@/data/medicalTerms';
import { DEFAULT_QUESTIONS } from '@/components/games/MorphemeGameFable';
import {
  PREFIXES,
  ROOTS,
  SUFFIXES,
  PREFIX_LOOKUP,
  ROOT_LOOKUP,
  SUFFIX_LOOKUP,
} from '@/data/morphemesData';

// Dynamic list of prefixes sorted by length descending for longest-match-first
export const KNOWN_PREFIXES = Array.from(
  new Set(
    PREFIXES.flatMap((p) => p.variants || [p.prefix])
      .map((v) => v.trim().toLowerCase())
      .filter((v) => v.endsWith('-'))
  )
).sort((a, b) => b.length - a.length);

// Dynamic list of suffixes sorted by length descending for longest-match-first
export const KNOWN_SUFFIXES = Array.from(
  new Set(
    SUFFIXES.flatMap((s) => s.variants || [s.suffix])
      .map((v) => v.trim().toLowerCase())
      .filter((v) => v.startsWith('-'))
  )
).sort((a, b) => b.length - a.length);

// Dynamic lookup tables for backward compatibility and fast access
export const PREFIX_MEANINGS = {};
PREFIXES.forEach((p) => {
  const meta = { tr: p.meaningTr, en: p.meaningEn };
  (p.variants || [p.prefix]).forEach((v) => {
    PREFIX_MEANINGS[v.toLowerCase()] = meta;
  });
});

export const SUFFIX_MEANINGS = {};
SUFFIXES.forEach((s) => {
  const meta = { tr: s.meaningTr, en: s.meaningEn };
  (s.variants || [s.suffix]).forEach((v) => {
    SUFFIX_MEANINGS[v.toLowerCase()] = meta;
  });
});

export const COMMON_ROOT_DICTIONARY = {};
ROOTS.forEach((r) => {
  const meta = { tr: r.meaningTr, en: r.meaningEn };
  const clean = r.cleanRoot.toLowerCase();
  COMMON_ROOT_DICTIONARY[clean] = meta;

  const rawParts = r.root.split('/').map((s) => s.trim().toLowerCase());
  if (rawParts.length === 2) {
    COMMON_ROOT_DICTIONARY[rawParts[0]] = meta;
    COMMON_ROOT_DICTIONARY[`${rawParts[0]}${rawParts[1]}`] = meta;
  }
});

// Rich fallback distractors pool sourced from morphemesData
export const FALLBACK_DISTRACTORS = [
  { id: 'dis_a', text: 'a-', meaning: PREFIX_LOOKUP['a-'] || { tr: 'yokluk', en: 'without' }, partType: 'prefix' },
  { id: 'dis_hyper', text: 'hyper-', meaning: PREFIX_LOOKUP['hyper-'] || { tr: 'aşırı, yüksek', en: 'excessive' }, partType: 'prefix' },
  { id: 'dis_hypo', text: 'hypo-', meaning: PREFIX_LOOKUP['hypo-'] || { tr: 'düşük, yetersiz', en: 'deficient' }, partType: 'prefix' },
  { id: 'dis_sub', text: 'sub-', meaning: PREFIX_LOOKUP['sub-'] || { tr: 'altında', en: 'under' }, partType: 'prefix' },
  { id: 'dis_inter', text: 'inter-', meaning: PREFIX_LOOKUP['inter-'] || { tr: 'arasında', en: 'between' }, partType: 'prefix' },
  { id: 'dis_intra', text: 'intra-', meaning: PREFIX_LOOKUP['intra-'] || { tr: 'içinde', en: 'within' }, partType: 'prefix' },
  { id: 'dis_dys', text: 'dys-', meaning: { tr: 'bozuk, güçlük', en: 'difficult, painful' }, partType: 'prefix' },
  { id: 'dis_brady', text: 'brady-', meaning: PREFIX_LOOKUP['brady-'] || { tr: 'yavaş', en: 'slow' }, partType: 'prefix' },
  { id: 'dis_tachy', text: 'tachy-', meaning: PREFIX_LOOKUP['tachy-'] || { tr: 'hızlı', en: 'fast' }, partType: 'prefix' },
  { id: 'dis_peri', text: 'peri-', meaning: PREFIX_LOOKUP['peri-'] || { tr: 'çevresinde', en: 'around' }, partType: 'prefix' },
  { id: 'dis_gastr', text: 'gastr', meaning: ROOT_LOOKUP['gastr'] || { tr: 'mide', en: 'stomach' }, partType: 'root' },
  { id: 'dis_oste', text: 'oste', meaning: ROOT_LOOKUP['oste'] || { tr: 'kemik', en: 'bone' }, partType: 'root' },
  { id: 'dis_chondr', text: 'chondr', meaning: ROOT_LOOKUP['chondr'] || { tr: 'kıkırdak', en: 'cartilage' }, partType: 'root' },
  { id: 'dis_spondyl', text: 'spondyl', meaning: ROOT_LOOKUP['spondyl'] || { tr: 'omur', en: 'vertebra' }, partType: 'root' },
  { id: 'dis_cardi', text: 'cardi', meaning: ROOT_LOOKUP['cardi'] || { tr: 'kalp', en: 'heart' }, partType: 'root' },
  { id: 'dis_hepat', text: 'hepat', meaning: ROOT_LOOKUP['hepat'] || { tr: 'karaciğer', en: 'liver' }, partType: 'root' },
  { id: 'dis_nephr', text: 'nephr', meaning: ROOT_LOOKUP['nephr'] || { tr: 'böbrek', en: 'kidney' }, partType: 'root' },
  { id: 'dis_neur', text: 'neur', meaning: ROOT_LOOKUP['neur'] || { tr: 'sinir', en: 'nerve' }, partType: 'root' },
  { id: 'dis_itis', text: '-itis', meaning: SUFFIX_LOOKUP['-itis'] || { tr: 'iltihap, yangı', en: 'inflammation' }, partType: 'suffix' },
  { id: 'dis_osis', text: '-osis', meaning: SUFFIX_LOOKUP['-osis'] || { tr: 'anormal durum', en: 'abnormal condition' }, partType: 'suffix' },
  { id: 'dis_alis', text: '-alis', meaning: SUFFIX_LOOKUP['-alis'] || { tr: 'ait, ilgili', en: 'pertaining to' }, partType: 'suffix' },
  { id: 'dis_ale', text: '-ale', meaning: SUFFIX_LOOKUP['-ale'] || { tr: 'ait, ilgili', en: 'pertaining to' }, partType: 'suffix' },
  { id: 'dis_oideum', text: '-oideum', meaning: SUFFIX_LOOKUP['-oideum'] || { tr: 'benzer, şeklinde', en: 'resembling' }, partType: 'suffix' },
  { id: 'dis_ectomy', text: '-ectomy', meaning: SUFFIX_LOOKUP['-ectomy'] || { tr: 'cerrahi çıkarma', en: 'surgical removal' }, partType: 'suffix' },
  { id: 'dis_plasty', text: '-plasty', meaning: SUFFIX_LOOKUP['-plasty'] || { tr: 'cerrahi onarım', en: 'surgical repair' }, partType: 'suffix' },
];

/**
 * Kelimeyi ön ek, kök ve son ek parçalarına ayırır.
 * morphemesData.js içindeki 116 prefix, 318 root ve 125 suffix'i kullanır.
 */
export function decomposeWord(wordText, parentMeaningMap = {}) {
  let lower = wordText.toLowerCase().replace(/^-+|-+$/g, '');
  if (!lower) return [];

  // 1. Doğrudan tek parça anatomik kök / isim kontrolü (örn. "os", "cor", "vas", "pes", "dens")
  const directRootMeta = parentMeaningMap[lower] || ROOT_LOOKUP[lower] || COMMON_ROOT_DICTIONARY[lower];
  if (directRootMeta) {
    return [
      {
        text: lower,
        meaning: { tr: directRootMeta.tr || lower, en: directRootMeta.en || lower },
        partType: 'root',
      },
    ];
  }

  let foundPrefix = null;
  let foundSuffix = null;
  let stem = lower;

  // 2. Ön Ek Tespiti (En uzun eşleşme öncelikli)
  for (const p of KNOWN_PREFIXES) {
    const pClean = p.replace(/-/g, '');
    if (lower.startsWith(pClean) && lower.length > pClean.length + 2) {
      foundPrefix = p;
      stem = lower.substring(pClean.length);
      break;
    }
  }

  // 3. Son Ek Tespiti (Gövde üzerinden en uzun eşleşme)
  for (const s of KNOWN_SUFFIXES) {
    const sClean = s.replace(/-/g, '');
    if (stem.endsWith(sClean) && stem.length > sClean.length + 1) {
      foundSuffix = s;
      stem = stem.substring(0, stem.length - sClean.length);
      break;
    }
  }

  // 4. Kök/Gövde Anlamının Çözümlenmesi
  const cleanStemKey = stem.replace(/-/g, '');
  let stemMeaning = parentMeaningMap[cleanStemKey] || ROOT_LOOKUP[cleanStemKey] || COMMON_ROOT_DICTIONARY[cleanStemKey];

  if (!stemMeaning) {
    // Kısmi eşleşme taraması (örn. 'hepat' -> 'hepat/o')
    for (const [key, val] of Object.entries(ROOT_LOOKUP)) {
      if (cleanStemKey.startsWith(key) || key.startsWith(cleanStemKey)) {
        stemMeaning = val;
        break;
      }
    }
  }

  const defaultStemMeaning = stemMeaning || { tr: stem, en: stem };
  const parts = [];

  // Ön Ek Ekle
  if (foundPrefix) {
    const pMeta = PREFIX_LOOKUP[foundPrefix] || PREFIX_MEANINGS[foundPrefix] || { tr: foundPrefix, en: foundPrefix };
    parts.push({
      text: foundPrefix,
      meaning: { tr: pMeta.tr || foundPrefix, en: pMeta.en || foundPrefix },
      partType: 'prefix',
    });
  }

  // Kök Ekle
  let stemText = stem;
  if (foundSuffix && !stemText.endsWith('-')) {
    stemText = stemText + '-';
  }

  parts.push({
    text: stemText || wordText,
    meaning: {
      tr: defaultStemMeaning.tr || stemText,
      en: defaultStemMeaning.en || stemText,
    },
    partType: 'root',
  });

  // Son Ek Ekle
  if (foundSuffix) {
    const sMeta = SUFFIX_LOOKUP[foundSuffix] || SUFFIX_MEANINGS[foundSuffix] || { tr: 'ait, ilgili', en: 'pertaining to' };
    parts.push({
      text: foundSuffix,
      meaning: { tr: sMeta.tr || foundSuffix, en: sMeta.en || foundSuffix },
      partType: 'suffix',
    });
  }

  return parts;
}

/**
 * Terim nesnesini morfem dizisine dönüştürür.
 */
export function parseTermToMorphemes(term) {
  const termName = term.term || '';
  if (!termName || typeof termName !== 'string') return null;

  // Build parent meaning map from term.roots (e.g. "os (kemik) + occiput (ense)")
  const parentMeaningMap = {};
  if (term.roots && typeof term.roots === 'string') {
    const rawRootParts = term.roots.split(/\+|\;/).map((p) => p.trim()).filter(Boolean);
    rawRootParts.forEach((rp) => {
      const pIdx = rp.indexOf('(');
      if (pIdx !== -1) {
        const rootWord = rp.substring(0, pIdx).trim().toLowerCase().replace(/^-+|-+$/g, '');
        const cParen = rp.indexOf(')', pIdx);
        const meaningText = (cParen !== -1 ? rp.substring(pIdx + 1, cParen) : rp.substring(pIdx + 1)).trim();
        if (rootWord && meaningText) {
          parentMeaningMap[rootWord] = { tr: meaningText, en: meaningText };
        }
      }
    });
  }

  // Split term name into words (e.g. "Os Occipitale" -> ["Os", "Occipitale"])
  const words = termName.split(/\s+/).map((w) => w.trim()).filter(Boolean);
  if (words.length === 0) return null;

  const sequence = [];

  words.forEach((word, wordIdx) => {
    const parts = decomposeWord(word, parentMeaningMap);
    parts.forEach((p, partIdx) => {
      sequence.push({
        id: `t_${term.id || 'term'}_w${wordIdx}_p${partIdx}_${Math.random().toString(36).substr(2, 4)}`,
        text: p.text,
        meaning: p.meaning,
        partType: p.partType,
      });
    });
  });

  return sequence.length >= 2 ? sequence : null;
}

/**
 * Tıbbi terimleri 10'ar soruluk Morfem Yapıcı oyun sorularına dönüştürür.
 */
export function adaptTermsToMorphemeQuestions(terms, roundSize = 10) {
  let sourceTerms = Array.isArray(terms) && terms.length > 0 ? terms : [];

  const candidateQuestions = [];
  const allParsedParts = [];

  sourceTerms.forEach((term, idx) => {
    const sequence = parseTermToMorphemes(term);
    if (sequence && sequence.length > 0) {
      allParsedParts.push(...sequence);

      const targetLatinTerm = term.term || term.name || `Term #${term.id || idx}`;
      const definition = {
        tr: term.turkishShort || term.turkishDefinition || term.definition || term.turkish || '',
        en: term.englishDefinition || term.english || term.turkish || targetLatinTerm,
      };

      candidateQuestions.push({
        id: term.id || idx + 1,
        targetLatinTerm,
        definition,
        correctSequence: sequence,
        distractors: [],
      });
    }
  });

  // Kategori 10'dan az soru üretiyorsa genel havuzdan 10'a tamamla
  if (candidateQuestions.length < roundSize) {
    const fallbackTerms = getAllTerms();
    fallbackTerms.forEach((term, idx) => {
      if (!candidateQuestions.some((q) => q.targetLatinTerm === term.term)) {
        const sequence = parseTermToMorphemes(term);
        if (sequence && sequence.length > 0) {
          allParsedParts.push(...sequence);
          candidateQuestions.push({
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

  // Havuzu karıştırıp tam roundSize (10) soru seç
  const shuffledCandidates = [...candidateQuestions].sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffledCandidates.slice(0, Math.min(roundSize, shuffledCandidates.length));

  const pool = allParsedParts.length >= 6 ? allParsedParts : [...allParsedParts, ...FALLBACK_DISTRACTORS];

  selectedQuestions.forEach((q) => {
    const correctTexts = new Set(q.correctSequence.map((p) => p.text.toLowerCase()));
    const validDistractors = pool.filter((p) => !correctTexts.has(p.text.toLowerCase()));

    const shuffled = [...validDistractors].sort(() => Math.random() - 0.5);
    const uniqueDistractors = [];
    const usedTexts = new Set();

    for (const d of shuffled) {
      const lowerText = d.text.toLowerCase();
      if (!usedTexts.has(lowerText)) {
        usedTexts.add(lowerText);
        uniqueDistractors.push({
          id: `dist_${q.id}_${uniqueDistractors.length}_${Math.random().toString(36).substr(2, 4)}`,
          text: d.text,
          meaning: d.meaning,
          partType: d.partType,
        });
        if (uniqueDistractors.length >= 3) break;
      }
    }

    // If still less than 3 distractors, draw from FALLBACK_DISTRACTORS
    if (uniqueDistractors.length < 3) {
      for (const fb of FALLBACK_DISTRACTORS) {
        const lowerText = fb.text.toLowerCase();
        if (!correctTexts.has(lowerText) && !usedTexts.has(lowerText)) {
          usedTexts.add(lowerText);
          uniqueDistractors.push({
            id: `dist_fb_${q.id}_${uniqueDistractors.length}_${Math.random().toString(36).substr(2, 4)}`,
            text: fb.text,
            meaning: fb.meaning,
            partType: fb.partType,
          });
          if (uniqueDistractors.length >= 3) break;
        }
      }
    }

    q.distractors = uniqueDistractors;
  });

  return selectedQuestions.length > 0 ? selectedQuestions : DEFAULT_QUESTIONS.slice(0, roundSize);
}
