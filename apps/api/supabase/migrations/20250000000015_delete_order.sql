CREATE OR REPLACE FUNCTION delete_order(in_order_id bigint)
    RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_item_change_ids bigint[];
BEGIN
    -- Get all item_change_ids associated with this order
    SELECT
        ARRAY_AGG(item_change_id) INTO v_item_change_ids
    FROM
        order_item_changes
    WHERE
        order_id = in_order_id;
    -- Delete the order (this will cascade delete order_item_changes due to FK constraint)
    DELETE FROM orders
    WHERE id = in_order_id;
    -- Delete the associated item_changes
    IF v_item_change_ids IS NOT NULL THEN
        DELETE FROM item_changes
        WHERE id = ANY (v_item_change_ids);
    END IF;
END;
$$;

