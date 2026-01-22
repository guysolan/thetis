-- Restore anon policies for users table (idempotent)
-- This allows anonymous users to subscribe via email without Supabase auth
-- These policies enable email-based authentication for the course platform
-- This migration is idempotent and can be run multiple times safely
-- Anon can insert users (for email subscriptions)
-- This policy allows anonymous users to create accounts via email subscription forms
DROP POLICY IF EXISTS "Anon can insert users" ON public.users;

CREATE POLICY "Anon can insert users" ON public.users AS PERMISSIVE
    FOR INSERT TO anon
        WITH CHECK (TRUE);

-- Allow all inserts from anonymous users (client-side validation)
-- Anon can update users by email (for updating subscription preferences)
DROP POLICY IF EXISTS "Anon can update users by email" ON public.users;

CREATE POLICY "Anon can update users by email" ON public.users AS PERMISSIVE
    FOR UPDATE TO anon
        USING (TRUE) -- Client-side filtering by email
        WITH CHECK (TRUE);

-- Anon can view users by email (for checking if user exists)
DROP POLICY IF EXISTS "Anon can view users by email" ON public.users;

CREATE POLICY "Anon can view users by email" ON public.users AS PERMISSIVE
    FOR SELECT TO anon
        USING (TRUE);

-- Client-side filtering by email
