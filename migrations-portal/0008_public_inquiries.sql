PRAGMA foreign_keys = ON;

-- Public requirement submissions are durable business records, not portal
-- accounts or cases.  A submission can only become a customer/case through a
-- later, explicit administrator action.
CREATE TABLE IF NOT EXISTS public_inquiries (
  id TEXT PRIMARY KEY,
  public_reference TEXT NOT NULL UNIQUE,
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'zh-tw', 'zh-cn')),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_email_normalized TEXT NOT NULL,
  company_name TEXT NOT NULL DEFAULT '',
  supplier_name TEXT NOT NULL,
  supplier_url TEXT NOT NULL DEFAULT '',
  chinese_legal_name TEXT NOT NULL DEFAULT '',
  product_category TEXT NOT NULL,
  question TEXT NOT NULL,
  consent_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'spam')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS public_inquiries_status_created_idx
  ON public_inquiries(status, created_at DESC);

CREATE INDEX IF NOT EXISTS public_inquiries_email_created_idx
  ON public_inquiries(contact_email_normalized, created_at DESC);

-- Only keyed hashes are retained for abuse control.  Raw IP addresses, user
-- agents, request URLs and query strings are deliberately absent.
CREATE TABLE IF NOT EXISTS public_inquiry_rate_limits (
  scope TEXT NOT NULL CHECK (scope IN ('ip', 'email')),
  key_hash TEXT NOT NULL,
  window_start TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1 CHECK (request_count >= 1),
  expires_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (scope, key_hash, window_start)
);

CREATE INDEX IF NOT EXISTS public_inquiry_rate_limits_expiry_idx
  ON public_inquiry_rate_limits(expires_at);
