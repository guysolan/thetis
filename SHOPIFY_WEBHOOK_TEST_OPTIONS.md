# Testing Shopify Webhook Without Test Mode Checkout

If Shopify says "customers can't checkout in test mode", here are alternative ways to test your webhook:

## Option 1: Manual Webhook Test (Easiest) ✅

Shopify Admin has a built-in "Send test notification" feature that doesn't require placing an order:

### Steps:
1. Go to **Shopify Admin → Settings → Notifications → Webhooks**
2. Find your webhook (the one pointing to your Supabase function)
3. Click on the webhook to open details
4. Click **"Send test notification"** button
5. This sends a sample webhook payload to your endpoint

### What to Check:
```bash
# Check Supabase logs
cd services/thetis
supabase functions logs shopify-order-webhook

# Should see the test webhook received
```

**Note:** Test notifications might return 401 (unauthorized) because they don't include proper signatures, but this confirms your endpoint is reachable. Real orders will have proper signatures.

## Option 2: Use Test Script (Recommended) ✅

Use the provided test script to simulate a real webhook:

### Steps:
1. Get your webhook secret from Shopify:
   - Go to **Settings → Notifications → Webhooks**
   - Click on your webhook
   - Copy the **Signing secret** (starts with `shpss_`)

2. Set the secret in Supabase:
   ```bash
   cd services/thetis
   supabase secrets set SHOPIFY_WEBHOOK_SECRET=shpss_your_secret_here
   ```

3. Run the test script:
   ```bash
   cd services/thetis/supabase/functions/shopify-order-webhook
   ./test-webhook.sh production 123456789 test@example.com
   ```

4. Enter your webhook secret when prompted

5. Check the results:
   ```bash
   # Should see HTTP 200 and enrollment created
   ```

## Option 3: Development Store (If Available)

If you have access to create a development store:

1. Create a development store: https://partners.shopify.com/organizations
2. Development stores allow test orders without payment restrictions
3. Set up the same webhook in your dev store
4. Place test orders freely

## Option 4: Real Order + Immediate Refund

If you need to test with a real order:

1. Place a small real order (minimum amount)
2. Webhook will fire immediately
3. Refund the order right away
4. Test your webhook logic

**⚠️ Warning:** This costs real money (even if refunded), so only use if necessary.

## Option 5: Check Webhook Delivery Logs

Even without placing orders, you can check if your webhook is configured correctly:

1. Go to **Settings → Notifications → Webhooks**
2. Click on your webhook
3. Check **"Recent deliveries"** tab
4. Look for any test notifications or errors
5. HTTP 200 = webhook is working
6. HTTP 401 = signature issue (need to set secret)
7. HTTP 404 = URL wrong or function not deployed

## Recommended Testing Flow

1. **First:** Use "Send test notification" to verify endpoint is reachable
2. **Second:** Use test script with proper signature to test full flow
3. **Third:** Check database to verify enrollment creation

## Quick Test Commands

```bash
# Check if function is deployed
cd services/thetis
supabase functions list

# Check recent logs
supabase functions logs shopify-order-webhook --limit 10

# Check database for enrollments
# (Run in Supabase SQL Editor)
SELECT * FROM enrollments ORDER BY created_at DESC LIMIT 5;
SELECT * FROM webhook_events ORDER BY created_at DESC LIMIT 5;
```

## Troubleshooting

### "Send test notification" returns 401
- This is normal! Test notifications don't have proper signatures
- Real orders will have signatures and work correctly
- To test with signature, use the test script instead

### Test script fails with signature error
- Make sure you copied the webhook secret correctly
- Verify secret is set: `supabase secrets list`
- Check secret matches Shopify webhook secret

### No webhook received
- Verify webhook URL is correct
- Check webhook is active in Shopify
- Look at "Recent deliveries" in Shopify admin
- Check Supabase function logs
