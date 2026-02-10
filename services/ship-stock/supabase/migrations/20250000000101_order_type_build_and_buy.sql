-- Add new order_type enum values: build (replaces purchase semantically), buy (simple incoming stock)
ALTER TYPE order_type ADD VALUE IF NOT EXISTS 'build';
ALTER TYPE order_type ADD VALUE IF NOT EXISTS 'buy';

-- Migrate existing purchase orders to build
UPDATE orders SET order_type = 'build'::order_type WHERE order_type = 'purchase';
