# Testing Shopify Webhook End-to-End

## Overview

Yes! Shopify has test/sandbox modes similar to Stripe. You can test webhooks using:
- **Bogus Gateway** (test payment gateway)
- **Shopify Payments Test Mode** (test cards)
- **Development Stores** (unlimited test orders)
- **Manual webhook testing** (via Shopify admin)

## Prerequisites

1. **Development Shopify Store** (recommended)
   - Create a development store: https://partners.shopify.com/organizations
   - Development stores allow unlimited test orders via Bogus Gateway
   - No credit card required for development stores

2. **Supabase Edge Function Deployed**
   - Function: `shopify-order-webhook`
   - URL: `https://[your-project].supabase.co/functions/v1/shopify-order-webhook`
   - Environment variables set:
     - `SHOPIFY_WEBHOOK_SECRET`
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`

3. **Tracked products**
   - Product IDs are in `index.ts`: Standard course `9846187786568`, Premium course `9846188081480`, Splint `8572432253256`. Keep splint in sync with `SHOPIFY_SPLINT_PRODUCT_ID` in `apps/website/src/lib/shopify-course-price.ts`.

## Setup Steps

### 1. Configure Shopify Webhook

1. Go to Shopify Admin → **Settings → Notifications → Webhooks**
2. Click **Create webhook**
3. Configure:
   - **Event**: `Order creation` or `Order payment`
   - **Format**: `JSON`
   - **URL**: Your Supabase Edge Function URL
   - **API version**: Latest (recommended)
4. Click **Save webhook**
5. **Copy the webhook signing secret** (shown after creation)
   - This is your `SHOPIFY_WEBHOOK_SECRET`

### 2. Set Environment Variables

For **local testing** (using Supabase CLI):
```bash
cd services/thetis
supabase secrets set SHOPIFY_WEBHOOK_SECRET=your_webhook_secret_here
```

For **production** (Supabase Dashboard):
1. Go to Project Settings → Edge Functions → Secrets
2. Add `SHOPIFY_WEBHOOK_SECRET`

### 3. Enable Test Payment Gateway

**Option A: Bogus Gateway (Recommended for Dev Stores)**
1. Go to **Settings → Payments**
2. Enable **Bogus Gateway** (if available)
3. This allows test orders without real payments

**Option B: Shopify Payments Test Mode**
1. Go to **Settings → Payments**
2. Enable **Shopify Payments** (if available)
3. Enable **Test mode**
4. Use test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`

## Test Scenarios

### Test 1: Basic Order → Enrollment Creation

**Steps:**
1. Place a test order in your Shopify store:
   - Add Standard Course to cart
   - Use test email: `test@example.com`
   - Complete checkout with Bogus Gateway or test card
2. **Verify webhook received:**
   ```bash
   # Check Supabase logs
   supabase functions logs shopify-order-webhook
   
   # Or check webhook_events table
   SELECT * FROM webhook_events ORDER BY created_at DESC LIMIT 5;
   ```
3. **Verify enrollment created:**
   ```sql
   SELECT * FROM enrollments 
   WHERE shopify_customer_email = 'test@example.com'
   ORDER BY created_at DESC;
   ```
4. **Expected result:**
   - Webhook event logged in `webhook_events` table
   - Enrollment created with `course_type = 'standard'`
   - `shopify_order_id` and `shopify_order_number` populated
   - `user_id` is `NULL` (user hasn't signed up yet)

### Test 2: User Signs Up → Enrollment Auto-Links

**Steps:**
1. Complete Test 1 first (enrollment exists with email only)
2. Sign up in course app with `test@example.com`
3. **Verify enrollment linked:**
   ```sql
   SELECT * FROM enrollments 
   WHERE shopify_customer_email = 'test@example.com';
   ```
4. **Expected result:**
   - `user_id` is now populated
   - User can access Standard course

### Test 3: Idempotency (Duplicate Webhooks)

**Steps:**
1. Place a test order (same as Test 1)
2. **Manually resend webhook** (to simulate duplicate):
   - Go to Shopify Admin → Settings → Notifications → Webhooks
   - Find your webhook
   - Click **"Send test notification"** (or use API)
3. **Verify no duplicate enrollment:**
   ```sql
   SELECT COUNT(*) FROM enrollments 
   WHERE shopify_order_id = '[order_id]';
   ```
4. **Expected result:**
   - Count = 1 (no duplicate)
   - Webhook logs show "Already processed" message
   - `webhook_events` table shows both events, but only one enrollment

### Test 4: Multiple Courses in One Order

**Steps:**
1. Place order with both Standard and Premium courses
2. **Verify both enrollments created:**
   ```sql
   SELECT * FROM enrollments 
   WHERE shopify_order_id = '[order_id]'
   ORDER BY course_type;
   ```
3. **Expected result:**
   - Two enrollment records
   - One with `course_type = 'standard'`
   - One with `course_type = 'premium'`

### Test 5: Order Without Course Products

**Steps:**
1. Place order with non-course products only
2. **Verify webhook processed but no enrollment:**
   ```sql
   SELECT * FROM webhook_events 
   WHERE event_id LIKE 'order-%'
   ORDER BY created_at DESC LIMIT 1;
   ```
3. **Expected result:**
   - Webhook event logged
   - `processed = true`
   - No enrollment created
   - Response: `"No course products in order"`

### Test 6: Webhook Signature Verification

**Steps:**
1. Send a request with invalid signature:
   ```bash
   curl -X POST https://[your-project].supabase.co/functions/v1/shopify-order-webhook \
     -H "Content-Type: application/json" \
     -H "x-shopify-hmac-sha256: invalid_signature" \
     -d '{"test": "data"}'
   ```
2. **Expected result:**
   - HTTP 401 Unauthorized
   - No enrollment created
   - Error logged

## Manual Testing Tools

### 1. Shopify Admin "Send Test" Button

1. Go to **Settings → Notifications → Webhooks**
2. Find your webhook
3. Click **"Send test notification"**
4. This sends a sample payload to your endpoint
5. Check Supabase logs to verify it was received

### 2. Shopify CLI (if you have Shopify app)

```bash
# Trigger a test webhook
shopify app webhook trigger orders/create

# Or use GraphQL Admin API
```

### 3. Using ngrok for Local Testing

If you want to test locally before deploying:

```bash
# Start Supabase locally
cd services/thetis
supabase start

# In another terminal, expose local function
ngrok http 54321

# Update Shopify webhook URL to ngrok URL
# Format: https://[ngrok-id].ngrok.io/functions/v1/shopify-order-webhook
```

## Monitoring & Debugging

### Check Webhook Delivery Status

1. **Shopify Admin:**
   - Go to **Settings → Notifications → Webhooks**
   - Click on your webhook
   - View **"Recent deliveries"** tab
   - Check HTTP status codes (should be 200)

2. **Supabase Logs:**
   ```bash
   # Local
   supabase functions logs shopify-order-webhook
   
   # Production (via Dashboard)
   # Project → Edge Functions → shopify-order-webhook → Logs
   ```

### Database Queries for Verification

```sql
-- Check all webhook events
SELECT 
  id,
  event_id,
  event_type,
  source,
  processed,
  processed_at,
  error_message,
  created_at
FROM webhook_events
ORDER BY created_at DESC
LIMIT 20;

-- Check enrollments by email
SELECT 
  id,
  user_id,
  course_type,
  shopify_order_number,
  shopify_customer_email,
  status,
  created_at
FROM enrollments
WHERE shopify_customer_email = 'test@example.com'
ORDER BY created_at DESC;

-- Check enrollments by order
SELECT 
  id,
  course_type,
  shopify_order_id,
  shopify_order_number,
  shopify_customer_email,
  status
FROM enrollments
WHERE shopify_order_id = '123456789'
ORDER BY course_type;
```

## Troubleshooting

### Webhook Not Received

1. **Check webhook URL is accessible:**
   ```bash
   curl -X POST https://[your-project].supabase.co/functions/v1/shopify-order-webhook \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```
   Should return 401 (unauthorized) not 404 (not found)

2. **Check Shopify webhook delivery logs:**
   - Shopify Admin → Settings → Notifications → Webhooks
   - Click webhook → "Recent deliveries"
   - Look for failed deliveries (non-200 status)

3. **Check Supabase function is deployed:**
   ```bash
   supabase functions list
   ```

### Enrollment Not Created

1. **Check product IDs match:**
   ```sql
   -- Verify product IDs in webhook payload match your mapping
   SELECT payload->>'line_items' FROM webhook_events 
   WHERE event_id = '[webhook_id]';
   ```

2. **Check email extraction:**
   - Webhook should have `order.email` or `order.customer.email`
   - Verify email is lowercase in enrollment

3. **Check for errors:**
   ```sql
   SELECT error_message FROM webhook_events 
   WHERE processed = false OR error_message IS NOT NULL
   ORDER BY created_at DESC;
   ```

### Signature Verification Failing

1. **Verify webhook secret matches:**
   - Shopify Admin → Settings → Notifications → Webhooks
   - Copy the signing secret
   - Compare with `SHOPIFY_WEBHOOK_SECRET` in Supabase

2. **Check raw body is used for signature:**
   - Signature must be calculated from raw request body
   - Not from parsed JSON

## Next Steps After Testing

1. ✅ Verify all test scenarios pass
2. ✅ Update product IDs in `index.ts` to match production products
3. ✅ Deploy to production Supabase
4. ✅ Update Shopify webhook URL to production endpoint
5. ✅ Test with real order (can refund immediately)
6. ✅ Monitor webhook deliveries in Shopify admin
7. ✅ Set up alerts for failed webhooks

## Additional Resources

- [Shopify Webhook Documentation](https://shopify.dev/apps/build/webhooks)
- [Shopify Test Orders Guide](https://help.shopify.com/en/manual/checkout-settings/test-orders)
- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
