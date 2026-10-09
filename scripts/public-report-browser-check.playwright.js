// Run with the existing named Playwright CLI session. All checks are read-only;
// QA telemetry is intercepted so these page visits cannot become real leads.
async page => {
  const origin = new URL(page.url()).origin;
  const local = /127\.0\.0\.1|localhost/.test(origin);
  const widths = local ? [320, 360, 375, 390, 430, 768, 1024, 1280, 1440] : [320, 390, 1440];
  const routes = ['', 'about/', 'privacy/', 'services/', 'methodology/'];
  const errors = [];
  const results = [];
  const screenshots = [];
  const onError = error => errors.push(error.message);
  const telemetry = route => route.fulfill({ status: 204, body: '' });
  page.on('pageerror', onError);
  await page.context().setExtraHTTPHeaders({ DNT: '1' });
  await page.route('**/api/analytics', telemetry);
  await page.route('**/api/client-errors', telemetry);
  try {
    for (const locale of ['zh-tw', 'zh-cn', 'en']) {
      for (const width of locale === 'en' ? [320, 390, 1440] : widths) {
        await page.setViewportSize({ width, height: 950 });
        for (const route of routes) {
          const response = await page.goto(`${origin}/${locale === 'en' ? '' : locale + '/'}${route}?zimonai_qa=1`, { waitUntil: 'load' });
          if (response.status() !== 200) throw Error(`${locale}/${route}: HTTP ${response.status()}`);
          await page.evaluate(async () => {
            await document.fonts.ready;
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          });
          const regions = route === 'about/' ? ['.operating-locations', '.office-evidence']
            : route === 'privacy/' ? ['.legal-document__rail'] : ['.report-artifact'];
          for (const selector of regions) {
            const region = page.locator(selector).first();
            await region.scrollIntoViewIfNeeded();
            await page.evaluate(async () => {
              await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            });
            const layout = await region.evaluate(root => {
              const problems = [];
              for (const node of root.querySelectorAll('.cjk-keep')) {
                const own = getComputedStyle(node), parent = getComputedStyle(node.parentElement);
                // A single whole label is a valid flex item; only unintended
                // block words inside normal flowing copy recreate the office bug.
                const wholeControlLabel = parent.display.includes('flex') && node.parentElement.children.length === 1;
                if (own.display === 'block' && !wholeControlLabel) problems.push(`block word: ${node.textContent}`);
                for (const property of ['fontSize', 'fontFamily', 'fontWeight', 'color', 'lineHeight']) {
                  if (own[property] !== parent[property]) problems.push(`style drift ${property}: ${node.textContent}`);
                }
                if (new Set([...node.getClientRects()].map(rect => Math.round(rect.top))).size > 1) problems.push(`split word: ${node.textContent}`);
                const box = node.getBoundingClientRect();
                if (box.left < -1 || box.right > innerWidth + 1) problems.push(`word outside viewport: ${node.textContent}`);
              }
              for (const node of root.querySelectorAll('p, h2, h3, strong, a, figcaption')) {
                if (node.clientWidth && node.scrollWidth > node.clientWidth + 1) problems.push(`clipped text: ${node.textContent.slice(0, 50)}`);
              }
              return { problems, words: root.querySelectorAll('.cjk-keep').length };
            });
            if (layout.problems.length) throw Error(`${locale}/${route} ${width}px ${selector}: ${layout.problems.join('; ')}`);
            if ([390, 1440].includes(width)) {
              await region.evaluate(async root => {
                await Promise.all([...root.querySelectorAll('img')].map(async image => {
                  image.loading = 'eager';
                  if (!image.complete) await new Promise(resolve => { image.onload = resolve; image.onerror = resolve; });
                  try { await image.decode(); } catch {}
                }));
                // Trigger the actual below-fold reveal observers before capturing
                // the whole section; do not mistake an animation for clipping.
                for (const child of root.querySelectorAll('.reveal')) {
                  child.scrollIntoView({ behavior: 'instant', block: 'center' });
                  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
                }
                await Promise.all(root.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {})));
              });
              const filename = `output/playwright/report-publication-${local ? 'local' : 'production'}/${locale}-${route.replace('/', '') || 'home'}-${width}-${selector.slice(1)}.png`;
              await region.screenshot({ path: filename });
              screenshots.push(filename);
            }
          }
          if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) throw Error(`${locale}/${route} ${width}px: horizontal overflow`);
          if (route === 'privacy/' && await page.locator('.legal-document__rail > h2').count()) throw Error('Privacy heading reappeared');
          if (route === 'about/') {
            const roles = await page.locator('.operating-location > div > span').allTextContents();
            if (roles.length !== 2) throw Error('Office role structure changed');
          } else if (route !== 'privacy/') {
            const links = page.locator('.report-artifact__actions a');
            if (await links.count() !== 2) throw Error('Report actions missing');
            for (const link of await links.all()) {
              const href = await link.getAttribute('href');
              if (new URL(href, origin).pathname !== '/assets/zimonai-public-sample-report.pdf') throw Error('Report link is not the approved public PDF');
            }
            if (await page.locator('[data-report-cover], .material-gap').count()) throw Error('Old cover-only restriction reappeared');
          }
          results.push({ locale, route: route || '/', width, status: response.status() });
        }
      }
    }
    const pdf = await page.context().request.get(`${origin}/assets/zimonai-public-sample-report.pdf`);
    const body = await pdf.body();
    if (pdf.status() !== 200 || !pdf.headers()['content-type']?.includes('application/pdf') || body.subarray(0, 5).toString() !== '%PDF-') throw Error('Public PDF unavailable or invalid');
    await page.goto(`${origin}/zh-tw/services/?zimonai_qa=1`);
    const downloading = page.waitForEvent('download');
    await page.locator('.report-artifact a[download]').click();
    const download = await downloading;
    if (await download.failure()) throw Error('PDF download failed');
    if (download.suggestedFilename() !== 'ZimonAI-public-report-sample.pdf') throw Error('Incorrect download filename');
    if (errors.length) throw Error(`Browser errors: ${errors.join('; ')}`);
    return { passed: results.length, widths, locales: ['zh-tw', 'zh-cn', 'en'], errors, pdf: { status: pdf.status(), bytes: body.length, download: download.suggestedFilename() }, screenshots: screenshots.length };
  } finally {
    page.off('pageerror', onError);
    await page.unroute('**/api/analytics', telemetry);
    await page.unroute('**/api/client-errors', telemetry);
  }
}
