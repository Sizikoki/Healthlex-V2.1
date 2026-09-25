const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.resolve(__dirname, '../data_archive/serviceAccountKey.json');
const MEDICAL_TERMS_PATH = path.resolve(__dirname, '../frontend/src/data/medicalTerms.js');

const MOVES = [
  { id: 456, term: 'Sutura Frontalis Persistens', targetSubcategory: 'head_and_neck_joints' },
  { id: 720, term: 'Os Hyoideum', targetSubcategory: 'face_bones' },
  { id: 721, term: 'Corpus Ossis Hyoidei', targetSubcategory: 'face_bones' },
  { id: 722, term: 'Cornu Minus', targetSubcategory: 'face_bones' },
  { id: 723, term: 'Cornu Majus', targetSubcategory: 'face_bones' },
];

async function main() {
  const isApply = process.argv.includes('--apply');
  const isDryRun = !isApply;

  console.log('====================================================');
  console.log(`🚀 MOVE TERMS TO CORRECT CATEGORIES`);
  console.log(`MODE: ${isApply ? 'APPLY (UPDATING FIRESTORE & medicalTerms.js)' : 'DRY RUN (NO CHANGES)'}`);
  console.log('====================================================\n');

  console.log('📋 TERMS TO MOVE:');
  MOVES.forEach(m => {
    console.log(`  - ID ${m.id}: ${m.term.padEnd(30)} -> target: "${m.targetSubcategory}"`);
  });
  console.log('\nSummary:');
  console.log('  - skull_bones: 239 -> 234 (-5)');
  console.log('  - face_bones:  125 -> 129 (+4: 720, 721, 722, 723)');
  console.log('  - head_and_neck_joints: 59 -> 60 (+1: 456)');
  console.log('  - Total terms: 947 (remains unchanged)\n');

  if (isDryRun) {
    console.log('✅ DRY RUN COMPLETED SUCCESSFULLY.');
    console.log('To apply changes, run with --apply.');
    process.exit(0);
  }

  // --- APPLY PHASE ---
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    throw new Error(`Service account key not found at: ${SERVICE_ACCOUNT_PATH}`);
  }
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(require(SERVICE_ACCOUNT_PATH))
    });
  }
  const db = admin.firestore();

  // 1. Update Firestore
  console.log('⚙️ Updating Firestore documents...');
  for (const item of MOVES) {
    const snap = await db.collection('terms').where('id', '==', item.id).get();
    if (snap.empty) {
      throw new Error(`Term ID ${item.id} not found in Firestore!`);
    }
    const docRef = snap.docs[0].ref;
    await docRef.update({
      subcategory: item.targetSubcategory,
      group: admin.firestore.FieldValue.delete()
    });
    console.log(`  ✅ ID ${item.id} (${item.term}) updated in Firestore -> subcategory: "${item.targetSubcategory}"`);
  }

  // 2. Update frontend/src/data/medicalTerms.js
  console.log('\n⚙️ Updating frontend/src/data/medicalTerms.js...');
  let content = fs.readFileSync(MEDICAL_TERMS_PATH, 'utf8');

  // Helper to extract and replace array for a subcategory
  function extractArray(fileContent, subcatKey) {
    const keyPattern = `"${subcatKey}": [`;
    const startIdx = fileContent.indexOf(keyPattern);
    if (startIdx === -1) {
      throw new Error(`Array "${subcatKey}" not found in medicalTerms.js!`);
    }

    let depth = 0;
    let endIdx = -1;
    for (let i = startIdx + keyPattern.length - 1; i < fileContent.length; i++) {
      if (fileContent[i] === '[') depth++;
      else if (fileContent[i] === ']') {
        depth--;
        if (depth === 0) {
          endIdx = i;
          break;
        }
      }
    }

    if (endIdx === -1) {
      throw new Error(`Closing bracket not found for "${subcatKey}"!`);
    }

    const rawArrayStr = fileContent.substring(startIdx + keyPattern.length - 1, endIdx + 1);
    const terms = JSON.parse(rawArrayStr);
    return { startIdx, endIdx, keyPattern, terms };
  }

  function formatTerms(terms) {
    return terms.map(item => {
      const jsonStr = JSON.stringify(item, null, 4);
      return jsonStr.split('\n').map(line => '        ' + line).join('\n');
    }).join(',\n');
  }

  // 2a. Extract terms from skull_bones
  const skullInfo = extractArray(content, 'skull_bones');
  const moveIds = new Set(MOVES.map(m => m.id));

  // Find the 5 terms to move
  const termsToMove = skullInfo.terms.filter(t => moveIds.has(Number(t.id)));
  if (termsToMove.length !== 5) {
    throw new Error(`Expected to find 5 terms to move from skull_bones, found ${termsToMove.length}!`);
  }

  // Filter out moved terms from skull_bones
  const remainingSkull = skullInfo.terms.filter(t => !moveIds.has(Number(t.id)));
  if (remainingSkull.length !== 234) {
    throw new Error(`Expected 234 remaining skull_bones, got ${remainingSkull.length}`);
  }

  // 2b. Extract face_bones and add the 4 hyoid terms
  const faceInfo = extractArray(content, 'face_bones');
  const hyoidTerms = termsToMove.filter(t => Number(t.id) !== 456).map(t => {
    const updated = { ...t, subcategory: 'face_bones' };
    delete updated.group;
    return updated;
  });
  const newFaceTerms = [...faceInfo.terms, ...hyoidTerms].sort((a, b) => Number(a.id) - Number(b.id));

  // 2c. Extract head_and_neck_joints and add 456
  const jointsInfo = extractArray(content, 'head_and_neck_joints');
  const term456 = termsToMove.find(t => Number(t.id) === 456);
  const updated456 = { ...term456, subcategory: 'head_and_neck_joints' };
  delete updated456.group;
  const newJointsTerms = [...jointsInfo.terms, updated456].sort((a, b) => Number(a.id) - Number(b.id));

  // Now replace in content in order of index from highest to lowest so indices don't shift
  const replacements = [
    {
      subcat: 'skull_bones',
      ...skullInfo,
      newTerms: remainingSkull
    },
    {
      subcat: 'face_bones',
      ...faceInfo,
      newTerms: newFaceTerms
    },
    {
      subcat: 'head_and_neck_joints',
      ...jointsInfo,
      newTerms: newJointsTerms
    }
  ];

  // Re-extract fresh indices and replace carefully
  function replaceSubcat(fileContent, subcatKey, newTerms) {
    const info = extractArray(fileContent, subcatKey);
    const replacement = '[\n' + formatTerms(newTerms) + '\n    ]';
    return fileContent.slice(0, info.startIdx + info.keyPattern.length - 1) + replacement + fileContent.slice(info.endIdx + 1);
  }

  content = replaceSubcat(content, 'skull_bones', remainingSkull);
  content = replaceSubcat(content, 'face_bones', newFaceTerms);
  content = replaceSubcat(content, 'head_and_neck_joints', newJointsTerms);

  fs.writeFileSync(MEDICAL_TERMS_PATH, content, 'utf8');
  console.log(`✅ Successfully updated skull_bones, face_bones, and head_and_neck_joints in medicalTerms.js!`);

  console.log(`\n🎉 MOVES APPLIED SUCCESSFULLY!`);
  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ MOVE SCRIPT FAILED:', err);
  process.exit(1);
});
