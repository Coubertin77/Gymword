import { SUPABASE_URL, SUPABASE_ANON_KEY, isCloudConfigured } from './supabase-config.js';

/** Direct REST calls — no external CDN (works better on school Wi‑Fi). */

function supabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

export async function fetchCloudData() {
  if (!isCloudConfigured()) return null;

  const url = `${SUPABASE_URL}/rest/v1/gymword_data?id=eq.main&select=payload`;
  const res = await fetch(url, { headers: supabaseHeaders() });
  if (!res.ok) {
    throw new Error(`Cloud lecture impossible (${res.status})`);
  }
  const rows = await res.json();
  return rows?.[0]?.payload || null;
}

export async function pushCloudData(payload) {
  if (!isCloudConfigured()) return { ok: false, reason: 'not_configured' };

  const url = `${SUPABASE_URL}/rest/v1/gymword_data?on_conflict=id`;
  const res = await fetch(url, {
    method: 'POST',
    headers: supabaseHeaders({
      Prefer: 'resolution=merge-duplicates,return=minimal',
    }),
    body: JSON.stringify({
      id: 'main',
      payload,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Cloud ecriture impossible (${res.status}) ${text}`.trim());
  }
  return { ok: true };
}

/** Shared file on GitHub Pages — works when Supabase is blocked at school. */
export async function fetchSharedClassroomFile() {
  try {
    const res = await fetch(`data/shared-classroom.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || typeof data !== 'object') return null;
    return data;
  } catch {
    return null;
  }
}
