# Recommendations: New Sections vs Adding to Existing Files

## Analysis of Current Course Structure

### Existing Related Sections:
- `preventing-rerupture` - Focuses on prevention strategies, risk factors
- `six-month-milestone` - Mentions return-to-sport criteria but milestone-focused
- `plyometrics` - Covers jumping progressions
- `starting-to-run` - Covers running initiation
- **NO dedicated "Return to Sport" section exists**

---

## Recommendations: New Sections vs Additions

### ✅ **NEW SECTION RECOMMENDED**

#### 1. **Return to Sport** (`07-advanced/return-to-sport.tsx`)

**Why it needs its own section:**
- Phase 5 is a major milestone that deserves comprehensive coverage
- Video provides substantial content: 85% symmetry criteria, return process stages, return-to-play rates
- Currently scattered across `preventing-rerupture` and `six-month-milestone`
- Would cover:
  - Return-to-sport criteria (85% symmetry requirement with examples)
  - Return process continuum (modified practice → full participation → pre-injury level)
  - Return-to-play rates (70-80% across sports)
  - Sport-specific progressions
  - Psychological readiness
  - Timeline expectations

**Timing:** Week 30-32 (after plyometrics, when approaching return)

**Placement in sections.ts:** After `plyometrics`, before `when-things-dont-go-to-plan`

---

### ✅ **POTENTIALLY NEW SECTION**

#### 2. **Exercise Programming** (`05-physiotherapy/exercise-programming.tsx`)

**Why it could be its own section:**
- Video provides specific programming examples (e.g., "Seated Monday/Friday, standing Wednesday")
- Rep ranges, sets, frequency guidance
- How to structure workouts throughout the week
- Could be valuable standalone reference

**Why it might fit in existing:**
- Could be added to `key-exercises.tsx` as a new section
- Could be part of `progressive-strengthening.tsx`

**Recommendation:** **Add to existing** (`key-exercises.tsx`) unless it becomes too long, then split out

---

### ❌ **NOT NEW SECTIONS** (Add to existing)

#### 3. **Phase 1 Exercise Variations** → Add to `building-strength-in-boot.tsx`
- Fits naturally in Phase 1 section
- Not substantial enough for own section

#### 4. **Retro Walking** → Add to `walking-properly.tsx`
- Single exercise, fits in walking section
- Too small for own section

#### 5. **Lower Body Strength Progression** → Add to `progressive-strengthening.tsx`
- Fits in progressive strengthening section
- Part of Phase 3 considerations

#### 6. **Detailed Plyometric Progressions** → Expand `plyometrics.tsx`
- Section already exists, just needs more detail
- Add the 3 progressions (hopping, vertical jump, horizontal jump)

#### 7. **Running Protocol Details** → Expand `starting-to-run.tsx`
- Section already exists
- Add University of Delaware protocol details

#### 8. **Milestone Recommendation** → Add to `progressive-strengthening.tsx` or `functional-milestones.tsx`
- Fits in milestone/strengthening context
- Not substantial enough for own section

#### 9. **Individual Progress Messaging** → Add throughout multiple files
- Should be integrated into existing sections
- Not a standalone topic

#### 10. **Elongation Education** → Add to early sections (`healing-process.tsx` or `building-strength-in-boot.tsx`)
- Important concept but fits in existing educational sections
- Could be added to `healing-process.tsx` or early boot phase sections

---

## Summary: What Should Be New Sections

### **Definitely New:**
1. ✅ **Return to Sport** (`07-advanced/return-to-sport.tsx`)
   - Major Phase 5 milestone
   - Substantial content from video
   - Currently missing comprehensive coverage

### **Consider New (but probably add to existing):**
2. ⚠️ **Exercise Programming** (`05-physiotherapy/exercise-programming.tsx`)
   - Could be valuable standalone reference
   - But probably fits better in `key-exercises.tsx` as expanded section
   - **Recommendation:** Add to existing first, split later if needed

### **Add to Existing:**
- All other items should be added to existing files as they fit naturally into current structure

---

## Proposed New Section Structure

### Return to Sport Section

**File:** `apps/course/src/content/course/standard/07-advanced/return-to-sport.tsx`

**Timing:** Week 30-32 (after plyometrics)

**Content from video:**
- Return-to-sport criteria (85% symmetry requirement)
- Example: "If 20 heel raises with 20 lbs on uninjured side → need at least 17 reps on injured side"
- Return process continuum:
  1. Modified practice and sport-specific drills
  2. Full participation
  3. Perform at/above pre-injury level
- Return-to-play rates: 70-80% across various sports
- Timeline: Usually takes place over several months
- Psychological readiness
- Sport-specific considerations

**Placement in sections.ts:**
```typescript
// After plyometrics (week 31)
createSection(
  "return-to-sport",
  "Return to Sport",
  "Criteria, process, and timeline for returning to your sport",
  {
    when_useful: "When preparing to return to sport - usually around week 30-32",
    triggers: [
      "when meeting return criteria",
      "when cleared for sport",
      "when preparing for return",
    ],
    approximate_days: 210, // ~30 weeks
  },
  "drafting",
),
```

---

## Implementation Priority

### High Priority (New Section):
1. **Create `return-to-sport.tsx`** - Major gap in course coverage

### Medium Priority (Add to Existing):
2. Add exercise programming details to `key-exercises.tsx`
3. Add retro walking to `walking-properly.tsx`
4. Expand plyometric progressions in `plyometrics.tsx`
5. Expand running protocol in `starting-to-run.tsx`

### Lower Priority (Add to Existing):
6. Add Phase 1 variations to `building-strength-in-boot.tsx`
7. Add lower body progression to `progressive-strengthening.tsx`
8. Add elongation education to early sections
9. Add individual progress messaging throughout

---

## Files That Need Updates

### New Files to Create:
1. `apps/course/src/content/course/standard/07-advanced/return-to-sport.tsx` ⭐ **NEW**

### Existing Files to Update:
1. `03-boot-phase/building-strength-in-boot.tsx` - Add Phase 1 variations, rep ranges
2. `05-physiotherapy/key-exercises.tsx` - Add rep ranges, programming examples
3. `05-physiotherapy/walking-properly.tsx` - Add retro walking
4. `05-physiotherapy/progressive-strengthening.tsx` - Add lower body progression, milestone
5. `07-advanced/plyometrics.tsx` - Add detailed progressions (3 options)
6. `07-advanced/starting-to-run.tsx` - Add running protocol details
7. `03-boot-phase/healing-process.tsx` or `building-strength-in-boot.tsx` - Add elongation education
8. Multiple files - Add individual progress messaging

### Update sections.ts:
- Add new `return-to-sport` section entry
- Place after `plyometrics`, before `when-things-dont-go-to-plan`
