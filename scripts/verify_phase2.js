import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve('screenshots/phase2');

async function run() {
  console.log('Launching browser for Phase 2 checks...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const results = {
    tests: [],
  };

  // 1. Visit /nest with partial egg power
  console.log('Visiting /nest at 390px and 1280px...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/nest`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nest-partial-phone.png') });

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/nest`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nest-partial-desktop.png') });

  // 2. Set eggPower to 100% to test ready-to-hatch and hatching ceremony
  console.log('Charging egg to 100% and triggering hatching ceremony...');
  await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    const data = raw ? JSON.parse(raw) : { state: {} };
    data.state.eggPower = 100;
    localStorage.setItem('numling-jungle-storage', JSON.stringify(data));
  });

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/nest`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nest-ready-100-phone.png') });

  // Click egg to start hatching
  const eggEl = await page.$('.w-48');
  if (eggEl) {
    await eggEl.click();
    console.log('Clicked egg, waiting for naming modal to appear...');

    // Wait for the naming input modal to appear
    await page.waitForSelector('input#pet-name-input', { timeout: 6000 });
    await new Promise((r) => setTimeout(r, 400));

    // Capture the Naming Modal screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'hatch-naming-phone.png') });

    // Type a custom name: "Sparky"
    const input = await page.$('input#pet-name-input');
    if (input) {
      await page.evaluate((el) => (el.value = ''), input);
      await input.type('Sparky');
      await new Promise((r) => setTimeout(r, 300));
    }

    // Click "Save & Meet" via dedicated id
    const saveBtn = await page.$('#save-pet-name-btn');
    if (saveBtn) {
      await saveBtn.click();
      console.log('Clicked Save & Meet, waiting for transition to /my-numling...');
      await new Promise((r) => setTimeout(r, 1200));
    }
  }

  // 3. Verify on /my-numling screen
  console.log('Verifying /my-numling screen...');
  const currentUrl = page.url();
  const isOnMyNumling = currentUrl.includes('/my-numling');
  const petNameInPage = await page.evaluate(() => document.body.innerText.includes('Sparky'));
  results.tests.push({ name: 'Hatched pet saved and active', passed: isOnMyNumling && petNameInPage });

  // Check that eggPower reset to 0 after hatching
  const postHatchPower = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return raw ? JSON.parse(raw).state.eggPower : null;
  });
  results.tests.push({ name: 'Egg power resets to 0 after hatching', passed: postHatchPower === 0 });

  // Capture /my-numling screenshots at phone and desktop
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'my-numling-phone.png') });

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/my-numling`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'my-numling-desktop.png') });

  // 4. Test Persistence on Reload
  console.log('Verifying pet survives page refresh...');
  await page.reload({ waitUntil: 'networkidle0' });
  const stillHasSparky = await page.evaluate(() => document.body.innerText.includes('Sparky'));
  results.tests.push({ name: 'Pet survives refresh', passed: stillHasSparky });

  console.log('Phase 2 Test Results:', JSON.stringify(results, null, 2));
  await browser.close();
}

run().catch((err) => {
  console.error('Phase 2 test failed:', err);
  process.exit(1);
});
