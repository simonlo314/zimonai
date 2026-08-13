CREATE TABLE IF NOT EXISTS daily_events (
  event_date TEXT NOT NULL,
  event_name TEXT NOT NULL,
  page_path TEXT NOT NULL,
  locale TEXT NOT NULL,
  target TEXT NOT NULL DEFAULT '',
  referrer TEXT NOT NULL DEFAULT 'direct',
  device TEXT NOT NULL DEFAULT 'desktop',
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (event_date, event_name, page_path, locale, target, referrer, device)
);

CREATE INDEX IF NOT EXISTS daily_events_date_name
  ON daily_events (event_date, event_name);

CREATE TABLE IF NOT EXISTS analytics_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO analytics_meta (key, value)
VALUES ('tracking_started', '2026-08-13')
ON CONFLICT(key) DO NOTHING;
