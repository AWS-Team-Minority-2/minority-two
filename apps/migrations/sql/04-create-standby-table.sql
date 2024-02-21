-- Migration for min 7.0 to create isPending column on stores.stores

ALTER TABLE stores.store
ADD COLUMN is_pending BOOLEAN DEFAULT TRUE;

-- Update existing records
UPDATE stores.store
SET is_pending = FALSE;
