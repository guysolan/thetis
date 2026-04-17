import type { SectionContent } from "@/components/course/types";

export const metadata = {
  slug: "treatment-overview",
  title: "The Three-Level Treatment Approach",
  description:
    "A stepwise plan for efficient recovery — why Level 1 matters most, why skipping ahead rarely helps, and why consistency beats complexity",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Most people with heel pain recover with time. Recovery is usually faster when you follow a simple stepwise plan and do the fundamentals consistently.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "The Three-Level Approach",
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "**Level 1 (Foundation):** the core daily treatments that work for most people.",
        "**Level 2 (Further treatment):** selected options if a proper Level 1 trial has not been enough.",
        "**Level 3 (Surgery):** rarely needed, reserved for persistent cases after conservative care.",
      ],
    },
    {
      type: "alert",
      variant: "info",
      title: "Remember",
      content:
        "There are **no magic cures**. Heel pain is usually not dangerous, but it does demand patience, consistency, and realistic expectations.",
    },
    {
      type: "section",
      title: "Principles for efficient recovery",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Manage your expectations and follow the stepwise plan.",
            "Give each stage enough time to work before escalating.",
            "Do not skip ahead: advanced treatments are seldom required and often work better after the basics are done properly.",
            "Be disciplined — simple treatments done every day beat complicated plans done occasionally.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "If you've had pain for a long time",
      content: [
        {
          type: "text",
          content:
            "Even if you have had heel pain for months or years, tried many treatments, and felt like you've gone round in circles, it is still worth resetting and rebuilding from the start.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Start again from the beginning.",
            "Follow the simple treatments every day.",
            "Build through the levels systematically.",
          ],
        },
        {
          type: "text",
          content:
            "Many patients with long-standing symptoms still recover with **Level 1 alone** when it is done properly and consistently.",
        },
      ],
    },
    {
      type: "tip",
      title: "Practical mindset",
      content:
        "Think in months, not days. Your job is not to find a miracle treatment; your job is to make the basics non-negotiable.",
    },
  ],
};
