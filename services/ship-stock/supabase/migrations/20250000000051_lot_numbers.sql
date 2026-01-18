-- Add lot_number column to item_changes table
ALTER TABLE order_item_changes
    ADD COLUMN lot_number TEXT;

-- Create index on lot_number for faster lookups
CREATE INDEX idx_order_item_changes_lot_number ON order_item_changes(lot_number);

-- Comment on the column to document its purpose
COMMENT ON COLUMN order_item_changes.lot_number IS 'Tracks the lot or batch number associated with the item change for inventory traceability';

