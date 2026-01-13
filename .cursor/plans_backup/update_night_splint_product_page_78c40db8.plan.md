---
name: Update Night Splint Product Page
overview: Update the Achilles rupture splint product page to align with the live site while keeping valuable existing sections and removing redundant ones.
todos:
  - id: remove-splint-timeline
    content: Remove SplintTimeline component import and usage from achilles-rupture-splint.astro
    status: completed
  - id: update-hero-description
    content: "Update hero description in content.ts to match live site: 'Finally, a comfortable solution for sleep. Designed alongside surgeons to protect your healing Achilles tendon while you get the rest you need.'"
    status: completed
  - id: verify-section-order
    content: Verify section order matches live site flow and adjust if needed
    status: completed
    dependencies:
      - remove-splint-timeline
  - id: verify-content-matching
    content: Verify ValuePropositions, KeyFeatures, and NightSplintUsage content matches live site
    status: completed
---

# Update Night Splint Product Page

## Overview

Update `apps/website/src/mains/achilles-rupture-splint.astro` to match the live site structure and content while preserving valuable existing sections.

## Changes to Make

### 1. Remove Redundant Section

- **Remove**: `SplintTimeline` component (user chose to keep only `NightSplintUsage` which covers the same topic more concisely)
- **File**: `apps/website/src/mains/achilles-rupture-splint.astro` - remove import and usage

### 2. Update Hero Description

- **File**: `apps/website/src/components/products/night-splint/content.ts`
- **Change**: Update hero description to match live site: "Finally, a comfortable solution for sleep. Designed alongside surgeons to protect your healing Achilles tendon while you get the rest you need."
- **Current**: "A patented, lightweight splint designed with surgeons. Sleep comfortably while keeping your Achilles protected."

### 3. Verify Section Order Matches Live Site Flow

The live site has this order:

1. Hero with buy options
2. Two options comparison (Sleep in Boot vs Night Splint)
3. Reviews
4. "Finally Sleep Comfortably" (ValuePropositions)
5. "Designed for Comfort & Recovery" (KeyFeatures)
6. "Ready for Real Relief?" (ReadyForRelief)
7. "Ready for More Comfortable Recovery?" (ComfortableRecoveryReviews)
8. "When To Use Your Splint" (NightSplintUsage)
9. Instructions
10. FAQs
11. "Order Your Splint Today" (OrderYourSplint)
12. Downloads

**Current order** (verify and adjust if needed):

- Keep current order but ensure `SplintTimeline` is removed
- Verify `NightSplintUsage` appears before instructions (matches live site)

### 4. Content Verification

- **ValuePropositions**: Verify it matches live site's "Finally Sleep Comfortably During Recovery" section with 4 benefit cards
- **KeyFeatures**: Verify it matches live site's "Designed for Comfort & Recovery" with 6 features
- **NightSplintUsage**: Verify it matches live site's "When To Use Your Splint" with 3 use cases

### 5. Keep All Existing Valuable Sections

- ✅ "Who This Is For" section (user confirmed to keep)
- ✅ Comparison table (Night Splint vs Boot)
- ✅ BundlesAndRecommendations
- ✅ SleepInYourWelliesSection
- ✅ YouTube video placeholder
- ✅ All other existing sections

## Files to Modify

1. `apps/website/src/mains/achilles-rupture-splint.astro`

- Remove `SplintTimeline` import and usage
- Verify section order matches live site flow

1. `apps/website/src/components/products/night-splint/content.ts`

- Update hero description to match live site wording

## Verification Steps

- Check that all sections from live site are present
- Verify no duplicate/redundant content
- Ensure section order flows logically
- Confirm hero description matches live site
