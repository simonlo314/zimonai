const summaryRules = {
  en: {
    minLength: 420,
    maxLength: 680,
    segmenterLocale: 'en',
    verdictOpening: /(?:^|[.!?][)"'’”）】》」』]*\s+)[(（]?[“"‘'「『]?(?:(?:no|yes|maybe|perhaps|not really|probably (?:not|yes)|(?:absolutely|certainly|definitely|of course) (?:not|no|yes))(?=[.!,:;—–-])|(?:it depends|depends|not necessarily|not by itself|not on its own|cannot)(?:\b|[.!,:;])|can(?=[.!,:;]))/i,
    verdictFraming: /\b(?:the (?:(?:short|simple|direct) )?answer(?: is|\s*:)|in short|simply put|the conclusion is)\s*[:,]?\s*(?:no|yes|it depends|not necessarily|not by itself|not on its own|cannot|can)\b/i,
    buyerPerspective: /\b(?:buyer|buyers|procurement|purchasing|sourcing)\b/i,
    editorialInsight: /\bZIMONAI(?:’s|'s) (?:editorial view|practical assessment|editorial assessment|perspective)\b|\b(?:from|in) ZIMONAI(?:’s|'s) (?:view|perspective)\b|\bZIMONAI (?:interprets|considers|views|reads|sees)\b/i,
    newsSignificance: /\b(?:the bigger story|why it matters|what matters|this matters because|this is (?:important|significant) because|worth (?:noting|watching)|marks? a shift|signals? (?:a |the )?(?:shift|change|trend)|points? to (?:a |the )?(?:shift|change|trend))\b|\b(?:places?|positions?|elevates?|establishes?|frames?|makes?|sets?|turns?|brings?|pushes?|moves?|shifts?|raises?|highlights?|underscores?|reshapes?|changes?)\b.{0,100}\b(?:priority|priorities|benchmark|expectations?|differentiator|focus|centre|center|standard|turning point)\b/i,
    newsImpact: /\b(?:buyers?|procurement|purchasing|sourcing|industr(?:y|ies)|markets?|categor(?:y|ies)|competit(?:ion|ions|ive)|manufactur(?:e|ing|er|ers)|supply chains?|components?|compliance|logistics|costs?)\b/i
  },
  'zh-tw': {
    minLength: 160,
    maxLength: 280,
    segmenterLocale: 'zh-Hant',
    verdictOpening: /(?:^|[。！？][)"'’”）】》」』]*\s*)[（(]?[「『“‘]?(?:不能|可以|不一定|無法|不是|是(?:的)?|視情況而定|不見得|未必|(?:當然|絕對|肯定)(?:不行|不可以|可以|不是|是)|要看情況|得看情況|看情況|說不準|也許|或許|可能)(?:[。！？，,；;：:\s」』”’]|$)/,
    verdictFraming: /(?:簡單(?:來)?說|一句話(?:來)?說|結論是|答案是|總結(?:來)?說)\s*[:：，,]?\s*(?:不能|可以|不一定|無法|不是|是(?:的)?|視情況而定|不見得|未必)/,
    buyerPerspective: /(?:買家|採購)/,
    editorialInsight: /(?:ZIMONAI 的(?:編輯)?(?:判讀|判斷|實務觀點)|依 ZIMONAI 的實務經驗|從 ZIMONAI 的.{0,12}(?:角度|觀點)|ZIMONAI (?:認為|解讀|視為))/,
    newsSignificance: /(?:更值得注意|值得注意的是|重要的是|這件事之所以重要|這表示.{0,40}(?:趨勢|變化)|反映出.{0,40}(?:趨勢|變化)|正從.{0,40}走向|(?:把|將).{0,70}(?:推向|推到|帶入|拉進|置於|列為|變成|成為).{0,50}(?:核心|焦點|優先|主軸|競爭|指標|基準|門檻)|(?:凸顯|突顯|彰顯|強調|重塑|改變|推動|提升).{0,70}(?:品類|產業|市場|競爭|優先|焦點|主軸|價值|門檻|標準))/,
    newsImpact: /(?:買家|採購|產業|市場|品類|競爭|製造|供應鏈|零組件|合規|物流|成本)/
  },
  'zh-cn': {
    minLength: 160,
    maxLength: 280,
    segmenterLocale: 'zh-Hans',
    verdictOpening: /(?:^|[。！？][)"'’”）】》」』]*\s*)[（(]?[「『“‘]?(?:不能|可以|不一定|无法|不是|是(?:的)?|视情况而定|不见得|未必|(?:当然|绝对|肯定)(?:不行|不可以|可以|不是|是)|要看情况|得看情况|看情况|说不准|也许|或许|可能)(?:[。！？，,；;：:\s」』”’]|$)/,
    verdictFraming: /(?:简单(?:来)?说|一句话(?:来)?说|结论是|答案是|总结(?:来)?说)\s*[:：，,]?\s*(?:不能|可以|不一定|无法|不是|是(?:的)?|视情况而定|不见得|未必)/,
    buyerPerspective: /(?:买家|采购)/,
    editorialInsight: /(?:ZIMONAI 的(?:编辑)?(?:判断|判读|实务观点)|依 ZIMONAI 的实务经验|从 ZIMONAI 的.{0,12}(?:角度|观点)|ZIMONAI (?:认为|解读|视为))/,
    newsSignificance: /(?:更值得关注|值得关注的是|重要的是|这件事之所以重要|这表示.{0,40}(?:趋势|变化)|反映出.{0,40}(?:趋势|变化)|正从.{0,40}转向|(?:把|将).{0,70}(?:推向|推到|带入|拉进|置于|列为|变成|成为).{0,50}(?:核心|焦点|优先|主轴|竞争|指标|基准|门槛)|(?:凸显|突显|彰显|强调|重塑|改变|推动|提升).{0,70}(?:品类|产业|市场|竞争|优先|焦点|主轴|价值|门槛|标准))/,
    newsImpact: /(?:买家|采购|产业|市场|品类|竞争|制造|供应链|零部件|合规|物流|成本)/
  }
};

const supportedContentTypes = new Set(['industry-knowledge', 'current-affairs']);

function countCompleteSentences(summary, locale) {
  const segmenter = new Intl.Segmenter(locale, { granularity: 'sentence' });
  return [...segmenter.segment(summary)]
    .map(({ segment }) => segment.trim())
    .filter((segment) => /[.!?。！？]["'’”）】》」』]*$/u.test(segment))
    .filter((segment) => /[\p{L}\p{N}\p{Script=Han}]/u.test(segment))
    .length;
}

export function knowledgeSummaryIssues(locale, contentType, value) {
  const rules = summaryRules[locale];
  if (!rules) return [`unsupported summary locale: ${locale}`];

  const summary = typeof value === 'string' ? value.trim() : '';
  const issues = [];

  if (!summary) return ['summary is empty'];
  if (!supportedContentTypes.has(contentType)) issues.push(`unsupported summary content type: ${contentType}`);
  if (summary.length < rules.minLength) issues.push(`summary is shorter than ${rules.minLength} characters`);
  if (summary.length > rules.maxLength) issues.push(`summary is longer than ${rules.maxLength} characters`);
  if (countCompleteSentences(summary, rules.segmenterLocale) < 3) issues.push('summary needs at least three complete sentences');
  if (rules.verdictOpening.test(summary) || rules.verdictFraming.test(summary)) issues.push('summary opens a sentence with a binary verdict');

  if (contentType === 'industry-knowledge') {
    if (!rules.buyerPerspective.test(summary)) issues.push('summary lacks a buyer or procurement perspective');
    if (!rules.editorialInsight.test(summary)) issues.push('summary lacks a clear editorial insight');
  } else if (contentType === 'current-affairs') {
    if (!rules.newsSignificance.test(summary)) issues.push('news summary lacks a clear significance statement');
    if (!rules.newsImpact.test(summary)) issues.push('news summary lacks a buyer or industry impact');
  }

  return issues;
}
