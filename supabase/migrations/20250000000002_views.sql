-- Create a view for item quantities in each warehouse
CREATE OR REPLACE VIEW warehouse_items AS
SELECT
    w.id AS warehouse_id,
    w.name AS warehouse_name,
    i.id AS item_id,
    i.name AS item_name,
    i.price AS item_price,
    i.type AS item_type,
    COALESCE(SUM(ic.quantity_change), 0) AS item_quantity,
    COALESCE(SUM(ic.quantity_change), 0) * i.price AS item_value
FROM
    warehouses w
    CROSS JOIN items i
    LEFT JOIN item_changes ic ON i.id = ic.item_id
        AND w.id = ic.warehouse_id
GROUP BY
    w.id,
    w.name,
    i.id,
    i.name,
    i.price,
    i.type
HAVING
    COALESCE(SUM(ic.quantity_change), 0) > 0;

-- Create a view for total inventory value per warehouse
CREATE OR REPLACE VIEW warehouse_inventory_value AS
SELECT
    w.id AS warehouse_id,
    w.name AS warehouse_name,
    COALESCE(SUM(wi.item_value), 0) AS total_inventory_value
FROM
    warehouses w
    LEFT JOIN warehouse_items wi ON w.id = wi.warehouse_id
GROUP BY
    w.id,
    w.name;

-- Create a view for orders with total value and item details
-- This view aggregates order information including total value and itemized details
CREATE OR REPLACE VIEW orders_view AS
SELECT
    -- Basic order information
    o.id AS order_id,
    o.type AS order_type, -- Can be 'sale' or 'purchase'
    o.order_date,
    o.carriage, -- Shipping/delivery costs
    -- Calculate total order value
    -- For sales: negative value (money going out)
    -- For purchases: positive value (money coming in)
    -- Includes price * quantity * (1 + tax rate)
    SUM(
        CASE WHEN o.type = 'sale' THEN
            -1 * oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        ELSE
            oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        END) AS total_value,
    -- Create a JSON array of all items in the order
    -- Each item object contains: item details, quantity, price, tax, and total value
    jsonb_agg(jsonb_build_object('item_id', i.id, 'item_name', i.name, 'item_type', i.type, 'quantity', ic.quantity_change, 'price', oic.price, 'tax', oic.tax, 'total',(
                CASE WHEN o.type = 'sale' THEN
                    -1 * ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
                ELSE
                    ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
                END))) AS items
FROM
    orders o
    -- Join with order_item_changes to get price and tax information
    JOIN order_item_changes oic ON o.id = oic.order_id
    -- Join with item_changes to get quantity information
    JOIN item_changes ic ON oic.item_change_id = ic.id
    -- Join with items to get item details
    JOIN items i ON ic.item_id = i.id
GROUP BY
    o.id,
    o.type,
    o.order_date,
    o.carriage;

-- Grant permissions for the views
GRANT SELECT ON warehouse_items TO anon, authenticated, service_role;

GRANT SELECT ON warehouse_inventory_value TO anon, authenticated, service_role;

GRANT SELECT ON orders_view TO anon, authenticated, service_role;

-- Create a view for total quantity of each item with totals by warehouse and overall
CREATE OR REPLACE VIEW item_quantities AS
WITH warehouse_quantities AS (
    SELECT
        i.id AS item_id,
        i.name AS item_name,
        w.name AS warehouse_name,
        COALESCE(SUM(
                CASE WHEN ic.warehouse_id = w.id THEN
                    ic.quantity_change
                ELSE
                    0
                END), 0) AS quantity
    FROM
        items i
        CROSS JOIN warehouses w
        LEFT JOIN item_changes ic ON i.id = ic.item_id
    GROUP BY
        i.id,
        i.name,
        w.name
)
SELECT
    item_id,
    item_name,
    SUM(quantity) AS total_quantity,
    jsonb_object_agg(warehouse_name, quantity) AS warehouse_quantities
FROM
    warehouse_quantities
GROUP BY
    item_id,
    item_name;

-- Grant permissions for the new view
GRANT SELECT ON item_quantities TO anon, authenticated, service_role;

-- Create a view for items with their components
CREATE OR REPLACE VIEW items_view AS
SELECT
    i.id AS item_id,
    i.name AS item_name,
    i.price AS item_price,
    i.type AS item_type,
    COALESCE(jsonb_agg(jsonb_build_object('component_item_id', ic.component_item_id, 'component_name', ci.name, 'quantity', ic.quantity)) FILTER (WHERE ic.component_item_id IS NOT NULL), '[]'::jsonb) AS components
FROM
    items i
    LEFT JOIN item_components ic ON i.id = ic.parent_item_id
    LEFT JOIN items ci ON ic.component_item_id = ci.id
GROUP BY
    i.id,
    i.name,
    i.price,
    i.type;

-- Grant permissions for the new view
GRANT SELECT ON items_view TO anon, authenticated, service_role;

-- Create a view for warehouses with their items
CREATE OR REPLACE VIEW warehouses_view AS
SELECT
    w.id AS warehouse_id,
    w.name AS warehouse_name,
    w.created_at AS warehouse_created_at,
    COALESCE(jsonb_agg(
            CASE WHEN i.id IS NOT NULL THEN
                jsonb_build_object('item_id', i.id, 'item_name', i.name, 'item_price', i.price, 'item_type', i.type, 'item_quantity', ic.quantity_change, 'item_value', ic.quantity_change * i.price)
            ELSE
                NULL
            END) FILTER (WHERE i.id IS NOT NULL), '[]'::jsonb) AS items
FROM
    warehouses w
    LEFT JOIN (
        SELECT
            warehouse_id,
            item_id,
            SUM(quantity_change) AS quantity_change
        FROM
            item_changes
        GROUP BY
            warehouse_id,
            item_id) ic ON w.id = ic.warehouse_id
    LEFT JOIN items i ON ic.item_id = i.id
GROUP BY
    w.id,
    w.name,
    w.created_at;

-- Grant permissions for the new view
GRANT SELECT ON warehouses_view TO anon, authenticated, service_role;

