// Approved 2026-09 service-positioning update. Keep stable tier IDs, prices and
// historical order snapshots; these are current public descriptions only.
const service = {
  en: {
    t1: {
      summary: 'A defined review of the supplier and the company, documents and product claims behind one proposed purchase.',
      groups: [
        { title: 'Company and transaction materials', items: [
          'Identify the primary Chinese legal entity and its accessible registration status.',
          'Compare names and dates across the buyer-provided quotation, contract or other agreed document versions.',
          'Compare a supplied payment-related company name with the contracting entity where relevant; matching names do not establish bank-account ownership.'
        ] },
        { title: 'Product and claim scope', items: [
          'Record the exact product model, variant and intended market supplied by the buyer.',
          'For up to two agreed certificate or authorisation claims, check the applicable issuer or official record, holder, status and available model scope.',
          'Separate matches, material discrepancies, missing information and points the available sources cannot verify.'
        ] }
      ],
      delivery: 'A 3–5 page evidence-based decision memo: what aligns, what conflicts, what remains open and which question to resolve before signing or paying. A numerical risk score is not promised.',
      notIncluded: 'Additional entities, product models or unlimited document versions; direct supplier contact, bank-account ownership confirmation, laboratory testing or product inspection.',
      fit: 'Buyers who already have a supplier, a proposed product and transaction materials to check before committing.',
      fixed: { summary: 'One supplier, one primary legal entity and one specified model; compare agreed transaction materials and up to two certificate or authorisation claims.', notIncluded: 'Additional entities, models and unlimited documents; bank-account ownership confirmation, product testing or inspection.' }
    },
    t2: {
      summary: 'Investigate material gaps in a proposed transaction through focused company, relationship and public-record research.',
      upgrade: 'Includes the defined T1 review. Additional research follows the important unanswered questions, rather than a longer generic company profile.',
      groups: [{ title: 'Investigate the material gap', items: [
        'Trace up to two directly related entities when needed to explain the seller, exporter, manufacturer, certificate holder or payment entity.',
        'Use accessible ownership, corporate history, address, business-scope, litigation, enforcement or administrative records only when relevant to the question.',
        'Test plausible explanations against the available documents and records; distinguish a supported relationship from a supplier statement.',
        'Explain whether the added evidence resolves the question, changes the buyer’s next step or leaves a material point open.'
      ] }],
      notIncluded: 'Direct supplier confirmation, legal opinion, bank-account ownership verification, site visits, product testing or unrelated entities.',
      fit: 'Buyers whose transaction contains a material discrepancy or relationship question that needs more than document comparison.',
      fixed: { summary: 'T1 plus question-led research into up to two directly related entities and the records needed to explain material gaps.', notIncluded: 'Direct supplier or bank confirmation, site work, product inspection and unrelated entity groups.' }
    },
    t3: {
      title: 'Structured Supplier Interview',
      summary: 'A consent-based interview designed around unresolved questions and new, attributable evidence.',
      timing: 'Agreed in the quotation after supplier participation is confirmed',
      upgrade: 'A scoped interview informed by the existing document review; we agree participants, questions and evidence requested before contact.',
      groups: [{ title: 'What the interview records', items: [
        'The interviewee’s name and role, and answers about the specified model and seller, manufacturer or OEM/ODM relationship.',
        'Statements on assembly, testing, packaging, outsourcing, certificate ownership and available records where relevant.',
        'What was said, shown live, supported by a document or still unverified; any restricted access is recorded with its reason.'
      ] }],
      note: 'A declined interview or video request is documented as unavailable evidence, with the stated reason and effect on the original question. It is not automatically a high-risk finding.',
      notIncluded: 'An independent site visit, production-capacity guarantee, product inspection or laboratory conclusion.',
      fit: 'Transactions where a named supplier representative can clarify a material issue that records alone cannot resolve.'
    },
    t4: {
      title: 'On-the-ground Evidence Collection',
      summary: 'A consent-based visit to record what is observable at an agreed place and time.',
      timing: 'Agreed in the quotation after site access and observer availability are confirmed',
      upgrade: 'Site access, observer, location, questions and permitted records are confirmed in the quotation.',
      groups: [{ title: 'Site evidence', items: [
        'Record location, visit time, host and role, signage and alignment with the stated legal entity.',
        'Describe visible equipment, activity and presence of the specified product without inferring ownership, capacity or future output.',
        'Record supplier explanations, restricted areas and outsourcing claims separately from direct observations.',
        'Provide contextual photographs with captions stating what each image does and does not establish.'
      ] }],
      notIncluded: 'Product pass/fail, wattage or interface testing, AQL sampling, quality release, production or shipment inspection.',
      fit: 'Buyers whose question requires direct observation at an agreed location and can be answered within a site-evidence scope.'
    },
    t5: {
      title: 'Ongoing Supplier Review',
      summary: 'A scoped pilot to revisit an agreed supplier baseline and explain meaningful changes.',
      timing: 'Review frequency and term agreed in the quotation',
      upgrade: 'Supplier count, sources, review interval, response window and fee are defined before the pilot.',
      groups: [{ title: 'Baseline and change review', items: [
        'Record agreed legal entities, models, relevant certificate claims and unresolved questions as the starting baseline.',
        'At the agreed interval, revisit available company, ownership, address, litigation, enforcement, administrative and relevant certificate records.',
        'Compare new quotations, product documents or payment instructions only when the buyer supplies them.',
        'Explain the effect of material changes on the existing buying decision and identify the next evidence needed.'
      ] }],
      notIncluded: 'Real-time or 24/7 alerts, unlimited suppliers or cases, automatic discovery of private payment changes, site visits or purchase decisions.',
      fit: 'Buyers with repeat orders and a small, agreed set of suppliers or unresolved issues worth revisiting.'
    },
    t6: {
      title: 'Advanced Enterprise Engagement',
      summary: 'A separately scoped engagement for connected supplier questions or a defined group of existing suppliers.',
      timing: 'Project timetable agreed in the quotation',
      upgrade: 'We define the entities, evidence sources, people, deliverables and review cadence before accepting the work.',
      groups: [{ title: 'Possible agreed work', items: [
        'Coordinate several defined verification questions across buyer-nominated suppliers.',
        'Maintain a human-reviewed record of evidence, open issues, last review dates and agreed next steps.',
        'Combine remote research, consent-based interviews or site evidence only when individually scoped and feasible.'
      ] }],
      notIncluded: 'Supplier search or recommendations, RFQ management, procurement outsourcing, production or shipment inspection, or a live enterprise monitoring platform.',
      fit: 'Buyers with a specific multi-supplier verification need and an agreed review capacity, not an open-ended managed-sourcing mandate.'
    }
  },
  'zh-tw': {
    t1: {
      summary: '針對一筆採購，核對供應商公司、交易文件與指定產品的說法是否對得上。',
      groups: [
        { title: '公司與交易資料', items: [
          '確認主要中國法律主體，以及可取得的登記與經營狀態紀錄。',
          '依約定的報價、合約或其他文件版本，比對公司名稱、日期與交易資訊。',
          '如買方提供收款相關資料，核對名稱與簽約主體的關係；名稱相同不代表銀行已確認帳戶持有人。'
        ] },
        { title: '產品與主張範圍', items: [
          '記錄買方指定的完整型號、版本與目標市場。',
          '針對最多兩項約定的證書或授權主張，視適用情況查核發證或官方紀錄、持有人、狀態與型號範圍。',
          '分開列出相符之處、重要矛盾、未提供資料及現有來源無法確認的事項。'
        ] }
      ],
      delivery: '3–5 頁附來源的決策備忘：哪些資料對得上、哪裡有矛盾、仍缺什麼證據，以及簽約或付款前該追問什麼；不承諾數字風險分數。',
      notIncluded: '額外主體、型號或無上限文件版本；直接聯絡供應商、確認銀行帳戶實際持有人、實驗室測試或產品驗貨。',
      fit: '已找到供應商，也拿到產品與交易資料，想在付款或簽約前先核對的買家。',
      fixed: { summary: '一家供應商、一個主要法律主體、一個指定型號；核對約定文件與最多兩項證書或授權主張。', notIncluded: '額外主體、型號與無上限文件；不確認銀行帳戶持有人，也不做產品測試或驗貨。' }
    },
    t2: {
      summary: '針對這筆交易的重要疑點，進一步追查公司關係、沿革與相關公開紀錄。',
      upgrade: '包含固定範圍的 T1；新增研究由實際未解問題決定，不是把公司資料堆成更長的報告。',
      groups: [{ title: '追查重要疑點', items: [
        '必要時追查最多兩個直接相關主體，釐清賣方、出口方、製造商、持證人或收款主體的關係。',
        '依問題選用可取得的股權、沿革、地址、經營範圍、訴訟、執行或行政紀錄。',
        '用文件與紀錄檢驗可能的解釋，區分已有佐證的關係與供應商單方說法。',
        '說明新增證據是否解決原本疑點、改變買方下一步，或仍留下重要未解問題。'
      ] }],
      notIncluded: '直接向供應商確認、法律意見、銀行帳戶持有人查證、到場、產品測試或無關主體。',
      fit: '交易資料有重要矛盾或主體關係未明，需要比對文件以外的相關紀錄。',
      fixed: { summary: '包含 T1，並針對重要疑點，研究最多兩個直接相關主體及必要紀錄。', notIncluded: '直接向供應商或銀行確認、現場工作、產品驗貨及無關主體。' }
    },
    t3: {
      title: '結構化供應商訪談',
      summary: '依未解疑點設計訪談，取得可記錄、可追問的新證據。',
      timing: '確認供應商願意配合後，於報價中約定時程',
      upgrade: '先根據既有文件確認訪談對象、問題及需展示的證據，再經同意聯絡。',
      groups: [{ title: '訪談紀錄', items: [
        '記錄受訪者姓名與職務，以及指定型號、賣方／製造商和 OEM／ODM 關係的回答。',
        '視問題詢問組裝、測試、包裝、外包、持證關係與可提供的紀錄。',
        '區分口頭陳述、視訊可見、文件支持及仍無法確認；受限區域與原因另行記錄。'
      ] }],
      note: '拒絕訪談或視訊時，記錄未取得的證據、對方說明的原因及對原問題的影響，不自動列為高風險。',
      notIncluded: '獨立實地到場、產能保證、產品驗貨或實驗室結論。',
      fit: '公開紀錄無法解釋關鍵疑點，需要由指定供應商人員回答的交易。'
    },
    t4: {
      title: '現場事實取證',
      summary: '經同意到指定地點，記錄特定時間與範圍內實際可觀察的事實。',
      timing: '確認現場權限與到訪人員後，於報價中約定時程',
      upgrade: '報價前確認到訪地點、人員、問題及可取得的現場資料。',
      groups: [{ title: '現場證據', items: [
        '記錄地點、到訪時間、接待者身分、牌示及與聲稱法律主體的關係。',
        '描述可見設備、活動與指定產品是否在場，不推定設備所有權、產能或未來出貨。',
        '將供應商對外包與受限區域的說明，和親眼觀察分開記錄。',
        '照片附上下文與圖說，說明每張照片能支持及不能支持什麼。'
      ] }],
      notIncluded: '產品合格判定、瓦數或介面實測、AQL 抽樣、品質放行、量產或出貨驗貨。',
      fit: '必須到指定地點觀察，且問題可在約定現場範圍內回答的買家。'
    },
    t5: {
      title: '持續供應商查核',
      summary: '先以有上限的試行，定期重新檢視已約定的供應商基準與重要變化。',
      timing: '查核頻率與服務期間依報價確認',
      upgrade: '先確認供應商數量、資料來源、查核頻率、回覆時間與費用。',
      groups: [{ title: '基準與變動判讀', items: [
        '以約定主體、型號、證書主張與未解問題建立初始基準。',
        '按約定時間重查可取得的公司、股權、地址、訴訟、執行、行政及相關證書紀錄。',
        '新報價、產品文件或付款指示，只有在買方提供後才納入比對。',
        '說明重要變化是否影響既有採購判斷，以及下一步需要什麼證據。'
      ] }],
      notIncluded: '即時或全天候警報、無上限供應商／案件、自動得知私人付款變動、到場或代做採購決策。',
      fit: '反覆採購，且有少量已約定供應商或未解問題需要定期重看的買家。'
    },
    t6: {
      title: '企業級查核專案',
      summary: '就相互關聯的查核問題，或已知供應商群，另行確認專案範圍。',
      timing: '專案時程依報價確認',
      upgrade: '承接前確認主體、證據來源、人員、交付內容與複查頻率。',
      groups: [{ title: '可約定的工作', items: [
        '對買方指定的多家供應商，協調有明確範圍的查核問題。',
        '以人工覆核的紀錄管理證據、未解問題、最後查核日期與下一步。',
        '遠端研究、經同意訪談或現場取證，均須分別確認可行性及範圍。'
      ] }],
      notIncluded: '尋找或推薦供應商、管理 RFQ、代採購、量產或出貨驗貨，以及即時企業監測平台。',
      fit: '有具體多供應商查核需求，並能先約定工作容量的買家。'
    }
  },
  'zh-cn': {
    t1: {
      summary: '围绕一笔采购，核对供应商企业、交易文件与指定产品的说法是否一致。',
      groups: [
        { title: '企业与交易资料', items: [
          '确认主要中国法律主体，以及可获取的登记与经营状态记录。',
          '按约定的报价、合同或其他文件版本，比对企业名称、日期与交易信息。',
          '如果买家提供收款相关资料，核对名称与签约主体的关系；名称相同不代表银行已确认账户实际持有人。'
        ] },
        { title: '产品与主张范围', items: [
          '记录买家指定的完整型号、版本与目标市场。',
          '针对最多两项约定的证书或授权主张，视适用情况查询发证或官方记录、持有人、状态与型号范围。',
          '分别列出相符之处、重要矛盾、未提供资料以及现有来源无法确认的事项。'
        ] }
      ],
      delivery: '3–5 页附来源的决策备忘：哪些信息一致、哪里有矛盾、还缺什么证据，以及签约或付款前该追问什么；不承诺数字风险评分。',
      notIncluded: '额外主体、型号或无限量文件版本；直接联系供应商、确认银行账户实际持有人、实验室测试或产品验货。',
      fit: '已经找到供应商，也拿到产品与交易资料，希望在付款或签约前先核对的买家。',
      fixed: { summary: '一家供应商、一个主要法律主体、一个指定型号；核对约定文件与最多两项证书或授权主张。', notIncluded: '额外主体、型号与无限量文件；不确认银行账户持有人，也不做产品测试或验货。' }
    },
    t2: {
      summary: '围绕这笔交易的重要疑点，进一步追查企业关系、沿革与相关公开记录。',
      upgrade: '包含固定范围的 T1；新增研究由实际未解问题决定，不是将企业资料堆成更长的报告。',
      groups: [{ title: '追查重要疑点', items: [
        '必要时追查最多两个直接相关主体，弄清卖方、出口方、制造商、持证人或收款主体的关系。',
        '按问题选用可获取的股权、沿革、地址、经营范围、诉讼、执行或行政记录。',
        '用文件与记录检验可能的解释，区分已有佐证的关系与供应商单方说法。',
        '说明新增证据是否解决原有疑点、改变买家下一步，或仍留下重要未解问题。'
      ] }],
      notIncluded: '直接向供应商确认、法律意见、银行账户持有人核实、到场、产品测试或无关主体。',
      fit: '交易资料存在重要矛盾或主体关系不清，需要比对文件以外的相关记录。',
      fixed: { summary: '包含 T1，并针对重要疑点，研究最多两个直接相关主体及必要记录。', notIncluded: '直接向供应商或银行确认、现场工作、产品验货及无关主体。' }
    },
    t3: {
      title: '结构化供应商访谈',
      summary: '根据未解疑点设计访谈，获取可记录、可追问的新证据。',
      timing: '确认供应商愿意配合后，在报价中约定时程',
      upgrade: '先根据已有文件确认受访人、问题及需要展示的证据，再经同意联系。',
      groups: [{ title: '访谈记录', items: [
        '记录受访者姓名与职务，以及指定型号、卖方／制造商和 OEM／ODM 关系的回答。',
        '视问题询问组装、测试、包装、外包、持证关系与可提供的记录。',
        '区分口头陈述、视频可见、文件支持及仍无法确认；受限区域与原因另行记录。'
      ] }],
      note: '拒绝访谈或视频时，记录未获取的证据、对方说明的原因及对原问题的影响，不自动列为高风险。',
      notIncluded: '独立现场到访、产能保证、产品验货或实验室结论。',
      fit: '公开记录无法解释关键疑点，需要由指定供应商人员回答的交易。'
    },
    t4: {
      title: '现场事实取证',
      summary: '经同意到指定地点，记录特定时间与范围内实际可观察的事实。',
      timing: '确认现场权限与到访人员后，在报价中约定时程',
      upgrade: '报价前确认到访地点、人员、问题及可获取的现场资料。',
      groups: [{ title: '现场证据', items: [
        '记录地点、到访时间、接待者身份、标识及其与所称法律主体的关系。',
        '描述可见设备、活动与指定产品是否在场，不推定设备所有权、产能或未来出货。',
        '将供应商对外包与受限区域的说明，同直接观察分开记录。',
        '照片附上背景与说明，写清每张照片能支持以及不能支持什么。'
      ] }],
      notIncluded: '产品合格判定、瓦数或接口实测、AQL 抽样、质量放行、量产或出货验货。',
      fit: '必须到指定地点观察，且问题可在约定现场范围内回答的买家。'
    },
    t5: {
      title: '持续供应商核查',
      summary: '先以有上限的试行，定期重新审视已约定的供应商基准与重要变化。',
      timing: '核查频率与服务期限按报价确认',
      upgrade: '先确认供应商数量、资料来源、核查频率、回复时间与费用。',
      groups: [{ title: '基准与变化判断', items: [
        '以约定主体、型号、证书主张与未解问题建立初始基准。',
        '按约定时间复查可获取的企业、股权、地址、诉讼、执行、行政及相关证书记录。',
        '新报价、产品文件或付款指示，只有在买家提供后才纳入比对。',
        '说明重要变化是否影响原有采购判断，以及下一步需要什么证据。'
      ] }],
      notIncluded: '实时或全天候警报、无限量供应商／项目、自动获悉私下付款变更、到场或代做采购决策。',
      fit: '重复采购，且有少量已约定供应商或未解问题需要定期复查的买家。'
    },
    t6: {
      title: '企业级核查项目',
      summary: '对相互关联的核查问题，或已知供应商群，另行确认项目范围。',
      timing: '项目时间按报价确认',
      upgrade: '承接前确认主体、证据来源、人员、交付内容与复查频率。',
      groups: [{ title: '可约定的工作', items: [
        '对买家指定的多家供应商，协调有明确范围的核查问题。',
        '用人工复核的记录管理证据、未解问题、最后核查日期与下一步。',
        '远程研究、经同意访谈或现场取证，均须分别确认可行性及范围。'
      ] }],
      notIncluded: '寻找或推荐供应商、管理 RFQ、代采购、量产或出货验货，以及实时企业监控平台。',
      fit: '有具体的多供应商核查需求，并能事先约定工作容量的买家。'
    }
  }
};

export function applyServicePositioning(copy) {
  for (const [locale, tiers] of Object.entries(service)) {
    for (const [id, update] of Object.entries(tiers)) {
      const existing = copy[id][locale];
      const fixed = update.fixed ? { ...existing.fixed, ...update.fixed } : undefined;
      Object.assign(existing, update);
      if (fixed) existing.fixed = fixed;
      if (existing.fixed) existing.fixed.notIncluded = existing.notIncluded;
    }
  }
}

const site = {
  en: {
    heroLead: 'We review the company, documents and product claims behind your proposed purchase—showing what matches, what conflicts and what still needs evidence.',
    principle: ['Working for the buyer.', 'Paid by the buyer; no supplier placement fees or purchase commissions.'],
    servicesLead: 'T1 compares your submitted materials. T2 investigates material gaps. Direct contact, site evidence and ongoing review are scoped separately.',
    t1Fit: 'Do these materials line up?', t2Fit: 'What explains a material gap?',
    menuT1: 'Compare company, documents and product claims', menuT2: 'Investigate material gaps and relationships',
    aboutLead: 'Buyer-paid supplier verification, coordinated between Taiwan and Shenzhen. Our fee pays for the agreed review, not a favourable conclusion.',
    servicePageLead: 'T1 checks the consistency of one proposed purchase. T2 follows important unresolved questions through relevant records. Advanced work is agreed case by case.',
    requestLead: 'Tell us which supplier, product and buying decision need review. Share sensitive documents only through an agreed secure channel.',
    reportGap: 'Historical format reference, not a new supplier assessment or delivery under the current T1/T2 scope. Actual work follows the agreed assignment.'
  },
  'zh-tw': {
    heroLead: '針對你手上的採購資料，核對公司、文件與產品說法。把對得上的地方、重要矛盾，以及仍缺少的證據說清楚。',
    principle: ['站在買家這一邊。', '由買家付費；不收供應商推薦費或採購成交佣金。'],
    servicesLead: 'T1 核對現有交易資料；T2 追查重要疑點。訪談、現場取證與持續查核另行確認範圍。',
    t1Fit: '手上的資料對得上嗎？', t2Fit: '重要疑點怎麼解釋？',
    menuT1: '核對公司、文件與產品說法', menuT2: '追查重要疑點與主體關係',
    aboutLead: '由買家付費的供應商查核，由台灣與深圳協作。服務費支付的是約定的查核工作，不是有利結論。',
    servicePageLead: 'T1 核對一筆採購的現有資料；T2 追查尚未解決的重要問題。進階工作依案件確認。',
    requestLead: '告訴我們供應商、產品與你要做的採購決定。敏感文件請透過確認後的安全管道提供。',
    reportGap: '這是既有報告的格式範例，不代表新版 T1／T2 的實際交付。服務內容以雙方確認的範圍為準。'
  },
  'zh-cn': {
    heroLead: '围绕你手上的采购资料，核对企业、文件与产品说法。说明哪些信息相互印证、哪些存在重要矛盾，以及还缺少什么证据。',
    principle: ['站在买家这一边。', '由买家付费；不收供应商推荐费或采购成交佣金。'],
    servicesLead: 'T1 核对现有交易资料；T2 追查重要疑点。访谈、现场取证与持续核查另行确认范围。',
    t1Fit: '手上的资料一致吗？', t2Fit: '重要疑点如何解释？',
    menuT1: '核对企业、文件与产品说法', menuT2: '追查重要疑点与主体关系',
    aboutLead: '由买家付费的供应商核查，由台湾与深圳协作。服务费对应约定的核查工作，不是有利结论。',
    servicePageLead: 'T1 核对一笔采购的现有资料；T2 追查仍未解决的重要问题。进阶工作按项目确认。',
    requestLead: '告诉我们供应商、产品和你要做的采购决定。敏感文件请通过确认后的安全渠道提供。',
    reportGap: '这是现有报告的格式示例，不代表新版 T1／T2 的实际交付。服务内容以双方确认的范围为准。'
  }
};

export function applyApprovedPositioning(copy) {
  for (const [locale, update] of Object.entries(site)) Object.assign(copy[locale], update);
}

const questions = {
  en: [
    ['When is self-research enough?', 'If you only need company records and can interpret them for this purchase, a data tool may be enough. Ask us to review a defined transaction when the documents or relationships need independent explanation.'],
    ['What does T2 add to T1?', 'T1 compares the submitted company, documents and specified product. T2 investigates material gaps using relevant corporate, relationship and public records within its fixed entity limit. It does not guarantee a favourable answer.'],
    ['What if a point cannot be verified?', 'We state the source checked, the access or evidence limit, and the next document or person that could resolve the question. No record found is not the same as proof that something does not exist.'],
    ['Does a matching payment name prove bank-account ownership?', 'No. We can compare the name in supplied payment instructions with the contracting entity and related records. Only an appropriate banking or authorised process can establish account ownership.'],
    ['Does no red flag mean the supplier is safe?', 'No. The memo reflects the agreed questions and evidence available at the review date. Delivery, product quality and future conduct are not guaranteed.'],
    ['What if more entities or documents need review?', 'We define document versions and entities before work begins. If the case exceeds the standard scope, you may narrow it, approve a separate quotation or seek the applicable refund under the payment terms.'],
    ['Do you inspect quality or find suppliers?', 'No. Core services review buyer-nominated suppliers and transaction evidence. We do not perform product QC, AQL inspection, laboratory testing, sourcing or supplier placement.'],
    ['Does a genuine certificate cover the quoted model?', 'Not necessarily. The holder, model variant, rating, date and intended market must be compared with the applicable record. A genuine document is not a product test.'],
    ['What if a related company receives payment?', 'Different entities can have a legitimate arrangement. We document the names and available relationship or authorisation evidence; we do not infer fraud or verify the receiving bank account from a name match.']
  ],
  'zh-tw': [
    ['什麼時候自己查就夠了？', '如果只需要企業紀錄，也能自行判讀這筆採購，資料工具可能已足夠。交易文件或主體關係需要專人解釋時，再委託有明確範圍的查核。'],
    ['T2 比 T1 多做什麼？', 'T1 比對已提供的公司、文件與指定產品；T2 在固定主體上限內，針對重要疑點追查相關企業、關係及公開紀錄。不能保證得到有利答案。'],
    ['有些事查不到怎麼辦？', '我們會寫明查過的來源、取用或證據限制，以及下一步需要的文件或人員。查不到紀錄，不等於已證明不存在。'],
    ['收款名稱相同，就證明銀行帳戶屬於供應商嗎？', '不能。我們可比對付款指示上的名稱、簽約主體及相關紀錄；帳戶實際持有人須由適當的銀行或授權程序確認。'],
    ['沒有發現紅旗，就代表交易安全嗎？', '不能。備忘錄只反映約定問題與查核當日可得證據；交付、產品品質與未來行為均不受保證。'],
    ['需要查更多公司或文件怎麼辦？', '開始前先確認主體與文件版本。超出標準範圍時，可縮小工作、同意另行報價，或依付款條款申請適用退款。'],
    ['你們做驗貨或幫忙找供應商嗎？', '核心服務針對買方已指定的供應商與交易資料。不做產品品質檢驗、AQL、實驗室測試，也不替買方尋找或推薦供應商。'],
    ['證書是真的，就代表報價型號適用嗎？', '不一定。仍須按適用紀錄核對持有人、型號版本、額定規格、日期與目標市場；文件查核也不等於產品測試。'],
    ['由關聯公司收款怎麼辦？', '不同主體可能有合理安排。我們會記錄名稱與可得的關係或授權證據，不因名稱不同就判定詐欺，也不以名稱相同推定帳戶歸屬。']
  ],
  'zh-cn': [
    ['什么时候自己查询就够了？', '如果只需要企业记录，也能自行判断这笔采购，数据工具可能已经足够。交易文件或主体关系需要专人解释时，再委托有明确范围的核查。'],
    ['T2 比 T1 多做什么？', 'T1 比对已提交的企业、文件与指定产品；T2 在固定主体上限内，围绕重要疑点追查相关企业、关系和公开记录。不能保证得到有利答案。'],
    ['有些问题查不到怎么办？', '我们会写明查过的来源、访问或证据限制，以及下一步需要的文件或人员。查不到记录，不等于已证明不存在。'],
    ['收款名称相同，就证明银行账户属于供应商吗？', '不能。我们可以比对付款指示上的名称、签约主体与相关记录；账户实际持有人须由适当的银行或授权程序确认。'],
    ['没有发现风险信号，就代表交易安全吗？', '不能。备忘录只反映约定问题与核查当日可得证据；交付、产品质量与未来行为均不受保证。'],
    ['需要查更多企业或文件怎么办？', '开始前先确认主体和文件版本。超出标准范围时，可以缩小工作、同意另行报价，或按付款条款申请适用退款。'],
    ['你们做验货或帮忙找供应商吗？', '核心服务针对买家已指定的供应商与交易资料。不做产品质量检验、AQL、实验室测试，也不替买家寻找或推荐供应商。'],
    ['证书真实，就代表报价型号适用吗？', '不一定。仍须按适用记录核对持有人、型号版本、额定规格、日期与目标市场；文件核查也不等于产品测试。'],
    ['由关联企业收款怎么办？', '不同主体可能有合理安排。我们会记录名称与可得的关系或授权证据，不因名称不同就判断欺诈，也不以名称相同推定账户归属。']
  ]
};

export function applyMarketingPositioning(copy) {
  for (const [locale, entries] of Object.entries(questions)) {
    copy[locale].questions = [copy[locale].questions[0], ...entries];
    copy[locale].insideLead = ({
      en: 'Read the complete public English sample to see the evidence record, limitations and follow-up requests. It is a historical format reference, not a current supplier assessment.',
      'zh-tw': '閱讀完整英文範例，了解證據紀錄、查核限制與後續建議的呈現方式。這是既有報告的格式參考，不是最新供應商查核結果。',
      'zh-cn': '阅读完整英文示例，了解证据记录、核查限制与后续建议的呈现方式。这是现有报告的格式参考，不是最新供应商核查结果。'
    })[locale];
  }
}

const publicSite = {
  en: {
    meta: {
      home: 'Review the company, transaction documents and specified product behind a proposed purchase before payment. T1 and T2 provide defined evidence-based reviews.',
      services: 'T1 checks submitted company, document and product details for USD 149. T2 investigates material gaps for USD 349. Advanced work is quoted by scope.',
      methodology: 'See how ZimonAI moves from a supplier claim and applicable question to records, cross-checks, transaction implications and remaining evidence.',
      scope: 'Understand the fixed T1 and T2 boundaries, separately scoped interviews and site evidence, and what supplier verification cannot establish.',
      about: 'Buyer-paid supplier and transaction verification focused on charging and power electronics, coordinated between Taiwan and Shenzhen.',
      request: 'Tell ZimonAI which buyer-nominated supplier, exact product model and purchasing decision need a defined review.'
    },
    common: {
      independent: 'Paid by the buyer; no supplier placement fees or purchase commissions',
      footerLine: 'Check the company. Compare the documents. Resolve the question before you pay.',
      footerScope: 'Buyer-nominated supplier verification only. No supplier placement, purchase commission, product QC or laboratory testing.'
    },
    home: {
      limitsText: 'A company record, certificate or name match does not establish bank-account ownership, product quality or future delivery. The report states what the available evidence supports and what still needs an answer.',
      finalText: 'Send the supplier, proposed product and buying decision. We will define what can be reviewed and which scope fits.'
    },
    services: {
      ctaText: 'Tell us the transaction question, exact model and material already available. We will confirm the applicable scope before work begins.'
    },
    methodology: {
      handlingText: 'For each agreed question, the memo records the supplier claim, applicable question, source and date, located record, cross-check, finding, effect on this transaction, limitation and next evidence. An unavailable record is not proof that the claim is false.',
      reportAnatomy: [
        ['Supplier claim', 'The exact statement or document field under review.'],
        ['Applicable question', 'What this buyer needs to decide about this purchase.'],
        ['Source', 'Which system or document was checked, and on what date.'],
        ['Record', 'The actual entry or document field located in that source.'],
        ['Cross-check', 'How entity, date, model and relevant document versions compare.'],
        ['Finding', 'A match, material discrepancy, missing material or point not yet verifiable.'],
        ['Transaction implication', 'Why this result matters to the proposed agreement or payment.'],
        ['Limit', 'What the available record cannot establish.'],
        ['Next evidence', 'Which document, record or person could resolve the remaining point.']
      ]
    },
    scope: {
      lead: 'We review buyer-nominated suppliers and the specific transaction question agreed before work begins. Direct contact and site evidence are accepted only after separate scoping.',
      doTitle: 'What the review can cover',
      doItems: [
        'Compare one proposed purchase against the named company, agreed documents and specified product model.',
        'Check applicable certificate or authorisation claims against accessible issuer or official records.',
        'Investigate material gaps through directly related entities and relevant public records within the T2 limit.',
        'Scope consent-based supplier interviews or site evidence when a question requires new observations.',
        'Document findings, their effect on the buying decision, limits and next evidence.'
      ],
      dontTitle: 'What we agree or decline',
      dontItems: [
        'Confirm supplier, legal entities, model, market and document versions before starting.',
        'Confirm any supplier contact, site access, observer, source cost, timing and deliverable in the quotation.',
        'We do not find or recommend suppliers, negotiate purchases, handle buyer funds or earn supplier placement fees or purchase commissions.',
        'We do not perform product QC, AQL inspection, laboratory testing or product pass/fail release.',
        'A matching payee name is not bank confirmation; unavailable evidence is recorded as unavailable.'
      ],
      decisionGuide: [
        ['Do the supplied company, documents and model line up?', 'T1 · Supplier Verification'],
        ['What explains a material relationship or history gap?', 'T2 · Enhanced Supplier Due Diligence'],
        ['What can a named person or agreed visit show?', 'Advanced · separately scoped interview or site evidence'],
        ['Does a batch pass specifications or accredited tests?', 'A qualified inspection or laboratory provider outside ZimonAI core services']
      ],
      accreditationTitle: 'Know when specialist testing is needed',
      accreditationText: 'When a question requires product testing, certification, legal advice or bank-account confirmation, the buyer should use an appropriately qualified provider. We state where our evidence review ends.',
      ctaTitle: 'One supplier and one buying decision are enough to start.',
      ctaText: 'Tell us the proposed purchase, exact model and uncertain claim. We will say what can be reviewed and what requires another specialist.'
    },
    about: {
      modelText: 'Paid by the buyer. We accept no supplier placement fees or commissions on the purchase. Our fee pays for the agreed review, not a favourable conclusion. We review buyer-nominated suppliers; the client makes its own contracting and payment decisions.',
      recordItems: [
        ['Business scope', 'Buyer-nominated supplier and transaction-evidence review'],
        ['Primary client', 'Buyers evaluating a proposed purchase from a supplier in China'],
        ['Commercial principle', 'Buyer-paid; no supplier placement fee or purchase commission'],
        ['Research work', 'Company, document, product-model and applicable certificate-claim cross-checks'],
        ['Field work', 'Interview or site evidence only after feasibility, consent and scope are confirmed'],
        ['Report logic', 'Matches, material discrepancies, unresolved questions and evidence limits']
      ]
    },
    request: {
      product: 'Product and exact model',
      question: 'What decision are you making, and what does not line up?',
      productPlaceholder: '65W USB-C charger, exact model X65; target market if known',
      questionPlaceholder: 'For example: before paying a deposit, I need to understand why Company A is on the quote and Company B is on the certificate. Mention the decision stage and the documents you already have.',
      after: 'Keep the reference number. We will agree on a secure channel before you send sensitive quotations, contracts or payment instructions.',
      directText: 'Include the supplier, product and exact model, target market if known, decision stage and the question to resolve. First contact does not need sensitive documents; we will agree on a safe way to receive them.'
    }
  },
  'zh-tw': {
    meta: {
      home: '付款前核對供應商公司、交易文件與指定產品。T1 與 T2 依明確範圍記錄相符之處、重要疑點與證據限制。',
      services: 'T1 以 USD 149 核對公司、文件與產品資料；T2 以 USD 349 追查重要疑點。進階工作依範圍報價。',
      methodology: '了解 ZimonAI 如何從供應商說法與買方問題，追溯來源、交叉比對，說明交易影響與仍缺少的證據。',
      scope: '了解 T1／T2 固定範圍、另行約定的訪談與現場取證，以及供應商查核無法證明的事項。',
      about: '由買家付費、專注充電與電源電子的供應商及交易資料查核，由台灣與深圳協作。',
      request: '提供已指定供應商、產品完整型號與採購決定，討論有明確範圍的查核。'
    },
    common: {
      independent: '由買家付費；不收供應商推薦費或採購成交佣金',
      footerLine: '核對公司與文件，釐清付款前的重要疑點。',
      footerScope: '僅查核買方指定供應商。不尋源、不收採購佣金，也不做產品驗貨或實驗室測試。'
    },
    home: {
      limitsText: '公司紀錄、證書或名稱相符，都不能證明銀行帳戶歸屬、產品品質或未來交付。報告會寫明現有證據能支持什麼，以及哪些問題仍待確認。',
      finalText: '提供供應商、擬採購產品與你要做的決定。我們會先確認可查核的範圍。'
    },
    services: { ctaText: '告訴我們交易疑點、完整型號和已有資料；工作開始前會先確認適用範圍。' },
    methodology: {
      handlingText: '每個約定問題都會記錄供應商說法、買方要判斷的事、來源與查詢日期、查得紀錄、交叉比對、發現、對這筆交易的影響、限制與下一項所需證據。查不到紀錄，不等於已證明說法為假。',
      reportAnatomy: [
        ['供應商說法', '保留要核對的原句或文件欄位。'],
        ['適用問題', '這位買家要針對哪一筆採購做什麼決定。'],
        ['來源', '何時查了哪個系統或文件。'],
        ['紀錄', '在該來源實際查得的條目或文件欄位。'],
        ['交叉比對', '公司、日期、型號與相關文件版本如何對照。'],
        ['發現', '相符、重要矛盾、資料缺漏或目前無法確認。'],
        ['交易影響', '這項結果為何影響擬簽的合約或付款。'],
        ['限制', '現有資料不能證明什麼。'],
        ['下一項證據', '補哪份文件、紀錄或詢問誰能釐清。']
      ]
    },
    scope: {
      lead: '針對買方已指定的供應商，查核開始前約定的交易問題。需要直接聯絡或現場取證時，另行確認範圍。',
      doTitle: '可處理的查核工作',
      doItems: [
        '把一筆採購的公司、約定文件與指定產品型號放在一起核對。',
        '針對適用的證書或授權主張，查閱可取得的發證或官方紀錄。',
        '在 T2 主體上限內，追查重要疑點與直接相關的企業及公開紀錄。',
        '當問題需要新證據時，按案確認經同意的訪談或現場取證。',
        '記錄發現、對採購決定的影響、限制與下一步所需證據。'
      ],
      dontTitle: '開始前先確認的界線',
      dontItems: [
        '先確認供應商、法律主體、型號、目標市場及文件版本。',
        '供應商聯絡、現場權限、人員、資料成本、時間與交付內容須另行約定。',
        '不尋找或推薦供應商、不代談採購、不處理買方款項，也不收供應商推薦費或成交佣金。',
        '不做產品品質檢驗、AQL、實驗室測試或產品合格放行。',
        '收款名稱相符不等於銀行證實帳戶歸屬；取不到的證據會如實列出。'
      ],
      decisionGuide: [
        ['已提供的公司、文件與型號對得上嗎？', 'T1 · 基礎供應商查核'],
        ['重要的主體關係或沿革疑點怎麼解釋？', 'T2 · 深度供應商盡調'],
        ['指定人員或約定現場能提供什麼新證據？', '進階服務 · 另行約定訪談或現場取證'],
        ['這批產品符合規格或認可測試嗎？', 'ZimonAI 核心服務以外的合格驗貨或實驗室機構']
      ],
      accreditationTitle: '需要專業測試時，應找對人',
      accreditationText: '產品測試、認證、法律意見或銀行帳戶確認，應由具備相應資格的機構處理。我們會說清證據查核在哪裡結束。',
      ctaTitle: '先提供一家供應商和一個採購決定。',
      ctaText: '告訴我們擬採購產品、完整型號與不確定的說法；我們會確認能查什麼，以及哪些問題需要其他專業者。'
    },
    about: {
      modelText: '由買家付費。我們不收供應商推薦費，也不從採購成交抽佣；服務費支付的是約定的查核工作，不是有利結論。ZimonAI 查核買方指定的供應商，簽約與付款決定仍由買方作出。',
      recordItems: [
        ['業務範圍', '買方指定供應商與交易資料查核'],
        ['主要客戶', '評估向中國供應商採購的買家'],
        ['收費原則', '由買家付費；不收供應商推薦費或採購佣金'],
        ['研究工作', '核對公司、文件、產品型號與適用的證書主張'],
        ['現場工作', '訪談或到場須先確認可行性、同意與範圍'],
        ['報告方式', '分列相符之處、重要矛盾、未解問題與證據限制']
      ]
    },
    request: {
      product: '產品與完整型號', question: '你要做什麼決定？哪裡對不上？',
      productPlaceholder: '65W USB-C 充電器，完整型號 X65；如已知可附目標市場',
      questionPlaceholder: '例如：付款訂金前，想釐清報價是 A 公司、證書持有人是 B 公司。請描述目前階段與已有文件。',
      after: '請保留需求編號。敏感報價、合約或付款指示，待確認安全收件方式後再提供。',
      directText: '先提供供應商、產品完整型號、已知目標市場、採購階段及要釐清的問題。首次聯絡不必附敏感文件；我們會確認安全收件方式。'
    }
  },
  'zh-cn': {
    meta: {
      home: '付款前核对供应商企业、交易文件与指定产品。T1 和 T2 按明确范围记录相符之处、重要疑点与证据限制。',
      services: 'T1 以 USD 149 核对企业、文件与产品资料；T2 以 USD 349 追查重要疑点。进阶工作按范围报价。',
      methodology: '了解 ZimonAI 如何从供应商说法与买家问题，追溯来源、交叉比对，说明交易影响和仍缺少的证据。',
      scope: '了解 T1／T2 固定范围、另行约定的访谈与现场取证，以及供应商核查无法证明的事项。',
      about: '由买家付费、专注充电与电源电子的供应商和交易资料核查，由台湾与深圳协作。',
      request: '提供已指定供应商、产品完整型号与采购决定，讨论有明确范围的核查。'
    },
    common: {
      independent: '由买家付费；不收供应商推荐费或采购成交佣金',
      footerLine: '核对企业与文件，弄清付款前的重要疑点。',
      footerScope: '仅核查买家指定供应商。不寻源、不收采购佣金，也不做产品验货或实验室测试。'
    },
    home: {
      limitsText: '企业记录、证书或名称相符，都不能证明银行账户归属、产品质量或未来交付。报告会写明现有证据能支持什么，以及哪些问题仍待确认。',
      finalText: '提供供应商、拟采购产品与你要做的决定。我们会先确认可核查的范围。'
    },
    services: { ctaText: '告诉我们交易疑点、完整型号和已有资料；工作开始前会先确认适用范围。' },
    methodology: {
      handlingText: '每个约定问题都会记录供应商说法、买家要判断的事、来源与查询日期、找到的记录、交叉比对、发现、对这笔交易的影响、限制与下一项所需证据。查不到记录，不等于已证明说法为假。',
      reportAnatomy: [
        ['供应商说法', '保留要核对的原句或文件字段。'],
        ['适用问题', '这位买家要针对哪笔采购做什么决定。'],
        ['来源', '何时查了哪个系统或文件。'],
        ['记录', '在该来源实际查到的条目或文件字段。'],
        ['交叉比对', '企业、日期、型号与相关文件版本如何对照。'],
        ['发现', '相符、重要矛盾、资料缺失或目前无法确认。'],
        ['交易影响', '这项结果为什么影响拟签合同或付款。'],
        ['限制', '现有资料不能证明什么。'],
        ['下一项证据', '补哪份文件、记录或询问谁能弄清。']
      ]
    },
    scope: {
      lead: '针对买家已指定的供应商，核查开始前约定的交易问题。需要直接联系或现场取证时，另行确认范围。',
      doTitle: '可以处理的核查工作',
      doItems: [
        '将一笔采购的企业、约定文件与指定产品型号放在一起核对。',
        '针对适用的证书或授权主张，查询可获取的发证或官方记录。',
        '在 T2 主体上限内，追查重要疑点与直接相关的企业及公开记录。',
        '当问题需要新证据时，按项目确认经同意的访谈或现场取证。',
        '记录发现、对采购决定的影响、限制与下一步所需证据。'
      ],
      dontTitle: '开始前先确认的边界',
      dontItems: [
        '先确认供应商、法律主体、型号、目标市场与文件版本。',
        '供应商联系、现场权限、人员、资料成本、时间与交付内容须另行约定。',
        '不寻找或推荐供应商、不代谈采购、不处理买家款项，也不收供应商推荐费或成交佣金。',
        '不做产品质量检验、AQL、实验室测试或产品合格放行。',
        '收款名称相符不等于银行证实账户归属；无法获取的证据会如实列出。'
      ],
      decisionGuide: [
        ['已提供的企业、文件与型号一致吗？', 'T1 · 基础供应商核查'],
        ['重要的主体关系或沿革疑点如何解释？', 'T2 · 深度供应商尽调'],
        ['指定人员或约定现场能提供什么新证据？', '进阶服务 · 另行约定访谈或现场取证'],
        ['这批产品符合规格或认可测试吗？', 'ZimonAI 核心服务以外的合格验货或实验室机构']
      ],
      accreditationTitle: '需要专业测试时，应找对人',
      accreditationText: '产品测试、认证、法律意见或银行账户确认，应由具备相应资格的机构处理。我们会说明证据核查在哪里结束。',
      ctaTitle: '先提供一家供应商和一个采购决定。',
      ctaText: '告诉我们拟采购产品、完整型号与不确定的说法；我们会确认能查什么，以及哪些问题需要其他专业人员。'
    },
    about: {
      modelText: '由买家付费。我们不收供应商推荐费，也不从采购成交抽佣；服务费对应约定的核查工作，不是有利结论。ZimonAI 核查买家指定的供应商，签约与付款决定仍由买家作出。',
      recordItems: [
        ['业务范围', '买家指定供应商与交易资料核查'],
        ['主要客户', '评估向中国供应商采购的买家'],
        ['收费原则', '由买家付费；不收供应商推荐费或采购佣金'],
        ['研究工作', '核对企业、文件、产品型号与适用的证书主张'],
        ['现场工作', '访谈或到场须先确认可行性、同意与范围'],
        ['报告方式', '分别列出相符之处、重要矛盾、未解问题与证据限制']
      ]
    },
    request: {
      product: '产品与完整型号', question: '你要做什么决定？哪里对不上？',
      productPlaceholder: '65W USB-C 充电器，完整型号 X65；如已知可附目标市场',
      questionPlaceholder: '例如：支付定金前，想弄清报价是 A 企业、证书持有人是 B 企业。请说明目前阶段与已有文件。',
      after: '请保留需求编号。敏感报价、合同或付款指示，待确认安全接收方式后再提供。',
      directText: '先提供供应商、产品完整型号、已知目标市场、采购阶段和要弄清的问题。首次联系不必附敏感文件；我们会确认安全接收方式。'
    }
  }
};

export function applyPublicPositioning(languages) {
  for (const [locale, update] of Object.entries(publicSite)) {
    const t = languages[locale];
    Object.assign(t.meta.descriptions, update.meta);
    Object.assign(t.common, update.common);
    Object.assign(t.home, update.home);
    Object.assign(t.services, update.services);
    t.methodology.handlingText = update.methodology.handlingText;
    t.methodology.reportAnatomy.title = ({ en: 'The parts of a finding', 'zh-tw': '一項發現應包含什麼', 'zh-cn': '一项发现应包含什么' })[locale];
    t.methodology.reportAnatomy.items = update.methodology.reportAnatomy;
    const { decisionGuide, ...scopeUpdate } = update.scope;
    Object.assign(t.scope, scopeUpdate);
    t.scope.decisionGuide.items = decisionGuide;
    t.about.modelText = update.about.modelText;
    t.about.originText += ({
      en: ' We focus on charging and power electronics. Other product categories are considered when the question and evidence fall within our competence.',
      'zh-tw': '我們專注充電與電源電子供應鏈；其他產品可先提出需求，再確認是否具備合適的查核方法與交付能力。',
      'zh-cn': '我们专注充电与电源电子供应链；其他产品可以先提出需求，再确认是否具备合适的核查方法与交付能力。'
    })[locale];
    t.about.record.items = update.about.recordItems;
    Object.assign(t.request.fields, { product: update.request.product, question: update.request.question });
    Object.assign(t.request.placeholders, { product: update.request.productPlaceholder, question: update.request.questionPlaceholder });
    t.request.after = update.request.after;
    t.request.directText = update.request.directText;
  }
}

const advancedNames = {
  en: { t3: 'Structured Supplier Interview', t4: 'On-the-ground Evidence Collection', t5: 'Ongoing Supplier Review', t6: 'Advanced Enterprise Engagement' },
  'zh-tw': { t3: '結構化供應商訪談', t4: '現場事實取證', t5: '持續供應商查核', t6: '企業級查核專案' },
  'zh-cn': { t3: '结构化供应商访谈', t4: '现场事实取证', t5: '持续供应商核查', t6: '企业级核查项目' }
};

export const LEGACY_ADVANCED_NAMES = Object.freeze({
  en: { t3: 'Verified Remote Interview', t4: 'On-Site Verification', t5: 'Verification Advisor', t6: 'Managed Sourcing Verification' },
  'zh-tw': { t3: '電話與視訊訪查', t4: '單次實地查核', t5: '供應商查核顧問', t6: '全託管採購把關' },
  'zh-cn': { t3: '电话与视频访查', t4: '单次实地核查', t5: '供应商核查顾问', t6: '全托管采购把关' }
});

export function applyPortalPositioning(content) {
  for (const [locale, names] of Object.entries(advancedNames)) {
    content[locale].workspace.tierOptions = content[locale].workspace.tierOptions.map(([id, label]) => [id, names[id] ? `${id.toUpperCase()} · ${names[id]}` : label]);
    content[locale].workspace.legacyTierOptions = Object.entries(LEGACY_ADVANCED_NAMES[locale]).map(([id, name]) => [id, `${id.toUpperCase()} · ${name}`]);
  }
}

export function applyAdminPositioning(content) {
  for (const [locale, names] of Object.entries(advancedNames)) {
    const map = ([id, label]) => [id, names[id] ? `${id.toUpperCase()} · ${names[id]}` : label];
    content[locale].actions.productOptions = content[locale].actions.productOptions.map(map);
    content[locale].form.tiers = content[locale].form.tiers.map(map);
    content[locale].form.legacyTierOptions = Object.entries(LEGACY_ADVANCED_NAMES[locale]).map(([id, name]) => [id, `${id.toUpperCase()} · ${name}`]);
  }
}

export function applyPaymentPositioning(content) {
  const updates = {
    en: {
      quoted: 'Interviews, agreed site evidence, continuing review and complex enterprise questions are quoted after feasibility, access, capacity and deliverables are confirmed.',
      intake: 'Provide the supplier, exact model, agreed quotation or contract versions and certificate or authorisation claims relevant to the purchased review.'
    },
    'zh-tw': {
      quoted: '訪談、約定的現場取證、持續查核與複雜企業需求，須先確認可行性、配合條件、工作容量及交付內容，再依範圍報價。',
      intake: '提供供應商、完整型號，以及本次查核約定的報價或合約版本、證書或授權主張。'
    },
    'zh-cn': {
      quoted: '访谈、约定的现场取证、持续核查与复杂企业需求，须先确认可行性、配合条件、工作容量及交付内容，再按范围报价。',
      intake: '提供供应商、完整型号，以及本次核查约定的报价或合同版本、证书或授权主张。'
    }
  };
  for (const [locale, update] of Object.entries(updates)) {
    const payment = content[locale].payments;
    payment.quoted.text = update.quoted;
    payment.process.steps[1][1] = update.intake;
  }
}
