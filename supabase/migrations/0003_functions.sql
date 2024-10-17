SET check_function_bodies = OFF;

CREATE OR REPLACE FUNCTION public.process_order(p_order_type order_type, p_order_items jsonb)
    RETURNS bigint
    LANGUAGE plpgsql
    AS $function$
DECLARE
    v_order_id bigint;
    v_total_cost numeric(10, 2) := 0;
    item jsonb;
    v_item_id bigint;
    v_quantity integer;
    v_price numeric(10, 2);
    v_item_change_id bigint;
BEGIN
    -- Start a transaction
    BEGIN
        -- Create the order record
        INSERT INTO public.orders(type, carriage)
            VALUES (p_order_type, 0)
        RETURNING
            id INTO v_order_id;
        -- Process each item in the order
        FOR item IN
        SELECT
            *
        FROM
            jsonb_array_elements(p_order_items)
            LOOP
                v_item_id :=(item ->> 'id')::bigint;
                v_quantity :=(item ->> 'quantity')::integer;
                v_price :=(item ->> 'price')::numeric(10, 2);
                IF v_item_id IS NULL THEN
                    RAISE EXCEPTION 'Item with id % not found',(item ->> 'id');
                END IF;
                -- Create item_changes record
                INSERT INTO public.item_changes(item_id, quantity_change)
                    VALUES (v_item_id, CASE WHEN p_order_type = 'sale' THEN
                            - v_quantity
                        ELSE
                            v_quantity
                        END)
                RETURNING
                    id INTO v_item_change_id;
                -- Create order_item_changes record
                INSERT INTO public.order_item_changes(order_id, item_change_id, price, tax)
                    VALUES (v_order_id, v_item_change_id, v_price, 0);
                -- Update the total cost
                v_total_cost := v_total_cost +(v_price * v_quantity);
            END LOOP;
        -- Update the total cost of the order
        UPDATE
            public.orders
        SET
            carriage = v_total_cost
        WHERE
            id = v_order_id;
        -- Commit the transaction
        RETURN v_order_id;
    EXCEPTION
        WHEN OTHERS THEN
            -- Rollback the transaction in case of any error
            RAISE;
    END;
END;

$function$;

CREATE OR REPLACE FUNCTION public.upsert_item_with_components(p_name text, p_price numeric, p_type item_type, p_components jsonb, p_id bigint DEFAULT NULL::bigint)
    RETURNS bigint
    LANGUAGE plpgsql
    AS $function$
DECLARE
    v_item_id bigint;
    component jsonb;
BEGIN
    -- Input validation
    IF p_name IS NULL OR p_price IS NULL OR p_type IS NULL OR p_components IS NULL THEN
        RAISE EXCEPTION 'All parameters except p_id must not be null';
    END IF;
    -- Upsert the item
    IF p_id IS NULL THEN
        -- Insert new item
        INSERT INTO public.items(name, price, type)
            VALUES (p_name, p_price, p_type)
        RETURNING
            id INTO v_item_id;
    ELSE
        -- Update existing item
        UPDATE
            public.items
        SET
            name = p_name,
            price = p_price,
            type = p_type
        WHERE
            id = p_id
        RETURNING
            id INTO v_item_id;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'No item found with id %', p_id;
        END IF;
    END IF;
    -- Remove existing item components for this item
    DELETE FROM public.item_components
    WHERE parent_item_id = v_item_id;
    -- Insert new item components
    FOR component IN
    SELECT
        *
    FROM
        jsonb_array_elements(p_components)
        LOOP
            BEGIN
                INSERT INTO public.item_components(parent_item_id, component_item_id, quantity)
                    VALUES (v_item_id,(component ->> 'component_item_id')::bigint,(component ->> 'quantity')::numeric(10, 4));
            EXCEPTION
                WHEN OTHERS THEN
                    RAISE EXCEPTION 'Error inserting component: %', SQLERRM;
            END;
    END LOOP;
    RETURN v_item_id;
END;

$function$;

CREATE OR REPLACE FUNCTION public.create_shipment(p_carriage numeric(10, 2), p_item_changes jsonb)
    RETURNS bigint
    LANGUAGE plpgsql
    AS $function$
DECLARE
    v_shipment_id bigint;
    v_item_change jsonb;
    v_item_change_id bigint;
BEGIN
    -- Create new shipment
    INSERT INTO public.orders(type, carriage)
        VALUES ('shipment', p_carriage)
    RETURNING
        id INTO v_shipment_id;
    -- Process item changes
    FOR v_item_change IN
    SELECT
        *
    FROM
        jsonb_array_elements(p_item_changes)
        LOOP
            -- Create item change
            INSERT INTO public.item_changes(item_id, quantity_change, warehouse_id)
                VALUES ((v_item_change ->> 'item_id')::bigint,(v_item_change ->> 'quantity_change')::integer,(v_item_change ->> 'warehouse_id')::bigint)
            RETURNING
                id INTO v_item_change_id;
            -- Link item change to shipment
            INSERT INTO public.order_item_changes(order_id, item_change_id)
                VALUES (v_shipment_id, v_item_change_id);
        END LOOP;
    RETURN v_shipment_id;
END;
$function$;

