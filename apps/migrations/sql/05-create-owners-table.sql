-- Owner Table
CREATE TABLE users.owner (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    owner_phone_number VARCHAR(15),
    owner_email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Migration for updating timestamps using the provided function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the timestamp update trigger to the "owner" table
CREATE TRIGGER update_owner_timestamp
BEFORE UPDATE ON users.owner
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Alter Table
ALTER TABLE stores.store 
ADD COLUMN business_email VARCHAR(255) UNIQUE,
ADD COLUMN domain VARCHAR(255) UNIQUE;
