# Course App Testing & Implementation Checklist

## ✅ Completed & Working

### Authentication
- [x] Magic link sign-in flow
- [x] Auth callback handling
- [x] Session persistence
- [x] Sign out functionality
- [x] Protected routes redirect unauthenticated users

### Purchases & Access Control
- [x] Purchase/course access checking by shopify_customer_email (and user_id when linked)
- [x] Auto-linking purchases when user signs up (trigger on users insert)
- [x] Course access gating (ProtectedRoute component)
- [x] RLS policies for purchases (anon can view)
- [x] Seed data for testing (guy@thetismedical.com)

### Progress Tracking
- [x] Database-backed progress (user_progress table)
- [x] Mark/unmark lessons as complete
- [x] Auto-complete on scroll (75% threshold)
- [x] Auto-complete when clicking "Next"
- [x] Progress syncing across devices
- [x] Progress stepper shows actual completion status (not sequential)

### UI/UX
- [x] Consistent layout components (CoursePageLayout, CourseHeader, etc.)
- [x] Reusable LessonCompletionButton component
- [x] Context-aware landing page (shows dashboard for enrolled users)
- [x] Progress charts and completion percentages
- [x] "Continue Learning" button with next lesson detection

## 🧪 Needs Testing

### End-to-End Flow
- [ ] **Purchase → Webhook → Purchases → Access**
  1. Create a test Shopify order with course product
  2. Verify webhook receives order
  3. Check row is created in `purchases` table (Supabase)
  4. Sign in with order email
  5. Verify course access is granted
  6. Test accessing course content

### Shopify Webhook
- [ ] Test webhook signature verification
- [ ] Test order processing (orders/create, orders/paid)
- [ ] Test idempotency (duplicate webhook handling)
- [ ] Test with multiple course products in one order
- [ ] Test error handling (invalid payload, missing fields)
- [ ] Verify webhook logs in `webhook_events` table

### Edge Cases
- [ ] User purchases course but hasn't signed up yet
  - Purchase row should be created with shopify_customer_email only
  - User should be able to sign up later and get access
- [ ] User signs up with different email than Shopify order
  - Should still link purchase if email matches
- [ ] User completes lessons out of order
  - Progress stepper should show correct status
- [ ] User marks lesson complete, then unmarks it
  - Should update database correctly
- [ ] Multiple course purchases for same user
  - Should show all purchased courses in nav

### Premium Course
- [ ] Test premium course purchase / access
- [ ] Test premium course access gating
- [ ] Verify premium routes work correctly
- [ ] Test premium course progress tracking (if applicable)

### Error Handling
- [ ] Network errors when saving progress
- [ ] Database connection errors
- [ ] Invalid section slugs
- [ ] Missing purchase data (no row in purchases)
- [ ] Expired auth sessions

## 🚧 Not Yet Implemented

### Email Queue (Future)
- [ ] Email queue table exists but not used yet
- [ ] Need to implement email sending job (Trigger.dev or similar)
- [ ] Need to queue emails based on rupture date
- [ ] Need to respect email preferences (email_course_enabled)

### Order Verification Page (Optional)
- [ ] Manual order linking page (`/verify-order`)
- [ ] For cases where webhook fails
- [ ] User enters order number + email to link/claim purchase

### Production Deployment
- [ ] Set up production Supabase instance
- [ ] Configure production environment variables
- [ ] Set up Shopify webhook URL (production)
- [ ] Test production webhook endpoint
- [ ] Configure email sending (Resend SMTP)
- [ ] Set up monitoring/logging

## 📋 Quick Test Scenarios

### Scenario 1: New User Purchase Flow
1. User purchases Standard course on Shopify
2. Webhook creates purchase row with shopify_customer_email
3. User receives email with magic link
4. User clicks magic link → signs in
5. User sees "Welcome back" dashboard
6. User can access Standard course
7. User can mark lessons as complete
8. Progress persists across sessions

### Scenario 2: Existing User Purchase
1. User is already signed up
2. User purchases Premium course
3. Webhook creates purchase
4. Purchase auto-links to existing user account (trigger)
5. User immediately sees Premium course access
6. User can access Premium course

### Scenario 3: Progress Tracking
1. User views lesson → `last_accessed_at` updates
2. User scrolls 75% → lesson auto-completes
3. User clicks "Next" → current lesson completes
4. User manually marks lesson complete
5. User unmarks lesson → `completed_at` set to null
6. Progress stepper shows correct status
7. Progress syncs across browser tabs/devices

### Scenario 4: Access Control
1. Unauthenticated user tries to access `/standard/emergency-care`
   - Should redirect to `/auth`
2. Authenticated but unenrolled user tries to access course
   - Should redirect to `/` (home page)
3. Enrolled user accesses course
   - Should see content

## 🔍 Things to Verify

- [ ] All console errors resolved
- [ ] No TypeScript errors
- [ ] All routes load correctly
- [ ] Progress saves reliably
- [ ] Purchase/access checks are fast (< 500ms)
- [ ] UI is responsive on mobile
- [ ] Loading states show appropriately
- [ ] Error messages are user-friendly
