-- Insert warehouses
INSERT INTO warehouses(id, name)
    VALUES (1, 'My House'),
(2, 'Amazon UK');

-- Insert parts
INSERT INTO parts(name, price)
    VALUES ('Instruction Leaflet', 0.20),
('Storage Bag', 1.11),
('Webbing', 0.40),
('Elastic', 0.72);

-- Insert products
INSERT INTO products(name, price)
    VALUES ('Achilles Tendon Rupture Night Splint - Large Left', 89.99),
('Achilles Tendon Rupture Night Splint - Large Right', 89.99),
('Achilles Tendon Rupture Night Splint - Small Left', 79.99),
('Achilles Tendon Rupture Night Splint - Small Right', 79.99);

-- Insert product parts
INSERT INTO product_parts(product_id, part_id, quantity)
    VALUES ((
            SELECT
                id
            FROM
                products
            WHERE
                name = 'Achilles Tendon Rupture Night Splint - Large Left'),(
                SELECT
                    id
                FROM
                    parts
                WHERE
                    name = 'Webbing'), 0.4),((
            SELECT
                id
            FROM products
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Large Left'),(
        SELECT
            id
        FROM parts
    WHERE
        name = 'Elastic'), 0.86),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Large Left'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Storage Bag'), 1),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Large Left'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Instruction Leaflet'), 1),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Large Right'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Webbing'), 0.4),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Large Right'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Elastic'), 0.86),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Large Right'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Storage Bag'), 1),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Large Right'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Instruction Leaflet'), 1),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Left'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Webbing'), 0.36),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Left'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Elastic'), 0.78),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Left'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Storage Bag'), 1),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Left'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Instruction Leaflet'), 1),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Right'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Webbing'), 0.36),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Right'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Elastic'), 0.78),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Right'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Storage Bag'), 1),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Right'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Instruction Leaflet'), 1);

-- Insert purchases
INSERT INTO purchases(purchase_date, carriage)
    VALUES ('2023-01-15 10:00:00', 10.00),
('2023-02-20 14:30:00', 15.00),
('2023-03-25 09:45:00', 12.50);

-- Insert part changes for purchases
INSERT INTO part_changes(part_id, quantity_change, warehouse_id, timestamp)
    VALUES ((
            SELECT
                id
            FROM
                parts
            WHERE
                name = 'Webbing'), 200, 1, '2023-01-15 10:00:00'),((
        SELECT
            id
        FROM parts
        WHERE
            name = 'Elastic'), 300, 1, '2023-01-15 10:00:00'),((
        SELECT
            id
        FROM parts
    WHERE
        name = 'Storage Bag'), 100, 1, '2023-02-20 14:30:00'),((
        SELECT
            id
        FROM parts
    WHERE
        name = 'Instruction Leaflet'), 500, 1, '2023-03-25 09:45:00');

-- Link part changes to purchases
INSERT INTO purchase_part_changes(purchase_id, part_change_id, price, tax)
    VALUES ((
            SELECT
                id
            FROM
                purchases
            WHERE
                purchase_date = '2023-01-15 10:00:00'),(
                SELECT
                    id
                FROM
                    part_changes
                WHERE
                    part_id =(
                        SELECT
                            id
                        FROM
                            parts
                        WHERE
                            name = 'Webbing')
                        AND timestamp = '2023-01-15 10:00:00'),
                    80.00,
                    0.2),
((
                SELECT
                    id
                FROM purchases
            WHERE
                purchase_date = '2023-01-15 10:00:00'),(
            SELECT
                id
            FROM part_changes
        WHERE
            part_id =(
                SELECT
                    id
                FROM parts
            WHERE
                name = 'Elastic')
        AND timestamp = '2023-01-15 10:00:00'), 216.00, 0.2),
((
            SELECT
                id
            FROM purchases
        WHERE
            purchase_date = '2023-02-20 14:30:00'),(
        SELECT
            id
        FROM part_changes
    WHERE
        part_id =(
            SELECT
                id
            FROM parts
        WHERE
            name = 'Storage Bag')
        AND timestamp = '2023-02-20 14:30:00'), 111.00, 0.2),
((
        SELECT
            id
        FROM purchases
    WHERE
        purchase_date = '2023-03-25 09:45:00'),(
    SELECT
        id
    FROM part_changes
WHERE
    part_id =(
        SELECT
            id
        FROM parts
    WHERE
        name = 'Instruction Leaflet')
AND timestamp = '2023-03-25 09:45:00'), 100.00, 0.2);

-- Insert sales
INSERT INTO sales(sale_date, carriage)
    VALUES ('2023-04-10 14:30:00', 5.00),
('2023-04-15 09:45:00', 7.50),
('2023-04-20 11:15:00', 6.00);

-- Insert product changes for sales (negative quantity change)
INSERT INTO product_changes(product_id, quantity_change, warehouse_id, timestamp)
    VALUES ((
            SELECT
                id
            FROM
                products
            WHERE
                name = 'Achilles Tendon Rupture Night Splint - Large Left'), -10, 1, '2023-04-10 14:30:00'),((
        SELECT
            id
        FROM products
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Right'), -20, 1, '2023-04-15 09:45:00'),((
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Large Right'), -8, 1, '2023-04-20 11:15:00');

-- Link product changes to sales
INSERT INTO sale_product_changes(sale_id, product_change_id, price, tax)
    VALUES ((
            SELECT
                id
            FROM
                sales
            WHERE
                sale_date = '2023-04-10 14:30:00'),(
                SELECT
                    id
                FROM
                    product_changes
                WHERE
                    product_id =(
                        SELECT
                            id
                        FROM
                            products
                        WHERE
                            name = 'Achilles Tendon Rupture Night Splint - Large Left')
                        AND timestamp = '2023-04-10 14:30:00'),
                    899.90,
                    0.2),
((
                SELECT
                    id
                FROM sales
            WHERE
                sale_date = '2023-04-15 09:45:00'),(
            SELECT
                id
            FROM product_changes
        WHERE
            product_id =(
                SELECT
                    id
                FROM products
            WHERE
                name = 'Achilles Tendon Rupture Night Splint - Small Right')
        AND timestamp = '2023-04-15 09:45:00'), 1599.80, 0.2),
((
            SELECT
                id
            FROM sales
        WHERE
            sale_date = '2023-04-20 11:15:00'),(
        SELECT
            id
        FROM product_changes
    WHERE
        product_id =(
            SELECT
                id
            FROM products
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Large Right')
        AND timestamp = '2023-04-20 11:15:00'), 719.92, 0.2);

-- Insert shipments
INSERT INTO shipments(shipment_date, carriage)
    VALUES ('2023-01-01 10:00:00', 20.00),
('2023-01-02 11:00:00', 25.00);

-- Insert part changes for shipments
INSERT INTO part_changes(part_id, quantity_change, warehouse_id, timestamp)
    VALUES ((
            SELECT
                id
            FROM
                parts
            WHERE
                name = 'Instruction Leaflet'), 5000, 1, '2023-01-01 10:00:00'),((
        SELECT
            id
        FROM parts
        WHERE
            name = 'Storage Bag'), 2400, 1, '2023-01-01 10:00:00');

-- Link part changes to shipments
INSERT INTO shipment_part_changes(shipment_id, part_change_id)
    VALUES ((
            SELECT
                id
            FROM
                shipments
            WHERE
                shipment_date = '2023-01-01 10:00:00'),(
                SELECT
                    id
                FROM
                    part_changes
                WHERE
                    part_id =(
                        SELECT
                            id
                        FROM
                            parts
                        WHERE
                            name = 'Instruction Leaflet')
                        AND timestamp = '2023-01-01 10:00:00')),
((
                SELECT
                    id
                FROM shipments
            WHERE
                shipment_date = '2023-01-01 10:00:00'),(
            SELECT
                id
            FROM part_changes
        WHERE
            part_id =(
                SELECT
                    id
                FROM parts
            WHERE
                name = 'Storage Bag')
        AND timestamp = '2023-01-01 10:00:00'));

-- Insert product changes for shipments
INSERT INTO product_changes(product_id, quantity_change, warehouse_id, timestamp)
    VALUES ((
            SELECT
                id
            FROM
                products
            WHERE
                name = 'Achilles Tendon Rupture Night Splint - Large Left'), 50, 2, '2023-01-02 11:00:00'),((
        SELECT
            id
        FROM products
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Large Right'), 50, 2, '2023-01-02 11:00:00');

-- Link product changes to shipments
INSERT INTO shipment_product_changes(shipment_id, product_change_id)
    VALUES ((
            SELECT
                id
            FROM
                shipments
            WHERE
                shipment_date = '2023-01-02 11:00:00'),(
                SELECT
                    id
                FROM
                    product_changes
                WHERE
                    product_id =(
                        SELECT
                            id
                        FROM
                            products
                        WHERE
                            name = 'Achilles Tendon Rupture Night Splint - Large Left')
                        AND timestamp = '2023-01-02 11:00:00')),
((
                SELECT
                    id
                FROM shipments
            WHERE
                shipment_date = '2023-01-02 11:00:00'),(
            SELECT
                id
            FROM product_changes
        WHERE
            product_id =(
                SELECT
                    id
                FROM products
            WHERE
                name = 'Achilles Tendon Rupture Night Splint - Large Right')
        AND timestamp = '2023-01-02 11:00:00'));

