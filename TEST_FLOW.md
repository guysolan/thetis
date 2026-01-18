# Testing the Complete Flow: Shopify Webhook → Course Access

## Quick Test Guide

### Step 1: Create Test Enrollment (Manual)

Since the webhook needs environment variables configured, let's create a test enrollment manually:

1. **Open Supabase Studio**: http://127.0.0.1:54323
2. **Go to**: Table Editor → `enrollments`
3. **Click**: "Insert row"
4. **Fill in**:
   - `shopify_customer_email`: `testuser@example.com`
   - `course_type`: `standard`
   - `shopify_order_id`: `123456789`
   - `shopify_order_number`: `#1001`
   - `shopify_line_item_id`: `111111`
   - `status`: `active`
5. **Click**: "Save"

### Step 2: Test Claim Page

1. **Start Course App** (if not running):
   ```bash
   cd apps/course
   bun run dev
   ```

2. **Open Claim Page**:
   - **With order params**: http://localhost:2222/claim?email=testuser@example.com&order=#1001
   - **Without order params**: http://localhost:2222/claim (then enter `testuser@example.com`)

3. **Expected Behavior**:
   - ✅ Page should detect the purchase
   - ✅ Should show "Purchase found! Click below to access your course"
   - ✅ Click "Access Your Course" → Email stored in localStorage
   - ✅ Redirects to homepage
   - ✅ Should see "Welcome back, Testuser" (or email prefix)
   - ✅ Should see Standard course card with "Start Course" button

### Step 3: Test Course Access

1. **Click "Start Course"** or go to: http://localhost:2222/standard
2. **Expected**: Should see course sections list
3. **Click any section** → Should be able to view content
4. **Mark lesson as done** → Should save to database
5. **Refresh page** → Progress should persist

### Step 4: Verify in Database

1. **Check Supabase Studio** → `user_progress` table
2. **Filter by**: `user_email = testuser@example.com`
3. **Should see**: Progress entries for completed lessons

---

## Fixing Webhook for Full E2E Test

The webhook is failing because Edge Functions need environment variables. For local testing:

### Option A: Use Supabase Studio SQL Editor

1. Open: http://127.0.0.1:54323
2. Go to: SQL Editor
3. Run:
```sql
INSERT INTO enrollments (
  shopify_customer_email, 
  course_type, 
  shopify_order_id, 
  shopify_order_number, 
  shopify_line_item_id, 
  status
) VALUES (
  'testuser@example.com', 
  'standard', 
  '123456789', 
  '#1001', 
  '111111', 
  'active'
);
```

### Option B: Fix Webhook Environment Variables

For local Edge Functions, you may need to set environment variables in a `.env` file or use `supabase functions serve` with env vars. Check Supabase docs for local Edge Function development.

---

## Production Testing

Once deployed, test with a real Shopify order:

1. **Deploy Edge Function**:
   ```bash
   cd services/thetis
   supabase functions deploy shopify-order-webhook --no-verify-jwt
   ```

2. **Set Production Secrets** (via Supabase Dashboard):
   - `SHOPIFY_WEBHOOK_SECRET`
   - `RESEND_API_KEY` (for emails)
   - `COURSE_URL`

3. **Create Test Order** in Shopify (using test mode)

4. **Verify**:
   - Enrollment created in database
   - Email sent to customer
   - Customer can access course via `/claim` page
