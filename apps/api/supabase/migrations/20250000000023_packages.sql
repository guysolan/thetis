ALTER TABLE items
    ADD COLUMN height numeric(10, 2) NULL,
    ADD COLUMN width numeric(10, 2) NULL,
    ADD COLUMN depth numeric(10, 2) NULL,
    ADD COLUMN weight numeric(10, 2) NULL;

-- Update the item_type enum to include package
ALTER TYPE item_type
    ADD VALUE IF NOT EXISTS 'package';

-- Update the items_view to include physical dimensions
DROP VIEW IF EXISTS items_view;

CREATE OR REPLACE VIEW items_view AS
SELECT
    i.id AS item_id,
    i.name AS item_name,
    i.price AS item_price,
    i.type AS item_type,
    i.height,
    i.width,
    i.depth,
    i.weight,
    i.hs_code,
    i.sku,
    i.country_of_origin,
    COALESCE(jsonb_agg(jsonb_build_object('component_id', ic.component_id, 'component_name', ci.name, 'component_type', ci.type, 'component_quantity', ic.component_quantity, 'component_price', ci.price)) FILTER (WHERE ic.component_id IS NOT NULL), '[]'::jsonb) AS components
FROM
    items i
    LEFT JOIN item_components ic ON i.id = ic.item_id
    LEFT JOIN items ci ON ic.component_id = ci.id
GROUP BY
    i.id,
    i.name,
    i.price,
    i.type,
    i.height,
    i.width,
    i.depth,
    i.weight,
    i.hs_code,
    i.sku,
    i.country_of_origin;

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
    jsonb_agg(jsonb_build_object('item_id', i.id, 'item_name', i.name, 'item_type', i.type, 'item_hs_code', i.hs_code, 'item_sku', i.sku, 'item_country_of_origin', i.country_of_origin, 'height', i.height, 'width', i.width, 'depth', i.depth, 'weight', i.weight, 'address', to_jsonb(a) - 'created_at' - 'updated_at', 'quantity', ic.quantity_change, 'price', oic.price, 'tax', oic.tax, 'total', CASE WHEN o.order_type = 'sale' THEN
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
    LEFT JOIN order_item_changes oic ON o.id = oic.order_id
    LEFT JOIN item_changes ic ON oic.item_change_id = ic.id
    LEFT JOIN items i ON ic.item_id = i.id
    LEFT JOIN addresses a ON ic.address_id = a.id
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

