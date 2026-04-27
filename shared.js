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
    }
  }
};
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

  // apply page-specific i18n keys (optional)
  applyI18n(lang);

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
  const io=new IntersectionObserver(e=>{
    e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})
  },{threshold:0.08});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.addEventListener('click',()=>item.classList.toggle('open'));
  });
});
