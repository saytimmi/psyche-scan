import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'http://localhost:3099';
const output = process.argv[3] || '/tmp/psyche-landing.png';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox', '--window-size=1440,900'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

// Scroll through entire page to trigger whileInView animations
const totalHeight = await page.evaluate(() => document.body.scrollHeight);
const step = 300;
for (let pos = 0; pos < totalHeight; pos += step) {
  await page.evaluate((y) => window.scrollTo(0, y), pos);
  await new Promise(r => setTimeout(r, 100));
}
// Scroll back to top
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 1000));

// Full page screenshot
await page.screenshot({ path: output, fullPage: true });
console.log(`Screenshot saved: ${output} (${totalHeight}px tall)`);

await browser.close();
