-- Seed file for thetis course database
-- This file runs after migrations during db reset
-- Create users first
INSERT INTO public.users(email, email_course_enabled)
VALUES
    ('guy@thetismedical.com', TRUE),
('testuser@example.com', TRUE),
('lester@thetismedical.com', TRUE)
ON CONFLICT (email)
    DO NOTHING;

-- Create enrollments (user_id linked via subquery)
INSERT INTO public.enrollments(user_id, shopify_customer_email, course_type, shopify_order_id, shopify_order_number, shopify_line_item_id, status, purchased_at)
SELECT
    u.id,
    'guy@thetismedical.com',
    'standard',
    'seed-order-001',
    '#SEED001',
    'seed-item-001',
    'active',
    NOW() - INTERVAL '7 days'
FROM
    public.users u
WHERE
    u.email = 'guy@thetismedical.com'
ON CONFLICT (shopify_order_id,
    shopify_line_item_id)
    DO NOTHING;

INSERT INTO public.enrollments(user_id, shopify_customer_email, course_type, shopify_order_id, shopify_order_number, shopify_line_item_id, status, purchased_at)
SELECT
    u.id,
    'testuser@example.com',
    'standard',
    '123456789',
    '#1001',
    '111111',
    'active',
    NOW()
FROM
    public.users u
WHERE
    u.email = 'testuser@example.com'
ON CONFLICT (shopify_order_id,
    shopify_line_item_id)
    DO NOTHING;

INSERT INTO public.enrollments(user_id, shopify_customer_email, course_type, shopify_order_id, shopify_order_number, shopify_line_item_id, status, purchased_at)
SELECT
    u.id,
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

