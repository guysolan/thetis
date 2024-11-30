-- Add default flags to company_addresses
ALTER TABLE company_addresses
    ADD COLUMN is_default_shipping boolean DEFAULT FALSE,
    ADD COLUMN is_default_billing boolean DEFAULT FALSE;

-- Add default flag to company_contacts
ALTER TABLE company_contacts
    ADD COLUMN is_default boolean DEFAULT FALSE;

-- Add constraints to ensure only one default shipping and one default billing per company
CREATE UNIQUE INDEX company_addresses_default_shipping_idx ON company_addresses(company_id)
WHERE
    is_default_shipping = TRUE;

CREATE UNIQUE INDEX company_addresses_default_billing_idx ON company_addresses(company_id)
WHERE
    is_default_billing = TRUE;

-- Add constraint to ensure only one default contact per company
CREATE UNIQUE INDEX company_contacts_default_idx ON company_contacts(company_id)
WHERE
    is_default = TRUE;

-- Create function to set default shipping address
CREATE OR REPLACE FUNCTION set_default_shipping_address(in_company_id bigint, in_address_id bigint)
    RETURNS void
    AS $$
BEGIN
    -- Reset all shipping defaults for this company
    UPDATE
        company_addresses
    SET
        is_default_shipping = FALSE
    WHERE
        company_id = in_company_id;
    -- Set new default
    UPDATE
        company_addresses
    SET
        is_default_shipping = TRUE
    WHERE
        company_id = in_company_id
        AND address_id = in_address_id;
END;
$$
LANGUAGE plpgsql;

-- Create function to set default billing address
CREATE OR REPLACE FUNCTION set_default_billing_address(in_company_id bigint, in_address_id bigint)
    RETURNS void
    AS $$
BEGIN
    -- Reset all billing defaults for this company
    UPDATE
        company_addresses
    SET
        is_default_billing = FALSE
    WHERE
        company_id = in_company_id;
    -- Set new default
    UPDATE
        company_addresses
    SET
        is_default_billing = TRUE
    WHERE
        company_id = in_company_id
        AND address_id = in_address_id;
END;
$$
LANGUAGE plpgsql;

-- Create function to set default contact
CREATE OR REPLACE FUNCTION set_default_contact(in_company_id bigint, in_contact_id bigint)
    RETURNS void
    AS $$
BEGIN
    -- Reset all contacts defaults for this company
    UPDATE
        company_contacts
    SET
        is_default = FALSE
    WHERE
        company_id = in_company_id;
    -- Set new default
    UPDATE
        company_contacts
    SET
        is_default = TRUE
    WHERE
        company_id = in_company_id
        AND contact_id = in_contact_id;
END;
$$
LANGUAGE plpgsql;

