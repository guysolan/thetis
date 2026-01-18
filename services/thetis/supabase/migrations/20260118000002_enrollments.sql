-- Enrollments table
-- Links users (by email) to courses they've purchased via Shopify
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE, -- Links to users table
  user_email TEXT, -- Optional: can be linked later if user creates account
  course_type TEXT NOT NULL CHECK (course_type IN ('standard', 'premium', 'essentials', 'professionals')),
  
  -- Shopify fields (primary payment method)
  shopify_order_id TEXT,
  shopify_order_number TEXT,
  shopify_customer_email TEXT NOT NULL,
  shopify_line_item_id TEXT,
  
  -- Status and timestamps
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'refunded', 'expired')),
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent duplicate enrollments from same order
  UNIQUE(shopify_order_id, shopify_line_item_id)
);

-- Enable RLS
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Allow anon read access by email (for course access checks)
-- This allows unauthenticated users to check if they have enrollments
CREATE POLICY "Anon can view enrollments by email" ON public.enrollments
  FOR SELECT
  TO anon
  USING (true); -- Client-side filtering by shopify_customer_email or user_email

-- Service role can do everything (for webhooks)
CREATE POLICY "Service role full access" ON public.enrollments
  FOR ALL
  USING (auth.role() = 'service_role');

-- Indexes for common queries
CREATE INDEX idx_enrollments_shopify_order ON public.enrollments(shopify_order_id);
CREATE INDEX idx_enrollments_shopify_email ON public.enrollments(shopify_customer_email);
CREATE INDEX idx_enrollments_course_type ON public.enrollments(course_type, status);
CREATE INDEX idx_enrollments_user_email ON public.enrollments(user_email);