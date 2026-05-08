import type { SectionContent } from "@/components/course/types";

export const metadata = {
  slug: "common-myths",
  title: "Common Myths About Heel Pain",
  description:
    "Why heel pain usually does get better, what “trying everything” often misses, and why injections or surgery are rarely the whole answer",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Wrong ideas about heel pain fuel anxiety, expensive shortcuts, and operations that were never needed. These are the stories we hear most often in clinic — and what actually tends to be true underneath them.",
  blocks: [
    {
      type: "section",
      title: "Myths vs what we usually see",
      content: [
        {
          type: "card",
          title: "“It will never go away.”",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "There is a **very strong chance** it will improve. “Chronic” means it has lasted longer than you hoped — not that you are sentenced to lifelong pain.",
            },
          ],
        },
        {
          type: "card",
          title: "“I have tried everything.”",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "Perhaps — but were the **right** treatments done **properly**, and given **long enough** to work? Heel pain rewards boring consistency (especially load management and calf–plantar fascia stretching), not a scattergun of one-off gadgets.",
            },
          ],
        },
        {
          type: "card",
          title: "“I just need an injection.”",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "An injection is **seldom** the ultimate cure. It can sometimes reduce pain for a window, which may help you **rehab** — but it does not replace the fundamentals, and it carries risks your clinician should explain.",
            },
          ],
        },
        {
          type: "card",
          title: "“An operation will solve it.”",
          variant: "muted",
          content: [
            {
              type: "text",
              content:
                "Fortunately, **surgery is very rarely necessary** for straightforward plantar heel pain. Most people never need an operation; the later sections of this course explain when it is genuinely worth discussing.",
            },
          ],
        },
      ],
    },
    {
      type: "alert",
      variant: "info",
      title: "What the numbers tend to look like",
      content:
        "It is well documented that **many people with heel pain improve with no formal treatment at all** — often quoted in the region of **8 out of 10** over time. That figure typically **rises above 9 in 10** (and recovery is **quicker**) if you follow the simple advice in **Level 1** of this guide: the right basics, done properly, for long enough.",
    },
    {
      type: "text",
      content:
        "Read on to understand **why** the heel hurts, then how to recover **efficiently** — without wasting time on fixes that sound dramatic but rarely change the long-term outcome.",
    },
  ],
};
