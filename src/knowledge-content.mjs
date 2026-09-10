export const knowledgeCategoryDefinitions = [
  { id: 'supplier-identity', slug: 'supplier-identity' },
  { id: 'certification-market-access', slug: 'certification-market-access' },
  { id: 'product-transport-documents', slug: 'product-transport-documents' },
  { id: 'factory-onsite', slug: 'factory-onsite' },
  { id: 'commercial-risk', slug: 'commercial-risk' }
];

export const knowledgeArticleSpecs = [
  {
    id: 'knowledge-apple-iphone-duo-foldable-supply-chain',
    key: 'appleIphoneDuoFoldableSupplyChain',
    contentType: 'current-affairs',
    slug: 'knowledge/apple-iphone-duo-foldable-supply-chain',
    category: 'commercial-risk',
    products: ['general'],
    markets: ['global', 'international'],
    keywords: {
      en: ['Apple iPhone Duo', 'foldable iPhone 2026', 'iPhone Duo hinge', 'foldable phone supply chain', 'dual battery iPhone', 'iPhone Duo release date'],
      'zh-tw': ['Apple iPhone Duo', '摺疊 iPhone 2026', 'iPhone Duo 轉軸', '摺疊手機供應鏈', '雙電池 iPhone', 'iPhone Duo 上市日期'],
      'zh-cn': ['Apple iPhone Duo', '折叠 iPhone 2026', 'iPhone Duo 铰链', '折叠手机供应链', '双电池 iPhone', 'iPhone Duo 上市日期']
    },
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    image: '/assets/editorial-apple-iphone-duo-news.jpg',
    imageWidth: 2000,
    imageHeight: 2667,
    imageCrop: {
      card: '50% 43%',
      article: '50% 43%',
      mobile: '50% 44%'
    },
    photo: {
      photographer: 'Artem Korolev',
      page: 'https://unsplash.com/photos/apple-store-with-large-illuminated-logo-on-glass-building-V8wUMy-fDog',
      license: 'https://unsplash.com/license'
    },
    sources: [
      {
        publisher: 'Apple Newsroom',
        title: 'Apple unveils iPhone Duo — 9 September 2026',
        url: 'https://www.apple.com/newsroom/2026/09/apple-unveils-iphone-duo/'
      },
      {
        publisher: 'Associated Press',
        title: 'Apple unveils its first foldable iPhone in bid to jumpstart sales',
        url: 'https://apnews.com/article/apple-foldable-iphone-ternus-fd35312e6d894d5f3b055b3d62f22cd2'
      },
      {
        publisher: 'Axios',
        title: 'Apple debuts foldable iPhone Duo and iPhone 18 lineup',
        url: 'https://www.axios.com/2026/09/09/apple-live-updates-foldable-iphone-duo-18'
      }
    ]
  },
  {
    id: 'knowledge-apple-iphone-18-pro-vapor-chamber',
    key: 'appleIphone18ProVaporChamber',
    contentType: 'current-affairs',
    slug: 'knowledge/apple-iphone-18-pro-vapor-chamber',
    featured: true,
    featuredReviewedThrough: '2026-09-10',
    category: 'factory-onsite',
    products: ['general'],
    markets: ['global', 'international'],
    keywords: {
      en: ['iPhone 18 Pro vapor chamber', 'Apple A20 Pro 2nm', 'iPhone thermal design', 'smartphone vapor chamber supply chain', 'iPhone 18 Pro release date', 'Apple September 2026 event'],
      'zh-tw': ['iPhone 18 Pro 均熱板', 'Apple A20 Pro 2 奈米', 'iPhone 散熱設計', '手機均熱板供應鏈', 'iPhone 18 Pro 上市日期', 'Apple 2026 秋季發表會'],
      'zh-cn': ['iPhone 18 Pro 均热板', 'Apple A20 Pro 2 纳米', 'iPhone 散热设计', '手机均热板供应链', 'iPhone 18 Pro 上市日期', 'Apple 2026 秋季发布会']
    },
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    image: '/assets/editorial-apple-iphone-18-pro-thermal.jpg',
    imageWidth: 1312,
    imageHeight: 738,
    imageCrop: {
      card: '50% 50%',
      article: '50% 50%',
      mobile: '50% 50%'
    },
    photo: {
      photographer: 'Apple Newsroom',
      page: 'https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/',
      license: 'https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/'
    },
    sources: [
      {
        publisher: 'Apple Newsroom',
        title: 'Apple debuts iPhone 18 Pro and iPhone 18 Pro Max — 9 September 2026',
        url: 'https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/'
      },
      {
        publisher: 'MacRumors',
        title: 'iPhone 18 Pro features redesigned vapor chamber with three times the surface area',
        url: 'https://www.macrumors.com/2026/09/09/iphone-18-pro-redesigned-vapor-chamber/'
      },
      {
        publisher: 'Axios',
        title: 'Apple debuts foldable iPhone Duo and iPhone 18 lineup',
        url: 'https://www.axios.com/2026/09/09/apple-live-updates-foldable-iphone-duo-18'
      }
    ]
  },
  {
    id: 'knowledge-apple-airpods-5-wireless-charging-case',
    key: 'appleAirpods5WirelessChargingCase',
    contentType: 'current-affairs',
    slug: 'knowledge/apple-airpods-5-wireless-charging-case',
    category: 'product-transport-documents',
    products: ['general'],
    markets: ['global', 'international'],
    keywords: {
      en: ['Apple AirPods 5', 'AirPods 5 wireless charging case', 'AirPods 5 price', 'AirPods 5 ANC battery life', 'Qi charging earbuds case', 'AirPods 5 release date'],
      'zh-tw': ['Apple AirPods 5', 'AirPods 5 無線充電盒', 'AirPods 5 價格', 'AirPods 5 降噪續航', 'Qi 耳機充電盒', 'AirPods 5 上市日期'],
      'zh-cn': ['Apple AirPods 5', 'AirPods 5 无线充电盒', 'AirPods 5 价格', 'AirPods 5 降噪续航', 'Qi 耳机充电盒', 'AirPods 5 上市日期']
    },
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    image: '/assets/editorial-apple-airpods-5.jpg',
    imageWidth: 2000,
    imageHeight: 2500,
    imageCrop: {
      card: '51% 52%',
      article: '51% 50%',
      mobile: '51% 49%'
    },
    photo: {
      photographer: 'Alexandru Tabusca',
      page: 'https://unsplash.com/photos/white-apple-airpods-on-brown-wooden-table-ZhToglVbSdY',
      license: 'https://unsplash.com/license'
    },
    sources: [
      {
        publisher: 'Apple Newsroom',
        title: 'Apple introduces AirPods 5 with open-ear Active Noise Cancellation — 9 September 2026',
        url: 'https://www.apple.com/newsroom/2026/09/apple-introduces-airpods-5-with-best-in-class-open-ear-active-noise-cancellation/'
      },
      {
        publisher: 'The Independent',
        title: 'AirPods 5 add stronger noise cancellation and a second charging-case option',
        url: 'https://www.the-independent.com/tech/airpods-5-apple-noise-cancellation-new-feature-update-b3047610.html'
      },
      {
        publisher: 'MacRumors',
        title: 'AirPods 5 announced with improved ANC and two models',
        url: 'https://www.macrumors.com/2026/09/09/airpods-5-announced-improved-anc/'
      }
    ]
  },
  {
    id: 'knowledge-eu-battery-passport-power-bank',
    key: 'euBatteryPassportPowerBank',
    contentType: 'industry-knowledge',
    slug: 'knowledge/eu-battery-passport-power-bank',
    category: 'product-transport-documents',
    products: ['power-bank'],
    markets: ['european-union'],
    keywords: {
      en: ['EU battery passport power bank', 'power bank QR code 2027', 'EU Batteries Regulation 2023/1542', 'portable battery passport', 'battery category verification', 'power bank EU compliance'],
      'zh-tw': ['歐盟電池護照 行動電源', '行動電源 QR code 2027', '歐盟電池法規 2023/1542', '可攜式電池 電池護照', '電池類別查核', '行動電源歐盟合規'],
      'zh-cn': ['欧盟电池护照 移动电源', '移动电源 QR code 2027', '欧盟电池法规 2023/1542', '便携式电池 电池护照', '电池类别核查', '移动电源欧盟合规']
    },
    datePublished: '2026-09-10',
    dateModified: '2026-09-10',
    image: '/assets/editorial-eu-battery-passport-power-bank.jpg',
    imageWidth: 1600,
    imageHeight: 2400,
    imageCrop: {
      card: '60% 63%',
      article: '60% 62%',
      mobile: '58% 62%'
    },
    photo: {
      photographer: 'Karola G',
      page: 'https://www.pexels.com/photo/overhead-shot-of-a-cellphone-charging-from-a-power-bank-5208772/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'European Union — EUR-Lex',
        title: 'Regulation (EU) 2023/1542 on batteries and waste batteries — consolidated text',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02023R1542-20250731'
      },
      {
        publisher: 'European Commission — Directorate-General for Internal Market, Industry, Entrepreneurship and SMEs',
        title: 'Digital Product Passport for Batteries — scope, responsibility and implementation timeline',
        url: 'https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/batteries_en'
      },
      {
        publisher: 'European Commission — Directorate-General for Internal Market, Industry, Entrepreneurship and SMEs',
        title: 'Guidance to support preparations for the Digital Batteries Passport — 21 August 2026',
        url: 'https://single-market-economy.ec.europa.eu/news/guidance-support-preparations-digital-batteries-passport-2026-08-21_en'
      },
      {
        publisher: 'European Commission — Directorate-General for Environment',
        title: 'Batteries — objectives, law and implementation resources',
        url: 'https://environment.ec.europa.eu/topics/waste-and-recycling/batteries_en'
      }
    ]
  },
  {
    id: 'knowledge-eu-customs-reform-ecommerce-parcels',
    key: 'euCustomsReformEcommerceParcels',
    contentType: 'current-affairs',
    slug: 'knowledge/eu-customs-reform-ecommerce-parcels',
    category: 'commercial-risk',
    products: ['charger', 'power-adapter', 'power-bank', 'gan-charger'],
    markets: ['china', 'european-union'],
    keywords: {
      en: ['EU customs reform 2026', 'EU ecommerce handling fee', 'China parcels EU customs', 'non-EU platform importer', 'EU product identifiers November 2026', 'charger ecommerce compliance'],
      'zh-tw': ['歐盟海關改革 2026', '歐盟電商處理費', '中國小包裹歐盟關稅', '非歐盟平台進口責任', '歐盟產品識別碼 2026', '充電器跨境電商合規'],
      'zh-cn': ['欧盟海关改革 2026', '欧盟电商处理费', '中国小包裹欧盟关税', '非欧盟平台进口责任', '欧盟产品标识符 2026', '充电器跨境电商合规']
    },
    datePublished: '2026-09-09',
    dateModified: '2026-09-09',
    image: '/assets/editorial-eu-customs-parcel-inspection.jpg',
    imageWidth: 1800,
    imageHeight: 1200,
    imageCrop: {
      card: '56% 64%',
      article: '56% 62%',
      mobile: '55% 66%'
    },
    photo: {
      photographer: 'Tima Miroshnichenko',
      page: 'https://www.pexels.com/photo/a-man-inspecting-parcels-on-a-shelves-6170405/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'Council of the European Union',
        title: 'EU customs: Council greenlights landmark reform — 3 September 2026',
        url: 'https://www.consilium.europa.eu/en/press/press-releases/2026/09/03/eu-customs-council-greenlights-landmark-reform/'
      },
      {
        publisher: 'European Commission — Directorate-General for Taxation and Customs Union',
        title: 'Guidance and legal text on the temporary flat-rate duty for low-value imports',
        url: 'https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en'
      },
      {
        publisher: 'European Parliament',
        title: 'Deal reached on Union Customs Code reform — 26 March 2026',
        url: 'https://www.europarl.europa.eu/news/en/press-room/20260323IPR38815/deal-reached-on-union-customs-code-reform'
      },
      {
        publisher: 'The European Consumer Organisation (BEUC)',
        title: 'Who pays for the parcel? EU customs reform and consumer protection',
        url: 'https://www.beuc.eu/sites/default/files/publications/BEUC-X-2026-063_Factsheet_Who_pays_for_the_parcel.pdf'
      }
    ]
  },
  {
    id: 'knowledge-eu-common-charger-rules',
    key: 'euCommonChargerRules',
    contentType: 'industry-knowledge',
    slug: 'knowledge/eu-common-charger-usb-c-rules',
    category: 'certification-market-access',
    products: ['charger', 'power-adapter', 'gan-charger'],
    markets: ['european-union'],
    keywords: {
      en: ['EU common charger rules', 'USB-C charger EU compliance', 'Directive EU 2022/2380', 'USB Power Delivery 15W', 'EU charger label', 'external power supply 2028'],
      'zh-tw': ['歐盟通用充電器規則', 'USB-C 充電器歐盟合規', '歐盟 2022/2380 指令', 'USB Power Delivery 15W', '歐盟充電標示', '外接電源供應器 2028'],
      'zh-cn': ['欧盟通用充电器规则', 'USB-C 充电器欧盟合规', '欧盟 2022/2380 指令', 'USB Power Delivery 15W', '欧盟充电标签', '外部电源 2028']
    },
    datePublished: '2026-09-08',
    dateModified: '2026-09-08',
    image: '/assets/editorial-eu-common-charger-usb-c.jpg',
    imageWidth: 1800,
    imageHeight: 1202,
    imageCrop: {
      card: '48% 44%',
      article: '50% 44%',
      mobile: '46% 46%'
    },
    photo: {
      photographer: 'ready made',
      page: 'https://www.pexels.com/photo/usb-c-cable-on-white-surface-3921713/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'European Commission — Directorate-General for Internal Market, Industry, Entrepreneurship and SMEs',
        title: 'The EU common charger — scope, application dates and consumer information',
        url: 'https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/radio-equipment-directive-red/one-common-charging-solution-all_en'
      },
      {
        publisher: 'European Union — EUR-Lex',
        title: 'Directive (EU) 2022/2380 — common charging requirements under the Radio Equipment Directive',
        url: 'https://eur-lex.europa.eu/eli/dir/2022/2380/oj'
      },
      {
        publisher: 'European Commission — EUR-Lex',
        title: 'Commission Notice 2024/C 2997 — guidance on interpreting the Common Charger Directive',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:C_202402997'
      },
      {
        publisher: 'European Commission — EUR-Lex',
        title: 'COM(2026) 329 — report on wired-charging market developments and common-charger requirements',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52026DC0329'
      },
      {
        publisher: 'European Commission — Energy Efficient Products',
        title: 'Regulation (EU) 2025/2052 — new ecodesign requirements for external power supplies from 14 December 2028',
        url: 'https://energy-efficient-products.ec.europa.eu/product-list/external-power-supplies/eps-regulation-20252052-new_en'
      }
    ]
  },
  {
    id: 'knowledge-china-ccc-charger',
    key: 'chinaCccCharger',
    contentType: 'industry-knowledge',
    slug: 'knowledge/china-ccc-charger-certificate-scope',
    category: 'certification-market-access',
    products: ['charger', 'power-adapter'],
    markets: ['china'],
    keywords: {
      en: ['China CCC certification', 'charger CCC certificate', 'power adapter certification', 'CNCA certificate scope', 'charger model verification', 'China market access'],
      'zh-tw': ['中國 CCC 認證', '充電器 CCC 證書', '電源適配器認證', 'CNCA 證書範圍', '充電器型號核對', '中國市場准入'],
      'zh-cn': ['中国 CCC 认证', '充电器 CCC 证书', '电源适配器认证', 'CNCA 证书范围', '充电器型号核对', '中国市场准入']
    },
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
    image: '/assets/editorial-ccc-power-adapter.jpg',
    imageWidth: 1603,
    imageHeight: 2400,
    imageCrop: {
      card: '50% 49%',
      article: '50% 49%',
      mobile: '50% 51%'
    },
    photo: {
      photographer: 'ready made',
      page: 'https://www.pexels.com/photo/white-adapter-on-white-surface-3921700/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'Certification and Accreditation Administration of China',
        title: 'Current compulsory product certification implementation rules — updated August 2026',
        url: 'https://www.cnca.gov.cn/hlwfw/ywzl/qzxcprz/ssgz/art/2026/art_5261f654e02d45edaf0805fb268c9fc9.html'
      },
      {
        publisher: 'Certification and Accreditation Administration of China',
        title: 'CNCA-C09-01:2023 — Electronic products and safety accessories',
        url: 'https://www.cnca.gov.cn/cms_files/filemanager/953091537/attach/20236/bf59d670caf04327916fb4c79e10711c.pdf'
      },
      {
        publisher: 'Certification and Accreditation Administration of China',
        title: 'Announcement No. 10 of 2023 — electronic products and safety accessories CCC rule',
        url: 'https://www.cnca.gov.cn/zwxx/gg/2023/art/2023/art_6d451c4883ca4251b56097b04e06e108.html'
      },
      {
        publisher: 'State Administration for Market Regulation',
        title: 'Compulsory Product Certification Administration Provisions — Order No. 117',
        url: 'https://www.cnca.gov.cn/zwxx/gg/2009/art/2023/art_f27c0966aa924f78a75121497cfc0e8a.html'
      },
      {
        publisher: 'Certification and Accreditation Administration of China',
        title: 'Notice on certification-body information disclosure and certificate-status queries',
        url: 'https://www.cnca.gov.cn/zwxx/tz/2025/art/2025/art_7f10ec7a1a8341038a8b081edf6a90d4.html'
      }
    ]
  },
  {
    id: 'knowledge-belkin-ultracharge-pro-boostsolid',
    key: 'belkinUltraChargeProBoostSolid',
    contentType: 'current-affairs',
    slug: 'knowledge/belkin-ultracharge-pro-boostsolid-power-banks',
    category: 'product-transport-documents',
    products: ['power-bank'],
    markets: ['global', 'international'],
    keywords: {
      en: ['Belkin UltraCharge Pro BoostSolid', 'semi-solid-state power bank', 'Belkin IFA 2026', 'UltraCharge Pro 5K', 'UltraCharge Pro 10K', 'power bank cycle life'],
      'zh-tw': ['Belkin UltraCharge Pro BoostSolid', '半固態電芯行動電源', 'Belkin IFA 2026', 'UltraCharge Pro 5K', 'UltraCharge Pro 10K', '行動電源循環壽命'],
      'zh-cn': ['Belkin UltraCharge Pro BoostSolid', '半固态电芯移动电源', 'Belkin IFA 2026', 'UltraCharge Pro 5K', 'UltraCharge Pro 10K', '移动电源循环寿命']
    },
    datePublished: '2026-09-07',
    dateModified: '2026-09-07',
    image: '/assets/editorial-belkin-ultracharge-pro-boostsolid.jpg',
    imageWidth: 1800,
    imageHeight: 800,
    imageCrop: {
      card: '58% 52%',
      article: '58% 52%',
      mobile: '58% 52%'
    },
    photo: {
      photographer: 'Belkin International',
      page: 'https://www.belkin.com/pr-belkin-ultra-charge-pro-semi-solid-state-power-banks.html',
      license: 'https://www.dropbox.com/scl/fo/vk8275ou9tljj8qbr8dwt/AFMKh1NrcuzBNsrKQ05ChGA?dl=0&e=1&rlkey=jdql8rhyeeyb6wn2zvpkalc0q&st=lktorrlg'
    },
    sources: [
      {
        publisher: 'Belkin International',
        title: 'Belkin introduces UltraCharge Pro semi-solid-state power banks at IFA 2026',
        url: 'https://www.belkin.com/pr-belkin-ultra-charge-pro-semi-solid-state-power-banks.html'
      },
      {
        publisher: 'Belkin',
        title: 'UltraCharge Pro Slim Magnetic Power Bank 5K with BoostSolid Cell — specifications and disclosures',
        url: 'https://www.belkin.com/p/slim-magnetic-power-bank-5k-with-boostsolid-cell/BPD024fqBK.html'
      },
      {
        publisher: 'TechRadar',
        title: 'Belkin announces two super-slim semi-solid-state power banks — early IFA look',
        url: 'https://www.techradar.com/phones/phone-accessories/belkin-has-announced-two-super-slim-semi-solid-state-power-banks-and-weve-already-had-an-early-look-at-them'
      }
    ]
  },
  {
    id: 'knowledge-xo-poppy-power-bank-recall',
    key: 'xoPoppyPowerBankRecall',
    contentType: 'current-affairs',
    slug: 'knowledge/xo-poppy-power-bank-recall-us-canada',
    category: 'certification-market-access',
    products: ['power-bank'],
    markets: ['united-states', 'canada'],
    keywords: {
      en: ['XO Poppy power bank recall', 'PYPBK5M recall', 'magnetic wireless power bank recall', 'CPSC power bank recall 2026', 'Health Canada power bank recall', 'lithium-ion battery fire risk'],
      'zh-tw': ['XO Poppy 行動電源召回', 'PYPBK5M 召回', '磁吸無線行動電源召回', 'CPSC 行動電源召回 2026', '加拿大行動電源召回', '鋰離子電池火災風險'],
      'zh-cn': ['XO Poppy 移动电源召回', 'PYPBK5M 召回', '磁吸无线移动电源召回', 'CPSC 移动电源召回 2026', '加拿大移动电源召回', '锂离子电池起火风险']
    },
    datePublished: '2026-09-05',
    dateModified: '2026-09-05',
    image: '/assets/editorial-xo-poppy-power-bank-recall.jpg',
    imageWidth: 1200,
    imageHeight: 750,
    imageCrop: {
      card: '50% 50%',
      article: '50% 50%',
      mobile: '50% 50%'
    },
    photo: {
      photographer: 'U.S. Consumer Product Safety Commission',
      page: 'https://www.cpsc.gov/Recalls/2026/Truststone-Group-Recalls-XO-Poppy-Power-Trip-Magnetic-Wireless-Power-Banks-Due-to-Fire-and-Burn-Hazards-Sold-Exclusively-at-TJX-and-Marshalls-Stores',
      license: 'https://www.cpsc.gov/About-CPSC/Policies-Statements-and-Directives/Privacy-Policy'
    },
    sources: [
      {
        publisher: 'U.S. Consumer Product Safety Commission',
        title: 'Truststone Group recalls XO Poppy Power Trip magnetic wireless power banks',
        url: 'https://www.cpsc.gov/Recalls/2026/Truststone-Group-Recalls-XO-Poppy-Power-Trip-Magnetic-Wireless-Power-Banks-Due-to-Fire-and-Burn-Hazards-Sold-Exclusively-at-TJX-and-Marshalls-Stores'
      },
      {
        publisher: 'Health Canada',
        title: 'XO Poppy 5000 mAh MagSafe power banks recalled due to fire hazard',
        url: 'https://recalls-rappels.canada.ca/en/alert-recall/xo-poppy-5000-mah-magsafe-powerbanks-recalled-due-fire-hazard'
      }
    ]
  },
  {
    id: 'knowledge-anker-maggo-2-pro-qi2',
    key: 'ankerMagGo2Pro',
    contentType: 'current-affairs',
    slug: 'knowledge/anker-maggo-2-pro-qi2-25w-sourcing',
    category: 'certification-market-access',
    products: ['power-bank'],
    markets: ['global', 'international'],
    keywords: {
      en: ['Anker MagGo Power Bank 2 Pro', 'Anker IFA 2026', 'Qi2 25W power bank', 'active cooling power bank', 'Anker A110R', '10000mAh magnetic power bank'],
      'zh-tw': ['Anker MagGo Power Bank 2 Pro', 'Anker IFA 2026', 'Qi2 25W 行動電源', '主動散熱行動電源', 'Anker A110R', '10000mAh 磁吸行動電源'],
      'zh-cn': ['Anker MagGo Power Bank 2 Pro', 'Anker IFA 2026', 'Qi2 25W 移动电源', '主动散热移动电源', 'Anker A110R', '10000mAh 磁吸移动电源']
    },
    datePublished: '2026-09-03',
    dateModified: '2026-09-03',
    image: '/assets/editorial-anker-maggo-2-pro.jpg',
    imageWidth: 1600,
    imageHeight: 2000,
    imageCrop: {
      card: '61% 56%',
      article: '59% 55%',
      mobile: '60% 52%'
    },
    photo: {
      photographer: 'Anker Innovations',
      page: 'https://www.dropbox.com/scl/fo/xo6ymq0rpxcak9ijbl21e/AFc7V47c6qJtFf1A59bIPfE/Anker%20Charging/110R-Anker%20MagGo%20Power%20Bank%20Pro%202/A110RH11_RI_TD06_EN_V1%20%281%29.jpg?rlkey=v5lytb6qesicevy3tgxmmz19k&dl=0',
      license: 'https://www.einpresswire.com/article/939305437/anker-unveils-2026-charging-lineup-at-ifa-adding-intelligence-to-a-category-built-on-speed'
    },
    sources: [
      {
        publisher: 'Anker Innovations',
        title: 'Anker unveils its 2026 charging lineup at IFA — product details, availability and official press kit',
        url: 'https://www.einpresswire.com/article/939305437/anker-unveils-2026-charging-lineup-at-ifa-adding-intelligence-to-a-category-built-on-speed'
      },
      {
        publisher: 'Anker',
        title: 'Anker MagGo 2 Pro — Qi2 25W, 10K and active-cooling product information',
        url: 'https://www.anker.com/a110r-maggo-2-pro-qi2-magnetic-power-bank-cooling'
      },
      {
        publisher: 'Wireless Power Consortium',
        title: 'Qi-24417 — Anker MagGo Power Bank 2 Pro, part number A110R',
        url: 'https://jpsapi.wirelesspowerconsortium.com/products/qi/24417'
      },
      {
        publisher: 'Wireless Power Consortium',
        title: 'How professional buyers verify a Qi Certified product and its certificate',
        url: 'https://www.wirelesspowerconsortium.com/knowledge-base/testing-and-certification/qi-certified-products/'
      },
      {
        publisher: 'Wireless Power Consortium',
        title: 'Qi components and subsystems — why parts and prior designs do not automatically cover a product',
        url: 'https://www.wirelesspowerconsortium.com/knowledge-base/testing-and-certification/qi-components-and-subsystems/'
      },
      {
        publisher: 'United Nations Economic Commission for Europe',
        title: 'UN Manual of Tests and Criteria, Revision 8 and Amendment 1',
        url: 'https://unece.org/transport/publications/un-manual-tests-and-criteria-rev8-2023'
      }
    ]
  },
  {
    id: 'knowledge-reach-svhc-declaration',
    key: 'reachSvhcDeclaration',
    contentType: 'industry-knowledge',
    slug: 'knowledge/reach-svhc-declaration-charger',
    category: 'product-transport-documents',
    products: ['charger', 'power-adapter', 'gan-charger'],
    markets: ['china', 'european-union'],
    keywords: {
      en: ['REACH SVHC declaration', 'charger REACH compliance', 'Candidate List substances', 'Article 33 declaration', '0.1% w/w threshold', 'charger material declaration'],
      'zh-tw': ['REACH SVHC 聲明', '充電器 REACH 合規', '候選清單物質', 'REACH 第 33 條', '0.1% w/w 門檻', '充電器物質聲明'],
      'zh-cn': ['REACH SVHC 声明', '充电器 REACH 合规', '候选清单物质', 'REACH 第 33 条', '0.1% w/w 阈值', '充电器物质声明']
    },
    datePublished: '2026-09-04',
    dateModified: '2026-09-04',
    image: '/assets/editorial-reach-svhc-power-supply-board.jpg',
    imageWidth: 1600,
    imageHeight: 1200,
    imageCrop: {
      card: '55% 55%',
      article: '56% 54%',
      mobile: '52% 50%'
    },
    photo: {
      photographer: 'ed br',
      page: 'https://www.pexels.com/photo/close-up-of-circuit-board-with-components-37005283/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'European Chemicals Agency',
        title: 'Candidate List substances in articles — duties for producers, importers and suppliers',
        url: 'https://echa.europa.eu/regulations/reach/candidate-list-substances-in-articles'
      },
      {
        publisher: 'European Chemicals Agency',
        title: 'Communication in the supply chain — REACH Article 33 information duties',
        url: 'https://echa.europa.eu/en-GB/regulations/reach/candidate-list-substances-in-articles/communication-in-the-supply-chain'
      },
      {
        publisher: 'European Chemicals Agency',
        title: 'Guidance on requirements for substances in articles, Version 4.0',
        url: 'https://echa.europa.eu/documents/10162/2324906/articles_en.pdf'
      },
      {
        publisher: 'Court of Justice of the European Union',
        title: 'Judgment in Case C-106/14 — the 0.1% threshold applies to articles in a complex product',
        url: 'https://curia.europa.eu/jcms/jcms/P_173743/'
      },
      {
        publisher: 'European Chemicals Agency',
        title: 'Summary of obligations resulting from inclusion of SVHCs in the Candidate List',
        url: 'https://echa.europa.eu/candidate-list-obligations'
      }
    ]
  },
  {
    id: 'knowledge-iso-9001-factory',
    key: 'iso9001Factory',
    contentType: 'industry-knowledge',
    slug: 'knowledge/iso-9001-charger-factory',
    category: 'factory-onsite',
    products: ['charger', 'power-adapter', 'gan-charger'],
    markets: ['china'],
    keywords: {
      en: ['ISO 9001 certificate', 'China charger factory', 'supplier factory verification', 'quality management system', 'ISO certificate verification', 'charger manufacturer audit'],
      'zh-tw': ['ISO 9001 證書', '中國充電器工廠', '供應商工廠查核', '品質管理系統', 'ISO 證書查驗', '充電器製造商查核'],
      'zh-cn': ['ISO 9001 证书', '中国充电器工厂', '供应商工厂核查', '质量管理体系', 'ISO 证书查询', '充电器制造商审核']
    },
    datePublished: '2026-09-03',
    dateModified: '2026-09-04',
    image: '/assets/editorial-iso-9001-checklist.jpg',
    imageWidth: 1600,
    imageHeight: 1000,
    imageCrop: {
      card: '50% 54%',
      article: '50% 50%',
      mobile: '50% 58%'
    },
    photo: {
      photographer: 'MART PRODUCTION',
      page: 'https://www.pexels.com/photo/a-to-do-list-on-a-clipboard-7718755/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'International Organization for Standardization',
        title: 'ISO 9001 explained — quality management systems and certification',
        url: 'https://www.iso.org/home/insights-news/resources/iso-9001-explained.html'
      },
      {
        publisher: 'International Organization for Standardization',
        title: 'Certification — ISO develops standards but does not issue certificates',
        url: 'https://committee.iso.org/certification.html'
      },
      {
        publisher: 'International Organization for Standardization',
        title: 'Attestations of conformity — management-system marks and products',
        url: 'https://committee.iso.org/attestations-of-conformity.html'
      },
      {
        publisher: 'Certification and Accreditation Administration of China',
        title: 'CNCA Announcement No. 16 of 2025 — CNCA-QMS-01:2025 Quality Management System Certification Rules',
        url: 'https://www.cnca.gov.cn/zwxx/gg/2025/art/2025/art_b10adde5119f42fab7cad959b757ccc7.html'
      },
      {
        publisher: 'Certification and Accreditation Administration of China',
        title: 'Management system certification portal — bodies and public certificate query',
        url: 'https://www.cnca.gov.cn/hlwfw/ywzl/gltxrz/index.html'
      }
    ]
  },
  {
    id: 'knowledge-rohs-test-report',
    key: 'rohsTestReport',
    contentType: 'industry-knowledge',
    slug: 'knowledge/rohs-test-report-charger',
    category: 'certification-market-access',
    products: ['charger', 'power-adapter', 'gan-charger'],
    markets: ['european-union'],
    keywords: {
      en: ['RoHS test report', 'charger RoHS compliance', 'RoHS homogeneous material', 'EN IEC 63000', 'RoHS declaration', 'charger material compliance'],
      'zh-tw': ['RoHS 測試報告', '充電器 RoHS 合規', 'RoHS 均質材料', 'EN IEC 63000', 'RoHS 符合性聲明', '充電器限用物質'],
      'zh-cn': ['RoHS 测试报告', '充电器 RoHS 合规', 'RoHS 均质材料', 'EN IEC 63000', 'RoHS 符合性声明', '充电器限用物质']
    },
    datePublished: '2026-09-01',
    dateModified: '2026-09-04',
    image: '/assets/editorial-rohs-circuit-board.jpg',
    imageWidth: 1600,
    imageHeight: 1000,
    imageCrop: {
      card: '56% 52%',
      article: '53% 50%',
      mobile: '59% 52%'
    },
    photo: {
      photographer: 'Ivan Chumak',
      page: 'https://www.pexels.com/photo/close-up-of-electronic-circuit-board-with-components-34924858/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'European Union — EUR-Lex',
        title: 'Directive 2011/65/EU — consolidated text as of 1 July 2026',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02011L0065-20260701'
      },
      {
        publisher: 'European Commission — Directorate-General for Environment',
        title: 'Restriction of Hazardous Substances in Electrical and Electronic Equipment (RoHS)',
        url: 'https://environment.ec.europa.eu/topics/waste-and-recycling/rohs-directive_en'
      },
      {
        publisher: 'European Commission — Directorate-General for Environment',
        title: 'RoHS Directive implementation — exemptions procedure and status',
        url: 'https://environment.ec.europa.eu/topics/waste-and-recycling/rohs-directive/rohs-directive-implementation_en'
      },
      {
        publisher: 'European Union — EUR-Lex',
        title: 'Commission Implementing Decision (EU) 2020/659 — EN IEC 63000:2018',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32020D0659'
      },
      {
        publisher: 'International Electrotechnical Commission',
        title: 'IEC 63000:2016+A1:2022 — technical documentation for substance restrictions',
        url: 'https://webstore.iec.ch/en/publication/73587'
      },
      {
        publisher: 'International Electrotechnical Commission',
        title: 'IEC 62321-2:2021 — disassembly, disjointment and sample preparation',
        url: 'https://webstore.iec.ch/en/publication/64226'
      }
    ]
  },
  {
    id: 'knowledge-eu-safety-gate',
    key: 'euSafetyGate',
    contentType: 'industry-knowledge',
    slug: 'knowledge/eu-safety-gate-charger-alert',
    category: 'certification-market-access',
    products: ['charger', 'power-adapter', 'gan-charger'],
    markets: ['european-union'],
    keywords: {
      en: ['EU Safety Gate', 'charger recall', 'dangerous charger alert', 'Safety Gate product search', 'power adapter safety', 'EU product safety'],
      'zh-tw': ['歐盟 Safety Gate', '充電器召回', '危險充電器通報', 'Safety Gate 產品查詢', '電源適配器安全', '歐盟產品安全'],
      'zh-cn': ['欧盟 Safety Gate', '充电器召回', '危险充电器预警', 'Safety Gate 产品查询', '电源适配器安全', '欧盟产品安全']
    },
    datePublished: '2026-08-30',
    dateModified: '2026-09-04',
    image: '/assets/editorial-safety-gate-charger.jpg',
    imageWidth: 1600,
    imageHeight: 1000,
    imageCrop: {
      card: '60% 50%',
      article: '58% 50%',
      mobile: '62% 50%'
    },
    photo: {
      photographer: 'ready made',
      page: 'https://www.pexels.com/photo/photo-of-cord-near-socket-3921702/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'European Commission',
        title: 'Safety Gate — the EU rapid alert system for dangerous non-food products',
        url: 'https://ec.europa.eu/safety-gate/'
      },
      {
        publisher: 'European Union — EUR-Lex',
        title: 'Regulation (EU) 2023/988 — consolidated text, Articles 25 and 26',
        url: 'https://eur-lex.europa.eu/eli/reg/2023/988/2026-05-29/eng'
      },
      {
        publisher: 'European Commission — Directorate-General for Justice and Consumers',
        title: 'Safety Gate 2025 — how the rapid alert system and public portal work',
        url: 'https://op.europa.eu/webpub/just/safety-gate-2025-report/en/'
      },
      {
        publisher: 'European Commission',
        title: 'Product safety — EU rules and Safety Gate access',
        url: 'https://commission.europa.eu/topics/business-and-industry/product-safety_en'
      }
    ]
  },
  {
    id: 'knowledge-iecee-cb-certificate',
    key: 'ieceeCbCertificate',
    contentType: 'industry-knowledge',
    slug: 'knowledge/iecee-cb-certificate-charger',
    category: 'certification-market-access',
    products: ['charger', 'power-adapter', 'gan-charger'],
    markets: ['global'],
    keywords: {
      en: ['IECEE CB Test Certificate', 'CB certificate verification', 'charger certification', 'power adapter CB certificate', 'National Certification Body', 'CB Scheme'],
      'zh-tw': ['IECEE CB 測試證書', 'CB 證書查核', '充電器認證', '電源適配器 CB 證書', '國家認證機構', 'CB Scheme'],
      'zh-cn': ['IECEE CB 测试证书', 'CB 证书核查', '充电器认证', '电源适配器 CB 证书', '国家认证机构', 'CB Scheme']
    },
    datePublished: '2026-08-28',
    dateModified: '2026-09-04',
    image: '/assets/editorial-cb-charger.jpg',
    imageWidth: 1600,
    imageHeight: 1000,
    imageCrop: {
      card: '58% 52%',
      article: '56% 50%',
      mobile: '58% 52%'
    },
    photo: {
      photographer: 'Fortal Fototeca',
      page: 'https://www.pexels.com/photo/close-up-photo-of-white-adaptor-14468975/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'IECEE',
        title: 'IECEE Certificates — public CB Test Certificate database',
        url: 'https://certificates.iecee.org/'
      },
      {
        publisher: 'International Electrotechnical Commission',
        title: 'IECEE 01-S — Supplement to Basic Rules IEC CA 01',
        url: 'https://assets.iec.ch/public/cab/iecee01-s_ed5.1.pdf'
      },
      {
        publisher: 'International Electrotechnical Commission — TC 56',
        title: 'Assessing conformity — IECEE and national differences',
        url: 'https://tc56.iec.ch/assessing-conformity/'
      },
      {
        publisher: 'International Electrotechnical Commission',
        title: 'Copyright for conformity-assessment documents — validity of CB Test Reports',
        url: 'https://webstore.iec.ch/en/copyright'
      }
    ]
  },
  {
    id: 'knowledge-usb-if-certification',
    key: 'usbIfCertification',
    contentType: 'industry-knowledge',
    slug: 'knowledge/usb-if-certification-gan-charger',
    category: 'certification-market-access',
    products: ['gan-charger', 'charger'],
    markets: ['global'],
    keywords: {
      en: ['USB-IF certification', 'USB PD charger', 'GaN charger', 'USB-IF Product Search', 'Test ID', 'TID', 'Certified USB Charger'],
      'zh-tw': ['USB-IF 認證', 'USB PD 充電器', 'GaN 充電器', 'USB-IF 產品查詢', 'Test ID', 'TID', 'Certified USB Charger'],
      'zh-cn': ['USB-IF 认证', 'USB PD 充电器', 'GaN 充电器', 'USB-IF 产品查询', 'Test ID', 'TID', 'Certified USB Charger']
    },
    datePublished: '2026-08-26',
    dateModified: '2026-09-04',
    image: '/assets/editorial-usb-c-charger.jpg',
    imageWidth: 1600,
    imageHeight: 1000,
    imageCrop: {
      card: '57% 48%',
      article: '58% 48%',
      mobile: '58% 48%'
    },
    photo: {
      photographer: 'ready made',
      page: 'https://www.pexels.com/photo/photo-of-adopter-near-cord-3921632/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'USB Implementers Forum',
        title: 'USB-IF Compliance Program',
        url: 'https://www.usb.org/compliance'
      },
      {
        publisher: 'USB Implementers Forum',
        title: 'USB-IF Product Search',
        url: 'https://www.usb.org/products'
      },
      {
        publisher: 'USB Implementers Forum',
        title: 'USB Logo Usage Guidelines — Certified USB Charger Logos',
        url: 'https://www.usb.org/sites/default/files/usb-if_original_logo_usage_guidelines_final_2024.02.8.pdf'
      },
      {
        publisher: 'USB Implementers Forum',
        title: 'USB-IF Compliance Updates — model-number and Qualification by Similarity policies',
        url: 'https://compliance.usb.org/index.asp?Format=Standard&UpdateFile=Policies'
      }
    ]
  },
  {
    id: 'knowledge-eu-economic-operator',
    key: 'euEconomicOperator',
    contentType: 'industry-knowledge',
    slug: 'knowledge/eu-economic-operator-charger-label',
    category: 'certification-market-access',
    products: ['charger'],
    markets: ['european-union'],
    keywords: {
      en: ['EU economic operator', 'charger label', 'EU importer', 'authorised representative', 'product traceability', 'EU Declaration of Conformity'],
      'zh-tw': ['歐盟經濟營運者', '充電器標示', '歐盟進口商', '授權代表', '產品可追溯性', 'EU 符合性聲明'],
      'zh-cn': ['欧盟经济运营者', '充电器标识', '欧盟进口商', '授权代表', '产品可追溯性', 'EU 符合性声明']
    },
    datePublished: '2026-08-22',
    dateModified: '2026-09-04',
    image: '/assets/editorial-chargers-table.jpg',
    imageWidth: 1600,
    imageHeight: 1000,
    imageCrop: {
      card: '53% 36%',
      article: '53% 38%',
      mobile: '52% 38%'
    },
    photo: {
      photographer: "I'm Zion",
      page: 'https://www.pexels.com/photo/chargers-on-table-5948288/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'European Union — EUR-Lex',
        title: 'Regulation (EU) 2019/1020 — Article 4: tasks of economic operators',
        url: 'https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32019R1020'
      },
      {
        publisher: 'European Commission',
        title: 'Importers and distributors',
        url: 'https://single-market-economy.ec.europa.eu/single-market/goods/ce-marking/importers-and-distributors_en'
      },
      {
        publisher: 'European Union — Your Europe',
        title: 'General product compliance',
        url: 'https://europa.eu/youreurope/business/product-rules-compliance/general-product-compliance/index_en.htm'
      }
    ]
  },
  {
    id: 'knowledge-legal-entity',
    key: 'legalEntity',
    contentType: 'industry-knowledge',
    slug: 'knowledge/chinese-supplier-legal-entity',
    category: 'supplier-identity',
    products: ['general'],
    markets: ['china'],
    keywords: {
      en: ['Chinese supplier legal entity', 'Chinese company name', 'Unified Social Credit Code', 'business licence', 'contract party', 'bank beneficiary'],
      'zh-tw': ['中國供應商法律主體', '中文企業名稱', '統一社會信用代碼', '營業執照', '合約簽約方', '銀行收款人'],
      'zh-cn': ['中国供应商法律主体', '中文企业名称', '统一社会信用代码', '营业执照', '合同签约方', '银行收款人']
    },
    datePublished: '2026-08-20',
    dateModified: '2026-09-04',
    image: '/assets/editorial-contract-document.jpg',
    imageWidth: 1200,
    imageHeight: 900,
    imageCrop: {
      card: '58% 54%',
      article: '58% 54%',
      mobile: '56% 54%'
    },
    photo: {
      photographer: 'Pixabay',
      page: 'https://www.pexels.com/photo/black-pen-placed-on-white-paper-261679/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: '國家市場監督管理總局',
        title: '國家企業信用信息公示系統使用運行管理辦法（試行）',
        url: 'https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/xyjgs/art/2023/art_348c836206aa45a4b9a9b128fdc9db3b.html'
      },
      {
        publisher: '中華人民共和國司法部',
        title: '企業信息公示暫行條例',
        url: 'https://xzfg.moj.gov.cn/front/law/detail?LawID=1718'
      },
      {
        publisher: '國家企業信用信息公示系統',
        title: '全國市場主體信用信息查詢入口',
        url: 'https://www.gsxt.gov.cn/index.html'
      }
    ]
  },
  {
    id: 'knowledge-fcc-id',
    key: 'fccId',
    contentType: 'industry-knowledge',
    slug: 'knowledge/fcc-id-charger-verification',
    category: 'certification-market-access',
    products: ['charger'],
    markets: ['united-states'],
    keywords: {
      en: ['FCC ID', 'FCC equipment authorization', 'charger compliance', 'Supplier’s Declaration of Conformity', 'SDoC', 'FCC grant'],
      'zh-tw': ['FCC ID', 'FCC 設備授權', '充電器合規', '供應商符合性聲明', 'SDoC', 'FCC 授權紀錄'],
      'zh-cn': ['FCC ID', 'FCC 设备授权', '充电器合规', '供应商符合性声明', 'SDoC', 'FCC 授权记录']
    },
    datePublished: '2026-08-20',
    dateModified: '2026-09-04',
    image: '/assets/editorial-power-supply-board.jpg',
    imageWidth: 1600,
    imageHeight: 954,
    imageCrop: {
      card: '58% 62%',
      article: '58% 60%',
      mobile: '56% 60%'
    },
    photo: {
      photographer: 'Abolfazl Pahlavan',
      page: 'https://www.pexels.com/photo/electronic-circuit-board-with-various-components-33813265/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'Federal Communications Commission',
        title: 'OET Knowledge Database',
        url: 'https://apps.fcc.gov/oetcf/kdb/index.cfm'
      },
      {
        publisher: 'Federal Communications Commission',
        title: 'Equipment Authorization System — Generic Search',
        url: 'https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm'
      },
      {
        publisher: 'Federal Communications Commission',
        title: 'Equipment Authorization Program — DA 24-415',
        url: 'https://docs.fcc.gov/public/attachments/DA-24-415A1.pdf'
      }
    ]
  },
  {
    id: 'knowledge-ul-file',
    key: 'ulFile',
    contentType: 'industry-knowledge',
    slug: 'knowledge/ul-file-number-product-iq',
    category: 'certification-market-access',
    products: ['charger'],
    markets: ['united-states'],
    keywords: {
      en: ['UL file number', 'UL Product iQ', 'UL certification', 'power adapter', 'model coverage', 'certification holder'],
      'zh-tw': ['UL 檔案號', 'UL Product iQ', 'UL 認證', '電源適配器', '型號涵蓋範圍', '認證持有人'],
      'zh-cn': ['UL 档案号', 'UL Product iQ', 'UL 认证', '电源适配器', '型号覆盖范围', '认证持有人']
    },
    datePublished: '2026-08-20',
    dateModified: '2026-09-04',
    image: '/assets/editorial-multiport-adapter.jpg',
    imageWidth: 1600,
    imageHeight: 1066,
    imageCrop: {
      card: '55% 48%',
      article: '55% 48%',
      mobile: '54% 48%'
    },
    photo: {
      photographer: 'Pedro Paiva',
      page: 'https://www.pexels.com/photo/close-up-of-multi-usb-port-power-adapter-29356607/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'UL Solutions',
        title: 'Product Sourcing and Certifications Database — Product iQ',
        url: 'https://www.ul.com/software/product-sourcing-and-certifications-database'
      },
      {
        publisher: 'UL Solutions',
        title: 'FAQ — Enhanced and Smart UL Certification Mark',
        url: 'https://www.ul.com/thecodeauthority/knowledge/faq-enhanced-and-smart-ul-certification-mark'
      }
    ]
  },
  {
    id: 'knowledge-ce-marking',
    key: 'ceMarking',
    contentType: 'industry-knowledge',
    slug: 'knowledge/ce-marking-power-adapter-documents',
    category: 'certification-market-access',
    products: ['power-adapter'],
    markets: ['european-union'],
    keywords: {
      en: ['CE marking', 'EU Declaration of Conformity', 'power adapter', 'technical documentation', 'Low Voltage Directive', 'model verification'],
      'zh-tw': ['CE 標示', 'EU 符合性聲明', '電源適配器', '技術文件', '低電壓指令', '型號核對'],
      'zh-cn': ['CE 标志', 'EU 符合性声明', '电源适配器', '技术文件', '低电压指令', '型号核对']
    },
    datePublished: '2026-08-20',
    dateModified: '2026-09-04',
    image: '/assets/editorial-eu-power-adapter.jpg',
    imageWidth: 1350,
    imageHeight: 900,
    imageCrop: {
      card: '78% 50%',
      article: '79% 50%',
      mobile: '78% 52%'
    },
    photo: {
      photographer: 'Markus Winkler',
      page: 'https://www.pexels.com/photo/white-adapter-on-blue-surface-4097204/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'European Union — Your Europe',
        title: 'CE marking',
        url: 'https://europa.eu/youreurope/business/product-rules-compliance/general-product-compliance/ce-marking/index_en.htm'
      },
      {
        publisher: 'European Commission',
        title: 'CE marking — Internal Market, Industry, Entrepreneurship and SMEs',
        url: 'https://single-market-economy.ec.europa.eu/single-market/goods/ce-marking_en'
      },
      {
        publisher: 'EUR-Lex',
        title: 'Directive 2014/35/EU — Low Voltage Directive',
        url: 'https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=OJ%3AJOL_2014_096_R_0357_01'
      }
    ]
  },
  {
    id: 'knowledge-un38-3',
    key: 'un383',
    contentType: 'industry-knowledge',
    slug: 'knowledge/un38-3-power-bank-test-summary',
    category: 'product-transport-documents',
    products: ['power-bank'],
    markets: ['international'],
    keywords: {
      en: ['UN 38.3', 'power bank test summary', 'lithium battery transport', 'test report', 'battery configuration', 'dangerous goods'],
      'zh-tw': ['UN 38.3', '行動電源測試摘要', '鋰電池運輸', '測試報告', '電池配置', '危險品運輸'],
      'zh-cn': ['UN 38.3', '移动电源测试概要', '锂电池运输', '测试报告', '电池配置', '危险品运输']
    },
    datePublished: '2026-08-20',
    dateModified: '2026-09-04',
    image: '/assets/editorial-power-bank.jpg',
    imageWidth: 1600,
    imageHeight: 1066,
    imageCrop: {
      card: '43% 60%',
      article: '44% 60%',
      mobile: '44% 58%'
    },
    photo: {
      photographer: 'Markus Winkler',
      page: 'https://www.pexels.com/photo/white-power-bank-and-blue-coated-wires-4072683/',
      license: 'https://www.pexels.com/license/'
    },
    sources: [
      {
        publisher: 'United Nations Economic Commission for Europe',
        title: 'UN Manual of Tests and Criteria Rev.8 (2023) and Amendment 1 (2025)',
        url: 'https://unece.org/transport/dangerous-goods/rev8-files'
      },
      {
        publisher: 'United Nations Economic Commission for Europe',
        title: 'Lithium cell and battery test summary — subsection 38.3.5',
        url: 'https://unece.org/DAM/trans/danger/publi/manual/Rev.6/ST-SG-AC10-11-Rev6-Amend1e.pdf'
      },
      {
        publisher: 'United Nations Sub-Committee of Experts',
        title: 'Additional test summary questions — UN/SCETDG/55/INF.21',
        url: 'https://unece.org/DAM/trans/doc/2019/dgac10c3/UN-SCETDG-55-INF21e.pdf'
      }
    ]
  }
];

const activeKnowledgeCategoryIds = new Set(knowledgeArticleSpecs.map((article) => article.category));

export const knowledgePageDefinitions = [
  { id: 'knowledge', slug: 'knowledge', kind: 'knowledge' },
  ...knowledgeCategoryDefinitions
    .filter((category) => activeKnowledgeCategoryIds.has(category.id))
    .map((category) => ({
      id: `knowledge-category-${category.id}`,
      slug: `knowledge/${category.slug}`,
      kind: 'knowledge-category',
      categoryId: category.id
    })),
  ...knowledgeArticleSpecs.map((article) => ({
    id: article.id,
    slug: article.slug,
    kind: 'article',
    articleKey: article.key
  }))
];

export function knowledgeSpecById(pageId) {
  return knowledgeArticleSpecs.find((article) => article.id === pageId);
}

export const knowledgeContent = {
  en: {
    nav: 'Knowledge',
    hub: {
      metaTitle: 'Supplier Verification Knowledge | ZimonAI',
      metaDescription: 'Practical, source-backed guides to Chinese supplier identity, factory claims, EU common-charger rules, CCC, Qi2, RoHS, REACH/SVHC and other evidence for charger and power-bank buyers.',
      kicker: 'ZimonAI research desk',
      title: 'Supplier verification knowledge, written for the moment before you commit.',
      lead: 'Source-backed briefings for overseas buyers of chargers, power adapters and power banks. Each note gives the whole issue at a glance, then shows the official sources, evidence boundary and practical meaning.',
      featured: 'Start here',
      latest: 'Twenty-two field notes',
      methodLabel: 'Publishing standard',
      methodTitle: 'Useful answers, not search-engine filler.',
      methodItems: [
        ['Official sources first', 'Rules and database functions are checked against the authority or certification owner that operates them.'],
        ['The whole issue at a glance', 'Each opening summary brings together what the evidence means, where it stops and why that matters before the detailed analysis.'],
        ['Limits stay visible', 'A registry hit, file number or test summary is never presented as a guarantee of future delivery or product quality.']
      ],
      nextLabel: 'Ongoing research',
      nextTitle: 'New field notes are published regularly.',
      nextText: 'Future notes will stay within Chinese supplier verification and charger or power-electronics documentation. Topics are selected for purchase relevance, not publishing volume.'
    },
    taxonomy: {
      searchLabel: 'Search the knowledge desk',
      searchPlaceholder: 'Search certificates, products, documents or buyer questions',
      searchHint: 'Search titles, summaries and terms such as FCC ID, UL file number or UN 38.3.',
      clearSearch: 'Clear search',
      filtersLabel: 'Browse by topic',
      allCategories: 'All topics',
      productsLabel: 'Product',
      allProducts: 'All products',
      marketsLabel: 'Market',
      allMarkets: 'All markets',
      resultsLabel: 'Results:',
      resultSingular: 'article',
      resultPlural: 'articles',
      noResultsTitle: 'No field notes match these filters.',
      noResultsText: 'Try a broader term, remove a filter or browse all topics.',
      categoryKicker: 'Knowledge topic',
      browseAll: 'View all field notes',
      categories: {
        'supplier-identity': {
          name: 'Supplier identity and registry records',
          description: 'Connect trading names, registered entities, contract parties and payment recipients before relying on a supplier claim.'
        },
        'certification-market-access': {
          name: 'Certification and market access',
          description: 'Identify the applicable route, then check whether official records and documents cover the quoted model and destination market.'
        },
        'product-transport-documents': {
          name: 'Product and transport documents',
          description: 'Match test summaries, declarations and shipment documents to the product and battery configuration being purchased.'
        },
        'factory-onsite': {
          name: 'Factory and on-site checks',
          description: 'Plan and interpret factory, production-line and on-site evidence without overstating what a visit can prove.'
        },
        'commercial-risk': {
          name: 'Purchasing, contract and payment risk',
          description: 'Examine contracts, payment instructions and counterparty relationships before funds move.'
        }
      },
      products: {
        general: 'General products',
        charger: 'Chargers',
        'power-adapter': 'Power adapters',
        'power-bank': 'Power banks',
        'gan-charger': 'GaN chargers'
      },
      markets: {
        china: 'China',
        'united-states': 'United States',
        canada: 'Canada',
        'european-union': 'European Union',
        global: 'Global standards',
        international: 'International transport'
      }
    },
    ui: {
      read: 'Read field note',
      published: 'Published',
      updated: 'Last updated',
      readTime: 'Reading time',
      quickAnswer: 'Executive summary',
      buyerChecklist: 'Buyer checklist',
      limits: 'What this does not prove',
      sources: 'Sources and evidence',
      sourcesLead: 'Facts in this note were checked against the following primary and independent sources. Links open the source publisher’s website.',
      photo: 'Editorial photograph',
      related: 'Continue reading',
      back: 'All knowledge notes',
      editorialCredit: 'Produced by the ZIMONAI Editorial Desk at Zhimengwan Technology.'
    },
    articles: {
      appleIphoneDuoFoldableSupplyChain: {
        topic: 'Apple product and supply-chain news',
        published: '10 September 2026',
        readTime: '7 minutes',
        title: 'Apple enters foldables with iPhone Duo: the hinge is only the beginning',
        description: 'Apple’s first foldable iPhone combines two displays, a precision hinge, dual batteries and vapor-chamber cooling. The launch turns foldable-phone execution into a mainstream manufacturing story.',
        imageAlt: 'Apple Store in Shanghai with a large illuminated Apple logo, used as an editorial photograph for the iPhone Duo announcement.',
        imageCaption: 'Editorial photograph of an Apple Store in Shanghai. It is not an iPhone Duo product image, an Apple production site, a ZIMONAI client or supplier, or evidence about Apple’s manufacturing partners.',
        labels: {
          summary: 'News summary',
          checklist: 'What to watch next',
          limits: 'What remains unknown'
        },
        answer: 'Apple unveiled iPhone Duo on 9 September, making its first foldable iPhone a premium $1,999 product. It combines a 7.6-inch inner display, 5.4-inch outer display, precision hinge, two batteries and vapor-chamber cooling; pre-orders begin 16 October and availability starts 23 October. The bigger story is not the fold alone. The launch raises the industry benchmark for making several difficult subsystems behave as one polished product. ZIMONAI’s editorial view: supply-chain performance will be judged through hinge feel, flexible-display protection, structural consistency, heat flow and battery matching across production—not one headline specification.',
        takeaways: [
          'Apple officially describes iPhone Duo as its first foldable iPhone, with a 7.6-inch inner screen, 5.4-inch outer screen and more than 100 parts in the hinge assembly.',
          'The internal architecture adds two batteries and a custom vapor chamber around the A20 Pro, showing that the foldable challenge extends beyond the display and hinge.',
          'Apple has confirmed U.S. pricing and launch dates, but has not published component suppliers, production yield, service-life targets for the hinge or shipment volume.'
        ],
        sections: [
          {
            title: 'What exactly did Apple announce?',
            paragraphs: [
              'Apple introduced iPhone Duo on 9 September as the first foldable model in the iPhone family. When open, it uses a 7.6-inch inner Super Retina XDR display; when closed, a 5.4-inch outer display provides what Apple says is 90 percent of the screen area of iPhone 18 Pro. Both panels use the same aspect ratio so content can move between them without a major change in shape. Apple says the inner surface uses a nano-texture finish intended to reduce glare and make the crease less visible.',
              'The hardware is built around a precision hinge that supports the display when flat and closes with an integrated magnet array. Apple says the hinge contains more than 100 components, while the enclosure uses grade 5 titanium and internal ribs for stiffness. iPhone Duo starts at $1,999 in the United States, with pre-orders on 16 October and first availability on 23 October in more than 70 countries and regions.'
            ]
          },
          {
            title: 'Why is this more than a foldable-display story?',
            paragraphs: [
              'A folding product makes several tolerances interact. The hinge must control motion and support the panel; the cover layers and adhesives must survive bending; the frame has to resist twisting; and dust, water and repeated handling still affect the finished device. Apple says custom adhesives let the display layers move past one another to relieve bend stress, and that the phone carries an IP68 rating. Those are product claims from Apple, not public proof of long-term field performance.',
              'Space is also divided differently from a conventional phone. Apple placed one battery on each side and combined the A20 Pro with a custom vapor chamber. For manufacturers and component teams, that means display, hinge, battery, thermal interface, antennas and enclosure cannot be qualified only as isolated parts. ZIMONAI’s interpretation is that assembly variation and subsystem interaction will matter as much as the headline material or component specification.'
            ],
            items: [
              'Hinge torque and alignment across the opening range',
              'Flexible-display layers, crease control and adhesive consistency',
              'Two-battery matching, protection logic and thermal balance',
              'Frame stiffness, sealing and antenna integration',
              'Final-unit inspection after repeated folding and temperature cycling'
            ]
          },
          {
            title: 'What could iPhone Duo change across the supply chain?',
            paragraphs: [
              'Apple’s entry gives foldable components a larger reference point, but it does not automatically reveal who will win supply contracts. A component that works in a development sample still has to meet cosmetic, dimensional, reliability and delivery requirements at production scale. The practical signal is that foldable-phone sourcing is becoming a systems-integration discipline rather than a search for one novel hinge or panel.',
              'For overseas buyers of their own foldable or hinged products, the useful lesson is to request evidence by failure mode: hinge-cycle data with the tested configuration, display and adhesive lot traceability, battery-pair controls, thermal maps, ingress-test conditions and final inspection records. Copying iPhone Duo’s marketing vocabulary does not establish comparable durability. What matters is whether the quoted model, verified sample and production process remain the same.'
            ]
          }
        ],
        checklist: [
          'Independent teardowns confirming the internal architecture after retail release',
          'Apple support and repair information for the inner display, hinge and batteries',
          'Any official durability test methods or cycle figures Apple later publishes',
          'Early field reports separated from isolated damage or pre-production demonstrations',
          'Supplier filings or disclosures rather than unnamed supply-chain rumours',
          'How competing foldable brands change pricing, warranties and component requirements'
        ],
        limitsText: 'Apple has confirmed the product design, selected performance claims, pricing and launch schedule. It has not identified the hinge, panel, battery or vapor-chamber suppliers; disclosed production yield, unit volume or full validation methods; or published a hinge-life guarantee. Associated Press and Axios provide independent reporting on the launch, but they do not prove component provenance or factory performance. The manufacturing implications in this article are ZIMONAI editorial analysis, not Apple statements and not evidence that a particular supplier participates in iPhone Duo production.'
      },
      appleIphone18ProVaporChamber: {
        topic: 'Apple hardware and manufacturing news',
        published: '10 September 2026',
        readTime: '7 minutes',
        title: 'iPhone 18 Pro makes cooling a headline feature—not hidden engineering',
        description: 'Apple paired the 2nm A20 Pro with a redesigned vapor chamber and is openly selling sustained performance. That puts thermal consistency, interfaces and assembly control in the spotlight.',
        imageAlt: 'Burgundy iPhone 18 Pro shown from the front and back in an official Apple Newsroom image.',
        imageCaption: 'Official Apple Newsroom image of iPhone 18 Pro in burgundy. It is manufacturer-issued media material, not a teardown, thermal test, ZIMONAI client unit, supplier sample or evidence about Apple’s component sources.',
        labels: {
          summary: 'News summary',
          checklist: 'What to watch next',
          limits: 'What remains unknown'
        },
        answer: 'Apple’s iPhone 18 Pro launch puts thermal engineering at the centre of the product story. The new A20 Pro uses a 2-nanometer process and an M-series-inspired package connected to a larger vapor chamber. Apple claims up to 40 percent better sustained performance than the previous generation; pre-orders begin 12 September and sales start 18 September. This matters because smartphone performance is moving beyond a brief benchmark peak toward what a device can maintain. ZIMONAI’s editorial view: vapor-chamber flatness, fluid control, interface pressure and final assembly are becoming visible manufacturing-quality issues as AI, gaming and camera workloads rise.',
        takeaways: [
          'Apple says A20 Pro is built on 2nm process technology and connects directly to a new vapor chamber through a redesigned chip package.',
          'The official claim is up to 40 percent better sustained performance than the previous generation; the figure is Apple’s comparison, not an independent universal result.',
          'The design turns cooling into a production-control story involving the chamber, thermal interfaces, enclosure contact and software workload—not a single supplier part.'
        ],
        sections: [
          {
            title: 'What changed inside iPhone 18 Pro?',
            paragraphs: [
              'Apple announced iPhone 18 Pro and Pro Max on 9 September. The A20 Pro uses the company’s latest 2nm process and a package that places major elements side by side, an approach Apple says was inspired by M-series silicon. That package connects the chip directly to a new vapor chamber to move heat away from concentrated workloads.',
              'Apple is unusually direct about the performance objective: up to 40 percent higher sustained performance than the previous generation. MacRumors reports that the chamber has three times the surface area of the prior design and contains deionized water. The larger chamber is important because sustained cooling depends on how efficiently heat reaches, spreads through and leaves the chamber—not simply whether a phone contains one.'
            ]
          },
          {
            title: 'Why does a larger vapor chamber raise manufacturing demands?',
            paragraphs: [
              'A vapor chamber is a sealed, thin two-phase heat spreader. Heat evaporates internal fluid near the source; vapour moves across the chamber, condenses in cooler regions and returns through a wick structure. In a phone, a chamber must remain thin and flat while surviving handling, assembly pressure and temperature changes. Small variations in fill quantity, sealing, internal cleanliness or surface contact can change performance even when the drawing looks identical.',
              'The larger contact area also increases dependence on surrounding parts. Gap materials, frame flatness, fastener sequence and enclosure tolerance can determine whether heat actually reaches the designed path. ZIMONAI’s practical reading is that buyers evaluating similar cooling claims should ask for production-distribution data and test-fixture details, not just a golden-sample thermal image or a component datasheet.'
            ],
            items: [
              'Vapor-chamber dimensions, thickness and flatness tolerance',
              'Working-fluid, wick and sealing process controls',
              'Leak, pressure and thermal-resistance test methods',
              'Interface material thickness and compression window',
              'Finished-device temperature and throttling results across production lots'
            ]
          },
          {
            title: 'What does Apple’s claim mean for the wider phone market?',
            paragraphs: [
              'By promoting sustained performance, Apple shifts attention from a short peak score to what a device can maintain during gaming, video, AI and camera workloads. Competitors and component vendors are likely to answer with their own cooling claims, but comparable language does not guarantee comparable test conditions. Ambient temperature, workload duration, screen brightness, software version and case configuration can materially alter a result.',
              'For brands and sourcing teams, the commercial opportunity is real: cooling can support performance, comfort and battery behaviour. The risk is turning one supplier’s chamber specification into a finished-product promise. A defensible claim needs a defined device configuration, repeatable method, sample count and acceptance range. That distinction will become more important if thermal performance moves onto packaging and launch slides.'
            ]
          }
        ],
        checklist: [
          'Independent sustained-performance tests after retail units ship',
          'Test temperature, workload duration, software version and device configuration',
          'Teardowns confirming chamber size, placement and interface construction',
          'Whether Apple publishes additional detail behind the 40 percent comparison',
          'Early reports of heat, throttling or battery behaviour assessed across more than one unit',
          'How competing brands define and substantiate their own cooling claims'
        ],
        limitsText: 'Apple has confirmed the A20 Pro process, package concept, vapor chamber and its own sustained-performance claim. The company has not published the vapor-chamber supplier, complete dimensions, fluid quantity, production tolerances, validation sample size or yield. MacRumors adds design detail but is not a substitute for Apple engineering records or independent multi-unit testing. The supplier-control and test implications above are ZIMONAI editorial analysis; they do not show that iPhone 18 Pro has a defect or that any named factory makes the component.'
      },
      appleAirpods5WirelessChargingCase: {
        topic: 'Apple audio and charging news',
        published: '10 September 2026',
        readTime: '6 minutes',
        title: 'AirPods 5 splits into two models—and the charging case now defines the upgrade',
        description: 'Apple launched two AirPods 5 versions at $129 and $149. The more expensive model adds a wireless charging case, longer battery life and swipe volume control, making variant accuracy part of the product story.',
        imageAlt: 'Earlier-generation Apple AirPods and charging case on a wooden table, used as an editorial photograph for AirPods 5 charging-case news.',
        imageCaption: 'Editorial photograph of an earlier AirPods model, not AirPods 5. It is not a ZIMONAI client device, supplier sample, charging test or evidence about Apple’s manufacturing partners.',
        labels: {
          summary: 'News summary',
          checklist: 'What to watch next',
          limits: 'What remains unknown'
        },
        answer: 'AirPods 5 arrives as two products: a $129 model and a $149 version with a Wireless Charging Case. Both add the H3 chip and open-ear Active Noise Cancellation; the higher-priced version also brings longer battery life and swipe volume control. Its case supports Apple Watch chargers, Qi-compatible chargers and USB-C, with availability from 18 September. The bigger story is commercial as much as technical: one small accessory now defines the product tier. For buyers and the wider accessories supply chain, model names, packaging, battery claims, charging compatibility and test records must stay aligned from factory file to retail page.',
        takeaways: [
          'Apple has created two AirPods 5 SKUs at $129 and $149, with the Wireless Charging Case version carrying the extra charging, control and battery-life features.',
          'Apple claims up to five hours of listening with Active Noise Cancellation and up to 22 hours with the wireless case; these are Apple test results under stated conditions.',
          'For the wider accessories market, the launch shows how charging-case architecture can define a product tier and create costly listing or packaging errors when variants look similar.'
        ],
        sections: [
          {
            title: 'What is different between the two AirPods 5 models?',
            paragraphs: [
              'Apple announced AirPods 5 on 9 September with a redesigned open-ear fit, H3 chip and Active Noise Cancellation across both versions. The standard model costs $129 in the United States. The $149 AirPods 5 with Wireless Charging Case adds swipe volume control on the stem and the upgraded case, while Apple also describes longer battery life for that configuration.',
              'Apple says the wireless case works with Apple Watch chargers, Qi-compatible chargers and USB-C cables. For the wireless-case model, the company states up to five hours of listening with Active Noise Cancellation enabled and up to 22 hours when the case is included. Availability begins 18 September. The Independent and MacRumors independently reported the two-model structure and the added case features.'
            ]
          },
          {
            title: 'Why does the charging case matter beyond convenience?',
            paragraphs: [
              'A charging case is part of the electrical product system. It contains its own battery, charging input, power management, contacts, enclosure and firmware behaviour. Adding Qi and Apple Watch charger compatibility changes coil alignment, heat management and interoperability expectations. It also changes how the full product should be described, packed and tested.',
              'ZIMONAI’s editorial view is that the $20 price step makes variant control unusually visible. If a carton, online listing, manual or inspection record drops the words “Wireless Charging Case,” a buyer could receive a legitimate AirPods 5 product that is still the wrong commercial SKU. The same risk applies to look-alike earbuds projects: accessory differences need their own bill of materials, label artwork and final-function checks.'
            ],
            items: [
              'Complete earbud and case model identifiers',
              'USB-C, Qi and watch-charger compatibility by exact SKU',
              'Earbud and case battery specifications',
              'Packaging statements and included-cable contents',
              'Final charging, pairing and control-function inspection'
            ]
          },
          {
            title: 'What should readers make of the noise-cancellation and battery claims?',
            paragraphs: [
              'Apple says AirPods 5 delivers up to 50 percent more external-noise reduction than AirPods 4 with Active Noise Cancellation. Its footnote describes testing against IEC 60268-24 using specified AirPods hardware and prerelease software. That is a defined comparative claim, not a promise that every listener will perceive exactly the same improvement in every environment.',
              'Battery figures are also configuration-dependent. Listening mode, volume, calls, spatial features, battery age and wireless-charging conditions can change real-world results. The useful reading is that Apple is combining a performance story with a more clearly tiered accessory system. Retail testing and user reviews after 18 September will show how the two versions differ in ordinary use.'
            ]
          }
        ],
        checklist: [
          'Retail model numbers and package wording for both AirPods 5 versions',
          'Independent battery tests with Active Noise Cancellation on and off',
          'Qi and Apple Watch charger interoperability across common charger designs',
          'Charging temperature, alignment and behaviour with protective cases',
          'Whether buyers confuse the two SKUs in listings or fulfilment',
          'Repair, battery-service and replacement-case information after launch'
        ],
        limitsText: 'Apple has confirmed the two configurations, U.S. prices, charging methods, availability date and its own battery and noise-reduction claims. It has not published component suppliers, battery-cell sources, complete case electrical specifications, manufacturing yield or independent field results. The editorial photograph shows an earlier AirPods generation and must not be used to identify the new model. The variant-control and supply-chain implications above are ZIMONAI editorial analysis, not claims made by Apple, The Independent or MacRumors.'
      },
      euBatteryPassportPowerBank: {
        topic: 'EU battery documents',
        published: '10 September 2026',
        readTime: '7 minutes',
        title: 'Does an ordinary power bank need an EU battery passport in 2027?',
        description: 'Battery passports begin on 18 February 2027, but not for every rechargeable battery. Power-bank buyers first need the right battery category, then the separate QR-code file.',
        imageAlt: 'A smartphone connected by cable to a portable power bank, used as an editorial illustration for EU battery-passport checks.',
        imageCaption: 'Editorial photograph of a phone connected to a power bank. It is not a ZIMONAI product, supplier, client device, compliance file, battery passport or test record.',
        answer: 'From 18 February 2027, the EU battery passport applies to EV and LMT batteries and industrial batteries above 2 kWh. A typical consumer power bank normally fits the portable-battery definition—sealed, 5 kg or less and not designed specifically for industrial use—so it is outside that passport scope. It still needs the all-battery QR code introduced on the same date, which links to a different information set. ZIMONAI’s editorial view: buyers should record the exact model, weight, watt-hours, intended use and category rationale before asking for a “passport”; otherwise a polished digital page may answer the wrong legal question.',
        takeaways: [
          'Article 77 limits the 18 February 2027 battery-passport duty to EV batteries, LMT batteries and industrial batteries with a capacity above 2 kWh.',
          'A normal consumer power bank usually falls within the portable-battery definition based on its physical characteristics and intended use; the exact product still needs to be classified rather than assumed from its marketing name.',
          'All batteries require a QR code from the same date. For portable batteries outside the passport categories, Article 13 points that code to applicable label, conformity, due-diligence and end-of-life information—not to a battery passport.'
        ],
        sections: [
          {
            title: 'Which batteries actually need a passport from February 2027?',
            paragraphs: [
              'Article 77 of Regulation (EU) 2023/1542 sets a narrow category test: from 18 February 2027, each EV battery, each light-means-of-transport (LMT) battery and each industrial battery with a capacity greater than 2 kWh must have an electronic battery passport. The Commission’s current battery-passport page describes the affected products as including EV batteries, batteries for e-bikes, e-mopeds and e-scooters, home-storage batteries and industrial batteries.',
              'The obligation sits with the economic operator that places the finished battery on the EU market, not automatically with a cell or module supplier. The passport is linked through a QR code and contains model-level and battery-specific information with different access rights. A supplier portal, test-report folder or QR code on its own is therefore not evidence that the Article 77 passport route applies or has been completed.'
            ]
          },
          {
            title: 'Where does an ordinary consumer power bank fit?',
            paragraphs: [
              'The Regulation defines a portable battery as sealed, weighing 5 kg or less, not designed specifically for industrial use, and not an EV, LMT or starting-lighting-ignition battery. It also treats finished battery packs ready for end-user use as batteries. On those criteria, an ordinary phone-charging power bank will usually be a portable battery rather than an industrial or LMT battery. That is ZIMONAI’s product-classification reading of the legal definitions, not an EU approval of every item sold under the name “power bank.”',
              'The marketing label cannot settle borderline products. A large portable power station, a battery designed for industrial equipment, or a product used in a mobility application may have different characteristics and intended use. Buyers should preserve rated energy in watt-hours, total weight, design purpose, battery configuration, instructions and intended application, then obtain the manufacturer’s written category rationale for the exact model.'
            ],
            items: [
              'Product and battery model, including every suffix and pack configuration',
              'Total battery weight and rated energy in watt-hours',
              'Consumer or specifically industrial intended use',
              'Whether the battery supplies traction to a light means of transport',
              'Manufacturer’s documented category and the definition used'
            ]
          },
          {
            title: 'Why is a 2027 QR code not automatically a battery passport?',
            paragraphs: [
              'Article 13 requires all batteries to carry a QR code from 18 February 2027. For EV, LMT and qualifying industrial batteries, the code provides access to the Article 77 passport. For other batteries, including an ordinary portable power bank under the classification above, the code instead provides access to the applicable labelling information, EU Declaration of Conformity, relevant battery due-diligence reporting and waste-prevention and end-of-life information specified by the Regulation.',
              'This distinction changes the buyer request. Asking every supplier for a “battery passport” can produce a false pass/fail test; asking who is the responsible economic operator, which battery category applies, where the QR code resolves and whether its records match the finished model produces auditable evidence. The Commission’s August 2026 data-point guidance is useful for preparing covered passport categories, but it expressly says it does not add legal requirements or provide an authoritative interpretation. The Regulation and later applicable acts remain controlling.'
            ]
          }
        ],
        checklist: [
          'Exact finished-product and battery-pack model, with no omitted suffixes',
          'Battery weight, rated capacity and watt-hour calculation',
          'Intended-use evidence supporting portable, industrial, LMT or EV classification',
          'Name and role of the economic operator placing the finished battery on the EU market',
          'QR-code destination checked on the physical sample and current packaging artwork',
          'Information behind the code matched to the exact model and applicable category',
          'EU Declaration of Conformity and supporting technical file reviewed separately',
          'Change control for cells, pack design, firmware, label and economic operator'
        ],
        limitsText: 'The EU Battery Regulation applies broadly to batteries, while the Article 77 passport duty covers only the listed categories and threshold. The ordinary-power-bank classification above is a reasoned reading of the legal definitions based on typical characteristics; a product name, nominal capacity or this article cannot classify an unusual model. A QR code does not by itself prove that the linked data are accurate, that the responsible operator has completed every obligation, or that production units match the reviewed sample. Battery passport, QR-code information, CE conformity, transport testing, electrical safety, producer registration, waste duties and shipment quality remain distinct evidence questions. Later delegated or implementing acts and official guidance may refine operational details before or after 18 February 2027.'
      },
      euCustomsReformEcommerceParcels: {
        topic: 'EU customs and e-commerce news',
        published: '9 September 2026',
        readTime: '7 minutes',
        title: 'EU customs reform clears the Council: platforms and low-value parcels face a new import regime',
        description: 'The Council has backed a sweeping customs overhaul that shifts importer duties toward non-EU e-commerce platforms and adds a handling fee. The amount and final parliamentary step are still pending.',
        imageAlt: 'Warehouse worker inspecting parcels on storage shelves, used as an editorial photograph for EU e-commerce customs reform.',
        imageCaption: 'Editorial photograph of a warehouse worker inspecting parcels. It is not an EU customs inspection, a ZIMONAI site, client shipment, supplier facility or evidence about any named platform.',
        labels: {
          summary: 'News summary',
          checklist: 'What to watch next',
          limits: 'What remains unsettled'
        },
        answer: 'On 3 September, the Council of the EU backed a major customs overhaul that would make non-EU e-commerce platforms importers and add an EU handling fee for small parcels. For China-direct chargers and power banks, this matters because landed cost, product identifiers and compliance data move closer to the sales channel instead of the final consumer. Parliament must still approve the text, publication must follow, and the fee amount is not yet set. ZIMONAI’s editorial view: the stronger channel will be the one that can carry accurate SKU, customs and product-safety data at scale—not simply ship the cheapest single parcel.',
        takeaways: [
          'The Council’s 3 September approval would treat non-EU platforms selling into the EU as importers responsible for customs formalities, duty payments and compliance obligations; Parliament’s final approval and publication still have to follow.',
          'The new handling fee is separate from the temporary €3 customs duty already applied since 1 July 2026 to low-value distance-sale consignments. The Commission had not announced the handling-fee amount when the Council vote was published.',
          'For chargers and power banks shipped directly from China, model-level product identifiers, tariff classification, EU product records and returns logistics become part of channel economics—not paperwork to assemble after a parcel is stopped.'
        ],
        sections: [
          {
            title: 'What did the Council approve on 3 September?',
            paragraphs: [
              'The Council gave its final approval to its position on a new Union Customs Code and a European Union Customs Authority. The package is designed around a central customs data hub, shared risk analysis and a new “Trust and Check” route for the most transparent traders. The Council says the authority will be based in Lille and begin operating in 2027; e-commerce use of the data hub is scheduled to become mandatory on 1 July 2028, with other traders following later.',
              'For online retail, the headline shift is responsibility. The Council’s release says non-EU e-commerce platforms selling goods into the EU will be considered the importer, rather than leaving the final consumer to handle customs obligations. Operators that repeatedly fail to meet customs and EU-standard obligations could face escalating sanctions, including fines of up to 6% of annual EU import value in the most serious cases, loss of customs privileges and possible platform-access restrictions.'
            ]
          },
          {
            title: 'Which costs and data rules are already in force—and which are still coming?',
            paragraphs: [
              'Three measures are easy to confuse. First, a temporary €3 customs duty has applied since 1 July 2026 to goods in qualifying distance-sale consignments worth up to €150; the Commission explains that it is calculated by tariff-classification item, not simply by parcel count. Second, product identifiers become mandatory from 1 November 2026 to improve traceability and safety screening. Third, the reform creates a separate Union handling fee for small parcels to fund customs processing.',
              'The Council says member states will introduce that handling fee by 1 November, but the Commission will set its level. That means any article or quotation presenting the amount as final before the delegated act is published is getting ahead of the evidence. The wider customs reform also still needs the European Parliament’s expected approval, signature and publication in the Official Journal. Today’s operational rules and the future code should therefore be tracked on separate timelines.'
            ],
            items: [
              'In force since 1 July 2026: temporary €3 duty for covered low-value distance-sale goods.',
              'From 1 November 2026: mandatory product identifiers under the Commission’s implementation guidance.',
              'By 1 November 2026: a separate Union handling fee, with its amount still to be set by the Commission.',
              'Next legislative step: European Parliament approval, followed by signature and Official Journal publication.'
            ]
          },
          {
            title: 'Why does this matter for China-direct chargers and power banks?',
            paragraphs: [
              'A charger or power bank sold one unit at a time from China already carries product-specific questions—tariff code, exact model, EU economic operator, declarations, battery transport records, warnings and recall traceability. When the platform or its representative is treated as importer and customs systems require structured identifiers, mismatched product names and incomplete SKU files become a clearance, enforcement and cost problem for the channel itself. This does not make a platform the manufacturer, but it raises the price of accepting untraceable catalogue data.',
              'ZIMONAI’s editorial assessment is that the reform favours operators that can preserve one product identity from supplier quotation to listing, parcel declaration and post-market action. Direct shipping may remain viable for some products, while EU inventory and consolidated import may make more sense for others; the official texts do not decide that business model. The useful comparison is total landed cost plus data, compliance and return capacity—not the freight quote alone.'
            ]
          }
        ],
        checklist: [
          'European Parliament vote, final signed text and Official Journal publication',
          'Commission delegated act setting the Union handling-fee amount and collection design',
          'Exact 1 November product-identifier fields required by the chosen declaration route',
          'Named importer or indirect representative for each e-commerce channel',
          'SKU-level tariff code, model identity, EU compliance file and battery-shipping records',
          'Direct-from-China parcel cost compared with consolidated EU import, inventory and returns',
          'Platform onboarding, listing or fulfilment changes introduced before the 2028 data-hub phase'
        ],
        limitsText: 'As of 9 September 2026, the Council had approved its position, while the European Parliament’s final vote, signature and Official Journal publication were still pending. The Commission had not yet set the Union handling-fee amount. Application dates differ across the temporary duty, product identifiers, handling fee, platform obligations and data hub, and later legal text or guidance may refine them. The reform applies to e-commerce generally and does not prove that a particular charger, power bank, Chinese supplier or platform is compliant or non-compliant. The channel and sourcing implications above are ZIMONAI editorial analysis, not a forecast issued by the Council, Commission, Parliament or BEUC.'
      },
      euCommonChargerRules: {
        topic: 'EU common-charger market access',
        published: '8 September 2026',
        readTime: '7 minutes',
        title: 'EU common-charger rules: separate the USB-C device, charger and 2028 requirements',
        description: 'The EU common-charger rules already cover listed wired-charging devices, including laptops. Charger-side ecodesign requirements follow in 2028, so buyers need two distinct evidence sets.',
        imageAlt: 'USB-C connector and cable beside an adapter on a marble surface, used as an editorial illustration for EU common-charger checks.',
        imageCaption: 'Editorial photograph of a USB-C cable and adapter. It is not a ZIMONAI supplier, client, charger test, factory, certification file or proof of EU conformity.',
        answer: 'EU common-charger rules set USB-C, USB Power Delivery, separate-sale and consumer-information duties for listed wired-charging devices; laptops joined on 28 April 2026. This does not make “USB-C” a complete charger-compliance claim: device-side RED evidence, package contents and charging data remain separate from the external power supply’s safety, EMC, energy and future 2028 ecodesign file. Buyers should match exact device, charger and cable models to power ranges, USB PD, packaging symbols and the EU Declaration of Conformity. ZIMONAI’s editorial view is that the sourcing risk is collapsing device rules, charger rules and future requirements into one unsupported claim.',
        takeaways: [
          'Since 28 April 2026, the current common-charger requirements cover laptops as well as the twelve portable-device categories already covered since 28 December 2024, where those products support wired charging.',
          'Covered devices use a USB Type-C receptacle; when wired charging exceeds 5 V, 3 A or 15 W, USB Power Delivery is required and an additional protocol must not block full USB PD functionality.',
          'The charger-side Ecodesign Regulation (EU) 2025/2052 applies from 14 December 2028. Its USB-C ports, detachable cables, power markings and common-charger logo should be planned now but not misrepresented as already mandatory in 2026.'
        ],
        sections: [
          {
            title: 'What is already required in the EU in 2026?',
            paragraphs: [
              'The European Commission lists twelve portable-device categories under the common-charging solution from 28 December 2024: handheld mobile phones, tablets, digital cameras, headphones, headsets, portable speakers, handheld videogame consoles, e-readers, earbuds, keyboards, mice and portable navigation systems. Laptops entered the same framework on 28 April 2026. Directive (EU) 2022/2380 applies these requirements to covered radio equipment in so far as it can be recharged by wired charging; it is not a rule that every electrical product must have USB-C.',
              'For a covered device, Annex Ia requires an accessible and operational USB Type-C receptacle and compatible USB-C cables. If the device can charge above 5 V, 3 A or 15 W, it must incorporate USB Power Delivery. Producers and sellers must also provide the opportunity to buy the equipment without a charging device, show whether one is included and display the minimum and maximum charging power and compatible fast-charging protocol. The Commission’s 2026 report describes these as five connected requirements, not as a single port-shape test.'
            ]
          },
          {
            title: 'Which evidence should match the device and the charger?',
            paragraphs: [
              'Start with the exact radio-equipment model and its charging architecture. The packaging, online offer and instructions should consistently show whether a charging device is included, the minimum power needed to start charging, the maximum power needed for full charging speed and “USB PD” where applicable. Compare those values with the supplied or recommended external power supply, its single-port and shared-port behaviour, the cable rating and the product actually quoted.',
              'The Common Charger Directive sits inside the Radio Equipment Directive conformity route. Buyers should therefore connect the charging claims to the manufacturer’s EU Declaration of Conformity and technical file for the exact device, while keeping the external power supply’s own safety, EMC, substance, energy-efficiency and market-access records as a separate set. ZIMONAI’s practical reading is to reject one-page statements that name neither the device model nor the charger model: interoperability is a relationship between two defined products, not a property established by the words “USB-C”.'
            ],
            items: [
              'Covered device category and the date the requirement became applicable',
              'Exact device and external-power-supply model numbers',
              'Minimum and maximum charging power shown on the consumer label',
              'USB PD support and any additional proprietary protocol',
              'Included/not-included pictogram across packaging and online sales',
              'EU Declaration of Conformity and supporting technical evidence for the device',
              'Separate safety, EMC, ecodesign and other evidence for the charger'
            ]
          },
          {
            title: 'What changes for external power supplies in 2028?',
            paragraphs: [
              'The European Commission explains that Regulation (EU) 2025/2052 will apply from 14 December 2028 to external power supplies, chargers for portable batteries of general use, wireless chargers or pads and USB Type-C cables, subject to its scope and exemptions. Covered external power supplies will by default need to meet the common-charger design, interoperability, information and energy-performance requirements, including at least one USB Type-C or USB PD port, detachable USB-C cables, port power marking and the new common-charger logo.',
              'This future date changes product planning, not the legal status of a September 2026 shipment. A long-running OEM programme should already map its enclosure, ports, cable, firmware, label and test plan to the 2028 regulation, especially if the model will remain on sale after the application date. The present purchase decision must still be judged under the rules in force when the product is placed on the EU market, with later requirements recorded as a controlled redesign milestone rather than backdated as current certification.'
            ]
          }
        ],
        checklist: [
          'Identify the covered device category and applicable date',
          'Record exact device, charger and cable models without shortening suffixes',
          'Match USB-C receptacle, minimum and maximum power and USB PD claims',
          'Check the included/not-included pictogram and charging label in every sales format',
          'Review the device’s EU Declaration of Conformity and charging evidence',
          'Review the external power supply’s safety, EMC, ecodesign and substance evidence separately',
          'Test interoperability with the actual charger, cable and relevant port combinations',
          'Create a dated 2028 transition plan for products that will remain on the EU market'
        ],
        limitsText: 'The common-charger rules address specified radio equipment, charging interfaces, protocols, sales choices and consumer information, and the 2028 ecodesign rules add a separate framework for covered external power supplies and cables. They do not prove that a Chinese seller owns the factory, that every USB-C product is within scope, that the quoted charger is electrically safe, or that production units match the reviewed configuration. USB-IF certification, CE conformity, chemical compliance, energy performance, product safety and shipment quality each require evidence appropriate to the exact product. Commission guidance supports consistent interpretation but is not a product approval, and the European Court of Justice retains authority over binding interpretation of EU law.'
      },
      chinaCccCharger: {
        topic: 'China charger market access',
        published: '6 September 2026',
        readTime: '7 minutes',
        title: 'Does a CCC certificate prove a Chinese charger is approved for every market?',
        description: 'CCC can support a listed charger or power adapter for China. Buyers still need to match the certificate, model, manufacturer and factory—and check each export market separately.',
        imageAlt: 'White two-pin power adapter on a marble surface, used as an editorial illustration for China CCC certificate checks.',
        imageCaption: 'Editorial photograph of a power adapter. It is not a ZIMONAI supplier, client, factory, certificate, test sample or market-approval record.',
        answer: 'A valid China Compulsory Certification (CCC) certificate can support the listed charger or power adapter for the Chinese market when its holder, manufacturer, production factory, model, ratings and current status match the product. It is not a universal export approval: CE, UKCA, UL or other destination-market requirements must be assessed separately. For overseas buyers, ZIMONAI’s editorial view is therefore two-part—CCC can be strong evidence about one defined China-market certification scope, while the quotation still needs an exact model relationship, current production consistency and a separate market-access file for every sales destination.',
        takeaways: [
          'CNCA’s August 2026 catalogue still lists power supplies under product codes 0807 and 0907, with electronic products and safety accessories governed by CNCA-C09-01:2023.',
          'The certificate check should cover the applicant, manufacturer, production factory, product name, complete model or series, certification basis, issuing body, dates and live status.',
          'A shared enclosure, CCC mark or certificate for one model does not automatically cover another wattage, circuit, safety structure, factory or export market.'
        ],
        sections: [
          {
            title: 'Which chargers and power adapters fall within the CCC route?',
            paragraphs: [
              'CNCA’s current implementation-rule index, updated in August 2026, lists “power supplies” under catalogue codes 0807 and 0907 in the electronic-products and safety-accessories category. The controlling rule is CNCA-C09-01:2023, effective from 1 August 2023. It applies only to products that fall within the compulsory-certification catalogue; the exact product function and scope must be checked before treating every device sold as a “charger” as equivalent.',
              'For products within scope, China’s CCC rules concern permission to leave the factory, be sold, imported or used in commercial activities in China. That market boundary matters. A supplier can hold a genuine CCC certificate for a China-market adapter and still need different conformity work for the European Union, United Kingdom, United States or another destination.'
            ]
          },
          {
            title: 'What must match between the certificate and the quoted charger?',
            paragraphs: [
              'The CCC administration provisions require certificates to identify the applicant, manufacturer, production enterprise where needed, product name and model or series, certification basis, dates, issuing body and certificate number. CNCA-C09-01:2023 adds a product-specific boundary: power supplies are divided into certification units by circuit principle and safety structure, and type-test reports must describe all products in the certification unit.',
              'Place the live certificate result beside the quotation, label, sample and factory documents. Compare the full model suffix, input and output ratings, port configuration, applicant, manufacturer and production site. CNCA’s 2025 disclosure notice requires certification bodies to publish certificate states—including valid, suspended, cancelled or withdrawn—and provide a way for the public to check validity. A PDF with an unexpired date is therefore not enough when the live status or exact product relationship differs.'
            ],
            items: [
              'Certificate number, issuing body, issue date, expiry date and current status',
              'Applicant, manufacturer and production factory with their written relationships',
              'Exact product name, model or series and every suffix used on the quotation',
              'Input/output ratings, wattage, ports, plug and safety structure',
              'Applicable rule and standards shown for the certification unit',
              'Label and CCC mark information matched to the physical sample'
            ]
          },
          {
            title: 'What happens when the factory, circuit or key components change?',
            paragraphs: [
              'CNCA-C09-01:2023 requires certified products to remain consistent with the type-tested sample and provides post-certification surveillance. Changes to key components, materials, safety design or electrical structure must be submitted for approval or filing before implementation; expanding the covered products also requires the certification body to evaluate the differences and add testing or factory checks where necessary.',
              'ZIMONAI’s practical reading is that a CCC certificate is most valuable when it can be joined to current production evidence. Buyers should connect the certified model to the present bill of materials, key-component list, factory address, change approvals and shipment specification. This does not turn CCC into a global approval or a guarantee of every unit, but it prevents a genuine certificate from being stretched across an unrelated model, factory or market.'
            ]
          }
        ],
        checklist: [
          'Confirm whether the exact product function falls within the current CCC catalogue',
          'Retrieve the current certificate status from the issuing body’s public query route',
          'Match applicant, manufacturer and production factory to the supplier’s documents',
          'Match the full model, ratings, plug, ports and safety structure to the sample',
          'Review key-component, material and electrical-structure change approvals',
          'Keep destination-market approvals and declarations in a separate evidence set',
          'Use production and shipment checks to verify the ordered configuration'
        ],
        limitsText: 'A CCC certificate addresses the product, certification unit, standards, parties and Chinese-market scope represented by that certificate. It does not prove that the seller owns the factory, that every product from the company is certified, that every shipment matches the type-tested sample, or that the charger meets requirements in the EU, UK, US or another export market. It also does not replace commercial due diligence, performance testing, chemical compliance, transport documentation or order-specific quality controls. When the current status, factory, model or configuration cannot be matched, keep the claim unresolved and confirm it with the issuing certification body.'
      },
      belkinUltraChargeProBoostSolid: {
        topic: 'IFA 2026 battery technology news',
        published: '7 September 2026',
        readTime: '6 minutes',
        title: 'Belkin brings semi-solid-state cells to two UltraCharge Pro power banks at IFA 2026',
        description: 'Belkin has launched a slim magnetic 5K model and a 60W 10K model around its new BoostSolid cell. The real story is a shift from headline wattage to size, cycle life and thermal design.',
        imageAlt: 'Belkin UltraCharge Pro 5K magnetic and 10K display power banks charging a smartphone and laptop.',
        imageCaption: 'Official Belkin media image supplied with its IFA 2026 press release. It shows the announced UltraCharge Pro BoostSolid products and is not ZIMONAI testing, sponsored content, a supplier site or a client project.',
        labels: {
          summary: 'News summary',
          checklist: 'What to watch next',
          limits: 'What remains unknown'
        },
        answer: 'Belkin introduced two UltraCharge Pro power banks with BoostSolid semi-solid-state cells at IFA 2026: an 8.8 mm magnetic 5K model with 15W Qi2 charging and a 10K model with up to 60W USB-C output and a status display. Belkin says the cells retain up to 80% capacity after 1,000 cycles; TechRadar’s early hands-on confirms the unusually slim finished hardware, but not the long-term endurance or safety claims. The launch places cell chemistry, cycle-life evidence and thermal design at the centre of power-bank competition for manufacturers and buyers, moving the category beyond capacity and wattage alone.',
        takeaways: [
          'The 5K model combines an 8.8 mm body, 15W Qi2 magnetic charging and up to 22.5W USB-C output; the 10K model adds up to 60W USB-C, three output ports and a screen for power, battery and temperature information.',
          'Belkin states that BoostSolid retains up to 80% capacity after 1,000 cycles. That is a defined company claim, not yet an independently reproduced five-year durability result.',
          'For the wider power-bank market, the competitive story is moving beyond higher wattage toward cell chemistry, pack volume, thermal controls, cycle-life evidence and clearer status information.'
        ],
        sections: [
          {
            title: 'What exactly did Belkin launch at IFA 2026?',
            paragraphs: [
              'Belkin announced the UltraCharge Pro Slim Magnetic Power Bank 5K and UltraCharge Pro Power Bank 10K with BoostSolid Cell on 3 September. The 5K model is 8.8 mm thick, supports 15W Qi2 magnetic wireless charging and up to 22.5W wired output, and was announced at US$69.99. The 10K model supplies up to 60W from one USB-C port, includes two USB-C ports and one USB-A port, and uses a display to show battery status, output and thermal information; its announced US price is US$89.99.',
              'These are two different product propositions rather than a capacity-only choice. The 5K is designed around thin, phone-attached use, while the 10K aims at wired charging for phones, tablets and some laptops. Belkin’s official release says both were available to order from its US site, with black and sand finishes. Market availability and prices outside the announced regions should be checked separately.'
            ]
          },
          {
            title: 'Why is the semi-solid-state cell the important part of the story?',
            paragraphs: [
              'Belkin describes BoostSolid as a semi-solid architecture that adds a gel-like layer alongside liquid electrolyte. The company links that design to slimmer packs, greater thermal stability and slower degradation. Its stated comparison is specific: up to 80% capacity after 1,000 full charge cycles, with the “five-year” wording based on one full charge and discharge every two days. Belkin also says the 5K is 40% slimmer than its previous-generation comparable products and the 10K is 27% smaller than a standard 45W 10K power bank.',
              'The qualifiers matter. Those percentages use Belkin-selected comparison baselines, and the cycle-life and safety statements come from the manufacturer. TechRadar’s IFA hands-on independently supports that both units existed as finished, notably slim products and found their construction impressive, but it did not reproduce 1,000 charge cycles or publish abuse, temperature or capacity-retention testing. The news is a commercial product launch; it is not independent validation of every performance claim.'
            ],
            items: [
              'Company claim: up to 80% capacity after 1,000 cycles.',
              'Independent observation: the products were shown at IFA and the 5K was notably slim.',
              'Still untested publicly: long-run degradation, high-temperature output, swelling resistance and lot-to-lot consistency.'
            ]
          },
          {
            title: 'What could this change for the power-bank supply chain?',
            paragraphs: [
              'ZIMONAI’s editorial view is that the launch makes cell choice part of the consumer-facing product story. A supplier quotation for a similar “semi-solid” power bank will need more than the chemistry label: buyers will want the exact cell model, nominal and rated capacity, cycle-test method, temperature conditions, protection design, pack dimensions and change-control rules connected to the finished SKU. Otherwise, a familiar phrase can conceal very different cell formulations and evidence quality.',
              'It also changes where product value can be created. If manufacturers can deliver a thinner pack without sacrificing usable capacity or thermal margins, enclosure design and portability become stronger selling points; if the cycle-life claim holds in independent testing, replacement frequency becomes part of the commercial calculation. The next signal will not be another launch slide. It will be repeatable testing, teardown evidence and whether other major brands begin specifying comparable cell and cycle-life data.'
            ]
          }
        ],
        checklist: [
          'Independent capacity-retention results after hundreds of full cycles',
          'Charging speed and surface temperature under sustained 60W use',
          'Nominal versus rated output capacity for each finished model',
          'Cell model, supplier, protection design and pack change-control records',
          'Regional availability, warranty terms and final retail pricing',
          'Whether competing brands publish comparable semi-solid cell evidence'
        ],
        limitsText: 'As of 7 September 2026, Belkin has published specifications, comparison methods, prices and availability for the announced models, and TechRadar has reported an early hands-on at IFA. No independent source cited here has completed 1,000-cycle ageing, destructive safety tests, sustained-temperature measurements or production-lot comparisons. “Semi-solid-state” does not by itself establish a single industry-wide formulation or prove that every product using the term will perform alike. Supply-chain implications in this article are ZIMONAI editorial analysis, not findings issued by Belkin, TechRadar or a regulator.'
      },
      xoPoppyPowerBankRecall: {
        topic: 'North America power-bank recall',
        published: '5 September 2026',
        readTime: '7 minutes',
        title: 'XO Poppy magnetic power banks recalled in the US and Canada: why the model lists differ',
        description: 'US regulators recalled about 32,400 units days after a Canadian notice covering 30,000. The brand is the same, but the model codes, sales channels and refund routes are not.',
        imageAlt: 'Three XO Poppy magnetic power banks and their packaging model labels from the US recall notice.',
        imageCaption: 'Three product photographs from the US CPSC recall notice, arranged together for editorial display. They show the US-listed cream, bow-print and teddy-bear-print variants—not the full Canadian model list. This is not ZIMONAI testing or sponsored content.',
        labels: {
          summary: 'News summary',
          checklist: 'What buyers should check now',
          limits: 'What remains unknown'
        },
        answer: 'Two North American notices cover XO Poppy power banks: the US CPSC announced about 32,400 units on 3 September, after Health Canada recalled 30,000 related models on 26 August. The bigger story is the scope gap—the US lists three retail variants, Canada 30 model codes and a different refund route. For buyers and retailers, market-by-market SKU mapping, battery/BOM traceability and recall logistics are frontline requirements; a shared brand name is not a recall identifier. Both authorities cite overheating and fire hazards and reported no incidents or injuries at publication, but neither identifies the root cause, cell supplier, production lots or common internal design.',
        takeaways: [
          'The US CPSC notice covers about 32,400 XO Poppy Power Trip units sold at TJX and Marshalls; Health Canada separately reports 30,000 related 5,000 mAh power banks sold through HomeSense, Winners and Marshalls.',
          'The US notice lists three packaging variants, while Canada lists 30 model codes. Buyers need the full market SKU and packaging identifier, not just the XO Poppy name or a similar appearance.',
          'Neither regulator published a root-cause analysis. The responsible next step is to isolate affected finished-goods records and preserve cell, PCBA, connector, firmware and production-lot evidence without assigning blame to an unnamed supplier.'
        ],
        sections: [
          {
            title: 'What exactly was recalled in the United States and Canada?',
            paragraphs: [
              'The US Consumer Product Safety Commission announced recall 26-740 on 3 September 2026. It covers XO Poppy Power Trip Magnetic Wireless Power Banks under model PYPBK5M in three variants: cream (PY-PBK5M-CR2), cream with a pink bow print (PY-PBK5M-BW8), and black with a teddy-bear print (PY-PBK5M-TB2). CPSC says about 32,400 units were sold for roughly US$15 at TJX and Marshalls stores nationwide from April 2025 through March 2026. Truststone Group LLC is named as the importer, and Vietnam as the country of manufacture.',
              'Health Canada published its related notice on 26 August. It covers 30,000 XO Poppy 5,000 mAh MagSafe-compatible power banks sold from May 2024 through March 2026 through HomeSense, Winners and Marshalls. The Canadian list contains 30 model codes, including PY-PBK5M-BW8 but many variants that do not appear in the US notice. Both notices reported no incidents or injuries at the stated cut-off dates.'
            ]
          },
          {
            title: 'Why are the model lists and consumer instructions different?',
            paragraphs: [
              'A recall is defined by the authority, market, distribution records and product identifiers in that specific notice. The US action tells consumers to stop using the product and contact Truststone Group for a refund issued as a virtual gift card. CPSC also warns that recalled lithium-ion products should not enter household rubbish, ordinary recycling or retail battery boxes; consumers should first ask a local household hazardous-waste facility whether it accepts recalled lithium batteries.',
              'Canada directs consumers to stop using the units and return them to HomeSense, Winners or Marshalls for a refund, and notes that recalled products cannot be redistributed, sold or given away in Canada. These differences are operational, not cosmetic. A global seller that collapses both notices into one brand-level spreadsheet could miss Canadian variants, send US customers to the wrong remedy channel or apply one country’s disposal instructions in another.'
            ],
            items: [
              'US scope: PYPBK5M with three named packaging variants and about 32,400 units.',
              'Canadian scope: 30 listed model codes and 30,000 reported units.',
              'One overlapping code does not establish that every listed variant shares the same internal bill of materials.',
              'Country-specific sales and remedy records should remain linked to the exact notice that created them.'
            ]
          },
          {
            title: 'What does this recall reveal about power-bank traceability?',
            paragraphs: [
              'The public notices identify the retail products well enough for consumers to act, but they do not disclose the cell manufacturer, PCBA revision, connector supplier, production dates, lot boundaries or technical failure analysis. A buyer investigating its own assortment therefore needs an internal bridge from market SKU and packaging code to the finished-goods record, bill-of-materials revision, battery-cell lot and shipment history. That bridge is what makes a targeted stop-ship and customer notification possible.',
              'ZIMONAI’s editorial assessment is that cross-market recall readiness should be designed before a product ships, not improvised after a notice appears. Brand owners and importers should be able to freeze affected inventory, identify customers by destination market, preserve samples and change records, and operate the correct refund and reverse-logistics route for each jurisdiction. This event does not prove a defect in every XO Poppy product or identify which supplier caused the hazard; it shows why precise product identity and response records matter when the public name stays the same.'
            ]
          }
        ],
        checklist: [
          'Exact market SKU, packaging code, colour or print variant and sales country',
          'Finished-goods lot, production date, purchase order and shipment destinations',
          'Battery-cell maker and lot, PCBA revision, connector specification and protection settings',
          'Change approvals covering cells, ports, housings, firmware and secondary suppliers',
          'Stop-ship, retailer notification, refund and country-specific disposal workflow',
          'Retained samples, incident records and an owner for regulator and customer follow-up'
        ],
        limitsText: 'As of 5 September 2026, the CPSC and Health Canada notices did not publish a technical root cause, cell supplier, production-lot range, laboratory report or a complete mapping between the US and Canadian variants. They also do not establish that every XO Poppy power bank is affected, that all listed units share an identical internal design, or that manufacture in Vietnam caused the hazard. The traceability and recall-readiness observations above are ZIMONAI’s editorial analysis; the affected products, consumer actions and legal requirements must be taken from the notice for the relevant market.'
      },
      ankerMagGo2Pro: {
        topic: 'IFA 2026 product news',
        published: '3 September 2026',
        readTime: '6 minutes',
        title: 'Anker launches MagGo Power Bank 2 Pro with Qi2 25W and active cooling at IFA 2026',
        description: 'Anker’s new 10,000 mAh magnetic power bank adds a fan, dual air ducts, a smart display and a stand. Here is what is confirmed, why the design matters and what remains to be seen.',
        imageAlt: 'An Anker MagGo Power Bank 2 Pro attached to a smartphone at a live event.',
        imageCaption: 'Official Anker MagGo Power Bank 2 Pro media image supplied in Anker Innovations’ IFA 2026 press kit. It is not ZIMONAI photography, testing or sponsored content.',
        labels: {
          summary: 'In brief',
          checklist: 'What to watch next',
          limits: 'What is still unconfirmed'
        },
        answer: 'Anker unveiled the MagGo Power Bank 2 Pro at IFA 2026, combining a 10,000 mAh battery with Qi2.2 magnetic charging at up to 25 W, active cooling, a smart display and an adjustable stand. Anker says the product will launch in the United States on 17 September for US$109.99 in three colours. The bigger story is not another rise in wattage: it is the move toward thermal management and visible charging data in a category that has usually been sold on capacity and speed alone.',
        takeaways: [
          'The announced package includes Qi2.2 25 W wireless output, 45 W recharging, a 10,000 mAh battery, active cooling, a display and a built-in stand.',
          'The WPC database separately lists model A110R as Qi-24417 with the MPP25 power profile, giving the launch an independently checkable certification record.',
          'Active cooling is the important product signal: charging brands are starting to compete on sustained performance, temperature control and user-visible data—not only headline wattage.'
        ],
        sections: [
          {
            title: 'What did Anker announce at IFA 2026?',
            paragraphs: [
              'At its 3 September IFA press conference in Berlin, Anker introduced six charging products built around device recognition, heat management and on-device displays. The MagGo Power Bank 2 Pro is the portable model in that lineup: a 10,000 mAh magnetic battery with up to 25 W Qi2.2 wireless charging, 45 W wired recharging, a screen that shows power, temperature and remaining time, and an adjustable stand.',
              'Anker’s official release lists a US launch date of 17 September, a price of US$109.99 and three finishes: Phantom Gray, Starlight Silver and Polar Night Blue. Those details are market-specific; pricing and availability elsewhere may differ and had not all been published when this article was checked.'
            ]
          },
          {
            title: 'Why is the built-in fan the real story?',
            paragraphs: [
              'Wireless charging loses part of its energy as heat, and phones can reduce charging power when temperature rises. Anker is trying to make thermal control a visible feature rather than an invisible engineering detail: it describes a fan-control algorithm, dual air ducts and a graphene heat-spreading structure, while the side display shows live temperature and charging information.',
              'That makes the product more interesting than a simple “25 W” label. If active cooling can keep charging speed steadier without becoming noisy or fragile, it gives premium power banks a new way to differentiate. The trade-off is added complexity: a fan, air path, sensors and control logic introduce questions about dust, blocked vents, acoustics, power consumption and long-term reliability.'
            ],
            items: [
              'Can the fan sustain 25 W charging without distracting noise?',
              'How does performance change when the vents are partly blocked or dusty?',
              'Does the extra cooling hardware materially affect weight, battery life or durability?',
              'Will competing brands adopt similar cooling and display designs?'
            ]
          },
          {
            title: 'What does the independent record confirm—and what comes next?',
            paragraphs: [
              'The Wireless Power Consortium gives this launch a useful independent reference point. Its database lists “Anker MagGo Power Bank 2 Pro,” part number A110R, under Qi ID 24417 with Qi version 2.2.1, the MPP25 profile, potential load power of 25.0 W and a certification date of 21 August 2026. That confirms the registration fields for this exact product; it does not independently test every speed, temperature or durability claim in Anker’s marketing.',
              'After launch, the most useful evidence will come from retail availability and repeatable independent testing: sustained charging curves, surface temperature, fan noise, behaviour in warm rooms and long-term wear. For the wider market, the question is whether active cooling becomes a durable category feature or remains a premium niche. For manufacturers and buyers, it also raises a practical issue: adding cooling hardware can create new sourcing, assembly and quality-control work even when the wireless-charging standard is already established.'
            ]
          }
        ],
        checklist: [
          'Actual launch dates and pricing outside the United States',
          'Independent charging-speed and temperature tests under the same conditions',
          'Fan noise, blocked-vent behaviour and long-term reliability',
          'Real-world weight, pocketability and stand stability',
          'Whether firmware or hardware revisions change performance after launch',
          'How quickly other charging brands follow with actively cooled designs'
        ],
        limitsText: 'As of 3 September 2026, Anker had published the US price, colour options and launch timing, and the WPC record confirmed the Qi registration fields for A110R. Independent reviews had not yet established sustained charging speed, real-world temperature, fan noise, battery endurance or long-term durability. Availability and pricing in every market were also not fully confirmed. The comments on category direction and manufacturing complexity are ZIMONAI’s analysis, not statements issued by Anker, WPC or a regulator.'
      },
      reachSvhcDeclaration: {
        topic: 'EU chemical-information evidence',
        published: '4 September 2026',
        readTime: '7 minutes',
        title: 'Does a supplier REACH/SVHC declaration prove this charger meets EU requirements?',
        description: 'A declaration can support a named model, bill of materials and Candidate List reference date. It is not an ECHA approval and cannot cover an unidentified product or later material change.',
        imageAlt: 'Electronic components on a small circuit board, used as an editorial illustration for REACH and SVHC evidence checks.',
        imageCaption: 'Editorial photograph of electronic components. It is not a ZIMONAI supplier, client, charger, factory, audit sample, laboratory result or compliance record.',
        answer: 'A supplier REACH/SVHC declaration can map a named charger to a bill-of-materials revision, Candidate List reference date and constituent-article assessment, including the 0.1% w/w threshold used for Article 33 information duties. Overseas buyers should connect that dated basis to the exact model, components and responsible EU actor, because a generic “REACH compliant” letter is not ECHA approval and does not cover later substitutions, SCIP duties or every other REACH rule. ZIMONAI’s editorial view is that the declaration works best as the entry point to a traceable material-evidence chain, not as the final compliance verdict.',
        takeaways: [
          'Check the declaration’s product identity, legal issuer, bill-of-materials revision and Candidate List reference date before reading its conclusion.',
          'For a complex charger, the 0.1% w/w threshold applies to each constituent object that remains an article—not only to the finished charger’s total mass.',
          'Separate three questions: Article 33 communication, any SCIP duty for the EU market actor, and other REACH restrictions or authorisation issues. One supplier sentence does not resolve all three.'
        ],
        sections: [
          {
            title: 'What does REACH Article 33 actually require?',
            paragraphs: [
              'ECHA states that an EU or EEA supplier of an article containing a Candidate List substance above 0.1% w/w must give professional recipients enough available information for safe use, including at least the substance name. A consumer can request similar information, which must be supplied free of charge within 45 days. These duties arise from the substance’s inclusion in the Candidate List; they are not created by a private test-report format or an ECHA product approval.',
              'A Chinese exporter may provide the upstream data needed for this assessment, but the official ECHA summary assigns the market-facing duties to EU or EEA producers, importers and suppliers according to their role. A buyer should therefore ask who will place the charger on the EU market and who has reviewed the product information, rather than treating the exporter’s letter as the end of the compliance chain.'
            ]
          },
          {
            title: 'Why can a one-page “REACH compliant” statement be too broad?',
            paragraphs: [
              'The Court of Justice of the European Union held in Case C-106/14 that the 0.1% threshold applies to each article incorporated as a component of a complex product. ECHA’s guidance follows the same “once an article, always an article” approach. For a charger, the relevant evidence may therefore need to follow constituent articles such as a cable, enclosure part or connector; dividing one substance amount by the mass of the complete product can hide a component-level result above the threshold.',
              'The Candidate List can change, and a charger bill of materials can change. A useful declaration should therefore state the exact model and variant, covered production or bill-of-materials revision, issuer and date, Candidate List cut-off date, substance identifiers or screening basis, threshold used and any exclusions. A genuine declaration for an older configuration does not automatically cover a new plastic, cable, solder, adhesive, connector or sub-supplier.'
            ],
            items: [
              'Exact model, electrical variant and included cable or accessory',
              'Manufacturer or supplier legal name and authorised signatory',
              'Bill-of-materials or material-list revision and issue date',
              'Candidate List version or explicit reference date',
              '0.1% w/w assessment at constituent-article level',
              'Named SVHCs and safe-use information when the threshold is exceeded'
            ]
          },
          {
            title: 'How should a buyer test the declaration before relying on it?',
            paragraphs: [
              'ZIMONAI’s practical method is to build a component-to-evidence matrix. Start with the quoted model and current bill of materials; identify higher-risk plastics, cable assemblies, connectors, coatings, solder and other constituent articles; then link each row to a supplier material declaration, test evidence or documented assessment. Record gaps instead of converting missing information into an assumed pass.',
              'If an SVHC is reported above 0.1% w/w, obtain the substance name and sufficient safe-use information, then ask the responsible EU actor to confirm its Article 33 communication and whether a SCIP submission is required. If the supplier reports no Candidate List substance above the threshold, retain the dated basis and change-control link. This strengthens traceability, but it remains a sampled documentary assessment rather than proof of every unit or every REACH rule.'
            ]
          }
        ],
        checklist: [
          'Exact charger, power-adapter and accessory model identifiers',
          'Declaration issuer, legal entity, signature and issue date',
          'Current bill-of-materials or material-list revision',
          'Candidate List reference date and substance identifiers',
          'Constituent-article basis for the 0.1% w/w assessment',
          'Supporting material declarations, test reports or assessment records',
          'Documented controls for material and sub-supplier changes',
          'EU importer or supplier review of Article 33 and SCIP duties'
        ],
        limitsText: 'A REACH/SVHC declaration is supplier evidence, not an ECHA product certificate. It does not by itself prove laboratory accuracy, completeness of the bill of materials, production consistency, absence of all hazardous substances, compliance with REACH restrictions or authorisation rules, SCIP submission, RoHS conformity, electrical safety, CE conformity, factory identity or shipment quality. The 0.1% Article 33 threshold is an information trigger; the presence of an SVHC does not by itself prove consumer exposure or unacceptable risk. When product identity, Candidate List date or component-level basis is missing, keep the conclusion unresolved.'
      },
      iso9001Factory: {
        topic: 'China factory verification',
        published: '3 September 2026',
        readTime: '8 minutes',
        title: 'Does an ISO 9001 certificate prove this Chinese supplier is the charger factory?',
        description: 'A valid certificate supports the named organisation’s quality management system within stated sites and scope. It does not certify the charger or prove who made the quoted model.',
        imageAlt: 'A clipboard and lined checklist on an orange background, used as an editorial illustration for ISO 9001 factory-evidence checks.',
        imageCaption: 'Editorial photograph of a checklist. It is not a ZimonAI supplier, client, factory, audit, ISO certificate or production record.',
        answer: 'An ISO 9001 certificate describes the quality management system of the named organisation within its listed sites, activities and validity period, rather than certifying the charger itself. Overseas buyers should verify the issuer and current record, then link the legal entity, Unified Social Credit Code, operating address and scope to the quoted model and recent production records; the certificate does not establish factory ownership or where this order will be made. ZIMONAI’s editorial view is that its value lies in showing a management system operating around the product being purchased; the logo alone says little about the next shipment.',
        takeaways: [
          'Identify the certification body and verify the certificate’s current status; ISO itself develops the standard but does not issue ISO 9001 certificates.',
          'Match the organisation name, Unified Social Credit Code, registered address, covered operating address and manufacturing scope—not only the ISO logo or company name.',
          'Connect the certified site to the quoted charger with model, process, bill-of-materials and order evidence; quality-system certification is not product certification.'
        ],
        sections: [
          {
            title: 'Who issued the certificate—and what did they certify?',
            paragraphs: [
              'ISO describes ISO 9001 as a standard setting requirements for a quality management system. Certification is voluntary and performed by an independent certification body; ISO does not certify organisations or issue certificates. The first check is therefore the named certification body, its official contact and query service, and whether it is authorised for the stated activity—not an ISO logo copied into a supplier PDF.',
              'For certification conducted in China, the currently effective CNCA-QMS-01:2025 rules use GB/T 19001 and/or ISO 9001 as the certification basis. The rules require audits to cover the management system and typical products or services within scope, but they also require the audit report to state that the audit was sampling-based. Certificates may be valid for no more than three years, require continuing surveillance, and can be suspended or withdrawn. A status checked today is useful dated evidence, not a permanent guarantee.'
            ]
          },
          {
            title: 'Do the legal entity, factory address and manufacturing scope all match?',
            paragraphs: [
              'CNCA-QMS-01:2025 requires a China QMS certificate to identify the certified organisation, Unified Social Credit Code, registered address, covered operating address or addresses, the scope of products, activities or services, the applicable standard, issue and expiry dates, certificate number, certification body and a query path. For a multi-site organisation, every site included in the certification scope must be listed. Those fields let a buyer test a factory claim instead of treating the certificate as a decorative badge.',
              'Put the certificate beside the Chinese business licence, supplier quotation, contract, invoice details and the address where production is said to occur. A certificate naming a trading company, sales office, unrelated address or broad service scope does not by itself support a claim that a particular charger is manufactured at the visited site. A difference is not automatic proof of fraud: OEM, group-company and subcontracting structures can be legitimate, but the relationship must be documented before the buyer relies on it.'
            ],
            items: [
              'Certified legal name and Unified Social Credit Code',
              'Registered address and every covered operating site',
              'Manufacturing activities and product scope relevant to chargers',
              'Certificate number, issue date, expiry date and current status',
              'Certification body and, where claimed, accreditation scope',
              'Documented relationship among seller, certificate holder and factory'
            ]
          },
          {
            title: 'What still connects the certificate to this charger and order?',
            paragraphs: [
              'ISO’s conformity guidance warns that a management-system certification mark must not be placed on a product in a way that implies the product itself was certified. The practical boundary is important: ISO 9001 can support how an organisation manages processes; it does not establish that a charger passed electrical-safety, EMC, chemical, performance or destination-market requirements.',
              'ZimonAI’s practical method is to build four explicit links: seller to certified legal entity; certified entity to the covered manufacturing address and scope; factory to the quoted model, process and current bill of materials; and the model to the actual order through samples, production schedule and inspection records. Ask to see model-specific work instructions, incoming and final inspection criteria, nonconformity or corrective-action records and traceability examples during an audit. These records do not turn a sampled visit into certainty, but they test whether the certificate’s scope is operating around the product being purchased.'
            ]
          }
        ],
        checklist: [
          'Original certificate number, certification body and official query path',
          'Current valid, suspended, withdrawn or expired status recorded with query date',
          'Certified Chinese legal name and Unified Social Credit Code matched to the business licence',
          'Registered address and actual production address matched to all covered sites',
          'Scope that expressly covers relevant manufacturing activities and products',
          'Written relationship among seller, certificate holder, brand owner and producing factory',
          'Quoted model, specification, bill of materials and process flow tied to the site',
          'Recent model-relevant production, inspection, traceability and corrective-action records'
        ],
        limitsText: 'An ISO 9001 certificate is management-system evidence for the named organisation, sites, scope and validity shown. It does not prove factory ownership, seller authority, product certification, exact-model compliance, legal market access, capacity, financial health, ethical performance, intellectual-property rights or shipment quality. Certification audits and buyer audits use sampling; records can be incomplete or change after the visit. If the legal entity, operating site, scope or certificate status cannot be independently matched, keep the factory claim unresolved rather than treating the certificate as proof.'
      },
      rohsTestReport: {
        topic: 'EU hazardous-substance compliance',
        published: '1 September 2026',
        readTime: '7 minutes',
        title: 'Does a RoHS test report prove this charger is EU compliant?',
        description: 'A test report can support specific samples and materials. It does not replace the exact product’s technical documentation, EU declaration or production controls.',
        imageAlt: 'Macro view of components and soldered parts on a circuit board, used as an editorial illustration for RoHS evidence checks.',
        imageCaption: 'Editorial photograph of a circuit board. It is not a ZimonAI supplier, client, factory, charger, test sample or compliance record.',
        answer: 'A RoHS test report records the named samples, methods and results against substance limits applied at homogeneous-material level. Overseas buyers should map those samples to the quoted charger’s current bill of materials and separately check exemptions, technical documentation, the EU Declaration of Conformity and change controls; untested materials and later substitutions do not inherit a pass. ZIMONAI’s editorial view is that a laboratory report becomes useful evidence only inside a model-specific, change-controlled file; on its own, it is a dated snapshot rather than proof of electrical safety, REACH compliance or shipment quality.',
        takeaways: [
          'Read the report at sample level: product or material identity, model, component, colour, test method, substances, result and reporting limit must all be visible.',
          'Connect the tested samples to the quoted charger’s current bill of materials and every relevant homogeneous material; do not extend one passing result to untested variants.',
          'Request the manufacturer’s current RoHS technical file and EU declaration, then check exemptions and production changes separately from the laboratory report.'
        ],
        sections: [
          {
            title: 'What does a passing RoHS test report actually establish?',
            paragraphs: [
              'The European Commission says RoHS currently restricts ten substances in electrical and electronic equipment. Article 4 and Annex II of the Directive apply the concentration limits by weight in each homogeneous material: 0.1% for nine listed substances and 0.01% for cadmium, subject to the Directive’s exclusions and application-specific exemptions. A whole-product marketing label such as “RoHS compliant” therefore does not explain which materials were assessed.',
              'IEC 62321-2 provides strategies for disassembly, disjointment and sample preparation before analytical testing. A laboratory result should be read against the exact sample description and preparation shown in the report. ZimonAI’s practical interpretation is that a passing sample supports only the material or component represented by that sample; it does not silently cover unlisted plastics, coatings, solders, cables, connectors or supplier substitutions elsewhere in the charger.'
            ]
          },
          {
            title: 'Why is the report only one part of the RoHS evidence file?',
            paragraphs: [
              'Article 7 of the current consolidated Directive requires manufacturers to prepare technical documentation, carry out internal production control, draw up an EU declaration of conformity, affix CE marking, retain the file for ten years and maintain procedures so series production remains in conformity. Article 13 states that the manufacturer assumes responsibility by drawing up the declaration. None of those responsibilities is transferred to a laboratory merely because it issued a report.',
              'Commission Implementing Decision (EU) 2020/659 published EN IEC 63000:2018 as the harmonised technical-documentation standard for RoHS. IEC describes IEC 63000 as specifying the technical documentation a manufacturer compiles to declare compliance with substance restrictions. It is a documentation framework, not a central EU approval certificate. In practical review, the report should sit inside an evidence chain that explains the product structure, material and supplier evidence, assessment choices, exemptions and model-specific declaration.'
            ],
            items: [
              'Manufacturer and exact product or model identification',
              'Current bill of materials, component and material revisions',
              'Supplier material declarations and supporting test evidence',
              'Assessment of homogeneous materials and identified risk gaps',
              'Any Annex III or IV exemption, application and validity status',
              'Updated EU declaration of conformity and change-control records'
            ]
          },
          {
            title: 'How should a buyer match the report to the charger before purchase?',
            paragraphs: [
              'Place the quotation, product label, sample, bill of materials and report side by side. Match the report number and date, applicant, manufacturer, model, sample photographs, material or component name, colour, laboratory, method, tested substances and results. If the report covers only a cable, enclosure resin, PCB sample or selected components, ask how the remaining homogeneous materials are supported. If several wattages, plug versions or colours share a report, require a written material-and-model mapping rather than assuming the enclosure proves equivalence.',
              'Exemptions require a current check. The Commission says RoHS exemptions are limited in time and regularly reassessed; a renewal request can affect the status after a printed expiry date. Save the exemption wording and query date, and confirm it fits the product category and application. Article 7 also requires product, characteristic, standard and specification changes to be taken into account. ZimonAI therefore treats a material, component supplier, PCB or cable change as a reason to review the evidence set—not as an automatic failure and not as something an old report can automatically cover.'
            ]
          }
        ],
        checklist: [
          'Exact charger brand, model, revision, plug, ports, wattage and colour',
          'Report number, issue date, applicant, manufacturer and laboratory',
          'Sample photographs and descriptions tied to material or component identifiers',
          'Test methods, substances, results, units and reporting limits',
          'Current bill of materials and mapping from each report or declaration to the product',
          'Any claimed Annex III or IV exemption checked for application and current status',
          'Manufacturer’s technical documentation and signed EU declaration of conformity',
          'Change control and risk-based production or shipment verification'
        ],
        limitsText: 'A RoHS report supports only the identified samples, methods and results. It does not prove the Chinese seller’s legal identity, factory ownership, authorisation to use another company’s evidence, electrical safety, EMC, REACH compliance, performance, capacity or shipment quality. It also cannot establish that untested materials, later substitutions or every production unit match the samples. Whether a charger falls within scope, uses a valid exemption or has sufficient technical documentation depends on the exact product and current law; unresolved cases should be confirmed with the responsible economic operator or competent Member State authority.'
      },
      euSafetyGate: {
        topic: 'EU market surveillance',
        published: '30 August 2026',
        readTime: '7 minutes',
        title: 'No EU Safety Gate alert for a charger: does that mean the product is safe?',
        description: 'Safety Gate records notified dangerous products and corrective measures. A search with no match is not a safety approval for the charger, supplier or shipment.',
        imageAlt: 'Power adapters and a USB-C cable on a marble surface, used as an editorial illustration for EU Safety Gate checks.',
        imageCaption: 'Editorial photograph of adapters and a cable. It is not ZimonAI supplier, client, inspection, recall or product-safety evidence.',
        answer: 'EU Safety Gate publishes market-surveillance alerts about dangerous products and corrective measures, so a matching record is specific post-market risk evidence rather than pre-sale approval. Overseas buyers should compare the exact model, codes, images, batch details, stated risk and action with the quoted charger; an empty search means only that no public match appeared under the identifiers, filters and date used. ZIMONAI’s editorial view is that the database is asymmetric: a credible match warrants investigation, while no match offers little reassurance and does not replace model, supplier or shipment evidence.',
        takeaways: [
          'Treat a Safety Gate match as official post-market risk evidence that requires immediate model and batch comparison—not as a verdict on every product from the supplier.',
          'Search more than one identifier and compare the alert reference, product description, brand, model or type, images, risk and corrective measure with the quoted charger.',
          'Treat “no result” as one completed database check; continue with model-specific declarations, reports, labels, traceability and production-conformity evidence.'
        ],
        sections: [
          {
            title: 'What does a Safety Gate alert actually establish?',
            paragraphs: [
              'Articles 25 and 26 of Regulation (EU) 2023/988 define Safety Gate as the rapid alert system for exchanging information on corrective measures concerning dangerous products. Member States notify measures taken by authorities or economic operators, and the European Commission checks and circulates qualifying notifications. An alert therefore records a market-surveillance finding and action; it is not a certificate issued before sale.',
              'The European Commission’s Safety Gate 2025 report explains the sequence: a national authority identifies a dangerous product, notifies the measure, the Commission circulates the information, other authorities check their markets, and a summary is published on the public portal. This supports a specific product-risk record and its stated measures. It does not establish that every visually similar charger, every output variant or every product from the same seller has the same defect.'
            ]
          },
          {
            title: 'How should a buyer match an alert to the quoted charger?',
            paragraphs: [
              'The Commission says the public portal lets users search dangerous products by different criteria, open alert details and export results. Start with the exact brand and model or type, then repeat the search with meaningful model fragments, product category and other identifiers shown on the quotation, label, packaging or product. Save the query date and alert reference so the result can be reproduced.',
              'ZimonAI’s practical reading is to compare the alert and quotation side by side. Use every field that is available: product description, brand, model or type, barcode or other code, photographs, country of origin, notified risk, cited non-compliance, affected batch and corrective measure. A shared enclosure or generic description such as “USB charger” is not enough to connect two products.'
            ],
            items: [
              'Safety Gate alert reference and query date',
              'Exact brand, model or type and every visible suffix',
              'Product image, plug, ports, wattage and label layout',
              'Barcode, batch or other product code where shown',
              'Country of origin and named economic operator where available',
              'Risk description, cited requirement and corrective measure'
            ]
          },
          {
            title: 'What should you do after a match—or after no match?',
            paragraphs: [
              'If the identifiers plausibly match, pause reliance on the supplier’s safety claim and determine whether the offered model, revision or batch is within the alert. Ask for the manufacturer’s corrective action, updated model evidence and the destination-market authority’s current position. A withdrawal, recall, sales ban or online-listing removal should be read exactly as described in the alert rather than softened into a generic “old issue.”',
              'If there is no match, continue the purchase review. For a charger this normally means connecting the exact manufacturer and model to the applicable declaration, safety and EMC evidence, label and ratings, EU economic operator, sample construction and agreed production controls. This is ZimonAI’s evidence-handling recommendation, not an official Commission finding that a particular product is unsafe or safe.'
            ]
          }
        ],
        checklist: [
          'Exact brand, model, revision, plug, ports and rated power',
          'Safety Gate searches using full and meaningful partial identifiers',
          'Saved query date, filters, alert reference and exported result where relevant',
          'Field-by-field comparison of alert images, codes, risk and measures',
          'Written supplier explanation and corrective-action evidence for a plausible match',
          'Model-specific declaration, test evidence, label and EU traceability checked separately',
          'Shipment or production-conformity controls appropriate to the order'
        ],
        limitsText: 'A Safety Gate alert is evidence about the product, risk and corrective measure described in that notification. It does not automatically identify the Chinese factory behind every brand, prove that all products from a supplier are dangerous, or establish that a visually similar charger is the notified model. Conversely, no public match does not prove safety, legal market access, genuine certificates, factory ownership, seller authority, current production conformity or shipment quality. Alerts can be updated or withdrawn by national authorities, and search results depend on the identifiers, filters, language and query date used.'
      },
      ieceeCbCertificate: {
        topic: 'International safety certification',
        published: '28 August 2026',
        readTime: '7 minutes',
        title: 'Does an IECEE CB Test Certificate mean a charger is approved in every market?',
        description: 'A CB certificate can support national certification, but buyers still need to verify the exact charger record, issuing body, model scope and destination-country requirements.',
        imageAlt: 'White power adapter against a yellow background, used as an editorial illustration for IECEE CB certificate checks.',
        imageCaption: 'Editorial photograph of a power adapter. It is not ZimonAI supplier, client, laboratory, certificate or market-approval evidence.',
        answer: 'An IECEE CB Test Certificate records a sample-based assessment of the stated product and standard and can support an NCB in granting national recognition. Overseas buyers should match the certificate status, exact model, ratings, manufacturer or brand relationship, standard edition, national differences and issuing NCB; the scheme has no ongoing factory surveillance and provides no automatic approval in every market. ZIMONAI’s editorial view is to use the CB record as portable technical evidence that can shorten the next national approval step, not as a passport for every country or proof that the shipment matches the assessed sample.',
        takeaways: [
          'Search the certificate reference in the official IECEE database; do not rely on the supplier’s PDF or logo alone.',
          'Match the model or type reference, ratings, brand, manufacturer, standard edition and any national differences to the quoted charger.',
          'Ask the destination-country NCB or regulator what national certification, marking, registration or factory-surveillance step remains.'
        ],
        sections: [
          {
            title: 'What does a “Valid” CB record actually establish?',
            paragraphs: [
              'The IECEE public certificate portal describes itself as a platform for finding certificates from participating NCBs and warns that its display is only an extract; the certificate owner holds the full information. The same official disclaimer says the CB Scheme tests selected samples under an ISO/IEC 17067 type 1a process and does not include ongoing factory surveillance. A “Valid” status therefore supports a specific certificate record, not continuous approval of every production unit.',
              'The IEC also states that a Test Report Form is not a valid CB Test Report unless it is signed by an approved CB Testing Laboratory and appended to a CB Test Certificate issued by an NCB. For a buyer, a stand-alone test-report PDF, a laboratory logo or an IEC standard number is not equivalent to the complete CB deliverable.'
            ]
          },
          {
            title: 'Which fields connect the certificate to the quoted charger?',
            paragraphs: [
              'The official IECEE result exposes decision-relevant fields including certificate status and reference, product, manufacturer, ratings and principal characteristics, trademark, model or type reference, standards used, national differences, issue date and issuing NCB. Compare those fields with the quotation, label, packaging, sample and technical specification without shortening suffixes or combining wattage variants.',
              'ZimonAI’s practical reading is to resolve every name or model difference before relying on the record. An OEM brand, trading company or additional model can be legitimate, but the supplier should show the written relationship and model coverage. If the record is absent, IECEE instructs users to contact the certificate owner or issuing NCB; absence is a verification gap, not automatic proof that the document is fraudulent.'
            ],
            items: [
              'Certificate reference, status and issue date',
              'Product description and exact model or type reference',
              'Input, output, wattage, class and port configuration',
              'Manufacturer, applicant or brand relationships',
              'IEC standard and edition shown in the record',
              'National differences and issuing NCB'
            ]
          },
          {
            title: 'Does the CB certificate replace destination-country approval?',
            paragraphs: [
              'No. The current IECEE basic rules describe member recognition of IECEE deliverables as a mechanism used for granting a National Mark or another form of national recognition. IEC guidance likewise says national approval is facilitated when the relevant national differences have been taken into account. “Facilitated” is not the same as automatically granted.',
              'Before purchase, identify the country where the charger will be sold and ask the relevant regulator or NCB which national deviations, plug requirements, certification marks, registrations or factory-surveillance obligations apply. This is ZimonAI’s evidence-handling conclusion from the official scheme boundaries; it is not an NCB decision on a specific product or market.'
            ]
          }
        ],
        checklist: [
          'Official IECEE search result saved with query date',
          'Certificate reference, status, issue date and issuing NCB',
          'Exact brand, manufacturer, model and type reference',
          'Input/output ratings, wattage, protection class and port layout',
          'IEC standard, edition and listed national differences',
          'CB Test Report linked to the certificate and signed by an approved CBTL',
          'Destination-country approval and surveillance requirements confirmed separately'
        ],
        limitsText: 'A CB Test Certificate addresses the standard, sample and scope represented by that certificate. It does not prove that the Chinese seller is the manufacturer or authorised distributor, that the factory owns the certificate, that every shipment matches the tested sample, or that the product satisfies every national rule. EMC, radio, energy-efficiency, chemical-substance, plug, labelling, registration, transport and contractual requirements may need separate evidence. The public database is an extract, so unclear status or missing details should be confirmed with the certificate owner or issuing NCB.'
      },
      usbIfCertification: {
        topic: 'USB charger certification',
        published: '26 August 2026',
        readTime: '7 minutes',
        title: 'Does a “USB PD” claim prove a GaN charger is USB-IF certified?',
        description: 'USB PD wording describes a claimed technology. Certification requires an exact product record, completed USB-IF testing and a defensible model relationship.',
        imageAlt: 'USB-C cable beside power adapters, used as an editorial illustration for USB-IF charger-record checks.',
        imageCaption: 'Editorial photograph of adapters and a USB-C cable. It is not ZimonAI supplier, client, test-lab or certification evidence.',
        answer: 'A USB-IF certification claim should lead to an exact Integrators List record whose company, model, Test ID, product category and certification date match the quoted charger. Overseas buyers should distinguish that product-level record from terms such as “USB PD,” “USB-C” and “GaN,” then document any OEM or similar model relationship; those labels, a chip claim or a shared enclosure do not establish certification, safety or market access. ZIMONAI’s editorial view is that the central risk is identity drift, where one certified variant is used to support a different wattage, port layout or model.',
        takeaways: [
          'Ask whether the supplier is making a specification claim or a USB-IF certification claim; they require different evidence.',
          'Search the exact product and company in USB-IF Product Search, then preserve the TID, model, category and certification date.',
          'Treat OEM names, extra model suffixes and different port or wattage configurations as relationships to prove—not details to assume.'
        ],
        sections: [
          {
            title: 'What separates a USB PD claim from USB-IF certification?',
            paragraphs: [
              'USB-IF describes its Compliance Program as a set of test specifications tracked through a Test ID. Products that pass are considered USB-IF certified, are added to the Integrators List and may qualify to license USB-IF logos. A quotation that only states “USB PD” or “USB-C” has not shown those steps.',
              'The official logo guidelines are more specific for chargers: Certified USB Charger and Certified USB Fast Charger logos may be used only with a product that passed the appropriate USB-IF test procedures and was posted to the Integrators List. The wattage is part of the logo artwork. A copied logo image, a USB Power Delivery test report or a chip-level claim is therefore not a substitute for the exact product record.'
            ]
          },
          {
            title: 'Which fields should match in the official product record?',
            paragraphs: [
              'USB-IF Product Search is limited to products certified to bear a USB-IF logo. Its public view defaults to certifications from the last two years, so an older product may require a wider date filter. USB-IF also warns that products certified more than two years ago may not meet the current iteration of its Compliance Program; an old listing should therefore be dated and read in context.',
              'ZimonAI’s practical reading is to compare the quotation, product label, packaging and official result side by side. A match should be explained at the product level, not inferred from a company membership, a component certificate or another charger with the same enclosure.'
            ],
            items: [
              'Listed company and its relationship to the Chinese seller',
              'Exact product or model name, including suffixes and revision',
              'Test ID (TID), product category and certification date',
              'Single-port or multi-port charger category',
              'Certified-logo wattage versus the quoted port and total output',
              'Quotation, label and packaging captured with the check date'
            ]
          },
          {
            title: 'Can an OEM or similar model rely on another certified charger?',
            paragraphs: [
              'Possibly, but the relationship must come through a USB-IF-recognised route. USB-IF lists OEM arrangements and Qualification by Similarity among its certification avenues. Its similarity policy says only USB-IF’s compliance committee and certification review board can grant Qualification by Similarity; a granted product receives a new TID and is added to the Integrators List.',
              'USB-IF’s model-number policy allows multiple names or model numbers under one TID when the differences are cosmetic, while changes that affect USB compliance cannot be hidden behind wildcards. For a multi-port GaN charger, differences in port arrangement, power sharing, firmware or advertised wattage should therefore be documented rather than treated as a colour-only variant. This is ZimonAI’s evidence-handling interpretation, not a USB-IF finding about any supplier.'
            ]
          }
        ],
        checklist: [
          'Exact brand, product name, model, revision and port layout',
          'Claim type: USB specification support or USB-IF certification',
          'USB-IF Product Search result and query date',
          'Listed company, TID, category and certification date',
          'Certified-logo and wattage usage matched to the offered product',
          'OEM or Qualification by Similarity relationship where names differ',
          'Separate safety, market-access and shipment-conformity evidence'
        ],
        limitsText: 'A USB-IF record addresses the USB compliance scope represented by that listing. It does not prove the use of GaN components, electrical-safety certification, legal market access, factory ownership, supplier authority, continuous production conformity, advertised performance under every port combination or shipment quality. A missing public result is a follow-up item—especially when the date filter or model name may differ—not automatic proof of a false claim.'
      },
      euEconomicOperator: {
        topic: 'EU market traceability',
        published: '22 August 2026',
        readTime: '6 minutes',
        title: 'Does an EU contact address on a charger prove the Chinese supplier is compliant?',
        description: 'An EU economic-operator address helps trace the product. It does not, by itself, connect a Chinese seller, the exact model and the required compliance documents.',
        imageAlt: 'Chargers arranged on a table, used as an editorial illustration for EU product traceability.',
        imageCaption: 'Editorial photograph of chargers on a table. It is not a ZimonAI supplier, client, inspection or compliance record.',
        answer: 'An EU economic-operator name and address identify a traceable contact in a product’s EU market route, but their meaning depends on whether the party is the manufacturer, importer or authorised representative. Overseas buyers should preserve the contact, identify the Chinese manufacturer, document the relationships among seller and operators, and match the compliance documents to the model, ratings, plug and brand; an address alone does not establish CE conformity or shipment consistency. ZIMONAI’s editorial view is that the contact is most useful as a document-retrieval and accountability anchor, not as a badge of product approval.',
        takeaways: [
          'Record the EU contact exactly as it appears on the product, packaging or accompanying document, then identify its legal role.',
          'Ask separately for the manufacturer, the EU importer or authorised representative, and the documents for the exact quoted model.',
          'Treat a reachable EU contact as one link in a chain of evidence—not a substitute for model, document and shipment checks.'
        ],
        sections: [
          {
            title: 'What does an EU economic-operator address establish?',
            paragraphs: [
              'Regulation (EU) 2019/1020 requires an economic operator established in the Union for products within its scope before they are placed on the market. The operator’s name, registered trade name or trade mark, and postal contact details must be indicated on the product, packaging, parcel or an accompanying document.',
              'For a buyer, this makes the address worth preserving: it is an identified contact for the product’s EU market route. It does not establish that the address belongs to the Chinese quotation party, that the party owns the factory, or that the labelled charger is the same electrical version as the offered model.'
            ]
          },
          {
            title: 'Is the contact a manufacturer, importer or authorised representative?',
            paragraphs: [
              'The role changes what should be requested. EU guidance defines an importer as an EU-established person or company placing a product from outside the EU on the EU market. An authorised representative is appointed by the manufacturer for specified tasks; it is not automatically the manufacturer or seller.',
              'The Commission states that importers must check that the non-EU manufacturer has taken the necessary steps, that required documentation is available on request and that the manufacturer can be contacted. This is why a contact label should trigger a role-and-document question, not a conclusion that the Chinese supplier has been approved.'
            ],
            items: [
              'EU contact name and postal address exactly as labelled',
              'Declared role: manufacturer, importer or authorised representative',
              'Chinese manufacturer’s legal name and address',
              'Written relationship between the Chinese seller and the EU operator, where they differ'
            ]
          },
          {
            title: 'How do you tie the contact to the charger you are buying?',
            paragraphs: [
              'Start with the quoted model, electrical ratings, plug version and brand. Then compare those identifiers with the EU Declaration of Conformity and supporting technical information available from the responsible chain. A brand name or a family description is not enough where the document cannot show that it covers the offered variant.',
              'ZimonAI’s practical reading is to keep four relationships separate: the Chinese seller to the manufacturer, the manufacturer to the EU operator, the EU operator to the documents, and the documents to the exact model. A break in one relationship is a follow-up item, not automatic proof of a false claim.'
            ]
          }
        ],
        checklist: [
          'Photograph or scan of the product, packaging or document showing the EU contact',
          'Exact charger model, brand, plug version and electrical ratings',
          'Chinese manufacturer’s legal name and address',
          'Declared role and written relationship of the EU operator',
          'EU Declaration of Conformity that identifies the quoted model or defensible model range',
          'Supporting document availability and the date checked'
        ],
        limitsText: 'An EU economic-operator contact supports traceability and may support a document request. It does not by itself prove product safety, CE compliance, factory ownership, seller authority, continued document validity or shipment-by-shipment conformity. Applicable obligations can also vary with the product’s actual functions and the EU rules that apply to it.'
      },
      legalEntity: {
        topic: 'Supplier identity',
        published: '20 August 2026',
        readTime: '6 minutes',
        title: 'Before you pay a Chinese supplier, identify the legal entity behind the English name.',
        description: 'How to connect a supplier’s English trading name to its Chinese legal name, Unified Social Credit Code, contract and bank beneficiary before payment.',
        imageAlt: 'Close-up of a contract and pen used as an editorial illustration for supplier identity checks.',
        imageCaption: 'A contract name is useful only when it can be tied to the registered entity and the intended payee.',
        answer: 'A Chinese legal name and 18-character Unified Social Credit Code identify a mainland-registered entity independently of the English trading name used by a supplier. Buyers should find that entity in the National Enterprise Credit Information Publicity System, then compare the registry identity with the contract, invoice, bank beneficiary, business licence and certification holder; any mismatch needs written support before payment. ZIMONAI’s editorial view: this cross-check shows which entity receives money and owes the obligation, while registration alone does not establish factory ownership, capacity, solvency or future performance.',
        takeaways: [
          'Preserve the Chinese legal name exactly as shown on the business licence.',
          'Use the 18-character Unified Social Credit Code to reduce same-name and translation errors.',
          'Treat a registry record as identity evidence, not proof of factory capacity or future performance.'
        ],
        sections: [
          {
            title: 'Why the English name is a weak identifier',
            paragraphs: [
              'A supplier may use a translated name, a brand, a Hong Kong company name or a marketplace storefront that does not exactly match the mainland Chinese entity signing the contract. Several translations can also be reasonable for the same Chinese name. The problem is not automatically fraud; the problem is that the buyer cannot yet tell which entity is taking the obligation.',
              'The practical anchor is the Chinese legal name together with the Unified Social Credit Code. That pair can be compared across the business licence, public registry, contract, invoice and payment instructions without “correcting” differences away.'
            ]
          },
          {
            title: 'What the official system can establish',
            paragraphs: [
              'China’s enterprise information publicity system is the statutory public platform for registration and disclosed enterprise information. Depending on availability and the specific record, a search may show registration and filing information, operating status, disclosed annual reports, administrative penalties, abnormal-operation entries and other public information.',
              'Record the query date and the exact fields used. Public records change, some information is enterprise-reported, and temporary access problems do not themselves prove that a company does not exist.'
            ],
            items: [
              'Legal name and Unified Social Credit Code',
              'Registration status and establishment date',
              'Registered address and legal representative',
              'Business scope wording',
              'Public abnormal-operation or penalty entries, where available'
            ]
          },
          {
            title: 'The four-way comparison before payment',
            paragraphs: [
              'Put four names side by side: the registered entity, the contract party, the invoice issuer and the bank beneficiary. If a different company receives the money, ask for the commercial and legal relationship in writing before treating the difference as acceptable.',
              'Repeat the same comparison for certification documents. A certification holder can legitimately differ from a seller, but the supplier should be able to explain the manufacturing, distribution or brand relationship and provide evidence that covers the quoted model.'
            ]
          }
        ],
        checklist: [
          'Chinese legal name copied from the business licence',
          'Unified Social Credit Code',
          'Current registry record saved with query date',
          'Contract party and invoice issuer',
          'Bank beneficiary and bank jurisdiction',
          'Written explanation for every entity-name difference'
        ],
        limitsText: 'Registration proves that a legal entity and disclosed record existed at the query time. It does not by itself prove that the entity owns a factory, controls the quoted production line, has sufficient capacity, is solvent, or will perform the next order.'
      },
      fccId: {
        topic: 'United States compliance',
        published: '20 August 2026',
        readTime: '7 minutes',
        title: 'Does every charger need an FCC ID? Start by identifying the authorization route.',
        description: 'FCC certification and Supplier’s Declaration of Conformity are different routes. Learn when an FCC ID search is useful and what a grant cannot prove.',
        imageAlt: 'Macro photograph of an electronic circuit board used as an editorial illustration for FCC equipment authorization.',
        imageCaption: 'The product’s radio-frequency function determines the authorization question; a logo alone does not.',
        answer: 'FCC compliance begins with the charger’s functions and authorization route: Certification creates a searchable grant and FCC ID, while Supplier’s Declaration of Conformity follows a different evidence path. Overseas buyers should identify the applicable procedure before searching, then compare any FCC ID with the grantee, equipment class, function, model evidence and public exhibits; even a valid grant does not establish electrical safety, factory identity or shipment conformity. ZIMONAI’s editorial view is that product architecture must come before database results, or the same search can create both false alarms and false confidence.',
        takeaways: [
          'Do not turn “no FCC ID found” into a failure until the applicable procedure is identified.',
          'For a submitted FCC ID, search the FCC system and compare grantee, product code, model evidence and operating description.',
          'A valid grant is not proof that the seller is the manufacturer or that shipped units match the tested configuration.'
        ],
        sections: [
          {
            title: 'Certification and SDoC are not interchangeable labels',
            paragraphs: [
              'The FCC equipment authorization program distinguishes Certification from Supplier’s Declaration of Conformity. Certification involves an application and grant; testing for Certification must be performed by an FCC-recognized accredited laboratory. Under SDoC, the responsible party ensures compliance and supplies required compliance information, but there may be no FCC ID grant to retrieve.',
              'A basic wired power adapter, a charger containing a digital control circuit, and a wireless charger with communication or power-transfer functions can raise different rule questions. Product architecture and intended operation must come before the database search.'
            ]
          },
          {
            title: 'How to read an FCC ID without stopping at “found”',
            paragraphs: [
              'An FCC ID combines a grantee code and product code. A successful search should be followed by a field-by-field comparison: grantee identity, equipment class, grant date, frequency or rule parts, model references in exhibits, label format and internal photographs where public.',
              'The supplier’s quoted model may use a marketing name that is not obvious in the grant. Ask for a model mapping and check whether the supplied exhibit actually connects the commercial model to the authorized equipment.'
            ],
            items: [
              'Exact FCC ID as printed, including hyphens and character order',
              'Grantee name and relationship to the seller',
              'Equipment class and authorized operating function',
              'Model identifiers in public exhibits',
              'Grant date, notes and permitted configuration'
            ]
          },
          {
            title: 'What a valid grant still leaves unanswered',
            paragraphs: [
              'A grant establishes an authorization record for the equipment described in the filing. It does not establish that the current supplier owns the factory, that the quoted product is built to the same bill of materials, or that a production batch will meet electrical-safety, performance or contractual requirements.',
              'Treat the FCC record as one relationship in a chain: seller to grantee, quoted model to authorized model, and shipped construction to the documented configuration.'
            ]
          }
        ],
        checklist: [
          'Product function and applicable FCC procedure',
          'Exact FCC ID or SDoC compliance information',
          'U.S. responsible party where relevant',
          'Grantee-to-supplier relationship',
          'Quoted-model mapping',
          'Separate safety and quality requirements'
        ],
        limitsText: 'An FCC equipment authorization addresses applicable radio-frequency requirements. It is not a general safety certificate, supplier-identity verification, factory audit, product-quality approval or guarantee that the shipment matches the filed sample.'
      },
      ulFile: {
        topic: 'North American certification',
        published: '20 August 2026',
        readTime: '6 minutes',
        title: 'A UL logo is not the end of the check: match the file, holder, category and model.',
        description: 'How buyers can use UL Product iQ to test a supplier’s UL claim without mistaking a real file for blanket coverage.',
        imageAlt: 'Hand holding a multi-port power adapter used as an editorial illustration for UL file verification.',
        imageCaption: 'One housing can contain several electrical variants; certification scope must be checked against the quoted model.',
        answer: 'A UL file number or unique identifier gives buyers an independent search key in UL Product iQ for the certification holder, product category, model or series, electrical ratings and mark or geography. Overseas buyers should connect the exact offered variant to that record and document any relationship among the seller, brand owner, factory and file holder, because a real file does not establish factory ownership, capacity or conformity of every shipment. ZIMONAI’s editorial view is that the decisive question is not whether the UL file exists, but whether this supplier and this electrical configuration sit within its documented scope.',
        takeaways: [
          'Search the official UL database, not only a certificate PDF supplied by the seller.',
          'Compare the exact model, electrical rating and product category—not just the company name.',
          'Ask for written evidence when the seller, brand owner, factory and UL file holder are different entities.'
        ],
        sections: [
          {
            title: 'What Product iQ is designed to search',
            paragraphs: [
              'UL describes Product iQ as its source for certification information. Searches can use a file number, company name, model, Category Control Number and other identifiers. A unique identifier on an enhanced or smart UL Mark can also be entered to obtain more information.',
              'This makes a file number useful because it can be checked independently of a supplier-created PDF. Preserve the file number exactly and save the search date and result.'
            ]
          },
          {
            title: 'Four relationships must line up',
            paragraphs: [
              'First, check the file holder. Second, confirm the product category is appropriate for the claimed item. Third, locate the exact model or a documented model series. Fourth, check the mark and geography stated in the record.',
              'A difference is not automatically a counterfeit. A trading company may sell a product certified under its manufacturing partner, and an OEM product may be covered through a legitimate arrangement. The difference still needs a traceable explanation before the buyer relies on it.'
            ],
            items: [
              'File holder versus supplier legal entity',
              'Product category and applicable guide information',
              'Quoted model versus listed model or series',
              'Electrical ratings and construction variants',
              'Mark type and country coverage'
            ]
          },
          {
            title: 'Why model scope matters for chargers',
            paragraphs: [
              'Charger families can share an enclosure while differing in wattage, ports, plug type, PCB layout or key safety components. A photo of a UL Mark or a valid file for one member of the family does not establish coverage for every variant.',
              'If the model is not visible in the available record, ask for a certification letter, model correlation or other holder-controlled document rather than assuming the marketing name is covered.'
            ]
          }
        ],
        checklist: [
          'UL file number or unique identifier',
          'Product iQ result captured with date',
          'Certification holder',
          'Category Control Number',
          'Exact model or documented series mapping',
          'Supplier-to-holder relationship'
        ],
        limitsText: 'A valid UL record does not prove ownership of the factory, production capacity, commercial reliability or conformity of every shipped unit. It also does not replace checks for other markets, functions or contractual specifications.'
      },
      ceMarking: {
        topic: 'European Union compliance',
        published: '20 August 2026',
        readTime: '7 minutes',
        title: 'CE is a manufacturer’s declaration—not a certificate issued by a central EU authority.',
        description: 'What to request when a power-adapter supplier says a product is CE certified: declaration, exact model, applicable rules and supporting technical evidence.',
        imageAlt: 'White European two-pin power adapter on a blue surface used as an editorial illustration for CE document checks.',
        imageCaption: 'The CE mark starts a document review; it does not identify a central authority that approved the product.',
        answer: 'CE marking is the manufacturer’s declaration that it identified applicable EU rules, completed conformity assessment, prepared technical documentation and signed an EU Declaration of Conformity; no central EU authority issues a universal certificate. Overseas buyers should match the manufacturer, model and ratings to that declaration, its legislation, standards, date and signatory, then check supporting reports and any notified-body role against the route; a logo or voluntary certificate is not a substitute. ZIMONAI’s editorial view is to judge each document by its legal role and product link, not by how official its title or artwork appears.',
        takeaways: [
          'Ask for the EU Declaration of Conformity for the exact model and manufacturer.',
          'Check listed legislation, standards, date, signatory and product identification.',
          'Treat a laboratory report or voluntary certificate as supporting evidence, not automatic legal permission to use CE.'
        ],
        sections: [
          {
            title: 'Why “send me the CE certificate” is the wrong first question',
            paragraphs: [
              'The European Commission explains that CE marking is the manufacturer’s indication that the product meets applicable EU requirements. The manufacturer is responsible for the conformity assessment, technical file, declaration and mark. Some legislation permits self-assessment; some product routes require a notified body.',
              'Because the route depends on the product, a document titled “Certificate of Compliance” can be relevant evidence but is not automatically the legal document that establishes the manufacturer’s declaration.'
            ]
          },
          {
            title: 'Read the Declaration of Conformity field by field',
            paragraphs: [
              'The declaration should identify the product and responsible manufacturer clearly enough to connect it to the item being purchased. It should list the applicable legislation and standards, and include the place, date, authorised signatory and statement of responsibility.',
              'Power electronics may involve more than one applicable requirement depending on voltage, electromagnetic behaviour, radio function, materials and intended market. Do not copy a standard list from another product; compare the declaration with the actual architecture and ratings.'
            ],
            items: [
              'Manufacturer and contact details',
              'Exact product, model and rating',
              'Applicable EU legislation',
              'Standards or specifications used',
              'Place, date, name, title and signature',
              'Notified-body details only when the applicable route requires one'
            ]
          },
          {
            title: 'Cross-check the supporting evidence',
            paragraphs: [
              'Compare test-report model names, ratings, photographs and construction details with the quotation and sample. Confirm that the issuing laboratory and report can be contacted or verified where possible. If a notified body number appears beside the CE mark, confirm that the body is authorised for the relevant legislation and procedure in the NANDO database.',
              'The European Commission specifically warns about voluntary certificates that may be mistaken for legally recognised CE approval. The title of a document matters less than its legal role and connection to the exact model.'
            ]
          }
        ],
        checklist: [
          'Exact model and product rating',
          'Signed EU Declaration of Conformity',
          'Manufacturer identity',
          'Applicable legislation and standards',
          'Supporting reports matched to the same variant',
          'Notified-body scope when one is actually required'
        ],
        limitsText: 'CE marking does not mean that the EU approved the product, does not show product origin and does not guarantee the future conformity of every production unit. Importer and distributor obligations also remain separate from the manufacturer’s declaration.'
      },
      un383: {
        topic: 'Power bank transport',
        published: '20 August 2026',
        readTime: '6 minutes',
        title: 'For a power bank, ask for the UN 38.3 test summary—and match it to the battery inside.',
        description: 'The key fields in a UN 38.3 lithium battery test summary and how to connect them to the exact power-bank model before shipment.',
        imageAlt: 'White power bank and cables used as an editorial illustration for UN 38.3 transport-document checks.',
        imageCaption: 'Transport evidence must follow the battery type and model inside the commercial product.',
        answer: 'A UN 38.3 test summary records transport testing for a lithium cell or battery type, identifying the parties, report, battery description, ratings, models, results and signatory. Overseas buyers should match those fields to the power bank’s internal battery, bill of materials, label and shipment file; the summary must be available but need not accompany every carton, and a pass does not establish capacity, cycle life, electrical safety or shipment quality. ZIMONAI’s editorial view is that battery identity matters more than the PDF’s appearance, because a genuine summary for another configuration does not resolve the product being shipped.',
        takeaways: [
          'A test summary is not the same as a generic “UN 38.3 certificate” image.',
          'Model number and watt-hour rating are essential for connecting the summary to the power bank.',
          'Passing UN 38.3 transport testing does not establish capacity accuracy, cycle life or general product quality.'
        ],
        sections: [
          {
            title: 'What the official summary is expected to contain',
            paragraphs: [
              'Subsection 38.3.5 lists the information that must be provided in the test summary. It includes the cell, battery or product manufacturer; contact information; test laboratory; unique report number; report date; battery description; tests and results; the manual revision used; and a validating signature.',
              'The description must include battery type, mass, watt-hour rating or lithium content, physical description and model numbers. These are the fields that let a buyer test whether the document belongs to the product being purchased.'
            ]
          },
          {
            title: 'The matching problem is usually more important than the PDF',
            paragraphs: [
              'A supplier may send a genuine summary for a different cell, battery pack or capacity. Compare the summary’s model and watt-hour rating with the bill of materials, label, quotation and shipment documents. If the power bank uses multiple cell options, ask which exact configuration will be used for the order.',
              'Changes that materially affect the tested type can require further testing. A buyer should not assume that a similar model number or identical enclosure establishes the same battery type.'
            ],
            items: [
              'Battery or product manufacturer',
              'Test laboratory and contact details',
              'Unique report number and report date',
              'Battery type, mass and watt-hour rating',
              'Physical description and model numbers',
              'Tests performed, results, manual revision and signature'
            ]
          },
          {
            title: 'Availability does not mean it travels with every carton',
            paragraphs: [
              'UN guidance explains that the summary is to be made available; it is not intended or required to accompany every shipment. A buyer, freight forwarder or other party with a legitimate need can request it.',
              'Keep the summary with the product specification and shipping file. If the supplier cannot connect it to the actual battery, the document gap should be resolved before relying on it for logistics planning.'
            ]
          }
        ],
        checklist: [
          'Exact power-bank model and labelled capacity',
          'Internal battery model and watt-hour rating',
          'UN 38.3 test summary',
          'Manufacturer and laboratory contacts',
          'Report number, date and manual revision',
          'Configuration match confirmed in writing'
        ],
        limitsText: 'UN 38.3 concerns transport classification testing for the lithium cell or battery type. It does not prove advertised capacity, charging performance, cycle life, electrical safety certification, factory identity or shipment-level quality.'
      }
    }
  },
  'zh-tw': {
    nav: '查核知識',
    hub: {
      metaTitle: '供應商查核知識庫｜ZimonAI 智蒙灣',
      metaDescription: '面向充電器、電源適配器與行動電源買家的實務查核文章，整理中國企業主體、工廠聲明、歐盟通用充電器、CCC、Qi2、RoHS、REACH／SVHC、Safety Gate、IECEE CB、USB-IF、FCC、UL、CE 與 UN 38.3 證據。',
      kicker: 'ZimonAI 研究台',
      title: '供應商查核知識庫：每一篇，都要能用在付款前的判斷。',
      lead: '寫給採購充電器、電源適配器與行動電源的海外買家。每篇先用懶人包交代整體問題、重要限制與實際意義，再展開官方來源與完整證據。',
      featured: '建議先讀',
      latest: '二十二篇查核筆記',
      methodLabel: '內容原則',
      methodTitle: '先把問題講清楚，再談搜尋排名。',
      methodItems: [
        ['先查官方來源', '法規、資料庫用途與認證規則，優先回到主管機關或認證機構本身。'],
        ['一段掌握完整問題', '懶人包先整合證據代表什麼、界線在哪裡，以及這件事為何影響採購，再展開完整分析。'],
        ['證據邊界不藏起來', '查到企業、檔案號或測試摘要，不會被寫成對交貨與品質的保證。']
      ],
      nextLabel: '持續更新',
      nextTitle: '我們會定期發布新的查核文章。',
      nextText: '後續題目會維持在中國供應商查核、充電器與電源電子文件。是否值得幫助採購判斷，比固定湊篇數更重要。'
    },
    taxonomy: {
      searchLabel: '搜尋查核文章',
      searchPlaceholder: '輸入認證、產品、文件或採購問題',
      searchHint: '可搜尋標題、摘要與關鍵詞，例如 FCC ID、UL 檔案號或 UN 38.3。',
      clearSearch: '清除搜尋',
      filtersLabel: '依主題瀏覽',
      allCategories: '全部主題',
      productsLabel: '產品',
      allProducts: '全部產品',
      marketsLabel: '市場',
      allMarkets: '全部市場',
      resultsLabel: '搜尋結果：',
      resultSingular: '篇查核筆記',
      resultPlural: '篇查核筆記',
      noResultsTitle: '目前沒有符合條件的文章。',
      noResultsText: '可以換一個較廣的關鍵詞、取消篩選，或瀏覽全部主題。',
      categoryKicker: '知識分類',
      browseAll: '查看全部查核筆記',
      categories: {
        'supplier-identity': {
          name: '供應商身分與工商資料',
          description: '在採信供應商說法前，先把商號、登記主體、合約簽約方與實際收款人連起來。'
        },
        'certification-market-access': {
          name: '認證與市場准入',
          description: '先判斷適用的認證或符合性程序，再核對官方紀錄與文件是否涵蓋報價型號及目標市場。'
        },
        'product-transport-documents': {
          name: '產品文件與運輸要求',
          description: '把測試摘要、聲明與運輸文件，連回實際採購的產品及電池配置。'
        },
        'factory-onsite': {
          name: '工廠與現場查核',
          description: '規劃並判讀工廠、產線與現場證據，同時保留一次到訪本身不能證明的範圍。'
        },
        'commercial-risk': {
          name: '採購、合約與付款風險',
          description: '付款前核對合約條件、付款指示與各交易主體之間的關係。'
        }
      },
      products: {
        general: '通用品類',
        charger: '充電器',
        'power-adapter': '電源適配器',
        'power-bank': '行動電源',
        'gan-charger': 'GaN 充電器'
      },
      markets: {
        china: '中國',
        'united-states': '美國',
        canada: '加拿大',
        'european-union': '歐盟',
        global: '全球標準',
        international: '國際運輸'
      }
    },
    ui: {
      read: '閱讀查核筆記',
      published: '發布日期',
      updated: '更新日期',
      readTime: '閱讀時間',
      quickAnswer: '懶人包',
      buyerChecklist: '買家核對清單',
      limits: '這些證據不能證明什麼',
      sources: '資料來源與查核依據',
      sourcesLead: '本文的事實內容已對照以下一手與獨立來源；連結會開啟資料發布者的網站。',
      photo: '編輯用圖片',
      related: '繼續閱讀',
      back: '返回知識庫',
      editorialCredit: '本文由 ZIMONAI｜智蒙灣科技編輯部製作。'
    },
    articles: {
      appleIphoneDuoFoldableSupplyChain: {
        topic: 'Apple 新品與供應鏈時事',
        published: '2026 年 9 月 10 日',
        readTime: '約 7 分鐘',
        title: 'Apple 首款摺疊機 iPhone Duo 登場：真正的考驗不只是一支轉軸',
        description: 'iPhone Duo 把雙螢幕、精密轉軸、雙電池與均熱板放進同一支手機，也讓摺疊機的量產品質成為主流製造議題。',
        imageAlt: '上海 Apple Store 與大型 Apple 標誌，用於 iPhone Duo 發表新聞的編輯配圖。',
        imageCaption: '上海 Apple Store 的編輯用照片；不是 iPhone Duo 產品照、Apple 生產據點、ZIMONAI 客戶或供應商，也不能證明 Apple 的製造夥伴。',
        labels: {
          summary: '新聞摘要',
          checklist: '接下來值得關注',
          limits: '仍待確認'
        },
        answer: 'Apple 於 9 月 9 日發表首款摺疊 iPhone「iPhone Duo」，美國售價 1,999 美元起，10 月 16 日預購、10 月 23 日上市。它展開後是 7.6 吋內螢幕，闔起後使用 5.4 吋外螢幕，機身同時整合精密轉軸、雙電池與均熱板。更值得注意的是，Apple 把轉軸手感、柔性面板、結構強度、熱流與電池匹配一起推成供應鏈的量產門檻。ZIMONAI｜智蒙灣科技編輯部認為，iPhone Duo 會成為摺疊機能否從新奇規格走向成熟量產品質的一次大型檢驗。',
        takeaways: [
          'Apple 正式確認 iPhone Duo 是旗下第一款摺疊 iPhone，內螢幕 7.6 吋、外螢幕 5.4 吋，轉軸由超過 100 個零件構成。',
          '內部採用左右雙電池與客製化均熱板，顯示摺疊機的難題早已超出面板與轉軸本身。',
          '售價與上市時程已公布，但零組件供應商、量產良率、轉軸壽命目標與首批出貨量仍未公開。'
        ],
        sections: [
          {
            title: 'Apple 這次到底發表了什麼？',
            paragraphs: [
              'iPhone Duo 展開後使用 7.6 吋 Super Retina XDR 內螢幕，闔起後則使用 5.4 吋外螢幕。Apple 表示，兩塊面板採相同比例，畫面能在開闔之間自然切換；內螢幕另有奈米紋理表面，用來降低反光並淡化摺痕的視覺存在感。',
              '機身以精密轉軸支撐展開後的面板，並搭配磁鐵完成闔蓋。Apple 說轉軸含有超過 100 個零件，機框使用 Grade 5 鈦金屬與內部補強肋。美國售價 1,999 美元起，首波超過 70 個國家與地區將於 10 月 16 日預購、10 月 23 日上市。'
            ]
          },
          {
            title: '為什麼它不只是「一塊會摺的螢幕」？',
            paragraphs: [
              '摺疊機會讓多種公差彼此牽動：轉軸要控制阻尼並撐平面板，蓋板、膠材與面板層要承受反覆彎折，機框還要同時面對扭轉、落摔與防水防塵。Apple 表示，內螢幕以客製膠材讓不同層之間相對滑動，並宣稱整機具備 IP68；這些是 Apple 公開的產品聲明，還不能等同長期實際使用結果。',
              'iPhone Duo 的內部空間也被重新分配。左右兩側各放置一顆電池，A20 Pro 則連接客製化均熱板。ZIMONAI 的判讀是：面板、轉軸、電池、散熱介面、天線與外殼不能只分開驗證，裝配後的交互影響與批次差異，才會決定使用者拿到的每一支手機是否一致。'
            ],
            items: [
              '開闔全行程的轉軸扭力與對位',
              '柔性面板、蓋板與膠材的批次一致性',
              '雙電池匹配、保護邏輯與熱平衡',
              '機框剛性、防護結構與天線整合',
              '反覆彎折與溫度循環後的成品檢驗'
            ]
          },
          {
            title: 'iPhone Duo 可能怎麼改變摺疊機供應鏈？',
            paragraphs: [
              'Apple 進場會替摺疊零組件帶來更大的市場參考，但不代表某家面板、轉軸或電池廠已經取得訂單。能在開發樣品上運作的零件，仍要跨過外觀、公差、可靠度、良率與交期等量產門檻。真正的訊號是：摺疊機採購已從尋找單一創新零件，轉向整機系統整合能力的競賽。',
              '海外買家若正在開發摺疊或帶轉軸的產品，應依失效模式索取資料，包括測試配置明確的開闔壽命、面板與膠材批次追溯、雙電池管制、熱分布、防護測試條件及成品檢驗紀錄。使用與 iPhone Duo 相似的行銷文字，不能證明產品具有同等耐用度；報價型號、送審樣品與量產流程能否保持一致，才是可查證的重點。'
            ]
          }
        ],
        checklist: [
          '零售版上市後的獨立拆解與內部配置確認',
          'Apple 對內螢幕、轉軸與雙電池公布的維修資訊',
          'Apple 是否進一步公開耐用測試方法或開闔次數',
          '首批實際使用回報，並排除單一損壞與展示機案例',
          '具名供應商的正式申報或公告，而非匿名供應鏈傳聞',
          '其他摺疊品牌後續的價格、保固與零件要求變化'
        ],
        limitsText: 'Apple 已確認產品架構、部分性能聲明、價格與上市時程，但尚未公布轉軸、面板、電池或均熱板供應商，也沒有揭露量產良率、出貨量、完整驗證方法或轉軸壽命保證。美聯社與 Axios 提供獨立新聞報導，仍不能證明零件來源或工廠表現。本文對製造與供應鏈的影響分析來自 ZIMONAI｜智蒙灣科技編輯部，不是 Apple 的結論，也不能證明任何特定供應商參與 iPhone Duo 生產。'
      },
      appleIphone18ProVaporChamber: {
        topic: 'Apple 硬體與製造時事',
        published: '2026 年 9 月 10 日',
        readTime: '約 7 分鐘',
        title: 'iPhone 18 Pro 把散熱搬上主舞台：均熱板不再只是藏在機身裡的零件',
        description: 'Apple 以 2 奈米 A20 Pro 搭配重新設計的均熱板，主打可持續性能；散熱一致性、介面與裝配管制也因此受到注目。',
        imageAlt: 'Apple Newsroom 官方圖片中的酒紅色 iPhone 18 Pro 正面與背面。',
        imageCaption: 'Apple Newsroom 發布的酒紅色 iPhone 18 Pro 官方新聞素材；不是拆解、散熱測試、ZIMONAI 客戶機、供應商樣品，也不能證明 Apple 的零件來源。',
        labels: {
          summary: '新聞摘要',
          checklist: '接下來值得關注',
          limits: '仍待確認'
        },
        answer: 'Apple 在 iPhone 18 Pro 發表會上，罕見地把散熱工程放到新品敘事中心。新的 A20 Pro 採 2 奈米製程，晶片封裝概念來自 M 系列晶片，並直接連接面積更大的均熱板。Apple 宣稱，持續性能最高可比前一代提升 40%；9 月 12 日開放預購，9 月 18 日上市。這代表手機效能的競爭，已從短時間跑出多高的峰值，走向高負載能維持多久。ZIMONAI｜智蒙灣科技編輯部認為，均熱板平整度、內部工質、熱介面壓合與整機裝配的一致性，今後會從看不見的零件細節，變成消費者能直接感受到的產品品質。',
        takeaways: [
          'Apple 表示 A20 Pro 使用 2 奈米製程，並透過重新設計的晶片封裝直接連接新一代均熱板。',
          '最高 40% 的持續性能提升屬於 Apple 在特定比較基準下的官方聲明，不是所有環境都會得到相同結果。',
          '更大的均熱板會把熱介面、機框接觸、組裝壓力與軟體負載一起帶進量產管制，而不是只換掉一個散熱零件。'
        ],
        sections: [
          {
            title: 'iPhone 18 Pro 的內部設計改了什麼？',
            paragraphs: [
              'Apple 於 9 月 9 日發表 iPhone 18 Pro 與 Pro Max。A20 Pro 採用最新 2 奈米製程，新的封裝方式將主要元件並排配置，再直接連上均熱板，把高負載產生的熱更快帶離晶片集中區域。',
              'Apple 宣稱持續性能最高較前一代提升 40%。MacRumors 報導，新均熱板的表面積是前一代的三倍，內部使用去離子水。面積變大之所以重要，是因為持續散熱取決於熱能如何進入均熱板、在其中擴散，再傳到機身其他區域，而不是手機裡「有裝均熱板」就算完成。'
            ]
          },
          {
            title: '均熱板變大，為什麼量產反而更難？',
            paragraphs: [
              '均熱板是密封的薄型兩相散熱元件。熱端讓內部液體蒸發，蒸氣移向低溫區凝結，再透過毛細結構回流。在手機有限厚度裡，它必須保持平整，還要承受搬運、壓合與溫度變化。充液量、密封、潔淨度或表面接觸的微小差異，都可能讓圖面相同的零件出現不同結果。',
              '接觸面變大，也會更依賴周邊結構。導熱介面材料厚度、機框平整度、鎖付順序與外殼公差，都會影響熱是否真的走上設計路徑。ZIMONAI 的實務判讀是，類似產品若要宣稱高負載穩定散熱，應提供量產分布、測試治具與整機條件，而不是只看一張黃金樣品熱像圖。'
            ],
            items: [
              '均熱板長寬、厚度與平整度公差',
              '工質、毛細結構與封口製程管制',
              '氣密、耐壓與熱阻測試方法',
              '導熱介面材料的厚度與壓縮範圍',
              '跨批次整機溫度與降頻結果'
            ]
          },
          {
            title: 'Apple 的說法會怎麼影響其他手機品牌？',
            paragraphs: [
              'Apple 公開主打持續性能，會把市場注意力從短時間峰值跑分，帶向遊戲、錄影、AI 與相機工作負載下能維持多久。其他品牌與散熱零件廠很可能提出相似主張，但相似用語不代表測試可直接比較；環境溫度、負載時間、螢幕亮度、軟體版本與保護殼，都會影響結果。',
              '對品牌與採購團隊而言，散熱可以支撐效能、握持舒適度與電池表現，卻不能把單一供應商的均熱板規格直接寫成整機承諾。能被驗證的主張，需要明確裝置配置、可重複方法、樣本數與允收範圍；當散熱開始出現在包裝與發表會上，這條證據界線會更重要。'
            ]
          }
        ],
        checklist: [
          '零售版上市後的獨立持續性能測試',
          '測試環境溫度、負載時間、軟體版本與機身配置',
          '拆解確認均熱板尺寸、位置與熱介面結構',
          'Apple 是否補充最高 40% 比較的詳細條件',
          '多台實機的發熱、降頻與電池表現，而非單一案例',
          '競爭品牌如何定義並證明自己的散熱聲明'
        ],
        limitsText: 'Apple 已確認 A20 Pro 製程、封裝概念、均熱板與自家持續性能聲明，但沒有公布均熱板供應商、完整尺寸、充液量、量產公差、驗證樣本數或良率。MacRumors 補充了設計細節，仍不能取代 Apple 工程紀錄或多台實機測試。本文的供應商管制與測試判讀來自 ZIMONAI｜智蒙灣科技編輯部，不代表 iPhone 18 Pro 存在瑕疵，也不能證明任何具名工廠生產該零件。'
      },
      appleAirpods5WirelessChargingCase: {
        topic: 'Apple 音訊與充電時事',
        published: '2026 年 9 月 10 日',
        readTime: '約 6 分鐘',
        title: 'AirPods 5 一次推出兩個版本：這回差異藏在充電盒裡',
        description: 'Apple 以 129 與 149 美元推出兩款 AirPods 5；高階版加入無線充電盒、更長續航與滑動音量控制，充電盒成為產品分級關鍵。',
        imageAlt: '前一代 Apple AirPods 與充電盒放在木桌上，用於 AirPods 5 充電盒新聞的編輯配圖。',
        imageCaption: '前一代 AirPods 的編輯用照片，並非 AirPods 5；也不是 ZIMONAI 客戶產品、供應商樣品、充電測試或 Apple 製造夥伴證據。',
        labels: {
          summary: '新聞摘要',
          checklist: '接下來值得關注',
          limits: '仍待確認'
        },
        answer: 'AirPods 5 這次分成外觀接近、功能不同的兩個版本：美國售價 129 美元的標準版，以及 149 美元的 Wireless Charging Case 版。兩者都有 H3 晶片與開放式主動降噪，高階版再加入更長續航、滑動音量控制，以及可用 Apple Watch 充電器、Qi 相容充電器或 USB-C 充電的盒子，9 月 18 日上市。更值得注意的是，小小充電盒已成為產品分級核心；對買家與配件供應鏈來說，型號、包裝、續航、充電方式與測試紀錄只要錯位一項，就可能交付正版卻錯誤的版本。',
        takeaways: [
          'Apple 以 129 與 149 美元推出兩款 AirPods 5，Wireless Charging Case 版承擔額外的充電、控制與續航功能。',
          'Apple 宣稱開啟主動降噪時單次最長 5 小時，搭配無線充電盒最長 22 小時；這些是依其測試條件得出的官方數據。',
          '對配件產業而言，這場發表顯示充電盒架構已足以定義產品級距，也會放大相似版本在上架、包裝與出貨時的混料風險。'
        ],
        sections: [
          {
            title: '兩款 AirPods 5 到底差在哪裡？',
            paragraphs: [
              'Apple 於 9 月 9 日發表 AirPods 5，兩個版本都採用新的開放式配戴設計、H3 晶片與主動降噪。標準版美國售價 129 美元；149 美元的 Wireless Charging Case 版另有耳機柄滑動音量控制、升級充電盒，以及 Apple 所稱更長的電池續航。',
              '無線充電盒支援 Apple Watch 充電器、Qi 相容充電器與 USB-C。Apple 表示，開啟主動降噪時單次最長可聆聽 5 小時，搭配充電盒則最長 22 小時。兩款產品將於 9 月 18 日上市；The Independent 與 MacRumors 也分別報導了雙版本安排與充電盒差異。'
            ]
          },
          {
            title: '充電盒為什麼不只是「比較方便」？',
            paragraphs: [
              '充電盒本身就是一套電氣系統，包含電池、充電輸入、電源管理、接點、外殼與韌體行為。加入 Qi 與 Apple Watch 充電器相容性後，線圈對位、溫升與互通性都成為產品要求；同時也會改變包裝、說明書、法規資料與出貨測試。',
              'ZIMONAI 的判讀是，20 美元價差把版本管制變得格外明顯。紙箱、商品頁、說明書或驗貨紀錄只要漏掉「Wireless Charging Case」，買家收到的可能仍是正版 AirPods 5，卻不是下單版本。其他相似耳機專案也一樣：配件差異必須有獨立 BOM、標籤稿與最終功能檢驗。'
            ],
            items: [
              '耳機與充電盒的完整型號識別',
              '各版本的 USB-C、Qi 與手錶充電器相容性',
              '耳機與盒內電池規格',
              '包裝標示與內附線材',
              '出貨前的充電、配對與控制功能檢驗'
            ]
          },
          {
            title: '降噪與續航數字應該怎麼看？',
            paragraphs: [
              'Apple 宣稱 AirPods 5 的外部噪音降低效果，比 AirPods 4 主動降噪版最高提升 50%；註腳說明，測試使用指定 AirPods 硬體、預發行軟體，並參考 IEC 60268-24。這是一項有比較對象與測試框架的官方聲明，不代表每位使用者在所有環境都會感受到完全相同的差距。',
              '續航同樣取決於使用條件。聆聽模式、音量、通話、空間音訊、電池老化與無線充電環境，都可能改變實際結果。現在可以確定的是，Apple 把性能故事與更清楚的配件分級綁在一起；9 月 18 日之後的零售測試與使用者回報，才會讓兩個版本的日常差異更完整。'
            ]
          }
        ],
        checklist: [
          '兩款 AirPods 5 的零售型號與包裝用語',
          '主動降噪開啟與關閉時的獨立續航測試',
          '常見 Qi 與 Apple Watch 充電器的互通性',
          '搭配保護殼時的對位、溫升與充電表現',
          '電商上架與倉儲出貨是否混淆兩個版本',
          '上市後的維修、電池服務與替換充電盒資訊'
        ],
        limitsText: 'Apple 已確認兩種配置、美國售價、充電方式、上市日期，以及自家續航與降噪聲明，但沒有公布零組件供應商、電芯來源、完整充電盒電氣規格、量產良率或獨立實測結果。本文配圖為前一代 AirPods，不能用來辨識新品。本文對版本管制與供應鏈的分析來自 ZIMONAI｜智蒙灣科技編輯部，不是 Apple、The Independent 或 MacRumors 的結論。'
      },
      euBatteryPassportPowerBank: {
        topic: '歐盟電池文件',
        published: '2026 年 9 月 10 日',
        readTime: '約 7 分鐘',
        title: '一般行動電源 2027 年要有歐盟電池護照嗎？先確認電池類別',
        description: '歐盟電池護照將於 2027 年 2 月 18 日上路，卻不是所有充電電池都適用。行動電源買家要先分清電池類別，再核對 QR code 後方的資料。',
        imageAlt: '手機透過線材連接可攜式行動電源，作為歐盟電池護照查核文章的編輯用圖片。',
        imageCaption: '手機連接行動電源的編輯用照片；不是 ZIMONAI 產品、客戶裝置、供應商樣品、合規文件、電池護照或測試紀錄。',
        answer: '自 2027 年 2 月 18 日起，歐盟電池護照適用於電動車、LMT 及容量超過 2kWh 的工業電池。一般行動電源若密封、未逾 5 公斤且非專為工業用途設計，通常屬於可攜式電池，不在護照範圍；但同日起仍須有所有電池適用的 QR code，連結另一組法定資料。ZIMONAI 認為，買家應先核對精確型號、重量、瓦時數、用途與分類依據，再索取正確數位文件，避免用一個看似完整的「護照」回答錯法律問題。',
        takeaways: [
          '《歐盟電池法規》第 77 條把 2027 年 2 月 18 日的電池護照義務，限於電動車電池、LMT 電池與容量超過 2kWh 的工業電池。',
          '一般消費型行動電源多半依重量、密封狀態與設計用途歸入可攜式電池；實際產品仍要依完整規格判定，不能只看商品名稱。',
          '同一天起所有電池都要標示 QR code，但可攜式電池等其他類別連結的是標示、符合性、盡職調查與廢棄管理等適用資料，不是第 77 條電池護照。'
        ],
        sections: [
          {
            title: '2027 年 2 月起，哪些電池才真的要有電池護照？',
            paragraphs: [
              '《歐盟電池法規》（EU）2023/1542 第 77 條列出的範圍很明確：自 2027 年 2 月 18 日起，每一顆投入歐盟市場或啟用的電動車電池、輕型運輸工具（LMT）電池，以及容量超過 2kWh 的工業電池，都要有電子形式的電池護照。歐盟執委會目前的專頁，將相關產品舉例為電動車、電動自行車、電動機車與電動滑板車電池，以及家用儲能與工業電池。',
              '建立及維護護照的責任，落在把完整電池投入歐盟市場的經濟營運者，不會自動轉給單一電芯或模組供應商。護照透過 QR code 連結，內容包含電池型號與個別電池資料，並依使用者身分設定不同存取權限。因此，供應商提供一個資料頁、報告資料夾或可掃描代碼，還不足以證明該型號應走第 77 條護照制度，也不足以證明義務已完成。'
            ]
          },
          {
            title: '一般消費型行動電源，會被歸在哪一類？',
            paragraphs: [
              '法規所稱「可攜式電池」，是指密封、重量不超過 5 公斤、並非專為工業用途設計，而且不屬於電動車、LMT 或汽車啟動照明點火電池的產品；完成封裝、可供終端使用者直接使用的電池組，也會被當成電池管理。依這些條件，一般替手機充電的行動電源通常屬於可攜式電池，而不是工業或 LMT 電池。這是 ZIMONAI 依典型產品特徵對法規定義所作的分類判讀，並不是歐盟替所有名為「行動電源」的商品作出的核准。',
              '商品名稱不能處理邊界個案。大型可攜式儲能電源、專為工業設備設計的電池，或用在移動載具的產品，都可能因重量、用途或供電對象而落入不同類別。採購時應保存額定瓦時數、總重量、設計用途、電池配置、說明書與實際應用，再要求製造商針對精確型號提出書面分類依據。'
            ],
            items: [
              '完整產品與電池型號，包括尾碼及電池組配置',
              '電池總重量與額定瓦時數',
              '一般消費用途或專門工業用途',
              '是否為輕型運輸工具提供牽引動力',
              '製造商採用的電池類別與法規定義'
            ]
          },
          {
            title: '為什麼 2027 年的 QR code 不一定是電池護照？',
            paragraphs: [
              '第 13 條規定，自 2027 年 2 月 18 日起，所有電池都要帶有 QR code。電動車、LMT 與符合門檻的工業電池，代碼會連到第 77 條電池護照；其他電池若依前述判讀包含一般行動電源，代碼則連到該類別適用的標示資訊、EU 符合性聲明、電池供應鏈盡職調查報告，以及廢棄預防與回收處理資訊。共同的是 QR code，後方承載的法定資料卻不相同。',
              '這個差別會直接改變買家提問。把「請提供電池護照」發給所有工廠，容易製造錯誤的通過或不通過判定；先問誰是把成品投入歐盟市場的責任方、產品屬於哪個電池類別、QR code 連去哪裡，以及後方資料能否對回實物型號，才會留下可稽核紀錄。歐盟執委會 2026 年 8 月更新的資料點指引，可協助護照適用類別準備資料，但文件也明確聲明不會新增法律義務，也不是具權威性的法規解釋；最後仍要回到法規與後續適用法案。'
            ]
          }
        ],
        checklist: [
          '成品與電池組的完整型號，尾碼不得省略',
          '電池重量、額定容量與瓦時數計算',
          '支持可攜式、工業、LMT 或電動車類別的用途證據',
          '把完整電池投入歐盟市場的經濟營運者名稱與角色',
          '以實體樣品及最新包裝稿測試 QR code 連結',
          '把代碼後方資料對回精確型號與適用類別',
          '另行核對 EU 符合性聲明及支持技術文件',
          '電芯、電池組、韌體、標示與責任方的變更管制'
        ],
        limitsText: '《歐盟電池法規》廣泛適用於各類電池，但第 77 條護照義務只涵蓋列名類別與容量門檻。本文對一般行動電源的分類，是依典型產品特徵對法規定義所作的判讀；商品名稱、標稱容量或本文，都不能替特殊產品完成正式分類。QR code 本身不會證明連結資料正確、責任方已履行全部義務，或量產品與查閱樣品一致。電池護照、QR code 資料、CE 符合性、運輸測試、電氣安全、生產者登記、廢棄管理與出貨品質，仍是不同的證據問題。2027 年 2 月 18 日前後發布的授權法案、執行法案與官方指引，仍可能細化實務要求。'
      },
      euCustomsReformEcommerceParcels: {
        topic: '歐盟海關與跨境電商新聞',
        published: '2026 年 9 月 9 日',
        readTime: '約 7 分鐘',
        title: '歐盟海關改革獲理事會放行：平台與低價小包裹將面對新的進口制度',
        description: '歐盟理事會通過數十年來最大幅度的海關改革，將非歐盟電商平台推向進口責任方，並新增小包裹處理費；費率與最後立法程序仍待確認。',
        imageAlt: '倉儲人員在貨架間檢視包裹，用於說明歐盟跨境電商海關改革。',
        imageCaption: '倉儲包裹檢視情境的編輯用照片；不是歐盟海關查驗、ZIMONAI 場所、客戶貨件、供應商設施，也不是任何特定平台的證據。',
        labels: {
          summary: '新聞摘要',
          checklist: '接下來值得關注',
          limits: '目前仍未定案'
        },
        answer: '歐盟理事會 9 月 3 日通過海關改革立場，準備把非歐盟電商平台納入進口責任方，並對低價小包裹新增全歐盟處理費。這件事之所以重要，是因為中國直寄歐盟的充電器與行動電源，其落地成本、產品識別資料與合規紀錄，將更直接綁在銷售通路上。不過改革尚未完成立法，歐洲議會仍須表決，後續還要簽署及刊登官方公報，處理費金額也尚未公布。ZIMONAI 認為，真正的競爭將從追求最低單件寄送成本，轉向比較哪一種通路能穩定承接正確的 SKU、海關與產品安全資料。',
        takeaways: [
          '理事會 9 月 3 日通過的方案，將讓銷往歐盟的非歐盟平台承擔進口人的報關、稅費與合規責任；歐洲議會最後表決及正式刊登仍在後續程序中。',
          '新處理費與 2026 年 7 月 1 日起已實施的低價遠距銷售貨物每項 3 歐元暫行關稅不同。理事會公告發布時，執委會尚未公布處理費金額。',
          '對中國直寄的充電器與行動電源，型號層級的產品識別碼、稅則分類、歐盟產品文件與退貨追溯能力，會逐漸成為通路成本，而不是包裹被攔下後才補的行政資料。'
        ],
        sections: [
          {
            title: '歐盟理事會 9 月 3 日究竟通過了什麼？',
            paragraphs: [
              '理事會完成新《歐盟海關法典》與歐盟海關管理局方案的第一讀立場。整套改革包含集中式海關資料中心、跨國風險分析，以及提供給高度透明業者的「Trust and Check」簡化制度。依理事會規劃，新管理局將設於法國里爾並自 2027 年開始運作；電商業者預計自 2028 年 7 月 1 日起強制使用海關資料中心，其他貿易商則在更晚階段納入。',
              '電商最重要的變化是責任歸屬。理事會公告指出，非歐盟平台把商品賣進歐盟時，將被視為進口人，而不是讓最終消費者自行承擔報關義務。反覆違反海關與歐盟標準的業者，可能面對逐級加重的處分；最嚴重情況包括最高相當於前一年歐盟進口總值 6% 的罰款、失去海關優惠，甚至限制平台介面存取。'
            ]
          },
          {
            title: '哪些費用與資料要求已經生效，哪些還在路上？',
            paragraphs: [
              '三項制度很容易被混在一起。第一，2026 年 7 月 1 日起，價值不超過 150 歐元且符合條件的遠距銷售貨物，已適用每項 3 歐元的暫行關稅；歐盟執委會說明，計算依據是包裹中的稅則分類項目，不是單純以包裹件數計算。第二，產品識別碼將自 11 月 1 日起強制申報，用於提高追溯與安全篩查。第三，本次改革另設全歐盟小包裹處理費，用來支應海關處理成本。',
              '理事會表示，各會員國最晚會在 11 月 1 日開始徵收該處理費，但實際金額要由執委會另行訂定。因此，在委任法案公布以前，任何把費率寫成已定案的報導或物流報價，都超出了目前證據。整套海關改革還要等待歐洲議會表決、簽署與《歐盟官方公報》刊登；眼前已生效措施與未來法典，必須分成不同時間軸閱讀。'
            ],
            items: [
              '2026 年 7 月 1 日起已生效：符合條件的低價遠距銷售貨物，每項暫行關稅 3 歐元。',
              '2026 年 11 月 1 日起：依執委會實施說明，產品識別碼成為強制欄位。',
              '最晚 2026 年 11 月 1 日：另有全歐盟處理費，金額仍待執委會訂定。',
              '下一個立法節點：歐洲議會表決，之後才是簽署與官方公報刊登。'
            ]
          },
          {
            title: '這會怎麼影響中國直寄的充電器與行動電源？',
            paragraphs: [
              '充電器或行動電源從中國逐件直寄，本來就牽涉稅則號列、精確型號、歐盟經濟營運者、符合性聲明、電池運輸資料、警語與召回追溯。當平台或其代表成為進口人，海關系統又要求結構化產品識別資料時，商品名稱不一致、SKU 文件不完整，就會直接變成通關、執法與成本問題。這不代表平台變成製造商，卻會提高平台接受不可追溯型錄資料的代價。',
              'ZIMONAI 編輯部的判讀是，改革將更有利於能把同一產品身分，從供應商報價一路保存到商品頁、包裹申報及上市後處置的業者。部分商品仍可能適合中國直寄，另一些則可能改採歐盟集中進口與在地庫存；官方文件沒有替企業決定通路模式。真正該比較的是完整落地成本，加上資料、合規與退貨能力，而不是只看物流報價。'
            ]
          }
        ],
        checklist: [
          '歐洲議會表決、最終簽署文本與《歐盟官方公報》刊登',
          '執委會訂定處理費金額與徵收方式的委任法案',
          '所採申報路徑自 11 月 1 日起要求的精確產品識別欄位',
          '各電商通路指定的進口人或間接報關代表',
          'SKU 層級的稅則號列、型號、歐盟合規檔案與電池運輸資料',
          '中國逐件直寄與歐盟集中進口、庫存及退貨的總成本比較',
          '平台在 2028 年資料中心階段前推出的上架或履約新要求'
        ],
        limitsText: '截至 2026 年 9 月 9 日，理事會已通過自身立場，歐洲議會最後表決、簽署與《歐盟官方公報》刊登仍待完成；執委會也尚未公布全歐盟處理費金額。暫行關稅、產品識別碼、處理費、平台義務與海關資料中心各有不同適用日期，後續法律文字與指引仍可能補充細節。改革針對整體跨境電商，不能用來證明某一款充電器、行動電源、中國供應商或平台已合規或違規。本文對通路與採購的影響分析來自 ZIMONAI｜智蒙灣科技編輯部，不是理事會、執委會、歐洲議會或 BEUC 的預測。'
      },
      euCommonChargerRules: {
        topic: '歐盟通用充電器規則',
        published: '2026 年 9 月 8 日',
        readTime: '約 7 分鐘',
        title: '歐盟通用充電器規則：USB-C 裝置、充電器與 2028 新要求要分開查',
        description: '歐盟現行規則已涵蓋列名有線充電裝置與筆電，充電器本身的新生態設計要求則自 2028 年適用；買家需要兩套清楚分開的證據。',
        imageAlt: '大理石桌面上的 USB-C 接頭、線材與轉接器，用於說明歐盟通用充電器規則。',
        imageCaption: 'USB-C 線材與轉接器為編輯用照片；不是 ZIMONAI 的供應商、客戶、送測充電器、工廠、認證文件或歐盟符合性證據。',
        answer: '歐盟「通用充電器」目前規範列名有線充電裝置的 USB-C 插孔、USB Power Delivery、分售選項與消費者標示；筆電已於 2026 年 4 月 28 日納入。這不會讓「USB-C」自動成為充電器合規證明：裝置端 RED 文件與包裝資訊，和充電器的安全、EMC、能效及 2028 年生態設計要求，仍是不同證據。買家應把裝置、充電器與線材完整型號，逐項對上功率、USB PD、包裝標示及 EU 符合性聲明。ZIMONAI 的判讀是，真正風險是把現行裝置規則、充電器規則與未生效要求混成一句「已符合」。',
        takeaways: [
          '自 2026 年 4 月 28 日起，筆電也納入歐盟通用充電器要求；其他十二類可用有線充電的可攜裝置，已從 2024 年 12 月 28 日開始適用。',
          '適用裝置要有 USB Type-C 插孔；有線充電超過 5 V、3 A 或 15 W 時，必須支援 USB Power Delivery，其他快充協定也不能妨礙 USB PD 完整運作。',
          '針對充電器本身的《2025/2052 號生態設計規則》要到 2028 年 12 月 14 日才適用；現在可以納入產品規劃，但不能倒寫成 2026 年已生效。'
        ],
        sections: [
          {
            title: '2026 年在歐盟已經生效的是哪些要求？',
            paragraphs: [
              '歐盟執委會列出的十二類可攜裝置，自 2024 年 12 月 28 日起納入通用充電規則，包括手機、平板、數位相機、耳機、頭戴式耳機、可攜式喇叭、掌上型遊戲機、電子書閱讀器、耳塞式耳機、鍵盤、滑鼠與可攜式導航裝置；筆電則從 2026 年 4 月 28 日起適用。《2022/2380 號指令》限定在可使用有線充電的列名無線電設備，並不是所有電器一律改用 USB-C。',
              '在適用範圍內，裝置必須具備可操作的 USB Type-C 插孔並可用相容線材充電。若有線充電可超過 5 V、3 A 或 15 W，還要支援 USB Power Delivery；其他快充協定不得妨礙完整 USB PD 功能。廠商也要提供不附充電器的購買選項、標明包裝是否包含充電器，並揭露達到充電所需的最低與最高功率及相容協定。歐盟執委會 2026 年報告把這些整理為五項相互關聯的要求，不是一項插孔外觀檢查。'
            ]
          },
          {
            title: '裝置與充電器，買家各要核對哪些證據？',
            paragraphs: [
              '先從精確裝置型號與充電架構開始。包裝、網路銷售頁與說明書應一致交代是否附充電器、啟動充電所需最低功率、達到最快速度所需最高功率，以及適用時的「USB PD」字樣。這些數值要再對照實際供應或建議搭配的外接電源、單埠與多埠同時使用時的輸出、線材額定值及本次報價產品。',
              '通用充電器指令屬於《無線電設備指令》的符合性路徑，因此裝置端充電聲明應連回該精確型號的 EU 符合性聲明與技術文件；外接電源本身的安全、EMC、物質、能效與市場准入文件則要另立一套。ZIMONAI 的實務判讀是：沒有同時寫明裝置型號與充電器型號的一頁式聲明，無法建立完整互通關係；「USB-C」三個字本身不是證據鏈。'
            ],
            items: [
              '產品是否屬於列名裝置，以及規則開始適用的日期',
              '裝置、外接電源與線材的完整型號',
              '消費者標示上的最低與最高充電功率',
              'USB PD 支援狀態與其他專有快充協定',
              '包裝與網路銷售頁的附帶／未附帶充電器圖示',
              '裝置的 EU 符合性聲明及技術證據',
              '充電器另行適用的安全、EMC、能效與其他文件'
            ]
          },
          {
            title: '2028 年外接電源新規則會改變什麼？',
            paragraphs: [
              '歐盟執委會說明，《2025/2052 號規則》將自 2028 年 12 月 14 日起適用於外接電源、一般用途可攜式電池充電器、無線充電器或充電板，以及 USB Type-C 線材，但仍要逐項確認範圍與例外。屆時列入範圍的外接電源原則上要符合通用充電器設計、互通、資訊與能源效率要求，包括至少一個 USB Type-C 或 USB PD 連接埠、可拆式 USB-C 線材、連接埠功率標示及新的通用充電器標誌。',
              '這個未來日期會影響產品規劃，卻不會改寫 2026 年 9 月出貨的法律狀態。預計長期銷售的 OEM 專案，現在就應把外殼、連接埠、線材、韌體、標示與測試計畫對照 2028 年規則；眼前採購仍須依產品投放歐盟市場當時有效的規定判斷，並把後續要求列成有日期的改版節點，而不是提前包裝成已取得的認證。'
            ]
          }
        ],
        checklist: [
          '判斷產品是否屬於列名裝置及規則適用日期',
          '記錄裝置、充電器與線材完整型號，不省略尾碼',
          '核對 USB-C 插孔、最低與最高功率及 USB PD 聲明',
          '檢查所有銷售形式的附帶／未附帶圖示與充電標示',
          '審閱裝置的 EU 符合性聲明與充電技術證據',
          '另行審閱外接電源的安全、EMC、能效與物質文件',
          '以實際充電器、線材與相關連接埠組合測試互通性',
          '若產品將持續在歐盟販售，建立有日期的 2028 轉換計畫'
        ],
        limitsText: '通用充電器規則處理特定無線電設備的充電介面、協定、銷售選項與消費者資訊；2028 年生態設計規則則另行涵蓋列入範圍的外接電源與線材。這些要求不能證明中國賣家擁有工廠、所有 USB-C 產品都在適用範圍、本次報價充電器已具備電氣安全，或量產品與審閱版本完全一致。USB-IF 認證、CE 符合性、化學物質合規、能源效率、產品安全與出貨品質，都要依精確產品準備各自證據。歐盟執委會指引可協助一致解讀，但不是產品核准；歐盟法的最終拘束性解釋權仍屬歐盟法院。'
      },
      chinaCccCharger: {
        topic: '中國充電器市場准入',
        published: '2026 年 9 月 6 日',
        readTime: '約 7 分鐘',
        title: '充電器有 CCC 證書，就代表中國工廠與所有出口市場都已通過認證嗎？',
        description: 'CCC 能支持列名充電器或電源適配器在中國市場的特定認證範圍；買家仍要核對證書、型號、製造商、工廠與各出口市場要求。',
        imageAlt: '大理石桌面上的白色雙圓腳電源適配器，用於說明中國 CCC 證書查核。',
        imageCaption: '電源適配器編輯用照片；不是 ZIMONAI 的供應商、客戶、工廠、證書、送測樣品或市場准入紀錄。',
        answer: '有效的中國強制性產品認證（CCC）證書，能支持列名充電器或電源適配器在中國市場的特定認證範圍，前提是證書持有人、製造商、生產工廠、完整型號、額定值與即時狀態都和產品一致。它不是全球出口通行證；歐盟、美國、英國或其他市場仍有各自的法規與文件。對海外買家，ZIMONAI 的判讀是：CCC 可以是一筆有力的中國市場證據，但報價產品仍須對上精確型號與當期量產，銷往哪個市場，就要另外建立該市場的准入資料。',
        takeaways: [
          '國家認監委 2026 年 8 月更新的目錄仍將「電源」列為 0807、0907，電子產品及安全附件依 CNCA-C09-01:2023 執行。',
          '證書查核要看委託人、製造商、生產工廠、產品名稱、完整型號或系列、認證依據、發證機構、日期與目前狀態。',
          '共用外殼、印有 CCC 標誌，或同系列某一型號有證書，都不能自動涵蓋不同瓦數、電路、安全結構、工廠或出口市場。'
        ],
        sections: [
          {
            title: '哪些充電器與電源適配器會走 CCC 認證？',
            paragraphs: [
              '國家認監委 2026 年 8 月更新的現行實施規則彙整，把「電源」列在電子產品及安全附件類別，產品代碼為 0807、0907，對應的實施規則是 CNCA-C09-01:2023，並自 2023 年 8 月 1 日施行。是否落入強制認證範圍，要先看產品功能與目錄界定，不能只因為商品頁都寫「充電器」，就把不同用途的產品視為同一類。',
              '落在目錄內的產品，CCC 處理的是產品在中國境內出廠、銷售、進口或用於其他經營活動的要求。這個市場邊界很重要：供應商持有真實的中國市場證書，不代表產品已同時完成歐盟、美國、英國或其他目的地的符合性程序。'
            ]
          },
          {
            title: '證書與報價充電器，哪些欄位必須逐項對上？',
            paragraphs: [
              '《強制性產品認證管理規定》要求證書列出認證委託人、製造商、需要時的生產企業、產品名稱與型號或系列、認證依據、日期、發證機構及證書編號。CNCA-C09-01:2023 又進一步規定，電源產品原則上依電路原理與安全結構劃分認證單元，型式試驗報告應描述該認證單元內所有產品的相關資訊。',
              '實際核對時，把官方即時狀態、報價單、銘牌、樣品與工廠文件放在一起看。完整型號尾碼、輸入輸出、連接埠、委託人、製造商與生產地址都要一致。國家認監委 2025 年的資訊公開通知要求認證機構公布證書有效、暫停、註銷或撤銷狀態，並提供公開查詢方式；因此，PDF 上的到期日還沒到，不等於可以略過即時狀態與產品關係。'
            ],
            items: [
              '證書編號、發證機構、發證日、到期日與目前狀態',
              '認證委託人、製造商與生產工廠，以及三者的書面關係',
              '完整產品名稱、型號或系列，以及報價使用的所有尾碼',
              '輸入輸出、瓦數、連接埠、插腳與安全結構',
              '該認證單元採用的實施規則與標準',
              '實體樣品上的銘牌與 CCC 標誌資訊'
            ]
          },
          {
            title: '工廠、電路或關鍵零件變更後，原證書還能直接沿用嗎？',
            paragraphs: [
              'CNCA-C09-01:2023 要求獲證產品持續符合標準，並維持與型式試驗樣品一致；制度也包含獲證後監督。關鍵零件、材料、安全設計或電氣結構改變時，應在實施前辦理變更核准或備案；要擴大證書涵蓋產品時，認證機構也須評估差異，必要時增加測試或工廠檢查。',
              'ZIMONAI 的實務判讀是，CCC 證書要能接上當期量產資料，才真正具有採購價值。買家應把獲證型號連回現行物料清單、關鍵零件清單、工廠地址、變更核准與出貨規格。這不會把 CCC 變成全球認證，也不能保證每一件產品，但能避免供應商把一張真實證書延伸到不相關的型號、工廠或市場。'
            ]
          }
        ],
        checklist: [
          '先確認精確產品功能是否落入現行 CCC 目錄',
          '從發證機構的公開查詢管道取得目前證書狀態',
          '把委託人、製造商與生產工廠對回供應商文件',
          '比對完整型號、額定值、插腳、連接埠與安全結構',
          '檢查關鍵零件、材料及電氣結構的變更核准',
          '把各目的市場的認證與聲明分開建立證據檔案',
          '用量產與出貨檢查確認本批訂單的實際配置'
        ],
        limitsText: 'CCC 證書只能支持證書所載產品、認證單元、標準、相關主體與中國市場範圍；不能證明賣方自有工廠、該公司所有產品都獲證、每一批出貨都和型式試驗樣品相同，也不能證明充電器符合歐盟、英國、美國或其他出口市場要求。它也不能取代企業信用查核、效能測試、化學物質合規、運輸文件與訂單專屬品質管制。若即時狀態、工廠、型號或配置無法對應，應先保留結論，向發證認證機構確認。'
      },
      belkinUltraChargeProBoostSolid: {
        topic: 'IFA 2026 電池技術新聞',
        published: '2026 年 9 月 7 日',
        readTime: '約 6 分鐘',
        title: 'Belkin 在 IFA 2026 推出半固態電芯行動電源：UltraCharge Pro 有何不同？',
        description: 'Belkin 以 BoostSolid 電芯推出纖薄磁吸 5K 與 60W 10K 兩款新品。真正值得注意的，是行動電源競爭正從瓦數延伸到體積、循環壽命與熱管理。',
        imageAlt: 'Belkin UltraCharge Pro 磁吸 5K 與顯示螢幕 10K 行動電源，分別為手機與筆電充電。',
        imageCaption: 'Belkin IFA 2026 新聞稿隨附的官方媒體圖片，呈現本次發表的 UltraCharge Pro BoostSolid 產品；非 ZIMONAI 測試、贊助內容、供應商現場或客戶專案。',
        labels: {
          summary: '新聞摘要',
          checklist: '接下來值得關注',
          limits: '目前仍未確認'
        },
        answer: 'Belkin 在 IFA 2026 發表兩款採用 BoostSolid 半固態電芯的 UltraCharge Pro 行動電源：8.8mm 的磁吸 5K 款支援 15W Qi2，10K 款最高可輸出 60W，並有狀態螢幕。Belkin 宣稱電芯在 1,000 次循環後仍可保有最高 80% 容量；TechRadar 實機確認產品明顯纖薄，卻未驗證長期壽命與安全主張。這次發表把電芯技術、循環壽命證據與熱管理推到行動電源品類競爭核心，製造商與買家不再只看容量和瓦數。',
        takeaways: [
          '5K 款整合 8.8mm 機身、15W Qi2 磁吸充電與最高 22.5W USB-C 輸出；10K 款則提供最高 60W USB-C、三個輸出埠與狀態螢幕。',
          'Belkin 宣稱 BoostSolid 在 1,000 次循環後仍可保有最高 80% 容量；這是條件明確的品牌主張，不是已被獨立重現的五年耐用結論。',
          '對整個行動電源市場而言，競爭焦點正從更高瓦數，延伸到電芯技術、電池包體積、熱控制、循環壽命證據與狀態資訊。'
        ],
        sections: [
          {
            title: 'Belkin 這次在 IFA 2026 發表了什麼？',
            paragraphs: [
              'Belkin 於 9 月 3 日發表 UltraCharge Pro Slim Magnetic Power Bank 5K 與 UltraCharge Pro Power Bank 10K with BoostSolid Cell。5K 款厚度 8.8mm，支援 15W Qi2 磁吸無線充電及最高 22.5W 有線輸出，美國定價 69.99 美元。10K 款單一 USB-C 最高輸出 60W，配置兩個 USB-C 與一個 USB-A，螢幕可顯示剩餘電量、輸出功率與溫度資訊，美國定價 89.99 美元。',
              '兩款產品不只是容量不同。5K 款鎖定吸附在手機背面的輕薄使用情境，10K 款則面向手機、平板與部分筆電的有線快充。Belkin 新聞稿表示，兩款當時已在美國官網開放訂購，並提供黑色與沙色；其他地區的上市時間與售價，仍要依各市場資訊分開確認。'
            ]
          },
          {
            title: '為什麼半固態電芯才是這則新聞的重點？',
            paragraphs: [
              'Belkin 將 BoostSolid 描述為在液態電解質之外加入凝膠狀層的半固態架構，並把更纖薄的電池包、熱穩定性與較慢衰退連在一起。品牌提出的循環壽命基準很具體：完整充放電 1,000 次後，容量最高仍可維持 80%；「五年」則是假設每兩天完成一次完整充放電。Belkin 另稱，5K 款比自家前一代同級產品薄 40%，10K 款比一般 45W、10K 行動電源小 27%。',
              '這些比較條件不能省略。體積百分比採用 Belkin 自訂的比較基準，循環壽命與安全敘述也來自製造商。TechRadar 在 IFA 的實機體驗可獨立支持兩款產品已成形，並指出 5K 款確實非常纖薄、整體質感出色；但該報導沒有重做 1,000 次循環，也沒有公布穿刺、高溫或容量保持測試。這是一場真正的產品發布，卻還不是所有效能宣稱的獨立驗證。'
            ],
            items: [
              '品牌主張：1,000 次循環後，容量最高仍保有 80%。',
              '獨立觀察：產品已在 IFA 展出，5K 款機身明顯纖薄。',
              '仍待實測：長期衰退、高溫輸出、抗膨脹能力與批次一致性。'
            ]
          },
          {
            title: '這會如何改變行動電源供應鏈？',
            paragraphs: [
              'ZIMONAI 編輯部的判讀是，這場發表讓電芯選擇直接成為消費者看得見的產品故事。未來供應商若報價相似的「半固態」行動電源，光有技術名稱還不夠；買家會需要把精確電芯型號、標稱與額定容量、循環測試方法、溫度條件、保護設計、電池包尺寸與變更管理規則，連回實際成品型號。否則，同一個熱門名詞底下，可能藏著截然不同的配方與證據品質。',
              '產品價值的來源也可能改變。如果製造商能在不犧牲可用容量與熱裕度的前提下做出更薄的電池包，外觀設計與便攜性就會更有賣點；循環壽命若能在獨立測試中成立，更換頻率也會進入商業計算。下一個有意義的訊號，不會是另一張發布會投影片，而是可重複的測試、拆解證據，以及其他主流品牌是否開始公布可比較的電芯與循環壽命資料。'
            ]
          }
        ],
        checklist: [
          '經過數百次完整循環後的獨立容量保持結果',
          '持續 60W 輸出時的充電速度與表面溫度',
          '各成品型號的標稱容量與額定輸出容量',
          '電芯型號、供應商、保護設計與電池包變更紀錄',
          '各地區實際上市時間、保固條款與最終售價',
          '其他品牌是否提出可比較的半固態電芯證據'
        ],
        limitsText: '截至 2026 年 9 月 7 日，Belkin 已公布新品規格、比較方式、售價與上市資訊，TechRadar 也已發布 IFA 實機體驗；但本文引用的獨立來源尚未完成 1,000 次循環老化、破壞性安全測試、持續溫度量測或量產批次比較。「半固態」本身也不代表全產業只有一種固定配方，更不能證明所有採用該名稱的產品表現相同。本文對供應鏈的影響分析來自 ZIMONAI｜智蒙灣科技編輯部，不是 Belkin、TechRadar 或主管機關的結論。'
      },
      xoPoppyPowerBankRecall: {
        topic: '北美行動電源召回',
        published: '2026 年 9 月 5 日',
        readTime: '約 7 分鐘',
        title: 'XO Poppy 磁吸行動電源美加接連召回：同品牌，為何型號清單不一樣？',
        description: '美國主管機關召回約 32,400 顆，加拿大也已公告 30,000 顆；品牌相同，型號、通路與退款方式卻不能混成一份名單。',
        imageAlt: '美國召回公告中的三款 XO Poppy 磁吸行動電源，以及包裝上的型號標籤。',
        imageCaption: '美國 CPSC 召回公告中的三張產品照片，經並排整理作為編輯展示；畫面是美國列名的米色、蝴蝶結與泰迪熊版本，不是加拿大完整型號清單。非 ZIMONAI 測試或贊助內容。',
        labels: {
          summary: '新聞摘要',
          checklist: '買家現在應核對什麼',
          limits: '目前仍未確認'
        },
        answer: '北美兩份召回公告都指向 XO Poppy 磁吸行動電源。美國 CPSC 9 月 3 日召回約 32,400 顆，加拿大衛生部 8 月 26 日已公告 30,000 顆相關 5,000mAh 型號；兩地都指出過熱與火災風險。真正值得注意的是，美國只列三個零售版本，加拿大列出 30 組型號，退款與處置管道也不同。對買家與通路商而言，這起事件把各市場 SKU 對照、電芯與物料清單追溯、召回物流推到第一線；共同品牌名稱不足以界定召回範圍。兩份公告當時都沒有事故或傷害通報，但尚未公開根因、電芯供應商、受影響批次或各型號的內部配置。',
        takeaways: [
          '美國 CPSC 公告涵蓋約 32,400 顆於 TJX 與 Marshalls 銷售的 XO Poppy Power Trip；加拿大衛生部另列 30,000 顆在 HomeSense、Winners 與 Marshalls 銷售的相關 5,000mAh 行動電源。',
          '美國公告列出三種包裝版本，加拿大則列出 30 組型號。買家要核對完整市場 SKU 與包裝型號，不能只憑 XO Poppy 名稱或相似外觀。',
          '兩國主管機關都未公布根因分析。正確做法是先隔離受影響成品紀錄，保存電芯、PCBA、連接埠、韌體與生產批次證據，不能把責任直接指向未具名供應商。'
        ],
        sections: [
          {
            title: '美國與加拿大究竟各自召回了哪些產品？',
            paragraphs: [
              '美國消費品安全委員會（CPSC）於 2026 年 9 月 3 日公布第 26-740 號召回。範圍是母型號 PYPBK5M 下的三種 XO Poppy Power Trip 磁吸無線行動電源：米色（PY-PBK5M-CR2）、米色蝴蝶結圖樣（PY-PBK5M-BW8）與黑色泰迪熊圖樣（PY-PBK5M-TB2）。CPSC 表示，約 32,400 顆產品於 2025 年 4 月至 2026 年 3 月在全美 TJX 與 Marshalls 門市銷售，售價約 15 美元；公告列 Truststone Group LLC 為進口商，製造地為越南。',
              '加拿大衛生部則於 8 月 26 日公布相關召回，涵蓋 30,000 顆相容 MagSafe 的 XO Poppy 5,000mAh 行動電源，銷售期間為 2024 年 5 月至 2026 年 3 月，通路包括 HomeSense、Winners 與 Marshalls。加拿大清單共有 30 組型號，其中包含 PY-PBK5M-BW8，也有許多未出現在美國公告的版本。兩份公告在各自的資料截止日都表示，尚未收到事故或傷害通報。'
            ]
          },
          {
            title: '為什麼型號清單與消費者處置方式不一樣？',
            paragraphs: [
              '召回範圍由各主管機關公告中的市場、通路紀錄與產品識別資料共同界定。美國要求消費者立即停用，並向 Truststone Group 申請以虛擬禮物卡形式退費。CPSC 也提醒，召回的鋰離子產品不可丟入一般垃圾、普通回收系統或零售門市的電池回收箱；送往家庭有害廢棄物收集站前，應先確認該站是否接收召回鋰電池。',
              '加拿大要求消費者停用後，直接帶回 HomeSense、Winners 或 Marshalls 退款，並指出加拿大禁止再散布、出售或轉贈召回品。這些差異不是文字細節，而是實際執行規則。全球賣家若把兩份公告縮成一張品牌層級清單，可能漏掉加拿大版本、把美國客戶導向錯誤退款管道，或在不同國家套用不適用的處置方式。'
            ],
            items: [
              '美國範圍：母型號 PYPBK5M、三個包裝版本，約 32,400 顆。',
              '加拿大範圍：30 組列名型號，官方通報銷售 30,000 顆。',
              '只有一組型號重疊，不能據此推定所有版本共用相同物料清單。',
              '各國銷售與退款紀錄，都應連回產生該項義務的正式公告。'
            ]
          },
          {
            title: '這起召回揭示了哪些行動電源追溯問題？',
            paragraphs: [
              '公開公告已提供足夠的零售端資訊，讓消費者辨識產品並採取行動，但沒有揭露電芯製造商、PCBA 版本、連接埠供應商、生產日期、批次邊界或技術失效分析。買家若要排查自己的商品組合，還需要一條能把各市場 SKU 與包裝型號連回成品紀錄、物料清單版本、電芯批次及出貨歷程的證據鏈，才能準確停出貨並通知客戶。',
              'ZIMONAI 的編輯判讀是，跨市場召回能力應在出貨前設計好，而不是等公告出現後才臨時拼湊。品牌方與進口商應能凍結受影響庫存、依目的市場找出客戶、保存樣品與變更紀錄，並啟動各司法管轄區正確的退款與逆向物流。這起事件沒有證明每一款 XO Poppy 產品都有缺陷，也沒有指出是哪個供應商造成風險；它顯示的是，當公開品牌名稱相同時，精確產品身分與應變紀錄為何關鍵。'
            ]
          }
        ],
        checklist: [
          '完整市場 SKU、包裝型號、顏色或圖樣版本與銷售國家',
          '成品批次、生產日期、採購單與實際出貨目的地',
          '電芯製造商與批次、PCBA 版本、連接埠規格與保護設定',
          '電芯、連接埠、外殼、韌體及次級供應商的變更核准紀錄',
          '停出貨、通路通知、退款與各國處置流程',
          '留樣、事故紀錄，以及負責主管機關與客戶後續聯繫的人員'
        ],
        limitsText: '截至 2026 年 9 月 5 日，CPSC 與加拿大衛生部公告都沒有公開技術根因、電芯供應商、生產批次範圍、實驗室報告，或美加版本的完整對照關係。現有資料也無法證明所有 XO Poppy 行動電源都受影響、所有列名產品採用完全相同的內部設計，或製造地越南本身造成這項風險。前述追溯與召回準備建議屬於 ZIMONAI 編輯分析；受影響產品、消費者行動與法律要求，仍應以相關市場的正式公告為準。'
      },
      ankerMagGo2Pro: {
        topic: 'IFA 2026 新品新聞',
        published: '2026 年 9 月 3 日',
        readTime: '約 6 分鐘',
        title: 'Anker 在 IFA 2026 推出 MagGo Power Bank 2 Pro：Qi2 25W、主動散熱與智慧顯示一次看',
        description: 'Anker 把 25W 磁吸充電、風扇散熱、10,000mAh 電量、螢幕與支架整合進一顆行動電源。這款新品為何值得注意，還有哪些表現要等上市後才知道？',
        imageAlt: 'Anker MagGo Power Bank 2 Pro 吸附在手機背面，使用者正在活動現場拍攝。',
        imageCaption: 'Anker MagGo Power Bank 2 Pro 官方媒體圖片，由 Anker Innovations 的 IFA 2026 Press Kit 提供；非 ZIMONAI 拍攝、測試或贊助內容。',
        labels: {
          summary: '新聞摘要',
          checklist: '接下來值得觀察',
          limits: '目前仍未確認'
        },
        answer: 'Anker 在 IFA 2026 發表 MagGo Power Bank 2 Pro，把 10,000mAh 電量、最高 25W 的 Qi2.2 磁吸無線充電、主動風冷、智慧顯示器與可調支架整合在同一機身。Anker 表示，美國將於 9 月 17 日上市，定價 109.99 美元，共有三種顏色。比規格本身更值得注意的是：高功率磁吸行動電源的競爭，正從單純追逐瓦數，走向散熱管理與充電狀態可視化。',
        takeaways: [
          '這款新品整合 Qi2.2 25W 無線輸出、45W 回充、10,000mAh 電量、主動散熱、顯示器與內建支架。',
          'WPC 資料庫另有 A110R／Qi-24417 的 MPP25 登錄資料，讓這場發表多了一筆可獨立核對的官方紀錄。',
          '真正的新意不是再多幾瓦，而是把散熱、持續輸出與即時資訊做成消費者看得見的產品功能。'
        ],
        sections: [
          {
            title: 'Anker 這次在 IFA 2026 發表了什麼？',
            paragraphs: [
              'Anker 於 9 月 3 日在柏林 IFA 記者會發表六款充電新品，主軸包括裝置辨識、溫度管理與螢幕顯示。MagGo Power Bank 2 Pro 是其中的行動款：容量 10,000mAh，支援最高 25W Qi2.2 磁吸無線充電與 45W 有線回充，機身側邊螢幕可顯示功率、溫度與剩餘充電時間，背面另有可調式支架。',
              '依 Anker 官方新聞稿，美國上市日為 9 月 17 日，售價 109.99 美元，提供 Phantom Gray、Starlight Silver 與 Polar Night Blue 三色。這些資訊是美國市場安排；其他地區的價格與上市時間，在本文查核時尚未全部公布。'
            ]
          },
          {
            title: '為什麼內建風扇才是這次新品的重點？',
            paragraphs: [
              '無線充電有一部分能量會轉成熱，溫度升高時，手機也可能主動降低充電功率。Anker 這次不再把散熱藏在機身內，而是直接做成產品賣點：官方資料提到風扇控制演算法、雙風道與石墨烯導熱結構，側邊螢幕則把即時溫度與充電狀態顯示給使用者。',
              '這讓 MagGo Power Bank 2 Pro 不只是另一顆標榜「25W」的行動電源。如果主動散熱能讓輸出更穩定，又不帶來惱人的噪音與耐用度問題，它可能成為高階磁吸行動電源的新賣點；代價則是零件與控制邏輯變多，風扇積塵、風道阻塞、耗電與長期可靠性都需要上市後的實測來回答。'
            ],
            items: [
              '風扇運轉時，能否安靜地維持 25W 充電？',
              '風道被手掌、口袋纖維或灰塵部分遮住時，效能會怎麼變化？',
              '多出的散熱零件，會不會明顯影響重量、續航與耐用度？',
              '其他品牌是否會快速跟進風冷與資訊螢幕？'
            ]
          },
          {
            title: '官方紀錄確認了什麼，接下來還要看什麼？',
            paragraphs: [
              'Wireless Power Consortium 的公開資料庫提供了一個可獨立核對的基準：產品名稱為 Anker MagGo Power Bank 2 Pro，製造商料號 A110R，Qi ID 24417，Qi 版本 2.2.1，功率規格為 MPP25，potential load power 為 25.0W，認證日期為 2026 年 8 月 21 日。這能確認精確型號的登錄欄位，但不等於替 Anker 所有速度、溫度與耐用度宣稱背書。',
              '上市後最有價值的資訊，會來自可重複的獨立實測：長時間充電曲線、機身溫度、風扇噪音、炎熱環境下的表現，以及使用數月後的磨耗。對整個市場而言，更值得觀察的是主動散熱會不會成為高階行動電源的常態；對製造與採購端來說，風扇、風道、感測器與韌體也意味著新的零件、組裝與品質控制工作。'
            ]
          }
        ],
        checklist: [
          '美國以外市場的實際上市日與售價',
          '相同條件下的獨立充電速度與溫度測試',
          '風扇噪音、風道受阻與長期耐用度',
          '真實使用時的重量感、攜帶性與支架穩定度',
          '上市後的韌體或硬體版本是否改變表現',
          '其他充電品牌跟進主動散熱設計的速度'
        ],
        limitsText: '截至 2026 年 9 月 3 日，Anker 已公布美國售價、顏色與上市時間，WPC 紀錄也能確認 A110R 的 Qi 登錄欄位；但獨立評測尚未證實長時間充電速度、實際溫度、風扇噪音、電池續航與長期耐用度，所有市場的價格與供貨情況也還沒有完整答案。本文對品類走向與製造複雜度的描述屬 ZIMONAI 編輯判讀，不是 Anker、WPC 或主管機關的結論。'
      },
      reachSvhcDeclaration: {
        topic: '歐盟化學物質文件',
        published: '2026 年 9 月 4 日',
        readTime: '約 7 分鐘',
        title: '供應商給了 REACH／SVHC 聲明，就能證明充電器符合歐盟要求嗎？',
        description: '聲明只有在型號、物料表版本與候選清單基準日都清楚時，才有可追溯價值；它不是 ECHA 核發的產品證書，也不會自動涵蓋後續換料。',
        imageAlt: '小型電路板上的電子零組件，用於說明 REACH 與 SVHC 文件核對。',
        imageCaption: '電子零組件編輯用照片；不是 ZIMONAI 客戶、供應商、充電器、工廠、查核樣品、實驗室結果或合規紀錄。',
        answer: 'REACH／SVHC 聲明整理特定充電器的型號、物料表版本、候選清單日期與零件判定依據，形成可追溯的材料紀錄。REACH 第 33 條關注候選清單物質超過門檻時的資訊傳遞；「REACH compliant」這類籠統聲明並非 ECHA 產品證書，也不會涵蓋後續換料與其他義務。海外買家採購時，聲明要能連回當期物料表和零件證據才有決策價值；ZIMONAI 的判讀是，這類文件應作為材料查核的入口，而非整體合規的結案依據。',
        takeaways: [
          '先核對聲明所指的產品、出具法律主體、物料表版本與候選清單基準日，再閱讀合規結論。',
          '充電器是由多個物件組成的複合產品；0.1% w/w 門檻要套用到其中每個仍屬於「物品」的組成件，不能只拿整機重量稀釋。',
          '把第 33 條資訊傳遞、歐盟市場責任人的 SCIP 義務，以及其他 REACH 限制或授權問題分開查；一句供應商聲明無法一次回答全部問題。'
        ],
        sections: [
          {
            title: 'REACH 第 33 條實際要求什麼？',
            paragraphs: [
              'ECHA 說明，歐盟或歐洲經濟區的物品供應者，如果物品中的候選清單物質超過 0.1% w/w，就必須向專業收受者提供足以安全使用的現有資訊，最低限度要告知物質名稱。消費者提出相同資訊請求時，供應者須在 45 天內免費回覆。這項義務源自物質被納入候選清單，不是由某一種民間測試報告格式或 ECHA 產品批准所產生。',
              '中國出口商可以提供評估所需的上游資料，但 ECHA 的官方摘要是依角色，把面向歐盟市場的義務放在歐盟或歐洲經濟區的生產者、進口商與供應者身上。買家因此還要確認誰把充電器投放歐盟市場、誰已審閱產品資料，不能把出口商的一張信函當成合規鏈的終點。'
            ]
          },
          {
            title: '為什麼一頁「符合 REACH」聲明可能寫得太廣？',
            paragraphs: [
              '歐盟法院在 C-106/14 判決中確認，0.1% 門檻要套用到複合產品裡的每一個物品；ECHA 指引也採用相同原則。對充電器而言，線材、外殼零件、連接器等組成件都可能需要各自追溯。若只把某一物質的重量除以整台充電器的重量，就可能把單一組成件超過門檻的結果稀釋掉。',
              '候選清單會更新，充電器的物料表也可能改版。因此，有判讀價值的聲明至少要寫出精確型號與變體、涵蓋的生產或物料表版本、出具者與日期、候選清單截止日、物質識別或篩查依據、採用門檻及排除範圍。即使舊版聲明是真實文件，也不能自動涵蓋後來更換的塑膠、線材、焊料、黏著劑、連接器或次級供應商。'
            ],
            items: [
              '精確型號、電氣變體及隨附線材或配件',
              '製造商或供應商法律名稱與授權簽署人',
              '物料表或材料清單版本與出具日期',
              '候選清單版本或明確基準日',
              '以各組成物品為基礎的 0.1% w/w 評估',
              '超過門檻時的 SVHC 名稱與安全使用資訊'
            ]
          },
          {
            title: '買家要怎麼測試這份聲明能不能採信？',
            paragraphs: [
              'ZIMONAI 的實務作法，是建立「零件—證據」對照表。先鎖定報價型號與現行物料表，再挑出風險較高的塑膠、線材組件、連接器、塗層、焊料與其他組成物品，逐項連到上游材料聲明、測試證據或書面評估。遇到資料缺口就明確標記，不把缺資料自動解讀成通過。',
              '若供應商申報某項 SVHC 超過 0.1% w/w，應取得物質名稱與足夠的安全使用資訊，再由負責的歐盟市場主體確認第 33 條溝通與 SCIP 申報是否適用。若結論是未超過門檻，也要保留有日期的判定依據與變更管制關係。這能提高可追溯性，但仍屬文件與抽樣證據，不能當成每一件產品或所有 REACH 規則的保證。'
            ]
          }
        ],
        checklist: [
          '充電器、電源適配器與配件的精確型號',
          '聲明出具者、法律主體、簽署與日期',
          '現行物料表或材料清單版本',
          '候選清單基準日與物質識別資訊',
          '各組成物品的 0.1% w/w 評估方式',
          '上游材料聲明、測試報告或評估紀錄',
          '材料與次級供應商變更管制',
          '歐盟進口商或供應者對第 33 條與 SCIP 義務的審查'
        ],
        limitsText: 'REACH／SVHC 聲明是供應鏈文件證據，不是 ECHA 核發的產品證書。它不能單獨證明實驗室結果正確、物料表完整、量產一致、完全不含有害物質、符合所有 REACH 限制或授權規定、已完成 SCIP 申報，也不能證明 RoHS、電氣安全、CE 符合性、工廠身分或出貨品質。第 33 條的 0.1% 是資訊傳遞門檻；含有 SVHC 並不等於已證明消費者會暴露或風險不可接受。若產品識別、候選清單日期或零件層級的判定基礎不完整，結論就應保留為尚未確認。'
      },
      iso9001Factory: {
        topic: '中國工廠查核',
        published: '2026 年 9 月 3 日',
        readTime: '約 8 分鐘',
        title: 'ISO 9001 證書能證明這家中國供應商就是充電器工廠嗎？',
        description: '有效證書能支持所載組織在特定場所與範圍內運作品質管理系統，卻不能證明充電器已獲產品認證，也不能單獨確認誰生產報價型號。',
        imageAlt: '橘色背景上的寫字板與條紋核對單，用於說明 ISO 9001 工廠證據查核。',
        imageCaption: '核對單為編輯用照片；不是 ZimonAI 的供應商、客戶、工廠、稽核、ISO 證書或生產紀錄。',
        answer: 'ISO 9001 證書記錄特定組織、場所與活動範圍內的品質管理系統，並以證書狀態和有效期間界定可採信的範圍。這項管理系統認證不等於充電器產品認證，也不會證明賣方擁有工廠，或本批訂單確實在受認證場所生產。海外買家應把證書持有人、營運地址與製造範圍，連回報價型號和近期生產紀錄；ZIMONAI 的判讀是，證書最適合用來檢驗供應商的管理主張，而不是替實際工廠身分背書。',
        takeaways: [
          '確認發證機構並查詢證書目前狀態；ISO 負責制定標準，本身不替企業發出 ISO 9001 證書。',
          '逐項核對組織名稱、統一社會信用代碼、註冊地址、證書涵蓋的營運地址與製造範圍，不能只看 ISO 標誌或公司名稱。',
          '用型號、製程、物料清單與訂單紀錄把獲證場所連回報價充電器；管理系統認證不是產品認證。'
        ],
        sections: [
          {
            title: '證書由誰發出，又認證了什麼？',
            paragraphs: [
              'ISO 將 ISO 9001 定位為品質管理系統的要求標準。取得認證是自願選擇，查核與發證由獨立認證機構執行；ISO 本身不認證企業，也不發證。因此，第一步應確認證書上的認證機構、官方聯絡方式、證書查詢管道，以及該機構是否能執行所載認證，而不是把供應商 PDF 上的 ISO 標誌當成結論。',
              '在中國境內辦理的品質管理系統認證，目前適用的 CNCA-QMS-01:2025，以 GB/T 19001 及／或 ISO 9001 為認證依據。規則要求稽核涵蓋管理系統與認證範圍內具代表性的產品或服務，同時要求稽核報告說明查核是以抽樣方式進行。證書有效期最長三年，期間仍要接受監督，也可能被暫停或撤銷；今天查到的狀態是有日期的證據，不是永久保證。'
            ]
          },
          {
            title: '法律主體、工廠地址與製造範圍都有對上嗎？',
            paragraphs: [
              'CNCA-QMS-01:2025 要求中國的品質管理系統證書列出獲證組織、統一社會信用代碼、註冊地址、認證涵蓋的營運地址、產品／活動／服務範圍、適用標準、發證與到期日、證書編號、認證機構及查詢管道；多場所組織還須列出認證範圍內的每一個場所。這些欄位能讓買家實際檢驗「這是工廠」的說法，而不是把證書當成裝飾。',
              '請把證書與中國營業執照、報價單、合約、發票資料，以及供應商聲稱的生產地址並排核對。若證書寫的是貿易公司、辦公室、不相關地址，或只涵蓋銷售／服務活動，就不能單憑它支持特定充電器是在受訪工廠製造。資料不一致也不必直接判定造假：OEM、集團關係與分包可能合理，但買家在採信前仍須取得可追溯的關係文件。'
            ],
            items: [
              '獲證法律名稱與統一社會信用代碼',
              '註冊地址與所有受認證涵蓋的營運場所',
              '與充電器相關的製造活動及產品範圍',
              '證書編號、發證日、到期日與目前狀態',
              '認證機構，以及有聲稱時的認可範圍',
              '賣方、證書持有人與實際工廠的書面關係'
            ]
          },
          {
            title: '還需要哪些證據，才能連到這款充電器與本批訂單？',
            paragraphs: [
              'ISO 的符合性說明提醒，管理系統認證標誌不能放在產品上而使人誤以為產品本身獲得認證。這項界線很重要：ISO 9001 可以支持一個組織如何管理流程，卻不能證明充電器已符合電氣安全、EMC、化學物質、效能或目的市場法規。',
              'ZimonAI 的實務做法，是把四段關係明確接起來：賣方到獲證法律主體、獲證主體到認證涵蓋的製造地址與範圍、工廠到報價型號／製程／現行物料清單，以及型號到本批訂單的樣品、生產排程與檢驗紀錄。現場可抽查型號專用作業指導書、進料與出貨檢驗標準、不符合與矯正措施紀錄，以及追溯範例。這些資料不能把抽樣查核變成保證，但能測試證書所述系統是否真的運用在買家要採購的產品上。'
            ]
          }
        ],
        checklist: [
          '證書原始編號、認證機構與官方查詢管道',
          '記錄查詢日期與有效、暫停、撤銷或過期狀態',
          '獲證中文法律名稱及統一社會信用代碼與營業執照一致',
          '註冊地址、實際生產地址與證書所列全部場所相符',
          '認證範圍明確涵蓋相關製造活動與產品',
          '賣方、證書持有人、品牌方與生產工廠的書面關係',
          '報價型號、規格、物料清單與製程流程可連回該場所',
          '近期且與型號相關的生產、檢驗、追溯與矯正措施紀錄'
        ],
        limitsText: 'ISO 9001 證書是針對所載組織、場所、範圍與有效期間的管理系統證據；不能證明工廠所有權、賣方授權、產品認證、精確型號合規、市場准入、產能、財務狀況、勞動或環境表現、智慧財產權及本批出貨品質。認證稽核與買家查核都採用抽樣，紀錄也可能不完整或在訪查後改變。若法律主體、營運場所、認證範圍或證書狀態無法獨立對應，就應把工廠關係保留為未確認，而不是拿證書替它背書。'
      },
      rohsTestReport: {
        topic: '歐盟限用物質合規',
        published: '2026 年 9 月 1 日',
        readTime: '約 7 分鐘',
        title: '供應商給了 RoHS 測試報告，就能證明這款充電器符合歐盟要求嗎？',
        description: '測試報告可以支持列明樣品與材料的結果，但不能取代精確產品的技術文件、EU 符合性聲明與量產管制。',
        imageAlt: '電路板上電子元件與焊接部位的近景照片，用於說明 RoHS 證據查核。',
        imageCaption: '電路板為編輯用圖片；不是 ZimonAI 的供應商、客戶、工廠、充電器、送測樣品或合規紀錄。',
        answer: 'RoHS 測試報告記錄指定樣品或均質材料的測試方法、受測物質與結果，讓買家了解這次檢測實際涵蓋的對象。報告上的 Passed 不會自動延伸到整台充電器、未送測材料或後續替代料，也不會取代適用豁免、技術文件、EU 符合性聲明與量產變更管制。海外買家應確認樣品、型號和材料都與當期物料表吻合；ZIMONAI 的判讀是，測試報告只是產品證據鏈中的一張快照，完整合規仍要回到產品與量產紀錄。',
        takeaways: [
          '先看送測樣品，而不是先看封面上的 Passed：產品／材料身分、型號、零件、顏色、方法、物質、結果與限值都要讀得到。',
          '把每個樣品連回報價型號當下的 BOM 與均質材料；一項材料通過，不能自行延伸到沒有送測的變體。',
          '另外索取製造商現行的 RoHS 技術文件與 EU 符合性聲明，豁免狀態與量產變更也要分開查。'
        ],
        sections: [
          {
            title: '報告寫著 Passed，實際能確認到哪裡？',
            paragraphs: [
              '歐盟執委會目前列出十項 RoHS 限用物質。《2011/65/EU 指令》第 4 條與附錄 II 採「均質材料」計算濃度：鎘的最高容許濃度為 0.01%，其餘九項為 0.1%，並須再考慮指令的排除範圍與特定用途豁免。所以，成品頁面只寫「RoHS compliant」，還沒有回答哪些材料實際受到評估。',
              'IEC 62321-2 處理分析前的拆解、分離與樣品製備策略。閱讀實驗室報告時，必須回到實際樣品描述與製備方式。ZimonAI 的實務判讀是：某一個樣品通過，只能支持該樣品所代表的材料或零件；報告沒有列出的塑膠、塗層、焊料、線材、連接器或後來換用的供應來源，不會因此自動受到涵蓋。'
            ]
          },
          {
            title: '為什麼不能用一份報告取代整套 RoHS 文件？',
            paragraphs: [
              '現行指令第 7 條要求製造商建立技術文件、執行內部生產管制、簽署 EU 符合性聲明、加貼 CE 標誌、保存文件十年，並維持量產持續符合的程序；第 13 條則明定，製造商簽署聲明時承擔產品符合 RoHS 的責任。實驗室出具報告，不會接手這些法律責任。',
              '歐盟《2020/659 號執行決定》將 EN IEC 63000:2018 列為 RoHS 調和標準；IEC 對 IEC 63000 的說明，是規範製造商為宣告限用物質符合性所彙整的技術文件。它是一套文件評估架構，不是歐盟中央機構核發的「RoHS 證書」。就採購查核而言，測試報告應被放進產品結構、材料／供應商證據、風險判斷、豁免與型號聲明可以彼此連結的證據鏈。'
            ],
            items: [
              '製造商，以及精確產品／型號的識別資料',
              '現行 BOM、零件版本與材料版本',
              '上游材料聲明及相應測試證據',
              '均質材料評估與尚未補齊的風險項目',
              '附錄 III／IV 豁免的用途、範圍與有效狀態',
              '更新後的 EU 符合性聲明與變更紀錄'
            ]
          },
          {
            title: '付款前，買家要怎麼把報告對回報價充電器？',
            paragraphs: [
              '把報價單、產品銘牌、樣品、BOM 與測試報告並排。逐項核對報告編號與日期、申請單位、製造商、型號、樣品照片、材料或零件名稱、顏色、實驗室、測試方法、受測物質與結果。若報告只涵蓋線材、外殼樹脂、PCB 樣品或部分零件，就要追問剩餘均質材料由什麼證據支持；多瓦數、不同插頭或不同顏色共用報告時，也要有材料與型號的書面對照。',
              '豁免必須查當下狀態。歐盟執委會說明，RoHS 豁免有期限且會定期重審，續期申請也可能影響紙面到期日後的狀態。保存實際豁免文字與查詢日期，並確認產品類別和用途吻合。第 7 條同時要求把設計、特性、標準及技術規範的變更納入考量；因此，ZimonAI 會把材料、零件供應商、PCB 或線材更換視為重新檢視證據的觸發點，而不是直接判定不合格，也不是讓舊報告一概沿用。'
            ]
          }
        ],
        checklist: [
          '完整品牌、型號、修訂版、插頭、連接埠、瓦數與顏色',
          '報告編號、日期、申請單位、製造商與實驗室',
          '可連到材料／零件識別碼的樣品照片與描述',
          '測試方法、物質、結果、單位與報告限值',
          '現行 BOM，以及每份報告／聲明與產品的對照',
          '附錄 III／IV 豁免的用途與現行狀態',
          '製造商技術文件與已簽署的 EU 符合性聲明',
          '變更管制，以及依風險安排的量產或出貨驗證'
        ],
        limitsText: 'RoHS 報告只能支持其列明的樣品、方法與結果；不能證明中國賣方的法律主體、工廠所有權、使用他人文件的授權、電氣安全、EMC、REACH、產品效能、產能或本批貨物品質，也不能證明未送測材料、後續替代料或每一件量產品都與樣品一致。精確充電器是否落入指令範圍、能否使用某項豁免，以及技術文件是否充分，都要依實際產品與當下有效規則判斷；仍有疑義時，應向負責的經濟營運者或會員國主管機關確認。'
      },
      euSafetyGate: {
        topic: '歐盟市場監管',
        published: '2026 年 8 月 30 日',
        readTime: '約 7 分鐘',
        title: '歐盟 Safety Gate 查不到這款充電器，就能把它視為安全嗎？',
        description: 'Safety Gate 收錄主管機關通報的危險產品與矯正措施；查無結果，不是對充電器、供應商或出貨批次的安全核准。',
        imageAlt: '大理石桌面上的電源適配器與 USB-C 線材，用於說明歐盟 Safety Gate 查核。',
        imageCaption: '電源適配器與線材為編輯用圖片；不是 ZimonAI 的供應商、客戶、查核、召回或產品安全證據。',
        answer: 'Safety Gate 彙整歐盟會員國提交的危險產品通報與矯正措施，讓買家掌握特定型號、風險和後續處置。這套系統不是上市前核准或安全產品名單；搜尋沒有結果，只代表當次使用的名稱、型號與篩選條件未找到公開通報。海外買家遇到相符紀錄時，應立即核對型號與批次；ZIMONAI 的判讀是，Safety Gate 適合作為風險升級依據，空白結果仍須搭配產品和出貨證據。',
        takeaways: [
          '查到相符通報時，把它視為必須立即核對型號與批次的官方市場後風險證據；不能直接延伸成該供應商所有產品都有同一問題。',
          '不要只輸入一種名稱；應比對通報編號、產品描述、品牌、Model／Type、照片、風險與採取措施。',
          '查無通報只是完成一項資料庫檢查；型號聲明、測試報告、標籤、可追溯性與量產一致性仍要繼續查。'
        ],
        sections: [
          {
            title: 'Safety Gate 的一筆通報，實際能確認什麼？',
            paragraphs: [
              '歐盟《2023/988 號規則》第 25、26 條把 Safety Gate 定義為交換危險產品矯正措施資訊的快速預警系統。會員國通報主管機關或經濟營運者已採取的措施，再由歐盟執委會檢查並傳送符合要求的通報。因此，一筆紀錄支持的是市場監管發現與後續措施，不是產品上市前取得的證書。',
              '歐盟執委會《Safety Gate 2025》報告把流程寫得很清楚：國家主管機關先在市場上辨識危險產品，接著通報措施，執委會傳送資訊，其他主管機關再查自己的市場，最後由公開入口發布摘要。這能支持特定產品、風險與措施之間的關係，不能證明外觀相似、輸出不同或同一賣方的其他產品都有相同缺陷。'
            ]
          },
          {
            title: '買家要怎麼把通報對回報價型號？',
            paragraphs: [
              '歐盟執委會說明，公開入口可以依不同條件搜尋危險產品、打開通報細節並匯出結果。先用完整品牌與 Model／Type 查一次，再依報價單、標籤、包裝與產品上的有效識別資料，換用具辨識力的型號片段、產品類別或其他欄位重查。查詢日期、篩選條件與通報編號都應保存，讓他人可以重做。',
              'ZimonAI 的實務判讀，是把通報與報價資料並排，逐欄使用當頁可見資訊：產品描述、品牌、Model／Type、條碼或其他代碼、照片、原產國、通報風險、被指出的不符合事項、受影響批次與矯正措施。只有共用外殼，或都被稱為「USB 充電器」，不足以把兩款產品連在一起。'
            ],
            items: [
              'Safety Gate 通報編號與查詢日期',
              '完整品牌、Model／Type 與所有尾碼',
              '產品照片、插頭、連接埠、瓦數與標籤版面',
              '頁面有列明時的條碼、批次或其他產品代碼',
              '原產國，以及可取得時的經濟營運者名稱',
              '風險內容、被引用要求與矯正措施'
            ]
          },
          {
            title: '查到或查不到之後，採購決策怎麼走？',
            paragraphs: [
              '若重要識別資料合理相符，先暫停採信供應商的安全說法，確認報價型號、修訂版或批次是否真的落入通報。要求製造商提出矯正措施、更新後的型號證據，並向目的市場主管機關確認當下狀態。撤市、召回、禁售或移除網路商品頁等措施，都應照通報原文判讀，不能淡化成一句「以前的小問題」。',
              '若查無相符通報，採購審查仍要繼續。充電器通常還要把精確製造商與型號，連到適用的符合性聲明、安全與 EMC 證據、標籤與額定值、歐盟經濟營運者、樣品結構及約定的量產管制。這是 ZimonAI 的證據處理建議，不是歐盟執委會對某一款產品作出的安全或不安全認定。'
            ]
          }
        ],
        checklist: [
          '完整品牌、型號、修訂版、插頭、連接埠與額定功率',
          '使用完整識別資料與有效型號片段進行 Safety Gate 搜尋',
          '保存查詢日期、篩選條件、通報編號與必要的匯出結果',
          '逐欄比對通報照片、代碼、風險與矯正措施',
          '合理相符時，取得供應商書面說明與矯正措施證據',
          '另行核對精確型號的聲明、測試證據、標籤與歐盟可追溯資料',
          '依訂單風險安排出貨或量產一致性管制'
        ],
        limitsText: 'Safety Gate 通報只能支持該筆紀錄所描述的產品、風險與矯正措施；不能自動找出每一個品牌背後的中國工廠、證明供應商所有產品都有危險，也不能因外觀相似就認定是同一款。反過來，公開查無結果也不能證明產品安全、已取得市場准入、證書真實、工廠所有權、賣方授權、量產持續一致或本批出貨品質。國家主管機關可以更新或撤回通報，搜尋結果也會受識別資料、篩選條件、語言與查詢日期影響。'
      },
      ieceeCbCertificate: {
        topic: '國際安全認證',
        published: '2026 年 8 月 28 日',
        readTime: '約 7 分鐘',
        title: '供應商拿出 IECEE CB 測試證書，這款充電器就能銷往所有市場嗎？',
        description: 'CB 證書有助於申請各國認證，但買家仍要核對官方紀錄、精確型號、簽發機構與目的國要求。',
        imageAlt: '黃色背景上的白色電源適配器，用於說明 IECEE CB 證書查核。',
        imageCaption: '電源適配器為編輯用圖片；不是 ZimonAI 的供應商、客戶、實驗室、證書或市場准入證據。',
        answer: 'IECEE CB 測試證書記錄選定樣品依特定標準完成的評估，可為後續申請目的國認證提供技術基礎。證書不含持續性的工廠監督，也不代表所有市場已自動准入；目的國仍可能另有國家差異、標誌、登錄或其他程序。海外買家應把現行官方狀態、精確型號、額定值、標準版本與簽發機構對回報價產品；ZIMONAI 的判讀是，CB 證書的價值在於協助走完目的國認證，而非充當全球通行證。',
        takeaways: [
          '用證書編號回到 IECEE 官方資料庫查詢，不要只看供應商寄來的 PDF、標誌或報告封面。',
          '逐項比對型號、額定值、品牌、製造商、標準版本與 National Differences，不能把同外殼或同系列直接視為受涵蓋。',
          '向目的國主管機關或 NCB 確認還需要哪些國家認證、標誌、登錄或工廠監督。'
        ],
        sections: [
          {
            title: '官方紀錄顯示「Valid」，究竟能確認什麼？',
            paragraphs: [
              'IECEE 公開證書平台明確說明，它是查找各 NCB 證書的平台，頁面顯示的只是證書與報告摘要，完整資料仍由證書持有人提供。平台同時交代，CB Scheme 依 ISO/IEC 17067 type 1a 對選定樣品進行測試並簽發證書，沒有持續性的工廠監督。因此，「Valid」能支持一筆特定證書紀錄，不能延伸成每一件量產品持續受認可。',
              'IEC 也說明，Test Report Form 只有在經核准的 CB Testing Laboratory 簽署，並附於 NCB 簽發的 CB Test Certificate 時，才構成有效的 CB Test Report。單獨一份測試報告、實驗室標誌或 IEC 標準編號，都不能代替完整的 CB 文件組合。'
            ]
          },
          {
            title: '證書要怎麼對回報價的充電器？',
            paragraphs: [
              'IECEE 官方結果會呈現證書狀態與編號、產品、製造商、主要額定值、品牌、Model／Type Ref.、採用標準、National Differences、簽發日期與 NCB。買家應把這些欄位與報價單、產品標籤、包裝、樣品及規格書並排，包含型號尾碼、瓦數與連接埠配置都照原文比對。',
              'ZimonAI 的實務判讀，是先釐清每一個公司名與型號差異，再決定是否能依賴該紀錄。OEM 品牌、貿易公司或新增型號不必然有問題，但供應商要提出書面關係與型號涵蓋證據。若官方資料庫查不到，IECEE 要求使用者聯絡證書持有人或簽發 NCB；查無紀錄是待確認，不是可以直接寫成偽造的結論。'
            ],
            items: [
              '證書編號、狀態與簽發日期',
              '產品描述與完整 Model／Type Ref.',
              '輸入、輸出、瓦數、保護等級與連接埠配置',
              '製造商、申請人、品牌與賣方之間的關係',
              '紀錄列明的 IEC 標準與版本',
              'National Differences 與簽發 NCB'
            ]
          },
          {
            title: '有 CB 證書，還要辦目的國的認證嗎？',
            paragraphs: [
              '通常仍要確認。現行 IECEE 基本規則把會員對 IECEE 文件的承認，放在授予 National Mark 或其他國家認可的機制下；IEC 官方說明也指出，在納入相關國家差異後，產品的國家層級核准與認證會更容易。這代表 CB 文件能協助申請，並不等於目的國已自動核准。',
              '付款前先固定銷售國家，再向該國主管機關或 NCB 確認國家差異、插頭要求、認證標誌、登錄及工廠監督。這是 ZimonAI 依官方制度邊界作出的證據判讀，不是任何 NCB 對特定產品或市場作出的准入決定。'
            ]
          }
        ],
        checklist: [
          '附查詢日期的 IECEE 官方結果',
          '證書編號、狀態、簽發日期與 NCB',
          '完整品牌、製造商、型號與 Type Ref.',
          '輸入／輸出額定值、瓦數、保護等級與連接埠配置',
          'IEC 標準、版本與列明的 National Differences',
          '與證書相連、由核准 CBTL 簽署的 CB Test Report',
          '另外確認目的國的准入與工廠監督要求'
        ],
        limitsText: 'CB Test Certificate 只能支持證書所列標準、選定樣品與涵蓋範圍；不能證明中國賣方就是製造商或授權經銷商、工廠擁有該證書、每批出貨都與送測樣品一致，或產品已滿足所有國家規則。EMC、無線、能效、限用物質、插頭、標示、登錄、運輸與合約要求，可能各自需要證據。公開資料庫只是摘要；狀態或細節不清時，應向證書持有人或簽發 NCB 確認。'
      },
      usbIfCertification: {
        topic: 'USB 充電器認證',
        published: '2026 年 8 月 26 日',
        readTime: '約 7 分鐘',
        title: '報價寫著「USB PD」，就能證明 GaN 充電器通過 USB-IF 認證嗎？',
        description: 'USB PD 是供應商宣稱支援的技術；要證明 USB-IF 認證，還要找到精確產品紀錄，並把公司、型號與 TID 對起來。',
        imageAlt: '電源適配器旁的 USB-C 線材照片，用於說明 USB-IF 充電器紀錄核對。',
        imageCaption: '電源適配器與 USB-C 線材為編輯用圖片；不是 ZimonAI 的供應商、客戶、實驗室或認證證據。',
        answer: 'USB-IF 認證會把通過適用測試程序的產品，以公司、型號、產品類別、認證日期與 TID 列入官方紀錄。報價中的「USB PD」、「USB-C」或「GaN」只是技術主張；這些字樣、晶片能力或相似外殼，都不等於精確產品已列名，也不涵蓋電氣安全和市場准入。海外買家應把官方紀錄對回報價型號、功率與連接埠配置；ZIMONAI 的判讀是，查核重點不在熱門標示，而在這款產品是否具有可追溯的認證身分。',
        takeaways: [
          '先問清楚供應商是在宣稱支援 USB 規格，還是在宣稱取得 USB-IF 認證；兩者需要的證據不同。',
          '用精確產品與公司名稱查 USB-IF Product Search，並保存 TID、型號、類別、認證日期與查詢日期。',
          'OEM 名稱、額外型號尾碼、連接埠或瓦數配置不同時，都要補出關係，不能因外殼相同就自行連結。'
        ],
        sections: [
          {
            title: 'USB PD 宣稱與 USB-IF 認證差在哪裡？',
            paragraphs: [
              'USB-IF 將 Compliance Program 說明為一套使用 Test ID 追蹤的測試規範。產品通過後，才會被視為 USB-IF certified、加入 Integrators List，並有機會取得 USB-IF 標誌的授權。報價只寫「USB PD」或「USB-C」，還沒有呈現這些步驟。',
              '官方標誌指引對充電器說得更明確：Certified USB Charger 與 Certified USB Fast Charger 標誌，只能用在通過適用 USB-IF 測試程序、並已列入 Integrators List 的產品；瓦數也是標誌圖稿的一部分。因此，貼上一張標誌圖片、提供 USB Power Delivery 測試報告，或只證明控制晶片支援功能，都不能取代精確產品紀錄。'
            ]
          },
          {
            title: '官方產品紀錄要核對哪些欄位？',
            paragraphs: [
              'USB-IF Product Search 只收錄已獲准使用 USB-IF 標誌的認證產品。公開頁面預設顯示近兩年的紀錄，查較舊產品時要調整日期範圍。USB-IF 也提醒，認證日期超過兩年的產品未必符合目前版本的 Compliance Program；所以找到舊紀錄後，仍要保留日期並交代它的時效背景。',
              'ZimonAI 的實務判讀，是把報價、產品標籤、包裝與官方結果並排。連結關係必須落到產品層級，不能從企業會員身分、元件認證，或另一款共用外殼的充電器直接推論。'
            ],
            items: [
              '列名公司，以及它與中國賣方的關係',
              '完整產品名或型號，包括尾碼與修訂版',
              'Test ID（TID）、產品類別與認證日期',
              '單孔或多孔充電器類別',
              '認證標誌瓦數與報價的單孔／總輸出',
              '附查詢日期的報價、標籤、包裝與官方結果'
            ]
          },
          {
            title: 'OEM 或相似型號，可以沿用另一款充電器的認證嗎？',
            paragraphs: [
              '有可能，但必須走 USB-IF 承認的程序。USB-IF 把 OEM arrangements 與 Qualification by Similarity 列為認證途徑；相似性政策也明定，只有 USB-IF 的 compliance committee 與 certification review board 能核准 Qualification by Similarity。獲准後，新產品會取得新的 TID，並加入 Integrators List。',
              'USB-IF 的型號政策允許只有外觀差異的多個產品名或型號共用一個 TID，但會影響 USB 相容性的差異不能藏在萬用字元後面。針對多孔 GaN 充電器，連接埠配置、功率分配、韌體或標示瓦數不同時，應請供應商提出文件說明，不能當成只有顏色不同。這是 ZimonAI 的證據判讀方式，不是 USB-IF 對個別供應商作出的認定。'
            ]
          }
        ],
        checklist: [
          '完整品牌、產品名、型號、修訂版與連接埠配置',
          '宣稱類型：支援 USB 規格，或已取得 USB-IF 認證',
          'USB-IF Product Search 結果與查詢日期',
          '列名公司、TID、產品類別與認證日期',
          '標誌與瓦數用法是否對應報價產品',
          '名稱不同時的 OEM 或 Qualification by Similarity 關係',
          '另行確認的安全、市場准入與出貨一致性證據'
        ],
        limitsText: 'USB-IF 紀錄處理的是該列名所代表的 USB 相容性範圍；不能證明產品真的採用 GaN 元件、取得電氣安全認證、符合特定市場法規、自有工廠、賣方有銷售授權、量產持續一致、每一種連接埠組合都達到廣告效能，或這批出貨品質合格。公開查不到結果時，尤其要先排除日期篩選與型號差異；它是待補資料，不是可以直接寫成不實宣稱的證據。'
      },
      euEconomicOperator: {
        topic: '歐盟市場可追溯性',
        published: '2026 年 8 月 22 日',
        readTime: '約 6 分鐘',
        title: '充電器上的歐盟聯絡地址，能證明中國供應商已合規嗎？',
        description: '歐盟經濟營運者的地址能幫助追溯產品，但它本身無法把中國賣方、精確型號與必要合規文件連起來。',
        imageAlt: '桌面上擺放的充電器照片，用於說明歐盟產品可追溯性。',
        imageCaption: '桌面上的充電器為編輯用圖片；不是 ZimonAI 的供應商、客戶、查核現場或合規紀錄。',
        answer: '歐盟經濟營運者的名稱與地址，為適用產品提供歐盟境內可辨識的聯絡點，也是市場監管和索取文件的追溯入口。這項聯絡資料不會證明中國賣方就是製造商，也不替精確型號、EU 符合性聲明或每批出貨的符合性背書。海外買家應先確認聯絡方的法律角色，再連結中國賣方、製造商、歐盟營運者與產品文件；ZIMONAI 的判讀是，地址的價值在於建立責任鏈，而不是製造產品已獲歐盟認可的表象。',
        takeaways: [
          '先逐字記下產品、包裝或隨附文件上的歐盟聯絡資料，再確認它扮演的法律角色。',
          '製造商、歐盟進口商或授權代表要分開問，也要分開索取對應報價型號的文件。',
          '能聯絡到歐盟窗口，只是證據鏈的一環，不能取代型號、文件與出貨的核對。'
        ],
        sections: [
          {
            title: '歐盟經濟營運者的地址，能確認什麼？',
            paragraphs: [
              '歐盟《2019/1020 號規則》要求，落在其範圍內的產品進入市場前，須有設立於歐盟境內的經濟營運者。該營運者的名稱、註冊商號或商標，以及包含郵寄地址的聯絡資料，必須標示在產品、包裝、包裹或隨附文件上。',
              '對買家而言，這個地址值得原樣保留：它是產品進入歐盟市場時可被辨識的聯絡點。它卻不能證明該地址就是報價的中國公司、該公司擁有工廠，或標示的充電器與報價產品是完全相同的電氣版本。'
            ]
          },
          {
            title: '它是製造商、進口商，還是授權代表？',
            paragraphs: [
              '角色不同，該追問的資料也不同。歐盟官方說明，進口商是設立於歐盟、把來自非歐盟國家的產品投放到歐盟市場的自然人或法人；授權代表則是由製造商委任、代為處理特定工作的對象，並不當然等於製造商或賣方。',
              '歐盟委員會指出，進口商須確認非歐盟製造商已完成必要步驟、所需文件可於要求時提供，且製造商能隨時聯絡。因此，看到聯絡地址後，下一步應是問清角色與文件，而不是直接下結論說中國供應商已獲認可。'
            ],
            items: [
              '歐盟聯絡人名稱與郵寄地址（照標示原樣記錄）',
              '宣告角色：製造商、進口商或授權代表',
              '中國製造商的完整法律名稱與地址',
              '中國賣方與歐盟經濟營運者不同時，兩者關係的書面說明'
            ]
          },
          {
            title: '怎麼把聯絡地址連回正在採購的充電器？',
            paragraphs: [
              '先固定報價的型號、額定值、插頭版本與品牌，再與 EU 符合性聲明及責任鏈可提供的技術資料比對。若文件無法顯示涵蓋報價變體，只寫品牌名稱或模糊的系列說明，都還不夠。',
              'ZimonAI 的實務判讀，會把四段關係分開：中國賣方與製造商、製造商與歐盟營運者、歐盟營運者與文件、文件與精確型號。任何一段連不起來，都應列為待補資料，不能直接當作不實宣稱的定論。'
            ]
          }
        ],
        checklist: [
          '顯示歐盟聯絡資料的產品、包裝或文件照片／掃描檔',
          '精確充電器型號、品牌、插頭版本與電氣額定值',
          '中國製造商的法律名稱與地址',
          '歐盟營運者的角色與書面關係說明',
          '可識別報價型號或可合理支持型號範圍的 EU 符合性聲明',
          '可提供支持文件的狀態與核對日期'
        ],
        limitsText: '歐盟經濟營運者的聯絡資料可支持產品可追溯性，也可能成為索取文件的入口；但它本身不能證明產品安全、CE 合規、工廠所有權、賣方授權、文件持續有效，或每一批出貨都一致。實際義務也會隨產品功能與適用的歐盟規則而異。'
      },
      legalEntity: {
        topic: '供應商身分',
        published: '2026 年 8 月 20 日',
        readTime: '約 6 分鐘',
        title: '付款給中國供應商以前，先找出英文名稱背後的法律主體。',
        description: '如何用中文企業名稱與統一社會信用代碼，核對合約、收款帳戶、營業執照與認證持有人。',
        imageAlt: '合約與鋼筆的近景照片，用於說明供應商法律主體查核。',
        imageCaption: '合約上的名稱，必須能連回登記主體與預計收款人，才有判讀價值。',
        answer: '完整中文企業名稱、18 位統一社會信用代碼，是中國供應商法律主體的穩定識別基準，也能連回官方公示紀錄。登記資料只支持查詢當下可見的主體身分與狀態，不會證明該公司自有工廠、具備足夠產能，或一定履行下一筆訂單。海外買家付款前，應比對登記主體、合約方、發票方、銀行收款人與認證持有人；ZIMONAI 的判讀是，這項查核的重點不在名稱看起來一致，而在確認誰收款、誰負責。',
        takeaways: [
          '中文企業名稱要照營業執照保留原字，不要自行修成比較順眼的版本。',
          '搭配 18 位統一社會信用代碼，可降低同名與英文譯名造成的誤判。',
          '查到登記資料，只能證明主體與當下可見紀錄，不能直接證明工廠產能。'
        ],
        sections: [
          {
            title: '英文名稱為什麼不夠用',
            paragraphs: [
              '供應商可能使用英文譯名、品牌名、香港公司名稱或平台店名，這些名稱不一定與中國大陸實際簽約主體一致。同一個中文名稱也可能有不只一種合理英譯。名稱不同不必然代表詐騙，但代表買家還沒找出究竟是哪一家公司承擔義務。',
              '最穩定的比對基準，是營業執照上的中文企業名稱，加上統一社會信用代碼。這兩項資料可以原樣放到營業執照、公示紀錄、合約、發票與付款指示之間交叉核對。'
            ]
          },
          {
            title: '官方公示系統能確認哪些資料',
            paragraphs: [
              '國家企業信用信息公示系統是中國企業登記與公示資訊的法定平台。依個別主體與當時可見資料，可能查到登記備案、經營狀態、企業年報、行政處罰、經營異常等資訊。',
              '查核時要留下查詢日期與實際使用的欄位。公開資料可能更新，部分內容由企業申報，暫時無法連線也不能直接寫成「公司不存在」。'
            ],
            items: [
              '中文企業名稱與統一社會信用代碼',
              '登記狀態與成立日期',
              '登記地址與法定代表人',
              '經營範圍文字',
              '可取得的經營異常與行政處罰紀錄'
            ]
          },
          {
            title: '付款前，至少做一次四方比對',
            paragraphs: [
              '把登記主體、合約簽約方、發票開立方與銀行收款人排在一起看。如果收款公司不同，應先請供應商用書面說明彼此的商業與法律關係，再決定是否接受。',
              '認證文件也要用同樣方式核對。認證持有人與賣方不同，可能有合理的製造、經銷或品牌關係；但供應商仍應說清楚關係，並提出能涵蓋報價型號的證據。'
            ]
          }
        ],
        checklist: [
          '營業執照上的完整中文企業名稱',
          '統一社會信用代碼',
          '附有查詢日期的公示紀錄',
          '合約簽約方與發票開立方',
          '銀行收款人與帳戶所在地',
          '每一個主體名稱差異的書面說明'
        ],
        limitsText: '企業登記能證明法律主體與查詢當下可見的公示紀錄，不能單獨證明該公司自有工廠、掌握報價產線、具備足夠產能、財務穩健，或一定會履行下一筆訂單。'
      },
      fccId: {
        topic: '美國市場合規',
        published: '2026 年 8 月 20 日',
        readTime: '約 7 分鐘',
        title: '每一款充電器都要有 FCC ID 嗎？先判斷它走哪一種授權程序。',
        description: 'FCC Certification 與 SDoC 是不同程序。先確認產品功能與適用路徑，再決定查不到 FCC ID 是否真的有問題。',
        imageAlt: '電子電路板微距照片，用於說明 FCC 設備授權查核。',
        imageCaption: '先看產品的射頻功能與適用程序，再看標誌或資料庫。',
        answer: 'FCC 設備授權會依產品功能採用不同程序；Certification 程序形成可查詢的 FCC ID 紀錄，供應商符合性聲明（SDoC）則走另一條資料路徑。查不到 FCC ID 不會自動代表產品違規；即使找到有效授權，紀錄處理的仍是適用射頻要求，不延伸到電氣安全、工廠關係或出貨一致性。海外買家應先判斷適用程序，再核對申請人、精確型號、設備類別與公開附件；ZIMONAI 的判讀是，產品功能必須先於資料庫搜尋，才不會用錯路徑。',
        takeaways: [
          '還沒確定適用程序以前，不要把「查不到 FCC ID」直接寫成不合格。',
          '供應商若提供 FCC ID，要繼續核對申請人、產品代碼、型號證據與功能描述。',
          '授權紀錄有效，不代表賣方就是製造商，也不代表出貨批次與測試配置一致。'
        ],
        sections: [
          {
            title: 'Certification 與 SDoC 不是兩種說法而已',
            paragraphs: [
              'FCC 設備授權制度區分 Certification 與供應商符合性聲明。Certification 需要提出申請並取得授權，相關測試須由 FCC 認可的實驗室完成；SDoC 則由責任方確保產品符合要求並提供規定的符合性資訊，但不一定有 FCC ID 可供查詢。',
              '一般有線電源適配器、含數位控制電路的充電器，以及具備通訊或無線供電功能的產品，可能面對不同的規則問題。正確順序是先看產品架構與實際功能，再進資料庫。'
            ]
          },
          {
            title: '查到 FCC ID 以後，還要讀哪些欄位',
            paragraphs: [
              'FCC ID 由申請人代碼與產品代碼組成。找到紀錄後，應繼續比對申請人、設備類別、授權日期、頻段或適用規則、公開附件中的型號，以及標籤與內部照片等資訊。',
              '報價型號可能使用與授權資料不同的行銷名稱。這時應要求型號對照，確認供應商提供的附件確實把商用型號連到受授權設備。'
            ],
            items: [
              '完整 FCC ID，包括字元順序與連字號',
              '申請人名稱及其與供應商的關係',
              '設備類別與實際授權功能',
              '公開附件中的型號資訊',
              '授權日期、附註與允許的配置'
            ]
          },
          {
            title: '有效授權仍然留下哪些問題',
            paragraphs: [
              '授權紀錄只能支持申請資料所描述設備的射頻合規關係，不能證明目前賣方自有工廠、報價產品採用相同物料，也不能保證量產品符合電氣安全、效能或合約要求。',
              '比較可靠的做法，是把三段關係分開確認：賣方與 FCC 申請人、報價型號與授權型號、實際出貨結構與申請時配置。'
            ]
          }
        ],
        checklist: [
          '產品功能與適用的 FCC 程序',
          '完整 FCC ID 或 SDoC 符合性資訊',
          '適用時的美國責任方',
          'FCC 申請人與供應商的關係',
          '報價型號對照',
          '另行確認的電氣安全與品質要求'
        ],
        limitsText: 'FCC 設備授權處理的是適用的射頻要求，不是通用安全認證、供應商身分查核、工廠稽核或產品品質背書，也不能保證出貨品與送測樣品完全相同。'
      },
      ulFile: {
        topic: '北美安全認證',
        published: '2026 年 8 月 20 日',
        readTime: '約 6 分鐘',
        title: '看到 UL 標誌還不能停：檔案號、持有人、產品類別與型號都要對上。',
        description: '如何使用 UL Product iQ 核對供應商的 UL 主張，避免把真實檔案號誤當成所有型號都受涵蓋。',
        imageAlt: '手持多孔電源適配器的照片，用於說明 UL 檔案查核。',
        imageCaption: '外殼相似的產品可能有不同電氣版本，認證範圍仍要回到實際型號。',
        answer: 'UL 檔案號或識別碼能讓買家回到 UL Product iQ，核對認證持有人、產品類別、型號與標誌適用地區。真實檔案不會自動涵蓋共用外殼下的不同瓦數、插腳、電路板或安全元件，也不證明目前賣方與檔案持有人具有授權關係。海外買家應把供應商、認證持有人、產品類別與精確型號連成完整關係；ZIMONAI 的判讀是，UL 查核的重點不在檔案真假，而在報價產品是否確實落在紀錄範圍內。',
        takeaways: [
          '優先查 UL 官方資料庫，不要只看供應商寄來的證書 PDF。',
          '比對精確型號、電氣額定值與產品類別，不只比公司名稱。',
          '賣方、品牌方、工廠與檔案持有人不同時，要請供應商提出可追溯的關係證明。'
        ],
        sections: [
          {
            title: 'Product iQ 可以用什麼資料查詢',
            paragraphs: [
              'UL 將 Product iQ 定位為認證資訊的查詢來源。使用者可依檔案號、公司、型號、產品類別控制號（CCN）等資訊搜尋；部分新版 UL 標誌上的唯一識別碼，也可以用來取得更多認證資訊。',
              '檔案號之所以有用，是因為買家能離開供應商製作的 PDF，自行回到 UL 系統核對。查詢時應保留完整編號、日期與結果。'
            ]
          },
          {
            title: '四段關係必須接得起來',
            paragraphs: [
              '第一步看檔案持有人；第二步看產品類別是否適用；第三步找出精確型號或有文件支持的系列；第四步確認標誌類型與適用地區。',
              '資料不同不一定是假冒。貿易公司可能銷售合作工廠名下的認證產品，OEM 也可能有合理授權；但在買家採信以前，這段關係仍應有可以追溯的說明。'
            ],
            items: [
              '檔案持有人與供應商法律主體',
              '產品類別與相應的 Guide Information',
              '報價型號與列名型號或系列',
              '電氣額定值與結構差異',
              '標誌類型與適用國家'
            ]
          },
          {
            title: '為什麼充電器特別需要核對型號範圍',
            paragraphs: [
              '同一個充電器外殼，可能搭配不同瓦數、連接埠、插腳、PCB 或關鍵安全元件。看到 UL 標誌照片，或找到同系列某一款的有效檔案，都不能直接推論所有變體受到涵蓋。',
              '如果公開紀錄看不到報價型號，應請供應商提供認證函、型號對照或其他由持有人掌握的文件，不要自行假設行銷名稱已包含在內。'
            ]
          }
        ],
        checklist: [
          'UL 檔案號或唯一識別碼',
          '附有查詢日期的 Product iQ 結果',
          '認證持有人',
          '產品類別控制號（CCN）',
          '精確型號或有文件支持的系列對照',
          '供應商與持有人的關係'
        ],
        limitsText: '有效 UL 紀錄不能證明工廠所有權、產能、商業信用或每一件出貨品都符合要求，也不能取代其他市場、無線功能或合約規格所需要的查核。'
      },
      ceMarking: {
        topic: '歐盟市場合規',
        published: '2026 年 8 月 20 日',
        readTime: '約 7 分鐘',
        title: 'CE 是製造商的符合性聲明，不是歐盟中央機構核發的證書。',
        description: '供應商說電源適配器「有 CE」時，買家應索取哪些聲明、型號與技術證據。',
        imageAlt: '藍色背景上的歐規雙圓腳電源適配器，用於說明 CE 文件查核。',
        imageCaption: 'CE 標誌是文件查核的起點，不代表有某個歐盟中央機構核准產品。',
        answer: 'CE 標誌是製造商完成適用的歐盟符合性程序後，對產品符合相關要求作出的聲明；核心文件：EU Declaration of Conformity。歐盟沒有中央機構核發通用的「CE 證書」；標誌、實驗室報告或自願性證書，也不會取代精確型號的技術文件與量產管制。海外買家應把製造商、型號、額定值、適用法規和簽署資料連回產品證據；ZIMONAI 的判讀是，CE 查核重點在文件的法律角色與產品連結，而不是外觀多正式。',
        takeaways: [
          '索取精確型號與製造商對應的 EU Declaration of Conformity。',
          '核對法規、標準、日期、簽署人與產品識別資料。',
          '實驗室報告或自願性證書可以是證據，但不等於取得 CE 標示的法律許可。'
        ],
        sections: [
          {
            title: '「請給我 CE 證書」為什麼不是最好的第一問',
            paragraphs: [
              '歐盟執委會說明，CE 標誌代表製造商聲明產品符合適用的歐盟要求。符合性評估、技術檔案、聲明與標誌，原則上由製造商負責。部分法規允許自行評估，部分產品程序才需要公告機構參與。',
              '因此，一份名為 Certificate of Compliance 的文件可能有參考價值，但它不必然就是建立製造商法律聲明的核心文件。'
            ]
          },
          {
            title: '逐欄閱讀 EU 符合性聲明',
            paragraphs: [
              '聲明應清楚識別產品與負責製造商，讓買家能連回實際採購品。文件應列出適用的歐盟法規與標準，並包含地點、日期、授權簽署人與責任聲明。',
              '電源電子產品依電壓、電磁特性、無線功能、材料與目標市場不同，可能涉及不只一項要求。不要直接套用別款產品的標準清單；應回到實際架構與額定值。'
            ],
            items: [
              '製造商與聯絡資料',
              '精確產品、型號與額定值',
              '適用的歐盟法規',
              '採用的標準或技術規範',
              '地點、日期、姓名、職稱與簽署',
              '只有在程序要求時才會出現的公告機構資料'
            ]
          },
          {
            title: '再把聲明與支持證據交叉核對',
            paragraphs: [
              '把測試報告上的型號、額定值、照片與結構，和報價單及樣品逐項比對。可行時，也要確認出具實驗室與報告的可聯絡性。如果 CE 標誌旁出現公告機構四位數編號，應到 NANDO 確認該機構是否獲授權處理相應法規與程序。',
              '歐盟官方特別提醒，有些自願性證書容易被誤解成受法律承認的 CE 核准。判斷重點不是文件標題看起來多正式，而是它在適用法規中的角色，以及能否連回精確型號。'
            ]
          }
        ],
        checklist: [
          '精確型號與產品額定值',
          '已簽署的 EU Declaration of Conformity',
          '製造商身分',
          '適用法規與標準',
          '能對上同一變體的支持報告',
          '程序確實要求時的公告機構授權範圍'
        ],
        limitsText: 'CE 標示不代表歐盟核准產品，也不表示產品原產地，更不能保證之後每一批量產品持續符合。進口商與經銷商各自應負的責任，也不會因製造商聲明而消失。'
      },
      un383: {
        topic: '行動電源運輸',
        published: '2026 年 8 月 20 日',
        readTime: '約 6 分鐘',
        title: '採購行動電源時，要看 UN 38.3 測試摘要，也要確認它對得上內部電池。',
        description: 'UN 38.3 鋰電池測試摘要應有哪些欄位，以及如何把文件連回實際行動電源型號。',
        imageAlt: '白色行動電源與線材照片，用於說明 UN 38.3 運輸文件查核。',
        imageCaption: '運輸證據必須跟著產品內部的電池種類、型號與瓦時數。',
        answer: 'UN 38.3 測試摘要記錄特定鋰電芯或電池類型的運輸測試資料，包括製造商、實驗室、電池型號、瓦時數、報告資訊與測試結果。這份摘要的證據範圍停在受測電池類型，不延伸到標示容量、循環壽命、電氣安全或本批出貨品質。海外買家應把摘要中的電池型號與瓦時數，連回報價行動電源的當批內部配置；ZIMONAI 的判讀是，真實文件若對不上實際電池，仍不足以支援這筆採購的運輸判斷。',
        takeaways: [
          '測試摘要不是一張只有「UN 38.3」字樣的通用證書圖片。',
          '型號與瓦時數，是把摘要連回行動電源的重要欄位。',
          '通過 UN 38.3 運輸測試，不代表標示容量、循環壽命或整體品質都符合。'
        ],
        sections: [
          {
            title: '官方測試摘要應包含哪些內容',
            paragraphs: [
              '第 38.3.5 節列出測試摘要應提供的資訊，包括電芯、電池或產品製造商、聯絡資料、測試實驗室、唯一報告編號、報告日期、電池描述、測試與結果、採用的手冊修訂版，以及用來確認資訊有效性的簽署。',
              '其中電池描述至少要包含電池種類、重量、瓦時額定值或鋰含量、外觀描述與型號。買家正是靠這些欄位，判斷文件是否屬於正在採購的產品。'
            ]
          },
          {
            title: '最常出問題的不是 PDF，而是型號對不上',
            paragraphs: [
              '供應商可能提供一份真實摘要，但它屬於另一款電芯、電池包或容量。應把摘要上的型號與瓦時數，和物料表、產品標籤、報價單及運輸文件交叉核對。如果同一款行動電源可能使用不同電芯，也要請供應商明確說明這批訂單採用哪一種配置。',
              '足以實質影響既有測試類型的變更，可能需要重新測試。外殼相同或型號相似，都不能直接證明是同一種受測電池。'
            ],
            items: [
              '電池或產品製造商',
              '測試實驗室與聯絡資料',
              '唯一報告編號與報告日期',
              '電池種類、重量與瓦時數',
              '外觀描述與型號',
              '測試項目、結果、手冊版本與簽署'
            ]
          },
          {
            title: '要求提供，不等於每一箱貨都要附一份',
            paragraphs: [
              '聯合國相關說明指出，測試摘要應可提供，但並非設計成每次出貨都必須隨貨附上的文件。買家、貨代或其他有合理需求的單位，都可以提出要求。',
              '建議把摘要和產品規格、運輸資料放在同一個案件檔案裡。如果供應商無法把摘要連回實際電池，應先補齊文件關係，再拿它做物流判斷。'
            ]
          }
        ],
        checklist: [
          '精確行動電源型號與標示容量',
          '內部電池型號與瓦時額定值',
          'UN 38.3 測試摘要',
          '製造商與實驗室聯絡資料',
          '報告編號、日期與手冊版本',
          '書面確認本批產品使用的電池配置'
        ],
        limitsText: 'UN 38.3 處理的是鋰電芯或電池類型的運輸分類測試，不能證明標示容量、充電效能、循環壽命、電氣安全認證、工廠身分或出貨批次品質。'
      }
    }
  },
  'zh-cn': {
    nav: '核查知识',
    hub: {
      metaTitle: '供应商核查知识库｜ZimonAI 智蒙灣',
      metaDescription: '面向充电器、电源适配器和移动电源买家的实务核查文章，梳理中国企业主体、工厂声明、欧盟通用充电器、CCC、Qi2、RoHS、REACH／SVHC、Safety Gate、IECEE CB、USB-IF、FCC、UL、CE 和 UN 38.3 证据。',
      kicker: 'ZimonAI 研究台',
      title: '供应商核查知识库：每一篇，都要能用于付款前的判断。',
      lead: '写给采购充电器、电源适配器和移动电源的海外买家。每篇先用总结交代完整问题、重要边界和实际意义，再展开官方来源与完整证据。',
      featured: '建议先读',
      latest: '二十二篇核查笔记',
      methodLabel: '内容原则',
      methodTitle: '先把问题讲清楚，再谈搜索排名。',
      methodItems: [
        ['优先核对官方来源', '法规、数据库用途和认证规则，优先回到主管部门或认证机构本身。'],
        ['一段掌握完整问题', '总结先整合证据代表什么、边界在哪里，以及这件事为什么影响采购，再展开完整分析。'],
        ['证据边界始终可见', '查到企业、档案号或测试摘要，不会被写成对交付和质量的保证。']
      ],
      nextLabel: '持续更新',
      nextTitle: '我们会定期发布新的核查文章。',
      nextText: '选题会保持在中国供应商核查、充电器和电源电子文件范围内。能否帮助采购判断，比固定凑篇数更重要。'
    },
    taxonomy: {
      searchLabel: '搜索核查文章',
      searchPlaceholder: '输入认证、产品、文件或采购问题',
      searchHint: '可搜索标题、摘要和关键词，例如 FCC ID、UL 档案号或 UN 38.3。',
      clearSearch: '清除搜索',
      filtersLabel: '按主题浏览',
      allCategories: '全部主题',
      productsLabel: '产品',
      allProducts: '全部产品',
      marketsLabel: '市场',
      allMarkets: '全部市场',
      resultsLabel: '搜索结果：',
      resultSingular: '篇核查笔记',
      resultPlural: '篇核查笔记',
      noResultsTitle: '目前没有符合条件的文章。',
      noResultsText: '可以换一个更宽泛的关键词、取消筛选，或浏览全部主题。',
      categoryKicker: '知识分类',
      browseAll: '查看全部核查笔记',
      categories: {
        'supplier-identity': {
          name: '供应商身份与工商资料',
          description: '在采信供应商说法前，先把商号、登记主体、合同签约方和实际收款人连起来。'
        },
        'certification-market-access': {
          name: '认证与市场准入',
          description: '先判断适用的认证或符合性程序，再核对官方记录和文件是否覆盖报价型号及目标市场。'
        },
        'product-transport-documents': {
          name: '产品文件与运输要求',
          description: '把测试概要、声明和运输文件，连回实际采购的产品及电池配置。'
        },
        'factory-onsite': {
          name: '工厂与现场核查',
          description: '规划并判断工厂、产线和现场证据，同时保留一次到访本身不能证明的范围。'
        },
        'commercial-risk': {
          name: '采购、合同与付款风险',
          description: '付款前核对合同条件、付款指示和各交易主体之间的关系。'
        }
      },
      products: {
        general: '通用品类',
        charger: '充电器',
        'power-adapter': '电源适配器',
        'power-bank': '移动电源',
        'gan-charger': 'GaN 充电器'
      },
      markets: {
        china: '中国',
        'united-states': '美国',
        canada: '加拿大',
        'european-union': '欧盟',
        global: '全球标准',
        international: '国际运输'
      }
    },
    ui: {
      read: '阅读核查笔记',
      published: '发布日期',
      updated: '更新日期',
      readTime: '阅读时间',
      quickAnswer: '总结',
      buyerChecklist: '买家核对清单',
      limits: '这些证据不能证明什么',
      sources: '资料来源与核查依据',
      sourcesLead: '本文的事实内容已对照以下一手与独立来源；链接会打开资料发布方的网站。',
      photo: '编辑用图片',
      related: '继续阅读',
      back: '返回知识库',
      editorialCredit: '本文由 ZIMONAI｜智蒙湾科技编辑部制作。'
    },
    articles: {
      appleIphoneDuoFoldableSupplyChain: {
        topic: 'Apple 新品与供应链新闻',
        published: '2026 年 9 月 10 日',
        readTime: '约 7 分钟',
        title: 'Apple 首款折叠机 iPhone Duo 亮相：真正难题远不止一副铰链',
        description: 'iPhone Duo 把双屏、精密铰链、双电池与均热板装进同一台手机，也把折叠机的量产品质推到主流制造议题中心。',
        imageAlt: '上海 Apple Store 与大型 Apple 标志，用作 iPhone Duo 发布新闻的编辑配图。',
        imageCaption: '上海 Apple Store 的编辑图片；不是 iPhone Duo 产品图、Apple 生产场所、ZIMONAI 客户或供应商，也不能证明 Apple 的制造合作方。',
        labels: {
          summary: '新闻摘要',
          checklist: '接下来值得关注',
          limits: '仍待确认'
        },
        answer: 'Apple 9 月 9 日发布首款折叠 iPhone——iPhone Duo，美国起售价 1,999 美元，10 月 16 日预售，10 月 23 日开售。展开后，它提供 7.6 英寸内屏；合上后使用 5.4 英寸外屏；机身内部还有精密铰链、两块电池与均热板。更值得关注的是，Apple 把铰链手感、柔性面板、结构强度、散热路径和双电池匹配一起推向供应链的量产门槛。ZIMONAI｜智蒙湾科技编辑部认为，iPhone Duo 将成为折叠手机能否从新鲜设计走向成熟量产品质的一次重要检验。',
        takeaways: [
          'Apple 正式确认 iPhone Duo 是首款折叠 iPhone，内屏 7.6 英寸、外屏 5.4 英寸，铰链包含 100 多个零件。',
          '内部采用双电池和定制均热板，说明折叠机的工程难度早已不只来自面板与铰链。',
          '价格和上市时间已经公布，但零部件供应商、量产良率、铰链寿命目标与首批出货量仍未公开。'
        ],
        sections: [
          {
            title: 'Apple 这次究竟发布了什么？',
            paragraphs: [
              'iPhone Duo 展开时使用 7.6 英寸 Super Retina XDR 内屏，闭合时通过 5.4 英寸外屏操作。Apple 表示，两块屏幕采用相同比例，内容能够在开合之间连续切换；内屏还使用纳米纹理表面，用于降低反光并减弱折痕的视觉影响。',
              '精密铰链负责支撑展开后的屏幕，并配合磁体完成闭合。Apple 称铰链包含 100 多个零件，机身使用 5 级钛金属与内部加强结构。美国起售价 1,999 美元，首批 70 多个国家和地区将在 10 月 16 日开启预售，10 月 23 日开始发售。'
            ]
          },
          {
            title: '为什么它不是一块“会折叠的屏幕”那么简单？',
            paragraphs: [
              '折叠结构会让多组公差相互影响：铰链既要控制阻尼，又要托平屏幕；盖板、胶层和显示层需要承受反复弯折；中框还要面对扭转、跌落与防护要求。Apple 表示，定制胶黏剂能让显示层之间相对滑动以释放弯折应力，并宣称整机达到 IP68。这些是 Apple 的官方产品声明，还不是长期真实使用表现的完整答案。',
              '内部空间也被重新切分。Apple 在机身两侧各放一块电池，并让 A20 Pro 连接定制均热板。ZIMONAI 的判断是：面板、铰链、电池、热界面、天线和外壳不能只作为单独零件验证；装配后的系统互动与批次波动，才会决定量产手机的一致性。'
            ],
            items: [
              '全开合角度内的铰链扭矩与对位',
              '柔性面板、盖板与胶层的批次一致性',
              '双电池匹配、保护逻辑与热平衡',
              '中框刚性、防护结构与天线集成',
              '反复折叠和温度循环后的整机检验'
            ]
          },
          {
            title: 'iPhone Duo 会怎样影响折叠机供应链？',
            paragraphs: [
              'Apple 入场会为折叠零部件带来更大的市场参照，但并不等于某家面板、铰链或电池厂已经拿到订单。能在工程样机上工作的零件，仍要通过外观、公差、可靠性、良率和交期等量产门槛。更清晰的信号是：折叠手机采购已经从寻找一项新奇零件，转向整机系统集成能力的竞争。',
              '海外买家如果开发折叠或铰接产品，应该按照失效模式索取证据，包括注明测试配置的开合寿命、屏幕与胶材批次追溯、双电池控制、热分布、防护测试条件以及成品检验记录。复制 iPhone Duo 的宣传词并不能获得相同耐用性；报价型号、送检样品和量产流程能否保持一致，才是可验证的问题。'
            ]
          }
        ],
        checklist: [
          '零售版本上市后的独立拆解与内部结构确认',
          'Apple 对内屏、铰链和双电池公布的维修资料',
          'Apple 是否进一步公布耐久测试方法或开合次数',
          '首批用户反馈，并与单一损坏或展示机情况区分',
          '供应商的正式申报或公告，而非匿名产业链传闻',
          '其他折叠品牌后续的定价、保修和零件要求变化'
        ],
        limitsText: 'Apple 已确认产品架构、部分性能声明、价格与发售计划，但没有公布铰链、面板、电池或均热板供应商，也未披露量产良率、出货量、完整验证方法或铰链寿命承诺。美联社与 Axios 提供了独立报道，但不能证明零部件来源或工厂表现。本文对制造和供应链影响的分析来自 ZIMONAI｜智蒙湾科技编辑部，不是 Apple 的结论，也不能证明任何特定供应商参与 iPhone Duo 生产。'
      },
      appleIphone18ProVaporChamber: {
        topic: 'Apple 硬件与制造新闻',
        published: '2026 年 9 月 10 日',
        readTime: '约 7 分钟',
        title: 'iPhone 18 Pro 把散热推上主舞台：均热板不再是隐藏参数',
        description: 'Apple 用 2 纳米 A20 Pro 搭配重新设计的均热板，公开强调持续性能；散热一致性、界面材料与装配控制随之成为焦点。',
        imageAlt: 'Apple Newsroom 官方图片中的酒红色 iPhone 18 Pro 正面与背面。',
        imageCaption: 'Apple Newsroom 发布的酒红色 iPhone 18 Pro 官方新闻素材；不是拆解、散热测试、ZIMONAI 客户设备、供应商样品，也不能证明 Apple 的零件来源。',
        labels: {
          summary: '新闻摘要',
          checklist: '接下来值得关注',
          limits: '仍待确认'
        },
        answer: 'Apple 在 iPhone 18 Pro 发布中把散热工程放到了产品叙事中心。新的 A20 Pro 采用 2 纳米工艺，芯片封装借鉴 M 系列思路，并直接连接面积更大的均热板。Apple 宣称，持续性能最高比上一代提升 40%；9 月 12 日预售，9 月 18 日开售。这里的市场变化很明确：手机性能已经不只比较瞬时峰值，还要看高负载能维持多久。ZIMONAI｜智蒙湾科技编辑部认为，均热板平整度、内部工质、热界面压合与整机装配一致性，将从消费者看不见的零件细节，变成能够直接感知的产品质量。',
        takeaways: [
          'Apple 表示 A20 Pro 采用 2 纳米工艺，并通过新的芯片封装直接连接重新设计的均热板。',
          '最高 40% 的持续性能提升是 Apple 在特定比较条件下的官方主张，不代表所有环境都会出现相同结果。',
          '面积更大的均热板会把热界面、中框接触、装配压力与软件负载同时纳入量产控制，而不是简单更换一个零件。'
        ],
        sections: [
          {
            title: 'iPhone 18 Pro 的内部设计改变了什么？',
            paragraphs: [
              'Apple 9 月 9 日发布 iPhone 18 Pro 与 Pro Max。A20 Pro 使用最新 2 纳米工艺，新的封装方式将主要元件并排放置，再直接连接均热板，让集中在芯片附近的热量更快向外扩散。',
              'Apple 宣称持续性能最高比上一代提升 40%。MacRumors 报道，新均热板的表面积达到上一代的三倍，内部使用去离子水。面积扩大之所以有意义，是因为散热效果取决于热量如何进入均热板、在其中扩散，再传向机身其他区域，而不是设备里只要出现一块均热板就足够。'
            ]
          },
          {
            title: '均热板面积变大，量产要求为什么更高？',
            paragraphs: [
              '均热板是一种密封的薄型两相散热器件。热端使内部液体蒸发，蒸气移动到低温区域凝结，再通过毛细结构回流。在手机有限的厚度里，它要保持平整，还要承受搬运、压合和温度变化。充液量、密封、洁净度或接触状态的轻微波动，都可能让图纸相同的零件表现不同。',
              '更大的接触面也会更依赖周边结构。导热材料厚度、中框平整度、锁付顺序和外壳公差，都会影响热量是否沿设计路径扩散。ZIMONAI 的实务判断是，评估同类散热主张时，应查看量产数据分布、测试夹具与整机条件，而不是只接受黄金样机的一张热成像图。'
            ],
            items: [
              '均热板尺寸、厚度与平整度公差',
              '工质、毛细结构与封装工艺控制',
              '气密、耐压和热阻测试方法',
              '导热界面材料厚度与压缩范围',
              '跨批次整机温度和降频结果'
            ]
          },
          {
            title: 'Apple 的说法会给其他手机品牌带来什么？',
            paragraphs: [
              '当 Apple 公开强调持续性能，市场关注点就会从短时间峰值跑分，转向游戏、视频、AI 和相机负载能够维持多久。其他品牌与散热器件厂商可能跟进类似主张，但相似词语不等于测试可比；环境温度、负载时长、屏幕亮度、软件版本和保护壳都会改变结果。',
              '对品牌和采购团队来说，散热确实能够支持性能、握持舒适度和电池状态，但不能把某一家供应商的均热板规格直接写成整机承诺。可以被复核的主张需要明确设备配置、可重复方法、样本量与接受区间。随着散热被写进发布会和产品页面，这条证据边界会越来越重要。'
            ]
          }
        ],
        checklist: [
          '零售设备上市后的独立持续性能测试',
          '测试环境温度、负载时长、软件版本和设备配置',
          '拆解确认均热板尺寸、位置与热界面结构',
          'Apple 是否补充最高 40% 比较的详细条件',
          '多台设备的发热、降频和电池表现，而非单个案例',
          '竞争品牌如何定义并证明自己的散热主张'
        ],
        limitsText: 'Apple 已确认 A20 Pro 工艺、封装概念、均热板和自家持续性能主张，但没有公布均热板供应商、完整尺寸、充液量、量产公差、验证样本量或良率。MacRumors 补充了设计信息，仍不能替代 Apple 工程记录或多台零售设备测试。本文的供应商控制与测试分析来自 ZIMONAI｜智蒙湾科技编辑部，不代表 iPhone 18 Pro 存在缺陷，也不能证明任何具名工厂制造该零件。'
      },
      appleAirpods5WirelessChargingCase: {
        topic: 'Apple 音频与充电新闻',
        published: '2026 年 9 月 10 日',
        readTime: '约 6 分钟',
        title: 'AirPods 5 同时推出两个版本：这一次，差异藏在充电盒里',
        description: 'Apple 以 129 美元和 149 美元推出两款 AirPods 5；高配版增加无线充电盒、更长续航与滑动音量控制，充电盒成为产品分级重点。',
        imageAlt: '上一代 Apple AirPods 与充电盒放在木桌上，用作 AirPods 5 充电盒新闻的编辑配图。',
        imageCaption: '上一代 AirPods 的编辑图片，并非 AirPods 5；也不是 ZIMONAI 客户产品、供应商样品、充电测试或 Apple 制造合作方证据。',
        labels: {
          summary: '新闻摘要',
          checklist: '接下来值得关注',
          limits: '仍待确认'
        },
        answer: 'AirPods 5 分成外观接近、功能不同的两款产品：美国售价 129 美元的标准版，以及 149 美元的 Wireless Charging Case 版。两者都有 H3 芯片与开放式主动降噪，高配版进一步加入更长续航、滑动调节音量，以及可使用 Apple Watch 充电器、Qi 兼容充电器或 USB-C 充电的盒子，9 月 18 日开售。更值得关注的是，一只充电盒已经成为产品分级核心；对买家和配件供应链来说，型号、包装、续航、充电方式与检测记录只要错位一项，就可能交付正品却错误的版本。',
        takeaways: [
          'Apple 以 129 美元和 149 美元推出两款 AirPods 5，Wireless Charging Case 版承载额外的充电、控制和续航功能。',
          'Apple 宣称开启主动降噪后单次最长 5 小时，配合无线充电盒最长 22 小时；这些数字来自 Apple 设定条件下的测试。',
          '对配件行业而言，这次发布说明充电盒架构已经能够定义产品档位，也会放大相似版本在上架、包装和发货中的混料风险。'
        ],
        sections: [
          {
            title: '两款 AirPods 5 到底有什么区别？',
            paragraphs: [
              'Apple 9 月 9 日发布 AirPods 5。两个版本都采用新的开放式佩戴设计、H3 芯片和主动降噪。标准版美国售价 129 美元；149 美元的 Wireless Charging Case 版另有耳机柄滑动音量控制、升级充电盒，以及 Apple 所称更长的电池续航。',
              '无线充电盒支持 Apple Watch 充电器、Qi 兼容充电器与 USB-C。Apple 表示，开启主动降噪后单次最长可听 5 小时，加上充电盒最长 22 小时。两款产品都将在 9 月 18 日开售；The Independent 和 MacRumors 也分别报道了双版本安排与充电盒差异。'
            ]
          },
          {
            title: '为什么充电盒不只是更方便？',
            paragraphs: [
              '充电盒本身就是一套电气系统，里面有电池、充电输入、电源管理、触点、外壳与固件。加入 Qi 和 Apple Watch 充电器兼容性后，线圈对位、温升与互操作性都会成为产品要求，同时也会改变包装、说明书、合规资料和出货测试。',
              'ZIMONAI 的判断是，20 美元价差把版本管理变得非常直观。纸箱、商品页、说明书或验货记录一旦漏掉“Wireless Charging Case”，买家拿到的仍可能是正品 AirPods 5，却不是订单对应的版本。其他相似耳机项目也应把配件差异拆成独立 BOM、标签文件与最终功能检查。'
            ],
            items: [
              '耳机和充电盒的完整型号标识',
              '各版本的 USB-C、Qi 和手表充电器兼容性',
              '耳机与盒内电池规格',
              '包装说明和随附线材',
              '出货前的充电、配对与控制功能检查'
            ]
          },
          {
            title: '降噪和续航数字应该怎样理解？',
            paragraphs: [
              'Apple 宣称 AirPods 5 的外部噪声降低效果，相比 AirPods 4 主动降噪版最高提高 50%。其脚注说明，测试采用指定的 AirPods 硬件、预发布软件，并参考 IEC 60268-24。这是一项有比较对象和测试框架的官方主张，不代表每位用户在所有环境里都会感受到完全相同的提升。',
              '续航也会随着使用条件变化。聆听模式、音量、通话、空间音频、电池老化与无线充电环境，都可能影响实际时间。现在可以确认的是，Apple 把性能故事与更明确的配件分级放在一起；9 月 18 日之后的零售测试和用户反馈，才会补齐两个版本在日常使用中的差别。'
            ]
          }
        ],
        checklist: [
          '两款 AirPods 5 的零售型号和包装文字',
          '主动降噪开启与关闭时的独立续航测试',
          '常见 Qi 与 Apple Watch 充电器的互操作性',
          '安装保护壳后的对位、温升与充电表现',
          '电商上架和仓库发货是否混淆两个版本',
          '上市后的维修、电池服务与替换充电盒信息'
        ],
        limitsText: 'Apple 已确认两种配置、美国价格、充电方式、上市日期，以及自家的续航和降噪主张，但没有公布零部件供应商、电芯来源、完整充电盒电气规格、量产良率或独立实测结果。本文配图展示上一代 AirPods，不能用来识别新品。本文对版本控制和供应链的分析来自 ZIMONAI｜智蒙湾科技编辑部，不是 Apple、The Independent 或 MacRumors 的结论。'
      },
      euBatteryPassportPowerBank: {
        topic: '欧盟电池文件',
        published: '2026 年 9 月 10 日',
        readTime: '约 7 分钟',
        title: '普通移动电源 2027 年需要欧盟电池护照吗？先确认电池类别',
        description: '欧盟电池护照将于 2027 年 2 月 18 日实施，但并非所有充电电池都适用。移动电源买家要先分清电池类别，再核对二维码背后的资料。',
        imageAlt: '手机通过线缆连接便携式移动电源，作为欧盟电池护照核查文章的编辑图片。',
        imageCaption: '手机连接移动电源的编辑图片；不是 ZIMONAI 产品、客户设备、供应商样品、合规文件、电池护照或测试记录。',
        answer: '从 2027 年 2 月 18 日起，欧盟电池护照适用于电动汽车、LMT 电池和容量超过 2kWh 的工业电池。普通移动电源若为密封式、重量不超过 5 千克且非专门工业用途，通常属于便携式电池，不在护照范围。同日起，它仍须带有适用于所有电池的二维码，并链接另一组法定资料。ZIMONAI 认为，买家应先核对精确型号、重量和瓦时数并记录用途及分类依据。完成分类后再索取相应数字文件，才不会用错合规资料。',
        takeaways: [
          '《欧盟电池法规》第 77 条把 2027 年 2 月 18 日的电池护照义务，限定为电动汽车电池、LMT 电池和容量超过 2kWh 的工业电池。',
          '普通消费类移动电源通常根据重量、密封状态和设计用途归入便携式电池；实际产品仍需按完整规格分类，不能只看商品名称。',
          '同一天起所有电池都要标示二维码，但便携式电池等其他类别链接的是标签、符合性、尽职调查和废弃管理等适用信息，而不是第 77 条电池护照。'
        ],
        sections: [
          {
            title: '从 2027 年 2 月起，哪些电池必须建立电池护照？',
            paragraphs: [
              '《欧盟电池法规》（EU）2023/1542 第 77 条列出的范围很明确：自 2027 年 2 月 18 日起，每一块投放欧盟市场或投入使用的电动汽车电池、轻型交通工具（LMT）电池，以及容量超过 2kWh 的工业电池，都应具备电子形式的电池护照。欧盟委员会当前专页列举的相关产品，包括电动汽车、电动自行车、电动摩托车和电动滑板车电池，以及家庭储能电池与工业电池。',
              '创建和维护护照的责任，在于将完整电池投放欧盟市场的经济运营者，并不会自动转移给单个电芯或模组供应商。护照通过二维码连接，包含电池型号和单体电池信息，并按不同主体设置访问权限。因此，供应商提供一个数据页面、报告文件夹或可扫描代码，还不能证明该型号需要采用第 77 条护照制度，也不能证明相关义务已经完成。'
            ]
          },
          {
            title: '普通消费类移动电源通常属于哪类电池？',
            paragraphs: [
              '法规所称“便携式电池”，是指密封、重量不超过 5 千克、并非专门为工业用途设计，而且不属于电动汽车、LMT 或启动照明点火电池的产品；已经封装完成、可供终端用户直接使用的电池组，同样按照电池管理。按照这些条件，普通手机移动电源通常属于便携式电池，而不是工业电池或 LMT 电池。这是 ZIMONAI 依据典型产品特征对法律定义作出的分类判断，不是欧盟对所有名为“移动电源”的商品作出的批准。',
              '商品名称无法解决边界产品。大型便携储能电源、专为工业设备设计的电池，或者用于交通工具的产品，都可能因重量、用途或供电对象而进入不同类别。采购时应保存额定瓦时数、总重量、设计用途、电池配置、说明书和实际应用，并要求制造商针对精确型号提供书面分类依据。'
            ],
            items: [
              '完整产品与电池型号，包括尾码和电池组配置',
              '电池总重量与额定瓦时数',
              '一般消费用途或专门工业用途',
              '是否为轻型交通工具提供牵引动力',
              '制造商采用的电池类别和法规定义'
            ]
          },
          {
            title: '为什么 2027 年的二维码不一定是电池护照？',
            paragraphs: [
              '第 13 条规定，从 2027 年 2 月 18 日起，所有电池都要带有二维码。电动汽车、LMT 和符合门槛的工业电池，其代码会链接到第 77 条电池护照；其他电池若按前述判断包含普通移动电源，代码则链接至该类别适用的标签信息、EU 符合性声明、电池供应链尽职调查报告，以及废弃预防和回收处理信息。二维码是共同入口，背后承载的法定资料却并不相同。',
              '这个差别会直接改变买家的提问。向所有工厂统一索取“电池护照”，容易制造错误的通过或不通过结论；先确认谁是将成品投放欧盟市场的责任方、产品属于哪类电池、二维码指向哪里，以及所链接信息能否对应实物型号，才能留下可审计记录。欧盟委员会 2026 年 8 月更新的数据点指引，可帮助护照适用类别准备资料，但该文件也明确声明不会增加法律义务，并非权威法规解释；最终仍要回到法规及后续适用法案。'
            ]
          }
        ],
        checklist: [
          '成品和电池组的完整型号，不得省略尾码',
          '电池重量、额定容量与瓦时数计算',
          '支持便携式、工业、LMT 或电动汽车类别的用途证据',
          '将完整电池投放欧盟市场的经济运营者名称和角色',
          '使用实物样品和最新包装稿测试二维码链接',
          '将代码背后的信息对应到精确型号与适用类别',
          '单独核查 EU 符合性声明和支持技术文件',
          '电芯、电池组、固件、标签与责任方的变更控制'
        ],
        limitsText: '《欧盟电池法规》广泛适用于各类电池，但第 77 条护照义务仅覆盖列明类别和容量门槛。本文对普通移动电源的分类，是根据典型产品特征对法规定义作出的判断；商品名称、标称容量或本文都不能替特殊产品完成正式分类。二维码本身不能证明链接信息准确、责任方已经履行全部义务，或量产产品与核查样品一致。电池护照、二维码资料、CE 符合性、运输测试、电气安全、生产者登记、废弃管理与出货质量，仍是不同的证据问题。2027 年 2 月 18 日前后发布的授权法案、实施法案和官方指引，仍可能细化操作要求。'
      },
      euCustomsReformEcommerceParcels: {
        topic: '欧盟海关与跨境电商新闻',
        published: '2026 年 9 月 9 日',
        readTime: '约 7 分钟',
        title: '欧盟海关改革获理事会放行：平台与低价小包裹将面对新的进口制度',
        description: '欧盟理事会通过数十年来最大幅度的海关改革，将非欧盟电商平台推向进口责任方，并新增小包裹处理费；费率和最后立法程序仍待确认。',
        imageAlt: '仓储人员在货架间检查包裹，用于说明欧盟跨境电商海关改革。',
        imageCaption: '仓储包裹检查场景的编辑配图；并非欧盟海关查验、ZIMONAI 场所、客户货件、供应商设施，也不是任何特定平台的证据。',
        labels: {
          summary: '新闻摘要',
          checklist: '接下来值得关注',
          limits: '目前仍未定案'
        },
        answer: '欧盟理事会 9 月 3 日通过海关改革立场，准备把非欧盟电商平台纳入进口责任方，并对低价小包裹新增全欧盟处理费。这件事之所以重要，是因为中国直发欧盟的充电器和移动电源，其落地成本、产品标识信息与合规记录，将更直接地绑定销售渠道。不过改革尚未完成立法，欧洲议会仍需表决，随后还要签署并刊登官方公报，处理费金额也尚未公布。ZIMONAI 认为，真正的竞争将从追求最低单件寄送成本，转向比较哪种渠道能够稳定承接准确的 SKU、海关和产品安全数据。',
        takeaways: [
          '理事会 9 月 3 日通过的方案，将让向欧盟销售的非欧盟平台承担进口人的报关、税费和合规责任；欧洲议会最终表决与正式刊登仍属于后续程序。',
          '新的处理费不同于 2026 年 7 月 1 日起已实施的低价远程销售货物每项 3 欧元临时关税。理事会公告发布时，欧盟委员会尚未公布处理费金额。',
          '对中国直发的充电器和移动电源，型号层级的产品标识符、税则归类、欧盟产品资料与退货追溯能力，将逐渐成为渠道成本，而不是包裹被拦截后才补交的行政资料。'
        ],
        sections: [
          {
            title: '欧盟理事会 9 月 3 日究竟通过了什么？',
            paragraphs: [
              '理事会完成新《欧盟海关法典》和欧盟海关管理局方案的一读立场。整套改革包括集中式海关数据中心、跨国风险分析，以及面向高度透明企业的“Trust and Check”简化制度。按照理事会规划，新管理局将设在法国里尔并于 2027 年开始运作；电商企业预计从 2028 年 7 月 1 日起强制使用海关数据中心，其他贸易商则在更晚阶段纳入。',
              '电商领域最重要的变化是责任归属。理事会公告指出，非欧盟平台把商品卖进欧盟时，将被视为进口人，而不是让最终消费者自行承担报关义务。反复违反海关和欧盟标准的经营者可能面对逐级加重的处罚；最严重情况包括最高相当于上一年度欧盟进口总值 6% 的罚款、失去海关优惠，甚至限制平台界面访问。'
            ]
          },
          {
            title: '哪些费用和数据要求已经生效，哪些还在推进？',
            paragraphs: [
              '三项制度很容易混淆。第一，从 2026 年 7 月 1 日起，价值不超过 150 欧元且符合条件的远程销售货物，已适用每项 3 欧元的临时关税；欧盟委员会说明，计算依据是包裹中的税则归类项目，而非简单按包裹数量计费。第二，产品标识符将从 11 月 1 日起强制申报，用于提升追溯和安全筛查。第三，本次改革另设全欧盟小包裹处理费，用来支付海关处理成本。',
              '理事会表示，各成员国最迟将在 11 月 1 日开始征收处理费，但具体金额要由欧盟委员会另行确定。因此，在授权法案公布之前，任何把费率写成已经定案的报道或物流报价，都超出了现有证据。完整海关改革还要等待欧洲议会表决、签署与《欧盟官方公报》刊登；当前已经生效的措施与未来法典，需要按两条时间线理解。'
            ],
            items: [
              '2026 年 7 月 1 日起已生效：符合条件的低价远程销售货物，每项临时关税 3 欧元。',
              '2026 年 11 月 1 日起：按照欧盟委员会实施说明，产品标识符成为强制字段。',
              '最迟 2026 年 11 月 1 日：另有全欧盟处理费，金额仍待欧盟委员会确定。',
              '下一个立法节点：欧洲议会表决，之后才是签署与官方公报刊登。'
            ]
          },
          {
            title: '这会怎样影响中国直发的充电器和移动电源？',
            paragraphs: [
              '充电器或移动电源从中国逐件直发，本来就涉及税则号列、精确型号、欧盟经济运营者、符合性声明、电池运输资料、警示信息和召回追溯。当平台或其代表成为进口人，海关系统又要求结构化产品标识信息时，商品名称不一致、SKU 文件不完整，就会直接变成通关、执法与成本问题。这不代表平台成为制造商，却会提高平台接受无法追溯目录数据的代价。',
              'ZIMONAI 编辑部的判断是，改革将更有利于能够把同一产品身份，从供应商报价一直保持到商品页面、包裹申报和上市后处置的经营者。部分商品仍可能适合中国直发，另一些则可能改为欧盟集中进口和本地库存；官方文件没有替企业决定渠道模式。真正应该比较的是完整落地成本，加上数据、合规和退货能力，而不只是物流报价。'
            ]
          }
        ],
        checklist: [
          '欧洲议会表决、最终签署文本与《欧盟官方公报》刊登',
          '欧盟委员会确定处理费金额和征收方式的授权法案',
          '所用申报路径从 11 月 1 日起要求的精确产品标识字段',
          '各电商渠道指定的进口人或间接报关代表',
          'SKU 层级的税则号列、型号、欧盟合规档案和电池运输资料',
          '中国逐件直发与欧盟集中进口、库存和退货的总成本比较',
          '平台在 2028 年数据中心阶段前推出的上架或履约新要求'
        ],
        limitsText: '截至 2026 年 9 月 9 日，理事会已通过自身立场，欧洲议会最终表决、签署与《欧盟官方公报》刊登仍待完成；欧盟委员会也尚未公布全欧盟处理费金额。临时关税、产品标识符、处理费、平台义务和海关数据中心各有不同适用日期，后续法律文本与指南仍可能补充细节。改革针对整体跨境电商，不能用来证明某款充电器、移动电源、中国供应商或平台已经合规或违规。本文对渠道和采购的影响分析来自 ZIMONAI｜智蒙湾科技编辑部，并非理事会、欧盟委员会、欧洲议会或 BEUC 的预测。'
      },
      euCommonChargerRules: {
        topic: '欧盟通用充电器规则',
        published: '2026 年 9 月 8 日',
        readTime: '约 7 分钟',
        title: '欧盟通用充电器规则：USB-C 设备、充电器与 2028 新要求要分开核查',
        description: '欧盟现行规则已覆盖清单内的有线充电设备和笔记本电脑，充电器自身的新生态设计要求从 2028 年起适用；买家需要区分两套证据。',
        imageAlt: '大理石台面上的 USB-C 接头、线缆和适配器，用于说明欧盟通用充电器规则。',
        imageCaption: 'USB-C 线缆与适配器为编辑配图；不是 ZIMONAI 的供应商、客户、送检充电器、工厂、认证文件或欧盟符合性证据。',
        answer: '欧盟“通用充电器”目前规范清单内有线充电设备的 USB-C 接口、USB Power Delivery、单独销售选择和消费者标签；笔记本电脑已于 2026 年 4 月 28 日纳入。这不等于写有“USB-C”的充电器已经合规：设备端 RED 文件和包装信息，与充电器的安全、EMC、能效及 2028 年生态设计要求，仍属于不同证据。买家应把设备、充电器和线缆完整型号，逐项对应功率、USB PD、包装标签及 EU 符合性声明。ZIMONAI 的判断是，真正风险在于把现行设备规则、充电器规则和尚未生效的要求，混为一项笼统的合规结论。',
        takeaways: [
          '从 2026 年 4 月 28 日起，笔记本电脑也适用欧盟通用充电器要求；另外十二类支持有线充电的便携设备，已从 2024 年 12 月 28 日开始执行。',
          '适用设备需要 USB Type-C 接口；有线充电超过 5 V、3 A 或 15 W 时，必须支持 USB Power Delivery，其他快充协议也不得妨碍完整的 USB PD 功能。',
          '针对充电器本身的《2025/2052 号生态设计法规》要到 2028 年 12 月 14 日才开始适用；企业可以提前规划，但不能把未来要求写成 2026 年已经生效。'
        ],
        sections: [
          {
            title: '2026 年欧盟已经执行哪些要求？',
            paragraphs: [
              '欧盟委员会列出的十二类便携设备从 2024 年 12 月 28 日起纳入通用充电规则，包括手机、平板电脑、数码相机、耳机、头戴式耳机、便携式扬声器、掌上游戏机、电子阅读器、耳塞式耳机、键盘、鼠标和便携式导航设备；笔记本电脑则从 2026 年 4 月 28 日起适用。《2022/2380 号指令》的对象是支持有线充电且列入清单的无线电设备，并非所有电气产品都必须采用 USB-C。',
              '在适用范围内，设备必须配备可正常工作的 USB Type-C 接口并支持兼容线缆充电。若有线充电超过 5 V、3 A 或 15 W，还必须支持 USB Power Delivery；其他快充协议不能限制完整的 USB PD 功能。生产商和销售方还要让消费者能够选择不带充电器的设备，标明包装内是否含充电器，并披露开始充电所需的最低功率、达到最快速度所需的最高功率和兼容协议。欧盟委员会 2026 年报告将其归纳为五项相互关联的要求，而不是一次接口外观检查。'
            ]
          },
          {
            title: '设备和充电器分别需要核对哪些证据？',
            paragraphs: [
              '核查应从准确的设备型号和充电架构开始。包装、网络销售页面和说明书应一致说明是否附带充电器、开始充电所需的最低功率、实现最快充电所需的最高功率，以及适用情况下的“USB PD”字样。随后还要把这些参数与实际供应或推荐的外部电源、单口与多口同时使用时的输出、线缆额定值和本次报价产品进行比对。',
              '通用充电器指令属于《无线电设备指令》的符合性路径，因此设备端的充电声明应对应到该完整型号的 EU 符合性声明和技术文件；外部电源自身的安全、EMC、物质、能效和市场准入文件则需要单独整理。ZIMONAI 的实务判断是：如果一页声明没有同时写明设备型号和充电器型号，就不足以建立完整的互操作关系；“USB-C”本身不是证据链。'
            ],
            items: [
              '产品是否属于清单内设备，以及规则开始适用的日期',
              '设备、外部电源和线缆的完整型号',
              '消费者标签上的最低和最高充电功率',
              'USB PD 支持状态及其他专有快充协议',
              '包装与网络销售页是否附带充电器的图示',
              '设备的 EU 符合性声明及配套技术证据',
              '充电器另行适用的安全、EMC、能效和其他文件'
            ]
          },
          {
            title: '2028 年外部电源新规则会带来哪些变化？',
            paragraphs: [
              '欧盟委员会说明，《2025/2052 号法规》将从 2028 年 12 月 14 日起适用于外部电源、一般用途便携式电池充电器、无线充电器或充电板，以及 USB Type-C 线缆，但仍需逐项确认适用范围和豁免。届时纳入范围的外部电源原则上要满足通用充电器的设计、互操作、信息和能源性能要求，包括至少一个 USB Type-C 或 USB PD 端口、可拆卸 USB-C 线缆、端口功率标识和新的通用充电器标志。',
              '这个未来日期会影响产品路线图，却不会改变 2026 年 9 月出货的法律状态。计划长期在欧盟销售的 OEM 项目，现在就应把外壳、端口、线缆、固件、标签和测试计划对照 2028 年法规；当前采购仍应依据产品投放欧盟市场时有效的规则判断，并将后续要求作为有日期的改版节点，而不是提前描述成已经取得的认证。'
            ]
          }
        ],
        checklist: [
          '确认产品是否属于清单内设备及规则适用日期',
          '记录设备、充电器和线缆完整型号，不省略后缀',
          '核对 USB-C 接口、最低和最高功率及 USB PD 声明',
          '检查所有销售形式中的是否附带图示和充电标签',
          '审阅设备的 EU 符合性声明与充电技术证据',
          '单独审阅外部电源的安全、EMC、能效和物质文件',
          '使用实际充电器、线缆和相关端口组合测试互操作性',
          '若产品将继续在欧盟销售，建立注明日期的 2028 年转换计划'
        ],
        limitsText: '通用充电器规则处理特定无线电设备的充电接口、协议、销售选择和消费者信息；2028 年生态设计法规则另行覆盖纳入范围的外部电源和线缆。这些要求不能证明中国卖家拥有工厂、所有 USB-C 产品都在适用范围、本次报价充电器已经满足电气安全，或量产产品与审阅版本完全一致。USB-IF 认证、CE 符合性、化学物质合规、能源性能、产品安全和出货质量，都需要针对完整产品准备各自证据。欧盟委员会指南有助于统一理解，但不是产品批准；欧盟法院仍拥有欧盟法的最终权威解释权。'
      },
      chinaCccCharger: {
        topic: '中国充电器市场准入',
        published: '2026 年 9 月 6 日',
        readTime: '约 7 分钟',
        title: '充电器有 CCC 证书，就代表中国工厂和所有出口市场都通过认证了吗？',
        description: 'CCC 可以支持列名充电器或电源适配器在中国市场的特定认证范围；买家仍需核对证书、型号、制造商、工厂和各出口市场要求。',
        imageAlt: '大理石台面上的白色双圆脚电源适配器，用于说明中国 CCC 证书核查。',
        imageCaption: '电源适配器编辑配图；不是 ZIMONAI 的供应商、客户、工厂、证书、送检样品或市场准入记录。',
        answer: '有效的中国强制性产品认证（CCC）证书，可以支持列名充电器或电源适配器在中国市场的特定认证范围，前提是证书持有人、制造商、生产工厂、完整型号、额定值和当前状态都与产品一致。它不是全球出口通行证；欧盟、美国、英国或其他市场仍有各自的法规和文件要求。对海外买家，ZIMONAI 的编辑判断是：CCC 可以是一项有力的中国市场证据，但报价产品仍须对应精确型号和当前量产配置，销往哪个市场，就要另外建立该市场的准入资料。',
        takeaways: [
          '国家认监委 2026 年 8 月更新的目录仍将“电源”列为 0807、0907，电子产品及安全附件按照 CNCA-C09-01:2023 执行。',
          '证书核查要看认证委托人、制造商、生产工厂、产品名称、完整型号或系列、认证依据、发证机构、日期和当前状态。',
          '共用外壳、印有 CCC 标志，或同系列某个型号持有证书，都不能自动覆盖不同功率、电路、安全结构、工厂或出口市场。'
        ],
        sections: [
          {
            title: '哪些充电器和电源适配器需要走 CCC 认证？',
            paragraphs: [
              '国家认监委 2026 年 8 月更新的现行实施规则汇总，将“电源”列在电子产品及安全附件类别，产品代码为 0807、0907，对应实施规则 CNCA-C09-01:2023，并自 2023 年 8 月 1 日起实施。是否属于强制认证范围，要先看产品功能和目录界定，不能仅因为商品页都写“充电器”，就把不同用途的产品当成同一类别。',
              '对目录内产品而言，CCC 处理的是产品在中国境内出厂、销售、进口或用于其他经营活动的要求。这个市场边界十分重要：供应商持有真实的中国市场证书，不代表产品已经同时完成欧盟、美国、英国或其他目的地的符合性程序。'
            ]
          },
          {
            title: '证书和报价充电器有哪些字段必须对应？',
            paragraphs: [
              '《强制性产品认证管理规定》要求证书列出认证委托人、制造商、需要时的生产企业、产品名称与型号或系列、认证依据、日期、发证机构和证书编号。CNCA-C09-01:2023 进一步规定，电源产品原则上按电路原理和安全结构划分认证单元，型式试验报告应描述认证单元内所有产品的相关信息。',
              '实际核对时，应把官方当前状态、报价单、铭牌、样品和工厂资料放在一起比较。完整型号后缀、输入输出、接口、认证委托人、制造商与生产地址都要一致。国家认监委 2025 年的信息公开通知要求认证机构公布证书有效、暂停、注销或撤销状态，并提供公众查询方式；因此，PDF 上的到期日尚未结束，并不代表可以忽略当前状态和产品对应关系。'
            ],
            items: [
              '证书编号、发证机构、发证日、到期日和当前状态',
              '认证委托人、制造商和生产工厂，以及三者的书面关系',
              '完整产品名称、型号或系列，以及报价使用的全部后缀',
              '输入输出、功率、接口、插脚和安全结构',
              '认证单元采用的实施规则与标准',
              '实物样品上的铭牌和 CCC 标志信息'
            ]
          },
          {
            title: '工厂、电路或关键部件变更后，原证书还能直接沿用吗？',
            paragraphs: [
              'CNCA-C09-01:2023 要求获证产品持续符合标准，并保持与型式试验样品一致；制度也包含获证后监督。关键部件、材料、安全设计或电气结构发生变化时，应在实施前完成变更批准或备案；需要扩大证书覆盖产品时，认证机构还要评价差异，并在必要时增加测试或工厂检查。',
              'ZIMONAI 的实务判断是，CCC 证书只有连接到当前量产资料，才真正具有采购价值。买家应把获证型号对应到现行物料清单、关键部件清单、工厂地址、变更批准和出货规格。这不会让 CCC 变成全球认证，也不能保证每一件产品，但可以避免一张真实证书被扩展到无关型号、工厂或市场。'
            ]
          }
        ],
        checklist: [
          '先确认精确产品功能是否属于现行 CCC 目录',
          '通过发证机构的公开查询渠道取得当前证书状态',
          '将认证委托人、制造商和生产工厂对应到供应商资料',
          '核对完整型号、额定值、插脚、接口和安全结构',
          '检查关键部件、材料与电气结构的变更批准',
          '为各目的市场分别建立认证和声明证据档案',
          '通过量产与出货检查确认本批订单的实际配置'
        ],
        limitsText: 'CCC 证书只能支持证书列明的产品、认证单元、标准、相关主体和中国市场范围；不能证明卖方自有工厂、该公司的全部产品都已获证、每批出货都与型式试验样品一致，也不能证明充电器符合欧盟、英国、美国或其他出口市场要求。它还不能替代企业信用核查、性能测试、化学物质合规、运输文件和订单专属质量控制。如果当前状态、工厂、型号或配置无法对应，应暂不下结论，并向发证认证机构确认。'
      },
      belkinUltraChargeProBoostSolid: {
        topic: 'IFA 2026 电池技术新闻',
        published: '2026 年 9 月 7 日',
        readTime: '约 6 分钟',
        title: 'Belkin 在 IFA 2026 推出半固态电芯移动电源：UltraCharge Pro 有何不同？',
        description: 'Belkin 以 BoostSolid 电芯推出纤薄磁吸 5K 与 60W 10K 两款新品。真正值得关注的，是移动电源竞争正从功率延伸到体积、循环寿命与热管理。',
        imageAlt: 'Belkin UltraCharge Pro 磁吸 5K 与显示屏 10K 移动电源，分别为手机和笔记本电脑充电。',
        imageCaption: 'Belkin IFA 2026 新闻稿随附的官方媒体图片，展示本次发布的 UltraCharge Pro BoostSolid 产品；不是 ZIMONAI 测试、赞助内容、供应商现场或客户项目。',
        labels: {
          summary: '新闻摘要',
          checklist: '接下来值得关注',
          limits: '目前仍未确认'
        },
        answer: 'Belkin 在 IFA 2026 发布两款采用 BoostSolid 半固态电芯的 UltraCharge Pro 移动电源：8.8mm 的磁吸 5K 款支持 15W Qi2，10K 款最高可输出 60W，并有状态显示屏。Belkin 宣称电芯在 1,000 次循环后仍可保有最高 80% 容量；TechRadar 上手确认产品明显纤薄，却未验证长期寿命与安全主张。这次发布把电芯技术、循环寿命证据与热管理推到移动电源品类竞争核心，制造商与买家不再只看容量和功率。',
        takeaways: [
          '5K 款结合 8.8mm 机身、15W Qi2 磁吸充电与最高 22.5W USB-C 输出；10K 款提供最高 60W USB-C、三个输出接口与状态显示屏。',
          'Belkin 宣称 BoostSolid 在 1,000 次循环后仍可保有最高 80% 容量；这是条件明确的品牌主张，不是已被独立复现的五年耐用结论。',
          '对整个移动电源市场而言，竞争重点正从更高功率，延伸到电芯技术、电池包体积、热控制、循环寿命证据与状态信息。'
        ],
        sections: [
          {
            title: 'Belkin 这次在 IFA 2026 发布了什么？',
            paragraphs: [
              'Belkin 于 9 月 3 日发布 UltraCharge Pro Slim Magnetic Power Bank 5K 与 UltraCharge Pro Power Bank 10K with BoostSolid Cell。5K 款厚度为 8.8mm，支持 15W Qi2 磁吸无线充电和最高 22.5W 有线输出，美国定价 69.99 美元。10K 款单个 USB-C 端口最高输出 60W，配有两个 USB-C 和一个 USB-A，显示屏可呈现剩余电量、输出功率与温度信息，美国定价 89.99 美元。',
              '两款产品不只是容量不同。5K 款围绕吸附在手机背面的轻薄使用场景设计，10K 款则面向手机、平板电脑和部分笔记本电脑的有线快充。Belkin 新闻稿表示，两款当时已在美国官网开放订购，并提供黑色与沙色；其他地区的上市日期与售价，仍需按各市场信息分别确认。'
            ]
          },
          {
            title: '为什么半固态电芯才是这条新闻的重点？',
            paragraphs: [
              'Belkin 将 BoostSolid 描述为在液态电解质之外加入凝胶状层的半固态结构，并把更纤薄的电池包、热稳定性与较慢衰减联系在一起。品牌提出的循环寿命基准很具体：完整充放电 1,000 次后，容量最高仍可维持 80%；“五年”则按每两天完成一次完整充放电计算。Belkin 还表示，5K 款比自家前一代同级产品薄 40%，10K 款比一般 45W、10K 移动电源小 27%。',
              '这些比较条件不能省略。体积百分比采用 Belkin 选定的比较基准，循环寿命与安全叙述也来自制造商。TechRadar 在 IFA 的上手体验可以独立支持两款产品已经成形，并指出 5K 款确实非常纤薄、整体质感出色；但该报道没有重做 1,000 次循环，也没有公布穿刺、高温或容量保持测试。这是一次真实的产品发布，却还不是对所有性能宣称的独立验证。'
            ],
            items: [
              '品牌主张：1,000 次循环后，容量最高仍保有 80%。',
              '独立观察：产品已在 IFA 展出，5K 款机身明显纤薄。',
              '仍待实测：长期衰减、高温输出、抗膨胀能力与批次一致性。'
            ]
          },
          {
            title: '这会怎样改变移动电源供应链？',
            paragraphs: [
              'ZIMONAI 编辑部的判断是，这场发布让电芯选择直接成为消费者看得见的产品故事。以后供应商若报价类似的“半固态”移动电源，只有技术名称并不够；买家会需要把精确电芯型号、标称与额定容量、循环测试方法、温度条件、保护设计、电池包尺寸和变更管理规则，关联到实际成品型号。否则，同一个热门名词下面，可能隐藏着完全不同的配方与证据质量。',
              '产品价值的来源也可能改变。如果制造商能够在不牺牲可用容量和热裕度的情况下做出更薄的电池包，外观设计与便携性就会更具卖点；循环寿命若能在独立测试中成立，更换频率也会进入商业计算。下一个有意义的信号不会是另一张发布会幻灯片，而是可重复的测试、拆解证据，以及其他主流品牌是否开始公布可比较的电芯与循环寿命数据。'
            ]
          }
        ],
        checklist: [
          '经过数百次完整循环后的独立容量保持结果',
          '持续 60W 输出时的充电速度与表面温度',
          '各成品型号的标称容量与额定输出容量',
          '电芯型号、供应商、保护设计与电池包变更记录',
          '各地区实际上市时间、保修条款与最终售价',
          '其他品牌是否提出可比较的半固态电芯证据'
        ],
        limitsText: '截至 2026 年 9 月 7 日，Belkin 已公布新品规格、比较方式、售价与上市信息，TechRadar 也已发布 IFA 上手体验；但本文引用的独立来源尚未完成 1,000 次循环老化、破坏性安全测试、持续温度测量或量产批次比较。“半固态”本身也不代表全行业只有一种固定配方，更不能证明所有使用该名称的产品表现相同。本文对供应链影响的分析来自 ZIMONAI｜智蒙湾科技编辑部，不是 Belkin、TechRadar 或主管部门的结论。'
      },
      xoPoppyPowerBankRecall: {
        topic: '北美移动电源召回',
        published: '2026 年 9 月 5 日',
        readTime: '约 7 分钟',
        title: 'XO Poppy 磁吸移动电源美加接连召回：同一品牌，为何型号清单不同？',
        description: '美国监管部门召回约 32,400 台，加拿大也已公告 30,000 台；品牌相同，型号、渠道和退款方式却不能合并成一份名单。',
        imageAlt: '美国召回公告中的三款 XO Poppy 磁吸移动电源，以及包装上的型号标签。',
        imageCaption: '美国 CPSC 召回公告中的三张产品照片，经并排整理用于编辑展示；画面为美国列名的米色、蝴蝶结和泰迪熊版本，并非加拿大完整型号清单。不是 ZIMONAI 测试或赞助内容。',
        labels: {
          summary: '新闻摘要',
          checklist: '买家现在应核对什么',
          limits: '目前仍未确认'
        },
        answer: '北美两份召回公告都指向 XO Poppy 磁吸移动电源。美国 CPSC 9 月 3 日召回约 32,400 台，加拿大卫生部 8 月 26 日已公告 30,000 台相关 5,000mAh 型号；两地都指出过热和起火风险。真正值得关注的是，美国只列出三个零售版本，加拿大列出 30 个型号，退款和处置渠道也不同。对买家和零售商而言，这起事件把各市场 SKU 对照、电芯和物料清单追溯、召回物流推到第一线；共同品牌名称不足以界定召回范围。两份公告发布时都没有事故或伤害报告，但尚未公开根因、电芯供应商、受影响批次或各型号的内部配置。',
        takeaways: [
          '美国 CPSC 公告涉及约 32,400 台在 TJX 和 Marshalls 销售的 XO Poppy Power Trip；加拿大卫生部另列 30,000 台在 HomeSense、Winners 和 Marshalls 销售的相关 5,000mAh 移动电源。',
          '美国公告列出三种包装版本，加拿大则列出 30 个型号。买家需要核对完整市场 SKU 和包装型号，不能只凭 XO Poppy 名称或相似外观。',
          '两国监管部门都未公布根因分析。合理的下一步是先隔离受影响成品记录，保存电芯、PCBA、接口、固件与生产批次证据，不能把责任直接归于未具名供应商。'
        ],
        sections: [
          {
            title: '美国和加拿大分别召回了哪些产品？',
            paragraphs: [
              '美国消费品安全委员会（CPSC）于 2026 年 9 月 3 日发布第 26-740 号召回。范围是母型号 PYPBK5M 下的三种 XO Poppy Power Trip 磁吸无线移动电源：米色（PY-PBK5M-CR2）、米色蝴蝶结图案（PY-PBK5M-BW8）和黑色泰迪熊图案（PY-PBK5M-TB2）。CPSC 表示，约 32,400 台产品于 2025 年 4 月至 2026 年 3 月在全美 TJX 和 Marshalls 门店销售，售价约 15 美元；公告将 Truststone Group LLC 列为进口商，制造地为越南。',
              '加拿大卫生部则于 8 月 26 日发布相关召回，涉及 30,000 台兼容 MagSafe 的 XO Poppy 5,000mAh 移动电源，销售期为 2024 年 5 月至 2026 年 3 月，渠道包括 HomeSense、Winners 和 Marshalls。加拿大清单共有 30 个型号，其中包含 PY-PBK5M-BW8，也有许多未出现在美国公告中的版本。两份公告在各自的数据截止日都表示，尚未收到事故或伤害报告。'
            ]
          },
          {
            title: '为什么型号清单和消费者处置方式不同？',
            paragraphs: [
              '召回范围由各监管部门公告中的市场、渠道记录和产品识别信息共同界定。美国要求消费者立即停用，并向 Truststone Group 申请以虚拟礼品卡形式退款。CPSC 同时提醒，召回的锂离子产品不得投入普通垃圾、常规回收系统或零售门店的电池回收箱；送往家庭有害废物收集点之前，应先确认该机构是否接收召回锂电池。',
              '加拿大要求消费者停用后，直接带回 HomeSense、Winners 或 Marshalls 退款，并指出加拿大禁止再次分发、销售或转赠召回产品。这些差异直接影响实际操作。全球卖家如果把两份公告压缩成一张品牌级名单，可能漏掉加拿大版本、将美国消费者导向错误的退款渠道，或在不同国家套用不适用的处置方式。'
            ],
            items: [
              '美国范围：母型号 PYPBK5M、三个包装版本，约 32,400 台。',
              '加拿大范围：30 个列名型号，官方报告销售 30,000 台。',
              '只有一个型号重叠，不能据此推定所有版本共用相同物料清单。',
              '各国销售和退款记录都应关联到产生相应义务的正式公告。'
            ]
          },
          {
            title: '这起召回暴露了哪些移动电源追溯问题？',
            paragraphs: [
              '公开公告已提供足够的零售信息，帮助消费者识别产品并采取行动，但没有披露电芯制造商、PCBA 版本、接口供应商、生产日期、批次边界或技术失效分析。买家若要排查自己的商品组合，还需要一条能够把各市场 SKU 和包装型号关联到成品记录、物料清单版本、电芯批次及出货历史的证据链，才能准确停止出货并通知客户。',
              'ZIMONAI 的编辑判断是，跨市场召回能力应在出货前建立，而不是等公告出现后再临时拼凑。品牌方和进口商应能够冻结受影响库存、按目的市场找出客户、保存样品与变更记录，并启动各司法管辖区正确的退款和逆向物流。这起事件没有证明每一款 XO Poppy 产品都存在缺陷，也没有指出哪个供应商造成风险；它说明的是，当公开品牌名称相同时，精确产品身份和应对记录为什么重要。'
            ]
          }
        ],
        checklist: [
          '完整市场 SKU、包装型号、颜色或图案版本和销售国家',
          '成品批次、生产日期、采购单和实际出货目的地',
          '电芯制造商与批次、PCBA 版本、接口规格和保护设置',
          '电芯、接口、外壳、固件及二级供应商的变更批准记录',
          '停止出货、渠道通知、退款与各国处置流程',
          '留样、事故记录，以及负责监管部门和客户后续联络的人员'
        ],
        limitsText: '截至 2026 年 9 月 5 日，CPSC 和加拿大卫生部公告都没有公开技术根因、电芯供应商、生产批次范围、实验室报告，或美加版本的完整对应关系。现有资料也无法证明所有 XO Poppy 移动电源都受影响、所有列名产品采用完全相同的内部设计，或制造地越南本身造成这项风险。上述追溯和召回准备建议属于 ZIMONAI 编辑分析；受影响产品、消费者行动与法律要求，仍应以相关市场的正式公告为准。'
      },
      ankerMagGo2Pro: {
        topic: 'IFA 2026 新品新闻',
        published: '2026 年 9 月 3 日',
        readTime: '约 6 分钟',
        title: 'Anker 在 IFA 2026 推出 MagGo Power Bank 2 Pro：Qi2 25W、主动散热与智能显示一次看懂',
        description: 'Anker 把 25W 磁吸充电、风扇散热、10,000mAh 电量、屏幕和支架装进一块移动电源。这款新品为什么值得关注，还有哪些表现要等上市后才知道？',
        imageAlt: 'Anker MagGo Power Bank 2 Pro 吸附在手机背面，用户正在活动现场拍摄。',
        imageCaption: 'Anker MagGo Power Bank 2 Pro 官方媒体图片，由 Anker Innovations 的 IFA 2026 Press Kit 提供；并非 ZIMONAI 拍摄、测试或赞助内容。',
        labels: {
          summary: '新闻摘要',
          checklist: '接下来值得关注',
          limits: '目前仍未确认'
        },
        answer: 'Anker 在 IFA 2026 发布 MagGo Power Bank 2 Pro，将 10,000mAh 容量、最高 25W 的 Qi2.2 磁吸无线充电、主动风冷、智能显示屏和可调支架整合在同一机身中。Anker 表示，这款产品将于 9 月 17 日在美国上市，定价 109.99 美元，提供三种颜色。比参数本身更值得关注的是，高功率磁吸移动电源的竞争正在从单纯追逐瓦数，转向散热管理与充电状态可视化。',
        takeaways: [
          '新品整合 Qi2.2 25W 无线输出、45W 回充、10,000mAh 容量、主动散热、显示屏和内置支架。',
          'WPC 数据库另有 A110R／Qi-24417 的 MPP25 登记信息，为这场发布提供了可独立查询的官方记录。',
          '真正的新意并不是再多几瓦，而是把散热、持续输出和实时信息做成消费者能够看见的产品功能。'
        ],
        sections: [
          {
            title: 'Anker 这次在 IFA 2026 发布了什么？',
            paragraphs: [
              'Anker 于 9 月 3 日在柏林 IFA 发布会上带来六款充电新品，重点围绕设备识别、温度管理和屏幕显示。MagGo Power Bank 2 Pro 是其中的便携产品：容量 10,000mAh，支持最高 25W Qi2.2 磁吸无线充电和 45W 有线回充，侧边屏幕可显示功率、温度和剩余充电时间，背面还带有可调支架。',
              '根据 Anker 官方新闻稿，这款产品将于 9 月 17 日在美国上市，售价 109.99 美元，提供 Phantom Gray、Starlight Silver 和 Polar Night Blue 三种配色。这些是美国市场信息；其他地区的售价与上市安排，在本文核对时还没有全部公布。'
            ]
          },
          {
            title: '为什么内置风扇才是这款新品的重点？',
            paragraphs: [
              '无线充电会有一部分能量转化为热量，温度升高时，手机也可能主动降低充电功率。Anker 这次没有把散热藏在机身内部，而是直接做成核心卖点：官方资料提到风扇控制算法、双风道和石墨烯导热结构，侧边屏幕则把实时温度和充电状态呈现给用户。',
              '这让 MagGo Power Bank 2 Pro 不只是另一块写着“25W”的移动电源。如果主动散热能让输出更加稳定，又不会带来明显噪声和耐用性问题，它可能成为高端磁吸移动电源的新卖点；代价是零件和控制逻辑增加，风扇积尘、风道堵塞、额外耗电和长期可靠性都要等上市后的实测来回答。'
            ],
            items: [
              '风扇运转时，能否安静地维持 25W 充电？',
              '风道被手掌、口袋纤维或灰尘部分遮挡时，性能会怎样变化？',
              '增加的散热部件是否会明显影响重量、续航和耐用性？',
              '其他品牌会不会迅速跟进风冷和信息显示设计？'
            ]
          },
          {
            title: '官方记录确认了什么，接下来还要看什么？',
            paragraphs: [
              'Wireless Power Consortium 的公开数据库给出了一个可独立核对的基准：产品名称为 Anker MagGo Power Bank 2 Pro，制造商料号 A110R，Qi ID 24417，Qi 版本 2.2.1，功率规格为 MPP25，potential load power 为 25.0W，认证日期为 2026 年 8 月 21 日。这能确认精确型号的登记字段，但不等于替 Anker 所有速度、温度和耐用性宣传背书。',
              '上市后最有价值的信息，将来自可重复的独立测试：长时间充电曲线、机身温度、风扇噪声、炎热环境下的表现，以及使用数月后的磨损。对整个市场而言，更值得观察的是主动散热会不会成为高端移动电源的常态；对制造和采购端来说，风扇、风道、传感器与固件也意味着新的零件、组装与质量控制工作。'
            ]
          }
        ],
        checklist: [
          '美国以外市场的实际上市日期与售价',
          '相同条件下的独立充电速度和温度测试',
          '风扇噪声、风道受阻和长期耐用性',
          '真实使用中的重量感、便携性和支架稳定性',
          '上市后的固件或硬件版本是否改变性能',
          '其他充电品牌跟进主动散热设计的速度'
        ],
        limitsText: '截至 2026 年 9 月 3 日，Anker 已公布美国售价、配色和上市时间，WPC 记录也能确认 A110R 的 Qi 登记字段；但独立评测尚未证实长时间充电速度、实际温度、风扇噪声、电池续航与长期耐用性，所有市场的售价和供货情况也还没有完整答案。本文对品类方向和制造复杂度的描述属于 ZIMONAI 编辑判断，并非 Anker、WPC 或监管机构的结论。'
      },
      reachSvhcDeclaration: {
        topic: '欧盟化学物质文件',
        published: '2026 年 9 月 4 日',
        readTime: '约 7 分钟',
        title: '供应商提供了 REACH／SVHC 声明，就能证明充电器符合欧盟要求吗？',
        description: '声明只有在型号、物料清单版本和候选清单基准日都清楚时才具有可追溯价值；它不是 ECHA 颁发的产品证书，也不会自动覆盖后续换料。',
        imageAlt: '小型电路板上的电子零部件，用于说明 REACH 和 SVHC 文件核对。',
        imageCaption: '电子零部件编辑用照片；并非 ZIMONAI 客户、供应商、充电器、工厂、核查样品、实验室结果或合规记录。',
        answer: 'REACH／SVHC 声明说明某一精确型号、物料清单版本，针对特定候选清单日期、各组成物品的 0.1% w/w 阈值采用了什么判断依据。它不是 ECHA 核发的产品证书，笼统的“REACH compliant”也不会自动覆盖后续换料、SCIP 申报或其他 REACH 义务。海外买家应把声明逐项连回当前零部件与上游证据；ZIMONAI 的编辑判断是，这份文件应当作为追溯工作的入口，而不是整个合规项目的结案依据。',
        takeaways: [
          '先核对声明所指的产品、出具法律主体、物料清单版本和候选清单基准日，再阅读合规结论。',
          '充电器是由多个对象组成的复杂产品；0.1% w/w 阈值要用于其中每个仍属于“物品”的组成件，不能只用整机重量稀释。',
          '把第 33 条信息传递、欧盟市场责任方的 SCIP 义务，以及其他 REACH 限制或授权问题分开核查；一句供应商声明无法一次回答全部问题。'
        ],
        sections: [
          {
            title: 'REACH 第 33 条实际要求什么？',
            paragraphs: [
              'ECHA 说明，欧盟或欧洲经济区的物品供应方，如果物品中的候选清单物质超过 0.1% w/w，就必须向专业接收方提供足以安全使用的现有信息，至少要告知物质名称。消费者提出同类信息请求时，供应方须在 45 天内免费回复。这项义务来自物质被列入候选清单，并非由某一种民间测试报告格式或 ECHA 产品批准产生。',
              '中国出口商可以提供评估所需的上游资料，但 ECHA 的官方摘要是按角色把面向欧盟市场的义务放在欧盟或欧洲经济区的生产商、进口商和供应方身上。因此，买家还要确认由谁把充电器投放欧盟市场、谁已审核产品资料，不能把出口商的一封声明当作合规链的终点。'
            ]
          },
          {
            title: '为什么一页“符合 REACH”声明可能写得太宽泛？',
            paragraphs: [
              '欧盟法院在 C-106/14 判决中确认，0.1% 阈值要用于复杂产品中的每一个物品；ECHA 指南也采用相同原则。对充电器而言，线材、外壳零件、连接器等组成件都可能需要分别追溯。如果只把某种物质的重量除以整台充电器的重量，就可能把单个组成件超过阈值的结果稀释掉。',
              '候选清单会更新，充电器的物料清单也可能改版。因此，有判断价值的声明至少要写明精确型号与变体、覆盖的生产或物料清单版本、出具方与日期、候选清单截止日、物质识别或筛查依据、所用阈值及排除范围。即使旧版声明是真实文件，也不能自动覆盖后来更换的塑料、线材、焊料、胶黏剂、连接器或次级供应商。'
            ],
            items: [
              '精确型号、电气变体及随附线材或配件',
              '制造商或供应商法律名称与授权签字人',
              '物料清单或材料清单版本与出具日期',
              '候选清单版本或明确基准日',
              '以各组成物品为基础的 0.1% w/w 评估',
              '超过阈值时的 SVHC 名称与安全使用信息'
            ]
          },
          {
            title: '买家怎样测试这份声明是否值得采信？',
            paragraphs: [
              'ZIMONAI 的实务做法是建立“零件—证据”对照表。先锁定报价型号和现行物料清单，再找出风险较高的塑料、线材组件、连接器、涂层、焊料及其他组成物品，逐项连接到上游材料声明、测试证据或书面评估。遇到资料缺口就明确标记，不能把资料缺失自动解释成通过。',
              '如果供应商申报某项 SVHC 超过 0.1% w/w，应取得物质名称和足够的安全使用信息，再由负责的欧盟市场主体确认第 33 条沟通与 SCIP 申报是否适用。如果结论是未超过阈值，也要保存带日期的判断依据和变更控制关系。这能提高可追溯性，但仍属于文件和抽样证据，不能视为每一件产品或所有 REACH 规则的保证。'
            ]
          }
        ],
        checklist: [
          '充电器、电源适配器与配件的精确型号',
          '声明出具方、法律主体、签字和日期',
          '现行物料清单或材料清单版本',
          '候选清单基准日与物质识别信息',
          '各组成物品的 0.1% w/w 评估方式',
          '上游材料声明、测试报告或评估记录',
          '材料和次级供应商变更控制',
          '欧盟进口商或供应方对第 33 条与 SCIP 义务的审核'
        ],
        limitsText: 'REACH／SVHC 声明是供应链文件证据，并非 ECHA 颁发的产品证书。它不能单独证明实验室结果准确、物料清单完整、量产一致、完全不含有害物质、符合所有 REACH 限制或授权规定、已完成 SCIP 申报，也不能证明 RoHS、电气安全、CE 符合性、工厂身份或出货质量。第 33 条的 0.1% 是信息传递阈值；含有 SVHC 并不等于已经证明消费者会接触或风险不可接受。如果产品识别、候选清单日期或零件层级的判断基础不完整，结论就应保留为尚未确认。'
      },
      iso9001Factory: {
        topic: '中国工厂核查',
        published: '2026 年 9 月 3 日',
        readTime: '约 8 分钟',
        title: 'ISO 9001 证书能证明这家中国供应商就是充电器工厂吗？',
        description: '有效证书可以支持证书所列组织在相应场所和范围内运行质量管理体系，但不能证明充电器已获得产品认证，也不能单独确认报价型号由谁生产。',
        imageAlt: '橙色背景上的写字板和条纹核对单，用于说明 ISO 9001 工厂证据核查。',
        imageCaption: '核对单为编辑用图片；不是 ZimonAI 的供应商、客户、工厂、审核、ISO 证书或生产记录。',
        answer: 'ISO 9001 证书的作用，是支持特定法律主体在证书列明的场所、活动范围和有效期内运行质量管理体系。它属于管理体系认证，不代表充电器获得产品认证，也不会自动证明卖方拥有工厂或本批订单在该场所生产。海外买家应先独立核对证书状态，再把获证主体和生产地址连回报价型号及当前生产记录；ZIMONAI 的编辑判断是，这张证书是核查工厂关系的起点，不是“这就是工厂”的答案。',
        takeaways: [
          '确认发证机构，并查询证书当前状态；ISO 负责制定标准，本身不为企业签发 ISO 9001 证书。',
          '核对组织名称、统一社会信用代码、注册地址、认证覆盖的经营地址和制造范围，不能只看 ISO 标识或公司名称。',
          '用型号、工艺、物料清单和订单资料将获证场所对应到报价充电器；管理体系认证不是产品认证。'
        ],
        sections: [
          {
            title: '证书是谁签发的，又认证了什么？',
            paragraphs: [
              'ISO 将 ISO 9001 定位为质量管理体系的要求标准。组织是否申请认证是自愿选择，审核和发证由独立认证机构执行；ISO 本身不认证企业，也不签发证书。因此，第一步应核实证书上的认证机构、官方联系方式、证书查询渠道，以及该机构能否开展所列业务，不能把供应商 PDF 上的 ISO 标识当成最终证据。',
              '在中国境内开展的质量管理体系认证，目前执行 CNCA-QMS-01:2025，并以 GB/T 19001 和／或 ISO 9001 为认证依据。规则要求审核覆盖管理体系以及认证范围内具有代表性的产品或服务，同时要求审核报告说明审核基于抽样。证书有效期最长三年，期间仍需接受监督，也可能被暂停或撤销。今天查到的状态是一项带有查询日期的证据，并非永久保证。'
            ]
          },
          {
            title: '法律主体、工厂地址和制造范围是否全部一致？',
            paragraphs: [
              'CNCA-QMS-01:2025 要求中国质量管理体系证书列出获证组织、统一社会信用代码、注册地址、认证覆盖的经营地址、产品／活动／服务范围、适用标准、发证与到期日期、证书编号、认证机构及查询渠道；对于多场所组织，认证范围内的每个场所都要列明。采购方可以据此检验“这是工厂”的说法，而不是把证书当作装饰。',
              '将证书与中国营业执照、报价单、合同、开票资料，以及供应商声称的生产地址放在一起核对。证书如果属于贸易公司、办公室、无关地址，或范围只写销售／服务，就不能单凭它证明某款充电器由所考察工厂生产。信息不一致也不必立刻认定造假：OEM、集团公司和分包安排可能合理，但买家在采信之前仍需取得可追溯的关系文件。'
            ],
            items: [
              '获证法律名称和统一社会信用代码',
              '注册地址及认证覆盖的全部经营场所',
              '与充电器相关的制造活动和产品范围',
              '证书编号、发证日、到期日和当前状态',
              '认证机构，以及存在相关声明时的认可范围',
              '卖方、证书持有人和实际工厂之间的书面关系'
            ]
          },
          {
            title: '还要哪些证据，才能对应到这款充电器和本批订单？',
            paragraphs: [
              'ISO 的符合性说明提醒，管理体系认证标志不能以暗示产品本身获得认证的方式标在产品上。这一区分十分关键：ISO 9001 可以支持一个组织如何管理流程，却不能证明充电器满足电气安全、EMC、化学物质、性能或目的市场法规。',
              'ZimonAI 的实务方法是将四段关系明确连接起来：卖方与获证法律主体；获证主体与认证覆盖的生产地址及范围；工厂与报价型号、工艺及现行物料清单；型号与本批订单的样品、生产计划和检验记录。现场可抽查型号专用作业指导书、进料和出货检验标准、不合格及纠正措施记录，以及追溯样本。这些资料不会把抽样审核变成确定性保证，但能检验证书所称体系是否实际用于买家要采购的产品。'
            ]
          }
        ],
        checklist: [
          '证书原始编号、认证机构和官方查询渠道',
          '记录查询日期以及有效、暂停、撤销或过期状态',
          '获证中文法律名称及统一社会信用代码与营业执照一致',
          '注册地址、实际生产地址与证书所列全部场所相符',
          '认证范围明确覆盖相关制造活动和产品',
          '卖方、证书持有人、品牌方和生产工厂之间的书面关系',
          '报价型号、规格、物料清单和工艺流程能够对应到该场所',
          '近期且与型号相关的生产、检验、追溯和纠正措施记录'
        ],
        limitsText: 'ISO 9001 证书是针对所列组织、场所、范围和有效期的管理体系证据，不能证明工厂所有权、卖方授权、产品认证、精确型号合规、市场准入、产能、财务状况、劳工或环境表现、知识产权以及本批货物质量。认证审核和买家核查都采用抽样，记录也可能不完整或在访问后发生变化。法律主体、经营场所、认证范围或证书状态如果无法独立对应，就应将工厂关系保留为未确认，而不是用证书替它背书。'
      },
      rohsTestReport: {
        topic: '欧盟限用物质合规',
        published: '2026 年 9 月 1 日',
        readTime: '约 7 分钟',
        title: '供应商提供了 RoHS 测试报告，能证明这款充电器符合欧盟要求吗？',
        description: '报告只能支持实际列出的样品和材料，不能替代具体产品的技术文件、EU 符合性声明和量产控制。',
        imageAlt: '电路板上电子元器件和焊接部位的微距照片，用于说明 RoHS 证据核查。',
        imageCaption: '电路板为编辑配图；不是 ZimonAI 的供应商、客户、工厂、充电器、送检样品或合规记录。',
        answer: 'RoHS 测试报告的作用，是记录文件明确识别的样品或均质材料、测试方法、受测物质和结果。报告上的“PASS”不代表整台充电器的所有材料与后续替代料都已覆盖，也不等于制造商完成了技术文件、EU 符合性声明和批量生产控制。海外买家应把报告对应到当前型号、物料清单和变更记录；ZIMONAI 的编辑判断是，报告价值取决于覆盖关系是否清楚，而不是 PDF 数量或结论页上的一个词。',
        takeaways: [
          '不要只看“PASS”结论，应逐项确认产品或材料身份、型号、部件、颜色、测试方法、物质、结果和报告限值。',
          '用当前物料清单把送检样品对应到报价充电器的均质材料，未检测的型号或材料不能依靠相似外观自动获得覆盖。',
          '向制造商索取现行 RoHS 技术资料和 EU 符合性声明，并单独核实豁免状态及后续物料变更。'
        ],
        sections: [
          {
            title: '一份合格报告到底证明了什么？',
            paragraphs: [
              '欧盟委员会目前列出十种 RoHS 限用物质。《2011/65/EU 指令》第 4 条和附件 II 按均质材料重量设定最高浓度：镉为 0.01%，其余九种物质为 0.1%，同时还要判断产品是否属于排除范围或特定用途豁免。因此，供应商在规格书上写“RoHS compliant”，并没有说明哪些材料被评价。',
              'IEC 62321-2 给出分析测试前的拆解、分离和样品制备策略。采购方需要根据报告中的样品描述和制备信息理解结果。ZimonAI 的实务判断是，合格结论只能支持送检样品所代表的材料或部件；没有列入报告的塑料、涂层、焊料、线缆、连接器，以及后来更换的物料来源，都不能被默认包含。'
            ]
          },
          {
            title: '为什么 RoHS 合规不等于积累更多测试报告？',
            paragraphs: [
              '现行指令第 7 条要求制造商编制技术文件、实施内部生产控制、签署 EU 符合性声明、加贴 CE 标志、将资料保存十年，并建立程序保证批量生产持续符合；第 13 条说明，制造商通过签署声明承担产品符合指令的责任。检测机构出具报告，并不会取代制造商的责任。',
              '欧盟《2020/659 号实施决定》公布 EN IEC 63000:2018 为 RoHS 协调标准。IEC 对 IEC 63000 的定位是：规定制造商为了声明限用物质合规而编制的技术文件。它不是欧盟颁发的产品批准证书。采购核查应关注证据能否形成闭环，包括产品结构、物料及上游资料、风险判断、测试结果、豁免依据和具体型号声明。'
            ],
            items: [
              '制造商及具体产品／型号的识别信息',
              '最新物料清单、元器件和材料版本',
              '上游材料声明及相应测试支持',
              '均质材料评价和未解决的风险缺口',
              '附件 III／IV 豁免的用途、范围和有效状态',
              '更新后的 EU 符合性声明与变更记录'
            ]
          },
          {
            title: '下单前怎样确认报告属于当前报价型号？',
            paragraphs: [
              '将报价单、铭牌、实物样品、物料清单和报告放在一起核对。需要一致的字段包括报告编号和日期、申请方、制造商、型号、样品照片、材料或部件名称、颜色、实验室、方法、受测物质和结果。若报告只涉及外壳树脂、线缆、PCB 样品或部分元器件，应追问其他均质材料由哪些资料支持；不同功率、插脚或颜色共用报告，也应提供书面的物料和型号对应关系。',
              '豁免状态不能只看旧 PDF。欧盟委员会说明，RoHS 豁免有期限并会定期重新评估，已经提交的续期申请也可能影响纸面到期日之后的状态。保存所依据的豁免原文和查询日期，并确认产品类别及具体用途相符。第 7 条还要求考虑产品设计、特性、协调标准和技术规范的变化；因此，ZimonAI 会在更换材料、元器件供应商、PCB 或线缆时重新评估证据，但不会在缺少核实前直接认定产品不合格。'
            ]
          }
        ],
        checklist: [
          '完整品牌、型号、版本、插头、接口、功率和颜色',
          '报告编号、日期、申请方、制造商和检测机构',
          '能够对应材料／部件编码的样品照片与描述',
          '测试方法、物质、结果、单位和报告限值',
          '最新物料清单及每份报告／声明与产品的对应关系',
          '附件 III／IV 豁免的用途和当前状态',
          '制造商技术文件及已签署的 EU 符合性声明',
          '变更控制和按风险安排的量产或出货验证'
        ],
        limitsText: 'RoHS 报告只支持其中列明的样品、方法和结果；不能证明中国卖方的法律主体、工厂所有权、使用其他公司资料的授权、电气安全、EMC、REACH、产品性能、产能或本批货物质量，也不能证明未送检材料、后续替代料和每件量产品都与样品一致。具体充电器是否属于适用范围、能否使用某项豁免以及技术文件是否充分，需要结合实际产品和当时有效规则判断；仍有疑问时，应向负责的经济运营者或成员国主管部门确认。'
      },
      euSafetyGate: {
        topic: '欧盟市场监管',
        published: '2026 年 8 月 30 日',
        readTime: '约 7 分钟',
        title: '欧盟 Safety Gate 没有这款充电器的记录，就能认为产品安全吗？',
        description: 'Safety Gate 发布主管部门通报的危险产品与纠正措施；搜索无结果，不等于充电器、供应商或本批货物获得安全认可。',
        imageAlt: '大理石台面上的电源适配器和 USB-C 线缆，用于说明欧盟 Safety Gate 核查。',
        imageCaption: '电源适配器和线缆为编辑配图；不是 ZimonAI 的供应商、客户、核查、召回或产品安全证据。',
        answer: 'Safety Gate 的作用，是汇集欧盟成员国提交的危险产品通报与纠正措施，为特定产品提供可用于采购决策的市场后风险线索。它不是上市前审批或完整的安全产品名录，搜索无结果只说明按当次名称、型号和筛选条件没有找到公开预警。海外买家应把预警内容连回报价型号、批次和合规资料；ZIMONAI 的编辑判断是，这套系统适合筛查风险并升级异常，不适合作为“产品安全”的单一结论。',
        takeaways: [
          '发现疑似匹配记录时，应把它视为需要立即核对型号和批次的官方市场后风险信息，不能直接推断该供应商的全部产品都有相同问题。',
          '不要只查一个名称；还要比较预警编号、产品描述、品牌、Model／Type、图片、风险和已采取的措施。',
          '没有搜索结果只代表完成了一项数据库核查；型号声明、测试报告、标签、追溯信息和量产一致性仍需继续验证。'
        ],
        sections: [
          {
            title: '一条 Safety Gate 预警记录究竟证明什么？',
            paragraphs: [
              '欧盟《2023/988 号法规》第 25 和 26 条把 Safety Gate 定义为交换危险产品纠正措施信息的快速预警系统。成员国将主管部门或经济运营者采取的措施提交系统，再由欧盟委员会检查并传递符合要求的通报。因此，这类记录反映的是市场监管发现和后续行动，并不是产品上市前获得的证书。',
              '欧盟委员会《Safety Gate 2025》报告给出了完整流程：国家主管部门在市场上识别危险产品，提交已采取的措施，欧盟委员会共享信息，其他主管部门检查本国市场，最后在公开门户发布摘要。记录可以支持特定产品、风险与措施的对应关系，却不能证明外观相似、输出配置不同或同一卖方的其他产品存在同样缺陷。'
            ]
          },
          {
            title: '采购方怎样把预警记录对应到报价型号？',
            paragraphs: [
              '欧盟委员会说明，公众可以在 Safety Gate 门户按不同条件搜索危险产品、查看预警详情并导出结果。先用完整品牌和 Model／Type 搜索，再根据报价单、铭牌、包装和实物上的有效识别信息，改用具有区分度的型号片段、产品类别或其他字段复查。应保存查询日期、筛选条件和预警编号，方便之后复现。',
              'ZimonAI 的实务判断是，把预警页与报价资料并列，逐项使用页面实际提供的字段：产品描述、品牌、Model／Type、条码或其他编码、图片、原产国、风险说明、被指出的不符合事项、涉及批次和纠正措施。共用外壳，或都被笼统称为“USB 充电器”，不足以证明是同一产品。'
            ],
            items: [
              'Safety Gate 预警编号和查询日期',
              '完整品牌、Model／Type 及全部型号后缀',
              '产品图片、插头、接口、功率和标签布局',
              '页面列出时的条码、批次或其他产品编码',
              '原产国，以及可获取时的经济运营者名称',
              '风险说明、引用要求和纠正措施'
            ]
          },
          {
            title: '查到或查不到记录后，采购应怎样处理？',
            paragraphs: [
              '如果关键识别信息合理匹配，应先暂停采信供应商的安全声明，确认报价型号、版本或批次是否落入预警范围。要求制造商提供纠正措施、更新后的型号证据，并向销售目的地主管部门确认当前状态。撤市、召回、禁售或删除网络商品等措施，应按预警原文理解，不能被弱化成一句“以前的小问题”。',
              '如果没有匹配记录，采购审核仍不能结束。针对充电器，通常还要把精确制造商和型号对应到适用的符合性声明、安全与 EMC 证据、铭牌和额定值、欧盟经济运营者、样品结构以及约定的量产控制。这是 ZimonAI 的证据处理建议，不是欧盟委员会对某一产品作出的安全结论。'
            ]
          }
        ],
        checklist: [
          '完整品牌、型号、版本、插头、接口和额定功率',
          '使用完整识别信息和有效型号片段搜索 Safety Gate',
          '保存查询日期、筛选条件、预警编号和必要的导出结果',
          '逐项比较预警图片、编码、风险和纠正措施',
          '疑似匹配时取得供应商书面说明和纠正措施证据',
          '另行核实精确型号的声明、测试证据、标签和欧盟追溯信息',
          '根据订单风险安排出货或量产一致性控制'
        ],
        limitsText: 'Safety Gate 预警只能支持该条记录所描述的产品、风险和纠正措施；不能自动识别每个品牌背后的中国工厂、证明供应商所有产品都危险，也不能因为外观相似就认定属于同一型号。反过来，公开搜索无结果也不能证明产品安全、已经获得市场准入、证书真实、工厂所有权、卖方授权、量产持续一致或本批货物质量。国家主管部门可以更新或撤回预警，搜索结果也会受到识别信息、筛选条件、语言和查询日期影响。'
      },
      ieceeCbCertificate: {
        topic: '国际安全认证',
        published: '2026 年 8 月 28 日',
        readTime: '约 7 分钟',
        title: '供应商提供 IECEE CB 测试证书，就代表这款充电器能进入所有市场吗？',
        description: 'CB 证书可以为各国认证提供基础，但采购方仍需核对官方记录、具体型号、签发机构和目的国规则。',
        imageAlt: '黄色背景上的白色电源适配器，用于说明 IECEE CB 证书核查。',
        imageCaption: '电源适配器为编辑用图片；不是 ZimonAI 的供应商、客户、实验室、证书或市场准入证据。',
        answer: 'IECEE CB 测试证书的作用，是说明证书代表的选定样品已按列明标准完成 CB Scheme 评估，并为后续目的国认证申请提供基础。它不包含持续工厂监督，也不等于所有国家已经自动准入或后续量产都与受测样品一致。海外买家应核对官方状态、签发机构、完整型号和额定值，再确认目的国的国家差异与程序；ZIMONAI 的编辑判断是，CB 文件是目的国认证的基础，不是全球通行证。',
        takeaways: [
          '用证书编号查询 IECEE 官方数据库，不要把供应商发送的 PDF、标志或报告封面当成最终验证。',
          '将型号、额定值、品牌、制造商、标准版本和 National Differences 与报价产品逐项对应。',
          '针对具体销售国家，向主管部门或 NCB 确认认证标志、注册、国家差异和工厂监督要求。'
        ],
        sections: [
          {
            title: '数据库显示“Valid”，这项状态证明到哪里？',
            paragraphs: [
              'IECEE 公开证书平台说明，该数据库用于查找各 NCB 的证书，但页面内容只是证书和报告的摘录，完整资料由证书持有人提供。平台还明确指出，CB Scheme 按照 ISO/IEC 17067 type 1a 对选定样品进行测试并签发证书，不包含持续工厂监督。因此，“Valid”支持的是一项具体证书记录，而不是对后续每批量产的持续批准。',
              '根据 IEC 的说明，Test Report Form 必须由获认可的 CB Testing Laboratory 签署，并作为 NCB 签发的 CB Test Certificate 附件，才能成为有效 CB Test Report。只有测试报告文件、实验室名称或 IEC 标准编号，不足以构成完整的 CB 证据。'
            ]
          },
          {
            title: '怎样确认报价型号确实在证书范围内？',
            paragraphs: [
              'IECEE 官方结果列出证书状态和编号、产品、制造商、额定值及主要特性、品牌、Model／Type Ref.、采用标准、National Differences、签发日期和 NCB。核查时应把这些字段与报价单、铭牌、包装、样品和技术规格并列，包括型号后缀、功率和接口配置都不能省略。',
              'ZimonAI 的实务判断是，先让供应商解释清楚公司名称和型号之间的每一处差异。OEM 品牌、贸易公司销售或系列型号可能存在合理关系，但需要书面关系和覆盖范围作为支持。若数据库中没有记录，IECEE 建议联系证书持有人或签发 NCB；公开查不到属于待补证据，不能直接等同于伪造。'
            ],
            items: [
              '证书编号、状态和签发日期',
              '产品描述及完整 Model／Type Ref.',
              '输入、输出、功率、防护类别和接口配置',
              '制造商、申请人、品牌与卖方的关系',
              '记录中的 IEC 标准及版本',
              'National Differences 和签发 NCB'
            ]
          },
          {
            title: '取得 CB 证书后，还需要目的国认证吗？',
            paragraphs: [
              '需要单独确认。现行 IECEE 基本规则把成员对 IECEE 文件的认可，与授予 National Mark 或其他国家认可机制联系起来；IEC 的官方说明则强调，考虑相关国家差异后，国家层级的批准和认证会得到便利。也就是说，CB 文件是国家认证的基础之一，并不代表准入已经自动完成。',
              '下单前应先明确销售国家，再向当地主管部门或 NCB 核实国家差异、插头、认证标志、注册和工厂监督。这是 ZimonAI 根据官方制度边界作出的证据处理结论，不是某个 NCB 对具体产品作出的批准。'
            ]
          }
        ],
        checklist: [
          '带查询日期的 IECEE 官方搜索结果',
          '证书编号、状态、签发日期和 NCB',
          '完整品牌、制造商、型号和 Type Ref.',
          '输入／输出额定值、功率、防护类别和接口布局',
          'IEC 标准、版本及列明的 National Differences',
          '与证书相连、由认可 CBTL 签署的 CB Test Report',
          '单独确认目的国准入和工厂监督要求'
        ],
        limitsText: 'CB Test Certificate 只针对证书所列标准、选定样品和覆盖范围；不能证明中国卖方就是制造商或授权经销商、工厂拥有证书、每批出货都与送测样品一致，也不能代替所有国家规则。EMC、无线、能效、限用物质、插头、标签、注册、运输和合同要求可能需要不同证据。公开数据库只是摘录；状态或细节不清时，应向证书持有人或签发 NCB 确认。'
      },
      usbIfCertification: {
        topic: 'USB 充电器认证',
        published: '2026 年 8 月 26 日',
        readTime: '约 7 分钟',
        title: '报价写着“USB PD”，就能证明 GaN 充电器通过 USB-IF 认证吗？',
        description: 'USB PD 是供应商声称支持的技术；要证明 USB-IF 认证，还要找到精确产品记录，并对应公司、型号与 TID。',
        imageAlt: '电源适配器旁的 USB-C 线材照片，用于说明 USB-IF 充电器记录核对。',
        imageCaption: '电源适配器和 USB-C 线材为编辑用图片；不是 ZimonAI 的供应商、客户、实验室或认证证据。',
        answer: 'USB-IF 认证的作用，是确认精确产品通过适用的 Compliance Program，并以型号、产品类别和 Test ID（TID）进入官方记录。报价中的“USB PD”、“USB-C”或“GaN”只是技术或产品主张，标志图片、芯片能力和相似外壳都不等于该型号已经列名。海外买家应把官方记录连回报价型号、功率和接口配置；ZIMONAI 的编辑判断是，核查关键不在有没有标志，而在产品是否具备可追溯的认证身份。',
        takeaways: [
          '先确认供应商是在声称支持 USB 规范，还是声称取得 USB-IF 认证；两种说法需要不同证据。',
          '用精确产品和公司名称查询 USB-IF Product Search，并保存 TID、型号、类别、认证日期和查询日期。',
          'OEM 名称、额外型号后缀、接口或功率配置不同时，都要补充关系证据，不能因外壳相同就自行对应。'
        ],
        sections: [
          {
            title: 'USB PD 声明与 USB-IF 认证有什么区别？',
            paragraphs: [
              'USB-IF 将 Compliance Program 说明为一套通过 Test ID 追踪的测试规范。产品通过后，才会被视为 USB-IF certified、加入 Integrators List，并可能获得 USB-IF 标志授权。报价只写“USB PD”或“USB-C”，并没有体现这些步骤。',
              '官方标志指南对充电器的要求更明确：Certified USB Charger 与 Certified USB Fast Charger 标志，只能用于通过适用 USB-IF 测试程序并已列入 Integrators List 的产品，瓦数也是标志图稿的一部分。因此，粘贴一张标志图片、提供 USB Power Delivery 测试报告，或只证明控制芯片支持相关功能，都不能替代精确产品记录。'
            ]
          },
          {
            title: '官方产品记录需要核对哪些字段？',
            paragraphs: [
              'USB-IF Product Search 只收录获准使用 USB-IF 标志的认证产品。公开页面默认显示近两年的记录，查询较旧产品时要调整日期范围。USB-IF 还提醒，认证日期超过两年的产品不一定符合当前版本的 Compliance Program；找到旧记录后，仍要保存日期并说明它的时效背景。',
              'ZimonAI 的实务判断，是把报价、产品标签、包装与官方结果并列比对。对应关系必须落实到产品层级，不能从企业会员身份、元器件认证，或另一款共用外壳的充电器直接推断。'
            ],
            items: [
              '列名公司及其与中国卖方的关系',
              '完整产品名或型号，包括后缀与修订版本',
              'Test ID（TID）、产品类别和认证日期',
              '单口或多口充电器类别',
              '认证标志功率与报价的单口／总输出',
              '带查询日期的报价、标签、包装和官方结果'
            ]
          },
          {
            title: 'OEM 或相似型号可以沿用另一款充电器的认证吗？',
            paragraphs: [
              '有可能，但必须采用 USB-IF 认可的程序。USB-IF 将 OEM arrangements 与 Qualification by Similarity 列为认证途径；其相似性政策明确，只有 USB-IF 的 compliance committee 与 certification review board 可以批准 Qualification by Similarity。获得批准后，新产品会取得新的 TID 并加入 Integrators List。',
              'USB-IF 的型号政策允许只有外观差异的多个产品名或型号共用一个 TID，但会影响 USB 兼容性的差异不能隐藏在通配符后。对于多口 GaN 充电器，如果接口配置、功率分配、固件或标称功率不同，应要求供应商提供文件说明，不能把它当成只有颜色差异。这是 ZimonAI 的证据处理判断，不是 USB-IF 对具体供应商作出的认定。'
            ]
          }
        ],
        checklist: [
          '完整品牌、产品名、型号、修订版本和接口配置',
          '声明类型：支持 USB 规范，或已取得 USB-IF 认证',
          'USB-IF Product Search 结果与查询日期',
          '列名公司、TID、产品类别和认证日期',
          '标志与功率用法是否对应报价产品',
          '名称不同时的 OEM 或 Qualification by Similarity 关系',
          '另行确认的安全、市场准入和出货一致性证据'
        ],
        limitsText: 'USB-IF 记录针对该列名所代表的 USB 兼容性范围；不能证明产品确实采用 GaN 元器件、取得电气安全认证、符合特定市场法规、自有工厂、卖方拥有销售授权、量产持续一致、每种接口组合都达到广告性能，或本批出货质量合格。公开查询不到结果时，应先排除日期筛选和型号差异；它属于待补资料，不能直接作为虚假声明的证据。'
      },
      euEconomicOperator: {
        topic: '欧盟市场可追溯性',
        published: '2026 年 8 月 22 日',
        readTime: '约 6 分钟',
        title: '充电器上的欧盟联系地址，能证明中国供应商已合规吗？',
        description: '欧盟经济运营者的地址可以帮助追溯产品，但它本身无法把中国卖方、精确型号和必要合规文件连起来。',
        imageAlt: '桌面上摆放的充电器照片，用于说明欧盟产品可追溯性。',
        imageCaption: '桌面上的充电器为编辑用图片；不是 ZimonAI 的供应商、客户、核查现场或合规记录。',
        answer: '欧盟经济运营者联系资料为适用产品提供一个设立在欧盟境内、能够被识别和联系的追溯入口。这个地址不代表中国卖方就是制造商，也不等于报价型号已被 EU 符合性声明覆盖或每批出货持续一致。海外买家在采购前应先确认该主体的法律角色，再把卖方、制造商、合规文件和精确型号连成证据链；ZIMONAI 的编辑判断是，联系地址是打开整条证据链的入口，不是对供应商的合规背书。',
        takeaways: [
          '先逐字记录产品、包装或随附文件上的欧盟联系资料，再确认它的法律角色。',
          '制造商、欧盟进口商或授权代表要分别确认，也要分别索取对应报价型号的文件。',
          '可以联系的欧盟窗口只是证据链中的一环，不能代替型号、文件和出货核对。'
        ],
        sections: [
          {
            title: '欧盟经济运营者的地址，能确认什么？',
            paragraphs: [
              '欧盟《2019/1020 号法规》要求，属于其范围的产品进入市场前，须有设立在欧盟境内的经济运营者。该运营者的名称、注册商号或商标，以及包括邮寄地址的联系资料，必须标注在产品、包装、包裹或随附文件上。',
              '对买家而言，这个地址值得原样保存：它是产品进入欧盟市场时可以识别的联系点。但它不能证明该地址就是报价中的中国公司、该公司拥有工厂，或标注的充电器与报价产品是完全相同的电气版本。'
            ]
          },
          {
            title: '它是制造商、进口商，还是授权代表？',
            paragraphs: [
              '角色不同，需要追问的资料也不同。欧盟官方说明，进口商是设立在欧盟、把来自非欧盟国家的产品投放到欧盟市场的自然人或法人；授权代表则是由制造商委任、代为处理特定工作的对象，并不当然等于制造商或卖方。',
              '欧盟委员会指出，进口商须确认非欧盟制造商已完成必要步骤、所需文件可在被要求时提供，并且能够随时联系制造商。因此，看到联系地址后，下一步应是问清角色与文件，而不是直接断定中国供应商已获认可。'
            ],
            items: [
              '欧盟联系人名称和邮寄地址（按标注原样记录）',
              '声明角色：制造商、进口商或授权代表',
              '中国制造商的完整法律名称和地址',
              '中国卖方与欧盟经济运营者不同时，双方关系的书面说明'
            ]
          },
          {
            title: '怎样把联系地址连回正在采购的充电器？',
            paragraphs: [
              '先固定报价的型号、额定值、插头版本和品牌，再与 EU 符合性声明及责任链可以提供的技术资料逐项比对。如果文件不能显示覆盖报价变体，只写品牌名称或模糊的系列说明，都还不够。',
              'ZimonAI 的实务判断会把四段关系分开：中国卖方与制造商、制造商与欧盟运营者、欧盟运营者与文件、文件与精确型号。任何一段无法连起来，都应列为待补资料，不能直接当作不实宣传的结论。'
            ]
          }
        ],
        checklist: [
          '显示欧盟联系资料的产品、包装或文件照片／扫描件',
          '精确充电器型号、品牌、插头版本和电气额定值',
          '中国制造商的法律名称和地址',
          '欧盟运营者的角色和书面关系说明',
          '能够识别报价型号或合理支持型号范围的 EU 符合性声明',
          '支持文件可提供的状态和核对日期'
        ],
        limitsText: '欧盟经济运营者的联系资料可以支持产品可追溯性，也可能成为索取文件的入口；但它本身不能证明产品安全、CE 合规、工厂所有权、卖方授权、文件持续有效，或每一批出货都一致。实际义务也会随产品功能和适用的欧盟规则而异。'
      },
      legalEntity: {
        topic: '供应商身份',
        published: '2026 年 8 月 20 日',
        readTime: '约 6 分钟',
        title: '向中国供应商付款前，先找出英文名称背后的法律主体。',
        description: '如何用中文企业名称和统一社会信用代码，核对合同、收款账户、营业执照与认证持有人。',
        imageAlt: '合同与钢笔的近景照片，用于说明供应商法律主体核查。',
        imageCaption: '合同上的名称必须能够连回登记主体和预定收款人，才有判断价值。',
        answer: '完整中文企业名称、18 位统一社会信用代码，是中国供应商法律主体的稳定识别基准，也能回查官方公示记录。英文译名、平台店名或邮件签名容易混淆卖方、签约方和收款方，而企业登记本身也不代表该主体自有工厂或会履行订单。海外买家付款前应比较登记主体、合同方、发票方和银行收款人；ZIMONAI 的编辑判断是，主体一致性是付款核查的第一道门，任何名称差异都应先取得书面说明。',
        takeaways: [
          '中文企业名称应按营业执照原样保留，不要自行改成看起来更顺的版本。',
          '结合 18 位统一社会信用代码，可以降低同名和英文译名造成的误判。',
          '查到登记资料只能证明主体与当时可见记录，不能直接证明工厂产能。'
        ],
        sections: [
          {
            title: '为什么英文名称不足以识别交易主体',
            paragraphs: [
              '供应商可能使用英文译名、品牌名、香港公司名称或平台店名，这些名称不一定与中国大陆实际签约主体一致。同一个中文名称也可能有多种合理英译。名称不同不一定意味着欺诈，但说明买家还没有找出究竟由哪家公司承担义务。',
              '更稳定的比对基准，是营业执照上的中文企业名称加统一社会信用代码。这两项资料可以原样放在营业执照、公示记录、合同、发票和付款指示之间交叉核对。'
            ]
          },
          {
            title: '官方公示系统能够确认哪些资料',
            paragraphs: [
              '国家企业信用信息公示系统是中国企业登记和信息公示的法定平台。根据具体主体和当时可见资料，可能查到登记备案、经营状态、企业年报、行政处罚、经营异常等信息。',
              '核查时应保留查询日期和实际使用的字段。公开资料可能更新，部分内容由企业申报，暂时无法访问也不能直接写成“公司不存在”。'
            ],
            items: [
              '中文企业名称与统一社会信用代码',
              '登记状态与成立日期',
              '注册地址与法定代表人',
              '经营范围表述',
              '可获取的经营异常与行政处罚记录'
            ]
          },
          {
            title: '付款前至少做一次四方比对',
            paragraphs: [
              '把登记主体、合同签约方、发票开具方和银行收款人并列查看。如果收款公司不同，应先要求供应商书面说明彼此的商业和法律关系，再决定是否接受。',
              '认证文件也要采用同样的方法。认证持有人和卖方不同，可能存在合理的制造、经销或品牌关系；但供应商仍应说明关系，并提供能够覆盖报价型号的证据。'
            ]
          }
        ],
        checklist: [
          '营业执照上的完整中文企业名称',
          '统一社会信用代码',
          '带有查询日期的公示记录',
          '合同签约方与发票开具方',
          '银行收款人及账户所在地',
          '每一处主体名称差异的书面说明'
        ],
        limitsText: '企业登记能够证明法律主体和查询时可见的公示记录，不能单独证明该公司自有工厂、控制报价产线、具备足够产能、财务稳健，或一定会履行下一笔订单。'
      },
      fccId: {
        topic: '美国市场合规',
        published: '2026 年 8 月 20 日',
        readTime: '约 7 分钟',
        title: '每款充电器都要有 FCC ID 吗？先判断它采用哪种授权程序。',
        description: 'FCC Certification 和 SDoC 是不同程序。先确认产品功能与适用路径，再判断查不到 FCC ID 是否真的有问题。',
        imageAlt: '电子电路板微距照片，用于说明 FCC 设备授权核查。',
        imageCaption: '先看产品的射频功能与适用程序，再看标志或数据库。',
        answer: 'FCC 设备授权核查的作用，是先按产品功能判断适用 Certification 或 SDoC，再寻找相应的授权记录或符合性信息。FCC ID 只对应经 Certification 授权的设备，查不到它不等于产品违规，查到有效记录也不证明电气安全、供应商身份或实际出货配置。海外买家应核对申请人、完整型号和设备类别；ZIMONAI 的编辑判断是，先判断授权路径再查数据库，比把 FCC ID 当成每款充电器的通用证书更可靠。',
        takeaways: [
          '没有确定适用程序前，不要把“查不到 FCC ID”直接写成不合格。',
          '供应商提供 FCC ID 后，还要核对申请人、产品代码、型号证据和功能说明。',
          '授权记录有效，不代表卖方就是制造商，也不代表出货批次和送测配置一致。'
        ],
        sections: [
          {
            title: 'Certification 与 SDoC 不是同一件事',
            paragraphs: [
              'FCC 设备授权制度区分 Certification 和供应商符合性声明。Certification 需要提交申请并取得授权，相关测试须由 FCC 认可的实验室完成；SDoC 则由责任方确保产品符合要求并提供规定的符合性信息，但不一定有 FCC ID 可供查询。',
              '普通有线电源适配器、带数字控制电路的充电器，以及具备通信或无线供电功能的产品，可能面对不同的规则问题。正确顺序是先看产品架构和实际功能，再进入数据库。'
            ]
          },
          {
            title: '查到 FCC ID 后还要看哪些字段',
            paragraphs: [
              'FCC ID 由申请人代码和产品代码组成。找到记录后，应继续比对申请人、设备类别、授权日期、频段或适用规则、公开附件中的型号，以及标签和内部照片等信息。',
              '报价型号可能使用与授权资料不同的营销名称。这时应要求型号对应说明，确认供应商提供的附件确实把商业型号连到已授权设备。'
            ],
            items: [
              '完整 FCC ID，包括字符顺序和连字符',
              '申请人名称及其与供应商的关系',
              '设备类别与实际授权功能',
              '公开附件中的型号信息',
              '授权日期、备注和允许配置'
            ]
          },
          {
            title: '有效授权仍然没有回答什么',
            paragraphs: [
              '授权记录只能支持申请资料所描述设备的射频合规关系，不能证明当前卖方自有工厂、报价产品采用相同物料，也不能保证量产品符合电气安全、性能或合同要求。',
              '更可靠的做法，是分别确认三段关系：卖方与 FCC 申请人、报价型号与授权型号、实际出货结构与申请配置。'
            ]
          }
        ],
        checklist: [
          '产品功能与适用 FCC 程序',
          '完整 FCC ID 或 SDoC 符合性信息',
          '适用时的美国责任方',
          'FCC 申请人与供应商的关系',
          '报价型号对应说明',
          '另行确认的电气安全与质量要求'
        ],
        limitsText: 'FCC 设备授权针对适用的射频要求，不是通用安全认证、供应商身份核查、工厂审核或产品质量背书，也不能保证出货产品与送测样品完全相同。'
      },
      ulFile: {
        topic: '北美安全认证',
        published: '2026 年 8 月 20 日',
        readTime: '约 6 分钟',
        title: '看到 UL 标志还不能停止：档案号、持有人、产品类别和型号都要对应。',
        description: '如何使用 UL Product iQ 核对供应商的 UL 主张，避免把真实档案误认为覆盖所有型号。',
        imageAlt: '手持多口电源适配器的照片，用于说明 UL 档案核查。',
        imageCaption: '外壳相似的产品可能有不同电气版本，认证范围仍要回到实际型号。',
        answer: 'UL 档案号或唯一识别码让买家直接在 UL Product iQ 核对档案持有人、产品类别、型号和标志适用地区。真实档案不会自动覆盖共用外壳的不同功率、接口或关键安全元件，也不证明当前卖方与档案持有人存在授权关系。海外买家应把供应商、档案持有人和精确型号连成可追溯关系；ZIMONAI 的编辑判断是，核查重点不是档案是否真实，而是报价产品是否确实落在该档案范围内。',
        takeaways: [
          '优先查询 UL 官方数据库，不要只看供应商发来的证书 PDF。',
          '比对精确型号、电气额定值和产品类别，不要只比公司名称。',
          '卖方、品牌方、工厂与档案持有人不同时，应要求供应商提供可追溯的关系证据。'
        ],
        sections: [
          {
            title: 'Product iQ 可以用哪些资料查询',
            paragraphs: [
              'UL 将 Product iQ 定位为认证信息查询来源。用户可以按档案号、公司、型号、产品类别控制号（CCN）等信息搜索；部分新版 UL 标志上的唯一识别码，也可以用来获取更多认证信息。',
              '档案号的价值在于，买家能够离开供应商制作的 PDF，自行回到 UL 系统核对。查询时应保留完整编号、日期和结果。'
            ]
          },
          {
            title: '四段关系必须能够连接',
            paragraphs: [
              '第一步看档案持有人；第二步看产品类别是否适用；第三步找到精确型号或有文件支持的系列；第四步确认标志类型和适用地区。',
              '资料不同不一定是假冒。贸易公司可能销售合作工厂名下的认证产品，OEM 也可能存在合理授权；但在买家采信前，这段关系仍应有可追溯的说明。'
            ],
            items: [
              '档案持有人与供应商法律主体',
              '产品类别和相应 Guide Information',
              '报价型号与列名型号或系列',
              '电气额定值与结构差异',
              '标志类型与适用国家'
            ]
          },
          {
            title: '为什么充电器尤其需要核对型号范围',
            paragraphs: [
              '同一个充电器外壳可能搭配不同功率、接口、插脚、PCB 或关键安全元件。看到 UL 标志照片，或找到同系列某一款的有效档案，都不能直接推断所有变体受到覆盖。',
              '如果公开记录看不到报价型号，应要求供应商提供认证函、型号对应或其他由持有人掌握的文件，不要自行假设营销名称已经包含在内。'
            ]
          }
        ],
        checklist: [
          'UL 档案号或唯一识别码',
          '带有查询日期的 Product iQ 结果',
          '认证持有人',
          '产品类别控制号（CCN）',
          '精确型号或有文件支持的系列对应',
          '供应商与持有人的关系'
        ],
        limitsText: '有效 UL 记录不能证明工厂所有权、产能、商业信用或每件出货产品都符合要求，也不能替代其他市场、无线功能或合同规格所需的核查。'
      },
      ceMarking: {
        topic: '欧盟市场合规',
        published: '2026 年 8 月 20 日',
        readTime: '约 7 分钟',
        title: 'CE 是制造商的符合性声明，不是欧盟中央机构颁发的证书。',
        description: '供应商称电源适配器“有 CE”时，买家应索取哪些声明、型号和技术证据。',
        imageAlt: '蓝色背景上的欧规双圆脚电源适配器，用于说明 CE 文件核查。',
        imageCaption: 'CE 标志是文件核查的起点，不代表有某个欧盟中央机构批准产品。',
        answer: 'CE 标志体现制造商在识别适用欧盟规则、完成符合性评估并建立技术文件后，对产品作出的声明；核心文件：EU Declaration of Conformity。欧盟没有统一颁发通用“CE 证书”的中央机构，实验室报告或自愿性证书也不等于精确型号已完成法定程序，更不保证后续量产持续一致。海外买家应核对声明中的制造商、型号和适用规则，再回查支持证据；ZIMONAI 的编辑判断是，CE 核查重在文件的法律角色与产品连接，而非证书名称是否正式。',
        takeaways: [
          '索取精确型号和制造商对应的 EU Declaration of Conformity。',
          '核对法规、标准、日期、签署人和产品识别资料。',
          '实验室报告或自愿性证书可以是证据，但不等于取得 CE 标志的法律许可。'
        ],
        sections: [
          {
            title: '为什么“请给我 CE 证书”不是最好的第一问',
            paragraphs: [
              '欧盟委员会说明，CE 标志代表制造商声明产品符合适用的欧盟要求。符合性评估、技术档案、声明和标志原则上由制造商负责。部分法规允许自我评估，只有部分产品程序要求公告机构参与。',
              '因此，一份名为 Certificate of Compliance 的文件可能有参考价值，但它不一定是建立制造商法律声明的核心文件。'
            ]
          },
          {
            title: '逐项阅读 EU 符合性声明',
            paragraphs: [
              '声明应清楚识别产品和责任制造商，让买家能够对应实际采购品。文件应列出适用的欧盟法规和标准，并包含地点、日期、授权签署人和责任声明。',
              '电源电子产品根据电压、电磁特性、无线功能、材料和目标市场不同，可能涉及多项要求。不要直接套用其他产品的标准清单；应回到实际架构和额定值。'
            ],
            items: [
              '制造商与联系资料',
              '精确产品、型号与额定值',
              '适用的欧盟法规',
              '采用的标准或技术规范',
              '地点、日期、姓名、职务和签名',
              '仅在程序要求时出现的公告机构资料'
            ]
          },
          {
            title: '再把声明与支持证据交叉核对',
            paragraphs: [
              '把测试报告上的型号、额定值、照片和结构，与报价单和样品逐项比对。在可行情况下，还要确认出具实验室和报告能否被联系或验证。如果 CE 标志旁出现公告机构四位数编号，应到 NANDO 确认该机构是否获授权处理相应法规与程序。',
              '欧盟官方特别提醒，有些自愿性证书容易被误认为受法律认可的 CE 批准。判断重点不是文件标题是否正式，而是它在适用法规中的作用，以及能否连回精确型号。'
            ]
          }
        ],
        checklist: [
          '精确型号与产品额定值',
          '已签署的 EU Declaration of Conformity',
          '制造商身份',
          '适用法规与标准',
          '能够对应同一变体的支持报告',
          '程序确实要求时的公告机构授权范围'
        ],
        limitsText: 'CE 标志不代表欧盟批准产品，也不表示产品原产地，更不能保证后续每批量产品持续符合。进口商和经销商各自承担的责任，也不会因制造商声明而消失。'
      },
      un383: {
        topic: '移动电源运输',
        published: '2026 年 8 月 20 日',
        readTime: '约 6 分钟',
        title: '采购移动电源时，要看 UN 38.3 测试摘要，也要确认它对应内部电池。',
        description: 'UN 38.3 锂电池测试摘要应包含哪些字段，以及如何把文件连回实际移动电源型号。',
        imageAlt: '白色移动电源与线材照片，用于说明 UN 38.3 运输文件核查。',
        imageCaption: '运输证据必须跟随产品内部的电池种类、型号和瓦时数。',
        answer: 'UN 38.3 测试摘要的作用，是通过制造商、实验室、型号和瓦时数等关键字段，说明某一锂电芯或电池类型对应的测试记录与结果。文件真实也不代表它属于报价移动电源内部的实际电池，更不涵盖标称容量、循环寿命、电气安全或本批货物质量。海外买家应把摘要连回物料清单、产品标签和运输资料；ZIMONAI 的编辑判断是，常见风险不在有没有 PDF，而在这份摘要是否真正对应本批电池配置。',
        takeaways: [
          '测试摘要不是一张只写着“UN 38.3”的通用证书图片。',
          '型号和瓦时数，是把摘要连回移动电源的重要字段。',
          '通过 UN 38.3 运输测试，不代表标称容量、循环寿命或整体质量都合格。'
        ],
        sections: [
          {
            title: '官方测试摘要应包含哪些内容',
            paragraphs: [
              '第 38.3.5 节列出测试摘要应提供的信息，包括电芯、电池或产品制造商、联系资料、测试实验室、唯一报告编号、报告日期、电池描述、测试与结果、采用的手册修订版，以及用于确认信息有效性的签署。',
              '其中电池描述至少应包含电池种类、重量、瓦时额定值或锂含量、外观描述和型号。买家正是通过这些字段判断文件是否属于正在采购的产品。'
            ]
          },
          {
            title: '最常见的问题不是 PDF，而是型号无法对应',
            paragraphs: [
              '供应商可能提供一份真实摘要，但它属于另一款电芯、电池包或容量。应把摘要上的型号和瓦时数，与物料清单、产品标签、报价单和运输文件交叉核对。如果同一款移动电源可能使用不同电芯，也要要求供应商明确本批订单采用哪种配置。',
              '足以实质影响既有测试类型的变更，可能需要重新测试。外壳相同或型号相似，都不能直接证明属于同一受测电池类型。'
            ],
            items: [
              '电池或产品制造商',
              '测试实验室和联系资料',
              '唯一报告编号与报告日期',
              '电池种类、重量与瓦时数',
              '外观描述与型号',
              '测试项目、结果、手册版本与签署'
            ]
          },
          {
            title: '要求提供，不等于每箱货都要附一份',
            paragraphs: [
              '联合国相关说明指出，测试摘要应当可以提供，但并非要求每次运输都必须随货附上。买家、货运代理或其他有合理需求的单位都可以提出要求。',
              '建议把摘要和产品规格、运输资料放在同一个项目档案中。如果供应商无法把摘要连回实际电池，应先补齐文件关系，再用它进行物流判断。'
            ]
          }
        ],
        checklist: [
          '精确移动电源型号与标称容量',
          '内部电池型号与瓦时额定值',
          'UN 38.3 测试摘要',
          '制造商与实验室联系资料',
          '报告编号、日期与手册版本',
          '书面确认本批产品使用的电池配置'
        ],
        limitsText: 'UN 38.3 针对锂电芯或电池类型的运输分类测试，不能证明标称容量、充电性能、循环寿命、电气安全认证、工厂身份或出货批次质量。'
      }
    }
  }
};
