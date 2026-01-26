---
name: Achilles Recovery Course Platform (Updated)
overview: Create a TanStack Router-based course platform at guide.thetismedical.com with separate Supabase projects (services/thetis), breaking down 7 recovery articles into ~30 comprehensive sections. Content matches between email and web pages. Email timing is adaptive based on rupture date (more frequent early, spreading out over time). UI updates dynamically based on user's current recovery week.
todos:
  - id: reorganize-supabase
    content: Move ship-stock supabase to services/ship-stock/ and create services/thetis/supabase/ structure
    status: pending
  - id: setup-guide-app
    content: Create apps/guide/ TanStack Router app with basic routing structure
    status: pending
  - id: create-migrations
    content: Create Supabase migrations for users, sections, progress, and email_queue in services/thetis/supabase/migrations/
    status: pending
    dependencies:
      - reorganize-supabase
  - id: extract-30-sections
    content: Break down 7 articles into 30 comprehensive sections and create markdown files
    status: pending
  - id: seed-sections
    content: Create seed.sql with all 30 sections including target_week, target_day, and days_after_rupture metadata
    status: pending
    dependencies:
      - create-migrations
      - extract-30-sections
  - id: week-calculation
    content: Implement week and day calculation functions based on rupture date
    status: pending
    dependencies:
      - setup-guide-app
  - id: enrollment-form
    content: Build enrollment form with rupture date input and user creation
    status: pending
    dependencies:
      - setup-guide-app
      - create-migrations
  - id: section-pages
    content: Create TanStack Router routes and pages for all 30 sections with markdown rendering
    status: pending
    dependencies:
      - setup-guide-app
      - extract-30-sections
  - id: dynamic-visibility
    content: Implement section visibility logic based on user current week/day
    status: pending
    dependencies:
      - week-calculation
      - section-pages
  - id: progress-dashboard
    content: Build user dashboard showing current week, progress, and next section
    status: pending
    dependencies:
      - enrollment-form
      - dynamic-visibility
---

# Achilles Recovery Course Platform - Updated Plan

## Framework Decision: TanStack Router vs Start

**Recommendation: TanStack Router** (which you've used successfully)

**Why Router over Start:**
- You already have experience with Router in ship-stock and settle-central
- Course platform is primarily client-side with auth-protected content (SEO less critical)
- Router provides excellent type-safe routing and works well with React Query
- Start adds SSR/streaming complexity that may not be needed for a paid course behind auth
- Simpler deployment and development workflow

**Use Start if:** You need SSR for SEO on public landing pages or want server functions for complex server-side logic. For a paid course, Router should suffice.

## Architecture Changes

### 1. Supabase Organization
**New Structure:**
```
services/
├── ship-stock/
│   └── supabase/          # Existing ship-stock Supabase project
│       ├── migrations/
│       └── config.toml
└── thetis/
    └── supabase/           # New thetis/guide Supabase project
        ├── migrations/
        └── config.toml
```

**Rationale:** 
- Clear separation between business units
- `services/` better reflects these are separate services/applications
- Each has independent Supabase instance
- Follows microservices-like organization

### 2. App Structure
```
apps/guide/                 # TanStack Router app
├── src/
│   ├── routes/            # TanStack Router routes
│   ├── content/
│   │   └── course/
│   │       └── essentials/  # 30 sections (matching email content)
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── course.ts      # Week calculation, section logic
│   └── components/
└── package.json
```

## Content Structure: 30 Comprehensive Sections

Based on analyzing the 7 articles, here are the natural breakpoints for a comprehensive paid course:

### Week 0-1 (4 sections - more frequent early)
1. **Emergency Care & Initial Assessment** (Day 0-1)
   - What happened, A&E process, pain management
2. **Blood Clot Prevention** (Day 1-2)
   - Critical DVT/PE information, medications, warning signs
3. **Week 1 Survival Guide** (Day 2-7)
   - Elevation, ice, sleep, home setup, practical tips
4. **Preparing for Treatment Decision** (Day 7+)
   - What to expect at specialist, questions to ask

### Weeks 1-3 (4 sections)
5. **Treatment Decision: Surgery vs Non-Surgical** (Week 1-2)
   - UKSTAR trial, risks/benefits, decision factors
6. **Your Walking Boot** (Week 2)
   - Aircast vs VACOped, fitting, wedges, 24/7 protection
7. **Living with Your Boot** (Week 2-3)
   - Walking, weight-bearing, crutches, daily life
8. **Sleep Solutions & Night Splint** (Week 2-3)
   - Boot sleeping challenges, night splint transition

### Weeks 4-6 (4 sections)
9. **Understanding Healing: Proliferative Phase** (Week 4)
   - What's happening inside, tendon length importance
10. **Wedge Removal Protocol** (Week 4-6)
    - Schedule, angles, what to expect
11. **Walking Progress & Gait** (Week 4-6)
    - Full weight-bearing, EVENup, improving gait
12. **Night Splint & Common Challenges** (Week 4-6)
    - Transition to night splint, swelling, skin care

### Weeks 7-9 (3 sections)
13. **Remodelling Phase & Final Boot Weeks** (Week 7-9)
    - Tendon strength, final wedges, monitoring
14. **Pre-Physiotherapy Preparation** (Week 8-9)
    - Finding physio, setting expectations, gentle exercises
15. **Practical Life: Work, Driving, Social** (Week 7-9)
    - Returning to work, driving guidelines, activities

### Weeks 10-12 (5 sections - critical transition)
16. **Transitioning Out of the Boot** (Week 10)
    - Boot weaning, first steps in shoes, footwear selection
17. **Starting Physiotherapy** (Week 10-11)
    - First session, goals, consistency importance
18. **The 7 Essential Exercises** (Week 10-12)
    - Detailed exercise guide with progressions
19. **Re-Learning to Walk Properly** (Week 10-12)
    - Heel-to-toe pattern, correcting limp, gait training
20. **Managing Post-Boot Challenges** (Week 10-12)
    - Stiffness, swelling, tightness (don't stretch!)

### Weeks 13-25 (7 sections - longest phase)
21. **Progressive Strengthening** (Week 13-16)
    - Single-leg heel raises, eccentric drops, resistance training
22. **Building Cardio Safely** (Week 13-20)
    - Swimming, cycling, elliptical, walking as exercise
23. **Functional Milestones** (Week 13-25)
    - 25+ heel raises, balance, stairs, pain-free walking
24. **Returning to Normal Life** (Week 13-25)
    - Work, driving, household tasks, relationships
25. **Nutrition for Tendon Health** (Week 13-25)
    - Protein, collagen, vitamins, hydration
26. **Common Setbacks & Mental Health** (Week 13-25)
    - Plateaus, flare-ups, kinesiophobia, coping strategies
27. **Advanced Exercises & Progressions** (Week 20-25)
    - Balance work, plyometric prep, sport-specific prep

### Week 26+ (4 sections)
28. **Return-to-Sport Criteria** (Week 26+)
    - Tests, psychological readiness, sport-specific goals
29. **Starting to Run Again** (Week 26+)
    - Walk-jog progression, technique, surface selection
30. **Plyometrics & Long-Term Recovery** (Week 26+)
    - Jump training, preventing re-rupture, life after ATR

**Total: 30 sections** - Comprehensive, well-paced, matches natural learning progression

## Email Course Timing Logic

### Adaptive Email Schedule (NOT weekly)

**Early Phase (Weeks 0-3): More Frequent**
- Week 0-1: 4 emails (every 1-2 days)
- Week 1-3: 4 emails (every 3-4 days)
- **Total: 8 emails in first 3 weeks**

**Middle Phase (Weeks 4-12): Moderate Frequency**
- Week 4-6: 4 emails (every 5-6 days)
- Week 7-9: 3 emails (every 7 days)
- Week 10-12: 5 emails (every 4-5 days)
- **Total: 12 emails in weeks 4-12**

**Later Phase (Weeks 13-26+): Less Frequent**
- Week 13-25: 7 emails (every 10-14 days)
- Week 26+: 4 emails (every 2-3 weeks)
- **Total: 11 emails in weeks 13+**

**Grand Total: ~31 emails over 6+ months** (can be adjusted to 20-30 range)

### Email Timing Calculation

```typescript
// Pseudo-code for email scheduling
function calculateEmailSchedule(ruptureDate: Date) {
  const daysSinceRupture = (today - ruptureDate) / (1000 * 60 * 60 * 24);
  const currentWeek = Math.floor(daysSinceRupture / 7);
  
  // If user enrolls at week 4, start emails from week 4
  // Each email has a targetWeek property
  // Queue emails where targetWeek >= currentWeek
  
  const emailSchedule = [
    { section: 1, targetWeek: 0, targetDay: 0 },   // Day 0
    { section: 2, targetWeek: 0, targetDay: 1 },   // Day 1
    { section: 3, targetWeek: 0, targetDay: 3 },   // Day 3
    { section: 4, targetWeek: 1, targetDay: 7 },    // Day 7
    // ... continues with adaptive spacing
  ];
  
  return emailSchedule.filter(e => 
    e.targetWeek >= currentWeek || 
    (e.targetWeek === currentWeek && e.targetDay >= daysSinceRupture % 7)
  );
}
```

## Database Schema Updates

### Key Tables

1. **users**
   - `rupture_date` (date) - User's actual rupture date
   - `enrollment_date` (timestamp) - When they signed up
   - `current_week` (integer, computed) - Calculated from rupture_date
   - `email_course_enabled` (boolean)

2. **course_sections**
   - `id`, `slug`, `title`, `content`
   - `target_week` (integer) - Which week this section targets
   - `target_day` (integer, nullable) - Specific day in week (0-6)
   - `email_number` (integer) - Which email this is (1-31)
   - `days_after_rupture` (integer) - Exact day to send (0, 1, 3, 7, etc.)

3. **user_progress**
   - Tracks which sections user has viewed/completed
   - `last_accessed_at` for "continue where you left off"

4. **email_queue**
   - `scheduled_for` (timestamp) - Calculated: rupture_date + days_after_rupture
   - `status`: 'pending', 'sent', 'failed'
   - If user enrolls at week 4, only queue emails from week 4 onwards

## UI Personalization Based on Rupture Date

### Dynamic Content Display

```typescript
// Example logic
function getAvailableSections(user: User) {
  const currentWeek = calculateWeek(user.rupture_date);
  const currentDay = calculateDay(user.rupture_date);
  
  return sections.filter(section => {
    // Show sections for current week and previous weeks
    if (section.target_week < currentWeek) return true;
    if (section.target_week === currentWeek) {
      return section.target_day <= currentDay;
    }
    return false; // Don't show future sections
  });
}
```

### UI Features
- **Progress Dashboard**: Shows "You're in Week X" based on rupture date
- **Next Section**: Highlights what's relevant now
- **Completed Sections**: Visual progress indicator
- **Time-Based Unlocking**: Sections unlock as user progresses through weeks
- **"Continue Learning"**: Button takes to most relevant section for current week

## File Structure

```
services/thetis/
└── supabase/
    ├── config.toml
    ├── migrations/
    │   ├── 20250120000001_users_enrollments.sql
    │   ├── 20250120000002_course_sections.sql
    │   ├── 20250120000003_user_progress.sql
    │   └── 20250120000004_email_queue.sql
    └── seed.sql                    # Seed 30 sections with timing data

apps/guide/
├── src/
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx              # Landing/enrollment
│   │   ├── dashboard.tsx          # User progress
│   │   └── course/
│   │       └── $sectionSlug.tsx   # Individual section pages
│   ├── content/
│   │   └── course/
│   │       └── essentials/
│   │           ├── 01-emergency-care.md
│   │           ├── 02-blood-clot-prevention.md
│   │           ├── ... (30 total)
│   │           └── 30-plyometrics-long-term.md
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── course.ts              # Week calculation, section logic
│   │   └── email.ts               # Email scheduling (future)
│   └── components/
│       ├── CourseProgress.tsx
│       ├── SectionCard.tsx
│       ├── WeekIndicator.tsx      # "You're in Week X"
│       └── EnrollmentForm.tsx
├── package.json
└── vite.config.ts                 # TanStack Router plugin
```

## Implementation Priority

### Phase 1: Foundation
1. Create `services/thetis/supabase/` structure
2. Create `apps/guide/` TanStack Router app
3. Set up Supabase migrations
4. Extract and structure 30 sections from articles

### Phase 2: Content & Structure
1. Create markdown files for all 30 sections
2. Seed database with section metadata (target_week, target_day)
3. Build section pages with markdown rendering
4. Implement week calculation logic

### Phase 3: Personalization
1. Build enrollment form (rupture date input)
2. Implement dynamic section visibility
3. Create progress dashboard
4. Add "continue learning" functionality

### Phase 4: Email (Future)
1. Email templates (matching section content)
2. Email scheduling logic based on rupture date
3. Trigger.dev job for sending
4. Email queue management

## Key Implementation Details

### Week Calculation
```typescript
export function calculateRecoveryWeek(ruptureDate: Date): number {
  const daysSinceRupture = Math.floor(
    (Date.now() - ruptureDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.floor(daysSinceRupture / 7);
}

export function calculateRecoveryDay(ruptureDate: Date): number {
  const daysSinceRupture = Math.floor(
    (Date.now() - ruptureDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysSinceRupture % 7;
}
```

### Section Availability Logic
- Show all sections up to current week
- Show current week sections up to current day
- Hide future sections (or show as "coming soon")
- Allow users to review past sections anytime

## Questions Resolved

1. ✅ **Framework**: TanStack Router (you have experience)
2. ✅ **Structure**: `services/thetis/` for Supabase
3. ✅ **Sections**: 30 comprehensive sections (analyzed from articles)
4. ✅ **Email Timing**: Adaptive, not weekly - more frequent early, spreads out
5. ✅ **UI Updates**: Dynamic based on rupture date calculation

## Next Steps

1. Confirm TanStack Router choice (or switch to Start if you prefer)
2. Begin creating the 30 section markdown files
3. Set up Supabase project structure
4. Build enrollment flow with rupture date