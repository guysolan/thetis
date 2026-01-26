# Post-Purchase UX Setup Complete ✅

## What's Been Implemented

### 1. ✅ Password Authentication
- Added `signUpWithPassword` and `signInWithPassword` to `use-auth.ts`
- Updated `/auth` page to support both password and magic link
- Password requirements: minimum 8 characters

### 2. ✅ Claim Page (`/claim`)
- Created `/claim` route that handles Shopify redirects
- Accepts `email` and `order` query parameters
- Pre-fills email from Shopify
- Shows "Thanks for your purchase!" message
- Allows customer to create account with password

### 3. ✅ Email Sending
- Webhook now sends email after enrollment is created
- Email includes:
  - "Your Course is Ready!" message
  - Link to `/claim` page with email and order pre-filled
  - Instructions on how to access course
  - Order number

## Setup Required

### 1. Set Environment Variables

```bash
cd services/thetis
supabase secrets set RESEND_API_KEY=your_resend_api_key_here
supabase secrets set COURSE_URL=https://course.thetismedical.com
```

**Get Resend API Key:**
- Go to https://resend.com/api-keys
- Create or copy your API key

**COURSE_URL:**
- Production: `https://course.thetismedical.com`
- Local: `http://localhost:2222`

### 2. Configure Shopify Checkout Redirect

In Shopify Admin:
1. Go to **Settings → Checkout**
2. Scroll to **"Order status page"** section
3. Under **"Additional scripts"** or **"Redirect after checkout"**, add:

```javascript
// Redirect to course app after successful checkout
{% if order.line_items contains 'Standard Course' or order.line_items contains 'Premium Course' %}
<script>
  window.location.href = 'https://course.thetismedical.com/claim?email={{ order.email }}&order={{ order.order_number }}';
</script>
{% endif %}
```

**OR** use Shopify's **"Thank you page"** URL:
- Set to: `https://course.thetismedical.com/claim?email={{ order.email }}&order={{ order.order_number }}`

**OR** use Shopify Flow/Webhooks:
- Create a flow that redirects after order completion
- Redirect URL: `https://course.thetismedical.com/claim?email={{ customer.email }}&order={{ order.number }}`

### 3. Deploy Updated Function

```bash
cd services/thetis
supabase functions deploy shopify-order-webhook --no-verify-jwt
```

## User Flow

### Step 1: Customer Purchases
- Customer completes checkout on Shopify
- Webhook creates enrollment automatically
- Email sent: "Your Course is Ready!"

### Step 2: Customer Redirected
- Shopify redirects to: `/claim?email=customer@example.com&order=#1001`
- OR customer clicks link in email

### Step 3: Claim Page
- Shows "Thanks for your purchase!"
- Email pre-filled
- Customer creates account with password
- Account created → Enrollment auto-links → Redirected to course

### Step 4: Access Course
- Customer sees personalized dashboard
- Can access Standard course immediately
- Progress tracked automatically

## Testing

### Test the Flow:

1. **Place test order** in Shopify
2. **Check email** - Should receive "Your Course is Ready!" email
3. **Click link** - Should go to `/claim` page
4. **Create account** - Should work with password
5. **Verify access** - Should see course dashboard

### Test URLs:

- Claim page: `https://course.thetismedical.com/claim?email=test@example.com&order=#1001`
- Auth page: `https://course.thetismedical.com/auth`

## Email Template

The email includes:
- ✅ "Your Course is Ready!" header
- ✅ Instructions (3 steps)
- ✅ "Access Your Course" button
- ✅ Fallback link (if button doesn't work)
- ✅ Order number
- ✅ Support email

## Next Steps

1. ✅ Set `RESEND_API_KEY` secret
2. ✅ Set `COURSE_URL` secret  
3. ✅ Deploy updated webhook function
4. ✅ Configure Shopify checkout redirect
5. ✅ Test end-to-end flow

## Files Modified

- `apps/course/src/hooks/use-auth.ts` - Added password auth
- `apps/course/src/routes/auth.tsx` - Updated to support passwords
- `apps/course/src/routes/claim.tsx` - New claim page
- `services/thetis/supabase/functions/shopify-order-webhook/index.ts` - Added email sending
