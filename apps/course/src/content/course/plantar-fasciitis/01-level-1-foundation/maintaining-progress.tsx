import type { SectionContent } from "@/components/course/types";

export const metadata = {
  slug: "maintaining-progress",
  title: "Maintaining Your Progress",
  description:
    "Why you must not stop stretching once pain improves – the key message of preventative maintenance to avoid relapse",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Once the pain has settled down, you can reduce the amount of stretching – but do NOT stop completely. Continuing to stretch regularly, several times a week, is important if you want to avoid an unwelcome return of the pain. Think of this as preventative maintenance.",
  blocks: [
    {
      type: "card",
      title: "Doing Well? DON'T STOP STRETCHING",
      variant: "highlight",
      content: [
        {
          type: "text",
          content: "This is a key message for your recovery.",
        },
        {
          type: "text",
          content:
            "Once the pain has settled down, you can reduce the amount of stretching that you do.",
        },
        {
          type: "alert",
          variant: "warning",
          content: "BUT do NOT stop completely.",
        },
        {
          type: "text",
          content:
            "Continuing to stretch regularly, several times a week, is important if you want to avoid an unwelcome return of the pain.",
        },
        {
          type: "text",
          content: "Think of this as preventative maintenance.",
        },
      ],
    },
    {
      type: "text",
      content:
        "Hopefully by now you will, like most sufferers, notice small improvements. Sometimes progress starts later, so between week 6 and week 12 you need to persevere.",
    },
    {
      type: "text",
      content:
        "If you stick with the programme, you are very likely to see benefit. Once improvement begins, it often gathers momentum.",
    },
    {
      type: "quote",
      text:
        "Recovery is like pushing a broken-down car: hard to get moving at first, but once it starts rolling, it moves more easily.",
    },
    {
      type: "alert",
      variant: "warning",
      content:
        "Do NOT be tempted to increase activity yet, especially running.",
    },
    {
      type: "tip",
      title: "Protect your gains",
      content:
        "Keep your stretching habit in place while symptoms settle. This is how you reduce the risk of pain returning.",
    },
  ],
};
