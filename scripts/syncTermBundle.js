const fs = require('fs');
const path = require('path');

const MEDICAL_TERMS_PATH = path.resolve(__dirname, '../frontend/src/data/medicalTerms.js');
const TERM_COUNT_PATH = path.resolve(__dirname, '../frontend/src/data/termCount.json');

/**
 * Formats a list of term objects into JS object string representation with 8-space indentation
 */
function formatTerms(terms) {
  return terms.map(item => {
    const jsonStr = JSON.stringify(item, null, 4);
    return jsonStr.split('\n').map(line => '        ' + line).join('\n');
  }).join(',\n');
}

/**
 * Merges terms into medicalTerms.js and updates termCount.json.
 * @param {Array<Object>|string} termsOrFilePath - Array of term objects or path to a JSON file
 * @param {number} [totalCount] - Optional total count from Firestore
 * @returns {{ added: number, totalInBundle: number }}
 */
function syncTermsToBundle(termsOrFilePath, totalCount = null) {
  let terms = [];
  if (typeof termsOrFilePath === 'string') {
    const fullPath = path.isAbsolute(termsOrFilePath) ? termsOrFilePath : path.resolve(process.cwd(), termsOrFilePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Data file not found: ${fullPath}`);
    }
    terms = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } else if (Array.isArray(termsOrFilePath)) {
    terms = termsOrFilePath;
  } else {
    throw new Error('syncTermsToBundle expects an array of terms or a file path');
  }

  if (terms.length === 0) {
    console.log('[syncTermBundle] No terms provided for sync.');
    return { added: 0, totalInBundle: 0 };
  }

  let content = fs.readFileSync(MEDICAL_TERMS_PATH, 'utf8');

  // Extract all existing IDs from medicalTerms.js
  const existingIds = new Set();
  const idMatches = content.matchAll(/"id":\s*(\d+)/g);
  for (const m of idMatches) {
    existingIds.add(Number(m[1]));
  }

  // Filter out terms that already exist in bundle by ID
  const termsToAdd = terms.filter(t => !existingIds.has(Number(t.id)));

  if (termsToAdd.length === 0) {
    console.log(`ℹ️ [syncTermBundle] All ${terms.length} terms already exist in medicalTerms.js. No new additions needed.`);
  } else {
    // Group terms to add by subcategory
    const bySubcategory = {};
    for (const term of termsToAdd) {
      const subcat = term.subcategory || term.category || 'general';
      if (!bySubcategory[subcat]) {
        bySubcategory[subcat] = [];
      }
      bySubcategory[subcat].push(term);
    }

    // Insert for each subcategory
    for (const [subcat, subcatTerms] of Object.entries(bySubcategory)) {
      const keyPattern = `"${subcat}": [`;
      let startIdx = content.indexOf(keyPattern);
      if (startIdx === -1) {
        // Automatically create new subcategory array in medicalTermsData
        const objEndPattern = '};\n\n// Get all terms';
        const objEndIdx = content.indexOf(objEndPattern);
        if (objEndIdx !== -1) {
          const insertSubcat = `,\n    "${subcat}": [\n    ]`;
          content = content.slice(0, objEndIdx) + insertSubcat + content.slice(objEndIdx);
          startIdx = content.indexOf(keyPattern);
          console.log(`✨ [syncTermBundle] Created new subcategory array "${subcat}" in medicalTermsData.`);
        } else {
          console.warn(`⚠️ [syncTermBundle] Subcategory "${subcat}" not found in medicalTerms.js! Skipping ${subcatTerms.length} terms.`);
          continue;
        }
      }

      // Find the closing bracket ']' corresponding to this array
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
        console.warn(`⚠️ [syncTermBundle] Could not locate closing bracket for subcategory "${subcat}"!`);
        continue;
      }

      // Check if array has elements before the closing bracket
      const arrayContent = content.substring(startIdx + keyPattern.length, endIdx).trim();
      const needsLeadingComma = arrayContent.length > 0;

      const formatted = (needsLeadingComma ? ',\n' : '\n') + formatTerms(subcatTerms) + '\n    ';
      content = content.slice(0, endIdx) + formatted + content.slice(endIdx);
    }

    fs.writeFileSync(MEDICAL_TERMS_PATH, content, 'utf8');
    console.log(`✅ [syncTermBundle] Successfully merged ${termsToAdd.length} terms into medicalTerms.js!`);
  }

  // Count total IDs in bundle
  const finalIdMatches = content.match(/"id":\s*\d+/g) || [];
  const totalInBundle = finalIdMatches.length;

  const countToSave = totalCount !== null ? Number(totalCount) : totalInBundle;

  // Update termCount.json
  const countData = {
    totalTerms: countToSave,
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(TERM_COUNT_PATH, JSON.stringify(countData, null, 2) + '\n', 'utf8');
  console.log(`⚡ [syncTermBundle] termCount.json updated -> totalTerms: ${countToSave}`);

  return { added: termsToAdd.length, totalInBundle };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    const totalArg = args[1] ? Number(args[1]) : null;
    syncTermsToBundle(args[0], totalArg);
  } else {
    console.log("Usage: node scripts/syncTermBundle.js <path-to-json> [totalCount]");
  }
}

module.exports = { syncTermsToBundle };
