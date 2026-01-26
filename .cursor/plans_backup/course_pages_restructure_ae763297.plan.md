---
name: Course Pages Restructure
overview: "Restructure courses section with three pages: Email (free signup with 7-phase preview), Essentials (overview + guide link), and Professional (premium waitlist). Each recovery-phase article page gets CourseCTA and EmailCTA components. FAQs remain separate as topic-based content."
todos:
  - id: email-page
    content: Create /courses/email.astro - email signup landing with 7-phase preview
    status: pending
  - id: email-cta
    content: Create EmailCTA.astro component for use across site
    status: pending
  - id: courses-index
    content: Update courses.astro with 3-card layout (Email, Essentials, Pro)
    status: pending
  - id: essentials-update
    content: Update essentials.astro to add EmailCTA fallback
    status: pending
  - id: professional-page
    content: Create/update professional.astro with waitlist
    status: pending
  - id: phase-routes
    content: Add recoveryPhaseRoutes and email route to routes.tsx
    status: pending
  - id: phase-pages
    content: Create recovery-guide/[slug].astro + index.astro for 7 articles
    status: pending
  - id: update-nav
    content: Update footer/nav with recovery-guide and courses links
    status: pending
---

# Course Pages and Content Restructure

## Content Architecture

```mermaid
flowchart TD
    subgraph faqs [FAQs - Topic Based]
        FAQ1["Is My Achilles Ruptured?"]
        FAQ2["Torn Achilles Recovery"]
        FAQ3["Life After Achilles Rupture"]
        FAQ4["Achilles Tear Treatment"]
        FAQ5["What Happens If Ruptured?"]
        FAQ6["Achilles Rupture Timeline"]
    end
    
    subgraph courses [Courses - Paid/Email]
        CoursesIndex["/courses - hub"]
        Email["/courses/email - FREE signup"]
        Essentials["/courses/essentials - overview"]
        Professional["/courses/professional - premium"]
    end
    
    subgraph phases [Recovery Phases - Timeline Based]
        Phase1["Week 0-1: First Week"]
        Phase2["Weeks 1-3: Treatment Decision"]
        Phase3["Weeks 4-6: Progressive Recovery"]
        Phase4["Weeks 7-9: Final Boot Phase"]
        Phase5["Weeks 10-12: Boot Transition"]
        Phase6["Weeks 13-25: Strengthening"]
        Phase7["Week 26+: Return to Sport"]
    end
    
    Email --> Phase1
    Email --> Phase2
    Email --> Phase3
    Email --> Phase4
    Email --> Phase5
    Email --> Phase6
    Email --> Phase7
    
    Phase1 --> Email
    Phase1 --> Essentials
```

**Key distinction:**

- **FAQs** = Topic-based questions (diagnosis, treatment, recovery concepts)
- **Recovery Phases** = Timeline-based articles (what happens each week - email content)
- **Courses** = Paid/signup products (Essentials, Professional, Email)

## File Changes

### 1. Create Email Course Signup Page

Create [`apps/website/src/pages/courses/email.astro`](apps/website/src/pages/courses/email.astro):

- Hero: "Free Recovery Guide" with explanation of what you get
- Email + rupture date signup form
- Preview of 7 recovery phases with links
- What you'll receive: weekly tips, phase-specific guidance
- CTAs: Upgrade to Essentials, Shop Splint

### 2. Update Courses Index

Update [`apps/website/src/mains/courses.astro`](apps/website/src/mains/courses.astro):

- Three-card layout: Email (Free), Essentials (Paid), Professional (Premium)
- Clear value proposition for each
- Links to respective detail pages

### 3. Update Essentials Page

Update [`apps/website/src/pages/courses/essentials.astro`](apps/website/src/pages/courses/essentials.astro):

- Keep current content (overview of 31 lessons)
- Primary CTA: Link to guide.thetismedical.com/essentials
- Add email signup CTA for those not ready to commit
- Keep splint mentions

### 4. Update Professional Page

Update/create [`apps/website/src/pages/courses/professional.astro`](apps/website/src/pages/courses/professional.astro):

- Premium features (video lessons, expert access)
- "Coming Soon" or waitlist signup
- Comparison vs Essentials
- Fallback CTA: Start with Essentials

### 5. Create Recovery Phase Article Pages

Create 7 article pages under `/recovery-guide/`:

- `/recovery-guide/week-0-1` (renders existing .md content)
- `/recovery-guide/weeks-1-3`
- `/recovery-guide/weeks-4-6`
- `/recovery-guide/weeks-7-9`
- `/recovery-guide/weeks-10-12`
- `/recovery-guide/weeks-13-25`
- `/recovery-guide/week-26-plus`

Each page includes:

- Article content from markdown
- `CourseCTA` component (Essentials + Professional)
- Email signup CTA block
- Links to adjacent phases (prev/next)

### 6. Add Routes for Recovery Phases

Update [`apps/website/src/content/routes.tsx`](apps/website/src/content/routes.tsx):

- Add `recoveryPhaseRoutes` array with 7 phase routes
- Add `/courses/email` route
- Add helper `getRecoveryPhaseRoutesByLanguage()`

### 7. Create EmailCTA Component

Create [`apps/website/src/components/CTA/EmailCTA.astro`](apps/website/src/components/CTA/EmailCTA.astro):

- Compact email signup form
- "Get weekly recovery tips" messaging
- Used on phase articles and throughout site

### 8. Update Navigation

Update footer and nav to include:

- Link to /courses (hub page)
- Link to /recovery-guide (phase articles hub)

## Conversion Funnel

```mermaid
flowchart LR
    SEO["SEO Traffic"] --> FAQs["FAQ Pages"]
    SEO --> Phases["Phase Articles"]
    
    FAQs --> EmailCTA["Email Signup"]
    Phases --> EmailCTA
    
    EmailCTA --> Essentials["Essentials Course"]
    Essentials --> Professional["Professional Course"]
    
    FAQs --> Splint["Buy Splint"]
    Phases --> Splint
    EmailCTA --> Splint
    Essentials --> Splint
```



## Summary of New/Updated Files

| File | Action | Description ||------|--------|-------------|| `pages/courses/email.astro` | Create | Email signup landing page || `pages/courses/professional.astro` | Create/Update | Professional course page || `mains/courses.astro` | Update | 3-card hub layout || `pages/courses/essentials.astro` | Update | Add email CTA || `pages/recovery-guide/[slug].astro` | Create | Dynamic route for 7 phase articles || `pages/recovery-guide/index.astro` | Create | Hub page for all phases |