import { SUPABASE_URL, SUPABASE_ANON_KEY, isCloudConfigured } from './supabase-config.js';

let client = null;
let createClientFn = null;

async function loadSupabase() {
  if (createClientFn) return createClientFn;
  const cdns = [
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.1/+esm',
    'https://esm.sh/@supabase/supabase-js@2.49.1',
  ];
  let lastErr = null;
  for (const url of cdns) {
    try {
      const mod = await import(url);
      createClientFn = mod.createClient;
      return createClientFn;
    } catch (err) {
      lastErr = err;
      console.warn('GymWord Supabase CDN failed:', url, err);
    }
  }
  throw lastErr || new Error('Impossible de charger la bibliothèque Supabase');
}

export async function getSupabase() {
  if (!isCloudConfigured()) return null;
  if (!client) {
    const createClient = await loadSupabase();
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return client;
}

export async function fetchCloudData() {
  const supabase = await getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('gymword_data')
    .select('payload')
    .eq('id', 'main')
    .maybeSingle();

  if (error) throw error;
  return data?.payload || null;
}

export async function pushCloudData(payload) {
  const supabase = await getSupabase();
  if (!supabase) return { ok: false, reason: 'not_configured' };

  const { error } = await supabase
    .from('gymword_data')
    .upsert({
      id: 'main',
      payload,
      updated_at: new Date().toISOString(),
    });

  if (error) throw error;
  return { ok: true };
}
