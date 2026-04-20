import type { SectionContent } from "@/components/course/types";
import pfStretchingExercisesGuide from "@/assets/pf-stretching-exercises-guide.png";

export const metadata = {
  slug: "stretching-programme",
  title: "The Stretching Programme",
  description:
    "The cornerstone of treatment – why stretching works, what to target, and how to build a sustainable daily habit",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Stretching is the cornerstone of treatment. The aim is to 'comb the knots out' of the tangled fibres in the plantar fascia and calf system.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "3) Stretching",
    },
    {
      type: "text",
      content:
        "You may already have tried some stretches. Many patients are given complicated handouts and then stop because they do not feel improvement quickly.",
    },
    {
      type: "image",
      src: pfStretchingExercisesGuide,
      alt: "Two-page plantar fasciitis stretching exercise sheet with step-by-step positions.",
      caption:
        "Simple daily stretches are more effective than complicated plans done occasionally.",
    },
    {
      type: "alert",
      variant: "info",
      title: "Remember",
      content:
        "There are **no magic cures**. A simple programme of stretches, done every day, is usually best.",
    },
    {
      type: "text",
      content:
        "Using a slant board, as detailed in the next lesson, is extremely effective and will nearly always bring improvement within a few weeks when used methodically and consistently.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Stretch every day, not just when pain flares.",
        "Night splints are controversial, but can be worth trying.",
        "Toe stretches are an additional useful measure for plantar fasciitis.",
      ],
    },
    {
      type: "tip",
      title: "Keep it simple",
      content:
        "Do fewer stretches but do them reliably. Consistency beats complexity.",
    },
  ],
};
