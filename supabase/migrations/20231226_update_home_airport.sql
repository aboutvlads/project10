-- Update home_airport column to JSONB type to store the entire airport object
ALTER TABLE user_profiles
ALTER COLUMN home_airport TYPE JSONB USING home_airport::JSONB;
