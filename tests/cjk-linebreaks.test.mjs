import test from 'node:test';
import assert from 'node:assert/strict';
import { languages, pages } from '../src/content.mjs';
import { cjkProtectedTerms, protectCjkHtml, protectCjkText, stripCjkProtectionMarkup } from '../src/cjk-linebreak.mjs';
import { renderPage } from '../src/template.mjs';

function removeProtectionMarkup(value) {
  return stripCjkProtectionMarkup(value);
}

test('multiport charger guide keeps native power-sharing terms copyable', () => {
  const terms = {
    'zh-tw': ['多孔 USB-C 充電器', '功率怎麼分', '功率分配表', 'USB-C 埠組', '帶載插拔測試', '原廠手冊', '互通性測試', '硬重設'],
    'zh-cn': ['多口 USB-C 充电器', '如何分配功率', '功率分配表', 'USB-C 端口组', '带载插拔', '原厂手册', '互操作测试', '硬复位']
  };
  for (const [locale, phrases] of Object.entries(terms)) {
    for (const phrase of [...phrases, 'APD-V140AC2-BK']) {
      const text = phrase + '。';
      const protectedText = protectCjkText(text, locale);
      assert.ok(protectedText.includes('>' + text + '</span>'), locale + ': ' + phrase);
      assert.equal(removeProtectionMarkup(protectedText), text);
    }
  }
});

test('Hukou report preserves plant names and circuit-board material terms', () => {
  const terms = {
    'zh-tw': ['松下湖口廠', '兩名員工罹難', '兩人失聯', '五人送醫', '台灣松下多層材料', '多層印刷電路板', 'IC 載板用材料', '新竹產業園區', '恢復出貨時程', '路旁招牌', '湖口交流道', '接獲通報'],
    'zh-cn': ['松下湖口工厂', '两名员工遇难', '两人失联', '五人送医', '台湾松下多层材料', '多层印制电路板', 'IC 载板用材料', '新竹产业园区', '恢复发货', '路旁标识', '湖口立交', '接到报警']
  };
  for (const [locale, phrases] of Object.entries(terms)) {
    for (const phrase of phrases) {
      const text = phrase + '。';
      const result = protectCjkText(text, locale);
      assert.ok(result.includes('>' + text + '</span>'), locale + ': ' + phrase);
      assert.equal(removeProtectionMarkup(result), text);
    }
  }
});

test('BSMI guide preserves native certificate and label terminology', () => {
  const terms = {
    'zh-tw': ['電源轉接器', '轉接器型號', '商品檢驗標識使用辦法', '驗證登錄證書', 'R 字軌', '系列型式', '授權放行通知書', '核對紀錄', '辦理通關'],
    'zh-cn': ['电源适配器', '适配器型号', '商品驗證登錄辦法', '验证登录证书', 'R 字轨', '系列型式', '授权放行通知书', '核对记录', '办理通关']
  };
  for (const [locale, phrases] of Object.entries(terms)) {
    for (const phrase of phrases) {
      const text = phrase + '。';
      const protectedText = protectCjkText(text, locale);
      assert.ok(protectedText.includes('>' + text + '</span>'), locale + ': ' + phrase);
      assert.equal(removeProtectionMarkup(protectedText), text);
    }
  }
});

test('Helios article keeps rack delivery terminology and names copyable', () => {
  const nativeTerms = {
    'zh-tw': ['Helios 機櫃上線', '整合進機櫃', '整櫃交付', '大量出貨', '資料中心', '現場驗收', '蘇姿丰'],
    'zh-cn': ['Helios 机柜投运', '集成在机柜中', '整柜到货', '批量发货', '数据中心', '验收投运', '苏姿丰']
  };
  for (const [locale, terms] of Object.entries(nativeTerms)) {
    for (const term of [...terms, 'AMD Helios', 'MI455X', 'Oracle Cloud Infrastructure']) {
      const text = term + '。';
      const html = protectCjkText(text, locale);
      assert.ok(html.includes('>' + text + '</span>'), locale + ': ' + term);
      assert.equal(removeProtectionMarkup(html), text);
    }
  }
});

test('DDP quotation context preserves native import compounds and copyable trade terms', () => {
  const cases = [
    ['zh-tw', 'DDP 充電器報價：交貨與清關。進口清關安排、卸貨費用、履行證據與所有權移轉。Incoterms® 2020。', ['DDP 充電器報價：', '交貨與清關。', '進口清關安排、', '卸貨費用、', '履行證據', '所有權移轉。', 'Incoterms® 2020。']],
    ['zh-cn', 'DDP 充电器报价：交货与清关。指定交货地点、进口清关责任、卸货费用与履行单证。Incoterms® 2020。', ['DDP 充电器报价：', '交货与清关。', '指定交货地点、', '进口清关责任、', '卸货费用', '履行单证。', 'Incoterms® 2020。']]
  ];
  for (const [locale, text, phrases] of cases) {
    const html = protectCjkText(text, locale);
    assert.equal(removeProtectionMarkup(html), text);
    for (const phrase of phrases) assert.ok(html.includes('>' + phrase + '</span>'), locale + ': ' + phrase);
  }
  for (const [locale, text, phrase] of [['zh-tw', '比較報價與單證，先釐清責任。', '單證，'], ['zh-cn', 'DDP 报价与单证，不对具体国家的现行海关要求作判断。', '单证，']]) {
    const html = protectCjkText(text, locale);
    assert.equal(removeProtectionMarkup(html), text);
    assert.ok(html.includes('>' + phrase + '</span>'), locale + ': punctuation follows the complete document term');
  }
});

test('Besi investment news keeps company names and native process terms intact without changing copy', () => {
  const terms = {
    'zh-tw': ['應用材料', '擬增持', '先進封裝', '股份交付', '反托拉斯', '等待期', '晶圓製程', '晶粒放置', '混合鍵合', '熱壓鍵合', '製程銜接', '潔淨度', '客戶認可', '驗收節點', '聖塔克拉拉'],
    'zh-cn': ['应用材料', '增持', '先进封装', '股份交付', '反垄断', '等待期', '晶圆加工', '芯片放置', '混合键合', '热压键合', '工序衔接', '清洁度', '客户验证', '验收节点', '圣克拉拉']
  };
  for (const [locale, values] of Object.entries(terms)) for (const term of [...values, 'Applied Materials', 'Besi', 'EPIC Center', 'Maydan Technology Center', 'Olaf2']) {
    const text = term + '。';
    const html = protectCjkText(text, locale);
    assert.ok(html.includes('>' + text + '</span>'), locale + ': ' + term);
    assert.equal(removeProtectionMarkup(html), text);
  }
  const overlapCases = {
    'zh-tw': [['公告與股份交付完成仍有差別。', '股份交付完成'], ['多種晶片整合架構。', '晶片整合架構']],
    'zh-cn': [['应用材料的晶圆加工能力与组装技术。', '晶圆加工能力'], ['芯片放置精度需要匹配清洁度。', '芯片放置精度'], ['不同芯片集成架构。', '芯片集成架构']]
  };
  for (const [locale, cases] of Object.entries(overlapCases)) for (const [text, compound] of cases) {
    const html = protectCjkText(text, locale);
    assert.ok(html.includes('>' + compound), locale + ': overlap must preserve ' + compound);
    assert.equal(removeProtectionMarkup(html), text);
  }
});

test('EU BTI pages preserve native customs terms and related technical revision labels', () => {
  const native = {
    'zh-tw': ['歐盟 BTI 決定', '如何對回充電器進口', '稅則分類決定', '稅則分類', '決定持有人', '貨品描述', '報關資料', '目前效力', '有效期間', '行政指引', '機密商業資訊', '預計申報日期', '到岸成本', '再把貨品描述', '對回規格', '準備出貨時', '再看效力', '本文查閱範圍'],
    'zh-cn': ['欧盟 BTI 决定', '怎样对应充电器进口', '税则归类决定', '税则归类', '决定持有人', '货物描述', '申报资料', '有效状态', '有效期间', '行政指引', '保密商业资料', '计划申报日期', '到岸成本', '持有人是谁', '先核清楚', '货物描述与规格', '怎样衔接', '把有效状态', '接到本票申报', '本票申报', '本文查阅范围']
  };
  native['zh-tw'].push('深圳媽灣港', '物流情境', '等比縮圖', '這批貨', '稅號');
  native['zh-cn'].push('深圳妈湾港', '等比缩放', '主管机关', '认定', '税号', '本票申报资料');
  for (const [locale, terms] of Object.entries(native)) for (const term of [...terms, 'BTI', 'EBTI', 'EORI', 'TARIC', '3.2 Version 1.2']) {
    const text = `${term}。`;
    const html = protectCjkText(text, locale);
    assert.ok(html.includes(`>${text}</span>`), `${locale}: ${term}`);
    assert.equal(removeProtectionMarkup(html), text);
  }
  for (const locale of Object.keys(native)) {
    const title = 'USB-IF 上架 USB PD 3.2 Version 1.2：';
    const html = protectCjkText(title, locale);
    assert.ok(html.includes('>3.2 Version 1.2：</span>'), 'revision label must not be parsed as 3.2 V');
    assert.equal(removeProtectionMarkup(html), title);
  }
});

test('helium news protects native policy, processing and transport terminology', () => {
  assert.ok(protectCjkText('產能公告。', 'zh-tw').includes('>產能公告。</span>'));
  assert.ok(protectCjkText('投產與交付。', 'zh-tw').includes('>投產與交付。</span>'));
  assert.ok(protectCjkText('产能公告。', 'zh-cn').includes('>产能公告。</span>'));
  assert.ok(protectCjkText('实际进展。', 'zh-cn').includes('>实际进展。</span>'));
  assert.ok(protectCjkText('材料组成。', 'zh-cn').includes('>材料组成。</span>'));
  assert.ok(protectCjkText('工業供應就緒。', 'zh-tw').includes('>工業供應就緒。</span>'));
  assert.ok(protectCjkText('許可。', 'zh-tw').includes('>許可。</span>'));
  assert.ok(protectCjkText('许可。', 'zh-cn').includes('>许可。</span>'));
  for (const [locale, terms] of Object.entries({'zh-tw':['冷卻','微影','洩漏偵測','晶片製造','成品晶片','資源條件','穩定供應'],'zh-cn':['冷却','光刻','检漏','芯片制造','成品芯片','芯片制造环节']})) for (const term of [...terms,'David Isaacs']) assert.ok(protectCjkText(term+'。', locale).includes('>'+term+'。</span>'));
  const samples = {
    'zh-tw': ['美國將氦列為', '精煉產能成焦點', '美國能源部', '關鍵材料', '精煉產能', '半導體製造', '液氦', '杜瓦容器', '運輸容器', '壓力表', '補助核定', '許可時程', '聯邦公報', '工業供應', '設施啟用', '持續產出', '廠區庫存', '新增產量', '可靠供應'],
    'zh-cn': ['美国将氦列为', '精炼能力', '受到关注', '美国能源部', '关键材料', '半导体制造', '液氦', '杜瓦容器', '运输容器', '压力表', '资金获批', '资源储备', '许可周期', '联邦公报', '地下资源', '投入运行', '持续产出', '资金批复', '可靠供应']
  };
  for (const [locale, terms] of Object.entries(samples)) for (const term of [...terms, 'DOE', 'AP', 'Adville', 'UN 1963']) {
    const text = term + '。';
    const html = protectCjkText(text, locale);
    assert.ok(html.includes('>' + text + '</span>'), locale + ': ' + term);
    assert.equal(removeProtectionMarkup(html), text);
  }
});

test('yttrium equipment-material news keeps native Chinese technical phrases intact', () => {
  for (const [locale, terms] of Object.entries({'zh-tw':['電子製造','官員姓名','未披露','具體實例'],'zh-cn':['电子制造','官员姓名','未披露','具体用途','芯片成分','普遍说明']})) for (const term of terms) {
    assert.ok(protectCjkText(term + '。', locale).includes('>' + term + '。</span>'));
    assert.equal(removeProtectionMarkup(protectCjkText(term, locale)), term);
  }
  const samples = {"zh-tw":["日本官員稱","釔供應受阻","設備材料成焦點","釔供應","半導體設備材料","含釔塗層","釔金屬","氧化釔","經產省","法新社","出貨延誤","出口管制","設備零件","設備材料","關鍵礦產","供應恢復","供應中斷","庫存稽核","庫存估計","庫存總量","政策表態","可用塗層","可用零件","材料流量","後段加工","指定化合物","塗層製程","設備腔體","腔體頂板","蝕刻","沉積","載台","耐電漿","微粒","加工安排","替代來源認可","設備適用性認可","供應方","受影響訂單","實際交付","原始統計","逐字稿","不具名","資料照"],"zh-cn":["日本官员称","钇供应受阻","关注设备材料","钇供应","半导体设备材料","含钇涂层","钇金属","氧化钇","经济产业省","法新社","交付延误","出口管制","设备部件","设备材料","关键矿产","供货恢复","供应中断","库存倒计时","库存估计","政策表态","可用部件","材料流量","指定化合物","涂层工艺","设备腔体","腔体顶板","刻蚀","沉积","载台","耐等离子体","颗粒","加工能力","合格替代来源","设备适用性","恢复时间表","受影响订单","实际交付","统计原表","记者会记录","不具名","资料照片"]};
  for (const [locale, terms] of Object.entries(samples)) for (const term of [...terms, 'AFP', 'AGC', 'Y2O3', 'Y5O4F7', 'Jan Anskeit']) {
    const text = term + '。';
    const rendered = protectCjkText(text, locale);
    assert.ok(rendered.includes('>' + text + '</span>'), locale + ': ' + term);
    assert.equal(removeProtectionMarkup(rendered), text);
  }
});

test('supplier payment-change terms retain independent Traditional and Simplified Chinese phrasing', () => {
  for (const [locale, clauses] of Object.entries({
    'zh-tw': ['先核准變更', '再安排付款'],
    'zh-cn': ['先审批变更', '再处理付款']
  })) for (const clause of clauses) assert.ok(protectCjkText(clause, locale).includes('>' + clause + '</span>'));
  assert.ok(protectCjkText('但不證明帳戶所有權。', 'zh-tw').includes('>帳戶所有權。</span>'));
  for (const [locale, terms] of Object.entries({
    'zh-tw': ['郵件往來', '郵件對話', '預防指引', '防範指引', '商業理由', '付款安排', '內部審查', '變更內容'],
    'zh-cn': ['邮件往来', '业务对话', '防范指引', '预防指引', '商业理由', '付款安排', '内部审查', '变更内容']
  })) for (const term of terms) {
    const rendered = protectCjkText(term + '。', locale);
    assert.ok(rendered.includes('>' + term + '。</span>'), locale + ': ' + term);
    assert.equal(removeProtectionMarkup(rendered), term + '。');
  }
  const samples = {"zh-tw":["供應商更換收款帳戶","付款前怎麼核對","供應商收款資料變更","收款帳戶","收款資料","付款指示","付款程序","付款核准","付款階段","付款依據","變更請求","獨立確認","內部核准","獨立聯絡","獨立來源","聯絡管道","聯絡電話","聯絡方式","確認管道","確認紀錄","確認對象","核對內容","簽約方","簽約公司","收款人","帳戶所有權","帳號識別資料","商務郵件詐騙","既有郵件","原有郵件","原始請求","原先核准","付款資料變更","供應商資料","供應商檔案","雙人覆核","財務資訊","財務資料","財務狀況","匯款銀行","匯款","帳號","帳戶","簽核","回撥","訂金","尾款","幣別","網域","信箱","償付能力","代管款項","追款服務","指定人員","有權責者","單一管道","說清楚","夾帶","獲授權","受控紀錄"],"zh-cn":["供应商变更收款账户","付款前如何核实","供应商收款信息变更","收款账户","收款信息","付款指令","付款程序","付款流程","付款审批","付款节点","变更申请","独立确认","内部审批","独立渠道","独立来源","联系渠道","联系方式","联系资料","确认记录","确认事项","核实字段","核实时间","核验","核实","合同主体","收款方","账户归属","账户识别信息","商业邮件诈骗","已有邮件","原邮件链","邮件链","原始通知","付款资料","供应商档案","双人审核","财务信息","财务资料","汇出银行","汇款","账户","账号","签批","核准","订金","尾款","币种","邮箱","偿付能力","资金托管","追款服务","指定人员","工作需要","单一信息源","妥善保存","印章","盖章通知","已被入侵"]};
  for (const [locale, terms] of Object.entries(samples)) {
    for (const term of [...terms, 'FBI', 'IC3', 'Report Fraud', 'Pixabay', 'BEC']) {
      const text = term + '。';
      const rendered = protectCjkText(text, locale);
      assert.ok(rendered.includes('>' + text + '</span>'), locale + ': ' + term);
      assert.equal(removeProtectionMarkup(rendered), text);
    }
  }
});

test('Erlangen industrial AI keeps independently edited Chinese technical terms intact', () => {
  // Shorter overlapping terms must remain intact inside these complete compounds.
  const compounds = {
    'zh-tw': ['生產規劃人員', '視覺檢測準備'],
    'zh-cn': ['生产计划人员', '视觉检测准备']
  };
  const samples = {
    'zh-tw': ["分開看","編輯判讀","提前準備","前移","持續運作","新產品","實體電路板","檢測訓練影像","電子工廠","視覺系統","工廠 AI","投產準備","實體樣機","視覺檢測","數位分身","生產排程","工廠自動化","工程投入","訓練影像","檢測準備","自動化比例","代理式","生產規劃","關鍵績效指標","規劃人員","新產品導入","辨識能力","缺陷檢出","誤報","比較基準","候選方案","運作條件","模型維護","廠區","產線","電路板","組件","投產","自動化","製造決策","並行","逼真影像","檢測就緒","實際運作","歷史照片","提早取得","接下來值得觀察","仍待確認的資訊","工廠 AI 與投產準備"],
    'zh-cn': ["分开理解","编辑判断","提前准备","持续生产","新产品","实体电路板","合成影像","电子工厂","视觉系统","生产规划","西门子","英伟达","埃尔朗根","工厂 AI","工业 AI","投产准备","实体样机","视觉检测","数字孪生","生产排程","工厂自动化","工程投入","训练影像","检测准备","生产计划","计划人员","自动化愿景","绩效影响","适用产品","电路板","漏检","误报","运行条件","模型维护","厂区","产线","组件","投产","自动化","制造决策","并行","逼真影像","检测就绪","实际运行","资料照片","生产准备","生产方案","代理式","后续观察重点","尚未披露的信息","工业 AI 与生产准备"]
  };
  const shared = ["30%–40%","70%–80%","Siemens","NVIDIA","PCB","Janericloebe","CC BY 3.0","Erlangen","Büchenbach","Gerätewerk","Cedrik Neike"];
  for (const [locale, nativeTerms] of Object.entries(samples)) {
    for (const term of [...compounds[locale], ...nativeTerms, ...shared]) {
      const rendered = protectCjkText(term, locale);
      assert.ok(rendered.includes(`>${term}</span>`), `${locale}: ${term}`);
      assert.equal(removeProtectionMarkup(rendered), term);
      assert.ok(protectCjkText(`${term}。`, locale).includes(`>${term}。</span>`), `${locale}: punctuation ${term}`);
    }
  }
});

test('instrument calibration evidence retains native Chinese measurement units', () => {
  for (const [locale, terms] of Object.entries({
    'zh-tw': ['不確定度', '追溯性', '校正日期', '實際儀器', '檢驗日期', '量測條件', '再校正間隔', '儀器穩定性', '環境影響'],
    'zh-cn': ['不确定度', '溯源性', '校准日期', '实际仪器', '检验日期', '测量条件', '再校准间隔', '设备稳定性', '环境因素']
  })) {
    for (const term of terms) {
      assert.ok(protectCjkText(`${term}。`, locale).includes(`>${term}。</span>`));
      assert.equal(removeProtectionMarkup(protectCjkText(`${term}。`, locale)), `${term}。`);
    }
  }
  for (const [locale, terms] of Object.entries({
    'zh-tw': ['調整前後', '量測數據', '準確度', '充電器測試系統', '充電器檢驗紀錄', '批次接收結論'],
    'zh-cn': ['调整前后', '测量数据', '充电器测试系统', '充电器检验记录', '批次接收结论']
  })) {
    for (const term of terms) {
      assert.ok(protectCjkText(`${term}。`, locale).includes(`>${term}。</span>`));
      assert.equal(removeProtectionMarkup(protectCjkText(`${term}。`, locale)), `${term}。`);
    }
  }
  const samples = {
    "zh-tw": [
      "儀器校正證書",
      "校正證書",
      "儀器校正",
      "校正紀錄",
      "校正項目",
      "校正點",
      "校正鏈",
      "完整校正鏈",
      "校正週期",
      "校正間隔",
      "校正歷史",
      "量測追溯性",
      "量測不確定度",
      "量測證據",
      "量測結果",
      "量測範圍",
      "量測過程",
      "量測需求",
      "量程",
      "示值",
      "參考值",
      "儀器序號",
      "儀器身分",
      "設備身分",
      "唯一序號",
      "使用期間",
      "檢驗期間",
      "充電器檢驗",
      "檢驗紀錄",
      "檢驗方法",
      "檢驗檔案",
      "允收限值",
      "直流電壓",
      "交流功能",
      "精度需求",
      "精密度",
      "符合性判定規則",
      "管理程序",
      "期間查核",
      "調整前後數據",
      "受影響量測",
      "送校時",
      "下次校正日期",
      "訂定",
      "熟悉",
      "如何對回",
      "支持依據",
      "校正涵蓋範圍"
    ],
    "zh-cn": [
      "仪器校准证书",
      "校准证书",
      "仪器校准",
      "校准记录",
      "校准项目",
      "校准点",
      "校准链",
      "完整校准链",
      "校准周期",
      "校准间隔",
      "校准历史",
      "计量溯源性",
      "测量不确定度",
      "测量依据",
      "测量结果",
      "测量项目",
      "测量过程",
      "测量需求",
      "量程",
      "示值",
      "参考值",
      "设备编号",
      "设备身份",
      "唯一序列号",
      "使用时段",
      "检验时段",
      "充电器检验",
      "检验记录",
      "检验方法",
      "检验档案",
      "接收限值",
      "直流电压",
      "交流功能",
      "精度需求",
      "准确度",
      "精密度",
      "符合性判定规则",
      "管理程序",
      "期间核查",
      "调整前后数据",
      "受影响结果",
      "送校状态",
      "下次校准日期",
      "制定",
      "熟悉",
      "怎样对应",
      "适用依据",
      "校准覆盖范围"
    ]
  };
  for (const [locale, terms] of Object.entries(samples)) {
    for (const term of [...terms, 'VIM', 'JCGM', 'BIPM', 'ILAC G24:2022']) {
      const rendered = protectCjkText(term, locale);
      assert.ok(rendered.includes(`>${term}</span>`), `${locale}: ${term}`);
      assert.equal(removeProtectionMarkup(rendered), term);
      assert.ok(protectCjkText(`${term}。`, locale).includes(`>${term}。</span>`), `${locale}: contextual ${term}`);
    }
    const title = locale === 'zh-tw' ? '儀器校正證書：如何對回充電器檢驗' : '仪器校准证书：怎样对应充电器检验';
    assert.equal(removeProtectionMarkup(protectCjkText(title, locale)), title);
  }
});

test('TSMC process ramp and platform mix retain independent Chinese reading units', () => {
  const samples = {
    'zh-tw': ['台積電', '晶圓五廠', '先進製程', '量產爬坡', '晶圓營收', '晶圓銷售金額', '營收占比', '商業貢獻', '高效能運算', '製程良率', '技術節點', '先進封裝', '分配量', '供貨承諾', '國際財務報導準則'],
    'zh-cn': ['台积电', '晶圆五厂', '先进工艺', '商业化进度', '晶圆收入', '收入结构', '收入占比', '销售贡献', '高性能计算', '生产良率', '技术节点', '先进封装', '产能配额', '交期承诺', '国际财务报告准则']
  };
  for (const [locale, terms] of Object.entries(samples)) {
    for (const term of [...terms, 'TSMC', 'HPC', 'TIFRS', 'Peellden', 'CC BY-SA 3.0', 'CTech']) {
      const rendered = protectCjkText(term, locale);
      assert.ok(rendered.includes(`>${term}</span>`), `${locale}: ${term}`);
      assert.equal(removeProtectionMarkup(rendered), term);
    }
    const title = locale === 'zh-tw' ? '台積電第三季：2 奈米占晶圓營收 8%' : '台积电三季度：2 纳米占晶圆收入 8%';
    assert.equal(removeProtectionMarkup(protectCjkText(title, locale)), title);
    const summary = locale === 'zh-tw' ? '2 奈米占晶圓銷售金額 8%，不等於晶圓產能。' : '2 纳米占晶圆收入 8%，不等于产能份额。';
    assert.equal(removeProtectionMarkup(protectCjkText(summary, locale)), summary);
    for (const quarter of locale === 'zh-tw' ? ['第二季', '第三季', '第四季'] : ['二季度', '三季度', '四季度']) {
      assert.ok(protectCjkText(quarter, locale).includes(`>${quarter}</span>`), `${locale}: ${quarter}`);
      const context = `${quarter}${locale === 'zh-tw' ? '資料' : '数据'}`;
      assert.ok(protectCjkText(context, locale).includes(`>${quarter}</span>`), `${locale}: quarter in context`);
    }
    for (const size of [2, 3, 5, 7]) {
      const term = `${size} ${locale === 'zh-tw' ? '奈米' : '纳米'}`;
      assert.ok(protectCjkText(term, locale).includes(`>${term}</span>`), `${locale}: ${term}`);
      const context = locale === 'zh-tw' ? `業績，${term}占晶圓收入` : `业绩，${term}占晶圆收入`;
      assert.ok(protectCjkText(context, locale).includes(`>${term}</span>`), `${locale}: measurement in context`);
    }
    const amounts = locale === 'zh-tw' ? ['467.2 億美元', '523 億', '543 億美元', '5 個百分點'] : ['467.2 亿美元', '523 亿', '543 亿美元', '5 个百分点'];
    for (const amount of amounts) {
      assert.ok(protectCjkText(amount, locale).includes(`>${amount}</span>`), `${locale}: ${amount}`);
      assert.ok(protectCjkText(`${amount}。`, locale).includes(`>${amount}。</span>`), `${locale}: amount with punctuation`);
    }
    if (locale === 'zh-tw') {
      for (const term of ['歷史示意', '當期產能', '電子產業', '供需走向']) assert.ok(protectCjkText(term, locale).includes(`>${term}</span>`));
      assert.ok(protectCjkText('整個電子產業的供需走向。', locale).includes('>供需走向。</span>'));
    }
  }
});

test('AQL lot-acceptance terminology preserves independent Chinese reading units', () => {
  const samples = {
    'zh-tw': ['抽樣驗收', '抽樣計畫', '樣本數', '允收數', '計數方式', '判定規則', '檢驗水準', '隨機抽取', '等機率', '不合格品', '不符合事項', '操作特性曲線', '接收機率', '整批貨', '零缺點', '出貨批次', '電子工作桌', '放行紀錄'],
    'zh-cn': ['抽样检验', '抽样方案', '样本量', '接收数', '计数口径', '判定规则', '检验水平', '随机选样', '等概率', '不合格品', '不合格数', '操作特性曲线', '接收概率', '整批货', '零缺陷', '批次追溯', '电子工作台', '放行依据']
  };
  for (const [locale, terms] of Object.entries(samples)) {
    const contextualTerms = locale === 'zh-tw' ? ['事後變更'] : ['选样责任人', '批次接收概率'];
    for (const term of [...terms, ...contextualTerms, 'AQL', 'ISO 2859-1:2026', 'ANSI/ASQ Z1.4-2003 (R2018)', 'ANSI/ASQ Z1.4', 'IT services EU']) {
      const result = protectCjkText(term, locale);
      assert.ok(result.includes(`>${term}</span>`), `${locale}: ${term}`);
      assert.equal(removeProtectionMarkup(result), term);
    }
    const title = locale === 'zh-tw' ? 'AQL 抽樣驗收：合格結果如何對回整批貨' : 'AQL 抽样检验：读懂批次接收结论';
    assert.equal(removeProtectionMarkup(protectCjkText(title, locale)), title);
    if (locale === 'zh-cn') {
      assert.ok(protectCjkText('不同质量水平下的批次接收概率。', locale).includes('>批次接收概率。</span>'));
    }
  }
});

test('ASML capacity and installed-tool upgrade terms keep native Chinese phrases intact', () => {
  const samples = {
    'zh-tw': ['微影設備', '低 NA EUV', '浸潤式 DUV', '高 NA EUV', '既有機台', '機台升級', '可用晶圓產能', '晶圓產能', '供給展望', '預期供給吃緊', '設備範圍', '產能增幅', '設備需求預測', '生產力升級', '現場選配', '淨銷售額', '升級收入', '吞吐量', '有效產出', '已裝機設備', '機台安裝', '製程認可', '穩定量產', '長期意向', '下單興趣', '下單意向', '供給路徑', '運輸貨櫃', '空運貨櫃', '加碼擴產', '產品配置', '機台驗收', '量產爬坡', '產能稽核', '管理階層', '擴產', '提效'],
    'zh-cn': ['光刻设备', '低 NA EUV', '浸没式 DUV', '高 NA EUV', '存量设备', '设备升级', '可用晶圆产能', '晶圆产能', '供给展望', '预期供应吃紧', '设备类别', '产能增幅', '设备需求预测', '生产率升级', '现场选配', '净销售额', '升级收入', '吞吐量', '有效产出', '已安装设备', '工艺认可', '稳定供货', '远期意向', '下单兴趣', '下单意向', '供给路径', '航空运输集装箱', '运输集装箱', '追加扩产', '设备验收', '量产爬坡', '管理层', '供需缺口', '工厂分配量', '扩产', '提效']
  };
  for (const [locale, terms] of Object.entries(samples)) {
    const contextualTerms = locale === 'zh-tw' ? ['既有機台升級', '微影機台', '營運排程', '等比例縮圖', '等比例縮放', '產出', '供貨', '報價'] : ['存量设备升级', '光刻机', '生产安排', '等比例缩放', '产出', '供货', '报价'];
    for (const term of [...terms, ...contextualTerms, 'ASML', 'Installed Base Management', '4300streetcar', 'CC BY 4.0']) {
      const result = protectCjkText(term, locale);
      assert.ok(result.includes(`>${term}</span>`), `${locale}: ${term}`);
      assert.equal(removeProtectionMarkup(result), term);
    }
    const sentence = locale === 'zh-tw' ? 'ASML 預期供給吃緊：擴產、升級並進。' : 'ASML 预期供应吃紧：扩产、升级并行。';
    assert.equal(removeProtectionMarkup(protectCjkText(sentence, locale)), sentence);
    const compound = locale === 'zh-tw' ? '既有機台升級' : '存量设备升级';
    const protectedCompound = protectCjkText(`${compound}的不同角色。`, locale);
    assert.ok(protectedCompound.includes(`>${compound}</span>`), `${locale}: overlapping upgrade terms`);
  }
});

test('China AEO enterprise grades and certificate terms stay intact in each Chinese locale', () => {
  const samples = {
    'zh-tw': ['企業信用管理', '海關身分', '企業認證', '企業證書', '企業信用', '信用等級', '高級認證企業', '認證企業', '常規企業', '失信企業', '嚴重失信企業', '經認證的經營者', '海關總署', '海關登記', '分支機構', '證書持有人', '存續企業', '實地認證', '守法規範', '貿易安全', '便利措施', '信用修復', '行政許可', '公示作廢', '交易角色', '換證紀錄', '證書換版', '產品資料', '媽灣港', '貨櫃車', '企業信用公示平台', '香港工業貿易署', '換版', '補發', '作廢'],
    'zh-cn': ['企业信用管理', '海关身份', '企业认证', '企业证书', '企业信用', '信用等级', '高级认证企业', '认证企业', '常规企业', '失信企业', '严重失信企业', '经认证的经营者', '海关总署', '海关登记', '分支机构', '证书持有人', '存续企业', '实地认证', '守法规范', '贸易安全', '便利措施', '信用修复', '行政许可', '公示作废', '订单角色', '产品资料', '证书换版', '资料照片', '妈湾港', '集装箱', '企业信用公示平台', '香港工业贸易署', '换发', '补发', '作废']
  };
  for (const [locale, terms] of Object.entries(samples)) {
    const productionTerms = locale === 'zh-tw' ? ['量產能力', '財務狀況', '內部控制', '產品測試報告', '縮圖', 'JPEG 壓縮', '認證移轉', '佐證文件', '目的市場', '不等於', '製造工廠'] : ['量产能力', '财务状况', '内部控制', '产品检测报告', '缩放', 'JPEG 压缩', '认证转移', '关联企业', '企业资质', '目标市场', '相关证书', '不等于', '生产工厂'];
    for (const term of [...terms, ...productionTerms, 'AEO', 'Dinkun Chen', 'CC BY-SA 4.0']) {
      const result = protectCjkText(term, locale);
      assert.ok(result.includes(`>${term}</span>`), `${locale}: ${term}`);
      assert.equal(removeProtectionMarkup(result), term);
    }
    const sentence = locale === 'zh-tw' ? '高級認證企業與認證企業，信用等級分開核對。' : '高级认证企业和认证企业，信用等级分别核对。';
    const rendered = protectCjkText(sentence, locale);
    assert.ok(rendered.includes(`>${terms[6]}</span>`), `${locale}: overlapping enterprise grade`);
    assert.equal(removeProtectionMarkup(rendered), sentence);
  }
});

test('SIA production-geography and second-source terms stay intact in both Chinese versions', () => {
  const samples = {
    'zh-tw': ['半導體產業協會', '晶片供應地圖', '總部所在地', '供應商總部', '實際製造地', '製造地', '總部口徑', '製造地口徑', '地理口徑', '統計口徑', '產業層級', '地理曝險', '第二來源', '製造路徑', '生產路徑', '實際製造鏈', '供應分散', '上游投入品', '實體備援', '上游瓶頸', '矽晶圓', '認可進度', '可用產能', '關鍵礦物', '韌性訊號'],
    'zh-cn': ['半导体行业协会', '芯片供应地图', '供应商总部', '生产地点', '地理来源', '统计口径', '总部统计', '行业层面', '第一层', '第二来源', '生产路径', '制造路径', '实际制造链', '上游依赖', '上游投入品', '实体冗余', '替代供给', '硅晶圆', '批准进度', '交付风险', '独立制造路径', '关键矿物', '国别数据']
  };
  for (const [locale, terms] of Object.entries(samples)) {
    for (const term of [...terms, locale === 'zh-tw' ? '南華早報' : '南华早报', 'SIA', 'McKinsey', 'Tier 1', 'Tier-n', '2x910']) {
      const result = protectCjkText(term, locale);
      assert.ok(result.includes(`>${term}</span>`), `${locale}: ${term}`);
      assert.equal(removeProtectionMarkup(result), term);
    }
    const combined = locale === 'zh-tw' ? '供應商總部統計' : '供应商总部统计';
    const sentence = locale === 'zh-tw' ? `按${combined}，美國、歐洲和日本合計占 95%。` : `按${combined}，美国、欧洲和日本合计占 95%。`;
    const protectedSentence = protectCjkText(sentence, locale);
    assert.ok(protectedSentence.includes(`>${combined}，</span>`), `${locale}: overlapping headquarters terms`);
    assert.equal(removeProtectionMarkup(protectedSentence), sentence);
  }
});

test('Samsung guidance and memory-market terminology stays intact in each Chinese locale', () => {
  const samples = {
    'zh-tw': ['三星電子', '第三季', '獲利預估', '合併營業利益', '正式財報', '記憶體需求', '記憶體市場', '法說會', '產品組合', '韓聯社', '韓元', '矽谷園區', '資本支出', '報價有效期', '交付條件', '外部查核', '事業別', '配貨表', '料號'],
    'zh-cn': ['三星电子', '三季度', '利润预估', '合并营业利润', '正式财报', '内存需求', '内存市场', '业绩说明会', '业绩预告', '产品组合', '韩联社', '韩元', '硅谷园区', '资本开支', '报价有效期', '交付条件', '外部审计', '业务拆分', '配货', '料号']
  };
  for (const [locale, terms] of Object.entries(samples)) {
    const financialTerms = locale === 'zh-tw' ? ['韓國國際財務報導準則', '稅後淨利', '營業利益口徑'] : ['韩国国际财务报告准则', '净利润', '营业利润口径'];
    for (const term of [...terms, ...financialTerms]) {
      const result = protectCjkText(term, locale);
      assert.ok(result.includes(`>${term}</span>`), `${locale}: ${term}`);
      assert.equal(removeProtectionMarkup(result), term);
    }
  }
});

test('Korean-won amounts keep each locale\'s scale and currency attached to the number', () => {
  for (const [locale, amounts] of Object.entries({
    'zh-tw': ['107.4 兆韓元', '195 兆韓元', '12.17 兆韓元', '500 韓元'],
    'zh-cn': ['107.4 万亿韩元', '195 万亿韩元', '12.17 万亿韩元', '500 韩元']
  })) for (const amount of amounts) {
    const result = protectCjkText(amount, locale);
    assert.ok(result.includes(`>${amount}</span>`), `${locale}: ${amount}`);
    assert.equal(removeProtectionMarkup(result), amount);
  }
});

test('CNAS report terminology is protected independently in both Chinese locales', () => {
  const samples = {
    'zh-tw': ['實驗室認可範圍', '非認可項目', '認可註冊號', '測試方法', '測試地點', '報告真偽', '樣品身分', '三用電表', '產品許可', '樣品對應關係'],
    'zh-cn': ['实验室认可范围', '非认可项目', '认可注册号', '检测方法', '检测地点', '报告真伪', '样品身份', '数字万用表', '产品许可', '样品对应关系']
  };
  for (const [locale, terms] of Object.entries(samples)) {
    for (const term of [...terms, 'ISO/IEC 17025', 'CNAS-R01']) {
      const result = protectCjkText(term, locale);
      assert.match(result, /cjk-keep/);
      assert.ok(result.includes(`>${term}</span>`), `${locale}: ${term}`);
      assert.equal(removeProtectionMarkup(result), term);
    }
  }
});

test('semantic protection preserves visible and copyable Chinese text', () => {
  const traditional = '找對人，查清楚，再確認產品。供應商說了什麼，只是第一層。';
  const simplified = '找对人，查清楚，再确认产品。供应商说了什么，只是第一层。';
  for (const [locale, value] of [['zh-tw', traditional], ['zh-cn', simplified]]) {
    const protectedText = protectCjkText(value, locale);
    assert.equal(removeProtectionMarkup(protectedText), value);
    assert.match(protectedText, /cjk-keep--phrase/);
    assert.match(protectedText, /第一[層层]/);
  }
});

test('HTML protection skips elements that cannot safely contain inline phrasing spans', () => {
  const source = '<!doctype html><html><body data-note="a>b中文"><div><h1>電源適配器</h1><p title="note lang=\'zh-Hans\'">電話與視訊訪查</p><select><option>電源適配器</option></select><textarea>供應商查核 1 < 2</textarea><svg><text>產品認證</text></svg><script>const marker = "</div>"; if (a < b) label = "第一層供應商";</script></div></body></html>';
  const result = protectCjkHtml(source, 'zh-tw');
  assert.match(result, /<body data-note="a>b中文">/);
  assert.match(result, /<h1><span class="cjk-keep cjk-keep--phrase">電源適配器<\/span><\/h1>/);
  assert.match(result, /<p title="note lang='zh-Hans'"><span class="cjk-keep cjk-keep--phrase">電話與視訊訪查<\/span><\/p>/);
  assert.match(result, /<option>電源適配器<\/option>/);
  assert.match(result, /<textarea>供應商查核 1 < 2<\/textarea>/);
  assert.match(result, /<svg><text>產品認證<\/text><\/svg>/);
  assert.match(result, /<script>const marker = "<\/div>"; if \(a < b\) label = "第一層供應商";<\/script>/);
  assert.doesNotMatch(result.match(/<script>[\s\S]*?<\/script>/)?.[0] || '', /cjk-keep/);
  assert.equal(removeProtectionMarkup(result), source);
});

test('all generated Chinese pages use the shared semantic line-break layer', () => {
  for (const locale of ['zh-tw', 'zh-cn']) {
    for (const page of pages) {
      const html = renderPage(locale, page.id);
      const head = html.slice(0, html.indexOf('</head>'));
      const body = html.slice(html.indexOf('<body'));
      assert.match(html, new RegExp(`<html lang="${languages[locale].htmlLang}"[^>]*data-layout="cjk"`));
      assert.doesNotMatch(head, /cjk-keep/);
      assert.match(body, /cjk-keep--(?:control|phrase|word)/, `${locale}/${page.id} has no semantic protection`);
      for (const match of body.matchAll(/<(option|textarea)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
        assert.doesNotMatch(match[2], /cjk-keep/);
      }
    }
  }
});

test('the protection layer is byte-for-byte reversible across every generated page', () => {
  for (const locale of Object.keys(languages)) {
    for (const page of pages) {
      const original = renderPage(locale, page.id, { protectCjk: false });
      const rendered = renderPage(locale, page.id);
      assert.equal(removeProtectionMarkup(rendered), original, `${locale}/${page.id} changed source text or markup`);
    }
  }
});

test('nested Chinese lang attributes select the matching locale dictionary', () => {
  const source = '<!doctype html><html><body><p>供應商與供应商</p><p lang="zh-Hans">供应商與智蒙灣</p><p lang="zh-Hant">供應商與智蒙灣</p></body></html>';
  const result = protectCjkHtml(source, 'zh-tw');
  assert.match(result, /<p lang="zh-Hans"><span class="cjk-keep cjk-keep--phrase">供应商<\/span>與<span class="cjk-keep cjk-keep--phrase">智蒙灣<\/span><\/p>/);
  assert.match(result, /<p lang="zh-Hant"><span class="cjk-keep cjk-keep--phrase">供應商<\/span>與<span class="cjk-keep cjk-keep--phrase">智蒙灣<\/span><\/p>/);
  assert.equal(removeProtectionMarkup(result), source);
});

test('known failure examples are protected as indivisible units in both locales', () => {
  const samples = {
    'zh-tw': ['再確認產品。', '電源適配器', 'AC／DC 電源裝置', '菱形 PSE 標誌', '特定電氣用品', '屆出事業者', '適合性檢查', '日本國內管理人', '型式分類', '充電器', '行動電源', '汽車啟動電源', '產品安全警告', '火災通報', '財物損失', '售後應變', '供應商', '物料清單', '供應商說法', '第一層', '第一次下單前', '品質管理系統', '驗證碼'],
    'zh-cn': ['再确认产品。', '电源适配器', 'AC／DC 电源装置', '菱形 PSE 标识', '特定电气用品', '届出事业者', '合格评定', '日本国内管理人', '型式分类', '充电器', '移动电源', '汽车启动电源', '产品安全警告', '火灾报告', '财产损失', '售后响应', '供应商', '物料清单', '供应商说法', '第一层', '第一次下单前', '质量管理体系', '验证码', '智蒙灣']
  };
  for (const [locale, terms] of Object.entries(samples)) {
    const html = protectCjkHtml(`<!doctype html><html><body><p>${terms.join('／')}</p></body></html>`, locale);
    for (const term of terms) {
      assert.match(html, new RegExp(`<span class="cjk-keep cjk-keep--(?:phrase|word)">${term}<\\/span>`));
    }
  }
});

test('alkaline-battery trade terms remain intact in both Chinese versions', () => {
  for (const [locale, terms] of Object.entries({
    'zh-tw': ['鹼性電池', '反傾銷調查', '海關登記', '不可充電', '圓柱形', 'CN 8506 10 11'],
    'zh-cn': ['碱性电池', '反倾销调查', '海关登记', '不可充电', '圆柱形', 'CN 8506 10 11']
  })) {
    const html = protectCjkHtml(`<!doctype html><html><body><p>${terms.join('、')}</p></body></html>`, locale);
    for (const term of terms) {
      assert.match(html, new RegExp(`<span class="cjk-keep cjk-keep--(?:phrase|word)">${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}、?<\\/span>`));
    }
  }
});

test('Korean KC record-check terms remain intact in both Chinese versions', () => {
  for (const [locale, terms] of Object.entries({
    'zh-tw': ['Safety Korea', 'RRA', 'KC', '國立電波研究院', '電氣用品安全紀錄', '符合性登錄', '基本型號', '衍生型號', '責任業者', '雙資料庫核對', '識別碼', '分別查'],
    'zh-cn': ['Safety Korea', 'RRA', 'KC', '国立电波研究院', '电气用品安全记录', '符合性登记', '基本型号', '派生型号', '责任企业', '双数据库核对', '识别码', '分别查']
  })) {
    const html = protectCjkHtml(`<!doctype html><html><body><p>${terms.join('、')}</p></body></html>`, locale);
    for (const term of terms) {
      assert.match(html, new RegExp(`<span class="cjk-keep cjk-keep--(?:phrase|word)">${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}、?<\\/span>`));
    }
  }
});

test('Cambridge Audio recall terms remain intact in both Chinese versions', () => {
  for (const [locale, terms] of Object.entries({
    'zh-tw': ['Cambridge Audio', 'Yoyo (M)', '可攜式藍牙喇叭', '鋰離子電池', '沒有批號', '售後處置', '批次排除條件', '追溯能力'],
    'zh-cn': ['Cambridge Audio', 'Yoyo (M)', '便携式蓝牙音箱', '锂离子电池', '没有批次号', '售后处置', '批次排除条件', '追溯能力']
  })) {
    const html = protectCjkHtml(`<!doctype html><html><body><p>${terms.join('、')}</p></body></html>`, locale);
    for (const term of terms) {
      assert.match(html, new RegExp(`<span class="cjk-keep cjk-keep--(?:phrase|word)">${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}、?<\\/span>`));
    }
  }
});

test('Magnachip and Navitas SiC investment terms remain intact in both Chinese versions', () => {
  for (const [locale, terms] of Object.entries({
    'zh-tw': ['碳化矽', '功率半導體', '韓國晶圓廠', '技術授權', '製程驗證', '量產良率'],
    'zh-cn': ['碳化硅', '功率半导体', '韩国晶圆厂', '技术许可', '制程验证', '量产良率']
  })) {
    const html = protectCjkHtml(`<!doctype html><html><body><p>${terms.join('、')}</p></body></html>`, locale);
    for (const term of terms) {
      assert.ok(html.includes(`<span class="cjk-keep cjk-keep--phrase">${term}`), `${locale} did not protect ${term}`);
    }
  }
});

test('India BIS CRS manufacturer and model-scope terms remain intact in both Chinese versions', () => {
  for (const [locale, terms] of Object.entries({
    'zh-tw': ['印度標準局（BIS）', '印度 BIS CRS', '強制註冊計畫（CRS）', '授權範圍', '登記製造單位', '實際工廠與完整型號', '銘牌與登記工廠地址', '授權印度代表（AIR）'],
    'zh-cn': ['印度标准局（BIS）', '印度 BIS CRS', '强制注册计划（CRS）', '许可范围', '登记制造单元', '实际工厂和完整型号', '铭牌与登记工厂地址', '授权印度代表（AIR）']
  })) {
    const html = protectCjkHtml(`<!doctype html><html><body><p>${terms.join('、')}</p></body></html>`, locale);
    for (const term of terms) {
      assert.ok(html.includes(`<span class="cjk-keep cjk-keep--phrase">${term}`), `${locale} did not protect ${term}`);
    }
  }
});

test('UAE launch headlines keep the closing comma with the place name in both Chinese versions', () => {
  for (const [locale, term] of [['zh-tw', '阿聯，'], ['zh-cn', '阿联，']]) {
    const html = protectCjkHtml(`<!doctype html><html><body><h2>MagGo 2 Pro 将于 10 月 7 日登陆${term}官方页面售价却不同</h2></body></html>`, locale);
    assert.ok(html.includes(`<span class="cjk-keep cjk-keep--phrase">${term}</span>`), `${locale} should keep the comma with the place name`);
  }
});

test('every audited dictionary term is emitted as one protected unit', () => {
  for (const locale of ['zh-tw', 'zh-cn']) {
    for (const term of cjkProtectedTerms[locale]) {
      const protectedText = protectCjkText(term, locale);
      assert.equal(removeProtectionMarkup(protectedText), term);
      assert.match(
        protectedText,
        new RegExp(`^<span class="cjk-keep cjk-keep--phrase">${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/span>$`),
        `${locale} did not protect ${term} as one unit`
      );
    }
  }
});

test('pure Latin technical names are protected without requiring adjacent Han text', () => {
  for (const term of [
    'Search Console',
    'USB-C',
    'FCC ID',
    'ISO 9001',
    'ZimonAI',
    'Power Bank 2 Pro',
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
    'Qi ID',
    'Test ID',
    'Type Ref.'
  ]) {
    assert.equal(protectCjkText(term, 'zh-tw'), `<span class="cjk-keep cjk-keep--phrase">${term}</span>`);
  }
});

test('ordinals and quantities keep their number and measure word together', () => {
  for (const [locale, values] of [
    ['zh-tw', ['第一層', '第 33 條', '兩款', '12 個', '三項', '7 天', '8 月', '9 月 17 日', '9 篇', '6 位數', '109.99 美元', '50–500 件', '3–5 頁', '4～8 週', '1,000–2,500 件', '1167號', '7樓', '24–48 小時', '60 分鐘']],
    ['zh-cn', ['第一层', '第 33 条', '两款', '12 个', '三项', '7 天', '8 月', '9 月 17 日', '9 篇', '18 位', '109.99 美元', '50–500 件', '3–5 个', '4～8 周', '1.5–2.0 年', '1167号', '7楼', '24–48 小时', '30 分钟']]
  ]) {
    for (const value of values) {
      assert.equal(
        protectCjkText(value, locale),
        `<span class="cjk-keep cjk-keep--phrase">${value}</span>`,
        `${locale} did not keep ${value} together`
      );
    }
  }
});

test('technical measurements keep their values and units together', () => {
  for (const value of ['10,000mAh', '25W', '0.1% w/w', '3.3V', '65°C']) {
    assert.equal(
      protectCjkText(value, 'zh-cn'),
      `<span class="cjk-keep cjk-keep--phrase">${value}</span>`,
      `did not keep ${value} together`
    );
  }
});

test('power-bank air-cargo terms preserve native phrases and UN identifiers', () => {
  for (const [locale, values] of [
    ['zh-tw', ['商業空運', '荷電狀態', '運輸識別號', '鋰離子電池', '額定容量', '包裝指示', '航空承運人', '貨件準備人員', '出貨資料', '單電芯電池', '電芯配置', '交期', '分開', '輸出瓦數', '貨件', '版面裁切', '訂艙', '條件', '化學種類', '電池化學種類', '運輸分類', '可追溯', '危險物品訓練', '防護包裝', '額定值', '包裝例外', 'UN 3480', 'UN 3481', 'PI 965', '49 CFR 173.185(c)(5)']],
    ['zh-cn', ['商业空运', '荷电状态', '运输识别号', '锂离子电池', '额定容量', '包装说明', '航空承运人', '货件准备人员', '运输资料', '装箱单', '单电芯电池', '电芯配置', '交期', '分开', '输出功率', '货件', '等比例缩放', '这票货', '条件', '版面裁剪', '化学类型', '电池化学类型', '运输分类', '可追溯', '危险品培训', '防护包装', '额定值', '包装例外', 'UN 3480', 'UN 3481', 'PI 965', '49 CFR 173.185(c)(5)']]
  ]) {
    for (const value of values) {
      const protectedText = protectCjkText(value, locale);
      assert.equal(removeProtectionMarkup(protectedText), value);
      assert.equal(protectedText, `<span class="cjk-keep cjk-keep--phrase">${value}</span>`);
      assert.equal(protectCjkText(`${value}。`, locale), `<span class="cjk-keep cjk-keep--phrase">${value}。</span>`);
    }
  }
  assert.equal(protectCjkText('Commercial air cargo under UN 3480.', 'en'), 'Commercial air cargo under UN 3480.');
  for (const [locale, word] of [['zh-tw', '基本條件'], ['zh-cn', '基本条件']]) {
    assert.equal(protectCjkText(`${word}。`, locale), `<span class="cjk-keep cjk-keep--phrase">${word}。</span>`);
  }
});

test('demonstratives and non-numeric quantifiers stay attached to their measure word', () => {
  for (const [locale, values] of [
    ['zh-tw', ['這款', '這張', '這家', '這筆', '這台', '每個', '每一個', '每款', '每篇', '每項', '本批']],
    ['zh-cn', ['这款', '这张', '这家', '这笔', '这台', '每个', '每一个', '每款', '每篇', '每项', '本批']]
  ]) {
    for (const value of values) {
      assert.equal(
        protectCjkText(value, locale),
        `<span class="cjk-keep cjk-keep--phrase">${value}</span>`,
        `${locale} did not keep ${value} together`
      );
    }
  }
});

test('closing punctuation stays with the semantic unit before it', () => {
  for (const [locale, value, expected] of [
    ['zh-tw', '符合性聲明，下一步', '符合性聲明，'],
    ['zh-tw', '插腳、電路板', '插腳、'],
    ['zh-cn', '欧盟联系地址，下一步', '欧盟联系地址，'],
    ['zh-cn', '后续换料、SCIP', '后续换料、'],
    ['zh-tw', '新品新聞 · 01', '新品新聞 · 01'],
    ['zh-cn', '新品新闻 · 01', '新品新闻 · 01']
  ]) {
    const protectedText = protectCjkText(value, locale);
    assert.equal(removeProtectionMarkup(protectedText), value);
    assert.match(
      protectedText,
      new RegExp(`<span class="cjk-keep cjk-keep--(?:phrase|word)">${expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/span>`),
      `${locale} left closing punctuation outside ${expected}`
    );
  }
});

test('visually reviewed summary phrases are protected without broad grammatical joining', () => {
  for (const [locale, phrases] of [
    ['zh-tw', [
      '25W 的 Qi2.2', '這項查核', '下一筆訂單', '相符紀錄時', '依特定標準',
      '範圍內的品質管理系統', '採購時', '一張快照', '外殼下的不同瓦數',
      '這份摘要', '若對不上', '這筆採購', '並以證書狀態', '只支持',
      '主體身分與狀態', '應比對', '這項查核的重點', '危險產品通報與矯正措施',
      '型號與篩選條件', '仍須搭配產品', 'CB 證書的價值', '供應商的管理主張',
      '這類文件應作為', '整體合規的結案依據',
      '指定樣品或均質材料', '受測物質與結果', '實際涵蓋的對象',
      'EU 符合性聲明與量產變更管制', '電路板或安全元件',
      '目前賣方與檔案持有人', '行動電源的當批內部配置',
      '供應商符合性聲明（SDoC）'
    ]],
    ['zh-cn', [
      '将 10,000mAh', '更不保证', '是先按产品功能', '先按产品功能', '或 SDoC',
      '经 Certification', '各组成物品的 0.1% w/w', '更不涵盖', '把摘要',
      '并以型号', '完整型号和设备类别', '主体一致性', '及物料清单版本', '它不是',
      '供应商符合性声明（SDoC）'
    ]]
  ]) {
    for (const phrase of phrases) {
      assert.equal(
        protectCjkText(phrase, locale),
        `<span class="cjk-keep cjk-keep--phrase">${phrase}</span>`,
        `${locale} did not keep ${phrase} as one reviewed phrase`
      );
    }
  }
});

test('single-character ICU segments are coalesced into local technical compounds', () => {
  for (const [locale, value, compounds] of [
    ['zh-tw', '風道、感測器與韌體、雙風道、獨立評測與合規', ['風道', '感測器', '韌體', '雙風道', '獨立評測', '合規']],
    ['zh-cn', '风道、传感器与固件、双风道、独立评测与合规', ['风道', '传感器', '固件', '双风道', '独立评测', '合规']]
  ]) {
    const protectedText = protectCjkText(value, locale);
    assert.equal(removeProtectionMarkup(protectedText), value);
    for (const compound of compounds) {
      assert.match(
        protectedText,
        new RegExp(`<span class="cjk-keep cjk-keep--(?:phrase|word)">${compound}<\\/span>`),
        `${locale} did not coalesce ${compound}`
      );
    }
  }
});

test('short Chinese link and button labels remain one flex-safe control unit', () => {
  const source = '<!doctype html><html><body><a class="button" href="/request">說明你的需求<svg></svg></a><button type="button">再確認產品</button></body></html>';
  const result = protectCjkHtml(source, 'zh-tw');
  assert.match(result, /<a class="button" href="\/request"><span class="cjk-keep cjk-keep--control">說明你的需求<\/span><svg><\/svg><\/a>/);
  assert.match(result, /<button type="button"><span class="cjk-keep cjk-keep--control">再確認產品<\/span><\/button>/);
  assert.equal(removeProtectionMarkup(result), source);
});

test('visually reviewed Chinese compounds remain indivisible regression units', () => {
  const reviewedTerms = {
    'zh-tw': [
      '電源', '物料', '說法', '第一層', '雙基地協作', '發表了什麼', '歐盟聯絡地址',
      '充電器工廠嗎', '哪一件事', '哪一種', 'FCC ID 嗎', 'IECEE CB 測試證書',
      'RoHS 測試報告', '製造商的符合性聲明', '背後的法律主體', '先確認服務範圍',
      '再進行付款', '已合規嗎', '案件資料', '把錢', '素材庫照片', '你正要做的決定', '先找出',
      '與電源電子', '電源電子供應鏈', '與電源電子供應鏈', '原始說法', '與資料來源',
      '方便就查哪個', '這款充電器', '就代表', '就能證明', '就能把', '能證明', '起算時間',
      '是中國供應商法律主體', '中國供應商法律主體', '中國供應商', '穩定識別基準', '官方公示紀錄',
      '可見的主體身分',
      '美加接連召回', '型號清單', '包裝型號', '零售版本', '市場 SKU', '退款管道', '處置管道',
      '召回物流', '召回範圍', '電芯供應商', '受影響批次', '生產批次', '內部配置',
      '技術根因', '逆向物流', '主管機關', '通路商',
      '看起來一致', '英文譯名', '郵件簽名',
      '而企業登記本身', '企業登記本身', '登記資料', '登記主體', '自有工廠', '具備足夠產能',
      '發票方', '收款方', '誰負責', '或一定履行', '一定履行', '會履行',
      '外接電源供應器', '能效驗證標誌', '羅馬數字標誌', '能源性能資料', '加拿大進口商',
      '認證機構紀錄', '電氣安全認證', '製造日期區間', '能源效率', '效率等級', '基本型號', '設計系列',
      '加州能源委員會', '電池充電器系統', '產品類別', '能效狀態', 'MAEDbS', 'Title 20', 'Approved', 'Archived',
      '主動模式效率', '無負載功耗', '美國進口商', '進口商要對上', '還要查什麼？',
      '認證責任方', '輸出電壓', '輸出電流',
      '適用門檻。', '歐盟電池回收目標', '廢電池回收效率', '材料回收目標',
      '鋰材料回收率', '電池處理產能', '處理產能', '回收效率', '材料回收', '廢電池',
      '鋰回收', '鋰回收承壓', '回收產線', '質量平衡紀錄',
      'WEEE 登記', '生產者登記', '打叉垃圾桶', '生產者紀錄', '延伸生產者責任'
    ],
    'zh-cn': [
      '电源', '物料', '说法', '第一层', '双基地协作', '发布了什么', '欧盟联系地址',
      '充电器工厂吗', '哪一件事', '哪一种', 'FCC ID 吗', 'IECEE CB 测试证书',
      'RoHS 测试报告', '制造商的符合性声明', '背后的法律主体', '先确认服务范围',
      '再进行付款', '已合规吗', '项目资料', '把钱', '素材库照片', '你正要做的决定', '先找出',
      '与电源电子', '电源电子供应链', '与电源电子供应链', '原始说法', '和信息来源',
      '方便就查哪个', '这款充电器', '就代表', '就能证明', '就能认为', '能证明', '起算时间',
      '是中国供应商法律主体', '中国供应商法律主体', '中国供应商', '稳定识别基准', '官方公示记录', '该主体',
      '平台店名或邮件签名', '签约方和收款方',
      '美加接连召回', '型号清单', '包装型号', '零售版本', '市场 SKU', '退款渠道', '处置渠道',
      '召回物流', '召回范围', '电芯供应商', '受影响批次', '生产批次', '内部配置',
      '技术根因', '逆向物流', '监管部门', '零售商',
      '容易混淆', '英文译名', '邮件签名',
      '而企业登记本身', '企业登记本身', '登记资料', '登记主体', '自有工厂',
      '发票方', '收款方', '谁负责', '或一定履行', '一定履行', '会履行订单', '会履行',
      '外部电源', '能效验证标志', '罗马数字标记', '能源性能信息', '加拿大进口商',
      '认证机构记录', '电气安全认证', '生产日期区间', '电源适配器', '能源效率', '效率等级', '基本型号', '设计系列',
      '加州能源委员会', '电池充电器系统', '产品类别', '能效状态', 'MAEDbS', 'Title 20', 'Approved', 'Archived',
      '工作模式效率', '空载功耗', '美国进口商', '进口商必须对应', '还要查什么？',
      '认证责任方', '输出电压', '输出电流',
      '适用限值。', '欧盟电池回收目标', '废电池回收效率', '材料回收目标',
      '锂材料回收率', '电池处理能力', '处理产能', '回收效率', '材料回收', '废电池',
      '锂回收', '锂回收承压', '回收产线', '质量平衡记录',
      'WEEE 注册', '生产者注册', '打叉垃圾桶', '生产者记录', '生产者延伸责任'
    ]
  };
  for (const [locale, terms] of Object.entries(reviewedTerms)) {
    for (const term of terms) {
      const protectedText = protectCjkText(term, locale);
      assert.equal(removeProtectionMarkup(protectedText), term);
      assert.match(
        protectedText,
        new RegExp(`^<span class="cjk-keep cjk-keep--(?:phrase|word)">${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/span>$`),
        `${locale} did not preserve the reviewed unit ${term}`
      );
    }
  }
});

test('grid layouts keep Chinese copy inside one structural child', () => {
  for (const locale of ['zh-tw', 'zh-cn']) {
    const requestHtml = renderPage(locale, 'request', { protectCjk: false });
    const aboutHtml = renderPage(locale, 'about', { protectCjk: false });
    const articleHtml = renderPage(locale, 'knowledge-rohs-test-report', { protectCjk: false });
    const legalHtml = renderPage(locale, 'paymentTerms', { protectCjk: false });
    assert.match(requestHtml, /<div><p class="kicker">[^<]+<\/p><ol>(?:<li><p>[^<]+<\/p><\/li>)+<\/ol><\/div>/);
    assert.match(aboutHtml, /registration-evidence__disclosure"><span class="registration-evidence__disclosure-mark"[^>]*>!<\/span><span class="registration-evidence__disclosure-copy">[^<]+<\/span><\/p>/);
    assert.match(aboutHtml, /office-evidence__disclosure reveal"><span class="office-evidence__disclosure-mark"[^>]*>—<\/span><span class="office-evidence__disclosure-copy">[^<]+<\/span><\/p>/);
    assert.match(articleHtml, /<li><span class="buyer-checklist__mark"[^>]*>✓<\/span><span class="buyer-checklist__text">[^<]+<\/span><\/li>/);
    assert.match(articleHtml, /<a href="#section-1"><span class="field-note__rail-no">01<\/span><span class="field-note__rail-title">[^<]+<\/span><\/a>/);
    assert.match(legalHtml, /<a href="#[^"]+-01"><span class="legal-toc__no">01<\/span><span class="legal-toc__title">[^<]+<\/span><\/a>/);
  }
});

test('footer address components keep city, district, road and building numbers intact', () => {
  const samples = {
    'zh-tw': ['深圳市', '前海深港合作區', '新北市', '中和區', '板南路', '100號', '7樓'],
    'zh-cn': ['深圳市', '前海深港合作区', '新北市', '中和区', '板南路', '100号', '7楼']
  };
  for (const [locale, values] of Object.entries(samples)) {
    const protectedText = protectCjkText(values.join('／'), locale);
    for (const value of values) {
      assert.match(
        protectedText,
        new RegExp(`<span class="cjk-keep cjk-keep--phrase">${value}<\\/span>`),
        `${locale} did not protect address component ${value}`
      );
    }
  }
});

test('PCN guide preserves native component-change and order-transition units', () => {
  const cases = {
    'zh-tw': ['零件變更通知', '產品／製程變更通知', '核准物料表', '整機評估', '整機評估範圍', '訂單切換安排', '充電器訂單', '回覆期限', '新舊料切換', '批次追溯', '電路板版本', '受影響料號', '這些證據', '不能證明什麼'],
    'zh-cn': ['元器件变更', '元器件', '原厂', '充电器订单', '采购订单', '产品／工艺变更通知', '已批准的物料清单', '整机评审', '通知时限', '新旧库存', '批次追溯', '电路板版本', '受影响料号', '这些证据', '不能证明什么', '不能说明什么']
  };
  for (const [locale, terms] of Object.entries(cases)) {
    for (const term of terms) {
      const result = protectCjkText(`${term}。`, locale);
      assert.equal(removeProtectionMarkup(result), `${term}。`);
      assert.match(result, new RegExp(`<span class="cjk-keep cjk-keep--(?:phrase|word)">${term}。<\\/span>`));
    }
  }
});

test('GTIN guide distinguishes complete native identification and packaging units', () => {
  const cases = {
    'zh-tw': { text: '核對生產工廠、產品編號與條碼前置碼，說明包裝層級、單件序號及編號分配方，作為產品身分的連結點。', units: ['生產工廠', '產品編號', '條碼前置碼', '包裝層級', '單件序號', '編號分配方', '連結點'] },
    'zh-cn': { text: '记录查询时间，核对包装标签照片和登记企业与工厂怎样对应，区分包装层级和单件序列号，说明编号分配方。', units: ['查询时间', '包装标签照片', '登记企业与工厂', '怎样对应', '包装层级', '单件序列号', '编号分配方'] }
  };
  for (const [locale, { text, units }] of Object.entries(cases)) {
    const protectedText = protectCjkText(text, locale);
    assert.equal(removeProtectionMarkup(protectedText), text);
    for (const unit of units) assert.match(protectedText, new RegExp(`>${unit}[，。、]?<\\/span>`), `${locale}: ${unit}`);
  }
});

test('English output is not rewritten by the Chinese line-break layer', () => {
  const html = '<!doctype html><html><body><p>Supplier verification</p></body></html>';
  assert.equal(protectCjkHtml(html, 'en'), html);
});

test('Memory supply news preserves native agreement and delivery terms', () => {
  const cases = {
  "zh-tw": [
    "SK hynix",
    "長期協議",
    "公開證據", "供貨資訊", "2027–2028 年", "需求能見度",
    "長期需求承諾",
    "產品配額",
    "價格區間",
    "交貨窗口",
    "價格檢討條件"
  ],
  "zh-cn": [
    "SK海力士",
    "长期协议",
    "公开证据", "供货信息", "2027–2028 年", "需求可见度",
    "长期需求承诺",
    "产品配额",
    "价格区间",
    "交货窗口",
    "签约覆盖率"
  ]
};
  for (const [locale, terms] of Object.entries(cases)) for (const term of terms) {
    const text = term + '。';
    const protectedText = protectCjkText(text, locale);
    assert.equal(removeProtectionMarkup(protectedText), text);
    assert.match(protectedText, new RegExp('>' + term + '。<\\/span>'), locale + ': ' + term);
  }
});


test('USB-C cable procurement keeps independent native power and data terms intact', () => {
  const cases = {
  "zh-tw": [
    "功率與傳輸速率", "線材", "瓦數", "報價品", "版面裁切", "MacBook Pro", "TID",
    "線材採購規格",
    "傳輸速率",
    "資料速率",
    "功率能力",
    "額定能力",
    "採購規格",
    "接頭體系",
    "接頭形式",
    "充電線",
    "插頭外形",
    "認證計畫",
    "商標授權協議",
    "產品紀錄",
    "線材型號",
    "線材認證",
    "相連產品",
    "組態紀錄",
    "擴充基座",
    "驗收方式",
    "樣品識別",
    "替代線材",
    "實際傳輸量",
    "持續供電"
  ],
  "zh-cn": [
    "额定功率与数据速率", "线缆", "版式裁切", "MacBook Pro", "TID",
    "线缆采购规格",
    "额定功率",
    "数据速率",
    "功率能力",
    "额定能力",
    "数据规格",
    "采购规格",
    "连接器体系",
    "接口形状",
    "接口外形",
    "认证计划",
    "合规计划",
    "商标许可协议",
    "产品记录",
    "线缆型号",
    "认证线缆",
    "配置记录",
    "扩展坞",
    "验收方法",
    "样品识别",
    "替代配置",
    "持续供电",
    "实际吞吐量"
  ]
};
  for (const [locale, terms] of Object.entries(cases)) for (const term of terms) {
    const text = term + '。';
    const protectedText = protectCjkText(text, locale);
    assert.equal(removeProtectionMarkup(protectedText), text);
    assert.ok(protectedText.includes('>' + term + '。</span>'), locale + ': ' + term);
  }
  for (const [locale, text] of Object.entries({
    'zh-tw': '若有認證主張，保存 USB-IF 紀錄、TID 與公司關係。',
    'zh-cn': '认证主张对应 USB-IF 记录、TID 和登记公司关系。'
  })) {
    const html = protectCjkText(text, locale);
    assert.equal(removeProtectionMarkup(html), text);
    assert.ok(html.includes('>TID</span>'), locale + ': full TID must outrank TI prefix');
  }
});


test('GaN manufacturing investment retains independent native technical and funding terms', () => {
  const cases = {
  "zh-tw": [
    "氮化鎵功率半導體", "2.3 倍",
    "每片晶圓", "製造能力", "時間點", "首批生產", "每個位置",
    "300 mm GaN",
    "200 mm",
    "300 mm",
    "Villach",
    "APA-Fotoservice",
    "Krisztian Juhasz",
    "JPEG",
    "11 億歐元",
    "3.19 億歐元",
    "2027 年底",
    "氮化鎵",
    "功率半導體",
    "電源產業",
    "量產基礎",
    "製造平台",
    "無塵室",
    "補助承諾",
    "正式補助承諾",
    "補助核准",
    "國家補助",
    "監管核准",
    "款項撥付",
    "生產里程碑",
    "投產目標",
    "投資期限",
    "投資期間",
    "投資計畫",
    "製造規模",
    "經濟規模",
    "晶圓直徑",
    "晶粒位置",
    "製造良率",
    "成品降價",
    "單位成本",
    "產品導入",
    "產品配額",
    "產品分配",
    "交貨安排",
    "可用零件",
    "替代零件",
    "消費性產品",
    "資助依據",
    "電氣",
    "散熱",
    "爬坡",
    "晶圓產能",
    "拍攝",
    "發布會",
    "新聞素材",
    "原圖庫",
    "即時交期",
    "投資總額"
  ],
  "zh-cn": [
    "氮化镓功率半导体", "2.3 倍",
    "晶圆尺寸",
    "每片晶圆", "一片晶圆", "制造能力", "证据链上", "尚未披露", "经济性",
    "300 mm GaN",
    "200 mm",
    "300 mm",
    "Villach",
    "APA-Fotoservice",
    "Krisztian Juhasz",
    "JPEG",
    "英飞凌",
    "菲拉赫",
    "11 亿欧元",
    "3.19 亿欧元",
    "2027 年底",
    "氮化镓",
    "功率半导体",
    "电源产业",
    "制造平台",
    "制造规模",
    "洁净室",
    "国家援助",
    "正式资助承诺",
    "资助承诺",
    "监管批准",
    "实际拨款",
    "投资期限",
    "投资计划",
    "投产节点",
    "投产目标",
    "生产节点",
    "芯片位置",
    "合格产出",
    "可用器件",
    "制造良率",
    "成品价格",
    "晶圆直径",
    "整机成本",
    "单位成本",
    "产品导入",
    "型号分配",
    "产量分配",
    "产品评审",
    "产品评审节点",
    "产能爬坡",
    "晶圆产能",
    "电气性能",
    "生产地点",
    "消费电源",
    "专门配额",
    "电力领域",
    "发布会",
    "新闻素材",
    "图库",
    "版式裁切",
    "交付承诺",
    "替换器件",
    "实际交付",
    "产业化规模",
    "后续型号"
  ]
};
  for (const [locale, terms] of Object.entries(cases)) for (const term of terms) {
    const text = term + '。';
    const html = protectCjkText(text, locale);
    assert.equal(removeProtectionMarkup(html), text);
    assert.ok(html.includes('>' + term + '。</span>'), locale + ': ' + term);
  }
});


test('Qi private-label registration keeps native identity and design terms intact', () => {
  const cases = {
  "zh-tw": [
    "(P1070294)",
    "Qi-ID",
    "Qi Certified",
    "WPC",
    "OEM/ODM",
    "Matti Blume",
    "Fast Charge",
    "CC BY-SA 4.0",
    "P1070294",
    "公開資料庫搜尋",
    "確認產品身分",
    "官方頁面",
    "Qi 充電器貼牌",
    "Qi 充電器",
    "Qi 認證",
    "Qi 登錄",
    "無線充電器",
    "無線充電產品",
    "品牌登錄",
    "品牌身分",
    "貼牌認證",
    "貼牌途徑",
    "貼牌變體",
    "貼牌版本",
    "貼牌產品",
    "自有品牌",
    "原型證書",
    "原型紀錄",
    "相似產品",
    "獨立登錄",
    "電源接頭",
    "外殼形狀",
    "外殼",
    "接頭",
    "表面材料",
    "充電器表面材料",
    "重新測試",
    "重測判斷",
    "免重測",
    "證書網址",
    "即時頁面",
    "認證身分",
    "產品身分",
    "證據交接",
    "包裝核准",
    "核准包裝",
    "確認設計",
    "設計版本",
    "整批出貨",
    "出貨批次",
    "元件型錄",
    "完整產品",
    "整機核准",
    "符合性測試",
    "互通性測試",
    "屏蔽材料",
    "線圈",
    "子系統",
    "嵌入式子系統",
    "整合條件",
    "認證途徑",
    "適用途徑",
    "採購里程碑",
    "訂單管理",
    "驗收要求",
    "替代品",
    "替代品審查",
    "商標指引",
    "設計變更",
    "貼牌登錄",
    "Samsung 圓形無線充電盤"
  ],
  "zh-cn": [
    "(P1070294)",
    "Qi-ID",
    "Qi Certified",
    "WPC",
    "OEM/ODM",
    "Matti Blume",
    "Fast Charge",
    "CC BY-SA 4.0",
    "P1070294",
    "认证路径评估",
    "官方页面",
    "Qi 充电器贴牌",
    "Qi 充电器",
    "Qi 认证",
    "Qi 登记",
    "无线充电器",
    "无线充电产品",
    "品牌登记",
    "产品身份",
    "贴牌认证",
    "贴牌变体",
    "贴牌版本",
    "贴牌产品",
    "贴牌事项",
    "自有品牌",
    "原产品",
    "原产品证书",
    "相似产品",
    "独立登记",
    "电源接口",
    "外壳形状",
    "外壳",
    "接口",
    "表面材料",
    "充电器表面材料",
    "重新测试",
    "免重测",
    "证书网址",
    "认证路径",
    "路径评估",
    "包装批准",
    "批准包装",
    "确认设计",
    "设计版本",
    "整批货物",
    "批次验收",
    "出货批次",
    "完整产品",
    "整机状态",
    "符合性测试",
    "互操作性测试",
    "互操作性",
    "屏蔽",
    "线圈",
    "子系统",
    "嵌入式子系统",
    "集成条件",
    "认证责任方",
    "采购节点",
    "订单控制",
    "验收要求",
    "替代品",
    "替代品审核",
    "商标指引",
    "设计变更",
    "贴牌登记"
  ]
};
  for (const [locale, terms] of Object.entries(cases)) for (const term of terms) {
    const text = term + '。';
    const html = protectCjkText(text, locale);
    assert.equal(removeProtectionMarkup(html), text);
    assert.ok(html.includes('>' + term + '。</span>'), locale + ': ' + term);
  }
  const contextCases=[['zh-tw','WPC 官方頁面。 (P1070294)，',['官方頁面。','(P1070294)，']],['zh-tw','再從公開資料庫搜尋，可確認產品身分。',['公開資料庫搜尋，','確認產品身分。']],['zh-cn','必要时取得书面认证路径评估。',['认证路径评估。']]];
  for(const [locale,text,phrases] of contextCases){
    const html=protectCjkText(text,locale);
    assert.equal(removeProtectionMarkup(html),text);
    for(const phrase of phrases)assert.ok(html.includes('>'+phrase+'</span>'),locale+': '+phrase);
  }
});


test('robotics import news keeps native equipment and policy terms intact in context', () => {
  const cases = {
  "zh-tw": [
    "美國機器人進口案",
    "機器人",
    "工業機械",
    "進口談判",
    "設備進口",
    "工廠設備",
    "製造設備",
    "設備採購",
    "設備報價",
    "設備訂單",
    "貿易夥伴",
    "貿易談判",
    "貿易政策",
    "關稅",
    "新關稅",
    "新稅率",
    "稅率",
    "配額",
    "費用",
    "課稅選項",
    "政策調整",
    "成本變化",
    "成本增幅",
    "機械手臂",
    "三指",
    "金屬夾爪",
    "加工零件",
    "測試平台",
    "靈巧操作",
    "公共領域",
    "全球再利用權",
    "政府雇員",
    "研究示意照片",
    "商務部長",
    "商務部",
    "美國貿易代表",
    "1962 年貿易擴張法",
    "第 232 條",
    "風險認定",
    "安全風險",
    "進度回報",
    "回報進度",
    "實施時程",
    "實施時間",
    "附加稅",
    "電機",
    "電子",
    "政策理由",
    "安全性",
    "進口機台",
    "生產計畫",
    "焊接",
    "搬運",
    "組裝製程",
    "產線",
    "安裝",
    "工裝",
    "驗收工作",
    "正式協議",
    "後續公告",
    "執行指引",
    "產品範圍",
    "驗收要求",
    "替代機台",
    "替代設備",
    "投產條件",
    "投產準備",
    "生效日",
    "過渡安排",
    "稅則分類",
    "原產地",
    "進口限制",
    "資本設備",
    "可投入使用",
    "具體條款",
    "設備供應",
    "書面報價",
    "商業條件",
    "政策調價",
    "當下",
    "分開估算",
    "按原狀提供",
    "設備進口談判",
    "製造設備採購",
    "啟動談判",
    "應繳稅額",
    "《1962 年貿易擴張法》"
  ],
  "zh-cn": [
    "美国机器人进口案",
    "机器人",
    "工业机械",
    "进口谈判",
    "设备进口",
    "工厂设备",
    "制造设备",
    "设备采购",
    "设备投资",
    "设备订单",
    "贸易伙伴",
    "贸易谈判",
    "贸易政策",
    "关税",
    "新关税",
    "新税率",
    "税率",
    "配额",
    "收费",
    "保留选项",
    "政策调价",
    "潜在风险",
    "机械臂",
    "三指",
    "金属抓手",
    "加工零件",
    "测试平台",
    "灵巧操作",
    "公有领域",
    "全球再使用权",
    "政府雇员",
    "商务部长",
    "商务部",
    "美国贸易代表",
    "1962 年贸易扩展法",
    "第 232 条",
    "风险认定",
    "安全认定",
    "进展报告",
    "汇报进展",
    "实施时间表",
    "附加税",
    "电气",
    "电子",
    "政策理由",
    "安全问题",
    "进口设备",
    "生产计划",
    "焊接",
    "搬运",
    "装配工艺",
    "产线",
    "安装",
    "工装",
    "验收安排",
    "正式协议",
    "后续公告",
    "执行指引",
    "产品覆盖",
    "替代设备",
    "投产准备",
    "生效日期",
    "生效日",
    "过渡安排",
    "税则归类",
    "原产地",
    "进口限制",
    "资本设备",
    "可用产能",
    "具体条款",
    "设备供应",
    "书面报价",
    "适用条件",
    "投入生产",
    "按原样提供",
    "设备进口谈判",
    "确认产品覆盖",
    "启动谈判",
    "应缴税额",
    "《1962 年贸易扩展法》"
  ]
};
  for(const [locale,values] of Object.entries(cases))for(const term of values){
    const text=term+'。',html=protectCjkText(text,locale);
    assert.equal(removeProtectionMarkup(html),text);
    assert.ok(html.includes('>'+term+'。</span>'),locale+': '+term);
  }
  for(const [locale,text,phrases] of [['zh-tw','依《1962 年貿易擴張法》第 232 條。',['《1962 年貿易擴張法》','第 232 條。']],['zh-cn','依据《1962 年贸易扩展法》第 232 条。',['《1962 年贸易扩展法》','第 232 条。']],['zh-tw','美國設備進口談判；製造設備採購：原本依特定焊接、搬運或組裝製程規劃的產線。',['設備進口談判；','製造設備採購：','焊接、','搬運','組裝製程','產線。']],['zh-cn','美国设备进口谈判；确认产品覆盖、按特定焊接、搬运或装配工艺配置产线。应缴税额。',['设备进口谈判；','确认产品覆盖、','焊接、','搬运','装配工艺','产线。','应缴税额。']]]){
    const html=protectCjkText(text,locale);assert.equal(removeProtectionMarkup(html),text);
    for(const phrase of phrases)assert.ok(html.includes('>'+phrase+'</span>'),locale+': '+phrase);
  }
});


test('Ferric news keeps native power-integration and transaction terms copyable and intact', () => {
  const terms={
  "shared": [
    "onsemi",
    "Ferric",
    "IVR",
    "Form 8-K",
    "8-K",
    "Evertiq",
    "Benzinga",
    "BrokenSegue",
    "Sunnyvale"
  ],
  "native": {
    "zh-tw": [
      "擬收購",
      "布局",
      "晶片供電",
      "處理器供電整合",
      "收購協議",
      "整合式電壓調節器",
      "電壓調節器",
      "調節電壓",
      "電壓調節",
      "電力轉換",
      "封裝內供電",
      "封裝介面",
      "封裝布局",
      "基本現金對價",
      "現金對價",
      "條件式對價",
      "營收里程碑",
      "追加款",
      "交割條件",
      "交割公告",
      "反托拉斯",
      "等待期",
      "提前終止",
      "子公司",
      "場效電晶體",
      "控制器",
      "電感",
      "電容",
      "小型封裝",
      "分立元件",
      "整合方案",
      "工作負載",
      "系統範圍",
      "量測範圍",
      "操作條件",
      "測試條件",
      "性能數字",
      "技術方向",
      "技術說明",
      "獨立實測",
      "獨立性能驗證",
      "聯合驗證",
      "共同驗證",
      "電氣",
      "散熱",
      "驗證資訊",
      "供貨時程",
      "產品文件",
      "產品驗證",
      "交付單元",
      "製程",
      "可重複生產",
      "布局晶片供電",
      "簽約現場",
      "生產線",
      "歷史企業示意照片",
      "辦公室",
      "美國",
      "基板",
      "負載變化",
      "供電整合",
      "AI 處理器",
      "第 1.01 項",
      "6 億美元",
      "1.75 億美元",
      "第四季"
    ],
    "zh-cn": [
      "安森美",
      "拟收购",
      "布局",
      "芯片供电",
      "处理器供电集成",
      "收购协议",
      "集成稳压器",
      "电能转换",
      "封装内供电",
      "封装接口",
      "封装布置",
      "现金对价",
      "营收里程碑",
      "追加款",
      "交割条件",
      "交割公告",
      "反垄断",
      "等待期",
      "提前终止",
      "子公司",
      "场效应晶体管",
      "控制器",
      "电感",
      "电容",
      "紧凑封装",
      "分立器件",
      "集成方案",
      "工作负载",
      "运行条件",
      "系统范围",
      "测量范围",
      "运行点",
      "测试条件",
      "技术路径",
      "技术说明",
      "技术解释",
      "独立测试",
      "独立性能测试",
      "联合验证",
      "电气",
      "散热",
      "验证信息",
      "供货计划",
      "供货安排",
      "产品文件",
      "产品验证",
      "交付单元",
      "可重复生产",
      "布局芯片供电",
      "签约活动",
      "生产线",
      "历史企业示意照片",
      "办公楼",
      "美国",
      "基板",
      "负载变化",
      "供电集成",
      "AI 处理器",
      "第 1.01 项",
      "6 亿美元",
      "1.75 亿美元",
      "第四季度"
    ]
  }
};
  const cases={
  "zh-tw": [
    "onsemi 擬收購 Ferric，布局晶片供電。",
    "Ferric 的整合式電壓調節器，著眼於貼近 AI 處理器的供電整合。",
    "現金對價 6 億美元，另有最高 1.75 億美元與營收里程碑連動的款項。",
    "交割條件包括反托拉斯等待期；小型封裝結合場效電晶體、電感與電容。"
  ],
  "zh-cn": [
    "安森美拟收购 Ferric，布局芯片供电。",
    "Ferric 的集成稳压器面向 AI 处理器附近的供电环节。",
    "现金对价为 6 亿美元，并设置最高 1.75 亿美元的营收里程碑付款。",
    "交割条件涉及反垄断等待期；紧凑封装包括场效应晶体管、电感和电容。"
  ]
};
  for(const [locale,lines] of Object.entries(cases)){
    for(const text of lines){
      const html=protectCjkText(text,locale);
      assert.equal(removeProtectionMarkup(html),text);
      for(const term of [...terms.shared,...terms.native[locale]].filter(t=>text.includes(t))){
        assert.ok(cjkProtectedTerms[locale].includes(term),locale+": "+term);
      }
    }
    for(const term of [...terms.shared,...terms.native[locale]]){
      const html=protectCjkText(term+"。",locale);
      assert.equal(removeProtectionMarkup(html),term+"。");
      assert.ok(html.includes(">"+term+"。</span>"),locale+": "+term);
    }
  }
});


test('Ferric caption actions and compact native heading stay intact in context', () => {
  const cases={"zh-tw": ["等比例縮小", "交貨時程", "散熱安排", "辦公室實景", "攝影者"], "zh-cn": ["等比例缩小", "交货时间", "散热安排", "协议价格", "摄影者"]};
  for(const [locale,terms] of Object.entries(cases))for(const term of terms){
    const text=term+"。", html=protectCjkText(text,locale);
    assert.equal(removeProtectionMarkup(html),text);
    assert.ok(html.includes(">"+term+"。</span>"),locale+": "+term);
  }
});


test('SMETA report review preserves native social-audit and corrective-action terms', () => {
 const terms={
  "shared": [
    "SMETA",
    "Sedex",
    "CAPR",
    "AAC",
    "MART PRODUCTION",
    "To Do"
  ],
  "native": {
    "zh-tw": [
      "驗廠報告",
      "改善紀錄",
      "社會責任稽核",
      "現場社會責任稽核方法",
      "受稽核",
      "工作場所",
      "會員身分",
      "稽核方",
      "查證結案",
      "改善措施計畫報告",
      "改善措施",
      "改善進度",
      "改善承諾",
      "完整稽核報告",
      "四大支柱",
      "兩大支柱",
      "勞動",
      "健康安全",
      "商業道德",
      "基本環境評估",
      "合作稽核公司",
      "出具單位",
      "官方名錄",
      "暫停資格",
      "文件審閱",
      "現場複查",
      "勞工陳述",
      "最新狀態",
      "查證紀錄",
      "製造工廠",
      "生產地點",
      "文件夾板",
      "待辦清單",
      "受稽核工廠",
      "文件審閱示意照片",
      "背書關係",
      "本地照片",
      "複查授權",
      "版面裁切"
    ],
    "zh-cn": [
      "验厂报告",
      "整改记录",
      "社会责任审核",
      "现场社会责任审核方法",
      "受审核",
      "工作场所",
      "会员资格",
      "审核方",
      "验证关闭",
      "整改计划报告",
      "整改措施",
      "整改进度",
      "整改承诺",
      "完整报告",
      "四支柱",
      "两支柱",
      "劳工",
      "健康安全",
      "商业道德",
      "基础环境评估",
      "合作审核公司",
      "审核机构",
      "出具机构",
      "暂停资格",
      "桌面审阅",
      "到场复核",
      "工人证词",
      "最新状态",
      "验证依据",
      "生产工厂",
      "生产地点",
      "待办清单",
      "受审核工厂",
      "文件审阅示意照片",
      "本地照片",
      "核查许可",
      "版面裁切"
    ]
  }
};
 for(const locale of ['zh-tw','zh-cn'])for(const term of [...terms.shared,...terms.native[locale]]){
  const text=term+'。';const html=protectCjkText(text,locale);
  assert.equal(removeProtectionMarkup(html),text);
  assert.ok(cjkProtectedTerms[locale].includes(term),locale+': '+term);
  assert.ok(html.includes('>'+text+'</span>'),locale+': '+term);
 }
 const contexts={'zh-tw':'SMETA 驗廠報告：工廠與改善紀錄。受稽核工廠的改善措施，須與查證結案紀錄一起看。','zh-cn':'SMETA 验厂报告：工厂与整改记录。受审核工厂的整改措施，应与验证关闭的依据一起看。'};
 const reportTerms={"zh-tw": ["量產一致性", "受稽核地點", "實際製造工廠", "工廠對應", "後續查證", "完成聲明", "報告名稱", "生產安排", "業務辦公室", "製造地點", "稽核範圍", "暫停資格資訊", "報告真偽", "發現事項", "遠端文件", "未結事項", "風險導向", "有效期限", "主體資料", "支持紀錄", "私人平台帳戶", "法律意見", "買家流程", "採購接受條件"], "zh-cn": ["受审核场所", "工厂身份", "后续验证", "完成声明", "报告名称", "销售公司", "生产安排", "制造地点", "审核范围", "机构身份", "文件真实", "验证方式", "远程材料", "未结问题", "复核节点", "有效期", "接受条件", "私人平台账号", "法律意见", "采购流程"]};
 for(const [locale,terms]of Object.entries(reportTerms))for(const term of terms){const prefix=locale==='zh-tw'?'核對':'核对';const text=prefix+term+'。';const html=protectCjkText(text,locale);assert.equal(removeProtectionMarkup(html),text);assert.ok(html.includes(term));}
 const additionalNative={"zh-tw": ["社會責任", "產品合規", "批次驗收", "稽核報告", "生產安排", "主體關係", "文件閱讀指南", "查證方式", "稽核頻率"], "zh-cn": ["社会责任", "产品合规", "审核报告", "主体关系", "阅读方法", "验证方式", "审核频率"]};
 for(const [locale,terms]of Object.entries(additionalNative))for(const term of terms){const text='核對'+term+'。';const html=protectCjkText(text,locale);assert.equal(removeProtectionMarkup(html),text);assert.ok(html.includes(term));}
 const regressionDescriptions={'zh-tw':['產品認證及出貨驗收分開判斷。','出貨驗收'],'zh-cn':['分清社会责任审核与充电器产品质量。','产品质量']};
 for(const [locale,[text,term]]of Object.entries(regressionDescriptions)){const html=protectCjkText(text,locale);assert.equal(removeProtectionMarkup(html),text);assert.ok(html.includes(term),'Regression: '+locale+' '+term);}
 for(const [locale,text]of Object.entries(contexts))assert.equal(removeProtectionMarkup(protectCjkText(text,locale)),text);
 for(const [locale,terms]of Object.entries({'zh-tw':['獨立聯絡管道','縮小版本','出貨驗收','出貨查核','產品品質'],'zh-cn':['独立联系方式','缩小版本','出货验收','出货核查','产品质量','批量质量']}))for(const term of terms){const html=protectCjkText(term+'。',locale);assert.equal(removeProtectionMarkup(html),term+'。');assert.ok(html.includes('>'+term+'。</span>'));}
});
