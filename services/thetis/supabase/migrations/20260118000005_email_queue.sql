-- Email Queue table
-- Schedules course emails based on rupture date
-- Uses email as identifier (from localStorage-based auth)
CREATE TABLE public.email_queue(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email text NOT NULL,
    section_slug text NOT NULL, -- e.g., 'week-0-day-0-emergency-care'
    email_type text NOT NULL DEFAULT 'section' CHECK (email_type IN ('section', 'reminder', 'welcome', 'completion')),
    scheduled_for timestamptz NOT NULL,
    sent_at timestamptz,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
    error_message text,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.email_queue ENABLE ROW LEVEL SECURITY;

-- Allow anon access (filtered client-side by email)
CREATE POLICY "Anon can view emails by email" ON public.email_queue
    FOR SELECT
        USING (TRUE);

-- Client-side filtering
-- Service role can do everything (for email sending job)
CREATE POLICY "Service role full access" ON public.email_queue
    FOR ALL
        USING (auth.role() = 'service_role');

-- Indexes for email sending queries
CREATE INDEX idx_email_queue_scheduled ON public.email_queue(scheduled_for, status)
WHERE
    status = 'pending';

CREATE INDEX idx_email_queue_user_email ON public.email_queue(user_email, status);

