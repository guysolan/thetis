# Using Shopify Payments Test Mode

## What You're Seeing

You see **"Test mode"** or **"See how payments and orders work on your store?"** - this is Shopify Payments test mode, which works perfectly for testing webhooks!

## How to Enable Test Mode

1. Go to **Settings → Payments** in Shopify Admin
2. Look for **Shopify Payments** section
3. Find the **"Test mode"** toggle or click **"See how payments and orders work on your store?"**
4. Enable test mode

## Test Card Numbers

Once test mode is enabled, use these test cards at checkout:

### ✅ Success (Most Common)

```
Card Number: 4242 4242 4242 4242
Expiry: 12/25 (any future date)
CVV: 123 (any 3 digits)
Name: Test User
```

### ❌ Decline

```
Card Number: 4000 0000 0000 0002
Expiry: 12/25
CVV: 123
```

### 🔒 3D Secure (Requires Authentication)

```
Card Number: 4000 0025 0000 3155
Expiry: 12/25
CVV: 123
```

## Testing Your Webhook

### Step 1: Place a Test Order

1. Add Standard Course to cart
2. Go to checkout
3. Use test card: `4242 4242 4242 4242`
4. Use test email: `test@example.com`
5. Complete checkout

### Step 2: Verify Webhook Received

Check Supabase logs:

```bash
cd services/thetis
supabase functions logs shopify-order-webhook
```

Or check database:

```sql
-- Check webhook events
SELECT * FROM webhook_events 
ORDER BY created_at DESC LIMIT 5;

-- Check enrollments
SELECT * FROM enrollments 
WHERE shopify_customer_email = 'test@example.com';
```

### Step 3: Verify Enrollment Created

```sql
SELECT 
  id,
  course_type,
  shopify_order_number,
  shopify_customer_email,
  status,
  created_at
FROM enrollments
WHERE shopify_customer_email = 'test@example.com'
ORDER BY created_at DESC;
```

## Important Notes

✅ **Test mode orders trigger webhooks** - They work exactly like real orders for webhook testing

✅ **No real payment** - No money is charged, no refunds needed

✅ **Real order data** - Webhook payloads are identical to production orders

✅ **Can test multiple times** - Place as many test orders as you need

## Troubleshooting

### Test Mode Not Working?

- Make sure Shopify Payments is set up (even if not activated for real payments)
- Some stores need to complete Shopify Payments setup first
- Check if you need to verify your business details (can skip for testing)

### Webhook Not Received?

- Verify webhook URL is correct: `https://pohosrfblmcmpxixlrjk.supabase.co/functions/v1/shopify-order-webhook`
- Check webhook is active in Shopify Admin → Settings → Notifications → Webhooks
- Look at webhook delivery logs in Shopify (should show 200 status)

### Enrollment Not Created?

- Check product IDs match your Shopify products
- Verify order contains course products
- Check Supabase function logs for errors

## Next Steps

1. ✅ Enable test mode
2. ✅ Place test order with `4242 4242 4242 4242`
3. ✅ Verify webhook received
4. ✅ Verify enrollment created
5. ✅ Test user sign-up and auto-linking
