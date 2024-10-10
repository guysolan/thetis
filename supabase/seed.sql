INSERT INTO parts(name, quantity, price)
    VALUES ('Instruction Leaflet', 5000, 0.20),
('Storage Bag', 1000, 1.11),
('Webbing', 2200, 0.40),
('Elastic', 4900, 0.72);

INSERT INTO products(name, quantity, price)
    VALUES ('Achilles Tendon Rupture Night Splint - Large Left', 50, 89.99),
('Achilles Tendon Rupture Night Splint - Large Right', 50, 89.99),
('Achilles Tendon Rupture Night Splint - Small Left', 50, 79.99),
('Achilles Tendon Rupture Night Splint - Small Right', 50, 79.99);

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

-- Insert data into purchases
INSERT INTO purchases(quantity, purchase_date, total_cost)
    VALUES (100, '2023-01-15 10:00:00', 1490.00),
(50, '2023-02-20 14:30:00', 5230.00),
(75, '2023-03-25 09:45:00', 75.50);

-- Insert data into purchase_parts
INSERT INTO purchase_parts(purchase_id, part_id, quantity)
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
                    parts
                WHERE
                    name = 'Webbing'), 200),((
            SELECT
                id
            FROM purchases
        WHERE
            purchase_date = '2023-01-15 10:00:00'),(
        SELECT
            id
        FROM parts
    WHERE
        name = 'Elastic'), 300),((
        SELECT
            id
        FROM purchases
    WHERE
        purchase_date = '2023-02-20 14:30:00'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Storage Bag'), 100),((
        SELECT
            id
        FROM purchases
    WHERE
        purchase_date = '2023-03-25 09:45:00'),(
    SELECT
        id
    FROM parts
WHERE
    name = 'Instruction Leaflet'), 500);

-- Insert data into purchase_products
INSERT INTO purchase_products(purchase_id, product_id, quantity)
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
                    products
                WHERE
                    name = 'Achilles Tendon Rupture Night Splint - Large Left'), 25),((
            SELECT
                id
            FROM purchases
        WHERE
            purchase_date = '2023-02-20 14:30:00'),(
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Right'), 20),((
        SELECT
            id
        FROM purchases
    WHERE
        purchase_date = '2023-03-25 09:45:00'),(
    SELECT
        id
    FROM products
WHERE
    name = 'Achilles Tendon Rupture Night Splint - Large Right'), 30);

-- Insert data into sales
INSERT INTO sales(total_cost, sale_date)
    VALUES (1235.39, '2023-04-10 14:30:00'),
(2470.78, '2023-04-15 09:45:00'),
(987.65, '2023-04-20 11:15:00');

-- Insert data into sale_products
INSERT INTO sale_products(sale_id, product_id, quantity, price)
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
                    products
                WHERE
                    name = 'Achilles Tendon Rupture Night Splint - Large Left'), 10, 89.99),((
            SELECT
                id
            FROM sales
        WHERE
            sale_date = '2023-04-15 09:45:00'),(
        SELECT
            id
        FROM products
    WHERE
        name = 'Achilles Tendon Rupture Night Splint - Small Right'), 20, 79.99),((
        SELECT
            id
        FROM sales
    WHERE
        sale_date = '2023-04-20 11:15:00'),(
    SELECT
        id
    FROM products
WHERE
    name = 'Achilles Tendon Rupture Night Splint - Large Right'), 8, 89.99);

