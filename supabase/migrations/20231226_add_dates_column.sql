-- Add dates column to deals table
ALTER TABLE deals
ADD COLUMN IF NOT EXISTS dates TEXT;
