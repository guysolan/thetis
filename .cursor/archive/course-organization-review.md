# Course Organization Review: Latter Half Analysis

## Current Order (Weeks 25-34+)

1. **Week 25:** six-month-milestone
2. **Week 26:** preventing-rerupture
3. **Week 28:** starting-to-run
4. **Week 30:** new-normal (Life After Achilles Rupture) ⚠️ **Should be LAST**
5. **Week 31:** plyometrics
6. **Week 32:** return-to-sport (NEW)
7. **Week 34:** when-things-dont-go-to-plan

---

## Issues Identified

### 1. **"Life After Achilles Rupture" Should Be Last** ✅ CONFIRMED

**Current:** `new-normal` is at Week 30, before plyometrics and return-to-sport
**Should be:** Last section (after when-things-dont-go-to-plan)

**Reason:** This section is about long-term life after recovery, managing permanent changes, and ongoing care. It makes sense as the final section, not mid-way through advanced training.

---

### 2. **Content Duplication: Return-to-Sport Criteria**

**Duplication between:**

- `six-month-milestone.tsx` (Week 25) - Has "Return-to-Sport Criteria" section
- `return-to-sport.tsx` (Week 32) - Has "Return-to-Sport Criteria: Are You Ready?" section

**Overlap:**

- Both cover strength criteria (25+ heel raises)
- Both cover function criteria
- Both cover psychological readiness
- Both mention criteria-based approach

**Differences:**

- `six-month-milestone`: Mentions >90% symmetry, 2x body weight for high-level sports
- `return-to-sport`: Focuses on 85% symmetry rule (more specific), includes return process stages, return-to-play rates

**Recommendation:**

- **Option A:** Remove return-to-sport criteria from `six-month-milestone`, keep it focused on milestone assessment
- **Option B:** Keep brief mention in `six-month-milestone`, detailed coverage in `return-to-sport`
- **Option C:** Consolidate - move detailed criteria to `return-to-sport`, reference it from `six-month-milestone`

**Best approach:** Option B or C - `six-month-milestone` should briefly mention return-to-sport criteria as part of milestone assessment, but detailed criteria and process should be in `return-to-sport` section.

---

### 3. **Chronological Order Issues**

**Problem:** `new-normal` (Life After Achilles Rupture) at Week 30 doesn't make chronological sense:

- It's about long-term life after recovery
- It comes before plyometrics (Week 31) and return-to-sport (Week 32)
- It should come after all recovery phases are complete

**Fix:** Move `new-normal` to be the last section (after `when-things-dont-go-to-plan`)

---

### 4. **Potential Overlap: Preventing Re-Rupture vs Return-to-Sport**

**`preventing-rerupture` (Week 26):**

- Risk factors
- Ongoing strengthening
- Warm-up protocols
- Warning signs

**`return-to-sport` (Week 32):**

- Return criteria
- Return process
- Continuing strengthening program (mentions not stopping exercises)

**Overlap:** Both mention continuing strengthening, but different contexts:

- `preventing-rerupture`: General prevention strategies
- `return-to-sport`: Specific to return-to-sport context

**Assessment:** ✅ **Not problematic** - Different focuses, appropriate overlap

---

### 5. **Missing Cross-References**

**Issues:**

- `six-month-milestone` mentions return-to-sport criteria but doesn't link to `return-to-sport` section
- `preventing-rerupture` mentions "when returning to sport" but doesn't link to `return-to-sport` section
- `new-normal` should reference that recovery phases are complete

**Fix:** Add cross-references between related sections

---

## Recommended Reorganization

### Proposed Order (Weeks 25-34+)

1. **Week 25:** six-month-milestone
   - Brief mention of return-to-sport criteria
   - Link to detailed `return-to-sport` section

2. **Week 26:** preventing-rerupture
   - Link to `return-to-sport` when relevant

3. **Week 28:** starting-to-run

4. **Week 31:** plyometrics

5. **Week 32:** return-to-sport
   - Detailed return-to-sport criteria (85% rule)
   - Return process stages
   - Return-to-play rates

6. **Week 34:** when-things-dont-go-to-plan

7. **Week 35+:** new-normal (Life After Achilles Rupture) ⭐ **LAST SECTION**
   - Long-term perspective
   - Permanent changes
   - Ongoing care
   - Life after recovery

---

## Specific Recommendations

### 1. Move `new-normal` to Last Position

**Action:** Reorder sections.ts so `new-normal` comes after `when-things-dont-go-to-plan`

**Update timing:** Change from Week 30 to Week 35+ (or "Long-term" / "Ongoing")

---

### 2. Reduce Duplication in `six-month-milestone`

**Action:** Edit `six-month-milestone.tsx` to:

- Keep brief mention of return-to-sport criteria as part of milestone assessment
- Add link: "For detailed return-to-sport criteria and process, see [Return to Sport](/standard/return-to-sport)"
- Remove detailed criteria list (keep it in `return-to-sport`)

---

### 3. Add Cross-References

**Files to update:**

- `six-month-milestone.tsx`: Link to `return-to-sport`
- `preventing-rerupture.tsx`: Link to `return-to-sport` when mentioning sport return
- `return-to-sport.tsx`: Link to `preventing-rerupture` for ongoing prevention
- `when-things-dont-go-to-plan.tsx`: Link to `new-normal` as final section
- `new-normal.tsx`: Reference that recovery phases are complete

---

### 4. Update "What Happens Next" Sections

**Files to update:**

- `return-to-sport.tsx`: Update to reference `when-things-dont-go-to-plan` and `new-normal`
- `when-things-dont-go-to-plan.tsx`: Update to reference `new-normal` as final section
- `new-normal.tsx`: Update to indicate it's the final section

---

## Summary of Changes Needed

### High Priority:

1. ✅ **Move `new-normal` to last position** in sections.ts
2. ✅ **Reduce duplication** - Edit `six-month-milestone` to reference `return-to-sport` instead of duplicating criteria
3. ✅ **Add cross-references** between related sections

### Medium Priority:

4. ✅ **Update timing** for `new-normal` (Week 35+ or "Long-term")
5. ✅ **Update "What Happens Next"** sections to reflect new order

### Low Priority:

6. ✅ **Review content** in `six-month-milestone` vs `return-to-sport` to ensure clear differentiation

---

## Images Generated

✅ **Yes, I generated 2 new images:**

1. `return-to-sport-progression.png` - Shows 3-stage return process
2. `return-to-sport-symmetry.png` - Explains 85% symmetry concept

Both are in `apps/course/src/assets/` and referenced in `return-to-sport.tsx`
