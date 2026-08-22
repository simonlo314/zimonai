import { portalDb, portalJson, readPortalJson, requireAdmin } from '../../_lib/auth.js';
import { emailSenderConfigured } from '../../_lib/email.js';
import { deliverQueuedNotifications } from '../../_lib/notifications.js';
import { auditStatement } from '../../_lib/workflow.js';

function notificationId(value) {
  const id = String(value || '');
  return /^mail_[A-Za-z0-9_-]{8,100}$/.test(id) ? id : '';
}

export async function onRequestGet({ request, env }) {
  const authorization = await requireAdmin(request, env, { mutation: false });
  if (authorization.error) return authorization.error;
  const rows = await portalDb(env).prepare(`
    SELECT id, notification_type, recipient_email, locale, status, attempts, available_at,
           last_error, provider_message_id, last_attempt_at, sent_at, created_at, updated_at
    FROM notification_outbox
    ORDER BY created_at DESC
    LIMIT 150
  `).all();
  return portalJson({
    emailConfigured: emailSenderConfigured(env),
    notifications: (rows.results || []).map((row) => ({
      id: row.id,
      type: row.notification_type,
      recipientEmail: row.recipient_email,
      locale: row.locale,
      status: row.status,
      attempts: Number(row.attempts || 0),
      availableAt: row.available_at,
      lastError: row.last_error || '',
      providerMessageId: row.provider_message_id || '',
      lastAttemptAt: row.last_attempt_at || '',
      sentAt: row.sent_at || '',
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const authorization = await requireAdmin(request, env);
  if (authorization.error) return authorization.error;
  const parsed = await readPortalJson(request, 4000);
  if (parsed.error) return parsed.error;
  const payload = parsed.data || {};
  const id = notificationId(payload.notificationId);
  const allFailed = payload.allFailed === true;
  if ((!id && !allFailed) || (id && allFailed) || Object.keys(payload).some((key) => !['notificationId', 'allFailed'].includes(key))) {
    return portalJson({ error: 'validation_failed' }, 400);
  }
  const db = portalDb(env);
  const now = new Date();
  const timestamp = now.toISOString();
  if (!emailSenderConfigured(env)) {
    await auditStatement(db, {
      actorUserId: authorization.session.user_id,
      eventType: 'admin_notification_retry_requested',
      details: { notificationId: id || null, allFailed, resetCount: 0, configured: false },
      now
    }).run();
    return portalJson({
      resetCount: 0,
      delivery: { configured: false, sent: 0, failed: 0 }
    });
  }
  const reset = id
    ? db.prepare(`
        UPDATE notification_outbox
        SET status = 'queued', available_at = ?1, last_error = '',
            attempts = CASE WHEN attempts >= 6 THEN 0 ELSE attempts END, updated_at = ?1
        WHERE id = ?2 AND status IN ('queued', 'failed')
      `).bind(timestamp, id)
    : db.prepare(`
        UPDATE notification_outbox
        SET status = 'queued', available_at = ?1, last_error = '',
            attempts = CASE WHEN attempts >= 6 THEN 0 ELSE attempts END, updated_at = ?1
        WHERE status = 'failed'
      `).bind(timestamp);
  const resetResult = await reset.run();
  const resetCount = Number(resetResult.meta?.changes || 0);
  if (id && resetCount !== 1) return portalJson({ error: 'retryable_notification_not_found' }, 404);
  await auditStatement(db, {
    actorUserId: authorization.session.user_id,
    eventType: 'admin_notification_retry_requested',
    details: { notificationId: id || null, allFailed, resetCount },
    now
  }).run();
  const delivery = await deliverQueuedNotifications(env, {
    limit: allFailed ? 25 : 1,
    now,
    notificationId: id
  });
  return portalJson({ resetCount, delivery });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
