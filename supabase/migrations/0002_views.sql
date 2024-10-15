-- Create a view for product quantities in each warehouse
CREATE OR REPLACE VIEW warehouse_products AS
SELECT
    w.id AS warehouse_id,
    w.name AS warehouse_name,
    p.id AS product_id,
    p.name AS product_name,
    p.price AS product_price,
    COALESCE(SUM(pc.quantity_change), 0) AS product_quantity,
    COALESCE(SUM(pc.quantity_change), 0) * p.price AS product_value
FROM
    warehouses w
    CROSS JOIN products p
    LEFT JOIN product_changes pc ON p.id = pc.product_id
        AND w.id = pc.warehouse_id
GROUP BY
    w.id,
    w.name,
    p.id,
    p.name,
    p.price
HAVING
    COALESCE(SUM(pc.quantity_change), 0) > 0;

-- Create a view for part quantities in each warehouse
CREATE OR REPLACE VIEW warehouse_parts AS
SELECT
    w.id AS warehouse_id,
    w.name AS warehouse_name,
    p.id AS part_id,
    p.name AS part_name,
    p.price AS part_price,
    COALESCE(SUM(pc.quantity_change), 0) AS part_quantity,
    COALESCE(SUM(pc.quantity_change), 0) * p.price AS part_value
FROM
    warehouses w
    CROSS JOIN parts p
    LEFT JOIN part_changes pc ON p.id = pc.part_id
        AND w.id = pc.warehouse_id
GROUP BY
    w.id,
    w.name,
    p.id,
    p.name,
    p.price
HAVING
    COALESCE(SUM(pc.quantity_change), 0) > 0;

-- Create a view for total inventory value per warehouse
CREATE OR REPLACE VIEW warehouse_inventory_value AS
SELECT
    w.id AS warehouse_id,
    w.name AS warehouse_name,
    COALESCE(SUM(wp.product_value), 0) + COALESCE(SUM(wpa.part_value), 0) AS total_inventory_value
FROM
    warehouses w
    LEFT JOIN warehouse_products wp ON w.id = wp.warehouse_id
    LEFT JOIN warehouse_parts wpa ON w.id = wpa.warehouse_id
GROUP BY
    w.id,
    w.name;

-- Grant permissions for the new views
GRANT SELECT ON warehouse_products TO anon, authenticated, service_role;

GRANT SELECT ON warehouse_parts TO anon, authenticated, service_role;

GRANT SELECT ON warehouse_inventory_value TO anon, authenticated, service_role;

-- Create a view for sales with total value and product details
CREATE OR REPLACE VIEW sales_view AS
SELECT
    s.id AS sale_id,
    s.sale_date,
    SUM(-1 * spc.price * pc.quantity_change *(1 + spc.tax)) AS total_value,
    jsonb_agg(jsonb_build_object('product_id', p.id, 'product_name', p.name, 'quantity', pc.quantity_change, 'price', spc.price, 'tax', spc.tax, 'total',(-1 * pc.quantity_change * spc.price *(1 + spc.tax)))) AS products
FROM
    sales s
    JOIN sale_product_changes spc ON s.id = spc.sale_id
    JOIN product_changes pc ON spc.product_change_id = pc.id
    JOIN products p ON pc.product_id = p.id
GROUP BY
    s.id,
    s.sale_date;

-- Grant permissions for the new sales_view
GRANT SELECT ON sales_view TO anon, authenticated, service_role;

