# How to Fill Out Shopify Webhook Form

## Step-by-Step Form Instructions

### 1. **Event** ✅
You have: **Order creation**

**Recommendation:** Use **"Order payment"** instead (or add both):
- **Order payment** - Triggers when order is paid (more reliable for course access)
- **Order creation** - Triggers when order is created (may include unpaid orders)

**Best practice:** Use **"Order payment"** to ensure customer has actually paid before granting course access.

### 2. **Format** ✅
You have: **JSON**

This is correct! Keep it as **JSON**.

### 3. **URL** ⚠️ (Need to fill this)

**For Production:**
```
https://[YOUR-PROJECT-ID].supabase.co/functions/v1/shopify-order-webhook
```

**To find your Supabase project URL:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (thetis)
3. Go to **Settings → API**
4. Copy the **Project URL** (looks like: `https://xxxxx.supabase.co`)
5. Replace `[YOUR-PROJECT-ID]` with your actual project ID

**Example:**
```
https://abcdefghijklmnop.supabase.co/functions/v1/shopify-order-webhook
```

**For Local Testing (using ngrok):**
```
https://[ngrok-id].ngrok.io/functions/v1/shopify-order-webhook
```

**Important:** Make sure you've deployed the function first:
```bash
cd services/thetis
supabase functions deploy shopify-order-webhook
```

### 4. **Webhook API version** ⚠️ (Need to fill this)

**Recommended:** Use the **latest stable version** (currently **2024-10** or **2024-07**)

**To check latest version:**
- Shopify Admin → Settings → Notifications → Webhooks
- Look at the dropdown options
- Choose the most recent stable version (not beta)

**Common options:**
- `2024-10` (latest as of 2024)
- `2024-07`
- `2024-01`

**Note:** The webhook function code should work with any recent API version, but using the latest ensures you get the most up-to-date order data structure.

## Complete Form Example

```
Event:        Order payment
Format:       JSON
URL:          https://abcdefghijklmnop.supabase.co/functions/v1/shopify-order-webhook
API version:  2024-10
```

## After Submitting

1. **Copy the Webhook Signing Secret**
   - After creating the webhook, Shopify will show you a **signing secret**
   - Copy this immediately (you can't see it again!)
   - It looks like: `shpss_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

2. **Set the Secret in Supabase**
   ```bash
   cd services/thetis
   supabase secrets set SHOPIFY_WEBHOOK_SECRET=shpss_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **Test the Webhook**
   - Click **"Send test notification"** button in Shopify
   - Check Supabase logs: `supabase functions logs shopify-order-webhook`
   - Should see HTTP 200 response

## Troubleshooting

### "Invalid URL" Error
- Make sure URL starts with `https://` (not `http://`)
- Make sure function is deployed: `supabase functions deploy shopify-order-webhook`
- Check URL doesn't have trailing slash

### "Webhook delivery failed"
- Check Supabase function logs for errors
- Verify `SHOPIFY_WEBHOOK_SECRET` is set correctly
- Make sure function is accessible (try curl the URL)

### "401 Unauthorized"
- This is actually good! It means the webhook is reaching your function
- The 401 is because test notifications don't include proper signature
- Real orders will have proper signatures and work correctly

## Next Steps

1. ✅ Fill out the form with your Supabase URL
2. ✅ Set API version to latest (2024-10)
3. ✅ Save the webhook
4. ✅ Copy the signing secret
5. ✅ Set secret in Supabase
6. ✅ Test with a real order (or use Bogus Gateway for testing)
