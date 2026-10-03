// No QA identifiers are stored. Apply before telemetry validation or DB writes.
export function isQaRequest(request) {
  return request.headers.get('X-Zimonai-QA') === '1'
    || new URL(request.url).searchParams.get('zimonai_qa') === '1'
    || String(request.headers.get('Cookie') || '').split(';')
      .some((part) => part.trim() === 'zimonai_qa=1');
}
