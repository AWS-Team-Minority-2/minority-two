-- Migration for store sections
ALTER TABLE stores.store
ADD COLUMN IF NOT EXISTS section JSONB;





