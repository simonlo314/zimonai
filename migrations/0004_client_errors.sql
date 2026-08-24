CREATE TABLE IF NOT EXISTS client_error_events (
  event_date TEXT NOT NULL,
  page_path TEXT NOT NULL,
  locale TEXT NOT NULL,
  error_kind TEXT NOT NULL,
  error_category TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  browser_family TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (
    event_date,
    page_path,
    locale,
    error_kind,
    error_category,
    resource_type,
    browser_family
  )
);

CREATE INDEX IF NOT EXISTS client_error_events_date_kind
  ON client_error_events (event_date, error_kind);

-- This is a site-wide hourly admission bucket, not a visitor identifier.
CREATE TABLE IF NOT EXISTS client_error_rate_limits (
  window_start TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
