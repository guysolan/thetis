-- Reset the sequence if needed
SELECT
    setval('companies_id_seq', COALESCE((
            SELECT
                MAX(id)
            FROM companies), 0) + 1, FALSE);

-- Drop junction tables and their related functions
DROP TABLE IF EXISTS company_addresses CASCADE;

DROP TABLE IF EXISTS company_contacts CASCADE;

DROP FUNCTION IF EXISTS set_default_shipping_address CASCADE;

DROP FUNCTION IF EXISTS set_default_billing_address CASCADE;

DROP FUNCTION IF EXISTS set_default_contact CASCADE;

-- Add company_id and default flags to addresses
ALTER TABLE addresses
    ADD COLUMN company_id bigint REFERENCES companies(id),
    ADD COLUMN is_default_shipping boolean DEFAULT FALSE,
    ADD COLUMN is_default_billing boolean DEFAULT FALSE;

-- Add company_id and default flag to contacts
ALTER TABLE contacts
    ADD COLUMN company_id bigint REFERENCES companies(id),
    ADD COLUMN is_default boolean DEFAULT FALSE;

-- Add company_id to other tables
ALTER TABLE items
    ADD COLUMN company_id bigint REFERENCES companies(id);

ALTER TABLE orders
    ADD COLUMN company_id bigint REFERENCES companies(id);

-- Add constraints for one default per company
CREATE UNIQUE INDEX addresses_default_shipping_idx ON addresses(company_id)
WHERE
    is_default_shipping = TRUE;

CREATE UNIQUE INDEX addresses_default_billing_idx ON addresses(company_id)
WHERE
    is_default_billing = TRUE;

CREATE UNIQUE INDEX contacts_default_idx ON contacts(company_id)
WHERE
    is_default = TRUE;

-- Create indexes for performance
CREATE INDEX idx_addresses_company_id ON addresses(company_id);

CREATE INDEX idx_contacts_company_id ON contacts(company_id);

CREATE INDEX idx_items_company_id ON items(company_id);

CREATE INDEX idx_orders_company_id ON orders(company_id);

CREATE OR REPLACE FUNCTION insert_order(in_order_type text, in_order_date timestamp, in_order_items jsonb, in_company_id bigint DEFAULT NULL, in_from_company_id bigint DEFAULT NULL, in_to_company_id bigint DEFAULT NULL, in_from_contact_id bigint DEFAULT NULL, in_to_contact_id bigint DEFAULT NULL, in_from_billing_address_id bigint DEFAULT NULL, in_from_shipping_address_id bigint DEFAULT NULL, in_to_billing_address_id bigint DEFAULT NULL, in_to_shipping_address_id bigint DEFAULT NULL, in_currency currency_type DEFAULT 'GBP' ::currency_type, in_carriage numeric DEFAULT 0)
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
    INSERT INTO orders(order_type, order_date, company_id, from_company_id, to_company_id, from_contact_id, to_contact_id, from_billing_address_id, from_shipping_address_id, to_billing_address_id, to_shipping_address_id, currency, carriage)
        VALUES (in_order_type::order_type, in_order_date, in_company_id, in_from_company_id, in_to_company_id, in_from_contact_id, in_to_contact_id, in_from_billing_address_id, in_from_shipping_address_id, in_to_billing_address_id, in_to_shipping_address_id, in_currency, in_carriage)
    RETURNING
        id INTO v_order_id;
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

