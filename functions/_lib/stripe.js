export const STRIPE_PRODUCTS = {
  consultation: {
    amount: 9900,
    names: { en: 'Supplier Verification Consultation', 'zh-tw': '供應商查核專業諮詢', 'zh-cn': '供应商核查专业咨询' },
    descriptions: { en: '60-minute consultation', 'zh-tw': '60 分鐘專業諮詢', 'zh-cn': '60 分钟专业咨询' },
    min: 1,
    max: 1
  },
  t1: {
    amount: 14900,
    names: { en: 'T1 Certificate Verification', 'zh-tw': 'T1 遠端證照查核', 'zh-cn': 'T1 远程证照核查' },
    descriptions: { en: 'One fixed-scope standard case', 'zh-tw': '一件固定範圍標準案件', 'zh-cn': '一个固定范围标准案件' },
    min: 1,
    max: 1
  },
  t2: {
    amount: 34900,
    names: { en: 'T2 Remote Due Diligence', 'zh-tw': 'T2 遠端深度盡調', 'zh-cn': 'T2 远程深度尽调' },
    descriptions: { en: 'One fixed-scope standard case', 'zh-tw': '一件固定範圍標準案件', 'zh-cn': '一个固定范围标准案件' },
    min: 1,
    max: 1
  },
  balance: {
    amount: 1000,
    names: { en: 'Service Balance Payment', 'zh-tw': '服務差額補款', 'zh-cn': '服务差额补款' },
    descriptions: { en: 'USD 10 per confirmed unit', 'zh-tw': '每單位 USD 10', 'zh-cn': '每个单位 USD 10' },
    min: 1,
    max: 100,
    referenceRequired: true
  },
  'consultation-extension': {
    amount: 4900,
    names: { en: 'Consultation Extension', 'zh-tw': '延長諮詢', 'zh-cn': '延长咨询' },
    descriptions: { en: '30-minute extension for an existing booking', 'zh-tw': '既有預約延長 30 分鐘', 'zh-cn': '已有预约延长 30 分钟' },
    min: 1,
    max: 1,
    referenceRequired: true
  }
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex'
    }
  });
}

export function cleanLocale(value) {
  return ['en', 'zh-tw', 'zh-cn'].includes(value) ? value : 'en';
}

export function cleanReference(value) {
  return String(value || '').replace(/[<>\r\n]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
}

export function allowedRequestOrigin(request, env) {
  const origin = request.headers.get('Origin') || '';
  if (origin === 'https://zimonai.com' || origin === 'https://www.zimonai.com') return origin;
  if (env.ALLOW_LOCAL_CHECKOUT === 'true' && /^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?$/.test(origin)) return origin;
  if (env.ALLOW_PREVIEW_CHECKOUT === 'true' && /^https:\/\/[a-z0-9-]+\.zimonai\.pages\.dev$/.test(origin)) return origin;
  return '';
}

export function checkoutBaseUrl(origin, env) {
  if (env.SITE_URL && /^https?:\/\//.test(env.SITE_URL)) return env.SITE_URL.replace(/\/$/, '');
  if (origin.startsWith('http://')) return origin;
  return 'https://zimonai.com';
}

export async function stripeRequest(env, path, options = {}) {
  if (!env.STRIPE_SECRET_KEY || !/^sk_(?:test|live)_/.test(env.STRIPE_SECRET_KEY)) {
    throw new Error('stripe_not_configured');
  }
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      ...(options.headers || {})
    }
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error('stripe_request_failed');
    error.status = response.status;
    error.stripeType = data?.error?.type;
    throw error;
  }
  return data;
}
