-- Re-add anon policy for enrollments (was dropped in remote_commit)
-- This allows unauthenticated users to check if they have enrollments by email
CREATE POLICY "Anon can view enrollments by email" ON public.enrollments
  FOR SELECT
  TO anon
  USING (true); -- Client-side filtering by shopify_customer_email or user_email
