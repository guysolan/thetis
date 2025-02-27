-- Drop functions with explicit parameter types
DROP FUNCTION IF EXISTS insert_item_changes(data jsonb);

DROP FUNCTION IF EXISTS insert_order_item(in_order_id bigint, in_item_id bigint, in_quantity_change numeric, in_address_id bigint, in_item_price numeric, in_item_tax numeric);

DROP FUNCTION IF EXISTS insert_order_items(in_data jsonb);

DROP FUNCTION IF EXISTS insert_order(text, jsonb);

DROP FUNCTION IF EXISTS insert_order(text, timestamp, jsonb);

CREATE OR REPLACE FUNCTION insert_item_changes(in_data jsonb)
    RETURNS TABLE(
        id bigint,
        item_id bigint,
        quantity_change numeric,
        address_id bigint
    )
    AS $$
BEGIN
    RETURN QUERY INSERT INTO item_changes(item_id, quantity_change, address_id)
    SELECT
(t_x.item_id)::bigint AS item_id,
(t_x.quantity_change)::numeric AS quantity_change,
(t_x.address_id)::bigint AS address_id
    FROM
        jsonb_to_recordset(in_data) AS t_x(item_id bigint,
        quantity_change numeric,
        address_id bigint)
RETURNING
    item_changes.id,
    item_changes.item_id,
    item_changes.quantity_change,
    item_changes.address_id;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_order_item(in_order_id bigint, in_item_id bigint, in_quantity_change numeric, in_address_id bigint, in_item_price numeric, in_item_tax numeric)
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
    r_item_change record;
BEGIN
    SELECT
        * INTO r_item_change
    FROM
        insert_item_changes(jsonb_build_array(jsonb_build_object('item_id', in_item_id, 'quantity_change', in_quantity_change, 'address_id', in_address_id)))
    LIMIT 1;
    RETURN QUERY INSERT INTO order_item_changes(order_id, item_change_id, price, tax)
        VALUES (in_order_id, r_item_change.id, in_item_price, in_item_tax)
    RETURNING
        order_item_changes.order_id, order_item_changes.item_change_id, r_item_change.item_id, r_item_change.quantity_change, r_item_change.address_id, order_item_changes.price, order_item_changes.tax;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_order_items(in_data jsonb)
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
    r_item record;
BEGIN
    FOR r_item IN
    SELECT
        *
    FROM
        jsonb_to_recordset(in_data) AS t_x(order_id bigint,
        item_id bigint,
        quantity_change numeric,
        address_id bigint,
        item_price numeric,
        item_tax numeric)
        LOOP
            RETURN QUERY
            SELECT
                *
            FROM
                insert_order_item(r_item.order_id, r_item.item_id, r_item.quantity_change, r_item.address_id, r_item.item_price, r_item.item_tax);
        END LOOP;
END;
$$
LANGUAGE plpgsql;

-- Create the new version of insert_order with order_date parameter
CREATE OR REPLACE FUNCTION insert_order(in_order_type text, in_order_date timestamp, in_order_items jsonb)
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

