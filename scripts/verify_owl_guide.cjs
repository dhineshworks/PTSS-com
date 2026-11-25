const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';
const ARTIFACT_DIR = 'C:\\Users\\DHINESH\\.gemini\\antigravity\\brain\\1442fb33-3bb8-4460-9594-95acdb4b6dde';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots', 'owl_guide');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

function saveScreenshot(filename, buffer) {
  fs.writeFileSync(path.join(SCREENSHOT_DIR, filename), buffer);
  fs.writeFileSync(path.join(ARTIFACT_DIR, filename), buffer);
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  console.log('=== STARTING PROFESSOR OWL GUIDE VERIFICATION ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();
  const report = {
    step1_build: true,
    step2_clear_lands_on_how_to_play: false,
    step3_owl_5_steps: [],
    step4_finish_lands_on_home: false,
    step5_help_btn_replays_intro: false,
    step6_play_cheer_vs_sad: { cheer: false, sad: false, coinFlying: false },
    step7_mobile_375px_no_overflow: false,
  };

  try {
    // ------------------------------------------------------------------
    // STEP 2: Clear localStorage, reload /welcome, click "Let's Go!" -> /how-to-play
    // ------------------------------------------------------------------
    console.log('\n--- Checking Step 2: First-time user landing on /how-to-play ---');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/welcome`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto(`${BASE_URL}/welcome`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    // Click "Let's Go!"
    await page.waitForSelector('[data-testid="welcome-start-btn"]');
    await page.click('[data-testid="welcome-start-btn"]');
    await new Promise((r) => setTimeout(r, 800));

    const currentUrlAfterWelcome = page.url();
    console.log('URL after clicking Let\'s Go with clean storage:', currentUrlAfterWelcome);
    report.step2_clear_lands_on_how_to_play = currentUrlAfterWelcome.includes('/how-to-play');

    // ------------------------------------------------------------------
    // STEP 3: Confirm the owl slides in, bobs, and bubble text changes on each Next (5 steps)
    // ------------------------------------------------------------------
    console.log('\n--- Checking Step 3: 5 Intro steps with OwlGuide and moods ---');
    for (let stepIndex = 0; stepIndex < 5; stepIndex++) {
      await page.waitForSelector('[data-testid="owl-guide"]');
      const mood = await page.$eval('[data-testid="owl-guide"]', (el) => el.getAttribute('data-mood'));
      const text = await page.$eval('[data-testid="owl-bubble"]', (el) => el.textContent.trim());

      console.log(`Step ${stepIndex + 1}: mood=${mood}, text="${text}"`);
      report.step3_owl_5_steps.push({ step: stepIndex + 1, mood, text });

      // Save screenshot for Step 3 specifically (as requested by user)
      if (stepIndex === 2) { // Step 3 (0-indexed: 2)
        const shot = await page.screenshot();
        saveScreenshot('01_how_to_play_step_3.png', shot);
      }

      // Click Next if not on last step
      if (stepIndex < 4) {
        await page.click('[data-testid="intro-next-btn"]');
        await new Promise((r) => setTimeout(r, 700));
      }
    }

    // ------------------------------------------------------------------
    // STEP 4: Finish the intro, reload /welcome, click "Let's Go!" -> confirm /home
    // ------------------------------------------------------------------
    console.log('\n--- Checking Step 4: Finish intro and verify direct /home routing ---');
    // On step 5, clicking the button completes the intro
    await page.click('[data-testid="intro-next-btn"]');
    await new Promise((r) => setTimeout(r, 1000));

    const urlAfterIntro = page.url();
    console.log('URL after completing intro:', urlAfterIntro);

    // Verify localStorage has hasSeenIntro: true
    const hasSeenIntroStored = await page.evaluate(() => {
      const raw = localStorage.getItem('numling-jungle-storage');
      if (!raw) return false;
      const data = JSON.parse(raw);
      return data.state && data.state.hasSeenIntro === true;
    });
    console.log('LocalStorage hasSeenIntro:', hasSeenIntroStored);

    // Now reload /welcome and click "Let's Go!"
    await page.goto(`${BASE_URL}/welcome`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));
    await page.waitForSelector('[data-testid="welcome-start-btn"]');
    await page.click('[data-testid="welcome-start-btn"]');
    await new Promise((r) => setTimeout(r, 800));

    const urlSecondTime = page.url();
    console.log('URL after returning to welcome and clicking Let\'s Go:', urlSecondTime);
    report.step4_finish_lands_on_home = urlSecondTime.includes('/home') && hasSeenIntroStored;

    // ------------------------------------------------------------------
    // STEP 5: Click "?" on Home and confirm intro replays
    // ------------------------------------------------------------------
    console.log('\n--- Checking Step 5: Help "?" button replays intro ---');
    await page.waitForSelector('[data-testid="how-to-play-help-btn"]');
    await page.click('[data-testid="how-to-play-help-btn"]');
    await new Promise((r) => setTimeout(r, 800));

    const urlHelpReplay = page.url();
    console.log('URL after clicking ? help button:', urlHelpReplay);
    report.step5_help_btn_replays_intro = urlHelpReplay.includes('/how-to-play');

    // ------------------------------------------------------------------
    // STEP 6: In /play, answer one correctly and one wrongly, verify cheer vs sad
    // ------------------------------------------------------------------
    console.log('\n--- Checking Step 6: PlayScreen cheer vs sad reactions ---');
    await page.goto(`${BASE_URL}/play?level=1`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1000));

    // Question 1: trigger wrong answer
    await page.waitForSelector('[data-testid="question-card"]');
    const correctAnswer = await page.$eval('[data-testid="question-card"]', (el) =>
      parseInt(el.getAttribute('data-correct-answer'), 10)
    );

    // Find wrong option button
    const buttons = await page.$$('[data-testid^="answer-btn-"]');
    let wrongBtn = null;
    let correctBtn = null;

    for (const btn of buttons) {
      const val = await btn.evaluate((el) => parseInt(el.getAttribute('data-option'), 10));
      if (val === correctAnswer) {
        correctBtn = btn;
      } else if (!wrongBtn) {
        wrongBtn = btn;
      }
    }

    // Click wrong button
    console.log('Clicking wrong answer button...');
    await wrongBtn.click();
    await new Promise((r) => setTimeout(r, 350));

    // Check sad reaction
    const sadMood = await page.$eval('[data-testid="owl-guide"]', (el) => el.getAttribute('data-mood'));
    const sadText = await page.$eval('[data-testid="owl-bubble"]', (el) => el.textContent.trim());
    console.log(`Wrong answer reaction: mood=${sadMood}, text="${sadText}"`);
    report.step6_play_cheer_vs_sad.sad = sadMood === 'sad' && sadText.includes('Try again');

    const sadShot = await page.screenshot();
    saveScreenshot('02_play_sad_reaction.png', sadShot);

    // Wait for shake/reaction reset
    await new Promise((r) => setTimeout(r, 1100));

    // Now click correct button
    console.log('Clicking correct answer button...');
    await correctBtn.click();
    await new Promise((r) => setTimeout(r, 350));

    // Check cheer reaction
    const cheerMood = await page.$eval('[data-testid="owl-guide"]', (el) => el.getAttribute('data-mood'));
    const cheerText = await page.$eval('[data-testid="owl-bubble"]', (el) => el.textContent.trim());
    console.log(`Correct answer reaction: mood=${cheerMood}, text="${cheerText}"`);
    report.step6_play_cheer_vs_sad.cheer = cheerMood === 'cheer';

    // Check flying coin existence
    const flyingCoinEl = await page.$('[data-testid="flying-coin"]');
    report.step6_play_cheer_vs_sad.coinFlying = flyingCoinEl !== null;
    console.log('Flying coin element rendered:', report.step6_play_cheer_vs_sad.coinFlying);

    const cheerShot = await page.screenshot();
    saveScreenshot('03_play_cheer_reaction.png', cheerShot);

    // ------------------------------------------------------------------
    // STEP 7: Check at 375px width that owl and bubble don't overflow
    // ------------------------------------------------------------------
    console.log('\n--- Checking Step 7: Mobile 375px viewport responsiveness ---');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/how-to-play`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    const introOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    const introMobileShot = await page.screenshot();
    saveScreenshot('04_how_to_play_mobile_375px.png', introMobileShot);

    await page.goto(`${BASE_URL}/play?level=1`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    const playOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    const playMobileShot = await page.screenshot();
    saveScreenshot('05_play_mobile_375px.png', playMobileShot);

    report.step7_mobile_375px_no_overflow = !introOverflow && !playOverflow;
    console.log(`Mobile 375px horizontal overflow: intro=${introOverflow}, play=${playOverflow}`);

    console.log('\n=== FINAL VERIFICATION REPORT SUMMARY ===');
    console.log(JSON.stringify(report, null, 2));

  } catch (err) {
    console.error('Verification encountered an error:', err);
  } finally {
    await browser.close();
  }
}

run();
