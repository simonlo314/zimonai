import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const database = 'zimonai-analytics';

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

function previousWeek(today) {
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

const period = previousWeek(dateInTaipei());
const rows = runQuery(`
  SELECT event_date, event_name, page_path, locale, target, referrer, device,
         SUM(count) AS count
  FROM daily_events
  WHERE event_date BETWEEN '${period.previousStart}' AND '${period.end}'
  GROUP BY event_date, event_name, page_path, locale, target, referrer, device
  ORDER BY event_date ASC
`);
const meta = runQuery("SELECT key, value FROM analytics_meta WHERE key = 'tracking_started'");

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

function summarize(start, end) {
  const selected = rows.filter((row) => inPeriod(row, start, end));
  const keyEvents = new Set(['cta_click', 'tier_select', 'contact_click', 'request_draft']);
  const dailyViews = grouped(selected, 'event_date', (row) => row.event_name === 'page_view', 7)
    .sort((a, b) => a.name.localeCompare(b.name));
  return {
    start,
    end,
    pageViews: sum(selected, (row) => row.event_name === 'page_view'),
    sessions: sum(selected, (row) => row.event_name === 'session_start'),
    keyInteractions: sum(selected, (row) => keyEvents.has(row.event_name)),
    requestDrafts: sum(selected, (row) => row.event_name === 'request_draft'),
    contactClicks: sum(selected, (row) => row.event_name === 'contact_click'),
    topPages: grouped(selected, 'page_path', (row) => row.event_name === 'page_view'),
    locales: grouped(selected, 'locale', (row) => row.event_name === 'page_view'),
    devices: grouped(selected, 'device', (row) => row.event_name === 'page_view'),
    referrers: grouped(selected, 'referrer', (row) => row.event_name === 'page_view'),
    serviceTiers: grouped(selected, 'target', (row) => row.event_name === 'tier_select'),
    callsToAction: grouped(selected, 'target', (row) => row.event_name === 'cta_click'),
    contacts: grouped(selected, 'target', (row) => row.event_name === 'contact_click'),
    dailyViews
  };
}

const report = {
  generatedAt: new Date().toISOString(),
  timezone: 'Asia/Taipei',
  trackingStarted: meta[0]?.value || null,
  current: summarize(period.start, period.end),
  previous: summarize(period.previousStart, period.previousEnd)
};

console.log(JSON.stringify(report, null, 2));
