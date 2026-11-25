const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots', 'customize_video');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('--- VERIFYING EXACT CUSTOMIZE SCREEN FROM VIDEO ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();

  // Setup state: active pet "Woolzy", 40 coins (matching video)
  await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    const data = raw ? JSON.parse(raw) : { state: {} };
    data.state.coins = 40;
    data.state.currentLevel = 2;
    data.state.pets = [
      { id: 'pet-woolzy', name: 'Woolzy', type: 'woolzy', hatchedAt: '2026-11-24' },
      { id: 'pet-mango', name: 'Mango', type: 'mango', hatchedAt: '2026-11-24' },
    ];
    data.state.activePetId = 'pet-woolzy';
    data.state.ownedItems = ['hat-straw', 'bowtie'];
    data.state.equippedItems = {
      'pet-woolzy': {
        colorTint: 'blue',
      },
    };
    localStorage.setItem('numling-jungle-storage', JSON.stringify(data));
  });

  // 1. Desktop 1280x800
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/wardrobe`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_customize_desktop_initial.png') });
  console.log('Saved 01_customize_desktop_initial.png');

  // Click on Pink Bucket (tile-pink-bucket)
  const pinkBucket = await page.$('[data-testid="tile-pink-bucket"]');
  if (pinkBucket) {
    await pinkBucket.click();
    console.log('Clicked Pink Paint Bucket');
    await new Promise((r) => setTimeout(r, 800));
  }

  // Click on Pink Hair / Tuft (tile-pink-hair)
  const pinkHair = await page.$('[data-testid="tile-pink-hair"]');
  if (pinkHair) {
    await pinkHair.click();
    console.log('Clicked Pink Hair Tuft');
    await new Promise((r) => setTimeout(r, 800));
  }

  // Click on Orange Wings (tile-orange-ears)
  const orangeWings = await page.$('[data-testid="tile-orange-ears"]');
  if (orangeWings) {
    await orangeWings.click();
    console.log('Clicked Orange Wings');
    await new Promise((r) => setTimeout(r, 800));
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_customize_desktop_customized.png') });
  console.log('Saved 02_customize_desktop_customized.png');

  // Test Treehouse Outfits Tab
  const outfitsTab = await page.$('[data-testid="tab-treehouse-outfits"]');
  if (outfitsTab) {
    await outfitsTab.click();
    console.log('Switched to Treehouse Outfits Shelf');
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_customize_desktop_outfits_shelf.png') });
    console.log('Saved 03_customize_desktop_outfits_shelf.png');
  }

  // Switch back to Monster parts
  const partsTab = await page.$('[data-testid="tab-monster-parts"]');
  if (partsTab) {
    await partsTab.click();
    await new Promise((r) => setTimeout(r, 600));
  }

  // 2. Mobile Viewport 390x844 (iPhone 14)
  await page.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_customize_mobile_390.png') });
  console.log('Saved 04_customize_mobile_390.png');

  // Click save green checkmark button
  const saveBtn = await page.$('[data-testid="save-customize-btn"]');
  if (saveBtn) {
    await saveBtn.click();
    console.log('Clicked Save Green Check Button');
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_after_save_sanctuary.png') });
    console.log('Saved 05_after_save_sanctuary.png');
  }

  await browser.close();
  console.log('All Customize verification screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
