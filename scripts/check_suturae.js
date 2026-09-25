const admin = require("firebase-admin");
const path = require("path");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../data_archive/serviceAccountKey.json");
const serviceAccount = require(SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const candidates = [
  { no: 1, term: 'Sutura frontonasalis', variants: ['sutura frontonasalis'] },
  { no: 2, term: 'Sutura frontomaxillaris', variants: ['sutura frontomaxillaris'] },
  { no: 3, term: 'Sutura frontolacrimalis', variants: ['sutura frontolacrimalis'] },
  { no: 4, term: 'Sutura frontoethmoidalis', variants: ['sutura frontoethmoidalis'] },
  { no: 5, term: 'Sutura sphenofrontalis', variants: ['sutura sphenofrontalis'] },
  { no: 6, term: 'Sutura sphenoparietalis', variants: ['sutura sphenoparietalis', 'sutura sphenparietalis'] },
  { no: 7, term: 'Sutura sphenosquamosa', variants: ['sutura sphenosquamosa'] },
  { no: 8, term: 'Sutura sphenoethmoidalis', variants: ['sutura sphenoethmoidalis'] },
  { no: 9, term: 'Sutura temporozygomatica', variants: ['sutura temporozygomatica', 'sutura zygomaticotemporalis'] },
  { no: 10, term: 'Sutura internasalis', variants: ['sutura internasalis', 'sutura internasilis', 'sutura internatalis'] },
  { no: 11, term: 'Sutura nasomaxillaris', variants: ['sutura nasomaxillaris'] },
  { no: 12, term: 'Sutura lacrimomaxillaris', variants: ['sutura lacrimomaxillaris'] },
  { no: 13, term: 'Sutura lacrimoconchalis', variants: ['sutura lacrimoconchalis'] },
  { no: 14, term: 'Sutura intermaxillaris', variants: ['sutura intermaxillaris'] },
  { no: 15, term: 'Sutura palatomaxillaris', variants: ['sutura palatomaxillaris'] },
  { no: 16, term: 'Sutura palatoethmoidalis', variants: ['sutura palatoethmoidalis'] },
  { no: 17, term: 'Sutura interpalatina', variants: ['sutura interpalatina'] },
  { no: 18, term: 'Sutura coronalis', variants: ['sutura coronalis'] },
  { no: 19, term: 'Sutura sagittalis', variants: ['sutura sagittalis'] },
  { no: 20, term: 'Sutura lambdoidea', variants: ['sutura lambdoidea'] },
  { no: 21, term: 'Sutura occipitomastoidea', variants: ['sutura occipitomastoidea'] },
  { no: 22, term: 'Sutura squamosa', variants: ['sutura squamosa'] },
  { no: 23, term: 'Sutura frontalis persistens', variants: ['sutura frontalis persistens', 'sutura metopica', 'sutura frontalis'] },
  { no: 24, term: 'Sutura parietomastoidea', variants: ['sutura parietomastoidea'] },
  { no: 25, term: 'Sutura squamomastoidea', variants: ['sutura squamomastoidea'] },
  { no: 26, term: 'Sutura frontozygomatica', variants: ['sutura frontozygomatica', 'sutura zygomaticofrontalis'] },
  { no: 27, term: 'Sutura zygomaticomaxillaris', variants: ['sutura zygomaticomaxillaris'] },
  { no: 28, term: 'Sutura ethmoidomaxillaris', variants: ['sutura ethmoidomaxillaris'] },
  { no: 29, term: 'Sutura ethmoidolacrimalis', variants: ['sutura ethmoidolacrimalis'] },
  { no: 30, term: 'Sutura sphenovomeralis', variants: ['sutura sphenovomeralis'] },
  { no: 31, term: 'Sutura sphenozygomatica', variants: ['sutura sphenozygomatica'] },
  { no: 32, term: 'Sutura sphenomaxillaris', variants: ['sutura sphenomaxillaris'] },
  { no: 33, term: 'Sutura palatina mediana', variants: ['sutura palatina mediana'] },
  { no: 34, term: 'Sutura palatina transversa', variants: ['sutura palatina transversa'] },
];

function norm(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

async function run() {
  const snapshot = await db.collection("terms").get();
  console.log("Total docs in terms:", snapshot.size);

  const allDocs = [];
  snapshot.forEach(doc => {
    allDocs.push({ docId: doc.id, ...doc.data() });
  });

  // Filter all existing documents mentioning 'sutur' anywhere
  const existingSuturae = allDocs.filter(d => 
    (d.term || "").toLowerCase().includes("sutur") ||
    (d.english || "").toLowerCase().includes("suture")
  );
  console.log(`\nExisting Suturae in Firestore (${existingSuturae.length} items):`);
  existingSuturae.forEach(d => {
    console.log(` - Doc ${d.docId} (ID: ${d.id}): "${d.term}" | "${d.english}" | subcategory: "${d.subcategory}"`);
  });

  const exactConflicts = [];
  const brandNew = [];

  for (const c of candidates) {
    let matchedDoc = null;
    let matchReason = "";

    // 1. Direct variant match
    for (const v of c.variants) {
      const vNorm = norm(v);
      for (const d of allDocs) {
        const parts = (d.term || "").split(";").map(p => norm(p.trim()));
        if (parts.includes(vNorm)) {
          matchedDoc = d;
          matchReason = `Birebir varyant eşleşmesi: "${v}" -> Firestore term: "${d.term}"`;
          break;
        }
      }
      if (matchedDoc) break;
    }

    // 2. If not found, check english or definitions mentioning sutura name
    if (!matchedDoc) {
      const cNorm = norm(c.term);
      for (const d of allDocs) {
        const dTermNorm = norm(d.term);
        if (dTermNorm === cNorm) {
          matchedDoc = d;
          matchReason = `Normalize edilmiş birebir eşleşme`;
          break;
        }
      }
    }

    if (matchedDoc) {
      exactConflicts.push({
        candidateNumber: c.no,
        candidateTerm: c.term,
        firestoreDocId: matchedDoc.docId,
        firestoreId: matchedDoc.id,
        existingTerm: matchedDoc.term,
        existingEnglish: matchedDoc.english,
        existingSubcategory: matchedDoc.subcategory,
        reason: matchReason
      });
    } else {
      brandNew.push(c);
    }
  }

  console.log("\n==========================================");
  console.log(`GERÇEK ÇAKIŞMA (${exactConflicts.length} adet):`);
  console.log("==========================================");
  exactConflicts.forEach(item => {
    console.log(`[${item.candidateNumber}] ${item.candidateTerm} => Doc: ${item.firestoreDocId} (ID: ${item.firestoreId}) | Mevcut Terim: "${item.existingTerm}" | Subcategory: "${item.existingSubcategory}"`);
  });

  console.log("\n==========================================");
  console.log(`KESİN YENİ (${brandNew.length} adet):`);
  console.log("==========================================");
  brandNew.forEach(item => {
    console.log(`[${item.no}] ${item.term}`);
  });
}

run().catch(console.error);
