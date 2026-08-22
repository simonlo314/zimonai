PRAGMA foreign_keys = ON;

-- Payment state remains an immutable record of what happened at the payment
-- provider.  Customer visibility, cancellation and internal archiving are
-- separate lifecycle concerns so a paid or refunded order is never deleted.
ALTER TABLE portal_orders
  ADD COLUMN cancelled_at TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_orders
  ADD COLUMN cancelled_by_user_id TEXT REFERENCES portal_users(id) ON DELETE SET NULL;

ALTER TABLE portal_orders
  ADD COLUMN customer_hidden_at TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_orders
  ADD COLUMN archived_at TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_orders
  ADD COLUMN archived_by_user_id TEXT REFERENCES portal_users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS portal_orders_customer_visibility_idx
  ON portal_orders(owner_user_id, customer_hidden_at, updated_at DESC);

CREATE INDEX IF NOT EXISTS portal_orders_admin_archive_idx
  ON portal_orders(archived_at, updated_at DESC);

-- An order can temporarily live inside an invited case before the verified
-- customer claims it.  Mirror the admin lifecycle fields so archiving or
-- cancelling that record survives the later claim operation.
ALTER TABLE portal_invited_cases
  ADD COLUMN order_cancelled_at TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_invited_cases
  ADD COLUMN order_cancelled_by_user_id TEXT REFERENCES portal_users(id) ON DELETE SET NULL;

ALTER TABLE portal_invited_cases
  ADD COLUMN order_archived_at TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_invited_cases
  ADD COLUMN order_archived_by_user_id TEXT REFERENCES portal_users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS portal_invited_cases_order_archive_idx
  ON portal_invited_cases(order_archived_at, updated_at DESC);
