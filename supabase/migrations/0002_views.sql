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
CREATE OR REPLACE VIEW orders_view AS
SELECT
    o.id AS order_id,
    o.type AS order_type,
    o.order_date,
    o.carriage,
    SUM(
        CASE WHEN o.type = 'sale' THEN
            -1 * oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        ELSE
            oic.price * ic.quantity_change *(1 + COALESCE(oic.tax, 0))
        END) AS total_value,
    jsonb_agg(jsonb_build_object('item_id', i.id, 'item_name', i.name, 'item_type', i.type, 'quantity', ic.quantity_change, 'price', oic.price, 'tax', oic.tax, 'total',(
                CASE WHEN o.type = 'sale' THEN
                    -1 * ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
                ELSE
                    ic.quantity_change * oic.price *(1 + COALESCE(oic.tax, 0))
                END))) AS items
FROM
    orders o
    JOIN order_item_changes oic ON o.id = oic.order_id
    JOIN item_changes ic ON oic.item_change_id = ic.id
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

