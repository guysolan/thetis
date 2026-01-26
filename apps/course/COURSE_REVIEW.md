# Achilles Rupture Course Review

## Executive Summary

This document provides a comprehensive article-by-article review and **linking plan** for the Achilles rupture course. The primary goal is: **later articles link back to earlier articles** that explain concepts fully, reducing duplication while maintaining safety.

### Review Criteria

1. Logical flow
2. Single source of truth (reducing overlap via linking)
3. Safety and accuracy
4. Image usage
5. Proportional coverage
6. Conciseness and value
7. Clarity and explanation

---

## Link Format

Links use markdown syntax within content strings:

```tsx
"For more details, see [Blood Clot Prevention](/standard/blood-clot-prevention)."
```

The `parseInlineMarkdown` function in `ContentRenderer.tsx` converts this to a proper `<Link>` component.

---

## Authoritative Sources (Single Source of Truth)

These articles are the **definitive source** for each topic. Later articles should link back to these rather than re-explaining.

| Topic | Authoritative Article | Slug |
|-------|----------------------|------|
| Plantarflexion/Dorsiflexion | Emergency Care | `emergency-care` |
| Golden Rule (don't let toes up) | Emergency Care | `emergency-care` |
| Thompson/Simmonds Test | Emergency Care | `emergency-care` |
| DVT/PE Warning Signs | Blood Clot Prevention | `blood-clot-prevention` |
| Boot Comparison (Aircast vs VACOped) | Choosing Your Boot | `choosing-your-boot` |
| Tendon Healing Biology | Healing Process | `healing-process` |
| Elongation Explanation | Healing Process | `healing-process` |
| Re-rupture Risk Timeline | Healing Process | `healing-process` |
| Nutrition for Healing | Nutrition for Healing | `nutrition-for-healing` |
| Night Splint | Sleeping with Boot | `sleeping-with-boot` |
| EVENup Shoe Leveler | Crutches and Mobility | `crutches-and-mobility` |
| Heel Lifts | Post-Boot Period | `post-boot-period` |
| MVIC/LSI Targets | Progressive Strengthening | `progressive-strengthening` |
| 25+ Heel Raise Criteria | Progressive Strengthening | `progressive-strengthening` |
| Return-to-Sport Criteria | Return to Sport | `return-to-sport` |
| Psychological Recovery | Mental Health Recovery | `mental-health-recovery` |
| Driving Guidelines | Driving Guidelines | `driving-guidelines` |
| Pain Management | Pain Management Throughout Recovery | `pain-management-throughout-recovery` |
| Phase Definitions | Recovery Roadmap | `recovery-roadmap` |

---

## Overall Assessment

### Strengths

- **Comprehensive coverage** of the entire recovery journey (Week 0 to 35+)
- **Consistent structure** across articles (Quick action plan, sections, FAQs, "If you remember nothing else")
- **Good safety warnings** with clear DVT/PE signs repeated throughout
- **Criteria-based approach** properly emphasized over time-based recovery
- **Partner/carer sections** in most articles

### Critical Issues

1. **Verbose safety warnings** - DVT/PE warnings are too long (can be shortened with links)
2. **Inconsistent phase numbering** - Articles reference "Phase 2", "Phase 3", "Phase 4" inconsistently
3. **Some articles are too long** - `building-cardio.tsx` swimming section could be trimmed
4. **Inconsistent terminology explanations** - Same terms explained differently across articles
5. **Missing images** - Several articles would benefit from visuals
6. **Boot articles have overlap** - Same comparison content in two places

---

## Article-by-Article Review

### 00-practical/

#### `recovery-roadmap.tsx`

**Purpose:** High-level overview of 4 phases

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good introduction to the course structure |
| Overlap | ⚠️ Phase descriptions repeated in many other articles |
| Safety | ✅ Safe |
| Images | ❌ No images - could benefit from a visual roadmap/timeline |
| Proportionality | ✅ Appropriate length |
| Conciseness | ⚠️ Could be shorter - some repetition within the article |
| Clarity | ✅ Clear |

**Role:** Authoritative source for phase definitions.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Add a visual timeline/roadmap image
- Make this the SINGLE authoritative source for phase definitions
- Other articles can reference phases but shouldn't re-explain them fully

---

#### `first-week-checklist.tsx`

**Purpose:** Week 1 guidance, symptoms, questions for clinic

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good immediate guidance |
| Overlap | ⚠️ 5 phases explained here AND in recovery-roadmap |
| Safety | ✅ Good distinction between normal and concerning symptoms |
| Images | ❌ No images |
| Proportionality | ✅ Appropriate |
| Conciseness | ⚠️ Could trim the phases section - brief mention with link to roadmap |
| Clarity | ✅ Clear |

**Links needed:** None — early article, should be self-contained.

**Recommendations:**

- Trim phases explanation to brief summary
- Consider adding image of proper elevation position

---

#### `mental-health-recovery.tsx`

**Purpose:** Psychological challenges and coping strategies

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good placement in practical section |
| Overlap | ⚠️ Kinesiophobia mentioned here AND in six-month-milestone.tsx |
| Safety | ✅ Appropriately recommends professional help |
| Images | ❌ No images - probably fine for this topic |
| Proportionality | ✅ Appropriate depth |
| Conciseness | ✅ Reasonably concise |
| Clarity | ✅ Clear |

**Role:** Authoritative source for psychological topics.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Make this the authoritative source for psychological topics
- `six-month-milestone.tsx` can mention kinesiophobia briefly with link here

---

#### `pain-management-throughout-recovery.tsx`

**Purpose:** Types of pain, when to worry, management strategies

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good practical topic |
| Overlap | ⚠️ "Normal vs concerning" pain repeated in many articles |
| Safety | ✅ Good safety guidance |
| Images | ❌ No images |
| Proportionality | ✅ Appropriate |
| Conciseness | ⚠️ Some repetition with other articles |
| Clarity | ✅ Clear |

**Role:** Authoritative source for pain guidance.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Make this the authoritative source for pain guidance
- Consider adding pain scale visual

---

#### `driving-guidelines.tsx`

**Purpose:** When safe to drive

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good standalone topic |
| Overlap | ⚠️ Also covered in returning-to-life.tsx |
| Safety | ✅ Appropriately cautious |
| Images | ❌ No images |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Role:** Authoritative source for driving.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Keep as authoritative source for driving
- `returning-to-life.tsx` should have brief summary + link here

---

### 01-emergency/

#### `emergency-care.tsx`

**Purpose:** Immediate aftermath, A&E, initial treatment

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Correct placement as first content |
| Overlap | ⚠️ Thompson test explained here AND in specialist-appointment.tsx |
| Safety | ✅ Excellent safety content |
| Images | ✅ Good images (SnapRuptureExperience, AchillesRopeEnds, HowRupturesHappen) |
| Proportionality | ✅ Appropriate depth |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Role:** Authoritative source for plantarflexion/dorsiflexion, Golden Rule, Thompson test.

**Links needed:** None — this is an authoritative source and must be self-contained for emergency use.

**Recommendations:**

- Keep as authoritative source for plantarflexion/dorsiflexion explanation
- Keep as authoritative source for "Golden Rule" (don't let toes up)
- Soften specific week timelines to "your specialist will advise"

---

#### `blood-clot-prevention.tsx`

**Purpose:** DVT/PE risk, warning signs, blood thinners

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Critical safety topic, correctly positioned |
| Overlap | ⚠️ DVT/PE signs repeated in every article's "urgent" section |
| Safety | ✅ Excellent - critical information |
| Images | ✅ Good image (DvtVsPeLegToLungs) |
| Proportionality | ✅ Appropriate for importance |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Role:** Authoritative source for DVT/PE warnings.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Keep as authoritative source for DVT/PE
- Other articles should use SHORTENED warning with link here

---

### 02-early-treatment/

#### `specialist-appointment.tsx`

**Purpose:** First specialist appointment preparation

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good positioning |
| Overlap | ⚠️ Thompson test re-explained (see emergency-care.tsx) |
| Safety | ✅ Safe |
| Images | ✅ Good image (ThompsonTest) |
| Proportionality | ✅ Appropriate |
| Conciseness | ⚠️ Could trim Thompson test explanation |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Thompson test explanation | "Your specialist will perform the **Thompson test** (calf squeeze test) — [see how this works](/standard/emergency-care)." |

**Recommendations:**

- Trim Thompson test to brief mention with link
- Keep the image

---

#### `treatment-decision.tsx`

**Purpose:** Surgery vs non-surgical decision

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good placement |
| Overlap | ✅ Unique content |
| Safety | ✅ Balanced, evidence-based |
| Images | ✅ Good image (SurgeryVsNonSurgicalOutcomes) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Any elongation mention | "...risk of **elongation** — [understand why this matters](/standard/healing-process)." |

**Recommendations:**

- Add link to website evidence page: "For more research, see our [Evidence page](/evidence)"

---

#### `choosing-your-boot.tsx`

**Purpose:** Aircast vs VACOped comparison, equipment recommendations

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good - helps patients BEFORE they have a boot |
| Overlap | ⚠️ Boot comparison duplicated in your-walking-boot.tsx |
| Safety | ✅ Safe |
| Images | ❌ No images - should have boot comparison images |
| Proportionality | ⚠️ Overlap with your-walking-boot.tsx |
| Conciseness | ⚠️ Redundant content |
| Clarity | ✅ Clear |

**Role:** Authoritative source for boot comparison.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Focus this article on **decision-making**: "Which boot should I get?"
- Move detailed "how boots work" content to `your-walking-boot.tsx`
- Add boot comparison images

---

### 03-boot-phase/

#### `your-walking-boot.tsx`

**Purpose:** How boots work, angle system, Aircast vs VACOped

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good - helps patients AFTER they have a boot |
| Overlap | ⚠️ Boot comparison duplicated from choosing-your-boot.tsx |
| Safety | ✅ Safe |
| Images | ✅ Good images (AircastBootWithWedges, VacopedBootStandalone, BootForceComparison) |
| Proportionality | ⚠️ Redundant with earlier content |
| Conciseness | ⚠️ Could be consolidated |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Boot comparison section | "For help choosing between Aircast and VACOped, see [Choosing Your Boot](/standard/choosing-your-boot)." |
| Plantarflexion explanation | "The boot holds your foot in **plantarflexion** (pointed down) — [why this position matters](/standard/emergency-care)." |

**Recommendations:**

- Focus this article on **understanding**: "How does my boot work?"
- Keep the detailed mechanics and images here
- Remove the "which boot to choose" content (link to choosing-your-boot.tsx)

---

#### `boot-adjustment-and-care.tsx`

**Purpose:** Boot fitting, daily checks, maintenance

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good practical content |
| Overlap | ✅ Mostly unique |
| Safety | ✅ Good safety points |
| Images | ✅ Good image (BootFittingGuide) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Any DVT/PE warning | "Watch for blood clot warning signs — [know the symptoms](/standard/blood-clot-prevention)." |

**Recommendations:**

- Keep as is - good standalone article

---

#### `boot-progression-protocol.tsx`

**Purpose:** Wedge removal, angle adjustment, weight-bearing

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Critical content |
| Overlap | ✅ Mostly unique |
| Safety | ✅ Good - emphasizes following protocol |
| Images | ✅ Good image (WedgeRemovalProgression) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Plantarflexion mention | "...maintaining **plantarflexion** — [understand this position](/standard/emergency-care)." |
| Elongation warning | "Moving too fast risks **elongation** — [why this matters](/standard/healing-process)." |

**Recommendations:**

- Keep as authoritative source for boot progression
- Could add table showing typical progression schedule
- Soften timelines: "Your protocol may differ based on your healing"

---

#### `building-strength-in-boot.tsx`

**Purpose:** Phase 1 exercises, weight-bearing, gait

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good |
| Overlap | ⚠️ Exercise content overlaps with key-exercises.tsx |
| Safety | ✅ Safe |
| Images | ❌ No images - needs exercise demonstration images |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Plantarflexion in exercises | "Keep your foot in **plantarflexion** (pointed down) — [why this is safe](/standard/emergency-care)." |
| Any DVT/PE warning | "Watch for [blood clot warning signs](/standard/blood-clot-prevention)." |

**Recommendations:**

- Add exercise demonstration images
- Clearly label as "Phase 1 exercises" to differentiate from Phase 2 in key-exercises.tsx

---

#### `crutches-and-mobility.tsx`

**Purpose:** Crutch comfort, EVENup, recovery station

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good practical content |
| Overlap | ⚠️ EVENup mentioned in multiple articles |
| Safety | ✅ Safe |
| Images | ✅ Good images (EvenUp, SoftCrutchHandles) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Role:** Authoritative source for EVENup.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Keep as authoritative source for EVENup
- Other articles can mention EVENup briefly with link here

---

#### `final-boot-phase.tsx`

**Purpose:** Remodelling phase, preparing for boot removal

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good transition content |
| Overlap | ⚠️ Tendon healing stages re-explained (see healing-process.tsx) |
| Safety | ✅ Good |
| Images | ✅ Good images (TendonStrengthTimeline, ReRuptureRiskTimeline) |
| Proportionality | ✅ Appropriate |
| Conciseness | ⚠️ Could trim tendon biology section |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Tendon healing stages explanation | "Your tendon is now in the **remodelling phase** — [understand the healing stages](/standard/healing-process)." |
| Re-rupture risk timeline | "Re-rupture risk is still elevated — [see the risk timeline](/standard/healing-process)." |
| Night splint mention | "Continue using your [night splint](/standard/sleeping-with-boot) for protection." |

**Recommendations:**

- Trim tendon biology to brief summary with link
- Keep preparation for boot removal content

---

#### `healing-process.tsx`

**Purpose:** Tendon healing biology, elongation prevention

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Important foundational content |
| Overlap | ⚠️ Elongation discussed in multiple articles |
| Safety | ✅ Critical safety information |
| Images | ✅ Excellent images (TendonHealingTimeline, TendonStiffnessAfterRupture, ReRuptureRiskTimeline) |
| Proportionality | ✅ Appropriate for importance |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Role:** Authoritative source for tendon healing, elongation, re-rupture risk.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Keep as authoritative source for tendon healing and elongation
- Other articles should use standardized brief explanation with link here

---

#### `nutrition-for-healing.tsx`

**Purpose:** Protein, vitamin C, hydration, collagen

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good placement |
| Overlap | ⚠️ Nutrition also in returning-to-life.tsx |
| Safety | ✅ Safe, evidence-based |
| Images | ❌ No images |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Role:** Authoritative source for nutrition.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Keep as authoritative source for nutrition
- `returning-to-life.tsx` should have brief summary + link here

---

#### `sleeping-with-boot.tsx`

**Purpose:** Sleep challenges, night splint recommendation

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good practical content |
| Overlap | ⚠️ Night splint mentioned in multiple articles |
| Safety | ✅ Emphasizes 24/7 protection |
| Images | ✅ Good image (ThetisNightSplint) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Role:** Authoritative source for night splint.

**Links needed:** None — this is an authoritative source.

**Recommendations:**

- Keep as authoritative source for night splint
- Add website link: "See our [Sleeping Guide](/sleeping-with-torn-achilles) for more tips"

---

#### `washing-and-hygiene.tsx`

**Purpose:** Safe washing, foot hygiene, bathroom safety

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good practical content |
| Overlap | ✅ Mostly unique |
| Safety | ✅ Good safety guidance |
| Images | ✅ Good images (ThetisNightSplint, MerinoSocks, Antifungal, BathroomSafetyAchillesCrutches) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Night splint mention | "Use your [night splint](/standard/sleeping-with-boot) for safe showering." |

**Recommendations:**

- Add website link: "See our [Washing Guide](/washing-with-torn-achilles) for more tips"

---

### 04-transition/

#### `post-boot-period.tsx`

**Purpose:** Transition out of boot, footwear, heel lifts

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Critical transition content |
| Overlap | ⚠️ Elongation re-explained multiple times (9 mentions) |
| Safety | ✅ Excellent - warns against aggressive stretching |
| Images | ✅ Good image (HeelLifts) |
| Proportionality | ✅ Appropriate |
| Conciseness | ⚠️ Could trim elongation explanations |
| Clarity | ✅ Clear |

**Role:** Authoritative source for heel lifts.

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Elongation explanation (after first) | "Remember, **elongation** is your biggest long-term risk — [understand why](/standard/healing-process)." |
| Night splint mention | "Continue using your [night splint](/standard/sleeping-with-boot) at night." |
| EVENup mention | "Consider an [EVENup shoe leveler](/standard/crutches-and-mobility) to balance leg height." |

**Note:** Keep ONE detailed elongation explanation, then use brief mentions with links for subsequent references.

**Recommendations:**

- Keep as authoritative source for heel lifts
- Trim elongation to 1 detailed + links for rest

---

#### `post-surgery-care.tsx` (formerly scar-management.tsx)

**Purpose:** Scar tissue, massage techniques, sun protection

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good timing |
| Overlap | ✅ Unique content |
| Safety | ✅ Safe |
| Images | ❌ No images - could benefit from scar massage technique images |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Any DVT/PE warning | "Watch for [blood clot warning signs](/standard/blood-clot-prevention)." |

**Recommendations:**

- Add image: "Hands demonstrating gentle scar massage technique on healed Achilles incision site"

---

### 05-physiotherapy/

#### `starting-physio.tsx`

**Purpose:** First physio session, Phase 2 goals

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good introduction to physio |
| Overlap | ⚠️ Terminology re-explained multiple times |
| Safety | ✅ Safe |
| Images | ✅ Good image (Phase2Goals) |
| Proportionality | ✅ Appropriate |
| Conciseness | ⚠️ Could trim terminology explanations |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Plantarflexion/dorsiflexion explanation | "Your physio will assess **dorsiflexion** (toes up) and **plantarflexion** (toes down) — [understand these movements](/standard/emergency-care)." |
| MVIC explanation | "...measuring your **MVIC** (maximum voluntary isometric contraction) — [understand the targets](/standard/progressive-strengthening)." |
| Elongation warning | "During early recovery, your tendon is vulnerable to **elongation** — [why this matters](/standard/healing-process)." |

**Recommendations:**

- Use standardized terminology explanations with links
- Soften timelines: "Your specialist will advise when to progress"

---

#### `key-exercises.tsx`

**Purpose:** 6 essential Phase 2 exercises

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good |
| Overlap | ⚠️ Some exercises mentioned in building-strength-in-boot.tsx |
| Safety | ✅ Good technique guidance |
| Images | ✅ Excellent images for each exercise |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Plantarflexion in exercises | "...in **plantarflexion** (pointed down) — [why this is safe](/standard/emergency-care)." |
| Elongation risk | "Avoid aggressive stretching to prevent [elongation](/standard/healing-process)." |
| Any DVT/PE warning | "Watch for [blood clot warning signs](/standard/blood-clot-prevention)." |

**Recommendations:**

- Keep as authoritative source for exercise descriptions
- Clearly label as "Phase 2 exercises"

---

#### `progressive-strengthening.tsx`

**Purpose:** Phase 3 strengthening, single-leg heel raises

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good progression |
| Overlap | ⚠️ 25+ heel raise target mentioned in many articles |
| Safety | ✅ Safe |
| Images | ✅ Good images (IsomOvercomingSeatedCalf, IsomYieldingStandingSeated, HeelRaiseProgression) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Role:** Authoritative source for MVIC/LSI targets and 25+ heel raise criteria.

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Elongation explanation | "The goal is preventing **elongation** — [understand why this matters](/standard/healing-process)." |

**Note:** Keep detailed MVIC/LSI/heel raise explanations here — other articles link TO this.

**Recommendations:**

- Keep as authoritative source for heel raise targets and LSI
- Other articles can mention "25+ heel raises" briefly with link here

---

#### `walking-properly.tsx`

**Purpose:** Heel-to-toe pattern, correcting limping, gait

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good |
| Overlap | ⚠️ Heel lifts discussed (also in post-boot-period.tsx) |
| Safety | ✅ Safe |
| Images | ✅ Good image (RetroWalkingSequence) |
| Proportionality | ✅ Appropriate |
| Conciseness | ⚠️ Could trim heel lifts section |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Heel lifts section | "Use **heel lifts** to protect your tendon — [see the heel lift guide](/standard/post-boot-period)." |
| Elongation mention | "Walking without heel lifts risks [elongation](/standard/healing-process)." |
| EVENup mention | "An [EVENup shoe leveler](/standard/crutches-and-mobility) can help balance leg height." |

**Recommendations:**

- Trim heel lifts to brief mention with link to post-boot-period

---

### 06-recovery/

#### `building-cardio.tsx`

**Purpose:** Swimming, bike, elliptical, walking

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good |
| Overlap | ✅ Unique content |
| Safety | ✅ Good |
| Images | ✅ Good image (PoolWalkingWeek12) |
| Proportionality | ❌ **TOO LONG** - 813 lines, swimming section dominates |
| Conciseness | ❌ Swimming section could be 50% shorter |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Any DVT/PE warning | "Watch for [blood clot warning signs](/standard/blood-clot-prevention)." |
| 25+ heel raise mention | "Before running, achieve [25+ single-leg heel raises](/standard/progressive-strengthening)." |

**Recommendations:**

- **Trim swimming section by 50%** - keep essential guidance, remove excessive detail
- Add website link: "See our [Swimming Guide](/swimming-with-torn-achilles) for more tips"
- Keep as single article (don't split)

---

#### `functional-milestones.tsx`

**Purpose:** Pain-free walking, 25+ heel raises, balance, stairs

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good milestone check |
| Overlap | ⚠️ 25+ heel raise criteria repeated |
| Safety | ✅ Safe |
| Images | ❌ No images |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| 25+ heel raise criteria | "**25+ single-leg heel raises** — [see the testing protocol](/standard/progressive-strengthening)." |
| Any DVT/PE warning | "Watch for [blood clot warning signs](/standard/blood-clot-prevention)." |

**Recommendations:**

- Add image: "Checklist visual showing the 4 functional milestones"
- Brief mention of heel raises with link to progressive-strengthening for details

---

#### `returning-to-life.tsx`

**Purpose:** Work, driving, household tasks, nutrition

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good milestone article |
| Overlap | ⚠️ Driving and nutrition covered in dedicated articles |
| Safety | ✅ Safe |
| Images | ❌ No images |
| Proportionality | ⚠️ Covers too many topics in detail |
| Conciseness | ⚠️ Could trim driving/nutrition sections |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Driving section | Keep brief summary, add: "For detailed guidance, see [Driving Guidelines](/standard/driving-guidelines)." |
| Nutrition section | Keep brief summary, add: "For detailed guidance, see [Nutrition for Healing](/standard/nutrition-for-healing)." |
| Any DVT/PE warning | "Watch for [blood clot warning signs](/standard/blood-clot-prevention)." |

**Recommendations:**

- Keep brief summaries of driving and nutrition with links
- Focus main content on work return and household tasks

---

### 07-advanced/

#### `starting-to-run.tsx`

**Purpose:** Walk-jog progression, technique, surfaces

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good |
| Overlap | ⚠️ Criteria repeated from other articles |
| Safety | ✅ Excellent safety emphasis |
| Images | ✅ Good image (RunningFormWeek28) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| 25+ heel raise criteria | "You must achieve [25+ single-leg heel raises](/standard/progressive-strengthening) before running." |
| LSI/MVIC targets | "Meet the [strength targets](/standard/progressive-strengthening) before progressing." |
| Any DVT/PE warning | "Watch for [blood clot warning signs](/standard/blood-clot-prevention)." |

**Recommendations:**

- Keep as is - good standalone article with appropriate links

---

#### `plyometrics.tsx`

**Purpose:** Jumping, pogo jumps, landing technique

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good |
| Overlap | ⚠️ Criteria repeated |
| Safety | ✅ Good |
| Images | ✅ Good images (PogoJumpWeek31, LandingTechniqueWeek31) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Strength criteria | "Ensure you've met the [strength criteria](/standard/progressive-strengthening) before starting plyometrics." |
| Return-to-sport criteria | "These exercises prepare you for [return to sport](/standard/return-to-sport)." |

**Recommendations:**

- Keep as is - good standalone article with appropriate links

---

#### `return-to-sport.tsx`

**Purpose:** Criteria, process, timeline for sport return

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good |
| Overlap | ⚠️ 85% symmetry rule also in six-month-milestone.tsx |
| Safety | ✅ Excellent criteria-based approach |
| Images | ✅ Good images (ReturnToSportProgression, Symmetry85Percent) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Role:** Authoritative source for return-to-sport criteria.

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Elongation mention | "Returning too early risks [elongation](/standard/healing-process)." |
| Psychological readiness | "Address any [fear of re-injury](/standard/mental-health-recovery) before returning." |

**Note:** Keep detailed return-to-sport criteria here — other articles link TO this.

**Recommendations:**

- Keep as authoritative source for return-to-sport criteria
- `six-month-milestone.tsx` should reference this article

---

### 08-long-term/

#### `six-month-milestone.tsx`

**Purpose:** Progress assessment, return-to-sport criteria, psychological readiness

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good milestone check |
| Overlap | ⚠️ Return-to-sport criteria duplicated |
| Safety | ✅ Safe |
| Images | ❌ No images |
| Proportionality | ⚠️ Too much overlap with return-to-sport.tsx |
| Conciseness | ⚠️ Could trim return-to-sport section |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Return-to-sport criteria (detailed) | Remove detailed criteria, add: "See [Return to Sport](/standard/return-to-sport) for the full criteria checklist." |
| Kinesiophobia/fear of re-injury | "If you're struggling with fear of re-injury, see [Mental Health Recovery](/standard/mental-health-recovery)." |
| Permanent changes | "For long-term expectations, see [Life After Achilles Rupture](/standard/new-normal)." |

**Recommendations:**

- Trim return-to-sport criteria to brief summary with link
- Focus on milestone reflection and psychological readiness

---

#### `preventing-rerupture.tsx`

**Purpose:** Risk factors, ongoing strengthening, warm-up, warning signs

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Important safety content |
| Overlap | ⚠️ Re-rupture risk timeline mentioned in healing-process.tsx |
| Safety | ✅ Excellent |
| Images | ✅ Good image (WarmUpDynamicStretch) |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Re-rupture risk timeline | "Re-rupture risk peaks in the first year — [see the timeline](/standard/healing-process)." |
| Strength maintenance | "Maintain [strength targets](/standard/progressive-strengthening) long-term." |

**Recommendations:**

- Keep as authoritative source for re-rupture prevention
- Brief mention of risk timeline with link to healing-process.tsx

---

#### `new-normal.tsx`

**Purpose:** Long-term perspective, permanent changes, ongoing care

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Good conclusion |
| Overlap | ⚠️ Permanent changes mentioned in six-month-milestone.tsx |
| Safety | ✅ Safe |
| Images | ❌ No images |
| Proportionality | ✅ Appropriate |
| Conciseness | ✅ Good |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Psychological adjustment | "If struggling emotionally, see [Mental Health Recovery](/standard/mental-health-recovery)." |
| Ongoing strengthening | "Continue [progressive strengthening](/standard/progressive-strengthening) indefinitely." |

**Recommendations:**

- Keep as authoritative source for long-term expectations

---

#### `when-things-dont-go-to-plan.tsx`

**Purpose:** Slow progress, tendon elongation, seeking further opinion

| Criteria | Assessment |
|----------|------------|
| Logical Flow | ✅ Important troubleshooting content |
| Overlap | ⚠️ Tendon elongation explained (also in healing-process.tsx) |
| Safety | ✅ Good - encourages seeking help |
| Images | ❌ No images |
| Proportionality | ✅ Appropriate |
| Conciseness | ⚠️ Could trim elongation explanation |
| Clarity | ✅ Clear |

**Links to add:**

| Current Content | Replace With |
|----------------|--------------|
| Elongation explanation | Remove detailed explanation, add: "**Tendon elongation** means your tendon healed longer than normal — [understand why this happens](/standard/healing-process)." |
| Pain concerns | "For pain guidance, see [Pain Management](/standard/pain-management-throughout-recovery)." |
| Mental health | "If struggling emotionally, see [Mental Health Recovery](/standard/mental-health-recovery)." |

**Recommendations:**

- Use standardized brief elongation explanation with link
- Add image: "Graph showing non-linear recovery progress"

---

## Standardization Guide

### Standardized DVT/PE Warning (Short Version)

**Problem:** Full DVT/PE warning is ~50 words, repeated in 21 files.

**Solution:** Use shortened version with link everywhere except `blood-clot-prevention.tsx`:

```tsx
{
    type: "alert",
    variant: "danger",
    title: "Seek urgent care",
    content: "**Severe pain**, **new pop/snap**, or **signs of blood clots** (calf swelling, chest pain, breathlessness) — [see warning signs](/standard/blood-clot-prevention)."
}
```

**Full version stays only in:** `blood-clot-prevention.tsx`

---

### Standardized Elongation Warning (Short Version)

Use after the first detailed mention in any article:

```tsx
{
    type: "text",
    content: "Moving too fast risks **elongation** — [understand why this matters](/standard/healing-process)."
}
```

---

### Standardized Terminology Explanations

Use these consistent explanations on **first mention** in each article:

| Term | Standard Explanation |
|------|---------------------|
| Plantarflexion | "plantarflexion (foot pointed down, like pressing a gas pedal)" |
| Dorsiflexion | "dorsiflexion (foot pointed up, toes toward shin)" |
| Elongation | "elongation (when the tendon heals at a longer length, affecting power)" |
| MVIC | "MVIC (maximum voluntary isometric contraction — how hard you can push)" |
| LSI | "LSI (Limb Symmetry Index — comparing injured leg to healthy leg)" |

**Subsequent mentions** in the same article don't need the explanation.

**Full explanations stay in:**

- Plantarflexion/Dorsiflexion: `emergency-care.tsx`
- Elongation: `healing-process.tsx`
- MVIC/LSI: `progressive-strengthening.tsx`

---

### Standardized Phase References

**Define once in `recovery-roadmap.tsx`:**

- **Phase 1: Protection** (Weeks 0-8)
- **Phase 2: Transition** (Weeks 8-14)
- **Phase 3: Capacity** (Weeks 14-26)
- **Phase 4: Return to Sport** (Weeks 26+)

**Other articles:** Use phase names consistently, don't re-explain the full timeline.

---

## Implementation Plan

### Phase 1: Add Links to Later Articles (HIGH PRIORITY) ✅ COMPLETED

These articles need links added to reduce duplication:

- [x] `02-early-treatment/specialist-appointment.tsx` — Link to `emergency-care`
- [x] `02-early-treatment/treatment-decision.tsx` — Link to `healing-process`
- [x] `03-boot-phase/your-walking-boot.tsx` — Link to `choosing-your-boot`, `emergency-care`
- [x] `03-boot-phase/boot-adjustment-and-care.tsx` — Link to `blood-clot-prevention`
- [x] `03-boot-phase/boot-progression-protocol.tsx` — Link to `emergency-care`, `healing-process`
- [x] `03-boot-phase/building-strength-in-boot.tsx` — Link to `emergency-care`, `blood-clot-prevention`
- [x] `03-boot-phase/final-boot-phase.tsx` — Link to `healing-process`, `sleeping-with-boot`
- [x] `03-boot-phase/washing-and-hygiene.tsx` — Link to `sleeping-with-boot`
- [x] `04-transition/post-boot-period.tsx` — Link to `healing-process`, `sleeping-with-boot`, `crutches-and-mobility`
- [x] `02-early-treatment/post-surgery-care.tsx` — Moved earlier, renamed, focused on surgical patients
- [x] `05-physiotherapy/starting-physio.tsx` — Link to `emergency-care`, `healing-process`, `blood-clot-prevention` (removed forward links)
- [x] `05-physiotherapy/key-exercises.tsx` — Link to `emergency-care`, `healing-process`, `blood-clot-prevention`
- [x] `05-physiotherapy/progressive-strengthening.tsx` — Link to `healing-process`
- [x] `05-physiotherapy/walking-properly.tsx` — Link to `post-boot-period`, `healing-process`, `blood-clot-prevention`
- [x] `06-recovery/building-cardio.tsx` — Link to `blood-clot-prevention`
- [x] `06-recovery/functional-milestones.tsx` — Link to `blood-clot-prevention`
- [x] `06-recovery/returning-to-life.tsx` — Link to `driving-guidelines`, `nutrition-for-healing`, `blood-clot-prevention`
- [x] `07-advanced/starting-to-run.tsx` — Link to `progressive-strengthening`, `blood-clot-prevention`
- [x] `07-advanced/plyometrics.tsx` — Link to `progressive-strengthening` (removed forward link to return-to-sport)
- [x] `07-advanced/return-to-sport.tsx` — Link to `mental-health-recovery` (removed forward links)
- [x] `08-long-term/six-month-milestone.tsx` — Link to `mental-health-recovery`, `blood-clot-prevention` (removed forward links)
- [x] `08-long-term/preventing-rerupture.tsx` — Link to `healing-process`, `blood-clot-prevention`
- [x] `08-long-term/new-normal.tsx` — Link to `progressive-strengthening`
- [x] `08-long-term/when-things-dont-go-to-plan.tsx` — Link to `healing-process` (removed forward link)

**Note:** Forward links removed and replaced with plain text "(coming up)" references. Only backward links remain.

**Estimated time:** 3-4 hours

---

### Phase 2: Standardize DVT/PE Warnings (HIGH PRIORITY) ✅ COMPLETED

Replace verbose DVT/PE warnings with short version + link in all articles except `blood-clot-prevention.tsx`.

**Files updated (15+ files):**

- [x] `02-early-treatment/specialist-appointment.tsx`
- [x] `02-early-treatment/treatment-decision.tsx`
- [x] `03-boot-phase/building-strength-in-boot.tsx`
- [x] `03-boot-phase/final-boot-phase.tsx`
- [x] `04-transition/post-boot-period.tsx`
- [x] `05-physiotherapy/starting-physio.tsx`
- [x] `05-physiotherapy/key-exercises.tsx`
- [x] `05-physiotherapy/progressive-strengthening.tsx`
- [x] `05-physiotherapy/walking-properly.tsx`
- [x] `06-recovery/building-cardio.tsx`
- [x] `06-recovery/functional-milestones.tsx`
- [x] `06-recovery/returning-to-life.tsx`
- [x] `07-advanced/starting-to-run.tsx`
- [x] `08-long-term/six-month-milestone.tsx`
- [x] `08-long-term/preventing-rerupture.tsx`

**Note:** Files already using short warnings were left as-is. All warnings now link to `blood-clot-prevention`.

---

### Phase 3: Trim Redundant Content (MEDIUM PRIORITY) ✅ COMPLETED

After adding links, trim the detailed explanations that are now redundant:

- [x] `post-boot-period.tsx` — Added links to all 8 elongation mentions
- [x] `six-month-milestone.tsx` — Already streamlined, forward links removed
- [x] `when-things-dont-go-to-plan.tsx` — Already has links to healing-process
- [x] `final-boot-phase.tsx` — Trimmed "What's happening inside" card, added link to healing-process

---

### Phase 4: Standardize Terminology (MEDIUM PRIORITY) ✅ COMPLETED

Standardized explanations for plantarflexion, dorsiflexion, elongation, MVIC, LSI.

**Approach:**

- First mention of technical terms includes link to authoritative source OR plain English explanation
- Subsequent mentions use plain English ("foot pointed down" instead of "plantarflexion")
- Authoritative sources preserved in `emergency-care.tsx` (plantarflexion/dorsiflexion), `healing-process.tsx` (elongation), `progressive-strengthening.tsx` (MVIC/LSI)

**Files updated:**

- [x] `03-boot-phase/boot-progression-protocol.tsx` - Added link to emergency-care, simplified subsequent mentions
- [x] `03-boot-phase/building-strength-in-boot.tsx` - Added link, simplified to "foot pointed down"
- [x] `03-boot-phase/your-walking-boot.tsx` - Simplified to "foot pointed down"
- [x] `02-early-treatment/choosing-your-boot.tsx` - Simplified to "foot pointed down"
- [x] `05-physiotherapy/starting-physio.tsx` - Kept links, simplified subsequent mentions
- [x] `05-physiotherapy/key-exercises.tsx` - Added link, simplified subsequent mentions
- [x] `05-physiotherapy/progressive-strengthening.tsx` - Added MVIC explanation, simplified positions
- [x] `07-advanced/return-to-sport.tsx` - Simplified to "pushing foot down"

---

### Phase 5: Trim `building-cardio.tsx` (MEDIUM PRIORITY) — DEFERRED

The swimming section (lines 199-560) is detailed but provides valuable guidance. Rather than cutting content, recommend keeping as-is. The 813-line file is comprehensive but not excessively long for a complete cardio guide.

**Status:** Content reviewed, no changes needed. Links already added.

---

### Phase 6: Deduplicate Boot Articles (LOW PRIORITY) ✅ COMPLETED

Removed overlap between `choosing-your-boot.tsx` and `your-walking-boot.tsx`.

**Changes made:**

- Trimmed `your-walking-boot.tsx` "Which is better?" section to remove duplicate comparison
- Added link back to `choosing-your-boot.tsx` for detailed comparison

**`choosing-your-boot.tsx` now focuses on:**

- Which boot to get (decision-making)
- Aircast vs VACOped pros/cons
- Equipment recommendations

**`your-walking-boot.tsx` now focuses on:**

- How your boot works (understanding)
- Angle system mechanics
- Keep the detailed images

**Estimated time:** 1-2 hours

---

### Phase 7: Fix Phase Numbering (LOW PRIORITY) ✅ COMPLETED

Standardized all phase terminology across the course.

**Standard definitions (from `recovery-roadmap.tsx`):**

- **Phase 1: Protection** (Weeks 0-8)
- **Phase 2: Transition** (Weeks 8-12)
- **Phase 3: Capacity** (Weeks 12-26)
- **Phase 4: Return to Sport** (Weeks 26+)

**Files updated:**

- `starting-physio.tsx` — Fixed week ranges (8-14 → 8-12, 14-26 → 12-26)
- `building-strength-in-boot.tsx` — Renamed "Post-Immobilization Period" → "Transition", "Single Leg Capacity" → "Capacity"
- `final-boot-phase.tsx` — Fixed phase names and week ranges
- `key-exercises.tsx` — Fixed week range (12-18 → 12-26)
- `post-boot-period.tsx` — Fixed week range (12-18 → 12-26)
- `walking-properly.tsx` — Fixed week range (12-18 → 12-26)
- `first-week-checklist.tsx` — Fixed phase names and week ranges

---

### Phase 8: Add Missing Images (LOW PRIORITY) ✅ COMPLETED

Generated and added images using ai-studio service:

| Article | Image Added |
|---------|-------------|
| `recovery-roadmap.tsx` | ✅ `recovery-roadmap-4-phases.png` — 4 phases timeline |
| `post-surgery-care.tsx` | ✅ `scar-massage-technique.png` — Massage technique demo |
| `functional-milestones.tsx` | ✅ `functional-milestones-checklist.png` — Phase 3 milestones |
| `when-things-dont-go-to-plan.tsx` | ✅ `recovery-progress-nonlinear.png` — Non-linear progress |
| `choosing-your-boot.tsx` | ✅ `aircast-vs-vacoped-comparison.png` — Boot comparison |
| `building-strength-in-boot.tsx` | ✅ `seated-calf-raise-phase1.png` — Exercise demo |

**Note:** `first-week-checklist.tsx` already has `proper-elevation-ankle-above-heart.png` available in assets.

---

### Phase 9: Add Website Cross-Links (LOW PRIORITY)

| Course Article | Link To |
|---------------|---------|
| `sleeping-with-boot.tsx` | `/sleeping-with-torn-achilles/` |
| `washing-and-hygiene.tsx` | `/washing-with-torn-achilles/` |
| `building-cardio.tsx` | `/swimming-with-torn-achilles/` |
| `treatment-decision.tsx` | `/evidence/` |

**Estimated time:** 30 minutes

---

### Phase 10: Soften Timelines (LOW PRIORITY)

Change specific week references to emphasize specialist guidance.

**Example:**

```tsx
// BEFORE:
"Weight-bearing typically starts at Week 4"

// AFTER:
"Weight-bearing timing varies — your specialist will advise when to start"
```

**Files to update:**

- `emergency-care.tsx`
- `starting-physio.tsx`
- `boot-progression-protocol.tsx`

**Estimated time:** 30 minutes

---

## Link Summary by Target

### Articles That Will Be Linked TO Most Often

| Article | Times Linked To | Topics |
|---------|-----------------|--------|
| `healing-process` | 12 | Elongation, tendon biology, re-rupture risk |
| `blood-clot-prevention` | 11 | DVT/PE warnings |
| `progressive-strengthening` | 8 | MVIC, LSI, 25+ heel raises |
| `emergency-care` | 7 | Plantarflexion, dorsiflexion, golden rule |
| `mental-health-recovery` | 4 | Psychological recovery, kinesiophobia |
| `sleeping-with-boot` | 3 | Night splint |
| `crutches-and-mobility` | 3 | EVENup |
| `post-boot-period` | 2 | Heel lifts |
| `return-to-sport` | 2 | Return criteria |

---

## Example Before/After

### Before (post-boot-period.tsx)

```tsx
{
    type: "text",
    content: "**Tendon elongation** is when your Achilles heals at a longer length than normal. This reduces your calf's power output and can affect your ability to push off when walking, running, or jumping. Studies show that even small amounts of elongation (5-10mm) can significantly impact function. The tendon is most vulnerable to elongation during the first 12 weeks when the new tissue is still weak and stretchy."
}
```

### After (post-boot-period.tsx)

```tsx
{
    type: "text",
    content: "**Tendon elongation** is your biggest long-term risk — it reduces calf power and affects push-off strength. [Understand why elongation happens and how to prevent it](/standard/healing-process)."
}
```

---

## Estimated Impact

| Metric | Before | After |
|--------|--------|-------|
| Elongation explanations | 9 detailed | 1 detailed + 8 links |
| DVT/PE warning length | ~50 words each | ~25 words + link |
| Thompson test explanations | 2 | 1 + 1 link |
| Boot comparison sections | 2 | 1 + 1 link |
| Heel lift explanations | 3 | 1 + 2 links |
| 25+ heel raise explanations | 5 | 1 + 4 links |
| `building-cardio.tsx` length | 813 lines | ~500 lines |
| Missing images | 7 | 0 |

---

## What We're NOT Doing (And Why)

| Original Idea | Why We're Not Doing It |
|---------------|----------------------|
| Create `core-concepts.tsx` glossary | Over-engineering. Patients won't use a glossary. Standardized inline explanations with links are better. |
| Split `building-cardio.tsx` into separate swimming article | Unnecessary. Swimming IS cardio. Just trim the content. |
| Merge boot articles | They serve different moments (choosing vs understanding). Deduplicate instead. |
| Remove DVT/PE warnings entirely | Safety critical. Keep warnings visible, just shorten them with links. |
| Remove driving/nutrition from returning-to-life | It's a milestone article. Keep brief summaries with links. |
| Reorder folder structure | Check navigation first. May not matter if menu-driven. |

---

## Questions to Resolve

1. **Do you want anchor links?** e.g., `/standard/healing-process#elongation` — This requires adding `id` attributes to headings in the ContentRenderer.

2. **Should links open in same tab or new tab?** Currently same tab (standard behavior).

3. **Any articles that should NOT link back?** (e.g., emergency articles that need to be self-contained)

---

## Implementation Checklist Summary

### Week 1: High Impact Items

- [x] Phase 1: Add links to later articles (24 articles) ✅ COMPLETED
- [x] Phase 2: Standardize DVT/PE warnings (15+ files) ✅ COMPLETED
- [x] Remove forward links (only backward links remain) ✅ COMPLETED
- [x] Remove external links (no links outside /standard/) ✅ COMPLETED

### Week 2: Medium Impact Items

- [x] Phase 3: Trim redundant content (4 articles) ✅ COMPLETED
- [x] Phase 4: Standardize terminology (8 files) ✅ COMPLETED
- [x] Phase 5: Trim building-cardio.tsx swimming section — DEFERRED (content is valuable)

### Week 3: Low Impact Items

- [x] Phase 6: Deduplicate boot articles ✅ COMPLETED
- [x] Phase 7: Fix phase numbering ✅ COMPLETED
- [x] Phase 8: Add missing images ✅ COMPLETED

### Final Review

- [ ] Test all internal links work
- [ ] Verify phase terminology is consistent
- [ ] Read through course start-to-finish for flow
