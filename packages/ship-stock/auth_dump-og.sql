SET session_replication_role = REPLICA;

--
-- PostgreSQL database dump
--
-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.8
SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = ON;

SELECT
    pg_catalog.set_config('search_path', '', FALSE);

SET check_function_bodies = FALSE;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = OFF;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO "auth"."audit_log_entries"("instance_id", "id", "payload", "created_at", "ip_address")
    VALUES ('00000000-0000-0000-0000-000000000000', 'aadd8afd-3adf-4b38-b69c-5b28a858fa87', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"guy@gmail.com","user_id":"33bebcdf-b29e-47b5-9c37-641e6cbbe4a9","user_phone":""}}', '2025-03-14 18:58:08.044762+00', ''),
('00000000-0000-0000-0000-000000000000', 'f7f56905-4c5d-460f-b57b-484c0c883774', '{"action":"login","actor_id":"33bebcdf-b29e-47b5-9c37-641e6cbbe4a9","actor_username":"guy@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-14 18:58:21.828666+00', '');

--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO "auth"."users"("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous")
    VALUES ('00000000-0000-0000-0000-000000000000', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'authenticated', 'authenticated', 'guy@gmail.com', '$2a$10$xOKlwI180wfilIbcXtUQ.upAgfmwvB5uYyHTcJPTzRiithwIm4Wai', '2025-03-14 18:58:08.048878+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-14 18:58:21.829352+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-03-14 18:58:08.034684+00', '2025-03-14 18:58:21.834628+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, FALSE, NULL, FALSE);

--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO "auth"."identities"("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id")
    VALUES ('33bebcdf-b29e-47b5-9c37-641e6cbbe4a9', '33bebcdf-b29e-47b5-9c37-641e6cbbe4a9', '{"sub": "33bebcdf-b29e-47b5-9c37-641e6cbbe4a9", "email": "guy@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-03-14 18:58:08.043407+00', '2025-03-14 18:58:08.043446+00', '2025-03-14 18:58:08.043446+00', 'fcd6cb6e-490e-4221-afa2-80b7e7821863');

--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO "auth"."sessions"("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag")
    VALUES ('8d1448c9-6ddb-452f-ab1d-96540978b7bd', '33bebcdf-b29e-47b5-9c37-641e6cbbe4a9', '2025-03-14 18:58:21.829431+00', '2025-03-14 18:58:21.829431+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '192.168.65.1', NULL);

--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO "auth"."mfa_amr_claims"("session_id", "created_at", "updated_at", "authentication_method", "id")
    VALUES ('8d1448c9-6ddb-452f-ab1d-96540978b7bd', '2025-03-14 18:58:21.835586+00', '2025-03-14 18:58:21.835586+00', 'password', 'b61bb290-571b-40eb-82b6-6bad4d4b2502');

--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
INSERT INTO "auth"."refresh_tokens"("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id")
    VALUES ('00000000-0000-0000-0000-000000000000', 1, 'oDHxDqhTs2JkCdrrKe0i9g', '33bebcdf-b29e-47b5-9c37-641e6cbbe4a9', FALSE, '2025-03-14 18:58:21.830845+00', '2025-03-14 18:58:21.830845+00', NULL, '8d1448c9-6ddb-452f-ab1d-96540978b7bd');

--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--
--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--
--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."users"("id", "uuid", "created_at", "updated_at") OVERRIDING SYSTEM VALUE
    VALUES (1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2025-03-14 18:57:12.490616+00', '2025-03-14 18:57:12.490616+00'),
(2, '33bebcdf-b29e-47b5-9c37-641e6cbbe4a9', '2025-03-14 18:58:08.033329+00', '2025-03-14 18:58:08.033329+00');

--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."companies"("id", "created_at", "name", "company_number", "tax_number", "user_id")
    VALUES (1, '2025-03-14 18:57:12.490616+00', 'Thetis Medical Ltd', '12345678', 'GB123456789', 1),
(2, '2025-03-14 18:57:12.490616+00', 'MPD Limited', '87654321', 'GB987654321', 1);

--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."addresses"("id", "created_at", "name", "line_1", "line_2", "city", "region", "code", "country", "is_active", "holds_stock", "company_id", "is_default_shipping", "is_default_billing")
    VALUES (1, '2025-03-14 18:57:12.490616+00', 'Park House', 'Stilemans', 'Hascombe Road', 'Godalming', NULL, 'GU8 4AB', 'United Kingdom', TRUE, TRUE, 1, TRUE, FALSE),
(2, '2025-03-14 18:57:12.490616+00', 'MPD', 'Unit 4', 'Commerce Business Centre, Commerce Close', 'Westbury', NULL, 'BA13 4LS', 'United Kingdom', TRUE, TRUE, 2, TRUE, TRUE),
(3, '2025-03-14 18:57:12.490616+00', 'Thetis Medical', '15 Leopold Street', NULL, 'Birmingham', NULL, 'B12 0UJ', 'United Kingdom', TRUE, FALSE, 1, FALSE, TRUE);

--
-- Data for Name: amazon_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: company_users; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."company_users"("company_id", "user_id", "is_admin")
    VALUES (1, 1, TRUE);

--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."contacts"("id", "created_at", "name", "email", "phone", "company_id", "is_default")
    VALUES (1, '2025-03-14 18:57:12.490616+00', 'Guy Stevenson', 'guy@thetismedical.com', '+44 7700 900077', 1, TRUE),
(2, '2025-03-14 18:57:12.490616+00', 'Alan Smith', 'alan@mpd.com', '+44 7700 900088', 2, TRUE),
(3, '2025-03-14 18:57:12.490616+00', 'Sarah Johnson', 'sarah@thetismedical.com', '+44 7700 900099', 1, FALSE),
(4, '2025-03-14 18:57:12.490616+00', 'Mike Williams', 'mike@mpd.com', '+44 7700 900066', 2, FALSE);

--
-- Data for Name: default_company; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."default_company"("user_id", "company_id")
    VALUES (1, 1);

--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."items"("id", "name", "price", "type", "hs_code", "sku", "country_of_origin", "height", "width", "depth", "weight", "company_id")
    VALUES (1, 'Assemble Large Splint', 8.50, 'service', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(2, 'Assemble Small Splint', 7.50, 'service', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(3, 'Pack Large Splint', 3.08, 'service', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(4, 'Pack Small Splint', 2.58, 'service', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(5, 'Instruction Leaflet', 0.20, 'part', NULL, 'TM-PART-001', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(6, 'Storage Bag', 1.11, 'part', NULL, 'TM-PART-002', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(7, 'Webbing', 0.40, 'part', NULL, 'TM-PART-003', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(8, 'Box Left Small', 1.5, 'part', NULL, 'TM-PART-004', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(9, 'Box Right Small', 1.5, 'part', NULL, 'TM-PART-005', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(10, 'Flier', 0.2, 'part', NULL, 'TM-PART-006', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(11, 'Elastic', 0.72, 'part', NULL, 'TM-PART-007', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(12, 'Achilles Tendon Rupture Night Splint in Bag - Large Left', 89.99, 'product', 902110, 'TM-ATRNS-LL', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(13, 'Achilles Tendon Rupture Night Splint in Bag - Large Right', 89.99, 'product', 902110, 'TM-ATRNS-LR', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(14, 'Achilles Tendon Rupture Night Splint in Box - Small Left', 79.99, 'product', 902110, 'TM-ATRNS-SL', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(15, 'Achilles Tendon Rupture Night Splint in Box - Small Right', 79.99, 'product', 902110, 'TM-ATRNS-SR', 'United Kingdom', NULL, NULL, NULL, NULL, 1),
(16, 'Box of 50 Achilles Tendon Rupture Night Splints - Large Left', 4499.50, 'package', NULL, 'TM-ATRNS-LL-50', 'United Kingdom', 60.00, 40.00, 35.00, 10.00, 1),
(17, 'Box of 50 Achilles Tendon Rupture Night Splints - Large Right', 4499.50, 'package', NULL, 'TM-ATRNS-LR-50', 'United Kingdom', 60.00, 40.00, 35.00, 10.00, 1),
(18, 'Box of 25 Achilles Tendon Rupture Night Splints - Small Left', 1999.75, 'package', NULL, 'TM-ATRNS-SL-25', 'United Kingdom', 60.00, 40.00, 35.00, 5.00, 1),
(19, 'Box of 25 Achilles Tendon Rupture Night Splints - Small Right', 1999.75, 'package', NULL, 'TM-ATRNS-SR-25', 'United Kingdom', 60.00, 40.00, 35.00, 5.00, 1);

--
-- Data for Name: item_changes; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."item_changes"("id", "item_id", "quantity_change", "address_id", "shipment_dates")
    VALUES (1, 5, 500.00, 1, 'empty'),
(2, 6, 100.00, 1, 'empty'),
(3, 7, 200.00, 1, 'empty'),
(4, 11, 300.00, 1, 'empty'),
(5, 12, -10.00, 1, 'empty'),
(6, 13, -8.00, 1, 'empty'),
(7, 5, 5000.00, 1, 'empty'),
(8, 6, 2400.00, 1, 'empty'),
(9, 12, 50.00, 2, 'empty'),
(10, 13, 50.00, 2, 'empty');

--
-- Data for Name: item_components; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."item_components"("component_id", "component_quantity", "item_id")
    VALUES (1, 1.0000, 12),
(1, 1.0000, 13),
(2, 1.0000, 14),
(2, 1.0000, 15),
(3, 1.0000, 12),
(3, 1.0000, 13),
(4, 1.0000, 14),
(4, 1.0000, 15),
(5, 1.0000, 12),
(5, 1.0000, 13),
(5, 1.0000, 14),
(5, 1.0000, 15),
(6, 1.0000, 12),
(6, 1.0000, 13),
(7, 0.4000, 12),
(7, 0.4000, 13),
(7, 0.3600, 14),
(7, 0.3600, 15),
(8, 1.0000, 14),
(9, 1.0000, 15),
(10, 1.0000, 12),
(10, 1.0000, 13),
(10, 1.0000, 14),
(10, 1.0000, 15),
(11, 0.8200, 12),
(11, 0.8200, 13),
(11, 0.7800, 14),
(11, 0.7800, 15);

--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."orders"("id", "order_type", "order_date", "carriage", "from_company_id", "to_company_id", "from_billing_address_id", "from_shipping_address_id", "to_billing_address_id", "to_shipping_address_id", "from_contact_id", "to_contact_id", "currency", "company_id", "reason_for_export", "mode_of_transport", "incoterms", "unit_of_measurement", "shipment_number", "airwaybill")
    VALUES (1, 'purchase', '2023-01-15 10:00:00+00', 10.00, 2, 1, 2, 2, 3, 1, NULL, NULL, 'GBP', 2, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'purchase', '2023-02-20 14:30:00+00', 15.00, 2, 1, 2, 2, 3, 1, NULL, NULL, 'GBP', 2, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'purchase', '2023-03-25 09:45:00+00', 12.50, 2, 1, 2, 2, 3, 1, NULL, NULL, 'GBP', 2, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'sale', '2023-04-10 14:30:00+00', 5.00, 1, NULL, 3, 1, NULL, NULL, NULL, NULL, 'GBP', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'sale', '2023-04-15 09:45:00+00', 7.50, 1, NULL, 3, 1, NULL, NULL, NULL, NULL, 'GBP', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'sale', '2023-04-20 11:15:00+00', 6.00, 1, NULL, 3, 1, NULL, NULL, NULL, NULL, 'GBP', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'shipment', '2023-01-01 10:00:00+00', 20.00, 1, 2, 3, 1, 2, 2, NULL, NULL, 'GBP', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'shipment', '2023-01-02 11:00:00+00', 25.00, 1, 2, 3, 1, 2, 2, NULL, NULL, 'GBP', 1, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Data for Name: order_item_changes; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO "public"."order_item_changes"("order_id", "item_change_id", "price", "tax")
    VALUES (1, 3, 80.00, 0.20),
(1, 4, 216.00, 0.20),
(2, 2, 111.00, 0.20),
(3, 1, 100.00, 0.20),
(4, 5, 899.90, 0.20),
(6, 6, 719.92, 0.20),
(7, 1, NULL, NULL),
(7, 2, NULL, NULL),
(7, 7, NULL, NULL),
(7, 8, NULL, NULL),
(8, 9, NULL, NULL),
(8, 10, NULL, NULL);

--
-- Data for Name: text_blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: orders_text_blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--
--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--
INSERT INTO "storage"."buckets"("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id")
    VALUES ('amazon-reports', 'amazon-reports', NULL, '2025-03-14 18:57:12.490616+00', '2025-03-14 18:57:12.490616+00', FALSE, FALSE, NULL, NULL, NULL);

--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--
--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--
--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--
--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--
--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--
--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--
SELECT
    pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, TRUE);

--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--
SELECT
    pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, FALSE);

--
-- Name: amazon_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
    pg_catalog.setval('"public"."amazon_reports_id_seq"', 1, FALSE);

--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
    pg_catalog.setval('"public"."companies_id_seq"', 1, FALSE);

--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
    pg_catalog.setval('"public"."contacts_id_seq"', 4, TRUE);

--
-- Name: item_changes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
    pg_catalog.setval('"public"."item_changes_id_seq"', 10, TRUE);

--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
    pg_catalog.setval('"public"."items_id_seq"', 19, TRUE);

--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
    pg_catalog.setval('"public"."orders_id_seq"', 8, TRUE);

--
-- Name: text_blocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
    pg_catalog.setval('"public"."text_blocks_id_seq"', 1, FALSE);

--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
    pg_catalog.setval('"public"."users_id_seq"', 2, TRUE);

--
-- Name: warehouses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
    pg_catalog.setval('"public"."warehouses_id_seq"', 1, FALSE);

--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--
SELECT
    pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, FALSE);

--
-- PostgreSQL database dump complete
--
RESET ALL;

