-- Add from_address_id and to_address_id columns to orders table
ALTER TABLE orders
    ADD COLUMN from_address_id bigint REFERENCES addresses(id) NULL,
    ADD COLUMN to_address_id bigint REFERENCES addresses(id) NULL;

-- Drop existing functions that need to be updated
DROP FUNCTION IF EXISTS insert_order(text, jsonb);

DROP FUNCTION IF EXISTS insert_order(text, timestamp, jsonb);

-- Create the new version of insert_order with order_date parameter
CREATE OR REPLACE FUNCTION insert_order(in_order_type text, in_order_date timestamp, in_order_items jsonb, in_from_address_id bigint DEFAULT NULL, in_to_address_id bigint DEFAULT NULL)
    RETURNS TABLE(
        order_id bigint,
        item_change_id bigint,
        item_id bigint,
        quantity_change numeric,
        address_id bigint,
        item_price numeric,
        item_tax numeric
    )
    AS $$
DECLARE
    v_order_id bigint;
BEGIN
    -- Insert the new order and get its ID, casting order_type to the enum type
    INSERT INTO orders(order_type, order_date, from_address_id, to_address_id)
        VALUES (in_order_type::order_type, in_order_date, in_from_address_id, in_to_address_id)
    RETURNING
        id INTO v_order_id;
    -- Add order_id to each item in the order_items JSON array
    RETURN QUERY
    SELECT
        *
    FROM
        insert_order_items((
            SELECT
                jsonb_agg(item || jsonb_build_object('order_id', v_order_id))
            FROM jsonb_array_elements(in_order_items) AS item));
END;
$$
LANGUAGE plpgsql;

DROP VIEW IF EXISTS orders_view;

-- Create a view for orders with total value and item details
-- This view aggregates order information including total value and itemized details
CREATE OR REPLACE VIEW orders_view AS
SELECT
    o.id AS order_id,
    o.order_type,
    o.order_date,
    o.carriage,
    -- Convert entire address rows to JSON and remove nulls
    CASE WHEN from_addr.id IS NOT NULL THEN
        to_jsonb(from_addr) - 'created_at' - 'updated_at'
    ELSE
        NULL
    END AS from_address,
    CASE WHEN to_addr.id IS NOT NULL THEN
        to_jsonb(to_addr) - 'created_at' - 'updated_at'
    ELSE
        NULL
    END AS to_address,
    SUM(
        CASE WHEN o.order_type = 'sale' THEN
            -1 * oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        ELSE
            oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        END) AS total_value,
    jsonb_agg(jsonb_build_object('item_id', i.id, 'item_name', i.name, 'item_type', i.type, 'address', to_jsonb(a) - 'created_at' - 'updated_at', 'quantity', ic.quantity_change, 'price', oic.price, 'tax', oic.tax, 'total',(
                CASE WHEN o.order_type = 'sale' THEN
                    -1 * ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
                ELSE
                    ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
                END))) AS items
FROM
    orders o
    LEFT JOIN addresses from_addr ON o.from_address_id = from_addr.id
    LEFT JOIN addresses to_addr ON o.to_address_id = to_addr.id
    JOIN order_item_changes oic ON o.id = oic.order_id
    JOIN item_changes ic ON oic.item_change_id = ic.id
    JOIN items i ON ic.item_id = i.id
    JOIN addresses a ON ic.address_id = a.id
GROUP BY
    o.id,
    o.order_type,
    o.order_date,
    o.carriage,
    from_addr.id,
    from_addr.name,
    from_addr.line_1,
    from_addr.line_2,
    from_addr.city,
    from_addr.region,
    from_addr.code,
    from_addr.country,
    from_addr.is_active,
    from_addr.holds_stock,
    to_addr.id,
    to_addr.name,
    to_addr.line_1,
    to_addr.line_2,
    to_addr.city;

