# Achilles Rupture Email Sequence Analysis

## Overview
The subscribe workflow sends **11 emails over 70 days** to Achilles rupture patients, triggered automatically when a new user signs up (if `email_course_enabled` is true).

---

## Email Sequence & Timing

| Email | Day | Subject | Focus |
|-------|-----|---------|-------|
| **Email 1** | Day 0 | Welcome to Thetis | Introduction, basic rule (toes down) |
| **Email 2** | Day 1 | Protect the tendon (toes down) | Protection, elevation, red flags |
| **Email 3** | Day 3 | Essential questions for your specialist appointment | Preparing for specialist visit |
| **Email 4** | Day 5 | Essential items and mobility tips | **First product mention (splint)** |
| **Email 5** | Day 7 | Understanding treatment options | Surgery vs non-surgical |
| **Email 6** | Day 9 | Your walking boot basics | Boot protocol, **splint for sleep** |
| **Email 7** | Day 10 | Week 1 routine + what's normal | Week 1 expectations, reassurance |
| **Email 8** | Day 21 | Why your gait feels weird (and tips to help) | Mobility, **splint mentioned twice** |
| **Email 9** | Day 35 | Getting ready to rebuild strength | Preparing for physio |
| **Email 11** | Day 49 | Preparing for life after the boot | Boot removal prep, shoe selection |
| **Email 10** | Day 70 | How far you've come | Week 10 check-in, progress reflection |

**⚠️ CRITICAL BUG:** Email 11 (Day 49) is positioned BEFORE Email 10 (Day 70) in `workflow.json`, but should come after. The workflow sends them in the wrong chronological order.

---

## Content Analysis

### Email 1 - Day 0: Welcome to Thetis
**Content:**
- Empathetic opening acknowledging the injury
- Introduction to Thetis resources
- **One rule:** Keep foot in tiptoe position
- Mentions Recovery Course link

**Tone:** Supportive, educational
**Sales Level:** ⭐ Low - Only educational course mention

---

### Email 2 - Day 1: Protect the tendon
**Content:**
- Detailed explanation of "toes down" rule
- Day 1 essentials (elevation, crutches, weight-bearing)
- Red flags for urgent care (blood clots, circulation issues)
- Mentions Recovery Course link

**Tone:** Educational, safety-focused
**Sales Level:** ⭐ Low - Only educational course mention

---

### Email 3 - Day 3: Questions for specialist
**Content:**
- Comprehensive list of questions organized by category:
  - Diagnosis questions
  - Treatment protocol questions
  - Safety questions (blood thinners, red flags)
  - Daily life questions
- Mentions Recovery Course link

**Tone:** Empowering, practical
**Sales Level:** ⭐ Low - Only educational course mention
**Strengths:** Very helpful, actionable content

---

### Email 4 - Day 5: Essential items and mobility tips
**Content:**
- **Must-haves:** Leg elevation wedge, shower stool
- **Worth considering:** Backpack, **Thetis Splint** (first product mention)
- Safe mobility tips (stairs, bathroom safety)
- Home setup advice
- Mentions Recovery Course link

**Tone:** Practical, helpful
**Sales Level:** ⭐⭐ Medium - First product mention, but positioned as "worth considering"
**Issues:**
- Splint introduced very early (Day 5) - patient may not have boot yet
- Could feel premature if they're still in cast/splint

---

### Email 5 - Day 7: Treatment options
**Content:**
- Surgery vs non-surgical comparison
- Key questions to understand treatment plan
- Emphasis on following protocol correctly
- Mentions Recovery Course link

**Tone:** Educational, balanced
**Sales Level:** ⭐ Low - Only educational course mention
**Strengths:** Non-biased, helpful decision-making support

---

### Email 6 - Day 9: Boot basics
**Content:**
- Boot function and angle system explanation
- **Night-time challenge section:** Mentions sleep struggles, introduces **Thetis Splint** as solution
- Protocol understanding
- Mentions Recovery Course link

**Tone:** Educational, empathetic
**Sales Level:** ⭐⭐ Medium - Product mention feels natural (addresses real pain point)
**Strengths:** 
- Addresses real problem (sleep) that 80% of patients face
- Product mention is contextual and helpful

---

### Email 7 - Day 10: Week 1 routine
**Content:**
- What's normal in Week 1 (swelling, bruising, anxiety)
- Week 1 routine checklist
- Reassurance about emotional challenges
- Mentions Recovery Course link

**Tone:** Reassuring, supportive
**Sales Level:** ⭐ Low - Only educational course mention
**Strengths:** Addresses mental health, normalizes anxiety

---

### Email 8 - Day 21: Mobility and daily life
**Content:**
- Walking in boot guidance
- **Hygiene section:** Mentions **Thetis Splint** for washing foot
- **Sleep section:** Mentions **Thetis Splint** again for sleep comfort
- Mental health reminder
- Mentions Recovery Course link

**Tone:** Practical, supportive
**Sales Level:** ⭐⭐⭐ High - Product mentioned **twice** in same email
**Issues:**
- **Too salesy** - Two mentions of the same product feels repetitive
- Could consolidate into one mention or remove one
- Feels like pushing product rather than solving problem

---

### Email 9 - Day 35: Preparing for physio
**Content:**
- What to expect in physio
- Safety reminders for early exercises
- Safe loading principle explanation
- Mentions Recovery Course link

**Tone:** Educational, preparatory
**Sales Level:** ⭐ Low - Only educational course mention
**Strengths:** Good educational content about exercise safety

---

### Email 10 - Day 70: Week 10 check-in
**Content:**
- Progress reflection
- Focus areas for next phase
- Long-term view of recovery
- Mentions Recovery Course link
- Reminder about using boot/splint as directed

**Tone:** Encouraging, reflective
**Sales Level:** ⭐ Low - Only educational course mention
**Strengths:** Good milestone recognition

---

### Email 11 - Day 49: Preparing for boot removal
**Content:**
- What to expect when boot is removed
- Shoe selection guidance (heel counter, arch support, heel lifts)
- Transition phase explanation (3x higher forces)
- Mentions Recovery Course link

**Tone:** Preparatory, educational
**Sales Level:** ⭐ Low - Only educational course mention
**Strengths:** Practical preparation advice

---

## Product Mention Analysis

### Thetis Splint Mentions:
1. **Email 4 (Day 5):** First mention - "Worth considering" section
2. **Email 6 (Day 9):** Sleep comfort solution
3. **Email 8 (Day 21):** Two mentions - washing AND sleep

### Recovery Course Mentions:
- **Every email** includes a "Want more detail?" section linking to the course
- This is appropriate and not salesy - provides value

---

## Issues Identified

### 🔴 Critical Issues

1. **Workflow Order Bug:** Email 11 (Day 49) is positioned before Email 10 (Day 70) in `workflow.json`. This causes emails to be sent out of chronological order.

### 🟡 Content Issues

2. **Too Salesy - Email 8:** Product mentioned twice in same email feels pushy
   - **Recommendation:** Consolidate to one mention or remove the second

3. **Premature Product Introduction - Email 4:** Splint introduced on Day 5, but many patients may still be in cast/splint
   - **Recommendation:** Move to Day 9 (Email 6) when boot is more relevant, or make it conditional

4. **Repetitive Course Links:** While helpful, every email has the same "Want more detail?" pattern
   - **Recommendation:** Vary the CTA language or occasionally skip it

### 🟢 Opportunities for Improvement

5. **Missing Content Gaps:**
   - No email specifically about pain management (mentioned briefly in Email 3 questions)
   - No email about returning to work
   - No email about preventing rerupture (mentioned briefly in Email 10)
   - No email about returning to sport

6. **Timing Gaps:**
   - Large gap between Day 21 and Day 35 (14 days)
   - Large gap between Day 35 and Day 49 (14 days)
   - Large gap between Day 49 and Day 70 (21 days)
   - Could add emails at Day 28, Day 42, Day 56 to maintain engagement

7. **Personalization Opportunities:**
   - No mention of `rupture_date` from workflow data
   - Could personalize timing based on actual injury date
   - Could reference user's specific protocol if available

8. **Email 8 Product Mentions:**
   - First mention (washing) is practical and helpful
   - Second mention (sleep) is repetitive - already covered in Email 6
   - **Recommendation:** Remove sleep mention from Email 8, keep only washing mention

---

## Progression Analysis: Advice → Product Mentions

### Phase 1: Pure Education (Days 0-3)
- **Emails 1-3:** No product mentions, pure education
- **Strengths:** Builds trust, establishes expertise

### Phase 2: First Product Introduction (Days 5-9)
- **Email 4:** Soft introduction ("worth considering")
- **Email 6:** Contextual introduction (solves sleep problem)
- **Strengths:** Natural progression, addresses real pain points

### Phase 3: Product Reinforcement (Day 21)
- **Email 8:** Two mentions - feels pushy
- **Weakness:** Too salesy, repetitive

### Phase 4: Education Continues (Days 35-70)
- **Emails 9-11:** Back to education, no product mentions
- **Strengths:** Maintains educational focus

**Overall Progression:** Generally good, but Email 8 disrupts the flow with double product mention.

---

## Recommendations

### Immediate Fixes

1. **Fix workflow order:** Move Email 11 to correct position (after Email 9, before Email 10)
2. **Reduce Email 8 salesiness:** Remove one splint mention (keep washing, remove sleep)
3. **Consider moving Email 4 splint mention:** Either remove it or make it more conditional

### Content Improvements

4. **Add missing topics:**
   - Pain management email (Day 2-3)
   - Returning to work email (Day 14-21)
   - Preventing rerupture email (Day 42-49)
   - Returning to sport email (Day 84-91)

5. **Fill timing gaps:**
   - Add emails at Day 28, Day 42, Day 56
   - Or reduce gaps between existing emails

6. **Vary course CTAs:**
   - Use different language: "Dive deeper", "Full guide", "Complete roadmap"
   - Occasionally skip the CTA in shorter emails

7. **Personalization:**
   - Reference `rupture_date` if available
   - Use actual days since injury instead of fixed days

### Product Mention Strategy

8. **Consolidate splint mentions:**
   - **Email 6 (Day 9):** Keep sleep mention (natural pain point)
   - **Email 8 (Day 21):** Keep washing mention only, remove sleep mention
   - **Email 4 (Day 5):** Consider removing or making conditional

9. **Alternative approach:**
   - Create separate "product recommendations" email that covers all helpful items at once
   - Keep educational emails focused on education

---

## Overall Assessment

**Strengths:**
- ✅ Excellent educational content
- ✅ Good timing for most emails
- ✅ Empathetic, supportive tone
- ✅ Addresses real patient concerns
- ✅ Course links are helpful, not pushy

**Weaknesses:**
- ❌ Workflow order bug
- ❌ Email 8 feels too salesy (double product mention)
- ❌ Some timing gaps could be filled
- ❌ Missing some important topics
- ❌ No personalization based on user data

**Overall Grade:** B+ (Good educational sequence with some salesy moments that could be improved)

---

## Next Steps

1. Fix workflow.json order bug
2. Edit Email 8 to remove duplicate splint mention
3. Consider restructuring Email 4 product mention
4. Plan additional emails for missing topics
5. Consider personalization improvements
