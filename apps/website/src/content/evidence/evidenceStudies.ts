/** Shared clinical evidence data and citations (evidence + trade pages). */

export const aeWaitComparison = {
  labels: ["Plaster cast", "Thetis splint"] as const,
  meanDays: [8.7, 2.9] as const,
  maxDays: [23, 6] as const,
  chartMaxDays: 23,
};

export type EvidenceSource = {
  id: string;
  title: string;
  /** Shorter label for compact trade / B2B cards */
  shortTitle: string;
  authors: string;
  institution: string;
  pdfHref: string;
  conference?: string;
  conferenceHref?: string;
  keyFinding: string;
};

export const evidenceSources: EvidenceSource[] = [
  {
    id: "trauma-splint-qip",
    shortTitle: "A&E pathway QIP (EFORT 2023)",
    title:
      "#1874 — Teamwork And Innovation For Achilles Tendon Rupture: A Multidisciplinary Quality Improvement Project",
    authors:
      "Solan M, Gaukroger A, Bailey L, Gadamsetty C, Carne A (Royal Surrey NHS Trust)",
    institution: "Royal Surrey NHS Trust",
    pdfHref: "/documents/evidence/time-to-care.pdf",
    conference: "EFORT 2023 (prize-winning poster)",
    conferenceHref: "https://www.efort.org/",
    keyFinding:
      "Mean time to definitive treatment plan 3.7 days with splint pathway vs 8.8 days previously (max 23 days). A&E chart: mean 2.9 vs 8.7 days to specialist review.",
  },
  {
    id: "sleeping-safe-and-sound",
    shortTitle: "Sleeping safe and sound (BOFAS 2024)",
    title: "120 — Sleeping safe and sound after Achilles rupture",
    authors: "Peacock C, Solan M, Gaukroger A, George N",
    institution: "BOFAS 2024",
    pdfHref: "/documents/evidence/sleeping-safe-and-sound.pdf",
    keyFinding:
      "No difference in complication rates or functional outcomes vs control; 95% CI injury risk with splint at night less than 0.1%.",
  },
  {
    id: "mother-knows-best",
    shortTitle: "Mother Knows Best (BOFAS 2023)",
    title:
      "201 — Mother Knows Best — Improving recovery experience after Achilles tendon rupture",
    authors: "Little Z, Gaukroger A, Peacock C, Kolodziejczyk I, Solan M",
    institution: "BOFAS 2023",
    pdfHref: "/documents/evidence/mother-knows-best.pdf",
    keyFinding:
      "High patient satisfaction and no adverse outcomes with the Thetis splint vs traditional night boot wear.",
  },
];

export const safetyStudyStats = {
  patientsRecorded: "5,000+",
  reportedInjuries: "Zero",
  sampleSizeAdequacy: "99.9%",
  statisticalPower: "99.7%",
  confidenceLevel: "95%",
  injuryRiskUpperBound: "<0.1%",
} as const;

export const sleepingSafeAndSoundStudy = evidenceSources.find(
  (source) => source.id === "sleeping-safe-and-sound",
)!;

export const motherKnowsBestStudy = evidenceSources.find(
  (source) => source.id === "mother-knows-best",
)!;
