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

async function run() {
  const snapshot = await db.collection("terms").get();
  const allDocs = [];
  snapshot.forEach(doc => {
    allDocs.push({ docId: doc.id, ...doc.data() });
  });

  const roots = [
    'sphenomandibul', 'stylomandibul', 'pterygospinal', 'stylohyoid',
    'gomphosis', 'dentoalveolar', 'periodont', 'desmodont', 'cementum',
    'synchondrosis', 'atlantooccipit'
  ];

  for (const r of roots) {
    const hits = allDocs.filter(d => 
      (d.term || "").toLowerCase().includes(r) ||
      (d.english || "").toLowerCase().includes(r)
    );
    console.log(`Root '${r}': ${hits.length} hit(s)`);
    hits.forEach(h => {
      console.log(`  -> Doc ${h.docId} (ID: ${h.id}): "${h.term}" | "${h.english}" | Subcategory: "${h.subcategory}"`);
    });
  }
}

run().catch(console.error);
