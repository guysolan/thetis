import type { GuideContent, GuideMetadata } from "@/components/guide/types";

export const metadata: GuideMetadata = {
  slug: "stage-1",
  title: "Plantar fasciitis — Stage 1: Foundation",
  description:
    "Stretching-focused foundation stage: simple daily habits, slant-board work, and realistic expectations.",
  phase: "plantar-fasciitis-stage-1",
  weekRange: "Stage 1",
  highlights: [
    "Stretching is the cornerstone",
    "No magic cures",
    "Simple daily programme",
  ],
  phaseSubtitle: "Foundation",
  hubCardTitle: "Foundation",
  timelineColor: "bg-primary",
};

export const content: GuideContent = {
  intro:
    "Stretching is the cornerstone of treatment. The goal is to 'comb the knots out' of the tangled fibres in the plantar fascia.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "3) Stretching",
    },
    {
      type: "text",
      content:
        "You may have already tried stretches. Many people receive a complicated information sheet and then give up when improvement does not happen quickly.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/stretching-exercises.png",
      alt: "Plantar fasciitis stretching exercises guide sheet.",
      caption:
        "A simple daily programme is better than a complicated plan you cannot sustain.",
    },
    {
      type: "alert",
      variant: "info",
      title: "Remember",
      content:
        "There are **no magic cures**. A simple stretching programme is usually best.",
    },
    {
      type: "text",
      content:
        "Using a slant board, as detailed below, is extremely effective and will nearly always bring improvement in a few weeks when used methodically every day.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Night splints are controversial, but may be worth trying.",
        "Toe stretches are an additional useful measure for plantar fasciitis.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Using a Slant Board",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/slant-board-stretches-banner.png",
      alt: "Slant board stretching setup and stance.",
      caption:
        "Use the board several times daily for short, consistent sessions.",
    },
    {
      type: "text",
      content:
        "A slant board is highly effective for calf stretching, but only if used methodically every day. Start with a low gradient and keep your knees straight to target the calf properly.",
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "Start at 3 minutes, 3 times daily.",
        "Build toward 5+ minutes, 3-4 times daily.",
        "Only then make the board slightly steeper and reset the duration.",
        "Use only the first two levels unless your specialist advises otherwise.",
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "Safety",
      content:
        "Too steep or too much too soon can trigger foot, leg, or back pain. If pain worsens, reduce stretching and contact your clinician.",
    },
    {
      type: "text",
      content:
        "Tight calves can leave you effectively on slight tiptoes all day, increasing pressure under the forefoot and strain through the arch and ankle tendons.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/tight-calf-tiptoe-effect.png",
      alt: "Tiptoe position showing increased forefoot pressure from calf tightness.",
      caption:
        "Reducing calf tightness lowers daily strain through the heel, arch, and ankle.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/comb-knots-analogy.png",
      alt: "Comb analogy for gradual untangling and tissue remodelling.",
      caption:
        "Think gradual daily progress, not aggressive one-off stretching.",
    },
    {
      type: "tip",
      title: "Top tip",
      content:
        "Raise your laptop or keyboard and stretch while working at a standing setup. This makes daily compliance much easier.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/slant-board-key-messages.png",
      alt: "Slant board checklist image: trainers on, knees straight, low gradient, every day.",
      caption:
        "Key messages: every day, trainers on, knees locked, low gradient, build 3 to 5 minutes.",
    },
    {
      type: "heading",
      level: 2,
      text: "Other ways to stretch",
    },
    {
      type: "text",
      content:
        "Night splints do not have strong evidence, but some people still find them useful as part of a practical routine.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/night-splint-options.png",
      alt: "Night splint options for plantar fasciitis.",
      caption: "Worth trying for some patients, even though evidence is mixed.",
    },
    {
      type: "heading",
      level: 3,
      text: "Specific Level 1 advice for pain under the heel",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Do slant board stretches with knees locked perfectly straight.",
        "Build stretch duration gradually over several weeks.",
        "Before getting out of bed, do a long, slow upward toe stretch.",
      ],
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/morning-toe-stretch.png",
      alt: "Morning toe stretch for plantar fasciitis first-step pain.",
      caption:
        "Morning toe stretch before standing can reduce first-step pain.",
    },
    {
      type: "heading",
      level: 2,
      text: "Footwear and insoles",
    },
    {
      type: "text",
      content:
        "Wear supportive shoes and consider insoles. Avoid being barefoot and avoid very flat shoes while symptoms are active.",
    },
    {
      type: "image",
      src: "/images/guide/plantar-fasciitis/footwear-supportive-vs-flat.png",
      alt: "Supportive footwear versus flat and unsupportive footwear options.",
      caption:
        "Supportive footwear reduces daily strain through the heel and arch.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Start with simple off-the-shelf arch-support insoles.",
        "Build wear time gradually over 1-2 weeks.",
        "Custom insoles are not usually needed first-line.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Patience",
    },
    {
      type: "text",
      content:
        "Improvement takes time. It is rare not to see early signs of recovery within a few weeks, and once it starts, progress usually gathers momentum.",
    },
  ],
};
