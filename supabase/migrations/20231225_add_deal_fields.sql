-- Add new columns to deals table
ALTER TABLE deals
ADD COLUMN IF NOT EXISTS sample_dates TEXT,
ADD COLUMN IF NOT EXISTS deal_screenshot_url TEXT;
