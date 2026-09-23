const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\cicek\\.gemini\\antigravity\\brain\\9eddf07d-7eb5-4a20-b8fd-2c6a43e1a6a3';

async function run() {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  console.log('Launching Edge from:', EDGE_PATH);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    defaultViewport: { width: 1280, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Make sure localStorage has no user logged in (simulate guest)
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  console.log('--- TEST 1: Study page - "Humerus" search ---');
  await page.goto('http://localhost:3000/study?search=Humerus', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h3', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  const humerusScreenshot = path.join(ARTIFACT_DIR, '01-study-search-humerus.png');
  await page.screenshot({ path: humerusScreenshot, fullPage: false });
  console.log('Saved:', humerusScreenshot);

  console.log('--- TEST 2: Study page - "Atlas" search ---');
  await page.goto('http://localhost:3000/study?search=Atlas', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h3', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  const atlasScreenshot = path.join(ARTIFACT_DIR, '02-study-search-atlas.png');
  await page.screenshot({ path: atlasScreenshot, fullPage: false });
  console.log('Saved:', atlasScreenshot);

  console.log('--- TEST 3: Morphemes page - "itis" search ---');
  await page.goto('http://localhost:3000/morphemes?search=itis', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('article', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  const itisScreenshot = path.join(ARTIFACT_DIR, '03-morphemes-search-itis.png');
  await page.screenshot({ path: itisScreenshot, fullPage: false });
  console.log('Saved:', itisScreenshot);

  console.log('--- TEST 4: Morphemes page - "kalp" search ---');
  await page.goto('http://localhost:3000/morphemes?search=kalp', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('article', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  const kalpScreenshot = path.join(ARTIFACT_DIR, '04-morphemes-search-kalp.png');
  await page.screenshot({ path: kalpScreenshot, fullPage: false });
  console.log('Saved:', kalpScreenshot);

  console.log('--- TEST 5: Guest Mode Lock Verification - Searching 25+ morpheme "cardi/o" ---');
  // Searching cardio as guest - verify card title is visible while content is blurred/locked
  await page.goto('http://localhost:3000/morphemes?search=cardio', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('article', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  const lockScreenshot = path.join(ARTIFACT_DIR, '05-guest-lock-verification-cardio.png');
  await page.screenshot({ path: lockScreenshot, fullPage: false });
  console.log('Saved:', lockScreenshot);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
