-- Schema
CREATE SCHEMA IF NOT EXISTS stores;

-- Function to generate custom IDs like "Nexa-1", "Nexa-2", etc.
CREATE OR REPLACE FUNCTION generate_store_id()
RETURNS VARCHAR(255) AS $$
DECLARE
    prefix VARCHAR(255) := 'Nexa-';
    count_id INTEGER;
    new_id VARCHAR(255);
BEGIN
    SELECT COUNT(*) INTO count_id FROM stores.store;
    new_id := prefix || count_id + 1;
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Table
CREATE TABLE IF NOT EXISTS stores.store (
    name VARCHAR(255) NOT NULL,
    sid VARCHAR(255) PRIMARY KEY, -- Changed type to VARCHAR from UUID
    cover_image VARCHAR(255),
    address VARCHAR(255),
    description VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_online BOOLEAN DEFAULT FALSE,
    profile_image VARCHAR(255),
    rating_count INTEGER DEFAULT floor(random() * 100),
    rating NUMERIC(3,1) DEFAULT 4.5 + random() * 0.5,
    is_featured BOOLEAN, -- Added is_featured column
    type VARCHAR(255), -- Added type column
    section JSONB, -- Added sections column
    is_pending BOOLEAN DEFAULT FALSE
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

-- Create a trigger to automatically set the custom ID when inserting new records
CREATE OR REPLACE FUNCTION set_store_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.sid := generate_store_id();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_store_id_trigger
BEFORE INSERT ON stores.store
FOR EACH ROW
EXECUTE FUNCTION set_store_id();
