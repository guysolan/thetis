import type { GuideContent, GuideMetadata } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "stage-3",
  title: "Plantar fasciitis — Stage 3: Strengthening",
  description:
    "Calf and foot strength progressions: when to add loading exercises, heel raises, and building tolerance without flaring symptoms.",
  phase: "plantar-fasciitis-stage-3",
  weekRange: "Stage 3",
  highlights: [
    "Keep stretching going",
    "Build calf strength gradually",
    "Not time for running yet",
  ],
  phaseSubtitle: "Strengthening",
  hubCardTitle: "Strengthening",
  timelineColor: "bg-primary",
};

export const content: GuideContent = {
  intro:
    "Stage 3 adds **strength** once daily life feels more manageable — not instead of the stretching and footwear habits from earlier stages. Stronger calves and better foot control help the heel tolerate load again.",
  blocks: [
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/tight-calf-tiptoe-effect.png",
      alt: "Illustration showing how tight calf muscles increase tension through the heel and plantar fascia.",
      caption:
        "Tight or weak calves increase tension through the heel — strength and mobility work together.",
    },
    {
      type: "heading",
      level: 2,
      text: "When to start Stage 3",
    },
    {
      type: "text",
      content:
        "Move into strengthening when morning first-step pain is easing, walking is reliably comfortable in supportive shoes, and you have completed a fair trial of Stage 1 and sensible load changes from Stage 2. You do not need zero pain — but symptoms should be **stable or improving**, not flaring week to week.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Keep **Stage 1 stretching** — reduce frequency if pain has settled, but do not stop completely.",
        "Keep **supportive footwear** for daily life.",
        "Do **not** start running yet — that belongs in Stage 4.",
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "Do not skip ahead",
      content:
        "If pain is still flaring with normal walking or standing, go back to Stage 2 load management before pushing strength work. Adding exercises onto an irritated heel usually backfires.",
    },
    {
      type: "heading",
      level: 2,
      text: "Calf strengthening progression",
    },
    {
      type: "text",
      content:
        "The calf–Achilles unit is the main engine that loads the heel. Build strength slowly, with good form, on both legs before single-leg work.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/calf-lengthening-levels.png",
      alt: "Progression levels for calf lengthening and loading exercises.",
      caption:
        "Progress one level at a time — form and control matter more than speed.",
    },
    {
      type: "table",
      headers: ["Phase", "Exercise", "Target"],
      rows: [
        ["Week 1–2", "Bilateral heel raises (two feet), slow up/down", "2 sets of 8–10, pain-free"],
        ["Week 3", "Bilateral heel raises", "3 sets of 10–12"],
        ["Week 4", "Single-leg heel raises (hold support if needed)", "2 sets of 6–8 each leg"],
        ["Week 5", "Single-leg heel raises", "3 sets of 8–10 each leg"],
        ["Week 6", "Add slow eccentric lowering (3-second lower)", "2–3 sets of 6–8"],
      ],
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Rise onto tiptoes over **2 seconds**, lower over **3 seconds**.",
        "Keep knees straight for gastrocnemius focus (match your slant-board stretches).",
        "Mild muscle fatigue is fine; sharp heel pain is a stop signal.",
        "Hold a wall or chair for balance — do not bounce.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Foot and arch control",
    },
    {
      type: "text",
      content:
        "Simple foot exercises can support the arch and improve control — but they are secondary to calf work and daily stretching.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Towel scrunches** — curl toes to pull a towel toward you: 2 sets of 10.",
        "**Short foot** — gently shorten the foot without curling toes, hold 5 seconds: 8–10 reps.",
        "**Balance** — stand on one leg near a support: build to 30 seconds each side.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "6-week strengthening checklist",
    },
    {
      type: "accordion",
      items: [
        {
          title: "Week 1 — Start bilateral heel raises",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Continue slant-board stretches most days.",
                "Add 2 sets of 8–10 bilateral heel raises every other day.",
                "Keep step count stable — no sudden increases.",
              ],
            },
          ],
        },
        {
          title: "Week 2 — Build consistency",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Heel raises every other day, progressing to 10–12 reps.",
                "Add towel scrunches or short-foot work on alternate days.",
                "Morning toe stretch before standing — non-negotiable.",
              ],
            },
          ],
        },
        {
          title: "Week 3 — Increase volume carefully",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Move to 3 sets of bilateral heel raises.",
                "If pain is stable, trial single-leg raises with support.",
                "Still no running.",
              ],
            },
          ],
        },
        {
          title: "Week 4 — Single-leg focus",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "2 sets of single-leg heel raises each side.",
                "Add 20–30 second single-leg balance holds.",
                "If pain flares, drop back to bilateral work for another week.",
              ],
            },
          ],
        },
        {
          title: "Week 5 — Eccentric emphasis",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Slow 3-second lowering phase on heel raises.",
                "Stretching maintenance 3–4 times per week minimum.",
                "Assess whether walking longer distances feels manageable.",
              ],
            },
          ],
        },
        {
          title: "Week 6 — Ready for Stage 4?",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Single-leg heel raises with good control and minimal heel pain during/after.",
                "Daily life comfortable in supportive shoes.",
                "If yes, move to [Stage 4: Return to activity](/guide/plantar-fasciitis/stage-4). If not, repeat Week 5.",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "tip",
      title: "Protect your gains",
      content:
        "Once pain settles, many people stop stretching and flare again. Keep a maintenance routine — several sessions per week — while you build strength. See [Stage 2](/guide/plantar-fasciitis/stage-2) if load management still needs attention.",
    },
  ],
};
