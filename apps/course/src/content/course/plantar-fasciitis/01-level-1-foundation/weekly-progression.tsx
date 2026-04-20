import type { SectionContent } from "@/components/course/types";

export const metadata = {
  slug: "weekly-progression",
  title: "Week-by-Week Progression",
  description:
    "A structured 6-week plan – gradually building slant board duration and gradient while managing expectations for weight loss and pain",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Follow this week-by-week guide to build up your stretching gradually. Most sufferers begin to notice small improvements between week 6 and week 12. Like pushing a broken-down car, it's hard to get the improvement moving – but once it starts, it keeps rolling.",
  blocks: [
    {
      type: "card",
      title: "Week 1",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Purchase a slant board and use low gradient, 3 minutes at a time.",
            "Toe stretches.",
            "Reduce step count.",
            "Supportive shoes.",
            "Record your body weight accurately and honestly.",
          ],
        },
      ],
    },
    {
      type: "card",
      title: "Week 2",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Slant board at low gradient, 4 minutes at a time.",
            "Toe stretches.",
            "Reduced step count.",
            "Supportive shoes.",
            "Check progress: have you lost a couple of pounds?",
          ],
        },
      ],
    },
    {
      type: "card",
      title: "Week 3",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Slant board at low gradient, 5 minutes at a time.",
            "Toe stretches.",
            "Reduced step count.",
            "Supportive shoes.",
            "Weight loss often gets harder after an encouraging start - keep going and maintain willpower.",
          ],
        },
      ],
    },
    {
      type: "card",
      title: "Week 4",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Increase slant board by one gradient level, then drop back to 3 minutes at a time.",
            "Toe stretches.",
            "Reduced step count.",
            "Supportive shoes.",
            "Weight loss may be slower - do not lose heart, keep going.",
          ],
        },
      ],
    },
    {
      type: "card",
      title: "Week 5",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Keep slant board one level up and increase duration to 4 minutes at a time.",
            "Toe stretches.",
            "Reduced step count.",
            "Supportive shoes.",
            "Weight loss may still be slower - stay consistent and maintain willpower.",
          ],
        },
      ],
    },
    {
      type: "card",
      title: "Week 6",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Keep slant board one level up and increase to 5 minutes at a time.",
            "Do not go above the second gradient level unless your specialist advises it.",
            "Toe stretches.",
            "Reduced step count.",
            "Supportive shoes.",
            "Weight loss can be slow - keep your routine and maintain willpower.",
          ],
        },
      ],
    },
    {
      type: "tip",
      title: "Keep momentum",
      content:
        "If progress feels slow, do not abandon the plan. Small gains each week add up, and recovery often gathers momentum after the first few weeks.",
    },
  ],
};
