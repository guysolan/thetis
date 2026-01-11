## Prompt: Write a Great "Day's Lesson" for Achilles Rupture Recovery

You are writing a **single day's lesson** for patients recovering from an Achilles tendon rupture. This is one of **31 short articles** — keep it focused and avoid repeating content from other lessons.

### ⚠️ Critical: Use Consistent Positions

**Before writing, review** [`achilles-recovery-positions.md`](.cursor/commands/achilles-recovery-positions.md) for the agreed-upon positions on all contentious aspects of Achilles rupture recovery. **You must use these positions consistently** across all lessons. If a position conflicts with a clinician's protocol, note that guidance varies by clinician/country and patients should follow their medical instructions.

### Audience

- **Lay people**, often in shock, anxious, sleep-deprived, and in pain.
- Assume **no medical background**.
- They may be reading on a phone, scanning quickly.

### Tone & style

- Calm, reassuring, direct, and practical.
- Short sentences. Clear headings. No fluff.
- Avoid jargon. If you must use it, **define it immediately** in plain English.
- Use **simple analogies** to explain risk and behaviour.
  - Example style: **"Snakes and ladders"** for re-rupture risk: "Hit a snake and you go back toward the start."
- **Include a hope anchor** where appropriate: "You will get through this."

### Non‑negotiables

- **Safety first**: highlight urgent red flags clearly.
- **Actionable**: every section should answer "What do I do today?"
- **Protocol-aware**: note that guidance varies by clinician/country; do not contradict medical instructions.
- **Emotional validation**: acknowledge feelings (frustration, fear, grief) where relevant — especially in early lessons.

### Structure (use this every time)

1. **1–2 sentence intro**
   - Acknowledge how they're feeling.
   - State the day's goal in plain English.
   - Include a **hope anchor** if it's an early lesson (e.g., "You will get through this").

2. **Quick action plan (today)**
   - 3–6 bullets only.
   - Use "Do / Don't" or a checklist.

3. **One key concept (explain simply)**
   - Use a **concrete analogy**.
   - Example patterns:
     - Tendon healing = **two ends of a rope** that need to stay close together.
     - Swelling = **a tight shoe**; elevation "drains the bucket."
     - Clot risk = **traffic jam** when movement slows.

4. **What's normal vs what's urgent**
   - "Usually normal" list (3–6 bullets).
   - "Get urgent help now" callout (DVT/PE/circulation/pressure/infection/fall with new pop).
   - If mentioning acronyms, define them:
     - **DVT** = clot in the leg (deep vein thrombosis)
     - **PE** = clot in the lungs (pulmonary embolism)
     - **VTE** = umbrella term for clots in veins

5. **Practical tips (make life easier)**
   - Home setup, crutches, shower safety, sleep, work/driving notes (as relevant).
   - Include at least **one "tiny change, big payoff"** tip.
   - Consider **partner/carer tips** where helpful (e.g., "How you can help: keep paths clear, prepare meals").

6. **What happens next**
   - 2–4 bullets: what to expect in the next appointment/week.
   - If driving/work/travel is a common question for this stage, add a placeholder: "We cover this in [Week X]."

7. **Mini recap** (optional — use if lesson is long)
   - 3 bullets: "If you remember nothing else…"

### Content rules

- Write at ~6th–8th grade reading level.
- Prefer "blood clot in the leg" over "DVT" unless you define it.
- Avoid medical statistics unless they change behaviour; if included, keep it simple and framed as "why we take this seriously."
- Avoid absolute claims; use "often/typically" and "follow your clinician's instructions."
- Keep FAQs to 2–4 items max, only if they reduce anxiety or confusion.
- **Common FAQs to consider** (only if relevant to the lesson):
  - "What if I missed a dose of blood thinner?"
  - "What if I accidentally put weight on my foot?"
  - "When can I drive / go back to work?" (placeholder if not covered yet)
  - "What should I do if I can't reach my clinic after hours?"

### Questions to ask (include where relevant)

When listing "questions to ask your clinician", always include:

- **After-hours:** "What should I do if I can't reach you after hours?"

### Timeline expectations

If this is an early lesson (Week 0–2), include a brief timeline teaser:
> "Full recovery typically takes **6–12 months**, but you'll be walking without crutches much sooner (often by weeks 6–10). We'll break this down week by week."

### Output format

- Provide the lesson as **structured blocks** (headings, bullets, checklists, alerts, FAQs).
- Keep the lesson **short and focused** — this is one of 31 articles.
- Don't repeat content that's covered in other lessons (e.g., don't re-explain DVT/PE in every lesson).

---

## Generate images when they would reduce confusion

If an image would help (anatomy, timeline, "what's normal vs urgent", step-by-step), **generate it using the AI Studio service**.

### Image generation workflow

1. **Write a detailed prompt** following the style guidelines below
2. **Generate the image** using the AI Studio service:

```bash
cd services/ai-studio
bun generate "YOUR_PROMPT_HERE" "filename.png"
```

3. **Copy the generated image** from `services/ai-studio/output/` to your lesson's assets folder
4. **Import and use the image** in your lesson content

### Style guidelines for prompts

Always include these style instructions in your prompts:

**REQUIRED STYLE PREFIX** (copy this at the start of every prompt):

> Clean medical infographic, friendly and calming, high contrast, minimal text. Tintin-style ligne claire illustration (clean-line European comic style) with flat color fills, crisp outlines, simple shading, readable on mobile. Do NOT include Tintin characters, props, logos, or recognisable copyrighted icons. No gore, no needles shown unless necessary. White background with Thetis green accents (#29a680), subtle gray labels. 1:1 aspect ratio.

**CONTENT GUIDELINES:**

- Name exactly what to show (objects, labels, arrows)
- Include "what not to show" constraints
- Include exact label text and callouts
- Keep text minimal and readable

### Example: Generate a DVT/PE infographic

**Step 1: Write the prompt**

```
Clean medical infographic, friendly and calming, high contrast, minimal text. Tintin-style ligne claire illustration (clean-line European comic style) with flat color fills, crisp outlines, simple shading, readable on mobile. Do NOT include Tintin characters, props, logos, or recognisable copyrighted icons. No gore, no needles shown unless necessary. White background with Thetis green accents (#29a680), subtle gray labels. 1:1 aspect ratio.

Title text at top: "Blood clots: DVT vs PE". Left panel: a simple leg silhouette with a highlighted deep vein in the calf and a small dark-red "clot" icon; label: "DVT = clot in the leg". Right panel: simple lungs silhouette with a small "clot" icon in a lung artery; label: "PE = clot in the lungs (emergency)". Between panels, show a small arrow path from leg vein to heart to lungs, with label: "A clot can travel". Bottom strip: warning icons with short labels: "Chest pain", "Breathless", "Fainting", "One-leg calf swelling", "New calf pain". Keep text minimal, readable, and non-alarming.
```

**Step 2: Generate the image**

```bash
cd services/ai-studio
bun generate "Clean medical infographic..." "dvt-vs-pe.png"
```

**Step 3: Copy to lesson assets**

```bash
cp services/ai-studio/output/dvt-vs-pe.png apps/guide/src/content/course/essentials/assets/
```

**Step 4: Use in lesson**

```tsx
{
  type: "image",
  src: "/course/essentials/assets/dvt-vs-pe.png",
  alt: "Diagram showing difference between DVT (blood clot in leg) and PE (blood clot in lungs)",
  caption: "Blood clots can form in the leg and travel to the lungs"
}
```

### Reference images for style consistency

Place any reference images in `services/ai-studio/input/` to maintain visual consistency across all lesson images. The AI will use these as style guides.

### When to generate images

Generate images for:

- ✅ Anatomy diagrams (tendon healing, leg positioning)
- ✅ "What's normal vs urgent" visual guides
- ✅ Step-by-step instructions (crutch technique, exercises)
- ✅ Timeline visualizations
- ✅ Warning sign callouts

Skip images for:

- ❌ Simple concepts that words explain better
- ❌ Topics already covered in other lessons
- ❌ Generic motivational imagery

---

## Checklist before submitting a lesson

- [ ] **Reviewed [`achilles-recovery-positions.md`](.cursor/commands/achilles-recovery-positions.md)** and used consistent positions throughout
- [ ] Intro includes hope anchor (early lessons)
- [ ] Emotional validation where appropriate
- [ ] Jargon is defined in plain English
- [ ] At least one concrete analogy
- [ ] Red flags are clearly styled (alert block)
- [ ] At least one "tiny change, big payoff" tip
- [ ] Partner/carer tip (if relevant to lesson topic)
- [ ] "After-hours" question included in clinic question lists
- [ ] Driving/work/travel placeholder if commonly asked at this stage
- [ ] Lesson is focused and doesn't repeat other lessons
- [ ] Images generated via `services/ai-studio` and copied to lesson assets
- [ ] All images have descriptive alt text for accessibility
