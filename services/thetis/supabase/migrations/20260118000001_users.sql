-- Users table (standalone, no auth.users dependency)
-- Stores course-specific user data like rupture date
-- Email is the primary identifier (from localStorage-based auth)
CREATE TABLE public.users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL,
    phone text,
    rupture_date date,
    email_course_enabled boolean DEFAULT TRUE,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    CONSTRAINT users_email_unique UNIQUE (email)
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow anon access (filtered client-side by email)
-- These policies enable email-based authentication for the course platform
CREATE POLICY "Anon can view users by email" ON public.users AS PERMISSIVE
    FOR SELECT TO anon
        USING (TRUE);

-- Client-side filtering by email
CREATE POLICY "Anon can update users by email" ON public.users AS PERMISSIVE
    FOR UPDATE TO anon
        USING (TRUE) -- Client-side filtering by email
        WITH CHECK (TRUE);

CREATE POLICY "Anon can insert users" ON public.users AS PERMISSIVE
    FOR INSERT TO anon
        WITH CHECK (TRUE);

-- Allow all inserts from anonymous users (client-side validation)
-- Service role can do everything (for webhooks)
CREATE POLICY "Service role full access" ON public.users
    FOR ALL
        USING (auth.role() = 'service_role');

-- Indexes for lookups
CREATE INDEX idx_users_email ON public.users(email);

CREATE INDEX idx_users_phone ON public.users(phone)
WHERE
    phone IS NOT NULL;

-- Function to ensure a user exists (for webhooks)
-- This function bypasses RLS using SECURITY DEFINER and handles user creation safely
CREATE OR REPLACE FUNCTION public.ensure_user(p_email text, p_email_course_enabled boolean DEFAULT TRUE)
    RETURNS uuid
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
DECLARE
    v_user_id uuid;
BEGIN
    -- Normalize email to lowercase
    p_email := LOWER(TRIM(p_email));
    -- Validate email is not empty
    IF p_email IS NULL OR p_email = '' THEN
        RAISE EXCEPTION 'Email cannot be empty';
    END IF;
    -- Check if user already exists
    SELECT
        id INTO v_user_id
    FROM
        public.users
    WHERE
        email = p_email
    LIMIT 1;
    -- If user exists, return the id
    IF v_user_id IS NOT NULL THEN
        RETURN v_user_id;
    END IF;
    -- Generate UUID explicitly to ensure it's set
    v_user_id := gen_random_uuid();
    -- Create new user with explicit ID
    INSERT INTO public.users(id, email, email_course_enabled)
        VALUES (v_user_id, p_email, p_email_course_enabled)
    RETURNING
        id INTO v_user_id;
    RETURN v_user_id;
EXCEPTION
    WHEN unique_violation THEN
        -- Race condition: user was created by another request
        -- Fetch and return the existing user id
        SELECT
            id INTO v_user_id
        FROM
            public.users
        WHERE
            email = p_email
        LIMIT 1;
        RETURN v_user_id;
    WHEN OTHERS THEN
        -- Log the error and re-raise
        RAISE EXCEPTION 'Error creating user: %', SQLERRM;
END;

$$;

-- Grant execute permission to service role and anon
GRANT EXECUTE ON FUNCTION public.ensure_user(text, boolean) TO service_role;

GRANT EXECUTE ON FUNCTION public.ensure_user(text, boolean) TO anon;

-- Functions and triggers to ensure id always auto-generates
-- This prevents issues with upsert operations that might try to set id to null
CREATE OR REPLACE FUNCTION public.ensure_users_id()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- If id is null or not provided, generate a new UUID
    IF NEW.id IS NULL THEN
        NEW.id := gen_random_uuid();
    END IF;
    RETURN NEW;
END;
$$;

-- Trigger to ensure id is generated on INSERT
CREATE TRIGGER ensure_users_id_trigger
    BEFORE INSERT ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.ensure_users_id();

-- Function to prevent id from being updated
CREATE OR REPLACE FUNCTION public.prevent_users_id_update()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Prevent id from being changed on UPDATE
    IF OLD.id IS DISTINCT FROM NEW.id THEN
        NEW.id := OLD.id;
    END IF;
    RETURN NEW;
END;
$$;

-- Trigger to prevent id from being updated
CREATE TRIGGER prevent_users_id_update_trigger
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_users_id_update();

