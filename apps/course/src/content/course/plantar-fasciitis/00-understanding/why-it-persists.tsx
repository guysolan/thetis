import type { SectionContent } from "@/components/course/types";

export const metadata = {
  slug: "why-it-persists",
  title: "Why Does Heel Pain Persist? The Four O's",
  description:
    "Overuse, Overweight, Overtight, and Over-21 — the four common factors that slow recovery and how to respond to each",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "At least 8 out of 10 people recover with time alone. But some factors make recovery slower and more stubborn. We call these the **Four O's**.",
  blocks: [
    {
      type: "section",
      title: "The Four O's",
      content: [
        {
          type: "card",
          title: "Overuse",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "Repetitive stress is the most common reason symptoms persist. For many people, this is a sudden jump in running volume, standing time, or walking load.",
            },
            {
              type: "text",
              content:
                "**What helps:** Temporarily reduce aggravating load, then rebuild gradually rather than stopping forever.",
            },
          ],
        },
        {
          type: "card",
          title: "Overweight",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "Even a modest increase in body weight adds meaningful extra force through the heel at every step.",
            },
            {
              type: "text",
              content:
                "**What helps:** Combine load modification with steady, realistic weight reduction where appropriate.",
            },
          ],
        },
        {
          type: "card",
          title: "Overtight",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "A naturally tight calf-Achilles unit (often partly genetic) is strongly linked with persistent heel pain because it increases tension through the heel structures.",
            },
            {
              type: "text",
              content:
                "**What helps:** Consistent calf and plantar fascia mobility work over months, not days.",
            },
          ],
        },
        {
          type: "card",
          title: "Over-21 (Older age)",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "As we get older, tissues usually recover more slowly and are less tolerant of sudden load spikes.",
            },
            {
              type: "text",
              content:
                "**What helps:** Progress treatment more patiently and judge progress in weeks-to-months, not day-to-day.",
            },
          ],
        },
      ],
    },
    {
      type: "alert",
      variant: "info",
      title: "Important perspective",
      content:
        "Having one (or more) of the Four O's does **not** mean you cannot recover. It means your plan must be more deliberate, consistent, and sustained.",
    },
    {
      type: "tip",
      title: "How to use this lesson",
      content:
        "Pick the one or two O's that most apply to you, then target those first in Level 1. Small changes done consistently beat aggressive short bursts.",
    },
  ],
};
