CREATE OR REPLACE FUNCTION reset_orders_id_sequence()
    RETURNS TRIGGER
    AS $$
BEGIN
    -- Reset the sequence to the maximum id in the orders table
    IF(
        SELECT
            COUNT(*)
        FROM
            orders) > 0 THEN
        EXECUTE 'SELECT setval(pg_get_serial_sequence(''orders'', ''id''), COALESCE((SELECT MAX(id) FROM orders), 1))';
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER orders_id_sequence_trigger
    AFTER INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION reset_orders_id_sequence();

