---
name: Achilles Recovery Course - Concise Plan
overview: TanStack Router app at guide.thetismedical.com with Stripe payments, separate Supabase (services/thetis), 30 course sections matching email content. Adaptive email timing based on rupture date. Webhooks sync payments to Supabase.
todos:
  - id: reorganize-supabase
    content: Move ship-stock to services/ship-stock/, create services/thetis/supabase/
    status: pending
  - id: create-migrations
    content: Create 6 migration files for users, products, enrollments, sections, progress, email_queue, webhook_events
    status: pending
    dependencies:
      - reorganize-supabase
  - id: setup-guide-app
    content: Create apps/guide/ TanStack Router app with routing structure
    status: pending
  - id: stripe-setup
    content: Create Stripe products, set up webhook endpoint in Supabase Edge Function
    status: pending
    dependencies:
      - create-migrations
  - id: checkout-flow
    content: Build purchase form with rupture date input and Stripe Checkout integration
    status: pending
    dependencies:
      - setup-guide-app
      - stripe-setup
  - id: webhook-handler
    content: Implement Stripe webhook handler to create enrollments and queue emails
    status: pending
    dependencies:
      - stripe-setup
      - create-migrations
  - id: extract-sections
    content: Break down 7 articles into 30 sections, create markdown files
    status: pending
  - id: seed-database
    content: Seed products and 30 course sections with timing metadata
    status: pending
    dependencies:
      - create-migrations
      - extract-sections
  - id: section-pages
    content: Build section pages with markdown rendering and enrollment gating
    status: pending
    dependencies:
      - setup-guide-app
      - extract-sections
  - id: dashboard
    content: Create user dashboard with progress tracking and week indicator
    status: pending
    dependencies:
      - section-pages
      - checkout-flow
---

# Achilles Recovery Course - Implementation Plan

## Architecture

**App**: `apps/guide/` (TanStack Router)

**Database**: `services/thetis/supabase/` (separate Supabase project)

**Payments**: **Stripe** (recommended for digital products, better webhook integration than Shopify)

**Deployment**: `guide.thetismedical.com` subdomain

## Payment Recommendation: Stripe

**Why Stripe over Shopify:**

- Built for digital products/subscriptions
- Better webhook system for Supabase integration
- Simpler API for one-time course purchases
- No need for product catalog complexity
- Better documentation for webhook security

## Database Schema

### Core Tables

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  rupture_date DATE NOT NULL,
  enrollment_date TIMESTAMPTZ DEFAULT NOW(),
  email_course_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_price_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL, -- 'Essentials Course', 'Pro Course'
  type TEXT NOT NULL, -- 'essentials', 'pro'
  price_cents INTEGER NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments (created after successful payment)
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'refunded'
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Sections (30 sections)
CREATE TABLE public.course_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content_path TEXT NOT NULL, -- path to markdown file
  product_type TEXT NOT NULL, -- 'essentials', 'pro'
  section_number INTEGER NOT NULL,
  target_week INTEGER NOT NULL, -- 0-26+
  target_day INTEGER, -- 0-6 (nullable for week-level sections)
  days_after_rupture INTEGER NOT NULL, -- exact day to send email
  email_number INTEGER, -- which email in sequence (1-31)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES public.course_sections(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, section_id)
);

-- Email Queue
CREATE TABLE public.email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES public.course_sections(id),
  scheduled_for TIMESTAMPTZ NOT NULL, -- calculated: rupture_date + days_after_rupture
  sent_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stripe Webhook Events (for idempotency)
CREATE TABLE public.stripe_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  processed BOOLEAN DEFAULT false,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```



### Indexes

```sql
CREATE INDEX idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX idx_enrollments_stripe_session ON public.enrollments(stripe_checkout_session_id);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_email_queue_scheduled ON public.email_queue(scheduled_for, status);
CREATE INDEX idx_email_queue_user ON public.email_queue(user_id, status);
```



### RLS Policies

```sql
-- Users can only see their own data
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);
```



## Payment Flow

### 1. Checkout (Client)

```typescript
// User clicks "Buy Course" → Stripe Checkout
const session = await fetch('/api/checkout', {
  method: 'POST',
  body: JSON.stringify({
    priceId: 'price_xxx', // from products table
    ruptureDate: '2025-01-15', // user input
  })
});
// Redirect to Stripe Checkout
```



### 2. Checkout Session (API Route)

```typescript
// apps/guide/src/routes/api/checkout.ts
// Create Stripe checkout session with metadata
const session = await stripe.checkout.sessions.create({
  line_items: [{ price: priceId, quantity: 1 }],
  mode: 'payment',
  metadata: {
    rupture_date: ruptureDate, // store for webhook
  },
  success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/purchase`,
});
```



### 3. Webhook Handler (Supabase Edge Function)

```typescript
// services/thetis/supabase/functions/stripe-webhook/index.ts
// Handles: checkout.session.completed, payment_intent.succeeded

// On successful payment:
// 1. Verify webhook signature
// 2. Check idempotency (stripe_webhook_events table)
// 3. Create/update user with rupture_date
// 4. Create enrollment record
// 5. Queue emails based on rupture_date
```



### 4. Post-Payment (Client)

```typescript
// After redirect, verify enrollment
// Query enrollments table to confirm access
// Redirect to dashboard
```



## File Structure

```javascript
services/thetis/
└── supabase/
    ├── config.toml
    ├── migrations/
    │   ├── 001_users_products.sql
    │   ├── 002_enrollments.sql
    │   ├── 003_course_sections.sql
    │   ├── 004_user_progress.sql
    │   ├── 005_email_queue.sql
    │   └── 006_stripe_webhooks.sql
    ├── functions/
    │   └── stripe-webhook/
    │       └── index.ts          # Webhook handler
    └── seed.sql                  # 30 sections + products

apps/guide/
├── src/
│   ├── routes/
│   │   ├── index.tsx            # Landing/purchase
│   │   ├── dashboard.tsx        # User progress
│   │   ├── course/
│   │   │   └── $slug.tsx        # Section pages
│   │   └── api/
│   │       ├── checkout.ts      # Create Stripe session
│   │       └── verify.ts        # Verify enrollment
│   ├── content/
│   │   └── course/
│   │       └── essentials/
│   │           ├── 01-emergency-care.md
│   │           └── ... (30 total)
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── stripe.ts            # Stripe client
│   │   ├── course.ts            # Week calc, section logic
│   │   └── enrollment.ts       # Check access
│   └── components/
│       ├── PurchaseForm.tsx     # Rupture date + Stripe checkout
│       ├── CourseProgress.tsx
│       └── SectionCard.tsx
└── package.json
```



## Course Sections (30 Total)

**Week 0-1**: 4 sections (Days 0, 1, 3, 7)

**Weeks 1-3**: 4 sections (Days 10, 14, 18, 21)

**Weeks 4-6**: 4 sections (Days 28, 35, 42, 49)

**Weeks 7-9**: 3 sections (Days 56, 63, 70)

**Weeks 10-12**: 5 sections (Days 70, 77, 84, 91, 98)

**Weeks 13-25**: 7 sections (Days 105, 120, 140, 160, 180, 200, 220)

**Week 26+**: 4 sections (Days 182, 210, 240, 270)**Total: 31 emails over ~9 months** (can adjust to 20-30 range)

## Key Functions

### Week Calculation

```typescript
export function getRecoveryWeek(ruptureDate: Date): number {
  return Math.floor((Date.now() - ruptureDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
}

export function getRecoveryDay(ruptureDate: Date): number {
  return Math.floor((Date.now() - ruptureDate.getTime()) / (1000 * 60 * 60 * 24)) % 7;
}
```



### Section Availability

```typescript
// Show sections where target_week <= current_week
// AND (target_day is null OR target_day <= current_day)
function getAvailableSections(user: User, sections: Section[]) {
  const week = getRecoveryWeek(user.rupture_date);
  const day = getRecoveryDay(user.rupture_date);
  return sections.filter(s => 
    s.target_week < week || 
    (s.target_week === week && (!s.target_day || s.target_day <= day))
  );
}
```



### Email Queueing (Webhook)

```typescript
// After payment, calculate email schedule
function queueEmails(userId: string, ruptureDate: Date) {
  const sections = await getSectionsForProduct('essentials');
  const emails = sections.map(section => ({
    user_id: userId,
    section_id: section.id,
    scheduled_for: addDays(ruptureDate, section.days_after_rupture),
    status: 'pending'
  }));
  await insertEmailQueue(emails);
}
```



## Implementation Steps

1. **Setup**: Create `apps/guide/` and `services/thetis/supabase/`
2. **Database**: Run migrations, seed 30 sections + products
3. **Stripe**: Create products in Stripe, add price IDs to database
4. **Checkout**: Build purchase flow with rupture date input
5. **Webhook**: Create Supabase Edge Function for Stripe events
6. **Content**: Create 30 markdown section files
7. **UI**: Build dashboard, section pages, progress tracking
8. **Email**: Set up Trigger.dev job for email sending (future)

## Environment Variables

```javascript
# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Supabase
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  # For webhook
```



## Security Notes

- Webhook signature verification (Stripe)
- Idempotency checks (stripe_webhook_events table)
- RLS policies on all user data
- Rupture date stored securely, not in URL params