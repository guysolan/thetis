-- Create initial user in auth.users
-- INSERT INTO auth.users(id, email, encrypted_password, email_confirmed_at, confirmed_at, created_at, updated_at, raw_user_meta_data)
--     VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'guy@thetismedical.com', crypt('Newspaper202!', gen_salt('bf')), now(), now(), now(), now(), '{}'::jsonb);
-- Create initial user in auth.users
INSERT INTO "auth"."users"("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous")
    VALUES ('00000000-0000-0000-0000-000000000000', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'authenticated', 'authenticated', 'guy@thetismedical.com', '$2a$10$xOKlwI180wfilIbcXtUQ.upAgfmwvB5uYyHTcJPTzRiithwIm4Wai', '2025-03-14 18:58:08.048878+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-14 18:58:21.829352+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-03-14 18:58:08.034684+00', '2025-03-14 18:58:21.834628+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, FALSE, NULL, FALSE);

-- Insert companies first
INSERT INTO companies(id, name, company_number, tax_number, user_id)
    VALUES (1, 'Thetis Medical Ltd', '12345678', 'GB123456789', 1),
(2, 'MPD Limited', '87654321', 'GB987654321', 1);

-- Then insert addresses with company_id references
INSERT INTO addresses(id, name, line_1, line_2, city, country, code, holds_stock, company_id, is_default_shipping, is_default_billing)
    VALUES (1, 'Park House', 'Stilemans', 'Hascombe Road', 'Godalming', 'United Kingdom', 'GU8 4AB', TRUE, 1, TRUE, FALSE),
(2, 'MPD', 'Unit 4', 'Commerce Business Centre, Commerce Close', 'Westbury', 'United Kingdom', 'BA13 4LS', TRUE, 2, TRUE, TRUE),
(3, 'Thetis Medical', '15 Leopold Street', NULL, 'Birmingham', 'United Kingdom', 'B12 0UJ', FALSE, 1, FALSE, TRUE);

-- Link user to company
INSERT INTO company_users(company_id, user_id, is_admin)
SELECT
    1, -- Thetis Medical Ltd
    u.id,
    TRUE -- Make them an admin
FROM
    users u
WHERE
    u.uuid = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

-- Set default company for user
INSERT INTO default_company(user_id, company_id)
SELECT
    u.id,
    1 -- Thetis Medical Ltd
FROM
    users u
WHERE
    u.uuid = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

-- Insert service items first
INSERT INTO items(name, price, type, company_id)
    VALUES ('Assemble Large Splint', 8.50, 'service', 1),
('Assemble Small Splint', 7.50, 'service', 1),
('Pack Large Splint', 3.08, 'service', 1),
('Pack Small Splint', 2.58, 'service', 1);

-- Insert items (parts) with company_id
INSERT INTO items(name, price, type, sku, country_of_origin, company_id)
    VALUES ('Instruction Leaflet', 0.20, 'part', 'TM-PART-001', 'United Kingdom', 1),
('Storage Bag', 1.11, 'part', 'TM-PART-002', 'United Kingdom', 1),
('Webbing', 0.40, 'part', 'TM-PART-003', 'United Kingdom', 1),
('Box Left Small', 1.5, 'part', 'TM-PART-004', 'United Kingdom', 1),
('Box Right Small', 1.5, 'part', 'TM-PART-005', 'United Kingdom', 1),
('Flier', 0.2, 'part', 'TM-PART-006', 'United Kingdom', 1),
('Elastic', 0.72, 'part', 'TM-PART-007', 'United Kingdom', 1);

-- Insert items (products) with company_id
INSERT INTO items(name, price, type, hs_code, sku, country_of_origin, company_id)
    VALUES ('Achilles Tendon Rupture Night Splint in Bag - Large Left', 89.99, 'product', 902110, 'TM-ATRNS-LL', 'United Kingdom', 1),
('Achilles Tendon Rupture Night Splint in Bag - Large Right', 89.99, 'product', 902110, 'TM-ATRNS-LR', 'United Kingdom', 1),
('Achilles Tendon Rupture Night Splint in Box - Small Left', 79.99, 'product', 902110, 'TM-ATRNS-SL', 'United Kingdom', 1),
('Achilles Tendon Rupture Night Splint in Box - Small Right', 79.99, 'product', 902110, 'TM-ATRNS-SR', 'United Kingdom', 1);

-- Insert items (packages) with company_id
INSERT INTO items(name, price, type, height, width, depth, weight, sku, country_of_origin, company_id)
    VALUES ('Box of 50 Achilles Tendon Rupture Night Splints - Large Left', 4499.50, 'package', 60.00, 40.00, 35.00, 10.00, 'TM-ATRNS-LL-50', 'United Kingdom', 1),
('Box of 50 Achilles Tendon Rupture Night Splints - Large Right', 4499.50, 'package', 60.00, 40.00, 35.00, 10.00, 'TM-ATRNS-LR-50', 'United Kingdom', 1),
('Box of 25 Achilles Tendon Rupture Night Splints - Small Left', 1999.75, 'package', 60.00, 40.00, 35.00, 5.00, 'TM-ATRNS-SL-25', 'United Kingdom', 1),
('Box of 25 Achilles Tendon Rupture Night Splints - Small Right', 1999.75, 'package', 60.00, 40.00, 35.00, 5.00, 'TM-ATRNS-SR-25', 'United Kingdom', 1);

-- Add components to products (including services)
WITH product_components AS (
    SELECT
        p.id AS product_id,
        i.id AS component_id,
        CASE
        -- Physical components
        WHEN i.type = 'part' THEN
            CASE
            -- Webbing quantities
            WHEN i.name = 'Webbing'
                AND p.name LIKE '%Large%' THEN
                0.40
            WHEN i.name = 'Webbing'
                AND p.name LIKE '%Small%' THEN
                0.36
                -- Elastic quantities
            WHEN i.name = 'Elastic'
                AND p.name LIKE '%Large%' THEN
                0.82
            WHEN i.name = 'Elastic'
                AND p.name LIKE '%Small%' THEN
                0.78
                -- Box or Bag (1 each)
            WHEN (i.name LIKE '%Box%'
                AND p.name LIKE '%Box%'
                AND ((i.name LIKE '%Left%'
                        AND p.name LIKE '%Left%')
                    OR (i.name LIKE '%Right%'
                        AND p.name LIKE '%Right%'))) THEN
                1
            WHEN i.name = 'Storage Bag'
                AND p.name LIKE '%Bag%' THEN
                1
                -- Instruction Leaflet and Flier (1 each)
            WHEN i.name IN ('Instruction Leaflet', 'Flier') THEN
                1
            ELSE
                0
            END
            -- Service components
        WHEN i.type = 'service' THEN
            CASE WHEN p.name LIKE '%Large%'
                AND i.name IN ('Assemble Large Splint', 'Pack Large Splint') THEN
                1
            WHEN p.name LIKE '%Small%'
                AND i.name IN ('Assemble Small Splint', 'Pack Small Splint') THEN
                1
            ELSE
                0
            END
        ELSE
            0
        END AS quantity
    FROM
        items p
        CROSS JOIN items i
    WHERE
        p.type = 'product'
        AND (
            -- Include both parts and services
(i.type = 'part'
                AND i.name IN ('Webbing', 'Elastic', 'Box Left Small', 'Box Right Small', 'Storage Bag', 'Instruction Leaflet', 'Flier'))
            OR (i.type = 'service'
                AND i.name IN ('Assemble Large Splint', 'Assemble Small Splint', 'Pack Large Splint', 'Pack Small Splint')))
        AND CASE WHEN i.name LIKE '%Box%' THEN
            p.name LIKE '%Box%'
        WHEN i.name = 'Storage Bag' THEN
            p.name LIKE '%Bag%'
        ELSE
            TRUE
        END)
INSERT INTO item_components(item_id, component_id, component_quantity)
SELECT
    product_id,
    component_id,
    quantity
FROM
    product_components
WHERE
    quantity > 0;

-- Insert orders with updated schema (including company_id)
INSERT INTO orders(order_type, order_date, carriage, company_id, from_company_id, to_company_id, from_billing_address_id, from_shipping_address_id, to_billing_address_id, to_shipping_address_id)
    VALUES
        -- Purchase orders: from MPD to Thetis
('purchase', '2023-01-15 10:00:00', 10.00, 2, 2, 1, 2, 2, 3, 1),
('purchase', '2023-02-20 14:30:00', 15.00, 2, 2, 1, 2, 2, 3, 1),
('purchase', '2023-03-25 09:45:00', 12.50, 2, 2, 1, 2, 2, 3, 1),
        -- Sale orders: from Thetis to various customers
('sale', '2023-04-10 14:30:00', 5.00, 1, 1, NULL, 3, 1, NULL, NULL),
('sale', '2023-04-15 09:45:00', 7.50, 1, 1, NULL, 3, 1, NULL, NULL),
('sale', '2023-04-20 11:15:00', 6.00, 1, 1, NULL, 3, 1, NULL, NULL),
        -- Shipment orders: from Thetis to MPD
('shipment', '2023-01-01 10:00:00', 20.00, 1, 1, 2, 3, 1, 2, 2),
('shipment', '2023-01-02 11:00:00', 25.00, 1, 1, 2, 3, 1, 2, 2);

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

INSERT INTO storage.buckets(id, name)
    VALUES ('amazon-reports', 'amazon-reports')
ON CONFLICT (id)
    DO NOTHING;

-- Insert contacts for both companies
INSERT INTO contacts(name, email, phone, company_id, is_default)
    VALUES ('Guy Stevenson', 'guy@thetismedical.com', '+44 7700 900077', 1, TRUE),
('Alan Smith', 'alan@mpd.com', '+44 7700 900088', 2, TRUE),
('Sarah Johnson', 'sarah@thetismedical.com', '+44 7700 900099', 1, FALSE),
('Mike Williams', 'mike@mpd.com', '+44 7700 900066', 2, FALSE);

