# Check Webhook Test Results

## Option 1: Supabase Dashboard (Easiest)

1. **Check Function Logs:**
   - Go to: https://supabase.com/dashboard/project/pohosrfblmcmpxixlrjk/functions
   - Click on `shopify-order-webhook`
   - Click "Logs" tab
   - Look for recent entries with your test notification

2. **Check Database:**
   - Go to: https://supabase.com/dashboard/project/pohosrfblmcmpxixlrjk/editor
   - Run these SQL queries:

```sql
-- Check webhook events
SELECT 
  id,
  event_id,
  event_type,
  source,
  processed,
  error_message,
  created_at
FROM webhook_events
ORDER BY created_at DESC
LIMIT 5;

-- Check enrollments
SELECT 
  id,
  course_type,
  shopify_order_number,
  shopify_customer_email,
  status,
  created_at
FROM enrollments
ORDER BY created_at DESC
LIMIT 5;
```

## Option 2: Check Shopify Webhook Delivery

1. Go to **Shopify Admin → Settings → Notifications → Webhooks**
2. Click on your webhook
3. Check **"Recent deliveries"** tab
4. Look for the test notification
5. Check HTTP status code:
   - **200** = Success ✅
   - **401** = Signature issue
   - **500** = Server error

## What to Look For

### ✅ Success Indicators:
- HTTP 200 in Shopify webhook deliveries
- Log entry in Supabase function logs showing "Webhook processed"
- Entry in `webhook_events` table with `processed = true`
- Enrollment created in `enrollments` table (if test order had course products)

### ❌ Failure Indicators:
- HTTP 401 = Signature verification failed
- HTTP 500 = Function error (check logs)
- No entry in `webhook_events` = Webhook didn't reach function
- `error_message` in `webhook_events` = Check the error details

## Debugging

If you see HTTP 401:
- Check the function logs for "Invalid Shopify webhook signature"
- Verify the secret matches: `6462cc014e3c961f2497cf4fbb938493e9541aba0188ad21e629ec24ce1c8afc`
- Check if test notifications use different signature format

If you see HTTP 500:
- Check function logs for error details
- Verify all environment variables are set (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
