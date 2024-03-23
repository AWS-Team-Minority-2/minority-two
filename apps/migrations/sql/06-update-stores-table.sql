-- Migration to add profile_image and rating_count columns to the store table
ALTER TABLE stores.store
ADD COLUMN IF NOT EXISTS profile_image VARCHAR(255);

ALTER TABLE stores.store
ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT floor(random() * 100);

ALTER TABLE stores.store
ADD COLUMN IF NOT EXISTS rating NUMERIC(3,1) DEFAULT 4.5 + random() * 0.5;