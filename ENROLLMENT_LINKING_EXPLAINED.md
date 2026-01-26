# Why Enrollments Have `user_id: null` Initially

## Current Flow (By Design)

### 1. Customer Purchases Course (Before Signing Up)
- Shopify sends webhook → Function receives order
- Function checks: Does user exist with this email? → **No**
- Function creates enrollment with:
  - `user_id: null` ✅ (user doesn't exist yet)
  - `shopify_customer_email: "customer@example.com"` ✅
  - `course_type: "standard"` ✅
  - `status: "active"` ✅

### 2. Customer Signs Up Later
- User signs up with `customer@example.com`
- Database trigger `on_user_created_link_enrollments` automatically runs
- Trigger finds enrollment with matching email
- Updates enrollment: `user_id` = new user's ID ✅

### 3. Alternative: Manual Linking (use-enrollment hook)
- When user logs in, `use-enrollment` hook checks for enrollments by email
- If found, it links them to the user's ID
- This is a backup if the trigger doesn't fire

## Why This Design?

✅ **Better UX**: Customer can purchase first, sign up later
✅ **No forced accounts**: We don't create accounts they didn't request
✅ **Automatic linking**: When they do sign up, enrollment links automatically
✅ **Works for guest checkout**: Shopify allows guest checkout

## Check If Linking Works

Run this SQL to see enrollments waiting to be linked:

```sql
-- Enrollments waiting for user signup
SELECT 
  id,
  course_type,
  shopify_customer_email,
  shopify_order_number,
  user_id,
  created_at
FROM enrollments
WHERE user_id IS NULL
ORDER BY created_at DESC;
```

## If You Want user_id Set Immediately

If you want to create a user account when the webhook is received, we'd need to:

1. Create user in `auth.users` table
2. Send them a magic link email
3. Set `user_id` immediately

**But this is NOT recommended because:**
- Customer didn't request an account
- They might use a different email to sign up
- Better to let them sign up naturally

## Current Status

Your enrollments are working correctly:
- ✅ Created with email when order comes in
- ✅ Auto-linked when user signs up (via trigger)
- ✅ Also linked by `use-enrollment` hook as backup

The `user_id: null` is intentional and will be filled when the customer signs up!
