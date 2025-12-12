
-- Add motivations column to users table
ALTER TABLE users
ADD COLUMN motivations JSONB NULL;

-- Optional: Add a check constraint if you want to ensure it's a JSON array
-- ALTER TABLE users
-- ADD CONSTRAINT motivations_is_json_array CHECK (jsonb_typeof(motivations) = 'array' OR motivations IS NULL);
