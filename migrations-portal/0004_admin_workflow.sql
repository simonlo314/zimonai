PRAGMA foreign_keys = ON;

-- Stripe events are recorded in the operational database before they mutate an
-- order. A failed handler can therefore be retried, while a processed event is
-- safe to replay without creating another case or notification.
CREATE TABLE IF NOT EXISTS portal_stripe_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  stripe_session_id TEXT NOT NULL,
  portal_order_id TEXT NOT NULL,
  event_created INTEGER NOT NULL DEFAULT 0,
  processing_status TEXT NOT NULL DEFAULT 'received'
    CHECK (processing_status IN ('received', 'processing', 'processed', 'rejected', 'failed')),
  error_code TEXT NOT NULL DEFAULT '',
  received_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  processed_at TEXT NOT NULL DEFAULT '',
  FOREIGN KEY (portal_order_id) REFERENCES portal_orders(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS portal_stripe_events_order_idx
  ON portal_stripe_events(portal_order_id, event_created DESC);

ALTER TABLE portal_orders
  ADD COLUMN last_stripe_event_created INTEGER NOT NULL DEFAULT 0;

ALTER TABLE portal_orders
  ADD COLUMN last_stripe_event_id TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_orders
  ADD COLUMN checkout_error TEXT NOT NULL DEFAULT '';

-- These notes never appear in a customer endpoint.  The table deliberately
-- does not have a portal_cases foreign key because an administrator may write
-- a note while a case is still waiting for an invited email to be verified.
CREATE TABLE IF NOT EXISTS portal_case_internal_notes (
  case_id TEXT PRIMARY KEY,
  note TEXT NOT NULL DEFAULT '',
  updated_by_user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (updated_by_user_id) REFERENCES portal_users(id) ON DELETE RESTRICT
);

-- Existing audit rows remain valid.  New workflow mutations can additionally
-- identify their target order/user and retain a small, non-secret change log.
ALTER TABLE portal_audit_events
  ADD COLUMN order_id TEXT REFERENCES portal_orders(id) ON DELETE SET NULL;

ALTER TABLE portal_audit_events
  ADD COLUMN target_user_id TEXT REFERENCES portal_users(id) ON DELETE SET NULL;

ALTER TABLE portal_audit_events
  ADD COLUMN detail_json TEXT NOT NULL DEFAULT '{}';

CREATE INDEX IF NOT EXISTS portal_audit_events_order_idx
  ON portal_audit_events(order_id, created_at DESC);

ALTER TABLE notification_outbox
  ADD COLUMN provider_message_id TEXT NOT NULL DEFAULT '';

ALTER TABLE notification_outbox
  ADD COLUMN last_attempt_at TEXT NOT NULL DEFAULT '';
