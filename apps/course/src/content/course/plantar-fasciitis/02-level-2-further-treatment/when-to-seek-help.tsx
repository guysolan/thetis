import type { SectionContent } from "@/components/course/types";

export const metadata = {
  slug: "when-to-seek-help",
  title: "When to Seek Further Help",
  description:
    "What to do if Level 1 hasn't worked after three months – next steps, scans, and what to expect from your specialist",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "If there is no improvement after three months of dedicated Level 1 treatment, it may be time to seek further help. A scan can be useful to check that the diagnosis is correct and to assess the severity.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Level 2: When Level 1 is not enough",
    },
    {
      type: "text",
      content:
        "If there is no clear improvement after three months of proper Level 1 treatment, you should discuss Level 2 options with your specialist.",
    },
    {
      type: "card",
      title: "Why a scan can help now",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Confirm the diagnosis is correct.",
            "Assess severity and tissue changes.",
            "Guide the next step in treatment.",
          ],
        },
      ],
    },
    {
      type: "text",
      content:
        "In some cases, injection treatment can be considered at the same visit, using ultrasound guidance to help ensure the injection reaches the intended target.",
    },
    {
      type: "tip",
      title: "What to expect from specialist review",
      content:
        "The goal is not to jump straight to procedures. The goal is to confirm diagnosis, stage severity, and choose the least invasive next step likely to help.",
    },
  ],
};
