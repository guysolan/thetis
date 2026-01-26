# Article Content Review: Verbosity and Conciseness

This review identifies articles in `apps/course/src/content/course/standard/` that are excessively wordy and provides specific suggestions for radical word count reduction while preserving core value.

## Overall Patterns of Verbosity

Across almost all articles, the following elements consistently use too many words:

- **Intros:** Often contain 3-4 sentences of context that can be reduced to 1-2 punchy sentences.
- **"What's Normal vs What's Urgent":** These blocks are repetitive across multiple lessons. They could be standard components with minimal variations.
- **FAQ Answers:** Frequently repeat information already covered in the main sections in great detail.
- **Card Descriptions:** Often redundant given the Card Title.
- **Practical Tips & For Partners:** These sections often repeat the "Action Plan" or "Checklist" at the start.

---

## 00-Practical

- **`driving-guidelines.tsx`**: High verbosity. The car type/leg combinations are explained multiple times.
  - *Reduction:* Use a simple table or concise list for the leg/transmission rules. Shorten the "Insurance" and "Safety" sections.
- **`first-week-checklist.tsx`**: Very wordy intro and redundant explanations for checklist items.
  - *Reduction:* Remove the "Why it matters" text for simple items like "Buy a shower chair."
- **`mental-health-recovery.tsx`**: Contains long paragraphs about frustration and anxiety.
  - *Reduction:* Use bullet points for coping strategies. Reduce the descriptive text in the "Why you feel this way" cards.
- **`pain-management-throughout-recovery.tsx`**: Repetitive definitions of "normal" vs "abnormal" pain.
  - *Reduction:* Consolidate the pain scale descriptions. Shorten the "How to manage" section.

## 01-Emergency

- **`emergency-care.tsx`**: The "First 24-72 hours" section is very descriptive.
  - *Reduction:* Convert the narrative into a simple "Do This / Not That" list.
- **`blood-clot-prevention.tsx`**: Extremely detailed on biological mechanisms.
  - *Reduction:* Focus strictly on "Risk Factors," "Signs," and "Actions." Remove detailed medical explanations of why clots form.

## 02-Early Treatment

- **`choosing-your-boot.tsx`**: Long comparisons between brands.
  - *Reduction:* Use a simple comparison table for Aircast vs VACOped. Shorten the accessory descriptions.
- **`specialist-appointment.tsx`**: Intro and "What to expect" are very narrative.
  - *Reduction:* Use a checklist for "What to bring" and "What to ask." Shorten the descriptions of physical tests.
- **`treatment-decision.tsx`**: Very long explanation of the UKSTAR trial.
  - *Reduction:* Summarize the trial in 1 sentence ("Outcomes are similar for surgery vs non-surgical"). Focus on the decision criteria list.

## 03-Boot Phase

- **`boot-progression-protocol.tsx`**: This is one of the wordiest files. It explains the same concept (angle reduction) multiple times.
  - *Reduction:* Use a clear timeline or table. Remove the redundant "Why it matters" for every single wedge removal.
- **`building-strength-in-boot.tsx`**: Long intros to each exercise.
  - *Reduction:* Use "Action: [What to do]" and "Goal: [Why]" format. Remove filler text.
- **`crutches-and-mobility.tsx`**: Very descriptive about leg length discrepancy.
  - *Reduction:* Shorten the "EVENup" recommendation to a single tip card.
- **`final-boot-phase.tsx`**: Narrative and repetitive about "patience."
  - *Reduction:* Focus on the "Exit Criteria" for the boot.
- **`healing-process.tsx`**: High biological detail (Proliferative stage, etc.).
  - *Reduction:* Condense the science. Patients need to know "It's weak but healing," not the exact collagen types being formed.
- **`nutrition-for-healing.tsx`**: Redundant lists of foods.
  - *Reduction:* One simple list of "Key Nutrients" and "Top 5 Foods." Remove the "Why it matters" paragraphs.
- **`sleeping-with-boot.tsx`**: Long descriptions of why it's uncomfortable.
  - *Reduction:* List the 3 best positions and 2 best products. Done.
- **`washing-and-hygiene.tsx`**: Very wordy about bathroom safety.
  - *Reduction:* Use a "Safe Washing Checklist."
- **`your-walking-boot.tsx`**: Explains boot types again (redundant with `choosing-your-boot`).
  - *Reduction:* Focus only on "How to wear it" and "The Angle System."

## 04-Transition

- **`post-boot-period.tsx`**: High verbosity in "Part 1" and "Part 2" intros.
  - *Reduction:* Merge sections. Shorten the "Stiffness" explanation.
- **`scar-management.tsx`**: Long descriptions of Bio-Oil and sun protection.
  - *Reduction:* 3 bullet points for massage, 1 for oil, 1 for sun.

## 05-Physiotherapy

- **`key-exercises.tsx`**: **Extremely wordy.** Detailed "Advanced Testing" sections are too technical for most users.
  - *Reduction:* Move ISOM testing to a "Professional Reference" section or drastically shorten. Focus on the "How to do it" for the 6 exercises.
- **`progressive-strengthening.tsx`**: Repeating "Tendon Elongation" risks multiple times.
  - *Reduction:* Summarize elongation risk once. Focus on the repetition targets (15, 25 reps).
- **`starting-physio.tsx`**: Very long "What happens" narrative.
  - *Reduction:* Use a simple "First Session Checklist."
- **`walking-properly.tsx`**: Narrative about "re-learning to walk."
  - *Reduction:* Focus on "3 Cues for Better Walking" (Heel-to-toe, Step length, Symmetry).

## 06-Recovery

- **`building-cardio.tsx`**: Repetitive safe cardio options.
  - *Reduction:* Use a simple "Green/Yellow/Red" light list for cardio types.
- **`functional-milestones.tsx`**: Intro and "What if" sections are wordy.
  - *Reduction:* 4 Cards: Milestone | How to Test | Fix.
- **`returning-to-life.tsx`**: Redundant info on driving and work.
  - *Reduction:* Link to the earlier driving guide or summarize in 2 sentences.

## 07-Advanced

- **`plyometrics.tsx`**: Long intros to Phases 1, 2, and 3.
  - *Reduction:* Focus on the exercise name and reps. Remove "Why it's safe" for every exercise.
- **`return-to-sport.tsx`**: Narrative about symmetry.
  - *Reduction:* Focus on the 85% rule and the 3 stages of return.
- **`starting-to-run.tsx`**: Repetitive walk-jog intervals.
  - *Reduction:* Use a clear Week 1-5 table.

## 08-Long Term

- **`new-normal.tsx`**: Narrative about acceptance.
  - *Reduction:* Bullet points for "Permanent Changes" and "Ongoing Maintenance."
- **`preventing-rerupture.tsx`**: Repeating re-rupture stats from Lesson 4.
  - *Reduction:* Focus strictly on the "Warm-up" and "Warning Signs."
- **`six-month-milestone.tsx`**: Redundant with `return-to-sport`.
  - *Reduction:* Focus on the "Psychological Readiness" which is unique to this lesson.
- **`when-things-dont-go-to-plan.tsx`**: Narrative about frustration.
  - *Reduction:* 3 sections: Signs of trouble | Who to see | Action steps.
