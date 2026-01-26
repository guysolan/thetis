-- Create the new version of insert_order with company and address parameters
CREATE OR REPLACE FUNCTION insert_order(in_order_type text, in_order_date timestamp, in_order_items jsonb, in_from_company_id bigint DEFAULT NULL, in_to_company_id bigint DEFAULT NULL, in_from_billing_address_id bigint DEFAULT NULL, in_from_shipping_address_id bigint DEFAULT NULL, in_to_billing_address_id bigint DEFAULT NULL, in_to_shipping_address_id bigint DEFAULT NULL)
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
    INSERT INTO orders(order_type, order_date, from_company_id, to_company_id, from_billing_address_id, from_shipping_address_id, to_billing_address_id, to_shipping_address_id)
        VALUES (in_order_type::order_type, in_order_date, in_from_company_id, in_to_company_id, in_from_billing_address_id, in_from_shipping_address_id, in_to_billing_address_id, in_to_shipping_address_id)
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

