import type { SectionContent } from "@/components/course/types";

export const metadata = {
  slug: "plantar-fascia-release",
  title: "Plantar Fascia Release",
  description:
    "The direct approach – why this operation was popular in the 1990s, its limitations, and why it is now used much more selectively",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "Surgery to the plantar fascia is seldom indicated. Popular in the past, operating on the sole of the foot to partially cut the plantar fascia is rarely used now due to unpredictable results and the risk of arch collapse.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "The direct approach: now used selectively",
    },
    {
      type: "text",
      content:
        "Plantar fascia release (fasciotomy) was widely adopted in the 1990s for stubborn plantar fasciitis after prolonged failed conservative care. Early series reported good pain relief, and both open and endoscopic techniques became popular.",
    },
    {
      type: "text",
      content:
        "Longer follow-up and broader clinical experience later showed important limitations and complications, which reduced enthusiasm for routine use.",
    },
    {
      type: "heading",
      level: 2,
      text: "Why results can be unpredictable",
    },
    {
      type: "text",
      content:
        "The plantar fascia is a key static stabiliser of the medial longitudinal arch (the 'rope under the stepladder'). Cutting it can alter foot biomechanics and increase strain elsewhere.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Arch instability or progressive flattening.",
        "Lateral column overload and outer-foot pain.",
        "Transfer metatarsalgia.",
        "Persistent or recurrent heel pain.",
        "Nerve irritation/injury (including lateral plantar branches).",
        "Painful scar, slower recovery, altered push-off strength or gait.",
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "Key risk principle",
      content:
        "Excessive or complete release increases the chance of destabilising the foot. If surgery is chosen, partial controlled release is generally preferred.",
    },
    {
      type: "heading",
      level: 2,
      text: "How practice changed",
    },
    {
      type: "text",
      content:
        "As complication patterns became clearer, professional guidance shifted toward stricter indications. Groups such as AAOS emphasise that surgery should be reserved for carefully selected patients after prolonged non-operative failure.",
    },
    {
      type: "text",
      content:
        "Current practice usually places plantar fascia release late in the pathway (often after 6-12 months or more of well-executed conservative treatment). In patients with demonstrable gastrocnemius tightness, many surgeons now favour gastrocnemius recession first because it reduces fascial strain without directly cutting the fascia.",
    },
    {
      type: "table",
      headers: ["Then (1990s)", "Now (modern selective use)"],
      rows: [
        ["More routine use for recalcitrant heel pain", "Reserved for a small minority after prolonged failed conservative care"],
        ["Early short-term series drove uptake", "Longer-term data and complication awareness guide restraint"],
        ["Broader release patterns used", "Partial controlled release if performed"],
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Key references supporting this narrative",
    },
    {
      type: "section",
      title: "Natural history and conservative-first principle",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "AAOS OrthoInfo: most patients improve non-surgically; surgery considered after many months of failed conservative care.",
            "Singh D, Angel J, Bentley G, Trevino SG. *BMJ* 1997;315:172-175.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Early popularity and initial outcome series",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Schepsis AA, Leach RE, Gorzyca J. *Clin Orthop Relat Res* 1991;266:185-196.",
            "Sammarco GJ, Helfrey RB. *Foot Ankle Int* 1996;17:520-526.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Outcome limitations and satisfaction gap",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Davies MS, Weiss GA, Saxby TS. *Foot Ankle Int* 1999;20:803-807.",
            "Reported improvement in many heels, but full patient satisfaction was substantially lower.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Biomechanical and complication evidence",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Daly PJ, Kitaoka HB, Chao EY. *Foot Ankle* 1992;13:188-195.",
            "Brugh AM, Fallat LM, Savoy-Moore RT. *J Foot Ankle Surg* 2002;41:365-371.",
            "These studies link larger releases to altered mechanics and lateral column symptoms.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Contemporary synthesis",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Nayar SK et al. Surgical treatment options for plantar fasciitis: systematic review/network meta-analysis. *Arch Orthop Trauma Surg* 2023.",
            "Modern reviews support restricted indications and careful patient selection.",
          ],
        },
      ],
    },
    {
      type: "card",
      title: "Bottom line",
      variant: "highlight",
      content: [
        {
          type: "text",
          content:
            "Plantar fascia release still has a role, but only for a small minority with severe recalcitrant symptoms after prolonged non-operative failure. If performed, it should be carefully selected and usually partial, to reduce the risk of arch destabilisation and lateral column pain.",
        },
      ],
    },
    {
      type: "accordion",
      items: [
        {
          title: "Questions to ask if plantar fascia release is proposed",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Why is this being chosen over gastrocnemius recession in my specific case?",
                "What percentage of fascia do you plan to release?",
                "How do you reduce risk of arch instability and lateral column pain?",
                "What is your expected recovery timeline and return-to-activity plan?",
                "What are your own complication and satisfaction rates?",
              ],
            },
          ],
        },
      ],
    },
  ],
};
