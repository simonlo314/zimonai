async (page) => {
  const defaultWidths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];
  const configuration = await page.evaluate(() => {
    try {
      return JSON.parse(localStorage.getItem('zimonai-cjk-check') || '{}');
    } catch {
      return {};
    }
  });
  const debug = configuration.debug === true;
  const runInteractions = !debug || configuration.interactions === true;
  const widths = debug && Array.isArray(configuration.widths) && configuration.widths.length
    ? configuration.widths.filter((width) => defaultWidths.includes(width))
    : defaultWidths;
  if (!widths.length) throw new Error('CJK browser check has no valid viewport widths');
  const origin = await page.evaluate(() => location.origin);
  const sitemapResponse = await page.context().request.get(`${origin}/sitemap.xml`);
  if (sitemapResponse.status() !== 200) throw new Error(`Unable to read sitemap: HTTP ${sitemapResponse.status()}`);
  const sitemap = await sitemapResponse.text();
  const routes = [...sitemap.matchAll(/<loc>https:\/\/zimonai\.com([^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .filter((route) => route.startsWith('/zh-tw/') || route.startsWith('/zh-cn/'));
  for (const locale of ['zh-tw', 'zh-cn']) {
    for (const privateRoute of ['admin', 'payment-success', 'portal']) routes.push(`/${locale}/${privateRoute}/`);
  }
  const allRoutes = [...new Set(routes)].sort();
  const routeCounts = Object.fromEntries(['zh-tw', 'zh-cn'].map((locale) => [
    locale,
    allRoutes.filter((route) => route.startsWith(`/${locale}/`)).length
  ]));
  const unmatchedRoutes = allRoutes.filter((route) => {
    const match = route.match(/^\/(zh-tw|zh-cn)(\/.*)$/);
    if (!match) return false;
    const counterpart = `/${match[1] === 'zh-tw' ? 'zh-cn' : 'zh-tw'}${match[2]}`;
    return !allRoutes.includes(counterpart);
  });
  if (allRoutes.length !== 60 || routeCounts['zh-tw'] !== 30 || routeCounts['zh-cn'] !== 30 || unmatchedRoutes.length) {
    throw new Error(`Unexpected CJK route inventory: ${JSON.stringify({ routeCount: allRoutes.length, routeCounts, unmatchedRoutes })}`);
  }
  const uniqueRoutes = debug && configuration.routePattern
    ? allRoutes.filter((route) => new RegExp(configuration.routePattern).test(route))
    : allRoutes;
  if (!uniqueRoutes.length) throw new Error('CJK browser check has no matching routes');
  const screenshotDirectory = `output/playwright/cjk-local-pages`;
  const isLocal = origin.includes('127.0.0.1') || origin.includes('localhost');
  const captureLocal = (!debug || configuration.capture !== false) && isLocal;
  const runtimeErrors = [];
  const suppressedTelemetry = { analytics: 0, clientErrors: 0 };
  let expectedInquiryRateLimit = false;
  const requireMethod = (route, expected, label) => {
    const actual = route.request().method();
    if (actual !== expected) throw new Error(`${label} fixture received ${actual}; expected ${expected}`);
  };
  const analyticsHandler = async (route) => {
    suppressedTelemetry.analytics += 1;
    await route.fulfill({ status: 204, body: '' });
  };
  const clientErrorsHandler = async (route) => {
    suppressedTelemetry.clientErrors += 1;
    await route.fulfill({ status: 204, body: '' });
  };
  const localPortalHandler = async (route) => {
    requireMethod(route, 'GET', 'portal session');
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Authentication required' })
    });
  };
  await page.route('**/api/analytics*', analyticsHandler);
  await page.route('**/api/client-errors*', clientErrorsHandler);
  if (isLocal) await page.route('**/api/portal/me', localPortalHandler);
  const onPageError = (error) => runtimeErrors.push({ type: 'pageerror', url: page.url(), message: error.message });
  const onConsole = (message) => {
    if (message.type() !== 'error') return;
    const sourceUrl = message.location().url || '';
    if (sourceUrl.endsWith('/api/portal/me') && /\b401\b/.test(message.text())) return;
    if (expectedInquiryRateLimit && sourceUrl.endsWith('/api/inquiries') && /\b429\b/.test(message.text())) return;
    runtimeErrors.push({ type: 'console', url: page.url(), sourceUrl, message: message.text() });
  };
  const onResponse = (response) => {
    let responseUrl;
    try { responseUrl = new URL(response.url()); } catch { return; }
    if (responseUrl.origin !== origin || responseUrl.pathname !== '/api/portal/me') return;
    if (![200, 401].includes(response.status())) {
      runtimeErrors.push({ type: 'response', url: page.url(), sourceUrl: response.url(), message: `Unexpected portal status ${response.status()}` });
    }
  };
  page.on('pageerror', onPageError);
  page.on('console', onConsole);
  page.on('response', onResponse);
  const results = [];
  const interactionChecks = [];
  const interactionIssues = [];
  const settleText = async () => page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  const auditScope = async (meta, selector) => {
    const locator = page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await settleText();
    const result = await locator.evaluate((root) => {
      const isVisible = (element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0 || element.closest('[aria-hidden="true"], [inert], .sr-only')) return false;
        for (let ancestor = element; ancestor; ancestor = ancestor.parentElement) {
          const style = getComputedStyle(ancestor);
          if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
        }
        return true;
      };
      const inScope = (selectorValue) => [...root.querySelectorAll(selectorValue)].filter(isVisible);
      const keepBreaks = inScope('.cjk-keep')
        .filter((element) => new Set([...element.getClientRects()].map((rect) => Math.round(rect.top))).size > 1)
        .map((element) => element.textContent.trim()).filter(Boolean).slice(0, 20);
          const keepOverflow = inScope('.cjk-keep')
            .filter((element) => {
              for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
                const style = getComputedStyle(ancestor);
                if (['auto', 'scroll'].includes(style.overflowX) && ancestor.scrollWidth > ancestor.clientWidth + 1) return false;
              }
              const rect = element.getBoundingClientRect();
              const textContainer = element.closest('h1, h2, h3, p, li, a, button, dd, dt, td, th, label, figcaption, strong');
              const containerRect = textContainer?.getBoundingClientRect();
              return rect.left < -1
                || rect.right > window.innerWidth + 1
                || Boolean(containerRect && (rect.left < containerRect.left - 1 || rect.right > containerRect.right + 1));
            })
        .map((element) => element.textContent.trim()).filter(Boolean).slice(0, 20);
      const wrapperStyleDrift = inScope('.cjk-keep')
        .flatMap((element) => {
          const parent = element.parentElement;
          if (!parent) return [];
          const own = getComputedStyle(element);
          const inherited = getComputedStyle(parent);
          const properties = ['fontFamily', 'fontSize', 'fontWeight', 'color', 'letterSpacing', 'lineHeight', 'textTransform'];
          const differences = properties.filter((property) => own[property] !== inherited[property]);
          const before = getComputedStyle(element, '::before').content;
          const after = getComputedStyle(element, '::after').content;
          if (!differences.length && ['none', 'normal', '""'].includes(before) && ['none', 'normal', '""'].includes(after)) return [];
          return [{
            text: element.textContent.trim().slice(0, 80),
            differences,
            before,
            after
          }];
        })
        .slice(0, 20);
      const headingOrphans = inScope('h1, h2, h3')
        .filter((element) => (element.textContent.match(/\p{Script=Han}/gu) || []).length >= 4)
        .flatMap((element) => {
          const box = element.getBoundingClientRect();
          const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight);
          if (Number.isFinite(lineHeight) && box.height < lineHeight * 1.45) return [];
          const lines = new Map();
          const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
          while (walker.nextNode()) {
            const node = walker.currentNode;
            for (let index = 0; index < node.data.length; index += 1) {
              const range = document.createRange();
              range.setStart(node, index);
              range.setEnd(node, index + 1);
              const key = Math.round(range.getBoundingClientRect().top);
              lines.set(key, (lines.get(key) || '') + node.data[index]);
            }
          }
          const orphan = [...lines.values()].some((line) => {
            const core = line.trim().replace(/[\p{P}\p{Z}\p{S}]/gu, '');
            return /^\p{Script=Han}$/u.test(core);
          });
          return lines.size > 1 && orphan ? [element.textContent.trim()] : [];
        }).slice(0, 20);
      const headingLeadingPunctuation = inScope('h1, h2, h3')
        .flatMap((element) => {
          const lines = new Map();
          const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
          while (walker.nextNode()) {
            const node = walker.currentNode;
            for (let index = 0; index < node.data.length; index += 1) {
              const range = document.createRange();
              range.setStart(node, index);
              range.setEnd(node, index + 1);
              const rect = range.getBoundingClientRect();
              if (!rect.width && !rect.height) continue;
              const key = Math.round(rect.top);
              lines.set(key, (lines.get(key) || '') + node.data[index]);
            }
          }
          const invalid = [...lines.values()].map((line) => line.trim()).filter(Boolean)
            .filter((line) => /^[，。；：！？、,.!?;:·•）】》」』]/u.test(line));
          return invalid.length ? [{ text: element.textContent.trim(), invalid }] : [];
        }).slice(0, 20);
      const structuralTopology = [
        ['.request-aside li', 2],
        ['.buyer-checklist li', 2],
        ['.registration-evidence__disclosure', 2],
        ['.office-evidence__disclosure', 2],
        ['.field-note__rail a', 2],
        ['.legal-toc a', 2]
      ].flatMap(([selectorValue, expected]) => inScope(selectorValue)
        .filter((element) => element.children.length !== expected)
        .map((element) => `${selectorValue} has ${element.children.length} direct elements`))
        .slice(0, 20);
      const splitFlexControls = inScope('a.button, a.text-link, a.nav-cta, a.portal-primary, a.portal-secondary, button.button')
        .filter((element) => getComputedStyle(element).display.includes('flex'))
        .filter((element) => [...element.children].filter((child) => child.classList.contains('cjk-keep')).length > 1)
        .map((element) => element.textContent.trim().replace(/\s+/g, ' ').slice(0, 100))
        .slice(0, 20);
      const textOverflow = inScope('h1, h2, h3, p, li, a, button, dd, dt, td, th, label, figcaption, strong')
        .filter((element) => /\p{Script=Han}/u.test(element.textContent || ''))
        .filter((element) => !element.closest('.sr-only'))
        .filter((element) => {
          const style = getComputedStyle(element);
          return !['auto', 'scroll'].includes(style.overflowX)
            && element.clientWidth > 0
            && element.scrollWidth > element.clientWidth + 1;
        })
        .map((element) => ({
          element: element.localName + '.' + [...element.classList].slice(0, 3).join('.'),
          text: element.textContent.trim().replace(/\s+/g, ' ').slice(0, 120),
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth
        })).slice(0, 20);
      const outside = (element) => {
        for (let ancestor = element; ancestor; ancestor = ancestor.parentElement) {
          const style = getComputedStyle(ancestor);
          if (['auto', 'scroll'].includes(style.overflowX) && ancestor.scrollWidth > ancestor.clientWidth + 1) return false;
        }
        const rect = element.getBoundingClientRect();
        return rect.left < -1 || rect.right > window.innerWidth + 1;
      };
      const textOutsideViewport = inScope('h1, h2, h3, p, li, a, button, dd, dt, td, th, label, figcaption, strong')
        .filter((element) => /\p{Script=Han}/u.test(element.textContent || ''))
        .filter((element) => !element.closest('.sr-only'))
        .filter(outside)
        .map((element) => element.localName + ': ' + element.textContent.trim().replace(/\s+/g, ' ').slice(0, 120))
        .slice(0, 20);
      const actionableOutsideViewport = inScope('a[href], button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"]), img[alt]:not([alt=""])')
        .filter((element) => !element.closest('.sr-only'))
        .filter(outside)
        .map((element) => element.localName + ': ' + (element.getAttribute('alt') || element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120))
        .slice(0, 20);
      return {
        documentOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        keepBreaks,
        keepOverflow,
        wrapperStyleDrift,
        headingOrphans,
        headingLeadingPunctuation,
        structuralTopology,
        splitFlexControls,
        textOverflow,
        textOutsideViewport,
        actionableOutsideViewport
      };
    });
    const issues = [];
    if (result.documentOverflow) issues.push('horizontal overflow');
    if (result.keepBreaks.length) issues.push('protected terms split: ' + result.keepBreaks.join(', '));
    if (result.keepOverflow.length) issues.push('protected terms outside viewport: ' + result.keepOverflow.join(', '));
    if (result.wrapperStyleDrift.length) issues.push('semantic wrappers changed inherited typography: ' + result.wrapperStyleDrift.map((item) => item.text + ' [' + item.differences.join(',') + ']').join(' | '));
    if (result.headingOrphans.length) issues.push('single-character heading lines: ' + result.headingOrphans.join(' | '));
    if (result.headingLeadingPunctuation.length) issues.push('heading lines start with punctuation: ' + result.headingLeadingPunctuation.map((item) => item.text + ' [' + item.invalid.join(',') + ']').join(' | '));
    if (result.structuralTopology.length) issues.push('CJK wrappers changed grid topology: ' + result.structuralTopology.join(' | '));
    if (result.splitFlexControls.length) issues.push('flex controls contain split direct labels: ' + result.splitFlexControls.join(' | '));
    if (result.textOverflow.length) issues.push('text containers overflow: ' + result.textOverflow.map((item) => item.element + ' ' + item.clientWidth + '/' + item.scrollWidth + ' ' + item.text).join(' | '));
    if (result.textOutsideViewport.length) issues.push('text outside viewport: ' + result.textOutsideViewport.join(' | '));
    if (result.actionableOutsideViewport.length) issues.push('interactive or content media outside viewport: ' + result.actionableOutsideViewport.join(' | '));
    interactionChecks.push({ ...meta, selector, ...result, issues });
    if (issues.length) interactionIssues.push(meta.locale + ' ' + meta.width + 'px ' + meta.state + ': ' + issues.join('; '));
    return result;
  };

  try {
    for (const width of widths) {
      await page.setViewportSize({ width, height: width <= 430 ? 844 : 900 });
      for (const route of uniqueRoutes) {
        const response = await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.evaluate(async () => {
          if (document.fonts?.ready) await document.fonts.ready;
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        });
        if ([390, 1440].includes(width)) {
          await page.evaluate(async () => {
            for (const image of document.images) image.loading = 'eager';
            const distance = Math.max(500, Math.floor(window.innerHeight * .8));
            for (let y = 0; y < document.documentElement.scrollHeight; y += distance) {
              window.scrollTo(0, y);
              await new Promise((resolve) => setTimeout(resolve, 18));
            }
            const previousScrollBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = 'auto';
            window.scrollTo(0, 0);
            await Promise.all([...document.images].map(async (image) => {
              if (image.complete && image.naturalWidth > 0) return;
              image.scrollIntoView({ block: 'center' });
              try { await image.decode(); } catch {}
              if (image.complete) return;
              await Promise.race([
                new Promise((resolve) => {
                  image.addEventListener('load', resolve, { once: true });
                  image.addEventListener('error', resolve, { once: true });
                }),
                new Promise((resolve) => setTimeout(resolve, 5000))
              ]);
            }));
            window.scrollTo(0, 0);
            await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            document.documentElement.style.scrollBehavior = previousScrollBehavior;
          });
        }

        const result = await page.evaluate(() => {
          const isVisible = (element) => {
            const rect = element.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0 || element.closest('[aria-hidden="true"], [inert], .sr-only')) return false;
            for (let ancestor = element; ancestor; ancestor = ancestor.parentElement) {
              const style = getComputedStyle(ancestor);
              if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
            }
            return true;
          };
          const keepBreaks = [...document.querySelectorAll('.cjk-keep')]
            .filter(isVisible)
            .filter((element) => new Set([...element.getClientRects()].map((rect) => Math.round(rect.top))).size > 1)
            .map((element) => element.textContent.trim())
            .filter(Boolean)
            .slice(0, 20);
          const keepOverflow = [...document.querySelectorAll('.cjk-keep')]
            .filter(isVisible)
            .filter((element) => {
              if (element.closest('[aria-hidden="true"]')) return false;
              for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
                const style = getComputedStyle(ancestor);
                if (['auto', 'scroll'].includes(style.overflowX) && ancestor.scrollWidth > ancestor.clientWidth + 1) return false;
              }
              const rect = element.getBoundingClientRect();
              const textContainer = element.closest('h1, h2, h3, p, li, a, button, dd, dt, td, th, label, figcaption, strong');
              const containerRect = textContainer?.getBoundingClientRect();
              return rect.left < -1
                || rect.right > window.innerWidth + 1
                || Boolean(containerRect && (rect.left < containerRect.left - 1 || rect.right > containerRect.right + 1));
            })
            .map((element) => element.textContent.trim())
            .filter(Boolean)
            .slice(0, 20);
          const wrapperStyleDrift = [...document.querySelectorAll('.cjk-keep')]
            .filter(isVisible)
            .flatMap((element) => {
              const parent = element.parentElement;
              if (!parent) return [];
              const own = getComputedStyle(element);
              const inherited = getComputedStyle(parent);
              const properties = ['fontFamily', 'fontSize', 'fontWeight', 'color', 'letterSpacing', 'lineHeight', 'textTransform'];
              const differences = properties.filter((property) => own[property] !== inherited[property]);
              const before = getComputedStyle(element, '::before').content;
              const after = getComputedStyle(element, '::after').content;
              if (!differences.length && ['none', 'normal', '""'].includes(before) && ['none', 'normal', '""'].includes(after)) return [];
              return [{ text: element.textContent.trim().slice(0, 80), differences, before, after }];
            })
            .slice(0, 20);
          const headingOrphans = [...document.querySelectorAll('h1, h2, h3')]
            .filter(isVisible)
            .filter((element) => (element.textContent.match(/\p{Script=Han}/gu) || []).length >= 4)
            .flatMap((element) => {
              const box = element.getBoundingClientRect();
              const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight);
              if (Number.isFinite(lineHeight) && box.height < lineHeight * 1.45) return [];
              const lines = new Map();
              const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
              while (walker.nextNode()) {
                const node = walker.currentNode;
                for (let index = 0; index < node.data.length; index += 1) {
                  const char = node.data[index];
                  const range = document.createRange();
                  range.setStart(node, index);
                  range.setEnd(node, index + 1);
                  const rect = range.getBoundingClientRect();
                  const key = Math.round(rect.top);
                  lines.set(key, `${lines.get(key) || ''}${char}`);
                }
              }
              return lines.size > 1 && [...lines.values()].some((line) => {
                const core = line.trim().replace(/[\p{P}\p{Z}\p{S}]/gu, '');
                return /^\p{Script=Han}$/u.test(core);
              })
                ? [{ text: element.textContent.trim(), lines: [...lines.values()] }]
                : [];
            })
            .slice(0, 20);
          const headingLeadingPunctuation = [...document.querySelectorAll('h1, h2, h3')]
            .filter(isVisible)
            .flatMap((element) => {
              const lines = new Map();
              const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
              while (walker.nextNode()) {
                const node = walker.currentNode;
                for (let index = 0; index < node.data.length; index += 1) {
                  const range = document.createRange();
                  range.setStart(node, index);
                  range.setEnd(node, index + 1);
                  const rect = range.getBoundingClientRect();
                  if (!rect.width && !rect.height) continue;
                  const key = Math.round(rect.top);
                  lines.set(key, `${lines.get(key) || ''}${node.data[index]}`);
                }
              }
              const invalid = [...lines.values()].map((line) => line.trim()).filter(Boolean)
                .filter((line) => /^[，。；：！？、,.!?;:·•）】》」』]/u.test(line));
              return invalid.length ? [{ text: element.textContent.trim(), invalid }] : [];
            })
            .slice(0, 20);
          // Summary copy is a release-critical editorial surface. The broader site-wide
          // line-break audit is handled separately so older body copy does not obscure
          // regressions introduced by a knowledge-summary edit.
          const textPunctuationOrphans = [...document.querySelectorAll('.answer-first p:last-child')]
            .filter(isVisible)
            .filter((element) => /\p{Script=Han}/u.test(element.textContent || ''))
            .flatMap((element) => {
              const lines = new Map();
              const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
              while (walker.nextNode()) {
                const node = walker.currentNode;
                for (let index = 0; index < node.data.length; index += 1) {
                  const range = document.createRange();
                  range.setStart(node, index);
                  range.setEnd(node, index + 1);
                  const rect = range.getBoundingClientRect();
                  if (!rect.width && !rect.height) continue;
                  const key = Math.round(rect.top);
                  lines.set(key, `${lines.get(key) || ''}${node.data[index]}`);
                }
              }
              const invalid = [...lines.values()].map((line) => line.trim()).filter(Boolean)
                .filter((line) => /^[，。；：！？、,.!?;:）】》〉」』”’]/u.test(line) || /[（【《〈「『“‘]$/u.test(line));
              return invalid.length ? [{ text: element.textContent.trim().replace(/\s+/g, ' ').slice(0, 120), invalid }] : [];
            })
            .slice(0, 20);
          const structuralTopology = [
            ['.request-aside li', 2],
            ['.buyer-checklist li', 2],
            ['.registration-evidence__disclosure', 2],
            ['.office-evidence__disclosure', 2],
            ['.field-note__rail a', 2],
            ['.legal-toc a', 2]
          ].flatMap(([selectorValue, expected]) => [...document.querySelectorAll(selectorValue)]
            .filter(isVisible)
            .filter((element) => element.children.length !== expected)
            .map((element) => `${selectorValue} has ${element.children.length} direct elements`))
            .slice(0, 20);
          const splitFlexControls = [...document.querySelectorAll('a.button, a.text-link, a.nav-cta, a.portal-primary, a.portal-secondary, button.button')]
            .filter(isVisible)
            .filter((element) => getComputedStyle(element).display.includes('flex'))
            .filter((element) => [...element.children].filter((child) => child.classList.contains('cjk-keep')).length > 1)
            .map((element) => element.textContent.trim().replace(/\s+/g, ' ').slice(0, 100))
            .slice(0, 20);
          const textOverflow = [...document.querySelectorAll('h1, h2, h3, p, li, a, button, dd, dt, td, th, label, figcaption, strong')]
            .filter(isVisible)
            .filter((element) => /\p{Script=Han}/u.test(element.textContent || ''))
            .filter((element) => !element.closest('[aria-hidden="true"], .sr-only'))
            .filter((element) => {
              const style = getComputedStyle(element);
              if (['auto', 'scroll'].includes(style.overflowX)) return false;
              return element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 1;
            })
            .map((element) => ({
              element: `${element.localName}.${[...element.classList].slice(0, 3).join('.')}`,
              text: element.textContent.trim().replace(/\s+/g, ' ').slice(0, 120),
              clientWidth: element.clientWidth,
              scrollWidth: element.scrollWidth
            }))
            .slice(0, 20);
          const actionableOutsideViewport = [...document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])')]
            .filter(isVisible)
            .filter((element) => !element.closest('.sr-only'))
            .filter((element) => {
              for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
                const style = getComputedStyle(ancestor);
                if (['auto', 'scroll'].includes(style.overflowX) && ancestor.scrollWidth > ancestor.clientWidth + 1) return false;
              }
              const rect = element.getBoundingClientRect();
              return rect.left < -1 || rect.right > window.innerWidth + 1;
            })
            .map((element) => ({
              element: `${element.localName}.${[...element.classList].slice(0, 3).join('.')}`,
              text: (element.getAttribute('alt') || element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
              left: Math.round(element.getBoundingClientRect().left),
              right: Math.round(element.getBoundingClientRect().right)
            }))
            .slice(0, 20);
          const contentMediaOutsideViewport = [...document.querySelectorAll('img[alt]:not([alt=""])')]
            .filter(isVisible)
            .filter((element) => {
              for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
                const style = getComputedStyle(ancestor);
                if (['auto', 'scroll'].includes(style.overflowX) && ancestor.scrollWidth > ancestor.clientWidth + 1) return false;
                if (['clip', 'hidden'].includes(style.overflowX)) {
                  const ancestorRect = ancestor.getBoundingClientRect();
                  if (ancestorRect.left >= -1 && ancestorRect.right <= window.innerWidth + 1) return false;
                }
              }
              const rect = element.getBoundingClientRect();
              return rect.left < -1 || rect.right > window.innerWidth + 1;
            })
            .map((element) => ({
              element: `${element.localName}.${[...element.classList].slice(0, 3).join('.')}`,
              text: element.getAttribute('alt').trim().replace(/\s+/g, ' ').slice(0, 120),
              left: Math.round(element.getBoundingClientRect().left),
              right: Math.round(element.getBoundingClientRect().right)
            }))
            .slice(0, 20);
          const textOutsideViewport = [...document.querySelectorAll('h1, h2, h3, p, li, a, button, dd, dt, td, th, label, figcaption, strong')]
            .filter(isVisible)
            .filter((element) => /\p{Script=Han}/u.test(element.textContent || ''))
            .filter((element) => !element.closest('[aria-hidden="true"], .sr-only'))
            .filter((element) => {
              for (let ancestor = element; ancestor; ancestor = ancestor.parentElement) {
                const style = getComputedStyle(ancestor);
                if (['auto', 'scroll'].includes(style.overflowX) && ancestor.scrollWidth > ancestor.clientWidth + 1) return false;
              }
              const rect = element.getBoundingClientRect();
              return rect.left < -1 || rect.right > window.innerWidth + 1;
            })
            .map((element) => ({
              element: `${element.localName}.${[...element.classList].slice(0, 3).join('.')}`,
              text: element.textContent.trim().replace(/\s+/g, ' ').slice(0, 120),
              left: Math.round(element.getBoundingClientRect().left),
              right: Math.round(element.getBoundingClientRect().right)
            }))
            .slice(0, 20);
          const brokenImages = [390, 1440].includes(window.innerWidth) ? [...document.images]
            .filter(isVisible)
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.src)
            .slice(0, 20) : [];
          const portalSupportOverlap = document.body.matches('.page-portal:not(.page-admin)')
            ? (() => {
                const button = [...document.querySelectorAll('.support-launch')].find(isVisible);
                const heading = [...document.querySelectorAll('.portal-entry__intro h1')].find(isVisible);
                if (!button || !heading) return [];
                const a = button.getBoundingClientRect();
                const b = heading.getBoundingClientRect();
                return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
                  ? [`support ${Math.round(a.left)},${Math.round(a.top)},${Math.round(a.right)},${Math.round(a.bottom)} / heading ${Math.round(b.left)},${Math.round(b.top)},${Math.round(b.right)},${Math.round(b.bottom)}`]
                  : [];
              })()
            : [];
          return {
            lang: document.documentElement.lang,
            layout: document.documentElement.dataset.layout,
            documentOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
            keepBreaks,
            keepOverflow,
            wrapperStyleDrift,
            headingOrphans,
            headingLeadingPunctuation,
            textPunctuationOrphans,
            structuralTopology,
            splitFlexControls,
            textOverflow,
            textOutsideViewport,
            actionableOutsideViewport,
            contentMediaOutsideViewport,
            brokenImages,
            portalSupportOverlap
          };
        });

        const status = response?.status() || 0;
        const issues = [];
        if (status !== 200) issues.push(`HTTP ${status}`);
        if (result.layout !== 'cjk') issues.push(`layout ${result.layout || 'missing'}`);
        const expectedLang = route.startsWith('/zh-tw/') ? 'zh-Hant' : 'zh-Hans';
        if (result.lang !== expectedLang) issues.push(`lang ${result.lang || 'missing'} (expected ${expectedLang})`);
        if (result.documentOverflow) issues.push('horizontal overflow');
        if (result.keepBreaks.length) issues.push(`protected terms split: ${result.keepBreaks.join(', ')}`);
        if (result.keepOverflow.length) issues.push(`protected terms outside viewport: ${result.keepOverflow.join(', ')}`);
        if (result.wrapperStyleDrift.length) issues.push(`semantic wrappers changed inherited typography: ${result.wrapperStyleDrift.map((item) => `${item.text} [${item.differences.join(',')}]`).join(' | ')}`);
        if (result.headingOrphans.length) issues.push(`single-character heading lines: ${result.headingOrphans.map((item) => item.text).join(' | ')}`);
        if (result.headingLeadingPunctuation.length) issues.push(`heading lines start with punctuation: ${result.headingLeadingPunctuation.map((item) => `${item.text} [${item.invalid.join(',')}]`).join(' | ')}`);
        if (result.textPunctuationOrphans.length) issues.push(`text lines orphan punctuation: ${result.textPunctuationOrphans.map((item) => `${item.text} [${item.invalid.join(',')}]`).join(' | ')}`);
        if (result.structuralTopology.length) issues.push(`CJK wrappers changed grid topology: ${result.structuralTopology.join(' | ')}`);
        if (result.splitFlexControls.length) issues.push(`flex controls contain split direct labels: ${result.splitFlexControls.join(' | ')}`);
        if (result.textOverflow.length) issues.push(`text containers overflow: ${result.textOverflow.map((item) => `${item.element} ${item.clientWidth}/${item.scrollWidth} ${item.text}`).join(' | ')}`);
        if (result.textOutsideViewport.length) issues.push(`text outside viewport: ${result.textOutsideViewport.map((item) => `${item.element} ${item.left}/${item.right} ${item.text}`).join(' | ')}`);
        if (result.actionableOutsideViewport.length) issues.push(`interactive or content media outside viewport: ${result.actionableOutsideViewport.map((item) => `${item.element} ${item.left}/${item.right} ${item.text}`).join(' | ')}`);
        if (result.contentMediaOutsideViewport.length) issues.push(`content media outside viewport: ${result.contentMediaOutsideViewport.map((item) => `${item.element} ${item.left}/${item.right} ${item.text}`).join(' | ')}`);
        if (result.brokenImages.length) issues.push(`broken images: ${result.brokenImages.join(', ')}`);
        if (result.portalSupportOverlap.length) issues.push(`floating support overlaps portal heading: ${result.portalSupportOverlap.join(' | ')}`);
        results.push({ width, route, status, ...result, issues });

        if (captureLocal && (width === 390 || width === 1440)) {
          const name = route.replace(/^\//, '').replace(/\/$/, '').replaceAll('/', '--') || 'home';
          await page.evaluate(async () => {
            const previousScrollBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = 'auto';
            window.scrollTo(0, 0);
            await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            document.documentElement.style.scrollBehavior = previousScrollBehavior;
          });
          await page.screenshot({ path: `${screenshotDirectory}/${name}-${width}.png`, fullPage: true, scale: 'css' });
        }
      }
    }
    if (runInteractions) {
      const openInteractionPage = async (locale, route, width) => {
        await page.setViewportSize({ width, height: width <= 430 ? 844 : 900 });
        const response = await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
        if (response?.status() !== 200) throw new Error(locale + ' ' + width + 'px ' + route + ': HTTP ' + (response?.status() || 0));
        const expectedLang = locale === 'zh-tw' ? 'zh-Hant' : 'zh-Hans';
        const actualLang = await page.locator('html').getAttribute('lang');
        if (actualLang !== expectedLang) throw new Error(locale + ' ' + width + 'px ' + route + ': expected lang ' + expectedLang + ', got ' + actualLang);
        await settleText();
      };
      const waitForNonEmptyText = (selector) => page.waitForFunction(
        (target) => Boolean(document.querySelector(target)?.textContent.trim()),
        selector,
        { timeout: 10000 }
      );

      for (const locale of ['zh-tw', 'zh-cn']) {
        const route = '/' + locale + '/';
        for (const width of [390, 768, 1024]) {
          await openInteractionPage(locale, route, width);
          const toggle = page.locator('[data-nav-toggle]');
          await toggle.waitFor({ state: 'visible', timeout: 10000 });
          await toggle.click();
          await page.locator('[data-nav].is-open').waitFor({ state: 'visible', timeout: 10000 });
          await page.waitForTimeout(400);
          await auditScope({ locale, width, route, state: 'nav-open' }, '[data-nav].is-open');
        }
      }

      for (const locale of ['zh-tw', 'zh-cn']) {
        const route = '/' + locale + '/';
        const width = 390;
        await openInteractionPage(locale, route, width);
        await page.locator('[data-support-open]').click();
        await page.locator('[data-support-panel].is-open[aria-hidden="false"]').waitFor({ state: 'visible', timeout: 10000 });
        await auditScope({ locale, width, route, state: 'support-open' }, '[data-support-panel].is-open[aria-hidden="false"]');
        const copyButton = page.locator('[data-support-panel] [data-copy-contact]').first();
        if (await copyButton.count()) {
          await copyButton.click();
          await page.waitForFunction(() => {
            const button = document.querySelector('[data-support-panel] [data-copy-contact]');
            return button?.classList.contains('is-copied') || button?.classList.contains('is-copy-error');
          });
          await auditScope({ locale, width, route, state: 'support-copy-feedback' }, '[data-support-panel].is-open[aria-hidden="false"]');
        }
      }

      for (const locale of ['zh-tw', 'zh-cn']) {
        const route = '/' + locale + '/services/';
        for (const width of [320, 768, 1280]) {
          await openInteractionPage(locale, route, width);
          const serviceTabs = page.locator('[data-service-select]');
          const tabCount = await serviceTabs.count();
          if (tabCount !== 6) throw new Error(locale + ' ' + width + 'px ' + route + ': expected 6 service tabs, found ' + tabCount);
          for (const tier of ['t1', 't2', 't3', 't4', 't5', 't6']) {
            const tabSelector = '[data-service-select="' + tier + '"]';
            const panelSelector = '[data-service-panel="' + tier + '"]';
            await page.locator(tabSelector).click();
            await page.waitForFunction(({ tabSelector: tab, panelSelector: panel }) => {
              const tabNode = document.querySelector(tab);
              const panelNode = document.querySelector(panel);
              return tabNode?.getAttribute('aria-selected') === 'true' && panelNode?.hidden === false;
            }, { tabSelector, panelSelector });
            await auditScope({ locale, width, route, state: 'service-' + tier }, panelSelector);
            const form = page.locator(panelSelector + ' [data-checkout-form]');
            if (await form.count()) {
              await form.evaluate((element) => element.requestSubmit());
              const errorSelector = panelSelector + ' [data-checkout-error]';
              await waitForNonEmptyText(errorSelector);
              await auditScope({ locale, width, route, state: 'service-' + tier + '-checkout-invalid' }, panelSelector);
              if (!page.url().includes(route)) interactionIssues.push(locale + ' ' + width + 'px service-' + tier + ': invalid checkout unexpectedly navigated');
            }
          }
        }
      }

      for (const locale of ['zh-tw', 'zh-cn']) {
        const route = '/' + locale + '/methodology/';
        for (const width of [390, 768, 1280]) {
          await openInteractionPage(locale, route, width);
          const nodes = page.locator('[data-method-map] [data-method-node]');
          const nodeCount = await nodes.count();
          if (nodeCount !== 7) throw new Error(locale + ' ' + width + 'px ' + route + ': expected 7 methodology nodes, found ' + nodeCount);
          for (let index = 0; index < nodeCount; index += 1) {
            await nodes.nth(index).click();
            await page.waitForFunction((currentIndex) => {
              const items = [...document.querySelectorAll('[data-method-map] [data-method-node]')];
              return items[currentIndex]?.getAttribute('aria-selected') === 'true';
            }, index);
            await auditScope({ locale, width, route, state: 'methodology-node-' + (index + 1) }, '[data-method-map]');
          }
        }
      }

      const fillValidInquiry = async (locale) => {
        const values = locale === 'zh-cn'
          ? {
              name: '繁简断句验收',
              supplier: '深圳市电源适配器供应商',
              product: 'USB-C 充电器与移动电源',
              question: '请核对证书持有人、产品型号与本批订单。'
            }
          : {
              name: '繁簡斷句驗收',
              supplier: '深圳市電源適配器供應商',
              product: 'USB-C 充電器與行動電源',
              question: '請核對證書持有人、產品型號與本批訂單。'
            };
        await page.locator('[data-inquiry-form] [name="name"]').fill(values.name);
        await page.locator('[data-inquiry-form] [name="email"]').fill('cjk-qa@example.com');
        await page.locator('[data-inquiry-form] [name="supplier"]').fill(values.supplier);
        await page.locator('[data-inquiry-form] [name="product"]').fill(values.product);
        await page.locator('[data-inquiry-form] [name="question"]').fill(values.question);
        await page.locator('[data-inquiry-form] [name="consent"]').check();
      };
      let inquiryResponseMode = 'success';
      const inquiryHandler = async (requestRoute) => {
        requireMethod(requestRoute, 'POST', 'inquiry');
        await page.waitForTimeout(1200);
        if (inquiryResponseMode === 'rate-limit') {
          await requestRoute.fulfill({ status: 429, contentType: 'application/json', body: JSON.stringify({ accepted: false, error: 'rate_limited' }) });
          return;
        }
        await requestRoute.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ accepted: true, reference: 'INQ-2026-CJKQA' }) });
      };
      if (isLocal) await page.route('**/api/inquiries', inquiryHandler);
      try {
        for (const locale of ['zh-tw', 'zh-cn']) {
          const route = '/' + locale + '/request-verification/';
          const width = 320;
          await openInteractionPage(locale, route, width);
          await page.locator('[data-inquiry-form]').evaluate((form) => form.requestSubmit());
          await waitForNonEmptyText('[data-inquiry-form] [data-form-error]');
          await auditScope({ locale, width, route, state: 'request-validation' }, '[data-inquiry-form]');
          if (!isLocal) continue;

          inquiryResponseMode = 'success';
          await fillValidInquiry(locale);
          await page.locator('[data-inquiry-form]').evaluate((form) => form.requestSubmit());
          await page.locator('[data-inquiry-form][aria-busy="true"]').waitFor({ state: 'visible', timeout: 10000 });
          await auditScope({ locale, width, route, state: 'request-loading' }, '[data-inquiry-form][aria-busy="true"]');
          await page.locator('[data-inquiry-status]').waitFor({ state: 'visible', timeout: 10000 });
          await auditScope({ locale, width, route, state: 'request-success' }, '[data-inquiry-form]');

          inquiryResponseMode = 'rate-limit';
          expectedInquiryRateLimit = true;
          await openInteractionPage(locale, route, width);
          await fillValidInquiry(locale);
          await page.locator('[data-inquiry-form]').evaluate((form) => form.requestSubmit());
          await page.waitForFunction(() => {
            const form = document.querySelector('[data-inquiry-form]');
            const error = form?.querySelector('[data-form-error]');
            return !form?.hasAttribute('aria-busy') && Boolean(error?.textContent.trim());
          });
          await auditScope({ locale, width, route, state: 'request-rate-limit' }, '[data-inquiry-form]');
          expectedInquiryRateLimit = false;
        }
      } finally {
        expectedInquiryRateLimit = false;
        if (isLocal) await page.unroute('**/api/inquiries', inquiryHandler);
      }

      for (const locale of ['zh-tw', 'zh-cn']) {
        for (const width of [320, 768, 1280]) {
          const portalRoute = '/' + locale + '/portal/';
          await openInteractionPage(locale, portalRoute, width);
          const portalSelector = '[data-portal][data-state="signed-out"] [data-portal-signed-out]';
          await page.locator(portalSelector).waitFor({ state: 'visible', timeout: 10000 });
          await auditScope({ locale, width, route: portalRoute, state: 'portal-signed-out' }, portalSelector);

          const adminRoute = '/' + locale + '/admin/';
          await openInteractionPage(locale, adminRoute, width);
          const adminSelector = '[data-admin][data-state="access"] [data-admin-access]';
          await page.locator(adminSelector).waitFor({ state: 'visible', timeout: 10000 });
          await auditScope({ locale, width, route: adminRoute, state: 'admin-signed-out' }, adminSelector);
        }
      }

      if (isLocal) {
        let signedInLocale = 'zh-tw';
        const signedInMeHandler = async (requestRoute) => requestRoute.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            authenticated: true,
            csrfToken: 'cjk-visual-fixture',
            authCapabilities: { google: true, email: true },
            user: {
              id: 'user-cjk-visual-fixture',
              name: signedInLocale === 'zh-cn' ? '供应商核查负责人' : '供應商查核負責人',
              email: 'cjk-visual-fixture@example.com',
              locale: signedInLocale,
              isAdmin: true,
              role: 'admin'
            }
          })
        });
        const getOnly = (label, body) => async (requestRoute) => {
          requireMethod(requestRoute, 'GET', label);
          const responseBody = typeof body === 'function' ? body() : body;
          await requestRoute.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(responseBody) });
        };
        const checkedSignedInMeHandler = async (requestRoute) => {
          requireMethod(requestRoute, 'GET', 'signed-in portal session');
          await signedInMeHandler(requestRoute);
        };
        const localizedFixture = () => {
          const simplified = signedInLocale === 'zh-cn';
          const userName = simplified ? '供应商核查负责人' : '供應商查核負責人';
          const supplier = simplified ? '深圳市精密电源适配器供应商' : '深圳市精密電源適配器供應商';
          const product = simplified ? '65W USB-C 氮化镓充电器与移动电源' : '65W USB-C 氮化鎵充電器與行動電源';
          const note = simplified
            ? '正在核对证书持有人、产品型号与本批订单的对应关系。'
            : '正在核對證書持有人、產品型號與本批訂單的對應關係。';
          const caseRecord = {
            id: 'case-cjk-visual-fixture',
            reference: 'ZM-CJK-20260903',
            ownerEmail: 'buyer-cjk@example.com',
            supplierName: supplier,
            chineseLegalName: simplified ? '深圳市精密电源科技有限公司' : '深圳市精密電源科技有限公司',
            productCategory: simplified ? '电源电子' : '電源電子',
            productModel: product,
            tier: 't2',
            status: 'in_progress',
            clientStatusNote: note,
            internalNote: simplified ? '仅供本机断句回归检查' : '僅供本機斷句回歸檢查',
            expectedDeliveryAt: '2026-09-08T09:30:00.000Z',
            updatedAt: '2026-09-03T08:30:00.000Z',
            createdAt: '2026-09-01T08:30:00.000Z',
            reportUrl: '/assets/zimonai-t1-sample-report.pdf'
          };
          const orderRecord = {
            id: 'order-cjk-visual-fixture',
            reference: 'PAY-CJK-20260903',
            ownerEmail: 'buyer-cjk@example.com',
            product: 't2',
            description: simplified ? '远程深度尽调·供应商核查' : '遠端深度盡調·供應商查核',
            amountTotal: 34900,
            currency: 'usd',
            paymentStatus: 'paid',
            fulfillmentStatus: 'in_progress',
            source: 'stripe',
            quantity: 1,
            serviceReference: caseRecord.reference,
            paymentMethodNote: simplified ? '已通过 Stripe Checkout 完成付款' : '已透過 Stripe Checkout 完成付款',
            createdAt: '2026-09-01T08:45:00.000Z',
            updatedAt: '2026-09-03T08:30:00.000Z',
            cancelledAt: null,
            archivedAt: null,
            customerHiddenAt: null
          };
          return {
            userName,
            caseRecord,
            orderRecord,
            customerRecord: {
              id: 'customer-cjk-fixture', name: userName, email: 'buyer-cjk@example.com',
              caseCount: 1, orderCount: 1, createdAt: '2026-09-01T08:00:00.000Z'
            },
            invitationRecord: {
              id: 'invitation-cjk-fixture', name: '', email: 'pending-cjk@example.com',
              caseCount: 1, createdAt: '2026-09-02T08:00:00.000Z'
            },
            inquiryRecord: {
              id: 'inquiry-cjk-fixture', reference: 'INQ-CJK-20260903', status: 'new',
              name: userName, email: 'buyer-cjk@example.com', company: simplified ? '海外采购项目' : '海外採購專案',
              supplier, chinese: caseRecord.chineseLegalName, product, url: 'https://supplier.example.com',
              question: simplified ? '请核对这张测试证书能否对应到这款产品与本批订单。' : '請核對這張測試證書能否對應到這款產品與本批訂單。',
              createdAt: '2026-09-03T07:30:00.000Z'
            },
            notificationRecord: {
              id: 'notification-cjk-fixture', recipientEmail: 'buyer-cjk@example.com', type: 'case_update',
              status: 'failed', attempts: 2, createdAt: '2026-09-03T07:40:00.000Z',
              lastAttemptAt: '2026-09-03T08:10:00.000Z', sentAt: null,
              lastError: simplified ? '测试环境未配置邮件服务' : '測試環境未設定郵件服務'
            }
          };
        };
        const portalCasesHandler = getOnly('portal case list', () => ({ cases: [localizedFixture().caseRecord] }));
        const portalOrdersHandler = getOnly('portal order list', () => ({ orders: [localizedFixture().orderRecord] }));
        const adminCasesHandler = getOnly('admin case list', () => ({ cases: [localizedFixture().caseRecord] }));
        const adminOrdersHandler = getOnly('admin order list', () => ({ orders: [localizedFixture().orderRecord] }));
        const adminCustomersHandler = getOnly('admin customer list', () => {
          const fixture = localizedFixture();
          return { customers: [fixture.customerRecord], invitations: [fixture.invitationRecord] };
        });
        const adminNotificationsHandler = getOnly('admin notification list', () => ({ emailConfigured: false, notifications: [localizedFixture().notificationRecord] }));
        const adminInquiriesHandler = getOnly('admin inquiry list', () => ({ inquiries: [localizedFixture().inquiryRecord] }));
        await page.route('**/api/portal/me', checkedSignedInMeHandler);
        await page.route('**/api/portal/cases', portalCasesHandler);
        await page.route('**/api/portal/orders*', portalOrdersHandler);
        await page.route('**/api/admin/cases*', adminCasesHandler);
        await page.route('**/api/admin/orders*', adminOrdersHandler);
        await page.route('**/api/admin/customers', adminCustomersHandler);
        await page.route('**/api/admin/notifications', adminNotificationsHandler);
        await page.route('**/api/admin/inquiries', adminInquiriesHandler);
        try {
          for (const locale of ['zh-tw', 'zh-cn']) {
            signedInLocale = locale;
            for (const width of [320, 768, 1280]) {
              const portalRoute = '/' + locale + '/portal/';
              await openInteractionPage(locale, portalRoute, width);
              const portalWorkspace = '[data-portal][data-state="signed-in"] [data-portal-signed-in]';
              await page.locator(portalWorkspace).waitFor({ state: 'visible', timeout: 10000 });
              await page.locator('[data-portal-case-list] .portal-case').waitFor({ state: 'visible', timeout: 10000 });
              await auditScope({ locale, width, route: portalRoute, state: 'portal-signed-in' }, portalWorkspace);
              for (const view of ['orders', 'account', 'cases']) {
                await page.locator('[data-portal-view="' + view + '"]').click();
                await page.locator('[data-portal-panel="' + view + '"]').waitFor({ state: 'visible', timeout: 10000 });
                if (view === 'orders') await page.locator('[data-portal-order-list] .portal-order').waitFor({ state: 'visible', timeout: 10000 });
                await auditScope({ locale, width, route: portalRoute, state: 'portal-' + view }, portalWorkspace);
              }

              const adminRoute = '/' + locale + '/admin/';
              await openInteractionPage(locale, adminRoute, width);
              const adminWorkspace = '[data-admin][data-state="workspace"] [data-admin-workspace]';
              await page.locator(adminWorkspace).waitFor({ state: 'visible', timeout: 10000 });
              await page.locator('[data-admin-list="queue"] .admin-record').waitFor({ state: 'visible', timeout: 10000 });
              for (const view of ['queue', 'inquiries', 'cases', 'orders', 'customers', 'notifications', 'create']) {
                await page.locator('[data-admin-view="' + view + '"]').click();
                const panelSelector = '[data-admin-panel="' + view + '"]';
                await page.locator(panelSelector).waitFor({ state: 'visible', timeout: 10000 });
                if (view !== 'create') await page.locator('[data-admin-list="' + view + '"] .admin-record').first().waitFor({ state: 'visible', timeout: 10000 });
                await page.locator(panelSelector + ' details').evaluateAll((nodes) => nodes.forEach((node) => { node.open = true; }));
                await settleText();
                await auditScope({ locale, width, route: adminRoute, state: 'admin-' + view }, panelSelector);
              }
            }
          }
        } finally {
          await page.unroute('**/api/portal/me', checkedSignedInMeHandler);
          await page.unroute('**/api/portal/cases', portalCasesHandler);
          await page.unroute('**/api/portal/orders*', portalOrdersHandler);
          await page.unroute('**/api/admin/cases*', adminCasesHandler);
          await page.unroute('**/api/admin/orders*', adminOrdersHandler);
          await page.unroute('**/api/admin/customers', adminCustomersHandler);
          await page.unroute('**/api/admin/notifications', adminNotificationsHandler);
          await page.unroute('**/api/admin/inquiries', adminInquiriesHandler);
        }
      }

      await page.setViewportSize({ width: 320, height: 844 });
      for (const locale of ['zh-tw', 'zh-cn']) {
        const route = '/' + locale + '/knowledge/';
        const width = 320;
        await openInteractionPage(locale, route, width);
        await page.locator('.knowledge-index.is-search-ready').waitFor({ state: 'visible', timeout: 10000 });
        await page.locator('[data-knowledge-search]').fill('FCC');
        await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
        await page.locator('[data-knowledge-record]:visible').first().waitFor({ state: 'visible', timeout: 10000 });
        await auditScope({ locale, width, route, state: 'knowledge-results' }, '[data-knowledge-index]');
        const interaction = await page.evaluate((currentLocale) => {
          const status = document.querySelector('[data-knowledge-count]');
          const host = document.createElement('div');
          host.id = 'cjk-runtime-probe';
          host.innerHTML = '<p data-cjk-language></p><p data-cjk-measurement></p><button type="button"></button><div class="inquiry-status"><p></p></div>';
          host.querySelector('[data-cjk-language]').textContent = currentLocale === 'zh-cn'
            ? '50–500 件供应商核查，第 33 条、9 月 17 日与下一台充电器。'
            : '50–500 件供應商查核，第 33 條、9 月 17 日與下一台充電器。';
          host.querySelector('[data-cjk-measurement]').textContent = '10,000mAh／25W';
          host.querySelector('button').textContent = currentLocale === 'zh-cn' ? '再确认产品' : '再確認產品';
          const machineData = host.querySelector('.inquiry-status p');
          machineData.style.width = '120px';
          machineData.textContent = 'cs_test_1234567890abcdefghijklmnopqrstuvwxyz';
          document.body.append(host);
          return new Promise((resolve) => setTimeout(() => {
            const statusLines = [...status.querySelectorAll('.cjk-keep')]
              .flatMap((element) => [...element.getClientRects()].map((rect) => Math.round(rect.top)));
            const result = {
              status: status.textContent.trim(),
              statusProtected: status.querySelectorAll('.cjk-keep').length > 0,
              statusSplit: new Set(statusLines).size > 1,
              phraseValues: [...host.querySelectorAll('.cjk-keep--phrase')].map((element) => element.textContent),
              controlValues: [...host.querySelectorAll('.cjk-keep--control')].map((element) => element.textContent),
              machineDataFits: machineData.scrollWidth <= machineData.clientWidth + 1
            };
            host.remove();
            resolve(result);
          }, 30));
        }, locale);
        interactionChecks.push({ locale, width, route, state: 'runtime-probe', ...interaction });
        if (!interaction.status || !interaction.statusProtected || interaction.statusSplit) interactionIssues.push(`${locale}: dynamic search count is not protected`);
        if (!interaction.phraseValues.includes('50–500 件') || !interaction.phraseValues.some((value) => value.includes('供應商') || value.includes('供应商'))) interactionIssues.push(`${locale}: dynamic phrase protection failed`);
        for (const expected of [locale === 'zh-cn' ? '第 33 条' : '第 33 條', '9 月 17 日', '下一台', '10,000mAh', '25W']) {
          if (!interaction.phraseValues.some((value) => value.includes(expected))) interactionIssues.push(`${locale}: dynamic pattern protection failed for ${expected}`);
        }
        const expectedControl = locale === 'zh-cn' ? '再确认产品' : '再確認產品';
        if (!interaction.controlValues.includes(expectedControl)) interactionIssues.push(locale + ': dynamic control protection failed');
        if (!interaction.machineDataFits) interactionIssues.push(locale + ': machine-readable data no longer wraps');
        await page.locator('[data-knowledge-search]').fill('__cjk_no_matching_record__');
        await page.locator('[data-knowledge-empty]').waitFor({ state: 'visible', timeout: 10000 });
        await auditScope({ locale, width, route, state: 'knowledge-empty' }, '[data-knowledge-index]');
        await page.locator('[data-knowledge-empty] [data-knowledge-clear]').click();
        await page.locator('[data-knowledge-empty]').waitFor({ state: 'hidden', timeout: 10000 });
        await page.waitForFunction(() => document.querySelector('[data-knowledge-search]')?.value === '');
        await auditScope({ locale, width, route, state: 'knowledge-cleared' }, '[data-knowledge-index]');
      }
    }
  } finally {
    page.off('pageerror', onPageError);
    page.off('console', onConsole);
    page.off('response', onResponse);
    if (isLocal) await page.unroute('**/api/portal/me', localPortalHandler);
    await page.unroute('**/api/analytics*', analyticsHandler);
    await page.unroute('**/api/client-errors*', clientErrorsHandler);
  }

  const failedResults = results.filter((result) => result.issues.length);
  const issueKinds = failedResults.reduce((summary, result) => {
    for (const issue of result.issues) {
      const kind = issue.split(':', 1)[0];
      summary[kind] = (summary[kind] || 0) + 1;
    }
    return summary;
  }, {});
  const report = {
    origin,
    mode: debug ? 'debug' : 'full',
    routeCount: uniqueRoutes.length,
    routeCounts,
    viewportWidths: widths,
    checks: results.length,
    issueCount: failedResults.length,
    issueKinds,
    issueExamples: failedResults.slice(0, 12).map(({ width, route, issues }) => ({ width, route, issues })),
    interactionChecks,
    interactionIssues,
    runtimeErrorCount: runtimeErrors.length,
    runtimeErrorExamples: runtimeErrors.slice(0, 12),
    suppressedTelemetry
  };
  if (report.issueCount || report.interactionIssues.length || report.runtimeErrorCount) throw new Error(JSON.stringify(report));
  return report;
}
