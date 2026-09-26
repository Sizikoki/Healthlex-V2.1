const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.resolve(__dirname, '../data_archive/serviceAccountKey.json');
const MEDICAL_TERMS_PATH = path.resolve(__dirname, '../frontend/src/data/medicalTerms.js');
const PROPOSAL_PATH = path.resolve(__dirname, '../data_archive/face_bones_group_proposal.json');
const BACKUP_PATH = path.resolve(__dirname, '../data_archive/backup_face_bones.json');

async function main() {
  const isApply = process.argv.includes('--apply');
  const isDryRun = !isApply;

  console.log('====================================================');
  console.log(`🚀 MIGRATE GROUP - FACE BONES (YÜZ KEMİKLERİ)`);
  console.log(`MODE: ${isApply ? 'APPLY (WRITING TO FIRESTORE & medicalTerms.js)' : 'DRY RUN (NO CHANGES)'}`);
  console.log('====================================================\n');

  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    throw new Error(`Service account key not found at: ${SERVICE_ACCOUNT_PATH}`);
  }
  if (!fs.existsSync(PROPOSAL_PATH)) {
    throw new Error(`Proposal file not found at: ${PROPOSAL_PATH}`);
  }

  const proposal = JSON.parse(fs.readFileSync(PROPOSAL_PATH, 'utf8'));
  if (proposal.length !== 128) {
    throw new Error(`Expected exactly 128 items in proposal, found ${proposal.length}!`);
  }

  // Map of ID -> proposed group
  const groupMap = new Map();
  proposal.forEach(p => {
    groupMap.set(Number(p.id), p.proposedGroup);
  });

  // Verify group breakdown
  const expectedCounts = {
    'Maxilla': 41,
    'Mandibula': 37,
    'Os Palatinum': 19,
    'Os Zygomaticum': 11,
    'Os Nasale': 3,
    'Os Lacrimale': 4,
    'Vomer': 5,
    'Concha Nasalis Inferior': 4,
    'Os Hyoideum': 4,
  };

  const actualCounts = {};
  groupMap.forEach((grp) => {
    actualCounts[grp] = (actualCounts[grp] || 0) + 1;
  });

  console.log('📊 GROUP COUNTS BREAKDOWN:');
  console.log('----------------------------------------------------');
  let totalAssigned = 0;
  for (const [grp, expected] of Object.entries(expectedCounts)) {
    const actual = actualCounts[grp] || 0;
    const ok = actual === expected;
    console.log(`  ${ok ? '✅' : '❌'} ${grp.padEnd(25)} : ${actual} (Expected: ${expected})`);
    totalAssigned += actual;
  }
  console.log('----------------------------------------------------');
  console.log(`Total assigned: ${totalAssigned} / 128 (Ungrouped: 0)\n`);

  if (totalAssigned !== 128) {
    throw new Error(`Count mismatch: expected 128 assigned terms, got ${totalAssigned}!`);
  }

  // 1. Backup face_bones before any changes
  console.log('📦 Creating backup of current face_bones...');
  const medicalTermsContent = fs.readFileSync(MEDICAL_TERMS_PATH, 'utf8');

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

  const currentFace = extractArray(medicalTermsContent, 'face_bones');
  if (currentFace.terms.length !== 128) {
    throw new Error(`Expected 128 terms in current face_bones, found ${currentFace.terms.length}!`);
  }

  fs.writeFileSync(BACKUP_PATH, JSON.stringify(currentFace.terms, null, 2), 'utf8');
  console.log(`✅ Backup successfully saved to: ${BACKUP_PATH} (128 items).\n`);

  if (isDryRun) {
    console.log('Sample mappings (first 10 items):');
    proposal.slice(0, 10).forEach(p => {
      console.log(`  - ID ${p.id.toString().padStart(4)}: ${p.term.padEnd(35)} -> "${p.proposedGroup}"`);
    });
    console.log('...\nSample mappings (last 5 items):');
    proposal.slice(-5).forEach(p => {
      console.log(`  - ID ${p.id.toString().padStart(4)}: ${p.term.padEnd(35)} -> "${p.proposedGroup}"`);
    });

    console.log('\n====================================================');
    console.log('✅ DRY RUN COMPLETED SUCCESSFULLY.');
    console.log('To apply changes, run with --apply.');
    console.log('====================================================');
    process.exit(0);
  }

  // --- APPLY PHASE ---
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(require(SERVICE_ACCOUNT_PATH))
    });
  }
  const db = admin.firestore();

  // 1. Update Firestore
  console.log('⚙️ 1. Updating Firestore documents...');
  const batchSize = 100;
  let batch = db.batch();
  let countInBatch = 0;
  let updatedCount = 0;

  for (const item of currentFace.terms) {
    const id = Number(item.id);
    const assignedGroup = groupMap.get(id);
    if (!assignedGroup) {
      throw new Error(`Term ID ${id} (${item.term}) has no assigned group!`);
    }

    const snap = await db.collection('terms').where('id', '==', id).get();
    if (snap.empty) {
      throw new Error(`Term ID ${id} not found in Firestore!`);
    }

    const docRef = snap.docs[0].ref;
    batch.update(docRef, { group: assignedGroup });
    countInBatch++;
    updatedCount++;

    if (countInBatch >= batchSize) {
      await batch.commit();
      console.log(`  Committed batch of ${countInBatch} documents...`);
      batch = db.batch();
      countInBatch = 0;
    }
  }

  if (countInBatch > 0) {
    await batch.commit();
    console.log(`  Committed final batch of ${countInBatch} documents...`);
  }
  console.log(`✅ Firestore update completed: ${updatedCount} documents updated.\n`);

  // 2. Update frontend/src/data/medicalTerms.js
  console.log('⚙️ 2. Updating frontend/src/data/medicalTerms.js...');
  const updatedFaceTerms = currentFace.terms.map(t => {
    const id = Number(t.id);
    const assignedGroup = groupMap.get(id);
    return {
      ...t,
      group: assignedGroup
    };
  });

  function formatTerms(terms) {
    return terms.map(item => {
      const jsonStr = JSON.stringify(item, null, 4);
      return jsonStr.split('\n').map(line => '        ' + line).join('\n');
    }).join(',\n');
  }

  const newArrayFormatted = `[\n${formatTerms(updatedFaceTerms)}\n    ]`;
  const newMedicalTermsContent =
    medicalTermsContent.substring(0, currentFace.startIdx + currentFace.keyPattern.length - 1) +
    newArrayFormatted +
    medicalTermsContent.substring(currentFace.endIdx + 1);

  fs.writeFileSync(MEDICAL_TERMS_PATH, newMedicalTermsContent, 'utf8');
  console.log(`✅ frontend/src/data/medicalTerms.js updated successfully: 128 terms updated with group.\n`);

  console.log('====================================================');
  console.log('🎉 ALL MIGRATION TASKS COMPLETED SUCCESSFULLY!');
  console.log('====================================================');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});
