-- Drop the views if they already exist
DROP VIEW IF EXISTS inventory_history_by_location CASCADE;

DROP VIEW IF EXISTS inventory_history_by_address;

-- Create a view that groups inventory history by order
CREATE OR REPLACE VIEW inventory_history_by_address AS
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
-- Sequence each item change in chronological order
ordered_changes AS (
    SELECT
        oia.*,
        ROW_NUMBER() OVER (PARTITION BY oia.address_id,
            oia.item_id ORDER BY oia.effective_date,
            oia.order_id) AS change_seq
    FROM
        order_item_aggregates oia
),
-- Calculate running balances per item
item_balances AS (
    SELECT
        oc.*,
        SUM(oc.total_change) OVER (PARTITION BY oc.address_id,
            oc.item_id ORDER BY oc.change_seq ROWS UNBOUNDED PRECEDING) AS balance
    FROM
        ordered_changes oc
),
-- Group item balances by order, creating a record of all items for each order
orders_with_items AS (
    SELECT
        ib.order_id,
        MIN(ib.effective_date) AS effective_date,
        MIN(ib.order_date) AS order_date,
        MIN(ib.order_type) AS order_type,
        MIN(ib.address_id) AS address_id,
        MIN(ib.address_name) AS address_name,
        MIN(ib.from_company_name) AS from_company_name,
        MIN(ib.to_company_name) AS to_company_name,
        -- Create a JSON array of all items in this order with their current balances
        jsonb_agg(jsonb_build_object('id', ib.item_id, 'name', ib.item_name, 'type', ib.item_type, 'quantity', ib.balance, 'change', ib.total_change)) AS items,
        -- Create a JSON object mapping item_id to quantity
        jsonb_object_agg(ib.item_id::text, ib.balance) AS item_quantities,
        -- Calculate total items affected by this order
        COUNT(DISTINCT ib.item_id) FILTER (WHERE ib.total_change != 0) AS items_changed,
        -- Net quantity change for the entire order (useful for sorting)
        SUM(ib.total_change) AS net_change
    FROM
        item_balances ib
    GROUP BY
        ib.order_id
)
SELECT
    o.order_id,
    o.address_id,
    o.address_name,
    o.effective_date AS transaction_date,
    o.order_date,
    o.order_type,
    o.from_company_name AS from_company,
    o.to_company_name AS to_company,
    o.items,
    o.item_quantities,
    o.items_changed,
    o.net_change
FROM
    orders_with_items o
ORDER BY
    o.address_name,
    o.effective_date;

-- Add a comment explaining the view
COMMENT ON VIEW inventory_history_by_address IS 'Shows inventory levels grouped by order.
Each row represents one order with its complete inventory state:
- items: A JSON array of all items with their current quantities after this order
- item_quantities: A JSON object mapping item_id to quantity
- items_changed: Count of items affected by this order
- net_change: Total quantity change across all items in this order
All items associated with an order are included, regardless of their quantities or changes.';

-- Grant permissions for the view
GRANT SELECT ON inventory_history_by_address TO anon, authenticated, service_role;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_order_item_changes_item_change_id ON order_item_changes(item_change_id);

CREATE INDEX IF NOT EXISTS idx_item_changes_address_item ON item_changes(address_id, item_id);

