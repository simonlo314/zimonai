export const knowledgeCategoryDefinitions = [
  { id: 'supplier-identity', slug: 'supplier-identity' },
  { id: 'certification-market-access', slug: 'certification-market-access' },
  { id: 'product-transport-documents', slug: 'product-transport-documents' },
  { id: 'factory-onsite', slug: 'factory-onsite' },
  { id: 'commercial-risk', slug: 'commercial-risk' }
];

export const knowledgeArticleSpecs = [
  {
    id: 'knowledge-rohs-test-report',
    key: 'rohsTestReport',
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
    dateModified: '2026-09-01',
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
    dateModified: '2026-08-30',
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
    dateModified: '2026-08-28',
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
    dateModified: '2026-08-26',
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
    slug: 'knowledge/eu-economic-operator-charger-label',
    featured: true,
    category: 'certification-market-access',
    products: ['charger'],
    markets: ['european-union'],
    keywords: {
      en: ['EU economic operator', 'charger label', 'EU importer', 'authorised representative', 'product traceability', 'EU Declaration of Conformity'],
      'zh-tw': ['歐盟經濟營運者', '充電器標示', '歐盟進口商', '授權代表', '產品可追溯性', 'EU 符合性聲明'],
      'zh-cn': ['欧盟经济运营者', '充电器标识', '欧盟进口商', '授权代表', '产品可追溯性', 'EU 符合性声明']
    },
    datePublished: '2026-08-22',
    dateModified: '2026-08-22',
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
    dateModified: '2026-08-20',
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
    dateModified: '2026-08-20',
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
    dateModified: '2026-08-20',
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
    dateModified: '2026-08-20',
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
    dateModified: '2026-08-20',
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
      metaDescription: 'Practical, source-backed guides to Chinese supplier identity, RoHS, EU Safety Gate, IECEE CB, USB-IF, FCC, UL, CE and UN 38.3 evidence for charger buyers.',
      kicker: 'ZimonAI research desk',
      title: 'Supplier verification knowledge, written for the moment before you commit.',
      lead: 'Short, source-backed briefings for overseas buyers of chargers, power adapters and power banks. Each note starts with the practical answer, shows the official source and states what the evidence cannot prove.',
      featured: 'Start here',
      latest: 'Ten field notes',
      methodLabel: 'Publishing standard',
      methodTitle: 'Useful answers, not search-engine filler.',
      methodItems: [
        ['Official sources first', 'Rules and database functions are checked against the authority or certification owner that operates them.'],
        ['Answer before explanation', 'Each note opens with the decision a buyer can make, then shows the evidence behind it.'],
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
        'european-union': 'European Union',
        global: 'Global standards',
        international: 'International transport'
      }
    },
    ui: {
      read: 'Read field note',
      published: 'Published',
      reviewed: 'Sources reviewed',
      readTime: 'Reading time',
      quickAnswer: 'The short answer',
      buyerChecklist: 'Buyer checklist',
      limits: 'What this does not prove',
      sources: 'Official sources',
      sourcesLead: 'Facts in this note were checked against the following primary sources. Links open the source owner’s website.',
      photo: 'Editorial photograph',
      related: 'Continue reading',
      back: 'All knowledge notes'
    },
    articles: {
      rohsTestReport: {
        topic: 'EU hazardous-substance compliance',
        published: '1 September 2026',
        readTime: '7 minutes',
        title: 'Does a RoHS test report prove this charger is EU compliant?',
        description: 'A test report can support specific samples and materials. It does not replace the exact product’s technical documentation, EU declaration or production controls.',
        imageAlt: 'Macro view of components and soldered parts on a circuit board, used as an editorial illustration for RoHS evidence checks.',
        imageCaption: 'Editorial photograph of a circuit board. It is not a ZimonAI supplier, client, factory, charger, test sample or compliance record.',
        answer: 'No. A RoHS test report can support the substances, samples, methods and results that it actually identifies, but it does not by itself prove that every homogeneous material in the exact charger complies, that an exemption is valid, or that the manufacturer has completed the technical documentation, EU declaration of conformity and series-production controls required by Directive 2011/65/EU.',
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
        answer: 'No. The EU Safety Gate is a rapid alert system for dangerous products and corrective measures found through market surveillance; it is not a pre-market approval list or a complete register of safe chargers. A search with no match means only that the buyer did not find a published alert under the identifiers and filters used at that time. The exact model still needs product, compliance, supplier and shipment evidence.',
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
        answer: 'No. A valid IECEE CB Test Certificate shows that selected samples represented by the certificate were assessed to the stated standard through the CB Scheme. It can facilitate national certification, but it is not automatic approval for every country. The buyer must still verify the official record, exact model and ratings, issuing National Certification Body (NCB), stated national differences and the destination market’s own requirements.',
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
        answer: 'No. “USB PD,” “USB-C” or “GaN” in a quotation does not by itself prove USB-IF certification. USB-IF says certified products pass its Compliance Program and are added to the Integrators List; certified charger logos may be used only with products that passed the applicable procedures and were posted to that list. The buyer still needs to match the supplier’s exact model, company, Test ID (TID), certification date and charger category to the official record.',
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
        answer: 'No. For chargers within the EU harmonisation rules, an EU-based economic operator must be identifiable, and that operator has defined market-surveillance tasks. But a name and address are traceability evidence, not proof that the Chinese seller is the manufacturer, that the quoted model is covered by an EU Declaration of Conformity, or that every shipment conforms.',
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
        answer: 'An English supplier name, marketplace profile or email signature is not enough to identify your contractual counterparty. Ask for the Chinese legal name and Unified Social Credit Code, locate the entity in the National Enterprise Credit Information Publicity System, and then compare that identity with the contract, bank beneficiary, licence and any certification holder.',
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
        answer: 'No. FCC rules use more than one equipment-authorization procedure, including Certification and Supplier’s Declaration of Conformity. An FCC ID is associated with equipment authorized through Certification; an SDoC device does not receive the same searchable grant. Before rejecting a charger because no FCC ID appears, determine which function and authorization procedure apply to the exact model.',
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
        answer: 'Use the UL file number or unique identifier as a search key in UL Product iQ, then confirm the certification holder, product category, model designation and geographic mark. Finding a real file is only the first step: the question is whether the supplier and exact quoted model are connected to that record.',
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
        answer: 'There is no central EU body that issues permission or a universal “CE certificate.” For a product that requires CE marking, the manufacturer identifies the applicable EU rules, completes the required conformity assessment, prepares technical documentation, signs the EU Declaration of Conformity and affixes the mark. A buyer should therefore ask for the declaration and trace it to the exact product—not stop at a logo or voluntary certificate.',
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
        answer: 'The UN Manual of Tests and Criteria requires a lithium cell or battery test summary to be made available. For a power bank, check the manufacturer, test laboratory, report number and date, battery description, watt-hour rating, model numbers, tests and pass/fail results, manual revision and signatory. Then connect those fields to the exact battery configuration inside the quoted product.',
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
      metaDescription: '面向充電器、電源適配器與行動電源買家的實務查核文章，整理中國企業主體、RoHS、Safety Gate、IECEE CB、USB-IF、FCC、UL、CE 與 UN 38.3 證據。',
      kicker: 'ZimonAI 研究台',
      title: '供應商查核知識庫：每一篇，都要能用在付款前的判斷。',
      lead: '寫給採購充電器、電源適配器與行動電源的海外買家。文章先回答實際問題，再交代官方來源與證據邊界；不拿關鍵字堆成看似專業的內容。',
      featured: '建議先讀',
      latest: '十篇查核筆記',
      methodLabel: '內容原則',
      methodTitle: '先把問題講清楚，再談搜尋排名。',
      methodItems: [
        ['先查官方來源', '法規、資料庫用途與認證規則，優先回到主管機關或認證機構本身。'],
        ['先給可以採取的判斷', '每篇開頭先回答買家眼前的問題，再說明證據如何支持這個答案。'],
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
        'european-union': '歐盟',
        global: '全球標準',
        international: '國際運輸'
      }
    },
    ui: {
      read: '閱讀查核筆記',
      published: '發布日期',
      reviewed: '來源核對',
      readTime: '閱讀時間',
      quickAnswer: '先說結論',
      buyerChecklist: '買家核對清單',
      limits: '這些證據不能證明什麼',
      sources: '官方資料來源',
      sourcesLead: '本文的事實內容已對照以下一手資料；連結會開啟主管機關或資料擁有者的網站。',
      photo: '編輯用圖片',
      related: '繼續閱讀',
      back: '返回知識庫'
    },
    articles: {
      rohsTestReport: {
        topic: '歐盟限用物質合規',
        published: '2026 年 9 月 1 日',
        readTime: '約 7 分鐘',
        title: '供應商給了 RoHS 測試報告，就能證明這款充電器符合歐盟要求嗎？',
        description: '測試報告可以支持列明樣品與材料的結果，但不能取代精確產品的技術文件、EU 符合性聲明與量產管制。',
        imageAlt: '電路板上電子元件與焊接部位的近景照片，用於說明 RoHS 證據查核。',
        imageCaption: '電路板為編輯用圖片；不是 ZimonAI 的供應商、客戶、工廠、充電器、送測樣品或合規紀錄。',
        answer: '不能。RoHS 測試報告只能支持報告明確列出的物質、樣品、方法與結果；它本身不能證明精確充電器的每一種均質材料都合格、引用的豁免仍有效，也不能代替《2011/65/EU 指令》要求製造商建立的技術文件、EU 符合性聲明與量產一致性程序。',
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
        answer: '不能。歐盟 Safety Gate 是市場監管發現危險產品後，用來交換通報與矯正措施的快速預警系統；它不是上市前核准名單，也不是「安全充電器」的完整資料庫。查無結果只能表示：在當次使用的名稱、型號與篩選條件下，沒有找到公開通報。買家仍須另外核對精確型號的產品、合規、供應商與出貨證據。',
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
        answer: '不能。有效的 IECEE CB Test Certificate，表示證書所代表的選定樣品已依列明標準走過 CB Scheme 評估；它可以協助後續申請國家認證，但不等於所有國家自動放行。買家仍要查官方紀錄、精確型號與額定值、簽發的國家認證機構（NCB）、National Differences，以及目的市場另外要求的程序。',
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
        answer: '不能。報價上的「USB PD」、「USB-C」或「GaN」字樣，本身都不能證明 USB-IF 認證。USB-IF 說明，認證產品須通過 Compliance Program 並列入 Integrators List；Certified USB Charger 標誌也只能用於已完成適用測試、且已列入該清單的產品。買家仍要把報價的精確型號、公司、Test ID（TID）、認證日期與充電器類別，逐項對回官方紀錄。',
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
        answer: '不能。對適用歐盟調和法規的充電器，必須能辨識設立於歐盟境內的經濟營運者，且該營運者負有明定的市場監管配合工作。不過，名稱與地址只是可追溯性的證據；不能單獨證明中國賣方就是製造商、報價型號已被 EU 符合性聲明涵蓋，或每批出貨都符合要求。',
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
        answer: '只看英文公司名、平台店名或 Email 簽名，還不能確定誰是合約相對人。請供應商提供完整中文企業名稱與統一社會信用代碼，到國家企業信用信息公示系統找出對應主體，再逐一核對合約、發票、收款帳戶、營業執照與認證持有人。',
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
        answer: '不一定。FCC 的設備授權不只有一種程序，其中包括 Certification 與供應商符合性聲明（SDoC）。FCC ID 對應的是經 Certification 取得授權的設備；採 SDoC 的設備不會有同樣的可查授權紀錄。因此，不能一看到「查無 FCC ID」就判定不合格，應先確認該型號的功能與適用程序。',
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
        answer: '先把 UL 檔案號或識別碼放進 UL Product iQ，再核對認證持有人、產品類別、型號與標示適用地區。找到真實檔案只完成第一步；真正要回答的是：目前供應商與報價型號，是否能合理連回這份紀錄。',
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
        answer: '歐盟沒有一個中央機構負責核發通用的「CE 證書」。產品依法需要 CE 標示時，製造商要辨識適用規則、完成相應符合性評估、建立技術文件、簽署 EU Declaration of Conformity，再加貼 CE 標誌。因此，買家要的是能對上精確型號的符合性聲明與支持文件，而不是只看標誌或自願性證書。',
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
        answer: '聯合國《試驗和標準手冊》要求提供鋰電池或電芯的測試摘要。查核行動電源時，要看製造商、實驗室、報告編號與日期、電池說明、瓦時數、型號、測試項目與通過結果、手冊版本及簽署人，再把這些欄位連回報價產品裡實際使用的電池配置。',
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
      metaDescription: '面向充电器、电源适配器和移动电源买家的实务核查文章，梳理中国企业主体、RoHS、Safety Gate、IECEE CB、USB-IF、FCC、UL、CE 和 UN 38.3 证据。',
      kicker: 'ZimonAI 研究台',
      title: '供应商核查知识库：每一篇，都要能用于付款前的判断。',
      lead: '写给采购充电器、电源适配器和移动电源的海外买家。文章先回答实际问题，再交代官方来源和证据边界；不会为了搜索排名堆砌关键词。',
      featured: '建议先读',
      latest: '十篇核查笔记',
      methodLabel: '内容原则',
      methodTitle: '先把问题讲清楚，再谈搜索排名。',
      methodItems: [
        ['优先核对官方来源', '法规、数据库用途和认证规则，优先回到主管部门或认证机构本身。'],
        ['先给出可执行的判断', '每篇开头先回答买家眼前的问题，再说明证据为什么支持这个答案。'],
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
        'european-union': '欧盟',
        global: '全球标准',
        international: '国际运输'
      }
    },
    ui: {
      read: '阅读核查笔记',
      published: '发布日期',
      reviewed: '来源核对',
      readTime: '阅读时间',
      quickAnswer: '先说结论',
      buyerChecklist: '买家核对清单',
      limits: '这些证据不能证明什么',
      sources: '官方资料来源',
      sourcesLead: '本文的事实内容已对照以下一手资料；链接会打开主管部门或资料所有者的网站。',
      photo: '编辑用图片',
      related: '继续阅读',
      back: '返回知识库'
    },
    articles: {
      rohsTestReport: {
        topic: '欧盟限用物质合规',
        published: '2026 年 9 月 1 日',
        readTime: '约 7 分钟',
        title: '供应商提供了 RoHS 测试报告，能证明这款充电器符合欧盟要求吗？',
        description: '报告只能支持实际列出的样品和材料，不能替代具体产品的技术文件、EU 符合性声明和量产控制。',
        imageAlt: '电路板上电子元器件和焊接部位的微距照片，用于说明 RoHS 证据核查。',
        imageCaption: '电路板为编辑配图；不是 ZimonAI 的供应商、客户、工厂、充电器、送检样品或合规记录。',
        answer: '不能。RoHS 测试报告能够支持文件中明确识别的物质、样品、方法和结果，但不能单独证明具体充电器的每一种均质材料均符合限值、所引用豁免仍然适用，也不能代替《2011/65/EU 指令》要求制造商完成的技术文件、EU 符合性声明和批量生产控制。',
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
        answer: '不能。欧盟 Safety Gate 是市场监管发现危险产品后，用于交换预警和纠正措施的快速通报系统；它不是上市前审批清单，也不是一份完整的“安全充电器”名录。搜索无结果只能说明，在本次使用的名称、型号和筛选条件下没有找到公开预警。采购方仍需单独核实精确型号的产品合规、供应商关系和出货一致性。',
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
        answer: '不能。有效的 IECEE CB Test Certificate 说明证书所代表的选定样品，已经按照列明标准完成 CB Scheme 评估；它可以减少申请国家认证时的重复工作，却不是所有国家的自动准入许可。采购方仍要核实官方记录、准确型号与额定值、签发证书的国家认证机构（NCB）、National Differences，以及销售目的地另行规定的步骤。',
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
        answer: '不能。报价中的“USB PD”“USB-C”或“GaN”字样，本身都不能证明 USB-IF 认证。USB-IF 说明，认证产品须通过 Compliance Program 并列入 Integrators List；Certified USB Charger 标志也只能用于完成适用测试且已列入该清单的产品。买家仍要把报价中的精确型号、公司、Test ID（TID）、认证日期和充电器类别逐项对应官方记录。',
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
        answer: '不能。对适用欧盟协调法规的充电器，必须能识别设立在欧盟境内的经济运营者，该运营者也承担明确的市场监管配合工作。不过，名称和地址只是可追溯性证据；不能单独证明中国卖方就是制造商、报价型号已被 EU 符合性声明覆盖，或每批出货都符合要求。',
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
        answer: '只看英文公司名、平台店名或邮件签名，还无法确定谁是合同相对方。请供应商提供完整中文企业名称和统一社会信用代码，到国家企业信用信息公示系统找到对应主体，再逐项核对合同、发票、收款账户、营业执照与认证持有人。',
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
        answer: '不一定。FCC 设备授权包括 Certification 和供应商符合性声明（SDoC）等程序。FCC ID 对应经 Certification 获得授权的设备；采用 SDoC 的设备不会有同样的可查询授权记录。因此，不能看到“查无 FCC ID”就直接判定不合格，应先确认该型号的功能和适用程序。',
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
        answer: '先把 UL 档案号或识别码放入 UL Product iQ，再核对认证持有人、产品类别、型号和标志适用地区。找到真实档案只是第一步；真正需要回答的是，当前供应商和报价型号能否合理连回这份记录。',
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
        answer: '欧盟没有一个中央机构负责颁发通用的“CE 证书”。产品依法需要 CE 标志时，制造商要识别适用规则、完成相应符合性评估、建立技术文件、签署 EU Declaration of Conformity，再加贴 CE 标志。因此，买家需要的是能够对应精确型号的符合性声明和支持文件，而不是只看标志或自愿性证书。',
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
        answer: '联合国《试验和标准手册》要求提供锂电池或电芯测试摘要。核查移动电源时，要查看制造商、实验室、报告编号和日期、电池说明、瓦时数、型号、测试项目与结果、手册版本和签署人，再把这些字段连回报价产品中实际使用的电池配置。',
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
