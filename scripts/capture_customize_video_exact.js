import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve('screenshots/phase3');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Setup state with active pet "Woolzy" (blue) or "Mango"
  await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    const data = raw ? JSON.parse(raw) : { state: {} };
    data.state.coins = 40;
    data.state.pets = [
      { id: 'pet-1', name: 'Woolzy', type: 'mango', hatchedAt: '2026-11-24' },
    ];
    data.state.activePetId = 'pet-1';
    data.state.equippedItems = {
      'pet-1': { colorTint: 'blue', hat: 'hat-party', accessory: 'sunglasses' },
    };
    localStorage.setItem('numling-jungle-storage', JSON.stringify(data));
  });

  // 1. Capture 5x8 Grid at 1280px Desktop
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/wardrobe`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'customize-grid-desktop.png') });

  // 2. Capture 5x8 Grid at 390px Phone
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/wardrobe`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'customize-grid-phone.png') });

  // 3. Switch to Outfits Shelf Tab
  const shelfTab = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find((x) => x.textContent?.includes('Treehouse Outfits'));
    if (b) {
      b.click();
      return true;
    }
    return false;
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'customize-shelf-phone.png') });

  console.log('Captured customize-grid-desktop, customize-grid-phone, customize-shelf-phone!');
  await browser.close();
}

run().catch(console.error);
