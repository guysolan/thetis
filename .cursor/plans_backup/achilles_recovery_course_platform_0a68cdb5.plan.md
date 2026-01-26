---
name: Achilles Recovery Course Platform
overview: Create a subdomain-based course platform (guide.thetismedical.com) with a separate Supabase instance, breaking down the 7 recovery phase articles into 20-30 bite-sized sections for an email course and web app experience. Users specify their rupture date to get personalized, time-based content delivery.
todos:
  - id: setup-app
    content: Create apps/guide/ Astro app with basic structure and routing
    status: pending
  - id: setup-supabase
    content: Create packages/guide/supabase/ with migrations for users, sections, progress, and email queue
    status: pending
  - id: extract-content
    content: Break down 7 recovery articles into 26 bite-sized sections and create markdown files
    status: pending
  - id: enrollment-flow
    content: Build enrollment form with rupture date input and user creation
    status: pending
    dependencies:
      - setup-app
      - setup-supabase
  - id: progress-tracking
    content: Implement user progress dashboard and section completion tracking
    status: pending
    dependencies:
      - setup-app
      - setup-supabase
      - extract-content
  - id: email-templates
    content: Create Resend email templates for course emails with section links
    status: pending
    dependencies:
      - extract-content
  - id: email-scheduler
    content: Set up Trigger.dev job to calculate and queue emails based on rupture date
    status: pending
    dependencies:
      - setup-supabase
      - email-templates
  - id: section-pages
    content: Build individual section pages with markdown rendering and navigation
    status: pending
    dependencies:
      - setup-app
      - extract-content
  - id: personalization-logic
    content: Implement week calculation and show/hide sections based on user progress week
    status: pending
    dependencies:
      - enrollment-flow
      - section-pages
  - id: deployment
    content: Configure Vercel deployment for guide.thetismedical.com subdomain
    status: pending
    dependencies:
      - setup-app
---

# Achilles Recovery Course Platform Architecture

## Overview

Create a new course platform at `guide.thetismedical.com` that delivers personalized recovery guidance based on the 7 recovery phase articles. The platform includes:
- **Email course**: 20 emails over 6 months via Resend
- **Web app**: Interactive course with 20-30 bite-sized sections
- **Personalization**: Users specify rupture date for time-based content delivery

## Architecture Decisions

### 1. App Structure
- **Location**: `apps/guide/` (new Astro app, similar to `apps/website/`)
- **Subdomain**: `guide.thetismedical.com` (separate deployment)
- **Framework**: Astro (consistent with existing website app)
- **Why**: Maintains consistency with existing stack, allows independent deployment

### 2. Supabase Organization
- **Location**: `packages/guide/supabase/` (following pattern from `packages/ship-stock/`)
- **Strategy**: Separate Supabase project (isolated database)
- **Migrations**: `packages/guide/supabase/migrations/`
- **Why**: Isolated data, independent scaling, follows existing monorepo pattern

### 3. Content Structure
Break the 7 articles into 20-30 sections:
- **Week 0-1**: 3 sections (Emergency care, Blood clots, Week 1 survival)
- **Weeks 1-3**: 3 sections (Treatment decision, Boot fitting, Living with boot)
- **Weeks 4-6**: 3 sections (Wedge removal, Walking progress, Night splint)
- **Weeks 7-9**: 3 sections (Final boot phase, Pre-physio prep, Monitoring)
- **Weeks 10-12**: 4 sections (Boot transition, Starting physio, Exercises, Walking)
- **Weeks 13-25**: 6 sections (Strengthening, Cardio, Milestones, Nutrition, Setbacks, Life)
- **Week 26+**: 4 sections (Return to sport, Running, Plyometrics, Long-term)

**Total: 26 sections** (can be adjusted to 20-30 range)

### 4. Email Course Delivery
- **Service**: Resend (already in use)
- **Package**: Use existing `packages/email/` or create `packages/guide-email/`
- **Scheduling**: Trigger.dev jobs (you have `packages/jobs/`)
- **Frequency**: ~1 email per week for 6 months (20 emails)

## File Structure

```
apps/guide/
├── src/
│   ├── content/
│   │   └── course/
│   │       ├── essentials/          # Email course sections
│   │       │   ├── week-0-1/
│   │       │   │   ├── emergency-care.md
│   │       │   │   ├── blood-clots.md
│   │   │   │   └── week-1-survival.md
│   │       │   ├── weeks-1-3/
│   │       │   └── ... (26 total sections)
│   │       └── pro/                 # Future video course
│   ├── pages/
│   │   ├── index.astro             # Course landing/signup
│   │   ├── dashboard.astro         # User progress dashboard
│   │   ├── course/
│   │   │   └── [section].astro     # Individual section pages
│   │   └── api/
│   │       └── enroll.ts            # Enrollment endpoint
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client
│   │   ├── course.ts               # Course logic
│   │   └── email.ts                # Email helpers
│   └── components/
│       ├── CourseProgress.tsx
│       ├── SectionCard.tsx
│       └── EnrollmentForm.tsx
├── astro.config.mjs
├── package.json
└── vercel.json

packages/guide/
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   │   ├── 20250120000001_users_enrollments.sql
│   │   ├── 20250120000002_course_sections.sql
│   │   ├── 20250120000003_user_progress.sql
│   │   └── 20250120000004_email_queue.sql
│   └── seed.sql
└── package.json

packages/guide-email/              # Optional: dedicated email package
├── src/
│   ├── templates/
│   │   └── course-email.tsx
│   └── sequences/
│       └── essentials-sequence.ts
└── package.json
```

## Database Schema

### Core Tables

1. **users** (extends Supabase auth.users)
   - `id` (uuid, FK to auth.users)
   - `rupture_date` (date)
   - `purchase_date` (timestamp)
   - `email_course_enabled` (boolean)
   - `created_at`, `updated_at`

2. **course_sections**
   - `id` (uuid)
   - `slug` (text, unique)
   - `title` (text)
   - `phase` (text: 'week-0-1', 'weeks-1-3', etc.)
   - `section_number` (integer)
   - `email_number` (integer, nullable - which email this goes in)
   - `content` (text or reference to markdown file)
   - `estimated_week` (integer - week of recovery)
   - `created_at`, `updated_at`

3. **user_progress**
   - `id` (uuid)
   - `user_id` (uuid, FK)
   - `section_id` (uuid, FK)
   - `completed_at` (timestamp, nullable)
   - `last_accessed_at` (timestamp)
   - `created_at`

4. **email_queue**
   - `id` (uuid)
   - `user_id` (uuid, FK)
   - `email_number` (integer)
   - `section_id` (uuid, FK)
   - `scheduled_for` (timestamp)
   - `sent_at` (timestamp, nullable)
   - `status` (enum: 'pending', 'sent', 'failed')
   - `created_at`

## Implementation Steps

### Phase 1: Setup & Content
1. Create `apps/guide/` Astro app
2. Create `packages/guide/supabase/` with migrations
3. Extract and structure content from 7 articles into 26 sections
4. Create markdown files for each section in `apps/guide/src/content/course/essentials/`

### Phase 2: Database & Auth
1. Set up Supabase project (separate instance)
2. Run migrations to create schema
3. Configure Supabase auth in guide app
4. Set up RLS policies for user data

### Phase 3: Enrollment & Personalization
1. Create enrollment form (rupture date input)
2. Calculate user's current week based on rupture date
3. Determine which sections/emails to show
4. Create user dashboard showing progress

### Phase 4: Email Course
1. Create email templates using Resend
2. Set up Trigger.dev job to send scheduled emails
3. Calculate email send dates based on rupture date
4. Queue emails when user enrolls

### Phase 5: Web App
1. Build section pages with markdown content
2. Create progress tracking UI
3. Implement "next section" logic based on user's week
4. Add completion tracking

## Key Features

### Time-Based Content Delivery
- User enters rupture date at enrollment
- System calculates current week: `(today - rupture_date) / 7`
- Shows sections relevant to current week ± buffer
- Email course sends emails at appropriate times

### Progress Tracking
- Mark sections as complete
- Visual progress indicator
- "Continue where you left off" functionality
- Email course progress synced with web app

### Email Course Logic
- On enrollment, calculate all 20 email send dates
- Queue emails in `email_queue` table
- Trigger.dev job runs daily, sends pending emails
- Each email links to corresponding section in web app

## Configuration

### Vercel Deployment
- New project: `guide.thetismedical.com`
- Environment variables:
  - `PUBLIC_SUPABASE_URL` (guide instance)
  - `PUBLIC_SUPABASE_ANON_KEY`
  - `RESEND_API_KEY`
  - `TRIGGER_API_KEY`

### Supabase Setup
- New Supabase project for guide
- Configure auth (email/password)
- Set up RLS policies
- Configure email templates (optional)

## Future Enhancements (Pro Course)
- `apps/guide/src/content/course/pro/` for video course
- Same structure, different content type
- Can reuse same database schema

## Questions to Resolve

1. **Payment integration**: Stripe? One-time or subscription?
2. **Content access**: Free preview vs. paid full access?
3. **Email frequency**: Exactly weekly or adaptive based on content?
4. **Section format**: Pure markdown or enhanced with interactive elements?