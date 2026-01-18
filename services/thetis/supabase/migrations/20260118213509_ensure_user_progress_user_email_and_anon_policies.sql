-- Ensure user_email column exists in user_progress (for email-based auth)
-- The remote commit may have changed this, so we ensure it exists
DO $$
BEGIN
    -- Add user_email column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
            AND table_name = 'user_progress'
            AND column_name = 'user_email'
    ) THEN
        ALTER TABLE public.user_progress
        ADD COLUMN user_email text;
        
        RAISE NOTICE 'Added user_email column to user_progress table';
    END IF;
    
    -- Make user_id nullable (for email-based auth users who don't have user_id)
    -- Check if user_id is NOT NULL and make it nullable
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
            AND table_name = 'user_progress'
            AND column_name = 'user_id'
            AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE public.user_progress
        ALTER COLUMN user_id DROP NOT NULL;
        
        RAISE NOTICE 'Made user_id nullable in user_progress table';
    END IF;
END $$;

-- Re-add anon policies (were dropped in remote_commit)
-- These allow email-based auth to work without Supabase auth
DROP POLICY IF EXISTS "Anon can view progress by email" ON public.user_progress;
CREATE POLICY "Anon can view progress by email" ON public.user_progress
    FOR SELECT
    TO anon
    USING (TRUE); -- Client-side filtering by user_email

DROP POLICY IF EXISTS "Anon can insert progress by email" ON public.user_progress;
CREATE POLICY "Anon can insert progress by email" ON public.user_progress
    FOR INSERT
    TO anon
    WITH CHECK (TRUE); -- Client-side validation

DROP POLICY IF EXISTS "Anon can update progress by email" ON public.user_progress;
CREATE POLICY "Anon can update progress by email" ON public.user_progress
    FOR UPDATE
    TO anon
    USING (TRUE); -- Client-side validation

-- Ensure unique constraint on user_email + section_slug exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'user_progress_user_email_section_slug_key'
    ) THEN
        ALTER TABLE public.user_progress
        ADD CONSTRAINT user_progress_user_email_section_slug_key
        UNIQUE (user_email, section_slug);
    END IF;
END $$;

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_user_progress_email ON public.user_progress(user_email);
CREATE INDEX IF NOT EXISTS idx_user_progress_section ON public.user_progress(user_email, section_slug);
