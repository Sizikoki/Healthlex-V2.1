// ============================================================
//  HealthLexMed — Firebase Seed Script (upload.js)
//  Kullanım: node upload.js
//  Gereksinim: npm install firebase-admin
// ============================================================

const admin = require("firebase-admin");
const fs = require("fs"); 
const path = require("path");

// ─── 1. AYARLAR ──────────────────────────────────────────────
const SERVICE_ACCOUNT_PATH = "./serviceAccountKey.json";
const COLLECTION_NAME = "terms";
const JSON_FILES = [
  "./yon_terimleri.json",
  "./hareketler.json",
  "./Eklem_Ust_Extremite.json",
  "./Alt_Ekstremite_Eklemleri.json",
  "./Omurga_Eklemleri.json",
  "./Kafa_ve_Boyun_Eklemleri.json",
];

// Kelimeler Firestore'da zaten varsa eskisini silip üzerine yazsın (true) yaptık.
// Böylece eski hatalı yüklediğin küçük harfli kategoriler tamamen temizlenir.
const OVERWRITE_EXISTING = true;
// ─────────────────────────────────────────────────────────────

// ─── 2. ZORUNLU ALANLAR (Frontend Şeması ile Uyumlu) ─────────
// Frontend'in (Study.jsx) beklediği tüm kritik alanları buraya ekledik
const REQUIRED_FIELDS = ["id", "term", "english", "turkishDefinition", "roots", "category", "system", "subcategory"];
// ─────────────────────────────────────────────────────────────

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error(`\n❌ Hata: "${SERVICE_ACCOUNT_PATH}" bulunamadı.`);
  process.exit(1);
}

const serviceAccount = require(path.resolve(SERVICE_ACCOUNT_PATH));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ─── 3. OTOMATİK FORMATLAMA YARDIMCILARI ──────────────────────
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

// ─── 4. DOĞRULAMA (YENİ ŞEMAYA GÖRE DÜZENLENDİ) ──────────────
function validateTerm(item, index, fileName) {
  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    if (!(field in item)) {
      errors.push(`"${field}" alanı eksik`);
    }
  }

  if (item.id && typeof item.id !== "number") {
    errors.push('"id" numara (number) olmalı');
  }
  if (item.term && typeof item.term !== "string") {
    errors.push('"term" string olmalı');
  }
  if (item.english && typeof item.english !== "string") {
    errors.push('"english" string olmalı');
  }
  if (item.turkishDefinition && typeof item.turkishDefinition !== "string") {
    errors.push('"turkishDefinition" string olmalı');
  }
  // BURASI DÜZELTİLDİ: Artık Array değil String bekliyor!
  if (item.roots && typeof item.roots !== "string") {
    errors.push('"roots" düz metin (string) olmalı');
  }

  if (errors.length > 0) {
    console.warn(
      `⚠️  [${fileName}] ${index + 1}. terim (${item.term || "?"}): ${errors.join(", ")}`
    );
    return false;
  }
  return true;
}

function loadTermsFromFile(filePath) {
  const fileName = path.basename(filePath);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Dosya bulunamadı: ${filePath}`);
    return [];
  }
  let raw = fs.readFileSync(filePath, "utf8");
  let terms = JSON.parse(raw);
  console.log(`📂 ${fileName} → ${terms.length} terim okundu`);
  return terms;
}

// ─── 5. ANA YÜKLEME FONKSİYONU ───────────────────────────────
async function uploadTerms() {
  console.log("\n🚀 HealthLexMed Seed Script başlatılıyor...");
  console.log(`   Koleksiyon : ${COLLECTION_NAME}`);
  console.log(`   Üzerine yaz: ${OVERWRITE_EXISTING ? "Evet" : "Hayır"}\n`);

  let totalLoaded = 0;
  let totalUploaded = 0;
  let totalSkipped = 0;
  let totalInvalid = 0;

  for (const filePath of JSON_FILES) {
    const fileName = path.basename(filePath);
    const terms = loadTermsFromFile(filePath);

    if (terms.length === 0) continue;
    totalLoaded += terms.length;

    const BATCH_SIZE = 400;

    for (let batchStart = 0; batchStart < terms.length; batchStart += BATCH_SIZE) {
      const batchItems = terms.slice(batchStart, batchStart + BATCH_SIZE);
      const batch = db.batch();
      let batchCount = 0;

      for (let i = 0; i < batchItems.length; i++) {
        const item = batchItems[i];
        const globalIndex = batchStart + i;

        if (!validateTerm(item, globalIndex, fileName)) {
          totalInvalid++;
          continue;
        }

        const docId = item.term.toLowerCase().replace(/\s+/g, "_");
        const docRef = db.collection(COLLECTION_NAME).doc(docId);

        if (!OVERWRITE_EXISTING) {
          const existing = await docRef.get();
          if (existing.exists) {
            console.log(`    ⏭️  Atlandı (zaten var): ${item.term}`);
            totalSkipped++;
            continue;
          }
        }

        // BURASI DÜZELTİLDİ: Tamamen frontend şemasına (A Şeması) uygun şekilde kaydediyor
        const firestoreDoc = {
          id: Number(item.id),
          term: formatLatinTerm(item.term),
          english: formatEnglishTerm(item.english),
          turkishDefinition: item.turkishDefinition.trim(),
          roots: item.roots.trim(),
          category: item.category.trim(),
          system: item.system.trim(),
          subcategory: item.subcategory.trim(),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        batch.set(docRef, firestoreDoc, { merge: OVERWRITE_EXISTING });
        batchCount++;
      }

      if (batchCount > 0) {
        await batch.commit();
        totalUploaded += batchCount;
        console.log(`    ✅ Batch yüklendi: ${batchCount} terim`);
      }
    }
  }

  console.log("\n" + "─".repeat(45));
  console.log("📊 YÜKLEME ÖZETI");
  console.log("─".repeat(45));
  console.log(`   Okunan toplam terim  : ${totalLoaded}`);
  console.log(`   Başarıyla yüklenen   : ${totalUploaded}`);
  console.log(`   Atlanan (zaten var)  : ${totalSkipped}`);
  console.log(`   Geçersiz (şema hatası): ${totalInvalid}`);
  console.log("─".repeat(45));
}

uploadTerms()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\n❌ Beklenmeyen hata:", err.message);
    process.exit(1);
  });