-- Schema
CREATE SCHEMA IF NOT EXISTS users;

-- Table
CREATE TABLE users.user (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    phoneNumber VARCHAR(15),
    email VARCHAR(255),
    password VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zipCode VARCHAR(10),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT unique_email UNIQUE (email)
);

-- Migration for updating timestamps using the provided function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.updatedAt IS NULL THEN
    NEW.updatedAt = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the timestamp update trigger to the "user" table
CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON users.user
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
