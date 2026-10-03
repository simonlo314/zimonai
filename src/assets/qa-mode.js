// Anonymous opt-out only: no visitor ID, payload or QA activity is recorded.
// Explicitly enter with ?zimonai_qa=1 and leave with ?zimonai_qa=0.
export function initializeQaMode(location, document, getStorage = () => sessionStorage) {
  const key = 'zimonai_qa';
  const mode = new URL(location.href).searchParams.get(key);
  if (mode === '1' || mode === '0') {
    const enabled = mode === '1';
    try {
      document.cookie = `${key}=${enabled ? '1' : ''}; Path=/; SameSite=Strict${location.protocol === 'https:' ? '; Secure' : ''}${enabled ? '' : '; Max-Age=0'}`;
    } catch { /* The URL still excludes this page when cookies are unavailable. */ }
    try {
      const storage = getStorage();
      if (enabled) storage.setItem(key, '1');
      else {
        storage.removeItem(key);
        storage.removeItem('zimonai_analytics_session');
        storage.removeItem('zimonai_navigation_performance_sample');
        storage.removeItem('zimonai_navigation_performance_reported');
      }
    } catch { /* A session cookie supplies cross-page exclusion where possible. */ }
  }
  if (mode === '1') return true;
  if (mode === '0') return false;
  try {
    if (document.cookie.split(';').some((part) => part.trim() === `${key}=1`)) return true;
  } catch { /* Fall through to the tab-local opt-out. */ }
  try { return getStorage().getItem(key) === '1'; } catch { return false; }
}
