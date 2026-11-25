const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';
const ARTIFACT_DIR = 'C:\\Users\\DHINESH\\.gemini\\antigravity\\brain\\1442fb33-3bb8-4460-9594-95acdb4b6dde';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots', 'youtube_stories');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

function saveScreenshot(filename, buffer) {
  fs.writeFileSync(path.join(SCREENSHOT_DIR, filename), buffer);
  fs.writeFileSync(path.join(ARTIFACT_DIR, filename), buffer);
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  console.log('=== STARTING YOUTUBE KIDS STORIES VERIFICATION ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();
  const results = {
    stories_grid_has_youtube_badges: false,
    story_player_renders_youtube_iframe: false,
    youtube_completion_grants_power: false,
    quiz_works_after_youtube_watch: false,
    mobile_responsive: false,
  };

  try {
    // 1. Setup initial state: 10 coins, 20 eggPower, clean watched list
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      const raw = localStorage.getItem('numling-jungle-storage');
      const data = raw ? JSON.parse(raw) : { state: {} };
      data.state.coins = 10;
      data.state.eggPower = 20;
      data.state.watchedStoriesToday = [];
      data.state.lastStoryWatchedDate = null;
      localStorage.setItem('numling-jungle-storage', JSON.stringify(data));
    });

    // 2. Visit /stories
    await page.goto(`${BASE_URL}/stories`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    // Verify YouTube badge
    const badgeCount = await page.$$eval('span', (spans) =>
      spans.filter((s) => s.textContent && s.textContent.includes('YouTube')).length
    );
    console.log(`Found ${badgeCount} YouTube badges on Stories grid.`);
    results.stories_grid_has_youtube_badges = badgeCount >= 1;

    const shot1 = await page.screenshot();
    saveScreenshot('01_youtube_stories_grid.png', shot1);

    // 3. Open story-1 (The Mystery of the Coconut Tree)
    await page.click('[data-testid="story-card-story-1"]');
    await new Promise((r) => setTimeout(r, 1500));

    const currentUrl = page.url();
    console.log('Opened story URL:', currentUrl);

    // Verify YouTube iframe rendered
    const ytIframe = await page.$('[data-testid="story-youtube-player"]');
    const iframeSrc = ytIframe ? await ytIframe.evaluate((el) => el.getAttribute('src')) : '';
    console.log('YouTube iframe src:', iframeSrc);
    results.story_player_renders_youtube_iframe = iframeSrc.includes('youtube-nocookie.com/embed/Ots_roOw4Pg');

    const shot2 = await page.screenshot();
    saveScreenshot('02_youtube_player_desktop.png', shot2);

    // 4. Trigger completion via finish button
    const powerBefore = await page.evaluate(() => {
      const raw = localStorage.getItem('numling-jungle-storage');
      return JSON.parse(raw).state.eggPower;
    });
    console.log(`Egg power before watch: ${powerBefore}%`);

    await page.waitForSelector('[data-testid="finish-youtube-story-btn"]');
    await page.click('[data-testid="finish-youtube-story-btn"]');
    await new Promise((r) => setTimeout(r, 1200));

    // Check modal & power
    const powerAfter = await page.evaluate(() => {
      const raw = localStorage.getItem('numling-jungle-storage');
      return JSON.parse(raw).state.eggPower;
    });
    console.log(`Egg power after watch: ${powerAfter}%`);
    results.youtube_completion_grants_power = powerAfter === powerBefore + 20;

    const shot3 = await page.screenshot();
    saveScreenshot('03_youtube_completion_modal.png', shot3);

    // 5. Answer quiz
    const coinsBefore = await page.evaluate(() => {
      const raw = localStorage.getItem('numling-jungle-storage');
      return JSON.parse(raw).state.coins;
    });

    await page.waitForSelector('[data-testid="quiz-option-0"]');
    await page.click('[data-testid="quiz-option-0"]');
    await new Promise((r) => setTimeout(r, 800));

    const coinsAfter = await page.evaluate(() => {
      const raw = localStorage.getItem('numling-jungle-storage');
      return JSON.parse(raw).state.coins;
    });
    console.log(`Coins before: ${coinsBefore}, Coins after: ${coinsAfter}`);
    results.quiz_works_after_youtube_watch = coinsAfter === coinsBefore + 1;

    // 6. Test mobile 390x844 responsiveness
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/story/story-2`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1200));

    const isMobileOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    results.mobile_responsive = !isMobileOverflow;
    console.log(`Mobile horizontal overflow on story player: ${isMobileOverflow}`);

    const shot4 = await page.screenshot();
    saveScreenshot('04_youtube_player_mobile.png', shot4);

    console.log('\n=== YOUTUBE KIDS STORIES VERIFICATION REPORT ===');
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }
}

run();
