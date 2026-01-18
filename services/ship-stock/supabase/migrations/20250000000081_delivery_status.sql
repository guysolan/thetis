-- Create delivery status enum type
CREATE TYPE delivery_status_type AS ENUM(
    'pending',
    'processing',
    'ready_for_pickup',
    'out_for_delivery',
    'delivered',
    'failed_delivery'
);

-- Add delivery_status column to orders table
ALTER TABLE orders
    ADD COLUMN delivery_status delivery_status_type DEFAULT 'pending';

-- Add a comment explaining the delivery_status column
COMMENT ON COLUMN orders.delivery_status IS 'Current status of the order delivery process';

-- Update the orders_view to include delivery_status
DROP VIEW IF EXISTS orders_view;

CREATE VIEW public.orders_view AS
SELECT
    o.id AS order_id,
    o.order_type,
    o.order_date,
    o.carriage,
    o.currency,
    o.reason_for_export,
    o.mode_of_transport,
    o.incoterms,
    o.unit_of_measurement,
    o.shipment_number,
    o.airwaybill,
    o.delivery_dates,
    o.order_form_values,
    o.payment_status,
    o.delivery_status,
    o.reference_number,
    jsonb_build_object('id', from_company.id, 'name', from_company.name, 'company_number', from_company.company_number, 'tax_number', from_company.tax_number) AS from_company,
    jsonb_build_object('id', to_company.id, 'name', to_company.name, 'company_number', to_company.company_number, 'tax_number', to_company.tax_number) AS to_company,
    CASE WHEN from_contact.id IS NOT NULL THEN
        jsonb_build_object('id', from_contact.id, 'name', from_contact.name, 'email', from_contact.email, 'phone', from_contact.phone)
    ELSE
        NULL::jsonb
    END AS from_contact,
    CASE WHEN to_contact.id IS NOT NULL THEN
        jsonb_build_object('id', to_contact.id, 'name', to_contact.name, 'email', to_contact.email, 'phone', to_contact.phone)
    ELSE
        NULL::jsonb
    END AS to_contact,
    CASE WHEN from_billing_addr.id IS NOT NULL THEN
        to_jsonb(from_billing_addr.*) - 'created_at'::text - 'updated_at'::text
    ELSE
        NULL::jsonb
    END AS from_billing_address,
    CASE WHEN from_shipping_addr.id IS NOT NULL THEN
        to_jsonb(from_shipping_addr.*) - 'created_at'::text - 'updated_at'::text
    ELSE
        NULL::jsonb
    END AS from_shipping_address,
    CASE WHEN to_billing_addr.id IS NOT NULL THEN
        to_jsonb(to_billing_addr.*) - 'created_at'::text - 'updated_at'::text
    ELSE
        NULL::jsonb
    END AS to_billing_address,
    CASE WHEN to_shipping_addr.id IS NOT NULL THEN
        to_jsonb(to_shipping_addr.*) - 'created_at'::text - 'updated_at'::text
    ELSE
        NULL::jsonb
    END AS to_shipping_address,
    sum(
        CASE WHEN o.order_type = 'sale'::order_type THEN
            '-1'::integer::numeric * oic.price * ic.quantity_change *(1::numeric + COALESCE(oic.tax, 0::numeric))
        ELSE
            oic.price * ic.quantity_change *(1::numeric + COALESCE(oic.tax, 0::numeric))
        END) AS item_total_value,
    sum(ABS(oic.price * ic.quantity_change *(1::numeric + COALESCE(oic.tax, 0::numeric)))) + o.carriage AS total_value,
    jsonb_agg(jsonb_build_object('item_id', i.id, 'item_name', i.name, 'item_type', i.type, 'item_hs_code', i.hs_code, 'item_sku', i.sku, 'item_country_of_origin', i.country_of_origin, 'height', COALESCE(i.height, 0::numeric), 'width', COALESCE(i.width, 0::numeric), 'depth', COALESCE(i.depth, 0::numeric), 'weight', COALESCE(i.weight, 0::numeric), 'address', to_jsonb(a.*) - 'created_at'::text - 'updated_at'::text, 'quantity', ic.quantity_change, 'price', oic.price, 'tax', oic.tax, 'lot_number', oic.lot_number, 'package_item_change_id', oic.package_item_change_id, 'total', CASE WHEN o.order_type = 'sale'::order_type THEN
                '-1'::integer::numeric * ic.quantity_change * oic.price *(1::numeric + COALESCE(oic.tax, 0::numeric))
            ELSE
                ic.quantity_change * oic.price *(1::numeric + COALESCE(oic.tax, 0::numeric))
            END)) AS items
FROM
    orders o
    LEFT JOIN companies from_company ON o.from_company_id = from_company.id
    LEFT JOIN companies to_company ON o.to_company_id = to_company.id
    LEFT JOIN contacts from_contact ON o.from_contact_id = from_contact.id
    LEFT JOIN contacts to_contact ON o.to_contact_id = to_contact.id
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
    o.currency,
    o.reason_for_export,
    o.mode_of_transport,
    o.incoterms,
    o.unit_of_measurement,
    o.shipment_number,
    o.airwaybill,
    o.delivery_dates,
    o.order_form_values,
    o.payment_status,
    o.delivery_status,
    o.reference_number,
    from_company.id,
    from_company.name,
    from_company.company_number,
    from_company.tax_number,
    to_company.id,
    to_company.name,
    to_company.company_number,
    to_company.tax_number,
    from_contact.id,
    from_contact.name,
    from_contact.email,
    from_contact.phone,
    to_contact.id,
    to_contact.name,
    to_contact.email,
    to_contact.phone,
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

