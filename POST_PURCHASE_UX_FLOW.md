# Post-Purchase UX Flow

## Current Flow (What Happens Now)

### Step 1: Customer Purchases Course on Shopify
- Customer adds Standard Course to cart
- Completes checkout with email: `customer@example.com`
- Receives Shopify order confirmation email
- **Enrollment created automatically** via webhook:
  - `user_id: null` (they haven't signed up yet)
  - `shopify_customer_email: "customer@example.com"`
  - `course_type: "standard"`
  - `status: "active"`

### Step 2: Customer Wants to Access Course
**Current Problem:** Customer doesn't know where to go or how to access course!

**Options:**
1. **Shopify redirect after checkout** → Course app
2. **Email sent after purchase** → "Access your course" link
3. **Customer finds course app** → Signs up → Auto-links

### Step 3: Customer Signs Up
- Goes to course app: `https://course.thetismedical.com`
- Clicks "Sign In"
- Enters email: `customer@example.com`
- Receives magic link
- Clicks magic link → Logged in

### Step 4: Enrollment Auto-Links
- Database trigger `on_user_created_link_enrollments` runs
- Finds enrollment with matching email
- Updates `user_id` to customer's ID
- Customer now has access!

### Step 5: Customer Accesses Course
- Sees personalized dashboard
- Sees "Standard" course card
- Clicks "Start Course" or "Continue Learning"
- Can access all course content

## Missing Pieces (What We Need to Add)

### ❌ No Post-Purchase Email
- Customer doesn't get email saying "Your course is ready!"
- No link to course app
- No instructions on how to access

### ❌ No Shopify Redirect
- After checkout, customer stays on Shopify
- No automatic redirect to course app
- Customer has to find course app themselves

### ❌ No "Access Your Course" Page
- No dedicated page for customers to claim their course
- No order verification page
- No clear path from purchase to access

## Recommended UX Flow

### Option A: Email + Redirect (Best UX)

1. **Customer purchases** → Shopify checkout
2. **Shopify redirects** → `https://course.thetismedical.com/claim?email=customer@example.com&order=#1001`
3. **Claim page shows:**
   - "Thanks for your purchase!"
   - "Sign in to access your course"
   - Email pre-filled
   - Magic link sent automatically
4. **Customer clicks magic link** → Logged in → Enrollment linked → Course access

### Option B: Email Only (Simpler)

1. **Customer purchases** → Shopify checkout
2. **Email sent** (via Shopify or webhook):
   - "Your course is ready!"
   - "Click here to access: https://course.thetismedical.com"
   - "Sign in with: customer@example.com"
3. **Customer clicks link** → Signs up → Enrollment linked → Course access

### Option C: Manual (Current - Not Ideal)

1. **Customer purchases** → Stays on Shopify
2. **Customer finds course app** → Signs up manually
3. **Enrollment auto-links** → Course access

## What We Should Implement

### 1. Post-Purchase Email ✅ (High Priority)
- Send email after webhook processes order
- Include: "Your course is ready!" + link to course app
- Can use Supabase email queue or Shopify email

### 2. Shopify Checkout Redirect ✅ (High Priority)
- Configure Shopify checkout to redirect to course app
- Pass order number/email as query params
- Show "Claim your course" page

### 3. Claim/Access Page ✅ (Medium Priority)
- `/claim` or `/access` route
- Pre-fill email from query params
- Auto-send magic link
- Show "Your course is ready!" message

### 4. Order Verification Page ✅ (Low Priority)
- `/verify-order` route
- Customer enters order number + email
- Verifies order exists
- Links enrollment if needed

## Current State

✅ **Backend working:**
- Webhook creates enrollment
- Auto-linking works (trigger + hook)
- Course access gating works

❌ **Frontend missing:**
- No post-purchase email
- No redirect from Shopify
- No claim/access page
- Customer has to find course app themselves

## Next Steps

Would you like me to implement:
1. **Post-purchase email** (via webhook or email queue)?
2. **Shopify checkout redirect** (configure in Shopify)?
3. **Claim/Access page** (new route in course app)?

Let me know which you'd like to tackle first!
