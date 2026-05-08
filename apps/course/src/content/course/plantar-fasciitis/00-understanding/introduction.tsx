import type { SectionContent } from "@/components/course/types";
import chronicHeelPainOverview from "@/assets/chronic-heel-pain-common-self-limiting.png";

export const metadata = {
  slug: "introduction",
  title: "Why Does My Heel Hurt?",
  description:
    "What chronic heel pain is, why it often settles with time, typical symptoms — and what this guide will (and will not) promise",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Heel pain is extremely common. Most people who land here have persistent pain either at the **back** of the heel (Achilles tendinitis) or **underneath** it (plantar fasciitis — sometimes called policeman's heel).",
  blocks: [
    {
      type: "image",
      src: chronicHeelPainOverview,
      alt: "Infographic on parchment-style background: palpation behind the ankle and thumb pressure on the plantar heel for typical plantar fasciitis tenderness; centre text lists swelling, stiffness, and tenderness, with a contrasting line calling out sore first steps.",
      caption:
        "Very common, usually self-limiting, signs of plantar fasciitis — swelling, stiffness, and tenderness, especially in the “first steps”.",
    },
    {
      type: "heading",
      level: 2,
      text: "Will it get better?",
    },
    {
      type: "text",
      content:
        "In the **vast majority** of cases, yes. These problems are usually **self-limiting**: they tend to settle with time. The right self-care can speed things up; the wrong approach is often chasing a quick fix that does not exist.",
    },
    {
      type: "heading",
      level: 2,
      text: "How do I know this is my problem?",
    },
    {
      type: "text",
      content:
        "You cannot diagnose yourself from a webpage — but the pattern of symptoms is often recognisable. Typical features include **pain**, **stiffness**, and **tenderness** around the heel.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Pain often begins **gradually**, though it can sometimes appear quite suddenly.",
        "A **classic** feature of plantar fasciitis is sharp pain with the **first few steps in the morning**, or after sitting for a while, which then eases as you get moving.",
        "Pain at the **back** of the heel that worsens with loading (walking uphill, pushing off, sport) fits better with **Achilles** issues at the insertion or mid-portion — still common, still usually manageable.",
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "When to get checked in person",
      content:
        "If you have **severe** pain after an injury, cannot put weight through the foot, have marked **swelling or redness**, fever, numbness, or symptoms that do not fit a simple plantar heel pain story, arrange an **urgent** or routine medical review — whichever your situation warrants.",
    },
    {
      type: "heading",
      level: 2,
      text: "Guide to recovery",
    },
    {
      type: "text",
      content:
        "This course is written in the same spirit as our Achilles rupture programme: **plain language**, **practical steps**, and **honest expectations**. It aims to:",
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "Give you a **sound understanding** of what is going on at the heel.",
        "Outline **simple, effective** treatments you can use at home (especially the foundation work that actually moves the needle).",
        "Emphasise that **time and perseverance** matter — there are **no magic cures**.",
        "Help you **avoid wasting time and money** on gimmicks and unnecessary treatments.",
      ],
    },
    {
      type: "tip",
      title: "How to use the course",
      content:
        "Start with the **Understanding** chapters, then move into **Level 1: Foundation** and give the basics a fair trial (often **months**, not days). If you are stuck after that, the later levels explain **evidence-based** next steps — including when scans, injections, or surgery are genuinely worth discussing.",
    },
  ],
};
