const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\cicek\\.gemini\\antigravity\\brain\\84df839f-7069-409b-93b6-bb4d8de8dc93";

async function verify() {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  console.log("Launching Edge...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: "new",
    defaultViewport: { width: 1280, height: 900 },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"]
  });

  const page = await browser.newPage();

  console.log("\n--- TEST 1: Sutura Frontomaxillaris ---");
  // Let's go to study page and search Sutura Frontomaxillaris
  await page.goto("https://www.healthlexmed.com/study?search=Sutura+Frontomaxillaris", { waitUntil: "networkidle2" });
  await page.waitForSelector("h3", { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // Find the link to detail
  const termLink = await page.$("a[href*='/study/']");
  if (termLink) {
    const href = await page.evaluate(el => el.getAttribute("href"), termLink);
    console.log("Link href in DOM:", href);
    await termLink.click();
    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 15000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 2000));
  } else {
    console.log("Term link not found in DOM via search, navigating directly to slug");
    await page.goto("https://www.healthlexmed.com/study/sutura-frontomaxillaris", { waitUntil: "networkidle2" });
  }

  const url1 = page.url();
  console.log("Actual Page URL 1:", url1);
  const screenshot1Path = path.join(ARTIFACT_DIR, "url_verify_sutura_frontomaxillaris.png");
  await page.screenshot({ path: screenshot1Path });
  console.log("Screenshot 1 saved to:", screenshot1Path);

  console.log("\n--- TEST 2: Musculus Biceps Brachii (or Biceps Brachii) ---");
  await page.goto("https://www.healthlexmed.com/study?search=Biceps", { waitUntil: "networkidle2" });
  await page.waitForSelector("h3", { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  const termLink2 = await page.$("a[href*='/study/']");
  if (termLink2) {
    const href2 = await page.evaluate(el => el.getAttribute("href"), termLink2);
    console.log("Link href 2 in DOM:", href2);
    await termLink2.click();
    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 15000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 2000));
  }

  const url2 = page.url();
  console.log("Actual Page URL 2:", url2);
  const screenshot2Path = path.join(ARTIFACT_DIR, "url_verify_biceps.png");
  await page.screenshot({ path: screenshot2Path });
  console.log("Screenshot 2 saved to:", screenshot2Path);

  await browser.close();

  console.log("\n=== VERIFICATION SUMMARY ===");
  console.log("URL 1:", url1);
  console.log("URL 2:", url2);
}

verify().catch(console.error);
