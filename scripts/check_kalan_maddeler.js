const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../data_archive/serviceAccountKey.json");
const serviceAccount = require(SERVICE_ACCOUNT_PATH);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const candidates = [
  { no: 1, term: "Lig. pterygospinale", variants: ["ligamentum pterygospinale", "lig pterygospinale"] },
  { no: 2, term: "Lig. stylohyoideum", variants: ["ligamentum stylohyoideum", "lig stylohyoideum"] },
  { no: 3, term: "Syndesmosis dentoalveolaris", variants: ["syndesmosis dentoalveolaris", "gomphosis"] },
  { no: 4, term: "Periodontium", variants: ["periodontium"] },
  { no: 5, term: "Periodontium protectionis", variants: ["periodontium protectionis", "gingiva"] },
  { no: 6, term: "Periodontium insertionis", variants: ["periodontium insertionis"] },
  { no: 7, term: "Desmodontium", variants: ["desmodontium", "periodontal ligament", "ligamentum periodontale"] },
  { no: 8, term: "Cementum", variants: ["cementum"] },
  { no: 9, term: "Synchondrosis sphenooccipitalis", variants: ["synchondrosis sphenooccipitalis", "synchondrosis spheno-occipitalis"] },
  { no: 10, term: "Synchondrosis sphenopetrosa", variants: ["synchondrosis sphenopetrosa", "synchondrosis spheno-petrosa"] },
  { no: 11, term: "Synchondrosis petrooccipitalis", variants: ["synchondrosis petrooccipitalis", "synchondrosis petro-occipitalis"] },
  { no: 12, term: "Synchondrosis sphenoethmoidalis", variants: ["synchondrosis sphenoethmoidalis", "synchondrosis spheno-ethmoidalis"] },
  { no: 13, term: "Articulatio temporomandibularis", variants: ["articulatio temporomandibularis", "tmj"] },
  { no: 14, term: "Discus articularis (TMJ)", variants: ["discus articularis", "discus articularis articulationis temporomandibularis"] },
  { no: 15, term: "Lig. laterale (TMJ)", variants: ["ligamentum laterale", "lig laterale", "ligamentum temporomandibulare"] },
  { no: 16, term: "Lig. mediale (TMJ)", variants: ["ligamentum mediale", "lig mediale"] },
  { no: 17, term: "Lig. sphenomandibulare", variants: ["ligamentum sphenomandibulare", "lig sphenomandibulare"] },
  { no: 18, term: "Lig. stylomandibulare", variants: ["ligamentum stylomandibulare", "lig stylomandibulare"] },
  { no: 19, term: "Articulatio atlantooccipitalis", variants: ["articulatio atlantooccipitalis", "articulatio atlanto-occipitalis"] },
  { no: 20, term: "Membrana atlantooccipitalis anterior", variants: ["membrana atlantooccipitalis anterior", "membrana atlanto-occipitalis anterior"] },
  { no: 21, term: "Membrana atlantooccipitalis posterior", variants: ["membrana atlantooccipitalis posterior", "membrana atlanto-occipitalis posterior"] },
  { no: 22, term: "Lig. atlantooccipitale laterale", variants: ["ligamentum atlantooccipitale laterale", "ligamentum atlanto-occipitale laterale", "lig atlantooccipitale laterale"] }
];

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/lig\./g, "ligamentum")
    .replace(/art\./g, "articulatio")
    .replace(/[^a-z0-9]/g, "");
}

async function check() {
  const snapshot = await db.collection("terms").get();
  console.log("Total docs in Firestore:", snapshot.size);

  const allDocs = [];
  snapshot.forEach(doc => {
    allDocs.push({ docId: doc.id, ...doc.data() });
  });

  const conflicts = [];
  const brandNew = [];

  for (const c of candidates) {
    let matchedDoc = null;
    let matchReason = "";

    // Check each candidate variant
    for (const v of c.variants) {
      const vNorm = norm(v);
      for (const d of allDocs) {
        // 1. Check term (split by semicolon)
        const parts = (d.term || "").split(";").map(p => norm(p.trim()));
        if (parts.some(p => p === vNorm)) {
          matchedDoc = d;
          matchReason = `Birebir terim eşleşmesi: "${v}" -> Firestore term: "${d.term}"`;
          break;
        }

        // 2. Check english
        const engParts = (d.english || "").split(";").map(p => norm(p.trim()));
        if (engParts.some(p => p === vNorm)) {
          matchedDoc = d;
          matchReason = `İngilizce alanında eşleşme: "${v}" -> Firestore english: "${d.english}"`;
          break;
        }
      }
      if (matchedDoc) break;
    }

    // Also check normalized term comparison
    if (!matchedDoc) {
      const cNorm = norm(c.term);
      for (const d of allDocs) {
        const dNorm = norm(d.term);
        if (dNorm === cNorm) {
          matchedDoc = d;
          matchReason = `Normalize tam eşleşme: "${c.term}" -> "${d.term}"`;
          break;
        }
      }
    }

    if (matchedDoc) {
      conflicts.push({
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
  console.log(`GERÇEK ÇAKIŞMA (${conflicts.length} adet):`);
  console.log("==========================================");
  conflicts.forEach(c => {
    console.log(`[${c.candidateNumber}] ${c.candidateTerm} => Doc: ${c.firestoreDocId} (ID: ${c.firestoreId}) | Mevcut Terim: "${c.existingTerm}" | Subcategory: "${c.existingSubcategory}" | (${c.reason})`);
  });

  console.log("\n==========================================");
  console.log(`KESİN YENİ (${brandNew.length} adet):`);
  console.log("==========================================");
  brandNew.forEach(b => {
    console.log(`[${b.no}] ${b.term}`);
  });

  // Save report to data_archive
  const report = {
    toplamAday: candidates.length,
    gercekCakismaCount: conflicts.length,
    kesinYeniCount: brandNew.length,
    gercekCakisma: conflicts,
    kesinYeni: brandNew
  };

  const reportPath = path.join(__dirname, "../data_archive/kontrol_2_2_kalan_maddeler.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
  console.log(`\nRapor kaydedildi: ${reportPath}`);
}

check().catch(console.error);
