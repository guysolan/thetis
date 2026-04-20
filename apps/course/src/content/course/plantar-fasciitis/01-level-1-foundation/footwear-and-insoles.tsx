import type { SectionContent } from "@/components/course/types";
import pfFootwearSupportiveVsFlat from "@/assets/pf-footwear-supportive-vs-flat.png";

export const metadata = {
  slug: "footwear-and-insoles",
  title: "Footwear & Insoles",
  description:
    "Choosing supportive shoes, avoiding flat soles and barefoot walking, and whether custom orthotics are worth the investment",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Wearing supportive shoes and considering insoles can make a significant difference to your daily comfort. Avoid being barefoot and avoid flat shoes – but you rarely need to spend large sums on made-to-measure insoles.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Footwear basics",
    },
    {
      type: "text",
      content:
        "Wear supportive shoes through the day, especially on hard floors. Avoid being barefoot and avoid very flat shoes.",
    },
    {
      type: "image",
      src: pfFootwearSupportiveVsFlat,
      alt: "Comparison of supportive footwear versus flat unsupportive shoes.",
      caption:
        "Choose cushioned supportive shoes. Avoid thin, flat, or unsupportive footwear.",
    },
    {
      type: "dos-donts",
      dos: [
        "Supportive trainers or walking shoes with cushioning",
        "Supportive sandals/slippers indoors if needed",
        "Consistent footwear use at home and outside",
      ],
      donts: [
        "Barefoot walking on hard floors",
        "Very flat flip-flops",
        "Minimalist shoes while symptoms are active",
      ],
    },
    {
      type: "section",
      title: "Insoles: practical advice",
      content: [
        {
          type: "text",
          content:
            "Insoles can reduce day-to-day pain by spreading load and supporting the arch, especially when combined with stretching and sensible shoe choice.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Start with a simple off-the-shelf arch-support insole.",
            "Use it in your most frequently worn shoes first.",
            "Wear for short periods initially, then build up over 1-2 weeks.",
            "Replace worn insoles regularly to maintain support.",
            "Custom orthotics are usually not first-line unless simpler options fail.",
          ],
        },
        {
          type: "tip",
          title: "Make insoles easier to tolerate",
          content:
            "If an insole feels too aggressive, reduce wear time, or try a softer/lower-profile option rather than abandoning insoles altogether.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Patience matters",
    },
    {
      type: "text",
      content:
        "Improvement takes time. It is uncommon not to see at least early signs of recovery within a few weeks, and once improvement starts, it usually gathers momentum.",
    },
    {
      type: "alert",
      variant: "info",
      title: "Stay the course",
      content:
        "Do not stop the basics as soon as pain eases. Keep up stretching, footwear support, and load management to consolidate your recovery.",
    },
  ],
};
