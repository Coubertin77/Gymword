/**
 * Supabase configuration — fill in after creating your project.
 * Guide: see supabase/schema.sql and instructions in the project folder.
 *
 * 1. Create a free project at https://supabase.com (region: EU Frankfurt)
 * 2. Run supabase/schema.sql in SQL Editor
 * 3. Copy Project URL + anon public key from Settings → API
 */
export const SUPABASE_URL = 'https://ogqzumuelpplfftsvfqy.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncXp1bXVlbHBwbGZmdHN2ZnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NzI1MjEsImV4cCI6MjA5NzQ0ODUyMX0.OrvUf2FX4_Ifs_FNqSkhq3wG7LKu_83fZIPyzUqgs0Y';

export function isCloudConfigured() {
  return Boolean(
    SUPABASE_URL
    && SUPABASE_ANON_KEY
    && !SUPABASE_URL.includes('YOUR_PROJECT')
    && SUPABASE_ANON_KEY !== 'YOUR_ANON_KEY'
  );
}
