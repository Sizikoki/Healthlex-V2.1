const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.resolve(__dirname, '../data_archive/serviceAccountKey.json');
const MEDICAL_TERMS_PATH = path.resolve(__dirname, '../frontend/src/data/medicalTerms.js');

const UPPER_EXTREMITY_GROUPS = [
  { name: 'Scapula', ids: [19, 59, 60, 91, 93, 94, 95, 96, 97, 98] }, // 92 skipped explicitly
  { name: 'Clavicula', ids: [20, 83, 84, 85, 86, 87, 88, 89, 90] },
  { name: 'Humerus', ids: [21, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82] },
  { name: 'Radius', ids: [22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
  { name: 'Ulna', ids: [23, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53] },
  { name: 'Ossa Manus', ids: [24, 25, 26, 54, 55, 56, 57, 58] }
];

// Map of termId -> groupName
const idToGroup = new Map();
UPPER_EXTREMITY_GROUPS.forEach(g => {
  g.ids.forEach(id => {
    idToGroup.set(Number(id), g.name);
  });
});

async function main() {
  const isApply = process.argv.includes('--apply');
  const isDryRun = !isApply;

  console.log('====================================================');
  console.log(`🚀 MIGRATE GROUP - UPPER EXTREMITY BONES`);
  console.log(`MODE: ${isApply ? 'APPLY (WRITING TO FIRESTORE & medicalTerms.js)' : 'DRY RUN (NO CHANGES)'}`);
  console.log('====================================================\n');

  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    throw new Error(`Service account key not found at: ${SERVICE_ACCOUNT_PATH}`);
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(require(SERVICE_ACCOUNT_PATH))
    });
  }

  const db = admin.firestore();

  // 1. Check current Firestore count & load terms
  const totalSnap = await db.collection('terms').get();
  console.log(`📊 Firestore Total Terms Before Migration: ${totalSnap.size}`);

  const boneSnap = await db.collection('terms').where('subcategory', '==', 'upper_extremity_bones').get();
  console.log(`🦴 Firestore upper_extremity_bones Count: ${boneSnap.size}\n`);

  if (boneSnap.size !== 79) {
    throw new Error(`Expected exactly 79 terms in upper_extremity_bones, but found ${boneSnap.size}! Aborting.`);
  }

  const termsToUpdate = [];
  const groupCounts = {};
  UPPER_EXTREMITY_GROUPS.forEach(g => { groupCounts[g.name] = 0; });

  boneSnap.forEach(docSnap => {
    const data = docSnap.data();
    const id = Number(data.id);

    if (id === 92) {
      console.warn(`⚠️ ID 92 encountered in upper_extremity_bones query. Skipping per instruction!`);
      return;
    }

    const assignedGroup = idToGroup.get(id);
    if (!assignedGroup) {
      throw new Error(`Term ID ${id} (${data.term}) does not have an assigned group in UPPER_EXTREMITY_GROUPS!`);
    }

    groupCounts[assignedGroup] = (groupCounts[assignedGroup] || 0) + 1;
    termsToUpdate.push({
      docId: docSnap.id,
      id,
      term: data.term,
      currentGroup: data.group || null,
      assignedGroup,
      docRef: docSnap.ref
    });
  });

  // Sort by ID
  termsToUpdate.sort((a, b) => a.id - b.id);

  console.log(`📋 Terms to update count: ${termsToUpdate.length}`);
  console.log(`\nGroup breakdown:`);
  Object.entries(groupCounts).forEach(([grp, count]) => {
    console.log(`  - ${grp}: ${count}`);
  });

  console.log(`\n--- [PLAN / DRY RUN LIST] ---`);
  console.log(`ID\t| Terim Adı\t\t\t\t| Atanacak Grup`);
  console.log(`--------------------------------------------------------------------------------`);
  termsToUpdate.forEach(t => {
    const padId = String(t.id).padEnd(4, ' ');
    const padTerm = t.term.padEnd(36, ' ');
    console.log(`${padId}\t| ${padTerm}\t| ${t.assignedGroup}`);
  });
  console.log(`--------------------------------------------------------------------------------\n`);

  // Target count validations
  const expectedCounts = {
    'Scapula': 10,
    'Clavicula': 9,
    'Humerus': 23,
    'Radius': 15,
    'Ulna': 14,
    'Ossa Manus': 8
  };

  for (const [grp, expected] of Object.entries(expectedCounts)) {
    if (groupCounts[grp] !== expected) {
      throw new Error(`Count mismatch for group "${grp}": Expected ${expected}, got ${groupCounts[grp]}!`);
    }
  }

  if (termsToUpdate.length !== 79) {
    throw new Error(`Expected 79 terms to update, got ${termsToUpdate.length}!`);
  }

  if (isDryRun) {
    console.log(`✅ DRY RUN COMPLETED SUCCESSFULLY.`);
    console.log(`To apply changes to Firestore and medicalTerms.js, run with --apply.`);
    process.exit(0);
  }

  // --- APPLY PHASE ---
  console.log(`\n⚙️ Applying updates to Firestore...`);
  const batchSize = 100; // max batch is 500
  let batch = db.batch();
  termsToUpdate.forEach(item => {
    batch.update(item.docRef, { group: item.assignedGroup });
  });
  await batch.commit();
  console.log(`✅ Successfully updated ${termsToUpdate.length} documents in Firestore!`);

  // 2. Update medicalTerms.js
  console.log(`\n⚙️ Updating frontend/src/data/medicalTerms.js...`);
  let content = fs.readFileSync(MEDICAL_TERMS_PATH, 'utf8');

  // Locate the upper_extremity_bones array in medicalTerms.js
  const keyPattern = '"upper_extremity_bones": [';
  const startIdx = content.indexOf(keyPattern);
  if (startIdx === -1) {
    throw new Error('upper_extremity_bones array not found in medicalTerms.js!');
  }

  // Find closing bracket
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx + keyPattern.length - 1; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }

  if (endIdx === -1) {
    throw new Error('Could not find closing bracket of upper_extremity_bones in medicalTerms.js!');
  }

  // Extract raw JSON of upper_extremity_bones array
  const rawArrayStr = content.substring(startIdx + keyPattern.length - 1, endIdx + 1);
  const termsInFile = JSON.parse(rawArrayStr);

  if (termsInFile.length !== 79) {
    throw new Error(`Expected 79 terms in medicalTerms.js upper_extremity_bones, found ${termsInFile.length}!`);
  }

  // Add group property to each term
  termsInFile.forEach(termObj => {
    const id = Number(termObj.id);
    const grp = idToGroup.get(id);
    if (!grp) {
      throw new Error(`ID ${id} in medicalTerms.js has no assigned group!`);
    }
    termObj.group = grp;
  });

  // Format array terms with 8-space indentation
  function formatTerms(terms) {
    return terms.map(item => {
      const jsonStr = JSON.stringify(item, null, 4);
      return jsonStr.split('\n').map(line => '        ' + line).join('\n');
    }).join(',\n');
  }

  const formattedReplacement = '[\n' + formatTerms(termsInFile) + '\n    ]';
  content = content.slice(0, startIdx + keyPattern.length - 1) + formattedReplacement + content.slice(endIdx + 1);

  fs.writeFileSync(MEDICAL_TERMS_PATH, content, 'utf8');
  console.log(`✅ Successfully updated upper_extremity_bones in medicalTerms.js!`);

  console.log(`\n🎉 MIGRATION COMPLETED SUCCESSFULLY!`);
  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ MIGRATION FAILED:', err);
  process.exit(1);
});
