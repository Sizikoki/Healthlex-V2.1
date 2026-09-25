const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../data_archive/serviceAccountKey.json");
const DATA_FILE_PATH = path.join(__dirname, "../data_archive/genel_kas_terimleri.json");
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
  if (items.length !== 50) {
    throw new Error(`Expected 50 items, but found ${items.length}!`);
  }

  const ids = items.map(i => i.id);
  const minId = Math.min(...ids);
  const maxId = Math.max(...ids);
  console.log(`Item ID range: ${minId} - ${maxId}`);

  if (minId !== 906 || maxId !== 955) {
    throw new Error(`Safety abort: IDs are expected to be 906-955, found ${minId}-${maxId}`);
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

  if (initialMaxId !== 905) {
    throw new Error(`Safety abort: initial max ID is ${initialMaxId}, expected 905!`);
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
      subcategory: "muscle_structures",
      englishDefinition: item.englishDefinition ? item.englishDefinition.trim() : "",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    formattedItems.push(docData);
    batch.set(docRef, docData);
    count++;
  }

  console.log(`Committing batch with ${count} items...`);
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

  // Fetch requested documents: 906, 930, 955
  const checkDocIds = ['906', '930', '955'];
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
