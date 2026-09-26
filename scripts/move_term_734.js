const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.resolve(__dirname, '../data_archive/serviceAccountKey.json');
const MEDICAL_TERMS_PATH = path.resolve(__dirname, '../frontend/src/data/medicalTerms.js');
const PROPOSAL_PATH = path.resolve(__dirname, '../data_archive/face_bones_group_proposal.json');
const BACKUP_PATH = path.resolve(__dirname, '../data_archive/backup_734.json');

async function main() {
  const isApply = process.argv.includes('--apply');
  const isDryRun = !isApply;

  console.log('====================================================');
  console.log(`🚀 MOVE TERM 734 (Sutura Zygomaticomaxillaris)`);
  console.log(`TARGET: "head_and_neck_joints"`);
  console.log(`MODE: ${isApply ? 'APPLY (UPDATING FIRESTORE & LOCAL FILES)' : 'DRY RUN (NO CHANGES)'}`);
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

  // 1. Pre-check in Firestore
  console.log('🔍 PRE-CHECK: Checking for duplicates in head_and_neck_joints...');
  const jointCheckSnap = await db.collection('terms')
    .where('subcategory', '==', 'head_and_neck_joints')
    .where('term', '==', 'Sutura Zygomaticomaxillaris')
    .get();

  if (!jointCheckSnap.empty) {
    console.error('❌ ABORTING: "Sutura Zygomaticomaxillaris" already exists in head_and_neck_joints in Firestore!');
    process.exit(1);
  }
  console.log('✅ Pre-check passed: No duplicate in head_and_neck_joints.\n');

  // 2. Fetch current term 734 from Firestore
  const term734Snap = await db.collection('terms').where('id', '==', 734).get();
  if (term734Snap.empty) {
    throw new Error('Term ID 734 not found in Firestore!');
  }
  const currentDoc = term734Snap.docs[0];
  const currentData = currentDoc.data();
  console.log('📄 Current Firestore Record for 734:', {
    id: currentData.id,
    term: currentData.term,
    subcategory: currentData.subcategory,
    group: currentData.group || '(none)'
  });

  // 3. Backup to data_archive/backup_734.json
  console.log(`\n💾 Backing up term 734 to: ${BACKUP_PATH}`);
  fs.writeFileSync(BACKUP_PATH, JSON.stringify(currentData, null, 2), 'utf8');
  console.log('✅ Backup saved successfully.');

  if (isDryRun) {
    console.log('\n====================================================');
    console.log('DRY RUN SUMMARY:');
    console.log('  - Term: ID 734 Sutura Zygomaticomaxillaris');
    console.log('  - From: face_bones (129 -> 128)');
    console.log('  - To:   head_and_neck_joints (60 -> 61)');
    console.log('  - Total terms: 947 (unchanged)');
    console.log('  - Proposal: face_bones_group_proposal.json (129 -> 128)');
    console.log('✅ DRY RUN COMPLETED. To apply, re-run with --apply.');
    console.log('====================================================');
    process.exit(0);
  }

  // --- APPLY PHASE ---
  // A. Update Firestore
  console.log('\n⚙️ 1. Updating Firestore document 734...');
  await currentDoc.ref.update({
    subcategory: 'head_and_neck_joints',
    group: admin.firestore.FieldValue.delete()
  });
  console.log('✅ Firestore document 734 updated: subcategory="head_and_neck_joints".');

  // B. Update frontend/src/data/medicalTerms.js
  console.log('\n⚙️ 2. Updating frontend/src/data/medicalTerms.js...');
  let content = fs.readFileSync(MEDICAL_TERMS_PATH, 'utf8');

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

  // Extract face_bones
  const faceInfo = extractArray(content, 'face_bones');
  const termObj = faceInfo.terms.find(t => Number(t.id) === 734);
  if (!termObj) {
    throw new Error('Term 734 not found in medicalTerms.js face_bones!');
  }

  // Remove 734 from face_bones
  const newFaceTerms = faceInfo.terms.filter(t => Number(t.id) !== 734);
  if (newFaceTerms.length !== 128) {
    throw new Error(`Expected 128 terms in face_bones after removal, got ${newFaceTerms.length}`);
  }

  // Update object subcategory and remove group if any
  termObj.subcategory = 'head_and_neck_joints';
  delete termObj.group;

  // Extract head_and_neck_joints
  const jointsInfo = extractArray(content, 'head_and_neck_joints');
  const newJointsTerms = [...jointsInfo.terms, termObj].sort((a, b) => Number(a.id) - Number(b.id));
  if (newJointsTerms.length !== 61) {
    throw new Error(`Expected 61 terms in head_and_neck_joints after addition, got ${newJointsTerms.length}`);
  }

  // Replace head_and_neck_joints first (later in file) then face_bones
  const firstArr = faceInfo.startIdx < jointsInfo.startIdx ? faceInfo : jointsInfo;
  const secondArr = faceInfo.startIdx < jointsInfo.startIdx ? jointsInfo : faceInfo;

  const firstNewTerms = firstArr === faceInfo ? newFaceTerms : newJointsTerms;
  const secondNewTerms = secondArr === faceInfo ? newFaceTerms : newJointsTerms;

  // Replace second array first
  const newSecondFormatted = `[\n${formatTerms(secondNewTerms)}\n    ]`;
  content = content.substring(0, secondArr.startIdx + secondArr.keyPattern.length - 1) +
            newSecondFormatted +
            content.substring(secondArr.endIdx + 1);

  // Recalculate first array
  const updatedFirstInfo = extractArray(content, firstArr === faceInfo ? 'face_bones' : 'head_and_neck_joints');
  const newFirstFormatted = `[\n${formatTerms(firstNewTerms)}\n    ]`;
  content = content.substring(0, updatedFirstInfo.startIdx + updatedFirstInfo.keyPattern.length - 1) +
            newFirstFormatted +
            content.substring(updatedFirstInfo.endIdx + 1);

  fs.writeFileSync(MEDICAL_TERMS_PATH, content, 'utf8');
  console.log('✅ medicalTerms.js updated successfully: face_bones=128, head_and_neck_joints=61.');

  // C. Update data_archive/face_bones_group_proposal.json
  console.log('\n⚙️ 3. Updating data_archive/face_bones_group_proposal.json...');
  if (fs.existsSync(PROPOSAL_PATH)) {
    const proposal = JSON.parse(fs.readFileSync(PROPOSAL_PATH, 'utf8'));
    const filteredProposal = proposal.filter(item => Number(item.id) !== 734);
    fs.writeFileSync(PROPOSAL_PATH, JSON.stringify(filteredProposal, null, 2), 'utf8');
    console.log(`✅ face_bones_group_proposal.json updated: ${proposal.length} -> ${filteredProposal.length} items.`);
  }

  console.log('\n====================================================');
  console.log('🎉 ALL UPDATES COMPLETED SUCCESSFULLY!');
  console.log('====================================================');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});
