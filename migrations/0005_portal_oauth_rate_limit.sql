ALTER TABLE portal_oauth_attempts
  ADD COLUMN request_fingerprint_hash TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS portal_oauth_attempts_fingerprint_created_idx
  ON portal_oauth_attempts(request_fingerprint_hash, created_at DESC);
