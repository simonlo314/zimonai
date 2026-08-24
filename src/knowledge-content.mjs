export const knowledgeCategoryDefinitions = [
  { id: 'supplier-identity', slug: 'supplier-identity' },
  { id: 'certification-market-access', slug: 'certification-market-access' },
  { id: 'product-transport-documents', slug: 'product-transport-documents' },
  { id: 'factory-onsite', slug: 'factory-onsite' },
  { id: 'commercial-risk', slug: 'commercial-risk' }
];

export const knowledgeArticleSpecs = [
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
      metaDescription: 'Practical, source-backed guides to Chinese supplier identity, FCC IDs, UL files, CE marking and UN 38.3 documents for charger and power electronics buyers.',
      kicker: 'ZimonAI research desk',
      title: 'Supplier verification knowledge, written for the moment before you commit.',
      lead: 'Short, source-backed briefings for overseas buyers of chargers, power adapters and power banks. Each note starts with the practical answer, shows the official source and states what the evidence cannot prove.',
      featured: 'Start here',
      latest: 'Six field notes',
      methodLabel: 'Publishing standard',
      methodTitle: 'Useful answers, not search-engine filler.',
      methodItems: [
        ['Official sources first', 'Rules and database functions are checked against the authority or certification owner that operates them.'],
        ['Answer before explanation', 'Each note opens with the decision a buyer can make, then shows the evidence behind it.'],
        ['Limits stay visible', 'A registry hit, file number or test summary is never presented as a guarantee of future delivery or product quality.']
      ],
      nextLabel: 'Ongoing research',
      nextTitle: 'A new field note is scheduled every two days.',
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
      metaDescription: '面向充電器、電源適配器與行動電源買家的實務查核文章，整理中國企業主體、FCC ID、UL 檔案、CE 標示與 UN 38.3 文件。',
      kicker: 'ZimonAI 研究台',
      title: '供應商查核知識庫：每一篇，都要能用在付款前的判斷。',
      lead: '寫給採購充電器、電源適配器與行動電源的海外買家。文章先回答實際問題，再交代官方來源與證據邊界；不拿關鍵字堆成看似專業的內容。',
      featured: '建議先讀',
      latest: '六篇查核筆記',
      methodLabel: '內容原則',
      methodTitle: '先把問題講清楚，再談搜尋排名。',
      methodItems: [
        ['先查官方來源', '法規、資料庫用途與認證規則，優先回到主管機關或認證機構本身。'],
        ['先給可以採取的判斷', '每篇開頭先回答買家眼前的問題，再說明證據如何支持這個答案。'],
        ['證據邊界不藏起來', '查到企業、檔案號或測試摘要，不會被寫成對交貨與品質的保證。']
      ],
      nextLabel: '持續更新',
      nextTitle: '之後每兩天新增一篇查核筆記。',
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
      metaDescription: '面向充电器、电源适配器和移动电源买家的实务核查文章，梳理中国企业主体、FCC ID、UL 档案、CE 标志和 UN 38.3 文件。',
      kicker: 'ZimonAI 研究台',
      title: '供应商核查知识库：每一篇，都要能用于付款前的判断。',
      lead: '写给采购充电器、电源适配器和移动电源的海外买家。文章先回答实际问题，再交代官方来源和证据边界；不会为了搜索排名堆砌关键词。',
      featured: '建议先读',
      latest: '六篇核查笔记',
      methodLabel: '内容原则',
      methodTitle: '先把问题讲清楚，再谈搜索排名。',
      methodItems: [
        ['优先核对官方来源', '法规、数据库用途和认证规则，优先回到主管部门或认证机构本身。'],
        ['先给出可执行的判断', '每篇开头先回答买家眼前的问题，再说明证据为什么支持这个答案。'],
        ['证据边界始终可见', '查到企业、档案号或测试摘要，不会被写成对交付和质量的保证。']
      ],
      nextLabel: '持续更新',
      nextTitle: '后续每两天新增一篇核查笔记。',
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
