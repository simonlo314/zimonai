# Approved redesign release — 2026-09-27

Simon explicitly authorized the production deployment in the existing conversation.
The approved release includes the complete trilingual redesign, subsequent menu,
photography and branding refinements, and the grouped T3–T6 custom-pricing entry.

## Pre-release evidence

- Production project: `zimonai`, domain `zimonai.com`; production branch `main`.
- Verified rollback deployment: `91e87820-da4e-4e21-a05e-9f8d8d514210`.
- Production compatibility date and D1 bindings match the checked-in configuration.
- Remote read-only preflight passed. Analytics has no pending migrations. Portal
  is at migration 0008; only additive migration 0009 is pending. It adds inquiry
  classification defaults and does not rewrite historical orders or cases.
- The previously unverified local Pages runtime now starts successfully. A second,
  isolated local runtime with a fresh D1 database and no real external credentials
  passed three-language inquiry creation, invalid-classification rejection,
  cross-origin rejection, and unauthenticated portal/admin/checkout rejection.
- Reading the isolated database confirmed all three inquiries retained
  `advanced / t4`; notification payloads retained the same classification.
  No user, case or order was created by inquiry submission. No email was sent.
- Full regression after release-hardening: 213 tests passed. The additional test
  protects the isolated artifact path and guarded deployment integration.
- Local synced `dist` unexpectedly accumulated duplicate numbered HTML copies.
  Their origin was not established. They are preserved, not treated as source,
  and excluded from deployment by building/checking a fresh temporary artifact.
  The original clean-Git, remote-main, schema and backup gates remain in force.

## Existing operational limits (not introduced by this redesign)

Production exposes Google sign-in but reports email sign-in unavailable. The
production configuration does not contain the transactional email-provider keys.
Notification records may be queued, but this is not proof of email delivery.
This release does not enable a new provider or copy development secrets into
production. Live Google authentication, paid Stripe transactions and real email
delivery are not claimed as end-to-end verified by the local regression tests.

Publication-cleared report interiors remain unavailable. Existing report covers
and properly disclosed context photographs are used; no evidence is fabricated.

## Release and recovery

Run only the guarded production release after the reviewed source is committed,
pushed and verified clean. It rebuilds and tests an isolated artifact, privately
exports both production databases, applies pending migrations and verifies the
resulting schema before uploading that artifact. Do not upload the preview dist.

If a release regression occurs, restore the prior Pages deployment. Migration
0009 is additive, so its columns can remain with the previous application.
Do not drop columns or restore a whole database over newer customer records
without separate assessment. Database exports stay outside the repository.

Post-deployment evidence will be saved in local output, including deployment ID,
commit, HTTP responses, language/SEO checks, API boundaries and browser captures.
This pre-release document alone is not proof of a successful deployment.
