import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildWeeklyReport,
  previousWeek,
  summarizePeriod
} from '../scripts/weekly-analytics.mjs';

test('weekly periods use the last complete Monday-to-Sunday window', () => {
  assert.deepEqual(previousWeek('2026-08-24'), {
    start: '2026-08-17',
    end: '2026-08-23',
    previousStart: '2026-08-10',
    previousEnd: '2026-08-16'
  });
});

test('weekly reliability summary reports error signals and fixed navigation buckets without averages', () => {
  const summary = summarizePeriod({
    start: '2026-08-17',
    end: '2026-08-23',
    clientErrorsAvailable: true,
    eventRows: [
      { event_date: '2026-08-18', event_name: 'page_view', page_path: '/services/', locale: 'en', target: '', referrer: 'direct', device: 'desktop', count: 9 },
      { event_date: '2026-08-18', event_name: 'navigation_performance', page_path: '/services/', locale: 'en', target: 'ttfb:0200-0499', referrer: 'direct', device: 'desktop', count: 3 },
      { event_date: '2026-08-19', event_name: 'navigation_performance', page_path: '/zh-tw/', locale: 'zh-tw', target: 'ttfb:0500-0999', referrer: 'direct', device: 'mobile', count: 2 },
      { event_date: '2026-08-18', event_name: 'navigation_performance', page_path: '/services/', locale: 'en', target: 'duration:1000-1999', referrer: 'direct', device: 'desktop', count: 4 },
      { event_date: '2026-08-09', event_name: 'navigation_performance', page_path: '/', locale: 'en', target: 'ttfb:15000-plus', referrer: 'direct', device: 'desktop', count: 99 }
    ],
    clientErrorRows: [
      { event_date: '2026-08-18', page_path: '/services/', error_kind: 'runtime', browser_family: 'chrome', count: 2 },
      { event_date: '2026-08-19', page_path: '/services/', error_kind: 'resource', browser_family: 'safari', count: 3 },
      { event_date: '2026-08-19', page_path: '/zh-tw/', error_kind: 'runtime', browser_family: 'chrome', count: 1 },
      { event_date: '2026-08-09', page_path: '/', error_kind: 'promise', browser_family: 'edge', count: 50 }
    ]
  });

  assert.equal(summary.technicalReliability.clientErrors.signalCount, 6);
  assert.deepEqual(summary.technicalReliability.clientErrors.byKind, [
    { name: 'resource', count: 3 },
    { name: 'runtime', count: 3 }
  ]);
  assert.deepEqual(summary.technicalReliability.clientErrors.byPage, [
    { name: '/services/', count: 5 },
    { name: '/zh-tw/', count: 1 }
  ]);
  assert.deepEqual(summary.technicalReliability.clientErrors.byBrowser, [
    { name: 'chrome', count: 3 },
    { name: 'safari', count: 3 }
  ]);

  const performance = summary.technicalReliability.navigationPerformance;
  assert.equal(performance.collection, 'fixed_bucket_sample');
  assert.equal(performance.ttfb.sampleCount, 5);
  assert.equal(performance.duration.sampleCount, 4);
  assert.equal(performance.ttfb.buckets.find((item) => item.bucket === '0200-0499').count, 3);
  assert.equal(performance.ttfb.buckets.find((item) => item.bucket === '0500-0999').count, 2);
  assert.equal(performance.duration.buckets.find((item) => item.bucket === '1000-1999').count, 4);
  assert.equal('average' in performance.ttfb, false);
  assert.equal('average' in performance.duration, false);
});

test('weekly report remains usable before the client error table is deployed', () => {
  const queries = [];
  const report = buildWeeklyReport({
    today: '2026-08-24',
    query(sql) {
      queries.push(sql);
      if (sql.includes('FROM daily_events')) return [];
      if (sql.includes('FROM analytics_meta')) return [{ key: 'tracking_started', value: '2026-08-01' }];
      if (sql.includes('FROM sqlite_master')) return [];
      throw new Error(`Unexpected query: ${sql}`);
    }
  });

  assert.equal(report.current.technicalReliability.clientErrors.available, false);
  assert.equal(report.current.technicalReliability.clientErrors.signalCount, 0);
  assert.equal(report.current.technicalReliability.navigationPerformance.ttfb.sampleCount, 0);
  assert.equal(queries.some((sql) => sql.includes('FROM client_error_events')), false);
});

// Real SQL evaluation catches UTC/Taipei boundary mistakes and status filtering.
test('weekly report separates browser signals, retained inquiries and current notification status at Taipei boundaries', async () => {
  const { DatabaseSync } = await import('node:sqlite');
  const db = new DatabaseSync(':memory:');
  db.exec(`
    CREATE TABLE public_inquiries(created_at TEXT, status TEXT);
    CREATE TABLE notification_outbox(created_at TEXT, status TEXT, notification_type TEXT);
    INSERT INTO public_inquiries VALUES
      ('2026-09-20T15:59:59.999Z','closed'),
      ('2026-09-20T16:00:00.000Z','new'),
      ('2026-09-27T15:59:59.999Z','spam'),
      ('2026-09-27T16:00:00.000Z','qualified');
    INSERT INTO notification_outbox VALUES
      ('2026-09-20T16:00:00.000Z','queued','admin_public_inquiry_received'),
      ('2026-09-26T16:00:00.000Z','sent','admin_public_inquiry_received'),
      ('2026-09-27T16:00:00.000Z','failed','admin_public_inquiry_received'),
      ('2026-09-21T16:00:00.000Z','sent','case_update');
  `);
  try {
    const report = buildWeeklyReport({
      today: '2026-10-03',
      now: () => new Date('2026-10-03T10:00:00.000Z'),
      query(sql) {
        if (sql.includes('FROM daily_events')) return [{ event_date: '2026-09-25', event_name: 'request_submit', count: 7 }];
        return [];
      },
      queryPortal: (sql) => db.prepare(sql).all()
    });
    assert.equal(report.current.browserEvents.requestSuccessSignals, 7);
    assert.equal(report.current.businessRecords.savedInquiries.count, 2);
    assert.deepEqual(report.current.businessRecords.savedInquiries.byStatus, [{ status: 'new', count: 1 }, { status: 'spam', count: 1 }]);
    assert.equal(report.previous.businessRecords.savedInquiries.count, 1);
    assert.equal(report.current.businessRecords.inquiryNotifications.count, 2);
    assert.deepEqual(report.current.businessRecords.inquiryNotifications.byStatus, [{ status: 'queued', count: 1 }, { status: 'sent', count: 1 }]);
    assert.equal(report.current.businessRecords.startInclusive, '2026-09-20T16:00:00.000Z');
    assert.equal(report.current.businessRecords.endExclusive, '2026-09-27T16:00:00.000Z');
    assert.equal(report.dataAsOf.queryCompletedAt, '2026-10-03T10:00:00.000Z');
    assert.equal(report.timezone, 'Asia/Taipei');
    assert.equal(report.dataAsOf.atomicSnapshot, false);
  } finally { db.close(); }
});

test('missing portal access yields unknown independently of a verified zero', () => {
  const report = buildWeeklyReport({
    today: '2026-10-03', query: () => [],
    queryPortal(sql) {
      if (sql.includes('FROM public_inquiries')) throw Error('private failure detail must not leak');
      return [];
    }
  });
  assert.equal(report.current.businessRecords.savedInquiries.available, false);
  assert.equal(report.current.businessRecords.savedInquiries.count, null);
  assert.equal(report.current.businessRecords.inquiryNotifications.available, true);
  assert.equal(report.current.businessRecords.inquiryNotifications.count, 0);
  assert.equal(JSON.stringify(report).includes('private failure detail'), false);
});
