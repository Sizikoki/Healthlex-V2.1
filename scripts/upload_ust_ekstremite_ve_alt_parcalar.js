const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../data_archive/serviceAccountKey.json");
const DATA_FILE_PATH = path.join(__dirname, "../data_archive/ust_ekstremite_ve_alt_parcalar.json");
const COLLECTION_NAME = "terms";

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error("Service account key not found at:", SERVICE_ACCOUNT_PATH);
  process.exit(1);
}

if (!fs.existsSync(DATA_FILE_PATH)) {
  console.error("Data file not found at:", DATA_FILE_PATH);
  process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

function formatLatinTerm(str) {
  if (!str || typeof str !== 'string') return str;
  return str.trim().split(' ').map(word => {
    if (word.includes('-')) {
      return word.split('-').map(subWord => {
        return subWord.charAt(0).toLocaleUpperCase('tr-TR') + subWord.slice(1).toLocaleLowerCase('tr-TR');
      }).join('-');
    }
    return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR');
  }).join(' ');
}

function formatEnglishTerm(str) {
  if (!str || typeof str !== 'string') return str;
  const lowercaseWords = new Set(['of', 'the', 'and', 'in', 'to', 'with', 'for', 'at', 'by', 'from']);
  
  return str.trim().split(' ').map((word, index) => {
    if (word === '') return '';
    let prefix = '';
    let cleanWord = word;
    if (word.startsWith('(')) {
      prefix = '(';
      cleanWord = word.slice(1);
    }
    let suffix = '';
    if (cleanWord.endsWith(',')) {
      suffix = ',';
      cleanWord = cleanWord.slice(0, -1);
    } else if (cleanWord.endsWith(')')) {
      suffix = ')';
      cleanWord = cleanWord.slice(0, -1);
    }
    
    if (cleanWord === cleanWord.toUpperCase() && cleanWord.length >= 2) {
      return prefix + cleanWord + suffix;
    }
    
    if (lowercaseWords.has(cleanWord.toLowerCase()) && index > 0) {
      return prefix + cleanWord.toLowerCase() + suffix;
    }
    
    const capitalized = cleanWord.charAt(0).toLocaleUpperCase('tr-TR') + cleanWord.slice(1).toLocaleLowerCase('tr-TR');
    return prefix + capitalized + suffix;
  }).join(' ');
}

async function run() {
  const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf8');
  const items = JSON.parse(rawData);

  console.log(`Loaded ${items.length} items from ${DATA_FILE_PATH}`);

  // Safety checks
  if (items.length !== 61) {
    throw new Error(`Expected 61 items, but found ${items.length}!`);
  }

  const ids = items.map(i => i.id);
  const minId = Math.min(...ids);
  const maxId = Math.max(...ids);
  console.log(`Item ID range: ${minId} - ${maxId}`);

  if (minId !== 1020 || maxId !== 1080) {
    throw new Error(`Safety abort: IDs are expected to be 1020-1080, found ${minId}-${maxId}`);
  }

  // Pre-check Firestore
  const initialSnapshot = await db.collection(COLLECTION_NAME).get();
  console.log(`Initial total Firestore documents: ${initialSnapshot.size}`);

  let initialMaxId = -1;
  initialSnapshot.forEach(doc => {
    const d = doc.data();
    if (typeof d.id === 'number' && d.id > initialMaxId) initialMaxId = d.id;
  });
  console.log(`Initial max ID: ${initialMaxId}`);

  if (initialMaxId !== 1019) {
    throw new Error(`Safety abort: initial max ID is ${initialMaxId}, expected 1019!`);
  }

  // Format terms according to rules
  const formattedItems = [];
  const batch = db.batch();
  let count = 0;

  for (const item of items) {
    const docId = String(item.id);
    const docRef = db.collection(COLLECTION_NAME).doc(docId);

    const docData = {
      id: Number(item.id),
      term: formatLatinTerm(item.term),
      english: formatEnglishTerm(item.english),
      turkishDefinition: item.turkishDefinition ? item.turkishDefinition.trim() : "",
      turkishShort: item.turkishShort ? item.turkishShort.trim() : "",
      roots: item.roots ? item.roots.trim() : "",
      category: item.category ? item.category.trim() : "anatomy",
      system: item.system ? item.system.trim() : "movement",
      subcategory: item.subcategory.trim(),
      englishDefinition: item.englishDefinition ? item.englishDefinition.trim() : "",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    formattedItems.push(docData);
    batch.set(docRef, docData);
    count++;
  }

  // Also update Doc 931 (M. Supinator) in Firestore
  const doc931Ref = db.collection(COLLECTION_NAME).doc("931");
  const doc931Update = {
    subcategory: "upper_extremity_muscles",
    turkishDefinition: "Ön kolun derin arka kompartmanında bulunan, n. radialis'in ramus profundus'u tarafından delinen ve ön kola supinasyon yaptıran özel kas.",
    englishDefinition: "A muscle in the deep posterior compartment of the forearm, pierced by the deep branch of the radial nerve, that supinates the forearm.",
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };
  batch.update(doc931Ref, doc931Update);
  console.log("Appended Doc 931 (M. Supinator) update to batch...");

  console.log(`Committing batch with ${count} new items + doc 931 update...`);
  await batch.commit();
  console.log(`Successfully committed ${count} items to Firestore!`);

  // Verification
  const finalSnapshot = await db.collection(COLLECTION_NAME).get();
  console.log(`Final total Firestore documents: ${finalSnapshot.size}`);

  let finalMaxId = -1;
  finalSnapshot.forEach(doc => {
    const d = doc.data();
    if (typeof d.id === 'number' && d.id > finalMaxId) finalMaxId = d.id;
  });
  console.log(`Final max ID: ${finalMaxId}`);

  // Fetch requested documents: 1020, 1050, 1080 and 931
  const checkDocIds = ['931', '1020', '1050', '1080'];
  const fetchedDocs = {};
  for (const dId of checkDocIds) {
    const d = await db.collection(COLLECTION_NAME).doc(dId).get();
    fetchedDocs[dId] = d.exists ? d.data() : null;
  }

  console.log("\n=== FETCHED DOCUMENTS ===");
  console.log(JSON.stringify(fetchedDocs, null, 2));

  // Auto-sync frontend bundle and termCount.json
  try {
    const { syncTermsToBundle } = require("./syncTermBundle");
    syncTermsToBundle(formattedItems, finalSnapshot.size);
  } catch (err) {
    console.warn("⚠️ Bundle sync error:", err.message);
  }

  // Update doc 931 in medicalTerms.js (move from muscle_structures to upper_extremity_muscles)
  try {
    const bundlePath = path.resolve(__dirname, '../frontend/src/data/medicalTerms.js');
    let bundleContent = fs.readFileSync(bundlePath, 'utf8');

    // Parse medicalTermsData
    const termsModule = require(bundlePath).medicalTermsData;
    const muscleStructures = termsModule.muscle_structures || [];
    const upperMuscles = termsModule.upper_extremity_muscles || [];

    const item931Idx = muscleStructures.findIndex(t => t.id === 931);
    if (item931Idx !== -1) {
      const [item931] = muscleStructures.splice(item931Idx, 1);
      item931.subcategory = "upper_extremity_muscles";
      item931.turkishDefinition = doc931Update.turkishDefinition;
      item931.englishDefinition = doc931Update.englishDefinition;
      upperMuscles.push(item931);

      // Reformat muscle_structures and upper_extremity_muscles in content
      function formatTerms(terms) {
        return terms.map(item => {
          const jsonStr = JSON.stringify(item, null, 4);
          return jsonStr.split('\n').map(line => '        ' + line).join('\n');
        }).join(',\n');
      }

      function replaceArray(key, newItems) {
        const startIdx = bundleContent.indexOf(`"${key}": [`);
        if (startIdx === -1) return;
        let depth = 0;
        let endIdx = -1;
        for (let i = startIdx + `"${key}": [`.length - 1; i < bundleContent.length; i++) {
          if (bundleContent[i] === '[') depth++;
          else if (bundleContent[i] === ']') {
            depth--;
            if (depth === 0) {
              endIdx = i;
              break;
            }
          }
        }
        if (endIdx !== -1) {
          const formatted = '\n' + formatTerms(newItems) + '\n    ';
          bundleContent = bundleContent.slice(0, startIdx + `"${key}": [`.length) + formatted + bundleContent.slice(endIdx);
        }
      }

      replaceArray('muscle_structures', muscleStructures);
      replaceArray('upper_extremity_muscles', upperMuscles);
      fs.writeFileSync(bundlePath, bundleContent, 'utf8');
      console.log("✅ Moved and updated Doc 931 in medicalTerms.js (now in upper_extremity_muscles).");
    } else {
      console.log("ℹ️ Doc 931 not found in muscle_structures, checking upper_extremity_muscles...");
    }
  } catch (err) {
    console.warn("⚠️ medicalTerms.js doc 931 update error:", err.message);
  }

  // Also update termCountService.js fallback
  try {
    const termCountServicePath = path.resolve(__dirname, '../frontend/src/services/termCountService.js');
    if (fs.existsSync(termCountServicePath)) {
      let content = fs.readFileSync(termCountServicePath, 'utf8');
      content = content.replace(/: \d+;/, `: ${finalSnapshot.size};`);
      fs.writeFileSync(termCountServicePath, content, 'utf8');
      console.log(`⚡ [termCountService] Updated baseline fallback to ${finalSnapshot.size}`);
    }
  } catch (err) {
    console.warn("⚠️ termCountService fallback update error:", err.message);
  }
}

run().catch(err => {
  console.error("Error during upload:", err);
  process.exit(1);
});
