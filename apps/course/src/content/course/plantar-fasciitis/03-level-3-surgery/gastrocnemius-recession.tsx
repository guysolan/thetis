import type { SectionContent } from "@/components/course/types";

export const metadata = {
  slug: "gastrocnemius-recession",
  title: "Gastrocnemius Recession (Calf Release)",
  description:
    "The indirect approach – stretching a tight calf muscle surgically to reduce strain on the plantar fascia, with evidence and outcomes",
  status: "drafting" as const,
};

export const content: SectionContent = {
  intro:
    "A high proportion of patients with stubborn symptoms fail to recover because their naturally tight calf muscle forces them subtly onto tiptoes, re-damaging the healing plantar fascia. Gastrocnemius recession addresses this root cause.",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Key evidence for gastrocnemius release",
    },
    {
      type: "card",
      title: "1) Systematic review and meta-analysis of RCTs (2026)",
      variant: "highlight",
      content: [
        {
          type: "text",
          content:
            "Pérez-González et al., 2026 (*Journal of Clinical Medicine*): meta-analysis of 5 randomised trials (150 patients) with recalcitrant plantar fasciitis.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Foot function (AOFAS): SMD 0.81.",
            "Pain (VAS): SMD -1.17.",
            "Ankle dorsiflexion: SMD 0.74.",
            "Some included studies reported benefits up to 6 years.",
            "Signal of advantage over plantar fasciotomy in selected analyses, particularly preserving plantar fascia integrity.",
          ],
        },
        {
          type: "text",
          content:
            "Conclusion from this review: gastrocnemius recession appears safe and effective in selected recalcitrant cases with gastrocnemius contracture.",
        },
      ],
    },
    {
      type: "card",
      title: "2) Systematic review of clinical studies (2022)",
      variant: "muted",
      content: [
        {
          type: "text",
          content:
            "Pickin et al., 2022 (*Journal of Foot & Ankle Surgery*): 7 studies (RCTs, cohorts, case series).",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Substantial postoperative pain reduction across studies.",
            "Average about 76% pain reduction at 12 months.",
            "Low complication rate, mostly minor issues (e.g. sural neuritis).",
          ],
        },
        {
          type: "text",
          content:
            "Interpretation: results are encouraging, but study quality remains mixed and heterogeneous.",
        },
      ],
    },
    {
      type: "card",
      title: "3) Additional review-level data",
      variant: "muted",
      content: [
        {
          type: "text",
          content:
            "Reviews including non-randomised series (for example 6 studies, 118 patients) report consistent improvements in pain and function.",
        },
        {
          type: "list",
          style: "bullet",
          items: [
            "Improvement in VAS pain, AOFAS, Foot Function Index, and SF-36 domains.",
            "Increase in ankle dorsiflexion post-procedure.",
            "Overall complication rates often reported around 8-9%.",
          ],
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Biomechanical rationale",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Isolated gastrocnemius tightness reduces ankle dorsiflexion.",
        "Reduced dorsiflexion increases Achilles-calcaneus-plantar fascia chain tension.",
        "Lengthening the gastrocnemius can reduce fascial strain and heel pain.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Where it fits in treatment",
    },
    {
      type: "text",
      content:
        "Most authors reserve this operation for patients who have failed high-quality non-operative care, usually after 6-12 months or longer of stretching, orthoses, load modification, and appropriate injection/shockwave pathways.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "Positive Silfverskiold test.",
        "Documented isolated gastrocnemius contracture.",
        "Persistent pain with functional limitation.",
      ],
    },
    {
      type: "table",
      headers: ["Factor", "Gastrocnemius recession", "Plantar fasciotomy"],
      rows: [
        ["Mechanism", "Reduces fascial tension indirectly", "Directly releases fascia"],
        ["Arch instability risk", "Very low", "Possible"],
        ["Recovery", "Often faster", "Variable"],
        ["Evidence profile", "Limited RCTs + growing reviews", "Older historical data"],
      ],
    },
    {
      type: "text",
      content:
        "Some comparative studies report better functional recovery with gastrocnemius recession in correctly selected patients.",
    },
    {
      type: "alert",
      variant: "warning",
      title: "Limitations of current evidence",
      content:
        "Common issues across reviews include small sample sizes, technique variation (for example Strayer vs Baumann), short follow-up in some cohorts, and patient-selection bias. Evidence is promising, but not definitive.",
    },
    {
      type: "card",
      title: "Summary",
      variant: "highlight",
      content: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Moderate evidence supports gastrocnemius recession for recalcitrant plantar fasciitis with true gastrocnemius contracture.",
            "Meta-analysis of RCTs shows improvements in pain, function, and dorsiflexion.",
            "Evidence quality remains moderate and heterogeneous, so careful patient selection is critical.",
          ],
        },
      ],
    },
    {
      type: "accordion",
      items: [
        {
          title: "Reference trail at a glance",
          content: [
            {
              type: "list",
              style: "bullet",
              items: [
                "Foundational link: DiGiovanni 2002; Patel & DiGiovanni 2011.",
                "Early clinical series: Maskill 2010; Abbassian 2012.",
                "Randomised evidence: Molund 2018; Gamba 2019.",
                "Synthesis: Pickin 2022; Pérez-González 2026 meta-analysis.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
