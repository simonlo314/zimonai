export const paymentContent = {
  en: {
    meta: {
      titles: {
        payments: 'Book Supplier Verification Services | ZimonAI',
        paymentSuccess: 'Payment received | ZimonAI',
        paymentTerms: 'Payment and Service Terms | ZimonAI'
      },
      descriptions: {
        payments: 'Review fixed-scope T1 and T2 supplier verification, professional consultation and confirmed service-balance options before booking with ZimonAI.',
        paymentSuccess: 'Confirm a ZimonAI Stripe payment and complete the information needed to begin the purchased service.',
        paymentTerms: 'The fixed scope, scheduling, refund and payment terms for ZimonAI consultations and supplier verification services.'
      }
    },
    nav: 'Book & pay',
    support: {
      open: 'Contact ZimonAI', close: 'Close contact panel', title: 'Contact and payment support',
      intro: 'For service, payment or post-payment questions, use one of the verified ZimonAI contacts below. This panel connects you directly to our official contact channels.',
      emailAction: 'Email support', copy: 'Copy', copied: 'Copied', copyFailed: 'Copy failed', paymentHelp: 'Include the Stripe receipt or case reference when asking about a payment.'
    },
    authGate: {
      redirecting: 'Sign in to continue…',
      resumeTitle: 'You are signed in. Review the service once more.',
      resumeText: 'Click the purchase button again when the scope and details are correct. Checkout will open only after that confirmation; no payment has been made yet.'
    },
    payments: {
      kicker: 'Book and pay',
      title: 'Choose a defined starting point—not an open-ended charge.',
      lead: 'Fixed-scope services can be paid securely through Stripe. T3–T6 remain quoted assignments because access, travel and delivery scope must be confirmed first.',
      stripeNote: 'Checkout is hosted by Stripe. ZimonAI does not receive or store your card number.',
      catalog: { label: 'Direct checkout', title: 'Four services with a published price.', lead: 'Open a service file to review its fixed scope, exclusions and timing before paying.' },
      labels: { includes: 'Fixed scope', notIncluded: 'Not included', timing: 'Timing', quantity: 'Number of USD 10 units', reference: 'Case, booking or quote reference / payment reason', required: 'Required', terms: 'I have read the fixed scope and payment terms.', processing: 'Opening secure checkout…', error: 'Checkout could not be opened. No payment was taken.', termsLink: 'Payment and service terms' },
      products: [
        {
          key: 'consultation', index: '01', label: 'Professional consultation', title: 'Supplier Verification Consultation',
          price: 'USD 99', unit: '60 minutes', timing: 'By appointment',
          summary: 'A focused session for buyers who need help interpreting supplier claims, certificates, product documents or the right verification scope.',
          includes: ['Live written consultation by default', 'Chinese voice or video by appointment', 'English voice or video by prior confirmation', 'A short written recap after the session'],
          notIncluded: 'Database verification, a formal report, legal or tax advice, site work or a purchasing decision.',
          button: 'Book consultation'
        },
        {
          key: 't1', index: '02', label: 'Fixed-scope verification', title: 'T1 · Certificate Verification',
          price: 'USD 149', unit: 'per standard case', timing: '24–48 hours after complete intake',
          summary: 'A fixed starting scope for one supplier, one legal entity and one charger or power-electronics model.',
          includes: ['One supplier and one primary legal entity', 'One product model', 'Up to two certificate or authorisation claims', 'Company-record and certificate cross-check', 'A 3–5 page report with sources and limitations'],
          notIncluded: 'Telephone contact, site work, capacity assessment, quality inspection or additional entities and models.',
          button: 'Purchase T1'
        },
        {
          key: 't2', index: '03', label: 'Fixed-scope due diligence', title: 'T2 · Remote Due Diligence',
          price: 'USD 349', unit: 'per standard case', timing: '3–5 business days after complete intake',
          summary: 'T1 plus deeper corporate, address, litigation and manufacturer-versus-trader analysis.',
          includes: ['Everything in the standard T1 scope', 'One primary supplier and up to two directly related entities', 'Address, ownership and litigation review', 'Public import/export indicators where accessible', 'Manufacturer-versus-trader and public-claim comparison'],
          notIncluded: 'Direct supplier communication, site work, quality inspection or unrelated groups of companies and products.',
          button: 'Purchase T2'
        },
        {
          key: 'balance', index: '04', label: 'Agreed balance payment', title: 'Service Balance Payment',
          price: 'USD 10', unit: 'per unit', timing: 'Applied to the referenced service',
          summary: 'Use this only after ZimonAI has confirmed a service balance. Select the number of USD 10 units that matches the agreed amount.',
          includes: ['Public payment option', 'Selectable USD 10 units', 'Matched using the case, quote or payment reason'],
          notIncluded: 'A new verification service, supplier deposits, purchase funds or any unconfirmed charge.',
          button: 'Pay confirmed balance', quantity: true, reference: true
        }
      ],
      extension: {
        title: 'Consultation extension', price: 'USD 49', unit: '30 minutes',
        summary: 'Available only for an existing consultation booking. A booking or payment reference is required.',
        timing: 'Added to the existing booking',
        button: 'Pay for extension'
      },
      process: {
        label: 'After checkout', title: 'Payment starts the intake. Complete information starts the delivery clock.',
        steps: [
          ['Payment confirmed', 'Stripe confirms the charge and provides a receipt.'],
          ['Complete the intake', 'Submit the booking details or supplier, model and certificate information requested on the success page.'],
          ['Scope checked', 'ZimonAI confirms that the material fits the purchased fixed scope.'],
          ['Work begins', 'The stated delivery time begins after the required information is complete.']
        ]
      },
      wrongFit: { title: 'If the submitted case is outside the fixed scope', text: 'Before work begins, you can reduce the case to the published scope, approve a supplemental quote or request a full refund. ZimonAI never adds a charge without your approval.' },
      quoted: { title: 'T3–T6 remain quoted services', text: 'Interviews, site work, ongoing retainers and managed assignments depend on consent, access, timing and third-party costs. Discuss the assignment first; payment follows the confirmed scope.' }
    },
    success: {
      kicker: 'Payment follow-up', title: 'Confirm the payment, then give the case what it needs.',
      lead: 'This page checks the Stripe session before showing the next step. Do not send card information in the intake or by email.',
      loading: 'Confirming the Stripe payment…', verified: 'Payment confirmed', pending: 'Payment is still processing', invalid: 'This payment could not be confirmed from the supplied link.',
      labels: { item: 'Service', amount: 'Amount paid', email: 'Receipt email', reference: 'Reference', session: 'Stripe reference' },
      nextTitle: 'Complete the post-payment intake',
      nextLead: 'The delivery clock starts after ZimonAI receives the required, complete information.',
      fields: {
        timezone: 'Your time zone', times: 'Three preferred appointment times', format: 'Preferred consultation format', question: 'Questions or documents to discuss',
        supplier: 'Supplier name', url: 'Supplier website or marketplace URL', chinese: 'Chinese legal name, if known', product: 'Product and complete model', certificates: 'Certificate or authorisation numbers', decision: 'What decision should this work support?',
        reference: 'Case or quote reference', required: 'Required', send: 'Prepare intake email'
      },
      formats: ['Live written consultation', 'Chinese voice or video', 'English voice or video — confirmation required'],
      emailNote: 'The button prepares an email in your mail app. Review it, attach relevant files there, then send it directly to ZimonAI.',
      balanceDone: 'No new intake is created for a balance payment. ZimonAI matches it to the reference supplied at checkout.',
      support: 'Need help with this payment? Open the contact panel and include the Stripe reference.'
    },
    terms: {
      kicker: 'Payment and service terms', title: 'The price is fixed because the standard scope is fixed.',
      lead: 'These terms explain when work begins, what happens when a submitted case falls outside the published scope, and how consultation scheduling is handled.',
      sections: [
        ['Stripe checkout', 'Payments are processed on Stripe-hosted checkout. ZimonAI does not receive or store full payment-card numbers. Stripe may process payment, contact and billing information under its own terms and privacy notice.'],
        ['When delivery time begins', 'The stated time begins after payment is confirmed and all required supplier, model, certificate or appointment information has been received. Time spent waiting for missing material is not part of the delivery period.'],
        ['Fixed T1 and T2 scope', 'T1 and T2 prices apply only to the scope published on the payment page. If the submitted material exceeds that scope, no additional amount is charged automatically. Before work begins, the client may reduce the scope, approve a supplemental quote or request a full refund.'],
        ['Consultation scheduling', 'A consultation includes one 60-minute appointment and a short written recap. One reschedule is available with at least 24 hours notice. Cancellations within 24 hours and missed appointments are normally non-refundable. If ZimonAI cannot accept or schedule the session, the payment is refunded.'],
        ['Work already started', 'Once manual review or consultation work has started, any refund is assessed according to the work already completed and costs already incurred. This does not limit any rights that cannot lawfully be excluded.'],
        ['Service balance payments', 'A service balance payment is not a standalone service. It may be used only for an amount already confirmed by ZimonAI and must include a case, quote or payment reason. It cannot be used for supplier deposits, orders or purchase funds.'],
        ['What a payment does not guarantee', 'Payment does not guarantee a favourable verification result, supplier performance, product quality or a commercial outcome. Reports state the evidence reviewed, the conclusion supported at that time and the limits of the work.'],
        ['Contact', 'Questions about scope, scheduling, payment or refunds can be sent to simonlo@zimonai.com. Include the Stripe receipt or case reference.']
      ],
      privacyAddition: ['Payments and order records', 'When you pay, Stripe processes payment, contact and billing information. Depending on the service, Checkout asks for your contact name and may also collect a business name, phone number and optional tax ID. ZimonAI receives these details with the transaction status and service reference to confirm payment, deliver the service, respond to disputes and maintain accounting records. ZimonAI does not receive or store full card numbers.']
    }
  },
  'zh-tw': {
    meta: {
      titles: { payments: '供應商查核服務與預約｜ZimonAI 智蒙灣', paymentSuccess: '付款確認｜ZimonAI 智蒙灣', paymentTerms: '付款與服務條款｜ZimonAI 智蒙灣' },
      descriptions: { payments: '查看 ZimonAI 固定範圍 T1、T2 供應商查核、專業諮詢與已確認服務差額的內容，再決定預約方式。', paymentSuccess: '確認 ZimonAI Stripe 付款，並完成諮詢或供應商查核開始前需要的資料。', paymentTerms: 'ZimonAI 專業諮詢、T1／T2 固定範圍服務的付款、排程、退款與交付規則。' }
    },
    nav: '預約與付款',
    support: {
      open: '聯絡 ZimonAI', close: '關閉聯絡面板', title: '聯絡與付款協助',
      intro: '服務、付款或付款後有問題，都可以使用以下正式聯絡方式；這裡會直接連到 ZimonAI 的聯絡窗口。',
      emailAction: '寄信詢問', copy: '複製', copied: '已複製', copyFailed: '複製失敗', paymentHelp: '詢問付款時，請附上 Stripe 收據或案件編號。'
    },
    authGate: {
      redirecting: '請先登入再繼續…',
      resumeTitle: '你已登入，請再確認一次服務內容。',
      resumeText: '範圍與資料都正確時，再按一次購買按鈕。付款頁只會在你再次確認後開啟，目前尚未產生任何扣款。'
    },
    payments: {
      kicker: '預約與付款', title: '先選清楚的服務範圍，再進行付款。',
      lead: '固定範圍的服務可直接透過 Stripe 安全付款。T3–T6 需視供應商配合、差旅與現場執行條件另行報價。',
      stripeNote: '付款頁由 Stripe 提供。ZimonAI 不會接收或保存你的信用卡號。',
      catalog: { label: '可直接付款', title: '四項公開定價的服務', lead: '展開服務項目，確認固定範圍、不包含項目與時間後再付款。' },
      labels: { includes: '固定範圍', notIncluded: '不包含', timing: '交付／安排時間', quantity: 'USD 10 補款單位數量', reference: '案件、預約或報價編號／付款用途', required: '必填', terms: '我已閱讀固定範圍與付款條款。', processing: '正在開啟安全付款頁⋯', error: '目前無法開啟付款頁，這次沒有扣款。', termsLink: '付款與服務條款' },
      products: [
        {
          key: 'consultation', index: '01', label: '專業諮詢', title: '供應商查核專業諮詢', price: 'USD 99', unit: '60 分鐘', timing: '預約制',
          summary: '協助海外買家判讀供應商說法、證書、產品文件，或釐清下一步應該從哪一種查核開始。',
          includes: ['預設提供即時文字諮詢', '中文語音或視訊可預約', '英文語音或視訊需事前確認', '諮詢後提供簡短重點摘要'],
          notIncluded: '資料庫正式查核、正式報告、法律或稅務意見、現場工作與代替客戶作採購決定。', button: '預約諮詢'
        },
        {
          key: 't1', index: '02', label: '固定範圍查核', title: 'T1・遠端證照查核', price: 'USD 149', unit: '每件標準案件', timing: '資料完整後 24–48 小時',
          summary: '針對一家供應商、一個主要法律主體與一個充電或電源電子產品型號進行標準查核。',
          includes: ['一家供應商與一個主要法律主體', '一個產品完整型號', '最多兩項證書或認證主張', '企業登記與證書交叉比對', '3–5 頁報告，列出來源與限制'],
          notIncluded: '電話聯絡、現場工作、產能判斷、品質檢測，以及額外公司或型號。', button: '購買 T1'
        },
        {
          key: 't2', index: '03', label: '固定範圍盡調', title: 'T2・遠端深度盡調', price: 'USD 349', unit: '每件標準案件', timing: '資料完整後 3–5 個工作日',
          summary: '包含 T1，再增加企業關係、地址、訴訟與製造商／貿易商身分判讀。',
          includes: ['標準 T1 的全部內容', '一家主要供應商與最多兩家直接關聯企業', '地址、股權與訴訟紀錄查核', '公開可查的進出口線索', '製造商／貿易商身分與公開說法比對'],
          notIncluded: '直接聯絡供應商、現場工作、品質檢測，以及互不相關的多組公司或產品。', button: '購買 T2'
        },
        {
          key: 'balance', index: '04', label: '已確認差額', title: '服務差額補款', price: 'USD 10', unit: '每一單位', timing: '依案件或付款用途核對入帳',
          summary: '只在 ZimonAI 已確認補款金額後使用。請依通知金額選擇 USD 10 單位數量。',
          includes: ['公開付款項目', '可自行選擇 USD 10 單位數量', '依案件、報價編號或補款原因配對'],
          notIncluded: '新的查核服務、供應商訂金、貨款或任何尚未確認的費用。', button: '支付已確認差額', quantity: true, reference: true
        }
      ],
      extension: { title: '延長諮詢', price: 'USD 49', unit: '30 分鐘', summary: '只提供給已有諮詢預約的客戶，付款時必須填寫預約或付款編號。', timing: '加在既有預約時段', button: '支付延長費用' },
      process: {
        label: '付款後流程', title: '付款完成後即可補齊案件資料；必要資料齊全後才開始計算交付時間。',
        steps: [['確認付款', 'Stripe 完成付款確認並提供收據。'], ['提交資料', '在成功頁填寫預約資料，或供應商、型號與證書資訊。'], ['核對範圍', 'ZimonAI 確認資料是否符合所購買的固定範圍。'], ['開始工作', '必要資料齊全後，才開始計算頁面標示的交付時間。']]
      },
      wrongFit: { title: '如果案件超出固定範圍', text: '在工作開始以前，你可以把案件縮小到公開範圍、接受補充報價，或申請全額退款。ZimonAI 不會在未取得同意時自行加收費用。' },
      quoted: { title: 'T3–T6 維持先報價', text: '訪談、實地工作、月費顧問與全流程案件，會受到供應商同意、執行條件、差旅和第三方成本影響，因此仍會先說明需求，再依確認範圍付款。' }
    },
    success: {
      kicker: '付款後續', title: '先確認付款，再把案件需要的資料補齊。',
      lead: '這個頁面會先向 Stripe 確認付款狀態，再顯示對應的下一步。請勿在表單或 Email 傳送信用卡資料。',
      loading: '正在向 Stripe 確認付款⋯', verified: '付款已確認', pending: '付款仍在處理中', invalid: '目前無法從這個連結確認付款。',
      labels: { item: '服務項目', amount: '實付金額', email: '收據 Email', reference: '案件／補款資料', session: 'Stripe 付款編號' },
      nextTitle: '補齊付款後所需資料', nextLead: 'ZimonAI 收到完整必要資料後，才會開始計算交付時間。',
      fields: {
        timezone: '你所在的時區', times: '三個方便預約的時段', format: '希望使用的諮詢方式', question: '希望討論的問題或文件',
        supplier: '供應商名稱', url: '供應商網站或平台連結', chinese: '中文法律主體名稱，如已知', product: '產品與完整型號', certificates: '證書或認證編號', decision: '這次查核要支援什麼決定？',
        reference: '案件或報價編號', required: '必填', send: '準備收件 Email'
      },
      formats: ['即時文字諮詢', '中文語音或視訊', '英文語音或視訊・需事前確認'],
      emailNote: '按鈕會在你的郵件 App 建立草稿。請先檢查內容，再於郵件中附上相關文件並直接寄給 ZimonAI。',
      balanceDone: '差額補款不會建立新案件。ZimonAI 會按照付款時填寫的案件、報價編號或原因進行配對。',
      support: '這筆付款需要協助？請打開聯絡面板，並附上 Stripe 付款編號。'
    },
    terms: {
      kicker: '付款與服務條款', title: '價格固定，是因為標準服務範圍固定。',
      lead: '以下說明何時開始計算交付時間、案件超出公開範圍時的處理方式，以及諮詢的預約與退款規則。',
      sections: [
        ['Stripe 付款', '付款會在 Stripe 提供的安全頁面完成。ZimonAI 不會接收或保存完整信用卡號。Stripe 會依其條款與隱私聲明處理付款、聯絡與帳單資料。'],
        ['何時開始計算交付時間', '付款確認，且供應商、型號、證書或預約資料完整送達後，才開始計算頁面標示的時間。等待補件的時間不列入交付時間。'],
        ['T1 與 T2 固定範圍', 'T1 與 T2 的固定價格只適用付款頁公開的標準範圍。如果客戶提交的內容超出範圍，ZimonAI 不會自動加收費用；工作開始前，客戶可以縮小範圍、同意補充報價，或申請全額退款。'],
        ['諮詢預約', '一次諮詢包括一個 60 分鐘時段與簡短重點摘要。於開始前至少 24 小時通知，可免費改期一次；24 小時內取消或未出席，原則上不退款。如果 ZimonAI 無法承接或安排時段，會退還款項。'],
        ['已經開始的工作', '人工判讀或諮詢已開始後，如需退款，會依已完成的工作與已發生成本處理；依法不得排除的權利不受影響。'],
        ['服務差額補款', '補款不是一項獨立服務，只能支付 ZimonAI 已確認的服務差額，並應填寫案件、報價編號或原因。不得用於供應商訂金、訂單或貨款。'],
        ['付款不代表結果保證', '付款不保證查核結果有利、供應商未來表現、產品品質或商業成果。報告只會說明當次查到的證據、可以支持的結論與工作限制。'],
        ['聯絡方式', '服務範圍、預約、付款或退款問題，請寄至 simonlo@zimonai.com，並附上 Stripe 收據或案件編號。']
      ],
      privacyAddition: ['付款與訂單紀錄', '付款時，Stripe 會處理付款、聯絡與帳單資料。付款頁會收集聯絡人姓名；依服務項目不同，也可能收集公司名稱、電話與選填稅號。ZimonAI 會收到這些資料、付款狀態與服務編號，用於確認付款、交付服務、處理爭議與保存會計紀錄；ZimonAI 不會接收或保存完整信用卡號。']
    }
  },
  'zh-cn': {
    meta: {
      titles: { payments: '供应商核查服务与预约｜ZimonAI 智蒙灣', paymentSuccess: '付款确认｜ZimonAI 智蒙灣', paymentTerms: '付款与服务条款｜ZimonAI 智蒙灣' },
      descriptions: { payments: '查看 ZimonAI 固定范围 T1、T2 供应商核查、专业咨询与已确认服务差额的内容，再决定预约方式。', paymentSuccess: '确认 ZimonAI Stripe 付款，并完成咨询或供应商核查开始前需要的资料。', paymentTerms: 'ZimonAI 专业咨询、T1／T2 固定范围服务的付款、安排、退款与交付规则。' }
    },
    nav: '预约与付款',
    support: {
      open: '联系 ZimonAI', close: '关闭联系面板', title: '联系与付款协助',
      intro: '服务、付款或付款后有问题，都可以使用以下正式联系方式；这里会直接连接到 ZimonAI 的联系窗口。',
      emailAction: '发送邮件', copy: '复制', copied: '已复制', copyFailed: '复制失败', paymentHelp: '询问付款时，请附上 Stripe 收据或案件编号。'
    },
    authGate: {
      redirecting: '请先登录再继续…',
      resumeTitle: '你已登录，请再确认一次服务内容。',
      resumeText: '范围与资料都正确时，再按一次购买按钮。付款页面只会在你再次确认后打开，目前尚未产生任何扣款。'
    },
    payments: {
      kicker: '预约与付款', title: '先选清楚服务范围，再进行付款。',
      lead: '固定范围的服务可以直接通过 Stripe 安全付款。T3–T6 需根据供应商配合、差旅与现场执行条件另行报价。',
      stripeNote: '付款页面由 Stripe 提供。ZimonAI 不会接收或保存你的银行卡号。',
      catalog: { label: '可直接付款', title: '四项公开定价的服务', lead: '展开服务详情，确认固定范围、不包括的项目与时间后再付款。' },
      labels: { includes: '固定范围', notIncluded: '不包括', timing: '交付／安排时间', quantity: 'USD 10 补款单位数量', reference: '案件、预约或报价编号／付款用途', required: '必填', terms: '我已阅读固定范围与付款条款。', processing: '正在打开安全付款页面…', error: '目前无法打开付款页面，本次没有扣款。', termsLink: '付款与服务条款' },
      products: [
        { key: 'consultation', index: '01', label: '专业咨询', title: '供应商核查专业咨询', price: 'USD 99', unit: '60 分钟', timing: '预约制', summary: '帮助海外买家判断供应商说法、证书、产品文件，或明确下一步应从哪一种核查开始。', includes: ['默认提供实时文字咨询', '中文语音或视频可以预约', '英文语音或视频需事先确认', '咨询后提供简短重点摘要'], notIncluded: '数据库正式核查、正式报告、法律或税务意见、现场工作和代替客户作采购决定。', button: '预约咨询' },
        { key: 't1', index: '02', label: '固定范围核查', title: 'T1・远程证照核查', price: 'USD 149', unit: '每个标准案件', timing: '资料完整后 24–48 小时', summary: '针对一家供应商、一个主要法律主体和一个充电或电源电子产品型号进行标准核查。', includes: ['一家供应商与一个主要法律主体', '一个产品完整型号', '最多两项证书或认证主张', '企业登记与证书交叉比对', '3–5 页报告，列出来源与限制'], notIncluded: '电话联系、现场工作、产能判断、质量检测，以及额外公司或型号。', button: '购买 T1' },
        { key: 't2', index: '03', label: '固定范围尽调', title: 'T2・远程深度尽调', price: 'USD 349', unit: '每个标准案件', timing: '资料完整后 3–5 个工作日', summary: '包括 T1，再增加企业关系、地址、诉讼与制造商／贸易商身份判断。', includes: ['标准 T1 的全部内容', '一家主要供应商与最多两家直接关联企业', '地址、股权与诉讼记录核查', '公开可查的进出口线索', '制造商／贸易商身份与公开说法比对'], notIncluded: '直接联系供应商、现场工作、质量检测，以及互不相关的多组公司或产品。', button: '购买 T2' },
        { key: 'balance', index: '04', label: '已确认差额', title: '服务差额补款', price: 'USD 10', unit: '每个单位', timing: '按项目或付款用途核对入账', summary: '只在 ZimonAI 已确认补款金额后使用。请按通知金额选择 USD 10 单位数量。', includes: ['公开付款项目', '可自行选择 USD 10 单位数量', '按案件、报价编号或补款原因匹配'], notIncluded: '新的核查服务、供应商订金、货款或任何尚未确认的费用。', button: '支付已确认差额', quantity: true, reference: true }
      ],
      extension: { title: '延长咨询', price: 'USD 49', unit: '30 分钟', summary: '只提供给已有咨询预约的客户，付款时必须填写预约或付款编号。', timing: '加在已有预约时段', button: '支付延长费用' },
      process: { label: '付款后流程', title: '付款完成后即可补充项目资料；必要资料齐全后才开始计算交付时间。', steps: [['确认付款', 'Stripe 完成付款确认并提供收据。'], ['提交资料', '在成功页面填写预约资料，或者供应商、型号和证书信息。'], ['核对范围', 'ZimonAI 确认资料是否符合所购买的固定范围。'], ['开始工作', '必要资料齐全后，才开始计算页面标示的交付时间。']] },
      wrongFit: { title: '如果案件超出固定范围', text: '在工作开始前，你可以把案件缩小到公开范围、接受补充报价，或者申请全额退款。ZimonAI 不会在没有获得同意时自行加收费用。' },
      quoted: { title: 'T3–T6 维持先报价', text: '访谈、实地工作、月费顾问和全流程项目会受到供应商同意、执行条件、差旅和第三方成本影响，因此仍会先说明需求，再按确认范围付款。' }
    },
    success: {
      kicker: '付款后续', title: '先确认付款，再把案件需要的资料补齐。', lead: '这个页面会先向 Stripe 确认付款状态，再显示对应的下一步。请勿在表单或邮件中发送银行卡资料。', loading: '正在向 Stripe 确认付款…', verified: '付款已确认', pending: '付款仍在处理中', invalid: '目前无法通过这个链接确认付款。',
      labels: { item: '服务项目', amount: '实付金额', email: '收据邮箱', reference: '案件／补款资料', session: 'Stripe 付款编号' }, nextTitle: '补齐付款后所需资料', nextLead: 'ZimonAI 收到完整必要资料后，才会开始计算交付时间。',
      fields: { timezone: '你所在的时区', times: '三个方便预约的时间', format: '希望使用的咨询方式', question: '希望讨论的问题或文件', supplier: '供应商名称', url: '供应商网站或平台链接', chinese: '中文法律主体名称，如已知', product: '产品与完整型号', certificates: '证书或认证编号', decision: '这次核查要支持什么决定？', reference: '案件或报价编号', required: '必填', send: '准备收件邮件' },
      formats: ['实时文字咨询', '中文语音或视频', '英文语音或视频・需事先确认'], emailNote: '按钮会在你的邮件应用中建立草稿。请先检查内容，再在邮件中附上相关文件并直接发送给 ZimonAI。', balanceDone: '差额补款不会建立新案件。ZimonAI 会按照付款时填写的案件、报价编号或原因进行匹配。', support: '这笔付款需要协助？请打开联系面板，并附上 Stripe 付款编号。'
    },
    terms: {
      kicker: '付款与服务条款', title: '价格固定，是因为标准服务范围固定。', lead: '以下说明何时开始计算交付时间、案件超出公开范围时的处理方式，以及咨询的预约与退款规则。',
      sections: [
        ['Stripe 付款', '付款会在 Stripe 提供的安全页面完成。ZimonAI 不会接收或保存完整银行卡号。Stripe 会按其条款与隐私声明处理付款、联系与账单资料。'],
        ['何时开始计算交付时间', '付款确认，而且供应商、型号、证书或预约资料完整送达后，才开始计算页面标示的时间。等待补件的时间不计入交付时间。'],
        ['T1 与 T2 固定范围', 'T1 与 T2 的固定价格只适用于付款页面公开的标准范围。如果客户提交的内容超出范围，ZimonAI 不会自动加收费用；工作开始前，客户可以缩小范围、同意补充报价，或者申请全额退款。'],
        ['咨询预约', '一次咨询包括一个 60 分钟时段和简短重点摘要。在开始前至少 24 小时通知，可以免费改期一次；24 小时内取消或未出席，原则上不退款。如果 ZimonAI 无法承接或安排时间，会退还款项。'],
        ['已经开始的工作', '人工判断或咨询已经开始后，如需退款，会按已完成的工作和已发生费用处理；依法不得排除的权利不受影响。'],
        ['服务差额补款', '补款不是一项独立服务，只能支付 ZimonAI 已确认的服务差额，并应填写案件、报价编号或原因。不得用于供应商订金、订单或货款。'],
        ['付款不代表结果保证', '付款不保证核查结果有利、供应商未来表现、产品质量或商业结果。报告只会说明当次查到的证据、能够支持的结论和工作限制。'],
        ['联系方式', '服务范围、预约、付款或退款问题，请发送至 simonlo@zimonai.com，并附上 Stripe 收据或案件编号。']
      ],
      privacyAddition: ['付款与订单记录', '付款时，Stripe 会处理付款、联系与账单资料。付款页面会收集联系人姓名；根据服务项目不同，也可能收集公司名称、电话和选填税号。ZimonAI 会收到这些资料、付款状态和服务编号，用于确认付款、交付服务、处理争议与保存会计记录；ZimonAI 不会接收或保存完整银行卡号。']
    }
  }
};
