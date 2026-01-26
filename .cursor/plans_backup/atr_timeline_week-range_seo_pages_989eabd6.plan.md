---
name: ATR timeline week-range SEO pages
overview: Create a tightly interlinked `/timeline/` content cluster with 7 English-only pages (weeks 0–1, 1–3, 4–6, 7–9, 10–12, 13–25, 26+) that fully cover existing FAQ timeline guidance and incorporate the best supporting material from the long-form articles repo, including practical equipment recommendations and suggested explanatory graphics.
todos:
  - id: decide-ia
    content: Lock in `/timeline/` slug list (7 pages) and whether to add a `/timeline/` hub page.
    status: pending
  - id: draft-outlines
    content: Produce final H1/H2/H3 markdown outlines for each of the 7 pages (English), ensuring they cover all FAQ timeline bullets plus key deep-dives (VTE, boots, rehab, walking, re-rupture prevention).
    status: pending
  - id: graphics-plan
    content: Specify 3–6 graphics per page (reusable vs unique), and where they appear in the outline.
    status: pending
  - id: seo-internal-links
    content: "Add per-page SEO notes: primary query, secondary queries, and internal link targets to existing FAQs/research pages."
    status: pending
---

## URL + information architecture

- **Primary URL pattern (per your choice)**: `/timeline/weeks-0-to-1`, `/timeline/weeks-1-to-3`, `/timeline/weeks-4-to-6`, `/timeline/weeks-7-to-9`, `/timeline/weeks-10-to-12`, `/timeline/weeks-13-to-25`, `/timeline/weeks-26-plus`.
- **Optional hub page (recommended for SEO + UX)**: `/timeline/` (or `/timeline/achilles-rupture-recovery-timeline`) that:
- Summarizes the overall 0–6+ month arc.
- Links prominently to all 7 week-range pages.
- Embeds a lightweight “timeline navigator” (same component used on each page).
- **Internal linking rules**:
- Each week-range page links to:
- Previous + next week-range page (pager).
- The main FAQ timeline (`/FAQs/achilles-rupture-timeline`) as the “overview timeline”.
- 2–6 most relevant deep-dives: treatment decision, rehab, re-rupture prevention, blood thinners/VTE, boot vs plaster, walking again.
- The main FAQ timeline page should link out to the 7 week pages (as “read the details for this phase”).

## Content sources to incorporate (what we’ll mine)

- **Existing FAQ timeline blocks + FAQs**: `apps/website/src/content/FAQs/achilles-rupture-timeline-content.ts` (authoritative “what happens” bullets for each week bucket).
- **Country comparison nuance**: `apps/website/src/components/research/timeline-by-country/data.ts` (timing ranges, common equipment differences, plus its “potential inaccuracies” disclaimer).
- **FAQ mains for key patient questions + internal links** (all in `apps/website/src/mains/FAQs/`):
- `is-my-achilles-ruptured.astro`
- `what-happens-if-my-achilles-is-ruptured.astro`
- `achilles-tear-treatment.astro`
- `torn-achilles-recovery.astro`
- `achilles-rupture-rehabilitation.astro`
- `life-after-achilles-rupture.astro`
- **High-value long-form article material to weave in (patient-friendly)** from `apps/achilles-rupture/src/content/articles/`:
- **Biology & precautions**: `science-of-achilles-tendon-healing.md`
- **VTE / blood thinners**: `blood-thinners-after-achilles-rupture-recovery.md` and `venous-thromboembolism.md`
- **Boot vs cast evidence**: `plaster-vs-boot.md`
- **Re-rupture prevention**: `how-to-prevent-achilles-tendon-re-rupture.mdx`
- **Walking milestones**: `how-to-walk-again-after-achilles-rupture-surgery.mdx`
- **Exercise progressions**: `7-best-physical-therapy-exercises-for-achilles-rupture-recovery.mdx`
- **Practical purchases**: `six-essential-items-to-make-achilles-rupture-recovery-easier.mdx` and `five-small-purchases-to-make-achilles-rupture-recovery-easier.md`

## Shared page template (applies to all 7 pages)

- **H1**: “Achilles Rupture Recovery: Weeks X–Y (What to Expect + What to Do)”
- **Above-the-fold** (immediately after H1):
- 3–6 bullet “At a glance” outcomes (pain/swelling, immobilization, weight-bearing, sleep, appointments).
- “If your situation differs” callout (surgery vs non-surgery; country differences; your clinician’s protocol wins).
- Mini table: “This phase’s goals / what not to do / what progress looks like”.
- **H2: What’s happening inside the tendon (simple biology for this phase)**
- 1–2 short paragraphs and 3–5 bullets that map to healing stage (inflammation/proliferation/remodelling) and why the restrictions matter.
- **H2: Your to-do list this week range (safe actions)**
- Subsections for pain/swelling, mobility/weight-bearing, sleep, skin care/hygiene, mental load.
- **H2: Appointments & decisions (what clinicians typically do)**
- What the clinic is checking.
- What to ask your clinician.
- “Typical timing ranges” note (with country-comparison disclaimer).
- **H2: Equipment that helps (with brief rationale)**
- “Core medical equipment” (boot/cast/splint/crutches).
- “Optional helpful purchases” (shoe leveler, waterproof cover, elevation wedge, etc.).
- Include a clear “not medical advice / follow your provider” note.
- **H2: Common problems in this phase (and what usually helps)**
- 6–10 issues (sleep disruption, hot foot, pressure sores, fear of walking, crutch pain, swelling, DVT anxiety, etc.).
- **H2: Red flags (when to call your team / urgent care)**
- DVT/PE symptoms, wound issues (if post-op), new “snap”, sudden loss of plantarflexion control, fevers, severe pain, etc.
- **H2: FAQs for Weeks X–Y**
- 6–10 questions (this is where we can add FAQ schema).
- **H2: What’s next (Weeks Y–Z)**
- Short bridge section with internal link to the next page.

## Suggested graphics (reusable across the series)

- **G1 (series-wide)**: “Recovery timeline strip” highlighting the current week bucket.
- **G2**: “Tendon healing stages vs time” (simple 4-stage graphic aligned to your `science-of-achilles-tendon-healing.md`).
- **G3**: “Boot angle / wedge reduction concept” (schematic, not protocol-specific; labeled ‘varies by clinician’).
- **G4**: “Snakes-and-ladders: re-rupture risk concept” (lightweight, patient-motivating; avoid fear-mongering).
- **G5**: “DVT risk: what symptoms look like + when to seek urgent help” (patient safety-focused).

## Page-by-page H1/H2/H3 outlines (English)

### 1) `/timeline/weeks-0-to-1` (Weeks 0–1)

- **H1: Achilles Rupture Recovery: Weeks 0–1 (What to Expect, What to Do, What to Avoid)**
- **H2: At a glance (this week’s priorities)**
- **H3: Protect the tendon ends (toe-down positioning)**
- **H3: Get assessed fast (don’t “wait and see”)**
- **H3: Control swelling and pain**
- **H3: Prevent complications (especially blood clots)**
- **H2: What happens right after a rupture (typical pathway)**
- **H3: The moment of injury (symptoms + why it feels like a ‘pop’)**
- **H3: Emergency care (splint/cast, crutches, pain control)**
- **H3: Imaging + referral (ultrasound/MRI timing can vary)**
- **H2: What’s happening inside the tendon in week 0–1**
- **H3: Why the toe-down position matters (avoid gapping/elongation)**
- **H3: Healing stage: haemostasis + early inflammation (plain English)**
- **H2: Do this now (patient checklist)**
- **H3: Immobilization positioning and safe movement rules**
- **H3: Elevation protocol (practical setups at home)**
- **H3: Ice and pain medicines (general guidance + “ask your clinician”)**
- **H3: Getting around safely (crutches, stairs, sleeping setup)**
- **H2: Blood clots (VTE) — what patients need to know in week 0–1**
- **H3: Why ATR has higher clot risk**
- **H3: Questions to ask about prophylaxis (injections vs tablets, duration)**
- **H3: DVT/PE symptoms (urgent red flags)**
- **H2: Equipment that helps in week 0–1**
- **H3: Core: splint/backslab/boot + crutches**
- **H3: Helpful purchases (comfort + safety)**
- Night splint (for sleep comfort once appropriate)
- Elevation wedge/pillow
- Waterproof protector
- Crutch handle covers
- **H3: What not to buy yet (avoid over-optimizing before specialist plan)**
- **H2: Common problems this week (and what helps)**
- **H3: Panic/uncertainty (what to track daily)**
- **H3: Swelling + bruising**
- **H3: Sleep disruption**
- **H3: Crutch pain + falls risk**
- **H2: Red flags (call urgently)**
- **H2: FAQs (Weeks 0–1)**
- “Is there such a thing as a partial tear?”
- “Can I walk on it?”
- “Do I need a scan?”
- “When will I see a specialist?”
- “Should I take blood thinners?”
- **H2: What’s next (Weeks 1–3)**

**Graphics for Weeks 0–1**

- **G1** timeline strip with “Weeks 0–1” highlighted.
- **G2** simple tendon healing stage graphic (first two stages emphasized).
- **G5** DVT/PE symptom infographic.
- Optional: “Emergency pathway” flowchart (injury → urgent care → immobilize → imaging → specialist).

### 2) `/timeline/weeks-1-to-3` (Weeks 1–3)

- Emphasis: specialist consultation, imaging decisions, surgery vs non-surgical decision, boot fitting/positioning, early weight-bearing variations by protocol/country.
- Include H2/H3 on: “How the decision is made (gap size, patient factors)”, “Boot types (VACOped vs wedge boots)”, “sleep strategies (boot vs night splint)”.
- Graphics: decision tree for treatment choice; boot comparison schematic.

### 3) `/timeline/weeks-4-to-6` (Weeks 4–6)

- Emphasis: boot adjustments/wedge removal concept, mobility confidence, early loading, sleeping comfort, skin care.
- Weave in: boot vs cast evidence; common boot issues (hot foot, pressure points), and purchase advice (merino socks, antifungal powder).
- Graphics: wedge/angle progression schematic; “safe loading ladder” (standing → short walks → longer walks).

### 4) `/timeline/weeks-7-to-9` (Weeks 7–9)

- Emphasis: staying consistent, monitoring healing, preparing for rehab start, gait mechanics in boot.
- Weave in: shoe leveler (EvenUp) and “how to walk in boot” guidance.
- Graphics: gait diagram (boot + shoe leveler); checklist for “before you reduce a wedge/adjust hinge” (always clinician-led).

### 5) `/timeline/weeks-10-to-12` (Weeks 10–12)

- Emphasis: physio begins, transition to shoes, “don’t stretch aggressively” message, early strengthening goals.
- Weave in: best PT exercises page (intro-level subset), walking-again milestones.
- Graphics: “boot-to-shoe transition” checklist; calf strength progression chart.

### 6) `/timeline/weeks-13-to-25` (Weeks 13–25)

- Emphasis: progressive strengthening, balance/proprioception, return-to-running prep, managing tendon tightness safely, avoiding overload.
- Weave in: re-rupture prevention principles; exercise phases; workload management.
- Graphics: strength milestone ladder; weekly load progression concept (with pain rule-of-thumb).

### 7) `/timeline/weeks-26-plus` (Weeks 26+)

- Emphasis: return to sport, lingering deficits, long-term tendon remodeling, expectations (calf atrophy/thicker tendon), prevention.
- Weave in: life-after guidance, re-rupture prevention, footwear/support.
- Graphics: “return to sport continuum” (walk → jog → run → hop → sport drills).

## Implementation notes (when we move from plan → build)

- Create new Astro pages under `apps/website/src/pages/timeline/` matching the slugs.
- Use existing layout patterns (`Layout.astro` / `FAQsLayout.astro` depending on desired styling) and add canonical URLs like you do in `apps/website/src/pages/sleeping-with-torn-achilles.astro`.
- Add FAQ schema for each page (reuse existing FAQ schema components where possible).
- Keep wording strictly “education, not medical advice”; highlight protocol variation and “follow your clinician”.

## Deliverables for this phase (planning)

- A finalized outline for each of the 7 pages (H1/H2/H3), including:
- Target keyword theme + title/meta description suggestions.
- Internal links to existing relevant pages.
- Suggested graphics placement.