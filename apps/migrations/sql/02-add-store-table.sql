-- Schema
CREATE SCHEMA IF NOT EXISTS stores;

-- Table
CREATE TABLE IF NOT EXISTS  stores.store (
    name VARCHAR(255) NOT NULL,
    sid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cover_image VARCHAR(255),
    address VARCHAR(255),
    description VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL -- Removed the extra comma here
);

-- Migration for updating timestamps using the provided function
CREATE OR REPLACE FUNCTION update_timestamp_store()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the timestamp update trigger to the "store" table
CREATE TRIGGER update_store_timestamp
BEFORE UPDATE ON stores.store
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_store();


ALTER TABLE stores.store
ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT FALSE;

ALTER TABLE stores.store
ADD COLUMN IF NOT EXISTS render_type VARCHAR(255) NOT NULL ;