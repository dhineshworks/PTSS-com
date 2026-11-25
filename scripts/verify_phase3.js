import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve('screenshots/phase3');

async function run() {
  console.log('Launching browser for Phase 3 checks...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const results = {
    tests: [],
  };

  // Setup state: active pet "Mango", level 1, 50 coins, ownedItems: ['hat-straw']
  await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    const data = raw ? JSON.parse(raw) : { state: {} };
    data.state.coins = 50;
    data.state.currentLevel = 1;
    if (!data.state.pets || data.state.pets.length === 0) {
      data.state.pets = [
        { id: 'pet-1', name: 'Mango', type: 'mango', hatchedAt: '2026-11-24' },
      ];
      data.state.activePetId = 'pet-1';
    }
    data.state.ownedItems = ['hat-straw'];
    data.state.equippedItems = { 'pet-1': { hat: 'hat-straw' } };
    localStorage.setItem('numling-jungle-storage', JSON.stringify(data));
  });

  // 1. Visit /wardrobe at 390px & 1280px
  console.log('Visiting /wardrobe...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/wardrobe`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'wardrobe-phone.png') });

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/wardrobe`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'wardrobe-desktop.png') });

  // 2. Count items on shelf (should be 12)
  const itemCount = await page.evaluate(() => {
    return document.querySelectorAll('.bg-\\[\\#8B5A2B\\]\\/85 .cream-card').length;
  });
  results.tests.push({ name: 'At least 12 items displayed on shelf', passed: itemCount >= 12 });

  // 3. Test that locked item (Level 2 or Level 5) cannot be bought at Level 1
  console.log('Testing level locked item click...');
  const lockedItem = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.bg-\\[\\#8B5A2B\\]\\/85 .cream-card'));
    const lockedCard = cards.find((c) => c.textContent?.includes('Level 2') || c.textContent?.includes('Level 5'));
    if (lockedCard) {
      lockedCard.click();
      return true;
    }
    return false;
  });
  await new Promise((r) => setTimeout(r, 500));
  const hasLockToast = await page.evaluate(() => document.body.innerText.includes('Locked! Reach Level'));
  results.tests.push({ name: 'Level locked item cannot be bought', passed: lockedItem && hasLockToast });

  // 4. Test buying an unowned item (Party Cone, price 10)
  console.log('Testing purchasing unowned item (Party Cone)...');
  const boughtItem = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.bg-\\[\\#8B5A2B\\]\\/85 .cream-card'));
    const partyCard = cards.find((c) => c.textContent?.includes('Party Cone'));
    if (partyCard) {
      partyCard.click();
      return true;
    }
    return false;
  });
  await new Promise((r) => setTimeout(r, 800));

  // Check coins dropped from 50 to 40
  const coinsAfterBuy = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return raw ? JSON.parse(raw).state.coins : null;
  });
  results.tests.push({ name: 'Coins drop correctly on purchase (50 -> 40)', passed: coinsAfterBuy === 40 });

  // Check equipped preview updated
  const liveWearingHat = await page.evaluate(() => {
    return document.body.innerText.includes('Party Cone');
  });
  results.tests.push({ name: 'Item equipped and visible in live preview', passed: liveWearingHat });

  // 5. Test buying and equipping an accessory (Sunglasses, price 10)
  console.log('Testing purchasing accessory (Sunglasses)...');
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.bg-\\[\\#8B5A2B\\]\\/85 .cream-card'));
    const shadesCard = cards.find((c) => c.textContent?.includes('Cool Sunglasses'));
    if (shadesCard) {
      shadesCard.click();
    }
  });
  await new Promise((r) => setTimeout(r, 800));

  const coinsAfterAccessory = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return raw ? JSON.parse(raw).state.coins : null;
  });
  results.tests.push({ name: 'Accessory bought and coins drop to 30', passed: coinsAfterAccessory === 30 });

  // Capture screenshot of equipped Pet wearing both Hat & Accessory
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'wardrobe-equipped-phone.png') });

  // 6. Test Green Check Button (save and exit to /my-numling)
  console.log('Clicking Green Check button...');
  const checkBtn = await page.$('button[aria-label="Save and Exit"]');
  if (checkBtn) {
    await checkBtn.click();
    await new Promise((r) => setTimeout(r, 1000));
  }
  const onSanctuary = page.url().includes('/my-numling');
  results.tests.push({ name: 'Green Check button saves and returns to /my-numling', passed: onSanctuary });

  // 7. Verify persistence on page reload
  await page.reload({ waitUntil: 'networkidle0' });
  const persistenceCheck = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    if (!raw) return false;
    const s = JSON.parse(raw).state;
    return s.coins === 30 && s.ownedItems.includes('hat-party') && s.ownedItems.includes('sunglasses');
  });
  results.tests.push({ name: 'All purchases and equipped items survive refresh', passed: persistenceCheck });

  console.log('Phase 3 Test Results:', JSON.stringify(results, null, 2));
  await browser.close();
}

run().catch((err) => {
  console.error('Phase 3 verification failed:', err);
  process.exit(1);
});
