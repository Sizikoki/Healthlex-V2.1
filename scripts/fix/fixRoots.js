const fs = require('fs');
const path = require('path');
const Module = require('module');
const { pathToFileURL } = require('url');
const admin = require('firebase-admin');

const ROOT_DIR = path.resolve(__dirname, '../..');

// Node Module.registerHooks ile "@/..." alias'larını doğrudan frontend/src altına yönlendir
Module.registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      let target = path.resolve(ROOT_DIR, 'frontend/src', specifier.slice(2));
      if (!fs.existsSync(target) && fs.existsSync(target + '.js')) {
        target += '.js';
      } else if (!fs.existsSync(target) && fs.existsSync(target + '.jsx')) {
        target += '.jsx';
      }
      return nextResolve(pathToFileURL(target).href, context);
    }
    return nextResolve(specifier, context);
  }
});

const { getAllTerms } = require(path.join(ROOT_DIR, 'frontend/src/data/medicalTerms.js'));
const { getTermSlug, parseRootsToMorphemes } = require(path.join(ROOT_DIR, 'frontend/src/utils/termHelper.js'));
const { getAllMorphemes } = require(path.join(ROOT_DIR, 'frontend/src/utils/morphemeHelper.js'));
const {
  PREFIXES,
  ROOTS,
  SUFFIXES,
  PREFIX_LOOKUP,
  ROOT_LOOKUP,
  SUFFIX_LOOKUP,
} = require(path.join(ROOT_DIR, 'frontend/src/data/morphemesData.js'));
const { syncTermsToBundle } = require(path.join(ROOT_DIR, 'scripts/syncTermBundle.js'));

const BACKUP_TERMS_PATH = path.join(ROOT_DIR, 'data_archive/backup_terms_2026-11-18.json');
const PRE_APPLY_TERMS_PATH = path.join(ROOT_DIR, 'data_archive/backup_terms_2026-11-18_pre-apply.json');
const PRE_APPLY_BUNDLE_PATH = path.join(ROOT_DIR, 'data_archive/backup_medicalTerms_2026-11-18_pre-apply.js');
const EXTERNAL_FIXES_PATH = path.join(ROOT_DIR, 'data_archive/roots_duzeltmeleri.json');
const DRYRUN_CSV_PATH = path.join(ROOT_DIR, 'data_archive/exports/fixRoots_dryrun.csv');
const MEDICAL_TERMS_PATH = path.join(ROOT_DIR, 'frontend/src/data/medicalTerms.js');
const SERVICE_ACCOUNT_PATH = path.join(ROOT_DIR, 'data_archive/serviceAccountKey.json');

const IS_APPLY = process.argv.includes('--apply');

// Kural a) Elle sınıflandırma listeleri (kütüphane aramasından önce uygulanır)
const MANUAL_PREFIXES = new Set([
  'para',
  'ad',
  'super',
  'bi',
  'ob',
  'e',
  'apo',
  'prae',
]);

const MANUAL_ROOTS = new Set([
  'palato',
  'squamo',
  'ethmoido',
  'pterygo',
  'stylo',
  'desmo',
  'petro',
  'atlanto',
  'cleido',
  'mylo',
  'genio',
  'omo',
  'thyreo',
  'brachio',
]);

// Kural d) Kararlar
const RULE_D_FIRESTORE_TO_LOCAL_IDS = new Set([813, 819, 821, 822, 823, 826, 827, 828]); // english: Firestore -> medicalTerms.js
const RULE_D_LOCAL_TO_FIRESTORE_TERM_IDS = new Set([898, 899]); // term: medicalTerms.js -> Firestore
const RULE_D_LOCAL_TO_FIRESTORE_DEF_IDS = new Set([905]); // turkishDefinition: medicalTerms.js -> Firestore

function csvRow(fields) {
  return fields
    .map(val => {
      const str = val === null || val === undefined ? '' : String(val);
      const singleLine = str.replace(/\r?\n/g, ' ');
      return `"${singleLine.replace(/"/g, '""')}"`;
    })
    .join(',');
}

/**
 * Bir morfem parçasını ("inter- (arasında)" veya "os (kemik)")
 * morfem kısmı ve parantez/boşluk kısmı olarak ayırır.
 */
function splitRootPart(part) {
  const openParenIdx = part.indexOf('(');
  if (openParenIdx === -1) {
    return {
      morphRaw: part.trim(),
      MiddleAndParen: '',
    };
  }
  const beforeParen = part.slice(0, openParenIdx);
  const morphRaw = beforeParen.trim();
  const trailingSpaceBeforeParen = beforeParen.slice(beforeParen.trimEnd().length);
  const parenPart = part.slice(openParenIdx);
  return {
    morphRaw,
    MiddleAndParen: trailingSpaceBeforeParen + parenPart,
  };
}

/**
 * morphemesData.js içindeki PREFIX_LOOKUP, ROOT_LOOKUP, SUFFIX_LOOKUP
 * sözlüklerinde parçanın hangi tür(ler)de bulunduğunu döndürür.
 */
function lookupMorphemeTypes(morphRaw) {
  const clean = morphRaw
    .replace(/^-+|-+$/g, '')
    .replace(/[_/;]/g, '')
    .trim()
    .toLowerCase();

  if (!clean) return { clean, types: [] };

  const types = [];
  if (PREFIX_LOOKUP[clean]) types.push('prefix');
  if (ROOT_LOOKUP[clean]) types.push('root');
  if (SUFFIX_LOOKUP[clean]) types.push('suffix');

  return { clean, types };
}

function getFirestoreDb() {
  const serviceAccount = require(SERVICE_ACCOUNT_PATH);
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.firestore();
}

/**
 * Firestore 'terms' koleksiyonunu getirir.
 */
async function loadFirestoreTerms() {
  if (!IS_APPLY && fs.existsSync(BACKUP_TERMS_PATH)) {
    const raw = JSON.parse(fs.readFileSync(BACKUP_TERMS_PATH, 'utf8'));
    const map = new Map();
    raw.forEach(item => {
      const idKey = item.id !== undefined ? Number(item.id) : Number(item._docId || item.docId);
      map.set(idKey, { docId: String(item._docId || item.docId || item.id), ...item });
    });
    return map;
  }

  const db = getFirestoreDb();
  const snapshot = await db.collection('terms').get();
  const map = new Map();
  const backupList = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    const idKey = data.id !== undefined ? Number(data.id) : Number(doc.id);
    map.set(idKey, { docId: doc.id, ref: doc.ref, ...data });
    backupList.push({ _docId: doc.id, ...data });
  });

  if (IS_APPLY) {
    backupList.sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));
    fs.writeFileSync(PRE_APPLY_TERMS_PATH, JSON.stringify(backupList, null, 2), 'utf8');
    fs.copyFileSync(MEDICAL_TERMS_PATH, PRE_APPLY_BUNDLE_PATH);
    console.log(`✅ Taze yedekler kaydedildi:`);
    console.log(`   - ${PRE_APPLY_TERMS_PATH} (${backupList.length} doküman)`);
    console.log(`   - ${PRE_APPLY_BUNDLE_PATH}\n`);
  }

  return map;
}

/**
 * Firestore 'terms' koleksiyonundaki güncel verileri kullanarak
 * frontend/src/data/medicalTerms.js içindeki terimleri senkronize eder ve syncTermBundle.js çalıştırır.
 */
async function syncBundleFromFirestore() {
  const db = getFirestoreDb();
  const snapshot = await db.collection('terms').get();
  const fsMap = new Map();
  const fsAllDocs = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    const idKey = data.id !== undefined ? Number(data.id) : Number(doc.id);
    fsMap.set(idKey, data);
    fsAllDocs.push(data);
  });

  let content = fs.readFileSync(MEDICAL_TERMS_PATH, 'utf8');
  const syncFields = ['term', 'english', 'turkishDefinition', 'turkishShort', 'englishDefinition', 'roots'];
  let updatedBundleTermsCount = 0;

  for (const [idNum, fsDoc] of fsMap.entries()) {
    // medicalTerms.js içindeki ilgili id bloğunu bul
    const blockRegex = new RegExp(`(\\{\\r?\\n\\s*"id":\\s*${idNum},[\\s\\S]*?\\r?\\n\\s*\\})`, 'm');
    const match = content.match(blockRegex);
    if (!match) continue;

    let block = match[1];
    let blockChanged = false;

    for (const field of syncFields) {
      if (fsDoc[field] === undefined) continue;
      const fsJsonVal = JSON.stringify(String(fsDoc[field]));
      const fieldRegex = new RegExp(`("${field}":\\s*)("(?:[^"\\\\]|\\\\.)*")`);
      const fMatch = block.match(fieldRegex);
      if (fMatch && fMatch[2] !== fsJsonVal) {
        block = block.replace(fieldRegex, `$1${fsJsonVal}`);
        blockChanged = true;
      }
    }

    if (blockChanged) {
      content = content.replace(match[1], block);
      updatedBundleTermsCount++;
    }
  }

  fs.writeFileSync(MEDICAL_TERMS_PATH, content, 'utf8');
  console.log(`✅ [syncBundleFromFirestore] Firestore'dan medicalTerms.js'e ${updatedBundleTermsCount} mevcut terim senkronize edildi.`);

  // Ayrıca syncTermBundle.js'i çalıştır (yeni terim kontrolü + termCount.json güncellemesi)
  syncTermsToBundle(fsAllDocs, snapshot.size);
}

async function main() {
  console.log(`=== fixRoots.js başlatıldı (Mod: ${IS_APPLY ? 'APPLY / YAZMA' : 'DRY-RUN / KURU ÇALIŞTIRMA'}) ===\n`);

  const localTerms = getAllTerms().map(t => ({ ...t }));
  const fsTermsMap = await loadFirestoreTerms();

  // CSV satırları: id, term, kural, eski değer, yeni değer
  const csvRecords = [];

  const ruleChangedTermIds = {
    a: new Set(),
    b: new Set(),
    c: new Set(),
    d: new Set(),
    e: new Set(),
  };

  // Firestore'a yazılacak doküman güncellemeleri: Map<id, { fieldsToUpdate: {}, rules: [] }>
  const firestoreUpdatesById = new Map();
  function queueFirestoreUpdate(id, field, value, ruleName) {
    const numId = Number(id);
    if (!firestoreUpdatesById.has(numId)) {
      firestoreUpdatesById.set(numId, { fields: {}, rules: [] });
    }
    const entry = firestoreUpdatesById.get(numId);
    entry.fields[field] = value;
    if (!entry.rules.includes(ruleName)) {
      entry.rules.push(ruleName);
    }
  }

  // a) Kuralı: Tire standardı
  const ruleAChanges = [];
  const ambiguousMultiType = []; // G.1
  const ambiguousNotFoundHyphenated = []; // G.2
  const ambiguousNotFoundUnhyphenatedMap = new Map(); // G.3

  for (const termObj of localTerms) {
    const originalRoots = termObj.roots || '';
    if (!originalRoots.trim()) continue;

    const parts = originalRoots.split(' + ');
    let termChangedInA = false;

    const newParts = parts.map(part => {
      const { morphRaw, MiddleAndParen } = splitRootPart(part);
      const { clean, types } = lookupMorphemeTypes(morphRaw);
      const stripped = morphRaw.replace(/^-+|-+$/g, '').trim();

      const isTrailingHyphen = morphRaw.endsWith('-') && !morphRaw.startsWith('-');
      const isLeadingHyphen = morphRaw.startsWith('-') && !morphRaw.endsWith('-');
      const isAlreadyHyphenated = isTrailingHyphen || isLeadingHyphen;

      // 1. Önce elle sınıflandırma listesini kontrol et
      if (MANUAL_PREFIXES.has(clean)) {
        const formattedMorph = `${stripped}-`;
        if (formattedMorph !== morphRaw) {
          termChangedInA = true;
          return `${formattedMorph}${MiddleAndParen}`;
        }
        return part;
      }

      if (MANUAL_ROOTS.has(clean)) {
        const formattedMorph = stripped;
        if (formattedMorph !== morphRaw) {
          termChangedInA = true;
          return `${formattedMorph}${MiddleAndParen}`;
        }
        return part;
      }

      // 2. Zaten tireli yazılmış ("x-" veya "-x") parçalar için kural:
      if (isAlreadyHyphenated) {
        if (types.length === 1 && types[0] === 'root') {
          const formattedMorph = stripped;
          if (formattedMorph !== morphRaw) {
            termChangedInA = true;
            return `${formattedMorph}${MiddleAndParen}`;
          }
          return part;
        }
        return part;
      }

      // 3. Tiresiz yazılmış parçalar için kütüphane kontrolü:
      if (types.length > 1) {
        ambiguousMultiType.push({
          id: termObj.id,
          term: termObj.term,
          morphRaw,
          clean,
          types,
        });
        return part;
      }

      if (types.length === 0) {
        if (!ambiguousNotFoundUnhyphenatedMap.has(morphRaw)) {
          ambiguousNotFoundUnhyphenatedMap.set(morphRaw, {
            morphRaw,
            clean,
            count: 0,
            termIds: [],
          });
        }
        const entry = ambiguousNotFoundUnhyphenatedMap.get(morphRaw);
        entry.count++;
        entry.termIds.push(termObj.id);
        return part;
      }

      const singleType = types[0];
      let formattedMorph = stripped;
      if (singleType === 'prefix') {
        formattedMorph = `${stripped}-`;
      } else if (singleType === 'suffix') {
        formattedMorph = `-${stripped}`;
      } else if (singleType === 'root') {
        formattedMorph = stripped;
      }

      if (formattedMorph !== morphRaw) {
        termChangedInA = true;
        return `${formattedMorph}${MiddleAndParen}`;
      }
      return part;
    });

    if (termChangedInA) {
      const updatedRoots = newParts.join(' + ');
      ruleChangedTermIds.a.add(termObj.id);
      ruleAChanges.push({
        id: termObj.id,
        term: termObj.term,
        oldVal: originalRoots,
        newVal: updatedRoots,
      });
      csvRecords.push({
        id: termObj.id,
        term: termObj.term,
        rule: 'a',
        oldVal: originalRoots,
        newVal: updatedRoots,
      });
      termObj.roots = updatedRoots;
      queueFirestoreUpdate(termObj.id, 'roots', updatedRoots, 'a');
    }
  }

  // b) Kuralı: Flexor/Extensor ve "or" son eki
  const ruleBReport = [];
  const hasOrSuffixInLibrary = Boolean(
    SUFFIX_LOOKUP['-or'] ||
      SUFFIX_LOOKUP['or'] ||
      SUFFIXES.some(s => s.suffix === '-or' || (s.variants || []).includes('-or'))
  );

  for (const termObj of localTerms) {
    const currentRoots = termObj.roots || '';
    if (!currentRoots.trim()) continue;

    const parts = currentRoots.split(' + ');
    let hasStandaloneOr = false;

    parts.forEach(part => {
      const { morphRaw } = splitRootPart(part);
      if (morphRaw === 'or') {
        hasStandaloneOr = true;
      }
    });

    if (hasStandaloneOr) {
      const parsedBefore = parseRootsToMorphemes(currentRoots);
      const orBefore = parsedBefore.find(p => p.root === 'or');

      const newParts = parts.map(part => {
        const { morphRaw, MiddleAndParen } = splitRootPart(part);
        if (morphRaw === 'or') {
          return `-or${MiddleAndParen}`;
        }
        return part;
      });
      const updatedRoots = newParts.join(' + ');

      const parsedAfter = parseRootsToMorphemes(updatedRoots);
      const orAfter = parsedAfter.find(p => p.root === '-or');

      ruleChangedTermIds.b.add(termObj.id);
      ruleBReport.push({
        id: termObj.id,
        term: termObj.term,
        oldVal: currentRoots,
        newVal: updatedRoots,
        beforeLink:
          orBefore && orBefore.morphemeSlug
            ? `/morphemes/${orBefore.morphemeSlug} [displayTerm: "${orBefore.morphemeName}", tür: ${orBefore.morphemeType}, anlam: "${ROOT_LOOKUP['or']?.tr || ''}"]`
            : 'Yok (bağlantısız)',
        afterLink:
          orAfter && orAfter.morphemeSlug
            ? `/morphemes/${orAfter.morphemeSlug} [displayTerm: "${orAfter.morphemeName}", tür: ${orAfter.morphemeType}]`
            : 'Yok / Bağlantısız (morphemesData.js içinde "-or" son eki bulunmadığı için yanlış "/morphemes/or" (Ağız) bağlantısı kalkar)',
      });

      csvRecords.push({
        id: termObj.id,
        term: termObj.term,
        rule: 'b',
        oldVal: currentRoots,
        newVal: updatedRoots,
      });

      termObj.roots = updatedRoots;
      queueFirestoreUpdate(termObj.id, 'roots', updatedRoots, 'b');
    }
  }

  // c) Kuralı: Tekil düzeltmeler
  const ruleCReport = [];

  for (const termObj of localTerms) {
    // Os Hyoideum (ID 720)
    if (
      Number(termObj.id) === 720 ||
      termObj.term === 'Os Hyoideum' ||
      (termObj.roots && termObj.roots.includes('hyoides (Y harfi şeklinde)'))
    ) {
      const oldRoots = termObj.roots;
      const newRoots = oldRoots.replace(
        'hyoides (Y harfi şeklinde)',
        'hyoides (upsilon/υ harfi biçiminde, U biçimli)'
      );
      if (newRoots !== oldRoots) {
        ruleChangedTermIds.c.add(termObj.id);
        ruleCReport.push({
          id: termObj.id,
          term: termObj.term,
          field: 'roots',
          currentVal: oldRoots,
          suggestedVal: newRoots,
          slugInfo: `Değişmez (/study/${getTermSlug(termObj.term)})`,
          note: 'Os Hyoideum roots anlam düzeltmesi (iç içe parantez olmadan)',
        });
        csvRecords.push({
          id: termObj.id,
          term: termObj.term,
          rule: 'c',
          oldVal: oldRoots,
          newVal: newRoots,
        });
        termObj.roots = newRoots;
        queueFirestoreUpdate(termObj.id, 'roots', newRoots, 'c');
      }
    }

    // Crus Dextrum (982), Crus Sinistrum (983), Mm. Interossei Dorsales (1052)
    const lowerTerm = (termObj.term || '').toLowerCase();
    if (
      lowerTerm.startsWith('crus dextrum') ||
      lowerTerm.startsWith('crus sinistrum') ||
      lowerTerm.startsWith('mm. interossei dorsales')
    ) {
      const currentTerm = termObj.term;
      const currentRoots = termObj.roots;
      const suggestedTerm = currentTerm.replace(/\(([a-zğüşıöç])/g, (m, ch) => `(${ch.toLocaleUpperCase('tr-TR')}`);

      const oldSlug = getTermSlug(currentTerm);
      const newSlug = getTermSlug(suggestedTerm);
      const slugChanged = oldSlug !== newSlug;

      if (suggestedTerm !== currentTerm) {
        ruleChangedTermIds.c.add(termObj.id);
        ruleCReport.push({
          id: termObj.id,
          term: currentTerm,
          field: 'term',
          currentVal: `term: "${currentTerm}" | roots: "${currentRoots}"`,
          suggestedVal: `term: "${suggestedTerm}" | roots: "${currentRoots}"`,
          oldSlug: `/study/${oldSlug}`,
          newSlug: `/study/${newSlug}`,
          slugChanged,
          slugInfo: slugChanged
            ? `DEĞİŞİYOR: /study/${oldSlug} → /study/${newSlug}`
            : `DEĞİŞMİYOR: /study/${oldSlug} → /study/${newSlug} (getTermSlug tüm harfleri küçülttüğü için URL aynı kalır)`,
          note: 'Parantez içi Latince bölge adının baş harfi büyütüldü',
        });
        csvRecords.push({
          id: termObj.id,
          term: currentTerm,
          rule: 'c',
          oldVal: `[term] ${currentTerm}`,
          newVal: `[term] ${suggestedTerm}`,
        });
        termObj.term = suggestedTerm;
        queueFirestoreUpdate(termObj.id, 'term', suggestedTerm, 'c');
      }
    }
  }

  // d) Kuralı: Firestore ↔ medicalTerms.js farkları (Kararlar doğrultusunda)
  // - ID 813, 819, 821, 822, 823, 826, 827, 828 -> english: FIRESTORE doğru (Firestore'a yazma YOK)
  // - ID 898, 899 -> term: MEDICALTERMS.JS doğru -> Firestore'a yazılacak
  // - ID 905 -> turkishDefinition: MEDICALTERMS.JS doğru -> Firestore'a yazılacak
  const rawLocalTerms = getAllTerms();
  const ruleDDecisions = [];

  for (const rawLocal of rawLocalTerms) {
    const idNum = Number(rawLocal.id);
    const fsDoc = fsTermsMap.get(idNum);
    if (!fsDoc) continue;

    if (RULE_D_FIRESTORE_TO_LOCAL_IDS.has(idNum)) {
      const localVal = String(rawLocal.english || '').trim();
      const fsVal = String(fsDoc.english || '').trim();
      if (localVal !== fsVal) {
        ruleChangedTermIds.d.add(idNum);
        ruleDDecisions.push({
          id: idNum,
          term: rawLocal.term,
          field: 'english',
          winnerSource: 'Firestore',
          targetToWrite: 'medicalTerms.js (Firestore aynı kalacak)',
          oldVal: localVal,
          newVal: fsVal,
        });
        csvRecords.push({
          id: idNum,
          term: rawLocal.term,
          rule: 'd',
          oldVal: `[medicalTerms.js english] ${localVal}`,
          newVal: `[Hedef: medicalTerms.js <- Firestore english] ${fsVal}`,
        });
        const targetLocal = localTerms.find(t => Number(t.id) === idNum);
        if (targetLocal) targetLocal.english = fsVal;
      }
    }

    if (RULE_D_LOCAL_TO_FIRESTORE_TERM_IDS.has(idNum)) {
      const localVal = String(rawLocal.term || '').trim();
      const fsVal = String(fsDoc.term || '').trim();
      if (localVal !== fsVal) {
        ruleChangedTermIds.d.add(idNum);
        ruleDDecisions.push({
          id: idNum,
          term: rawLocal.term,
          field: 'term',
          winnerSource: 'medicalTerms.js',
          targetToWrite: 'Firestore (medicalTerms.js aynı kalacak)',
          oldVal: fsVal,
          newVal: localVal,
        });
        csvRecords.push({
          id: idNum,
          term: rawLocal.term,
          rule: 'd',
          oldVal: `[Firestore term] ${fsVal}`,
          newVal: `[Hedef: Firestore <- medicalTerms.js term] ${localVal}`,
        });
        queueFirestoreUpdate(idNum, 'term', localVal, 'd');
      }
    }

    if (RULE_D_LOCAL_TO_FIRESTORE_DEF_IDS.has(idNum)) {
      const localVal = String(rawLocal.turkishDefinition || '').trim();
      const fsVal = String(fsDoc.turkishDefinition || '').trim();
      if (localVal !== fsVal) {
        ruleChangedTermIds.d.add(idNum);
        ruleDDecisions.push({
          id: idNum,
          term: rawLocal.term,
          field: 'turkishDefinition',
          winnerSource: 'medicalTerms.js',
          targetToWrite: 'Firestore (medicalTerms.js aynı kalacak)',
          oldVal: fsVal,
          newVal: localVal,
        });
        csvRecords.push({
          id: idNum,
          term: rawLocal.term,
          rule: 'd',
          oldVal: `[Firestore turkishDefinition] ${fsVal}`,
          newVal: `[Hedef: Firestore <- medicalTerms.js turkishDefinition] ${localVal}`,
        });
        queueFirestoreUpdate(idNum, 'turkishDefinition', localVal, 'd');
      }
    }
  }

  // e) Kuralı: Dış düzeltme dosyası (data_archive/roots_duzeltmeleri.json)
  let externalFileExists = false;
  const ruleEChanges = [];
  if (fs.existsSync(EXTERNAL_FIXES_PATH)) {
    externalFileExists = true;
    const extList = JSON.parse(fs.readFileSync(EXTERNAL_FIXES_PATH, 'utf8'));
    if (Array.isArray(extList)) {
      const termById = new Map(localTerms.map(t => [Number(t.id), t]));
      for (const item of extList) {
        const targetTerm = termById.get(Number(item.id));
        if (!targetTerm || typeof item.roots !== 'string') continue;
        const prevRoots = targetTerm.roots || '';
        const nextRoots = item.roots.trim();
        if (prevRoots !== nextRoots) {
          ruleChangedTermIds.e.add(targetTerm.id);
          ruleEChanges.push({
            id: targetTerm.id,
            term: targetTerm.term,
            oldVal: prevRoots,
            newVal: nextRoots,
          });
          csvRecords.push({
            id: targetTerm.id,
            term: targetTerm.term,
            rule: 'e',
            oldVal: prevRoots,
            newVal: nextRoots,
          });
          targetTerm.roots = nextRoots;
          queueFirestoreUpdate(targetTerm.id, 'roots', nextRoots, 'e');
        }
      }
    }
  }

  if (!IS_APPLY) {
    fs.mkdirSync(path.dirname(DRYRUN_CSV_PATH), { recursive: true });
    const csvHeader = csvRow(['id', 'term', 'kural', 'eski değer', 'yeni değer']);
    const csvBody = csvRecords.map(r => csvRow([r.id, r.term, r.rule, r.oldVal, r.newVal]));
    fs.writeFileSync(DRYRUN_CSV_PATH, '\uFEFF' + [csvHeader, ...csvBody].join('\n') + '\n', 'utf8');
  }

  console.log('================================================================');
  console.log('1. KURALA GÖRE DEĞİŞECEK TERİM SAYILARI');
  console.log('================================================================');
  console.log(`- Kural a (Tire standardı):                  ${ruleChangedTermIds.a.size} terim`);
  console.log(`- Kural b (Flexor/Extensor "or" -> "-or"):   ${ruleChangedTermIds.b.size} terim`);
  console.log(`- Kural c (Tekil düzeltmeler):               ${ruleChangedTermIds.c.size} terim`);
  console.log(`- Kural d (Firestore ↔ medicalTerms farkı):  ${ruleChangedTermIds.d.size} terim (3 Firestore'a yazılacak, 8 Firestore'dan alınacak)`);
  console.log(`- Kural e (Dış düzeltme dosyası):            ${externalFileExists ? `${ruleChangedTermIds.e.size} terim` : 'dosya yok (0 terim)'}`);
  console.log(`- Firestore'a yazılacak tekil doküman:       ${firestoreUpdatesById.size} doküman (138 + 2 + 4 + 3 = 147)`);
  console.log(`- Toplam CSV satırı (fixRoots_dryrun.csv):   ${csvRecords.length} satır (147 Firestore yazımı + 8 Firestore english korunumu = 155)\n`);

  if (IS_APPLY) {
    console.log('=== --apply aktif: Değişiklikler SADECE Firestore "terms" koleksiyonuna yazılıyor... ===');
    const db = getFirestoreDb();
    const entries = [...firestoreUpdatesById.entries()];
    const CHUNK_SIZE = 400;
    let totalWritten = 0;

    for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
      const chunk = entries.slice(i, i + CHUNK_SIZE);
      const batch = db.batch();
      for (const [idNum, updateInfo] of chunk) {
        const fsDoc = fsTermsMap.get(idNum);
        if (!fsDoc) {
          throw new Error(`Firestore'da ID ${idNum} bulunamadı!`);
        }
        const docRef = db.collection('terms').doc(String(fsDoc.docId));
        batch.update(docRef, updateInfo.fields);
        totalWritten++;
      }
      await batch.commit();
      console.log(`  ✅ Firestore batch ${Math.floor(i / CHUNK_SIZE) + 1} yazıldı (${chunk.length} doküman).`);
    }

    console.log(`\n🎉 Toplam ${totalWritten} doküman Firestore 'terms' koleksiyonunda güncellendi.`);
    console.log('\n=== Şimdi medicalTerms.js ve termCount.json Firestore\'dan senkronize ediliyor... ===');
    await syncBundleFromFirestore();
  } else {
    console.log('\n[KURU ÇALIŞTIRMA TAMAMLANDI] Firestore ve medicalTerms.js dosyalarına DOKUNULMADI.');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
