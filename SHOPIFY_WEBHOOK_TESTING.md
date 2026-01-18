# Shopify Webhook Testing Guide

## Quick Answer: Yes, Shopify Has Test Mode! 🎉

Shopify supports testing similar to Stripe:
- ✅ **Bogus Gateway** - Test payment gateway (no real charges)
- ✅ **Shopify Payments Test Mode** - Test cards (like Stripe)
- ✅ **Development Stores** - Unlimited test orders
- ✅ **Manual Webhook Testing** - Send test notifications from Shopify admin

## Quick Start Testing

### Option 1: Use Shopify Admin (Easiest)

1. **Set up webhook in Shopify:**
   - Go to Shopify Admin → Settings → Notifications → Webhooks
   - Create webhook pointing to your Supabase function
   - Copy the webhook signing secret

2. **Enable Bogus Gateway:**
   - Settings → Payments → Enable "Bogus Gateway"
   - This allows test orders without real payments

3. **Place a test order:**
   - Add Standard Course to cart
   - Use email: `test@example.com`
   - Complete checkout (no real payment needed)

4. **Verify in Supabase:**
   ```sql
   -- Check enrollment was created
   SELECT * FROM enrollments 
   WHERE shopify_customer_email = 'test@example.com';
   
   -- Check webhook was received
   SELECT * FROM webhook_events 
   ORDER BY created_at DESC LIMIT 5;
   ```

### Option 2: Manual Test Script

Use the provided test script:

```bash
cd services/thetis/supabase/functions/shopify-order-webhook
./test-webhook.sh local 123456789 test@example.com
```

This simulates a webhook payload and tests your endpoint.

## Testing Checklist

### ✅ Test 1: Basic Flow
- [ ] Place test order with Standard Course
- [ ] Verify webhook received (check `webhook_events` table)
- [ ] Verify enrollment created (check `enrollments` table)
- [ ] Verify `user_id` is NULL (user hasn't signed up yet)

### ✅ Test 2: User Sign-Up → Auto-Link
- [ ] Complete Test 1 first
- [ ] Sign up in course app with same email
- [ ] Verify enrollment `user_id` is now populated
- [ ] Verify user can access Standard course

### ✅ Test 3: Idempotency (Duplicate Webhooks)
- [ ] Place test order
- [ ] Manually resend webhook (Shopify admin → "Send test")
- [ ] Verify no duplicate enrollment created
- [ ] Verify webhook logs show "Already processed"

### ✅ Test 4: Multiple Courses
- [ ] Place order with both Standard and Premium
- [ ] Verify two enrollments created (one per course)
- [ ] Verify both have same `shopify_order_id`

### ✅ Test 5: Non-Course Products
- [ ] Place order with only non-course products
- [ ] Verify webhook processed but no enrollment
- [ ] Verify response: "No course products in order"

### ✅ Test 6: Signature Verification
- [ ] Send request with invalid signature
- [ ] Verify HTTP 401 response
- [ ] Verify no enrollment created

## Important Notes

### Product IDs
Make sure the product IDs in `shopify-order-webhook/index.ts` match your actual Shopify products:
```typescript
const PRODUCT_TO_COURSE: Record<string, string> = {
    "9846187786568": "standard", // Update this!
    "9846188081480": "premium",  // Update this!
};
```

To find your product IDs:
1. Go to Shopify Admin → Products
2. Click on a product
3. Look at the URL: `/admin/products/[PRODUCT_ID]`
4. Or use Shopify API to list products

### Webhook Secret
The webhook secret is shown when you create the webhook in Shopify admin. Set it as:
```bash
supabase secrets set SHOPIFY_WEBHOOK_SECRET=your_secret_here
```

### Local vs Production

**Local Testing:**
- Use `supabase start` to run Supabase locally
- Webhook URL: `http://127.0.0.1:54321/functions/v1/shopify-order-webhook`
- Use `ngrok` to expose local endpoint to Shopify

**Production Testing:**
- Deploy function: `supabase functions deploy shopify-order-webhook`
- Webhook URL: `https://[project].supabase.co/functions/v1/shopify-order-webhook`
- Update Shopify webhook URL to production endpoint

## Troubleshooting

### Webhook Not Received
1. Check webhook URL is accessible (should return 401, not 404)
2. Check Shopify webhook delivery logs (Settings → Notifications → Webhooks)
3. Check Supabase function logs: `supabase functions logs shopify-order-webhook`

### Enrollment Not Created
1. Verify product IDs match your Shopify products
2. Check webhook payload has `order.email` or `order.customer.email`
3. Check for errors in `webhook_events.error_message`

### Signature Verification Failing
1. Verify `SHOPIFY_WEBHOOK_SECRET` matches Shopify webhook secret
2. Ensure signature is calculated from raw body (not parsed JSON)

## Full Testing Guide

See `services/thetis/supabase/functions/shopify-order-webhook/TESTING.md` for comprehensive testing scenarios and debugging tips.
