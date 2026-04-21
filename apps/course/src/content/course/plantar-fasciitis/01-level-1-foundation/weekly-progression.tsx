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
      type: "heading",
      level: 3,
      text: "6-week timeline at a glance",
    },
    {
      type: "table",
      headers: ["Week", "Slant board target", "Focus"],
      rows: [
        ["Week 1", "Low gradient, 3 minutes", "Set routine and baseline weight"],
        ["Week 2", "Low gradient, 4 minutes", "Build consistency"],
        ["Week 3", "Low gradient, 5 minutes", "Keep momentum despite slower progress"],
        ["Week 4", "Increase by 1 level, reset to 3 minutes", "Progress gently without overload"],
        ["Week 5", "Same level, 4 minutes", "Stabilize tolerance"],
        ["Week 6", "Same level, 5 minutes", "Consolidate and avoid rushing ahead"],
      ],
    },
    {
      type: "accordion",
      items: [
        {
          title: "Week 1 - Setup",
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
          title: "Week 2 - Build consistency",
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
          title: "Week 3 - Keep momentum",
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
          title: "Week 4 - First progression",
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
          title: "Week 5 - Stabilize",
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
          title: "Week 6 - Consolidate",
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
      ],
    },
    {
      type: "alert",
      variant: "info",
      title: "Timeline rule",
      content:
        "Progress one variable at a time (gradient or duration). If symptoms flare, hold your current step for longer before progressing.",
    },
    {
      type: "tip",
      title: "Keep momentum",
      content:
        "If progress feels slow, do not abandon the plan. Small gains each week add up, and recovery often gathers momentum after the first few weeks.",
    },
  ],
};
