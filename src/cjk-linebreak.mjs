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
  'Product iQ',
  'Wireless Power Consortium',
  'T1–T6',
  'RoHS',
  'NANDO',
  'CNCA',
  'GaN',
  'Qi2',
  'Qi ID',
  'Test ID',
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
    '品質檢驗',
    '品質檢測',
    '統一社會信用代碼',
    '中文法定名稱',
    '英文商號',
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
    '符合性聲明',
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
    '智蒙灣'
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
    '质量检验',
    '质量检测',
    '统一社会信用代码',
    '中文法定名称',
    '英文商号',
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
    '智蒙灣'
  ]
};

const ordinalPattern = '第[一二三四五六七八九十百千兩两0-9０-９]+(?:層|层|步|項|项|次|種|种|章|頁|页|類|类|階段|阶段|天|週|周|年|個|个|批|款|部分|條|条|點|点)';
const quantityNumberPattern = '(?:[零〇一二三四五六七八九十百千萬万億亿兩两]+|[0-9０-９]+(?:[,.，．][0-9０-９]+)*)';
const quantityPattern = `(?:${quantityNumberPattern}\\s*(?:–|-|—|~|～|至|到)\\s*)?${quantityNumberPattern}\\s*(?:小時|小时|分鐘|分钟|位數|位数|美元|個|个|項|项|款|件|批|家|種|种|天|日|週|周|年|月|時|时|位|頁|页|篇|次|套|組|组|份|張|张|層|层|樓|楼|號|号|步|條|条|點|点)`;
const demonstrativeQuantityPattern = `(?:這|这|該|该|每|各|本)(?:${quantityNumberPattern}\\s*)?(?:個|个|款|篇|項|项|張|张|家|筆|笔|件|批|份|種|种|層|层|步|條|条|頁|页|次|套|組|组|位|年|月|日|週|周)`;
const trailingPunctuationPattern = '[，。；：！？、）」』】》〉,.!?;:]';
const folioPattern = '\\p{Script=Han}{1,10}\\s*[·•]\\s*[0-9０-９]+';
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
  return new RegExp(`(?:${folioPattern}|${alternatives}|${ordinalPattern}|${quantityPattern}|${demonstrativeQuantityPattern})(?:${trailingPunctuationPattern})*`, 'gu');
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
  if (!hanPattern.test(value) && !hasProtectedTerm) return value;
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
