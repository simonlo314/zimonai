import { portalDb, portalJson, requireAdmin } from '../../_lib/auth.js';

export async function onRequestGet({ request, env }) {
  const authorization = await requireAdmin(request, env, { mutation: false });
  if (authorization.error) return authorization.error;
  const db = portalDb(env);
  const verified = await db.prepare(`
    SELECT u.id, u.primary_email, u.display_name, u.locale, u.role, u.status,
           u.created_at, u.updated_at, u.last_login_at,
           COUNT(DISTINCT c.id) AS case_count, COUNT(DISTINCT o.id) AS order_count
    FROM portal_users u
    JOIN portal_verified_emails e ON e.user_id = u.id
      AND EXISTS (
        SELECT 1 FROM portal_identities i
        WHERE i.user_id = e.user_id AND i.email_authoritative = 1
          AND lower(trim(i.provider_email)) = e.email_normalized
      )
    LEFT JOIN portal_cases c ON c.owner_user_id = u.id
    LEFT JOIN portal_orders o ON o.owner_user_id = u.id
    GROUP BY u.id, u.primary_email, u.display_name, u.locale, u.role, u.status,
             u.created_at, u.updated_at, u.last_login_at
    ORDER BY u.updated_at DESC
    LIMIT 200
  `).all();
  const invited = await db.prepare(`
    SELECT i.id, i.email_display, i.locale, i.status, i.created_at, i.updated_at,
           COUNT(d.id) AS case_count
    FROM portal_customer_invites i
    LEFT JOIN portal_invited_cases d ON d.invite_id = i.id AND d.status = 'pending'
    WHERE i.status = 'pending'
    GROUP BY i.id, i.email_display, i.locale, i.status, i.created_at, i.updated_at
    ORDER BY i.updated_at DESC
    LIMIT 200
  `).all();
  return portalJson({
    customers: (verified.results || []).map((row) => ({
      id: row.id,
      email: row.primary_email,
      name: row.display_name,
      locale: row.locale,
      role: row.role,
      status: row.status,
      caseCount: Number(row.case_count || 0),
      orderCount: Number(row.order_count || 0),
      lastLoginAt: row.last_login_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    })),
    invitations: (invited.results || []).map((row) => ({
      id: row.id,
      email: row.email_display,
      locale: row.locale,
      status: row.status,
      caseCount: Number(row.case_count || 0),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))
  });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
