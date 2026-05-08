import type { SectionContent } from "@/components/course/types";
import pfAnatomySystemsOverview from "@/assets/pf-anatomy-systems-overview.png";
import pfAnatomyTendonPlantarFasciaDiagram from "@/assets/pf-anatomy-tendon-plantar-fascia-diagram.png";
import pfAnatomyTendonCartoon from "@/assets/pf-anatomy-tendon-cartoon.png";
import pfAnatomyKeyStructures from "@/assets/pf-anatomy-key-structures.png";
import pfAnatomyCalfAchillesAction from "@/assets/pf-anatomy-calf-achilles-action.png";
import pfAnatomyAchillesWrapPaintbrushBrickAnalogy from "@/assets/pf-anatomy-achilles-wrap-paintbrush-brick-analogy.png";
import pfAnatomyHammockAnalogy from "@/assets/pf-anatomy-hammock-analogy.png";
import pfAnatomyStepladderAnalogy from "@/assets/pf-anatomy-stepladder-analogy.png";

export const metadata = {
  slug: "anatomy",
  title: "Understanding Your Body – Anatomy",
  description:
    "The calf muscles, Achilles tendon, and plantar fascia – how they connect and why they matter for your heel pain",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Each foot and ankle contains 28 bones. For heel pain, we are most interested in the **calcaneum** (heel bone). The bones are held together by **ligaments**. Muscles move bones by pulling on **tendons**.",
  blocks: [
    {
      type: "image",
      src: pfAnatomySystemsOverview,
      alt: "Overview illustration introducing body systems before focusing on heel anatomy.",
      caption: "Understanding your body starts with the key tissues around the heel.",
    },
    {
      type: "image",
      src: pfAnatomyTendonPlantarFasciaDiagram,
      alt: "Side-view foot anatomy showing the Achilles tendon and plantar fascia around the calcaneum.",
      caption:
        "The Achilles tendon and plantar fascia both anchor around the heel bone.",
    },
    {
      type: "section",
      title: "The basic building blocks",
      content: [
        {
          type: "text",
          content:
            "**Tendon:** A tendon is a strong, rope-like tissue that connects a muscle to a bone. When a muscle flexes, it pulls on the tendon and moves a joint.",
        },
        {
          type: "text",
          content:
            "**Ligament:** A ligament is a strong band of tissue that binds two bones together, flexible enough to allow movement, but limiting how far that movement can go.",
        },
        {
          type: "text",
          content:
            "Both tendons and ligaments are made from thousands of collagen fibres woven together — like old-fashioned rope (tendon) or webbing/seat belt material (ligament).",
        },
      ],
    },
    {
      type: "image",
      src: pfAnatomyTendonCartoon,
      alt: "Simple diagram comparing a tendon to a rope linking muscle to bone.",
      caption: "Tendon concept: a rope-like link from muscle to bone.",
    },
    {
      type: "heading",
      level: 2,
      text: "Anatomy of Heel Pain",
    },
    {
      type: "text",
      content: "The key structures involved in heel pain are:",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "the **calf muscles**",
        "the **Achilles tendon**",
        "the **plantar fascia**",
      ],
    },
    {
      type: "image",
      src: pfAnatomyKeyStructures,
      alt: "Labelled anatomy image of calf muscles and Achilles tendon with real-world comparison.",
      caption:
        "Key structures in heel pain: calf muscle complex, Achilles tendon, and plantar fascia.",
    },
    {
      type: "section",
      title: "How the calf and Achilles work together",
      content: [
        {
          type: "text",
          content:
            "The large calf muscles become narrower and taper down into the Achilles tendon. You can pinch this tendon under the skin just above your heel bone.",
        },
        {
          type: "text",
          content:
            "The Achilles tendon is the largest tendon in the body. When your calf muscles flex, the Achilles tendon pulls on the heel bone so you rise onto tiptoes.",
        },
      ],
    },
    {
      type: "image",
      src: pfAnatomyCalfAchillesAction,
      alt: "Calf and Achilles image demonstrating that calf contraction pulls the heel upward.",
      caption:
        "When calf muscles contract, the Achilles pulls the heel and lifts you onto tiptoes.",
    },
    {
      type: "section",
      title: "Why the Achilles wraps around the heel",
      content: [
        {
          type: "text",
          content:
            "To achieve this the Achilles tendon has to be stuck extremely tightly to the heel bone. If it was \"glued to the top of the bone\" it would not hold. Nature is more clever than that, and so the fibres of the Achilles tendon broaden and it wraps around the whole heel bone, attached firmly to the back of the bone, and then to the underneath surface of the bone too.",
        },
      ],
    },
    {
      type: "image",
      src: pfAnatomyAchillesWrapPaintbrushBrickAnalogy,
      alt: "Side by side: paintbrush bristles with red lines wrapping around a brick corner, compared with foot bones showing Achilles tendon wrapping the heel.",
      caption:
        "Same idea as the text above: fibres need to wrap around a corner, not just sit on top.",
    },
    {
      type: "section",
      title: "The hammock model",
      content: [
        {
          type: "text",
          content:
            "Imagine the heel bone sitting in a hammock. The Achilles tendon is the rope on one end. After wrapping around the heel, fibres continue under the foot to form the plantar fascia — the rope on the other end.",
        },
      ],
    },
    {
      type: "image",
      src: pfAnatomyHammockAnalogy,
      alt: "Tintin-style foot skeleton on tiptoe with plantar fascia webbing, Achilles rope, hammock under the heel, and short labels explaining each part.",
      caption:
        "Hammock analogy: Achilles fibres wrap around the heel and continue under the foot.",
    },
    {
      type: "section",
      title: "What the plantar fascia does",
      content: [
        {
          type: "text",
          content:
            "The plantar fascia is the tight band running from heel to toes. It has no muscle attached, but it still has an important mechanical role.",
        },
        {
          type: "text",
          content:
            "When you stand, it tightens. Because it links heel and toes, it supports the arch of your foot. Without it, the arch/instep would collapse toward the floor.",
        },
        {
          type: "text",
          content:
            "A useful picture is a stepladder: the plantar fascia acts like the rope between the two sides, stopping the structure from collapsing.",
        },
      ],
    },
    {
      type: "image",
      src: pfAnatomyStepladderAnalogy,
      alt: "Stepladder analogy image comparing plantar fascia support to the stabilising strap of a ladder.",
      caption:
        "Stepladder analogy: without this support, the foot arch would collapse inward.",
    },
  ],
};
