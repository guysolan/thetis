# Testing the Course Purchase Flow

## 🧪 Local Testing (Recommended First)

### Step 1: Start Supabase Locally

```bash
cd services/thetis
supabase start
```

This will:
- Start local Supabase on port 54321
- Start Inbucket (email testing) on port 54324
- Show you the Studio URL (usually http://127.0.0.1:54323)

### Step 2: Start Course App

```bash
cd apps/course
bun run dev
```

Course app will be at: **http://localhost:2222**

### Step 3: Test Webhook (Creates Enrollment)

```bash
cd services/thetis/supabase/functions/shopify-order-webhook

# Test with your email
./test-webhook.sh local 123456789 guy@thetismedical.com "" "6462cc014e3c961f2497cf4fbb938493e9541aba0188ad21e629ec24ce1c8afc"
```

**What to check:**
- ✅ Webhook returns `200 OK`
- ✅ Check Supabase Studio → `enrollments` table → Should see new enrollment
- ✅ Check Inbucket (http://127.0.0.1:54324) → Should see email with course access link

### Step 4: Test `/claim` Page

1. **With order params** (from email):
   - Open: `http://localhost:2222/claim?email=guy@thetismedical.com&order=#1001`
   - Should show "Thanks for your purchase!"
   - Create password → Should redirect to course

2. **Without order params** (from website link):
   - Open: `http://localhost:2222/claim`
   - Should show "Access Your Course"
   - Enter email → Sign in → Should see course if enrolled

### Step 5: Verify Enrollment Linking

1. Sign in with the email you used in the webhook test
2. Check Supabase Studio → `enrollments` table
3. `user_id` should now be populated (was `null` before signup)

---

## 🚀 Production Testing

### Prerequisites

1. **Deploy Supabase Edge Function:**
   ```bash
   cd services/thetis
   supabase functions deploy shopify-order-webhook --no-verify-jwt
   ```

2. **Set Environment Variables:**
   ```bash
   supabase secrets set RESEND_API_KEY=re_7MxchZfv_Pg92RGZyGW8Gbf5f1gXxpgnz
   supabase secrets set COURSE_URL=https://course.thetismedical.com
   ```

3. **Deploy Course App** to `course.thetismedical.com`

### Test with Real Shopify Order

#### Option A: Use Shopify Test Mode

1. Go to Shopify Admin → Settings → Payments → Test mode
2. Add Standard Course to cart
3. Use Shopify test card: `4242 4242 4242 4242`
4. Complete checkout
5. **Check:**
   - ✅ Resend dashboard → Email sent
   - ✅ Supabase Studio → Enrollment created
   - ✅ Click email link → `/claim` page works

#### Option B: Use Test Webhook Script

```bash
cd services/thetis/supabase/functions/shopify-order-webhook

# Replace with your production Supabase URL
./test-webhook.sh production \
  123456789 \
  your-email@example.com \
  https://pohosrfblmcmpxixlrjk.supabase.co \
  "6462cc014e3c961f2497cf4fbb938493e9541aba0188ad21e629ec24ce1c8afc"
```

### Test Full Customer Journey

1. **Buy course** on Shopify (test mode or real)
2. **Check email** (Resend dashboard or inbox)
3. **Click "Access Your Course"** button in email
4. **Create password** on `/claim` page
5. **Verify redirect** to course dashboard
6. **Check course access** - Should see Standard course
7. **Test progress** - Mark a lesson as done
8. **Sign out and back in** - Progress should persist

---

## 🔍 Debugging Checklist

### Webhook Not Firing?

- ✅ Check Shopify webhook URL is correct
- ✅ Check webhook secret matches
- ✅ Check Supabase function logs: `supabase functions logs shopify-order-webhook`
- ✅ Verify product ID matches: `9846187786568` for Standard course

### Email Not Sending?

- ✅ Check `RESEND_API_KEY` is set in Supabase secrets
- ✅ Check Resend dashboard for errors
- ✅ For local: Check Inbucket at http://127.0.0.1:54324

### Enrollment Not Created?

- ✅ Check webhook logs for errors
- ✅ Verify product ID in webhook payload matches `PRODUCT_TO_COURSE` mapping
- ✅ Check `webhook_events` table for processing status

### Can't Access Course?

- ✅ Check `enrollments` table - enrollment exists?
- ✅ Check `user_id` is linked (may be `null` until signup)
- ✅ Check `status` is `'active'`
- ✅ Check `course_type` matches route (`'standard'`)

### `/claim` Page Issues?

- ✅ Check course app is running
- ✅ Check Supabase URL in `.env.local` matches local Supabase
- ✅ Check browser console for errors
- ✅ Verify enrollment exists for email/order combo

---

## 📊 What to Verify

### Database State

```sql
-- Check enrollments
SELECT * FROM enrollments ORDER BY created_at DESC LIMIT 5;

-- Check webhook events
SELECT * FROM webhook_events ORDER BY created_at DESC LIMIT 5;

-- Check user progress
SELECT * FROM user_progress ORDER BY updated_at DESC LIMIT 10;
```

### Email Content

- ✅ Email subject: "🎉 Your Achilles Recovery Course is Ready!"
- ✅ Email has "Access Your Course Now" button
- ✅ Button links to `/claim?email=...&order=...`
- ✅ Email shows order number and course type

### User Experience

- ✅ `/claim` page loads without errors
- ✅ Order verification works (with params)
- ✅ Password creation works
- ✅ Sign in works (without params)
- ✅ Course dashboard shows purchased course
- ✅ Can access `/standard` route
- ✅ Progress tracking works

---

## 🎯 Quick Test Commands

```bash
# 1. Start everything locally
cd services/thetis && supabase start
cd ../../apps/course && bun run dev

# 2. Test webhook (in another terminal)
cd services/thetis/supabase/functions/shopify-order-webhook
./test-webhook.sh local 999999 guy@thetismedical.com "" "6462cc014e3c961f2497cf4fbb938493e9541aba0188ad21e629ec24ce1c8afc"

# 3. Open course app
open http://localhost:2222/claim?email=guy@thetismedical.com&order=#1001

# 4. Check email
open http://127.0.0.1:54324

# 5. Check database
open http://127.0.0.1:54323
```
