-- ============================================================================
-- PURCHASES TABLE (product-agnostic; replaces enrollments for new code)
-- ============================================================================
-- One row per purchased product we track (courses, splint, future products).
-- Course app and Knock post-purchase read from this table.
CREATE TABLE public.purchases(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
    product_slug text NOT NULL,
    shopify_order_id text,
    shopify_order_number text,
    shopify_customer_email text NOT NULL,
    shopify_line_item_id text,
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'refunded', 'expired')),
    purchased_at timestamptz DEFAULT NOW(),
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    UNIQUE (shopify_order_id, shopify_line_item_id)
);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can view purchases" ON public.purchases
    FOR SELECT TO anon
    USING (TRUE);

CREATE POLICY "Service role full access" ON public.purchases
    FOR ALL
    USING (auth.role() = 'service_role');

CREATE INDEX idx_purchases_shopify_order ON public.purchases(shopify_order_id);
CREATE INDEX idx_purchases_shopify_email ON public.purchases(shopify_customer_email);
CREATE INDEX idx_purchases_product_slug ON public.purchases(product_slug, status);
CREATE INDEX idx_purchases_user_id ON public.purchases(user_id);

-- Migrate existing enrollments to purchases (course_type -> product_slug)
INSERT INTO public.purchases(user_id, product_slug, shopify_order_id, shopify_order_number, shopify_customer_email, shopify_line_item_id, status, purchased_at, created_at, updated_at)
SELECT
    user_id,
    CASE course_type
        WHEN 'standard' THEN 'standard_course'
        WHEN 'premium' THEN 'premium_course'
        WHEN 'essentials' THEN 'standard_course'
        WHEN 'professionals' THEN 'premium_course'
        ELSE 'standard_course'
    END,
    shopify_order_id,
    shopify_order_number,
    shopify_customer_email,
    shopify_line_item_id,
    status,
    purchased_at,
    created_at,
    updated_at
FROM public.enrollments
ON CONFLICT (shopify_order_id, shopify_line_item_id) DO NOTHING;

-- Link purchases to user when user is created (same as enrollments)
CREATE OR REPLACE FUNCTION public.link_purchases_to_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
BEGIN
    UPDATE public.purchases
    SET user_id = NEW.id, updated_at = NOW()
    WHERE shopify_customer_email = LOWER(NEW.email) AND user_id IS NULL;
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_user_created_link_purchases
    AFTER INSERT ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.link_purchases_to_user();
