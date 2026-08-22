PRAGMA foreign_keys = ON;

-- Closing a case records its workflow outcome. Archiving is a separate,
-- reversible administrator preference that only removes the closed case from
-- the default operations list; it never deletes client or audit data.
ALTER TABLE portal_cases
  ADD COLUMN archived_at TEXT NOT NULL DEFAULT '';

ALTER TABLE portal_cases
  ADD COLUMN archived_by_user_id TEXT REFERENCES portal_users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS portal_cases_admin_archive_idx
  ON portal_cases(archived_at, updated_at DESC);
