-- Drop the function if it exists (using CASCADE to drop any dependencies)
DROP FUNCTION IF EXISTS public.upsert_order CASCADE;

-- Create the new version of upsert_order with contact parameters, carriage, shipping details, and company_id
CREATE OR REPLACE FUNCTION public.upsert_order(in_order_id bigint DEFAULT NULL, in_order_type text DEFAULT NULL, in_order_date timestamp DEFAULT CURRENT_TIMESTAMP, in_order_items jsonb DEFAULT '[]', in_from_company_id bigint DEFAULT NULL, in_to_company_id bigint DEFAULT NULL, in_from_contact_id bigint DEFAULT NULL, in_to_contact_id bigint DEFAULT NULL, in_from_billing_address_id bigint DEFAULT NULL, in_from_shipping_address_id bigint DEFAULT NULL, in_to_billing_address_id bigint DEFAULT NULL, in_to_shipping_address_id bigint DEFAULT NULL, in_currency currency_type DEFAULT 'GBP' ::currency_type, in_carriage numeric DEFAULT 0, in_reason_for_export text DEFAULT NULL, in_shipment_number text DEFAULT NULL, in_airwaybill text DEFAULT NULL, in_mode_of_transport text DEFAULT NULL, in_incoterms text DEFAULT NULL, in_unit_of_measurement text DEFAULT NULL, in_company_id bigint DEFAULT NULL)
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
    v_item_change_ids bigint[];
BEGIN
    -- Check if required parameters are provided
    IF in_order_type IS NULL THEN
        RAISE EXCEPTION 'Order type must be provided';
    END IF;
    -- Check if it's an update operation (order_id exists)
    IF in_order_id IS NOT NULL THEN
        -- Get related item_change_ids before deleting them
        SELECT
            array_agg(ic.id) INTO v_item_change_ids
        FROM
            order_item_changes oic
            JOIN item_changes ic ON oic.item_change_id = ic.id
        WHERE
            oic.order_id = in_order_id;
        -- Delete related order_item_changes - qualify the column name
        DELETE FROM order_item_changes
        WHERE order_item_changes.order_id = in_order_id;
        -- Delete related item_changes if any were found - qualify the column name
        IF v_item_change_ids IS NOT NULL THEN
            DELETE FROM item_changes
            WHERE item_changes.id = ANY (v_item_change_ids);
        END IF;
        -- Update existing order
        UPDATE
            orders
        SET
            order_type = in_order_type::order_type,
            order_date = in_order_date,
            from_company_id = in_from_company_id,
            to_company_id = in_to_company_id,
            from_contact_id = in_from_contact_id,
            to_contact_id = in_to_contact_id,
            from_billing_address_id = in_from_billing_address_id,
            from_shipping_address_id = in_from_shipping_address_id,
            to_billing_address_id = in_to_billing_address_id,
            to_shipping_address_id = in_to_shipping_address_id,
            currency = in_currency,
            carriage = in_carriage,
            reason_for_export = in_reason_for_export,
            shipment_number = in_shipment_number,
            airwaybill = in_airwaybill,
            mode_of_transport = in_mode_of_transport,
            incoterms = in_incoterms,
            unit_of_measurement = in_unit_of_measurement
        WHERE
            orders.id = in_order_id;
        v_order_id := in_order_id;
    ELSE
        -- Insert new order and get its ID, casting order_type to the enum type
        INSERT INTO orders(order_type, order_date, from_company_id, to_company_id, from_contact_id, to_contact_id, from_billing_address_id, from_shipping_address_id, to_billing_address_id, to_shipping_address_id, currency, carriage, reason_for_export, shipment_number, airwaybill, mode_of_transport, incoterms, unit_of_measurement)
            VALUES (in_order_type::order_type, in_order_date, in_from_company_id, in_to_company_id, in_from_contact_id, in_to_contact_id, in_from_billing_address_id, in_from_shipping_address_id, in_to_billing_address_id, in_to_shipping_address_id, in_currency, in_carriage, in_reason_for_export, in_shipment_number, in_airwaybill, in_mode_of_transport, in_incoterms, in_unit_of_measurement)
        RETURNING
            id INTO v_order_id;
    END IF;
    -- Check if there are items to process
    IF jsonb_array_length(in_order_items) > 0 THEN
        -- Add order_id to each item in the order_items JSON array
        RETURN QUERY
        SELECT
            *
        FROM
            insert_order_items((
                SELECT
                    jsonb_agg(item || jsonb_build_object('order_id', v_order_id))
                FROM jsonb_array_elements(in_order_items) AS item));
    ELSE
        -- Return just the order ID without any items
        RETURN QUERY
        SELECT
            v_order_id AS order_id,
            NULL::bigint AS item_change_id,
            NULL::bigint AS item_id,
            NULL::numeric AS quantity_change,
            NULL::bigint AS address_id,
            NULL::numeric AS item_price,
            NULL::numeric AS item_tax;
    END IF;
END;
$$
LANGUAGE plpgsql;

-- Grant permissions on the function
GRANT EXECUTE ON FUNCTION public.upsert_order TO postgres, anon, authenticated, service_role;

