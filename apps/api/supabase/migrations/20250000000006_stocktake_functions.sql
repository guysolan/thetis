CREATE OR REPLACE FUNCTION insert_item_changes(data jsonb)
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
(x.item_id)::bigint AS item_id,
(x.quantity_change)::int AS quantity_change,
(x.warehouse_id)::bigint AS warehouse_id
    FROM
        jsonb_to_recordset(data) AS x(item_id bigint,
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

CREATE OR REPLACE FUNCTION insert_stocktake_changes(data jsonb)
    RETURNS TABLE(
        stocktake_id bigint,
        item_change_id bigint,
        item_id bigint,
        quantity_change int,
        warehouse_id bigint
    )
    AS $$
DECLARE
    item_change record;
    new_stocktake_id bigint;
BEGIN
    -- Insert item changes and process the results
    FOR item_change IN
    SELECT
        *
    FROM
        insert_item_changes(data)
        LOOP
            -- Insert into stocktakes and link with item changes
            INSERT INTO stocktakes(warehouse_id)
                VALUES (item_change.warehouse_id)
            RETURNING
                id INTO new_stocktake_id;
            -- Insert into stocktake_item_changes and return the results
            RETURN QUERY INSERT INTO stocktake_item_changes(stocktake_id, item_change_id)
                VALUES (new_stocktake_id, item_change.id)
            RETURNING
                stocktake_item_changes.stocktake_id, stocktake_item_changes.item_change_id, item_change.item_id, item_change.quantity_change, item_change.warehouse_id;
        END LOOP;
END;
$$
LANGUAGE plpgsql;

