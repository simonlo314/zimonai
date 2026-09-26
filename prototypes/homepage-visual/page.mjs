import { SERVICE_FACTS, serviceName, servicePrice, serviceTiming } from '../../shared/service-facts.mjs';
import { localizedServices } from '../../src/service-copy.mjs';
import { knowledgeContent } from '../../src/knowledge-content.mjs';

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const source = 'https://commons.wikimedia.org/wiki/File:Machine_places_components_on_a_circuit_board_during_manufacturing_in_a_factory_environment.jpg';
const services = localizedServices('en');
const t1 = services.find(s => s.id === 't1');
const t2 = services.find(s => s.id === 't2');
const live = path => `https://zimonai.com${path}`;
const chevron = '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
const link = (href, title, detail = '') => `<a href="${esc(href)}"><strong>${esc(title)}</strong>${detail ? `<span>${esc(detail)}</span>` : ''}</a>`;

export function renderPrototype() {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>ZimonAI | Homepage visual prototype — local review</title><link rel="icon" href="/assets/favicon.svg"><link rel="stylesheet" href="/prototype.css"><script src="/prototype.js" defer></script></head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="preview-bar">Local visual prototype <span>English reference · Not connected to inquiries or payments</span></div>
<header class="header">
  <div class="nav-shell">
    <a class="brand" href="#main" aria-label="ZimonAI homepage"><img src="/assets/zimonai-logo-primary.svg" alt="ZimonAI" width="1600" height="360"></a>
    <button class="mobile-toggle" type="button" aria-expanded="false" aria-controls="navigation">Menu <span aria-hidden="true">☰</span></button>
    <nav id="navigation" class="navigation" aria-label="Main navigation">
      <div class="disclosure">
        <button class="nav-item" type="button" data-disclosure aria-expanded="false" aria-controls="services-menu">Services ${chevron}</button>
        <div class="mega-menu" id="services-menu" hidden>
          <div class="mega-primary"><p class="menu-label">Start with the scope you need</p>
            ${link('#t1', `T1 · ${t1.title}`, `${t1.price} · ${serviceTiming('t1')}`)}
            ${link('#t2', `T2 · ${t2.title}`, `${t2.price} · ${serviceTiming('t2')}`)}
            ${link('#advanced', serviceName('advanced'), 'Separately scoped and quoted')}
          </div>
          <div class="mega-advanced"><p class="menu-label">Advanced engagements</p>${services.slice(2).map(s => link(live(`/services/#${s.id}`), s.title)).join('')}</div>
          <div class="mega-resources"><p class="menu-label">Before you decide</p>${link('#evidence', 'Report & evidence')}${link('#services', 'Pricing & scope')}${link(live('/methodology/'), 'How we verify')}${link(live('/services/#faq'), 'Questions before booking')}<p class="menu-note">T1 and T2 are remote reviews. Supplier contact and fieldwork require a separate agreed scope.</p></div>
        </div>
      </div>
      <div class="disclosure">
        <button class="nav-item" type="button" data-disclosure aria-expanded="false" aria-controls="resources-menu">Resources ${chevron}</button>
        <div class="mega-menu resource-menu" id="resources-menu" hidden>
          <div><p class="menu-label">Knowledge & research</p>${link(live('/knowledge/'), 'All articles', 'Industry knowledge and current developments')}</div>
          <div class="category-links">${Object.entries(knowledgeContent.en.taxonomy.categories).map(([id,c]) => link(live(`/knowledge/${c.slug || id}/`), c.name)).join('')}</div>
          <div>${link('#evidence', 'Report preview')}${link(live('/scope-limitations/'), 'Scope & limitations')}${link(live('/services/#faq'), 'Questions before booking')}</div>
        </div>
      </div>
      <a class="nav-item" href="${live('/methodology/')}">Methodology</a>
      <a class="nav-item" href="${live('/about/')}">About</a>
      <div class="language disclosure">
        <button class="nav-item" type="button" data-disclosure aria-expanded="false" aria-controls="language-menu" aria-label="Language: English">EN ${chevron}</button>
        <div class="language-menu" id="language-menu" hidden><a href="#main" lang="en" hreflang="en" aria-current="page">English</a><a href="${live('/zh-tw/')}" lang="zh-TW" hreflang="zh-TW">繁體中文</a><a href="${live('/zh-cn/')}" lang="zh-CN" hreflang="zh-CN">简体中文</a><small>Other languages open the existing site.</small></div>
      </div>
      <a class="nav-item portal-link" href="${live('/portal/')}">Client portal</a>
      <button class="button button-blue nav-cta" type="button" data-inquiry="unsure">Discuss a supplier</button>
    </nav>
  </div>
</header>
<main id="main">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="hero-context">Independent supplier verification in China</p>
      <h1 id="hero-title">Know your supplier.<br>Before you pay.</h1>
      <p class="hero-lead">We check the company behind the quote, the documents behind the claims, and what still needs an answer.</p>
      <div class="hero-actions"><button class="button button-white" type="button" data-inquiry="unsure">Discuss a supplier</button><a href="#services">Compare services</a></div>
      <p class="hero-principle">Working for the buyer.<br> No supplier commissions.</p>
    </div>
    <figure class="hero-image">
      <picture><source media="(max-width: 600px)" srcset="/assets/manufacturing-700.webp"><img src="/assets/manufacturing-1500.webp" alt="A component-placement machine working over an electronic circuit board." width="1500" height="2254" fetchpriority="high"></picture>
      <figcaption>Electronics manufacturing. Context photography, not a ZimonAI assignment.<a href="#image-credit">Photo credit</a></figcaption>
    </figure>
    <div class="hero-focus"><p>Specialist focus <strong>Chargers, power adapters & power banks</strong></p><p>Coordinated from <strong>Taiwan & Shenzhen</strong></p></div>
  </section>

  <section class="evidence shell" id="evidence" aria-labelledby="evidence-title">
    <div class="evidence-copy">
      <h2 id="evidence-title">A genuine certificate.<br>But is it the right one?</h2>
      <p class="section-lead">A document can be authentic and still belong to a different company or exclude the model you plan to buy.</p>
      <dl class="check-scope">
        <div><dt>The company</dt><dd>Match the Chinese legal name behind the quotation to the business-registration record.</dd></div>
        <div><dt>The certificate</dt><dd>Check the issuer’s record, the certificate holder, its status and the models it covers.</dd></div>
        <div><dt>The remaining questions</dt><dd>Keep confirmed facts, discrepancies and unavailable evidence separate. A missing record is not proof of fraud.</dd></div>
      </dl>
      <a class="text-link" href="${live('/methodology/')}">How we verify supplier claims</a>
    </div>
    <aside class="report-preview" aria-label="Existing report artifact">
      <div class="report-stage"><img src="/assets/zimonai-t1-sample-report-cover.png" alt="Unaltered cover of ZimonAI’s existing Supplier Verification Report sample." width="951" height="1345" loading="lazy"></div>
      <div class="report-caption"><strong>An actual report artifact</strong><p>The cover of our existing English sample, shown unchanged. It is not a new supplier finding.</p><button class="text-link" type="button" data-cover>Inspect the original cover</button></div>
      <p class="asset-gap"><strong>Prototype material gap</strong><br>A publication-cleared, anonymized report interior is still needed. No case data has been invented to fill this space.</p>
    </aside>
  </section>

  <section class="services" id="services" aria-labelledby="services-title">
    <div class="shell">
      <header class="services-heading"><h2 id="services-title">Start with the question.<br>Choose the depth.</h2><p>Two defined remote services.<br>Fieldwork and ongoing support are scoped separately.</p></header>
      <div class="services-layout">
        <article class="tier-one" id="t1" aria-labelledby="t1-title">
          <div class="tier-heading"><span class="tier-name">T1</span><p>For a first supplier check</p></div>
          <h3 id="t1-title">${esc(t1.title)}</h3>
          <p class="tier-summary">${esc(t1.fixed.summary)}</p>
          <div class="t1-body"><div><h4>What we check</h4><ul>${t1.fixed.includes.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>
            <div class="price-block"><p class="price">${servicePrice('t1')}</p><p>per standard case</p><p class="turnaround">${serviceTiming('t1')}</p><button class="button button-blue" type="button" data-inquiry="t1">Discuss T1 scope</button></div></div>
          <p class="service-boundary"><strong>Not included</strong> ${esc(t1.notIncluded)}</p>
        </article>
        <article class="tier-two" id="t2" aria-labelledby="t2-title">
          <div class="tier-heading"><span class="tier-name">T2</span><p>When the company needs a closer look</p></div>
          <h3 id="t2-title">${esc(t2.title)}</h3>
          <p class="tier-summary">${esc(t2.fixed.summary)}</p>
          <p class="t2-scope">Includes the standard T1 scope and up to ${SERVICE_FACTS.t2.relatedEntities} directly related entities. Public import/export indicators are reviewed where accessible.</p>
          <div class="t2-price"><p class="price">${servicePrice('t2')}</p><span>per standard case</span></div>
          <p class="turnaround">${serviceTiming('t2')}</p>
          <button class="text-link" type="button" data-inquiry="t2">Discuss T2 scope</button>
          <p class="service-boundary"><strong>Not included</strong> ${esc(t2.notIncluded)}</p>
        </article>
      </div>
      <p class="timing-note">Delivery timing starts after payment is confirmed and all required information is complete.</p>
      <article class="advanced" id="advanced" aria-labelledby="advanced-title">
        <div><p class="advanced-label">Advanced</p><h3 id="advanced-title">${esc(serviceName('advanced'))}</h3><p>For assignments that need supplier interviews, site visits or continuing verification support.</p></div>
        <div class="advanced-action"><strong>Scoped before work begins.</strong><p>${esc(servicePrice('advanced'))}. Supplier cooperation and written consent may be required.</p><button class="button button-outline" type="button" data-inquiry="advanced">Discuss an advanced requirement</button></div>
      </article>
      <p class="service-disclaimer">Verification supports a purchasing decision. It is not certification, a product-quality guarantee or a guarantee of future supplier performance.</p>
    </div>
  </section>
</main>
<footer class="prototype-footer shell"><p><strong>End of homepage visual prototype</strong><br>Other pages and the production website have not been changed by this prototype.</p><p id="image-credit">Photography: <a href="${source}">Nenad Stojković / Shixart1985</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>. Resized and cropped for layout. Location is not asserted. Report cover: ZimonAI’s existing sample.</p></footer>
<dialog id="inquiry-preview" aria-labelledby="inquiry-title"><div class="dialog-inner"><button type="button" class="dialog-close" data-close aria-label="Close preview">×</button><p class="dialog-context">Local prototype only</p><h2 id="inquiry-title">Discuss a supplier</h2><p>This action will lead to the inquiry page with your service selection preserved. No request is submitted from this prototype.</p><dl><dt>Service selection</dt><dd id="inquiry-selection"></dd><dt>Planned destination</dt><dd id="inquiry-destination"></dd></dl><button type="button" class="button button-blue" data-close>Return to the prototype</button></div></dialog>
<dialog id="cover-preview" aria-labelledby="cover-title"><div class="dialog-inner"><button type="button" class="dialog-close" data-close aria-label="Close report cover">×</button><h2 id="cover-title">Existing sample report cover</h2><p>The original cover only. Report interiors are not included in this prototype.</p><img src="/assets/zimonai-t1-sample-report-cover.png" alt="Original cover: Supplier Verification Report — Company Identity, Certificate Traceability & Claim Consistency Review." width="951" height="1345"></div></dialog>
</body></html>`;
}
