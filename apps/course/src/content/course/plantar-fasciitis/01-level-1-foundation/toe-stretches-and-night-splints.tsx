import type { SectionContent } from "@/components/course/types";
import pfMorningToeStretch from "@/assets/pf-morning-toe-stretch.png";
import pfNightSplintOptions from "@/assets/pf-night-splint-options.png";

export const metadata = {
  slug: "toe-stretches-and-night-splints",
  title: "Toe Stretches & Night Splints",
  description:
    "Additional techniques for plantar fasciitis – morning toe stretches to ease first-step pain, and whether a night splint could help you",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Before you stand up – first thing in the morning or after sitting for a while – take hold of the toes (especially the big toe) and bend them upwards in a long, slow stretch. This helps 'comb the knots out' of the tangled plantar fascia fibres.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Other ways to stretch",
    },
    {
      type: "section",
      title: "Night splints",
      content: [
        {
          type: "text",
          content:
            "Night splints do not have strong high-quality evidence, but some patients find them useful. They may help keep the calf/Achilles-plantar fascia unit from tightening overnight.",
        },
        {
          type: "image",
          src: pfNightSplintOptions,
          alt: "Examples of plantar fasciitis night splint options.",
          caption:
            "Evidence is mixed, but night splints can still be worth a practical trial.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Specific Level 1 advice for heel pain",
    },
    {
      type: "card",
      title: "Slant board stretch technique",
      variant: "highlight",
      content: [
        {
          type: "text",
          content:
            "Perform slant board stretches with your knees locked perfectly straight to target the tightest part of the calf muscles. Build duration progressively over several weeks.",
        },
      ],
    },
    {
      type: "section",
      title: "Morning stretch before first steps",
      content: [
        {
          type: "text",
          content:
            "Before getting out of bed, perform a long, slow upward stretch of your toes. This often reduces pain in your first few steps.",
        },
        {
          type: "image",
          src: pfMorningToeStretch,
          alt: "Manual toe stretch performed before standing up in the morning.",
          caption:
            "Do this before your feet hit the floor to ease first-step pain.",
        },
      ],
    },
    {
      type: "tip",
      title: "Simple routine",
      content:
        "Keep this as a daily habit: morning toe stretch, then your scheduled slant board sessions through the day.",
    },
  ],
};
