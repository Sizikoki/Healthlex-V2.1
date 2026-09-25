const fs = require('fs');
const path = require('path');

const targets = [];

function search(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'build' || f === 'data_archive' || f === '.gemini') continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      search(full);
    } else if (/\.(jsx?|tsx?|html|mjs|json|md)$/i.test(f)) {
      if (f.endsWith('package.json') || f.endsWith('package-lock.json')) continue;
      const content = fs.readFileSync(full, 'utf8');
      
      // Look for 590, 649, 677 or mentions of terim count
      const patterns = [
        /\b590\b/,
        /\b649\b/,
        /\b677\b/,
        /590\+?/,
        /649\+?/,
        /677\+?/,
        /\b(500|550|580|590|600|649|677|700)\+?\s*(terim|kelime|kavram|medical terms|terms)/i
      ];

      for (const p of patterns) {
        if (p.test(content)) {
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            if (p.test(line)) {
              targets.push({ file: full, line: idx + 1, text: line.trim() });
            }
          });
          break;
        }
      }
    }
  }
}

search('./frontend');
search('./api');
search('./docs');
search('./');

console.log(`Found ${targets.length} match(es):`);
targets.forEach(t => {
  console.log(`${t.file}:${t.line} -> ${t.text.slice(0, 140)}`);
});
