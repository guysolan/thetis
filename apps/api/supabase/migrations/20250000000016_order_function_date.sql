-- Function to insert a new order then run insert_order_items to insert the items with the order_id
-- Arguments: order_type, order_items
DROP FUNCTION IF EXISTS insert_order(in_order_type text, in_order_items jsonb);

CREATE OR REPLACE FUNCTION insert_order(in_order_type text, in_order_date timestamp, in_order_items jsonb)
    RETURNS TABLE(
        order_id bigint,
        item_change_id bigint,
        item_id bigint,
        quantity_change numeric,
        warehouse_id bigint,
        item_price numeric,
        item_tax numeric
    )
    AS $$
DECLARE
    v_order_id bigint;
BEGIN
    -- Insert the new order and get its ID, casting order_type to the enum type
    INSERT INTO orders(order_type, order_date)
        VALUES (in_order_type::order_type, in_order_date)
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

