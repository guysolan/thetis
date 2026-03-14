# Lesson Combination & Removal Analysis

## Lessons That Can Be Combined

### 1. **Wedge Removal + Boot Progression Protocol** ⚠️ HIGH OVERLAP

**Current:**

- `boot-progression-protocol.tsx` (Week 2) - Overall protocol including angle reduction, weight-bearing
- `wedge-removal.tsx` (Week 5) - Focused specifically on wedge removal

**Analysis:**

- `boot-progression-protocol.tsx` already covers angle reduction/wedge removal as part of the overall protocol
- `wedge-removal.tsx` is essentially a detailed deep-dive into one aspect of the protocol
- Both cover: when to remove wedges, how to do it, what to expect

**Recommendation:**

- **COMBINE:** Merge `wedge-removal.tsx` content into `boot-progression-protocol.tsx`
- **Keep:** `boot-progression-protocol.tsx` as the comprehensive protocol guide
- **Remove:** `wedge-removal.tsx` as standalone lesson
- **Timing:** Week 2-5 content can be in one lesson, with clear sections for different stages

**Value:** Eliminates duplication, creates one comprehensive protocol resource

---

### 2. **Boot Transition + Post-Boot Challenges** ⚠️ SEQUENTIAL & RELATED

**Current:**

- `boot-transition.tsx` (Week 10) - Removing boot, choosing shoes, first steps
- `post-boot-challenges.tsx` (Week 14) - Stiffness, swelling, avoiding aggressive stretching

**Analysis:**

- Both cover the post-boot period (weeks 10-14)
- `boot-transition` is about the transition itself
- `post-boot-challenges` is about managing issues that arise after transition
- Sequential timing suggests they could be one lesson

**Recommendation:**

- **COMBINE:** Merge into one "Post-Boot Period" lesson
- **Structure:**
  - Part 1: Transition (removing boot, choosing shoes, first steps)
  - Part 2: Managing challenges (stiffness, swelling, stretching)
- **Timing:** Week 10-14 (covers both periods)

**Value:** Creates comprehensive post-boot guide, eliminates artificial split

---

### 3. **Swimming + Building Cardio** ⚠️ OVERLAP

**Current:**

- `swimming-and-water-activities.tsx` (Week 12) - Dedicated swimming guide
- `building-cardio.tsx` (Week 17) - Covers swimming, bike, elliptical, walking

**Analysis:**

- `building-cardio.tsx` already covers swimming as one cardio option
- `swimming-and-water-activities.tsx` is a detailed deep-dive into swimming
- Both cover: when to start, safety, exercises, benefits

**Recommendation:**

- **COMBINE:** Merge detailed swimming content into `building-cardio.tsx`
- **Keep:** `building-cardio.tsx` as comprehensive cardio guide with detailed swimming section
- **Remove:** `swimming-and-water-activities.tsx` as standalone lesson
- **Timing:** Week 12-17 content in one lesson

**Value:** Eliminates duplication, creates one comprehensive cardio resource

---

### 4. **Your Walking Boot + Boot Adjustment and Care** ⚠️ CONSIDER COMBINING

**Current:**

- `your-walking-boot.tsx` (Week 2) - Boot basics, types, angle system, links to other sections
- `boot-adjustment-and-care.tsx` (Week 2) - Fitting, straps, padding, maintenance

**Analysis:**

- `your-walking-boot.tsx` is more of an overview/intro that links to other sections
- `boot-adjustment-and-care.tsx` is practical fitting and care
- Both are Week 2, both essential boot knowledge

**Recommendation:**

- **OPTION A:** Keep separate - they serve different purposes (overview vs practical)
- **OPTION B:** Combine into one comprehensive "Your Walking Boot" lesson with sections:
  - Boot types and basics
  - Fitting and adjustment
  - Care and maintenance
  - Protocol overview (links to boot-progression-protocol)

**Value:** Option B creates one comprehensive boot resource, but might be long

**Decision needed:** Is the overview lesson (`your-walking-boot.tsx`) adding value, or is it just linking to other sections?

---

## Lessons That Might Be Removed

### 5. **Scar Management** ⚠️ POTENTIALLY REMOVE OR MERGE

**Current:**

- `scar-management.tsx` (Week 12) - Standalone lesson on scar tissue, massage, bio-oil

**Analysis:**

- Post-boot topic (Week 12)
- Could be part of `boot-transition.tsx` or `post-boot-challenges.tsx`
- Relatively small topic for standalone lesson

**Recommendation:**

- **OPTION A:** Merge into `boot-transition.tsx` or combined post-boot lesson
- **OPTION B:** Keep if there's substantial unique content
- **Check:** How much content is in scar-management.tsx? If <200 lines, merge it

**Value:** Reduces lesson count, keeps related content together

---

## Lessons to Keep Separate (Distinct Value)

### ✅ Keep Separate - Clear Distinct Value:

1. **`building-strength-in-boot.tsx`** - Phase 1 exercises, unique force comparison content
2. **`final-boot-phase.tsx`** - Preparing for boot removal, Phase 2/3 preview
3. **`starting-physio.tsx`** - Starting physiotherapy, Phase 2 goals (primary source)
4. **`key-exercises.tsx`** - Detailed exercise instructions
5. **`walking-properly.tsx`** - Gait retraining (unique focus)
6. **`progressive-strengthening.tsx`** - Advanced strengthening progression
7. **`functional-milestones.tsx`** - Testing and assessment
8. **`returning-to-life.tsx`** - Work, driving, practical life (distinct from exercise)
9. **`starting-to-run.tsx`** - Running-specific (distinct from general cardio)
10. **`plyometrics.tsx`** - Jumping/explosive training (distinct from running)
11. **`return-to-sport.tsx`** - Return criteria and process (distinct value)
12. **`six-month-milestone.tsx`** - Milestone assessment (distinct timing/value)
13. **`preventing-rerupture.tsx`** - Prevention strategies (distinct focus)
14. **`when-things-dont-go-to-plan.tsx`** - Problem-solving (distinct purpose)
15. **`new-normal.tsx`** - Long-term perspective (final section, distinct value)

---

## Summary: Recommended Combinations

### High Priority Combinations:

1. ✅ **Merge `wedge-removal.tsx` → `boot-progression-protocol.tsx`**
   - Eliminates duplication
   - Creates comprehensive protocol guide
   - **Remove:** `wedge-removal.tsx`

2. ✅ **Merge `boot-transition.tsx` + `post-boot-challenges.tsx` → "Post-Boot Period"**
   - Sequential topics, related content
   - Creates comprehensive post-boot guide
   - **Remove:** Both, create new combined lesson

3. ✅ **Merge `swimming-and-water-activities.tsx` → `building-cardio.tsx`**
   - Eliminates duplication
   - Creates comprehensive cardio guide
   - **Remove:** `swimming-and-water-activities.tsx`

### Medium Priority (Consider):

4. ⚠️ **Consider merging `your-walking-boot.tsx` + `boot-adjustment-and-care.tsx`**
   - Both Week 2, related topics
   - Decision: Is overview lesson adding value or just linking?

5. ⚠️ **Consider merging `scar-management.tsx` → post-boot lesson**
   - Small topic, post-boot timing
   - Check content size first

---

## Impact: Lessons Removed/Combined

### If All Recommendations Implemented:

**Remove:**

- `wedge-removal.tsx` (merge into boot-progression-protocol)
- `boot-transition.tsx` (merge into new post-boot lesson)
- `post-boot-challenges.tsx` (merge into new post-boot lesson)
- `swimming-and-water-activities.tsx` (merge into building-cardio)

**Create:**

- New combined "Post-Boot Period" lesson (from boot-transition + post-boot-challenges)

**Result:**

- **-4 lessons** (remove 4, create 1 = net -3 lessons)
- **Better organization** - related content together
- **Less duplication** - comprehensive guides instead of fragmented topics

---

## Files Requiring Updates

### To Remove:

1. `03-boot-phase/wedge-removal.tsx` - Merge content into boot-progression-protocol.tsx
2. `04-transition/boot-transition.tsx` - Merge into new post-boot lesson
3. `04-transition/post-boot-challenges.tsx` - Merge into new post-boot lesson
4. `06-recovery/swimming-and-water-activities.tsx` - Merge into building-cardio.tsx

### To Update:

1. `03-boot-phase/boot-progression-protocol.tsx` - Add wedge removal content
2. `06-recovery/building-cardio.tsx` - Add detailed swimming content
3. Create: `04-transition/post-boot-period.tsx` - Combined boot-transition + post-boot-challenges

### To Update sections.ts:

- Remove 4 section entries
- Add 1 new section entry
- Update cross-references

---

## Decision Points

### Need User Input:

1. **`your-walking-boot.tsx` vs `boot-adjustment-and-care.tsx`:**
   - Keep separate (current)?
   - Or combine into one comprehensive boot lesson?

2. **`scar-management.tsx`:**
   - Keep standalone?
   - Or merge into post-boot lesson?

3. **Combined lesson naming:**
   - "Post-Boot Period"?
   - "After Boot Removal"?
   - Other name?

---

## Benefits of Combining

1. **Reduces duplication** - Related content in one place
2. **Better user experience** - Comprehensive guides instead of fragmented topics
3. **Easier maintenance** - Fewer files to update
4. **Clearer structure** - Logical grouping of related content
5. **Fewer lessons** - Less overwhelming for users

---

## Risks of Combining

1. **Longer lessons** - Combined lessons might be very long
2. **Timing issues** - Some content might be needed earlier than other content
3. **Loss of focus** - Combined lessons might lose specific focus

**Mitigation:** Use clear sections within combined lessons, maintain chronological flow
