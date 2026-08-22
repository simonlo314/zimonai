import { emailSenderConfigured, sendTransactionalEmail } from './email.js';
import { cleanPortalLocale, normalizeEmail, portalDb, randomToken } from './auth.js';

function safePayload(payload) {
  const json = JSON.stringify(payload || {});
  if (json.length > 6000) throw new Error('notification_payload_too_large');
  return json;
}

export function notificationStatement(db, {
  type,
  to,
  locale = 'en',
  payload = {},
  dedupeKey,
  now = new Date()
}) {
  const email = normalizeEmail(to);
  if (!email || !type || !dedupeKey) throw new Error('notification_invalid');
  const timestamp = now.toISOString();
  return db.prepare(`
    INSERT OR IGNORE INTO notification_outbox
      (id, notification_type, recipient_email, locale, payload_json, dedupe_key,
       status, attempts, available_at, last_error, sent_at, created_at, updated_at,
       provider_message_id, last_attempt_at)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'queued', 0, ?7, '', '', ?7, ?7, '', '')
  `).bind(
    `mail_${randomToken(18)}`, String(type).slice(0, 100), email.normalized,
    cleanPortalLocale(locale), safePayload(payload), String(dedupeKey).slice(0, 240), timestamp
  );
}

export async function queueNotification(envOrDb, options) {
  const db = typeof envOrDb.prepare === 'function' ? envOrDb : portalDb(envOrDb);
  await notificationStatement(db, options).run();
}

export function adminNotificationEmails(env) {
  const configured = String(env.PORTAL_ADMIN_NOTIFICATION_EMAILS || '')
    .split(',')
    .map((item) => normalizeEmail(item)?.normalized || '')
    .filter(Boolean);
  return [...new Set(configured)];
}

function money(amount, currency) {
  return `${String(currency || 'usd').toUpperCase()} ${(Number(amount || 0) / 100).toFixed(2)}`;
}

function messageFor(row) {
  let payload = {};
  try { payload = JSON.parse(row.payload_json || '{}'); } catch { /* fail closed below */ }
  const locale = cleanPortalLocale(row.locale);
  const payment = money(payload.amountTotal, payload.currency);
  const copy = {
    en: {
      customerSubject: `ZimonAI payment received — ${payload.orderReference || ''}`,
      customerHeading: 'Payment received',
      customerBody: `We have recorded your ${payment} payment for ${payload.description || 'a ZimonAI service'}.`,
      adminSubject: `ZimonAI order paid — ${payload.orderReference || ''}`,
      adminHeading: 'A payment requires workflow review',
      adminBody: `${payload.orderReference || 'An order'} was paid for ${payment}.`,
      legacySubject: `ZimonAI legacy payment needs linking — ${payload.sessionId || ''}`,
      legacyHeading: 'A legacy Checkout payment needs manual linking',
      legacyBody: `Stripe session ${payload.sessionId || 'unknown'} paid ${payment} for ${payload.productKey || 'an unknown product'}${payload.customerEmail ? ` (reported email: ${payload.customerEmail})` : ''}. No portal owner or case was assigned automatically.`,
      manualSubject: `ZimonAI case update — ${payload.caseReference || ''}`,
      manualHeading: 'Your ZimonAI case is ready',
      manualBody: `A case has been prepared for ${payload.caseReference || 'your request'}. Sign in to provide or review the intake details.`
    },
    'zh-tw': {
      customerSubject: `ZimonAI 已收到付款｜${payload.orderReference || ''}`,
      customerHeading: '付款已收到',
      customerBody: `我們已登錄你為「${payload.description || 'ZimonAI 服務'}」支付的 ${payment}。`,
      adminSubject: `ZimonAI 訂單已付款｜${payload.orderReference || ''}`,
      adminHeading: '有一筆付款需要接續處理',
      adminBody: `${payload.orderReference || '一筆訂單'} 已支付 ${payment}。`,
      legacySubject: `ZimonAI 舊版付款待人工連結｜${payload.sessionId || ''}`,
      legacyHeading: '有一筆舊版 Checkout 付款需要人工連結',
      legacyBody: `Stripe Session ${payload.sessionId || '未知'} 已支付 ${payment}，項目為 ${payload.productKey || '未知'}${payload.customerEmail ? `，Stripe 回報 Email 為 ${payload.customerEmail}` : ''}。系統未自動指定客戶或建立案件。`,
      manualSubject: `ZimonAI 案件更新｜${payload.caseReference || ''}`,
      manualHeading: '你的 ZimonAI 案件已建立',
      manualBody: `我們已準備 ${payload.caseReference || '你的案件'}。請登入工作區補充或確認案件資料。`
    },
    'zh-cn': {
      customerSubject: `ZimonAI 已收到付款｜${payload.orderReference || ''}`,
      customerHeading: '付款已收到',
      customerBody: `我们已登记你为“${payload.description || 'ZimonAI 服务'}”支付的 ${payment}。`,
      adminSubject: `ZimonAI 订单已付款｜${payload.orderReference || ''}`,
      adminHeading: '有一笔付款需要接续处理',
      adminBody: `${payload.orderReference || '一笔订单'} 已支付 ${payment}。`,
      legacySubject: `ZimonAI 旧版付款待人工关联｜${payload.sessionId || ''}`,
      legacyHeading: '有一笔旧版 Checkout 付款需要人工关联',
      legacyBody: `Stripe Session ${payload.sessionId || '未知'} 已支付 ${payment}，项目为 ${payload.productKey || '未知'}${payload.customerEmail ? `，Stripe 返回邮箱为 ${payload.customerEmail}` : ''}。系统未自动指定客户或创建项目。`,
      manualSubject: `ZimonAI 案件更新｜${payload.caseReference || ''}`,
      manualHeading: '你的 ZimonAI 案件已创建',
      manualBody: `我们已准备 ${payload.caseReference || '你的案件'}。请登录工作区补充或确认案件资料。`
    }
  }[locale];
  const isAdmin = row.notification_type === 'admin_order_paid';
  const isLegacy = row.notification_type === 'admin_legacy_payment_detected';
  const isManual = row.notification_type === 'customer_case_invited';
  const subject = isLegacy ? copy.legacySubject : isAdmin ? copy.adminSubject : isManual ? copy.manualSubject : copy.customerSubject;
  const heading = isLegacy ? copy.legacyHeading : isAdmin ? copy.adminHeading : isManual ? copy.manualHeading : copy.customerHeading;
  const body = isLegacy ? copy.legacyBody : isAdmin ? copy.adminBody : isManual ? copy.manualBody : copy.customerBody;
  const portalUrl = `https://zimonai.com${locale === 'en' ? '' : `/${locale}`}/portal/`;
  const text = `${heading}\n\n${body}\n\n${portalUrl}`;
  const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const html = `<!doctype html><html><body style="margin:0;background:#f3f6fb;color:#10213a;font-family:Arial,sans-serif"><div style="max-width:600px;margin:0 auto;padding:28px 18px"><div style="background:#fff;border:1px solid #dbe3ef;border-radius:16px;padding:28px"><div style="font-size:13px;font-weight:700;letter-spacing:.14em;color:#285fc5">ZIMONAI</div><h1 style="font-size:24px;line-height:1.35;margin:20px 0 12px">${escape(heading)}</h1><p style="font-size:16px;line-height:1.7;margin:0 0 24px">${escape(body)}</p><a href="${portalUrl}" style="display:inline-block;background:#10213a;color:#fff;text-decoration:none;border-radius:10px;padding:13px 18px;font-weight:700">ZimonAI Portal</a></div></div></body></html>`;
  return { subject, text, html };
}

export async function deliverQueuedNotifications(env, { limit = 10, now = new Date(), notificationId = '' } = {}) {
  if (!emailSenderConfigured(env)) return { configured: false, sent: 0, failed: 0 };
  const db = portalDb(env);
  const timestamp = now.toISOString();
  const stale = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
  await db.prepare(`
    UPDATE notification_outbox
    SET status = 'failed', last_error = 'delivery_interrupted', updated_at = ?1
    WHERE status = 'sending' AND updated_at < ?2
  `).bind(timestamp, stale).run();
  const rows = await db.prepare(`
    SELECT id, notification_type, recipient_email, locale, payload_json, dedupe_key, attempts
    FROM notification_outbox
    WHERE status IN ('queued', 'failed') AND available_at <= ?1 AND attempts < 6
      AND (?3 = '' OR id = ?3)
    ORDER BY created_at ASC
    LIMIT ?2
  `).bind(timestamp, Math.max(1, Math.min(25, Number(limit) || 10)), String(notificationId || '')).all();
  let sent = 0;
  let failed = 0;
  for (const row of rows.results || []) {
    const claimed = await db.prepare(`
      UPDATE notification_outbox
      SET status = 'sending', attempts = attempts + 1, last_attempt_at = ?1, updated_at = ?1
      WHERE id = ?2 AND status IN ('queued', 'failed') AND attempts = ?3
    `).bind(timestamp, row.id, Number(row.attempts || 0)).run();
    if (Number(claimed.meta?.changes || 0) !== 1) continue;
    try {
      const message = messageFor(row);
      const result = await sendTransactionalEmail(env, {
        to: row.recipient_email,
        ...message,
        replyTo: env.EMAIL_REPLY_TO || 'simonlo@zimonai.com',
        idempotencyKey: row.dedupe_key
      });
      await db.prepare(`
        UPDATE notification_outbox
        SET status = 'sent', provider_message_id = ?1, sent_at = ?2,
            last_error = '', updated_at = ?2
        WHERE id = ?3 AND status = 'sending'
      `).bind(result.id, new Date().toISOString(), row.id).run();
      sent += 1;
    } catch (error) {
      const attempts = Number(row.attempts || 0) + 1;
      const delayMinutes = Math.min(360, 2 ** Math.min(attempts, 8));
      const available = new Date(now.getTime() + delayMinutes * 60 * 1000).toISOString();
      await db.prepare(`
        UPDATE notification_outbox
        SET status = 'failed', available_at = ?1, last_error = ?2, updated_at = ?3
        WHERE id = ?4 AND status = 'sending'
      `).bind(available, String(error?.message || 'email_delivery_failed').slice(0, 200), new Date().toISOString(), row.id).run();
      failed += 1;
    }
  }
  return { configured: true, sent, failed };
}
