function senderProvider(env) {
  return String(env.EMAIL_PROVIDER || '').trim().toLowerCase();
}

function boundSender(env) {
  const sender = env?.EMAIL_TRANSPORT;
  return sender && typeof sender.sendTransactionalEmail === 'function' ? sender : null;
}

export function emailSenderConfigured(env) {
  const provider = senderProvider(env);
  if (!String(env.EMAIL_FROM || '').trim()) return false;
  if (boundSender(env)) return true;
  if (provider === 'resend') return /^re_/.test(String(env.RESEND_API_KEY || ''));
  return false;
}

export async function sendTransactionalEmail(env, {
  to,
  subject,
  text,
  html,
  replyTo = '',
  idempotencyKey = ''
}) {
  if (!emailSenderConfigured(env)) throw new Error('email_delivery_not_configured');
  const provider = senderProvider(env);
  const message = {
    from: String(env.EMAIL_FROM).trim(),
    to: String(to),
    subject: String(subject),
    text: String(text),
    html: String(html),
    replyTo: String(replyTo || env.EMAIL_REPLY_TO || '').trim(),
    idempotencyKey: String(idempotencyKey || '').slice(0, 256)
  };
  const sender = boundSender(env);
  if (sender) {
    const result = await sender.sendTransactionalEmail(message);
    if (!result?.id) throw new Error('email_delivery_failed');
    return {
      provider: String(result.provider || provider || 'binding'),
      id: String(result.id)
    };
  }
  if (provider !== 'resend') throw new Error('email_provider_not_supported');
  const headers = {
    Authorization: `Bearer ${String(env.RESEND_API_KEY)}`,
    'Content-Type': 'application/json'
  };
  if (message.idempotencyKey) headers['Idempotency-Key'] = message.idempotencyKey;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      subject: message.subject,
      text: message.text,
      html: message.html,
      reply_to: message.replyTo || undefined
    })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.id) {
    const error = new Error('email_delivery_failed');
    error.status = response.status;
    throw error;
  }
  return { provider, id: String(result.id) };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function verificationEmail(locale, code) {
  const copy = {
    en: {
      subject: 'Your ZimonAI sign-in code',
      heading: 'Sign in to ZimonAI',
      intro: 'Use this verification code to continue:',
      expiry: 'This code expires in 10 minutes and can be used once.',
      ignore: 'If you did not request this code, you can ignore this email.'
    },
    'zh-tw': {
      subject: '你的 ZimonAI 登入驗證碼',
      heading: '登入 ZimonAI',
      intro: '請輸入以下驗證碼以繼續：',
      expiry: '驗證碼將於 10 分鐘後失效，且只能使用一次。',
      ignore: '如果這不是你的操作，請直接忽略這封信。'
    },
    'zh-cn': {
      subject: '你的 ZimonAI 登录验证码',
      heading: '登录 ZimonAI',
      intro: '请输入以下验证码以继续：',
      expiry: '验证码将在 10 分钟后失效，且只能使用一次。',
      ignore: '如果这不是你的操作，请直接忽略这封邮件。'
    }
  }[locale] || null;
  const selected = copy || {
    subject: 'Your ZimonAI sign-in code',
    heading: 'Sign in to ZimonAI',
    intro: 'Use this verification code to continue:',
    expiry: 'This code expires in 10 minutes and can be used once.',
    ignore: 'If you did not request this code, you can ignore this email.'
  };
  const safeCode = escapeHtml(code);
  return {
    subject: selected.subject,
    text: `${selected.heading}\n\n${selected.intro} ${code}\n\n${selected.expiry}\n${selected.ignore}`,
    html: `<!doctype html><html><body style="margin:0;background:#f3f6fb;color:#10213a;font-family:Arial,sans-serif"><div style="max-width:560px;margin:0 auto;padding:32px 20px"><div style="background:#fff;border:1px solid #dbe3ef;border-radius:18px;padding:32px"><div style="font-size:13px;font-weight:700;letter-spacing:.16em;color:#285fc5">ZIMONAI</div><h1 style="font-size:24px;line-height:1.3;margin:22px 0 10px">${escapeHtml(selected.heading)}</h1><p style="font-size:16px;line-height:1.7;margin:0 0 22px">${escapeHtml(selected.intro)}</p><div style="font-size:34px;font-weight:700;letter-spacing:.22em;background:#eef4ff;border-radius:12px;padding:18px 20px;text-align:center">${safeCode}</div><p style="font-size:14px;line-height:1.7;color:#53627a;margin:22px 0 0">${escapeHtml(selected.expiry)}<br>${escapeHtml(selected.ignore)}</p></div></div></body></html>`
  };
}
