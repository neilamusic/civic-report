-- Run this in your Supabase SQL Editor to create the reports table.
-- Go to: https://supabase.com/dashboard → your project → SQL Editor → New Query

CREATE TABLE reports (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  category    TEXT NOT NULL,
  location    TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public read and write (for this project)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON reports
  FOR ALL USING (true) WITH CHECK (true);
