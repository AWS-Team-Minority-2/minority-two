-- Functions
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.updatedAt IS NULL THEN
    NEW.updatedAt = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Migrations
-- create migration table
CREATE TABLE public.migration (
    name VARCHAR(255) NOT NULL PRIMARY KEY,
    migrated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);