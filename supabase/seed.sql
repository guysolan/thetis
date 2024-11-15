-- Insert addresses
INSERT INTO addresses(id, name, line_1, line_2, city, country, code, holds_stock)
    VALUES (1, 'Park House', 'Stilemans', 'Hascombe Road', 'Godalming', 'United Kingdom', 'GU8 4AB', TRUE),
(2, 'MPD', 'Unit 4', 'Commerce Business Centre, Commerce Close', 'Westbury', 'United Kingdom', 'BA13 4LS', TRUE),
(3, 'Thetis Medical', '15 Leopold Street', NULL, 'Birmingham', 'United Kingdom', 'B12 0UJ', FALSE);

-- Insert companies with full details
INSERT INTO companies(name, company_number, tax_number)
    VALUES ('Thetis Medical Ltd', '12345678', 'GB123456789'),
('MPD Limited', '87654321', 'GB987654321');

-- Create company-address associations
INSERT INTO company_addresses(company_id, address_id)
SELECT
    c.id,
    a.id
FROM
    companies c
    CROSS JOIN addresses a
WHERE (c.name = 'Thetis Medical Ltd'
    AND a.id IN (1, 3)) -- Park House and Leopold Street
    OR (c.name = 'MPD Limited'
        AND a.id = 2);

-- MPD address
-- Update existing orders with company information
UPDATE
    orders o
SET
    from_company_id = CASE WHEN o.order_type = 'purchase' THEN
    (
        SELECT
            id
        FROM
            companies
        WHERE
            name = 'MPD Limited')
    WHEN o.order_type = 'sale' THEN
    (
        SELECT
            id
        FROM
            companies
        WHERE
            name = 'Thetis Medical Ltd')
    WHEN o.order_type = 'shipment' THEN
    (
        SELECT
            id
        FROM
            companies
        WHERE
            name = 'Thetis Medical Ltd')
    END,
    to_company_id = CASE WHEN o.order_type = 'purchase' THEN
    (
        SELECT
            id
        FROM
            companies
        WHERE
            name = 'Thetis Medical Ltd')
    WHEN o.order_type = 'sale' THEN
        NULL -- Could be various customers
    WHEN o.order_type = 'shipment' THEN
    (
        SELECT
            id
        FROM
            companies
        WHERE
            name = 'MPD Limited')
    END,
    from_billing_address_id = CASE WHEN o.order_type = 'purchase' THEN
        2 -- MPD address
    WHEN o.order_type IN ('sale', 'shipment') THEN
        3 -- Thetis billing address
    END,
    from_shipping_address_id = CASE WHEN o.order_type = 'purchase' THEN
        2 -- MPD address
    WHEN o.order_type IN ('sale', 'shipment') THEN
        1 -- Park House
    END,
    to_billing_address_id = CASE WHEN o.order_type = 'purchase' THEN
        3 -- Thetis billing address
    WHEN o.order_type = 'shipment' THEN
        2 -- MPD address
    END,
    to_shipping_address_id = CASE WHEN o.order_type = 'purchase' THEN
        1 -- Park House
    WHEN o.order_type = 'shipment' THEN
        2 -- MPD address
    END;

-- Insert items (parts)
INSERT INTO items(name, price, type, sku, country_of_origin)
    VALUES ('Instruction Leaflet', 0.20, 'part', 'TM-PART-001', 'United Kingdom'),
('Storage Bag', 1.11, 'part', 'TM-PART-002', 'United Kingdom'),
('Webbing', 0.40, 'part', 'TM-PART-003', 'United Kingdom'),
('Box Left Small', 1.5, 'part', 'TM-PART-004', 'United Kingdom'),
('Box Right Small', 1.5, 'part', 'TM-PART-005', 'United Kingdom'),
('Flier', 0.2, 'part', 'TM-PART-006', 'United Kingdom'),
('Elastic', 0.72, 'part', 'TM-PART-007', 'United Kingdom');

-- Insert items (products)
INSERT INTO items(name, price, type, hs_code, sku, country_of_origin)
    VALUES ('Achilles Tendon Rupture Night Splint in Bag - Large Left', 89.99, 'product', 902110, 'TM-ATRNS-LL', 'United Kingdom'),
('Achilles Tendon Rupture Night Splint in Bag - Large Right', 89.99, 'product', 902110, 'TM-ATRNS-LR', 'United Kingdom'),
('Achilles Tendon Rupture Night Splint in Box - Small Left', 79.99, 'product', 902110, 'TM-ATRNS-SL', 'United Kingdom'),
('Achilles Tendon Rupture Night Splint in Box - Small Right', 79.99, 'product', 902110, 'TM-ATRNS-SR', 'United Kingdom');

-- Insert items (packages)
INSERT INTO items(name, price, type, height, width, depth, weight, sku, country_of_origin)
    VALUES ('Box of 50 Achilles Tendon Rupture Night Splints - Large Left', 4499.50, 'package', 60.00, 40.00, 35.00, 10.00, 'TM-ATRNS-LL-50', 'United Kingdom'),
('Box of 50 Achilles Tendon Rupture Night Splints - Large Right', 4499.50, 'package', 60.00, 40.00, 35.00, 10.00, 'TM-ATRNS-LR-50', 'United Kingdom'),
('Box of 25 Achilles Tendon Rupture Night Splints - Small Left', 1999.75, 'package', 60.00, 40.00, 35.00, 5.00, 'TM-ATRNS-SL-25', 'United Kingdom'),
('Box of 25 Achilles Tendon Rupture Night Splints - Small Right', 1999.75, 'package', 60.00, 40.00, 35.00, 5.00, 'TM-ATRNS-SR-25', 'United Kingdom');

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

-- Insert item components for packages (50 products per package for large, 25 for small)
INSERT INTO item_components(item_id, component_id, component_quantity)
SELECT
    pkg.id AS item_id,
    prod.id AS component_id,
    CASE WHEN pkg.sku LIKE '%50' THEN
        50
    WHEN pkg.sku LIKE '%25' THEN
        25
    END AS component_quantity
FROM
    items pkg
    JOIN items prod ON ((pkg.sku = 'TM-ATRNS-LL-50'
                AND prod.sku = 'TM-ATRNS-LL')
            OR (pkg.sku = 'TM-ATRNS-LR-50'
                AND prod.sku = 'TM-ATRNS-LR')
            OR (pkg.sku = 'TM-ATRNS-SL-25'
                AND prod.sku = 'TM-ATRNS-SL')
            OR (pkg.sku = 'TM-ATRNS-SR-25'
                AND prod.sku = 'TM-ATRNS-SR'))
WHERE
    pkg.type = 'package'
    AND prod.type = 'product';

-- Insert orders with company and address information
INSERT INTO orders(order_type, order_date, carriage, from_company_id, to_company_id, from_billing_address_id, from_shipping_address_id, to_billing_address_id, to_shipping_address_id)
    VALUES
        -- Purchase orders: from MPD to Thetis
('purchase', '2023-01-15 10:00:00', 10.00,(
                SELECT
                    id
                FROM
                    companies
                WHERE
                    name = 'MPD Limited'),(
                    SELECT
                        id
                    FROM
                        companies
                    WHERE
                        name = 'Thetis Medical Ltd'), 2, 2, 3, 1),('purchase', '2023-02-20 14:30:00', 15.00,(
                    SELECT
                        id
                    FROM
                        companies
                    WHERE
                        name = 'MPD Limited'),(
                        SELECT
                            id
                        FROM
                            companies
                        WHERE
                            name = 'Thetis Medical Ltd'), 2, 2, 3, 1),('purchase', '2023-03-25 09:45:00', 12.50,(
                        SELECT
                            id
                        FROM
                            companies
                        WHERE
                            name = 'MPD Limited'),(
                            SELECT
                                id
                            FROM
                                companies
                            WHERE
                                name = 'Thetis Medical Ltd'), 2, 2, 3, 1),
                    -- Sale orders: from Thetis to various customers (no to_company_id)
('sale', '2023-04-10 14:30:00', 5.00,(
                            SELECT
                                id
                            FROM companies
                        WHERE
                            name = 'Thetis Medical Ltd'), NULL, 3, 1, NULL, NULL),('sale', '2023-04-15 09:45:00', 7.50,(
                        SELECT
                            id
                        FROM
                            companies
                        WHERE
                            name = 'Thetis Medical Ltd'), NULL, 3, 1, NULL, NULL),('sale', '2023-04-20 11:15:00', 6.00,(
                        SELECT
                            id
                        FROM
                            companies
                        WHERE
                            name = 'Thetis Medical Ltd'), NULL, 3, 1, NULL, NULL),
                -- Shipment orders: from Thetis to MPD
('shipment', '2023-01-01 10:00:00', 20.00,(
                        SELECT
                            id
                        FROM companies
                    WHERE
                        name = 'Thetis Medical Ltd'),(
                    SELECT
                        id
                    FROM companies
                WHERE
                    name = 'MPD Limited'), 3, 1, 2, 2),('shipment', '2023-01-02 11:00:00', 25.00,(
                    SELECT
                        id
                    FROM
                        companies
                    WHERE
                        name = 'Thetis Medical Ltd'),(
                        SELECT
                            id
                        FROM
                            companies
                        WHERE
                            name = 'MPD Limited'), 3, 1, 2, 2);

-- Insert item changes for purchases
INSERT INTO item_changes(item_id, quantity_change, address_id)
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
    JOIN item_changes ic ON ic.address_id = 1
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
INSERT INTO item_changes(item_id, quantity_change, address_id)
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
    JOIN item_changes ic ON ic.address_id = 1
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
INSERT INTO item_changes(item_id, quantity_change, address_id)
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
                AND ic.address_id = 1)
            OR (o.order_date = '2023-01-02 11:00:00'
                AND ic.address_id = 2))
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
INSERT INTO item_changes(item_id, quantity_change, address_id)
SELECT
    s.id,
    - ic.quantity_change, -- Negative because it's a sale
    ic.address_id
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

