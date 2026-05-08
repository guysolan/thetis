import type { SectionContent } from "@/components/course/types";
import pfCalfLengtheningLevels from "@/assets/pf-calf-lengthening-levels.png";
import pfKneeExtendedVsFlexedAnkleMotion from "@/assets/pf-knee-extended-vs-flexed-ankle-motion-tintin-style-v10-two-arrows-each-top-panel.png";

export const metadata = {
  slug: "surgery-overview",
  title: "When Surgery Is Considered",
  description:
    "Surgery is a last resort and rarely required – understanding when it might be appropriate and what the options are",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Surgery is a last resort and is rarely required before at least a year of dedicated non-operative treatment. There are two main surgical approaches, each with different rationales and outcomes.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Level 3: surgery only when Levels 1 and 2 are exhausted",
    },
    {
      type: "text",
      content:
        "Most patients improve without surgery. Level 3 is usually considered only after prolonged symptoms (often around 12 months) despite high-quality conservative care and appropriate Level 2 options.",
    },
    {
      type: "card",
      title: "Two surgical strategies",
      variant: "muted",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Indirect surgery:** calf release (gastrocnemius recession), which aims to reduce strain through the plantar fascia by improving ankle dorsiflexion.",
            "**Direct surgery:** plantar fascia release (fasciotomy), a procedure popular in the 1990s and arguably overused in that era.",
          ],
        },
      ],
    },
    {
      type: "image",
      src: pfCalfLengtheningLevels,
      alt: "Diagram of calf lengthening operation levels across gastrocnemius-soleus complex.",
      caption:
        "Calf lengthening can be performed at different anatomic levels depending on surgical technique.",
    },
    {
      type: "heading",
      level: 2,
      text: "Calf release surgery (gastrocnemius recession)",
    },
    {
      type: "text",
      content:
        "This is most useful in carefully selected patients with documented tight calf (isolated gastrocnemius contracture) that has not improved despite a rigorous stretching programme.",
    },
    {
      type: "text",
      content:
        "Biomechanical logic: a tight calf keeps you relatively tiptoe-biased, increasing Achilles-calcaneus-plantar fascia chain tension. Recession improves upward ankle motion (dorsiflexion), lowers fascial strain, and helps restore balance between daily wear and tissue healing.",
    },
    {
      type: "image",
      src: pfKneeExtendedVsFlexedAnkleMotion,
      alt: "Silfverskiold-style comparison showing dorsiflexion changes with knee position and calf tightness.",
      caption:
        "Silfverskiold assessment helps identify isolated gastrocnemius tightness.",
    },
    {
      type: "section",
      title: "Indications (typical)",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Chronic plantar fasciitis symptoms for 6-12+ months.",
            "Failed conservative care (stretching, orthoses, injections/ESWT as appropriate).",
            "Positive Silfverskiold test suggesting isolated gastrocnemius contracture.",
            "Persistent pain with functional limitation.",
          ],
        },
        {
          type: "text",
          content:
            "Not routinely indicated for general plantar fasciitis without demonstrable gastrocnemius tightness.",
        },
      ],
    },
    {
      type: "section",
      title: "Evidence snapshot",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Foundational biomechanics: DiGiovanni et al. 2002; Patel & DiGiovanni 2011.",
            "Clinical series: Maskill 2010; Abbassian 2012.",
            "RCT signal: Molund 2018 (recession vs stretching) and Gamba 2019 (technique comparison).",
            "Systematic reviews: Pickin 2022; meta-analysis data including small RCT pools suggests pain/function/dorsiflexion gains in selected recalcitrant cases.",
          ],
        },
      ],
    },
    {
      type: "table",
      headers: ["Outcome", "Typical pattern in selected cases"],
      rows: [
        ["Pain", "Often meaningful reduction by 12 months"],
        ["Function", "Improved patient-reported scores (e.g. AOFAS/FFI)"],
        ["Dorsiflexion", "Consistently improved in successful cases"],
        ["Complications", "Usually minor; commonly quoted overall 5-10%"],
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "Evidence limitations",
      content:
        "Evidence is moderate, not definitive: small trial sizes, selection bias toward gastrocnemius-tight patients, variable controls, and strong influence of natural history. This is not a universal cure.",
    },
    {
      type: "section",
      title: "Practical recovery expectations",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Weight-bearing is often early, depending on protocol.",
            "Return to regular shoes commonly around 4-6 weeks.",
            "Higher-level activity/sport often takes 3-6 months.",
          ],
        },
      ],
    },
    {
      type: "card",
      title: "Clinical take-home",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Confirm true gastrocnemius equinus first.",
            "Exhaust non-operative care before surgery.",
            "In selected patients, many surgeons now consider proximal medial gastrocnemius recession before plantar fasciotomy.",
            "Patient selection is the main driver of success.",
          ],
        },
      ],
    },
    {
      type: "accordion",
      items: [
        {
          title: "How surgeons choose between the two operations",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Is there proven isolated gastrocnemius contracture on exam?",
                "How long and how well was non-operative care completed?",
                "Is pain pattern consistent with plantar fascia overload alone or mixed pathology?",
                "What is the risk profile for arch instability and lateral column pain?",
              ],
            },
          ],
        },
      ],
    },
  ],
};
