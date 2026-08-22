PRAGMA foreign_keys = ON;

-- A Google subject and control of the email address shown in its token are not
-- always the same assurance. Gmail addresses are authoritative; historical
-- Workspace identities must sign in again with a current `hd` claim before the
-- application may treat the address as owned. Email-code identities are always
-- authoritative because the code was delivered to the mailbox.
ALTER TABLE portal_identities
  ADD COLUMN email_authoritative INTEGER NOT NULL DEFAULT 0
  CHECK (email_authoritative IN (0, 1));

UPDATE portal_identities
SET email_authoritative = 1
WHERE provider = 'email'
   OR (provider = 'google' AND lower(trim(provider_email)) LIKE '%@gmail.com');

-- Earlier builds could map a non-authoritative Google identity to
-- portal_verified_emails. Isolate that principal onto a new empty account before
-- removing the unsafe mapping, so it cannot retain access to cases or orders
-- that may have been assigned by email. The record is retained for manual audit.
CREATE TABLE IF NOT EXISTS portal_identity_quarantine (
  provider TEXT NOT NULL,
  provider_subject TEXT NOT NULL,
  original_user_id TEXT NOT NULL,
  isolated_user_id TEXT NOT NULL UNIQUE,
  email_normalized TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (provider, provider_subject)
);

INSERT OR IGNORE INTO portal_identity_quarantine
  (provider, provider_subject, original_user_id, isolated_user_id,
   email_normalized, reason, created_at)
SELECT
  i.provider,
  i.provider_subject,
  i.user_id,
  'usr_isolated_' || lower(hex(randomblob(16))),
  lower(trim(i.provider_email)),
  'non_authoritative_google_email_mapping',
  strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
FROM portal_identities i
WHERE i.provider = 'google'
  AND i.email_authoritative = 0
  AND EXISTS (
    SELECT 1
    FROM portal_verified_emails e
    WHERE e.user_id = i.user_id
      AND e.email_normalized = lower(trim(i.provider_email))
  );

INSERT OR IGNORE INTO portal_users
  (id, primary_email, email_normalized, display_name, avatar_url, locale,
   role, status, created_at, updated_at, last_login_at)
SELECT
  q.isolated_user_id,
  i.provider_email,
  q.email_normalized,
  '',
  '',
  CASE WHEN u.locale IN ('en', 'zh-tw', 'zh-cn') THEN u.locale ELSE 'en' END,
  'client',
  'active',
  q.created_at,
  q.created_at,
  q.created_at
FROM portal_identity_quarantine q
JOIN portal_identities i
  ON i.provider = q.provider AND i.provider_subject = q.provider_subject
JOIN portal_users u ON u.id = q.original_user_id;

UPDATE portal_sessions
SET revoked_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
WHERE (auth_provider, auth_provider_subject) IN (
  SELECT provider, provider_subject FROM portal_identity_quarantine
);

DELETE FROM portal_admin_identities
WHERE (provider, provider_subject) IN (
  SELECT provider, provider_subject FROM portal_identity_quarantine
);

UPDATE portal_identities
SET user_id = (
  SELECT q.isolated_user_id
  FROM portal_identity_quarantine q
  WHERE q.provider = portal_identities.provider
    AND q.provider_subject = portal_identities.provider_subject
)
WHERE (provider, provider_subject) IN (
  SELECT provider, provider_subject FROM portal_identity_quarantine
);

-- Only an identity carrying current mailbox authority may support the unique
-- email-to-user ownership map. Unsafe historical rows are removed rather than
-- guessed or reassigned.
DELETE FROM portal_verified_emails
WHERE NOT EXISTS (
  SELECT 1
  FROM portal_identities i
  WHERE i.user_id = portal_verified_emails.user_id
    AND i.email_authoritative = 1
    AND lower(trim(i.provider_email)) = portal_verified_emails.email_normalized
);

DELETE FROM portal_admin_identities
WHERE NOT EXISTS (
  SELECT 1
  FROM portal_identities i
  WHERE i.provider = portal_admin_identities.provider
    AND i.provider_subject = portal_admin_identities.provider_subject
    AND i.user_id = portal_admin_identities.user_id
    AND i.email_authoritative = 1
);

-- If potentially customer-visible data remains on an account whose only login
-- was isolated above, fail closed and leave the ownership for manual review.
UPDATE portal_users
SET status = 'disabled', role = 'client', updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
WHERE id IN (SELECT original_user_id FROM portal_identity_quarantine)
  AND NOT EXISTS (
    SELECT 1 FROM portal_identities i
    WHERE i.user_id = portal_users.id AND i.email_authoritative = 1
  )
  AND (
    EXISTS (SELECT 1 FROM portal_cases c WHERE c.owner_user_id = portal_users.id)
    OR EXISTS (SELECT 1 FROM portal_orders o WHERE o.owner_user_id = portal_users.id)
  );

UPDATE portal_sessions
SET revoked_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
WHERE user_id IN (
  SELECT id FROM portal_users WHERE status = 'disabled'
);

UPDATE portal_users
SET role = 'client', updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
WHERE role = 'admin'
  AND NOT EXISTS (
    SELECT 1 FROM portal_admin_identities a WHERE a.user_id = portal_users.id
  );

CREATE INDEX IF NOT EXISTS portal_identities_email_authority_idx
  ON portal_identities(user_id, email_authoritative, provider_email);
