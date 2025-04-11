-- Add lot_number column to order_item_changes table
ALTER TABLE public.order_item_changes
    ADD COLUMN IF NOT EXISTS lot_number text NULL;

-- Create index for lot_number column
CREATE INDEX IF NOT EXISTS idx_order_item_changes_lot_number ON public.order_item_changes USING btree(lot_number) TABLESPACE pg_default;

