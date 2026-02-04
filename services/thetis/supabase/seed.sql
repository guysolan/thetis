-- Seed file for thetis course database
-- Runs after migrations during db reset. Uses purchases table (product-agnostic).
INSERT INTO public.users(email, email_course_enabled)
VALUES
    ('guy@thetismedical.com', TRUE),
    ('testuser@example.com', TRUE),
    ('lester@thetismedical.com', TRUE)
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.purchases(user_id, product_slug, shopify_customer_email, shopify_order_id, shopify_order_number, shopify_line_item_id, status, purchased_at)
SELECT u.id, 'standard_course', 'guy@thetismedical.com', 'seed-order-001', '#SEED001', 'seed-item-001', 'active', NOW() - INTERVAL '7 days'
FROM public.users u WHERE u.email = 'guy@thetismedical.com'
ON CONFLICT (shopify_order_id, shopify_line_item_id) DO NOTHING;

INSERT INTO public.purchases(user_id, product_slug, shopify_customer_email, shopify_order_id, shopify_order_number, shopify_line_item_id, status, purchased_at)
SELECT u.id, 'standard_course', 'testuser@example.com', '123456789', '#1001', '111111', 'active', NOW()
FROM public.users u WHERE u.email = 'testuser@example.com'
ON CONFLICT (shopify_order_id, shopify_line_item_id) DO NOTHING;

INSERT INTO public.purchases(user_id, product_slug, shopify_customer_email, shopify_order_id, shopify_order_number, shopify_line_item_id, status, purchased_at)
SELECT u.id, 'standard_course', 'lester@thetismedical.com', '999888777', '#1002', '222222', 'active', NOW()
FROM public.users u WHERE u.email = 'lester@thetismedical.com'
ON CONFLICT (shopify_order_id, shopify_line_item_id) DO NOTHING;

