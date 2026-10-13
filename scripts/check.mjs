// Browser smoke checks. Formspree is always intercepted; no real requests are sent.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const BASE = process.env.BASE || 'http://localhost:5173';
const FORMSPREE = /https:\/\/formspree\.io\//;
const browser = await chromium.launch();

async function newContext(width, reducedMotion = 'reduce') {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion, hasTouch: width <= 768 });
  await context.route(FORMSPREE, route => route.abort('blockedbyclient'));
  return context;
}

async function verifySelection(page, gallery, index) {
  await gallery.locator('.cover').nth(index).and(gallery.locator('.is-active')).waitFor();
  if (!await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)) await page.waitForTimeout(650);
  const id = await gallery.getAttribute('id');
  await page.waitForFunction(id => {
    const gallery = document.getElementById(id);
    const flow = gallery.querySelector('.flow').getBoundingClientRect();
    const cover = gallery.querySelector('.cover.is-active').getBoundingClientRect();
    return Math.abs((flow.left + flow.width / 2) - (cover.left + cover.width / 2)) < 3;
  }, id);
  const title = await gallery.locator('.cover').nth(index).locator('.cover-title').innerText();
  await page.waitForFunction(id => {
    const image = document.querySelector(`#${id} .cover.is-active img`);
    return image?.complete && image.naturalWidth > 0;
  }, id);
  assert.equal(await gallery.locator('.cover').nth(index).locator('img').evaluate(image => image.decode().then(() => image.naturalWidth > 0).catch(() => false)), true);
  assert.equal(await gallery.locator('.spread-title').innerText(), title);
  assert.equal(await gallery.locator('.cover.is-active video').evaluateAll(videos => videos.every(video => video.controls && !video.error)), true);
  assert.equal(await gallery.locator('.dots .dot').nth(index).getAttribute('aria-pressed'), 'true');
  assert.ok(await gallery.locator('.spread .spec-row').count(), `${title} has no visible specifications/features`);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), await page.evaluate(() => window.innerWidth), `Gallery overflows after selecting ${title}`);
}

async function clickSideCover(page, gallery, index) {
  const cover = gallery.locator('.cover').nth(index);
  const flow = await gallery.locator('.flow').boundingBox();
  const box = await cover.boundingBox();
  const left = Math.max(flow.x, box.x);
  const right = Math.min(flow.x + flow.width, box.x + box.width);
  assert.ok(right - left > 4, `Side cover ${index + 1} is not reachable`);
  await page.mouse.click((left + right) / 2, box.y + box.height / 4);
}

async function swipe(page, gallery, direction) {
  const box = await gallery.locator('.flow').boundingBox();
  const session = await page.context().newCDPSession(page);
  const x = box.x + box.width / 2;
  const y = box.y + Math.min(box.height / 3, 90);
  const distance = Math.min(box.width / 4, 110) * direction;
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x + distance, y }] });
  await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - distance, y }] });
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await session.detach();
}

async function checkGallery(page, gallery, width) {
  await gallery.locator('.flow').scrollIntoViewIfNeeded();
  const count = await gallery.locator('.cover').count();
  assert.ok(count > 1);
  assert.equal(await gallery.locator('.dots .dot').count(), count);
  await gallery.locator('.dots .dot').first().click();
  const specs = [];
  for (let index = 0; index < count; index++) {
    await verifySelection(page, gallery, index);
    specs.push(await gallery.locator('.spread .specs').innerText());
    await gallery.locator('.flow-arrow--next').click();
  }
  await verifySelection(page, gallery, 0);
  await gallery.locator('.flow-arrow--prev').click();
  await verifySelection(page, gallery, count - 1);
  for (let index = 0; index < count; index++) {
    await gallery.locator('.dots .dot').nth(index).click();
    await verifySelection(page, gallery, index);
    assert.equal(await gallery.locator('.spread .specs').innerText(), specs[index]);
  }
  await gallery.locator('.dots .dot').first().click();
  await verifySelection(page, gallery, 0);
  if (width >= 1024) {
    for (let index = 1; index < count; index++) {
      await clickSideCover(page, gallery, index);
      await verifySelection(page, gallery, index);
    }
    await gallery.locator('.cover').nth(count - 2).focus();
    await page.keyboard.press('Enter');
    await verifySelection(page, gallery, count - 2);
  }
  await gallery.locator('.dots .dot').first().click();
  await verifySelection(page, gallery, 0);
  await gallery.locator('.flow').focus();
  await page.keyboard.press('ArrowLeft');
  await verifySelection(page, gallery, count - 1);
  await page.keyboard.press('ArrowRight');
  await verifySelection(page, gallery, 0);
  await swipe(page, gallery, 1);
  await verifySelection(page, gallery, 1);
  await swipe(page, gallery, -1);
  await verifySelection(page, gallery, 0);
}

async function checkMotion() {
  const context = await newContext(1440, 'no-preference');
  const page = await context.newPage();
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  const gallery = page.locator('#software');
  const flow = gallery.locator('.flow');
  const count = await gallery.locator('.cover').count();
  await flow.scrollIntoViewIfNeeded();
  const waitPlaying = () => page.waitForFunction(() => {
    const videos = [...document.querySelectorAll('video')];
    const active = document.querySelector('#software .cover.is-active video');
    return active && !active.paused && videos.filter(video => !video.paused).length === 1;
  });
  await waitPlaying();
  await gallery.locator('.demo-toggle').click();
  await page.waitForFunction(() => [...document.querySelectorAll('video')].every(video => video.paused));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await flow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  assert.equal(await gallery.locator('.cover.is-active video').evaluate(video => video.paused), true);
  await gallery.locator('.dots .dot').nth(1).click();
  await waitPlaying();
  await verifySelection(page, gallery, 1);
  await gallery.locator('.dots .dot').first().click();
  await verifySelection(page, gallery, 0);
  assert.equal(await gallery.locator('.cover.is-active video').evaluate(video => video.paused), true);
  await gallery.locator('.demo-toggle').click();
  await waitPlaying();
  for (let index = 0; index < count; index++) {
    await gallery.locator('.dots .dot').nth(index).click();
    await verifySelection(page, gallery, index);
    await waitPlaying();
    for (const width of [390, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await flow.scrollIntoViewIfNeeded();
      await verifySelection(page, gallery, index);
    }
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForFunction(() => [...document.querySelectorAll('video')].every(video => video.paused));
  await flow.scrollIntoViewIfNeeded();
  await waitPlaying();
  assert.equal(await gallery.locator('.cover.is-active video').evaluateAll(videos => videos.every(video => video.controls && !video.error)), true);
  console.log('PASS normal motion: centered animations/resizes, one active demo, offscreen pause and preserved user pause');
  await context.close();
}

async function checkQuoteMotion() {
  const context = await newContext(1440, 'no-preference');
  const page = await context.newPage();
  await page.goto(`${BASE}/quote.html`, { waitUntil: 'networkidle' });
  const video = page.locator('.q-hero-video');
  const waitPlaying = () => page.waitForFunction(() => {
    const video = document.querySelector('.q-hero-video');
    return video && !video.paused && video.currentTime > 0;
  });
  const scrollAway = () => page.locator('#terms').evaluate(section => section.scrollIntoView({ behavior: 'instant' }));
  const scrollBack = () => page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await waitPlaying();
  assert.equal(await video.evaluate(video => video.controls && video.muted && !video.error), true);
  await scrollAway();
  await page.waitForFunction(() => document.querySelector('.q-hero-video').paused);
  await scrollBack();
  await waitPlaying();
  await video.evaluate(video => video.pause());
  await page.waitForTimeout(200);
  await scrollAway();
  await scrollBack();
  await page.waitForTimeout(400);
  assert.equal(await video.evaluate(video => video.paused), true);
  await video.evaluate(video => video.play());
  await waitPlaying();
  await scrollAway();
  await page.waitForFunction(() => document.querySelector('.q-hero-video').paused);
  await scrollBack();
  await waitPlaying();
  console.log('PASS quote hero: autoplay, offscreen pause, preserved user pause and native replay');
  await context.close();
}

async function checkMenu(page) {
  const toggle = page.locator('.nav-toggle');
  if (!await toggle.isVisible()) return;
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
  await page.locator('#mobile-navigation a[href$="#software"]').click();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
  await toggle.click();
  await page.locator('#mobile-navigation a').first().focus();
  await page.keyboard.press('Escape');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(await toggle.evaluate(element => element === document.activeElement), true);
}

async function checkAnchors(page) {
  const desktop = await page.locator('.nav-links').isVisible();
  for (const hash of ['about', 'builds', 'software', 'testimonials', 'contact']) {
    await page.goto(`${BASE}/quote.html`, { waitUntil: 'networkidle' });
    if (!desktop) await page.locator('.nav-toggle').click();
    await page.locator(desktop ? `.nav-links a[href$="#${hash}"]` : `#mobile-navigation a[href$="#${hash}"]`).click();
    await page.waitForURL(`**/index.html#${hash}`);
    await page.waitForLoadState('networkidle');
    const visible = await page.locator(`#${hash}`).evaluate(element => {
      const bounds = element.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 0;
    });
    assert.ok(visible, `Cross-page #${hash} did not scroll into view`);
  }
}

try {
  for (const width of [1440, 1024, 768, 390, 320]) {
    const context = await newContext(width);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    for (const path of ['index.html', 'quote.html']) {
      await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' });
      for (const image of await page.locator('img').all()) {
        if (await image.evaluate(image => !!image.closest('.cover'))) continue;
        await image.scrollIntoViewIfNeeded();
        assert.equal(await image.evaluate(image => image.decode().then(() => image.naturalWidth > 0).catch(() => false)), true);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, `${path} overflows ${width}px`);
      assert.equal(await page.locator('video').evaluateAll(videos => videos.every(video => video.paused && !video.autoplay && !video.error)), true);
      assert.equal(await page.locator('.cover.is-active video, .q-hero-video').evaluateAll(videos => videos.every(video => video.controls)), true);
      if (path === 'index.html') {
        for (const gallery of await page.locator('.viewer:has(.flow)').all()) await checkGallery(page, gallery, width);
        assert.equal(await page.locator('.cover.is-active img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), true);
        await checkMenu(page);
        assert.equal(await page.locator('video').evaluateAll(videos => videos.every(video => video.paused)), true);
      }
    }
    if ([1440, 390].includes(width)) await checkAnchors(page);
    assert.deepEqual(errors, [], `Browser errors at ${width}px`);
    console.log(`PASS responsive layout, revolving galleries, paused media and navigation: ${width}px`);
    await context.close();
  }

  await checkMotion();
  await checkQuoteMotion();

  for (const mode of ['success', '400', 'network']) {
    const context = await newContext(390);
    const page = await context.newPage();
    let requests = 0;
    let payload;
    await page.route(FORMSPREE, async route => {
      requests++;
      payload = Object.fromEntries([...route.request().postDataBuffer().toString().matchAll(/name="([^"]+)"\r\n\r\n([\s\S]*?)(?=\r\n--)/g)].map(match => [match[1], match[2]]));
      await new Promise(resolve => setTimeout(resolve, 300));
      if (mode === 'network') await route.abort('failed');
      else await route.fulfill({ status: mode === 'success' ? 200 : 400, contentType: 'application/json', body: JSON.stringify(mode === 'success' ? { ok: true } : { errors: [{ message: 'Mock validation error.' }] }) });
    });
    await page.goto(`${BASE}/quote.html`, { waitUntil: 'networkidle' });
    await page.locator('input[name="name"]').fill('Browser QA');
    await page.locator('input[name="email"]').fill('qa@example.com');
    await page.locator('input[name="location"]').fill('Lethbridge');
    await page.locator('textarea[name="message"]').fill('Mocked request, never sent.');
    const service = page.locator('input[name="serviceChoice"]').nth(1);
    await service.check();
    const serviceName = await service.locator('..').innerText();
    const useCase = page.locator('input[name="useCaseChoice"]').first();
    await useCase.check();
    const useCaseName = await useCase.inputValue();
    await page.locator('select[name="budget"]').selectOption({ index: 1 });
    const budget = await page.locator('select[name="budget"]').inputValue();
    await page.locator('button[type="submit"]').click();
    await page.waitForFunction(() => document.querySelector('form')?.getAttribute('aria-busy') === 'true');
    assert.equal(await page.locator('fieldset.q-fieldset').evaluateAll(fields => fields.every(field => field.disabled)), true);
    if (mode === 'success') {
      await page.locator('.q-confirm').waitFor();
      assert.equal(await page.locator('.q-confirm h2').evaluate(heading => heading === document.activeElement), true);
      assert.ok((await page.locator('.q-confirm').innerText()).includes('qa@example.com'));
    } else {
      const fallback = page.locator('.q-form-status a');
      await fallback.waitFor();
      const href = new URL(await fallback.getAttribute('href'));
      assert.equal(href.protocol, 'mailto:');
      assert.ok(href.searchParams.get('body').includes('Mocked request, never sent.'));
      assert.equal(await page.locator('input[name="name"]').inputValue(), 'Browser QA');
      assert.equal(await page.locator('button[type="submit"]').isEnabled(), true);
      assert.equal(await page.locator('.q-confirm').count(), 0);
    }
    assert.equal(requests, 1);
    assert.equal(payload.name, 'Browser QA');
    assert.equal(payload.email, 'qa@example.com');
    assert.equal(payload.service, serviceName);
    assert.equal(payload.useCases, useCaseName);
    assert.equal(payload.budget, budget);
    assert.match(payload.reference, /^QT-\d{2}-[A-Z0-9]{4}$/);
    console.log(`PASS mocked form submission: ${mode}`);
    await context.close();
  }
} finally {
  await browser.close();
}
