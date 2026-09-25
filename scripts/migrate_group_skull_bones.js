const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.resolve(__dirname, '../data_archive/serviceAccountKey.json');
const MEDICAL_TERMS_PATH = path.resolve(__dirname, '../frontend/src/data/medicalTerms.js');
const PROPOSAL_PATH = path.resolve(__dirname, '../data_archive/skull_bones_group_proposal.json');

async function main() {
  const isApply = process.argv.includes('--apply');
  const isDryRun = !isApply;

  console.log('====================================================');
  console.log(`🚀 MIGRATE GROUP - SKULL BONES (KAFATASI KEMİKLERİ)`);
  console.log(`MODE: ${isApply ? 'APPLY (WRITING TO FIRESTORE & medicalTerms.js)' : 'DRY RUN (NO CHANGES)'}`);
  console.log('====================================================\n');

  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    throw new Error(`Service account key not found at: ${SERVICE_ACCOUNT_PATH}`);
  }
  if (!fs.existsSync(PROPOSAL_PATH)) {
    throw new Error(`Proposal file not found at: ${PROPOSAL_PATH}`);
  }

  const proposalRaw = JSON.parse(fs.readFileSync(PROPOSAL_PATH, 'utf8'));

  // Define exact ID -> Group mapping according to user instructions
  // - 482 Basion, 483 Opisthion, 485 Clivus, 492 Os Interparietale -> "Os Occipitale"
  // - Other uncertain terms (467, 477, 538, 618, 661) stay in their proposed bone groups
  // - Cranium (Genel) NOT used
  // - 456 and 720-723 do NOT get a group (remain ungrouped -> Diğer Yapılar)
  const UNGROUPED_IDS = new Set([456, 720, 721, 722, 723]);
  const OCCIPITALE_OVERRIDES = new Set([482, 483, 485, 492]);

  const targetMapping = new Map();
  proposalRaw.forEach(item => {
    const id = Number(item.id);
    if (UNGROUPED_IDS.has(id)) {
      targetMapping.set(id, null); // Ungrouped
    } else if (OCCIPITALE_OVERRIDES.has(id)) {
      targetMapping.set(id, 'Os Occipitale');
    } else {
      targetMapping.set(id, item.proposedGroup);
    }
  });

  // Verify group breakdown
  const groupCounts = {
    'Os Frontale': 0,
    'Os Parietale': 0,
    'Os Occipitale': 0,
    'Os Temporale': 0,
    'Os Sphenoidale': 0,
    'Os Ethmoidale': 0,
  };
  let ungroupedCount = 0;

  targetMapping.forEach((grp, id) => {
    if (grp) {
      groupCounts[grp] = (groupCounts[grp] || 0) + 1;
    } else {
      ungroupedCount++;
    }
  });

  console.log('📊 Target Group Breakdown:');
  Object.entries(groupCounts).forEach(([g, count]) => {
    console.log(`  - ${g}: ${count}`);
  });
  console.log(`  - Ungrouped (Diğer Yapılar): ${ungroupedCount}`);
  console.log(`  - Total: ${Object.values(groupCounts).reduce((a, b) => a + b, 0) + ungroupedCount}\n`);

  // Target count checks
  const expected = {
    'Os Frontale': 30,
    'Os Parietale': 19,
    'Os Occipitale': 37,
    'Os Temporale': 76,
    'Os Sphenoidale': 54,
    'Os Ethmoidale': 18,
  };

  for (const [grp, exp] of Object.entries(expected)) {
    if (groupCounts[grp] !== exp) {
      throw new Error(`Count mismatch for group "${grp}": Expected ${exp}, got ${groupCounts[grp]}`);
    }
  }

  if (ungroupedCount !== 5) {
    throw new Error(`Expected exactly 5 ungrouped terms, got ${ungroupedCount}`);
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(require(SERVICE_ACCOUNT_PATH))
    });
  }
  const db = admin.firestore();

  const totalSnap = await db.collection('terms').get();
  console.log(`📊 Firestore Total Terms Before Migration: ${totalSnap.size}`);
  if (totalSnap.size !== 947) {
    throw new Error(`Total terms count mismatch! Expected 947, found ${totalSnap.size}`);
  }

  const skullSnap = await db.collection('terms').where('subcategory', '==', 'skull_bones').get();
  console.log(`💀 Firestore skull_bones Count: ${skullSnap.size}\n`);
  if (skullSnap.size !== 239) {
    throw new Error(`Expected 239 terms in skull_bones, found ${skullSnap.size}`);
  }

  const firestoreUpdates = [];
  skullSnap.forEach(docSnap => {
    const data = docSnap.data();
    const id = Number(data.id);
    const grp = targetMapping.get(id);

    firestoreUpdates.push({
      docRef: docSnap.ref,
      id,
      term: data.term,
      assignedGroup: grp,
    });
  });

  firestoreUpdates.sort((a, b) => a.id - b.id);

  console.log('--- [PLAN / DRY RUN LIST PREVIEW (İlk 15 ve Son 10)] ---');
  firestoreUpdates.slice(0, 15).forEach(u => {
    console.log(`${String(u.id).padEnd(4)} | ${u.term.padEnd(35)} | ${u.assignedGroup || '(Grupsuz - Diğer Yapılar)'}`);
  });
  console.log('...');
  firestoreUpdates.slice(-10).forEach(u => {
    console.log(`${String(u.id).padEnd(4)} | ${u.term.padEnd(35)} | ${u.assignedGroup || '(Grupsuz - Diğer Yapılar)'}`);
  });
  console.log('------------------------------------------------------\n');

  if (isDryRun) {
    console.log(`✅ DRY RUN COMPLETED SUCCESSFULLY.`);
    console.log(`To apply changes to Firestore and medicalTerms.js, run with --apply.`);
    process.exit(0);
  }

  // --- APPLY PHASE ---
  console.log(`⚙️ Applying updates to Firestore in batches...`);
  // Batch limit in Firestore is 500 operations, 239 fits in 1 batch
  const batch = db.batch();
  firestoreUpdates.forEach(item => {
    if (item.assignedGroup) {
      batch.update(item.docRef, { group: item.assignedGroup });
    } else {
      // For ungrouped terms, remove group if it existed or set to null
      batch.update(item.docRef, { group: admin.firestore.FieldValue.delete() });
    }
  });
  await batch.commit();
  console.log(`✅ Successfully updated ${firestoreUpdates.length} documents in Firestore!`);

  // Update frontend/src/data/medicalTerms.js
  console.log(`\n⚙️ Updating frontend/src/data/medicalTerms.js...`);
  let content = fs.readFileSync(MEDICAL_TERMS_PATH, 'utf8');

  const keyPattern = '"skull_bones": [';
  const startIdx = content.indexOf(keyPattern);
  if (startIdx === -1) {
    throw new Error('skull_bones array not found in medicalTerms.js!');
  }

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
    throw new Error('Could not find closing bracket of skull_bones in medicalTerms.js!');
  }

  const rawArrayStr = content.substring(startIdx + keyPattern.length - 1, endIdx + 1);
  const termsInFile = JSON.parse(rawArrayStr);

  if (termsInFile.length !== 239) {
    throw new Error(`Expected 239 terms in medicalTerms.js skull_bones, found ${termsInFile.length}`);
  }

  termsInFile.forEach(termObj => {
    const id = Number(termObj.id);
    const grp = targetMapping.get(id);
    if (grp) {
      termObj.group = grp;
    } else {
      delete termObj.group;
    }
  });

  function formatTerms(terms) {
    return terms.map(item => {
      const jsonStr = JSON.stringify(item, null, 4);
      return jsonStr.split('\n').map(line => '        ' + line).join('\n');
    }).join(',\n');
  }

  const formattedReplacement = '[\n' + formatTerms(termsInFile) + '\n    ]';
  content = content.slice(0, startIdx + keyPattern.length - 1) + formattedReplacement + content.slice(endIdx + 1);

  fs.writeFileSync(MEDICAL_TERMS_PATH, content, 'utf8');
  console.log(`✅ Successfully updated skull_bones in medicalTerms.js!`);

  console.log(`\n🎉 MIGRATION COMPLETED SUCCESSFULLY!`);
  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ MIGRATION FAILED:', err);
  process.exit(1);
});
