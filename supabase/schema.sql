-- GymWord — Supabase schema
-- Run this in Supabase → SQL Editor (project region: EU recommended for RGPD)

CREATE TABLE IF NOT EXISTS gymword_data (
  id TEXT PRIMARY KEY DEFAULT 'main',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO gymword_data (id, payload)
VALUES ('main', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE gymword_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "gymword_public_read" ON gymword_data;
DROP POLICY IF EXISTS "gymword_public_write" ON gymword_data;

CREATE POLICY "gymword_public_read"
  ON gymword_data FOR SELECT
  USING (true);

CREATE POLICY "gymword_public_write"
  ON gymword_data FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: enable Realtime if you want live teacher dashboard updates later
-- ALTER PUBLICATION supabase_realtime ADD TABLE gymword_data;
