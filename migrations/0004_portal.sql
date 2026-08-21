PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS portal_users (
  id TEXT PRIMARY KEY,
  primary_email TEXT NOT NULL,
  email_normalized TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT NOT NULL DEFAULT '',
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'zh-tw', 'zh-cn')),
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_login_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS portal_users_email_idx
  ON portal_users(email_normalized);

CREATE TABLE IF NOT EXISTS portal_identities (
  provider TEXT NOT NULL,
  provider_subject TEXT NOT NULL,
  user_id TEXT NOT NULL,
  provider_email TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (provider, provider_subject),
  FOREIGN KEY (user_id) REFERENCES portal_users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS portal_identities_user_idx
  ON portal_identities(user_id);

CREATE TABLE IF NOT EXISTS portal_oauth_attempts (
  id_hash TEXT PRIMARY KEY,
  state_hash TEXT NOT NULL,
  code_verifier TEXT NOT NULL,
  nonce TEXT NOT NULL,
  return_path TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  consumed_at TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS portal_oauth_attempts_expiry_idx
  ON portal_oauth_attempts(expires_at);

CREATE TABLE IF NOT EXISTS portal_sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  csrf_token TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  revoked_at TEXT NOT NULL DEFAULT '',
  FOREIGN KEY (user_id) REFERENCES portal_users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS portal_sessions_user_idx
  ON portal_sessions(user_id);

CREATE INDEX IF NOT EXISTS portal_sessions_expiry_idx
  ON portal_sessions(expires_at);

CREATE TABLE IF NOT EXISTS portal_cases (
  id TEXT PRIMARY KEY,
  public_reference TEXT NOT NULL UNIQUE,
  owner_user_id TEXT NOT NULL,
  service_tier TEXT NOT NULL DEFAULT 'unsure' CHECK (service_tier IN ('unsure', 't1', 't2', 't3', 't4', 't5', 't6')),
  supplier_name TEXT NOT NULL,
  supplier_url TEXT NOT NULL DEFAULT '',
  chinese_legal_name TEXT NOT NULL DEFAULT '',
  product_category TEXT NOT NULL,
  product_model TEXT NOT NULL DEFAULT '',
  decision_context TEXT NOT NULL,
  requested_checks TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'awaiting_client', 'scoped', 'in_progress', 'delivered', 'closed')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (owner_user_id) REFERENCES portal_users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS portal_cases_owner_updated_idx
  ON portal_cases(owner_user_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS portal_audit_events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  case_id TEXT,
  event_type TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES portal_users(id) ON DELETE CASCADE,
  FOREIGN KEY (case_id) REFERENCES portal_cases(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS portal_audit_events_case_idx
  ON portal_audit_events(case_id, created_at DESC);

