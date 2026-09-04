import test from 'node:test';
import assert from 'node:assert/strict';
import { languages, pages } from '../src/content.mjs';
import { cjkProtectedTerms, protectCjkHtml, protectCjkText, stripCjkProtectionMarkup } from '../src/cjk-linebreak.mjs';
import { renderPage } from '../src/template.mjs';

function removeProtectionMarkup(value) {
  return stripCjkProtectionMarkup(value);
}

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
    'zh-tw': ['再確認產品。', '電源適配器', '充電器', '行動電源', '供應商', '物料清單', '供應商說法', '第一層', '第一次下單前', '品質管理系統', '驗證碼'],
    'zh-cn': ['再确认产品。', '电源适配器', '充电器', '移动电源', '供应商', '物料清单', '供应商说法', '第一层', '第一次下单前', '质量管理体系', '验证码', '智蒙灣']
  };
  for (const [locale, terms] of Object.entries(samples)) {
    const html = protectCjkHtml(`<!doctype html><html><body><p>${terms.join('／')}</p></body></html>`, locale);
    for (const term of terms) {
      assert.match(html, new RegExp(`<span class="cjk-keep cjk-keep--(?:phrase|word)">${term}<\\/span>`));
    }
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
      '看起來一致', '英文譯名', '郵件簽名',
      '而企業登記本身', '企業登記本身', '登記資料', '登記主體', '自有工廠', '具備足夠產能',
      '發票方', '收款方', '誰負責', '或一定履行', '一定履行', '會履行'
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
      '容易混淆', '英文译名', '邮件签名',
      '而企业登记本身', '企业登记本身', '登记资料', '登记主体', '自有工厂',
      '发票方', '收款方', '谁负责', '或一定履行', '一定履行', '会履行订单', '会履行'
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
    assert.match(requestHtml, /<div><p class="kicker">[^<]+<\/p><ol>(?:<li><span>0\d<\/span><p>[^<]+<\/p><\/li>)+<\/ol><\/div>/);
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

test('English output is not rewritten by the Chinese line-break layer', () => {
  const html = '<!doctype html><html><body><p>Supplier verification</p></body></html>';
  assert.equal(protectCjkHtml(html, 'en'), html);
});
