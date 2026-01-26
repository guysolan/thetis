---
name: Course Pages Restructure
overview: "Restructure the courses section to clearly differentiate three offerings: Free Email Course (signup + 7 recovery articles), Essentials (overview + link to guide app), and Professional (premium waitlist). Add navigation and CTAs throughout the site to guide patients toward email signup, course purchase, and splint purchase."
todos:
  - id: email-course-page
    content: Create /courses/email.astro with signup form and 7-article preview
    status: pending
  - id: essentials-page
    content: Update /courses/essentials.astro as overview + link to guide app
    status: pending
  - id: professional-page
    content: Update /courses/professional.astro with waitlist and comparison
    status: pending
  - id: courses-index
    content: Update courses.astro with 3-card layout (Email, Essentials, Pro)
    status: pending
  - id: recovery-guide-hub
    content: Create /recovery-guide/index.astro as article timeline hub
    status: pending
  - id: update-ctas
    content: Update CourseCTA.astro and navigation links
    status: pending
---

# Course Pages and Content Restructure

## Current State

```mermaid
flowchart TD
    subgraph website [thetismedical.com]
        CoursesIndex["/courses - index page"]
        Essentials["/courses/essentials"]
        Professional["/courses/professional"]
        Articles["7 recovery-phase articles (hidden)"]
    end
    
    subgraph guide [guide.thetismedical.com]
        GuideHome["/ - program selector"]
        GuideEssentials["/essentials - 31 lessons"]
        GuidePro["/professionals"]
    end
    
    CoursesIndex --> Essentials
    CoursesIndex --> Professional
```



## Proposed Structure

```mermaid
flowchart TD
    subgraph website [thetismedical.com]
        CoursesIndex["/courses - hub page"]
        EmailCourse["/courses/email - FREE signup + articles"]
        Essentials["/courses/essentials - overview + guide link"]
        Professional["/courses/professional - premium waitlist"]
        ArticlePages["7 article pages (linked from email course)"]
    end
    
    subgraph guide [guide.thetismedical.com]
        GuideEssentials["/essentials - full 31 lessons"]
        GuidePro["/professionals - premium content"]
    end
    
    CoursesIndex --> EmailCourse
    CoursesIndex --> Essentials
    CoursesIndex --> Professional
    EmailCourse --> ArticlePages
    Essentials --> GuideEssentials
    Professional --> GuidePro
```



## File Changes

### 1. Create New Email Course Page

Create [`apps/website/src/pages/courses/email.astro`](apps/website/src/pages/courses/email.astro):

- Hero with "Free Email Course" badge
- Email signup form (email + rupture date)
- Preview of 7 recovery phases with links to articles
- CTA to upgrade to Essentials or buy splint

### 2. Update Essentials Page

Update [`apps/website/src/pages/courses/essentials.astro`](apps/website/src/pages/courses/essentials.astro):

- Overview of the 31-lesson Essentials program
- Preview of what's included (phases, lesson count)
- Primary CTA: "Start Essentials" linking to guide.thetismedical.com/essentials
- Secondary CTA: Email signup for those not ready
- Mention of Thetis splint integration

### 3. Update Professional Page

Update [`apps/website/src/pages/courses/professional.astro`](apps/website/src/pages/courses/professional.astro):

- Premium course features (video lessons, expert access)
- Clear "Coming Soon" status with waitlist signup
- What's included vs Essentials comparison
- CTA to start with Essentials in meantime

### 4. Update Courses Index Page

Update [`apps/website/src/mains/courses.astro`](apps/website/src/mains/courses.astro):

- Three-card layout: Email (Free), Essentials (Paid), Professional (Premium)
- Clear pricing and value differentiation
- Each card links to respective page

### 5. Create Article Index/Hub

Create [`apps/website/src/pages/recovery-guide/index.astro`](apps/website/src/pages/recovery-guide/index.astro):

- Timeline view of all 7 recovery phases
- Links to individual articles
- CTA for email course signup
- This becomes the SEO landing page for recovery content

### 6. Update Navigation and CTAs

Update [`apps/website/src/components/CTA/CourseCTA.astro`](apps/website/src/components/CTA/CourseCTA.astro):

- Add email course card option
- Update links to use new page structure

Update footer and nav to include:

- Link to /courses (hub)
- Link to /recovery-guide (articles)

## Conversion Funnel

```mermaid
flowchart LR
    SEO["SEO Traffic"] --> Articles["Free Articles"]
    Articles --> EmailSignup["Email Signup"]
    EmailSignup --> Essentials["Essentials Course"]
    Essentials --> Professional["Professional Course"]
    
    Articles --> Splint["Buy Splint"]
    EmailSignup --> Splint
    Essentials --> Splint
```

Each page will include at least one CTA for:

- Email signup (free entry point)