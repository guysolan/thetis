-- Seed file for thetis course database
-- This file runs after migrations during db reset
-- Seed data for local development

-- Create users first
INSERT INTO public.users(email, email_course_enabled)
    VALUES ('guy@thetismedical.com', true)
ON CONFLICT (email)
    DO NOTHING;

INSERT INTO public.users(email, email_course_enabled)
    VALUES ('testuser@example.com', true)
ON CONFLICT (email)
    DO NOTHING;

-- Create enrollment for guy@thetismedical.com
INSERT INTO public.enrollments(user_email, shopify_customer_email, course_type, shopify_order_id, shopify_order_number, shopify_line_item_id, status, purchased_at)
    VALUES ('guy@thetismedical.com', 'guy@thetismedical.com', 'standard', 'seed-order-001', '#SEED001', 'seed-item-001', 'active', NOW() - INTERVAL '7 days')
ON CONFLICT (shopify_order_id, shopify_line_item_id)
    DO NOTHING;

-- Create test enrollment for testing flow
INSERT INTO public.enrollments(user_email, shopify_customer_email, course_type, shopify_order_id, shopify_order_number, shopify_line_item_id, status, purchased_at)
    VALUES ('testuser@example.com', 'testuser@example.com', 'standard', '123456789', '#1001', '111111', 'active', NOW())
ON CONFLICT (shopify_order_id, shopify_line_item_id)
    DO NOTHING;
