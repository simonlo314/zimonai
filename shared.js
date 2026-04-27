/* shared.js — injects nav & footer, handles lang switcher & scroll reveal */

const LOGO_SVG=`<svg style="display:none"><symbol id="logo-s" viewBox="0 0 100 122"><path d="M 36,108 C 85,108 90,72 52,54 C 10,36 10,12 64,12" stroke="#00E5FF" stroke-width="13" stroke-linecap="round" fill="none"/><rect x="3" y="98" width="34" height="20" rx="6" fill="#00E5FF"/><rect x="9" y="103" width="16" height="10" rx="5" fill="#000"/><rect x="63" y="3" width="34" height="18" rx="3" fill="#00E5FF"/><line x1="70" y1="4" x2="70" y2="20" stroke="#000" stroke-width="2.2"/><line x1="76" y1="4" x2="76" y2="20" stroke="#000" stroke-width="2.2"/><line x1="82" y1="4" x2="82" y2="20" stroke="#000" stroke-width="2.2"/><line x1="88" y1="4" x2="88" y2="20" stroke="#000" stroke-width="2.2"/></symbol></svg>`;

// ── i18n (EN + zh-Hant) ────────────────────────────────────────────────────────
const LANG_KEY = 'zimonai_lang';
const SUPPORTED_LANGS = ['en','zh-Hant'];
const DEFAULT_LANG = 'en';

const I18N = {
  en: {
    nav: {
      how: 'How It Works',
      blog: 'Blog',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      cta: 'Start Diagnosis'
    },
    footer: {
      brand: 'Cross-border AI lab protecting your devices with real lab data.',
      product: 'Product',
      company: 'Company',
      support: 'Support',
      free: 'Free Diagnosis',
      deep: 'Deep Report',
      ent: 'Enterprise',
      meth: 'Methodology',
      about: 'About Us',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      refund: 'Refund Policy',
      faq: 'FAQ',
      help: 'Help Center',
      copy: '© 2026 ZimonAI Technology. All rights reserved.',
      loc1: 'Shenzhen',
      loc2: 'Taipei',
      loc3: 'Global'
    }
  },
  'zh-Hant': {
    nav: {
      how: '運作方式',
      blog: '文章專欄',
      pricing: '定價',
      about: '關於我們',
      contact: '聯絡我們',
      cta: '開始檢測'
    },
    footer: {
      brand: '跨境 AI 實驗室，以真實測試資料守護你的裝置安全。',
      product: '產品',
      company: '公司',
      support: '支援',
      free: '免費檢測',
      deep: '專業報告',
      ent: '企業方案',
      meth: '方法論',
      about: '關於我們',
      contact: '聯絡我們',
      privacy: '隱私權政策',
      terms: '服務條款',
      refund: '退款政策',
      faq: '常見問題',
      help: '客服中心',
      copy: '© 2026 智蒙灣科技 ZimonAI. 保留一切權利。',
      loc1: '深圳',
      loc2: '台北',
      loc3: '全球'
    }
  }
};

// Expose i18n for page inline scripts (contact/delivery, etc.)
try{ window.I18N = I18N; }catch(e){}

// Page copy (use with data-i18n / data-i18n-html / data-i18n-placeholder)
I18N.en.pages = {
  home: {
    hero_eye: 'AI-Powered Hardware Safety',
    hero_title_html: 'Precision.<br/><em>Protection.</em><br/>Performance.',
    hero_sub: 'Pro gear demands pro-grade power. ZimonAI matches your flagship devices with the safest charging tech — backed by real lab data.',
    hero_cta_primary: 'Start Free Assessment',
    hero_cta_secondary: 'See How It Works',
    hero_note: 'Free to assess · No hardware required · 2 min',
    how_eye: 'How It Works',
    how_title: 'Your report in three steps.',
    how_sub: 'Fill out a quick questionnaire — we handle the analysis.',
    learn_more: 'Learn More →'
  },
  how: {
    hero_eye: 'Methodology',
    hero_title_html: 'How ZimonAI <em>Works</em>',
    hero_sub: "From questionnaire to PDF report — here's exactly what happens behind the scenes when you run a diagnosis.",
    process_eye: 'The Process',
    process_title_html: 'Three steps. One report.<br/>Zero guesswork.',
    process_sub: "Our diagnostic pipeline combines hardware database matching with AI risk modeling to give you lab-grade insights — without a lab.",
    faq_title: 'Common questions.',
    ready_eye: 'Ready?',
    ready_title: 'Take 2 minutes to protect your gear.',
    ready_sub: 'Free assessment. No hardware required. Results in 48 hours.',
    ready_cta_primary: 'Start Free Assessment →',
    ready_cta_secondary: 'View Pricing'
  },
  pricing: {
    hero_eye: 'Pricing',
    hero_title_html: 'Choose Your <em>Protection</em> Level',
    hero_sub: 'Free to assess. Pay only for your report. No subscriptions unless you want them.',
    free_tier: 'Free',
    free_name: 'Quick Assessment',
    free_cycle: 'Start anytime',
    free_cta: 'Start Free Assessment',
    pro_pop: 'Most Popular',
    pro_tier: 'Pro',
    pro_name: 'Detailed Safety Report',
    pro_cycle: 'Per report',
    pro_cta: 'Buy Pro Report',
    biz_tier: 'Business',
    biz_name: 'Advanced Report',
    biz_cycle: 'Per report',
    biz_cta: 'Buy Business Report',
    custom_tier: 'Custom',
    custom_name: 'Enterprise / Partnerships',
    custom_price: "Let’s talk",
    custom_cycle: 'Custom pricing per report',
    custom_cta: 'Contact Sales',
    faq_eye: 'Pricing FAQ',
    faq_title: 'Questions about plans.',
    cta_eye: 'Start Now',
    cta_title: 'Assessment is always free.',
    cta_sub: 'Know your risk in 2 minutes. Pay only when you want the full report.',
    cta_primary: 'Start Free Assessment →',
    cta_secondary: 'Talk to Sales'
  },
  contact: {
    hero_eye: 'Get In Touch',
    hero_title_html: "We'd Love to <em>Hear</em> From You",
    hero_sub: "Questions about your report, enterprise plans, or partnerships — we're here.",
    form_eye: 'Send a Message',
    name_label: 'Full Name',
    name_ph: 'Alex Johnson',
    email_label: 'Email Address',
    email_ph: 'alex@company.com',
    subject_label: 'Subject',
    subject_ph: 'Select a topic...',
    msg_label: 'Message',
    msg_ph: 'Tell us how we can help...',
    submit: 'Send Message →',
    sending: 'Sending…',
    success: "✓ Message sent! We'll get back to you within 24 hours.",
    info_eye: 'Contact Info',
    resp_label: 'Response Time',
    resp_val: 'Within 24 hours on business days',
    loc_label: 'Locations',
    loc_val_html: 'Shenzhen, China<br/>Taipei, Taiwan',
    issues_label: 'Report Issues',
    issues_val: 'For issues with existing reports, include your order ID and email in your message for faster support.',
    quick_links: 'Quick Links',
    link_faq: 'Read our FAQ',
    link_pricing: 'View Pricing Plans',
    link_assess: 'Start Free Assessment',
    alert_missing: 'Please fill in your name, email, and message.',
    alert_unconfigured: 'Contact form endpoint is not configured yet.',
    alert_failed: 'Sorry — failed to send. Please try again, or email us directly.'
  }
  ,
  about: {
    hero_eye: 'About ZimonAI',
    hero_title_html: 'Born in Shenzhen.<br/><em>Refined in Taipei.</em>',
    hero_sub: 'A cross-border AI hardware lab dedicated to protecting your devices with real lab data — not marketing claims.',
    mission_eye: 'Our Mission',
    mission_title: "Hardware integrity shouldn't be a luxury.",
    mission_p1: "Born in the heart of Shenzhen's supply chain and refined by Taipei's engineering elite, ZimonAI is a cross-border AI lab dedicated to hardware integrity.",
    mission_p2: "We built ZimonAI because we kept seeing the same story: professionals spending thousands on flagship devices, then destroying them with $10 chargers. The information existed — in lab reports, certification databases, and hardware forums. It just wasn't accessible.",
    mission_p3: 'We changed that.',
    chip_1: 'Shenzhen Supply Chain',
    chip_2: 'Taipei Engineering',
    chip_3: 'AI Lab Verified',
    chip_4: 'Cross-Border R&D',
    values_eye: 'Our Values',
    values_title: 'What we stand for.',
    val1_no: '01 — Principle',
    val1_t: 'Data over marketing',
    val1_d: 'Every recommendation we make is backed by lab-verified data, safety certifications, and real-world testing — not affiliate commissions or brand partnerships.',
    val2_no: '02 — Principle',
    val2_t: 'Clarity over jargon',
    val2_d: "Hardware safety shouldn't require an engineering degree. Our reports are written for humans — clear risk levels, plain-English explanations, actionable next steps.",
    val3_no: '03 — Principle',
    val3_t: 'Access for everyone',
    val3_d: "Enterprise-grade hardware intelligence shouldn't be exclusive to Fortune 500 IT teams. We made it accessible to any professional who cares about their gear.",
    val4_no: '04 — Principle',
    val4_t: 'Privacy first',
    val4_d: 'Your data belongs to you. We never sell personal information, never share diagnostic data with third parties, and encrypt everything end-to-end.',
    where_eye: 'Where We Are',
    where_title: 'Cross-border by design.',
    where_sub: "We operate at the intersection of Shenzhen's hardware supply chain and Taipei's engineering culture — giving us unique insight into both device manufacturing and real-world usage.",
    sh_role: 'Hardware Lab & Supply Chain',
    sh_desc: "Home to our hardware testing lab and supplier network. Direct access to component-level data from the world's largest electronics manufacturing hub.",
    tp_role: 'Engineering & AI Development',
    tp_desc: 'Our AI model training, software engineering, and quality assurance operations. Where lab data becomes actionable intelligence.',
    cta_eye: 'Work With Us',
    cta_title: 'Ready to protect your gear?',
    cta_sub: 'Start with a free 2-minute assessment — or reach out if you have questions.',
    cta_primary: 'Start Free Assessment →',
    cta_secondary: 'Contact Us'
  },
  delivery: {
    hero_eye: 'Delivery',
    hero_title_html: 'Get your <em>Report</em>',
    hero_sub: 'Enter your email so we can deliver your PDF report securely.',
    details_eye: 'Report details',
    email_label: 'Email Address',
    email_ph: 'you@company.com',
    email_note: 'Use the same email you used at checkout if possible.',
    order_label: 'Order reference (optional)',
    order_ph: 'e.g. Paddle order ID / receipt reference',
    order_note: 'If you have an order reference, include it to speed things up.',
    notes_label: 'Notes (optional)',
    notes_ph: "Anything we should know about your order or delivery?",
    submit: 'Submit for delivery →',
    submitting: 'Submitting…',
    ok: "✓ Submitted. We'll email your report shortly.",
    err: "Sorry — we couldn't submit your details. Please try again or email us.",
    help_note_html: 'Need help? Email <a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>.',
    alert_missing: 'Please enter your email address.',
    alert_unconfigured: 'Delivery endpoint is not configured yet.'
  },
  blog: {
    hero_eye: 'Blog',
    hero_title_html: 'Hardware safety, <em>decoded</em>.',
    hero_sub: 'Practical notes on chargers, cables, standards, and failure modes — written for people who care about their devices.',
    latest: 'Latest',
    top_title: 'USB‑C is not a promise.',
    top_sub: 'A quick guide to why “USB‑C” alone doesn’t guarantee safe power delivery — and what signals actually matter.',
    read_article: 'Read article →',
    suggest: 'Suggest a topic',
    read: 'Read →',
    by: 'By ZimonAI Lab',
    tag_standards: 'Standards',
    tag_diagnostics: 'Diagnostics',
    tag_procurement: 'Procurement',
    tag_batteries: 'Batteries',
    tag_wifi: 'Wi‑Fi',
    tag_storage: 'Storage'
  },
  analytics: {
    hero_eye: 'Analytics',
    hero_title_html: 'Traffic <em>Dashboard</em>',
    hero_sub: 'Daily traffic and total traffic for your marketing site.',
    k_today: 'Today',
    k_7d: 'Last 7 days',
    k_all: 'All-time',
    k_pageviews: 'Pageviews',
    breakdown: 'Daily breakdown',
    refresh: 'Refresh',
    warn: 'Tip: keep this page unlinked publicly (or protect it) if you don’t want visitors to see traffic numbers.',
    err: 'Analytics endpoint is not configured, or failed to load.'
  },
  terms: {
    eye: 'Terms',
    title_html: 'Terms of <em>Service</em>',
    effective: 'Effective date: 2026-04-27',
    s1: '1. Service overview',
    s2: '2. No warranty; informational use',
    s3: '3. Eligibility',
    s4: '4. Purchases',
    s5: '5. Acceptable use',
    s6: '6. Intellectual property',
    s7: '7. Limitation of liability',
    s8: '8. Changes to these Terms',
    s9: '9. Contact'
  },
  privacy: {
    eye: 'Privacy',
    title_html: 'Privacy <em>Policy</em>',
    effective: 'Effective date: 2026-04-27',
    s1: '1. Information we collect',
    s2: '2. How we use information',
    s3: '3. Payments',
    s4: '4. Sharing',
    s5: '5. Data retention',
    s6: '6. Security',
    s7: '7. Your choices',
    s8: '8. Contact'
  },
  refund: {
    eye: 'Refunds',
    title_html: 'Refund <em>Policy</em>',
    effective: 'Effective date: 2026-04-27',
    s1: '1. Who processes your payment',
    s2: '2. Refund window',
    s3: '3. How to request a refund',
    s4: '4. Policy reference',
    s5: '5. Changes'
  },
  posts: {
    p1: {
      title_html: 'USB‑C is not a <em>promise</em>.',
      sub: 'What to check before you trust a charger — without lab equipment.',
      back: '← Back to Blog',
      lead: 'USB‑C looks universal, but the connector shape tells you almost nothing about the quality of power inside a charger. Two bricks can both “support fast charge” yet behave very differently under load.',
      h1: '1) Look for real standards, not slogans',
      p1: 'Prefer products that clearly state a recognized standard (for example, USB Power Delivery / PD) and list supported profiles. Marketing phrases like “super fast” without specifics are a common red flag.',
      h2: '2) Check wattage *and* the profiles',
      p2: 'Wattage alone is not enough. A 65W label doesn’t guarantee stable delivery across all profiles. When possible, verify that the charger supports the profile your device expects.',
      h3: '3) Avoid suspiciously cheap multi‑port “everything chargers”',
      p3: 'Multi‑port designs are harder to engineer well. If the price looks too good for the claimed power, it usually is. Power sharing logic and heat management are where corners get cut.',
      h4: '4) Heat is information',
      p4: 'Warm is normal, but “too hot to touch” is a warning signal. Excess heat can indicate inefficient conversion, poor internal components, or unstable regulation under load.',
      h5: '5) Don’t treat cables as interchangeable',
      p5: 'For USB‑C, cable quality matters. Use reputable, appropriately rated cables for the power you’re drawing. If a cable feels loose, shows discoloration, or behaves inconsistently, replace it.',
      cta_t: 'Want a tailored recommendation?',
      cta_d: 'Run a free assessment. Upgrade only if you want a detailed PDF report.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p2: {
      title_html: 'Voltage ripple in <em>plain English</em>.',
      sub: 'Stable charging is about more than wattage.',
      back: '← Back to Blog',
      lead: '“It charges” is not the same as “it charges cleanly”. Ripple is one of the reasons a cheap charger can look fine on the outside yet slowly degrade a device over time.',
      h1: 'What is ripple?',
      p1: 'In simple terms, ripple is the small, rapid fluctuation on top of a power signal that’s supposed to be steady. Think of it as “electrical wobble” riding on the line while your device is trying to charge.',
      h2: 'Why it matters (in real life)',
      p2: 'Devices contain power-management circuits that convert incoming power into what the battery and components actually need. When incoming power is noisy or unstable, those circuits may work harder, generate more heat, and operate with less margin.',
      h3: 'Common signals you can notice without tools',
      p3: 'You can’t measure ripple precisely without equipment, but you can still watch for practical signals: chargers that run unusually hot, inconsistent fast charging, random touch issues while charging, or accessories that behave differently depending on which outlet or power strip you use.',
      h4: 'Not all “fast chargers” are equal',
      p4: 'A label that advertises high wattage says nothing about regulation quality. Good designs use better component selection, thermal design, and protection circuits. Cheap designs often cut corners in exactly the places you can’t see.',
      h5: 'A safer baseline checklist',
      p5: 'When you want a safer default: choose reputable brands, prefer clearly stated standards (e.g., USB‑PD), avoid suspiciously cheap “high‑power multi‑port” bricks, and use appropriately rated cables.',
      cta_t: 'Want a tailored check for your exact setup?',
      cta_d: 'Run a free assessment. Upgrade only if you want a detailed PDF report.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p3: {
      title_html: 'A procurement <em>checklist</em>.',
      sub: 'For teams buying chargers & cables — consistent, easy to adopt.',
      back: '← Back to Blog',
      lead: 'Teams often standardize laptops and phones — then treat power accessories as “cheap and interchangeable”. This checklist helps you buy fewer, better SKUs with fewer surprises.',
      h1: '1) Define your device classes',
      p1: 'List the common device types in your org (e.g., laptops, tablets, phones, peripherals). Procurement gets easier when accessories map to a known set of power needs.',
      h2: '2) Prefer standards and documented profiles',
      p2: 'Look for clear support statements for charging standards (such as USB‑PD) and avoid ambiguous “fast charge” marketing. If the spec sheet is vague, treat it as a risk signal.',
      h3: '3) Cable policy: rating, length, and connectors',
      p3: 'Decide what ratings you allow, acceptable lengths, and connector durability requirements. Cables are a frequent failure point and the easiest to standardize.',
      h4: '4) Heat and enclosure design matter',
      p4: 'Favor chargers with credible thermal design and safety markings, not ultra-compact bricks claiming extreme power. If the charger runs very hot in normal use, treat it as non-compliant.',
      h5: '5) Operationalize it',
      p5: 'Write a one-page internal rule: approved brands/models, replacement intervals, and a process for exceptions. Most teams win by being consistent, not by being perfect.',
      cta_t: 'Need a company-ready standard?',
      cta_d: 'We can help you define a defensible accessory policy and report format.',
      cta_a: 'Talk to us →',
      cta_b: 'View Pricing'
    },
    p4: {
      title_html: 'Battery health <em>myths</em>.',
      sub: 'What “100%” really costs — and what actually matters.',
      back: '← Back to Blog',
      lead: 'Battery health advice online is often presented as strict rules. In reality, most of the impact comes from a few themes: heat, time at high charge, and how hard you push the battery day after day.',
      h1: 'Myth: “Always charge to 100% is fine”',
      p1: 'For many lithium batteries, spending long periods near full charge increases stress compared to stopping earlier. This doesn’t mean “never hit 100%” — it means avoid living there all day, every day.',
      h2: 'Myth: “Fast charging destroys batteries”',
      p2: 'Fast charging is a tool. Good devices and good chargers manage heat and current dynamically. The bigger risk is poor-quality power and sustained heat, not the concept of “fast”.',
      h3: 'Heat is the multiplier',
      p3: 'Heat accelerates wear. If your device is hot while charging (especially under heavy use), battery aging is more likely to speed up. If you can, charge in a cooler environment and avoid heavy workloads during charging.',
      h4: 'Practical habits that don’t require obsession',
      p4: 'Use reputable chargers/cables, avoid “too hot to touch” charging sessions, and don’t keep a device at full charge for long periods unnecessarily. Consistency beats perfection.',
      cta_t: 'Not sure if your charger is stressing your device?',
      cta_d: 'Run a free assessment and get tailored next steps.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p5: {
      title_html: 'Wi‑Fi 6/6E/7, <em>explained</em>.',
      sub: 'What changes for everyday devices — and what doesn’t.',
      back: '← Back to Blog',
      lead: 'Router marketing often makes upgrades feel mandatory. The truth: many Wi‑Fi “generation jumps” are about capacity and consistency, not just peak speed.',
      h1: 'Wi‑Fi 6: better in crowded environments',
      p1: 'Wi‑Fi 6 focuses on efficiency when multiple devices share the same router. Homes and offices with many phones, laptops, TVs, and IoT devices often feel more stable with a good Wi‑Fi 6 setup.',
      h2: 'Wi‑Fi 6E: the 6 GHz lane (when supported)',
      p2: 'Wi‑Fi 6E adds access to the 6 GHz band where available, which can reduce interference. The benefit depends on whether your devices support 6E and whether your environment is congested.',
      h3: 'Wi‑Fi 7: lower latency potential, more complexity',
      p3: 'Wi‑Fi 7 aims to improve throughput and latency for high-performance setups. It can be great, but early ecosystems can be mixed: device support, firmware maturity, and feature compatibility matter a lot.',
      h4: 'How to decide without overthinking',
      p4: 'If your current setup is stable and meets your needs, you can wait. If you have congestion, dropouts, or many devices competing, a well-reviewed Wi‑Fi 6 (or 6E if your devices support it) is often a practical upgrade.',
      cta_t: 'Optimizing a device + power setup?',
      cta_d: 'Start with a free assessment and upgrade only when you want a full report.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p6: {
      title_html: 'SSD basics: endurance & <em>heat</em>.',
      sub: 'Why “fast” isn’t everything — especially for sustained workloads.',
      back: '← Back to Blog',
      lead: 'SSD specs often highlight peak speed, but real performance is usually limited by sustained load, heat, and controller behavior. Reliability is a design choice, not a marketing checkbox.',
      h1: 'What endurance (TBW) means',
      p1: 'TBW (“terabytes written”) is a warranty endurance metric. It’s not a perfect predictor, but it gives a baseline sense of how a drive is positioned. Higher isn’t always necessary, but extremely low endurance on large-capacity drives is a risk signal.',
      h2: 'Why SSDs slow down (and it’s normal)',
      p2: 'Many drives use an SLC cache to boost short bursts. When you write for long periods (big exports, backups, video footage), performance can drop once the cache is exhausted.',
      h3: 'Heat and throttling',
      p3: 'Sustained writes generate heat. When temperatures rise, drives may throttle to protect themselves. Good enclosures, airflow, and realistic workload expectations make a bigger difference than “best peak speed”.',
      h4: 'A sane buying checklist',
      p4: 'Prefer reputable controllers, transparent specs, and credible reviews that include sustained testing. If you’re using an external SSD, pick an enclosure designed for thermal control, not just looks.',
      cta_t: 'Building a stable setup end-to-end?',
      cta_d: 'Power + storage + peripherals all affect reliability. Start with a free assessment.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    }
  }
};

I18N['zh-Hant'].pages = {
  home: {
    hero_eye: 'AI 驅動的硬體安全',
    hero_title_html: '精準。<br/><em>守護。</em><br/>效能。',
    hero_sub: '專業裝備值得更專業的供電。ZimonAI 以 AI 分析你的充電組合，提供更穩定、可信的安全建議。',
    hero_cta_primary: '開始免費檢測',
    hero_cta_secondary: '了解運作方式',
    hero_note: '免費檢測 · 不需寄送硬體 · 約 2 分鐘',
    how_eye: '運作方式',
    how_title: '三步驟完成報告。',
    how_sub: '回答幾個簡單問題，其餘交給我們分析。',
    learn_more: '了解更多 →'
  },
  how: {
    hero_eye: '方法論',
    hero_title_html: 'ZimonAI <em>如何運作</em>',
    hero_sub: '從問卷到 PDF 報告 —— 你完成檢測後，系統背後會發生什麼，我們一次說清楚。',
    process_eye: '流程',
    process_title_html: '三個步驟。一份報告。<br/>不用猜。',
    process_sub: '我們把硬體資料庫比對與 AI 風險建模結合，讓你不進實驗室也能獲得專業洞察。',
    faq_title: '常見問題。',
    ready_eye: '準備好了嗎？',
    ready_title: '用 2 分鐘守護你的裝備。',
    ready_sub: '免費檢測。不需寄送硬體。結果將以 email 通知。',
    ready_cta_primary: '開始免費檢測 →',
    ready_cta_secondary: '查看定價'
  },
  pricing: {
    hero_eye: '定價',
    hero_title_html: '選擇你的 <em>守護</em> 等級',
    hero_sub: '檢測免費。只在你需要完整報告時付費。無需訂閱（除非你想要）。',
    free_tier: '免費',
    free_name: '快速檢測',
    free_cycle: '隨時開始',
    free_cta: '開始免費檢測',
    pro_pop: '最受歡迎',
    pro_tier: 'Pro',
    pro_name: '專業安全報告',
    pro_cycle: '每份報告',
    pro_cta: '購買 Pro 報告',
    biz_tier: 'Business',
    biz_name: '進階報告',
    biz_cycle: '每份報告',
    biz_cta: '購買 Business 報告',
    custom_tier: '客製',
    custom_name: '企業 / 合作',
    custom_price: '洽談',
    custom_cycle: '每份報告客製定價',
    custom_cta: '聯絡業務',
    faq_eye: '定價 FAQ',
    faq_title: '方案常見問題。',
    cta_eye: '立即開始',
    cta_title: '檢測永遠免費。',
    cta_sub: '2 分鐘了解風險。你想要完整報告時再付費。',
    cta_primary: '開始免費檢測 →',
    cta_secondary: '洽談合作'
  },
  contact: {
    hero_eye: '聯絡我們',
    hero_title_html: '很高興 <em>聽見</em> 你的需求',
    hero_sub: '關於報告、企業方案或合作提案 —— 我們都在。',
    form_eye: '傳送訊息',
    name_label: '姓名',
    name_ph: '王小明',
    email_label: 'Email',
    email_ph: 'you@company.com',
    subject_label: '主旨',
    subject_ph: '選擇主題...',
    msg_label: '訊息內容',
    msg_ph: '請描述你的需求...',
    submit: '送出訊息 →',
    sending: '送出中…',
    success: '✓ 已送出！我們會在 1 個工作天內回覆。',
    info_eye: '聯絡資訊',
    resp_label: '回覆時間',
    resp_val: '工作日 24 小時內回覆',
    loc_label: '據點',
    loc_val_html: '中國深圳<br/>台灣台北',
    issues_label: '報告問題',
    issues_val: '若需協助已購買的報告，請在訊息中附上訂單編號與 email 以加快處理。',
    quick_links: '快速連結',
    link_faq: '閱讀常見問題',
    link_pricing: '查看方案定價',
    link_assess: '開始免費檢測',
    alert_missing: '請填寫姓名、Email 與訊息內容。',
    alert_unconfigured: '聯絡表單尚未完成設定。',
    alert_failed: '抱歉，送出失敗。請稍後再試，或直接寄信聯絡我們。'
  }
  ,
  about: {
    hero_eye: '關於 ZimonAI',
    hero_title_html: '立足深圳。<br/><em>精煉於台北。</em>',
    hero_sub: '跨境 AI 硬體實驗室，以真實測試資料守護你的裝置 —— 不靠行銷話術。',
    mission_eye: '我們的使命',
    mission_title: '硬體可靠性，不該是奢侈品。',
    mission_p1: '我們站在深圳供應鏈的第一線，也承襲台北工程文化的嚴謹，用跨境視角做硬體安全這件事。',
    mission_p2: '我們反覆看見同一個故事：專業人士花大錢買旗艦設備，卻被品質不穩的充電器慢慢拖垮。真正的資訊其實存在——在實驗室報告、認證資料庫、硬體論壇——但不夠容易取得。',
    mission_p3: '所以我們把它做成「每個人都能用」的工具。',
    chip_1: '深圳供應鏈',
    chip_2: '台北工程',
    chip_3: 'AI 實驗室驗證',
    chip_4: '跨境研發',
    values_eye: '價值觀',
    values_title: '我們堅持什麼。',
    val1_no: '01 — 原則',
    val1_t: '資料優先，拒絕話術',
    val1_d: '每一項建議都以可追溯的測試資料、認證與實際情境驗證為基礎，而不是分潤或品牌合作。',
    val2_no: '02 — 原則',
    val2_t: '清楚勝過術語',
    val2_d: '硬體安全不該需要工程學位。我們用清晰的風險層級、好懂的解釋、可執行的下一步，讓你能立刻做決策。',
    val3_no: '03 — 原則',
    val3_t: '讓專業變得可及',
    val3_d: '企業級硬體情報不該只屬於大型 IT 團隊。我們讓在意裝備的人都能用得上。',
    val4_no: '04 — 原則',
    val4_t: '隱私優先',
    val4_d: '你的資料屬於你。我們不販售個資、不任意分享診斷資料，並以合理的安全措施保護傳輸與儲存。',
    where_eye: '我們在哪裡',
    where_title: '跨境，是我們的設計。',
    where_sub: '我們連結深圳的硬體供應鏈與台北的工程文化，同時理解製造端與使用端的真實狀況。',
    sh_role: '硬體實驗室與供應鏈',
    sh_desc: '硬體測試與供應商網絡的基地，能更接近元件層級資訊與製造實務。',
    tp_role: '工程與 AI 開發',
    tp_desc: '模型訓練、軟體工程與品質驗證所在地，把測試資料轉化成可行動的洞察。',
    cta_eye: '與我們合作',
    cta_title: '準備好守護你的裝備了嗎？',
    cta_sub: '先做一個 2 分鐘的免費檢測；若有問題也歡迎直接聯絡我們。',
    cta_primary: '開始免費檢測 →',
    cta_secondary: '聯絡我們'
  },
  delivery: {
    hero_eye: '交付',
    hero_title_html: '取得你的 <em>報告</em>',
    hero_sub: '請留下 Email，我們會以更安全的方式寄送你的 PDF 報告。',
    details_eye: '報告資料',
    email_label: 'Email',
    email_ph: 'you@company.com',
    email_note: '建議使用結帳時填寫的 Email，以加快核對。',
    order_label: '訂單參考（選填）',
    order_ph: '例如：Paddle 訂單號 / 收據參考',
    order_note: '若你有訂單參考資訊，填上可加快處理。',
    notes_label: '備註（選填）',
    notes_ph: '有任何交付或訂單相關需求嗎？',
    submit: '提交交付資訊 →',
    submitting: '提交中…',
    ok: '✓ 已提交。我們將儘快以 Email 寄送報告。',
    err: '抱歉，提交失敗。請稍後再試或直接寄信聯絡我們。',
    help_note_html: '需要協助？請寄信至 <a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>。',
    alert_missing: '請輸入你的 Email。',
    alert_unconfigured: '交付頁尚未完成設定。'
  },
  blog: {
    hero_eye: '文章專欄',
    hero_title_html: '數碼科普，<em>講清楚</em>。',
    hero_sub: '關於充電器、線材、標準、故障模式與日常數碼常識 —— 寫給在意裝備的人。',
    latest: '最新文章',
    top_title: 'USB‑C 不是保證。',
    top_sub: '為什麼「有 USB‑C」不代表供電安全？以及你真正該看什麼訊號。',
    read_article: '閱讀文章 →',
    suggest: '建議主題',
    read: '閱讀 →',
    by: 'ZimonAI Lab',
    tag_standards: '標準',
    tag_diagnostics: '診斷',
    tag_procurement: '採購',
    tag_batteries: '電池',
    tag_wifi: 'Wi‑Fi',
    tag_storage: '儲存'
  },
  analytics: {
    hero_eye: '流量分析',
    hero_title_html: '流量 <em>儀表板</em>',
    hero_sub: '查看你的官網每日流量與累計流量。',
    k_today: '今天',
    k_7d: '近 7 天',
    k_all: '累計',
    k_pageviews: '瀏覽量',
    breakdown: '每日明細',
    refresh: '重新整理',
    warn: '提示：若不希望訪客看到流量數字，請不要公開連結此頁。',
    err: '分析服務尚未完成設定，或讀取失敗。'
  },
  terms: {
    eye: '條款',
    title_html: '服務 <em>條款</em>',
    effective: '生效日期：2026-04-27',
    s1: '1. 服務概要',
    s2: '2. 免責聲明與資訊用途',
    s3: '3. 使用資格',
    s4: '4. 購買與付款',
    s5: '5. 可接受使用規範',
    s6: '6. 智慧財產權',
    s7: '7. 責任限制',
    s8: '8. 條款更新',
    s9: '9. 聯絡方式'
  },
  privacy: {
    eye: '隱私',
    title_html: '隱私權 <em>政策</em>',
    effective: '生效日期：2026-04-27',
    s1: '1. 我們蒐集的資訊',
    s2: '2. 資訊使用方式',
    s3: '3. 付款處理',
    s4: '4. 資訊分享',
    s5: '5. 資料保存',
    s6: '6. 資安措施',
    s7: '7. 你的選擇',
    s8: '8. 聯絡方式'
  },
  refund: {
    eye: '退款',
    title_html: '退款 <em>政策</em>',
    effective: '生效日期：2026-04-27',
    s1: '1. 付款處理單位',
    s2: '2. 退款期間',
    s3: '3. 退款申請方式',
    s4: '4. 政策參考',
    s5: '5. 政策更新'
  },
  posts: {
    p1: {
      title_html: 'USB‑C 不是 <em>保證</em>。',
      sub: '不用實驗室設備，也能判斷一顆充電器值不值得信任。',
      back: '← 回到文章列表',
      lead: 'USB‑C 看起來很通用，但接頭長相幾乎無法代表供電品質。兩顆都宣稱「支援快充」的充電器，在負載下可能有截然不同的表現。',
      h1: '1) 先看標準，不看口號',
      p1: '優先選擇清楚標示標準（例如 USB Power Delivery / PD）且能列出支援檔位的產品。只寫「超快充」卻沒有規格細節，通常是風險訊號。',
      h2: '2) 看瓦數，也看檔位',
      p2: '瓦數不代表一切。標 65W 不代表各檔位都穩定。能的話，確認充電器支援你的裝置所需的協議與檔位。',
      h3: '3) 小心「超便宜、什麼都能充」的多孔充電器',
      p3: '多孔設計更難做好。如果價格明顯不合理，通常代表在內部用料、分配邏輯與散熱上做了妥協。',
      h4: '4) 溫度是一種資訊',
      p4: '微溫正常，但「燙到拿不住」就是警訊。過熱可能代表轉換效率差、元件品質不佳，或在負載下調節不穩。',
      h5: '5) 線材不是都一樣',
      p5: 'USB‑C 線材品質很重要。請使用可靠、額定功率/電流足夠的線材。若接頭鬆動、變色或使用上忽快忽慢，建議直接更換。',
      cta_t: '想要針對你的組合做客製建議？',
      cta_d: '先做免費檢測。只有你需要完整 PDF 報告時才付費升級。',
      cta_a: '開始免費檢測 →',
      cta_b: '查看定價'
    },
    p2: {
      title_html: '用 <em>白話</em> 看懂電壓紋波。',
      sub: '充電穩不穩，從來不只看瓦數。',
      back: '← 回到文章列表',
      lead: '「可以充」不等於「充得乾淨」。許多廉價充電器外觀看起來正常，卻可能長期以不穩定供電慢慢傷害裝置。',
      h1: '什麼是紋波？',
      p1: '簡單說，紋波就是本該穩定的電壓上，出現細小而快速的波動。你可以把它想成供電線上的「抖動」。',
      h2: '為什麼它在現實中很重要',
      p2: '裝置內部有電源管理電路會把輸入電力轉成電池與元件真正需要的形式。當輸入電力噪聲偏高，這些電路可能更吃力、更熱，穩定餘裕也更小。',
      h3: '不用儀器也能觀察的訊號',
      p3: '你未必能直接量測紋波，但可以留意：充電器異常燙、快充忽快忽慢、充電時觸控異常，或換個插座就行為不同。',
      h4: '不是每顆「快充」都一樣',
      p4: '高瓦數標示不代表調節品質好。好的設計在元件、散熱、保護機制都更紮實；便宜方案常在看不見的地方省料。',
      h5: '一份更安全的基礎清單',
      p5: '優先選擇可信品牌、規格標示清楚（如 USB‑PD）、避免過度便宜的高功率多孔充電器，並使用額定匹配的線材。',
      cta_t: '想檢查你的實際組合嗎？',
      cta_d: '先做免費檢測，只有你需要完整 PDF 報告時再升級。',
      cta_a: '開始免費檢測 →',
      cta_b: '查看定價'
    },
    p3: {
      title_html: '採購 <em>清單</em>：充電器與線材。',
      sub: '給團隊的採購標準：一致、可執行、好維護。',
      back: '← 回到文章列表',
      lead: '許多團隊會標準化筆電與手機，卻把供電配件當成可隨便替換的消耗品。這份清單幫你用更少 SKU、降低後續風險。',
      h1: '1) 先定義裝置類別',
      p1: '先盤點主要裝置類型（筆電、平板、手機、周邊）。當配件可以對應到清楚的需求分類，採購會簡單很多。',
      h2: '2) 優先看標準與可驗證規格',
      p2: '選擇明確標示充電標準（例如 USB‑PD）的產品，避免只寫「快充」卻沒有細節。規格含糊就是風險訊號。',
      h3: '3) 制定線材政策：額定、長度、耐用性',
      p3: '先規範可接受的線材額定、長度範圍與接頭耐用標準。線材是最常見故障點，也最容易先做好。',
      h4: '4) 散熱與外殼設計很重要',
      p4: '優先選擇散熱設計與安全標示可信的充電器，而不是追求極小體積卻宣稱極高功率的產品。若日常使用就過熱，應視為不合格。',
      h5: '5) 把規範落地',
      p5: '用一頁文件定義：核准品牌/型號、替換週期、例外申請流程。多數團隊靠一致執行就能明顯降低風險。',
      cta_t: '需要企業可用的採購標準？',
      cta_d: '我們可以協助你設計可落地的配件政策與報告格式。',
      cta_a: '聯絡我們 →',
      cta_b: '查看定價'
    },
    p4: {
      title_html: '電池健康的 <em>迷思</em>。',
      sub: '「100%」的代價是什麼？真正該在意什麼？',
      back: '← 回到文章列表',
      lead: '網路上的電池建議常像硬性規則，但實際上影響最大的通常只有幾件事：溫度、長時間高電量、以及你每天如何使用裝置。',
      h1: '迷思：一直充到 100% 沒差',
      p1: '對多數鋰電池而言，長時間處在高電量通常比提早停止更有壓力。不是不能到 100%，而是不要長期停在滿電狀態。',
      h2: '迷思：快充一定傷電池',
      p2: '快充本身只是工具。好的裝置與充電器會動態管理溫度與電流；真正風險通常是低品質供電與長時間高溫。',
      h3: '溫度是放大器',
      p3: '高溫會加速老化。若你充電時裝置經常偏燙（尤其同時高負載），老化通常會更快。可行的做法是降低環境溫度並避免邊重度使用邊充電。',
      h4: '不需要焦慮，也能做對',
      p4: '使用可靠的充電器與線材，避免「燙到拿不住」的充電情境，也不要長期讓裝置一直滿電。持續做對比追求完美更重要。',
      cta_t: '不確定你的充電組合是否在傷設備？',
      cta_d: '做一次免費檢測，取得可執行的下一步建議。',
      cta_a: '開始免費檢測 →',
      cta_b: '查看定價'
    },
    p5: {
      title_html: 'Wi‑Fi 6/6E/7，<em>一次看懂</em>。',
      sub: '哪些升級值得做？哪些其實不用急？',
      back: '← 回到文章列表',
      lead: '路由器行銷常讓升級看起來像必需，但很多世代變化其實重點是「多人環境下的穩定性與效率」，不只是峰值速度。',
      h1: 'Wi‑Fi 6：多人環境更穩',
      p1: 'Wi‑Fi 6 的核心是提升多裝置同時連線效率。若家裡或辦公室設備很多，通常會感受到更穩定的日常體驗。',
      h2: 'Wi‑Fi 6E：新增 6GHz 頻段（需支援）',
      p2: '6E 在可用地區可使用 6GHz，常能降低干擾；但效果取決於你的終端是否支援，以及環境是否擁擠。',
      h3: 'Wi‑Fi 7：更低延遲潛力，也更看生態成熟度',
      p3: 'Wi‑Fi 7 在吞吐與延遲上有潛力，但初期也更仰賴裝置支援、韌體成熟度與相容性。',
      h4: '怎麼選最務實',
      p4: '如果現有網路穩定且夠用，可以先不升；若你常遇到擁塞、掉線、多裝置互搶，優質的 Wi‑Fi 6（或裝置支援時選 6E）通常是實際有效的升級。',
      cta_t: '想同時優化設備與供電組合？',
      cta_d: '先做免費檢測，只有需要完整報告時再升級。',
      cta_a: '開始免費檢測 →',
      cta_b: '查看定價'
    },
    p6: {
      title_html: 'SSD 基礎：耐久與 <em>散熱</em>。',
      sub: '為什麼「快」不是唯一指標。',
      back: '← 回到文章列表',
      lead: 'SSD 規格常主打峰值速度，但真實體驗常受持續負載、溫度與控制器行為影響。可靠性是設計結果，不是口號。',
      h1: 'TBW（可寫入總量）代表什麼',
      p1: 'TBW 是耐久度的保固指標，不是絕對預測，但可作為定位參考。大容量卻搭配異常低耐久通常是風險訊號。',
      h2: '為什麼 SSD 會降速（而且常見）',
      p2: '許多 SSD 會用 SLC 快取提升短時間速度。當你長時間寫入（備份、匯出、素材搬移），快取耗盡後速度下滑屬常見現象。',
      h3: '溫度與降頻',
      p3: '持續寫入會升溫，溫度過高時 SSD 會降頻保護。好的外殼散熱與合理負載管理，往往比追求峰值數字更實際。',
      h4: '務實選購清單',
      p4: '優先看控制器與規格透明度，並參考有持續負載測試的評測。外接 SSD 也建議選散熱設計可靠的外殼。',
      cta_t: '想建立更穩定的整體配置？',
      cta_d: '供電、儲存、周邊會一起影響可靠性。先從免費檢測開始。',
      cta_a: '開始免費檢測 →',
      cta_b: '查看定價'
    }
  }
};
function getLang(){
  try{
    const saved = localStorage.getItem(LANG_KEY);
    if(saved && SUPPORTED_LANGS.includes(saved)) return saved;
  }catch(e){}
  // If html lang is set to zh-Hant, respect it
  const htmlLang = (document.documentElement.getAttribute('lang') || '').trim();
  if(SUPPORTED_LANGS.includes(htmlLang)) return htmlLang;
  return DEFAULT_LANG;
}

function setLang(lang){
  const next = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  try{ localStorage.setItem(LANG_KEY, next); }catch(e){}
  document.documentElement.setAttribute('lang', next);
  document.documentElement.setAttribute('data-lang', next);
  applyI18n(next);
  // re-render nav/footer so labels update
  rerenderShell(next);
}

function t(path, lang){
  const parts = String(path || '').split('.');
  let cur = I18N[lang] || I18N[DEFAULT_LANG];
  for(const p of parts){
    cur = cur && cur[p];
  }
  return (typeof cur === 'string') ? cur : (I18N[DEFAULT_LANG]?.[parts[0]]?.[parts[1]] || '');
}

function applyI18n(lang){
  // data-i18n="key.path" => sets textContent
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const val = t(key, lang);
    if(val) el.textContent = val;
  });

  // data-i18n-html="key.path" => sets innerHTML
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const key = el.getAttribute('data-i18n-html');
    const val = t(key, lang);
    if(val) el.innerHTML = val;
  });

  // data-i18n-placeholder="key.path"
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    const val = t(key, lang);
    if(val) el.setAttribute('placeholder', val);
  });
}

function shellLangSwitch(lang){
  return `
    <div class="lang-sw" role="group" aria-label="Language switch">
      <button class="lbtn ${lang==='en'?'on':''}" type="button" data-lang="en">EN</button>
      <button class="lbtn ${lang==='zh-Hant'?'on':''}" type="button" data-lang="zh-Hant">繁中</button>
    </div>
  `;
}

// Optional lightweight analytics (Google Apps Script endpoint).
// Leave as-is until you deploy the endpoint and paste the URL.
const ANALYTICS_ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbxNyz1_X2eMV-8v-AaYnsCOgtJl8Fd98MOfst21ZefBqTggu4bhdcrd0VZR5EiyqcxB/exec';
const ANALYTICS_SITE_ID = 'zimonai.com';

const NAV_HTML=(active, lang)=>`
<nav>
  <a href="index.html" class="logo">
    <svg width="22" height="27"><use href="#logo-s"/></svg>Zimon<em>AI</em>
  </a>
  <ul class="nav-mid">
    <li><a href="how-it-works.html" ${active==='how'?'class="active"':''}>${t('nav.how',lang)}</a></li>
    <li><a href="blog.html" ${active==='blog'?'class="active"':''}>${t('nav.blog',lang)}</a></li>
    <li><a href="pricing.html" ${active==='pricing'?'class="active"':''}>${t('nav.pricing',lang)}</a></li>
    <li><a href="about.html" ${active==='about'?'class="active"':''}>${t('nav.about',lang)}</a></li>
    <li><a href="contact.html" ${active==='contact'?'class="active"':''}>${t('nav.contact',lang)}</a></li>
  </ul>
  <div class="nav-r">
    ${shellLangSwitch(lang)}
    <a href="diagnostic.html" class="nav-cta">${t('nav.cta',lang)}</a>
  </div>
</nav>`;

const FOOTER_HTML=(lang)=>`
<footer>
  <div class="f-top">
    <div class="f-brand">
      <a href="index.html" class="logo"><svg width="22" height="27"><use href="#logo-s"/></svg>Zimon<em>AI</em></a>
      <p>${t('footer.brand',lang)}</p>
    </div>
    <div class="f-col">
      <h5>${t('footer.product',lang)}</h5>
      <a href="diagnostic.html">${t('footer.free',lang)}</a>
      <a href="pricing.html">${t('footer.deep',lang)}</a>
      <a href="pricing.html">${t('footer.ent',lang)}</a>
      <a href="how-it-works.html">${t('footer.meth',lang)}</a>
    </div>
    <div class="f-col">
      <h5>${t('footer.company',lang)}</h5>
      <a href="about.html">${t('footer.about',lang)}</a>
      <a href="contact.html">${t('footer.contact',lang)}</a>
      <a href="privacy.html">${t('footer.privacy',lang)}</a>
      <a href="terms.html">${t('footer.terms',lang)}</a>
      <a href="refund.html">${t('footer.refund',lang)}</a>
    </div>
    <div class="f-col">
      <h5>${t('footer.support',lang)}</h5>
      <a href="how-it-works.html#faq">${t('footer.faq',lang)}</a>
      <a href="contact.html">${t('footer.help',lang)}</a>
      <a href="mailto:slab.stores@gmail.com">slab.stores@gmail.com</a>
    </div>
  </div>
  <div class="f-bot">
    <div class="f-copy">${t('footer.copy',lang)}</div>
    <div class="f-locs">
      <span>${t('footer.loc1',lang)}</span><div class="f-dot"></div>
      <span>${t('footer.loc2',lang)}</span><div class="f-dot"></div>
      <span>${t('footer.loc3',lang)}</span>
    </div>
  </div>
</footer>`;

function rerenderShell(lang){
  // remove existing injected nav/footer then re-inject so labels update
  const nav = document.querySelector('nav');
  if(nav) nav.remove();
  const footer = document.querySelector('footer');
  if(footer) footer.remove();

  const active = document.body.dataset.page||'';
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML(active, lang));
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML(lang));

  // wire language buttons
  document.querySelectorAll('.lang-sw .lbtn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const next = btn.getAttribute('data-lang');
      setLang(next);
    });
  });
}

// Inject logo SVG, nav, footer
document.addEventListener('DOMContentLoaded',()=>{
  try{
    const lang = getLang();
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    const active = document.body.dataset.page||'';
    document.body.insertAdjacentHTML('afterbegin', LOGO_SVG);
    document.body.insertAdjacentHTML('afterbegin', NAV_HTML(active, lang));
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML(lang));

    // wire language buttons
    document.querySelectorAll('.lang-sw .lbtn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const next = btn.getAttribute('data-lang');
        setLang(next);
      });
    });
  }catch(e){}

  // apply page-specific i18n keys (optional)
  try{
    applyI18n(getLang());
  }catch(e){}

  // Pageview tracking (safe no-op until configured)
  try{
    if(ANALYTICS_ENDPOINT_URL && !ANALYTICS_ENDPOINT_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_ANALYTICS_WEB_APP_URL_HERE')){
      const payload = {
        type: 'pageview',
        site_id: ANALYTICS_SITE_ID,
        page: window.location.pathname,
        title: document.title,
        referrer: document.referrer || '',
        user_agent: navigator.userAgent,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        ts: new Date().toISOString()
      };
      const body = JSON.stringify(payload);

      if(navigator.sendBeacon){
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(ANALYTICS_ENDPOINT_URL, blob);
      }else{
        fetch(ANALYTICS_ENDPOINT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true
        }).catch(()=>{});
      }
    }
  }catch(e){}

  // Scroll reveal
  try{
    if(typeof IntersectionObserver === 'function'){
      const io=new IntersectionObserver(e=>{
        e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})
      },{threshold:0.08});
      document.querySelectorAll('.rv').forEach(el=>io.observe(el));
    }else{
      // Fallback: reveal everything immediately on older browsers
      document.querySelectorAll('.rv').forEach(el=>el.classList.add('on'));
    }
  }catch(e){
    document.querySelectorAll('.rv').forEach(el=>el.classList.add('on'));
  }

  // FAQ accordion
  try{
    document.querySelectorAll('.faq-item').forEach(item=>{
      item.addEventListener('click',()=>item.classList.toggle('open'));
    });
  }catch(e){}
});
