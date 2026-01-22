-- ============================================================================
-- THETIS COURSE PLATFORM SCHEMA
-- ============================================================================
-- Email-based auth: anon users identified by email in localStorage
-- Knock handles email sequences
-- ============================================================================

-- ============================================================================
-- USERS TABLE
-- ============================================================================
-- Stores subscribers and course users (identified by email)

CREATE TABLE public.users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL,
    phone text,
    rupture_date date,
    email_course_enabled boolean DEFAULT TRUE,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    CONSTRAINT users_email_unique UNIQUE (email)
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Anon policies (client filters by email)
CREATE POLICY "Anon can view users" ON public.users
    FOR SELECT TO anon USING (TRUE);

CREATE POLICY "Anon can insert users" ON public.users
    FOR INSERT TO anon WITH CHECK (TRUE);

CREATE POLICY "Anon can update users" ON public.users
    FOR UPDATE TO anon USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Service role full access" ON public.users
    FOR ALL USING (auth.role() = 'service_role');

CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_phone ON public.users(phone) WHERE phone IS NOT NULL;

-- ============================================================================
-- ENROLLMENTS TABLE
-- ============================================================================
-- Links users to courses they've purchased via Shopify

CREATE TABLE public.enrollments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    course_type text NOT NULL CHECK (course_type IN ('standard', 'premium', 'essentials', 'professionals')),
    
    -- Shopify fields
    shopify_order_id text,
    shopify_order_number text,
    shopify_customer_email text NOT NULL,
    shopify_line_item_id text,
    
    -- Status and timestamps
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'refunded', 'expired')),
    purchased_at timestamptz DEFAULT NOW(),
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    
    UNIQUE(shopify_order_id, shopify_line_item_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can view enrollments" ON public.enrollments
    FOR SELECT TO anon USING (TRUE);

CREATE POLICY "Service role full access" ON public.enrollments
    FOR ALL USING (auth.role() = 'service_role');

CREATE INDEX idx_enrollments_shopify_order ON public.enrollments(shopify_order_id);
CREATE INDEX idx_enrollments_shopify_email ON public.enrollments(shopify_customer_email);
CREATE INDEX idx_enrollments_course_type ON public.enrollments(course_type, status);
CREATE INDEX idx_enrollments_user_id ON public.enrollments(user_id);

-- ============================================================================
-- USER PROGRESS TABLE
-- ============================================================================
-- Tracks which sections users have viewed/completed

CREATE TABLE public.user_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    user_email text NOT NULL,
    section_slug text NOT NULL,
    completed_at timestamptz,
    last_accessed_at timestamptz DEFAULT NOW(),
    created_at timestamptz DEFAULT NOW(),
    UNIQUE (user_email, section_slug)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can view progress" ON public.user_progress
    FOR SELECT TO anon USING (TRUE);

CREATE POLICY "Anon can insert progress" ON public.user_progress
    FOR INSERT TO anon WITH CHECK (TRUE);

CREATE POLICY "Anon can update progress" ON public.user_progress
    FOR UPDATE TO anon USING (TRUE);

CREATE POLICY "Service role full access" ON public.user_progress
    FOR ALL USING (auth.role() = 'service_role');

CREATE INDEX idx_user_progress_email ON public.user_progress(user_email);
CREATE INDEX idx_user_progress_section ON public.user_progress(user_email, section_slug);

-- ============================================================================
-- WEBHOOK EVENTS TABLE
-- ============================================================================
-- For idempotency - prevents processing same webhook twice

CREATE TABLE public.webhook_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id text UNIQUE NOT NULL,
    event_type text NOT NULL,
    source text NOT NULL CHECK (source IN ('shopify', 'stripe', 'knock')),
    processed boolean DEFAULT FALSE,
    payload jsonb NOT NULL,
    error_message text,
    created_at timestamptz DEFAULT NOW(),
    processed_at timestamptz
);

ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON public.webhook_events
    FOR ALL USING (auth.role() = 'service_role');

CREATE INDEX idx_webhook_events_event_id ON public.webhook_events(event_id);
CREATE INDEX idx_webhook_events_source ON public.webhook_events(source, event_type);
CREATE INDEX idx_webhook_events_processed ON public.webhook_events(processed, created_at);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Ensure a user exists (for webhooks) - bypasses RLS
CREATE OR REPLACE FUNCTION public.ensure_user(p_email text, p_email_course_enabled boolean DEFAULT TRUE)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id uuid;
BEGIN
    p_email := LOWER(TRIM(p_email));
    
    IF p_email IS NULL OR p_email = '' THEN
        RAISE EXCEPTION 'Email cannot be empty';
    END IF;
    
    SELECT id INTO v_user_id FROM public.users WHERE email = p_email LIMIT 1;
    
    IF v_user_id IS NOT NULL THEN
        RETURN v_user_id;
    END IF;
    
    INSERT INTO public.users(id, email, email_course_enabled)
    VALUES (gen_random_uuid(), p_email, p_email_course_enabled)
    RETURNING id INTO v_user_id;
    
    RETURN v_user_id;
EXCEPTION
    WHEN unique_violation THEN
        SELECT id INTO v_user_id FROM public.users WHERE email = p_email LIMIT 1;
        RETURN v_user_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.ensure_user(text, boolean) TO service_role;
GRANT EXECUTE ON FUNCTION public.ensure_user(text, boolean) TO anon;

-- Link enrollments to user when user is created
CREATE OR REPLACE FUNCTION public.link_enrollments_to_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.enrollments
    SET user_id = NEW.id, updated_at = NOW()
    WHERE shopify_customer_email = LOWER(NEW.email) AND user_id IS NULL;
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_user_created_link_enrollments
    AFTER INSERT ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.link_enrollments_to_user();
