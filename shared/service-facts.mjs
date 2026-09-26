// Public names and commercial facts. Stable tier IDs remain unchanged in orders/cases.
export const SERVICE_FACTS = Object.freeze({
  t1: { amount: 14900, currency: 'USD', primaryEntities: 1, models: 1, certificateClaims: 2, reportPages: [3, 5], turnaround: [24, 48], unit: 'hours' },
  t2: { amount: 34900, currency: 'USD', primaryEntities: 1, relatedEntities: 2, inherits: 't1', turnaround: [3, 5], unit: 'businessDays' },
  t3: { inherits: 't2', quotation: true, turnaround: [5, 7], unit: 'businessDays' },
  t4: { inherits: 't3', quotation: true, turnaround: [7, 10], unit: 'businessDays' },
  t5: { quotation: true, includes: ['t1', 't2', 't3'], excludes: ['t4'], trialMonths: 1, termMonths: 3 },
  t6: { quotation: true, includes: ['t4', 't5'], turnaround: [4, 8], unit: 'weeks' }
});

export const SERVICE_NAMES = Object.freeze({
  t1: { en: 'Supplier Verification', 'zh-tw': '基礎供應商查核', 'zh-cn': '基础供应商核查' },
  t2: { en: 'Enhanced Supplier Due Diligence', 'zh-tw': '深度供應商盡調', 'zh-cn': '深度供应商尽调' },
  advanced: { en: 'Advanced Verification & Enterprise Services', 'zh-tw': '進階查核與企業級服務', 'zh-cn': '进阶核查与企业级服务' }
});
export const QUOTATION_COPY = { en: 'Pricing based on the agreed scope', 'zh-tw': '依雙方確認的範圍報價', 'zh-cn': '按双方确认的范围报价' };
export const QUOTATION_SHORT_COPY = Object.freeze({ en: 'Custom pricing', 'zh-tw': '客製化定價', 'zh-cn': '定制定价' });
export function serviceName(id, locale = 'en') { return SERVICE_NAMES[id]?.[locale] || SERVICE_NAMES[id]?.en || id.toUpperCase(); }
export function servicePrice(id, locale = 'en') { return SERVICE_FACTS[id]?.amount ? `USD ${SERVICE_FACTS[id].amount / 100}` : QUOTATION_COPY[locale] || QUOTATION_COPY.en; }
export function serviceTiming(id, locale = 'en') {
  const fact = SERVICE_FACTS[id];
  if (id === 't5') return ({
    en: `${fact.trialMonths}-month trial; ${fact.termMonths}-month terms thereafter`,
    'zh-tw': `首月可試用 ${fact.trialMonths} 個月；之後每期 ${fact.termMonths} 個月`,
    'zh-cn': `首月可试用 ${fact.trialMonths} 个月；之后每期 ${fact.termMonths} 个月`
  })[locale];
  if (!fact?.turnaround) return '';
  const range = fact.turnaround.join('–');
  if (fact.quotation) return `${range} ${({ en: { businessDays: 'business days', weeks: 'weeks' }, 'zh-tw': { businessDays: '個工作日', weeks: '週' }, 'zh-cn': { businessDays: '个工作日', weeks: '周' } })[locale][fact.unit]}`;
  if (locale === 'zh-tw') return `資料完整後 ${range} ${fact.unit === 'hours' ? '小時' : '個工作日'}`;
  if (locale === 'zh-cn') return `资料完整后 ${range} ${fact.unit === 'hours' ? '小时' : '个工作日'}`;
  return `${range} ${fact.unit === 'hours' ? 'hours' : 'business days'} after complete intake`;
}

export function inquiryClassification(group = 'unsure', interest = 'unsure') {
  if (!['unsure', 't1', 't2', 'advanced'].includes(group)) return null;
  if (!['unsure', 't3', 't4', 't5', 't6'].includes(interest)) return null;
  if (group !== 'advanced' && interest !== 'unsure') return null;
  return { serviceGroup: group, serviceInterest: interest };
}
