// Verifies every reveal target ends up visible after a scroll pass, and reports
// any element still stuck at opacity 0 (which would mean trapped content).
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:5173';
const browser = await chromium.launch();
for (const url of [`${BASE}/index.html`, `${BASE}/quote.html`]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const max = () => document.documentElement.scrollHeight - window.innerHeight;
    let y = 0;
    while (y < max()) {
      y = Math.min(y + Math.round(window.innerHeight * 0.6), max());
      window.scrollTo(0, y);
      await sleep(220);
    }
    window.scrollTo(0, max());
    await sleep(600);
    window.scrollTo(0, 0);
    await sleep(500);
  });
  const report = await page.evaluate(() => {
    const targets = Array.from(
      document.querySelectorAll('[data-reveal], [data-reveal-stagger]')
    );
    const hidden = [];
    for (const el of targets) {
      const o = parseFloat(getComputedStyle(el).opacity);
      if (o < 0.95) {
        hidden.push(
          (el.className || el.tagName) + ' opacity=' + o.toFixed(2)
        );
      }
    }
    return { total: targets.length, hidden };
  });
  console.log(`\n${url}`);
  console.log(`  reveal targets: ${report.total}`);
  console.log(
    report.hidden.length
      ? `  STILL HIDDEN:\n    ${report.hidden.join('\n    ')}`
      : `  all revealed ✓`
  );
  await page.close();
}
await browser.close();
