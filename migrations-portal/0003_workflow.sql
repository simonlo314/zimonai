PRAGMA foreign_keys = ON;

-- One verified email belongs to exactly one portal account.  Authentication
-- providers may change, but a verified address must never create a second
-- customer record or expose another account's cases.
CREATE TABLE IF NOT EXISTS portal_verified_emails (
  email_normalized TEXT PRIMARY KEY,
  email_display TEXT NOT NULL,
  user_id TEXT NOT NULL,
  verified_by TEXT NOT NULL CHECK (verified_by IN ('google', 'email')),
  verified_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES portal_users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS portal_verified_emails_user_idx
  ON portal_verified_emails(user_id);

-- Administrator access is bootstrapped only after a verified, allowlisted
-- identity signs in.  Persisting provider + subject gives authorization a
-- second, immutable check beyond a mutable user role or a browser control.
CREATE TABLE IF NOT EXISTS portal_admin_identities (
  provider TEXT NOT NULL CHECK (provider IN ('google', 'email')),
  provider_subject TEXT NOT NULL,
  user_id TEXT NOT NULL,
  verified_email TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (provider, provider_subject),
  FOREIGN KEY (user_id) REFERENCES portal_users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS portal_admin_identities_user_idx
  ON portal_admin_identities(user_id);

-- Every session remembers the exact verified identity that created it.  Admin
-- authorization must match this principal rather than inheriting permission
-- merely because another identity happens to converge on the same user.
ALTER TABLE portal_sessions
  ADD COLUMN auth_provider TEXT NOT NULL DEFAULT ''
  CHECK (auth_provider IN ('', 'google', 'email'));

ALTER TABLE portal_sessions
  ADD COLUMN auth_provider_subject TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS portal_sessions_principal_idx
  ON portal_sessions(user_id, auth_provider, auth_provider_subject);

-- An administrator may prepare work for an email address that has not signed
-- in yet.  This record is deliberately not a portal user and grants no access.
-- The matching verified identity claims it only after Google or email-code
-- verification succeeds.
CREATE TABLE IF NOT EXISTS portal_customer_invites (
  id TEXT PRIMARY KEY,
  email_normalized TEXT NOT NULL,
  email_display TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'zh-tw', 'zh-cn')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'claimed', 'revoked')),
  created_by_user_id TEXT NOT NULL,
  claimed_by_user_id TEXT,
  -- No permanent/sentinel default: every invitation producer must choose a
  -- finite expiry.  The application default is fourteen days.
  expires_at TEXT NOT NULL,
  claimed_at TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (created_by_user_id) REFERENCES portal_users(id) ON DELETE RESTRICT,
  FOREIGN KEY (claimed_by_user_id) REFERENCES portal_users(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS portal_customer_invites_pending_email_idx
  ON portal_customer_invites(email_normalized)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS portal_customer_invites_claimed_user_idx
  ON portal_customer_invites(claimed_by_user_id, updated_at DESC);

-- Only unambiguous historical Google identities are backfilled.  If an old
-- dataset contains the same email on multiple users, login fails closed and
-- the conflict must be reviewed instead of guessing which user owns it.
INSERT OR IGNORE INTO portal_verified_emails
  (email_normalized, email_display, user_id, verified_by, verified_at, created_at, updated_at)
SELECT
  lower(trim(provider_email)),
  min(provider_email),
  min(user_id),
  'google',
  min(created_at),
  min(created_at),
  max(updated_at)
FROM portal_identities
WHERE provider = 'google' AND trim(provider_email) <> ''
GROUP BY lower(trim(provider_email))
HAVING count(DISTINCT user_id) = 1;

CREATE TABLE IF NOT EXISTS portal_email_challenges (
  id_hash TEXT PRIMARY KEY,
  email_normalized TEXT NOT NULL,
  email_display TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  request_fingerprint_hash TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'zh-tw', 'zh-cn')),
  return_path TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  max_attempts INTEGER NOT NULL DEFAULT 5 CHECK (max_attempts BETWEEN 1 AND 20),
  consumed_at TEXT NOT NULL DEFAULT '',
  invalidated_at TEXT NOT NULL DEFAULT '',
  sent_at TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS portal_email_challenges_email_created_idx
  ON portal_email_challenges(email_normalized, created_at DESC);

CREATE INDEX IF NOT EXISTS portal_email_challenges_fingerprint_created_idx
  ON portal_email_challenges(request_fingerprint_hash, created_at DESC);

CREATE INDEX IF NOT EXISTS portal_email_challenges_expiry_idx
  ON portal_email_challenges(expires_at);

CREATE TABLE IF NOT EXISTS portal_orders (
  id TEXT PRIMARY KEY,
  public_reference TEXT NOT NULL UNIQUE,
  owner_user_id TEXT NOT NULL,
  case_id TEXT,
  source TEXT NOT NULL CHECK (source IN ('stripe', 'manual')),
  product_key TEXT NOT NULL,
  product_description TEXT NOT NULL DEFAULT '',
  amount_total INTEGER NOT NULL CHECK (amount_total >= 0),
  currency TEXT NOT NULL DEFAULT 'usd',
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  stripe_session_id TEXT UNIQUE,
  payment_intent_id TEXT NOT NULL DEFAULT '',
  payment_method_note TEXT NOT NULL DEFAULT '',
  service_reference TEXT NOT NULL DEFAULT '',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'unpaid', 'paid', 'failed', 'expired', 'refunded', 'waived')),
  fulfillment_status TEXT NOT NULL DEFAULT 'awaiting_payment' CHECK (fulfillment_status IN ('awaiting_payment', 'awaiting_intake', 'reviewing', 'in_progress', 'delivered', 'closed')),
  created_by_user_id TEXT,
  paid_at TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (owner_user_id) REFERENCES portal_users(id) ON DELETE RESTRICT,
  FOREIGN KEY (case_id) REFERENCES portal_cases(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by_user_id) REFERENCES portal_users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS portal_orders_owner_updated_idx
  ON portal_orders(owner_user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS portal_orders_payment_fulfillment_idx
  ON portal_orders(payment_status, fulfillment_status, created_at DESC);

CREATE INDEX IF NOT EXISTS portal_orders_owner_reference_idx
  ON portal_orders(owner_user_id, service_reference, updated_at DESC);

-- Pending cases live outside portal_cases until the invited email has been
-- verified.  That prevents a placeholder or unverified user from ever owning
-- customer-visible work.  Admin APIs may create these rows later; the shared
-- auth helper atomically materializes them for the verified owner.
CREATE TABLE IF NOT EXISTS portal_invited_cases (
  id TEXT PRIMARY KEY,
  invite_id TEXT NOT NULL,
  case_id TEXT NOT NULL UNIQUE,
  case_public_reference TEXT NOT NULL UNIQUE,
  service_tier TEXT NOT NULL DEFAULT 'unsure' CHECK (service_tier IN ('unsure', 't1', 't2', 't3', 't4', 't5', 't6')),
  supplier_name TEXT NOT NULL,
  supplier_url TEXT NOT NULL DEFAULT '',
  chinese_legal_name TEXT NOT NULL DEFAULT '',
  product_category TEXT NOT NULL,
  product_model TEXT NOT NULL DEFAULT '',
  decision_context TEXT NOT NULL,
  requested_checks TEXT NOT NULL DEFAULT '',
  case_status TEXT NOT NULL DEFAULT 'submitted' CHECK (case_status IN ('submitted', 'reviewing', 'awaiting_client', 'scoped', 'in_progress', 'delivered', 'closed')),
  expected_delivery_at TEXT NOT NULL DEFAULT '',
  client_status_note TEXT NOT NULL DEFAULT '',
  order_id TEXT NOT NULL DEFAULT '',
  order_public_reference TEXT NOT NULL DEFAULT '',
  order_product_key TEXT NOT NULL DEFAULT '',
  order_product_description TEXT NOT NULL DEFAULT '',
  order_amount_total INTEGER NOT NULL DEFAULT 0 CHECK (order_amount_total >= 0),
  order_currency TEXT NOT NULL DEFAULT 'usd',
  order_quantity INTEGER NOT NULL DEFAULT 1 CHECK (order_quantity > 0),
  order_payment_method_note TEXT NOT NULL DEFAULT '',
  order_service_reference TEXT NOT NULL DEFAULT '',
  order_payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_payment_status IN ('pending', 'unpaid', 'paid', 'failed', 'expired', 'refunded', 'waived')),
  order_fulfillment_status TEXT NOT NULL DEFAULT 'awaiting_payment' CHECK (order_fulfillment_status IN ('awaiting_payment', 'awaiting_intake', 'reviewing', 'in_progress', 'delivered', 'closed')),
  paid_at TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'claimed', 'revoked')),
  claimed_case_id TEXT,
  claimed_order_id TEXT,
  claimed_at TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (invite_id) REFERENCES portal_customer_invites(id) ON DELETE CASCADE,
  FOREIGN KEY (claimed_case_id) REFERENCES portal_cases(id) ON DELETE SET NULL,
  FOREIGN KEY (claimed_order_id) REFERENCES portal_orders(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS portal_invited_cases_order_reference_idx
  ON portal_invited_cases(order_public_reference)
  WHERE order_public_reference <> '';

CREATE INDEX IF NOT EXISTS portal_invited_cases_claim_idx
  ON portal_invited_cases(invite_id, status, created_at);

CREATE TABLE IF NOT EXISTS notification_outbox (
  id TEXT PRIMARY KEY,
  notification_type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'zh-tw', 'zh-cn')),
  payload_json TEXT NOT NULL DEFAULT '{}',
  dedupe_key TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sending', 'sent', 'failed')),
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  available_at TEXT NOT NULL,
  last_error TEXT NOT NULL DEFAULT '',
  sent_at TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS notification_outbox_delivery_idx
  ON notification_outbox(status, available_at, created_at);

ALTER TABLE portal_cases
  ADD COLUMN payment_order_id TEXT REFERENCES portal_orders(id) ON DELETE SET NULL;

ALTER TABLE portal_cases
  ADD COLUMN case_source TEXT NOT NULL DEFAULT 'client' CHECK (case_source IN ('client', 'stripe', 'admin'));

ALTER TABLE portal_cases
  ADD COLUMN expected_delivery_at TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_cases
  ADD COLUMN client_status_note TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_cases
  ADD COLUMN report_url TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_cases
  ADD COLUMN report_published_at TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_cases
  ADD COLUMN status_updated_at TEXT NOT NULL DEFAULT '';

UPDATE portal_cases
SET status_updated_at = updated_at
WHERE status_updated_at = '';

CREATE UNIQUE INDEX IF NOT EXISTS portal_cases_payment_order_idx
  ON portal_cases(payment_order_id)
  WHERE payment_order_id IS NOT NULL;
