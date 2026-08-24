# ZimonAI production release

Production releases are intentionally gated because the original analytics
schema was created before Wrangler's `d1_migrations` ledger was populated.
Running a raw `wrangler d1 migrations apply zimonai-analytics --remote` in that
state can replay `ALTER TABLE` from `0003_payment_customer_details.sql`.

Do not replace the guarded commands below with a direct D1 migration command.

## Current recovery: analytics migration ledger

Read-only inspection on 2026-08-24 confirmed all tables, columns and indexes
from analytics migrations 0001 through 0003 exist in `zimonai-analytics`, while
its `d1_migrations` table contains no rows. It also confirmed the 0004 client
error tables do not yet exist. `PORTAL_DB` has a healthy contiguous ledger
through 0007; only `0008_public_inquiries.sql` is pending.

First run the read-only gate:

```sh
npm run release:preflight
```

Until the ledger is repaired, this must stop with an explanation and perform no
remote write. Before either production mutation command, commit the reviewed
release, fast-forward it to `origin/main`, push it, and confirm that the local
worktree is clean. The guarded commands compare `HEAD` with both the local and
live `origin/main`; a dirty, unpushed or stale checkout stops before any D1
write. Review the preflight explanation, then run the one-purpose repair:

```sh
npm run db:repair:analytics-ledger -- --confirm=repair-zimonai-analytics-ledger
```

The repair command:

1. requires a clean, reviewed checkout whose `HEAD` exactly matches the live
   `origin/main`;
2. reads the remote schema and migration ledgers again;
3. requires the exact analytics 0001-0003 tables, columns and indexes and the
   complete Portal baseline through 0007, including authentication, sessions,
   identity authority, administrator identity, cases, orders, Stripe events,
   invitations and notification outbox contracts;
4. refuses to continue if any analytics 0004 table already exists or an unexpected
   migration is recorded;
5. exports both D1 databases to a private local backup directory outside the
   repository;
6. inserts only the missing analytics 0001-0003 migration names into the ledger;
7. reads the remote state again and verifies the repaired prefix.

It does not run a schema migration and does not deploy Pages.

## Controlled production release

After ledger repair, run the read-only gate again. It should report analytics
0004 and portal 0008 as the only pending migrations:

```sh
npm run release:preflight
```

Then release with the explicit production confirmation:

```sh
npm run deploy:production -- --confirm=deploy-zimonai-production
```

The release command stops before any write unless the worktree is clean,
`HEAD` exactly matches the local and live `origin/main`, both migration ledgers
are contiguous prefixes of the checked-in migration files, and the existing
analytics and Portal schemas match the migration contracts. The Git source
gate is repeated immediately before database writes and again before Pages
deployment so a concurrent edit or moved `origin/main` also fails closed. It
then:

1. runs the full build, repository checks and automated tests;
2. exports both remote D1 databases before migration;
3. applies pending analytics migrations;
4. applies pending portal migrations;
5. rechecks both ledgers and resulting schemas;
6. deploys `dist` to the `zimonai` Pages project only after every prior step
   succeeds, explicitly attaching the verified Git commit hash, commit message
   and a clean-worktree marker to the production deployment.

The SQL exports may contain customer information. They are written under
`../release-backups/` with restrictive permissions. Keep that directory
private and delete old exports according to the retention policy.

## Failure behavior

- A schema mismatch, ledger gap, failed test, failed export or failed migration
  prevents the Pages deployment.
- A dirty checkout, an unpushed commit, a stale local `origin/main`, or a live
  `origin/main` mismatch prevents every production mutation, including ledger
  repair.
- A partially completed migration must be inspected before retrying; do not
  edit the ledger to make an error disappear.
- Never delete D1 tables or migration rows to make a release pass.
- Never alter unrelated Cloudflare DNS, email, Stripe or Pages settings as part
  of this workflow.
