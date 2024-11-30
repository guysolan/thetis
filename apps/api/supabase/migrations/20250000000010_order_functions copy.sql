-- Drop the old tables if they exist
DROP TABLE IF EXISTS stocktake_item_changes;

DROP TABLE IF EXISTS stocktakes;

DROP FUNCTION IF EXISTS insert_item_changes(data jsonb);

-- Add 'stocktake' to the order_type enum
ALTER TYPE order_type
    ADD VALUE IF NOT EXISTS 'stocktake';

ALTER TABLE orders RENAME COLUMN type TO order_type;

CREATE OR REPLACE FUNCTION insert_item_changes(in_data jsonb)
    RETURNS TABLE(
        id bigint,
        item_id bigint,
        quantity_change int,
        warehouse_id bigint
    )
    AS $$
BEGIN
    RETURN QUERY INSERT INTO item_changes(item_id, quantity_change, warehouse_id)
    SELECT
(t_x.item_id)::bigint AS item_id,
(t_x.quantity_change)::int AS quantity_change,
(t_x.warehouse_id)::bigint AS warehouse_id
    FROM
        jsonb_to_recordset(in_data) AS t_x(item_id bigint,
        quantity_change int,
        warehouse_id bigint)
RETURNING
    item_changes.id,
    item_changes.item_id,
    item_changes.quantity_change,
    item_changes.warehouse_id;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_order_item(in_order_id bigint, in_item_id bigint, in_quantity_change int, in_warehouse_id bigint, in_item_price numeric, in_item_tax numeric)
    RETURNS TABLE(
        order_id bigint,
        item_change_id bigint,
        item_id bigint,
        quantity_change int,
        warehouse_id bigint,
        item_price numeric,
        item_tax numeric
    )
    AS $$
DECLARE
    r_item_change record;
BEGIN
    SELECT
        * INTO r_item_change
    FROM
        insert_item_changes(jsonb_build_array(jsonb_build_object('item_id', in_item_id, 'quantity_change', in_quantity_change, 'warehouse_id', in_warehouse_id)))
    LIMIT 1;
    RETURN QUERY INSERT INTO order_item_changes(order_id, item_change_id, price, tax)
        VALUES (in_order_id, r_item_change.id, in_item_price, in_item_tax)
    RETURNING
        order_item_changes.order_id, order_item_changes.item_change_id, r_item_change.item_id, r_item_change.quantity_change, r_item_change.warehouse_id, order_item_changes.price, order_item_changes.tax;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_order_items(in_data jsonb)
    RETURNS TABLE(
        order_id bigint,
        item_change_id bigint,
        item_id bigint,
        quantity_change int,
        warehouse_id bigint,
        item_price numeric,
        item_tax numeric
    )
    AS $$
DECLARE
    r_item record;
BEGIN
    FOR r_item IN
    SELECT
        *
    FROM
        jsonb_to_recordset(in_data) AS t_x(order_id bigint,
        item_id bigint,
        quantity_change int,
        warehouse_id bigint,
        item_price numeric,
        item_tax numeric)
        LOOP
            RETURN QUERY
            SELECT
                *
            FROM
                insert_order_item(r_item.order_id, r_item.item_id, r_item.quantity_change, r_item.warehouse_id, r_item.item_price, r_item.item_tax);
        END LOOP;
END;
$$
LANGUAGE plpgsql;

-- Function to insert a new order then run insert_order_items to insert the items with the order_id
-- Arguments: order_type, order_items
CREATE OR REPLACE FUNCTION insert_order(in_order_type text, in_order_items jsonb)
    RETURNS TABLE(
        order_id bigint,
        item_change_id bigint,
        item_id bigint,
        quantity_change int,
        warehouse_id bigint,
        item_price numeric,
        item_tax numeric
    )
    AS $$
DECLARE
    v_order_id bigint;
BEGIN
    -- Insert the new order and get its ID, casting order_type to the enum type
    INSERT INTO orders(order_type)
        VALUES (in_order_type::order_type)
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

-- Create a view for orders with total value and item details
-- This view aggregates order information including total value and itemized details
CREATE OR REPLACE VIEW orders_view AS
SELECT
    -- Basic order information
    o.id AS order_id,
    o.order_type,
    o.order_date,
    o.carriage, -- Shipping/delivery costs
    -- Calculate total order value
    -- For sales: negative value (money going out)
    -- For purchases: positive value (money coming in)
    -- Includes price * quantity * (1 + tax rate)
    SUM(
        CASE WHEN o.order_type = 'sale' THEN
            -1 * oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        ELSE
            oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        END) AS total_value,
    -- Create a JSON array of all items in the order
    -- Each item object contains: item details, quantity, price, tax, and total value
    jsonb_agg(jsonb_build_object('item_id', i.id, 'item_name', i.name, 'item_type', i.type, 'warehouse_id', ic.warehouse_id, 'warehouse_name', w.name, 'quantity', ic.quantity_change, 'price', oic.price, 'tax', oic.tax, 'total',(
                CASE WHEN o.order_type = 'sale' THEN
                    -1 * ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
                ELSE
                    ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
                END))) AS items
FROM
    orders o
    -- Join with order_item_changes to get price and tax information
    JOIN order_item_changes oic ON o.id = oic.order_id
    -- Join with item_changes to get quantity information
    JOIN item_changes ic ON oic.item_change_id = ic.id
    -- Join with items to get item details
    JOIN items i ON ic.item_id = i.id
    -- Join with warehouses to get warehouse name
    JOIN warehouses w ON ic.warehouse_id = w.id
GROUP BY
    o.id,
    o.order_type,
    o.order_date,
    o.carriage;

