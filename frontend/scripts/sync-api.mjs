import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_API_DIR = path.resolve(__dirname, '../../api');
const FRONTEND_API_DIR = path.resolve(__dirname, '../api');

function syncApi(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`[sync-api] Source directory not found: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      syncApi(srcPath, destPath);
    } else {
      const srcContent = fs.readFileSync(srcPath);
      let needsCopy = true;

      if (fs.existsSync(destPath)) {
        const destContent = fs.readFileSync(destPath);
        if (srcContent.equals(destContent)) {
          needsCopy = false;
        }
      }

      if (needsCopy) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`[sync-api] Copied: ${path.relative(ROOT_API_DIR, srcPath)} -> ${path.relative(FRONTEND_API_DIR, destPath)}`);
      }
    }
  }
}

console.log('[sync-api] Synchronizing root api/ -> frontend/api/ ...');
syncApi(ROOT_API_DIR, FRONTEND_API_DIR);
console.log('[sync-api] Synchronization complete.');
