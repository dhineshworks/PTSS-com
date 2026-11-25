const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots', 'phase4');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('=== RUNNING PHASE 4: SUPER BRAIN STORIES VERIFICATION ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();
  const results = { checks: [] };

  // Setup initial clean state for tests
  await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    const data = raw ? JSON.parse(raw) : { state: {} };
    data.state.coins = 20;
    data.state.eggPower = 30;
    data.state.watchedStoriesToday = [];
    data.state.lastStoryWatchedDate = null;
    localStorage.setItem('numling-jungle-storage', JSON.stringify(data));
  });

  // 1. Visit /stories at Desktop 1280x800
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/stories`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_stories_desktop_1280.png') });
  console.log('Saved 01_stories_desktop_1280.png');

  // Verify 5 story cards exist
  const cardCount = await page.$$eval('[data-testid^="story-card-"]', (els) => els.length);
  console.log(`Found ${cardCount} story cards.`);
  results.checks.push({ name: '5 Story Cards Rendered', passed: cardCount === 5 });

  // 2. Visit /stories at Mobile 390x844
  await page.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_stories_mobile_390.png') });
  console.log('Saved 02_stories_mobile_390.png');

  // 3. Click story-1 to open player
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/stories`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  const firstCard = await page.$('[data-testid="story-card-story-1"]');
  if (firstCard) {
    await firstCard.click();
    await new Promise((r) => setTimeout(r, 1200));
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_story_player_initial.png') });
  console.log('Saved 03_story_player_initial.png');

  // 4. Test Skip vs Natural End:
  // Check power before:
  const powerBefore = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return JSON.parse(raw).state.eggPower;
  });
  console.log(`Egg power before watch: ${powerBefore}%`);

  // Fast forward video to end to simulate full watch completion
  await page.evaluate(() => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = video.duration - 0.2;
      video.play();
    }
  });

  // Wait for onEnded event and modal
  await new Promise((r) => setTimeout(r, 1800));

  // Check power after full watch:
  const powerAfter = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return JSON.parse(raw).state.eggPower;
  });
  console.log(`Egg power after full watch: ${powerAfter}%`);
  results.checks.push({
    name: 'Full Watch Grants +20 Egg Power',
    passed: powerAfter === powerBefore + 20,
    before: powerBefore,
    after: powerAfter,
  });

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_story_completion_modal.png') });
  console.log('Saved 04_story_completion_modal.png');

  // 5. Test Quiz:
  // First click wrong option (option 1 is wrong for story-1, correct is 0)
  const coinsBefore = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return JSON.parse(raw).state.coins;
  });

  const wrongOption = await page.$('[data-testid="quiz-option-1"]');
  if (wrongOption) {
    await wrongOption.click();
    console.log('Clicked wrong quiz option');
    await new Promise((r) => setTimeout(r, 700));
  }

  const coinsAfterWrong = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return JSON.parse(raw).state.coins;
  });
  results.checks.push({
    name: 'Wrong Quiz Answer Has No Penalty',
    passed: coinsAfterWrong === coinsBefore,
  });

  // Now click correct option (option 0)
  const correctOption = await page.$('[data-testid="quiz-option-0"]');
  if (correctOption) {
    await correctOption.click();
    console.log('Clicked correct quiz option');
    await new Promise((r) => setTimeout(r, 800));
  }

  const coinsAfterCorrect = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return JSON.parse(raw).state.coins;
  });
  console.log(`Coins before: ${coinsBefore}, Coins after correct quiz: ${coinsAfterCorrect}`);
  results.checks.push({
    name: 'Correct Quiz Answer Grants +1 Coin',
    passed: coinsAfterCorrect === coinsBefore + 1,
  });

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_story_quiz_success.png') });
  console.log('Saved 05_story_quiz_success.png');

  // 6. Test Daily Limit:
  // Revisit story-1 on the same day and complete it again
  await page.goto(`${BASE_URL}/story/story-1`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));

  await page.evaluate(() => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = video.duration - 0.2;
      video.play();
    }
  });
  await new Promise((r) => setTimeout(r, 1800));

  const powerAfterReplay = await page.evaluate(() => {
    const raw = localStorage.getItem('numling-jungle-storage');
    return JSON.parse(raw).state.eggPower;
  });
  console.log(`Power after replay on same day: ${powerAfterReplay}% (should remain ${powerAfter}%)`);
  results.checks.push({
    name: 'Daily Limit Enforced (No duplicate reward on same day)',
    passed: powerAfterReplay === powerAfter,
  });

  // Revisit /stories to verify "Watched Today! ⭐"
  await page.goto(`${BASE_URL}/stories`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_stories_grid_after_watch.png') });
  console.log('Saved 06_stories_grid_after_watch.png');

  await browser.close();

  console.log('\n--- PHASE 4 SUMMARY RESULTS ---');
  console.table(results.checks);

  const allPassed = results.checks.every((c) => c.passed);
  if (!allPassed) {
    console.error('Some checks failed!');
    process.exit(1);
  }
  console.log('ALL PHASE 4 CHECKS PASSED PERFECTLY!');
}

run().catch((err) => {
  console.error('Phase 4 verification error:', err);
  process.exit(1);
});
