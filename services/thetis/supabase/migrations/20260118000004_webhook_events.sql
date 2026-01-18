-- Webhook Events table
-- For idempotency - prevents processing same webhook twice
CREATE TABLE public.webhook_events(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id text UNIQUE NOT NULL, -- Shopify webhook ID or Stripe event ID
    event_type text NOT NULL, -- 'shopify_orders_paid', 'stripe_checkout_completed', etc.
    source text NOT NULL CHECK (source IN ('shopify', 'stripe')),
    processed boolean DEFAULT FALSE,
    payload jsonb NOT NULL,
    error_message text,
    created_at timestamptz DEFAULT NOW(),
    processed_at timestamptz
);

-- Enable RLS (only service role should access this)
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Only service role can access webhook events
CREATE POLICY "Service role full access" ON public.webhook_events
    FOR ALL
        USING (auth.role() = 'service_role');

-- Indexes
CREATE INDEX idx_webhook_events_event_id ON public.webhook_events(event_id);

CREATE INDEX idx_webhook_events_source ON public.webhook_events(source, event_type);

CREATE INDEX idx_webhook_events_processed ON public.webhook_events(processed, created_at);

