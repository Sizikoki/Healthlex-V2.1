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
  'sub-', 'inter-', 'intra-', 'supra-', 'dys-', 'brady-', 'tachy-', 'peri-', 'epi-', 'hypo-', 'hyper-', 'a-', 'an-', 'retro-', 'post-', 'pre-', 'anti-', 'endo-', 'exo-', 'meso-', 'syn-', 'sym-', 'hemi-', 'poly-', 'oligo-', 'mono-', 'bi-', 'tri-'
];

export const KNOWN_SUFFIXES = [
  '-oideum', '-oideus', '-oidea', '-ideus', '-idea', '-ideum', '-formis',
  '-ale', '-alis', '-are', '-aris', '-icus', '-ica', '-icum', '-eus', '-ea', '-eum',
  '-itis', '-osis', '-ia', '-iasis', '-oma', '-pathy', '-algia', '-dynia',
  '-logia', '-scopia', '-tomia', '-ectomia', '-stomia', '-plastia', '-graphia', '-gramma'
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
  'retro-': { tr: 'arkasında', en: 'behind, backward' },
  'post-': { tr: 'sonrasında', en: 'after, behind' },
  'pre-': { tr: 'öncesinde', en: 'before, in front' },
  'anti-': { tr: 'karşı, zıt', en: 'against, opposite' },
  'endo-': { tr: 'içinde', en: 'inside, inner' },
  'exo-': { tr: 'dışında', en: 'outside, outer' },
  'meso-': { tr: 'ortasında', en: 'middle' },
  'syn-': { tr: 'birleşik', en: 'together, with' },
  'sym-': { tr: 'birleşik', en: 'together, with' },
  'hemi-': { tr: 'yarım', en: 'half' },
  'poly-': { tr: 'çok, fazla', en: 'many, multiple' },
  'oligo-': { tr: 'az, yetersiz', en: 'few, scanty' },
  'mono-': { tr: 'tek, bir', en: 'single, one' },
  'bi-': { tr: 'iki, çift', en: 'two, double' },
  'tri-': { tr: 'üç', en: 'three' },
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
  '-oideus': { tr: 'benzer, şeklinde', en: '-shaped, resembling' },
  '-oidea': { tr: 'benzer, şeklinde', en: '-shaped, resembling' },
  '-oideum': { tr: 'benzer, şeklinde', en: '-shaped, resembling' },
  '-ideus': { tr: 'benzer, şeklinde', en: '-shaped, resembling' },
  '-idea': { tr: 'benzer, şeklinde', en: '-shaped, resembling' },
  '-ideum': { tr: 'benzer, şeklinde', en: '-shaped, resembling' },
  '-formis': { tr: 'biçiminde, şeklinde', en: 'form, shape' },
  '-itis': { tr: 'iltihap, yangı', en: 'inflammation' },
  '-osis': { tr: 'hastalık, durum', en: 'diseased condition' },
  '-ia': { tr: 'durum, hal', en: 'condition' },
  '-iasis': { tr: 'hastalık, varlık', en: 'presence of condition' },
  '-oma': { tr: 'tümör, kitle', en: 'tumor, mass' },
  '-pathy': { tr: 'hastalık', en: 'disease' },
  '-algia': { tr: 'ağrı, sızı', en: 'pain' },
  '-dynia': { tr: 'ağrı', en: 'pain' },
  '-logia': { tr: 'bilim, inceleme', en: 'study, science' },
  '-scopia': { tr: 'görüntüleme, bakı', en: 'visual examination' },
  '-tomia': { tr: 'kesi, kesme işlemi', en: 'incision' },
  '-ectomia': { tr: 'ameliyatla çıkarma', en: 'surgical removal' },
  '-stomia': { tr: 'ağızlaştırma', en: 'opening' },
  '-plastia': { tr: 'cerrahi onarım', en: 'surgical repair' },
  '-graphia': { tr: 'kayıt, grafik', en: 'recording' },
  '-gramma': { tr: 'kayıt belgesi', en: 'record' },
};

export const COMMON_ROOT_DICTIONARY = {
  'os': { tr: 'kemik', en: 'bone' },
  'oste': { tr: 'kemik', en: 'bone' },
  'osteo': { tr: 'kemik', en: 'bone' },
  'occipit': { tr: 'artkafa, ense', en: 'occiput' },
  'occiput': { tr: 'artkafa, ense', en: 'occiput' },
  'front': { tr: 'alın', en: 'forehead' },
  'frons': { tr: 'alın', en: 'forehead' },
  'pariet': { tr: 'çeper, duvar', en: 'wall' },
  'paries': { tr: 'çeper, duvar', en: 'wall' },
  'tempor': { tr: 'şakak', en: 'temple' },
  'tempus': { tr: 'şakak', en: 'temple' },
  'sphen': { tr: 'kama', en: 'wedge' },
  'ethmoid': { tr: 'kalbursu', en: 'sieve-like' },
  'zygomat': { tr: 'elmacık', en: 'cheek' },
  'mandibul': { tr: 'alt çene', en: 'lower jaw' },
  'maxill': { tr: 'üst çene', en: 'upper jaw' },
  'nas': { tr: 'burun', en: 'nose' },
  'rhin': { tr: 'burun', en: 'nose' },
  'lacrim': { tr: 'gözyaşı', en: 'tear' },
  'vomer': { tr: 'sapan kemiği', en: 'plowshare bone' },
  'palat': { tr: 'damak', en: 'palate' },
  'vertebr': { tr: 'omur', en: 'vertebra' },
  'spondyl': { tr: 'omur', en: 'vertebra' },
  'cost': { tr: 'kaburga', en: 'rib' },
  'stern': { tr: 'göğüs kemiği', en: 'breastbone' },
  'scapul': { tr: 'kürek kemiği', en: 'shoulder blade' },
  'clavicul': { tr: 'köprücük kemiği', en: 'collarbone' },
  'cleid': { tr: 'köprücük kemiği', en: 'collarbone' },
  'humer': { tr: 'kol kemiği', en: 'upper arm' },
  'brachi': { tr: 'kol', en: 'arm' },
  'radi': { tr: 'döner kemik', en: 'radius' },
  'uln': { tr: 'dirsek kemiği', en: 'ulna' },
  'carp': { tr: 'el bileği', en: 'wrist' },
  'tars': { tr: 'ayak bileği', en: 'ankle' },
  'femor': { tr: 'uyluk kemiği', en: 'thigh' },
  'tibi': { tr: 'kaval kemiği', en: 'shin bone' },
  'fibul': { tr: 'kamış kemiği', en: 'calf bone' },
  'patell': { tr: 'diz kapağı', en: 'kneecap' },
  'cox': { tr: 'kalça', en: 'hip' },
  'pelv': { tr: 'leğen', en: 'pelvis' },
  'arthr': { tr: 'eklem', en: 'joint' },
  'articul': { tr: 'eklem', en: 'joint' },
  'chondr': { tr: 'kıkırdak', en: 'cartilage' },
  'myo': { tr: 'kas', en: 'muscle' },
  'muscul': { tr: 'kas', en: 'muscle' },
  'tendin': { tr: 'kiriş, tendon', en: 'tendon' },
  'teno': { tr: 'kiriş, tendon', en: 'tendon' },
  'ligament': { tr: 'bağ', en: 'ligament' },
  'desm': { tr: 'bağ', en: 'ligament' },
  'synovi': { tr: 'eklem sıvısı', en: 'joint fluid' },
  'burs': { tr: 'eklem kesesi', en: 'fluid sac' },
  'menisc': { tr: 'ayça, menisküs', en: 'meniscus' },
  'lingu': { tr: 'dil', en: 'tongue' },
  'gloss': { tr: 'dil', en: 'tongue' },
  'phag': { tr: 'yutma, yeme', en: 'swallowing, eating' },
  'card': { tr: 'kalp', en: 'heart' },
  'gastr': { tr: 'mide', en: 'stomach' },
  'enter': { tr: 'bağırsak', en: 'intestine' },
  'hepat': { tr: 'karaciğer', en: 'liver' },
  'nephr': { tr: 'böbrek', en: 'kidney' },
  'ren': { tr: 'böbrek', en: 'kidney' },
  'pulmon': { tr: 'akciğer', en: 'lung' },
  'pneum': { tr: 'akciğer, hava', en: 'lung, air' },
  'derm': { tr: 'deri, cilt', en: 'skin' },
  'cutan': { tr: 'deri, cilt', en: 'skin' },
  'neur': { tr: 'sinir', en: 'nerve' },
  'encephal': { tr: 'beyin', en: 'brain' },
  'cerebr': { tr: 'beyin', en: 'brain' },
  'myel': { tr: 'omurilik, ilik', en: 'spinal cord, marrow' },
  'angi': { tr: 'damar', en: 'vessel' },
  'vas': { tr: 'damar', en: 'vessel' },
  'ven': { tr: 'toplardamar', en: 'vein' },
  'phleb': { tr: 'toplardamar', en: 'vein' },
  'arteri': { tr: 'atardamar', en: 'artery' },
  'hem': { tr: 'kan', en: 'blood' },
  'hemat': { tr: 'kan', en: 'blood' },
  'sanguin': { tr: 'kan', en: 'blood' },
};

const FALLBACK_DISTRACTORS = [
  { id: 'dis_a', text: 'a-', meaning: PREFIX_MEANINGS['a-'], partType: 'prefix' },
  { id: 'dis_hyper', text: 'hyper-', meaning: PREFIX_MEANINGS['hyper-'], partType: 'prefix' },
  { id: 'dis_hypo', text: 'hypo-', meaning: PREFIX_MEANINGS['hypo-'], partType: 'prefix' },
  { id: 'dis_sub', text: 'sub-', meaning: PREFIX_MEANINGS['sub-'], partType: 'prefix' },
  { id: 'dis_inter', text: 'inter-', meaning: PREFIX_MEANINGS['inter-'], partType: 'prefix' },
  { id: 'dis_dys', text: 'dys-', meaning: PREFIX_MEANINGS['dys-'], partType: 'prefix' },
  { id: 'dis_gastr', text: 'gastr', meaning: { tr: 'mide', en: 'stomach' }, partType: 'root' },
  { id: 'dis_oste', text: 'oste', meaning: { tr: 'kemik', en: 'bone' }, partType: 'root' },
  { id: 'dis_chondr', text: 'chondr', meaning: { tr: 'kıkırdak', en: 'cartilage' }, partType: 'root' },
  { id: 'dis_spondyl', text: 'spondyl', meaning: { tr: 'omur', en: 'vertebra' }, partType: 'root' },
  { id: 'dis_itis', text: '-itis', meaning: SUFFIX_MEANINGS['-itis'], partType: 'suffix' },
  { id: 'dis_osis', text: '-osis', meaning: SUFFIX_MEANINGS['-osis'], partType: 'suffix' },
  { id: 'dis_alis', text: '-alis', meaning: SUFFIX_MEANINGS['-alis'], partType: 'suffix' },
  { id: 'dis_ale', text: '-ale', meaning: SUFFIX_MEANINGS['-ale'], partType: 'suffix' },
  { id: 'dis_oideum', text: '-oideum', meaning: SUFFIX_MEANINGS['-oideum'], partType: 'suffix' },
];

function decomposeWord(wordText, parentMeaningMap = {}) {
  let lower = wordText.toLowerCase().replace(/^-+|-+$/g, '');
  if (!lower) return [];

  // 1. Direct match for anatomical noun stems (e.g. "os", "cor", "vas")
  if (COMMON_ROOT_DICTIONARY[lower]) {
    const meaning = parentMeaningMap[lower] || COMMON_ROOT_DICTIONARY[lower];
    return [{
      text: lower,
      meaning: { tr: meaning.tr || lower, en: meaning.en || lower },
      partType: 'root',
    }];
  }

  let foundPrefix = null;
  let foundSuffix = null;
  let stem = lower;

  // 2. Check for Prefix
  const sortedPrefixes = [...KNOWN_PREFIXES].sort((a, b) => b.length - a.length);
  for (const p of sortedPrefixes) {
    const pClean = p.replace(/-/g, '');
    if (lower.startsWith(pClean) && lower.length > pClean.length + 2) {
      foundPrefix = p;
      stem = lower.substring(pClean.length);
      break;
    }
  }

  // 3. Check for Suffix on stem
  const sortedSuffixes = [...KNOWN_SUFFIXES].sort((a, b) => b.length - a.length);
  for (const s of sortedSuffixes) {
    const sClean = s.replace(/-/g, '');
    if (stem.endsWith(sClean) && stem.length > sClean.length + 1) {
      foundSuffix = s;
      stem = stem.substring(0, stem.length - sClean.length);
      break;
    }
  }

  // Look up meaning for stem
  let cleanStemKey = stem.replace(/-/g, '');
  let stemMeaning = parentMeaningMap[cleanStemKey] || COMMON_ROOT_DICTIONARY[cleanStemKey];

  if (!stemMeaning) {
    for (const [key, val] of Object.entries(COMMON_ROOT_DICTIONARY)) {
      if (cleanStemKey.startsWith(key) || key.startsWith(cleanStemKey)) {
        stemMeaning = val;
        break;
      }
    }
  }

  const defaultStemMeaning = stemMeaning || { tr: stem, en: stem };

  const parts = [];

  if (foundPrefix) {
    parts.push({
      text: foundPrefix,
      meaning: PREFIX_MEANINGS[foundPrefix] || { tr: foundPrefix, en: foundPrefix },
      partType: 'prefix',
    });
  }

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

  if (foundSuffix) {
    parts.push({
      text: foundSuffix,
      meaning: SUFFIX_MEANINGS[foundSuffix] || { tr: 'ait, ilgili', en: 'pertaining to' },
      partType: 'suffix',
    });
  }

  return parts;
}

function parseTermToMorphemes(term) {
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

export function adaptTermsToMorphemeQuestions(terms) {
  let sourceTerms = Array.isArray(terms) && terms.length > 0 ? terms : [];

  const questions = [];
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

      questions.push({
        id: term.id || idx + 1,
        targetLatinTerm,
        definition,
        correctSequence: sequence,
        distractors: [],
      });
    }
  });

  // If filtered category produces less than 4 questions, fall back to global terms pool
  if (questions.length < 4) {
    const fallbackTerms = getAllTerms();
    fallbackTerms.forEach((term, idx) => {
      if (!questions.some((q) => q.targetLatinTerm === term.term)) {
        const sequence = parseTermToMorphemes(term);
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

  return questions.length > 0 ? questions : DEFAULT_QUESTIONS;
}
