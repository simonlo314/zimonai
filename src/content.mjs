export const pages = [
  { id: 'home', slug: '' },
  { id: 'services', slug: 'services' },
  { id: 'methodology', slug: 'methodology' },
  { id: 'scope', slug: 'scope-limitations' },
  { id: 'about', slug: 'about' },
  { id: 'request', slug: 'request-verification' },
  { id: 'privacy', slug: 'privacy' }
];

export const languages = {
  en: {
    prefix: '',
    htmlLang: 'en',
    locale: 'en_US',
    short: 'EN',
    name: 'English',
    meta: {
      titles: {
        home: 'China Supplier Verification for Overseas Buyers | ZimonAI',
        services: 'Supplier Verification Services & Pricing | ZimonAI',
        methodology: 'Our Supplier Verification Methodology | ZimonAI',
        scope: 'Scope & Limitations | ZimonAI',
        about: 'About ZimonAI | China Supplier Verification',
        request: 'Request Supplier Verification | ZimonAI',
        privacy: 'Privacy Notice | ZimonAI'
      },
      descriptions: {
        home: 'Verify a Chinese supplier before you send the money. ZimonAI checks company identities, certificates, models and supplier claims using traceable sources.',
        services: 'Remote supplier verification from US$99–149 and scheduled on-site verification in South China from US$299–399.',
        methodology: 'See how ZimonAI checks Chinese company records, certificate holders, model scope and supplier claims using an official-source-first method.',
        scope: 'Understand what ZimonAI supplier verification can establish, what it cannot establish, and why verification is not a guarantee.',
        about: 'ZimonAI is an independent supplier verification service operating between Taipei and Shenzhen / South China.',
        request: 'Tell ZimonAI which Chinese supplier, company record, certificate or product claim you need verified.',
        privacy: 'How ZimonAI handles information you choose to send when requesting supplier verification.'
      }
    },
    nav: {
      services: 'Services', methodology: 'Methodology', scope: 'Scope & limits', about: 'About', request: 'Verify a supplier', menu: 'Menu', close: 'Close'
    },
    common: {
      eyebrow: 'China supplier verification',
      demo: 'Demonstration · Fictional supplier',
      verified: 'Verified', unresolved: 'Unable to verify', discrepancy: 'Discrepancy found', pending: 'Pending',
      source: 'Source', claim: 'Supplier claim', record: 'Official record', result: 'Result', queryDate: 'Query date', reference: 'Reference',
      email: 'Email', phone: 'Phone', contact: 'Request verification', methodology: 'See how we verify',
      independent: 'Independent from supplier commissions',
      footerLine: 'We do not source for you. We verify who you are about to buy from.',
      footerScope: 'Not a sourcing agent, product quality inspector, or accredited inspection body. No ISO 17020 or CNAS accreditation.',
      privacy: 'Privacy', language: 'Language', top: 'Back to top', current: 'Current page'
    },
    home: {
      kicker: 'A traceable answer before a commercial commitment',
      title: 'Verify your Chinese supplier before you send the money.',
      lead: 'We check company identities, certificates and supplier claims against traceable records — so you know who you are actually buying from.',
      primary: 'Verify a supplier', secondary: 'See how we verify',
      distinction: 'Not sourcing. Not negotiation. Not payment handling. Independent verification for overseas buyers.',
      dossier: { company: 'Lumen Harbor Devices Co., Ltd.', since: '2014', certificate: 'UL certified', factory: 'Shenzhen', run: 'Run demonstration', running: 'Cross-checking records…', done: 'Three claims checked. One discrepancy requires attention.', reset: 'Run again' },
      checks: [
        ['Business registration', 'Entity found', 'verified'],
        ['Certificate holder', 'Holder differs from supplier', 'discrepancy'],
        ['Product model scope', 'Model not located in record', 'unresolved']
      ],
      story: {
        label: 'An investigation, not a score',
        title: 'A supplier claim is only the first layer.',
        intro: 'Scroll through the evidence path. Each step changes what can responsibly be concluded.',
        steps: [
          { no: '01', title: 'Start with the claim', text: 'The supplier provides a company name, certificate and product model. We preserve the exact wording instead of normalising away inconsistencies.', stage: 'claim' },
          { no: '02', title: 'Locate the source record', text: 'We prioritise official company and certificate databases. A third-party listing may guide a search, but it is not treated as final evidence.', stage: 'source' },
          { no: '03', title: 'Cross-check the relationships', text: 'A certificate can exist and still belong to another legal entity or exclude the quoted model. Holder, address and scope must align.', stage: 'compare' },
          { no: '04', title: 'Report what the evidence supports', text: 'The conclusion separates verified facts, unresolved points and discrepancies. No invented confidence score hides the gaps.', stage: 'result' }
        ]
      },
      compare: {
        label: 'Evidence seam', title: 'The claim and the record look similar—until the fields are aligned.',
        hint: 'Drag to compare the fictional supplier claim with the demonstration record.',
        leftTitle: 'Supplier claim', rightTitle: 'What the record shows',
        left: ['Established: 2014', 'Certificate holder: Lumen Harbor Devices', 'Model: LH-65W'],
        right: ['Registered: 2023', 'Certificate holder: Lumen Harbor Trading', 'Model scope: LH-45W only'],
        conclusion: 'Discrepancy found: entity history, holder name and model scope do not align.'
      },
      why: { label: 'Why ZimonAI', title: 'Transparent verification for buyers without a China research desk.', text: 'Chinese company names, certificate systems and official databases are difficult to navigate across languages. ZimonAI turns that research into an evidence-led report you can review and question.' },
      service1: { tier: 'Tier 1', title: 'Remote Supplier Verification', price: 'US$99–149', unit: 'per supplier', time: 'About 3 business days', text: 'Company identity, status, certificate holder and model-scope checks using traceable records.' },
      service2: { tier: 'Tier 2', title: 'On-site Verification', price: 'US$299–399', unit: 'per supplier', time: 'About 5–7 business days', text: 'A scheduled, transparent visit in serviceable parts of South China to confirm address and basic operating presence.' },
      demoTitle: 'Open a fictional evidence file.', demoLead: 'Choose a claim to see how source, record and result are separated. This is a product demonstration, not a live database search or client case.',
      demoTabs: [
        { id: 'identity', label: 'Company identity', source: 'Official company registry', claim: 'Lumen Harbor Devices Co., Ltd.', record: 'Legal entity located; registration status active.', result: 'verified', note: 'The submitted Chinese legal name matches the located entity.' },
        { id: 'registration', label: 'Business registration', source: 'Official company registry', claim: 'Operating since 2014', record: 'Date of establishment: 18 March 2023.', result: 'discrepancy', note: 'The claimed operating history is not supported by the located registration record.' },
        { id: 'certificate', label: 'UL certificate', source: 'Certification database', claim: 'Certificate belongs to supplier', record: 'Record located under Lumen Harbor Trading Co., Ltd.', result: 'discrepancy', note: 'A certificate exists, but the holder name does not match the supplier legal entity.' },
        { id: 'model', label: 'Product model', source: 'Certificate model scope', claim: 'LH-65W is covered', record: 'Listed models: LH-30W and LH-45W.', result: 'unresolved', note: 'The submitted model could not be located within the record reviewed.' },
        { id: 'address', label: 'Factory address', source: 'Registration and supplied documents', claim: 'Factory in Shenzhen', record: 'Registered address located; manufacturing activity requires on-site confirmation.', result: 'unresolved', note: 'A registered address alone does not establish factory activity.' }
      ],
      limitsTitle: 'We also tell you what we cannot verify.', limitsText: 'A valid record does not guarantee future behaviour, product quality, shipment conformity or commercial performance. Clear limits are part of the report—not fine print.',
      finalTitle: 'Have a supplier claim you need checked?', finalText: 'Send the company name, link, certificate or product model. We will tell you what can be checked and which tier fits before work begins.'
    },
    services: {
      kicker: 'Services and pricing', title: 'Two verification tiers. A clear boundary around each.', lead: 'Choose remote evidence research or add a scheduled on-site visit. We confirm the scope before work begins.',
      tier1: { label: 'Tier 1', title: 'Remote Supplier Verification', price: 'US$99–149 / supplier', time: 'About 3 business days', best: 'Best for buyers who need to check a supplier before a first order, deposit or renewed commercial commitment.', includes: ['Chinese legal entity identity and company status', 'Company registration cross-checks', 'Certificate existence and holder verification', 'Product or model scope checks where records allow', 'Obvious inconsistencies across supplied and official information', 'Evidence links, screenshots or source records where appropriate'], output: 'A concise evidence-led report separating verified facts, unresolved points and discrepancies.' },
      tier2: { label: 'Tier 2', title: 'On-site Verification', price: 'US$299–399 / supplier', time: 'About 5–7 business days', best: 'Best when a buyer needs basic confirmation that a stated address and operating presence can be observed in person.', includes: ['Scope confirmation and appointment with the supplier', 'Visit to a serviceable supplier address', 'Basic observation of operating presence', 'Cross-check of company name, signage and address', 'Factual notes and agreed visual records where appropriate', 'Remote record checks relevant to the visit'], output: 'A scheduled, transparent verification visit in Shenzhen, Dongguan, Huizhou, Guangzhou and nearby serviceable areas.' },
      custom: { label: 'Outside the standard tiers', title: 'Custom verification, assessed case by case.', text: 'If your question does not fit Tier 1 or Tier 2, describe it first. We will only accept work that can be delivered responsibly; no unpriced Tier 3–6 capabilities are implied.' },
      notIncluded: { title: 'Not included in either tier', items: ['Supplier sourcing or introductions', 'Negotiation or purchase management', 'Handling deposits or supplier payments', 'Product quality inspection or laboratory testing', 'Guarantees of future behaviour or shipment conformity', 'Secret, undercover or unannounced investigations'] },
      ctaTitle: 'Not sure which tier fits?', ctaText: 'Send the supplier and the decision you are trying to make. Scope comes before payment.'
    },
    methodology: {
      kicker: 'Methodology', title: 'From claim to conclusion, without hiding the gaps.', lead: 'Our method is official-source-first, explainable and limited to what the evidence can support.',
      mapTitle: 'Explore the verification path', mapLead: 'Select each step to see what is checked, why it matters and what kind of result it can produce.',
      nodes: [
        { id: 'intake', label: 'Supplier claim', check: 'Names, links, certificates, models and stated addresses exactly as submitted.', why: 'Small spelling, entity and model differences can change the result.', source: 'Buyer and supplier materials', results: 'Starting point—not a conclusion' },
        { id: 'registry', label: 'Company registry', check: 'Chinese legal name, unified social credit code, status, establishment date and registered address.', why: 'A trading name or English name may not identify the legal counterparty.', source: 'Official Chinese company records', results: 'Verified / unable to verify / discrepancy' },
        { id: 'certificate', label: 'Certificate record', check: 'Whether a record exists, its status, holder, issuer and available details.', why: 'A certificate image can be altered, expired or associated with another company.', source: 'Official or issuer-controlled certificate databases', results: 'Verified / unable to verify / discrepancy' },
        { id: 'holder', label: 'Holder relationship', check: 'Whether certificate holder, supplier entity and claimed factory are the same or clearly related.', why: 'A genuine certificate does not automatically belong to the company offering the product.', source: 'Cross-record comparison', results: 'Relationship supported / unresolved / mismatch' },
        { id: 'model', label: 'Model scope', check: 'Whether the quoted product model appears within the available certificate scope.', why: 'A certificate may cover only specific models, variants or ratings.', source: 'Certificate schedules and product records', results: 'Covered / not located / excluded' },
        { id: 'crosscheck', label: 'Cross-check', check: 'Names, dates, addresses and model details aligned across all located records.', why: 'Contradictions often appear only when sources are placed side by side.', source: 'Evidence matrix', results: 'Consistent / unresolved / discrepancy' },
        { id: 'report', label: 'Evidence report', check: 'Each conclusion paired with source, query date, evidence and limitation.', why: 'The buyer should be able to understand and challenge the reasoning.', source: 'ZimonAI analysis', results: 'Verified / unable to verify / discrepancy found' }
      ],
      sourcesTitle: 'Official-source-first does not mean official-source-only.', sourcesText: 'We prioritise official registries, regulators, accreditation and certification databases. Supplier documents and third-party sources can provide leads or context, but they are labelled according to evidential weight and are not silently upgraded into proof.',
      statusesTitle: 'Three results, not a black-box score', statusText: ['Verified — the located evidence supports the specific statement reviewed.', 'Unable to verify — available sources do not support a responsible conclusion.', 'Discrepancy found — the supplier claim and located record conflict in a material field.'],
      handlingTitle: 'Evidence handling', handlingText: 'Reports identify the source type and query date and may include links, screenshots or source records where appropriate. Database availability and access can change, so the report describes what was accessible at the time of review.'
    },
    scope: {
      kicker: 'Scope and limitations', title: 'Verification reduces uncertainty. It does not eliminate risk.', lead: 'A trustworthy verification service should say where its conclusion stops.',
      doTitle: 'What we do', doItems: ['Check identifiable company and certificate records', 'Cross-check legal names, holders, models and addresses', 'Separate evidence from supplier statements', 'Explain gaps and conflicting records', 'Conduct scheduled on-site verification where serviceable'],
      dontTitle: 'What we do not do', dontItems: ['Source suppliers or make introductions', 'Negotiate prices or commercial terms', 'Handle orders, deposits or supplier payments', 'Accept supplier commissions or kickbacks', 'Perform product quality inspection or laboratory testing', 'Conduct secret, undercover or unannounced investigations'],
      limitsTitle: 'Limits of verification', limits: [
        ['A real company is not a guaranteed supplier', 'Registration can establish legal existence and status; it cannot guarantee future conduct, delivery or solvency.'],
        ['A genuine certificate is not a blanket product guarantee', 'A record may apply only to a holder, model, rating, site or period. It does not prove every shipped unit conforms.'],
        ['An address is not automatically a factory', 'A registered or visited address does not by itself establish manufacturing ownership, capacity or product quality.'],
        ['Records have time and access limits', 'Databases can change, be unavailable or omit information. Conclusions relate to the records accessible at the stated query time.'],
        ['On-site verification is transparent', 'Visits are scheduled and conducted with the supplier’s knowledge and consent. They are not covert investigations.']
      ],
      accreditationTitle: 'Accreditation disclosure', accreditationText: 'ZimonAI is not an accredited inspection body and does not hold ISO 17020 or CNAS accreditation. The service is supplier information verification—not accredited product inspection, certification or conformity assessment.',
      ctaTitle: 'Need product inspection instead?', ctaText: 'We will say so. If your decision requires sampling, laboratory testing, pre-shipment inspection or accredited conformity assessment, ZimonAI verification is not a substitute.'
    },
    about: {
      kicker: 'About ZimonAI', title: 'Built for buyers who need evidence—not a sales intermediary.', lead: 'ZimonAI is an independent, founder-led supplier verification service operating between Taipei and Shenzhen / South China.',
      originTitle: 'Why this service exists', originText: 'Overseas buyers often receive an English company name, a certificate image and a persuasive supplier profile—but lack the Chinese-language context and database familiarity to connect those pieces. ZimonAI exists to make that verification legible.',
      modelTitle: 'Independent by design', modelText: 'We do not represent Chinese suppliers, earn supplier commissions, negotiate orders or handle payments. The buyer is the client. This separation keeps the verification question distinct from the incentive to close a purchase.',
      footprintTitle: 'Taipei analysis. South China execution.', footprintText: 'Remote research can be conducted across applicable Chinese company and certificate sources. Scheduled on-site verification is limited to serviceable areas around Shenzhen, Dongguan, Huizhou, Guangzhou and nearby locations.',
      scaleTitle: 'A focused, founder-led practice', scaleText: 'ZimonAI is currently a one-person company. The website does not imply a global team, inspection network or laboratory. Work is scoped case by case so that accepted assignments can be delivered responsibly.',
      principles: [['Explain the conclusion', 'Show what was checked, where it was checked and what remains unresolved.'], ['Prefer traceable sources', 'Use official or issuer-controlled records first when they are available.'], ['State the boundary', 'Do not turn absence of evidence into certainty or verification into a guarantee.']],
      ctaTitle: 'Bring one supplier and one decision.', ctaText: 'We will start by identifying which claims can be checked and which service tier fits.'
    },
    request: {
      kicker: 'Request verification', title: 'Tell us who you are about to buy from.', lead: 'Share what you already have. We will review the request and reply with scope, tier and next steps before work begins.',
      honest: 'This form does not upload data to a server. It opens a prepared email in your mail app so you can review and send it directly to ZimonAI.',
      fields: { name: 'Your name', email: 'Your email', company: 'Your company (optional)', supplier: 'Supplier name', url: 'Supplier website / Alibaba URL (optional)', chinese: 'Chinese company name, if known (optional)', product: 'Product', question: 'What do you want verified?', consent: 'I understand this opens an email draft and no information is uploaded by this website.', send: 'Open email draft', required: 'Required' },
      placeholders: { name: 'Alex Morgan', email: 'alex@company.com', company: 'Northline Goods', supplier: 'Supplier trading or legal name', url: 'https://…', chinese: '深圳市…有限公司', product: '65W USB-C charger', question: 'For example: verify the company identity, certificate holder and whether model X is within scope.' },
      after: 'Attach certificate files or supplier documents in your email app after the draft opens.',
      directTitle: 'Prefer to write directly?', directText: 'Email the supplier name, link, product and your verification question. Please do not send payment card information or unnecessary identity documents.',
      responseTitle: 'What happens next', responseSteps: ['We review whether the question can be answered responsibly.', 'We confirm Tier 1, Tier 2 or a case-by-case scope and quote.', 'Work begins only after scope, price and delivery timing are agreed.']
    },
    privacy: {
      kicker: 'Privacy notice', title: 'A minimal-data website by design.', lead: 'Effective 12 August 2026. This notice explains how information is handled on the ZimonAI website.',
      sections: [
        ['Website use', 'The public website does not use advertising cookies, behavioural tracking or account registration. Standard infrastructure logs may be processed by the hosting provider for security and reliable delivery.'],
        ['Request form', 'The request form creates an email draft on your device. The website does not upload or store the entered fields. Information is transmitted only when you choose to send the email through your email provider.'],
        ['Information you email', 'If you contact ZimonAI, the message and attachments are used to assess or deliver the requested service, respond to you and maintain necessary business records. Do not send information that is not needed for the verification request.'],
        ['Sharing', 'Information is not sold. It may be shared only with service providers needed to communicate or deliver an agreed assignment, when you direct us to do so, or when required by law.'],
        ['Retention and requests', 'Business correspondence is retained only as reasonably needed for the request, service delivery, records and legal obligations. Contact ZimonAI to ask about access, correction or deletion where applicable.'],
        ['Contact', 'Privacy questions can be sent to simonlo@zimonai.com.']
      ]
    }
  },

  'zh-tw': {
    prefix: 'zh-tw', htmlLang: 'zh-Hant', locale: 'zh_TW', short: '繁', name: '繁體中文',
    meta: {
      titles: { home: '中國供應商核查服務｜ZimonAI 智蒙灣', services: '供應商核查服務與價格｜ZimonAI 智蒙灣', methodology: '供應商核查方法｜ZimonAI 智蒙灣', scope: '服務範圍與限制｜ZimonAI 智蒙灣', about: '關於 ZimonAI 智蒙灣', request: '申請供應商核查｜ZimonAI 智蒙灣', privacy: '隱私聲明｜ZimonAI 智蒙灣' },
      descriptions: { home: '匯款前先查清楚中國供應商。ZimonAI 智蒙灣透過可追溯來源核對公司身分、證書、型號與供應商宣稱。', services: '遠端供應商核查每家 US$99–149；華南預約現場核驗每家 US$299–399。', methodology: '了解 ZimonAI 如何以官方來源優先的方法核對中國公司資料、證書持有人、型號範圍與供應商宣稱。', scope: '了解供應商核查能證實什麼、不能證實什麼，以及為什麼核查不等於保證。', about: 'ZimonAI 智蒙灣是一個往返台北與深圳／華南的獨立供應商核查服務。', request: '告訴 ZimonAI 你需要核查的中國供應商、公司資料、證書或產品宣稱。', privacy: 'ZimonAI 如何處理你在申請供應商核查時選擇提供的資訊。' }
    },
    nav: { services: '服務', methodology: '核查方法', scope: '範圍與限制', about: '關於', request: '核查供應商', menu: '選單', close: '關閉' },
    common: { eyebrow: '中國供應商核查', demo: '操作示範・虛構供應商', verified: '已證實', unresolved: '無法證實', discrepancy: '發現不一致', pending: '待核查', source: '來源', claim: '供應商宣稱', record: '官方紀錄', result: '結果', queryDate: '查詢日期', reference: '參考編號', email: 'Email', phone: '電話', contact: '申請核查', methodology: '查看核查方法', independent: '不收供應商佣金，保持獨立', footerLine: '我不幫你買，我幫你查清楚你要跟誰買。', footerScope: '不是採購代理、產品品質檢驗機構或認可檢驗機構；未取得 ISO 17020 或 CNAS 認可。', privacy: '隱私', language: '語言', top: '回到頂端', current: '目前頁面' },
    home: {
      kicker: '在商業承諾之前，先取得可追溯的答案', title: '匯款之前，先查清楚你的中國供應商。', lead: '我們透過可追溯紀錄核對公司身分、證書與供應商宣稱，讓你知道真正要向誰購買。', primary: '核查供應商', secondary: '查看核查方法', distinction: '不代採購、不議價、不經手貨款。為海外買家提供獨立核查。',
      dossier: { company: 'Lumen Harbor Devices Co., Ltd.', since: '2014', certificate: 'UL 認證', factory: '深圳', run: '執行示範核查', running: '正在交叉比對紀錄…', done: '完成三項宣稱核查，其中一項不一致需要注意。', reset: '再次示範' },
      checks: [['商業登記', '找到相符公司主體', 'verified'], ['證書持有人', '持有人與供應商不同', 'discrepancy'], ['產品型號範圍', '未在紀錄中找到型號', 'unresolved']],
      story: { label: '這是一場調查，不是一個分數', title: '供應商宣稱，只是第一層。', intro: '沿著證據路徑往下滑；每一步都會改變我們能負責任下的結論。', steps: [
        { no: '01', title: '先保留原始宣稱', text: '完整記錄供應商提供的公司名、證書與產品型號，不先把拼法或主體差異修飾掉。', stage: 'claim' },
        { no: '02', title: '找到可複查來源', text: '優先查找官方公司與證書資料庫。第三方網站可以提供線索，但不能被當作最終證據。', stage: 'source' },
        { no: '03', title: '交叉核對關係', text: '證書可能真的存在，卻屬於另一個法律主體，或根本不涵蓋報價型號。持有人、地址與範圍必須對得上。', stage: 'compare' },
        { no: '04', title: '只報告證據支持的內容', text: '結論分開呈現已證實、無法證實與發現不一致；不使用虛構信心分數掩蓋資料缺口。', stage: 'result' }
      ] },
      compare: { label: '證據接縫', title: '宣稱與紀錄看似接近，直到逐欄對齊。', hint: '拖曳比較虛構供應商宣稱與示範紀錄。', leftTitle: '供應商宣稱', rightTitle: '紀錄顯示', left: ['成立：2014 年', '證書持有人：Lumen Harbor Devices', '型號：LH-65W'], right: ['登記成立：2023 年', '證書持有人：Lumen Harbor Trading', '型號範圍：僅 LH-45W'], conclusion: '發現不一致：公司歷史、持有人名稱與型號範圍未能對齊。' },
      why: { label: '為什麼是 ZimonAI', title: '讓沒有中國資料研究能力的小型買家，也能取得透明核查。', text: '中文公司名稱、證書系統與官方資料庫往往難以跨語言判讀。ZimonAI 把研究過程整理成你可以檢視、追問的證據報告。' },
      service1: { tier: 'Tier 1', title: '遠端供應商核查', price: 'US$99–149', unit: '每家供應商', time: '約 3 個工作天', text: '透過可追溯紀錄核對公司身分、狀態、證書持有人與型號範圍。' },
      service2: { tier: 'Tier 2', title: '現場核驗', price: 'US$299–399', unit: '每家供應商', time: '約 5–7 個工作天', text: '在華南可執行區域進行預約、透明的到訪，確認地址與基本營運存在。' },
      demoTitle: '打開一份虛構證據檔案。', demoLead: '選擇一項宣稱，查看來源、紀錄與結果如何分開呈現。這是產品示範，不是即時資料庫查詢，也不是客戶案例。',
      demoTabs: [
        { id: 'identity', label: '公司身分', source: '官方企業登記', claim: 'Lumen Harbor Devices Co., Ltd.', record: '找到法律主體，登記狀態正常。', result: 'verified', note: '提交的中文法定名稱與找到的公司主體一致。' },
        { id: 'registration', label: '商業登記', source: '官方企業登記', claim: '自 2014 年起營運', record: '成立日期：2023 年 3 月 18 日。', result: 'discrepancy', note: '所找到的登記紀錄不支持供應商宣稱的營運歷史。' },
        { id: 'certificate', label: 'UL 證書', source: '認證資料庫', claim: '證書屬於供應商', record: '紀錄持有人為 Lumen Harbor Trading Co., Ltd.', result: 'discrepancy', note: '證書確實存在，但持有人名稱與供應商法律主體不符。' },
        { id: 'model', label: '產品型號', source: '證書型號範圍', claim: 'LH-65W 在涵蓋範圍內', record: '列出型號：LH-30W、LH-45W。', result: 'unresolved', note: '在已查閱紀錄內未找到提交的型號。' },
        { id: 'address', label: '工廠地址', source: '登記紀錄與供應商文件', claim: '深圳工廠', record: '找到登記地址；是否實際製造仍需現場確認。', result: 'unresolved', note: '僅有登記地址，不能證實工廠活動。' }
      ],
      limitsTitle: '我們也會告訴你，哪些事情無法證實。', limitsText: '有效紀錄不能保證未來行為、產品品質、出貨合規或商業履約。清楚標示限制是報告的一部分，不是藏在細則裡。', finalTitle: '手上有需要核查的供應商宣稱？', finalText: '提供公司名稱、連結、證書或產品型號。我們會在開始前告訴你哪些能查，以及適合哪個服務層級。'
    },
    services: {
      kicker: '服務與價格', title: '兩個核查層級，每一個都有清楚邊界。', lead: '選擇遠端證據研究，或加上預約現場到訪；工作開始前會先確認範圍。',
      tier1: { label: 'Tier 1', title: '遠端供應商核查', price: 'US$99–149／每家供應商', time: '約 3 個工作天', best: '適合準備首張訂單、支付訂金或重新建立合作前，需要先查清楚供應商的小型買家。', includes: ['中國法律主體身分與公司狀態', '企業登記資料交叉核對', '證書存在性與持有人核對', '在紀錄允許時查核產品／型號範圍', '辨識提交資料與官方紀錄的明顯不一致', '在適當情況提供證據連結、截圖或來源紀錄'], output: '一份以證據為核心的精簡報告，分開呈現已證實、無法證實與發現不一致。' },
      tier2: { label: 'Tier 2', title: '現場核驗', price: 'US$299–399／每家供應商', time: '約 5–7 個工作天', best: '適合需要基本確認供應商所稱地址與營運存在是否能被現場觀察的買家。', includes: ['確認範圍並與供應商預約', '前往可執行的供應商地址', '基本觀察是否存在營運活動', '核對公司名稱、招牌與地址', '在適當且同意的情況下留下事實紀錄', '進行與到訪相關的遠端紀錄核查'], output: '在深圳、東莞、惠州、廣州及周邊可執行區域，進行預約且透明的現場核驗。' },
      custom: { label: '標準服務以外', title: '客製核查，逐案評估。', text: '如果問題不完全符合 Tier 1 或 Tier 2，請先描述需求。我們只接受能負責任交付的工作，不暗示已存在未標價的 Tier 3–6 能力。' },
      notIncluded: { title: '兩個層級都不包含', items: ['供應商搜尋或介紹', '議價或採購管理', '經手訂單、訂金或供應商款項', '產品品質檢驗或實驗室測試', '保證未來行為或出貨合規', '秘密、臥底或未預告的調查'] },
      ctaTitle: '不確定適合哪一個層級？', ctaText: '提供供應商與你正在做的決策；先確認範圍，再談付款。'
    },
    methodology: {
      kicker: '核查方法', title: '從宣稱走到結論，不隱藏資料缺口。', lead: '我們採官方來源優先、可解釋的方法，結論只到證據能支持的位置。', mapTitle: '探索核查路徑', mapLead: '選擇每一步，查看我們查什麼、為什麼重要、使用哪類來源，以及可能得到什麼結果。',
      nodes: [
        { id: 'intake', label: '供應商宣稱', check: '完整保留提交的名稱、連結、證書、型號與地址。', why: '細小的拼法、主體或型號差異都可能改變結果。', source: '買家與供應商資料', results: '起點，不是結論' },
        { id: 'registry', label: '企業登記', check: '中文法定名稱、統一社會信用代碼、狀態、成立日期與登記地址。', why: '英文名稱或商號不一定能辨識真正交易的法律主體。', source: '中國官方企業紀錄', results: '已證實／無法證實／不一致' },
        { id: 'certificate', label: '證書紀錄', check: '紀錄是否存在、狀態、持有人、發證方與可取得細節。', why: '證書圖片可能遭修改、過期，或其實屬於另一家公司。', source: '官方或發證機構控制的資料庫', results: '已證實／無法證實／不一致' },
        { id: 'holder', label: '持有人關係', check: '證書持有人、供應商主體與所稱工廠是否相同或有明確關聯。', why: '真實證書不代表一定屬於報價的公司。', source: '跨紀錄比對', results: '關係成立／未解／不符' },
        { id: 'model', label: '型號範圍', check: '報價產品型號是否出現在可取得的證書涵蓋範圍。', why: '證書可能只涵蓋特定型號、版本或額定規格。', source: '證書附表與產品紀錄', results: '涵蓋／未找到／排除' },
        { id: 'crosscheck', label: '交叉核對', check: '將所有紀錄中的名稱、日期、地址與型號逐欄對齊。', why: '矛盾往往只有在來源並排時才會出現。', source: '證據矩陣', results: '一致／未解／不一致' },
        { id: 'report', label: '證據報告', check: '每個結論都附上來源、查詢日期、證據與限制。', why: '買家應該能理解並追問核查邏輯。', source: 'ZimonAI 分析', results: '已證實／無法證實／發現不一致' }
      ],
      sourcesTitle: '官方來源優先，不等於只看官方來源。', sourcesText: '我們優先使用官方登記、監管、認可與認證資料庫。供應商文件與第三方來源可以提供線索或背景，但會按證據強度標示，不會被默默包裝成最終證明。', statusesTitle: '三種結果，不做黑箱分數', statusText: ['已證實：找到的證據支持被核查的特定陳述。', '無法證實：可取得來源不足以支持負責任的結論。', '發現不一致：供應商宣稱與找到的紀錄在重要欄位互相衝突。'], handlingTitle: '證據處理', handlingText: '報告會標示來源類型與查詢日期，並在適當情況提供連結、截圖或來源紀錄。資料庫的可用性與存取可能改變，因此結論會說明當時實際可查到的內容。'
    },
    scope: {
      kicker: '範圍與限制', title: '核查可以降低不確定性，但不能消除風險。', lead: '可信的核查服務，必須清楚說明結論停在哪裡。', doTitle: '我們會做', doItems: ['核對可識別的公司與證書紀錄', '交叉比對法定名稱、持有人、型號與地址', '把證據和供應商陳述分開', '解釋資料缺口與互相衝突的紀錄', '在可執行地區進行預約現場核驗'], dontTitle: '我們不做', dontItems: ['找供應商或介紹供應商', '議價或處理商業條件', '經手訂單、訂金或供應商款項', '收取供應商佣金或回扣', '產品品質檢驗或實驗室測試', '秘密、臥底或未預告的調查'],
      limitsTitle: '核查限制', limits: [['真實公司不等於可靠供應商', '登記資料可以證實法律存在與狀態，不能保證未來行為、交付或償付能力。'], ['真實證書不是產品的全面保證', '紀錄可能只適用特定持有人、型號、規格、地點或期間，也不能證明每一件出貨品都合規。'], ['地址不自動等於工廠', '登記地址或到訪地址本身，不能證明製造所有權、產能或產品品質。'], ['紀錄受時間與存取限制', '資料庫可能改變、無法使用或省略資訊；結論只針對標示查詢時間可取得的紀錄。'], ['現場核驗是透明的', '到訪會先預約，並在供應商知情同意下進行，不是秘密調查。']],
      accreditationTitle: '認可資格揭露', accreditationText: 'ZimonAI 不是認可檢驗機構，未取得 ISO 17020 或 CNAS 認可。本服務是供應商資訊核查，不是認可的產品檢驗、認證或符合性評估。', ctaTitle: '其實需要產品驗貨？', ctaText: '我們會直接說明。如果你的決策需要抽樣、實驗室測試、出貨前檢驗或認可符合性評估，ZimonAI 核查不能取代這些服務。'
    },
    about: {
      kicker: '關於 ZimonAI', title: '為需要證據、而不是銷售中間人的買家而設。', lead: 'ZimonAI 智蒙灣是一個由創辦人直接經營、往返台北與深圳／華南的獨立供應商核查服務。', originTitle: '為什麼需要這項服務', originText: '海外買家常收到英文公司名、證書圖片與看似完整的供應商頁面，卻缺少中文脈絡與資料庫經驗把這些資訊連起來。ZimonAI 的工作，就是讓這個核查過程變得清楚。', modelTitle: '刻意保持獨立', modelText: '我們不代表中國供應商、不收供應商佣金、不議價、不經手訂單與貨款。客戶是買家。這種分離，讓核查問題不受促成交易的誘因影響。', footprintTitle: '台北判讀，華南執行', footprintText: '遠端研究可針對適用的中國公司與證書來源進行；預約現場核驗限深圳、東莞、惠州、廣州及周邊可執行區域。', scaleTitle: '由創辦人直接負責的專注服務', scaleText: 'ZimonAI 目前是一人公司。網站不暗示全球團隊、檢驗網絡或實驗室。每個案件逐一確認範圍，確保接受的工作能負責任地交付。', principles: [['解釋結論', '說明查了什麼、在哪裡查，以及哪些仍未解。'], ['優先可追溯來源', '在可取得時，先使用官方或發證機構控制的紀錄。'], ['說清楚邊界', '不把缺乏證據變成確定答案，也不把核查變成保證。']], ctaTitle: '帶來一家供應商與一個決策。', ctaText: '我們會先辨識哪些宣稱能查，以及適合哪個服務層級。'
    },
    request: {
      kicker: '申請核查', title: '告訴我們，你準備向誰購買。', lead: '提供手上已有的資訊。我們會先回覆工作範圍、服務層級與下一步，再開始核查。', honest: '這個表單不會把資料上傳到伺服器；它會在你的郵件 App 開啟一封已整理好的草稿，讓你檢查後直接寄給 ZimonAI。', fields: { name: '你的姓名', email: '你的 Email', company: '公司（選填）', supplier: '供應商名稱', url: '供應商網站／Alibaba 連結（選填）', chinese: '中文公司名稱，如已知（選填）', product: '產品', question: '你想核查什麼？', consent: '我了解這會開啟郵件草稿，網站不會上傳任何資料。', send: '開啟郵件草稿', required: '必填' }, placeholders: { name: '王小明', email: 'name@company.com', company: 'Northline Goods', supplier: '供應商商號或法定名稱', url: 'https://…', chinese: '深圳市…有限公司', product: '65W USB-C 充電器', question: '例如：核查公司身分、證書持有人，以及型號 X 是否在證書範圍內。' }, after: '草稿開啟後，可以在郵件 App 內附上證書或供應商文件。', directTitle: '想直接寫信？', directText: '請提供供應商名稱、連結、產品與核查問題。不要傳送信用卡資料或不必要的身分文件。', responseTitle: '接下來會發生什麼', responseSteps: ['我們先判斷這個問題能否負責任地核查。', '確認 Tier 1、Tier 2 或逐案範圍與報價。', '只有在範圍、價格與交付時間確認後才開始工作。']
    },
    privacy: { kicker: '隱私聲明', title: '刻意維持最少資料。', lead: '生效日期：2026 年 8 月 12 日。本聲明說明 ZimonAI 網站如何處理資訊。', sections: [['網站使用', '公開網站不使用廣告 Cookie、行為追蹤或帳號註冊。託管服務商可能為了安全與穩定傳輸處理標準基礎設施紀錄。'], ['申請表單', '申請表單只在你的裝置建立郵件草稿，不會由網站上傳或保存欄位內容。只有當你選擇透過自己的郵件服務寄出時，資料才會傳送。'], ['你寄來的資訊', '如果你聯絡 ZimonAI，訊息與附件會用於評估或交付申請的服務、回覆問題與保存必要商業紀錄。請勿提供核查不需要的資訊。'], ['分享', '資訊不會出售。只有在交付已同意工作所需、你指示我們分享，或法律要求時，才可能提供給必要服務商或相關方。'], ['保存與請求', '商業往來只在合理需要的申請、服務交付、紀錄與法律義務期間保存。你可以聯絡 ZimonAI，依法詢問存取、更正或刪除。'], ['聯絡', '隱私問題可寄至 simonlo@zimonai.com。']] }
  }
};

// Simplified Chinese starts from the Traditional content so structure remains identical;
// all user-facing strings below are explicitly rewritten, not browser-translated.
languages['zh-cn'] = {
  ...languages['zh-tw'],
  prefix: 'zh-cn', htmlLang: 'zh-Hans', locale: 'zh_CN', short: '简', name: '简体中文',
  meta: {
    titles: { home: '中国供应商核查服务｜ZimonAI 智蒙灣', services: '供应商核查服务与价格｜ZimonAI 智蒙灣', methodology: '供应商核查方法｜ZimonAI 智蒙灣', scope: '服务范围与限制｜ZimonAI 智蒙灣', about: '关于 ZimonAI 智蒙灣', request: '申请供应商核查｜ZimonAI 智蒙灣', privacy: '隐私声明｜ZimonAI 智蒙灣' },
    descriptions: { home: '汇款前先查清楚中国供应商。ZimonAI 智蒙灣通过可追溯来源核对公司身份、证书、型号与供应商说法。', services: '远程供应商核查每家 US$99–149；华南预约现场核验每家 US$299–399。', methodology: '了解 ZimonAI 如何以官方来源优先的方法核对中国公司资料、证书持有人、型号范围与供应商说法。', scope: '了解供应商核查能证实什么、不能证实什么，以及为什么核查不等于保证。', about: 'ZimonAI 智蒙灣是一项往返台北与深圳／华南的独立供应商核查服务。', request: '告诉 ZimonAI 你需要核查的中国供应商、公司资料、证书或产品说法。', privacy: 'ZimonAI 如何处理你在申请供应商核查时选择提供的信息。' }
  },
  nav: { services: '服务', methodology: '核查方法', scope: '范围与限制', about: '关于', request: '核查供应商', menu: '菜单', close: '关闭' },
  common: { eyebrow: '中国供应商核查', demo: '操作演示・虚构供应商', verified: '已证实', unresolved: '无法证实', discrepancy: '发现不一致', pending: '待核查', source: '来源', claim: '供应商说法', record: '官方记录', result: '结果', queryDate: '查询日期', reference: '参考编号', email: 'Email', phone: '电话', contact: '申请核查', methodology: '查看核查方法', independent: '不收供应商佣金，保持独立', footerLine: '我不帮你买，我帮你查清楚你要跟谁买。', footerScope: '不是采购代理、产品质量检验机构或认可检验机构；未取得 ISO 17020 或 CNAS 认可。', privacy: '隐私', language: '语言', top: '回到顶部', current: '当前页面' }
};

const cn = languages['zh-cn'];
cn.home = {
  ...languages['zh-tw'].home,
  kicker: '在商业承诺之前，先取得可追溯的答案', title: '汇款之前，先查清楚你的中国供应商。', lead: '我们通过可追溯记录核对公司身份、证书与供应商说法，让你知道真正要向谁购买。', primary: '核查供应商', secondary: '查看核查方法', distinction: '不代采购、不议价、不经手货款。为海外买家提供独立核查。',
  dossier: { company: 'Lumen Harbor Devices Co., Ltd.', since: '2014', certificate: 'UL 认证', factory: '深圳', run: '运行演示核查', running: '正在交叉比对记录…', done: '完成三项说法核查，其中一项不一致需要注意。', reset: '再次演示' },
  checks: [['商业登记', '找到相符公司主体', 'verified'], ['证书持有人', '持有人与供应商不同', 'discrepancy'], ['产品型号范围', '未在记录中找到型号', 'unresolved']],
  story: { label: '这是一场调查，不是一个分数', title: '供应商说法，只是第一层。', intro: '沿着证据路径向下滑；每一步都会改变我们能够负责任作出的结论。', steps: [
    { no: '01', title: '先保留原始说法', text: '完整记录供应商提供的公司名、证书与产品型号，不先把拼法或主体差异修饰掉。', stage: 'claim' },
    { no: '02', title: '找到可复查来源', text: '优先查询官方公司与证书数据库。第三方网站可以提供线索，但不能被当作最终证据。', stage: 'source' },
    { no: '03', title: '交叉核对关系', text: '证书可能真实存在，却属于另一个法律主体，或根本不涵盖报价型号。持有人、地址与范围必须对得上。', stage: 'compare' },
    { no: '04', title: '只报告证据支持的内容', text: '结论分别呈现已证实、无法证实与发现不一致；不使用虚构信心分数掩盖资料缺口。', stage: 'result' }
  ] },
  compare: { label: '证据接缝', title: '说法与记录看似接近，直到逐栏对齐。', hint: '拖动比较虚构供应商说法与演示记录。', leftTitle: '供应商说法', rightTitle: '记录显示', left: ['成立：2014 年', '证书持有人：Lumen Harbor Devices', '型号：LH-65W'], right: ['登记成立：2023 年', '证书持有人：Lumen Harbor Trading', '型号范围：仅 LH-45W'], conclusion: '发现不一致：公司历史、持有人名称与型号范围未能对齐。' },
  why: { label: '为什么是 ZimonAI', title: '让没有中国资料研究能力的小型买家，也能取得透明核查。', text: '中文公司名称、证书系统与官方数据库往往难以跨语言判断。ZimonAI 把研究过程整理成你可以查看、追问的证据报告。' },
  service1: { tier: 'Tier 1', title: '远程供应商核查', price: 'US$99–149', unit: '每家供应商', time: '约 3 个工作日', text: '通过可追溯记录核对公司身份、状态、证书持有人与型号范围。' },
  service2: { tier: 'Tier 2', title: '现场核验', price: 'US$299–399', unit: '每家供应商', time: '约 5–7 个工作日', text: '在华南可执行区域进行预约、透明的到访，确认地址与基本运营存在。' },
  demoTitle: '打开一份虚构证据档案。', demoLead: '选择一项说法，查看来源、记录与结果如何分开呈现。这是产品演示，不是实时数据库查询，也不是客户案例。',
  demoTabs: languages['zh-tw'].home.demoTabs.map((item, i) => ([
    { ...item, label: '公司身份', source: '官方企业登记', record: '找到法律主体，登记状态正常。', note: '提交的中文法定名称与找到的公司主体一致。' },
    { ...item, label: '商业登记', source: '官方企业登记', claim: '自 2014 年起运营', record: '成立日期：2023 年 3 月 18 日。', note: '找到的登记记录不支持供应商所称运营历史。' },
    { ...item, label: 'UL 证书', source: '认证数据库', claim: '证书属于供应商', record: '记录持有人为 Lumen Harbor Trading Co., Ltd.', note: '证书确实存在，但持有人名称与供应商法律主体不符。' },
    { ...item, label: '产品型号', source: '证书型号范围', claim: 'LH-65W 在涵盖范围内', record: '列出型号：LH-30W、LH-45W。', note: '在已查阅记录内未找到提交的型号。' },
    { ...item, label: '工厂地址', source: '登记记录与供应商文件', claim: '深圳工厂', record: '找到登记地址；是否实际制造仍需现场确认。', note: '仅有登记地址，不能证实工厂活动。' }
  ][i])),
  limitsTitle: '我们也会告诉你，哪些事情无法证实。', limitsText: '有效记录不能保证未来行为、产品质量、出货合规或商业履约。清楚标示限制是报告的一部分，不是藏在细则里。', finalTitle: '手上有需要核查的供应商说法？', finalText: '提供公司名称、链接、证书或产品型号。我们会在开始前告诉你哪些能查，以及适合哪个服务层级。'
};

cn.services = {
  ...languages['zh-tw'].services,
  kicker: '服务与价格', title: '两个核查层级，每一个都有清楚边界。', lead: '选择远程证据研究，或加上预约现场到访；工作开始前会先确认范围。',
  tier1: { ...languages['zh-tw'].services.tier1, title: '远程供应商核查', price: 'US$99–149／每家供应商', time: '约 3 个工作日', best: '适合准备首张订单、支付订金或重新建立合作前，需要先查清楚供应商的小型买家。', includes: ['中国法律主体身份与公司状态', '企业登记资料交叉核对', '证书存在性与持有人核对', '在记录允许时核查产品／型号范围', '识别提交资料与官方记录的明显不一致', '在适当情况下提供证据链接、截图或来源记录'], output: '一份以证据为核心的精简报告，分别呈现已证实、无法证实与发现不一致。' },
  tier2: { ...languages['zh-tw'].services.tier2, title: '现场核验', price: 'US$299–399／每家供应商', time: '约 5–7 个工作日', best: '适合需要基本确认供应商所称地址与运营存在是否能被现场观察的买家。', includes: ['确认范围并与供应商预约', '前往可执行的供应商地址', '基本观察是否存在运营活动', '核对公司名称、招牌与地址', '在适当且同意的情况下留下事实记录', '进行与到访相关的远程记录核查'], output: '在深圳、东莞、惠州、广州及周边可执行区域，进行预约且透明的现场核验。' },
  custom: { label: '标准服务以外', title: '定制核查，逐案评估。', text: '如果问题不完全符合 Tier 1 或 Tier 2，请先描述需求。我们只接受能负责任交付的工作，不暗示已存在未标价的 Tier 3–6 能力。' },
  notIncluded: { title: '两个层级都不包含', items: ['供应商搜索或介绍', '议价或采购管理', '经手订单、订金或供应商款项', '产品质量检验或实验室测试', '保证未来行为或出货合规', '秘密、卧底或未预告的调查'] }, ctaTitle: '不确定适合哪一个层级？', ctaText: '提供供应商与你正在做的决策；先确认范围，再谈付款。'
};

cn.methodology = {
  ...languages['zh-tw'].methodology,
  kicker: '核查方法', title: '从说法走到结论，不隐藏资料缺口。', lead: '我们采用官方来源优先、可解释的方法，结论只到证据能够支持的位置。', mapTitle: '探索核查路径', mapLead: '选择每一步，查看我们查什么、为什么重要、使用哪类来源，以及可能得到什么结果。',
  nodes: languages['zh-tw'].methodology.nodes.map((n) => ({ ...n, label: ({ intake: '供应商说法', registry: '企业登记', certificate: '证书记录', holder: '持有人关系', model: '型号范围', crosscheck: '交叉核对', report: '证据报告' })[n.id], check: n.check.replaceAll('紀錄', '记录').replaceAll('證書', '证书').replaceAll('範圍', '范围').replaceAll('查核', '核查').replaceAll('資料', '资料').replaceAll('關係', '关系').replaceAll('標示', '标示').replaceAll('結論', '结论'), why: n.why.replaceAll('紀錄', '记录').replaceAll('證書', '证书').replaceAll('關係', '关系').replaceAll('報價', '报价').replaceAll('來源', '来源').replaceAll('矛盾', '矛盾'), source: n.source.replaceAll('紀錄', '记录').replaceAll('證書', '证书').replaceAll('資料庫', '数据库').replaceAll('買家', '买家').replaceAll('證據', '证据'), results: n.results.replaceAll('證實', '证实').replaceAll('發現', '发现').replaceAll('關係', '关系').replaceAll('未解', '未解').replaceAll('涵蓋', '涵盖') })),
  sourcesTitle: '官方来源优先，不等于只看官方来源。', sourcesText: '我们优先使用官方登记、监管、认可与认证数据库。供应商文件与第三方来源可以提供线索或背景，但会按证据强度标示，不会被默默包装成最终证明。', statusesTitle: '三种结果，不做黑箱分数', statusText: ['已证实：找到的证据支持被核查的特定陈述。', '无法证实：可取得来源不足以支持负责任的结论。', '发现不一致：供应商说法与找到的记录在重要字段互相冲突。'], handlingTitle: '证据处理', handlingText: '报告会标示来源类型与查询日期，并在适当情况下提供链接、截图或来源记录。数据库的可用性与访问可能改变，因此结论会说明当时实际可查询到的内容。'
};

cn.scope = {
  ...languages['zh-tw'].scope,
  kicker: '范围与限制', title: '核查可以降低不确定性，但不能消除风险。', lead: '可信的核查服务，必须清楚说明结论停在哪里。', doTitle: '我们会做', doItems: ['核对可识别的公司与证书记录', '交叉比对法定名称、持有人、型号与地址', '把证据和供应商陈述分开', '解释资料缺口与互相冲突的记录', '在可执行地区进行预约现场核验'], dontTitle: '我们不做', dontItems: ['找供应商或介绍供应商', '议价或处理商业条件', '经手订单、订金或供应商款项', '收取供应商佣金或回扣', '产品质量检验或实验室测试', '秘密、卧底或未预告的调查'], limitsTitle: '核查限制', limits: [['真实公司不等于可靠供应商', '登记资料可以证实法律存在与状态，不能保证未来行为、交付或偿付能力。'], ['真实证书不是产品的全面保证', '记录可能只适用特定持有人、型号、规格、地点或期间，也不能证明每一件出货品都合规。'], ['地址不自动等于工厂', '登记地址或到访地址本身，不能证明制造所有权、产能或产品质量。'], ['记录受时间与访问限制', '数据库可能改变、无法使用或省略信息；结论只针对标示查询时间可取得的记录。'], ['现场核验是透明的', '到访会先预约，并在供应商知情同意下进行，不是秘密调查。']], accreditationTitle: '认可资格披露', accreditationText: 'ZimonAI 不是认可检验机构，未取得 ISO 17020 或 CNAS 认可。本服务是供应商信息核查，不是认可的产品检验、认证或符合性评估。', ctaTitle: '其实需要产品验货？', ctaText: '我们会直接说明。如果你的决策需要抽样、实验室测试、出货前检验或认可符合性评估，ZimonAI 核查不能取代这些服务。'
};

cn.about = {
  ...languages['zh-tw'].about,
  kicker: '关于 ZimonAI', title: '为需要证据、而不是销售中间人的买家而设。', lead: 'ZimonAI 智蒙湾是一项由创办人直接经营、往返台北与深圳／华南的独立供应商核查服务。', originTitle: '为什么需要这项服务', originText: '海外买家常收到英文公司名、证书图片与看似完整的供应商页面，却缺少中文语境与数据库经验把这些信息连接起来。ZimonAI 的工作，就是让这个核查过程变得清楚。', modelTitle: '刻意保持独立', modelText: '我们不代表中国供应商、不收供应商佣金、不议价、不经手订单与货款。客户是买家。这种分离，让核查问题不受促成交易的激励影响。', footprintTitle: '台北判断，华南执行', footprintText: '远程研究可针对适用的中国公司与证书来源进行；预约现场核验限深圳、东莞、惠州、广州及周边可执行区域。', scaleTitle: '由创办人直接负责的专注服务', scaleText: 'ZimonAI 目前是一人公司。网站不暗示全球团队、检验网络或实验室。每个项目逐一确认范围，确保接受的工作能负责任地交付。', principles: [['解释结论', '说明查了什么、在哪里查，以及哪些仍未解决。'], ['优先可追溯来源', '在可取得时，先使用官方或发证机构控制的记录。'], ['说清楚边界', '不把缺乏证据变成确定答案，也不把核查变成保证。']], ctaTitle: '带来一家供应商与一个决策。', ctaText: '我们会先识别哪些说法能查，以及适合哪个服务层级。'
};

cn.request = {
  ...languages['zh-tw'].request,
  kicker: '申请核查', title: '告诉我们，你准备向谁购买。', lead: '提供手上已有的信息。我们会先回复工作范围、服务层级与下一步，再开始核查。', honest: '这个表单不会把资料上传到服务器；它会在你的邮件 App 打开一封已整理的草稿，让你检查后直接寄给 ZimonAI。', fields: { name: '你的姓名', email: '你的 Email', company: '公司（选填）', supplier: '供应商名称', url: '供应商网站／Alibaba 链接（选填）', chinese: '中文公司名称，如已知（选填）', product: '产品', question: '你想核查什么？', consent: '我了解这会打开邮件草稿，网站不会上传任何资料。', send: '打开邮件草稿', required: '必填' }, placeholders: { name: '张明', email: 'name@company.com', company: 'Northline Goods', supplier: '供应商商号或法定名称', url: 'https://…', chinese: '深圳市…有限公司', product: '65W USB-C 充电器', question: '例如：核查公司身份、证书持有人，以及型号 X 是否在证书范围内。' }, after: '草稿打开后，可以在邮件 App 内附上证书或供应商文件。', directTitle: '想直接写信？', directText: '请提供供应商名称、链接、产品与核查问题。不要发送信用卡资料或不必要的身份文件。', responseTitle: '接下来会发生什么', responseSteps: ['我们先判断这个问题能否负责任地核查。', '确认 Tier 1、Tier 2 或逐案范围与报价。', '只有在范围、价格与交付时间确认后才开始工作。']
};

cn.privacy = { kicker: '隐私声明', title: '刻意维持最少资料。', lead: '生效日期：2026 年 8 月 12 日。本声明说明 ZimonAI 网站如何处理信息。', sections: [['网站使用', '公开网站不使用广告 Cookie、行为追踪或账号注册。托管服务商可能为了安全与稳定传输处理标准基础设施记录。'], ['申请表单', '申请表单只在你的设备建立邮件草稿，不会由网站上传或保存字段内容。只有当你选择通过自己的邮件服务寄出时，资料才会传送。'], ['你寄来的信息', '如果你联系 ZimonAI，消息与附件会用于评估或交付申请的服务、回复问题与保存必要商业记录。请勿提供核查不需要的信息。'], ['分享', '信息不会出售。只有在交付已同意工作所需、你指示我们分享，或法律要求时，才可能提供给必要服务商或相关方。'], ['保存与请求', '商业往来只在合理需要的申请、服务交付、记录与法律义务期间保存。你可以联系 ZimonAI，依法询问访问、更正或删除。'], ['联系', '隐私问题可发送至 simonlo@zimonai.com。']] };
