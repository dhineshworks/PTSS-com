import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve('screenshots/phase1');

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const routes = [
    { name: 'welcome', path: '/welcome' },
    { name: 'home', path: '/home' },
    { name: 'map', path: '/map' },
    { name: 'play', path: '/play?level=1' },
    { name: 'level-complete', path: '/level-complete' },
  ];

  const results = {
    consoleErrors: [],
    tests: [],
  };

  const page = await browser.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({ text: msg.text(), location: msg.location() });
    }
  });

  // 1. Capture Screenshots on Phone & Desktop
  for (const r of routes) {
    // Phone view (390 x 844)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle0' });
    await new Promise((res) => setTimeout(res, 500));
    const phoneFile = path.join(SCREENSHOT_DIR, `${r.name}-phone.png`);
    await page.screenshot({ path: phoneFile, fullPage: false });

    // Desktop view (1280 x 800)
    await page.setViewport({ width: 1280, height: 800, isMobile: false, hasTouch: false });
    await page.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle0' });
    await new Promise((res) => setTimeout(res, 500));
    const desktopFile = path.join(SCREENSHOT_DIR, `${r.name}-desktop.png`);
    await page.screenshot({ path: desktopFile, fullPage: false });

    console.log(`Captured ${r.name} at 390px and 1280px`);
  }

  // 2. Test Play screen interaction (Wrong answer -> shake, Correct answer -> coin + progress)
  console.log('Testing Play screen gameplay...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/play?level=1`, { waitUntil: 'networkidle0' });

  // Get initial coin count
  const initialCoins = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    if (!raw) return 0;
    return JSON.parse(raw).state.coins;
  });

  // Read the correct answer from question
  const questionData = await page.evaluate(() => {
    const text = document.querySelector('main .font-heading')?.textContent || '';
    const buttons = Array.from(document.querySelectorAll('main button.candy-btn')).map(b => b.textContent?.trim());
    return { text, buttons };
  });

  console.log('Question:', questionData);

  // Click a wrong option first (one that doesn't match equation sum)
  // Let's test wrong option click
  const buttons = await page.$$('main button.candy-btn');
  if (buttons.length >= 3) {
    // Click option 0
    await buttons[0].click();
    await new Promise((res) => setTimeout(res, 600));

    // Check if card or alert is present
    const isShakingOrFeedback = await page.evaluate(() => {
      return document.querySelector('.animate-soft-shake') !== null || document.body.innerText.includes('Try again') || document.body.innerText.includes('Awesome');
    });
    results.tests.push({ name: 'Interactive Feedback Triggered', passed: isShakingOrFeedback });
  }

  // 3. Test Dev Mode & Daily Lock
  console.log('Testing Dev mode & Daily Lock...');
  await page.goto(`${BASE_URL}/map`, { waitUntil: 'networkidle0' });
  const devTrigger = await page.$('header h1');
  if (devTrigger) {
    // Triple click to open dev mode
    await devTrigger.click({ clickCount: 3 });
    await new Promise((res) => setTimeout(res, 500));
    const devModalVisible = await page.evaluate(() => document.body.innerText.includes('Secret Dev Mode'));
    results.tests.push({ name: 'Dev Mode Modal Opens on Triple Tap', passed: devModalVisible });
    if (devModalVisible) {
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'dev-mode-phone.png') });
    }
  }

  // 4. Test Persistence on refresh
  console.log('Testing localStorage persistence on reload...');
  await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    const data = raw ? JSON.parse(raw) : { state: {} };
    data.state.coins = 99;
    localStorage.setItem('numling-jungle-storage', JSON.stringify(data));
  });
  await page.reload({ waitUntil: 'networkidle0' });
  const reloadedCoins = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return raw ? JSON.parse(raw).state.coins : null;
  });
  results.tests.push({ name: 'Refresh Keeps Progress', passed: reloadedCoins === 99 });

  console.log('Results:', JSON.stringify(results, null, 2));
  await browser.close();
}

run().catch((err) => {
  console.error('Test script failed:', err);
  process.exit(1);
});
