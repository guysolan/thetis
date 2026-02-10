# Comparison: Video vs Lecture - Key Differences & Additions for Course

## Overview

**Lecture (Malliaras):** Evidence-based, elongation-focused protocol with detailed biomechanics and force calculations. More clinician-focused.

**Video:** Patient-friendly, practical exercise progressions with specific rep ranges and programming examples. More patient-focused.

---

## Unique Information in Video That Should Be Added to Course

### 1. Specific Exercise Programming & Rep Ranges

**Video provides:**

- **Phase 1:** 2-3 sets of 10-25 reps OR 15-45 second holds, 1-3 times per day
- **Phase 2:** Single leg balance - work up to 3 sets of 60 seconds
- **Phase 3:**
  - Seated heel raises: 3-4 sets of 6-15 reps (once can do 3x25 unweighted)
  - Standing heel raises: 3 sets of 25 (two leg) → 3 sets of 15 (single leg) → 3 sets of 15 (step) → 3-4 sets of 6-15 (weighted)
  - Programming: Minimum 1-2 heel raise exercises, 2-3 days per week
  - Example: Seated Monday/Friday, standing Wednesday

**Current course:** Lacks specific rep ranges and programming examples

**Recommendation:** Add specific rep ranges and programming examples to exercise sections, especially in `key-exercises.tsx` and `progressive-strengthening.tsx`

---

### 2. Retro Walking Exercise

**Video details:**

- "Fancy name for walking backward"
- Helpful for loading Achilles tendon and eccentric calf strength
- Easier variation: Hold onto object, step backward slowly, lower heel to ground, return to start
- Should be performed with shoes and heel lift

**Current course:** Not mentioned

**Recommendation:** Add to Phase 2 walking normalization section or `walking-properly.tsx`

---

### 3. Lower Body Strength Progression

**Video provides specific progression:**

1. Body weight squat
2. Low step up
3. High step up
4. Low step down
5. High step down

**Current course:** Mentions squat/deadlift variations but not this specific progression

**Recommendation:** Add to Phase 3 considerations in `progressive-strengthening.tsx`

---

### 4. Detailed Plyometric Progressions (3 Options)

**Video provides three distinct progressions:**

#### Option 1: Hopping Progression

1. Double leg hops in place
2. Side to side
3. Forward and backward
4. Same progression on single leg

#### Option 2: Vertical Jump Progression (6 levels)

1. Sub maximal vertical jump (two legs)
2. Double leg maximal vertical jump
3. Drop jump (step off elevated surface, land two legs, jump up)
4. Single leg sub maximal vertical jump
5. Single leg maximal vertical jump
6. Single leg drop jump

#### Option 3: Horizontal Jump Progression

1. Sub maximal horizontal jump (two legs, build to 80% effort)
2. Maximal horizontal jump (two legs)
3. Single leg submaximal jump
4. Single leg maximal jump
5. Stick landing during each repetition

**Current course:** Plyometrics mentioned but not this detailed

**Recommendation:** Add to Phase 4/advanced sections or create dedicated plyometrics lesson

---

### 5. Running Protocol Details

**Video provides:**

- University of Delaware example using treadmill
- Starts with walk-to-jog intervals
- Progresses to continuous jogging
- Then slowly ramps up to faster running speeds
- Rest 1-2 days between sessions
- Only progress if no soreness during or after
- If soreness during: drop down a level
- If soreness after: stay at same level next session

**Current course:** Running mentioned but not this detailed

**Recommendation:** Add to Phase 4 or advanced running section

---

### 6. Return to Sport Criteria

**Video provides:**

- 85% symmetry requirement: ankle plantarflexion strength, hopping, jumping tasks ≥85% of uninjured leg
- Example: If 20 heel raises with 20 lbs on uninjured side → need at least 17 reps with same weight on injured side
- Return process: Modified practice → full participation → perform at/above pre-injury level
- Return to play rates: 70-80% across various sports

**Current course:** Return to sport mentioned but lacks specific criteria

**Recommendation:** Add to Phase 5 or return-to-sport section

---

### 7. Milestone Recommendation

**Video provides:**

- By third month: Single leg seated heel raise with 50% body weight for >20 repetitions
- Research correlation: This ability correlates with ability to perform single leg standing heel raise
- Single leg standing heel raise significantly related to patient-reported outcomes

**Current course:** Phase 2 goals mentioned but not this specific milestone

**Recommendation:** Add to Phase 2 goals section or `progressive-strengthening.tsx`

---

### 8. Phase 1 Exercise Variations

**Video provides more options:**

- Resistance band around ball of foot for plantarflexion (reps or hold)
- Calf isometrics throughout the day (push ball of foot into ground)
- Can be done while wearing boot
- Heel elevated on wedge to limit dorsiflexion

**Current course:** Mentions seated heel raises but not all these variations

**Recommendation:** Expand Phase 1 exercise section in `building-strength-in-boot.tsx`

---

### 9. Individual Progress Messaging

**Video emphasizes:**

- Aaron Rodgers example: returned to football activities at 11 weeks (not typical)
- Older/less active patients may progress slower - "That's okay"
- Progress determined by symptoms and function, not just time
- Keep exercises tolerable, follow precautions, address specific deficits

**Current course:** Has some messaging but could be stronger

**Recommendation:** Add to multiple sections emphasizing individual variation

---

### 10. Phase 3 Additional Considerations

**Video provides:**

- Aerobic exercise: Stationary bike for cardiorespiratory fitness
- Calf stretches: Can eventually perform, but aggressive stretching not recommended early
- Step downs and deficit heel raises help restore dorsiflexion ROM (replaces aggressive stretching)

**Current course:** Mentions some but not as clearly

**Recommendation:** Add to Phase 3 sections

---

## Information in Lecture That Should Be Added (Not in Video)

### 1. Elongation-Focused Philosophy

- Elongation is the gateway to return to sport
- Everyone gets elongated - goal is to minimize it
- Critical window: 0-16 weeks (can reverse), 16-20 weeks (harder), after 16 weeks (very difficult)

**Recommendation:** Add elongation education to early phases

### 2. Force Calculations

- Walking in boot: ~1x body weight
- Walking without boot: ~3.2x body weight
- 20° plantarflexion with 50% body weight = ~1.5x body weight through tendon

**Recommendation:** Add to weight-bearing progression sections

### 3. Boot Removal Criteria

- NOT time-based
- Based on predicted load vs walking load
- Generally 11-12 weeks (not 8 weeks)

**Recommendation:** Add to boot removal sections

### 4. Scales Method

- Use scales + step for feedback on isometric progress
- Shows how much body weight can be held

**Recommendation:** Add as tip in Phase 1/2 sections

---

## Key Differences in Approach

### Video Approach:

- More patient-friendly language
- Specific rep ranges and programming
- Practical examples and variations
- Emphasis on individual progress
- More exercise options

### Lecture Approach:

- Evidence-based biomechanics
- Force-based progression
- Elongation-focused
- More detailed measurement
- Clinician-focused

---

## Recommendations for Course Updates

### High Priority:

1. ✅ Add specific rep ranges to all exercise sections
2. ✅ Add programming examples (e.g., Monday/Friday seated, Wednesday standing)
3. ✅ Add retro walking exercise to Phase 2
4. ✅ Add detailed plyometric progressions (3 options)
5. ✅ Add running protocol details
6. ✅ Add return to sport criteria (85% symmetry)

### Medium Priority:

7. ✅ Add lower body strength progression (squat → step up → step down)
8. ✅ Expand Phase 1 exercise variations
9. ✅ Add milestone recommendation (50% body weight seated heel raise by month 3)
10. ✅ Strengthen individual progress messaging

### Lower Priority (but valuable):

11. ✅ Add elongation education (from lecture)
12. ✅ Add force calculations (from lecture)
13. ✅ Add scales method tip
14. ✅ Add Phase 3 additional considerations (aerobic, stretching)

---

## Files That Need Updates

1. `03-boot-phase/building-strength-in-boot.tsx` - Add Phase 1 exercise variations, rep ranges
2. `05-physiotherapy/key-exercises.tsx` - Add rep ranges, programming examples
3. `05-physiotherapy/walking-properly.tsx` - Add retro walking
4. `05-physiotherapy/progressive-strengthening.tsx` - Add lower body progression, milestone
5. `07-advanced/plyometrics.tsx` - Add detailed progressions (3 options)
6. `07-advanced/starting-to-run.tsx` - Add running protocol details
7. `07-advanced/return-to-sport.tsx` (if exists) - Add return criteria, 85% symmetry
8. Multiple files - Add individual progress messaging, elongation education

---

## Summary

The video provides **practical, patient-friendly exercise details** that complement the lecture's **evidence-based biomechanics**. The course should integrate both:

- **From video:** Specific rep ranges, programming examples, exercise variations, practical progressions
- **From lecture:** Elongation focus, force calculations, biomechanical understanding

The combination would create a comprehensive course that is both evidence-based and practically actionable for patients.
