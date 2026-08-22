# ZimonAI client portal setup

The client portal is intentionally disabled until at least one authentication provider is configured and the local security checks pass. Never commit real credentials.

## Local review

1. Copy `.dev.vars.example` to `.dev.vars` and fill only local development values.
2. Keep `PORTAL_AUTH_ENABLED=false` when reviewing the signed-out interface without authentication.
3. Apply the dedicated portal D1 migrations with `npm run db:migrate:portal:local`.
4. Build and verify with `npm run build && npm run check && npm test`.
5. Start the local Pages runtime with `npm run dev:pages`.
6. Open `http://127.0.0.1:8788/zh-tw/portal/`.

## Google OAuth web client

Create a Google OAuth 2.0 Web application and register only the exact callback URLs that are needed:

- Local: `http://127.0.0.1:8788/api/auth/google/callback`
- Production, after approval: `https://zimonai.com/api/auth/google/callback`

Local `.dev.vars` values:

```text
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
PORTAL_SESSION_SECRET=use-a-long-random-value
ALLOW_LOCAL_PORTAL=true
PORTAL_AUTH_ENABLED=true
```

Production secrets must be added as Cloudflare Pages secrets, not plain variables in the repository. Set `AUTH_BASE_URL=https://zimonai.com`. Do not enable a preview-domain or query-parameter login bypass.

## Email verification codes

Email sign-in is independent of Google sign-in. Email-code verification, Gmail and a current Google Workspace `hd` identity may resolve the same authoritative mailbox through one server-side mapping. A Google account that merely displays an externally hosted address is kept on a separate Google-subject account: it cannot own that mailbox, claim an invitation or receive work assigned by email.

The API contract is:

- `POST /api/auth/email/request` with JSON `{ "email", "locale", "returnTo" }` returns HTTP 202 and `{ "accepted": true, "expiresIn": 600 }` after the message is accepted by the sender.
- `POST /api/auth/email/verify` with JSON `{ "email", "code" }` returns the same authenticated account shape used by Google and sets the portal session cookie.
- Both endpoints require an exact allowed `Origin` and `Content-Type: application/json`.
- Codes contain six digits, expire after ten minutes, are one-time-use, and lock after five incorrect attempts. Request limits apply to both the normalized address and a one-way request fingerprint.

The sender interface is provider-neutral. A Worker binding named `EMAIL_TRANSPORT` may expose `sendTransactionalEmail(message)`. The first built-in HTTP adapter is Resend:

```text
PORTAL_EMAIL_AUTH_ENABLED=true
PORTAL_EMAIL_CODE_SECRET=use-a-different-long-random-value
EMAIL_PROVIDER=resend
RESEND_API_KEY=...
EMAIL_FROM=ZimonAI <simonlo@zimonai.com>
EMAIL_REPLY_TO=simonlo@zimonai.com
```

If no supported sender is fully configured, email sign-in fails closed and is reported as unavailable; it does not pretend to send a code.

Before production use, the selected email provider must verify `zimonai.com` as a sending domain. Add only the provider's required sending-domain DNS records after reviewing them in the provider dashboard. Do not remove or replace the existing MX, SPF, DKIM or DMARC records. The API key must be stored as a Cloudflare Pages secret and must never be committed to the repository.

## Administrator identities and pending customers

`PORTAL_ADMIN_EMAILS` is a comma-separated bootstrap allowlist. Admin authorization is granted only after an allowlisted authoritative Google identity or verified email-code identity signs in, and the provider plus provider subject is persisted in `portal_admin_identities`. A mutable browser control or a `portal_users.role` value alone is insufficient.

An administrator can prepare a case for an address that has never signed in. Those records remain in `portal_customer_invites` and `portal_invited_cases`; they are not fake active users and are not visible as customer-owned cases. Authoritative Google or email-code verification of the exact normalized address claims the pending work into the real account.

Migration `0005_identity_email_authority.sql` is a required production gate after `0004_admin_workflow.sql`. It removes historical non-authoritative Google email mappings, revokes those principal sessions and isolates each affected Google identity onto an empty account. If the old account already owns a case or order and has no other authoritative identity, it is disabled for manual review; do not reassign quarantined records automatically. Review `portal_identity_quarantine` after migration and resolve any rows against current mailbox evidence before restoring access.

`PORTAL_ADMIN_NOTIFICATION_EMAILS` is a separate comma-separated list used for operational email notifications. It does not grant administrator access. The current intended production value is:

```text
PORTAL_ADMIN_NOTIFICATION_EMAILS=simon124376158@gmail.com,simonlo@zimonai.com
```

## Orders, cases and notifications

Service and price pages remain publicly readable. Creating a Stripe Checkout Session requires a signed-in portal account, an exact allowed `Origin`, and that session's CSRF token. The server creates an authoritative `portal_orders` row before contacting Stripe and binds the portal user and order IDs into Stripe metadata. Balance payments and consultation extensions must reference work already owned by the signed-in account.

After a verified T1 or T2 payment, the webhook creates one `awaiting_client` case shell and records that intake is still required. A consultation payment creates only an order. A balance payment or consultation extension attaches to existing owned work and never creates another case. Stripe event replay and out-of-order delivery must not duplicate a case or regress a paid order. The same endpoint must subscribe to `charge.refunded`: only a signed, fully refunded Charge whose PaymentIntent, live/test mode, amount and currency exactly match one existing portal order may move that order and its analytics mirror to `refunded`. Partial or ambiguous refunds remain unchanged and never infer an owner.

Manual work stays deliberately separated:

- For a customer who has signed in, an administrator can create a case or a manual order for the verified account.
- For an email address that has not signed in, the administrator first creates a pending invited case and may attach a manual order to that case. The exact address must verify before the work becomes customer-visible.
- A standalone manual consultation order requires the customer to sign in first. Do not create a fictional verification case merely to hold that order.
- Creating work and confirming a manual payment are separate audited mutations.
- Marking a manual order `waived` is also audited, but it does not create or send a paid-order receipt because no payment was received.

Email delivery uses the same provider-neutral sender as email sign-in. Notifications first enter `notification_outbox`; the customer and administrator messages use separate dedupe keys. A newly recorded event makes an immediate delivery attempt. Failed rows remain visible through `GET /api/admin/notifications` and an exact administrator may explicitly retry one unsent message with `{ "notificationId": "..." }` or process the failed queue with `{ "allFailed": true }` using `POST /api/admin/notifications`. Without a scheduled queue consumer, the system does not guarantee that a failed row will submit itself again. An explicit retry may re-open a message that reached six attempts. A retry without a configured sender does not change the row, returns `configured: false`, and never reports an unsent message as delivered.

Checkout Sessions created before portal-owned orders were introduced do not contain `portal_order_id` or `portal_user_id`. A signed legacy event is accepted only when its server catalogue product, quantity, amount, currency, mode and live/test mode all match. It is mirrored idempotently into `ANALYTICS_DB`; a paid event also creates a deduplicated `admin_legacy_payment_detected` outbox alert for every configured operations recipient. The raw type is visible in the administrator Notifications view and the email includes the Stripe Session ID. The webhook never guesses an owner or creates a portal case for this legacy path.

## Production gate

Production must use a dedicated D1 database bound as `PORTAL_DB`. The portal code deliberately refuses to enable production authentication when only `ANALYTICS_DB` is available; that database remains reserved for the existing analytics and Stripe records. Create and migrate the dedicated database before adding `PORTAL_AUTH_ENABLED=true`. Preview deployments must not receive the production Google credentials or session secret.

Do not deploy the portal until all of the following are confirmed:

- Real Google sign-in and sign-out work on the exact production callback.
- OAuth state, nonce and PKCE validation pass, including replay and cancellation tests.
- A signed-in user can see only cases owned by that account.
- Authoritative Google and email-code sign-in for the same verified address converge on one account.
- A non-authoritative external Google address remains separate from the Email-owned account and cannot claim or receive work by email.
- An unverified invited address cannot read a pending case; the exact verified address can claim it once.
- Admin APIs require both an admin session and a persisted trusted admin identity.
- The portal, its APIs and authentication responses are not cached or indexed.
- Privacy copy matches the account and case data actually stored.
- Existing Stripe Checkout products and the webhook still pass their regression checks.
- Stripe webhook amount, currency, quantity, owner metadata, replay and out-of-order checks pass against `PORTAL_DB`.
- A signed full `charge.refunded` event updates exactly the PaymentIntent-linked portal and analytics order once; replay, late paid events, partial refunds and mismatched refund fields cannot regress or misassign it.
- Partial refunds are a hard NO-GO for this release. Do not issue one in Stripe: the webhook records it as rejected and leaves portal and analytics state unchanged until a reviewed manual reconciliation plan exists.
- A pre-portal Checkout payment is mirrored into `ANALYTICS_DB`, produces a visible `admin_legacy_payment_detected` record for configured operations recipients, and does not create or assign a portal case.
- The production email sender domain is verified, `EMAIL_FROM` and `EMAIL_REPLY_TO` are correct, and a real code plus order notification reach the intended inboxes.
- Failed outbox messages are visible in the administrator workbench and a controlled retry succeeds after the sender is restored.
- Portal D1 migrations are applied through `0005_identity_email_authority.sql`, and any `portal_identity_quarantine` rows are reviewed before authentication is enabled.
- OAuth starts and case submissions are rate-limited without storing a raw IP address.
- English, Traditional Chinese and Simplified Chinese layouts pass desktop, mobile, keyboard and screen-reader checks.
