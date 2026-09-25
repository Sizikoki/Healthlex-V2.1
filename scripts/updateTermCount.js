const fs = require('fs');
const path = require('path');

function updateTermCountConfig(count) {
  const filePath = path.join(__dirname, '../frontend/src/data/termCount.json');
  const data = {
    totalTerms: Number(count),
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`\n[termCountConfig] Auto-updated frontend/src/data/termCount.json -> totalTerms: ${count}`);
}

module.exports = { updateTermCountConfig };
