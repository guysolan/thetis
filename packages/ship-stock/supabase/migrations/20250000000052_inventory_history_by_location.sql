-- Drop the views if they already exist
DROP VIEW IF EXISTS inventory_history_by_location;

DROP VIEW IF EXISTS inventory_history_by_address;

-- Create a simpler, more efficient view with JSON output
CREATE OR REPLACE VIEW inventory_history_by_location AS
WITH item_changes_with_dates AS (
    -- Calculate the effective date for each item change
    SELECT
        ic.id AS item_change_id,
        ic.item_id,
        i.name AS item_name,
        i.type AS item_type,
        ic.address_id,
        a.name AS address_name,
        ic.quantity_change,
        oic.order_id,
        o.order_type,
        o.order_date,
        -- Use COALESCE for cleaner null handling
        COALESCE(
            CASE WHEN ic.quantity_change < 0
                AND o.delivery_dates IS NOT NULL THEN
                lower(o.delivery_dates)
            WHEN ic.quantity_change > 0
                AND o.delivery_dates IS NOT NULL THEN
                upper(o.delivery_dates)
            ELSE
                o.order_date
            END, o.order_date) AS effective_date,
        -- Access company information safely
(
            SELECT
                name
            FROM companies
            WHERE
                id = o.from_company_id) AS from_company_name,
(
            SELECT
                name
            FROM
                companies
            WHERE
                id = o.to_company_id) AS to_company_name
        FROM
            item_changes ic
            JOIN order_item_changes oic ON ic.id = oic.item_change_id
            JOIN orders o ON oic.order_id = o.id
            JOIN items i ON ic.item_id = i.id
            JOIN addresses a ON ic.address_id = a.id
        WHERE
            ic.quantity_change IS NOT NULL
),
-- First, aggregate item changes by order and item
order_item_aggregates AS (
    SELECT
        icd.order_id,
        icd.address_id,
        icd.address_name,
        icd.item_id,
        icd.item_name,
        icd.item_type,
        icd.effective_date,
        icd.order_date,
        icd.order_type,
        icd.from_company_name,
        icd.to_company_name,
        -- Sum up all changes for the same item in the same order
        SUM(icd.quantity_change) AS total_change
    FROM
        item_changes_with_dates icd
    GROUP BY
        icd.order_id,
        icd.address_id,
        icd.address_name,
        icd.item_id,
        icd.item_name,
        icd.item_type,
        icd.effective_date,
        icd.order_date,
        icd.order_type,
        icd.from_company_name,
        icd.to_company_name
),
-- Create a stable sequence number for items to calculate running balances
ordered_items AS (
    SELECT
        oia.*,
        ROW_NUMBER() OVER (PARTITION BY oia.address_id,
            oia.item_id ORDER BY oia.effective_date,
            oia.order_id) AS change_seq
    FROM
        order_item_aggregates oia
),
-- Calculate running balances based on the aggregated changes
running_balances AS (
    SELECT
        oi.*,
        SUM(oi.total_change) OVER (PARTITION BY oi.address_id,
            oi.item_id ORDER BY oi.change_seq ROWS UNBOUNDED PRECEDING) AS balance
    FROM
        ordered_items oi
),
-- Create the order snapshots with combined item quantities
order_snapshots AS (
    SELECT
        rb.order_id,
        rb.address_id,
        rb.address_name,
        rb.effective_date,
        rb.order_date,
        rb.order_type,
        rb.from_company_name,
        rb.to_company_name,
        -- Group items by order - include all items with non-zero quantity
        jsonb_object_agg(rb.item_id::text, rb.balance) FILTER (WHERE rb.balance != 0) AS item_quantities,
        -- Create a JSON array with all items for this order
        jsonb_agg(jsonb_build_object('id', rb.item_id, 'name', rb.item_name, 'type', rb.item_type, 'quantity', rb.balance, 'change', rb.total_change)) FILTER (WHERE rb.balance != 0) AS items
    FROM
        running_balances rb
    GROUP BY
        rb.order_id,
        rb.address_id,
        rb.address_name,
        rb.effective_date,
        rb.order_date,
        rb.order_type,
        rb.from_company_name,
        rb.to_company_name
)
SELECT
    os.order_id,
    os.address_id,
    os.address_name,
    os.effective_date AS transaction_date,
    os.order_date,
    os.order_type,
    os.from_company_name AS from_company,
    os.to_company_name AS to_company,
    os.item_quantities,
    os.items
FROM
    order_snapshots os
WHERE
    os.items IS NOT NULL
ORDER BY
    os.address_name,
    os.effective_date;

-- Create a compatible view with the old name to avoid breaking existing code
CREATE OR REPLACE VIEW inventory_history_by_address AS
SELECT
    *
FROM
    inventory_history_by_location;

-- Add a comment explaining the view
COMMENT ON VIEW inventory_history_by_location IS 'Shows inventory levels after each order.
Each row represents one order with JSON columns containing the inventory state:
- item_quantities: A simple object mapping item_id to quantity
- items: An array of objects with detailed item information
Only items with non-zero quantities are included.
Multiple changes to the same item in a single order are totaled.';

-- Grant permissions for the views
GRANT SELECT ON inventory_history_by_location TO anon, authenticated, service_role;

GRANT SELECT ON inventory_history_by_address TO anon, authenticated, service_role;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_order_item_changes_item_change_id ON order_item_changes(item_change_id);

CREATE INDEX IF NOT EXISTS idx_item_changes_address_item ON item_changes(address_id, item_id);

