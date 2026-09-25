const fs = require('fs');
const path = require('path');

function searchInDir(dir, patterns) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'build' || file === 'data_archive' || file === '.gemini') continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchInDir(fullPath, patterns);
    } else if (/\.(jsx?|tsx?|html|mjs|json)$/i.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      patterns.forEach(p => {
        if (content.includes(p)) {
          console.log(`Found '${p}' in: ${fullPath}`);
          // Print surrounding line
          const lines = content.split('\n');
          lines.forEach((l, idx) => {
            if (l.includes(p)) {
              console.log(`  Line ${idx + 1}: ${l.trim().slice(0, 120)}`);
            }
          });
        }
      });
    }
  }
}

console.log("=== SCANNING FOR HARDCODED 590 / 649 ===");
searchInDir('./frontend/src', ['590', '649']);
searchInDir('./frontend/public', ['590', '649']);
searchInDir('./frontend/scripts', ['590', '649']);
searchInDir('./api', ['590', '649']);
