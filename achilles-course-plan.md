# Achilles Recovery Course - Implementation Plan

## Quick Reference

**App**: `apps/guide/` (TanStack Router)  
**Database**: `services/thetis/supabase/` (separate Supabase project)  
**Payments**: Stripe  
**Deployment**: `guide.thetismedical.com` subdomain  
**URL Structure**: `/essentials/week/{week}/day/{day}`

## Course Sections (31 Total)

Each section has a unique `days_after_rupture` value calculated as `week * 7 + day`.

**Week 0-1**: 5 sections (Days 0, 1, 3, 7, 10)  
**Weeks 2-3**: 3 sections (Days 14, 18, 21)  
**Weeks 4-7**: 4 sections (Days 28, 35, 42, 49)  
**Weeks 8-10**: 4 sections (Days 56, 63, 70, 74)  
**Weeks 11-14**: 4 sections (Days 77, 84, 91, 98)  
**Weeks 15-26**: 6 sections (Days 105, 120, 140, 160, 180, 184)  
**Week 26+**: 5 sections (Days 200, 210, 220, 240, 270)

---

# Implementation Stages

## Stage 1: Web App Essentials Pages (Static Content)

**Goal**: Build static pages with all 30 course sections. No auth or payments yet.

### 1. Setup guide app structure ✅ DONE

- [x] Create `apps/guide/` directory
- [x] Initialize TanStack Router project with Vite
- [x] Install `@thetis/ui` package dependency
- [x] Set up basic routing structure
- [ ] Configure build/deploy for `guide.thetismedical.com`

**Files created:**

- `apps/guide/package.json` - Dependencies including TanStack Router, @thetis/ui
- `apps/guide/vite.config.ts` - Vite config with TanStack Router plugin
- `apps/guide/tsconfig.json` - TypeScript config
- `apps/guide/tailwind.config.ts` - Extends @thetis/ui base config
- `apps/guide/index.html` - Entry HTML with DM Sans + Fraunces fonts
- `apps/guide/index.css` - Tailwind + custom prose styles
- `apps/guide/src/main.tsx` - React entry point
- `apps/guide/src/routes/__root.tsx` - Root layout with header/footer

### 2. Create content structure ✅ DONE (Architecture)

Created a **data-driven content system** instead of individual JSX components:

**Content Types** (`src/components/course/types.ts`):

- `text`, `heading`, `list`, `alert`, `faq`, `accordion`
- `checklist`, `dos-donts`, `quote`, `tip`, `table`, `card`, `section`

**Content Renderer** (`src/components/course/ContentRenderer.tsx`):

- Single component that renders any content block type
- Parses inline markdown (**bold**, *italic*)
- Uses @thetis/ui components (Card, Accordion, Alert, etc.)

**Section Data Files** (`src/content/course/essentials/*.tsx`):

```tsx
export const metadata = { slug, title, week, day, ... };
export const content: SectionContent = {
  intro: "...",
  blocks: [
    { type: "dos-donts", dos: [...], donts: [...] },
    { type: "faq", items: [...] },
    // etc.
  ]
};
```

### 3. Build static section pages ✅ DONE

- [x] Create route structure: `src/routes/essentials/week/$week/day/$day.tsx`
- [x] Implement dynamic import loader based on week/day
- [x] Build section page wrapper with navigation (prev/next)
- [x] Create section index/listing page at `/essentials`
- [x] Create home page at `/`

**Routes created:**

- `src/routes/index.tsx` - Home page with course overview
- `src/routes/essentials/index.tsx` - Section listing grouped by phase
- `src/routes/essentials/week/$week/day/$day.tsx` - Individual section pages

### 4. Section Configuration ✅ DONE

- [x] `src/content/course/sections.ts` - All 31 sections with metadata
- [x] Helper functions: `getSectionBySlug()`, `getSectionByWeekDay()`, `getNextSection()`, `getPrevSection()`

### 5. Content extraction - IN PROGRESS

- [x] Section 1: Week 0 Day 0 - Emergency Care (complete with content)
- [ ] Remaining 30 sections need content extracted from articles

**To run the app:**

```bash
cd apps/guide
bun install
bunx vite --port 2130
```

**✅ Stage 1 Partial**: App structure complete, 1 of 31 sections has content

---

## Stage 2: Supabase + Stripe Setup

**Goal**: Set up database and payment infrastructure. No web app integration yet.

### 6. Reorganize Supabase structure

- [ ] Move `packages/ship-stock/supabase/` → `services/ship-stock/supabase/`
- [ ] Create `services/thetis/supabase/` directory
- [ ] Initialize Supabase project in `services/thetis/supabase/`
- [ ] Create `config.toml` for thetis Supabase instance

### 7. Create database migrations

- [ ] Migration 001: Create `users` table
- [ ] Migration 002: Create `enrollments` table
- [ ] Migration 003: Create `user_progress` table
- [ ] Migration 004: Create `email_queue` table
- [ ] Migration 005: Create `stripe_webhook_events` table
- [ ] Add all indexes from schema
- [ ] Add RLS policies for all tables

### 8. Create section configuration

- [ ] Create `apps/guide/src/content/course/sections.ts` config file
- [ ] Define section metadata array:

  ```ts
  export const sections = [
    {
      slug: 'week-0-day-0-emergency-care',
      title: 'Emergency Care & Initial Assessment',
      week: 0,
      day: 0,
      days_after_rupture: 0,
      email_number: 1,
      course_type: 'essentials'
    },
    // ... all 30 sections
  ];
  ```

- [ ] Export helper functions: `getSectionBySlug()`, `getSectionsByCourseType()`
- [ ] No database seeding needed - sections live in codebase

### 9. Stripe setup

- [ ] Create Stripe account/products (if not exists)
- [ ] Create "Essentials Course" product in Stripe Dashboard
- [ ] Get Stripe Price ID
- [ ] Store Stripe Price ID in environment variable or config file
- [ ] Set up Stripe webhook endpoint URL (for later)

### 10. Supabase Edge Function for webhook

- [ ] Create `services/thetis/supabase/functions/stripe-webhook/` directory
- [ ] Create `index.ts` with basic webhook handler structure
- [ ] Add webhook signature verification skeleton
- [ ] Deploy function to Supabase (test endpoint)

**✅ Stage 2 Complete**: Database ready, Stripe configured, webhook endpoint created

---

## Database Schema

**Architecture Note**: Course sections are TSX components in the codebase, not stored in the database. Section metadata (week, day, timing) lives in `sections.ts` config file. The database only stores user-specific data (enrollments, progress, email queue).

Reference for Stage 2 migrations:

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  rupture_date DATE NOT NULL,
  enrollment_date TIMESTAMPTZ DEFAULT NOW(),
  email_course_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments (created after successful payment)
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  course_type TEXT NOT NULL, -- 'essentials', 'pro'
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  stripe_price_id TEXT, -- Reference to Stripe price (for records)
  status TEXT NOT NULL DEFAULT 'active',
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  section_slug TEXT NOT NULL, -- e.g., 'week-0-day-0-emergency-care'
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, section_slug)
);

-- Email Queue
CREATE TABLE public.email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  section_slug TEXT NOT NULL, -- e.g., 'week-0-day-0-emergency-care'
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending',
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

-- Indexes
CREATE INDEX idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX idx_enrollments_stripe_session ON public.enrollments(stripe_checkout_session_id);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_section ON public.user_progress(user_id, section_slug);
CREATE INDEX idx_email_queue_scheduled ON public.email_queue(scheduled_for, status);
CREATE INDEX idx_email_queue_user ON public.email_queue(user_id, status);

-- RLS Policies
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

---

## Stage 3: Web App Auth & Timing Functionality

**Goal**: Add authentication and personalization. Users can set rupture date and see relevant sections.

### 11. Supabase client setup

- [ ] Install Supabase client in `apps/guide/`
- [ ] Create `src/lib/supabase.ts` with client initialization
- [ ] Set up environment variables for Supabase

### 12. Authentication flow

- [ ] Create sign up page (`/signup`)
- [ ] Create sign in page (`/signin`)
- [ ] Implement Supabase Auth sign up/sign in
- [ ] Add auth state management (context/hooks)
- [ ] Create protected route wrapper

### 13. User profile and rupture date

- [ ] Create user profile page
- [ ] Add form to capture rupture date
- [ ] Create API route to update user rupture_date
- [ ] Store rupture_date in `users` table

### 14. Week/day calculation functions

- [ ] Create `src/lib/course.ts`
- [ ] Implement `getRecoveryWeek(ruptureDate: Date): number`
- [ ] Implement `getRecoveryDay(ruptureDate: Date): number`
- [ ] Implement `getDaysSinceRupture(ruptureDate: Date): number`

### 15. Section availability logic

- [ ] Import section config from `sections.ts`
- [ ] Create `getAvailableSections(user, sections)` function
- [ ] Filter sections based on current week/day
- [ ] Hide future sections (or show as "coming soon")
- [ ] Update section listing page to show only available sections

### 16. Progress tracking

- [ ] Create `user_progress` table queries (get, create, update)
  - Use section_slug instead of section_id
- [ ] Mark section as viewed when user visits page
- [ ] Add "Mark as complete" functionality
- [ ] Update progress on section page load

### 17. Dashboard page

- [ ] Create `/dashboard` route
- [ ] Display current recovery week/day
- [ ] Show progress overview (X of 30 sections completed)
- [ ] List available sections
- [ ] Add "Continue Learning" button (next unread section)
- [ ] Show completion percentage

### 18. Update section pages with timing

- [ ] Add week/day indicator to section pages
- [ ] Show "You're viewing content for Week X, Day Y"
- [ ] Gate sections: redirect if user tries to access future section
- [ ] Add progress indicator (completed/not completed)

**✅ Stage 3 Complete**: Users can authenticate, set rupture date, and see personalized content

---

## Stage 4: Stripe Payment Integration

**Goal**: Add payment flow. Users can purchase course and get enrolled.

### 19. Stripe client setup

- [ ] Install Stripe SDK in `apps/guide/`
- [ ] Create `src/lib/stripe.ts` with Stripe client
- [ ] Set up environment variables for Stripe

### 20. Purchase flow

- [ ] Create `/purchase` page
- [ ] Build `PurchaseForm` component with:
  - Rupture date input (date picker)
  - Course selection (Essentials)
  - Price display (fetch from Stripe or hardcode)
  - "Buy Now" button
- [ ] Create API route `/api/checkout` to create Stripe session
  - Use Stripe Price ID from environment/config
  - Add rupture_date to Stripe checkout metadata
- [ ] Handle Stripe Checkout redirect

### 21. Post-payment verification

- [ ] Create `/dashboard?session_id=xxx` handler
- [ ] Verify Stripe session was successful
- [ ] Query `enrollments` table to confirm access
- [ ] Redirect to dashboard if enrolled, show error if not

### 22. Enrollment gating

- [ ] Create `src/lib/enrollment.ts` with `hasAccess(userId, courseType)` function
  - Query `enrollments` table for active enrollment
- [ ] Add enrollment check to section pages
- [ ] Show "Purchase to access" message if not enrolled
- [ ] Redirect to purchase page if accessing without enrollment

### 23. Webhook handler implementation

- [ ] Complete webhook signature verification
- [ ] Implement idempotency check (stripe_webhook_events table)
- [ ] Handle `checkout.session.completed` event:
  - Extract rupture_date from metadata
  - Create/update user with rupture_date
  - Create enrollment record (course_type from Stripe product metadata or config)
  - Log webhook event
- [ ] Test webhook with Stripe CLI locally
- [ ] Deploy webhook function to production

**✅ Stage 4 Complete**: Users can purchase course, payments processed, enrollments created

---

## Stage 5: Email Templates & Content

**Goal**: Create email templates that match section content. No sending yet.

### 24. Email package setup

- [ ] Create `packages/guide-email/` or use existing `packages/email/`
- [ ] Set up Resend client
- [ ] Create email template components (matching section content)

### 25. Email templates

- [ ] Create base email template (header, footer, Thetis branding)
- [ ] Create section email template that:
  - Renders TSX component content as HTML
  - Converts React components to email-safe HTML
  - Uses email-compatible styling
- [ ] Add "View in Course" button linking to section page
- [ ] Add unsubscribe link
- [ ] Style emails to match website design

### 26. Email content matching

- [ ] Ensure email content exactly matches section TSX component content
- [ ] Create utility to convert TSX component to email HTML
- [ ] Handle @thetis/ui components in email context (simplified versions)
- [ ] Test email rendering in Resend preview

**✅ Stage 5 Complete**: Email templates ready, content matches sections

---

## Stage 6: Email Timing & Sending

**Goal**: Automate email sending based on rupture date and schedule.

### 27. Email queueing logic (webhook)

- [ ] In webhook handler, after creating enrollment:
  - Import section config from codebase (sections.ts)
  - Filter sections for course_type
  - Calculate `scheduled_for` = rupture_date + days_after_rupture
  - Insert into `email_queue` table with section_slug
- [ ] Handle case where user enrolls mid-course (only queue future emails)

### 28. Trigger.dev job setup

- [ ] Create Trigger.dev job in `packages/jobs/trigger/`
- [ ] Job: "Send Course Emails"
- [ ] Query `email_queue` for emails where:
  - `status = 'pending'`
  - `scheduled_for <= NOW()`
- [ ] Process each email:
  - Use section_slug to import TSX component from codebase
  - Convert component to email HTML
  - Render email template
  - Send via Resend
  - Update `email_queue` status to 'sent'
  - Handle failures (update to 'failed', log error)

### 29. Email scheduling logic

- [ ] Calculate which emails to send based on rupture_date
- [ ] If user enrolls at week 4, only queue emails from day 28 onwards
- [ ] Skip past emails (don't send retroactively)
- [ ] Test email queueing with various rupture dates

### 30. Email sending automation

- [ ] Schedule Trigger.dev job to run every hour (or appropriate frequency)
- [ ] Add retry logic for failed emails
- [ ] Add email sending logs/analytics
- [ ] Test end-to-end: purchase → webhook → queue → send

### 31. Email preferences

- [ ] Add toggle in dashboard to enable/disable email course
- [ ] Update `users.email_course_enabled` field
- [ ] Respect preference when queueing/sending emails

**✅ Stage 6 Complete**: Emails automatically sent based on rupture date schedule

---

## Final Steps

### 32. Testing

- [ ] Test all routes work correctly
- [ ] Test authentication flow
- [ ] Test purchase flow end-to-end
- [ ] Test section gating (enrollment + timing)
- [ ] Test email queueing and sending
- [ ] Test with various rupture dates (past, present, future)

### 33. Deployment

- [ ] Set up Vercel project for `guide.thetismedical.com`
- [ ] Configure environment variables
- [ ] Set up Supabase production instance
- [ ] Configure Stripe webhook URL (production)
- [ ] Deploy and test production

### 34. Documentation

- [ ] Document environment variables needed
- [ ] Document Stripe webhook setup
- [ ] Document how to add new sections
- [ ] Document email sending process

---

## Environment Variables

```
# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Supabase
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  # For webhook
```
