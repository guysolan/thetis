-- Users table (standalone, no auth.users dependency)
-- Stores course-specific user data like rupture date
-- Email is the primary identifier (from localStorage-based auth)
CREATE TABLE public.users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    rupture_date date,
    email_course_enabled boolean DEFAULT TRUE,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow anon access (filtered client-side by email)
CREATE POLICY "Anon can view users by email" ON public.users
    FOR SELECT
        USING (TRUE);

-- Client-side filtering
CREATE POLICY "Anon can update users by email" ON public.users
    FOR UPDATE
        USING (TRUE);

-- Client-side filtering
CREATE POLICY "Anon can insert users" ON public.users
    FOR INSERT
        WITH CHECK (TRUE);

-- Service role can do everything (for webhooks)
CREATE POLICY "Service role full access" ON public.users
    FOR ALL
        USING (auth.role() = 'service_role');

-- Index for email lookups
CREATE INDEX idx_users_email ON public.users(email);

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

