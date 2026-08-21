const providerReferences = {
  en: [
    { label: 'Stripe Privacy Policy', href: 'https://stripe.com/privacy', note: 'How Stripe handles payment and transaction data.' },
    { label: 'Cloudflare Privacy Policy', href: 'https://www.cloudflare.com/privacypolicy/', note: 'How the hosting and security provider handles network data.' }
  ],
  'zh-tw': [
    { label: 'Stripe 隱私權政策', href: 'https://stripe.com/privacy', note: '了解 Stripe 如何處理付款與交易資料。' },
    { label: 'Cloudflare 隱私權政策', href: 'https://www.cloudflare.com/privacypolicy/', note: '了解網站託管與安全服務商如何處理網路資料。' }
  ],
  'zh-cn': [
    { label: 'Stripe 隐私政策', href: 'https://stripe.com/privacy', note: '了解 Stripe 如何处理付款与交易资料。' },
    { label: 'Cloudflare 隐私政策', href: 'https://www.cloudflare.com/privacypolicy/', note: '了解网站托管与安全服务商如何处理网络资料。' }
  ]
};

export const legalContent = {
  en: {
    ui: {
      document: 'Policy record', effective: 'Effective', operator: 'Website operator', contact: 'Policy contact', contents: 'Contents',
      article: 'Article', references: 'Provider notices', referencesLead: 'These providers operate under their own terms and privacy notices.',
      contactTitle: 'Ask about this policy', contactLead: 'Include the relevant service, payment or case reference so the question can be matched without sending unnecessary personal information.'
    },
    privacy: {
      kicker: 'Privacy notice', title: 'What enters our systems, why it is used and when it can be removed.',
      lead: 'Effective 21 August 2026. This notice covers zimonai.com, service enquiries, Stripe payments and the information used to deliver an agreed ZimonAI assignment.',
      summaryTitle: 'The short version',
      summary: 'ZimonAI follows a data-minimisation approach: we collect what is needed to understand a request, confirm payment, deliver the agreed work and keep necessary business records. We do not sell personal information or use advertising cookies. The site does use limited first-party, aggregate analytics, described below.',
      sections: [
        {
          title: 'Scope and responsible business',
          paragraphs: [
            'This notice applies when you browse zimonai.com, prepare or send an enquiry, make a payment, book a consultation, or provide material for a supplier-verification assignment.',
            'The website and the ZimonAI service are operated by 深圳智蒙湾科技有限公司 (ZimonAI Technology Co., Ltd.). A supplier, marketplace, certificate issuer, payment provider or other third party has its own responsibility for information processed in its systems.'
          ]
        },
        {
          title: 'Website delivery and security records',
          paragraphs: [
            'Cloudflare delivers and protects the public website. Like other hosting and security providers, it may process network and system data needed to route traffic, detect abuse and keep the service available, such as IP address, request time, browser or device information and security events.',
            'ZimonAI does not use those infrastructure records to build advertising profiles. Cloudflare processes its records under its own privacy notice and service arrangements.'
          ]
        },
        {
          title: 'First-party website analytics',
          paragraphs: [
            'On the production website, ZimonAI records limited events so we can understand which pages and service choices are useful and whether important actions work. The analytics database stores daily aggregate counts rather than named visitor profiles.'
          ],
          items: [
            'Event type, page path and language version',
            'A short target label for actions such as navigation, service selection, contact or checkout',
            'Device category: mobile, tablet or desktop',
            'Referring domain group, not the full referring URL',
            'A session-start flag held in browser session storage'
          ],
          note: 'The ZimonAI analytics database does not intentionally store your name, email address, IP address, full query string or a cross-site advertising identifier. Analytics is not sent when the browser exposes Do Not Track or Global Privacy Control.'
        },
        {
          title: 'Enquiry forms and direct contact',
          paragraphs: [
            'The request and post-payment intake forms prepare an email draft on your device. The website does not upload or save the text you type into those fields. Information leaves your device only after you review and send the message through your own email provider.',
            'If you contact ZimonAI by email, telephone, WhatsApp, WeChat, LINE or LinkedIn, we receive the contact details and content you choose to provide. Please send only material relevant to the request and avoid card details, unrelated identity documents or unnecessary personal information.'
          ]
        },
        {
          title: 'Payments and order records',
          paragraphs: [
            'Checkout is hosted by Stripe. Stripe processes payment-method, contact, transaction, device and fraud-prevention data under its own terms and privacy notice. ZimonAI does not receive or store the complete card number or CVC.',
            'To confirm and support an order, ZimonAI receives and records the Stripe session and payment references, service item, amount, currency, quantity, payment status, receipt email, customer name, and any business name, phone number, tax ID or service reference collected for that Checkout session.'
          ],
          note: 'Do not send card numbers or CVC codes by email or through a service intake.'
        },
        {
          title: 'Assignment files and supplier information',
          paragraphs: [
            'A verification assignment may require supplier names, company records, quotations, product models, certificate numbers, images, correspondence and the buyer-side question the work is intended to support. Some material may contain names or business contact details.',
            'ZimonAI uses the material only to assess the request, agree the scope, perform the work, explain the evidence, deliver the report, answer follow-up questions and maintain an auditable business record. The client remains responsible for having authority to share the material.'
          ]
        },
        {
          title: 'Why information is used',
          items: [
            'Respond to enquiries and prepare or perform an agreed service',
            'Confirm payments, issue service communications and maintain accounting records',
            'Verify source material, document conclusions and handle follow-up or disputes',
            'Protect the website, prevent misuse and diagnose technical failures',
            'Comply with applicable record-keeping, tax, legal or regulatory obligations'
          ],
          note: 'ZimonAI does not use assignment documents to create public case studies, customer endorsements or marketing claims without separate permission.'
        },
        {
          title: 'When information may be shared',
          paragraphs: [
            'ZimonAI does not sell personal information. Information is shared only when needed for the agreed work, when you instruct or authorise the sharing, to operate essential services, or when disclosure is legally required.'
          ],
          items: [
            'Infrastructure, email, payment, accounting or professional service providers',
            'A supplier, certificate issuer, laboratory or scoped specialist when the assignment requires direct confirmation',
            'Authorities, courts or advisers where disclosure is required to comply with law or protect legal rights'
          ],
          note: 'Only the information reasonably needed for that purpose should be shared. Supplier contact or on-site work is carried out only within the agreed service scope.'
        },
        {
          title: 'International processing',
          paragraphs: [
            'ZimonAI coordinates work across Taipei and Shenzhen and uses international infrastructure and payment providers. Information may therefore be processed in more than one country or region, where privacy rules may differ from those where you are located.',
            'Where a provider is involved, its contractual and security arrangements govern its processing. If a particular assignment requires a new recipient or unusual transfer, that need should be confirmed in the project scope.'
          ]
        },
        {
          title: 'Retention and deletion',
          paragraphs: [
            'Retention depends on the type of record, whether an assignment proceeds, accounting and tax requirements, the need to answer follow-up questions, and whether a dispute or legal obligation exists. ZimonAI does not keep information merely because storage is available.',
            'Enquiry and assignment correspondence is reviewed when no longer operationally necessary. Payment and accounting records may need to be kept for the legally required period. Aggregate analytics cannot ordinarily be linked back to a named person and is retained for site trend reporting.'
          ]
        },
        {
          title: 'Security and practical limits',
          paragraphs: [
            'ZimonAI uses access controls, provider-hosted HTTPS, restricted payment credentials and service-specific handling practices intended to reduce unauthorised access, alteration or disclosure. Full card data remains within Stripe-hosted payment systems.',
            'No email, cloud or internet system is risk-free. If you believe information has been sent to the wrong place or a security issue affects your material, contact ZimonAI promptly with enough detail to identify the record.'
          ]
        },
        {
          title: 'Your choices and requests',
          paragraphs: [
            'Subject to applicable law and record-keeping duties, you may ask whether ZimonAI holds personal information about you and request access, correction or deletion. You may also ask for processing to be limited or object to a use where the relevant law provides that right.',
            'A request may require reasonable identity verification. ZimonAI may retain information that must be kept for accounting, legal claims, security or regulatory obligations, and will explain the reason where a request cannot be completed in full.'
          ]
        },
        {
          title: 'Children, changes and contact',
          paragraphs: [
            'The website and services are intended for business users and are not directed to children. Do not submit information about a minor unless it is necessary, lawful and specifically agreed in advance.',
            'This notice may be updated when the website, providers or service process changes. The effective date at the top identifies the current published version. Privacy questions and requests can be sent to simonlo@zimonai.com.'
          ]
        }
      ],
      references: providerReferences.en
    },
    paymentTerms: {
      kicker: 'Payment and service terms', title: 'Price, scope and timing should be clear before the work starts.',
      lead: 'Effective 21 August 2026. These terms apply to payments made through zimonai.com and explain the standard rules for consultation, fixed-scope verification and confirmed service balances.',
      summaryTitle: 'Before you pay',
      summary: 'Review the service page, inclusions, exclusions and delivery conditions before Checkout. A payment buys the stated scope—not a favourable result. ZimonAI will not add an unconfirmed charge, and the delivery clock begins only after the required information is complete.',
      sections: [
        { title: 'Application and order of documents', paragraphs: ['These terms apply to website payments for consultations, T1, T2, consultation extensions and confirmed service balances. T3–T6 and other customised assignments are governed by the written scope or quotation confirmed for that project.', 'The service page, Checkout description, written quote and any project-specific confirmation form part of the agreement. If a specific written scope conflicts with a general website description, the specifically confirmed scope governs that assignment.'] },
        { title: 'Published prices and currency', paragraphs: ['Website prices are stated in United States dollars. T1 and T2 prices cover only the published standard scope; consultation and extension prices cover the stated appointment duration; a USD 10 balance unit is not a standalone service.', 'Your bank, card issuer or payment method provider may apply exchange rates, cross-border fees or other charges. Those third-party charges are not set or received by ZimonAI. Any tax treatment or document needed for your organisation should be confirmed before payment.'] },
        { title: 'Stripe Checkout and payment status', paragraphs: ['Payment is completed on a Stripe-hosted Checkout page. Available payment methods are determined by Stripe, the customer location and the payment configuration. ZimonAI does not receive or store the complete card number or CVC.', 'An order is treated as paid only after Stripe reports successful payment. A pending, failed, expired, reversed or disputed transaction does not create an obligation to begin or continue work until the payment status is resolved.'] },
        { title: 'Order review and acceptance', paragraphs: ['Payment opens the intake process. It does not by itself confirm that submitted material fits the purchased scope. ZimonAI reviews the service item, payment status and intake material before work begins.', 'If the request cannot be accepted, ZimonAI will explain the issue and, before work begins, offer an appropriate scope adjustment or refund the affected payment. ZimonAI does not automatically convert a payment into another service.'] },
        { title: 'When the delivery clock begins', paragraphs: ['A stated delivery period begins only after payment is confirmed and all required supplier, legal-entity, model, certificate, decision or appointment information has been received in usable form. Waiting for missing, unreadable or contradictory material is outside the delivery period.', 'Delivery times are good-faith service estimates. Public-database outages, supplier response, consent, site access, laboratory scheduling, travel conditions and other dependencies outside ZimonAI control may require a revised timeline; material changes will be communicated.'] },
        { title: 'Client responsibilities', items: ['Provide accurate, complete and lawfully obtained information', 'Identify the supplier, legal entity, product model and decision the work should support', 'Have authority to share documents, correspondence and personal information', 'Respond to material questions and arrange supplier consent or access where required', 'Review the stated inclusions, exclusions and limitations before relying on a deliverable'], note: 'ZimonAI is not responsible for delay or an incomplete conclusion caused by missing, inaccurate or unauthorised client material.' },
        { title: 'Fixed scope, additions and third-party costs', paragraphs: ['T1 and T2 fixed prices apply only to the standard scope published on the service page. Extra suppliers, legal entities, models, certificate claims, locations, travel, laboratory work or specialist services may require a separate quotation.', 'No supplemental charge is made without the client’s approval. Before work begins, an out-of-scope submission may be reduced to the purchased scope, moved to a separately confirmed scope, or refunded in full. Necessary third-party costs are disclosed before they are committed whenever reasonably possible.'] },
        { title: 'Consultation booking and extensions', paragraphs: ['A standard consultation includes one 60-minute appointment and a short written recap. The default format is live written consultation; voice or video availability follows the format stated on the service page and any prior confirmation.', 'One reschedule is available with at least 24 hours’ notice. A cancellation within 24 hours or a missed appointment is normally non-refundable because the time has been reserved. If ZimonAI cannot accept or schedule the session, the consultation payment is refunded. A 30-minute extension is available only for an existing booking.'] },
        { title: 'Cancellation and refunds', paragraphs: ['Before manual review or consultation work begins, a client may request cancellation and a full refund of the affected standard service. After work begins, any refund is assessed against the work completed and non-recoverable costs already incurred.', 'Refunds are returned through the available Stripe payment route and may take additional processing time set by Stripe, the bank or payment method provider. These terms do not limit rights that cannot lawfully be excluded.'] },
        { title: 'Confirmed service balances', paragraphs: ['A service-balance payment may be used only for an amount ZimonAI has already confirmed. The customer must enter the relevant case, quote, booking or payment reason and select the number of USD 10 units matching that confirmation.', 'A balance payment does not create a new assignment and may not be used for supplier deposits, orders, purchase funds or an unconfirmed charge. An unmatched payment may be held while the reference is clarified or returned.'] },
        { title: 'Deliverables, decisions and limits', paragraphs: ['A report or consultation reflects the records, material, date, place and scope stated in that deliverable. Payment does not guarantee a favourable finding, supplier performance, product quality, certification outcome, sourcing success or commercial result.', 'The client remains responsible for contracting, purchasing, payment and commercial decisions. A deliverable may be shared internally with relevant advisers, but it should not be altered, quoted out of context or presented as a guarantee or accreditation.'] },
        { title: 'Corrections and follow-up', paragraphs: ['If a deliverable contains an objective transcription or factual error attributable to ZimonAI, notify us with the report reference and supporting material so it can be reviewed. New evidence, a changed supplier status, a new model or a request outside the original scope may require additional work.', 'A result is time-bound. A supplier or certificate status checked on one date is not a promise that the same status will remain unchanged.'] },
        { title: 'Receipts, records and privacy', paragraphs: ['Stripe provides the payment confirmation or receipt. ZimonAI keeps transaction, service and correspondence records needed to confirm delivery, support accounting, respond to disputes and comply with applicable obligations.', 'The handling of contact, payment and case information is explained in the ZimonAI Privacy Notice. Do not send complete card numbers or CVC codes in an intake or email.'] },
        { title: 'Questions and term updates', paragraphs: ['Questions about scope, scheduling, payment or refunds can be sent to simonlo@zimonai.com. Include the Stripe receipt or case reference, but do not include full card details.', 'The effective date at the top identifies the current website version. A change does not retroactively replace a specific written scope already confirmed for an active assignment unless both sides agree or the change is required by law.'] }
      ],
      references: [providerReferences.en[0]]
    }
  },
  'zh-tw': {
    ui: {
      document: '政策文件', effective: '生效日期', operator: '網站營運主體', contact: '條款聯絡', contents: '條文索引',
      article: '條次', references: '服務商政策', referencesLead: '以下服務商會依自己的條款與隱私權政策處理資料。',
      contactTitle: '對本文件有疑問？', contactLead: '來信請附上相關服務、付款或案件編號，讓我們能在不收集多餘個資的前提下找到對應紀錄。'
    },
    privacy: {
      kicker: '隱私聲明', title: '哪些資料會進入系統、為何使用，以及何時可以刪除。',
      lead: '生效日期：2026 年 8 月 21 日。本聲明適用於 zimonai.com、服務詢問、Stripe 付款，以及執行雙方約定之 ZimonAI 服務所需的資料。',
      summaryTitle: '先說結論',
      summary: 'ZimonAI 採取資料最少化原則：只處理釐清需求、確認付款、完成約定工作與保存必要商業紀錄所需的資料。我們不出售個人資料，也不使用廣告 Cookie；網站會使用有限、第一方且彙總化的流量統計，細節如下。',
      sections: [
        { title: '適用範圍與營運主體', paragraphs: ['本聲明適用於你瀏覽 zimonai.com、準備或寄出需求信、付款、預約諮詢，或提供供應商查核案件資料時的資訊處理。', '網站與 ZimonAI 服務由深圳智蒙湾科技有限公司（ZimonAI Technology Co., Ltd.）營運。供應商、平台、證書發證單位、付款服務商或其他第三方，會各自對其系統內的資料處理負責。'] },
        { title: '網站傳輸與安全紀錄', paragraphs: ['公開網站由 Cloudflare 提供傳輸與安全防護。和一般託管及資安服務相同，Cloudflare 可能為了傳送流量、辨識濫用與維持服務可用性，處理 IP 位址、請求時間、瀏覽器或裝置資訊、資安事件等網路與系統資料。', 'ZimonAI 不會拿這些基礎設施紀錄建立廣告受眾。Cloudflare 會依自己的隱私權政策與服務約定處理相關資料。'] },
        { title: '第一方網站統計', paragraphs: ['正式網站會記錄少量事件，用來了解哪些頁面與服務選項真正有用，以及重要功能是否正常。ZimonAI 的統計資料庫保存的是每日彙總次數，不建立具名訪客檔案。'], items: ['事件類型、頁面路徑與語言版本', '導覽、服務選擇、聯絡或開始付款等動作的簡短代碼', '手機、平板或桌面裝置分類', '來源網站的網域分類，不保存完整來源網址', '只存在瀏覽器工作階段內的 session-start 標記'], note: 'ZimonAI 的統計資料庫不會刻意保存姓名、Email、IP 位址、完整網址查詢字串或跨站廣告識別碼。瀏覽器若啟用 Do Not Track 或 Global Privacy Control，網站不會送出這些統計事件。' },
        { title: '需求表單與直接聯絡', paragraphs: ['需求表單與付款後收件表單只會在你的裝置上準備 Email 草稿；網站不會上傳或保存尚未寄出的欄位內容。只有在你檢查內容並透過自己的郵件服務按下寄出後，資料才會離開裝置。', '若你透過 Email、電話、WhatsApp、WeChat、LINE 或 LinkedIn 聯絡，我們會收到你主動提供的聯絡資料與訊息內容。請只提供與案件有關的資料，不要傳送信用卡資料、無關的身分證件或不必要的個人資訊。'] },
        { title: '付款與訂單紀錄', paragraphs: ['付款頁由 Stripe 提供。Stripe 會依其條款與隱私權政策處理付款方式、聯絡、交易、裝置與防詐資料；ZimonAI 不會接收或保存完整信用卡號與安全碼。', '為了確認與支援訂單，ZimonAI 會收到並保存 Stripe 付款工作階段與交易編號、服務項目、金額、幣別、數量、付款狀態、收據 Email、客戶姓名，以及該次結帳所收集的公司名稱、電話、稅籍編號或服務參考資料。'], note: '請勿在案件收件或 Email 中傳送信用卡號與安全碼。' },
        { title: '案件文件與供應商資料', paragraphs: ['供應商查核可能需要公司名稱、企業紀錄、報價單、產品型號、證書編號、圖片、往來信件，以及這次查核要支援的買方決策。部分文件可能包含姓名或商務聯絡方式。', 'ZimonAI 只會用這些資料評估需求、確認範圍、執行查核、說明證據、交付報告、回答後續問題，以及保存可追溯的商業紀錄。客戶需確保自己有權提供相關文件與資訊。'] },
        { title: '資料使用目的', items: ['回覆詢問，準備或執行雙方約定的服務', '確認付款、傳送服務訊息與保存會計紀錄', '核對來源、記錄判斷，並處理後續問題或爭議', '保護網站、預防濫用與診斷技術問題', '履行適用的記帳、稅務、法律或監管義務'], note: '未經另外同意，ZimonAI 不會把案件文件改寫成公開案例、客戶評價或行銷宣稱。' },
        { title: '可能提供資料的情況', paragraphs: ['ZimonAI 不出售個人資料。只有在完成約定工作確有需要、你指示或授權、營運必要服務需要，或法律要求揭露時，才會提供相關資料。'], items: ['網站、Email、付款、會計或專業服務商', '案件需要直接確認時的供應商、發證單位、實驗室或已納入範圍的專業人員', '依法必須揭露或為維護合法權益所需的主管機關、法院或專業顧問'], note: '每次只應提供該目的合理所需的資料。供應商聯絡或現場工作，仍以雙方確認的服務範圍為準。' },
        { title: '跨境處理', paragraphs: ['ZimonAI 採台北 × 深圳協作，並使用跨國網站與付款服務，因此資料可能在不同國家或地區處理；當地的個資規則可能與你所在地不同。', '由外部服務商處理時，會依該服務商的合約與安全安排執行。若個別案件需要新的接收方或非一般性的資料移轉，應在案件範圍中另行確認。'] },
        { title: '保存期間與刪除', paragraphs: ['保存時間會依紀錄類型、案件是否成立、會計與稅務要求、後續答覆需要，以及是否存在爭議或法律義務決定。ZimonAI 不會只因為儲存空間存在就無限期保留資料。', '詢問與案件往來在不再有營運需要時會接受檢視；付款與會計紀錄可能必須依法保存。彙總流量統計通常無法回連到具名個人，會用於觀察網站長期趨勢。'] },
        { title: '安全措施與實際限制', paragraphs: ['ZimonAI 使用存取控制、服務商提供的 HTTPS、受限制的付款憑證與按案件處理方式，降低資料被未授權存取、變更或揭露的風險。完整卡片資料留在 Stripe 的付款系統中。', '任何 Email、雲端或網路系統都不可能保證零風險。若你認為資料寄錯地方或可能發生安全問題，請儘快聯絡並提供足以找到紀錄的資訊。'] },
        { title: '你的選擇與權利', paragraphs: ['在適用法律與保存義務允許的範圍內，你可以詢問 ZimonAI 是否持有你的個人資料，並要求查閱、更正或刪除；若法律賦予相關權利，也可以要求限制處理或提出異議。', '為避免把資料交給錯誤對象，提出請求時可能需要合理的身分確認。若資料因會計、法律主張、資安或監管義務必須保留，我們會說明無法完整執行請求的原因。'] },
        { title: '未成年人、版本與聯絡', paragraphs: ['網站與服務以商務使用者為對象，並非提供給未成年人。除非確有必要、具備合法依據且事前另行確認，請勿提交未成年人的資料。', '網站、服務商或作業流程改變時，本聲明可能更新；頁首生效日期代表目前公開版本。隱私問題與資料請求請寄至 simonlo@zimonai.com。'] }
      ],
      references: providerReferences['zh-tw']
    },
    paymentTerms: {
      kicker: '付款與服務條款', title: '付款以前，先把價格、範圍與起算時間說清楚。',
      lead: '生效日期：2026 年 8 月 21 日。本條款適用於透過 zimonai.com 完成的付款，並說明諮詢、固定範圍查核與已確認服務差額的共同規則。',
      summaryTitle: '付款前請先確認',
      summary: '請先閱讀服務頁的固定範圍、排除項目與交付條件。付款買到的是明確範圍，不是有利結果；ZimonAI 不會在未取得同意時加收費用，必要資料齊全後才開始計算交付時間。',
      sections: [
        { title: '適用範圍與文件順序', paragraphs: ['本條款適用於網站上的專業諮詢、T1、T2、延長諮詢與已確認服務差額。T3–T6 或其他客製案件，則以該案件另行確認的書面範圍或報價為準。', '服務頁、Stripe 結帳說明、書面報價與個別案件確認內容，會共同構成服務約定。若個別案件的書面範圍與網站一般說明不同，以該案明確確認的內容為準。'] },
        { title: '公開價格與付款幣別', paragraphs: ['網站價格以美元標示。T1 與 T2 只涵蓋服務頁公開的標準範圍；諮詢與延長諮詢依頁面所列時間計價；USD 10 補款單位本身不是獨立服務。', '銀行、發卡機構或付款方式服務商可能另外收取匯率差、跨境或其他費用，這些費用並非由 ZimonAI 設定或收取。若你的組織需要特定稅務處理或憑證格式，請在付款前確認。'] },
        { title: 'Stripe 結帳與付款狀態', paragraphs: ['付款會在 Stripe 提供的結帳頁完成。實際可用的付款方式會依 Stripe、付款地區與帳戶設定顯示；ZimonAI 不會接收或保存完整信用卡號與安全碼。', '只有 Stripe 回報付款成功後，訂單才視為完成付款。尚在處理、失敗、逾期、遭撤銷或有爭議的交易，在狀態釐清前不會產生開始或繼續工作的義務。'] },
        { title: '訂單核對與承接確認', paragraphs: ['付款會開啟收件流程，但不代表提交內容必然符合所購買的範圍。開始工作前，ZimonAI 會核對服務項目、付款狀態與案件資料。', '若案件無法承接，ZimonAI 會說明原因，並在工作開始前提出適合的範圍調整，或退還受影響的款項；不會擅自把付款轉成其他服務。'] },
        { title: '何時開始計算交付時間', paragraphs: ['只有在付款確認，且供應商、法律主體、型號、證書、決策問題或預約資料完整並可使用後，才開始計算頁面標示的時間。等待缺漏、無法辨識或彼此矛盾的資料，不列入交付時間。', '頁面上的交付時間是依正常條件提供的合理估計。官方資料庫異常、供應商回覆、書面同意、現場進入、實驗室排程、差旅或其他非 ZimonAI 可單獨控制的因素，可能需要調整時程；有實質變更時會通知。'] },
        { title: '客戶需配合的事項', items: ['提供正確、完整且合法取得的資料', '說明供應商、法律主體、完整型號與這次工作要支援的決策', '確認自己有權分享文件、往來內容與其中的個人資料', '案件需要時，及時回覆問題並協助取得供應商同意或現場進入條件', '使用交付成果前，先閱讀範圍、排除項目與限制'], note: '若延遲或無法下結論是由資料缺漏、錯誤或未獲授權造成，ZimonAI 不對該部分結果或時程負責。' },
        { title: '固定範圍、追加工作與第三方費用', paragraphs: ['T1 與 T2 的固定價格只適用服務頁公開的標準範圍。增加供應商、法律主體、型號、證書主張、地點、差旅、實驗室或外部專業工作，可能需要另行報價。', '未經客戶同意，不會產生補充費用。若案件超出範圍，在工作開始前可以縮小到已購買的範圍、改採另行確認的範圍，或申請全額退款；可預見的必要第三方費用也會盡量在發生前說明。'] },
        { title: '諮詢預約與延長', paragraphs: ['標準諮詢包含一次 60 分鐘時段與簡短重點摘要，預設為即時文字諮詢；語音或視訊是否可安排，依服務頁說明與事前確認為準。', '於開始前至少 24 小時通知，可免費改期一次；24 小時內取消或未出席，因時段已保留，原則上不退款。若 ZimonAI 無法承接或安排時段，會退還諮詢款項。30 分鐘延長只提供給已有預約的客戶。'] },
        { title: '取消與退款', paragraphs: ['人工判讀或諮詢開始以前，客戶可以要求取消並退還該項標準服務的全部款項。工作開始後，如需退款，會扣除已完成工作與已發生且無法取回的成本後評估。', '退款會透過 Stripe 可用的原付款路徑退回；實際入帳時間仍受 Stripe、銀行或付款方式服務商的處理時間影響。本條款不限制依法不得排除的權利。'] },
        { title: '已確認服務差額', paragraphs: ['服務差額補款只用於 ZimonAI 已事前確認的金額。付款人必須填寫案件、報價、預約或付款用途，並依確認金額選擇相符的 USD 10 單位數量。', '補款不會自動建立新案件，也不得作為供應商訂金、訂單貨款或任何未確認費用。若無法配對，款項可能暫停處理，待補充參考資料後計入案件或退回。'] },
        { title: '交付成果、決策與限制', paragraphs: ['報告或諮詢只反映交付文件中寫明的資料、日期、地點與工作範圍。付款不保證查核結果有利、供應商未來表現、產品品質、認證結果、尋源成功或任何商業成果。', '簽約、採購、付款與其他商業決策仍由客戶自行負責。成果可以在必要範圍內提供給內部成員與專業顧問，但不應被竄改、斷章取義，或對外描述成保證或認可資格。'] },
        { title: '錯誤更正與後續問題', paragraphs: ['若交付成果存在可客觀確認、且由 ZimonAI 造成的抄錄或事實錯誤，請提供報告編號與支持資料，我們會重新檢視。新增證據、供應商狀態改變、新型號或超出原範圍的問題，可能需要另外安排工作。', '查核結果具有時間性；某一天查到的供應商或證書狀態，不代表日後一定維持不變。'] },
        { title: '收據、紀錄與隱私', paragraphs: ['付款確認或收據由 Stripe 提供。ZimonAI 會保存確認交付、會計處理、爭議回覆與履行適用義務所需的交易、服務與往來紀錄。', '聯絡、付款與案件資料的處理方式，詳見 ZimonAI 隱私聲明。請勿在收件表單或 Email 中傳送完整信用卡號與安全碼。'] },
        { title: '詢問與條款更新', paragraphs: ['服務範圍、排程、付款或退款問題，請寄至 simonlo@zimonai.com。來信可附 Stripe 收據或案件編號，但不要附上完整信用卡資料。', '頁首生效日期代表目前網站公開版本。除非雙方另行同意或法律要求，之後的網站條款更新不會溯及取代已確認進行中案件的個別書面範圍。'] }
      ],
      references: [providerReferences['zh-tw'][0]]
    }
  },
  'zh-cn': {
    ui: {
      document: '政策文件', effective: '生效日期', operator: '网站运营主体', contact: '条款联系', contents: '条文索引',
      article: '条次', references: '服务商政策', referencesLead: '以下服务商会按照自己的条款与隐私政策处理资料。',
      contactTitle: '对本文件有疑问？', contactLead: '来信请附上相关服务、付款或案件编号，方便我们在不收集多余个人信息的情况下找到对应记录。'
    },
    privacy: {
      kicker: '隐私声明', title: '哪些资料会进入系统、为何使用，以及何时可以删除。',
      lead: '生效日期：2026 年 8 月 21 日。本声明适用于 zimonai.com、服务咨询、Stripe 付款，以及执行双方约定的 ZimonAI 服务所需资料。',
      summaryTitle: '先说结论',
      summary: 'ZimonAI 采取资料最少化原则：只处理明确需求、确认付款、完成约定工作与保存必要商业记录所需的资料。我们不出售个人信息，也不使用广告 Cookie；网站会使用有限、第一方并且汇总化的流量统计，细节如下。',
      sections: [
        { title: '适用范围与运营主体', paragraphs: ['本声明适用于你浏览 zimonai.com、准备或发送需求邮件、付款、预约咨询，或提供供应商核查案件资料时的信息处理。', '网站与 ZimonAI 服务由深圳智蒙湾科技有限公司（ZimonAI Technology Co., Ltd.）运营。供应商、平台、证书签发机构、付款服务商或其他第三方，会各自对其系统内的资料处理负责。'] },
        { title: '网站传输与安全记录', paragraphs: ['公开网站由 Cloudflare 提供传输与安全防护。与一般托管和安全服务相同，Cloudflare 可能为了传送流量、识别滥用和维持服务可用性，处理 IP 地址、请求时间、浏览器或设备信息、安全事件等网络与系统资料。', 'ZimonAI 不会使用这些基础设施记录建立广告受众。Cloudflare 会按照自己的隐私政策与服务约定处理相关资料。'] },
        { title: '第一方网站统计', paragraphs: ['正式网站会记录少量事件，用于了解哪些页面和服务选项真正有用，以及重要功能是否正常。ZimonAI 的统计数据库保存每日汇总次数，不建立实名访客档案。'], items: ['事件类型、页面路径与语言版本', '导航、服务选择、联系或开始付款等动作的简短代码', '手机、平板或桌面设备分类', '来源网站的域名分类，不保存完整来源网址', '只存在浏览器会话内的 session-start 标记'], note: 'ZimonAI 的统计数据库不会刻意保存姓名、邮箱、IP 地址、完整网址查询字符串或跨站广告标识符。浏览器如果启用 Do Not Track 或 Global Privacy Control，网站不会发送这些统计事件。' },
        { title: '需求表单与直接联系', paragraphs: ['需求表单和付款后收件表单只会在你的设备上准备邮件草稿；网站不会上传或保存尚未发送的字段内容。只有在你检查内容并通过自己的邮件服务点击发送后，资料才会离开设备。', '如果你通过邮箱、电话、WhatsApp、WeChat、LINE 或 LinkedIn 联系，我们会收到你主动提供的联系资料与消息内容。请只提供与案件有关的资料，不要发送银行卡资料、无关的身份证件或不必要的个人信息。'] },
        { title: '付款与订单记录', paragraphs: ['付款页面由 Stripe 提供。Stripe 会按照其条款与隐私政策处理付款方式、联系、交易、设备与反欺诈资料；ZimonAI 不会接收或保存完整银行卡号与安全码。', '为了确认和支持订单，ZimonAI 会收到并保存 Stripe 付款会话与交易编号、服务项目、金额、币种、数量、付款状态、收据邮箱、客户姓名，以及本次结账所收集的公司名称、电话、税号或服务参考资料。'], note: '请勿在案件收件或邮件中发送银行卡号与安全码。' },
        { title: '案件文件与供应商资料', paragraphs: ['供应商核查可能需要企业名称、企业记录、报价单、产品型号、证书编号、图片、往来邮件，以及本次核查要支持的买方决策。部分文件可能包含姓名或商务联系方式。', 'ZimonAI 只会使用这些资料评估需求、确认范围、执行核查、说明证据、交付报告、回答后续问题，以及保存可追溯的商业记录。客户需要确保自己有权提供相关文件与信息。'] },
        { title: '资料使用目的', items: ['回复咨询，准备或执行双方约定的服务', '确认付款、发送服务消息与保存会计记录', '核对来源、记录判断，并处理后续问题或争议', '保护网站、预防滥用与诊断技术问题', '履行适用的记账、税务、法律或监管义务'], note: '未经另外同意，ZimonAI 不会把案件文件改写成公开案例、客户评价或营销宣传。' },
        { title: '可能提供资料的情况', paragraphs: ['ZimonAI 不出售个人信息。只有在完成约定工作确有需要、你指示或授权、运营必要服务需要，或法律要求披露时，才会提供相关资料。'], items: ['网站、邮箱、付款、会计或专业服务商', '案件需要直接确认时的供应商、发证机构、实验室或已经纳入范围的专业人员', '依法必须披露或为了维护合法权益所需的主管机关、法院或专业顾问'], note: '每次只应提供该目的合理所需的资料。供应商联系或现场工作，仍以双方确认的服务范围为准。' },
        { title: '跨境处理', paragraphs: ['ZimonAI 采用台北 × 深圳协作，并使用跨国网站与付款服务，因此资料可能在不同国家或地区处理；当地的个人信息规则可能与你所在地区不同。', '由外部服务商处理时，会按照该服务商的合同与安全安排执行。如果个别案件需要新的接收方或非常规资料传输，应在案件范围中另行确认。'] },
        { title: '保存期间与删除', paragraphs: ['保存时间会根据记录类型、案件是否成立、会计与税务要求、后续回复需要，以及是否存在争议或法律义务决定。ZimonAI 不会仅仅因为有存储空间就无限期保留资料。', '咨询与案件往来在不再有运营需要时会接受检查；付款与会计记录可能必须依法保存。汇总流量统计通常无法重新关联到实名个人，会用于观察网站长期趋势。'] },
        { title: '安全措施与实际限制', paragraphs: ['ZimonAI 使用访问控制、服务商提供的 HTTPS、受限制的付款凭证与按案件处理方式，降低资料被未授权访问、修改或披露的风险。完整银行卡资料保留在 Stripe 的付款系统中。', '任何邮箱、云端或网络系统都不可能保证零风险。如果你认为资料发送错误或可能发生安全问题，请尽快联系并提供足以找到记录的信息。'] },
        { title: '你的选择与权利', paragraphs: ['在适用法律与保存义务允许的范围内，你可以询问 ZimonAI 是否持有你的个人信息，并要求查阅、更正或删除；如果法律赋予相关权利，也可以要求限制处理或提出异议。', '为了避免把资料交给错误对象，提出请求时可能需要合理的身份确认。如果资料因会计、法律主张、安全或监管义务必须保留，我们会说明无法完整执行请求的原因。'] },
        { title: '未成年人、版本与联系', paragraphs: ['网站与服务面向商业用户，并非提供给未成年人。除非确有必要、具备合法依据并且事前另行确认，请勿提交未成年人的资料。', '网站、服务商或工作流程发生变化时，本声明可能更新；页面顶部的生效日期代表当前公开版本。隐私问题与资料请求请发送至 simonlo@zimonai.com。'] }
      ],
      references: providerReferences['zh-cn']
    },
    paymentTerms: {
      kicker: '付款与服务条款', title: '付款之前，先把价格、范围与起算时间说清楚。',
      lead: '生效日期：2026 年 8 月 21 日。本条款适用于通过 zimonai.com 完成的付款，并说明咨询、固定范围核查与已确认服务差额的共同规则。',
      summaryTitle: '付款前请先确认',
      summary: '请先阅读服务页面的固定范围、排除项目与交付条件。付款购买的是明确范围，不是有利结果；ZimonAI 不会在没有获得同意时加收费用，必要资料齐全后才开始计算交付时间。',
      sections: [
        { title: '适用范围与文件顺序', paragraphs: ['本条款适用于网站上的专业咨询、T1、T2、延长咨询与已确认服务差额。T3–T6 或其他定制项目，以该项目另行确认的书面范围或报价为准。', '服务页面、Stripe 结账说明、书面报价与个别项目确认内容，会共同构成服务约定。如果个别项目的书面范围与网站一般说明不同，以该项目明确确认的内容为准。'] },
        { title: '公开价格与付款币种', paragraphs: ['网站价格以美元标示。T1 与 T2 只包括服务页面公开的标准范围；咨询与延长咨询按照页面所列时间计价；USD 10 补款单位本身不是独立服务。', '银行、发卡机构或付款方式服务商可能另外收取汇率差、跨境或其他费用，这些费用并非由 ZimonAI 设置或收取。如果你的组织需要特定税务处理或凭证格式，请在付款前确认。'] },
        { title: 'Stripe 结账与付款状态', paragraphs: ['付款会在 Stripe 提供的结账页面完成。实际可用的付款方式取决于 Stripe、付款地区与账号设置；ZimonAI 不会接收或保存完整银行卡号与安全码。', '只有 Stripe 返回付款成功后，订单才视为完成付款。仍在处理、失败、过期、被撤销或有争议的交易，在状态明确前不会产生开始或继续工作的义务。'] },
        { title: '订单核对与承接确认', paragraphs: ['付款会开启收件流程，但不代表提交内容必然符合所购买的范围。开始工作前，ZimonAI 会核对服务项目、付款状态与案件资料。', '如果项目无法承接，ZimonAI 会说明原因，并在工作开始前提出适合的范围调整，或退还受影响的款项；不会擅自把付款转换成其他服务。'] },
        { title: '何时开始计算交付时间', paragraphs: ['只有在付款确认，而且供应商、法律主体、型号、证书、决策问题或预约资料完整并可使用后，才开始计算页面标示的时间。等待缺失、无法识别或相互矛盾的资料，不计入交付时间。', '页面上的交付时间是正常条件下的合理估计。官方数据库异常、供应商回复、书面同意、现场进入、实验室排期、差旅或其他并非 ZimonAI 可单独控制的因素，可能需要调整时间；有实质变化时会通知。'] },
        { title: '客户需要配合的事项', items: ['提供正确、完整并且合法取得的资料', '说明供应商、法律主体、完整型号与本次工作需要支持的决策', '确认自己有权分享文件、往来内容与其中的个人信息', '项目需要时，及时回复问题并协助取得供应商同意或现场进入条件', '使用交付成果前，先阅读范围、排除项目与限制'], note: '如果延误或无法得出结论是由资料缺失、错误或未经授权造成，ZimonAI 不对该部分结果或时间负责。' },
        { title: '固定范围、追加工作与第三方费用', paragraphs: ['T1 与 T2 的固定价格只适用于服务页面公开的标准范围。增加供应商、法律主体、型号、证书主张、地点、差旅、实验室或外部专业工作，可能需要另行报价。', '未经客户同意，不会产生补充费用。如果项目超出范围，在工作开始前可以缩小到已购买的范围、改为另行确认的范围，或申请全额退款；可预见的必要第三方费用也会尽量在发生前说明。'] },
        { title: '咨询预约与延长', paragraphs: ['标准咨询包括一次 60 分钟时间和简短重点摘要，默认为实时文字咨询；语音或视频是否可以安排，以服务页面说明与事前确认为准。', '开始前至少 24 小时通知，可以免费改期一次；24 小时内取消或未出席，因为时间已经预留，原则上不退款。如果 ZimonAI 无法承接或安排时间，会退还咨询款项。30 分钟延长只提供给已有预约的客户。'] },
        { title: '取消与退款', paragraphs: ['人工判断或咨询开始前，客户可以要求取消并退还该项标准服务的全部款项。工作开始后，如需退款，会扣除已完成工作和已经发生且无法收回的成本后评估。', '退款会通过 Stripe 可用的原付款路径退回；实际到账时间仍受 Stripe、银行或付款方式服务商处理时间影响。本条款不限制依法不得排除的权利。'] },
        { title: '已确认服务差额', paragraphs: ['服务差额补款只用于 ZimonAI 已事先确认的金额。付款人必须填写案件、报价、预约或付款用途，并按照确认金额选择相符的 USD 10 单位数量。', '补款不会自动建立新项目，也不得作为供应商订金、订单货款或任何未确认费用。如果无法匹配，款项可能暂停处理，等待补充参考资料后计入项目或退回。'] },
        { title: '交付成果、决策与限制', paragraphs: ['报告或咨询只反映交付文件中写明的资料、日期、地点与工作范围。付款不保证核查结果有利、供应商未来表现、产品质量、认证结果、寻源成功或任何商业成果。', '签约、采购、付款与其他商业决策仍由客户自行负责。成果可以在必要范围内提供给内部成员和专业顾问，但不应被篡改、断章取义，或对外描述成保证或认可资质。'] },
        { title: '错误更正与后续问题', paragraphs: ['如果交付成果存在可以客观确认、并且由 ZimonAI 造成的抄录或事实错误，请提供报告编号与支持资料，我们会重新检查。新增证据、供应商状态变化、新型号或超出原范围的问题，可能需要另外安排工作。', '核查结果具有时效性；某一天查到的供应商或证书状态，不代表以后一定保持不变。'] },
        { title: '收据、记录与隐私', paragraphs: ['付款确认或收据由 Stripe 提供。ZimonAI 会保存确认交付、会计处理、争议回复与履行适用义务所需的交易、服务和往来记录。', '联系、付款与案件资料的处理方式，详见 ZimonAI 隐私声明。请勿在收件表单或邮件中发送完整银行卡号与安全码。'] },
        { title: '咨询与条款更新', paragraphs: ['服务范围、安排、付款或退款问题，请发送至 simonlo@zimonai.com。邮件可以附 Stripe 收据或案件编号，但不要附上完整银行卡资料。', '页面顶部的生效日期代表当前网站公开版本。除非双方另行同意或法律要求，之后的网站条款更新不会追溯替代已经确认并进行中的个别项目书面范围。'] }
      ],
      references: [providerReferences['zh-cn'][0]]
    }
  }
};
