import {
  portalDb,
  portalJson,
  readPortalJson,
  requireMutation
} from '../../../_lib/auth.js';
import { cancelPortalOrder, OrderLifecycleError } from '../../../_lib/order-lifecycle.js';
import { publicOrder, workflowId } from '../../../_lib/workflow.js';

function validId(value) {
  const id = String(value || '');
  return /^ord_[A-Za-z0-9_-]{8,100}$/.test(id) ? id : '';
}

function lifecycleError(error) {
  if (error instanceof OrderLifecycleError) {
    return portalJson({ error: error.code }, error.status);
  }
  throw error;
}

async function setCustomerVisibility(db, order, userId, action, now = new Date()) {
  const hiding = action === 'hide';
  if ((hiding && order.customer_hidden_at) || (!hiding && !order.customer_hidden_at)) return order;
  const timestamp = now.toISOString();
  const eventType = hiding ? 'customer_order_hidden' : 'customer_order_restored';
  const eventId = workflowId('evt');
  const hiddenAt = hiding ? timestamp : '';
  await db.batch([
    db.prepare(`
      UPDATE portal_orders
      SET customer_hidden_at = ?1, updated_at = ?2
      WHERE id = ?3 AND owner_user_id = ?4 AND customer_hidden_at = ?5
    `).bind(hiddenAt, timestamp, order.id, userId, hiding ? '' : order.customer_hidden_at),
    db.prepare(`
      INSERT INTO portal_audit_events
        (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
      SELECT ?1, ?2, case_id, ?3, ?4, id, owner_user_id, ?5
      FROM portal_orders
      WHERE id = ?6 AND owner_user_id = ?2 AND customer_hidden_at = ?7 AND updated_at = ?4
    `).bind(eventId, userId, eventType, timestamp, JSON.stringify({ hidden: hiding }), order.id, hiddenAt)
  ]);
  return db.prepare('SELECT * FROM portal_orders WHERE id = ?1 AND owner_user_id = ?2 LIMIT 1')
    .bind(order.id, userId).first();
}

export async function onRequestPatch({ request, env, params }) {
  const authorization = await requireMutation(request, env);
  if (authorization.error) return authorization.error;
  const id = validId(params?.id);
  if (!id) return portalJson({ error: 'order_not_found' }, 404);
  const parsed = await readPortalJson(request);
  if (parsed.error) return parsed.error;
  const payload = parsed.data || {};
  const fields = Object.keys(payload);
  const action = payload.action;
  if (fields.length !== 1 || fields[0] !== 'action' || !['cancel', 'hide', 'restore'].includes(action)) {
    return portalJson({ error: 'validation_failed' }, 400);
  }
  const db = portalDb(env);
  let order = await db.prepare(`
    SELECT * FROM portal_orders WHERE id = ?1 AND owner_user_id = ?2 LIMIT 1
  `).bind(id, authorization.session.user_id).first();
  if (!order) return portalJson({ error: 'order_not_found' }, 404);
  try {
    if (action === 'cancel') {
      order = await cancelPortalOrder({
        db,
        env,
        order,
        actorUserId: authorization.session.user_id,
        eventType: 'customer_order_cancelled'
      });
    } else {
      order = await setCustomerVisibility(db, order, authorization.session.user_id, action);
    }
  } catch (error) {
    return lifecycleError(error);
  }
  return portalJson({ order: publicOrder(order) });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
