/* shared.js — injects nav & footer, handles lang switcher & scroll reveal */

const LOGO_SVG=`<svg style="display:none"><symbol id="logo-s" viewBox="0 0 100 122"><path d="M 36,108 C 85,108 90,72 52,54 C 10,36 10,12 64,12" stroke="#00E5FF" stroke-width="13" stroke-linecap="round" fill="none"/><rect x="3" y="98" width="34" height="20" rx="6" fill="#00E5FF"/><rect x="9" y="103" width="16" height="10" rx="5" fill="#000"/><rect x="63" y="3" width="34" height="18" rx="3" fill="#00E5FF"/><line x1="70" y1="4" x2="70" y2="20" stroke="#000" stroke-width="2.2"/><line x1="76" y1="4" x2="76" y2="20" stroke="#000" stroke-width="2.2"/><line x1="82" y1="4" x2="82" y2="20" stroke="#000" stroke-width="2.2"/><line x1="88" y1="4" x2="88" y2="20" stroke="#000" stroke-width="2.2"/></symbol></svg>`;

// ── i18n (EN + zh-Hant) ────────────────────────────────────────────────────────
const LANG_KEY = 'zimonai_lang';
const SUPPORTED_LANGS = ['en','zh-Hant'];
const DEFAULT_LANG = 'en';

const I18N = {
  en: {
    meta: {
      index: 'ZimonAI — AI Hardware Safety Diagnostics',
      how_it_works: 'How It Works — ZimonAI',
      pricing: 'Pricing — ZimonAI',
      about: 'About — ZimonAI',
      contact: 'Contact — ZimonAI',
      blog: 'Blog — ZimonAI',
      blog_01: 'USB-C is not a promise — ZimonAI Blog',
      blog_02: 'Voltage ripple in plain English — ZimonAI Blog',
      blog_03: 'Procurement checklist for chargers & cables — ZimonAI Blog',
      blog_04: 'Battery health myths — ZimonAI Blog',
      blog_05: 'Wi-Fi 6/6E/7 — ZimonAI Blog',
      blog_06: 'SSD basics — ZimonAI Blog',
      blog_12: 'Why your phone charges slow with fast cables — ZimonAI Blog',
      analytics: 'Analytics — ZimonAI',
      delivery: 'Delivery — ZimonAI',
      terms: 'Terms of Service — ZimonAI',
      privacy: 'Privacy Policy — ZimonAI',
      refund: 'Refund Policy — ZimonAI',
      lab: 'AI Lab — ZimonAI',
      use_cases: 'Use Cases — ZimonAI',
      game: 'Charge Race — ZimonAI Game',
      diagnostic: 'ZimonAI Diagnostic'
    },
    nav: {
      how: 'How It Works',
      lab: 'AI Lab',
      use_cases: 'Use Cases',
      game: 'Game',
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
      lab: 'AI Lab',
      game: 'Charge Race',
      use_cases: 'Use Cases',
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
    meta: {
      index: 'ZimonAI — AI 硬體安全診斷',
      how_it_works: '運作方式 — ZimonAI',
      pricing: '定價 — ZimonAI',
      about: '關於我們 — ZimonAI',
      contact: '聯絡我們 — ZimonAI',
      blog: '文章專欄 — ZimonAI',
      blog_01: 'USB-C 不是保證 — ZimonAI 文章',
      blog_02: '白話解析電壓紋波 — ZimonAI 文章',
      blog_03: '充電器與線材採購清單 — ZimonAI 文章',
      blog_04: '電池健康迷思 — ZimonAI 文章',
      blog_05: 'Wi-Fi 6/6E/7 一次看懂 — ZimonAI 文章',
      blog_06: 'SSD 基礎與散熱 — ZimonAI 文章',
      blog_12: '為什麼手機用快充線還是充很慢 — ZimonAI 文章',
      analytics: '流量分析 — ZimonAI',
      delivery: '報告交付 — ZimonAI',
      terms: '服務條款 — ZimonAI',
      privacy: '隱私權政策 — ZimonAI',
      refund: '退款政策 — ZimonAI',
      lab: 'AI 實驗室 — ZimonAI',
      use_cases: '應用場景 — ZimonAI',
      game: '充電競速 — ZimonAI 小遊戲',
      diagnostic: 'ZimonAI 診斷'
    },
    nav: {
      how: '運作方式',
      lab: 'AI 實驗室',
      use_cases: '應用場景',
      game: '小遊戲',
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
      lab: 'AI 實驗室',
      game: '充電競速',
      use_cases: '應用場景',
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
    learn_more: 'Learn More →',
    stat_1: 'Diagnostic Accuracy',
    stat_2: 'Devices Audited',
    stat_3: 'Certified Profiles',
    stat_4: 'Report Delivery',
    step_1_no: 'Step 01',
    step_1_t: 'Answer a few quick questions',
    step_1_d: 'Tell us your devices and charger models. It only takes a couple of minutes and is free.',
    step_2_no: 'Step 02',
    step_2_t: 'AI runs the analysis',
    step_2_d: 'Our model compares your setup with certified hardware profiles and safety signals.',
    step_3_no: 'Step 03',
    step_3_t: 'Get your PDF report',
    step_3_d: 'Receive a detailed report with risk levels, compatibility notes, and practical recommendations.',
    why_eye: 'Why It Matters',
    why_title: 'Charging is the lifeline of your digital legacy.',
    why_sub_html: 'In an era where work happens on the move, a safe charge is the invisible foundation of productivity. <strong style="color:var(--text);font-weight:500">Don\'t let a cheap cable become the silent killer of your professional gear.</strong>',
    fc1_no: '01 — Risk',
    fc1_t: 'Voltage spike damage',
    fc1_d: 'Unregulated chargers can send unstable bursts that slowly stress batteries and logic boards.',
    fc2_no: '02 — Risk',
    fc2_t: 'Thermal runaway risk',
    fc2_d: 'Poor thermal control in low-quality accessories can push devices beyond safe operating ranges.',
    fc3_no: '03 — Risk',
    fc3_t: 'Battery lifespan erosion',
    fc3_d: 'Mismatched charging profiles may accelerate battery wear and long-term degradation.',
    testi_eye: 'What Users Say',
    testi_title: 'Trusted by pro creators and engineers.',
    testi_sub: 'Real feedback from users who care about protecting their gear.',
    testi_q1: '"I was using a random USB-C brick for my M3 Max. ZimonAI flagged it immediately — the ripple risk was clear. I switched chargers the same day."',
    testi_q2: '"Finally a service that explains compatibility in plain English. The report is detailed and actually actionable."',
    testi_q3: '"Our IT team now checks every new hardware purchase with ZimonAI. It prevents expensive mistakes."',
    testi_r1: 'Video Editor, Los Angeles',
    testi_r2: 'ML Engineer, San Francisco',
    testi_r3: 'IT Director, Austin',
    cta_eye: 'Get Started',
    cta_title: 'Your gear deserves better protection.',
    cta_sub: '2-minute assessment — free. Know your risk before it becomes a real problem.',
    cta_primary: 'Start Free Assessment →',
    cta_secondary: 'View Pricing',
    quick_eye: 'Quick Risk Check',
    quick_title: 'See your charging risk in 10 seconds.',
    quick_sub: 'Pick your setup and instantly get a baseline risk signal.',
    quick_device: 'Primary device',
    quick_device_1: 'Smartphone',
    quick_device_2: 'Tablet',
    quick_device_3: 'Laptop',
    quick_device_4: 'Workstation',
    quick_charger: 'Charger quality',
    quick_charger_1: 'Certified',
    quick_charger_2: 'Mixed',
    quick_charger_3: 'Unknown',
    quick_cable: 'Cable quality',
    quick_cable_1: 'Certified',
    quick_cable_2: 'Generic',
    quick_cable_3: 'Unknown',
    quick_btn: 'Run Quick Check',
    quick_result_low: 'Low baseline risk. Keep your current setup and monitor heat over time.',
    quick_result_mid: 'Moderate baseline risk. A better charger or cable can reduce long-term battery wear.',
    quick_result_high: 'High baseline risk. Upgrade your power setup now to avoid hidden hardware damage.',
    quick_cta_diag: 'Run Full Diagnosis',
    quick_cta_price: 'See Plan Fit',
    compare_eye: 'Decision Advantage',
    compare_title: 'Without vs with ZimonAI.',
    compare_left_t: 'Without ZimonAI',
    compare_left_1: 'Guess-based charger purchases',
    compare_left_2: 'Unclear compatibility risks',
    compare_left_3: 'Higher chance of silent battery wear',
    compare_right_t: 'With ZimonAI',
    compare_right_1: 'Data-backed purchase decisions',
    compare_right_2: 'Clear risk and compatibility signals',
    compare_right_3: 'Actionable steps to protect device lifespan',
    sticky_default: 'Protect your setup with a 2-minute assessment.',
    sticky_mid: 'Your setup may have hidden risk. Run the full check now.',
    sticky_end: 'Ready to decide? Choose the right plan for your setup.',
    sticky_cta_assess: 'Start Assessment',
    sticky_cta_pricing: 'View Pricing'
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
    ready_cta_secondary: 'View Pricing',
    ds1_no: 'Step 01 — Input',
    ds1_t: 'Answer a few quick questions',
    ds1_p1: 'Share your device model, charger brand and wattage, cable type, battery health, and any symptoms you noticed.',
    ds1_p2: 'The questionnaire is free and takes only a few minutes. Your answers become the foundation of your risk profile.',
    ds1_detail_html: '<strong>What we ask:</strong> Device model · Charger brand & wattage · Cable source · Battery age · Observed symptoms',
    ds2_no: 'Step 02 — Analysis',
    ds2_t: 'AI cross-references certified profiles',
    ds2_p1: 'Our AI compares your setup with certified hardware data from lab testing, manufacturer specs, and safety references.',
    ds2_p2: 'It checks ripple risk, thermal compatibility, protocol mismatch, and cable integrity to estimate your risk level.',
    ds2_detail_html: '<strong>What AI checks:</strong> Ripple thresholds · Thermal compatibility · Charging protocol match · Cable resistance · Battery fit',
    ds3_no: 'Step 03 — Report',
    ds3_t: 'Receive your PDF safety report',
    ds3_p1: 'A detailed PDF report is delivered to your inbox with risk breakdown and tailored recommendations.',
    ds3_p2: 'Reports are clear and actionable, so you can decide your next step quickly.',
    ds3_detail_html: '<strong>Report includes:</strong> Risk score · Factor breakdown · Compatibility notes · Charger/cable guidance · Safety summary',
    tech_eye: 'The Technology',
    tech_title: "What's under the hood.",
    tech_sub: 'Our diagnostic engine is built on hardware testing experience and a continuously updated certified dataset.',
    tech1_t: 'Voltage Ripple Monitor',
    tech1_d: "Waveform-aware checks compare charger output behavior with safer operating ranges for your device class.",
    tech2_t: 'Thermal Signature Analysis',
    tech2_d: 'Heat-pattern analysis helps detect combinations that may lead to unstable or unsafe charging behavior.',
    tech3_t: 'Hardware Compatibility DB',
    tech3_d: 'A growing compatibility dataset helps us evaluate charger-device-cable combinations more reliably.',
    tech4_t: 'Safety Certification Engine',
    tech4_d: 'Cross-references certification signals to flag potentially unverified components in your setup.',
    faq_eye: 'FAQ',
    faq1_q: 'Is the assessment really free?',
    faq1_a: 'Yes. The questionnaire and preview are free. You only pay if you want the full PDF report.',
    faq2_q: 'Do I need to send in my hardware?',
    faq2_a: 'No. The process is fully digital based on your device and charger information.',
    faq3_q: 'How accurate is the diagnostic?',
    faq3_a: 'The model is continuously refined with new reference data and verification signals to improve reliability.',
    faq4_q: 'How long does the report take?',
    faq4_a: 'Most reports are delivered within 24-48 hours by email.',
    faq5_q: 'What devices do you support?',
    faq5_a: 'We support major laptop, smartphone, tablet, and USB-C device categories across mainstream ecosystems.',
    faq6_q: 'Is my data safe?',
    faq6_a: 'Your data is protected in transit and storage, and is not sold to third parties.'
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
    cta_secondary: 'Talk to Sales',
    free_desc: 'Answer a few simple questions to get an immediate snapshot of risk signals and next-step guidance.',
    free_f1: '✓ Full questionnaire experience',
    free_f2: '✓ High-level risk signals',
    free_f3: '✓ Preview recommendations',
    free_f4: '✓ Upgrade anytime',
    pro_desc: 'A professional PDF report tailored to your setup, with clear recommendations and practical next steps.',
    pro_f1: '✓ Compatibility & risk analysis',
    pro_f2: '✓ Actionable improvement checklist',
    pro_f3: '✓ Recommended charger criteria',
    pro_f4: '✓ Priority delivery window',
    pro_f5: '✓ Email support follow-up',
    biz_desc: 'For higher-stakes setups: deeper analysis, clearer audit trail, and stronger review standards.',
    biz_f1: '✓ Everything in Pro',
    biz_f2: '✓ Expanded risk & failure modes',
    biz_f3: '✓ Procurement-ready summary',
    biz_f4: '✓ Priority support routing',
    biz_f5: '✓ Optional call scheduling',
    custom_desc: "Need tailored scope, multiple devices, or a procurement workflow? We'll design a plan that fits your team.",
    custom_f1: '✓ Custom scope & deliverables',
    custom_f2: '✓ Volume pricing options',
    custom_f3: '✓ Team-ready deliverable format',
    custom_f4: '✓ Security & compliance alignment',
    custom_f5: '✓ Priority scheduling',
    trust_1: '30-Day Money-Back Guarantee',
    trust_2: 'Your Data is Never Sold',
    trust_3: 'Secure Encrypted Transmission',
    faq1_q: "What's included in the free assessment?",
    faq1_a: "The free assessment includes the full questionnaire and a preview of key risk signals. Upgrade to get the full PDF report.",
    faq2_q: 'Can I upgrade after purchasing?',
    faq2_a: "Yes. If you've already purchased and want to upgrade, contact us and we'll help apply your credit.",
    faq3_q: 'What does the money-back guarantee cover?',
    faq3_a: "If you're not satisfied within the stated window, you can request a refund based on policy terms.",
    faq4_q: 'Is the advanced plan suitable for my team?',
    faq4_a: 'It is designed for higher-stakes environments with stricter procurement or reliability requirements.',
    faq5_q: 'Do you offer volume discounts?',
    faq5_a: 'Yes. For multi-report teams, we offer custom enterprise pricing.',
    reco_badge: 'Recommended for you',
    sim_eye: 'Value Simulator',
    sim_title: 'Estimate value before you buy.',
    sim_sub: 'Model your risk and see which plan gives the strongest expected value.',
    sim_reports: 'Reports needed per month',
    sim_device_cost: 'Average protected device value (USD)',
    sim_incident: 'Expected annual risk rate (%)',
    sim_btn: 'Run Value Estimate',
    sim_loss: 'Estimated annual avoidable loss',
    sim_invest: 'Estimated annual report investment',
    sim_gap: 'Potential value gap',
    sim_reco: 'Best value plan',
    ctx_prefix: 'Detected context',
    ctx_creator: 'Creator setup',
    ctx_it: 'IT procurement',
    ctx_travel: 'Frequent traveler',
    ctx_enterprise: 'Enterprise compliance',
    explorer_eye: 'Plan Explorer',
    explorer_title: 'Compare plans by your priorities.',
    explorer_sub: 'Tune priorities and instantly see which plan aligns best.',
    explorer_priority: 'Priority profile',
    explorer_scale: 'Setup complexity',
    explorer_btn: 'Compare Plans',
    explorer_p1: 'Lower upfront spend',
    explorer_p2: 'Balanced value and speed',
    explorer_p3: 'Maximum reliability and governance',
    explorer_score: 'Fit score'
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
    subject_opt_1: 'Question about my report',
    subject_opt_2: 'Enterprise / Team pricing',
    subject_opt_3: 'Partnership inquiry',
    subject_opt_4: 'Technical support',
    subject_opt_5: 'Press / Media',
    subject_opt_6: 'Other',
    msg_label: 'Message',
    msg_ph: 'Tell us how we can help...',
    submit: 'Send Message →',
    sending: 'Sending…',
    success: "✓ Message sent! We'll get back to you within 24 hours.",
    info_eye: 'Contact Info',
    email_info_label: 'Email',
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
    console_lbl: 'ZIMONAI CONSOLE',
    console_1_name: 'Voltage Ripple Monitor',
    console_1_desc: 'Real-time waveform analysis',
    console_1_badge: 'ACTIVE',
    console_2_name: 'Thermal Signature Scan',
    console_2_desc: 'Component heat mapping',
    console_2_badge: 'LIVE',
    console_3_name: 'Hardware Compatibility DB',
    console_3_desc: '4,200+ certified profiles',
    console_4_name: 'Safety Certification Check',
    console_4_desc: 'UL / CE / RoHS cross-reference',
    console_4_badge: 'READY',
    sh_city: 'Shenzhen',
    tp_city: 'Taipei',
    stat_1: 'Diagnostic Accuracy',
    stat_2: 'Devices Audited',
    stat_3: 'Certified Profiles',
    stat_4: 'Report Delivery',
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
    hero_title_html: 'Hardware safety, <em>decoded — by ZimonAI</em>.',
    hero_sub: 'Practical notes on chargers, cables, standards, and failure modes — written for people who care about their devices.',
    latest: 'Latest',
    top_title: 'USB‑C is not a promise.',
    top_sub: 'A quick guide to why “USB‑C” alone doesn’t guarantee safe power delivery — and what signals actually matter.',
    read_article: 'Read article →',
    suggest: 'Suggest a topic',
    read: 'Read →',
    by: 'By ZimonAI Lab',
    date_apr_27_2026: 'Apr 27, 2026',
    read_6min: '6 min',
    read_5min: '5 min',
    read_7min: '7 min',
    read_8min: '8 min',
    card_1_title: 'USB‑C is not a promise: what to check before you trust a charger',
    card_1_desc: 'Learn the 5 practical checks that separate safe charging from silent device degradation — without needing lab equipment.',
    card_2_title: 'Voltage ripple in plain English: what it is, why it matters',
    card_2_desc: 'A practical explanation of ripple, noise, heat, and why stable power is about more than just wattage.',
    card_3_title: 'A procurement checklist for chargers & cables (teams)',
    card_3_desc: 'A simple internal standard for buying power accessories — consistent, defensible, and easy to adopt for teams.',
    card_4_title: 'Battery health myths: what “100%” really costs',
    card_4_desc: 'Charging habits, heat, and why “always full” isn’t the same as “always healthy”.',
    card_5_title: 'Wi‑Fi 6/6E/7: what changes for everyday devices',
    card_5_desc: 'A plain-language map of bands, latency, and when upgrades actually help.',
    card_6_title: 'SSD basics: endurance, heat, and why “fast” isn’t everything',
    card_6_desc: 'What TBW means, when throttling happens, and how to pick a drive you can trust.',
    card_7_title: 'PD vs QC: Charging Standards Explained',
    card_7_desc: 'Understanding USB Power Delivery and Quick Charge differences and their safety implications.',
    card_8_title: 'MagSafe & Wireless Charging Safety',
    card_8_desc: 'Heat, efficiency, and FOD — the pros and cons of wireless charging at a glance.',
    card_9_title: 'Thunderbolt 4 & USB4: Power User Guide',
    card_9_desc: 'Docks, compatibility, and power delivery — essential reading for power users.',
    card_10_title: 'Travel Charging Safety: Hidden Risks',
    card_10_desc: 'Airport and hotel hazards, voltage, and public USB port safety abroad.',
    card_11_title: '5 Signs Your Charger Is Failing',
    card_11_desc: 'How to tell if your USB charger is dying before it damages your device.',
    card_12_title: 'Why Your Phone Charges Slow with "Fast" Cables',
    card_12_desc: 'Cable quality, chip markers, and resistance can silently cap charging speed.',
    card_13_title: 'AI PC Buying Guide for 2026',
    card_13_desc: 'How to choose an AI-ready laptop based on real workloads, not marketing specs.',
    card_14_title: 'Passkeys Explained in Plain Language',
    card_14_desc: 'Why passkeys are phishing-resistant and how to migrate safely across devices.',
    card_15_title: 'Should You Upgrade to Wi-Fi 7 Now?',
    card_15_desc: 'A practical checklist for deciding whether Wi-Fi 7 hardware will improve daily use.',
    tag_ai_hardware: 'AI Hardware',
    tag_security: 'Security',
    tag_networking: 'Networking',
    tag_standards: 'Standards',
    tag_diagnostics: 'Diagnostics',
    tag_procurement: 'Procurement',
    tag_batteries: 'Batteries',
    tag_wifi: 'Wi‑Fi',
    tag_storage: 'Storage',
    tag_wireless: 'Wireless',
    tag_tips: 'Tips'
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
    range_7d: '7d',
    range_14d: '14d',
    range_30d: '30d',
    warn: 'Tip: keep this page unlinked publicly (or protect it) if you don’t want visitors to see traffic numbers.',
    err: 'Analytics endpoint is not configured, or failed to load.',
    cl_eye: 'Country / Region Leaderboard',
    cl_title: 'Where today’s visitors come from',
    cl_sub: 'Live data from Cloudflare edge — country/region only, no IP, no fingerprint.',
    cl_today: 'Today',
    cl_7d: '7 days',
    cl_30d: '30 days',
    cl_total: 'Total visits',
    cl_unique: 'Unique countries / regions'
  },
  lab: {
    hero_eye: 'Interactive Lab',
    hero_title_html: 'AI Growth <em>Lab</em>',
    hero_sub: 'Simulate risk, match your plan, and estimate cost-of-risk in one place.',
    sim_eye: 'Risk Simulator',
    sim_title: 'Live charging risk signal',
    sim_sub: 'Use your real setup profile for a practical baseline.',
    sim_device: 'Device class',
    sim_charger: 'Charger tier',
    sim_charger_a: 'Tier A (Certified)',
    sim_charger_b: 'Tier B (Mixed)',
    sim_charger_c: 'Tier C (Unknown)',
    sim_cable: 'Cable quality',
    sim_cable_a: 'Certified',
    sim_cable_b: 'Generic',
    sim_cable_c: 'Unknown',
    sim_usage: 'Daily load intensity',
    sim_btn: 'Simulate Risk',
    sim_low: 'Low risk baseline. Keep current setup and monitor thermals.',
    sim_mid: 'Moderate risk baseline. Consider upgrading charger or cable.',
    sim_high: 'High risk baseline. Prioritize safer accessories immediately.',
    fit_eye: 'Plan Fit Engine',
    fit_title: 'Which plan fits you best?',
    fit_sub: 'Answer a few practical questions and get a recommendation.',
    fit_q1: 'How many devices are in your setup?',
    fit_q2: 'How costly is downtime for you?',
    fit_q3: 'Do you need team/procurement documentation?',
    fit_docs_no: 'No',
    fit_docs_some: 'Sometimes',
    fit_docs_yes: 'Yes',
    fit_btn: 'Get Plan Recommendation',
    fit_free: 'Recommended: Free',
    fit_pro: 'Recommended: Pro',
    fit_biz: 'Recommended: Business',
    fit_custom: 'Recommended: Custom',
    fit_conf: 'Confidence',
    roi_eye: 'ROI Estimator',
    roi_title: 'Cost-of-risk vs report cost',
    roi_sub: 'Estimate potential avoidable loss from unstable charging setups.',
    roi_device_cost: 'Device replacement cost (USD)',
    roi_downtime: 'Downtime cost per day (USD)',
    roi_prob: 'Estimated incident probability (%)',
    roi_btn: 'Estimate ROI',
    roi_loss: 'Potential avoidable loss',
    roi_report: 'Report investment',
    roi_value: 'Potential value gap',
    cta_primary: 'Start Full Diagnosis →',
    cta_secondary: 'View Pricing',
    go_plan: 'Open Recommended Plan'
  },
  game: {
    hero_eye: 'Mini Game',
    hero_title_html: 'Charge <em>Race</em>.',
    hero_sub: 'Pick a charger and a cable. Race to 100% — without melting the cable.',
    intro_eye: 'How it works',
    intro_title: 'Match power, cable, and device',
    intro_sub: 'Effective wattage = lowest of (charger, cable, device). Cheap cables waste power as heat.',
    charger_lbl: 'Charger',
    charger_hint: 'Higher W = faster, more heat',
    cable_lbl: 'Cable',
    cable_hint: 'Cable matters more than you think',
    start: 'Start Race',
    next: 'Next Round',
    reset: 'Restart Game',
    round_lbl: 'Round',
    race_progress: 'Charging',
    race_heat: 'Heat',
    race_eff: 'Effective Wattage',
    race_time: 'Time',
    race_status: 'Status',
    status_idle: 'Idle',
    status_running: 'Charging…',
    status_throttled: 'Throttled (heat)',
    status_cutoff: 'Thermal cutoff',
    status_done: 'Charged',
    status_finished: 'Game over',
    score_total: 'Total Score',
    score_best: 'Best',
    score_grade: 'Grade',
    d_phone: 'Smartphone',
    d_phone_sub: '18 Wh · max 27W',
    d_tablet: 'Tablet',
    d_tablet_sub: '35 Wh · max 45W',
    d_laptop: 'Laptop',
    d_laptop_sub: '70 Wh · max 100W',
    c5_n: '5W Brick',
    c5_d: 'Old basic charger. Safe but slow.',
    c18_n: '18W PD',
    c18_d: 'Budget fast charge. OK for phones.',
    c30_n: '30W PD',
    c30_d: 'Balanced. Fits most setups.',
    c65_n: '65W PD',
    c65_d: 'Strong charger. Great for laptops.',
    c100_n: '100W PD',
    c100_d: 'Top output. Needs a good cable.',
    ca_n: 'Standard 60W',
    ca_d: 'Certified, capped at 60W.',
    cb_n: 'E-marker 100W',
    cb_d: 'Pro cable, full 100W support.',
    cc_n: 'Cheap Unknown',
    cc_d: 'Bargain cable. Heats up fast.',
    res_overheat: 'Thermal cutoff! Device pulled the brakes for safety.',
    res_perfect: 'Perfect run — fast and cool.',
    res_good: 'Solid run.',
    res_slow: 'Too slow.',
    res_dangerous: 'Risky! Heat got close to red zone.',
    tip_low_w: 'Charger output is the bottleneck — try a higher-W charger.',
    tip_cable_cap: 'Cable rating capped your speed. Use an e-marker cable.',
    tip_cable_loss: 'Cheap cable wastes power as heat. Replace it.',
    tip_device_cap: 'Device is at its max acceptable wattage. You are good.',
    tip_balanced: 'Balanced setup. Decent speed, manageable heat.',
    tip_overheat: 'Cable resistance and high wattage caused overheating.',
    cta_t: 'Want to test your real setup?',
    cta_d: 'Run a free assessment to spot weak links in your everyday charging chain.',
    cta_a: 'Start Free Assessment →',
    cta_b: 'Open AI Lab'
  },
  use_cases: {
    hero_eye: 'Use Cases',
    hero_title_html: 'Scenarios that drive <em>better decisions</em>.',
    hero_sub: 'Choose your context and see risk patterns, plan fit, and next actions.',
    tab_creator: 'Creator Setup',
    tab_it: 'IT Procurement',
    tab_travel: 'Frequent Traveler',
    tab_enterprise: 'Enterprise Compliance',
    pain_title: 'Core risks',
    action_title: 'Recommended actions',
    plan_title: 'Best-fit plan',
    creator_p1: 'High-load editing with mixed chargers increases thermal and ripple stress.',
    creator_p2: 'Tight delivery schedules make downtime expensive.',
    creator_a1: 'Standardize charger + cable combos for each device class.',
    creator_a2: 'Run diagnostics before critical project windows.',
    creator_plan: 'Pro',
    it_p1: 'Inconsistent accessory purchases create hidden support overhead.',
    it_p2: 'No unified benchmark for charger/cable approvals.',
    it_a1: 'Build a procurement-approved accessory matrix.',
    it_a2: 'Use report outputs as audit-ready rationale.',
    it_plan: 'Business',
    travel_p1: 'Mixed hotel/airport power environments increase instability risk.',
    travel_p2: 'Portable chargers and cables are often replaced ad-hoc.',
    travel_a1: 'Maintain a validated travel power kit.',
    travel_a2: 'Re-check setup after accessory replacement.',
    travel_plan: 'Pro',
    enterprise_p1: 'Compliance and traceability require defensible risk controls.',
    enterprise_p2: 'Fleet-level inconsistency drives avoidable failure cost.',
    enterprise_a1: 'Adopt policy-backed evaluation for approved accessories.',
    enterprise_a2: 'Use periodic diagnostics for governance evidence.',
    enterprise_plan: 'Custom',
    cta_primary: 'Start Assessment',
    cta_secondary: 'Talk to Sales'
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
    s9: '9. Contact',
    intro: 'These Terms of Service ("Terms") govern your access to and use of the ZimonAI website and services (the "Service") operated by ZimonAI (智蒙灣科技) ("ZimonAI", "we", "us"). By using the Service, you agree to these Terms.',
    p1: 'ZimonAI provides AI-assisted diagnostics and reports intended to help users understand charging and hardware compatibility risks. Outputs may include summaries, recommendations, and report documents.',
    p2: 'The Service is provided on an "as is" and "as available" basis. Reports are for informational purposes and do not guarantee outcomes. You remain responsible for decisions, purchases, and use of hardware and accessories.',
    p3: 'You must be legally able to enter into these Terms in your jurisdiction. If you use the Service on behalf of an organization, you represent that you have authority to bind that organization.',
    p4: 'If you purchase paid features, payment processing may be handled by a third-party merchant of record. Prices, taxes, and fees presented at checkout apply. We may update offerings and pricing from time to time.',
    p5: 'You agree not to misuse the Service, including attempting unauthorized access, disrupting systems, scraping beyond reasonable use, or using the Service to violate laws or third-party rights.',
    p6: 'The Service, including its design, software, and content, is owned by ZimonAI or its licensors and is protected by applicable laws. You may not copy, modify, or distribute it except as permitted by law or with our written permission.',
    p7: 'To the maximum extent permitted by law, ZimonAI will not be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill arising from your use of the Service.',
    p8: 'We may update these Terms. If changes are material, we will update the effective date on this page. Continued use of the Service after changes means you accept the updated Terms.',
    p9_html: 'Questions about these Terms: <a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>.'
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
    s8: '8. Contact',
    intro: 'This Privacy Policy explains how ZimonAI (智蒙灣科技) ("ZimonAI", "we", "us") collects, uses, and shares information when you use our website and services.',
    p1: 'We may collect information you provide directly (such as your name, email address, and message content when you contact us), as well as technical information (such as browser type, device information, and approximate usage metadata) to operate and improve the Service.',
    p2: 'We use information to respond to inquiries, provide and improve the Service, maintain security, prevent abuse, and comply with legal obligations.',
    p3: 'If you make a purchase, payment processing is handled by a third-party merchant of record or payment provider. We do not store full payment card details on our servers.',
    p4: 'We may share information with service providers that help us operate the Service (for example, analytics, support tooling, hosting, or payment processing), and when required to comply with applicable laws. We do not sell your personal information.',
    p5: 'We keep information only as long as necessary to provide the Service, maintain records, resolve disputes, enforce agreements, and meet legal requirements.',
    p6: 'We use reasonable safeguards designed to protect information. No method of transmission or storage is completely secure.',
    p7: 'You may contact us to request access, correction, or deletion of personal information where applicable.',
    p8_html: 'Privacy questions: <a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>.'
  },
  refund: {
    eye: 'Refunds',
    title_html: 'Refund <em>Policy</em>',
    effective: 'Effective date: 2026-04-27',
    s1: '1. Who processes your payment',
    s2: '2. Refund window',
    s3: '3. How to request a refund',
    s4: '4. Policy reference',
    s5: '5. Changes',
    intro_html: 'This Refund Policy describes how refunds are handled for purchases related to ZimonAI (智蒙灣科技). If you have questions, contact <a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>.',
    p1: 'Payments are processed by Paddle.com Market Limited (or its affiliates) as the merchant of record. Refunds are handled by Paddle in line with its refund policy.',
    p2_html: 'Refund requests must be submitted within <strong style="color:var(--text);font-weight:500">14 calendar days</strong> of the transaction date.',
    p3_html: 'To request a refund, please submit your request via Paddle\'s buyer support portal at <a href="https://paddle.net" target="_blank" rel="noopener" style="color:var(--cyan);text-decoration:none">paddle.net</a>. If you need product help, you can also email us at <a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>.',
    p4_html: 'This page is intended to match Paddle\'s refund policy. For the full details and any legally applicable withdrawal rights, please see <a href="https://www.paddle.com/legal/refund-policy" target="_blank" rel="noopener" style="color:var(--cyan);text-decoration:none">Paddle\'s Refund Policy</a>.',
    p5: 'We may update this policy. The effective date will be updated on this page.'
  },
  posts: {
    p1: {
      title_html: 'USB‑C is not a <em>promise</em>.',
      sub: 'What to check before you trust a charger — without lab equipment.',
      meta_date: 'Apr 27, 2026',
      meta_read: '6 min read',
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
      meta_date: 'Apr 27, 2026',
      meta_read: '7 min read',
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
      meta_date: 'Apr 27, 2026',
      meta_read: '8 min read',
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
      meta_date: 'Apr 27, 2026',
      meta_read: '6 min read',
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
      meta_date: 'Apr 27, 2026',
      meta_read: '7 min read',
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
      meta_date: 'Apr 27, 2026',
      meta_read: '6 min read',
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
    },
    p7: {
      title_html: 'PD vs QC: <em>what\'s the difference?</em>',
      sub: 'Two standards, many misconceptions, and what actually matters for safe charging.',
      meta_date: 'May 15, 2026',
      meta_read: '7 min read',
      back: '← Back to Blog',
      lead: 'USB Power Delivery (PD) and Qualcomm Quick Charge (QC) are both fast charging standards, but they work differently. Understanding the distinction helps you avoid mismatched chargers and unnecessary risk.',
      h1: 'What is USB Power Delivery (PD)?',
      p1: 'USB Power Delivery is an open standard managed by the USB Implementers Forum (USB-IF). It supports a wide range of power levels (up to 240W in the latest revision) and is designed to work across devices from phones to laptops. PD chargers negotiate voltage and current dynamically based on what the connected device needs.',
      h2: 'What is Qualcomm Quick Charge (QC)?',
      p2: 'Quick Charge is Qualcomm\'s proprietary fast charging technology, tied to devices with Snapdragon processors. It has gone through multiple generations (QC 2.0 through QC 5+), each with its own voltage and current profiles. QC chargers typically work best with QC-compatible devices.',
      h3: 'Can you use a PD charger on a QC device?',
      p3: 'In most cases, yes. Many modern devices support both standards or fall back to USB PD if QC isn\'t detected. However, you may not get the fastest possible charging speed if the charger isn\'t optimized for your specific device.',
      h4: 'What about using a QC charger on a PD device?',
      p4: 'QC chargers that lack USB PD support may not work well with devices that prefer PD. If a device expects USB PD and gets only QC signals, it may charge slowly or not at all.',
      h5: 'A practical approach',
      p5: 'For most modern devices, USB PD is the safer default choice — it\'s widely supported, standardized, and future-proof.',
      cta_t: 'Not sure which standard your setup uses?',
      cta_d: 'Run a free assessment and get clarity on your power profile.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p8: {
      title_html: 'MagSafe & <em>wireless charging</em>.',
      sub: 'Convenient, but not always equal — what to know about heat, efficiency, and safety.',
      meta_date: 'May 22, 2026',
      meta_read: '6 min read',
      back: '← Back to Blog',
      lead: 'Wireless charging is incredibly convenient, but it comes with tradeoffs. Higher heat generation, lower efficiency, and compatibility nuances mean it\'s not always the safest choice.',
      h1: 'How wireless charging works',
      p1: 'Wireless chargers use electromagnetic induction to transfer power. A coil in the charger creates a magnetic field, which induces a current in a coil inside your device.',
      h2: 'Heat is the main concern',
      p2: 'All wireless chargers generate more heat than wired charging. This is a physical consequence of the energy transfer method. Higher heat during charging can accelerate battery wear over time.',
      h3: 'MagSafe vs standard Qi charging',
      p3: 'Apple\'s MagSafe uses magnets to align the charger precisely with the device, improving efficiency. MagSafe can deliver up to 15W on compatible iPhones.',
      h4: 'Foreign object detection (FOD)',
      p4: 'Quality wireless chargers include Foreign Object Detection — a safety feature that stops charging if a metal object is detected between the charger and device.',
      h5: 'Practical recommendations',
      p5: 'Use wireless charging for convenience during the day, but consider wired charging overnight or for sustained high-load scenarios.',
      cta_t: 'Want to audit your entire power setup?',
      cta_d: 'Run a free assessment including wired and wireless charging profiles.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p9: {
      title_html: 'Thunderbolt 4 & <em>USB4</em> guide.',
      sub: 'For power users: what these standards actually deliver and what to watch for.',
      meta_date: 'May 29, 2026',
      meta_read: '8 min read',
      back: '← Back to Blog',
      lead: 'Thunderbolt 4 and USB4 share the same connector (USB-C) but offer different capabilities. Understanding the differences prevents costly mistakes.',
      h1: 'USB4 vs USB 3.x — what\'s the relationship?',
      p1: 'USB4 is built on the Thunderbolt 3 protocol foundation. It can tunnel USB data, DisplayPort video, and optionally PCIe. USB4 Gen 3 supports up to 40 Gbps.',
      h2: 'What Thunderbolt 4 adds over USB4',
      p2: 'Thunderbolt 4 is Intel\'s branding for a minimum baseline that exceeds USB4\'s minimum specs. Key additions: minimum 32 Gbps PCIe bandwidth, dual display support mandatory.',
      h3: 'Power delivery on TB4 and USB4',
      p3: 'Thunderbolt 4 requires chargers to provide at least 15W via USB PD, with many docks and laptops supporting 60W-100W. USB4 allows power delivery but doesn\'t mandate it.',
      h4: 'Cable matters more than you think',
      p4: 'Passive USB4/TB4 cables have length limits (typically 0.8m for 40 Gbps, up to 2m at reduced speeds). Always verify cable ratings match your use case.',
      h5: 'Docking station gotchas',
      p5: 'Not all docks work with all hosts. Some docks are TB4-only, some work with USB4 but limit features. A dock that "looks compatible" may deliver 50% of the expected capability.',
      cta_t: 'Setting up a power workstation?',
      cta_d: 'Get a free assessment of your dock, charger, and cable compatibility.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p10: {
      title_html: 'Travel <em>charging safety.</em>',
      sub: 'Airports, hotels, and foreign sockets: how to charge safely when traveling.',
      meta_date: 'June 5, 2026',
      meta_read: '7 min read',
      back: '← Back to Blog',
      lead: 'Traveling introduces unfamiliar power environments: different voltages, outlet types, and shared charging stations. A few precautions help you avoid device damage.',
      h1: 'Voltage matters — most of the world is different',
      p1: 'North America uses 110-120V, while most of the world uses 220-240V. Most modern USB chargers are dual-voltage (100-240V), so they\'ll work anywhere.',
      h2: 'Airport USB ports: convenience vs risk',
      p2: 'Airport charging stations carry Juice Jacking risk — malicious USB ports that can install malware. Use a USB data blocker or carry your own wall charger.',
      h3: 'Hotel chargers: check the wattage',
      p3: 'Some hotel USB ports are limited to 5W or have poorly regulated power. If your device needs higher wattage, use your own charger plugged into a wall socket.',
      h4: 'Power strips and adapters: watch for the daisy chain',
      p4: 'Using a travel adapter into a power strip into an extension cord compounds resistance and heat risk. Overloaded power strips are a real fire risk.',
      h5: 'What to pack',
      p5: 'A good travel kit: quality USB charger, USB data blocker for public ports, a universal adapter, and ideally a compact power meter.',
      cta_t: 'Planning a work trip?',
      cta_d: 'Run a pre-travel assessment of your charging setup to identify hidden risks.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p11: {
      title_html: '5 signs your charger <em>is failing</em>.',
      sub: 'How to catch problems early — before they damage your device.',
      meta_date: 'June 12, 2026',
      meta_read: '5 min read',
      back: '← Back to Blog',
      lead: 'Chargers don\'t fail suddenly — they signal distress before they damage your device. Learning to recognize these signs can save you a repair bill or a lost device.',
      h1: '1. Excessive heat',
      p1: 'Warm chargers are normal. Hot chargers are not. If your charger becomes uncomfortably warm to the touch during normal use, that\'s a warning sign. Heat accelerates degradation of both the charger and your device\'s battery.',
      h2: '2. Flickering or intermittent charging',
      p2: 'If your device keeps disconnecting and reconnecting while plugged in, the cable or charger connector is likely worn. This isn\'t just annoying — the repeated connection/disconnection cycles create power spikes that stress your device.',
      h3: '3. Burning smell',
      p3: 'Any burning smell — plastic, electronics, or chemical — means stop immediately. Unplug the charger, disconnect your device. This is a serious safety risk. Replace the charger and inspect your device\'s port.',
      h4: '4. Visible physical damage',
      p4: 'Exposed wires, cracked casing, or bent connectors aren\'t cosmetic issues — they\'re safety hazards. A frayed cable can short-circuit, and a cracked charger shell exposes live components.',
      h5: '5. Charging speed drops suddenly',
      p5: 'If your device used to charge in 2 hours but now takes 4, the charger may be failing. Reduced output is a common sign of aging capacitors or failing power circuits inside the charger.',
      cta_t: 'Not sure if your charger is safe?',
      cta_d: 'Run a quick assessment to check your charging setup\'s health.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p12: {
      title_html: 'Why your phone charges <em>slow with "fast" cables</em>.',
      sub: 'How cable limits quietly bottleneck charging speed and stability.',
      meta_date: 'June 19, 2026',
      meta_read: '6 min read',
      back: '← Back to Blog',
      lead: 'You upgraded to a high-wattage charger, but your phone still charges slowly. In many cases, the cable is the bottleneck. Cable materials, chip markers, and internal resistance determine how much power your device can safely draw.',
      h1: '1. "Fast charge" on the box does not guarantee high power',
      p1: 'Many cables are marketed as fast charging but only support lower current levels in real use. A cable may work for basic charging yet fail to sustain higher power profiles. Always check certified current and power ratings, not just marketing labels.',
      h2: '2. USB-C e-marker chips matter at higher wattages',
      p2: 'For higher-power USB-C charging, many setups rely on e-marker chips inside the cable to negotiate safe current. Without proper identification, devices and chargers often fall back to lower power modes to avoid risk.',
      h3: '3. Internal resistance turns power into heat',
      p3: 'Cheap conductors and poor connectors increase resistance. That means voltage drop, more heat, and less power reaching your device. If a cable gets noticeably warm during charging, performance and long-term safety can both suffer.',
      h4: '4. Cable length affects real charging speed',
      p4: 'Longer cables generally introduce more resistance. This does not mean long cables are always bad, but low-quality long cables are far more likely to reduce charging speed. Use the shortest reliable cable that fits your daily setup.',
      h5: '5. Build a simple cable sanity check routine',
      p5: 'Compare charging time with two known-good cables, feel for abnormal heating, and inspect connectors for looseness or discoloration. If speed varies wildly between cables, replace uncertain ones before they stress your phone battery.',
      cta_t: 'Unsure whether your cable is limiting performance?',
      cta_d: 'Run a quick assessment and get practical recommendations for safer, faster charging.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p13: {
      title_html: 'AI PC <em>buying guide</em> for 2026.',
      sub: 'How to pick an AI-ready laptop without overpaying for specs you will never use.',
      meta_date: 'June 26, 2026',
      meta_read: '7 min read',
      back: '← Back to Blog',
      lead: '"AI PC" labels are everywhere, but most buyers still do not know what they are paying for. The right choice depends less on headline TOPS and more on your real workflows, battery needs, and software support.',
      h1: '1. Start with your workflow, not the badge',
      p1: 'If you mostly browse, stream, and edit documents, you do not need top-tier AI silicon. If you run local transcription, image generation, or coding copilots offline, NPU and GPU capability matters. Define two or three workloads first, then match hardware.',
      h2: '2. Understand NPU numbers before trusting marketing',
      p2: 'Brands advertise large TOPS values, but not all workloads run on the NPU. Some features still rely on CPU or GPU depending on framework support. Treat TOPS as one signal, and verify real app compatibility for tools you actually use.',
      h3: '3. Memory and storage are usually bigger bottlenecks',
      p3: 'Local AI tasks can consume memory quickly. In practice, 16 GB is the baseline and 32 GB is safer for heavy multitasking or model work. Fast SSDs also help model loading times and system responsiveness.',
      h4: '4. Cooling design affects sustained performance',
      p4: 'Thin laptops may benchmark well in short bursts but throttle during longer sessions. Check reviews for sustained workloads and fan noise. Consistent performance is often better than a high but short-lived peak.',
      h5: '5. Battery and ports still decide daily experience',
      p5: 'A strong NPU does not help if battery life collapses under mixed use. Also check USB4, HDMI, and charging flexibility. A balanced machine with good thermals, battery life, and I/O usually outlasts spec-driven purchases.',
      cta_t: 'Planning a new device fleet?',
      cta_d: 'Use our quick assessment to set practical standards before you buy.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p14: {
      title_html: 'Passkeys explained <em>in plain language</em>.',
      sub: 'Why they are safer than passwords, and how to switch without locking yourself out.',
      meta_date: 'July 3, 2026',
      meta_read: '6 min read',
      back: '← Back to Blog',
      lead: 'Password leaks and phishing remain the most common account takeover path. Passkeys reduce this risk by replacing reusable secrets with device-bound cryptographic credentials.',
      h1: '1. What a passkey actually is',
      p1: 'A passkey is a public/private key pair generated for a specific service. The private key stays on your trusted device and never gets shared. When you sign in, your device proves identity cryptographically instead of sending a password.',
      h2: '2. Why passkeys block most phishing attacks',
      p2: 'Passkeys are domain-bound, so a fake login page cannot use your credential on the real site. Even if you click a malicious link, the cryptographic check fails on the wrong domain.',
      h3: '3. How to migrate safely without account lockouts',
      p3: 'Enable passkeys on your primary accounts first, but keep one backup sign-in method during transition. Add recovery options and verify they work before you remove old password-only access.',
      h4: '4. Cross-device sync is useful but needs hygiene',
      p4: 'Ecosystem sync features make passkeys convenient across phone and laptop. Protect the account that stores your synced credentials with strong device unlock, updated OS versions, and account recovery controls.',
      h5: '5. Best practice for teams and families',
      p5: 'Standardize on passkeys for critical accounts, document recovery flows, and run a quarterly access check. Security improves most when people know exactly how to recover safely under stress.',
      cta_t: 'Want a safer digital setup checklist?',
      cta_d: 'Run a quick assessment and get practical account security recommendations.',
      cta_a: 'Start Free Assessment →',
      cta_b: 'View Pricing'
    },
    p15: {
      title_html: 'Should you upgrade to <em>Wi-Fi 7</em> now?',
      sub: 'A practical checklist to decide if new router hardware will actually improve your daily network.',
      meta_date: 'July 10, 2026',
      meta_read: '8 min read',
      back: '← Back to Blog',
      lead: 'Wi-Fi 7 promises more speed and lower latency, but router upgrades do not always translate into better real-life performance. Your internet plan, client devices, and home layout still determine the final result.',
      h1: '1. Confirm your bottleneck before buying',
      p1: 'Slow internet can come from WAN limits, crowded channels, poor placement, or old client devices. If your main issue is weak coverage behind concrete walls, mesh placement may help more than a top-tier router.',
      h2: '2. Device compatibility matters more than peak specs',
      p2: 'You only get Wi-Fi 7 benefits on Wi-Fi 7 capable devices. If most phones, TVs, and laptops in your home are still Wi-Fi 6, a premium Wi-Fi 7 setup may deliver little short-term value.',
      h3: '3. Multi-link operation helps in busy environments',
      p3: 'One of Wi-Fi 7\'s practical gains is improved stability under congestion by using multiple links intelligently. This is useful for dense apartments or smart-home heavy setups where many devices compete continuously.',
      h4: '4. Backhaul strategy decides mesh performance',
      p4: 'For multi-room coverage, wired backhaul still beats wireless in consistency. If Ethernet is not possible, place nodes carefully with line-of-sight where possible to avoid halving throughput hop by hop.',
      h5: '5. Build an upgrade plan in two phases',
      p5: 'Upgrade router and core placement first, then replace legacy client devices over time. This staged approach controls budget while giving measurable improvements after each phase.',
      cta_t: 'Need a simple home network upgrade plan?',
      cta_d: 'Run an assessment to prioritize fixes with the highest real-world impact.',
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
    learn_more: '了解更多 →',
    stat_1: '診斷準確度',
    stat_2: '已分析裝置',
    stat_3: '認證資料檔',
    stat_4: '報告交付',
    step_1_no: '步驟 01',
    step_1_t: '回答幾個簡單問題',
    step_1_d: '告訴我們你的裝置與充電器組合，幾分鐘內即可完成，且完全免費。',
    step_2_no: '步驟 02',
    step_2_t: 'AI 自動分析',
    step_2_d: '模型會比對你的配置與認證硬體資料與安全訊號。',
    step_3_no: '步驟 03',
    step_3_t: '取得 PDF 報告',
    step_3_d: '收到包含風險層級、相容性說明與可執行建議的詳細報告。',
    why_eye: '為什麼重要',
    why_title: '充電品質是你數位資產的生命線。',
    why_sub_html: '在行動工作時代，安全充電是生產力的隱形基礎。<strong style="color:var(--text);font-weight:500">不要讓低品質線材悄悄傷害你的專業設備。</strong>',
    fc1_no: '01 — 風險',
    fc1_t: '電壓突波傷害',
    fc1_d: '不穩定充電器可能輸出異常突波，長期壓力會累積在電池與主板上。',
    fc2_no: '02 — 風險',
    fc2_t: '熱失控風險',
    fc2_d: '低品質配件散熱不足，可能讓裝置長時間超出理想溫度範圍。',
    fc3_no: '03 — 風險',
    fc3_t: '電池壽命侵蝕',
    fc3_d: '不匹配的充電曲線可能加速電池老化與長期衰退。',
    testi_eye: '使用者回饋',
    testi_title: '受到創作者與工程團隊信賴。',
    testi_sub: '來自真實使用者的回饋，聚焦於實際可用的改善。',
    testi_q1: '"我原本用隨機買的 USB-C 充電器，ZimonAI 很快就提醒我紋波風險。當天就換掉，安心很多。"',
    testi_q2: '"終於有看得懂的相容性解釋，報告細節完整，而且每一項建議都能立刻執行。"',
    testi_q3: '"我們 IT 團隊現在每次採購前都先看 ZimonAI，省下不少錯誤成本。"',
    testi_r1: '影片剪輯師，洛杉磯',
    testi_r2: '機器學習工程師，舊金山',
    testi_r3: '資訊總監，奧斯汀',
    cta_eye: '立即開始',
    cta_title: '你的裝備值得更好的守護。',
    cta_sub: '2 分鐘免費檢測，先看風險，再決定下一步。',
    cta_primary: '開始免費檢測 →',
    cta_secondary: '查看定價',
    quick_eye: '快速風險檢查',
    quick_title: '10 秒看你的充電風險。',
    quick_sub: '選擇你的設備組合，立刻得到基礎風險訊號。',
    quick_device: '主要裝置',
    quick_device_1: '手機',
    quick_device_2: '平板',
    quick_device_3: '筆電',
    quick_device_4: '工作站',
    quick_charger: '充電器品質',
    quick_charger_1: '已認證',
    quick_charger_2: '混合使用',
    quick_charger_3: '來源不明',
    quick_cable: '線材品質',
    quick_cable_1: '已認證',
    quick_cable_2: '通用款',
    quick_cable_3: '來源不明',
    quick_btn: '開始快速檢查',
    quick_result_low: '基礎風險偏低，可維持現有配置並持續觀察溫度表現。',
    quick_result_mid: '基礎風險中等，升級充電器或線材可降低長期電池損耗。',
    quick_result_high: '基礎風險偏高，建議盡快升級供電配置，避免隱性硬體傷害。',
    quick_cta_diag: '進行完整診斷',
    quick_cta_price: '查看方案建議',
    compare_eye: '決策優勢',
    compare_title: '沒有 ZimonAI 與有 ZimonAI 的差別。',
    compare_left_t: '沒有 ZimonAI',
    compare_left_1: '充電器採購靠直覺',
    compare_left_2: '相容風險不透明',
    compare_left_3: '更容易出現隱性電池耗損',
    compare_right_t: '有 ZimonAI',
    compare_right_1: '用資料做採購決策',
    compare_right_2: '風險與相容性一目了然',
    compare_right_3: '有明確可執行的保護步驟',
    sticky_default: '用 2 分鐘檢測，先守住你的設備安全。',
    sticky_mid: '你的配置可能有隱性風險，現在就做完整檢查。',
    sticky_end: '準備好做決策？選擇最適合你的方案。',
    sticky_cta_assess: '開始檢測',
    sticky_cta_pricing: '查看定價'
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
    ready_cta_secondary: '查看定價',
    ds1_no: '步驟 01 — 輸入',
    ds1_t: '回答幾個簡單問題',
    ds1_p1: '填入裝置型號、充電器品牌與瓦數、線材來源、電池健康度與可見症狀。',
    ds1_p2: '問卷免費且快速完成，你的回答會成為風險分析基礎。',
    ds1_detail_html: '<strong>我們會詢問：</strong> 裝置型號 · 充電器品牌與瓦數 · 線材來源 · 電池年齡 · 可見症狀',
    ds2_no: '步驟 02 — 分析',
    ds2_t: 'AI 比對認證資料',
    ds2_p1: 'AI 會把你的配置與實測資料、規格與安全參考進行交叉比對。',
    ds2_p2: '系統會檢查紋波風險、熱相容、協議匹配與線材完整性，估算整體風險。',
    ds2_detail_html: '<strong>AI 檢查項目：</strong> 紋波閾值 · 熱相容 · 充電協議匹配 · 線材阻抗 · 電池匹配',
    ds3_no: '步驟 03 — 報告',
    ds3_t: '收到 PDF 安全報告',
    ds3_p1: '你會透過 email 收到詳細 PDF，包含風險拆解與對應建議。',
    ds3_p2: '內容盡量清楚、可執行，讓你能快速做決策。',
    ds3_detail_html: '<strong>報告內容：</strong> 風險分數 · 因子拆解 · 相容性說明 · 充電器/線材建議 · 安全摘要',
    tech_eye: '技術核心',
    tech_title: '系統底層在做什麼。',
    tech_sub: '診斷引擎建立在硬體測試經驗與持續更新的資料集之上。',
    tech1_t: '電壓紋波監測',
    tech1_d: '以波形與行為訊號評估充電輸出是否落在更安全的範圍內。',
    tech2_t: '熱特徵分析',
    tech2_d: '透過熱特徵判斷可能導致不穩或不安全充電的組合。',
    tech3_t: '硬體相容資料庫',
    tech3_d: '持續擴充的相容資料，提升充電器、裝置與線材組合評估可靠度。',
    tech4_t: '安全認證引擎',
    tech4_d: '交叉比對認證訊號，協助辨識可能未充分驗證的配件。',
    faq_eye: '常見問題',
    faq1_q: '檢測真的免費嗎？',
    faq1_a: '是。問卷與預覽免費，只有你需要完整 PDF 報告時才付費。',
    faq2_q: '需要寄送硬體嗎？',
    faq2_a: '不用。整個流程都在線上完成，根據你提供的資訊分析。',
    faq3_q: '診斷準確嗎？',
    faq3_a: '模型會隨資料持續更新與校準，以提升分析可靠度。',
    faq4_q: '多久能收到報告？',
    faq4_a: '大多數報告會在 24-48 小時內寄送。',
    faq5_q: '支援哪些裝置？',
    faq5_a: '涵蓋主流筆電、手機、平板與 USB-C 生態系設備。',
    faq6_q: '資料安全嗎？',
    faq6_a: '資料在傳輸與儲存皆採保護措施，且不販售給第三方。'
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
    cta_secondary: '洽談合作',
    free_desc: '回答幾個簡單問題，立即取得風險概覽與下一步方向。',
    free_f1: '✓ 完整問卷體驗',
    free_f2: '✓ 高層級風險訊號',
    free_f3: '✓ 建議預覽',
    free_f4: '✓ 可隨時升級',
    pro_desc: '針對你的配置提供更完整的 PDF 報告，內容清楚且可直接執行。',
    pro_f1: '✓ 相容性與風險分析',
    pro_f2: '✓ 可執行改善清單',
    pro_f3: '✓ 充電器建議基準',
    pro_f4: '✓ 優先交付時段',
    pro_f5: '✓ Email 後續支援',
    biz_desc: '適合更高要求場景：更深入分析、更清楚紀錄與更高審視標準。',
    biz_f1: '✓ 含 Pro 全部內容',
    biz_f2: '✓ 擴充風險與失效模式',
    biz_f3: '✓ 採購可用摘要',
    biz_f4: '✓ 優先支援流程',
    biz_f5: '✓ 可安排諮詢時段',
    custom_desc: '若你需要客製範圍、多裝置分析或採購流程整合，我們可為團隊設計方案。',
    custom_f1: '✓ 客製範圍與交付',
    custom_f2: '✓ 量大價格方案',
    custom_f3: '✓ 團隊可用交付格式',
    custom_f4: '✓ 安全與合規對齊',
    custom_f5: '✓ 優先排程',
    trust_1: '30 天退款保障',
    trust_2: '資料不對外販售',
    trust_3: '傳輸全程加密',
    faq1_q: '免費檢測包含哪些內容？',
    faq1_a: '免費版包含完整問卷與風險預覽；若需要完整 PDF 報告再升級即可。',
    faq2_q: '購買後可以升級嗎？',
    faq2_a: '可以。若你已購買報告想升級，聯絡我們可協助處理折抵。',
    faq3_q: '退款保障涵蓋什麼？',
    faq3_a: '若你在保障期間內不滿意，可依政策流程申請退款。',
    faq4_q: '進階方案適合哪些團隊？',
    faq4_a: '適合對採購一致性、可靠性與可追溯性有較高要求的團隊。',
    faq5_q: '有大量採購折扣嗎？',
    faq5_a: '有。多份報告需求可提供客製企業報價。',
    reco_badge: '最適合你的方案',
    sim_eye: '價值模擬器',
    sim_title: '購買前先估算價值。',
    sim_sub: '用你的風險條件估算，快速看哪個方案最划算。',
    sim_reports: '每月預計需要報告數量',
    sim_device_cost: '平均受保護設備價值（USD）',
    sim_incident: '預估年度事故風險率（%）',
    sim_btn: '開始價值估算',
    sim_loss: '預估年度可避免損失',
    sim_invest: '預估年度報告投入',
    sim_gap: '潛在價值差',
    sim_reco: '最有價值方案',
    ctx_prefix: '已識別情境',
    ctx_creator: '創作者工作流',
    ctx_it: 'IT 採購管理',
    ctx_travel: '高頻差旅',
    ctx_enterprise: '企業合規',
    explorer_eye: '方案比較器',
    explorer_title: '依你的重點比較方案。',
    explorer_sub: '調整優先條件，立即看哪個方案最適合。',
    explorer_priority: '優先條件',
    explorer_scale: '配置複雜度',
    explorer_btn: '開始比較',
    explorer_p1: '優先控制前期成本',
    explorer_p2: '平衡成本與交付效率',
    explorer_p3: '優先穩定性與治理能力',
    explorer_score: '匹配分數'
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
    subject_opt_1: '報告相關問題',
    subject_opt_2: '企業 / 團隊方案',
    subject_opt_3: '合作洽詢',
    subject_opt_4: '技術支援',
    subject_opt_5: '媒體 / 採訪',
    subject_opt_6: '其他',
    msg_label: '訊息內容',
    msg_ph: '請描述你的需求...',
    submit: '送出訊息 →',
    sending: '送出中…',
    success: '✓ 已送出！我們會在 1 個工作天內回覆。',
    info_eye: '聯絡資訊',
    email_info_label: '電子郵件',
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
    console_lbl: 'ZIMONAI 主控台',
    console_1_name: '電壓紋波監測',
    console_1_desc: '即時波形分析',
    console_1_badge: '運行中',
    console_2_name: '熱特徵掃描',
    console_2_desc: '元件熱分佈映射',
    console_2_badge: '即時',
    console_3_name: '硬體相容資料庫',
    console_3_desc: '4,200+ 認證檔案',
    console_4_name: '安全認證檢查',
    console_4_desc: 'UL / CE / RoHS 交叉比對',
    console_4_badge: '就緒',
    sh_city: '深圳',
    tp_city: '台北',
    stat_1: '診斷準確度',
    stat_2: '已分析裝置',
    stat_3: '認證資料檔',
    stat_4: '報告交付',
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
    hero_title_html: '數碼科普，<em>由 ZimonAI 為你講清楚</em>。',
    hero_sub: '關於充電器、線材、標準、故障模式與日常數碼常識 —— 寫給在意裝備的人。',
    latest: '最新文章',
    top_title: 'USB‑C 不是保證。',
    top_sub: '為什麼「有 USB‑C」不代表供電安全？以及你真正該看什麼訊號。',
    read_article: '閱讀文章 →',
    suggest: '建議主題',
    read: '閱讀 →',
    by: 'ZimonAI Lab',
    date_apr_27_2026: '2026 年 4 月 27 日',
    read_6min: '6 分鐘',
    read_5min: '5 分鐘',
    read_7min: '7 分鐘',
    read_8min: '8 分鐘',
    card_1_title: 'USB‑C 不是保證：充電器真正該檢查什麼',
    card_1_desc: '不用實驗室設備，也能快速判斷安全充電與長期損耗之間的差異。',
    card_2_title: '白話解析電壓紋波：它是什麼、為何重要',
    card_2_desc: '用實際情境解釋紋波、噪聲與發熱，理解穩定供電不只看瓦數。',
    card_3_title: '團隊版充電器與線材採購檢核表',
    card_3_desc: '建立一致、可辯護、容易落地的配件採購標準。',
    card_4_title: '電池健康迷思：維持 100% 的真正代價',
    card_4_desc: '充電習慣與熱管理如何影響電池壽命，重點一次看懂。',
    card_5_title: 'Wi‑Fi 6/6E/7：日常使用到底差在哪裡',
    card_5_desc: '用白話整理頻段、延遲與升級時機，避免無效升級。',
    card_6_title: 'SSD 基礎：耐用度、發熱與穩定性',
    card_6_desc: '理解 TBW、降速時機與實用選購重點，不只看峰值速度。',
    card_7_title: 'PD 與 QC：充電標準差異解析',
    card_7_desc: 'USB Power Delivery 與 Quick Charge 的運作差異與安全影響。',
    card_8_title: 'MagSafe 與無線充電安全須知',
    card_8_desc: '發熱、效率與異物偵測機制，無線充電的優缺點一次看懂。',
    card_9_title: 'Thunderbolt 4 與 USB4 實用指南',
    card_9_desc: '擴充塢、相容性與功率傳輸，Power User 必讀。',
    card_10_title: '旅行充電安全：機場與飯店的隱藏風險',
    card_10_desc: '出國時的電壓、適配器與公共 USB 插座安全須知。',
    card_11_title: '5 個跡象表明你的充电器正在故障',
    card_11_desc: '如何在設備損壞前發現 USB 充电器問題。',
    card_12_title: '為什麼手機用「快充線」還是充很慢',
    card_12_desc: '線材品質、晶片標記與阻抗都可能悄悄限制充電速度。',
    card_13_title: '2026 AI PC 選購指南',
    card_13_desc: '看實際使用情境，而不是行銷規格，挑出真正適合的 AI 筆電。',
    card_14_title: '白話解析 Passkey：更安全的登入方式',
    card_14_desc: '為什麼 Passkey 能對抗釣魚，以及如何安全地跨裝置切換。',
    card_15_title: '現在該升級到 Wi-Fi 7 嗎？',
    card_15_desc: '用一份實用檢核表，判斷 Wi-Fi 7 是否真能改善你的日常網路體驗。',
    tag_ai_hardware: 'AI 硬體',
    tag_security: '安全',
    tag_networking: '網路',
    tag_standards: '標準',
    tag_diagnostics: '診斷',
    tag_procurement: '採購',
    tag_batteries: '電池',
    tag_wifi: 'Wi‑Fi',
    tag_storage: '儲存',
    tag_wireless: '無線',
    tag_tips: '技巧'
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
    range_7d: '近 7 天',
    range_14d: '近 14 天',
    range_30d: '近 30 天',
    warn: '提示：若不希望訪客看到流量數字，請不要公開連結此頁。',
    err: '分析服務尚未完成設定，或讀取失敗。',
    cl_eye: '國家/地區排行榜',
    cl_title: '今天的訪客來自哪裡',
    cl_sub: '由 Cloudflare 邊緣節點即時提供 — 只記錄國家/地區碼，不記錄 IP 或指紋。',
    cl_today: '今天',
    cl_7d: '近 7 天',
    cl_30d: '近 30 天',
    cl_total: '總瀏覽量',
    cl_unique: '不重複國家/地區數'
  },
  lab: {
    hero_eye: '互動實驗室',
    hero_title_html: 'AI 成長 <em>實驗室</em>',
    hero_sub: '在同一頁完成風險模擬、方案匹配與損失估算。',
    sim_eye: '風險模擬器',
    sim_title: '即時充電風險訊號',
    sim_sub: '用你的實際配置快速取得基礎風險判斷。',
    sim_device: '裝置類型',
    sim_charger: '充電器等級',
    sim_charger_a: 'A 級（已驗證）',
    sim_charger_b: 'B 級（混合）',
    sim_charger_c: 'C 級（未知）',
    sim_cable: '線材品質',
    sim_cable_a: '已認證',
    sim_cable_b: '通用款',
    sim_cable_c: '來源不明',
    sim_usage: '每日負載強度',
    sim_btn: '模擬風險',
    sim_low: '基礎風險偏低，可維持現有配置並持續觀察溫度。',
    sim_mid: '基礎風險中等，建議升級充電器或線材。',
    sim_high: '基礎風險偏高，建議優先更換更安全的配件。',
    fit_eye: '方案匹配引擎',
    fit_title: '哪個方案最適合你？',
    fit_sub: '回答幾個實務問題，立即得到建議方案。',
    fit_q1: '你的設備數量大約多少？',
    fit_q2: '停機對你的成本高嗎？',
    fit_q3: '你需要團隊/採購文件化依據嗎？',
    fit_docs_no: '不需要',
    fit_docs_some: '有時需要',
    fit_docs_yes: '需要',
    fit_btn: '取得方案建議',
    fit_free: '建議方案：Free',
    fit_pro: '建議方案：Pro',
    fit_biz: '建議方案：Business',
    fit_custom: '建議方案：Custom',
    fit_conf: '信心指數',
    roi_eye: 'ROI 估算器',
    roi_title: '風險成本 vs 報告成本',
    roi_sub: '估算不穩定供電可能造成的可避免損失。',
    roi_device_cost: '設備替換成本（USD）',
    roi_downtime: '單日停機成本（USD）',
    roi_prob: '預估事故機率（%）',
    roi_btn: '估算 ROI',
    roi_loss: '可避免潛在損失',
    roi_report: '報告投入成本',
    roi_value: '潛在價值差',
    cta_primary: '開始完整診斷 →',
    cta_secondary: '查看定價',
    go_plan: '開啟建議方案'
  },
  game: {
    hero_eye: '小遊戲',
    hero_title_html: '充電 <em>競速</em>。',
    hero_sub: '挑充電器、配線材，在不過熱的情況下衝到 100%。',
    intro_eye: '玩法',
    intro_title: '匹配功率、線材與裝置',
    intro_sub: '實際功率＝充電器、線材、裝置三者中的最低值。劣質線材會把功率轉成熱。',
    charger_lbl: '充電器',
    charger_hint: '瓦數越高越快，也越熱',
    cable_lbl: '線材',
    cable_hint: '線材的影響比想像大',
    start: '開始競速',
    next: '下一回合',
    reset: '重新開始',
    round_lbl: '回合',
    race_progress: '充電進度',
    race_heat: '溫度',
    race_eff: '實際功率',
    race_time: '時間',
    race_status: '狀態',
    status_idle: '待機',
    status_running: '充電中…',
    status_throttled: '降頻（過熱）',
    status_cutoff: '熱保護斷電',
    status_done: '充電完成',
    status_finished: '遊戲結束',
    score_total: '總分',
    score_best: '最佳紀錄',
    score_grade: '評等',
    d_phone: '智慧型手機',
    d_phone_sub: '18 Wh ・ 上限 27W',
    d_tablet: '平板',
    d_tablet_sub: '35 Wh ・ 上限 45W',
    d_laptop: '筆電',
    d_laptop_sub: '70 Wh ・ 上限 100W',
    c5_n: '5W 老式充電頭',
    c5_d: '安全但很慢，老一代基礎款。',
    c18_n: '18W PD',
    c18_d: '入門快充，手機足夠。',
    c30_n: '30W PD',
    c30_d: '平衡型，多數情境合用。',
    c65_n: '65W PD',
    c65_d: '高功率，筆電友善。',
    c100_n: '100W PD',
    c100_d: '最高輸出，需要好線。',
    ca_n: '60W 標準線',
    ca_d: '已認證，最高 60W。',
    cb_n: 'E-marker 100W',
    cb_d: '專業線材，完整支援 100W。',
    cc_n: '不明便宜線',
    cc_d: '便宜貨，發熱快。',
    res_overheat: '熱保護啟動！裝置為了安全主動斷電。',
    res_perfect: '完美！速度快又涼。',
    res_good: '不錯的成績。',
    res_slow: '速度太慢了。',
    res_dangerous: '有點危險，溫度逼近紅線。',
    tip_low_w: '充電器是瓶頸，可考慮更高瓦數的充電器。',
    tip_cable_cap: '線材上限拖累速度，建議改用 E-marker 線。',
    tip_cable_loss: '便宜線把功率變成熱，建議直接更換。',
    tip_device_cap: '裝置已達可接受的最高功率，這個搭配很好。',
    tip_balanced: '搭配平衡，速度合理、溫度可控。',
    tip_overheat: '線材阻抗加上高瓦數導致過熱。',
    cta_t: '想測試你真實的充電配置？',
    cta_d: '做一次免費評估，找出日常充電鏈中最弱的一環。',
    cta_a: '開始免費評估 →',
    cta_b: '前往 AI 實驗室'
  },
  use_cases: {
    hero_eye: '應用場景',
    hero_title_html: '在不同情境下做出更好的 <em>設備決策</em>。',
    hero_sub: '選擇你的情境，快速看風險模式、方案建議與行動路徑。',
    tab_creator: '創作者工作流',
    tab_it: 'IT 採購管理',
    tab_travel: '高頻差旅',
    tab_enterprise: '企業合規',
    pain_title: '主要風險',
    action_title: '建議行動',
    plan_title: '最佳方案',
    creator_p1: '高負載剪輯搭配混用充電器，容易放大熱與紋波壓力。',
    creator_p2: '交付時程緊湊，任何停機都可能造成高成本延誤。',
    creator_a1: '為每種設備建立固定的充電器與線材組合。',
    creator_a2: '重大專案前先做一次完整診斷。',
    creator_plan: 'Pro',
    it_p1: '配件採購不一致會形成隱性維運成本。',
    it_p2: '缺少統一的充電器與線材核准基準。',
    it_a1: '建立可核准的採購清單與相容矩陣。',
    it_a2: '用報告作為可稽核的採購依據。',
    it_plan: 'Business',
    travel_p1: '旅館、機場等混合供電環境增加不穩定風險。',
    travel_p2: '行動電源與線材常臨時更換，品質不一致。',
    travel_a1: '維持一組已驗證的差旅供電套件。',
    travel_a2: '更換配件後重新檢查配置風險。',
    travel_plan: 'Pro',
    enterprise_p1: '合規與可追溯性要求可辯護的風險控制。',
    enterprise_p2: '艦隊級設備不一致會帶來可避免的失效成本。',
    enterprise_a1: '建立政策化的配件評估與核准流程。',
    enterprise_a2: '透過定期診斷提供治理證據。',
    enterprise_plan: 'Custom',
    cta_primary: '開始檢測',
    cta_secondary: '聯絡業務'
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
    s9: '9. 聯絡方式',
    intro: '本服務條款（以下稱「本條款」）規範你對 ZimonAI（智蒙灣科技）網站與服務（以下稱「本服務」）的存取與使用。當你使用本服務，即表示你同意遵守本條款。',
    p1: 'ZimonAI 提供 AI 輔助診斷與報告，協助使用者了解充電與硬體相容風險。輸出內容可能包含摘要、建議與報告文件。',
    p2: '本服務以「現況」及「可用狀態」提供。報告內容僅供參考，不構成結果保證。你仍需自行承擔硬體購買、使用與決策責任。',
    p3: '你必須在所屬司法管轄區具備締約能力。若你代表組織使用本服務，表示你有權代表該組織受本條款拘束。',
    p4: '若你購買付費功能，付款可能由第三方 Merchant of Record 處理。結帳頁顯示的價格、稅費與手續費為準。我們可能不定期調整方案與價格。',
    p5: '你同意不濫用本服務，包括但不限於未授權存取、干擾系統、超出合理範圍擷取資料，或利用本服務侵害法律或第三方權利。',
    p6: '本服務（含設計、軟體與內容）由 ZimonAI 或其授權方持有，並受相關法律保護。除法律允許或經書面同意外，不得擅自複製、修改或散布。',
    p7: '在法律允許範圍內，ZimonAI 不對任何間接、附帶、特殊、衍生或懲罰性損害，或任何利潤、資料、商譽損失負責。',
    p8: '我們可能更新本條款。若為重大變更，將更新本頁生效日期。你在更新後持續使用本服務，即視為接受更新內容。',
    p9_html: '若對本條款有疑問：<a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>。'
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
    s8: '8. 聯絡方式',
    intro: '本隱私政策說明當你使用 ZimonAI（智蒙灣科技）網站與服務時，我們如何蒐集、使用與分享資訊。',
    p1: '我們可能蒐集你直接提供的資訊（例如聯絡時填寫的姓名、Email 與訊息內容），以及技術資訊（如瀏覽器類型、裝置資訊與使用中繼資料）以維運與改善服務。',
    p2: '我們使用資訊來回覆需求、提供並優化服務、維護安全、防止濫用，並遵循法律義務。',
    p3: '若你進行購買，付款由第三方 Merchant of Record 或支付供應商處理。我們不會在伺服器保存完整信用卡資訊。',
    p4: '我們可能與協助營運的服務供應商分享必要資訊（例如分析、客服工具、託管或付款處理），或在法律要求下提供資訊。我們不販售你的個人資料。',
    p5: '我們僅在提供服務、維持紀錄、處理爭議、執行合約與符合法規所需期間內保存資料。',
    p6: '我們採取合理安全措施保護資訊，但任何傳輸或儲存方式都無法保證絕對安全。',
    p7: '在適用法令下，你可聯絡我們申請查閱、更正或刪除個人資料。',
    p8_html: '隱私相關問題：<a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>。'
  },
  refund: {
    eye: '退款',
    title_html: '退款 <em>政策</em>',
    effective: '生效日期：2026-04-27',
    s1: '1. 付款處理單位',
    s2: '2. 退款期間',
    s3: '3. 退款申請方式',
    s4: '4. 政策參考',
    s5: '5. 政策更新',
    intro_html: '本退款政策說明與 ZimonAI（智蒙灣科技）相關購買的退款處理方式。如有疑問，請聯絡 <a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>。',
    p1: '付款由 Paddle.com Market Limited（或其關係企業）作為 Merchant of Record 處理；退款亦依 Paddle 退款政策執行。',
    p2_html: '退款申請必須於交易日後 <strong style="color:var(--text);font-weight:500">14 個日曆日</strong> 內提出。',
    p3_html: '若需申請退款，請透過 Paddle 買家支援入口 <a href="https://paddle.net" target="_blank" rel="noopener" style="color:var(--cyan);text-decoration:none">paddle.net</a> 提交。若需產品協助，也可來信 <a href="mailto:slab.stores@gmail.com" style="color:var(--cyan);text-decoration:none">slab.stores@gmail.com</a>。',
    p4_html: '本頁內容旨在與 Paddle 退款政策一致。完整細則與適用法定撤回權，請參考 <a href="https://www.paddle.com/legal/refund-policy" target="_blank" rel="noopener" style="color:var(--cyan);text-decoration:none">Paddle 退款政策</a>。',
    p5: '我們可能更新本政策，並在本頁更新生效日期。'
  },
  posts: {
    p1: {
      title_html: 'USB‑C 不是 <em>保證</em>。',
      sub: '不用實驗室設備，也能判斷一顆充電器值不值得信任。',
      meta_date: '2026 年 4 月 27 日',
      meta_read: '6 分鐘閱讀',
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
      meta_date: '2026 年 4 月 27 日',
      meta_read: '7 分鐘閱讀',
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
      meta_date: '2026 年 4 月 27 日',
      meta_read: '8 分鐘閱讀',
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
      meta_date: '2026 年 4 月 27 日',
      meta_read: '6 分鐘閱讀',
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
      meta_date: '2026 年 4 月 27 日',
      meta_read: '7 分鐘閱讀',
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
      meta_date: '2026 年 4 月 27 日',
      meta_read: '6 分鐘閱讀',
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
    },
    p7: {
      title_html: 'PD 與 QC：<em>差異解析</em>',
      sub: '兩個標準、多個誤解，以及安全充電真正該注意什麼。',
      meta_date: '2026 年 5 月 15 日',
      meta_read: '7 分鐘閱讀',
      back: '← 返回文章列表',
      lead: 'USB Power Delivery（PD）與 Qualcomm Quick Charge（QC）都是快速充電標準，但運作方式不同。了解兩者差異有助於避免規格不符的風險。',
      h1: '什麼是 USB Power Delivery（PD）？',
      p1: 'USB Power Delivery 是由 USB 開發者論壇（USB-IF）管理的開放標準。它支援廣泛的功率範圍（最高 240W），並且支援從手機到筆電的各種設備。',
      h2: '什麼是 Qualcomm Quick Charge（QC）？',
      p2: 'Quick Charge 是高通的自有快速充電技術，專為搭載 Snapdragon 處理器的設備設計。從 QC 2.0 到 QC 5+，每一代都有不同的電壓與電流配置。',
      h3: '可以在 QC 設備上使用 PD 充电器吗？',
      p3: '大多數情況下可以。許多現代設備同時支援兩種標準。如果充电器不是針對你的設備優化，可能無法獲得最快的充電速度。',
      h4: '在 PD 設備上使用 QC 充电器呢？',
      p4: '不支援 USB PD 的 QC 充电器可能無法很好地支援偏好 PD 的設備。可能充電緩慢或完全無法充電。',
      h5: '務實的做法',
      p5: '對於大多數現代設備，USB PD 是更安全的預設選擇——支援廣泛、標準化且面向未來。',
      cta_t: '不確定你的設備使用哪種標準？',
      cta_d: '進行免費評估，了解你的電源配置。',
      cta_a: '開始免費評估 →',
      cta_b: '查看方案'
    },
    p8: {
      title_html: 'MagSafe 與 <em>無線充電</em>。',
      sub: '便利但不是無代價——關於發熱、效率與安全你需要知道的事。',
      meta_date: '2026 年 5 月 22 日',
      meta_read: '6 分鐘閱讀',
      back: '← 返回文章列表',
      lead: '無線充電非常便利，但也有代價。較高的發熱量、較低的效率以及相容性差異，意味著它並不總是夜間或高負載充電場景的最安全選擇。',
      h1: '無線充電如何運作',
      p1: '無線充电器利用電磁感應來傳輸電力。充电器內的線圈產生磁場，在設備內的線圈中感應出電流。這個過程比直接有線連接效率低。',
      h2: '發熱是主要問題',
      p2: '所有無線充电器都比有線充電產生更多熱量。充電時較高的溫度會隨著時間加速電池磨損。',
      h3: 'MagSafe 與標準 Qi 充电',
      p3: '蘋果的 MagSafe 使用磁鐵精確對齊充电器與設備。MagSafe 在相容的 iPhone 上可提供高達 15W。',
      h4: '異物偵測（FOD）',
      p4: '優質無線充电器包含異物偵測——當檢測到金屬物體時會停止充電，防止區域性加熱和潛在損壞。',
      h5: '實務建議',
      p5: '白天使用無線充电以獲得便利，但考慮在夜間或持續高負載場景下使用有線充電。',
      cta_t: '想審核你的整體供電配置？',
      cta_d: '進行免費評估，包括有線和無線充電配置。',
      cta_a: '開始免費評估 →',
      cta_b: '查看方案'
    },
    p9: {
      title_html: 'Thunderbolt 4 與 <em>USB4</em> 指南。',
      sub: 'Power User 必讀：這些標準實際提供什麼，以及該注意什麼。',
      meta_date: '2026 年 5 月 29 日',
      meta_read: '8 分鐘閱讀',
      back: '← 返回文章列表',
      lead: 'Thunderbolt 4 與 USB4 使用相同的連接器（USB-C），但提供不同的功能。了解差異可以避免代價昂貴的錯誤。',
      h1: 'USB4 與 USB 3.x 的關係？',
      p1: 'USB4 建構在 Thunderbolt 3 協定基礎上。它可以傳輸 USB 資料、DisplayPort 視訊，並可選 PCIe。USB4 Gen 3 支援高達 40 Gbps。',
      h2: 'Thunderbolt 4 在 USB4 之上增加了什麼',
      p2: 'Thunderbolt 4 是 Intel 的品牌，代表超越 USB4 最低規格的最低標準。關鍵新增：最低 32 Gbps PCIe 頻寬、強制雙螢幕支援。',
      h3: 'TB4 和 USB4 上的功率傳輸',
      p3: 'Thunderbolt 4 要求充电器透過 USB PD 至少提供 15W，許多擴充塢和筆電支援 60W-100W。USB4 規範允許功率傳輸但不是強制性的。',
      h4: '線材比你想像的更重要',
      p4: '被動式 USB4/TB4 線材有長度限制（通常 40 Gbps 為 0.8 公尺，降至較低速度可達 2 公尺）。使用錯誤的線材可能導致無視訊輸出或速度受限。',
      h5: '擴充塢的陷阱',
      p5: '並非所有擴充塢都與所有主機相容。看起來「相容」的擴充塢可能只能提供 50% 的預期功能。',
      cta_t: '正在設定電源工作站？',
      cta_d: '免費評估你的擴充塢、充电器和線材相容性。',
      cta_a: '開始免費評估 →',
      cta_b: '查看方案'
    },
    p10: {
      title_html: '旅行 <em>充電安全</em>。',
      sub: '機場、飯店和國外插座：旅行時如何安全充電。',
      meta_date: '2026 年 6 月 5 日',
      meta_read: '7 分鐘閱讀',
      back: '← 返回文章列表',
      lead: '旅行帶來陌生的電源環境：不同的電壓、插座類型和共享充電站。採取一些預防措施可以幫助你避免設備損壞。',
      h1: '電壓很重要——世界上大部分地區不同',
      p1: '北美使用 110-120V，而世界上大部分地區使用 220-240V。大多数現代 USB 充电器是雙電壓（100-240V），所以可以在任何地方使用。',
      h2: '機場 USB 連接埠：便利與風險',
      p2: '機場充電站有 Juice Jacking 風險。可以使用 USB 資料阻斷器，或攜帶自己的牆壁充电器直接插入插座。',
      h3: '飯店充电器：檢查瓦數',
      p3: '一些飯店的 USB 連接埠僅限 5W 或電源調節不良。如果你的設備需要更高瓦數，請使用自己的充电器插入牆壁插座。',
      h4: '電源排插和適配器：注意串聯',
      p4: '使用旅行適配器連接到電源排插再連接到延長線會增加電阻和發熱風險。過載的電源排插是真正的火災風險。',
      h5: '打包清單',
      p5: '一個好的旅行套件包括：優質 USB 充电器、USB 資料阻斷器、萬用適配器，以及理想情况下的便攜式功率計。',
      cta_t: '計劃出差？',
      cta_d: '在出發前評估你的充電配置，發現隱藏風險。',
      cta_a: '開始免費評估 →',
      cta_b: '查看方案'
    },
    p11: {
      title_html: '5 個跡象表明你的充电器<em>正在故障</em>。',
      sub: '如何在損壞發生前及早發現問題。',
      meta_date: '2026 年 6 月 12 日',
      meta_read: '5 分鐘閱讀',
      back: '← 返回文章列表',
      lead: '充电器不會突然故障——它們在損壞設備之前會發出求救信號。學會識別這些跡象可以幫你省下維修費用或挽救設備。',
      h1: '1. 過度發熱',
      p1: '溫熱的充电器是正常的。過熱的充电器不是。如果你的充电器在正常使用時變得燙手，這是一個警告信號。高溫會加速充电器和設備電池的老化。',
      h2: '2. 閃爍或間歇性充電',
      p2: '如果你的設備在插入時不斷斷開和重新連接，電線或充电器連接器可能已經磨損。這不僅僅是煩人——重複的連接/斷開週期會產生功率突波，給你的設備帶來壓力。',
      h3: '3. 燃燒異味',
      p3: '任何燃燒異味——塑料、電子產品或化學物質——意味著立即停止。拔掉充电器插頭，斷開設備連接。這是一個嚴重的安全風險。更換充电器並檢查設備的連接埠。',
      h4: '4. 可見的物理損壞',
      p4: '裸露的電線、开裂的外殼或彎曲的連接器不是美觀問題——它們是安全隱患。磨損的電線可能會短路，开裂的充电器外殼會暴露帶電組件。',
      h5: '5. 充電速度突然下降',
      p5: '如果你的設備以前 2 小時充滿電但現在需要 4 小時，充电器可能正在故障。輸出降低是充电器內部老化的電容或故障的電源電路的常見跡象。',
      cta_t: '不確定你的充电器是否安全？',
      cta_d: '進行快速評估，檢查你的充電設置的健康狀況。',
      cta_a: '開始免費評估 →',
      cta_b: '查看方案'
    },
    p12: {
      title_html: '為什麼你的手機使用<em>「快充線」仍然很慢</em>。',
      sub: '線材限制如何悄悄成為充電速度與穩定性的瓶頸。',
      meta_date: '2026 年 6 月 19 日',
      meta_read: '6 分鐘閱讀',
      back: '← 返回文章列表',
      lead: '你升級了高瓦數充电器，手機卻仍然充得很慢。很多時候，真正的瓶頸是線材。線材材質、晶片標記與內阻，決定設備能否安全拉到預期功率。',
      h1: '1. 包裝上的「快充」不等於高功率',
      p1: '許多線材標示快充，但實際只支援較低電流。它可能能完成基礎充電，卻無法長時間維持高功率檔位。選購時應優先看認證電流與功率規格，而非行銷字眼。',
      h2: '2. 高瓦數 USB-C 充電需要 e-marker 晶片',
      p2: '在高功率 USB-C 充電情境中，系統常依賴線內 e-marker 晶片進行安全協商。若識別資訊不足，充电器與設備通常會主動降檔，避免風險。',
      h3: '3. 內阻會把功率變成熱',
      p3: '廉價導體與做工不佳的接頭會提高阻抗，導致壓降、發熱，最終到達設備的功率更少。若線材在充電時明顯發燙，效能與長期安全都可能受影響。',
      h4: '4. 線越長，越容易掉速',
      p4: '線材越長通常阻抗越高。這不代表長線一定不好，但低品質長線更容易讓充電速度下降。日常使用建議選擇在需求內最短且品質可靠的線材。',
      h5: '5. 建立簡單的線材健康檢查流程',
      p5: '可用兩條已知可靠的線比較充電時間，摸線材是否異常升溫，並檢查接頭是否鬆動或變色。若不同線材速度差異過大，應盡快汰換不確定來源的線材。',
      cta_t: '不確定線材是否拖慢你的充電效率？',
      cta_d: '做一次快速評估，取得更安全、更高效的充電建議。',
      cta_a: '開始免費評估 →',
      cta_b: '查看方案'
    },
    p13: {
      title_html: '2026 <em>AI PC 選購指南</em>。',
      sub: '不被行銷規格牽著走，挑出真正適合你的 AI 筆電。',
      meta_date: '2026 年 6 月 26 日',
      meta_read: '7 分鐘閱讀',
      back: '← 返回文章列表',
      lead: '「AI PC」標籤滿街都是，但多數人其實不清楚自己付的錢買到什麼。真正關鍵不在 TOPS 數字，而是你的實際工作流程、續航需求與軟體支援。',
      h1: '1. 從工作流程出發，不是看標章',
      p1: '若日常以瀏覽、串流與文書為主，不需要頂規 AI 處理器。若你會在本地跑語音轉錄、影像生成或離線的程式輔助，NPU 與 GPU 表現才會真正派上用場。先定義 2–3 種主力情境，再匹配硬體。',
      h2: '2. 看清 NPU 數字，再相信行銷',
      p2: '品牌會主打很高的 TOPS，但並非所有任務都跑在 NPU 上，部分功能仍依框架而落到 CPU 或 GPU。把 TOPS 當作參考訊號之一，並確認你常用的工具實際支援度。',
      h3: '3. 真正的瓶頸常常在記憶體與儲存',
      p3: '本地 AI 任務很吃記憶體。實務上 16 GB 是基本，重度多工或模型工作建議 32 GB。快速 SSD 也能改善模型載入與整體系統反應速度。',
      h4: '4. 散熱設計影響長時間穩定性',
      p4: '輕薄筆電可能短時跑分漂亮，但長時段就會降頻。建議查閱長時間負載與風扇噪音的評測。穩定的中段表現，往往比短暫高峰更實用。',
      h5: '5. 續航與接孔仍主導日常體驗',
      p5: '再強的 NPU，如果混合使用時電力崩壞也沒意義。同時要檢查 USB4、HDMI 與充電彈性。一台散熱、續航與 I/O 平衡的機器，通常比追規格買的機器用得久。',
      cta_t: '正在規劃一批新裝置？',
      cta_d: '採購前用我們的快速評估，建立實用的內部標準。',
      cta_a: '開始免費評估 →',
      cta_b: '查看方案'
    },
    p14: {
      title_html: '白話解析 <em>Passkey</em>。',
      sub: '為什麼比密碼更安全，以及如何安全切換不被鎖在外面。',
      meta_date: '2026 年 7 月 3 日',
      meta_read: '6 分鐘閱讀',
      back: '← 返回文章列表',
      lead: '密碼外洩與釣魚仍是帳號被盜最常見的途徑。Passkey 用裝置內的密碼學憑證取代可重複使用的密碼，從根本降低被釣風險。',
      h1: '1. Passkey 究竟是什麼',
      p1: 'Passkey 是針對特定服務產生的公私鑰配對。私鑰始終留在你信任的裝置上，不會傳出去。登入時由裝置以密碼學方式證明身分，不再傳送密碼。',
      h2: '2. 為什麼能擋下大多數釣魚攻擊',
      p2: 'Passkey 與網域綁定，因此假冒登入頁無法套用你在真網站上的憑證。即使誤點惡意連結，網域不對就無法通過密碼學驗證。',
      h3: '3. 如何安全遷移、避免被鎖在外面',
      p3: '先在主要帳號開啟 Passkey，過渡期保留一種備援登入方式。設定並實際測試帳號救援選項，確認可用之後再移除僅密碼登入的設定。',
      h4: '4. 跨裝置同步好用，但要管好',
      p4: '生態系同步讓 Passkey 在手機與筆電間使用更方便。請以強裝置鎖、最新系統版本與帳號救援控制，保護承載這些憑證的核心帳號。',
      h5: '5. 團隊與家庭的最佳實踐',
      p5: '對關鍵帳號統一採用 Passkey、寫下救援流程、每季做一次存取檢查。當有人在壓力下也清楚救援步驟，安全性才會真的提升。',
      cta_t: '想要一份更安全的數位設定檢核清單？',
      cta_d: '做一次快速評估，取得實用的帳號安全建議。',
      cta_a: '開始免費評估 →',
      cta_b: '查看方案'
    },
    p15: {
      title_html: '現在該升級到 <em>Wi-Fi 7</em> 嗎？',
      sub: '用一份實用檢核表，判斷新路由器是否真能改善你的日常網路。',
      meta_date: '2026 年 7 月 10 日',
      meta_read: '8 分鐘閱讀',
      back: '← 返回文章列表',
      lead: 'Wi-Fi 7 主打更快速度與更低延遲，但換路由器並不一定帶來真實感受上的提升。網路方案、設備支援度與居家格局，仍然決定最終體驗。',
      h1: '1. 換之前先確認真正的瓶頸',
      p1: '網路慢可能來自 WAN 上限、頻道擁塞、擺位不佳或老舊裝置。如果問題是水泥牆後訊號弱，調整 mesh 擺位的效益往往大於買頂規路由器。',
      h2: '2. 終端裝置相容性比規格更重要',
      p2: 'Wi-Fi 7 必須在支援的裝置上才能展現優勢。如果家中手機、電視與筆電多半仍是 Wi-Fi 6，旗艦 Wi-Fi 7 的短期收益相對有限。',
      h3: '3. Multi-Link 在擁塞環境真的有感',
      p3: 'Wi-Fi 7 在擁塞環境下，能透過多連線運作提升穩定度。對於高密度社區或智能家庭裝置很多的環境，這比帳面速度更實用。',
      h4: '4. 回程線路決定 mesh 表現',
      p4: '多房覆蓋情境中，有線回程仍比無線穩定。若沒辦法拉線，就盡量讓節點之間視線可達，避免每跳一次就掉一半流量。',
      h5: '5. 兩階段升級計畫最划算',
      p5: '先升級路由器與核心擺位，再隨時間替換老舊裝置。這種分階段做法可以控制預算，每一階段又都有可衡量的提升。',
      cta_t: '需要一份簡單的家用網路升級計畫？',
      cta_d: '進行一次評估，依實際影響排序最該優先處理的事項。',
      cta_a: '開始免費評估 →',
      cta_b: '查看方案'
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
  applyMetaTitle(next);
  // re-render nav/footer so labels update
  rerenderShell(next);
  applyGrowthPersonalization(next);
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

function applyMetaTitle(lang){
  try{
    const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const pageId = file.replace('.html','').replace(/-/g,'_');
    const title = t(`meta.${pageId}`, lang);
    if(title) document.title = title;
  }catch(e){}
}

const ZA_STATE_KEYS = {
  preferredPlan: 'za_preferred_plan',
  riskBand: 'za_risk_band',
  lastToolResult: 'za_last_tool_result',
  contextCase: 'za_context_case'
};

function getZAState(key){
  try{ return localStorage.getItem(key); }catch(e){ return null; }
}

function setZAState(key, value){
  try{ localStorage.setItem(key, value); }catch(e){}
}

try{
  window.ZAState = { get: getZAState, set: setZAState, keys: ZA_STATE_KEYS };
}catch(e){}

function applyPricingPersonalization(lang){
  if((document.body?.dataset?.page || '') !== 'pricing') return;
  let plan = getZAState(ZA_STATE_KEYS.preferredPlan);
  const contextCase = getZAState(ZA_STATE_KEYS.contextCase);
  try{
    const qp = new URLSearchParams(window.location.search);
    const fromUrl = qp.get('plan');
    if(fromUrl && ['free','pro','biz','custom'].includes(fromUrl)){
      plan = fromUrl;
      setZAState(ZA_STATE_KEYS.preferredPlan, fromUrl);
    }
  }catch(e){}
  if(!plan) return;
  document.querySelectorAll('.pc[data-plan]').forEach(card=>{
    card.classList.remove('pc-reco');
    const old = card.querySelector('.plan-reco-badge');
    if(old) old.remove();
    const oldHint = card.querySelector('.plan-context-hint');
    if(oldHint) oldHint.remove();

    if(contextCase && ['creator','it','travel','enterprise'].includes(contextCase)){
      const hint = document.createElement('div');
      hint.className = 'plan-context-hint';
      hint.textContent = `${t('pages.pricing.ctx_prefix', lang)}: ${t(`pages.pricing.ctx_${contextCase}`, lang)}`;
      card.appendChild(hint);
    }

    if(card.getAttribute('data-plan') === plan){
      card.classList.add('pc-reco');
      const badge = document.createElement('div');
      badge.className = 'plan-reco-badge';
      badge.textContent = t('pages.pricing.reco_badge', lang);
      card.appendChild(badge);
      if(window.location.hash === '#plans'){
        try{ card.scrollIntoView({ behavior: 'smooth', block: 'center' }); }catch(e){}
      }
    }
  });
}

function applyHomeStickyPersonalization(lang){
  if((document.body?.dataset?.page || '') !== 'home') return;
  const sticky = document.getElementById('homeStickyCta');
  const stickyText = document.getElementById('homeStickyText');
  if(!sticky || !stickyText) return;
  const update = ()=>{
    const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    const riskBand = getZAState(ZA_STATE_KEYS.riskBand);
    let key = 'pages.home.sticky_default';
    if(progress > 0.62) key = 'pages.home.sticky_end';
    else if(progress > 0.28) key = 'pages.home.sticky_mid';
    if(riskBand === 'high') key = 'pages.home.sticky_mid';
    stickyText.textContent = t(key, lang);
    sticky.classList.toggle('on', window.scrollY > 160);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function applyGrowthPersonalization(lang){
  applyPricingPersonalization(lang);
  applyHomeStickyPersonalization(lang);
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

function isAnalyticsEnabled(){
  return !!(ANALYTICS_ENDPOINT_URL && !ANALYTICS_ENDPOINT_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_ANALYTICS_WEB_APP_URL_HERE'));
}

function sendAnalytics(payload){
  if(!isAnalyticsEnabled()) return;
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

function trackEvent(event_name, props){
  try{
    sendAnalytics({
      type: 'event',
      site_id: ANALYTICS_SITE_ID,
      event_name,
      props: props || {},
      page: window.location.pathname,
      lang: getLang(),
      ts: new Date().toISOString()
    });
  }catch(e){}
}

try{
  window.ZA = Object.assign({}, window.ZA || {}, { trackEvent });
}catch(e){}

// ── Country pageview ping (Cloudflare Pages Functions + KV) ────────────────
// Records ONE counter per (UTC date, CF-IPCountry). No IP, no user agent stored.
// Endpoint silently returns ok if KV is not yet bound, so this is safe even
// before the Cloudflare KV namespace is set up.
function pingCountry(){
  try{
    if(typeof window === 'undefined') return;
    const host = window.location.hostname;
    if(!host || host === 'localhost' || host === '127.0.0.1') return;
    if(host.endsWith('.local')) return;
    const url = '/api/track';
    if(navigator.sendBeacon){
      const blob = new Blob([''], { type: 'text/plain' });
      navigator.sendBeacon(url, blob);
    }else{
      fetch(url, { method:'POST', keepalive:true }).catch(()=>{});
    }
  }catch(e){}
}

const NAV_HTML=(active, lang)=>`
<nav>
  <a href="index.html" class="logo">
    <svg width="22" height="27"><use href="#logo-s"/></svg>Zimon<em>AI</em>
  </a>
  <ul class="nav-mid">
    <li><a href="how-it-works.html" ${active==='how'?'class="active"':''}>${t('nav.how',lang)}</a></li>
    <li><a href="lab.html" ${active==='lab'?'class="active"':''}>${t('nav.lab',lang)}</a></li>
    <li><a href="game.html" ${active==='game'?'class="active"':''}>${t('nav.game',lang)}</a></li>
    <li><a href="use-cases.html" ${active==='use-cases'?'class="active"':''}>${t('nav.use_cases',lang)}</a></li>
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
      <a href="lab.html">${t('footer.lab',lang)}</a>
      <a href="game.html">${t('footer.game',lang)}</a>
    </div>
    <div class="f-col">
      <h5>${t('footer.company',lang)}</h5>
      <a href="use-cases.html">${t('footer.use_cases',lang)}</a>
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
    const activeLang = getLang();
    applyI18n(activeLang);
    applyMetaTitle(activeLang);
    applyGrowthPersonalization(activeLang);
  }catch(e){}

  // Pageview tracking (safe no-op until configured)
  try{
    sendAnalytics({
      type: 'pageview',
      site_id: ANALYTICS_SITE_ID,
      page: window.location.pathname,
      title: document.title,
      referrer: document.referrer || '',
      user_agent: navigator.userAgent,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      ts: new Date().toISOString()
    });
  }catch(e){}

  // Country pageview ping (Cloudflare Pages Functions + KV).
  // Safe no-op if KV namespace ZA_STATS isn't bound yet.
  try{ pingCountry(); }catch(e){}

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
