/* shared.js — injects nav & footer, handles lang switcher & scroll reveal */

const LOGO_SVG=`<svg style="display:none"><symbol id="logo-s" viewBox="0 0 100 122"><path d="M 36,108 C 85,108 90,72 52,54 C 10,36 10,12 64,12" stroke="#00E5FF" stroke-width="13" stroke-linecap="round" fill="none"/><rect x="3" y="98" width="34" height="20" rx="6" fill="#00E5FF"/><rect x="9" y="103" width="16" height="10" rx="5" fill="#000"/><rect x="63" y="3" width="34" height="18" rx="3" fill="#00E5FF"/><line x1="70" y1="4" x2="70" y2="20" stroke="#000" stroke-width="2.2"/><line x1="76" y1="4" x2="76" y2="20" stroke="#000" stroke-width="2.2"/><line x1="82" y1="4" x2="82" y2="20" stroke="#000" stroke-width="2.2"/><line x1="88" y1="4" x2="88" y2="20" stroke="#000" stroke-width="2.2"/></symbol></svg>`;

const NAV_HTML=(active)=>`
<nav>
  <a href="index.html" class="logo">
    <svg width="22" height="27"><use href="#logo-s"/></svg>Zimon<em>AI</em>
  </a>
  <ul class="nav-mid">
    <li><a href="how-it-works.html" ${active==='how'?'class="active"':''}>How It Works</a></li>
    <li><a href="pricing.html" ${active==='pricing'?'class="active"':''}>Pricing</a></li>
    <li><a href="about.html" ${active==='about'?'class="active"':''}>About</a></li>
    <li><a href="contact.html" ${active==='contact'?'class="active"':''}>Contact</a></li>
  </ul>
  <div class="nav-r">
    <a href="diagnostic.html" class="nav-cta">Start Diagnosis</a>
  </div>
</nav>`;

const FOOTER_HTML=`
<footer>
  <div class="f-top">
    <div class="f-brand">
      <a href="index.html" class="logo"><svg width="22" height="27"><use href="#logo-s"/></svg>Zimon<em>AI</em></a>
      <p>Cross-border AI lab protecting your devices with real lab data.</p>
    </div>
    <div class="f-col">
      <h5>Product</h5>
      <a href="diagnostic.html">Free Diagnosis</a>
      <a href="pricing.html">Deep Report</a>
      <a href="pricing.html">Enterprise</a>
      <a href="how-it-works.html">Methodology</a>
    </div>
    <div class="f-col">
      <h5>Company</h5>
      <a href="about.html">About Us</a>
      <a href="contact.html">Contact</a>
      <a href="privacy.html">Privacy Policy</a>
      <a href="terms.html">Terms of Service</a>
      <a href="refund.html">Refund Policy</a>
    </div>
    <div class="f-col">
      <h5>Support</h5>
      <a href="how-it-works.html#faq">FAQ</a>
      <a href="contact.html">Help Center</a>
      <a href="mailto:slab.stores@gmail.com">slab.stores@gmail.com</a>
    </div>
  </div>
  <div class="f-bot">
    <div class="f-copy">© 2026 ZimonAI Technology. All rights reserved.</div>
    <div class="f-locs">
      <span>Shenzhen</span><div class="f-dot"></div>
      <span>Taipei</span><div class="f-dot"></div>
      <span>Global</span>
    </div>
  </div>
</footer>`;

// Inject logo SVG, nav, footer
document.addEventListener('DOMContentLoaded',()=>{
  const active = document.body.dataset.page||'';
  document.body.insertAdjacentHTML('afterbegin', LOGO_SVG);
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML(active));
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Scroll reveal
  const io=new IntersectionObserver(e=>{
    e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})
  },{threshold:0.08});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.addEventListener('click',()=>item.classList.toggle('open'));
  });
});
