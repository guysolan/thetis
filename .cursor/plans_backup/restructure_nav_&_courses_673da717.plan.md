---
name: Restructure Nav & Courses
overview: Restructure the navigation to have a "Courses" section with 3 boxed course options (emails/essentials/professionals) and a "Patient Guides" section with FAQs on one side and timeline-linked recovery phases on the other. Move pages from /guide/ to /course/.
todos:
  - id: create-course-pages
    content: Create /course/ directory with emails, essentials, professionals, and index pages
    status: completed
  - id: update-routes
    content: Update routes.tsx with courseRoutes and modify guidePageRoutes
    status: completed
  - id: restructure-nav
    content: Restructure DesktopNav.tsx with Courses and Patient Guides sections
    status: completed
  - id: update-links
    content: Update internal links pointing to old /guide/ URLs
    status: completed
  - id: cleanup
    content: Clean up old guide pages and test navigation
    status: completed
---

# Navigation & Course URL Restructure

## Summary

1. **Move course pages** from `/guide/` to `/course/` URLs
2. **Restructure nav** with distinct "Courses" and "Patient Guides" sections
3. **Update routes and links** across the codebase

---

## Key Changes

### 1. Create New Course Pages

Move existing pages to new `/course/` URLs:

- `/guide/emails` -> `/course/emails`
- `/guide/essentials` -> `/course/essentials`  
- `/guide/professionals` -> `/course/professionals`

Files to create in `src/pages/course/`:

- `emails.astro` (move from [guide/emails.astro](apps/website/src/pages/guide/emails.astro))
- `essentials.astro` (move from [guide/essentials.astro](apps/website/src/pages/guide/essentials.astro))
- `professionals.astro` (move from [guide/professionals.astro](apps/website/src/pages/guide/professionals.astro))
- `index.astro` (landing page with 3 course boxes)

### 2. Update Routes in [routes.tsx](apps/website/src/content/routes.tsx)

- Add new `courseRoutes` array with emails/essentials/professionals
- Update `guidePageRoutes` to only contain phase articles (weeks-0-1, etc.)
- Update `slugTranslations` for the new `/course/` paths

### 3. Restructure Desktop Navigation in [DesktopNav.tsx](apps/website/src/layouts/DesktopNav.tsx)

**"Courses" dropdown:**

- Display 3 course options as styled boxes (Free badge for emails, paid badges for essentials/professionals)
- Link to `/course/emails`, `/course/essentials`, `/course/professionals`

**"Patient Guides" dropdown (two-column layout):**

- **Left column: FAQs** - Link to all pages in `src/mains/FAQs/`:
- achilles-rupture-timeline
- is-my-achilles-ruptured
- achilles-tear-treatment
- torn-achilles-recovery
- life-after-achilles-rupture
- what-happens-if-my-achilles-is-ruptured
- achilles-rupture-rehabilitation

- **Right column: Recovery Timeline** - Link to phase articles at `/guide/weeks-X`:
- Week 0-1, Weeks 1-3, Weeks 4-6, Weeks 7-9, Weeks 10-12, Weeks 13-25, Week 26+

### 4. Update Internal Links

- Update links in [guide/index.astro](apps/website/src/pages/guide/index.astro) to point to `/course/` URLs
- Update any hardcoded `/guide/emails`, `/guide/essentials`, `/guide/professionals` links throughout the site

### 5. Clean Up

- Remove old `/guide/articles` page (content now accessible via Patient Guides nav)
- Keep `/guide/[slug].astro` for phase article routing
- Update `navigationContent` labels in routes.tsx

---

## Files to Modify

| File | Change |

|------|--------|

| `src/pages/course/` (new dir) | Create emails.astro, essentials.astro, professionals.astro, index.astro |

| `src/content/routes.tsx` | Add courseRoutes, update guidePageRoutes |

| `src/layouts/DesktopNav.tsx` | Restructure Courses and Patient Guides dropdowns |