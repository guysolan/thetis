# Course Content and Image Review Plan

## Overview

Comprehensive review addressing content consolidation, image optimization (quality and relevance), exercise timing alignment with lecture, and addition of dorsiflexion/plantarflexion definition lesson.

## Critical Issues Identified

### 1. Missing Foundational Lesson: Dorsiflexion/Plantarflexion Definitions

**Problem**: Terms "plantarflexion" and "dorsiflexion" are used throughout the course but never properly defined with visual aid.

**Solution Options**:

- **Option A (Recommended)**: Add new section to `week-0-day-0-emergency-care.tsx`
  - Insert after "Understanding Your Injury" section, before "The Snap" section
  - Add clear definitions with image showing both positions side-by-side
  - Title: "Understanding Foot Movements: Plantarflexion and Dorsiflexion"
  
- **Option B**: Create new lesson `week-0-day-2-understanding-foot-movements.tsx`
  - Add to `sections.ts` as section_number 2.5 (between Day 1 and Day 3)
  - Dedicated lesson for foot movement definitions
  - More comprehensive but adds another lesson

**Recommendation**: Option A - incorporate into Week 0 Day 0 since it already discusses foot position and plantarflexion. This keeps foundational information together.

**Image Needed**: Clear diagram showing:

- Plantarflexion (pointed down/toes down) - SAFE position
- Dorsiflexion (toes up) - UNSAFE early in recovery
- Side-by-side comparison
- Labeled clearly for patients

### 2. Exercise Introduction Timing Misalignment

**Problem**: According to `achilles-rupture-rehab-lecture.md`:

- Exercises start **Week 2-3** (seated calf raises)
- Week 9 covers Phase 1 exercises overview
- Week 12 covers "7 Best Exercises" (Phase 2 exercises)

But Week 12 is the first comprehensive exercise lesson, which is too late.

**Current State**:

- Week 9 mentions Phase 1 exercises but doesn't detail them comprehensively
- Week 12 introduces 7 exercises but these are Phase 2 exercises
- No dedicated lesson for Phase 1 exercises (Week 2-3 start)

**Solution**:

1. **Enhance Week 2-3 content** - Add detailed Phase 1 exercise instructions (seated calf raises, intrinsic foot work)
   - Could add to `week-2-day-4-your-walking-boot.tsx` or create new lesson
   - Align with lecture timing (Week 2-3 start)
2. **Review Week 12** - Consolidate exercises, check if all 7 are essential
3. **Align timing** - Ensure exercises introduced when lecture says they start

**Week 12 Review Questions**:

- Are all 7 exercises essential? (Seated calf raise, Standing two-foot, Single-leg, Towel stretch, Resistance band, Balance, Ankle pumps)
- Some exercises (ankle pumps, towel stretch) might be redundant or could be consolidated
- Consider: Are ankle pumps really a "key exercise" or just maintenance?
- Consider: Is towel stretch necessary if resistance bands cover flexibility?

**Recommendation**: Consolidate Week 12 to 5 core exercises:

- **Core Exercises** (5): Seated calf raises, Standing two-foot, Single-leg heel raises, Resistance bands, Balance training
- **Move to supporting content**: Towel stretch (flexibility section), Ankle pumps (maintenance/tips)

### 3. Image Quality and Relevance Review

**Current Image Usage**:

- Week 12: 7 images (most of any lesson)
- Some lessons: 0-1 images
- Need to review: Are images high quality? Are they relevant? Do they add value?

**Image Review Criteria**:

1. **Quality**: Clear, professional, patient-friendly
2. **Relevance**: Directly supports content, not decorative
3. **Necessity**: Does it clarify something text can't? Or is it redundant?
4. **Consistency**: Similar images should have consistent style
5. **File Size**: Check if images need optimization

**Actions**:

- Review all images in `apps/course/src/assets/` folder
- Check image file sizes (some may be too large - optimize if needed)
- Verify images match their captions and alt text
- Identify missing images that would improve understanding
- Remove or replace low-quality/redundant images
- View images to assess quality (if possible)

**Specific Image Concerns**:

- Week 12: 7 images - are all necessary? Some might be redundant
- Product images (boots, splints) - are these high quality photos or need improvement?
- Exercise images - do they clearly show form? Could they be better?
- New dorsiflexion/plantarflexion image needed

### 4. Content Consolidation

**DVT/PE Explanations** (2367 matches)

- Create definitive explanation in Week 0 Day 1
- Reference briefly in other lessons

**"Golden Rule" / "Snakes and Ladders"** (10 matches)

- Establish in Week 0 Day 0 (already done)
- Reference in relevant lessons

**Plantarflexion/Dorsiflexion Terminology** (55 matches)

- **NEW**: Add definition section to Week 0 Day 0 OR create Week 0 Day 2 lesson
- Standardize to "pointed down (plantarflexion)" format after definition

**Phase Definitions** (62 matches)

- Standardize Phase 1, 2, 3, 4 definitions
- Create reference blocks

**Heel Raise Targets** (63 matches)

- Standardize target numbers
- Clarify Phase 2 vs Phase 3 targets

### 5. Week 12 Exercise Consolidation Analysis

**Current 7 Exercises**:

1. Seated Calf Raises - **ESSENTIAL** (foundation, Phase 1)
2. Standing Two-Foot Calf Raises - **ESSENTIAL** (progression)
3. Single-Leg Heel Raises - **ESSENTIAL** (Phase 2 goal)
4. Towel Stretch - **QUESTIONABLE** (gentle flexibility - is this critical?)
5. Resistance Band Exercises - **ESSENTIAL** (strength building)
6. Balance Training - **ESSENTIAL** (coordination)
7. Ankle Pumps and Circles - **QUESTIONABLE** (maintenance, not key exercise)

**Recommendations**:

- **Keep as Core Exercises** (5): 1, 2, 3, 5, 6
- **Move to Supporting Content**:
  - 4 (Towel stretch) → Flexibility section or tips
  - 7 (Ankle pumps) → Maintenance/tips section
- **Result**: Focus on 5 core exercises, move others to supporting content

**Alternative Structure**:

- **Core Phase 2 Exercises** (5 exercises): Seated, Standing, Single-leg, Resistance bands, Balance
- **Supporting Content**: Flexibility work (towel stretch), Maintenance activities (ankle pumps)

## Implementation Steps

### Phase 1: Add Missing Content

1. **Add dorsiflexion/plantarflexion definitions**
   - **Option A**: Add section to `week-0-day-0-emergency-care.tsx`
     - Insert after "Understanding Your Injury" section
     - Add clear definitions with image
   - **Option B**: Create `week-0-day-2-understanding-foot-movements.tsx`
     - Add to `sections.ts` as new lesson
     - More comprehensive approach
   - Generate/obtain clear image showing foot positions side-by-side

2. **Review and enhance Week 2-3 exercise introduction**
   - Ensure Phase 1 exercises are properly introduced
   - Align with lecture timing (Week 2-3 start)
   - Consider adding to `week-2-day-4-your-walking-boot.tsx` or creating new lesson

### Phase 2: Consolidate and Optimize

3. **Review Week 12 exercises**
   - Consolidate from 7 to 5 core exercises
   - Move ankle pumps to maintenance section
   - Consider consolidating towel stretch with flexibility content
   - Ensure exercise images are high quality and relevant
   - Update title from "7 Best Exercises" to "5 Essential Exercises" or similar

4. **Image audit**
   - Review all images for quality and relevance
   - Check file sizes (optimize if needed)
   - Verify alt text and captions
   - Remove redundant images
   - Identify missing images
   - View images to assess quality (if possible)

5. **Content standardization**
   - Create reference blocks for DVT/PE, Golden Rule, Phases
   - Standardize terminology
   - Update all lessons to use references

### Phase 3: Quality Check

6. **Verify timing alignment**
   - Exercises introduced at Week 2-3 (per lecture)
   - Phase 1 exercises covered before Phase 2
   - Week 12 focuses on Phase 2 exercises (not first introduction)

7. **Final review**
   - Check all images load correctly
   - Verify no broken references
   - Ensure consistency across lessons

## Files to Modify

**New Files (if Option B)**:

- `week-0-day-2-understanding-foot-movements.tsx` (if creating new lesson)
- Add to `sections.ts` as section_number 2.5

**Primary Changes**:

- ✅ `week-0-day-0-emergency-care.tsx` - Add dorsiflexion/plantarflexion definitions (Option A) **COMPLETED**
- `week-12-day-0-key-exercises.tsx` - Consolidate exercises, review images, add Scales Method
- `week-9-day-0-pre-physio-prep.tsx` - Ensure Phase 1 exercises properly covered, add Scales Method
- `week-15-day-0-progressive-strengthening.tsx` - Add dorsiflexion plate progression, clarify split positions
- `week-20-day-0-functional-milestones.tsx` - Consider adding dorsiflexion plate progression here instead
- `week-0-day-0-emergency-care.tsx` - Add viscoelastic properties explanation
- `week-1-day-3-specialist-appointment.tsx` - Consider adding rupture locations visual
- `week-2-day-4-your-walking-boot.tsx` - Consider adding Phase 1 exercise introduction

**Image Review**:

- Review all images in `apps/course/src/assets/`
- Check quality, relevance, file sizes
- Optimize or replace as needed
- Generate new dorsiflexion/plantarflexion image

## Missing Concepts from Lecture Images

### High Priority Missing Concepts

**1. Scales Method (47m25s) - HIGH VALUE**

- **What**: Home method using bathroom scales to measure progress
- **How**: Stand with part of body weight on scales, hold isometric in plantarflexion
- **Why**: Provides feedback without force plates - practical for patients
- **Where**: Week 9 (pre-physio prep) or Week 12 (key exercises)
- **Status**: Not mentioned in course at all
- **Action**: Add practical tip section explaining scales method

**2. Dorsiflexion Plate Progression (44m55s) - HIGH VALUE**

- **What**: Progressive introduction of dorsiflexion using plates (1", 1.5", 2")
- **How**: Start with 1" plate, progress to 2" as strength improves
- **Why**: Safe way to reintroduce dorsiflexion after healing
- **Where**: Week 15 (progressive strengthening) or Week 20 (functional milestones)
- **Status**: Not mentioned in course at all
- **Action**: Add section explaining dorsiflexion plate progression for Phase 3

### Medium Priority Enhancements

**3. Split Positions for Isometrics - MEDIUM VALUE**

- **What**: Using two positions for isometrics (top/plantarflexion vs middle/dorsiflexion)
- **Why**: Top position harder but important; middle position allows faster progression
- **Where**: Week 15 mentions isometrics but doesn't explain split strategy
- **Status**: Partially covered, needs clarification
- **Action**: Enhance Week 15 to explain split position strategy

**4. Fast Dorsiflexion Mechanism (10m30s) - MEDIUM VALUE**

- **What**: Viscoelastic properties - slow movements more dangerous than fast
- **Why**: Helps explain why ruptures happen during normal activities
- **Where**: Week 0 Day 0 (mechanism section)
- **Status**: Mechanism covered but viscoelastic properties not explained
- **Action**: Add viscoelastic explanation to Week 0 Day 0 mechanism section

**5. Rupture Locations (13m15s) - LOW-MEDIUM VALUE**

- **What**: Anatomical diagram showing mid-portion vs muscle-tendon junction vs insertion
- **Why**: Helps patients understand their specific rupture location
- **Where**: Week 1 Day 3 (specialist appointment)
- **Status**: Not visually explained
- **Action**: Consider adding visual to Week 1 Day 3 if space allows

## Implementation Priority

### Phase 1: Add Missing High-Value Concepts

1. **Scales Method** → Add to Week 9 or Week 12
2. **Dorsiflexion Plate Progression** → Add to Week 15 or Week 20

### Phase 2: Enhance Existing Content

3. **Split Positions for Isometrics** → Clarify in Week 15
4. **Fast Dorsiflexion Mechanism** → Add to Week 0 Day 0

### Phase 3: Consider Adding

5. **Rupture Locations** → Add visual to Week 1 Day 3 if space allows

## Key Decisions Needed

1. **Dorsiflexion/Plantarflexion definitions**: Option A (add to Week 0 Day 0) ✅ **COMPLETED**
2. **Week 12 exercises**: Confirm consolidation to 5 core exercises?
3. **Exercise timing**: Where should Phase 1 exercises be introduced? (Week 2-3 per lecture)
4. **Image quality**: Can we view images to assess quality? Need to check file sizes and visual quality.
5. **Missing lecture concepts**: Add Scales Method and Dorsiflexion Plate Progression to relevant lessons?
