SET check_function_bodies = OFF;

CREATE OR REPLACE FUNCTION public.process_purchase(p_purchase_items jsonb, p_parts_summary jsonb)
    RETURNS bigint
    LANGUAGE plpgsql
    AS $function$
DECLARE
    v_purchase_id bigint;
    v_total_cost numeric(10, 2) := 0;
    item jsonb;
    v_product_id bigint;
    v_quantity integer;
    v_price numeric(10, 2);
    v_part_id uuid;
    v_part_quantity numeric(10, 4);
BEGIN
    -- Start a transaction
    BEGIN
        -- Create the purchase record
        INSERT INTO public.purchases(total_cost, quantity)
            VALUES (0, 0)
        RETURNING
            id INTO v_purchase_id;
        -- Process each item in the order
        FOR item IN
        SELECT
            *
        FROM
            jsonb_array_elements(p_purchase_items)
            LOOP
                v_product_id :=(
                    SELECT
                        id
                    FROM
                        public.products
                    WHERE
                        uuid =(item ->> 'id')::uuid);
                v_quantity :=(item ->> 'quantity')::integer;
                IF v_product_id IS NULL THEN
                    RAISE EXCEPTION 'Product with uuid % not found',(item ->> 'id')::uuid;
                END IF;
                -- Get the product price and update stock
                UPDATE
                    public.products
                SET
                    quantity = quantity + v_quantity
                WHERE
                    id = v_product_id
                RETURNING
                    price INTO v_price;
                -- Update the total cost
                v_total_cost := v_total_cost +(v_price * v_quantity);
                -- Create purchase_products record
                INSERT INTO public.purchase_products(purchase_id, product_id, quantity)
                    VALUES (v_purchase_id, v_product_id, v_quantity);
            END LOOP;
        -- Update parts stock based on partsSummary
        FOR item IN
        SELECT
            *
        FROM
            jsonb_array_elements(p_parts_summary)
            LOOP
                v_part_id :=(item ->> 'id')::uuid;
                v_part_quantity :=(item ->> 'partsChange')::numeric(10, 4);
                UPDATE
                    public.parts
                SET
                    quantity = quantity + v_part_quantity
                WHERE
                    uuid = v_part_id;
                IF NOT FOUND THEN
                    RAISE EXCEPTION 'Part with uuid % not found', v_part_id;
                END IF;
                -- Create purchase_parts record
                INSERT INTO public.purchase_parts(purchase_id, part_id, quantity)
                    VALUES (v_purchase_id,(
                            SELECT
                                id
                            FROM
                                public.parts
                            WHERE
                                uuid = v_part_id), v_part_quantity);
            END LOOP;
        -- Update the total cost and quantity of the purchase
        UPDATE
            public.purchases
        SET
            total_cost = v_total_cost,
            quantity =(
                SELECT
                    SUM(quantity)
                FROM
                    public.purchase_products
                WHERE
                    purchase_id = v_purchase_id)
        WHERE
            id = v_purchase_id;
        -- Commit the transaction
        RETURN v_purchase_id;
    EXCEPTION
        WHEN OTHERS THEN
            -- Rollback the transaction in case of any error
            RAISE;
    END;
END;

$function$;

CREATE OR REPLACE FUNCTION public.process_sale(p_sale_items jsonb)
    RETURNS integer
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $function$
DECLARE
    v_sale_id integer;
    v_total_cost DECIMAL(10, 2) := 0;
    v_item jsonb;
    v_product_id integer;
    v_quantity integer;
    v_product_price DECIMAL(10, 2);
BEGIN
    -- Start a transaction
    BEGIN
        -- Create a new sale record
        INSERT INTO public.sales(total_cost)
            VALUES (0)
        RETURNING
            id INTO v_sale_id;
        -- Process each sale item
        FOR v_item IN
        SELECT
            *
        FROM
            jsonb_array_elements(p_sale_items)
            LOOP
                v_product_id :=(v_item ->> 'id')::integer;
                v_quantity :=(v_item ->> 'quantity')::integer;
                -- Get the product price and update the product quantity
                UPDATE
                    public.products
                SET
                    quantity = quantity - v_quantity
                WHERE
                    id = v_product_id
                RETURNING
                    price INTO v_product_price;
                IF NOT FOUND THEN
                    RAISE EXCEPTION 'Product with id % not found or insufficient quantity', v_product_id;
                END IF;
                -- Calculate the total cost for this item
                v_total_cost := v_total_cost +(v_product_price * v_quantity);
                -- Create sale_products record
                INSERT INTO public.sale_products(sale_id, product_id, quantity, price)
                    VALUES (v_sale_id,(
                            SELECT
                                id
                            FROM
                                public.products
                            WHERE
                                id = v_product_id), v_quantity, v_product_price);
            END LOOP;
        -- Update the total cost of the sale
        UPDATE
            public.sales
        SET
            total_cost = v_total_cost
        WHERE
            id = v_sale_id;
        -- Commit the transaction
        RETURN v_sale_id;
    EXCEPTION
        WHEN OTHERS THEN
            -- Rollback the transaction in case of any error
            RAISE;
    END;
END;

$function$;

CREATE OR REPLACE FUNCTION public.upsert_product_with_parts(p_name text, p_quantity integer, p_price numeric, p_product_parts jsonb, p_id bigint DEFAULT NULL::bigint)
    RETURNS bigint
    LANGUAGE plpgsql
    AS $function$
DECLARE
    v_product_id bigint;
    part jsonb;
BEGIN
    -- Input validation
    IF p_name IS NULL OR p_quantity IS NULL OR p_price IS NULL OR p_product_parts IS NULL THEN
        RAISE EXCEPTION 'All parameters except p_id must not be null';
    END IF;
    -- Upsert the product
    IF p_id IS NULL THEN
        -- Insert new product
        INSERT INTO public.products(name, quantity, price)
            VALUES (p_name, p_quantity, p_price)
        RETURNING
            id INTO v_product_id;
    ELSE
        -- Update existing product
        UPDATE
            public.products
        SET
            name = p_name,
            quantity = p_quantity,
            price = p_price
        WHERE
            id = p_id
        RETURNING
            id INTO v_product_id;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'No product found with id %', p_id;
        END IF;
    END IF;
    -- Remove existing product parts for this product
    DELETE FROM public.product_parts
    WHERE product_id = v_product_id;
    -- Insert new product parts
    FOR part IN
    SELECT
        *
    FROM
        jsonb_array_elements(p_product_parts)
        LOOP
            BEGIN
                INSERT INTO public.product_parts(product_id, part_id, quantity)
                    VALUES (v_product_id,(part ->> 'part_id')::bigint,(part ->> 'quantity')::numeric(10, 4));
            EXCEPTION
                WHEN OTHERS THEN
                    RAISE EXCEPTION 'Error inserting part: %', SQLERRM;
            END;
    END LOOP;
    RETURN v_product_id;
END;

$function$;

