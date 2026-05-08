import type { SectionContent } from "@/components/course/types";
import pfLevel1ThreeLevelsTreatment from "@/assets/pf-level-1-three-levels-treatment.png";

export const metadata = {
  slug: "rest-and-weight-management",
  title: "Rest & Weight Management",
  description:
    "Why reducing impact activities and managing your weight are the first steps to shifting the balance back toward healing",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Level 1 is the foundation of recovery. Give it at least **3 months**. Most people improve when they do the basics consistently every day.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Level 1 principles",
    },
    {
      type: "list",
      style: "bullet",
      items: ["Rest", "Weight loss", "Stretches", "Supportive shoes"],
    },
    {
      type: "image",
      src: pfLevel1ThreeLevelsTreatment,
      alt: "Three levels of treatment diagram showing Level 1 as rest, stretches, weight management, and shoes.",
      caption:
        "Most recoveries happen in Level 1 when the foundations are done properly.",
    },
    {
      type: "section",
      title: "1) Rest (relative unloading)",
      content: [
        {
          type: "text",
          content:
            "Reduce activities that provoke heel pain, especially running. If running is flaring symptoms, stop it completely for now rather than trying to push through.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Lower your daily step count.",
            "Use lifts/escalators instead of stairs where possible.",
            "Split longer walks into shorter bouts (for example, two 30-minute walks instead of one long hour).",
            "Use supportive footwear (with or without insoles) to reduce load through the heel.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "2) Weight loss (if relevant)",
      content: [
        {
          type: "text",
          content:
            "Even small weight reduction can meaningfully reduce force through the heel. If you are significantly overweight, reaching a healthier range is a major part of treatment.",
        },
        {
          type: "text",
          content:
            "Bonus: weight loss also helps blood pressure, other joint pains, and long-term health risks.",
        },
        {
          type: "alert",
          variant: "info",
          title: "Practical truth",
          content:
            "Weight loss is difficult, but possible. It happens mostly through nutrition: **\"weight loss happens in the kitchen, not in the gym.\"** Exercise supports health, but intake control does most of the work.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "\"You may need to jog for around an hour to burn the calories from a single muffin.\"",
            "\"A useful rule of thumb: roughly 90% nutrition, 10% exercise for weight loss.\"",
          ],
        },
      ],
    },
    {
      type: "tip",
      title: "Discipline beats intensity",
      content:
        "You do not need a perfect week. You need consistent weeks. Keep Level 1 simple and repeatable every day.",
    },
  ],
};
