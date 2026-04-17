import type { SectionContent } from "@/components/course/types";
import pfWhatWentWrongBalanceScale from "@/assets/pf-what-went-wrong-balance-scale.png";
import pfWhatWentWrongRopeFraying from "@/assets/pf-what-went-wrong-rope-fraying.png";
import pfWhatWentWrongAchillesPlantarMap from "@/assets/pf-what-went-wrong-achilles-plantar-map.png";

export const metadata = {
  slug: "what-went-wrong",
  title: "What Has Gone Wrong?",
  description:
    "How daily wear and tear can outpace the body's repair process, leading to thickened, disorganised tissue and chronic pain",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Injury to the Achilles tendon or plantar fascia happens when small daily damage (from walking, standing, and running) starts to outpace the body's repair process.",
  blocks: [
    {
      type: "section",
      title: "Daily wear and tear is normal",
      content: [
        {
          type: "text",
          content:
            "Every day, everyone breaks a few microscopic collagen fibres in the Achilles tendon and plantar fascia. That is normal biology — like skin flaking away or hair falling out.",
        },
        {
          type: "text",
          content:
            "Under normal circumstances, nature repairs this minor damage and keeps pace. Damage and repair stay in balance.",
        },
      ],
    },
    {
      type: "image",
      src: pfWhatWentWrongBalanceScale,
      alt: "Balance scale analogy showing normal activity load and tissue repair.",
      caption:
        "Recovery stays on track when tissue repair keeps up with day-to-day loading.",
    },
    {
      type: "heading",
      level: 2,
      text: "How the balance tips",
    },
    {
      type: "text",
      content:
        "A small change can be enough to tip the balance from manageable wear to overload.",
    },
    {
      type: "list",
      style: "bullet",
      items: ["different shoes", "increased activity or exercise", "weight gain"],
    },
    {
      type: "text",
      content:
        "The result is too many fibres tearing at once — more than the usual amount of fair wear and tear.",
    },
    {
      type: "section",
      title: "What overloaded tissue looks like",
      content: [
        {
          type: "text",
          content:
            "If nature cannot keep up with repair, the rope-like tissue gradually becomes **thickened**, **disorganised**, and **frayed**.",
        },
      ],
    },
    {
      type: "image",
      src: pfWhatWentWrongRopeFraying,
      alt: "Rope analogy showing healthy fibres versus frayed and torn fibres.",
      caption:
        "Like rope fibres, tendon and fascia fibres can become frayed when overload persists.",
    },
    {
      type: "section",
      title: "Why it starts to hurt",
      content: [
        {
          type: "text",
          content:
            "The body's attempt to fix this overload drives inflammation. That inflammatory response then causes pain, stiffness, and swelling.",
        },
        {
          type: "text",
          content:
            "Over time this can become chronic, and in some people healing stalls unless loading is adjusted and the fundamentals are rebuilt.",
        },
      ],
    },
    {
      type: "image",
      src: pfWhatWentWrongAchillesPlantarMap,
      alt: "Foot diagram highlighting Achilles tendinopathy at the back of heel and plantar fasciitis under the heel.",
      caption:
        "This same overload pattern can show up at the back of the heel (Achilles) or under the heel (plantar fascia).",
    },
    {
      type: "tip",
      title: "Key takeaway",
      content:
        "The target is not complete rest forever and not a quick fix. The target is restoring the **balance** between daily loading and tissue repair.",
    },
  ],
};
