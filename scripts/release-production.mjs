import { chmodSync, mkdirSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_FILE = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(SCRIPT_FILE), '..');
const WRANGLER = path.join(ROOT, 'node_modules', '.bin', 'wrangler');
const ANALYTICS_DB = 'zimonai-analytics';
const PORTAL_DB = 'PORTAL_DB';
const ANALYTICS_BASELINE = [
  '0001_analytics.sql',
  '0002_payments.sql',
  '0003_payment_customer_details.sql',
];
const RELEASE_CONFIRMATION = 'deploy-zimonai-production';
const REPAIR_CONFIRMATION = 'repair-zimonai-analytics-ledger';
const PORTAL_BASELINE_END = '0007_case_archive.sql';
const PORTAL_BASE_TABLES = {
  notification_outbox: [
    'id:TEXT', 'notification_type:TEXT', 'recipient_email:TEXT', 'locale:TEXT',
    'payload_json:TEXT', 'dedupe_key:TEXT', 'status:TEXT', 'attempts:INTEGER',
    'available_at:TEXT', 'last_error:TEXT', 'sent_at:TEXT', 'created_at:TEXT',
    'updated_at:TEXT', 'provider_message_id:TEXT', 'last_attempt_at:TEXT',
  ],
  portal_admin_identities: [
    'provider:TEXT', 'provider_subject:TEXT', 'user_id:TEXT', 'verified_email:TEXT',
    'created_at:TEXT',
  ],
  portal_audit_events: [
    'id:TEXT', 'user_id:TEXT', 'case_id:TEXT', 'event_type:TEXT', 'created_at:TEXT',
    'order_id:TEXT', 'target_user_id:TEXT', 'detail_json:TEXT',
  ],
  portal_case_internal_notes: [
    'case_id:TEXT', 'note:TEXT', 'updated_by_user_id:TEXT', 'created_at:TEXT',
    'updated_at:TEXT',
  ],
  portal_cases: [
    'id:TEXT', 'public_reference:TEXT', 'owner_user_id:TEXT', 'service_tier:TEXT',
    'supplier_name:TEXT', 'supplier_url:TEXT', 'chinese_legal_name:TEXT',
    'product_category:TEXT', 'product_model:TEXT', 'decision_context:TEXT',
    'requested_checks:TEXT', 'status:TEXT', 'created_at:TEXT', 'updated_at:TEXT',
    'payment_order_id:TEXT', 'case_source:TEXT', 'expected_delivery_at:TEXT',
    'client_status_note:TEXT', 'report_url:TEXT', 'report_published_at:TEXT',
    'status_updated_at:TEXT', 'archived_at:TEXT', 'archived_by_user_id:TEXT',
  ],
  portal_customer_invites: [
    'id:TEXT', 'email_normalized:TEXT', 'email_display:TEXT', 'locale:TEXT',
    'status:TEXT', 'created_by_user_id:TEXT', 'claimed_by_user_id:TEXT',
    'expires_at:TEXT', 'claimed_at:TEXT', 'created_at:TEXT', 'updated_at:TEXT',
  ],
  portal_email_challenges: [
    'id_hash:TEXT', 'email_normalized:TEXT', 'email_display:TEXT', 'code_hash:TEXT',
    'request_fingerprint_hash:TEXT', 'locale:TEXT', 'return_path:TEXT',
    'expires_at:TEXT', 'attempts:INTEGER', 'max_attempts:INTEGER',
    'consumed_at:TEXT', 'invalidated_at:TEXT', 'sent_at:TEXT', 'created_at:TEXT',
  ],
  portal_identities: [
    'provider:TEXT', 'provider_subject:TEXT', 'user_id:TEXT', 'provider_email:TEXT',
    'created_at:TEXT', 'updated_at:TEXT', 'email_authoritative:INTEGER',
  ],
  portal_identity_quarantine: [
    'provider:TEXT', 'provider_subject:TEXT', 'original_user_id:TEXT',
    'isolated_user_id:TEXT', 'email_normalized:TEXT', 'reason:TEXT', 'created_at:TEXT',
  ],
  portal_invited_cases: [
    'id:TEXT', 'invite_id:TEXT', 'case_id:TEXT', 'case_public_reference:TEXT',
    'service_tier:TEXT', 'supplier_name:TEXT', 'supplier_url:TEXT',
    'chinese_legal_name:TEXT', 'product_category:TEXT', 'product_model:TEXT',
    'decision_context:TEXT', 'requested_checks:TEXT', 'case_status:TEXT',
    'expected_delivery_at:TEXT', 'client_status_note:TEXT', 'order_id:TEXT',
    'order_public_reference:TEXT', 'order_product_key:TEXT',
    'order_product_description:TEXT', 'order_amount_total:INTEGER',
    'order_currency:TEXT', 'order_quantity:INTEGER', 'order_payment_method_note:TEXT',
    'order_service_reference:TEXT', 'order_payment_status:TEXT',
    'order_fulfillment_status:TEXT', 'paid_at:TEXT', 'status:TEXT',
    'claimed_case_id:TEXT', 'claimed_order_id:TEXT', 'claimed_at:TEXT',
    'created_at:TEXT', 'updated_at:TEXT', 'order_cancelled_at:TEXT',
    'order_cancelled_by_user_id:TEXT', 'order_archived_at:TEXT',
    'order_archived_by_user_id:TEXT',
  ],
  portal_oauth_attempts: [
    'id_hash:TEXT', 'state_hash:TEXT', 'code_verifier:TEXT', 'nonce:TEXT',
    'return_path:TEXT', 'expires_at:TEXT', 'consumed_at:TEXT', 'created_at:TEXT',
    'request_fingerprint_hash:TEXT',
  ],
  portal_orders: [
    'id:TEXT', 'public_reference:TEXT', 'owner_user_id:TEXT', 'case_id:TEXT',
    'source:TEXT', 'product_key:TEXT', 'product_description:TEXT',
    'amount_total:INTEGER', 'currency:TEXT', 'quantity:INTEGER',
    'stripe_session_id:TEXT', 'payment_intent_id:TEXT', 'payment_method_note:TEXT',
    'service_reference:TEXT', 'payment_status:TEXT', 'fulfillment_status:TEXT',
    'created_by_user_id:TEXT', 'paid_at:TEXT', 'created_at:TEXT', 'updated_at:TEXT',
    'last_stripe_event_created:INTEGER', 'last_stripe_event_id:TEXT',
    'checkout_error:TEXT', 'cancelled_at:TEXT', 'cancelled_by_user_id:TEXT',
    'customer_hidden_at:TEXT', 'archived_at:TEXT', 'archived_by_user_id:TEXT',
  ],
  portal_sessions: [
    'token_hash:TEXT', 'user_id:TEXT', 'csrf_token:TEXT', 'expires_at:TEXT',
    'created_at:TEXT', 'last_seen_at:TEXT', 'revoked_at:TEXT', 'auth_provider:TEXT',
    'auth_provider_subject:TEXT',
  ],
  portal_stripe_events: [
    'event_id:TEXT', 'event_type:TEXT', 'stripe_session_id:TEXT',
    'portal_order_id:TEXT', 'event_created:INTEGER', 'processing_status:TEXT',
    'error_code:TEXT', 'received_at:TEXT', 'updated_at:TEXT', 'processed_at:TEXT',
  ],
  portal_users: [
    'id:TEXT', 'primary_email:TEXT', 'email_normalized:TEXT', 'display_name:TEXT',
    'avatar_url:TEXT', 'locale:TEXT', 'role:TEXT', 'status:TEXT', 'created_at:TEXT',
    'updated_at:TEXT', 'last_login_at:TEXT',
  ],
  portal_verified_emails: [
    'email_normalized:TEXT', 'email_display:TEXT', 'user_id:TEXT', 'verified_by:TEXT',
    'verified_at:TEXT', 'created_at:TEXT', 'updated_at:TEXT',
  ],
};
const PORTAL_BASE_INDEXES = {
  notification_outbox_delivery_idx: ['status', 'available_at', 'created_at'],
  portal_admin_identities_user_idx: ['user_id'],
  portal_audit_events_case_idx: ['case_id', 'created_at'],
  portal_audit_events_order_idx: ['order_id', 'created_at'],
  portal_cases_admin_archive_idx: ['archived_at', 'updated_at'],
  portal_cases_owner_updated_idx: ['owner_user_id', 'updated_at'],
  portal_cases_payment_order_idx: ['payment_order_id'],
  portal_customer_invites_claimed_user_idx: ['claimed_by_user_id', 'updated_at'],
  portal_customer_invites_pending_email_idx: ['email_normalized'],
  portal_email_challenges_email_created_idx: ['email_normalized', 'created_at'],
  portal_email_challenges_expiry_idx: ['expires_at'],
  portal_email_challenges_fingerprint_created_idx: ['request_fingerprint_hash', 'created_at'],
  portal_identities_email_authority_idx: ['user_id', 'email_authoritative', 'provider_email'],
  portal_identities_user_idx: ['user_id'],
  portal_invited_cases_claim_idx: ['invite_id', 'status', 'created_at'],
  portal_invited_cases_order_archive_idx: ['order_archived_at', 'updated_at'],
  portal_invited_cases_order_reference_idx: ['order_public_reference'],
  portal_oauth_attempts_expiry_idx: ['expires_at'],
  portal_oauth_attempts_fingerprint_created_idx: ['request_fingerprint_hash', 'created_at'],
  portal_orders_admin_archive_idx: ['archived_at', 'updated_at'],
  portal_orders_customer_visibility_idx: ['owner_user_id', 'customer_hidden_at', 'updated_at'],
  portal_orders_owner_reference_idx: ['owner_user_id', 'service_reference', 'updated_at'],
  portal_orders_owner_updated_idx: ['owner_user_id', 'updated_at'],
  portal_orders_payment_fulfillment_idx: ['payment_status', 'fulfillment_status', 'created_at'],
  portal_sessions_expiry_idx: ['expires_at'],
  portal_sessions_principal_idx: ['user_id', 'auth_provider', 'auth_provider_subject'],
  portal_sessions_user_idx: ['user_id'],
  portal_stripe_events_order_idx: ['portal_order_id', 'event_created'],
  portal_users_email_idx: ['email_normalized'],
  portal_verified_emails_user_idx: ['user_id'],
};

function fail(message) {
  throw new Error(message);
}

function run(command, args, { capture = false } = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    env: process.env,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    const detail = capture ? `\n${result.stderr || result.stdout}`.trimEnd() : '';
    fail(`${path.basename(command)} ${args.join(' ')} failed with exit code ${result.status}.${detail}`);
  }
  return capture ? result.stdout : '';
}

function gitOutput(args) {
  return run('git', args, { capture: true }).trim();
}

function assertReleaseSource({ git = gitOutput, expectedRoot = ROOT } = {}) {
  const repositoryRoot = git(['rev-parse', '--show-toplevel']);
  if (path.resolve(repositoryRoot) !== path.resolve(expectedRoot)) {
    fail(`Release checkout mismatch. Expected ${expectedRoot}, but Git resolved ${repositoryRoot}.`);
  }

  const status = git(['status', '--porcelain=v1', '--untracked-files=all']);
  if (status) {
    fail(
      'Production mutations require a clean Git worktree. Commit or remove every tracked and untracked change first.',
    );
  }

  const commitHash = git(['rev-parse', 'HEAD']);
  const localOriginMain = git(['rev-parse', '--verify', 'origin/main']);
  if (commitHash !== localOriginMain) {
    fail(
      `HEAD ${commitHash} does not exactly match the local origin/main ${localOriginMain}. ` +
      'Fast-forward and push the reviewed commit before any production mutation.',
    );
  }

  const remoteLine = git(['ls-remote', '--exit-code', 'origin', 'refs/heads/main']);
  const remoteOriginMain = remoteLine.split(/\s+/)[0] || '';
  if (!/^[0-9a-f]{40}$/i.test(remoteOriginMain)) {
    fail('Could not resolve the live origin/main commit hash. No production mutation was attempted.');
  }
  if (commitHash !== remoteOriginMain) {
    fail(
      `HEAD ${commitHash} does not exactly match the live origin/main ${remoteOriginMain}. ` +
      'Fetch, review and reconcile the branch before any production mutation.',
    );
  }

  const commitMessage = git(['log', '-1', '--format=%s']);
  return { commitHash, commitMessage };
}

function wranglerJson(args) {
  const output = run(WRANGLER, args, { capture: true });
  try {
    return JSON.parse(output);
  } catch {
    fail(`Wrangler returned non-JSON output for: wrangler ${args.join(' ')}`);
  }
}

function query(database, sql) {
  const response = wranglerJson([
    'd1',
    'execute',
    database,
    '--remote',
    '--json',
    '--command',
    sql,
  ]);
  if (!Array.isArray(response) || response.some((entry) => entry.success !== true)) {
    fail(`Remote read-only query failed for ${database}.`);
  }
  return response.flatMap((entry) => entry.results || []);
}

function migrationFiles(directory) {
  return readdirSync(path.join(ROOT, directory))
    .filter((name) => /^\d{4}_.+\.sql$/.test(name))
    .sort();
}

function schemaNames(database) {
  return new Set(
    query(
      database,
      "SELECT name FROM sqlite_master WHERE type IN ('table', 'index') ORDER BY name;",
    ).map((row) => row.name),
  );
}

function migrationLedger(database, names) {
  if (!names.has('d1_migrations')) return [];
  return query(database, 'SELECT name FROM d1_migrations ORDER BY id;').map((row) => row.name);
}

function tableColumns(database, table) {
  const safeTable = table.replaceAll("'", "''");
  return query(
    database,
    `SELECT name, upper(type) AS type FROM pragma_table_info('${safeTable}') ORDER BY cid;`,
  ).map((row) => `${row.name}:${row.type}`);
}

function indexColumns(database, index) {
  const safeIndex = index.replaceAll("'", "''");
  return query(
    database,
    `SELECT name FROM pragma_index_info('${safeIndex}') ORDER BY seqno;`,
  ).map((row) => row.name);
}

function assertList(actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(`${label} does not match the checked-in migration contract.\nExpected: ${expected.join(', ')}\nActual: ${actual.join(', ') || '(none)'}`);
  }
}

function assertTable(database, names, table, columns) {
  if (!names.has(table)) fail(`${database} is missing required table ${table}.`);
  assertList(tableColumns(database, table), columns, `${database}.${table} columns`);
}

function assertIndex(database, names, index, columns) {
  if (!names.has(index)) fail(`${database} is missing required index ${index}.`);
  assertList(indexColumns(database, index), columns, `${database}.${index} columns`);
}

function assertContiguousPrefix(database, local, applied) {
  if (applied.length > local.length) {
    fail(`${database} records migrations that do not exist in this checkout.`);
  }
  for (let index = 0; index < applied.length; index += 1) {
    if (applied[index] !== local[index]) {
      fail(
        `${database} migration history is not a contiguous prefix. ` +
        `Position ${index + 1} should be ${local[index]}, but the remote ledger contains ${applied[index]}.`,
      );
    }
  }
}

function verifyAnalyticsSchema(names, applied) {
  const baseObjectsPresent = ['daily_events', 'analytics_meta', 'stripe_events', 'payment_orders']
    .some((name) => names.has(name));

  if (!baseObjectsPresent) return { baseObjectsPresent: false };

  assertTable(ANALYTICS_DB, names, 'daily_events', [
    'event_date:TEXT', 'event_name:TEXT', 'page_path:TEXT', 'locale:TEXT',
    'target:TEXT', 'referrer:TEXT', 'device:TEXT', 'count:INTEGER', 'updated_at:TEXT',
  ]);
  assertTable(ANALYTICS_DB, names, 'analytics_meta', ['key:TEXT', 'value:TEXT']);
  assertTable(ANALYTICS_DB, names, 'stripe_events', [
    'event_id:TEXT', 'event_type:TEXT', 'created_at:TEXT',
  ]);
  assertTable(ANALYTICS_DB, names, 'payment_orders', [
    'stripe_session_id:TEXT', 'payment_intent_id:TEXT', 'product_key:TEXT',
    'amount_total:INTEGER', 'currency:TEXT', 'quantity:INTEGER', 'customer_email:TEXT',
    'customer_name:TEXT', 'service_reference:TEXT', 'payment_status:TEXT',
    'fulfillment_status:TEXT', 'created_at:TEXT', 'updated_at:TEXT',
    'customer_business_name:TEXT', 'customer_phone:TEXT', 'customer_tax_ids:TEXT',
  ]);
  assertIndex(ANALYTICS_DB, names, 'daily_events_date_name', ['event_date', 'event_name']);
  assertIndex(ANALYTICS_DB, names, 'payment_orders_status_idx', [
    'payment_status', 'fulfillment_status', 'created_at',
  ]);

  if (applied.includes('0004_client_errors.sql')) {
    assertTable(ANALYTICS_DB, names, 'client_error_events', [
      'event_date:TEXT', 'page_path:TEXT', 'locale:TEXT', 'error_kind:TEXT',
      'error_category:TEXT', 'resource_type:TEXT', 'browser_family:TEXT',
      'count:INTEGER', 'updated_at:TEXT',
    ]);
    assertTable(ANALYTICS_DB, names, 'client_error_rate_limits', [
      'window_start:TEXT', 'count:INTEGER', 'updated_at:TEXT',
    ]);
    assertIndex(ANALYTICS_DB, names, 'client_error_events_date_kind', [
      'event_date', 'error_kind',
    ]);
  }

  return { baseObjectsPresent: true };
}

function verifyPortalSchema(names, applied) {
  if (applied.length === 0) return;
  if (!applied.includes(PORTAL_BASELINE_END)) {
    fail(
      `${PORTAL_DB} has a partial pre-0008 migration history. ` +
      `This guarded release supports either a new database or a verified baseline through ${PORTAL_BASELINE_END}.`,
    );
  }

  for (const [table, columns] of Object.entries(PORTAL_BASE_TABLES)) {
    assertTable(PORTAL_DB, names, table, columns);
  }
  for (const [index, columns] of Object.entries(PORTAL_BASE_INDEXES)) {
    assertIndex(PORTAL_DB, names, index, columns);
  }

  if (applied.includes('0008_public_inquiries.sql')) {
    assertTable(PORTAL_DB, names, 'public_inquiries', [
      'id:TEXT', 'public_reference:TEXT', 'locale:TEXT', 'contact_name:TEXT',
      'contact_email:TEXT', 'contact_email_normalized:TEXT', 'company_name:TEXT',
      'supplier_name:TEXT', 'supplier_url:TEXT', 'chinese_legal_name:TEXT',
      'product_category:TEXT', 'question:TEXT', 'consent_at:TEXT', 'status:TEXT',
      'created_at:TEXT', 'updated_at:TEXT',
    ]);
    assertTable(PORTAL_DB, names, 'public_inquiry_rate_limits', [
      'scope:TEXT', 'key_hash:TEXT', 'window_start:TEXT', 'request_count:INTEGER',
      'expires_at:TEXT', 'updated_at:TEXT',
    ]);
    assertIndex(PORTAL_DB, names, 'public_inquiries_status_created_idx', ['status', 'created_at']);
    assertIndex(PORTAL_DB, names, 'public_inquiries_email_created_idx', [
      'contact_email_normalized', 'created_at',
    ]);
    assertIndex(PORTAL_DB, names, 'public_inquiry_rate_limits_expiry_idx', ['expires_at']);
  }
}

function inspectRemote({ allowAnalyticsLedgerRepair = false } = {}) {
  const analyticsLocal = migrationFiles('migrations');
  const portalLocal = migrationFiles('migrations-portal');
  const analyticsNames = schemaNames(ANALYTICS_DB);
  const portalNames = schemaNames(PORTAL_DB);
  const analyticsApplied = migrationLedger(ANALYTICS_DB, analyticsNames);
  const portalApplied = migrationLedger(PORTAL_DB, portalNames);

  assertContiguousPrefix(ANALYTICS_DB, analyticsLocal, analyticsApplied);
  assertContiguousPrefix(PORTAL_DB, portalLocal, portalApplied);
  const analyticsSchema = verifyAnalyticsSchema(analyticsNames, analyticsApplied);
  verifyPortalSchema(portalNames, portalApplied);

  const missingAnalyticsBaseline = ANALYTICS_BASELINE.filter(
    (migration) => !analyticsApplied.includes(migration),
  );
  if (analyticsSchema.baseObjectsPresent && missingAnalyticsBaseline.length > 0 && !allowAnalyticsLedgerRepair) {
    fail(
      `${ANALYTICS_DB} already contains the 0001-0003 schema, but its migration ledger is missing: ` +
      `${missingAnalyticsBaseline.join(', ')}. Applying migrations now could replay ALTER TABLE statements.\n` +
      `No remote write or deployment was attempted. Follow docs/PRODUCTION_RELEASE.md and run the explicit ledger-repair command first.`,
    );
  }

  return {
    analytics: {
      local: analyticsLocal,
      applied: analyticsApplied,
      pending: analyticsLocal.slice(analyticsApplied.length),
      names: analyticsNames,
      baseObjectsPresent: analyticsSchema.baseObjectsPresent,
    },
    portal: {
      local: portalLocal,
      applied: portalApplied,
      pending: portalLocal.slice(portalApplied.length),
      names: portalNames,
    },
  };
}

function printPlan(state) {
  const line = (name, value) => console.log(`${name}: ${value.length ? value.join(', ') : '(none)'}`);
  line('Analytics applied', state.analytics.applied);
  line('Analytics pending', state.analytics.pending);
  line('Portal applied', state.portal.applied);
  line('Portal pending', state.portal.pending);
}

function timestamp() {
  return new Date().toISOString().replaceAll(':', '-').replace(/\.\d{3}Z$/, 'Z');
}

function backupRemoteDatabases(label) {
  const directory = path.resolve(ROOT, '..', 'release-backups', `${timestamp()}-${label}`);
  mkdirSync(directory, { recursive: true, mode: 0o700 });

  for (const [database, file] of [
    [ANALYTICS_DB, 'zimonai-analytics.sql'],
    [PORTAL_DB, 'zimonai-portal.sql'],
  ]) {
    const output = path.join(directory, file);
    run(WRANGLER, [
      'd1', 'export', database, '--remote', '--skip-confirmation', '--output', output,
    ]);
    chmodSync(output, 0o600);
  }
  console.log(`Private local backup directory: ${directory}`);
  console.log('These SQL exports may contain customer data. Keep them private and delete them under the retention policy.');
  return directory;
}

function confirmValue() {
  const argument = process.argv.find((value) => value.startsWith('--confirm='));
  return argument ? argument.slice('--confirm='.length) : '';
}

function repairAnalyticsLedger() {
  if (confirmValue() !== REPAIR_CONFIRMATION) {
    fail(
      `Ledger repair is disabled without explicit confirmation. Re-run with ` +
      `--confirm=${REPAIR_CONFIRMATION} after reviewing docs/PRODUCTION_RELEASE.md.`,
    );
  }

  assertReleaseSource();
  const state = inspectRemote({ allowAnalyticsLedgerRepair: true });
  printPlan(state);

  if (!state.analytics.baseObjectsPresent) {
    fail('The analytics base schema is absent; this is a new database, not a ledger-repair case.');
  }
  if (state.analytics.applied.some((name) => !ANALYTICS_BASELINE.includes(name))) {
    fail('Analytics ledger repair only supports the verified pre-0004 production state.');
  }
  if (state.analytics.names.has('client_error_events') || state.analytics.names.has('client_error_rate_limits')) {
    fail('The 0004 schema already exists without a matching ledger entry; stop for manual review.');
  }

  const missing = ANALYTICS_BASELINE.filter((name) => !state.analytics.applied.includes(name));
  if (missing.length === 0) {
    console.log('Analytics migration ledger is already repaired; no write was needed.');
    return;
  }

  backupRemoteDatabases('before-analytics-ledger-repair');
  assertReleaseSource();
  const values = missing.map((name) => `('${name}')`).join(', ');
  const sql = `INSERT INTO d1_migrations (name) VALUES ${values} ON CONFLICT(name) DO NOTHING;`;
  run(WRANGLER, ['d1', 'execute', ANALYTICS_DB, '--remote', '--command', sql]);

  const repaired = inspectRemote();
  assertList(
    repaired.analytics.applied.slice(0, ANALYTICS_BASELINE.length),
    ANALYTICS_BASELINE,
    'Repaired analytics migration ledger',
  );
  console.log('Analytics migration ledger repair verified. No schema migration or Pages deployment was performed.');
}

function preflight() {
  const state = inspectRemote();
  printPlan(state);
  console.log('Remote migration history and checked-in schema contracts passed read-only preflight.');
}

function release() {
  if (confirmValue() !== RELEASE_CONFIRMATION) {
    fail(
      `Production release is disabled without explicit confirmation. Re-run with ` +
      `--confirm=${RELEASE_CONFIRMATION}.`,
    );
  }

  assertReleaseSource();
  const before = inspectRemote();
  printPlan(before);
  run('npm', ['run', 'release:verify']);
  assertReleaseSource();
  backupRemoteDatabases('before-production-migrations');
  assertReleaseSource();

  if (before.analytics.pending.length > 0) {
    run(WRANGLER, ['d1', 'migrations', 'apply', ANALYTICS_DB, '--remote']);
  }
  if (before.portal.pending.length > 0) {
    run(WRANGLER, ['d1', 'migrations', 'apply', PORTAL_DB, '--remote']);
  }

  const after = inspectRemote();
  if (after.analytics.pending.length || after.portal.pending.length) {
    fail('Remote migrations did not reach the checked-in head; Pages deployment was not attempted.');
  }
  console.log('Remote migration ledgers and resulting schemas verified. Deploying Pages.');
  const source = assertReleaseSource();
  run(WRANGLER, [
    'pages', 'deploy', 'dist', '--project-name', 'zimonai', '--branch', 'main',
    '--commit-hash', source.commitHash, '--commit-message', source.commitMessage,
    '--commit-dirty=false',
  ]);
}

function main() {
  const mode = process.argv[2] || 'preflight';
  try {
    if (mode === 'preflight') preflight();
    else if (mode === 'repair-analytics-ledger') repairAnalyticsLedger();
    else if (mode === 'release') release();
    else fail(`Unknown mode ${mode}. Use preflight, repair-analytics-ledger, or release.`);
  } catch (error) {
    console.error(`\nRelease safety check failed:\n${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_FILE) main();

export { PORTAL_BASE_INDEXES, PORTAL_BASE_TABLES, assertReleaseSource };
