const fs = require('fs');
const path = require('path');

const termsBundle = require('../frontend/src/data/medicalTerms.js').medicalTermsData;

const candidates = [
  // 1. Çekirdek (54)
  "M. Deltoideus",
  "M. Supraspinatus",
  "M. Infraspinatus",
  "M. Teres Minor",
  "M. Teres Major",
  "M. Subscapularis",
  "M. Biceps Brachii",
  "Caput Longum (M. Biceps Brachii)",
  "Caput Breve (M. Biceps Brachii)",
  "Aponeurosis Musculi Bicipitis Brachii",
  "M. Coracobrachialis",
  "M. Brachialis",
  "M. Triceps Brachii",
  "Caput Laterale (M. Triceps Brachii)",
  "Caput Mediale (M. Triceps Brachii)",
  "M. Anconeus",
  "M. Pronator Teres",
  "M. Flexor Carpi Radialis",
  "M. Palmaris Longus",
  "M. Flexor Carpi Ulnaris",
  "M. Flexor Digitorum Superficialis",
  "M. Flexor Digitorum Profundus",
  "M. Flexor Pollicis Longus",
  "M. Pronator Quadratus",
  "M. Brachioradialis",
  "M. Extensor Carpi Radialis Longus",
  "M. Extensor Carpi Radialis Brevis",
  "M. Extensor Digitorum",
  "M. Extensor Digiti Minimi",
  "M. Extensor Carpi Ulnaris",
  "M. Supinator",
  "M. Abductor Pollicis Longus",
  "M. Extensor Pollicis Brevis",
  "M. Extensor Pollicis Longus",
  "M. Extensor Indicis",
  "M. Palmaris Brevis",
  "M. Abductor Pollicis Brevis",
  "M. Flexor Pollicis Brevis",
  "M. Opponens Pollicis",
  "M. Adductor Pollicis",
  "M. Abductor Digiti Minimi Manus",
  "M. Flexor Digiti Minimi Brevis Manus",
  "M. Opponens Digiti Minimi Manus",
  "Mm. Lumbricales Manus",
  "Mm. Interossei Dorsales (Manus)",
  "Mm. Interossei Palmares",
  "Fascia Axillaris",
  "Fascia Brachii",
  "Septum Intermusculare Brachii Mediale",
  "Septum Intermusculare Brachii Laterale",
  "Fascia Antebrachii",
  "Retinaculum Musculorum Extensorum",
  "Retinaculum Musculorum Flexorum",
  "Aponeurosis Palmaris",

  // 2. Alt Parça Nüansları (4)
  "Venter Anterior (M. Digastricus)",
  "Venter Posterior (M. Digastricus)",
  "Venter Superior (M. Omohyoideus)",
  "Venter Inferior (M. Omohyoideus)",

  // 3. Erector Spinae Bölgesel Alt Türleri (15)
  "M. Iliocostalis Lumborum",
  "M. Iliocostalis Thoracis",
  "M. Iliocostalis Cervicis",
  "M. Longissimus Thoracis",
  "M. Longissimus Cervicis",
  "M. Longissimus Capitis",
  "M. Spinalis Thoracis",
  "M. Spinalis Cervicis",
  "M. Spinalis Capitis",
  "M. Semispinalis Thoracis",
  "M. Semispinalis Cervicis",
  "Mm. Multifidi Lumborum",
  "Mm. Rotatores Cervicis",
  "Mm. Interspinales Cervicis",
  "Mm. Intertransversarii Lumborum"
];

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
console.log(`Total candidate terms to check: ${candidates.length}`);

const exactCollisions = [];
const definitelyNew = [];

candidates.forEach((cand, idx) => {
  const candNorm = normalizeTerm(cand);
  const matched = allExistingTerms.filter(t => t.norm === candNorm);
  
  if (matched.length > 0) {
    exactCollisions.push({
      index: idx + 1,
      candidate: cand,
      matches: matched
    });
  } else {
    definitelyNew.push({
      index: idx + 1,
      candidate: cand
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
  console.log(`${c.index}. ${c.candidate}`);
});
