const admin = require("firebase-admin");
const path = require("path");

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
  const all = [];
  snapshot.forEach(d => all.push({ docId: d.id, ...d.data() }));

  const checkWords = [
    'frontonasal', 'frontomaxillar', 'frontolacrimal', 'frontoethmoidal',
    'sphenofrontal', 'sphenoparietal', 'sphenparietal', 'sphenosquamos', 'sphenoethmoidal',
    'temporozygomat', 'zygomaticotemporal', 'internasal', 'nasomaxillar',
    'lacrimomaxillar', 'lacrimoconchal', 'intermaxillar', 'palatomaxillar',
    'palatoethmoidal', 'interpalatin', 'occipitomastoid', 'parietomastoid',
    'squamomastoid', 'frontozygomat', 'zygomaticofrontal', 'ethmoidomaxillar',
    'ethmoidolacrimal', 'sphenovomer', 'sphenozygomat', 'zygomaticosphenoid',
    'sphenomaxillar', 'palatina mediana', 'palatina transversa'
  ];

  console.log("Checking stem occurrences across all " + all.length + " docs...");
  let foundAny = false;
  for (const w of checkWords) {
    const hits = all.filter(t => 
      (t.term || '').toLowerCase().includes(w) || 
      (t.english || '').toLowerCase().includes(w)
    );
    if (hits.length > 0) {
      foundAny = true;
      console.log(`Word stem '${w}' found in:`, hits.map(h => `Doc ${h.docId}: "${h.term}" (${h.subcategory})`));
    }
  }
  if (!foundAny) {
    console.log("No other unexpected stem matches found.");
  }
}

run().catch(console.error);
