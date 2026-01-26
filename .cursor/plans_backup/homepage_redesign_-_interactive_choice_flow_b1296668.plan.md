---
name: Homepage Redesign - Interactive Choice Flow
overview: Transform the home page to match the new design with an interactive choice section ("I can't Sleep" vs "I'm Confused") that dynamically shows relevant solutions, while preserving existing best components like testimonials, team story, and mythology sections.
todos: []
---

# Homepage Redesign Plan

Transform `apps/website/src/pages/index.astro` and related components to match the new interactive design while keeping the best existing elements.

## Current Structure Analysis

**Existing components to keep:**

- `LandingHero` - Update with new headline and trust indicator
- `Reviews` (InfiniteReviews) - Keep testimonial carousel
- `OurTeam` - Update "Our Story" section to match image exactly
- `ProfessionalOpinionsCarousel` - Keep expert endorsements

**Components to replace:**

- `WhatWeOffer` - Replaced by dynamic choice section
- `ThetisMythology` - Replace with "Why Thetis?" section matching image
- `NightSplintFAQs` - Remove from homepage (keep on product page only)

**New components needed:**

- Interactive choice section with two buttons
- Dynamic content sections based on user choice
- "Our Impact" statistics section

## Implementation Steps

### 1. Update Hero Section (`LandingHero.astro`)

**File:** `apps/website/src/sections/index/LandingHero.astro`

**Changes:**

- Update headline to "Better Achilles Rupture Recovery" with "Better" highlighted
- Update sub-headline: "We offer a splint and lessons to make your experience recovering from a torn Achilles better."
- Keep "TRUSTED BY 5000+ PATIENTS" tagline (already exists)
- Add testimonial carousel below hero (move from Reviews section or create new component)
- Simplify CTA buttons to match new design

**Key elements:**

- Logo and branding at top
- Trust indicator badge
- Main headline with highlighted word
- Sub-headline
- Testimonial card with 5-star rating, quote, and author (e.g., "Ollie Lawrence, English Rugby Union Player")

### 2. Create Interactive Choice Section with Dynamic Reordering

**New file:** `apps/website/src/sections/index/InteractiveChoice.tsx`

**Features:**

- Question: "What is your biggest issue right now with your Achilles rupture recovery:"
- Two large buttons: "I can't Sleep" and "I'm Confused" (with "or" between them)
- Client-side state management to dynamically reorder sections based on selection
- Selected section appears first, other section follows below
- Smooth transitions/animations when sections reorder

**Implementation:**

- Use React state (`useState`) to track selected choice ("sleep" | "confused" | null)
- Use CSS `order` property or flexbox reordering to change section order dynamically
- Both sections always visible, but order changes based on selection
- Smooth CSS transitions (300-500ms) for reordering animation
- Use `transform: translateY()` or similar for smooth movement
- Ensure accessibility: maintain focus management, announce changes with ARIA live regions
- Styled with light green borders and rounded corners matching design

**UX Benefits:**

- Selected solution appears immediately at top (reduces scrolling)
- Both options remain visible (users can still see alternative solution)
- Feels responsive and personalized
- Better conversion potential (relevant content first)

### 3. Create "I Can't Sleep" Solution Section

**New file:** `apps/website/src/sections/index/CantSleepSection.tsx` (TSX for dynamic ordering)

**Content:**

- Context label: "I CAN'T SLEEP" (small, light green text)
- Problem statement: "80% of patients struggle to sleep in the boot" (bold)
- Solution: "The only safe solution:"
- Product image: Night splint in bed (use existing image from assets)
- Trust indicators: "Trusted by surgeons" and "Loved by 5000+ patients"
- Engaging question: "Would you sleep in your wellies?"
- Additional benefit: "p.s. It also works for showering! Learn More" (with "Learn More" as clickable link)
- CTA button: Link to night splint product page (`/achilles-rupture-splint` or `/night-splint`)
- **Add multiple internal links:**
- Link to product page
- Link to "Sleeping with Torn Achilles" article/page
- Link to "Washing with Torn Achilles" article/page
- Link to reviews/testimonials
- Link to FAQs (on product page)

**Styling:**

- White card with rounded corners
- Light mint green background sections
- Product image prominently displayed
- CSS class for dynamic ordering (e.g., `order-1` or `order-2` based on selection)
- Transition classes for smooth reordering animation

### 4. Create "I'm Confused" Solution Section

**New file:** `apps/website/src/sections/index/ConfusedSection.tsx` (TSX for dynamic ordering)

**Content:**

- Context label: "I'M CONFUSED" (small, light green text)
- Problem statement: "No patient can remember everything their surgeon and physio says" (bold)
- Solution: "Get step by step guidance back to health."
- Instructional diagram:
- Two leg/foot positions comparison
- A. Foot neutral (90 degrees) - "tendon ends further apart"
- B. Foot pointed down (plantarflexion) - "tendon ends closer (better for healing)"
- Doctor figure and arrow pointing from A to B
- Goal: "Early recovery goal: keep the ends close and protected"
- Call to action: "Don't risk not knowing."
- Buttons:
- Green "Buy Now (£29)" button (link to course purchase)
- "Get Email Course Free" text link (link to email course signup)
- **Add multiple internal links:**
- Link to course pages (`/course`, `/course/standard`, `/course/premium`)
- Link to email course signup
- Link to FAQs/articles about recovery phases
- Link to "Evidence-Based Recovery" page
- Link to research/evidence pages

**Visual elements:**

- Use existing diagram from course assets (`achilles-rope-ends-pointed-down.png`)
- White card layout
- Clear visual hierarchy
- CSS class for dynamic ordering (e.g., `order-1` or `order-2` based on selection)
- Transition classes for smooth reordering animation

### 5. Create "Why Thetis?" Section

**New file:** `apps/website/src/sections/index/WhyThetis.astro` (replace ThetisMythology)

**Content (from image):**

- Headline: "Why Thetis?"
- Brand story explaining name's origin from Greek mythology
- Link Thetis (mother of Achilles) to brand's mission of keeping Achilles safe
- Ensure styling matches new mint green theme

**Note:** Replace existing `ThetisMythology.astro` component with this new version matching the image design

### 6. Update "Our Story" Section

**File:** `apps/website/src/sections/index/OurTeam.astro`

**Changes to match image exactly:**

- Headline: "Our Story."
- Narrative: "Thetis Medical started when Matt told his son about the troubles all his patients have sleeping in a boot after an achilles rupture. Guy 3D printed the first prototypes, and Caty sewed them together. Today, we're a family business combining medical expertise with innovative design."
- Founders' details (match image layout):
- Matt (Dad, Foot and Ankle Surgeon)
- Caty (Mum, Family Doctor)
- Guy (Son, Design Engineer)
- Update styling to match new mint green design theme
- Add links to relevant pages (e.g., product pages, course pages, about pages)

### 7. Create "Our Impact" Section

**New file:** `apps/website/src/sections/index/OurImpact.astro`

**Content:**

- Context label: "OUR IMPACT" (small, light green text)
- Headline: "Over 5000 Patients Helped."
- Statistics:
- "Available in 10 countries"
- "Reviewed over 100 Achilles Rupture Papers"
- "Written over 100,000 words of advice"
- Final CTA: "Get Email Course Free" (green text link to email course signup)
- **Add multiple internal links:**
- Link to reviews/testimonials page
- Link to research/evidence pages
- Link to course pages
- Link to product pages
- Link to country-specific pages if available

**Styling:**

- Light mint green background
- Statistics displayed prominently
- Clean, modern layout

### 8. Update Main Page Structure

**File:** `apps/website/src/mains/index.astro`

**New section order:**

1. LandingHero (updated) - Includes testimonial carousel
2. InteractiveChoice (new) - Contains both solution sections with dynamic ordering

- Container wraps both sections
- CantSleepSection (order changes based on selection)
- ConfusedSection (order changes based on selection)
- Selected section appears first, other follows

1. WhyThetis (new, replaces ThetisMythology)
2. OurStory (OurTeam - updated to match image)
3. OurImpact (new)
4. Reviews (keep testimonial carousel)
5. ProfessionalOpinionsCarousel (keep)

**Removed from homepage:**

- `WhatWeOffer` - Replaced by dynamic choice section
- `NightSplintFAQs` - Keep only on product page (`apps/website/src/mains/achilles-rupture-splint.astro`)
- `ThetisMythology` - Replaced with new "Why Thetis?" section

**Considerations:**

- Remove `WhatWeOffer` section (replaced by dynamic choice section)
- Remove `NightSplintFAQs` from homepage (keep on product page only)
- Replace `ThetisMythology` with new "Why Thetis?" section matching image
- Add strategic internal links throughout all sections to:
- Product pages (`/achilles-rupture-splint`, `/night-splint`)
- Course pages (`/course`, `/course/standard`, `/course/premium`)
- Article pages (`/sleeping-with-torn-achilles`, `/washing-with-torn-achilles`)
- Reviews/testimonials pages
- Research/evidence pages
- FAQs (on product page)
- Ensure responsive design works on mobile
- All links should use proper anchor tags with descriptive text

### 11. Styling and Theme Updates

**Color scheme:**

- Light mint green (`#e0f2e9` or similar) for backgrounds
- Primary green for accents and buttons
- White cards for content sections
- Black text on light backgrounds

**Typography:**

- Clean, modern sans-serif
- Bold headlines
- Clear hierarchy

**Components:**

- Rounded corners on cards and buttons
- Light green borders on interactive elements
- Smooth transitions for dynamic content

### 9. Add Strategic Internal Links Throughout Page

**Link strategy for SEO and user navigation:**

- **Hero section:**
- Link to product pages
- Link to course pages
- Link to reviews/testimonials

- **"I Can't Sleep" section:**
- Primary CTA: Link to `/achilles-rupture-splint` or `/night-splint`
- "Learn More" link: Link to `/sleeping-with-torn-achilles` or `/washing-with-torn-achilles`
- Link to reviews/testimonials
- Link to product FAQs (on product page)

- **"I'm Confused" section:**
- "Buy Now" button: Link to course purchase page
- "Get Email Course Free" link: Link to email course signup
- Link to `/course`, `/course/standard`, `/course/premium`
- Link to recovery articles/FAQs
- Link to evidence/research pages

- **"Why Thetis?" section:**
- Link to about/company pages if available
- Link to product pages
- Link to team/story pages

- **"Our Story" section:**
- Link to product pages
- Link to course pages
- Link to about/team pages

- **"Our Impact" section:**
- "Get Email Course Free" link: Link to email course signup
- Link to reviews/testimonials page
- Link to research/evidence pages
- Link to course pages
- Link to product pages

- **Reviews section:**
- Link to full reviews page (`/reviews`)
- Link to product pages
- Link to course pages

**Link best practices:**

- Use descriptive anchor text (not "click here")
- Ensure all links are keyboard accessible
- Use proper semantic HTML (`<a>` tags)
- Consider adding `rel="noopener"` for external links
- Test all links work correctly

### 12. Assets Needed

**Images:**

- Night splint in bed (check if exists in `apps/website/src/assets/` or `public/images/`)
- Achilles rope ends diagram (exists: `apps/course/src/assets/achilles-rope-ends-pointed-down.png`)
- Logo (should already exist)

**Content:**

- Testimonial from Ollie Lawrence (check if exists in reviews data)
- Statistics data (5000+ patients, 10 countries, 100 papers, 100k words)

## Technical Considerations

- Use Astro for static sections, React/TSX for interactive components
- Ensure client-side hydration works properly for choice section
- **Dynamic reordering implementation:**
- Use CSS flexbox `order` property or CSS Grid `order` for reordering
- Apply `transition: order 0.3s ease` or use `transform: translateY()` for smooth animation
- Consider using Framer Motion or similar for more complex animations
- Ensure both sections remain in DOM (for SEO and accessibility)
- **Accessibility:**
- Maintain focus management when sections reorder
- Use ARIA live regions to announce changes: `<div role="status" aria-live="polite">`
- Ensure keyboard navigation still works after reordering
- Test with screen readers
- Test responsive design on mobile, tablet, desktop
- Preserve existing i18n support for multi-language
- Keep existing SEO optimizations (both sections always in DOM)

## Files to Create/Modify

**New files:**

- `apps/website/src/sections/index/InteractiveChoice.tsx` - Main container with buttons and both solution sections
- `apps/website/src/sections/index/CantSleepSection.tsx` - Sleep solution (with dynamic ordering and internal links)
- `apps/website/src/sections/index/ConfusedSection.tsx` - Confusion solution (with dynamic ordering and internal links)
- `apps/website/src/sections/index/WhyThetis.astro` - New "Why Thetis?" section (replaces ThetisMythology)
- `apps/website/src/sections/index/OurImpact.astro` - Impact statistics section (with internal links)

**Modify files:**

- `apps/website/src/mains/index.astro` - Update section order, remove FAQs, remove WhatWeOffer, add new sections
- `apps/website/src/sections/index/LandingHero.astro` - Update headline and add testimonial carousel
- `apps/website/src/sections/index/OurTeam.astro` - Update content to match image exactly, add internal links

**Remove from homepage:**

- `apps/website/src/sections/index/WhatWeOffer.astro` - Replaced by dynamic choice section
- `apps/website/src/sections/index/ThetisMythology.astro` - Replaced by new WhyThetis component
- `NightSplintFAQs` - Keep only on product page (`apps/website/src/mains/achilles-rupture-splint.astro`)

**Link strategy:**

- Add contextual links throughout all sections
- Use descriptive anchor text for SEO
- Link to relevant product pages, course pages, articles, and resources
- Ensure links are accessible and keyboard navigable
