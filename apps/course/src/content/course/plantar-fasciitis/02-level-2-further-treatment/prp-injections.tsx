import type { SectionContent } from "@/components/course/types";
import pfPrpSkepticMetaphor from "@/assets/pf-prp-skeptic-metaphor.png";

export const metadata = {
  slug: "prp-injections",
  title: "PRP (Platelet-Rich Plasma) Injections",
  description:
    "The hype vs the evidence – why PRP sounds exciting but robust proof is lacking, and why caution is warranted",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "PRP (platelet-rich plasma) has had plenty of media coverage, but robust evidence for plantar fasciitis is thin. It sounds exciting – concentrated plasma full of growth factors – yet as trials get stricter, confidence often falls. Critics have nicknamed it **Product Rich in Placebo**: some apparent benefit may be expectation and natural recovery as much as the injection itself.",
  blocks: [
    {
      type: "image",
      src: pfPrpSkepticMetaphor,
      alt: "Satirical stock image of an over-enthusiastic doctor with an oversized syringe.",
      caption:
        "A light-hearted reminder to separate marketing from evidence when an expensive modality is offered.",
    },
    {
      type: "heading",
      level: 2,
      text: "Rationale",
    },
    {
      type: "text",
      content:
        "PRP aims to support healing in chronic tendinopathy and enthesopathy by delivering platelets rich in growth factors (for example platelet-derived growth factor, transforming growth factor-β, vascular endothelial growth factor). Because plantar fasciitis is increasingly seen as a **degenerative fasciopathy** rather than simple inflammation, PRP is argued to match the biology better than corticosteroids.",
    },
    {
      type: "text",
      content:
        "That **theory** has not **consistently** translated into strong, reproducible clinical results.",
    },
    {
      type: "heading",
      level: 2,
      text: "Randomised controlled trials",
    },
    {
      type: "card",
      title: "1. Monto (2014)",
      variant: "muted",
      content: [
        {
          type: "text",
          content:
            "Monto RR. Platelet-rich plasma versus corticosteroid injection for chronic plantar fasciitis. *Foot Ankle Int* 2014;35(4):313–318.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Prospective RCT; **40 patients**. PRP vs corticosteroid injection.",
            "**Results:** at 3 months steroid group better; at 12 months PRP group better pain scores.",
            "**Problems:** very small sample, **no placebo**, **unblinded**, large effects **not replicated** elsewhere.",
          ],
        },
        {
          type: "text",
          content:
            "Often quoted by PRP advocates; **methodological weaknesses** limit how much weight to put on it.",
        },
      ],
    },
    {
      type: "card",
      title: "2. Jain et al. (2018)",
      variant: "muted",
      content: [
        {
          type: "text",
          content:
            "Jain SK et al. Comparison of plantar fasciitis treated with platelet-rich plasma or corticosteroid injection. *J Am Podiatr Med Assoc* 2018.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Randomised comparative study.",
            "**Results:** steroids better for **early** pain relief; PRP **possibly** better by **6 months**.",
            "**Limitations:** small numbers, **no placebo** control.",
          ],
        },
      ],
    },
    {
      type: "card",
      title: "3. Shetty et al. (2019)",
      variant: "muted",
      content: [
        {
          type: "text",
          content:
            "Shetty VD et al. Platelet-rich plasma has better long-term results than corticosteroids for plantar fasciitis. *Foot* 2019.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "**Similar pattern:** steroids better initially; PRP better after several months.",
            "**Problems:** unblinded, small cohorts, **variable PRP preparation**.",
          ],
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Major systematic reviews",
    },
    {
      type: "section",
      title: "Whittaker et al. (2019)",
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
            "Steroids **superior short term**; PRP **may** look better after **3–6 months** in some comparisons.",
            "Overall evidence quality for PRP conclusions: **low to very low**.",
            "Authors stress **heterogeneity** of PRP preparation, **inconsistent** protocols, **small** trials.",
          ],
        },
      ],
    },
    {
      type: "section",
      title: "Tsikopoulos et al. (2016)",
      content: [
        {
          type: "text",
          content:
            "Tsikopoulos K et al. Injection therapies for plantar fasciopathy: systematic review and network meta-analysis. *Br J Sports Med* 2016;50:1367–1375.",
        },
        {
          type: "quote",
          text:
            "The quality of evidence was low and confidence in estimates limited.",
        },
        {
          type: "text",
          content:
            "PRP ranked favourably for **long-term** pain in some network models – but with **weak certainty**.",
        },
      ],
    },
    {
      type: "section",
      title: "Ling et al. (2018)",
      content: [
        {
          type: "text",
          content:
            "Ling Y et al. Platelet-rich plasma versus corticosteroid injection for plantar fasciitis: meta-analysis. *Medicine (Baltimore)* 2018.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "PRP **not superior** to corticosteroids **short term**.",
            "**Possible** benefit after **6 months**, but driven by **low-quality** trials.",
          ],
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Major problems with PRP evidence",
    },
    {
      type: "list",
      style: "numbered",
      items: [
        "**Lack of standardisation** – PRP is not one product: platelet concentration, leukocyte-rich vs leukocyte-poor preparation, activation, volume injected – all vary. Trials often compare different biological products.",
        "**Poor trial design** – small samples, no placebo, no blinding, mixed outcomes. Many trials compare PRP only to **steroids**, not to **placebo**.",
        "**Regression to the mean** – plantar fasciitis often improves with time; gains at 6–12 months may partly be **natural history**.",
        "**Publication bias** – positive PRP studies may be more likely to be published.",
      ],
    },
    {
      type: "table",
      headers: ["Outcome", "Evidence (summary)"],
      rows: [
        ["Short-term pain relief", "Steroids generally better"],
        ["Medium term (3–6 months)", "PRP possibly better in some low-quality data"],
        ["Long term", "Inconsistent"],
        ["Quality of evidence", "Low overall in most reviews"],
      ],
    },
    {
      type: "text",
      content:
        "Most systematic reviews conclude that PRP **cannot currently be recommended over** established conservative care and better-validated Level 2 options when judged against **strict** evidence standards.",
    },
    {
      type: "card",
      title: "Balanced conclusion",
      variant: "highlight",
      content: [
        {
          type: "text",
          content:
            "PRP is biologically plausible and widely marketed in sports medicine, but the **clinical** evidence in plantar fasciitis remains **weak and heterogeneous**. Trials are often small and flawed; meta-analyses report **low certainty**.",
        },
        {
          type: "text",
          content:
            "At present, PRP is best viewed as **experimental or investigational**. There is **no convincing high-quality** evidence that it delivers **clinically meaningful** benefit over steroid injection **or** placebo in a way you can bank on for every patient.",
        },
      ],
    },
    {
      type: "alert",
      variant: "warning",
      title: "Important: shockwave and cortisone do not mix on a rushed timetable",
      content:
        "Level 2 treatments such as **shockwave** and **cortisone** work through different ideas – shockwave aims to **re-stimulate** healing with controlled tissue stress (sometimes described as 'heating the biology up'); corticosteroid seeks to **dampen** inflammation ('cooling things down'). Moving **straight** from one to the other is **illogical** and may be **harmful**. Leave a **minimum of about 3 months** between shockwave and steroid injection so each modality has a fair trial; switching too fast can mean the second treatment **disrupts** any **delayed** benefit from the first.",
    },
    {
      type: "accordion",
      items: [
        {
          title: "How to sanity-check a PRP offer",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Ask exactly what PRP product is being prepared (leukocyte-rich vs poor, concentration, volume).",
                "Ask what evidence supports that exact protocol for plantar fasciitis.",
                "Confirm total cost, number of injections, and what objective outcomes will be measured.",
                "Clarify what you should continue (stretching, footwear, load management) during and after PRP.",
                "Ask what the next step is if there is no benefit by 3-6 months.",
              ],
            },
          ],
        },
        {
          title: "Why trial results are hard to compare",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Different PRP preparations are biologically different products.",
                "Injection techniques and comparator arms vary widely.",
                "Plantar fasciitis often improves naturally over time.",
                "Small unblinded cohorts can exaggerate apparent effect size.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
