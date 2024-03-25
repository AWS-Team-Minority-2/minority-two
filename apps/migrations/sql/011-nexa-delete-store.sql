-- Migration to delete all data from stores.store and drop the table
-- Step 1: Delete all data from the table
DELETE FROM stores.store;

-- Step 2: Drop the table
DROP TABLE IF EXISTS stores.store;
