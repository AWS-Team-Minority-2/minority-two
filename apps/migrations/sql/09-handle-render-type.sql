-- Step 1: Add the new column
ALTER TABLE stores.store
ADD COLUMN is_featured BOOLEAN;

-- Step 2: Update the new column based on the current render_type
UPDATE stores.store
SET is_featured = (CASE WHEN render_type = 'featured' THEN TRUE ELSE FALSE END);


-- Step 3: Add the render column and copy the values from render_type
ALTER TABLE stores.store
ADD COLUMN type VARCHAR(255);

UPDATE stores.store
SET type = render_type;

-- Step 4: Drop the render_type column
ALTER TABLE stores.store
DROP COLUMN render_type;