import type { GuideContent, GuideMetadata } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "stage-2",
  title: "Plantar fasciitis — Stage 2: Subacute / loading",
  description:
    "Gradual loading and activity modification: relative rest, step counts, and rebuilding tolerance without flaring symptoms.",
  phase: "plantar-fasciitis-stage-2",
  weekRange: "Stage 2",
  highlights: [
    "Relative rest, not complete rest",
    "Modify aggravating activities",
    "Rebuild load gradually",
  ],
  phaseSubtitle: "Subacute / loading",
  hubCardTitle: "Subacute / loading",
  timelineColor: "bg-primary",
};

export const content: GuideContent = {
  intro:
    "Stage 2 is about **how much** you load the heel — not abandoning the stretching and footwear habits from Stage 1. The goal is to tip the balance back toward healing by reducing aggravating load, then rebuilding gradually.",
  blocks: [
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/loading-balance-scale.png",
      alt: "Balance scale analogy showing normal activity load and tissue repair in equilibrium.",
      caption:
        "Recovery stays on track when tissue repair keeps up with day-to-day loading.",
    },
    {
      type: "heading",
      level: 2,
      text: "When to start Stage 2",
    },
    {
      type: "text",
      content:
        "You can work on loading at the same time as Stage 1 foundations — especially if pain is clearly linked to overuse. If symptoms are severe, settle the daily stretching routine first, then layer in activity changes. Do not wait for zero pain before you start being sensible about load; do wait until you have a simple daily programme you can repeat.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Keep **all Stage 1 habits** going: stretching, supportive shoes, morning toe stretch.",
        "Add **relative rest** — reduce what provokes pain, not all movement.",
        "Judge progress in **weeks**, not day-to-day swings.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Relative rest (activity modification)",
    },
    {
      type: "text",
      content:
        "Complete rest is rarely the answer and often makes morning stiffness worse. **Relative unloading** means temporarily reducing activities that provoke heel pain — especially running — rather than stopping everything.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "If running flares symptoms, **stop running completely for now** rather than pushing through.",
        "Lower your daily **step count** for a few weeks.",
        "Use lifts or escalators instead of stairs where possible.",
        "Split longer walks into shorter bouts (for example, two 30-minute walks instead of one hour).",
        "Wear supportive footwear (with or without insoles) to reduce load through the heel.",
      ],
    },
    {
      type: "alert",
      variant: "info",
      title: "The Four O's that slow recovery",
      content:
        "**Overuse** (sudden jump in walking, standing, or running), **overweight** (extra force at every step), **overtight** calves (genetic or habitual), and **older age** (slower tissue recovery). Having one or more does not mean you cannot improve — it means your plan must be more deliberate. Target the O's that apply to you first.",
    },
    {
      type: "heading",
      level: 2,
      text: "Weight management (if relevant)",
    },
    {
      type: "text",
      content:
        "Even a modest reduction in body weight can meaningfully reduce force through the heel. Weight loss happens mostly through nutrition — exercise supports health, but intake control does most of the work. If this applies to you, treat it as part of Stage 2 loading, not a side project.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/three-levels-treatment.png",
      alt: "Three levels of treatment diagram showing foundation work as rest, stretches, weight management, and shoes.",
      caption:
        "Most recoveries happen when foundation work and sensible loading are done together.",
    },
    {
      type: "heading",
      level: 2,
      text: "6-week loading progression",
    },
    {
      type: "text",
      content:
        "Use this as a framework alongside your Stage 1 stretching programme. Progress **one variable at a time**. If symptoms flare, hold your current step for longer before advancing.",
    },
    {
      type: "table",
      headers: ["Week", "Activity focus", "Keep from Stage 1"],
      rows: [
        [
          "Week 1",
          "Cut aggravating activity; record baseline step count",
          "Slant board, toe stretch, supportive shoes",
        ],
        [
          "Week 2",
          "Reduce steps by ~20%; avoid hills and long standing",
          "Build stretching consistency",
        ],
        [
          "Week 3",
          "Hold current step count; split walks if needed",
          "Continue slant-board progression",
        ],
        [
          "Week 4",
          "If pain is stable, allow a small step-count increase",
          "Do not rush slant-board gradient",
        ],
        [
          "Week 5",
          "Reintroduce light activity only if morning pain is easing",
          "Keep footwear and stretches non-negotiable",
        ],
        [
          "Week 6",
          "Consolidate tolerance; still no running unless pain-free walking",
          "Review weight and step trends honestly",
        ],
      ],
    },
    {
      type: "accordion",
      items: [
        {
          title: "Week 1 — Identify your triggers",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Note which activities reliably flare pain (stairs, long walks, barefoot time).",
                "Record an honest daily step count for three days.",
                "Stop running completely if it provokes symptoms.",
                "Keep Stage 1 stretches and supportive shoes every day.",
              ],
            },
          ],
        },
        {
          title: "Week 2 — Reduce aggravating load",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Lower step count by roughly one-fifth.",
                "Avoid prolonged standing on hard floors where possible.",
                "Use shorter, more frequent walks instead of one long outing.",
                "Check whether weight has shifted — even a couple of pounds matters.",
              ],
            },
          ],
        },
        {
          title: "Week 3 — Hold and observe",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Keep the same step target; resist the urge to test progress daily.",
                "Morning first-step pain should start to feel more manageable.",
                "Continue slant-board work per Stage 1 — do not skip because you are 'resting'.",
              ],
            },
          ],
        },
        {
          title: "Week 4 — First small increase",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Only if pain has been stable for a week, add a modest step increase.",
                "Still no running.",
                "If pain flares, drop back to Week 2 levels for another week.",
              ],
            },
          ],
        },
        {
          title: "Week 5 — Test tolerance",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Gradually extend one daily walk by 5–10 minutes if symptoms allow.",
                "Consider gentle cross-training (cycling, swimming) if it does not provoke heel pain.",
                "Weight loss often slows here — keep nutrition consistent.",
              ],
            },
          ],
        },
        {
          title: "Week 6 — Consolidate",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Hold your new tolerance level for a full week before pushing further.",
                "Running return belongs in later stages — not yet unless walking is reliably comfortable.",
                "If progress feels slow, do not abandon the plan; momentum often builds after the first few weeks.",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "When to pull back",
      content:
        "If pain is **worsening** despite load reduction, if you cannot put weight through the foot, or if symptoms no longer fit a simple plantar heel pain story, arrange a medical review. A flare after one busy day usually means **hold your current level** — not quit stretching or restart from zero.",
    },
    {
      type: "tip",
      title: "Keep momentum",
      content:
        "Like pushing a broken-down car, early progress can feel slow — but once improvement starts, it often gathers momentum. Small gains each week add up. Keep **Stage 1** stretching going — Stage 2 does not replace it. For symptom recognition and when scans are worth discussing, see our [diagnosis & symptoms FAQ](/FAQs/plantar-fasciitis-diagnosis-and-symptoms). The [plantar fasciitis course](/course/plantar-fasciitis) walks through the same stepwise approach in more detail.",
    },
  ],
};
