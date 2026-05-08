import type { SectionContent } from "@/components/course/types";
import pfSteroidInjectionHeel from "@/assets/pf-steroid-injection-heel.png";

export const metadata = {
  slug: "steroid-injections",
  title: "Steroid Injections",
  description:
    "The evidence for cortisone injections – short-term benefits, why the effect fades, and the risks of repeated injections",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "A steroid injection may be considered for plantar fasciitis but is not recommended for the Achilles tendon. Use remains controversial: a single, carefully placed injection under ultrasound or X-ray guidance carries minimal risk compared with repeated blind injections. Rigorous trials show short-term benefit only.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Level 2 treatment – not before at least 3 months of stretches",
    },
    {
      type: "text",
      content:
        "Do not skip straight to injections. Level 1 (stretching, footwear, load management, weight where relevant) should be given a proper trial first. When symptoms persist despite that, discussion moves to Level 2 options such as injection or shockwave therapy.",
    },
    {
      type: "heading",
      level: 2,
      text: "Injections: what the evidence actually shows",
    },
    {
      type: "text",
      content:
        "Many doctors have patients who seemed helped by a cortisone injection, but plantar fasciitis often improves with time anyway, so it is hard to know what would have happened without the injection. The most rigorous placebo-controlled work suggests steroids offer **short-term** relief only.",
    },
    {
      type: "card",
      title: "McMillan et al. (Australia, BMJ 2012)",
      variant: "highlight",
      content: [
        {
          type: "text",
          content:
            "Ultrasound guided corticosteroid injection for plantar fasciitis: randomised controlled trial. *BMJ* 2012;344:e3260.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Double-blind placebo-controlled RCT; 82 patients with ultrasound-confirmed plantar fasciitis.",
            "Intervention: ultrasound-guided injection, 4 mg dexamethasone sodium phosphate.",
            "Control: saline placebo injection.",
            "**Results:** significant pain improvement at 4 weeks; **no significant difference by 8 or 12 weeks**; reduction in plantar fascia thickness on ultrasound in the steroid group.",
          ],
        },
        {
          type: "text",
          content:
            "**Key point:** strong evidence that steroid injection gives **short-term benefit only**.",
        },
      ],
    },
    {
      type: "image",
      src: pfSteroidInjectionHeel,
      alt: "Steroid injection into medial heel for plantar fasciitis under clinical technique.",
      caption:
        "Typical medial approach near maximal tenderness; accuracy matters to reduce fat-pad and fascia risks.",
    },
    {
      type: "card",
      title: "Ball et al. (UK, Ann Rheum Dis 2013)",
      variant: "muted",
      content: [
        {
          type: "text",
          content:
            "Steroid injection for inferior heel pain: randomised controlled trial. *Ann Rheum Dis* 2013;72:996–1002.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Double-blind RCT; 65 patients with plantar heel pain.",
            "40 mg methylprednisolone + lidocaine vs lidocaine alone.",
            "Significant pain improvement at 1 month; **no difference at 3 months**.",
          ],
        },
        {
          type: "text",
          content:
            "**Key point:** early symptom relief, effect lost over time.",
        },
      ],
    },
    {
      type: "card",
      title: "Crawford et al. (Br J Gen Pract 1999)",
      variant: "muted",
      content: [
        {
          type: "text",
          content:
            "Steroid injection for heel pain: evidence of short-term effectiveness. *Br J Gen Pract* 1999;49:977–980.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "RCT; 106 patients with plantar heel pain.",
            "Hydrocortisone vs local anaesthetic.",
            "Improvement at 1 month; **effect not sustained** at longer follow-up.",
          ],
        },
        {
          type: "text",
          content:
            "Widely cited early trial underpinning later systematic reviews.",
        },
      ],
    },
    {
      type: "section",
      title: "Systematic reviews",
      content: [
        {
          type: "text",
          content:
            "Whittaker GA et al. Corticosteroid injection for plantar heel pain: systematic review and meta-analysis. *BMC Musculoskelet Disord* 2019;20:378.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Steroid injections improve pain in the **short term** (about 6 weeks or less).",
            "**No significant long-term benefit** compared with other treatments in the evidence synthesis.",
            "Complications such as plantar fascia rupture and fat pad atrophy exist but are **uncommon**.",
          ],
        },
      ],
    },
    {
      type: "table",
      headers: ["Time after injection", "Typical effect (summary across RCTs)"],
      rows: [
        ["2–6 weeks", "Moderate pain reduction"],
        ["8–12 weeks", "Effect diminishing"],
        [">3 months", "No meaningful difference vs controls in many trials"],
      ],
    },
    {
      type: "section",
      title: "Complication evidence",
      content: [
        {
          type: "text",
          content:
            "Acevedo JI, Beskin JL. Complications of plantar fascia rupture associated with corticosteroid injection. *Foot Ankle Int* 1998;19:91–97. They reported symptomatic plantar fascia rupture in roughly 10% in their **retrospective** series – not an RCT, but often cited when discussing rupture risk after injection.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Clinical use in practice",
    },
    {
      type: "text",
      content:
        "Corticosteroid injection is commonly used for persistent plantar heel pain after conservative measures. It is **adjunctive**, not a stand-alone cure: histology suggests much of the problem is degenerative change rather than classic inflammation, which partly explains why benefit fades.",
    },
    {
      type: "section",
      title: "When injection is typically considered",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Persistent heel pain despite conservative treatment (often quoted as **6–12 weeks or longer** in guidelines and papers – your course uses **3 months** of dedicated Level 1 before escalating).",
            "Localised maximal tenderness at the medial calcaneal tubercle.",
            "Symptoms limiting walking or work.",
            "Need for short-term pain relief to **enable** stretching and rehab.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Injection methods",
      content: [
        {
          type: "text",
          content:
            "**Landmark-guided:** medial or plantar-medial approach toward the fascia origin; medial approach often less painful and may reduce direct fat-pad injury. Common agents include methylprednisolone acetate, triamcinolone acetonide, or betamethasone, usually with lidocaine; literature doses often in the **10–40 mg** triamcinolone-equivalent range.",
        },
        {
          type: "text",
          content:
            "**Ultrasound-guided:** visualises fascia and needle tip – better targeting, less intrafascial or blind fat-pad injection; supported by high-quality RCTs such as McMillan.",
        },
        {
          type: "text",
          content:
            "Aim to place steroid **adjacent** to the insertion rather than repeatedly **inside** the fascia. **Repeated** injections are generally discouraged because of tissue damage risk.",
        },
      ],
    },
    {
      type: "section",
      title: "Outcomes: short vs longer term",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Short term:** meta-analyses show better pain than placebo around **1 month**; duration of benefit often quoted as **4–12 weeks**.",
            "**Medium / long term:** little or no advantage over placebo beyond **2–3 months** in high-quality data; natural history confounds interpretation.",
            "Some comparisons suggest other options (e.g. PRP in selected studies) may look better **longer term** – covered in the PRP lesson.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Complications",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "**Plantar fascia rupture** – steroid may weaken collagen; rupture can cause arch pain, flattening, lateral column overload. Many authors limit injections to **no more than two or three** in a lifetime for a given heel.",
            "**Heel fat pad atrophy** – especially with inaccurate plantar injection; worsens cushioning and can cause chronic heel pain.",
            "**Post-injection flare** – crystal-related inflammation 24–48 hours; usually settles with rest, ice, simple analgesia.",
            "**Infection, nerve injury, skin changes** – uncommon with sterile technique and careful placement.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Where injections sit in a stepwise plan",
      content: [
        {
          type: "list",
          style: "numbered",
          items: [
            "**First line:** stretching (calf–soleus), orthoses/heel cups, activity change, night splints if appropriate.",
            "**Second line:** corticosteroid injection, extracorporeal shockwave therapy.",
            "**Refractory:** PRP or other biologics, surgery in selected cases.",
          ],
        },
        {
          type: "text",
          content:
            "Injections are often used to **reduce pain enough to keep rehab going**, not as a substitute for stretching and load management.",
        },
      ],
    },
    {
      type: "accordion",
      items: [
        {
          title: "McMillan trial – extra detail (why it is quoted)",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Double-blind RCT; 82 patients; ultrasound-guided medial approach; posterior tibial nerve block before injection.",
                "Steroid: 1 mL dexamethasone sodium phosphate 4 mg/mL vs 1 mL saline.",
                "Outcomes included Foot Health Status Questionnaire pain score and ultrasound thickness at 4, 8, 12 weeks.",
                "Pain: steroid better at **4 weeks** (difference about 10.9 points, P = 0.03); **no significant difference at 8 or 12 weeks**.",
                "Thickness reduced in steroid group through 12 weeks.",
                "Number needed to treat roughly **3** for short-term relief at 4 weeks.",
                "Authors: single ultrasound-guided injection gives **short-term** relief; benefit **does not persist** beyond about one month.",
              ],
            },
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
          type: "list",
          style: "bullet",
          items: [
            "Steroid injection can give **rapid, short-term** pain relief for plantar fasciitis.",
            "High-quality evidence does **not** show lasting superiority over placebo beyond **2–3 months** in key trials.",
            "Use **judiciously**, limit repeat injections, prefer **image guidance** when available.",
            "Treat as a **temporary adjunct** within rehabilitation – not a definitive fix for degenerative plantar fascia change.",
          ],
        },
      ],
    },
  ],
};
