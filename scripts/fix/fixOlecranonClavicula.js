const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
const { syncTermsToBundle } = require('../syncTermBundle.js');

const ROOT_DIR = path.resolve(__dirname, '../..');
const SERVICE_ACCOUNT_PATH = path.join(ROOT_DIR, 'data_archive/serviceAccountKey.json');
const MEDICAL_TERMS_PATH = path.join(ROOT_DIR, 'frontend/src/data/medicalTerms.js');
const BACKUP_TERMS_PATH = path.join(ROOT_DIR, 'data_archive/backup_terms_2026-11-18_olecranon_clavicula.json');
const BACKUP_BUNDLE_PATH = path.join(ROOT_DIR, 'data_archive/backup_medicalTerms_2026-11-18_olecranon_clavicula.js');

const IS_APPLY = process.argv.includes('--apply');

function getFirestoreDb() {
  const serviceAccount = require(SERVICE_ACCOUNT_PATH);
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.firestore();
}

async function main() {
  console.log(`=== fixOlecranonClavicula.js (Mod: ${IS_APPLY ? 'APPLY / UYGULAMA' : 'DRY-RUN / KURU ÇALIŞTIRMA'}) ===\n`);

  const db = getFirestoreDb();
  const snapshot = await db.collection('terms').get();

  const backupList = [];
  const fsMap = new Map();

  snapshot.forEach(doc => {
    const data = doc.data();
    const idKey = data.id !== undefined ? Number(data.id) : Number(doc.id);
    fsMap.set(idKey, { docId: doc.id, ref: doc.ref, ...data });
    backupList.push({ _docId: doc.id, ...data });
  });

  backupList.sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));

  // 1) Yedek al
  fs.writeFileSync(BACKUP_TERMS_PATH, JSON.stringify(backupList, null, 2), 'utf8');
  fs.copyFileSync(MEDICAL_TERMS_PATH, BACKUP_BUNDLE_PATH);
  console.log(`✅ Yedekler alındı:`);
  console.log(`   - ${BACKUP_TERMS_PATH} (${backupList.length} doküman)`);
  console.log(`   - ${BACKUP_BUNDLE_PATH}\n`);

  // 2) "aksial" kelimesinin geçtiği terimleri tara
  console.log(`--- "aksial" kelimesinin geçtiği terimler ---`);
  const aksialTerms = backupList.filter(t => /aksial/i.test(JSON.stringify(t)));
  for (const t of aksialTerms) {
    console.log(`- [ID ${t.id}] ${t.term}:`);
    console.log(`  turkishDefinition: "${t.turkishDefinition}"`);
    console.log(`  turkishShort:      "${t.turkishShort}"`);
  }
  const otherAksial = aksialTerms.filter(t => Number(t.id) !== 20 && (t.term || '').toLowerCase() !== 'clavicula');
  console.log(`Clavicula dışında "aksial" geçen diğer terim sayısı: ${otherAksial.length}\n`);

  // 3) Olecranon (ID 41) ve Clavicula (ID 20) eski/yeni değerleri
  const oleDoc = fsMap.get(41) || [...fsMap.values()].find(t => (t.term || '').toLowerCase() === 'olecranon');
  const clavDoc = fsMap.get(20) || [...fsMap.values()].find(t => (t.term || '').toLowerCase() === 'clavicula');

  if (!oleDoc || !clavDoc) {
    throw new Error('Olecranon veya Clavicula Firestore içinde bulunamadı!');
  }

  const newOleRoots = 'ole (dirsek) + cran (baş) + -on';

  const oldClavDef = clavDoc.turkishDefinition || '';
  const newClavDef = oldClavDef.replace(
    'Göğüs kemerinin aksial iskelete bağlayan',
    'Göğüs kemerini aksiyel iskelete bağlayan'
  );

  const oldClavShort = clavDoc.turkishShort || '';
  const newClavShort = oldClavShort.replace(
    'Göğüs kemerinin aksial iskelete bağlayan',
    'Göğüs kemerini aksiyel iskelete bağlayan'
  );

  console.log(`--- 1. OLECRANON (ID: ${oleDoc.id}, docId: ${oleDoc.docId}) ---`);
  console.log(`  roots (ESKİ): "${oleDoc.roots}"`);
  console.log(`  roots (YENİ): "${newOleRoots}"\n`);

  console.log(`--- 2. CLAVICULA (ID: ${clavDoc.id}, docId: ${clavDoc.docId}) ---`);
  console.log(`  turkishDefinition (ESKİ): "${oldClavDef}"`);
  console.log(`  turkishDefinition (YENİ): "${newClavDef}"`);
  console.log(`  turkishShort      (ESKİ): "${oldClavShort}"`);
  console.log(`  turkishShort      (YENİ): "${newClavShort}"\n`);

  if (!IS_APPLY) {
    console.log(`[KURU ÇALIŞTIRMA TAMAMLANDI] Firestore ve medicalTerms.js'e henüz yazılmadı.`);
    return;
  }

  // 4) Uygula: Firestore güncelle
  console.log(`=== Değişiklikler Firestore'a uygulanıyor... ===`);
  const batch = db.batch();
  batch.update(oleDoc.ref, { roots: newOleRoots });
  batch.update(clavDoc.ref, {
    turkishDefinition: newClavDef,
    turkishShort: newClavShort,
  });
  await batch.commit();
  console.log(`✅ Firestore'da Olecranon (ID ${oleDoc.id}) ve Clavicula (ID ${clavDoc.id}) güncellendi.`);

  // 5) medicalTerms.js ve termCount.json senkronizasyonu
  let content = fs.readFileSync(MEDICAL_TERMS_PATH, 'utf8');

  // Update Olecranon in medicalTerms.js
  const oleBlockRegex = new RegExp(`(\\{\\r?\\n\\s*"id":\\s*${oleDoc.id},[\\s\\S]*?\\r?\\n\\s*\\})`, 'm');
  const oleMatch = content.match(oleBlockRegex);
  if (oleMatch) {
    const updatedOleBlock = oleMatch[1].replace(
      /("roots":\s*)("(?:[^"\\]|\\.)*")/,
      `$1${JSON.stringify(newOleRoots)}`
    );
    content = content.replace(oleMatch[1], updatedOleBlock);
  }

  // Update Clavicula in medicalTerms.js
  const clavBlockRegex = new RegExp(`(\\{\\r?\\n\\s*"id":\\s*${clavDoc.id},[\\s\\S]*?\\r?\\n\\s*\\})`, 'm');
  const clavMatch = content.match(clavBlockRegex);
  if (clavMatch) {
    let updatedClavBlock = clavMatch[1].replace(
      /("turkishDefinition":\s*)("(?:[^"\\]|\\.)*")/,
      `$1${JSON.stringify(newClavDef)}`
    );
    updatedClavBlock = updatedClavBlock.replace(
      /("turkishShort":\s*)("(?:[^"\\]|\\.)*")/,
      `$1${JSON.stringify(newClavShort)}`
    );
    content = content.replace(clavMatch[1], updatedClavBlock);
  }

  fs.writeFileSync(MEDICAL_TERMS_PATH, content, 'utf8');
  console.log(`✅ medicalTerms.js içinde Olecranon ve Clavicula güncellendi.`);

  // syncTermBundle.js ile senkronize et
  const updatedSnapshot = await db.collection('terms').get();
  const allDocs = [];
  updatedSnapshot.forEach(d => allDocs.push(d.data()));
  syncTermsToBundle(allDocs, updatedSnapshot.size);
  console.log(`✅ syncTermBundle.js ve termCount.json senkronizasyonu tamamlandı.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
