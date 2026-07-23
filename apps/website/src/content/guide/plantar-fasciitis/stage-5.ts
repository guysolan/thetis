import type { GuideContent, GuideMetadata } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "stage-5",
  title: "Plantar fasciitis — Stage 5: Maintenance & long-term",
  description:
    "Staying comfortable long-term: maintenance stretching, footwear habits, load awareness, and what to do if symptoms creep back.",
  phase: "plantar-fasciitis-stage-5",
  weekRange: "Stage 5",
  highlights: [
    "Do not stop stretching",
    "Watch for load spikes",
    "Simple weekly routine",
  ],
  phaseSubtitle: "Maintenance & long-term",
  hubCardTitle: "Maintenance & long-term",
  timelineColor: "bg-neutral-600",
};

export const content: GuideContent = {
  intro:
    "Stage 5 is **preventative maintenance** — the habits that keep heel pain away once you have worked through the earlier stages. Most relapses are not mysterious; they happen when stretching stops, load spikes, or footwear slips.",
  blocks: [
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/comb-knots-analogy.png",
      alt: "Comb and tangled rope analogy for combing out knots in the plantar fascia through regular stretching.",
      caption:
        "Think of maintenance stretching as combing the knots out before they tighten again.",
    },
    {
      type: "heading",
      level: 2,
      text: "When to move to Stage 5",
    },
    {
      type: "text",
      content:
        "You are in maintenance mode when daily life and your chosen activities feel manageable, morning first-step pain is mild or absent most days, and you have returned to your normal routine (or a sensible version of it) without week-on-week worsening.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "You do **not** need zero symptoms forever — occasional mild stiffness can be normal.",
        "You **do** need a plan for keeping symptoms from creeping back.",
        "If pain is still flaring regularly, stay in Stage 3 or 4 until things settle.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "The golden rule: do not stop stretching",
    },
    {
      type: "alert",
      variant: "warning",
      title: "Doing well? Do not stop stretching",
      content:
        "Once pain settles, you can **reduce** how often you stretch — but do **not** stop completely. Several sessions per week of calf and plantar fascia mobility work is preventative maintenance. Many relapses happen when people feel better and abandon the basics.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/slant-board-key-messages.png",
      alt: "Key messages for slant board stretching: comb the knots out, no magic cures, simple daily programme.",
      caption:
        "A lighter version of your Stage 1 routine is enough for most people long-term.",
    },
    {
      type: "heading",
      level: 3,
      text: "A realistic maintenance routine",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Slant-board calf stretches** — 3–4 times per week, 3–5 minutes per session.",
        "**Morning toe stretch** — before first steps on days when you feel stiff.",
        "**Heel raises** — 1–2 times per week to keep calf strength (from Stage 3).",
        "**Supportive shoes** — especially after a long day on your feet or on hard floors.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Watch the Four O's",
    },
    {
      type: "text",
      content:
        "The same factors that slow recovery can trigger a return of symptoms: **overuse**, **overweight**, **overtight** calves, and **older age** (slower tissue recovery). You cannot change your age — but you can plan around the others.",
    },
    {
      type: "table",
      headers: ["Risk factor", "What to watch for", "What helps"],
      rows: [
        [
          "Overuse",
          "Sudden jump in steps, standing, running, or sport",
          "Build back gradually — use your Stage 4 rules",
        ],
        [
          "Overweight",
          "Weight gain of even a few pounds",
          "Small sustained changes beat crash diets",
        ],
        [
          "Overtight",
          "Skipping stretches for weeks",
          "Restart slant-board work before pain returns",
        ],
        [
          "Older age",
          "Expecting day-to-day recovery from load spikes",
          "Progress more patiently; judge over weeks",
        ],
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Footwear for the long term",
    },
    {
      type: "text",
      content:
        "You may not need arch-support insoles forever, but very flat shoes and long barefoot time on hard floors often provoke symptoms again. Keep a supportive pair for busy days.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/footwear-supportive-vs-flat.png",
      alt: "Supportive footwear versus flat and unsupportive footwear options.",
      caption:
        "Supportive footwear on demanding days reduces daily strain through the heel.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Rotate worn-out trainers — cushioning compresses over time.",
        "Keep simple insoles in your most-used shoes if they helped during recovery.",
        "Holiday flip-flops and hard hotel floors are a common flare trigger.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "If symptoms creep back",
    },
    {
      type: "text",
      content:
        "A short flare does not mean you are back to square one. Usually it means load outpaced maintenance for a while.",
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "Restart **daily** slant-board stretching for 1–2 weeks.",
        "Reduce aggravating activity (especially running or long standing).",
        "Check footwear and insoles — replace if worn.",
        "Return to morning toe stretches before standing.",
        "If not settling in 2–3 weeks, review Stage 2 load rules or seek advice.",
      ],
    },
    {
      type: "dos-donts",
      dos: [
        "Treat maintenance as normal life, not a temporary chore",
        "Use morning first-step pain as your early warning sign",
        "Keep a lighter version of strength work once or twice weekly",
      ],
      donts: [
        "Abandon all stretches because you feel fine for a month",
        "Jump from no running to a race because symptoms were gone briefly",
        "Ignore gradual weight gain or a new unsupportive shoe habit",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "When to seek help again",
    },
    {
      type: "text",
      content:
        "Arrange a review if pain is worsening despite restarting the basics, if you cannot put weight through the foot, or if symptoms no longer fit a simple plantar heel pain story. For most people, a short return to Stage 1 habits is enough — see our [overview FAQ](/FAQs/plantar-fasciitis-overview) and [diagnosis & symptoms FAQ](/FAQs/plantar-fasciitis-diagnosis-and-symptoms) for when professional review is worth arranging. The [plantar fasciitis course](/course/plantar-fasciitis) covers the full pathway if you want a structured refresher.",
    },
    {
      type: "tip",
      title: "Recovery is a habit, not an event",
      content:
        "Heel pain rewards boring consistency. The patients who stay comfortable long-term are usually not doing anything dramatic — they stretch several times a week, wear sensible shoes on hard days, and respect load spikes. That is Stage 5.",
    },
  ],
};
