// Quick visual-verification helper. Captures full-page + viewport screenshots
// of both pages at desktop and mobile widths.
//   node scripts/shoot.mjs [tag]
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const tag = process.argv[2] || 'shot';
const BASE = process.env.BASE || 'http://localhost:5173';
const outDir = `scripts/shots`;
mkdirSync(outDir, { recursive: true });

const targets = [
  { name: 'home', url: `${BASE}/index.html` },
  { name: 'quote', url: `${BASE}/quote.html` },
];
const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: !!vp.isMobile,
    hasTouch: !!vp.isMobile,
  });
  const page = await ctx.newPage();
  for (const t of targets) {
    await page.goto(t.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000); // let the hero cascade play
    const base = `${outDir}/${tag}-${t.name}-${vp.name}`;
    // Above-the-fold capture (hero in its revealed state)
    await page.screenshot({ path: `${base}.png` });
    // Scroll through in viewport steps to trip every one-shot scroll-reveal,
    // then return to top so the full-page capture shows everything revealed.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 180));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 700));
    });
    await page.screenshot({ path: `${base}-full.png`, fullPage: true });
    console.log(`shot ${base}`);
  }
  await ctx.close();
}
await browser.close();
console.log('done');
