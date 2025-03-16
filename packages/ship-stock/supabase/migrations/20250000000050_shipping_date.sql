-- First, create a new enum type for payment status
CREATE TYPE payment_status_type AS ENUM(
    'unpaid',
    'paid',
    'overdue',
    'refunded',
    'cancelled'
);

-- Then alter the orders table to add the new columns
ALTER TABLE orders
    ADD COLUMN delivery_dates tstzrange DEFAULT tstzrange(now(), now()),
    ADD COLUMN payment_status payment_status_type DEFAULT 'unpaid';

-- Update existing orders to set default delivery_dates to the order_date
UPDATE
    orders
SET
    delivery_dates = tstzrange(order_date, order_date, '[]')
WHERE
    delivery_dates IS NULL
    AND order_date IS NOT NULL;

-- Add a comment explaining the delivery_dates column
COMMENT ON COLUMN orders.delivery_dates IS 'Range representing the planned delivery period for the order';

