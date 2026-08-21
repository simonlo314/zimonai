# ZimonAI client portal setup

The client portal is intentionally disabled until Google OAuth credentials are configured and the local security checks pass. Never commit real credentials.

## Local review

1. Copy `.dev.vars.example` to `.dev.vars` and fill only local development values.
2. Keep `PORTAL_AUTH_ENABLED=false` when reviewing the signed-out interface without Google.
3. Apply the local D1 migrations with `npm run db:migrate:local`.
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

## Production gate

Production must use a dedicated D1 database bound as `PORTAL_DB`. The portal code deliberately refuses to enable production authentication when only `ANALYTICS_DB` is available; that database remains reserved for the existing analytics and Stripe records. Create and migrate the dedicated database before adding `PORTAL_AUTH_ENABLED=true`. Preview deployments must not receive the production Google credentials or session secret.

Do not deploy the portal until all of the following are confirmed:

- Real Google sign-in and sign-out work on the exact production callback.
- OAuth state, nonce and PKCE validation pass, including replay and cancellation tests.
- A signed-in user can see only cases owned by that account.
- The portal, its APIs and authentication responses are not cached or indexed.
- Privacy copy matches the account and case data actually stored.
- Existing Stripe Checkout products and the webhook still pass their regression checks.
- OAuth starts and case submissions are rate-limited without storing a raw IP address.
- English, Traditional Chinese and Simplified Chinese layouts pass desktop, mobile, keyboard and screen-reader checks.
