---
name: Check Social Content Accuracy
description: Review a draft social post or article for medical accuracy against the clinical positions and all published content in the monorepo.
tools: Read, Grep, Codebase
---

# Check Social Content for Medical Accuracy

Review the draft the user provides (pasted text or a file path) for medical accuracy.

## Steps

### 1. Load the governance rules

Read these files — they are the single source of truth and always win over any other content:

- `.cursor/rules/achilles-clinical-positions.mdc` (30 canonical clinical positions)
- `.cursor/rules/content-guidelines.mdc` (voice + safety rules)

### 2. Find related published content

For each clinical claim in the draft, search the canonical content sources:

- `apps/course/src/content/course/` — course lessons (deepest clinical detail)
- `apps/website/src/content/guide/` — week/stage guides
- `apps/website/src/content/blog/` + `apps/website/src/content/articles/` — published articles
- `apps/website/src/sections/FAQs/` — FAQ answers
- `apps/achilles-rupture/src/content/articles/` — educational articles

Use semantic search and grep for key terms (e.g. "wedge removal", "blood thinners", "return to sport").

### 3. Review

Check the draft for:

1. Claims contradicting any clinical position (severity: high)
2. Claims contradicting published content (severity: medium — flag which source)
3. Missing warning signs / safety info where the topic touches risk
4. Tone violations (see content guidelines: plain language, no false precision, honest about uncertainty)
5. Invented statistics or facts not present in any source

### 4. Output

```
## Verdict: PASS | REVISE | BLOCK

## Summary
One sentence.

## Issues
- [HIGH|MEDIUM|LOW] "exact claim text"
  Problem: what is wrong, citing the position number or source file path
  Fix: suggested replacement

## Missing safety info
- ...

## Supporting sources
- file paths that back up the draft's correct claims
```

BLOCK if any claim directly contradicts a clinical position or gives dangerous advice. Note: the same check is available with vector retrieval in the chat app (`apps/chat`, /check route).
