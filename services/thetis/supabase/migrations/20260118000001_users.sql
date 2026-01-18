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

