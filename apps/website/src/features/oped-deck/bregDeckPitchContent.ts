import { splintRegulatorySections } from "@/content/trade/splintRegulatoryProfile";

export const BREG_DECK_BASE_PATH = "/decks/breg";
export const BREG_DECK_SLIDE_COUNT = 13;

export const bregAchillesBootImage = {
  src: "/images/breg/achilles-boot.png",
  alt: "Breg Achilles Boot, shown on its own against a white background",
} as const;

export const bregPitchDayStack = {
  eyebrow: "Achilles rupture · Breg",
  title: "Achilles Boot for the day. Thetis for the night.",
  intro:
    "Breg already immobilises Achilles ruptures with the Achilles Boot and Achilles Wedges. Thetis adds the missing night-time product — lightweight, patented, and purpose-built for sleep, rest, and hygiene when the boot comes off.",
  products: [
    {
      name: "Achilles Boot w/ Air",
      role: "Day · immobilisation",
      detail:
        "Hi-top walker with four 10° heel wedges and an air bladder. It holds the foot in plantarflexion after an Achilles injury or reconstruction — the boot patients already use for weight-bearing walks.",
      image: "/images/breg/achilles-boot.png",
      imageAlt: "Breg Achilles Boot, shown on its own against a white background",
      productUrl:
        "https://www.breg.com/products/foot-ankle-bracing/walker-boots/achilles-boot/",
    },
    {
      name: "Achilles Wedges",
      role: "Day · plantarflexion",
      detail:
        "Polypropylene wedges that hold plantarflexion inside Breg walkers. The same equinus position the Achilles Boot builds in, sold across the walker range.",
      image: "/images/breg/achilles-wedges.png",
      imageAlt: "Breg Achilles Wedges stacked for plantarflexion",
      productUrl:
        "https://www.breg.com/products/foot-ankle-bracing/walker-boots/achilles-wedges/",
    },
    {
      name: "Thetis Achilles Splint",
      role: "Night · rest & sleep",
      detail:
        "A patented ~200 g splint that maintains plantarflexion when the boot is off at night, at rest, or during hygiene — the product patients search for when the boot fails them.",
      image: "/images/amazon/amazon-1.jpg",
      imageAlt: "Thetis Achilles rupture night splint",
    },
  ],
} as const;

export const bregPitchDayPathway = {
  eyebrow: "The Breg pathway",
  title: "The boot covers the day. Night is still open.",
  intro:
    "Breg already holds the foot in plantarflexion for walking. Patients take that boot off to sleep.",
  points: [
    {
      label: "Right boot for the day",
      detail:
        "Achilles Boot with four 10° wedges. The right position for walking.",
    },
    {
      label: "Off at night",
      detail:
        "Hot and heavy once the patient lies down. The tendon is left unprotected.",
    },
    {
      label: "Nothing in the range for night",
      detail: "Breg has the day boot. There is still no Achilles night splint.",
    },
  ],
} as const;

export const bregPitchPatientReview = {
  eyebrow: "In the patient's words",
  title: "Fantastic for walking. Hell for sleeping.",
  intro:
    "Verified purchase, Achilles rupture, day 25. The Breg air boot was the right device for weight-bearing walks. It was the wrong device for the night.",
  image: "/images/breg/finally-relief-review.png",
  imageAlt:
    "Amazon review titled Finally Relief, from a verified buyer recovering from an Achilles rupture, describing a Breg air boot as difficult to sleep in",
  caption:
    "Finally Relief · Small Left · Verified purchase · United States · 24 July 2026",
} as const;

export const bregPitchProduct = {
  eyebrow: "Why the product works",
  title: "Purpose-built for Achilles rupture — not a generic night splint",
  intro:
    "Walking boots protect the tendon by day. At night, patients remove them — hot, heavy, unhygienic — and the tendon is unprotected. Thetis solves the 12-hour compliance gap with a device designed only for ATR rest and sleep.",
  stats: [
    { value: "~200 g", label: "Device weight" },
    { value: "~90%", label: "Lighter than a boot" },
    { value: "30°", label: "Plantarflexion lock" },
    { value: "4", label: "SKU variants (S/L × L/R)" },
  ],
  features: [
    "Maintains plantarflexion when the walking boot is off — the clinical requirement boot makers cannot solve",
    "Open, breathable design for sleep, hygiene, and midnight bathroom trips",
    "Patented mechanism — clinically distinct from plantar fasciitis splints or dorsal night braces",
    "Washable liner — patients stop sleeping in a dirty daytime boot",
  ],
  notItems: [
    "Not a boot replacement for weight-bearing",
    "Not a plantar fasciitis splint",
    "Not a comfort accessory",
  ],
} as const;

export const bregPitchWhyNow = {
  title: "Why now",
  intro:
    "Thetis is profitable and growing without outside funding. We now have enough sales evidence, surgeon support, clinical evidence, and patient demand to scale through a manufacturing partner.",
  growthPoints: [
    {
      label: "Steady unit growth",
      value: "350 → 2,600 units (2022–2026), before manufacturer distribution",
    },
    {
      label: "90% direct to patient",
      value:
        "~90% sold direct to patients today — clear demand before partner-led manufacturing and wholesale scaling",
    },
    {
      label: "Proven pull-through",
      value:
        "Patients search online when clinics do not stock it: 1.6m annual impressions, 24k clicks, and traffic growing ~2× per year",
    },
  ],
} as const;

export const bregPitchSalesChart = {
  title: "Splints sold per year",
  subtitle:
    "Growth achieved with ~90% of sales direct to patients, before partner-led manufacturing and distribution.",
  history: [
    { year: "2022", units: 350 },
    { year: "2023", units: 900 },
    { year: "2024", units: 1650 },
    { year: "2025", units: 2100 },
    { year: "2026", units: 2600 },
  ],
  projection: {
    year: "2027",
    yearLabel: "2027 (Breg)",
    units: 5000,
    partnerLabel: "Breg",
  },
} as const;

export const bregPitchRegulatory = {
  title: "Regulatory & quality",
  intro:
    "Class I device — cleared, documented, and registered, including with the FDA in the United States.",
  sections: splintRegulatorySections,
  footnote:
    "Full technical file and registration certificates available to qualified partners under NDA.",
} as const;

export const bregPitchPartnershipOptions = {
  title: "Open to the structure that suits Breg",
  intro:
    "We are not prescribing an outcome. Under NDA we can share technical files, samples, and regulatory documentation so your team can assess fit and choose a route.",
  options: [
    {
      id: "license",
      label: "Option A",
      title: "Licence & manufacture",
      summary:
        "Breg manufactures under its own quality systems, with access to Thetis IP and know-how on terms you define.",
      points: [
        "Royalty or per-unit licence — structure flexible",
        "Thetis supports clinical and product transition",
        "Potential to pair with the Achilles Boot where the channel fit is right",
      ],
    },
    {
      id: "buy",
      label: "Option B",
      title: "Acquire",
      summary:
        "Breg acquires the splint as a portfolio addition — IP, regulatory assets, and customer base, with founder support through handover.",
      points: [
        "Full category ownership if that is your preferred model",
        "Single integration from manufacture to distribution",
        "Guy available through redesign, tooling, and launch",
      ],
    },
  ],
  closing: "Happy to arrange a video call. Guy Solan · Thetis Medical",
} as const;
