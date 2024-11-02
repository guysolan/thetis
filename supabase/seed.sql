-- Insert warehouses
INSERT INTO warehouses(id, name)
    VALUES (1, 'My House'),
(2, 'MPD');

-- Insert items (parts)
INSERT INTO items(name, price, type)
    VALUES ('Instruction Leaflet', 0.20, 'part'),
('Storage Bag', 1.11, 'part'),
('Webbing', 0.40, 'part'),
('Box Left Small', 1.5, 'part'),
('Box Right Small', 1.5, 'part'),
('Flier', 0.2, 'part'),
('Elastic', 0.72, 'part');

-- Insert items (products)
INSERT INTO items(name, price, type)
    VALUES ('Achilles Tendon Rupture Night Splint in Bag - Large Left', 89.99, 'product'),
('Achilles Tendon Rupture Night Splint in Bag - Large Right', 89.99, 'product'),
('Achilles Tendon Rupture Night Splint - Small Left', 79.99, 'product'),
('Achilles Tendon Rupture Night Splint - Small Right', 79.99, 'product');

-- Insert item components
INSERT INTO item_components(item_id, component_id, component_quantity)
SELECT
    p.id AS item_id,
    c.id AS component_id,
    CASE WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
        AND c.name = 'Instruction Leaflet' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
        AND c.name = 'Storage Bag' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
        AND c.name = 'Webbing' THEN
        0.4
    WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
        AND c.name = 'Flier' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
        AND c.name = 'Elastic' THEN
        0.86
    WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
        AND c.name = 'Instruction Leaflet' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
        AND c.name = 'Storage Bag' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
        AND c.name = 'Webbing' THEN
        0.4
    WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
        AND c.name = 'Flier' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
        AND c.name = 'Elastic' THEN
        0.86
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Left'
        AND c.name = 'Instruction Leaflet' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Left'
        AND c.name = 'Storage Bag' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Left'
        AND c.name = 'Webbing' THEN
        0.36
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Left'
        AND c.name = 'Box Left Small' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Left'
        AND c.name = 'Flier' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Left'
        AND c.name = 'Elastic' THEN
        0.78
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Right'
        AND c.name = 'Instruction Leaflet' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Right'
        AND c.name = 'Storage Bag' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Right'
        AND c.name = 'Webbing' THEN
        0.36
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Right'
        AND c.name = 'Box Right Small' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Right'
        AND c.name = 'Flier' THEN
        1
    WHEN p.name = 'Achilles Tendon Rupture Night Splint - Small Right'
        AND c.name = 'Elastic' THEN
        0.78
    END AS component_quantity
FROM
    items p
    CROSS JOIN items c
WHERE
    p.type = 'product'
    AND c.type = 'part'
    AND ((p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
            AND c.name IN ('Instruction Leaflet', 'Storage Bag', 'Webbing', 'Flier', 'Elastic'))
        OR (p.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
            AND c.name IN ('Instruction Leaflet', 'Storage Bag', 'Webbing', 'Flier', 'Elastic'))
        OR (p.name = 'Achilles Tendon Rupture Night Splint - Small Left'
            AND c.name IN ('Instruction Leaflet', 'Storage Bag', 'Webbing', 'Box Left Small', 'Flier', 'Elastic'))
        OR (p.name = 'Achilles Tendon Rupture Night Splint - Small Right'
            AND c.name IN ('Instruction Leaflet', 'Storage Bag', 'Webbing', 'Box Right Small', 'Flier', 'Elastic')));

-- Insert orders
INSERT INTO orders(order_type, order_date, carriage)
    VALUES ('purchase', '2023-01-15 10:00:00', 10.00),
('purchase', '2023-02-20 14:30:00', 15.00),
('purchase', '2023-03-25 09:45:00', 12.50),
('sale', '2023-04-10 14:30:00', 5.00),
('sale', '2023-04-15 09:45:00', 7.50),
('sale', '2023-04-20 11:15:00', 6.00),
('shipment', '2023-01-01 10:00:00', 20.00),
('shipment', '2023-01-02 11:00:00', 25.00);

-- Insert item changes for purchases
INSERT INTO item_changes(item_id, quantity_change, warehouse_id)
SELECT
    i.id,
    CASE WHEN i.name = 'Webbing' THEN
        200
    WHEN i.name = 'Elastic' THEN
        300
    WHEN i.name = 'Storage Bag' THEN
        100
    WHEN i.name = 'Instruction Leaflet' THEN
        500
    END,
    1
FROM
    items i
WHERE
    i.type = 'part'
    AND i.name IN ('Webbing', 'Elastic', 'Storage Bag', 'Instruction Leaflet');

-- Link item changes to purchases
INSERT INTO order_item_changes(order_id, item_change_id, price, tax)
SELECT
    o.id AS order_id,
    ic.id AS item_change_id,
    CASE WHEN i.name = 'Webbing' THEN
        80.00
    WHEN i.name = 'Elastic' THEN
        216.00
    WHEN i.name = 'Storage Bag' THEN
        111.00
    WHEN i.name = 'Instruction Leaflet' THEN
        100.00
    END AS price,
    0.2 AS tax
FROM
    orders o
    JOIN item_changes ic ON ic.warehouse_id = 1
    JOIN items i ON i.id = ic.item_id
WHERE
    o.order_type = 'purchase'
    AND ((o.order_date = '2023-01-15 10:00:00'
            AND i.name IN ('Webbing', 'Elastic'))
        OR (o.order_date = '2023-02-20 14:30:00'
            AND i.name = 'Storage Bag')
        OR (o.order_date = '2023-03-25 09:45:00'
            AND i.name = 'Instruction Leaflet'));

-- Insert item changes for sales (negative quantity change)
INSERT INTO item_changes(item_id, quantity_change, warehouse_id)
SELECT
    i.id,
    CASE WHEN i.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left' THEN
        -10
    WHEN i.name = 'Achilles Tendon Rupture Night Splint - Small Right' THEN
        -20
    WHEN i.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right' THEN
        -8
    END,
    1
FROM
    items i
WHERE
    i.type = 'product'
    AND i.name IN ('Achilles Tendon Rupture Night Splint in Bag - Large Left', 'Achilles Tendon Rupture Night Splint - Small Right', 'Achilles Tendon Rupture Night Splint in Bag - Large Right');

-- Link item changes to sales
INSERT INTO order_item_changes(order_id, item_change_id, price, tax)
SELECT
    o.id AS order_id,
    ic.id AS item_change_id,
    CASE WHEN i.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left' THEN
        899.90
    WHEN i.name = 'Achilles Tendon Rupture Night Splint - Small Right' THEN
        1599.80
    WHEN i.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right' THEN
        719.92
    END AS price,
    0.2 AS tax
FROM
    orders o
    JOIN item_changes ic ON ic.warehouse_id = 1
    JOIN items i ON i.id = ic.item_id
WHERE
    o.order_type = 'sale'
    AND ((o.order_date = '2023-04-10 14:30:00'
            AND i.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left')
        OR (o.order_date = '2023-04-15 09:45:00'
            AND i.name = 'Achilles Tendon Rupture Night Splint - Small Right')
        OR (o.order_date = '2023-04-20 11:15:00'
            AND i.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'));

-- Insert item changes for shipments
INSERT INTO item_changes(item_id, quantity_change, warehouse_id)
SELECT
    i.id,
    CASE WHEN i.name = 'Instruction Leaflet' THEN
        5000
    WHEN i.name = 'Storage Bag' THEN
        2400
    WHEN i.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left' THEN
        50
    WHEN i.name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right' THEN
        50
    END,
    CASE WHEN i.type = 'part' THEN
        1
    WHEN i.type = 'product' THEN
        2
    END
FROM
    items i
WHERE
    i.name IN ('Instruction Leaflet', 'Storage Bag', 'Achilles Tendon Rupture Night Splint in Bag - Large Left', 'Achilles Tendon Rupture Night Splint in Bag - Large Right');

-- Link item changes to shipments
INSERT INTO order_item_changes(order_id, item_change_id)
SELECT
    o.id AS order_id,
    ic.id AS item_change_id
FROM
    orders o
    JOIN item_changes ic ON ((o.order_date = '2023-01-01 10:00:00'
                AND ic.warehouse_id = 1)
            OR (o.order_date = '2023-01-02 11:00:00'
                AND ic.warehouse_id = 2))
    JOIN items i ON i.id = ic.item_id
WHERE
    o.order_type = 'shipment'
    AND ((o.order_date = '2023-01-01 10:00:00'
            AND i.name IN ('Instruction Leaflet', 'Storage Bag'))
        OR (o.order_date = '2023-01-02 11:00:00'
            AND i.name IN ('Achilles Tendon Rupture Night Splint in Bag - Large Left', 'Achilles Tendon Rupture Night Splint in Bag - Large Right')));

-- Insert service item
INSERT INTO items(name, price, type)
    VALUES ('Splint Assembly Service', 11.58, 'service');

-- Get the ID of the newly inserted service item
WITH service_item AS (
    SELECT
        id
    FROM
        items
    WHERE
        name = 'Splint Assembly Service'
        AND type = 'service')
    -- Insert item components for the service (assuming it's composed of labor only, no physical parts)
    INSERT INTO item_components(item_id, component_id, component_quantity)
    SELECT
        p.id AS item_id,
        s.id AS component_id,
        1 AS component_quantity -- Assuming one unit of service is required for each product
    FROM
        items p
    CROSS JOIN service_item s
WHERE
    p.type = 'product'
    AND p.name LIKE 'Achilles Tendon Rupture Night Splint%';

-- Add the service to existing orders (assuming it's part of the sales)
WITH service_item AS (
    SELECT
        id
    FROM
        items
    WHERE
        name = 'Splint Assembly Service'
        AND type = 'service')
INSERT INTO item_changes(item_id, quantity_change, warehouse_id)
SELECT
    s.id,
    - ic.quantity_change, -- Negative because it's a sale
    ic.warehouse_id
FROM
    item_changes ic
    JOIN items i ON i.id = ic.item_id
    CROSS JOIN service_item s
WHERE
    i.type = 'product'
    AND i.name LIKE 'Achilles Tendon Rupture Night Splint%'
    AND ic.quantity_change < 0;

-- Only for sales
-- Link the new item changes to the existing sales orders
WITH new_changes AS (
    SELECT
        ic.id AS item_change_id,
        i.id AS product_id
    FROM
        item_changes ic
        JOIN items i ON i.id = ic.item_id
    WHERE
        i.name = 'Splint Assembly Service')
INSERT INTO order_item_changes(order_id, item_change_id, price, tax)
SELECT
    oic.order_id,
    nc.item_change_id,
    11.58 AS price, -- The price of the service
    0.2 AS tax -- Assuming 20% tax rate
FROM
    order_item_changes oic
    JOIN item_changes ic ON ic.id = oic.item_change_id
    JOIN items i ON i.id = ic.item_id
    JOIN new_changes nc ON nc.product_id = i.id
WHERE
    i.type = 'product'
    AND i.name LIKE 'Achilles Tendon Rupture Night Splint%';

INSERT INTO storage.buckets(id, name)
    VALUES ('amazon-reports', 'amazon-reports')
ON CONFLICT (id)
    DO NOTHING;

