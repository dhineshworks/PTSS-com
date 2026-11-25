import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/home');
  const el = await page.$('[data-testid="dev-trigger"]');
  const box = await el.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await new Promise((r) => setTimeout(r, 700));
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 300));
  const text = await page.evaluate(() => document.body.innerText);
  console.log('Dev modal visible:', text.includes('Secret Dev Mode'));
  if (text.includes('Secret Dev Mode')) {
    await page.screenshot({ path: 'screenshots/phase1/dev-mode-modal.png' });
    console.log('Captured dev-mode-modal.png');
  }
  await browser.close();
}
test().catch(console.error);
