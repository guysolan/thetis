-- Create companies table
CREATE TABLE companies(
    id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    company_number text,
    tax_number text
);

-- Create junction table for companies and addresses
CREATE TABLE company_addresses(
    company_id bigint REFERENCES companies(id) ON DELETE CASCADE,
    address_id bigint REFERENCES addresses(id) ON DELETE CASCADE,
    PRIMARY KEY (company_id, address_id)
);

-- Update orders table
ALTER TABLE orders
    ADD COLUMN from_company_id bigint REFERENCES companies(id) NULL,
    ADD COLUMN to_company_id bigint REFERENCES companies(id) NULL,
    ADD COLUMN from_billing_address_id bigint REFERENCES addresses(id) NULL,
    ADD COLUMN from_shipping_address_id bigint REFERENCES addresses(id) NULL,
    ADD COLUMN to_billing_address_id bigint REFERENCES addresses(id) NULL,
    ADD COLUMN to_shipping_address_id bigint REFERENCES addresses(id) NULL;

-- Drop existing views that need updating
DROP VIEW IF EXISTS orders_view;

-- Recreate orders view with company and address information
CREATE OR REPLACE VIEW orders_view AS
SELECT
    o.id AS order_id,
    o.order_type,
    o.order_date,
    o.carriage,
    -- From company information
    jsonb_build_object('id', from_company.id, 'name', from_company.name, 'company_number', from_company.company_number, 'tax_number', from_company.tax_number) AS from_company,
    -- To company information
    jsonb_build_object('id', to_company.id, 'name', to_company.name, 'company_number', to_company.company_number, 'tax_number', to_company.tax_number) AS to_company,
    -- From addresses
    CASE WHEN from_billing_addr.id IS NOT NULL THEN
        to_jsonb(from_billing_addr) - 'created_at' - 'updated_at'
    ELSE
        NULL
    END AS from_billing_address,
    CASE WHEN from_shipping_addr.id IS NOT NULL THEN
        to_jsonb(from_shipping_addr) - 'created_at' - 'updated_at'
    ELSE
        NULL
    END AS from_shipping_address,
    -- To addresses
    CASE WHEN to_billing_addr.id IS NOT NULL THEN
        to_jsonb(to_billing_addr) - 'created_at' - 'updated_at'
    ELSE
        NULL
    END AS to_billing_address,
    CASE WHEN to_shipping_addr.id IS NOT NULL THEN
        to_jsonb(to_shipping_addr) - 'created_at' - 'updated_at'
    ELSE
        NULL
    END AS to_shipping_address,
    SUM(
        CASE WHEN o.order_type = 'sale' THEN
            -1 * oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        ELSE
            oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        END) AS total_value,
    jsonb_agg(jsonb_build_object('item_id', i.id, 'item_name', i.name, 'item_type', i.type, 'item_hs_code', i.hs_code, 'item_sku', i.sku, 'item_country_of_origin', i.country_of_origin, 'address', to_jsonb(a) - 'created_at' - 'updated_at', 'quantity', ic.quantity_change, 'price', oic.price, 'tax', oic.tax, 'total', CASE WHEN o.order_type = 'sale' THEN
                -1 * ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
            ELSE
                ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
            END)) AS items
FROM
    orders o
    LEFT JOIN companies from_company ON o.from_company_id = from_company.id
    LEFT JOIN companies to_company ON o.to_company_id = to_company.id
    LEFT JOIN addresses from_billing_addr ON o.from_billing_address_id = from_billing_addr.id
    LEFT JOIN addresses from_shipping_addr ON o.from_shipping_address_id = from_shipping_addr.id
    LEFT JOIN addresses to_billing_addr ON o.to_billing_address_id = to_billing_addr.id
    LEFT JOIN addresses to_shipping_addr ON o.to_shipping_address_id = to_shipping_addr.id
    JOIN order_item_changes oic ON o.id = oic.order_id
    JOIN item_changes ic ON oic.item_change_id = ic.id
    JOIN items i ON ic.item_id = i.id
    JOIN addresses a ON ic.address_id = a.id
GROUP BY
    o.id,
    o.order_type,
    o.order_date,
    o.carriage,
    from_company.id,
    from_company.name,
    from_company.company_number,
    from_company.tax_number,
    to_company.id,
    to_company.name,
    to_company.company_number,
    to_company.tax_number,
    from_billing_addr.id,
    from_billing_addr.name,
    from_billing_addr.line_1,
    from_billing_addr.line_2,
    from_billing_addr.city,
    from_billing_addr.region,
    from_billing_addr.code,
    from_billing_addr.country,
    from_billing_addr.is_active,
    from_billing_addr.holds_stock,
    from_shipping_addr.id,
    from_shipping_addr.name,
    from_shipping_addr.line_1,
    from_shipping_addr.line_2,
    from_shipping_addr.city,
    from_shipping_addr.region,
    from_shipping_addr.code,
    from_shipping_addr.country,
    from_shipping_addr.is_active,
    from_shipping_addr.holds_stock,
    to_billing_addr.id,
    to_billing_addr.name,
    to_billing_addr.line_1,
    to_billing_addr.line_2,
    to_billing_addr.city,
    to_billing_addr.region,
    to_billing_addr.code,
    to_billing_addr.country,
    to_billing_addr.is_active,
    to_billing_addr.holds_stock,
    to_shipping_addr.id,
    to_shipping_addr.name,
    to_shipping_addr.line_1,
    to_shipping_addr.line_2,
    to_shipping_addr.city,
    to_shipping_addr.region,
    to_shipping_addr.code,
    to_shipping_addr.country,
    to_shipping_addr.is_active,
    to_shipping_addr.holds_stock;

-- Grant permissions
GRANT ALL ON companies TO anon, authenticated, service_role;

GRANT ALL ON company_addresses TO anon, authenticated, service_role;

-- Remove from_address_id and to_address_id columns from orders table
ALTER TABLE orders
    DROP COLUMN from_address_id,
    DROP COLUMN to_address_id;

-- Drop existing functions that need to be updated
DROP FUNCTION IF EXISTS insert_order(text, jsonb);

DROP FUNCTION IF EXISTS insert_order(text, timestamp, jsonb);

DROP FUNCTION IF EXISTS insert_order(text, timestamp, jsonb, bigint, bigint);

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

