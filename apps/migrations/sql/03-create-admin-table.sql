-- Schema
CREATE SCHEMA IF NOT EXISTS admins;

-- Table
CREATE TABLE IF NOT EXISTS admins.admin (
    name VARCHAR(255) NOT NULL,
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_code VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT unique_code UNIQUE (admin_code)
);

-- Trigger function to update the timestamp
CREATE OR REPLACE FUNCTION update_timestamp_function()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER update_admin
BEFORE UPDATE ON admins.admin
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_function();
