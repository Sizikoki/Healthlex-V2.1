const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../data_archive/serviceAccountKey.json");
const MEDICAL_TERMS_PATH = path.join(__dirname, "../frontend/src/data/medicalTerms.js");

function convertMToMusculus(str) {
  if (!str || typeof str !== "string") return str;
  return str.replace(/(^|[\s(])(?<![A-Za-z])[Mm]\.\s*/g, (match, p1) => (p1 || "") + "Musculus ");
}

async function run() {
  console.log("=== STEP 1: Updating frontend/src/data/medicalTerms.js ===");
  let content = fs.readFileSync(MEDICAL_TERMS_PATH, "utf8");

  // Count matches in medicalTerms.js
  let matchCount = 0;
  const updatedContent = content.replace(/"term":\s*"([^"]+)"/g, (match, termVal) => {
    const converted = convertMToMusculus(termVal);
    if (converted !== termVal) {
      matchCount++;
      return `"term": "${converted}"`;
    }
    return match;
  });

  // Also replace in def of term 905 if present
  const finalContent = updatedContent.replace(
    /\(TA2 resmi adı:\s*M\.\s*Splenius Cervicis\)/g,
    "(TA2 resmi adı: Musculus Splenius Cervicis)"
  );

  console.log(`Replaced ${matchCount} term fields in medicalTerms.js`);
  fs.writeFileSync(MEDICAL_TERMS_PATH, finalContent, "utf8");

  console.log("\n=== STEP 2: Updating JSON files in data_archive/ ===");
  const archiveFiles = [
    "bas_boyun_kaslari.json",
    "genel_kas_terimleri.json",
    "govde_kaslari.json",
    "ust_ekstremite_ve_alt_parcalar.json",
  ];

  for (const file of archiveFiles) {
    const fPath = path.join(__dirname, "../data_archive", file);
    if (fs.existsSync(fPath)) {
      const data = JSON.parse(fs.readFileSync(fPath, "utf8"));
      let changed = 0;
      data.forEach((item) => {
        if (item.term) {
          const c = convertMToMusculus(item.term);
          if (c !== item.term) {
            item.term = c;
            changed++;
          }
        }
      });
      if (changed > 0) {
        fs.writeFileSync(fPath, JSON.stringify(data, null, 2), "utf8");
        console.log(`Updated ${changed} terms in ${file}`);
      }
    }
  }

  console.log("\n=== STEP 3: Updating Firestore 'terms' collection ===");
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error("Service account key not found at:", SERVICE_ACCOUNT_PATH);
    return;
  }

  const serviceAccount = require(SERVICE_ACCOUNT_PATH);
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = admin.firestore();
  const snapshot = await db.collection("terms").get();
  console.log(`Total Firestore terms loaded: ${snapshot.size}`);

  const toUpdate = [];
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.term) {
      const converted = convertMToMusculus(data.term);
      if (converted !== data.term) {
        toUpdate.push({
          id: docSnap.id,
          oldTerm: data.term,
          newTerm: converted,
        });
      }
    }
  });

  console.log(`Found ${toUpdate.length} documents in Firestore to update from 'M.' to 'Musculus'`);

  // Batch update in chunks of 450 (Firestore limit is 500 per batch)
  const CHUNK_SIZE = 400;
  for (let i = 0; i < toUpdate.length; i += CHUNK_SIZE) {
    const chunk = toUpdate.slice(i, i + CHUNK_SIZE);
    const batch = db.batch();
    chunk.forEach((item) => {
      const ref = db.collection("terms").doc(item.id);
      batch.update(ref, {
        term: item.newTerm,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });
    await batch.commit();
    console.log(`Committed batch ${i / CHUNK_SIZE + 1} (${chunk.length} items)`);
  }

  console.log("\n=== All steps completed successfully! ===");
}

run().catch((err) => {
  console.error("Error running fix script:", err);
  process.exit(1);
});
