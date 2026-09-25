const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../data_archive/serviceAccountKey.json");
const serviceAccount = require(SERVICE_ACCOUNT_PATH);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const MIGRATED_IDS = [
  322, 323, 324, 325, 326, 327, 328, 329, 330, 331,
  332, 333, 334, 335, 336, 337, 338, 339, 340
];

async function migrate() {
  console.log(`Starting migration of ${MIGRATED_IDS.length} muscles to "upper_extremity_muscles"...`);

  // 1. Update Firestore documents
  const batch = db.batch();
  for (const id of MIGRATED_IDS) {
    const docRef = db.collection("terms").doc(String(id));
    batch.update(docRef, {
      subcategory: "upper_extremity_muscles",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  await batch.commit();
  console.log(`✅ Firestore batch update completed for ${MIGRATED_IDS.length} documents.`);

  // Verify in Firestore
  const verifyDoc = await db.collection("terms").doc("322").get();
  console.log(`Verification Doc 322 subcategory in Firestore: "${verifyDoc.data().subcategory}"`);

  // 2. Update medicalTerms.js
  const bundlePath = path.resolve(__dirname, "../frontend/src/data/medicalTerms.js");
  let content = fs.readFileSync(bundlePath, "utf8");

  // Load current bundle data
  const termsModule = require(bundlePath).medicalTermsData;
  const currentMuscles = termsModule.muscle_structures || [];
  
  const toMove = currentMuscles.filter(t => MIGRATED_IDS.includes(t.id));
  const toKeep = currentMuscles.filter(t => !MIGRATED_IDS.includes(t.id));

  console.log(`In medicalTerms.js: to move: ${toMove.length}, to keep: ${toKeep.length}`);

  if (toMove.length !== 19 || toKeep.length !== 50) {
    throw new Error(`Unexpected counts: toMove=${toMove.length}, toKeep=${toKeep.length}`);
  }

  // Update subcategory field for each item in toMove
  toMove.forEach(t => {
    t.subcategory = "upper_extremity_muscles";
  });

  // Re-write medicalTerms.js using pure JS manipulation or regex
  // Let's format terms helper
  function formatTerms(terms) {
    return terms.map(item => {
      const jsonStr = JSON.stringify(item, null, 4);
      return jsonStr.split('\n').map(line => '        ' + line).join('\n');
    }).join(',\n');
  }

  // Find "muscle_structures": [ ... ]
  const muscleKey = '"muscle_structures": [';
  const startIdx = content.indexOf(muscleKey);
  if (startIdx === -1) throw new Error('"muscle_structures": [ not found');

  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx + muscleKey.length - 1; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }

  if (endIdx === -1) throw new Error('Closing bracket for muscle_structures not found');

  const newMuscleStructuresArray = '\n' + formatTerms(toKeep) + '\n    ';
  content = content.slice(0, startIdx + muscleKey.length) + newMuscleStructuresArray + content.slice(endIdx);

  // Check if "upper_extremity_muscles": [ already exists or add it
  const upperKey = '"upper_extremity_muscles": [';
  if (content.includes(upperKey)) {
    console.log('"upper_extremity_muscles" array already exists in bundle.');
  } else {
    // Insert "upper_extremity_muscles" right after "muscle_structures": [ ... ],
    const objEndPattern = '};\n\n// Get all terms';
    const objEndIdx = content.indexOf(objEndPattern);
    const insertBlock = `,\n    "upper_extremity_muscles": [\n${formatTerms(toMove)}\n    ]`;
    content = content.slice(0, objEndIdx) + insertBlock + content.slice(objEndIdx);
  }

  // Add to subcategoriesBySystem.movement if not present
  if (!content.includes("'upper_extremity_muscles'")) {
    const targetAnchor = "{ id: 'head_and_neck_muscles', name: 'Baş ve Boyun Kasları' },";
    const replacement = targetAnchor + "\n    { id: 'upper_extremity_muscles', name: 'Üst Ekstremite Kasları' },";
    content = content.replace(targetAnchor, replacement);
  }

  fs.writeFileSync(bundlePath, content, "utf8");
  console.log(`✅ Updated medicalTerms.js: muscle_structures now has ${toKeep.length} terms, upper_extremity_muscles has ${toMove.length} terms.`);
}

migrate().catch(err => {
  console.error("Migration error:", err);
  process.exit(1);
});
