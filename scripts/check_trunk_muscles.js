const fs = require('fs');
const path = require('path');

const termsBundle = require('../frontend/src/data/medicalTerms.js').medicalTermsData;

const candidates = [
  "M. Trapezius",
  "Pars Descendens (M. Trapezius)",
  "Pars Transversa (M. Trapezius)",
  "Pars Ascendens (M. Trapezius)",
  "M. Latissimus Dorsi",
  "M. Rhomboideus Major",
  "M. Rhomboideus Minor",
  "M. Levator Scapulae",
  "M. Serratus Posterior Inferior",
  "M. Serratus Posterior Superior",
  "M. Erector Spinae",
  "M. Iliocostalis",
  "M. Longissimus",
  "M. Spinalis",
  "M. Splenius Cervicis",
  "Mm. Multifidi",
  "M. Semispinalis Capitis",
  "Mm. Rotatores",
  "Fascia Thoracolumbalis",
  "M. Pectoralis Major",
  "Pars Clavicularis (M. Pectoralis Major)",
  "Pars Sternocostalis (M. Pectoralis Major)",
  "Pars Abdominalis (M. Pectoralis Major)",
  "M. Pectoralis Minor",
  "M. Subclavius",
  "M. Serratus Anterior",
  "Mm. Levatores Costarum",
  "Mm. Intercostales Externi",
  "Mm. Intercostales Interni",
  "Mm. Intercostales Intimi",
  "Mm. Subcostales",
  "M. Transversus Thoracis",
  "Fascia Endothoracica",
  "Diaphragma",
  "Pars Lumbalis Diaphragmatis",
  "Crus Dextrum (Diaphragma)",
  "Crus Sinistrum (Diaphragma)",
  "Lig. Arcuatum Medianum",
  "Lig. Arcuatum Mediale",
  "Lig. Arcuatum Laterale",
  "Hiatus Aorticus",
  "Hiatus Oesophageus",
  "Foramen Venae Cavae",
  "Centrum Tendineum",
  "M. Rectus Abdominis",
  "Vagina Musculi Recti Abdominis",
  "M. Pyramidalis",
  "M. Obliquus Externus Abdominis",
  "Lig. Inguinale",
  "Anulus Inguinalis Superficialis",
  "M. Obliquus Internus Abdominis",
  "M. Cremaster",
  "M. Transversus Abdominis",
  "Linea Alba",
  "Anulus Umbilicalis",
  "Canalis Inguinalis",
  "Anulus Inguinalis Profundus",
  "M. Quadratus Lumborum",
  "Fascia Transversalis",
  "Fascia Pelvis",
  "Diaphragma Pelvis",
  "M. Levator Ani",
  "M. Pubococcygeus",
  "M. Puborectalis",
  "M. Iliococcygeus",
  "M. Coccygeus",
  "M. Sphincter Ani Externus",
  "M. Semispinalis",
  "Mm. Interspinales",
  "Mm. Intertransversarii",
  "M. Psoas Major",
  "M. Psoas Minor",
  "M. Iliacus",
  "M. Iliopsoas"
];

// Normalize helper: expands abbreviations and strips punctuation/spaces
function normalizeTerm(s) {
  if (!s) return '';
  let str = s.toLowerCase();
  str = str.replace(/\bm\.\s*/g, 'musculus ');
  str = str.replace(/\bmm\.\s*/g, 'musculi ');
  str = str.replace(/\blig\.\s*/g, 'ligamentum ');
  str = str.replace(/\bligg\.\s*/g, 'ligamenta ');
  str = str.replace(/\bart\.\s*/g, 'articulatio ');
  str = str.replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  return str;
}

// Flat list of all terms currently in database
const allExistingTerms = [];
for (const [subcat, termList] of Object.entries(termsBundle)) {
  for (const t of termList) {
    allExistingTerms.push({
      ...t,
      subcat,
      norm: normalizeTerm(t.term)
    });
  }
}

console.log(`Total existing terms in DB: ${allExistingTerms.length}`);
console.log(`Total candidate terms: ${candidates.length}`);

const exactCollisions = [];
const definitelyNew = [];

candidates.forEach((cand, idx) => {
  const candNorm = normalizeTerm(cand);
  // Also clean if candidate has parenthetical like (M. Trapezius)
  const matched = allExistingTerms.filter(t => t.norm === candNorm);
  
  if (matched.length > 0) {
    exactCollisions.push({
      index: idx + 1,
      candidate: cand,
      matches: matched
    });
  } else {
    // Check if there is a partial or very close match just for reference
    const close = allExistingTerms.filter(t => {
      if (t.norm.includes(candNorm) || candNorm.includes(t.norm)) {
        // Only if length diff is small or significant
        return true;
      }
      return false;
    });
    definitelyNew.push({
      index: idx + 1,
      candidate: cand,
      close: close.map(c => ({ id: c.id, term: c.term, subcat: c.subcat }))
    });
  }
});

console.log('\n=============================================');
console.log(`=== GERÇEK ÇAKIŞMALAR (${exactCollisions.length} adet) ===`);
console.log('=============================================');
exactCollisions.forEach(c => {
  console.log(`[${c.index}] Aday: "${c.candidate}"`);
  c.matches.forEach(m => {
    console.log(`    -> Mevcut ID: ${m.id} | Term: "${m.term}" | Kategori: ${m.subcat}`);
  });
});

console.log('\n=============================================');
console.log(`=== KESİN YENİ TERİMLER (${definitelyNew.length} adet) ===`);
console.log('=============================================');
definitelyNew.forEach(c => {
  const closeNote = c.close.length > 0 ? ` (Benzer: ${c.close.map(x => `${x.id}: ${x.term}`).join(', ')})` : '';
  console.log(`${c.index}. ${c.candidate}${closeNote}`);
});
