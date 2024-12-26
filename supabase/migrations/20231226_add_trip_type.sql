-- Add trip_type column to deals table
ALTER TABLE deals
ADD COLUMN IF NOT EXISTS trip_type TEXT DEFAULT 'roundtrip' CHECK (trip_type IN ('oneway', 'roundtrip'));
