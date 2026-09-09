/**
 * Lightweight database ping so the free Supabase project stays active.
 * Used by .github/workflows/keep-supabase-awake.yml
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = readFileSync(join(root, 'js/supabase-config.js'), 'utf8');
const url = config.match(/SUPABASE_URL = '([^']+)'/)?.[1];
const key = config.match(/SUPABASE_ANON_KEY = '([^']+)'/)?.[1];

if (!url || !key || url.includes('YOUR_PROJECT') || key === 'YOUR_ANON_KEY') {
  console.error('Supabase n’est pas configuré dans js/supabase-config.js');
  process.exit(1);
}

const endpoint = `${url}/rest/v1/gymword_data?id=eq.main&select=id,updated_at`;
const res = await fetch(endpoint, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
  },
});

if (!res.ok) {
  const body = await res.text().catch(() => '');
  console.error(`Ping cloud impossible (${res.status}) ${body.slice(0, 200)}`);
  process.exit(1);
}

const rows = await res.json();
console.log(`Cloud actif — ${rows?.[0]?.id || 'ok'} ${rows?.[0]?.updated_at || ''}`.trim());
