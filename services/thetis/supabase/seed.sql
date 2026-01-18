-- Seed file for thetis course database
-- This file runs after migrations during db reset
-- Seed data for local development
-- Create users first
INSERT INTO public.users(email, email_course_enabled)
    VALUES ('guy@thetismedical.com', TRUE)
ON CONFLICT (email)
    DO NOTHING;

INSERT INTO public.users(email, email_course_enabled)
    VALUES ('testuser@example.com', TRUE)
ON CONFLICT (email)
    DO NOTHING;

INSERT INTO public.users(email, email_course_enabled)
    VALUES ('lester@thetismedical.com', TRUE)
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

-- Create enrollment for lester@thetismedical.com
-- Note: user_id will be linked automatically via ensure_user function or can be set manually
INSERT INTO public.enrollments(user_id, user_email, shopify_customer_email, course_type, shopify_order_id, shopify_order_number, shopify_line_item_id, status, purchased_at)
SELECT
    u.id,
    'lester@thetismedical.com',
    'lester@thetismedical.com',
    'standard',
    '999888777',
    '#1002',
    '222222',
    'active',
    NOW()
FROM
    public.users u
WHERE
    u.email = 'lester@thetismedical.com'
ON CONFLICT (shopify_order_id,
    shopify_line_item_id)
    DO NOTHING;

