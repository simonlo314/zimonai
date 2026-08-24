import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const database = 'zimonai-analytics';

const NAVIGATION_BUCKETS = [
  ['0000-0199', '0–199 ms'],
  ['0200-0499', '200–499 ms'],
  ['0500-0999', '500–999 ms'],
  ['1000-1999', '1,000–1,999 ms'],
  ['2000-4999', '2,000–4,999 ms'],
  ['5000-14999', '5,000–14,999 ms'],
  ['15000-plus', '15,000 ms 以上']
];

function dateInTaipei() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(date, days) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function previousWeek(today) {
  const value = new Date(`${today}T12:00:00Z`);
  const sinceMonday = (value.getUTCDay() + 6) % 7;
  const thisMonday = addDays(today, -sinceMonday);
  return {
    start: addDays(thisMonday, -7),
    end: addDays(thisMonday, -1),
    previousStart: addDays(thisMonday, -14),
    previousEnd: addDays(thisMonday, -8)
  };
}

function runQuery(sql) {
  const executable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const output = execFileSync(executable, [
    'wrangler', 'd1', 'execute', database, '--remote', '--json', '--command', sql
  ], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const parsed = JSON.parse(output);
  return parsed.flatMap((entry) => entry.results || []);
}

function inPeriod(row, start, end) {
  return row.event_date >= start && row.event_date <= end;
}

function sum(rowsForPeriod, predicate = () => true) {
  return rowsForPeriod.filter(predicate).reduce((total, row) => total + Number(row.count || 0), 0);
}

function grouped(rowsForPeriod, field, predicate = () => true, limit = 12) {
  const totals = new Map();
  rowsForPeriod.filter(predicate).forEach((row) => {
    const key = row[field] || 'unknown';
    totals.set(key, (totals.get(key) || 0) + Number(row.count || 0));
  });
  return [...totals.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
}

function navigationMetric(rowsForPeriod, metric) {
  const prefix = `${metric}:`;
  const totals = new Map();
  rowsForPeriod
    .filter((row) => row.event_name === 'navigation_performance' && String(row.target || '').startsWith(prefix))
    .forEach((row) => {
      const bucket = row.target.slice(prefix.length);
      totals.set(bucket, (totals.get(bucket) || 0) + Number(row.count || 0));
    });

  const buckets = NAVIGATION_BUCKETS.map(([bucket, label]) => ({
    bucket,
    label,
    count: totals.get(bucket) || 0
  }));
  return {
    sampleCount: buckets.reduce((total, bucket) => total + bucket.count, 0),
    buckets
  };
}

function technicalReliability(eventRows, clientErrorRows, clientErrorsAvailable) {
  return {
    clientErrors: {
      available: clientErrorsAvailable,
      signalCount: sum(clientErrorRows),
      byKind: grouped(clientErrorRows, 'error_kind'),
      byPage: grouped(clientErrorRows, 'page_path'),
      byBrowser: grouped(clientErrorRows, 'browser_family')
    },
    navigationPerformance: {
      collection: 'fixed_bucket_sample',
      ttfb: navigationMetric(eventRows, 'ttfb'),
      duration: navigationMetric(eventRows, 'duration')
    }
  };
}

export function summarizePeriod({
  start,
  end,
  eventRows,
  clientErrorRows = [],
  clientErrorsAvailable = false
}) {
  const selected = eventRows.filter((row) => inPeriod(row, start, end));
  const selectedErrors = clientErrorRows.filter((row) => inPeriod(row, start, end));
  const keyEvents = new Set(['cta_click', 'tier_select', 'contact_click', 'request_draft', 'request_submit']);
  const dailyViews = grouped(selected, 'event_date', (row) => row.event_name === 'page_view', 7)
    .sort((a, b) => a.name.localeCompare(b.name));
  return {
    start,
    end,
    pageViews: sum(selected, (row) => row.event_name === 'page_view'),
    sessions: sum(selected, (row) => row.event_name === 'session_start'),
    keyInteractions: sum(selected, (row) => keyEvents.has(row.event_name)),
    requestSubmissions: sum(selected, (row) => row.event_name === 'request_submit'),
    requestDrafts: sum(selected, (row) => row.event_name === 'request_draft'),
    contactClicks: sum(selected, (row) => row.event_name === 'contact_click'),
    topPages: grouped(selected, 'page_path', (row) => row.event_name === 'page_view'),
    locales: grouped(selected, 'locale', (row) => row.event_name === 'page_view'),
    devices: grouped(selected, 'device', (row) => row.event_name === 'page_view'),
    referrers: grouped(selected, 'referrer', (row) => row.event_name === 'page_view'),
    serviceTiers: grouped(selected, 'target', (row) => row.event_name === 'tier_select'),
    callsToAction: grouped(selected, 'target', (row) => row.event_name === 'cta_click'),
    contacts: grouped(selected, 'target', (row) => row.event_name === 'contact_click'),
    dailyViews,
    technicalReliability: technicalReliability(selected, selectedErrors, clientErrorsAvailable)
  };
}

export function buildWeeklyReport({ today = dateInTaipei(), query = runQuery } = {}) {
  const period = previousWeek(today);
  const eventRows = query(`
    SELECT event_date, event_name, page_path, locale, target, referrer, device,
           SUM(count) AS count
    FROM daily_events
    WHERE event_date BETWEEN '${period.previousStart}' AND '${period.end}'
    GROUP BY event_date, event_name, page_path, locale, target, referrer, device
    ORDER BY event_date ASC
  `);
  const meta = query("SELECT key, value FROM analytics_meta WHERE key = 'tracking_started'");
  const clientErrorTableExists = query(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table' AND name = 'client_error_events'
  `).length > 0;
  const clientErrorRows = clientErrorTableExists ? query(`
    SELECT event_date, page_path, locale, error_kind, error_category,
           resource_type, browser_family, SUM(count) AS count
    FROM client_error_events
    WHERE event_date BETWEEN '${period.previousStart}' AND '${period.end}'
    GROUP BY event_date, page_path, locale, error_kind, error_category,
             resource_type, browser_family
    ORDER BY event_date ASC
  `) : [];

  return {
    generatedAt: new Date().toISOString(),
    timezone: 'Asia/Taipei',
    trackingStarted: meta[0]?.value || null,
    current: summarizePeriod({
      start: period.start,
      end: period.end,
      eventRows,
      clientErrorRows,
      clientErrorsAvailable: clientErrorTableExists
    }),
    previous: summarizePeriod({
      start: period.previousStart,
      end: period.previousEnd,
      eventRows,
      clientErrorRows,
      clientErrorsAvailable: clientErrorTableExists
    })
  };
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(buildWeeklyReport(), null, 2));
}
