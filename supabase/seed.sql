-- Insert warehouses
INSERT INTO warehouses(id, name)
    VALUES (1, 'My House'),
(2, 'Amazon UK');

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
INSERT INTO item_components(parent_item_id, component_item_id, quantity)
    VALUES
        -- Achilles Tendon Rupture Night Splint in Bag - Large Left
((
                SELECT
                    id
                FROM
                    items
                WHERE
                    name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
                    AND type = 'product'),
(
                    SELECT
                        id
                    FROM
                        items
                    WHERE
                        name = 'Instruction Leaflet'
                        AND type = 'part'),
                    1),
((
                SELECT
                    id
                FROM items
            WHERE
                name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
                AND type = 'product'),(
            SELECT
                id
            FROM items
        WHERE
            name = 'Storage Bag'
            AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Webbing'
        AND type = 'part'), 0.4),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Box Left Small'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Flier'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Elastic'
        AND type = 'part'), 0.86),
        -- Achilles Tendon Rupture Night Splint in Bag - Large Right
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Instruction Leaflet'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Storage Bag'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Webbing'
        AND type = 'part'), 0.4),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Box Right Small'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Flier'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Elastic'
        AND type = 'part'), 0.86),
        -- Achilles Tendon Rupture Night Splint - Small Left
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Instruction Leaflet'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Storage Bag'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Webbing'
        AND type = 'part'), 0.36),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Box Left Small'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Flier'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Left'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Elastic'
        AND type = 'part'), 0.78),
        -- Achilles Tendon Rupture Night Splint - Small Right
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Instruction Leaflet'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Storage Bag'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Webbing'
        AND type = 'part'), 0.36),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Box Right Small'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Flier'
        AND type = 'part'), 1),
((
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Right'
            AND type = 'product'),(
        SELECT
            id
        FROM items
    WHERE
        name = 'Elastic'
        AND type = 'part'), 0.78);

-- Insert orders
INSERT INTO orders(type, order_date, carriage)
    VALUES ('purchase', '2023-01-15 10:00:00', 10.00),
('purchase', '2023-02-20 14:30:00', 15.00),
('purchase', '2023-03-25 09:45:00', 12.50),
('sale', '2023-04-10 14:30:00', 5.00),
('sale', '2023-04-15 09:45:00', 7.50),
('sale', '2023-04-20 11:15:00', 6.00),
('shipment', '2023-01-01 10:00:00', 20.00),
('shipment', '2023-01-02 11:00:00', 25.00);

-- Insert item changes for purchases
INSERT INTO item_changes(item_id, quantity_change, warehouse_id, timestamp)
    VALUES ((
            SELECT
                id
            FROM
                items
            WHERE
                name = 'Webbing'
                AND type = 'part'),
            200,
            1,
            '2023-01-15 10:00:00'),
((
        SELECT
            id
        FROM items
        WHERE
            name = 'Elastic'
            AND type = 'part'), 300, 1, '2023-01-15 10:00:00'),
((
        SELECT
            id
        FROM items
    WHERE
        name = 'Storage Bag'
        AND type = 'part'), 100, 1, '2023-02-20 14:30:00'),
((
        SELECT
            id
        FROM items
    WHERE
        name = 'Instruction Leaflet'
        AND type = 'part'), 500, 1, '2023-03-25 09:45:00');

-- Link item changes to purchases
INSERT INTO order_item_changes(order_id, item_change_id, price, tax)
    VALUES ((
            SELECT
                id
            FROM
                orders
            WHERE
                type = 'purchase'
                AND order_date = '2023-01-15 10:00:00'),
(
                SELECT
                    id
                FROM
                    item_changes
                WHERE
                    item_id =(
                        SELECT
                            id
                        FROM
                            items
                        WHERE
                            name = 'Webbing'
                            AND type = 'part')
                        AND timestamp = '2023-01-15 10:00:00'),
                    80.00,
                    0.2),
((
                SELECT
                    id
                FROM orders
            WHERE
                type = 'purchase'
                AND order_date = '2023-01-15 10:00:00'),(
            SELECT
                id
            FROM item_changes
        WHERE
            item_id =(
                SELECT
                    id
                FROM items
            WHERE
                name = 'Elastic'
                AND type = 'part')
        AND timestamp = '2023-01-15 10:00:00'), 216.00, 0.2),
((
            SELECT
                id
            FROM orders
        WHERE
            type = 'purchase'
            AND order_date = '2023-02-20 14:30:00'),(
        SELECT
            id
        FROM item_changes
    WHERE
        item_id =(
            SELECT
                id
            FROM items
        WHERE
            name = 'Storage Bag'
            AND type = 'part')
        AND timestamp = '2023-02-20 14:30:00'), 111.00, 0.2),
((
        SELECT
            id
        FROM orders
    WHERE
        type = 'purchase'
        AND order_date = '2023-03-25 09:45:00'),(
    SELECT
        id
    FROM item_changes
WHERE
    item_id =(
        SELECT
            id
        FROM items
    WHERE
        name = 'Instruction Leaflet'
        AND type = 'part')
AND timestamp = '2023-03-25 09:45:00'), 100.00, 0.2);

-- Insert item changes for sales (negative quantity change)
INSERT INTO item_changes(item_id, quantity_change, warehouse_id, timestamp)
    VALUES ((
            SELECT
                id
            FROM
                items
            WHERE
                name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
                AND type = 'product'),
            -10,
            1,
            '2023-04-10 14:30:00'),
((
        SELECT
            id
        FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint - Small Right'
            AND type = 'product'), -20, 1, '2023-04-15 09:45:00'),
((
        SELECT
            id
        FROM items
    WHERE
        name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
        AND type = 'product'), -8, 1, '2023-04-20 11:15:00');

-- Link item changes to sales
INSERT INTO order_item_changes(order_id, item_change_id, price, tax)
    VALUES ((
            SELECT
                id
            FROM
                orders
            WHERE
                type = 'sale'
                AND order_date = '2023-04-10 14:30:00'),
(
                SELECT
                    id
                FROM
                    item_changes
                WHERE
                    item_id =(
                        SELECT
                            id
                        FROM
                            items
                        WHERE
                            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
                            AND type = 'product')
                        AND timestamp = '2023-04-10 14:30:00'),
                    899.90,
                    0.2),
((
                SELECT
                    id
                FROM orders
            WHERE
                type = 'sale'
                AND order_date = '2023-04-15 09:45:00'),(
            SELECT
                id
            FROM item_changes
        WHERE
            item_id =(
                SELECT
                    id
                FROM items
            WHERE
                name = 'Achilles Tendon Rupture Night Splint - Small Right'
                AND type = 'product')
        AND timestamp = '2023-04-15 09:45:00'), 1599.80, 0.2),
((
            SELECT
                id
            FROM orders
        WHERE
            type = 'sale'
            AND order_date = '2023-04-20 11:15:00'),(
        SELECT
            id
        FROM item_changes
    WHERE
        item_id =(
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
            AND type = 'product')
        AND timestamp = '2023-04-20 11:15:00'), 719.92, 0.2);

-- Insert item changes for shipments
INSERT INTO item_changes(item_id, quantity_change, warehouse_id, timestamp)
    VALUES ((
            SELECT
                id
            FROM
                items
            WHERE
                name = 'Instruction Leaflet'
                AND type = 'part'),
            5000,
            1,
            '2023-01-01 10:00:00'),
((
        SELECT
            id
        FROM items
        WHERE
            name = 'Storage Bag'
            AND type = 'part'), 2400, 1, '2023-01-01 10:00:00'),
((
        SELECT
            id
        FROM items
    WHERE
        name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
        AND type = 'product'), 50, 2, '2023-01-02 11:00:00'),
((
        SELECT
            id
        FROM items
    WHERE
        name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
        AND type = 'product'), 50, 2, '2023-01-02 11:00:00');

-- Link item changes to shipments
INSERT INTO order_item_changes(order_id, item_change_id)
    VALUES ((
            SELECT
                id
            FROM
                orders
            WHERE
                type = 'shipment'
                AND order_date = '2023-01-01 10:00:00'),
(
                SELECT
                    id
                FROM
                    item_changes
                WHERE
                    item_id =(
                        SELECT
                            id
                        FROM
                            items
                        WHERE
                            name = 'Instruction Leaflet'
                            AND type = 'part')
                        AND timestamp = '2023-01-01 10:00:00')),
((
                SELECT
                    id
                FROM orders
            WHERE
                type = 'shipment'
                AND order_date = '2023-01-01 10:00:00'),(
            SELECT
                id
            FROM item_changes
        WHERE
            item_id =(
                SELECT
                    id
                FROM items
            WHERE
                name = 'Storage Bag'
                AND type = 'part')
        AND timestamp = '2023-01-01 10:00:00')),
((
            SELECT
                id
            FROM orders
        WHERE
            type = 'shipment'
            AND order_date = '2023-01-02 11:00:00'),(
        SELECT
            id
        FROM item_changes
    WHERE
        item_id =(
            SELECT
                id
            FROM items
        WHERE
            name = 'Achilles Tendon Rupture Night Splint in Bag - Large Left'
            AND type = 'product')
        AND timestamp = '2023-01-02 11:00:00')),
((
        SELECT
            id
        FROM orders
    WHERE
        type = 'shipment'
        AND order_date = '2023-01-02 11:00:00'),(
    SELECT
        id
    FROM item_changes
WHERE
    item_id =(
        SELECT
            id
        FROM items
    WHERE
        name = 'Achilles Tendon Rupture Night Splint in Bag - Large Right'
        AND type = 'product')
AND timestamp = '2023-01-02 11:00:00'));

