-- Create initial user in auth.users
-- INSERT INTO auth.users(id, email, encrypted_password, email_confirmed_at, confirmed_at, created_at, updated_at, raw_user_meta_data)
--     VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'guy@thetismedical.com', crypt('Newspaper202!', gen_salt('bf')), now(), now(), now(), now(), '{}'::jsonb);
-- Create initial user in auth.users
INSERT INTO "auth"."users"("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous")
    VALUES ('00000000-0000-0000-0000-000000000000', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'authenticated', 'authenticated', 'guy@thetismedical.com', '$2a$10$xOKlwI180wfilIbcXtUQ.upAgfmwvB5uYyHTcJPTzRiithwIm4Wai', '2025-03-14 18:58:08.048878+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-14 18:58:21.829352+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-03-14 18:58:08.034684+00', '2025-03-14 18:58:21.834628+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, FALSE, NULL, FALSE);

-- Insert companies first
INSERT INTO companies(id, name, company_number, tax_number, user_id)
    VALUES (1, 'Company', '12345678', 'GB123456789', 1),
(2, 'Manufacturer', '87654321', 'GB987654321', 1),
(3, 'Customer', '312423', 'GB92243234', 1),
(4, 'Supplier', '98765432', 'GB9876543210', 1);

-- Then insert addresses with company_id references
INSERT INTO addresses(id, name, line_1, line_2, city, region, country, code, holds_stock, company_id, is_default_shipping, is_default_billing)
    VALUES (1, 'Park House', 'Stilemans', 'Hascombe Road', 'Godalming', NULL, 'United Kingdom', 'GU8 4AB', TRUE, 1, TRUE, FALSE),
(2, 'MPD', 'Unit 4', 'Commerce Business Centre, Commerce Close', 'Westbury', NULL, 'United Kingdom', 'BA13 4LS', TRUE, 2, TRUE, TRUE),
(3, 'Thetis Medical', '15 Leopold Street', NULL, 'Birmingham', NULL, 'United Kingdom', 'B12 0UJ', FALSE, 1, FALSE, TRUE),
(4, 'MedSupply Warehouse', '123 Component Road', NULL, 'Manchester', 'Greater Manchester', 'United Kingdom', 'M1 2XY', TRUE, 4, TRUE, TRUE);

-- Link user to company
INSERT INTO company_users(company_id, user_id, is_admin)
SELECT
    1, -- Company
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
    1 -- Company
FROM
    users u
WHERE
    u.uuid = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

-- Insert service items first
INSERT INTO items(id, name, price, type, company_id)
    VALUES (3, 'Assemble Large Splint', 8.50, 'service', 1),
(4, 'Pack Small Splint', 2.58, 'service', 1);

-- Insert items (parts) with company_id
INSERT INTO items(id, name, price, type, sku, country_of_origin, company_id)
    VALUES (5, 'Instruction Leaflet', 0.20, 'part', 'TM-PART-001', 'United Kingdom', 1),
(6, 'Storage Bag', 1.11, 'part', 'TM-PART-002', 'United Kingdom', 1),
(7, 'Webbing', 0.40, 'part', 'TM-PART-003', 'United Kingdom', 1),
(8, 'Flier', 0.2, 'part', 'TM-PART-006', 'United Kingdom', 1),
(9, 'Elastic', 0.72, 'part', 'TM-PART-007', 'United Kingdom', 1);

-- Insert items (products) with company_id
INSERT INTO items(id, name, price, type, hs_code, sku, country_of_origin, company_id)
    VALUES (1, 'Achilles Tendon Rupture Night Splint - Large', 89.99, 'product', 902110, 'TM-ATRS-LL', 'United Kingdom', 1),
(2, 'Achilles Tendon Rupture Night Splint - Small', 79.99, 'product', 902110, 'TM-ATRS-SL', 'United Kingdom', 1);

-- Insert items (packages) with company_id
INSERT INTO items(id, name, price, type, height, width, depth, weight, sku, country_of_origin, company_id)
    VALUES (10, 'Box of 50 Large Splints', 4499.50, 'package', 60.00, 40.00, 35.00, 10.00, 'TM-ATRS-L-50', 'United Kingdom', 1),
(11, 'Box of 50 Small Splints', 4499.50, 'package', 60.00, 40.00, 35.00, 10.00, 'TM-ATRS-S-50', 'United Kingdom', 1);

-- Add splint components
INSERT INTO item_components(item_id, component_id, component_quantity)
    VALUES (1, 3, 1),
(1, 4, 1),
(1, 5, 1),
(1, 6, 1),
(1, 7, 1),
(1, 8, 1),
(1, 9, 1),
(2, 3, 1),
(2, 4, 1),
(2, 5, 1),
(2, 6, 1),
(2, 7, 1),
(2, 8, 1),
(2, 9, 1);

-- Add package components
INSERT INTO item_components(item_id, component_id, component_quantity)
    VALUES (10, 1, 50),
(11, 2, 50);

-- Insert contacts for both companies
INSERT INTO contacts(name, email, phone, company_id, is_default)
    VALUES ('Guy Stevenson', 'guy@thetismedical.com', '+44 7700 900077', 1, TRUE),
('Alan Smith', 'alan@mpd.com', '+44 7700 900088', 2, TRUE),
('Sarah Johnson', 'sarah@thetismedical.com', '+44 7700 900099', 1, FALSE),
('Mike Williams', 'mike@mpd.com', '+44 7700 900066', 2, FALSE),
('Alex Thompson', 'alex@medsupply.com', '+44 7700 900555', 4, TRUE);

