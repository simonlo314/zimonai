import {
  datePattern,
  demonstrativeQuantityPattern,
  folioPattern,
  ordinalPattern,
  quantityPattern,
  technicalMeasurementPattern,
  trailingPunctuationPattern
} from './assets/cjk-patterns.js';

const sharedProtectedTerms = [
  'ZimonAI',
  'Search Console',
  'Googlebot',
  'Cloudflare',
  'Stripe',
  'Safety Gate',
  'UL Product iQ',
  'Anker MagGo Power Bank 2 Pro',
  'MagGo Power Bank 2 Pro',
  'EU Declaration of Conformity',
  'IECEE CB Test Certificate',
  'National Certification Body',
  'Qualification by Similarity',
  'Certified USB Fast Charger',
  'Certificate of Compliance',
  'CB Testing Laboratory',
  'CB Test Report',
  'Test Report Form',
  'USB-IF Product Search',
  'USB Power Delivery',
  'USB Type-C',
  'USB-C',
  'USB-IF',
  'USB PD',
  'FCC ID',
  'IECEE CB',
  'ISO 9001',
  'CNCA-QMS-01:2025',
  'GB/T 19001',
  'EN IEC 63000',
  'IEC 62368-1',
  'UN 38.3',
  'Power Bank 2 Pro',
  'MagGo',
  'EU Declaration',
  'of Conformity',
  'CB Test Certificate',
  'CB Scheme',
  'National Differences',
  'Certified USB Charger',
  'Compliance Program',
  'Integrators List',
  'Product Search',
  'Product iQ',
  'REACH compliant',
  'Wireless Power Consortium',
  'T1–T6',
  'RoHS',
  'NANDO',
  'CNCA',
  'GaN',
  'Qi2',
  'Qi ID',
  'Test ID',
  'Test ID（TID）',
  'Certification',
  'SDoC',
  '25W 的 Qi2.2',
  'Type Ref.',
  'ODM',
  'OEM',
  'MOQ'
];

const protectedTermsByLocale = {
  'zh-tw': [
    '找對人，',
    '查清楚，',
    '再確認產品。',
    '電源電子',
    '電源電子供應鏈',
    '電源適配器',
    '充電器',
    '與電源電子',
    '與電源電子供應鏈',
    '行動電源',
    '美加接連召回',
    '型號清單',
    '包裝型號',
    '零售版本',
    '市場 SKU',
    '退款管道',
    '處置管道',
    '召回物流',
    '召回範圍',
    '電芯供應商',
    '受影響批次',
    '生產批次',
    '內部配置',
    '技術根因',
    '逆向物流',
    '主管機關',
    '通路商',
    '供應商',
    '供應鏈',
    '深圳市',
    '新北市',
    '板南路',
    '前海深港合作區',
    '前海深港合作区',
    '中和區',
    '中和区',
    '深圳智蒙湾科技有限公司',
    '羅亦斈',
    '罗亦斈',
    '南山街道',
    '怡海大道',
    '海運中心',
    '海运中心',
    '7樓之3',
    '7楼之3',
    '知識庫',
    '懶人包',
    '關鍵詞',
    '關鍵字',
    '工作天',
    '持有人',
    '符合性',
    '第三方',
    '服務商',
    '驗證碼',
    '海外買家',
    '經濟營運者',
    '檔案號',
    '付款頁',
    '報價單',
    '申請人',
    '信用卡號',
    '供應商查核顧問',
    '供應商查核',
    '供應商說法',
    '供應商身分',
    '供應商名稱',
    '供應商資料',
    '產品認證',
    '產品型號',
    '產品標籤',
    '產品結構',
    '品質管理',
    '品質管理系統',
    '物料清單',
    '物料表版本',
    '現行物料表',
    '物料表',
    '候選清單',
    '候選清單物質',
    '物品供應者',
    '歐洲經濟區',
    '零件—證據',
    '品質檢驗',
    '品質檢測',
    '統一社會信用代碼',
    '中文法定名稱',
    '英文商號',
    '是中國供應商法律主體',
    '中國供應商法律主體',
    '中國供應商',
    '穩定識別基準',
    '官方公示紀錄',
    '可見的主體身分',
    '看起來一致',
    '英文譯名',
    '郵件簽名',
    '企業登記本身',
    '而企業登記本身',
    '登記資料',
    '登記主體',
    '自有工廠',
    '具備足夠產能',
    '發票方',
    '收款方',
    '誰負責',
    '或一定履行',
    '一定履行',
    '會履行',
    '法律主體',
    '公司主體',
    '公司身分',
    '公司登記',
    '公司名稱',
    '登記地址',
    '成立日期',
    '成立年份',
    '證書持有人',
    '證書編號',
    '證書號',
    '證書紀錄',
    '證書查核',
    '證書圖片',
    '認證範圍',
    '認證紀錄',
    '認證持有人',
    '認證日期',
    '符合性聲明',
    'EU 符合性聲明',
    '歐盟經濟營運者',
    '產品類別控制號',
    '公告機構',
    '歐盟委員會',
    '國家企業信用信息公示系統',
    '法定代表人',
    '測試實驗室',
    '量產管制',
    '出貨批次',
    '本批訂單',
    '發證機構',
    '測試報告',
    '測試證書',
    '測試摘要',
    '額定值',
    '瓦數規格',
    '限用物質',
    '市場准入',
    '市場報價',
    '製造成本',
    '製造商',
    '實驗室',
    '工廠所有權',
    '賣方授權',
    '零組件',
    '連接埠',
    '資料來源索引',
    '資料來源',
    '官方資料庫',
    '官方資料',
    '官方系統',
    '公開資料',
    '查詢日期',
    '查核報告',
    '證據比對表',
    '證據限制',
    '資料吻合',
    '暫無法查證',
    '發現資料不符',
    '資料不符',
    '遠端證照查核',
    '遠端深度盡調',
    '電話與視訊訪查',
    '單次實地查核',
    '實地查核',
    '現場查核',
    '現場工作',
    '全託管採購把關',
    '採購流程',
    '採購決定',
    '採購判斷',
    '採購風險',
    '固定範圍',
    '服務範圍',
    '服務層級',
    '服務差額補款',
    '付款與服務條款',
    '付款條款',
    '付款方式',
    '付款狀態',
    '客戶中心',
    '案件編號',
    '案件資料',
    '專案資料',
    '訂單紀錄',
    '隱私權政策',
    '隱私聲明',
    '同一件事',
    '把錢',
    '該公司',
    '產能',
    '後續',
    '能效',
    '型號尾碼',
    '判讀',
    '合規',
    '盡調',
    '連回',
    '對回',
    '對上',
    '送測',
    '送檢',
    '獲證',
    '列名',
    '標稱',
    '發證方',
    '准入',
    '主動散熱與智慧顯示',
    '主動散熱',
    '獨立評測',
    '智慧顯示',
    '智能顯示',
    '第一層',
    '第一步是',
    '下一段',
    '第一次下單前',
    '先找出',
    '原始說法',
    '與資料來源',
    '方便就查哪個',
    '這款充電器',
    '就代表',
    '就能證明',
    '就能把',
    '能證明',
    '起算時間',
    '做什麼決定',
    '雙基地協作',
    '發表了什麼',
    '歐盟聯絡地址',
    '充電器工廠嗎',
    '哪一件事',
    '「USB-C」',
    '哪一種',
    'FCC ID 嗎',
    'IECEE CB 測試證書',
    'RoHS 測試報告',
    '製造商的符合性聲明',
    '背後的法律主體',
    '先確認服務範圍',
    '再進行付款',
    '已合規嗎',
    '已合規',
    '供應商決策',
    '再確認產品',
    '會面採預約制',
    '找對供應商',
    '查清資料',
    '確認產品',
    '客戶聯絡與專案協調',
    '深圳辦公室',
    '台灣辦公室',
    '素材庫照片',
    '你正要做的決定',
    '智蒙灣科技',
    '智蒙灣',
    'ZIMONAI 的判讀是',
    '對海外買家而言',
    '比規格本身更值得注意的是',
    '同一機身',
    '高功率磁吸行動電源',
    '定價 109.99 美元',
    '追逐瓦數',
    '充電狀態可視化',
    'REACH 第 33 條',
    '核心文件',
    '相關要求',
    '自願性證書',
    '均質材料',
    '安全產品名單',
    '危險產品通報',
    '相符紀錄',
    '篩選條件',
    '電氣安全',
    '連接埠配置',
    '適用程序',
    '供應商符合性聲明',
    '供應商符合性聲明（SDoC）',
    '聯絡點',
    '中國賣方',
    '法律角色',
    '目的國認證',
    '官方狀態',
    '自動准入',
    '其他程序',
    '可採信的範圍',
    '受認證場所',
    '製造範圍',
    '管理主張',
    'ECHA 產品證書',
    '後續換料',
    '量產紀錄',
    '整體合規',
    '應立即核對',
    '資料路徑',
    '出貨一致性',
    '安全元件',
    '特定標準',
    '若對不上',
    '插腳',
    '檔案持有人',
    '歐盟符合性程序',
    '18 位統一社會信用代碼',
    '瓦時數',
    '各構成物品',
    '這份聲明',
    '未列零件',
    '受認證地址',
    '受認證的品質管理系統',
    '範圍內的品質管理系統',
    '外殼下的不同瓦數',
    '工廠身分與本批生產',
    '合規判斷',
    '這項查核',
    '下一筆訂單',
    '相符紀錄時',
    '依特定標準',
    '採購時',
    '一張快照',
    '這份摘要',
    '這筆採購',
    '並以證書狀態',
    '只支持',
    '主體身分與狀態',
    '應比對',
    '這項查核的重點',
    '危險產品通報與矯正措施',
    '型號與篩選條件',
    '仍須搭配產品',
    'CB 證書的價值',
    '供應商的管理主張',
    '這類文件應作為',
    '整體合規的結案依據',
    '指定樣品或均質材料',
    '受測物質與結果',
    '實際涵蓋的對象',
    'EU 符合性聲明與量產變更管制',
    '電路板或安全元件',
    '目前賣方與檔案持有人',
    '行動電源的當批內部配置',
    '材料證據',
    '真正重要的是',
    '搜尋沒有結果',
    '安全說法',
    '記錄的是',
    '目的國要求',
    '簽發證書的 NCB',
    'CB 證書',
    '那一款',
    '可聯繫',
    '地址本身',
    '歐盟營運者',
    '報價型號',
    '不在於',
    '主體身分',
    '銀行收款人',
    '落在誰身上',
    '不是為了',
    '符合性資訊',
    '為核心',
    '不延伸',
    '資料庫搜尋',
    '只是線索',
    '接得起來',
    '簽署人',
    '循環壽命',
    '電池配置',
    '報價行動電源',
    '可視化',
    '「USB PD」',
    '「USB-C」',
    '「GaN」',
    '「CE 證書」',
    '「REACH compliant」',
    '把 10,000mAh',
    '與充電狀態可視化',
    '實驗室報告或自願性證書',
    '應把製造商',
    '程序後，對產品',
    '歐盟符合性程序後，對產品',
    '技術文件與量產管制',
    '銀行收款人與認證持有人',
    '名稱與地址',
    '名稱與地址，為適用產品',
    '地址，為適用產品',
    '歐盟境內可辨識的聯絡點',
    '聯絡方',
    '上市前核准或安全產品名單',
    '搜尋沒有結果，只代表',
    '形成可查詢的 FCC ID',
    '應把現行官方狀態',
    '標誌、登錄或其他程序',
    '所有市場已自動准入',
    '認證不等於',
    '確實在受認證場所',
    '應把證書持有人',
    '入口，而非整體合規',
    '形成可追溯的材料紀錄',
    '真假，而在報價產品',
    '電氣安全或本批出貨品質',
    '電池型號與瓦時數',
    '實際電池，仍不足以',
    '測試程序的產品',
    '應把官方紀錄',
    '功率與連接埠配置',
    '管理系統認證',
    '管理系統認證不等於',
    '可追溯的認證身分'
  ],
  'zh-cn': [
    '找对人，',
    '查清楚，',
    '再确认产品。',
    '电源电子',
    '电源电子供应链',
    '电源适配器',
    '充电器',
    '与电源电子',
    '与电源电子供应链',
    '移动电源',
    '美加接连召回',
    '型号清单',
    '包装型号',
    '零售版本',
    '市场 SKU',
    '退款渠道',
    '处置渠道',
    '召回物流',
    '召回范围',
    '电芯供应商',
    '受影响批次',
    '生产批次',
    '内部配置',
    '技术根因',
    '逆向物流',
    '监管部门',
    '零售商',
    '供应商',
    '供应链',
    '深圳市',
    '新北市',
    '板南路',
    '前海深港合作区',
    '前海深港合作區',
    '中和区',
    '中和區',
    '深圳智蒙湾科技有限公司',
    '羅亦斈',
    '罗亦斈',
    '南山街道',
    '怡海大道',
    '海运中心',
    '海運中心',
    '7楼之3',
    '7樓之3',
    '预约制',
    '数据库',
    '知识库',
    '编辑部',
    '采购方',
    '关键字',
    '关键词',
    '合作区',
    '口岸楼',
    '工作日',
    '持有人',
    '符合性',
    '第三方',
    '服务商',
    '验证码',
    '海外买家',
    '经济运营者',
    '档案号',
    '付款页面',
    '报价单',
    '申请人',
    '银行卡号',
    '供应商核查顾问',
    '供应商核查',
    '供应商说法',
    '供应商身份',
    '供应商名称',
    '供应商资料',
    '产品认证',
    '产品型号',
    '产品标签',
    '产品结构',
    '质量管理',
    '质量管理体系',
    '物料清单',
    '物料清单版本',
    '候选清单',
    '候选清单物质',
    '物品供应方',
    '欧洲经济区',
    '零件—证据',
    '质量检验',
    '质量检测',
    '统一社会信用代码',
    '中文法定名称',
    '英文商号',
    '是中国供应商法律主体',
    '中国供应商法律主体',
    '中国供应商',
    '稳定识别基准',
    '官方公示记录',
    '该主体',
    '平台店名或邮件签名',
    '签约方和收款方',
    '容易混淆',
    '英文译名',
    '邮件签名',
    '企业登记本身',
    '而企业登记本身',
    '登记资料',
    '登记主体',
    '自有工厂',
    '发票方',
    '收款方',
    '谁负责',
    '或一定履行',
    '一定履行',
    '会履行订单',
    '会履行',
    '法律主体',
    '公司主体',
    '公司身份',
    '公司登记',
    '公司名称',
    '登记地址',
    '成立日期',
    '成立年份',
    '证书持有人',
    '证书编号',
    '证书号',
    '证书记录',
    '证书核查',
    '证书图片',
    '认证范围',
    '认证记录',
    '认证持有人',
    '符合性声明',
    '供应商符合性声明（SDoC）',
    '欧盟经济运营者',
    '产品类别控制号',
    '公告机构',
    '欧盟委员会',
    '国家企业信用信息公示系统',
    '法定代表人',
    '测试实验室',
    '量产控制',
    '出货批次',
    '本批订单',
    '发证机构',
    '测试报告',
    '测试证书',
    '测试摘要',
    '额定值',
    '瓦数规格',
    '限用物质',
    '市场准入',
    '市场报价',
    '制造成本',
    '制造商',
    '实验室',
    '工厂所有权',
    '卖方授权',
    '零部件',
    '接口',
    '信息来源索引',
    '信息来源',
    '官方数据库',
    '官方资料',
    '官方系统',
    '公开资料',
    '查询日期',
    '核查报告',
    '证据比对表',
    '证据限制',
    '信息一致',
    '暂时无法核实',
    '发现信息不一致',
    '信息不一致',
    '远程证照核查',
    '远程深度尽调',
    '电话与视频访查',
    '单次实地核查',
    '实地核查',
    '现场核查',
    '现场工作',
    '全托管采购把关',
    '采购流程',
    '采购决定',
    '采购风险',
    '固定范围',
    '服务范围',
    '服务层级',
    '服务差额补款',
    '付款与服务条款',
    '付款条款',
    '付款方式',
    '付款状态',
    '客户中心',
    '案件编号',
    '案件资料',
    '项目资料',
    '订单记录',
    '隐私政策',
    '隐私声明',
    '同一件事',
    '把钱',
    '该公司',
    '产能',
    '后续',
    '能效',
    '型号后缀',
    '判断',
    '合规',
    '尽调',
    '连回',
    '对应',
    '对上',
    '送测',
    '送检',
    '获证',
    '列名',
    '标称',
    '发证方',
    '准入',
    '主动散热与智能显示',
    '主动散热',
    '独立评测',
    '智能显示',
    '第一层',
    '第一步是',
    '第一道门',
    '第一次下单前',
    '先找出',
    '原始说法',
    '和信息来源',
    '方便就查哪个',
    '这款充电器',
    '就代表',
    '就能证明',
    '就能认为',
    '能证明',
    '起算时间',
    '做什么决定',
    '双基地协作',
    '发布了什么',
    '欧盟联系地址',
    '充电器工厂吗',
    '哪一件事',
    '“USB-C”',
    '哪一种',
    'FCC ID 吗',
    'IECEE CB 测试证书',
    'RoHS 测试报告',
    '制造商的符合性声明',
    '背后的法律主体',
    '先确认服务范围',
    '再进行付款',
    '已合规吗',
    '已合规',
    '供应商决策',
    '再确认产品',
    '会面需提前预约',
    '会面采用预约制',
    '找对供应商',
    '查清资料',
    '确认产品',
    '客户联络与项目协调',
    '深圳办公室',
    '台湾办公室',
    '素材库照片',
    '你正要做的决定',
    '智蒙湾科技',
    '智蒙湾',
    '智蒙灣科技',
    '智蒙灣',
    'ZIMONAI 的编辑判断是',
    '对海外买家而言',
    '比参数本身更值得关注的是',
    '同一机身',
    '高功率磁吸移动电源',
    '定价 109.99 美元',
    '追逐瓦数',
    '充电状态可视化',
    '判断依据',
    '升级异常',
    '活动范围',
    '目的国认证',
    '官方状态',
    '筛选条件',
    '危险产品通报',
    '安全产品名录',
    '报价型号',
    '均质材料',
    '当前型号',
    '运输资料',
    '电池类型',
    '本批电池配置',
    '认证身份',
    '接口配置',
    '核心文件',
    '欧盟境内',
    '获证主体',
    '报告上的“PASS”',
    '精确产品',
    '报价移动电源',
    '实际电池',
    '法律角色',
    '后续换料',
    '“这就是工厂”',
    '测试方法',
    'EU 符合性声明',
    '纠正措施',
    '采购决策',
    '主体一致性',
    '产品主张',
    '产品功能',
    '将 10,000mAh',
    '更不保证',
    '是先按产品功能',
    '先按产品功能',
    '或 SDoC',
    '经 Certification',
    '各组成物品的 0.1% w/w',
    '更不涵盖',
    '并以型号',
    '完整型号和设备类别',
    '及物料清单版本',
    '它不是',
    '散热管理与充电状态可视化',
    '实验室报告或自愿性证书',
    '法律角色与产品连接',
    '而非证书名称',
    '发票方和银行收款人',
    '连成证据链',
    '型号和筛选条件',
    '筛查风险并升级异常',
    '授权记录或符合性信息',
    '有效记录也不证明',
    '完整型号和额定值',
    '国家差异与程序',
    '工厂或本批订单',
    '海外买家应先独立核对',
    '获证主体和生产地址',
    '采用了',
    '样品或均质材料',
    '整台充电器的所有材料',
    '型号和标志适用地区',
    '当前卖方与档案持有人',
    '海外买家应把摘要',
    '锂电芯或电池类型',
    '适用的 Compliance Program',
    '产品类别和 Test ID（TID）',
    '功率和接口配置',
    '有没有标志',
    '技术或产品主张',
    '这个地址不代表',
    '海外买家在采购前',
    '在采购前',
    '设立在欧盟境内',
    '应先确认该主体的法律角色',
    '整条证据链的入口',
    '不是对供应商',
    '相应的授权记录或符合性信息',
    '相应的授权记录',
    '供应商身份或实际出货配置',
    '先判断授权路径',
    '全球通行证',
    '再把获证主体',
    '明确识别的样品或均质材料',
    '明确识别的样品',
    '一个词',
    '受测物质和结果',
    '也不等于制造商',
    'EU 符合性声明和批量生产控制',
    '接口或关键安全元件',
    '档案持有人和精确型号',
    '档案范围内',
    '有没有 PDF',
    '都不等于该型号',
    '追溯入口',
    '授权记录',
    '符合性信息',
    '银行收款人',
    '关键安全元件',
    '中央机构',
    '本批货物质量',
    '18 位统一社会信用代码',
    '各组成物品',
    '支持证据',
    '把摘要',
    '证书应被当作',
    '豁免状态',
    '批量生产控制',
    '覆盖关系',
    '目的国',
    'CB 文件',
    '产品级身份',
    '实际价值',
    '欧盟运营者',
    '运营者',
    '可识别',
    '持续一致',
    '符合性评估',
    '循环寿命',
    '最常见',
    '可视化',
    '报告中的“PASS”',
    '“USB PD”',
    '“USB-C”',
    '“GaN”',
    '“CE 证书”',
    '“产品安全”',
    '“REACH compliant”'
  ]
};

const skipTags = new Set(['code', 'noscript', 'option', 'pre', 'script', 'style', 'svg', 'template', 'textarea']);
const rawTextTags = new Set(['iframe', 'noembed', 'noframes', 'noscript', 'script', 'style', 'textarea', 'title', 'xmp']);
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const hanPattern = /\p{Script=Han}/u;
const singleHanPattern = /^\p{Script=Han}$/u;
const singleWordBoundaries = new Set([...'與与和及或並并且是在由的了把被將将會会可要就才已未不也都更仍又後后前中為为向跟則则而但每各這这該该其若如因讓让能需應应']);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function termsFor(locale) {
  return [...new Set([...sharedProtectedTerms, ...(protectedTermsByLocale[locale] || [])])]
    .sort((left, right) => [...right].length - [...left].length || left.localeCompare(right));
}

function phrasePatternFor(locale) {
  const alternatives = termsFor(locale).map(escapeRegExp).join('|');
  return new RegExp(`(?:${folioPattern}|${alternatives}|${technicalMeasurementPattern}|${datePattern}|${ordinalPattern}|${quantityPattern}|${demonstrativeQuantityPattern})(?:${trailingPunctuationPattern})*`, 'gu');
}

function keep(value, kind) {
  return `<span class="cjk-keep cjk-keep--${kind}">${value}</span>`;
}

function localeFromLang(value, fallback) {
  value = String(value || '').toLowerCase();
  if (value === 'zh-hans' || value === 'zh-cn') return 'zh-cn';
  if (value === 'zh-hant' || value === 'zh-tw') return 'zh-tw';
  return fallback;
}

function langAttributeFromTag(markup) {
  let cursor = 1;
  while (/\s/.test(markup[cursor] || '')) cursor += 1;
  if (markup[cursor] === '/') cursor += 1;
  while (/\s/.test(markup[cursor] || '')) cursor += 1;
  while (/[\w:-]/.test(markup[cursor] || '')) cursor += 1;
  while (cursor < markup.length) {
    while (/\s/.test(markup[cursor] || '')) cursor += 1;
    if (!markup[cursor] || markup[cursor] === '>' || markup[cursor] === '/') break;
    const nameStart = cursor;
    while (markup[cursor] && !/[\s=/>]/.test(markup[cursor])) cursor += 1;
    const name = markup.slice(nameStart, cursor).toLowerCase();
    while (/\s/.test(markup[cursor] || '')) cursor += 1;
    let value = '';
    if (markup[cursor] === '=') {
      cursor += 1;
      while (/\s/.test(markup[cursor] || '')) cursor += 1;
      const quote = markup[cursor] === '"' || markup[cursor] === "'" ? markup[cursor++] : '';
      const valueStart = cursor;
      if (quote) {
        while (markup[cursor] && markup[cursor] !== quote) cursor += 1;
        value = markup.slice(valueStart, cursor);
        if (markup[cursor] === quote) cursor += 1;
      } else {
        while (markup[cursor] && !/[\s>]/.test(markup[cursor])) cursor += 1;
        value = markup.slice(valueStart, cursor);
      }
    }
    if (name === 'lang') return value;
  }
  return '';
}

function protectSegmentedText(value, segmenter) {
  const parts = [...segmenter.segment(value)];
  let result = '';
  let singleHanRun = '';
  const flushSingleHanRun = () => {
    if (!singleHanRun) return;
    result += [...singleHanRun].length > 1 ? keep(singleHanRun, 'word') : singleHanRun;
    singleHanRun = '';
  };
  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    const length = [...part.segment].length;
    if (part.isWordLike && singleHanPattern.test(part.segment) && !singleWordBoundaries.has(part.segment)) {
      singleHanRun += part.segment;
      continue;
    }
    flushSingleHanRun();
    if (part.isWordLike && length > 1 && hanPattern.test(part.segment)) {
      let protectedValue = part.segment;
      while (new RegExp(`^${trailingPunctuationPattern}$`, 'u').test(parts[index + 1]?.segment || '')) {
        protectedValue += parts[index + 1].segment;
        index += 1;
      }
      result += keep(protectedValue, 'word');
    } else {
      result += part.segment;
    }
  }
  flushSingleHanRun();
  return result;
}

export function protectCjkText(value, locale) {
  if (!protectedTermsByLocale[locale]) return value;
  const hasProtectedTerm = termsFor(locale).some((term) => value.includes(term));
  const hasTechnicalMeasurement = new RegExp(technicalMeasurementPattern, 'u').test(value);
  if (!hanPattern.test(value) && !hasProtectedTerm && !hasTechnicalMeasurement) return value;
  const segmenter = new Intl.Segmenter(locale === 'zh-tw' ? 'zh-Hant' : 'zh-Hans', { granularity: 'word' });
  const pattern = phrasePatternFor(locale);
  let result = '';
  let cursor = 0;
  for (const match of value.matchAll(pattern)) {
    result += protectSegmentedText(value.slice(cursor, match.index), segmenter);
    result += keep(match[0], 'phrase');
    cursor = match.index + match[0].length;
  }
  return result + protectSegmentedText(value.slice(cursor), segmenter);
}

function readMarkup(value, start) {
  if (value[start] !== '<') return null;
  if (value.startsWith('<!--', start)) {
    const close = value.indexOf('-->', start + 4);
    return { end: close === -1 ? value.length : close + 3, name: '', closing: false, selfClosing: true };
  }
  let cursor = start + 1;
  if (value[cursor] === '!' || value[cursor] === '?') {
    let quote = '';
    for (cursor += 1; cursor < value.length; cursor += 1) {
      const char = value[cursor];
      if (quote) {
        if (char === quote) quote = '';
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (char === '>') {
        return { end: cursor + 1, name: '', closing: false, selfClosing: true };
      }
    }
    return { end: value.length, name: '', closing: false, selfClosing: true };
  }
  while (/\s/.test(value[cursor] || '')) cursor += 1;
  const closing = value[cursor] === '/';
  if (closing) {
    cursor += 1;
    while (/\s/.test(value[cursor] || '')) cursor += 1;
  }
  const nameMatch = value.slice(cursor).match(/^([A-Za-z][\w:-]*)/);
  if (!nameMatch) return null;
  const name = nameMatch[1].toLowerCase();
  cursor += nameMatch[1].length;
  let quote = '';
  for (; cursor < value.length; cursor += 1) {
    const char = value[cursor];
    if (quote) {
      if (char === quote) quote = '';
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '>') {
      const raw = value.slice(start, cursor + 1);
      return {
        end: cursor + 1,
        name,
        closing,
        lang: closing ? '' : langAttributeFromTag(raw),
        selfClosing: /\/\s*>$/.test(raw) || voidTags.has(name)
      };
    }
  }
  return null;
}

export function protectCjkHtml(html, locale) {
  if (!protectedTermsByLocale[locale]) return html;
  const bodyStart = html.search(/<body\b/i);
  const bodyEnd = html.toLowerCase().lastIndexOf('</body>');
  if (bodyStart === -1 || bodyEnd === -1 || bodyEnd <= bodyStart) return html;
  const bodyMarkup = readMarkup(html, bodyStart);
  if (!bodyMarkup) return html;
  const openEnd = bodyMarkup.end;
  const prefix = html.slice(0, openEnd);
  const body = html.slice(openEnd, bodyEnd);
  const suffix = html.slice(bodyEnd);
  const stack = [];
  let output = '';
  let cursor = 0;
  while (cursor < body.length) {
    const rawTextName = stack.at(-1)?.rawTextName;
    if (rawTextName) {
      const closingPattern = new RegExp(`<\\/\\s*${escapeRegExp(rawTextName)}\\s*>`, 'ig');
      closingPattern.lastIndex = cursor;
      const closingMatch = closingPattern.exec(body);
      if (!closingMatch) {
        output += body.slice(cursor);
        break;
      }
      if (closingMatch.index > cursor) {
        output += body.slice(cursor, closingMatch.index);
        cursor = closingMatch.index;
        continue;
      }
    }
    if (body[cursor] !== '<') {
      const next = body.indexOf('<', cursor);
      const end = next === -1 ? body.length : next;
      const token = body.slice(cursor, end);
      if (stack.some((entry) => entry.skip)) {
        output += token;
      } else {
        const activeLocale = stack.at(-1)?.locale || locale;
        const directParent = stack.at(-1)?.name;
        if ((directParent === 'button' || directParent === 'a') && hanPattern.test(token) && [...token.trim()].length <= 12) {
          const leading = token.match(/^\s*/)?.[0] || '';
          const trailing = token.match(/\s*$/)?.[0] || '';
          output += `${leading}${keep(token.trim(), 'control')}${trailing}`;
        } else {
          output += protectCjkText(token, activeLocale);
        }
      }
      cursor = end;
      continue;
    }
    const markup = readMarkup(body, cursor);
    if (!markup) {
      output += '<';
      cursor += 1;
      continue;
    }
    const token = body.slice(cursor, markup.end);
    output += token;
    const { closing, lang, name, selfClosing } = markup;
    if (name && closing) {
      const index = stack.map((entry) => entry.name).lastIndexOf(name);
      if (index !== -1) stack.splice(index);
    } else if (name && !selfClosing) {
      const inheritedLocale = stack.at(-1)?.locale || locale;
      stack.push({
        name,
        locale: localeFromLang(lang, inheritedLocale),
        rawTextName: rawTextTags.has(name) ? name : '',
        skip: skipTags.has(name) || stack.some((entry) => entry.skip)
      });
    }
    cursor = markup.end;
  }
  return `${prefix}${output}${suffix}`;
}

export function stripCjkProtectionMarkup(value) {
  return value.replace(/<span class="cjk-keep cjk-keep--(?:control|phrase|word)">([^<]*)<\/span>/g, '$1');
}

export const cjkProtectedTerms = Object.freeze({
  'zh-tw': Object.freeze(termsFor('zh-tw')),
  'zh-cn': Object.freeze(termsFor('zh-cn'))
});
