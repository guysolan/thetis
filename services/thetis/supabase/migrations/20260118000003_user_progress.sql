-- User Progress table
-- Tracks which sections users have viewed/completed
-- Uses email as identifier (from localStorage-based auth)
CREATE TABLE public.user_progress(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email text NOT NULL,
    section_slug text NOT NULL, -- e.g., 'week-0-day-0-emergency-care'
    completed_at timestamptz,
    last_accessed_at timestamptz DEFAULT NOW(),
    created_at timestamptz DEFAULT NOW(),
    UNIQUE (user_email, section_slug)
);

-- Enable RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Allow anon access (filtered client-side by email)
CREATE POLICY "Anon can view progress by email" ON public.user_progress
    FOR SELECT
        USING (TRUE);

-- Client-side filtering
CREATE POLICY "Anon can insert progress by email" ON public.user_progress
    FOR INSERT
        WITH CHECK (TRUE);

-- Client-side validation
CREATE POLICY "Anon can update progress by email" ON public.user_progress
    FOR UPDATE
        USING (TRUE);

-- Client-side validation
-- Service role can do everything
CREATE POLICY "Service role full access" ON public.user_progress
    FOR ALL
        USING (auth.role() = 'service_role');

-- Indexes
CREATE INDEX idx_user_progress_email ON public.user_progress(user_email);

CREATE INDEX idx_user_progress_section ON public.user_progress(user_email, section_slug);

