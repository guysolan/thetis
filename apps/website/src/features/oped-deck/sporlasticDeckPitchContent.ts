import { splintRegulatorySections } from "@/content/trade/splintRegulatoryProfile";

export const SPORLASTIC_DECK_BASE_PATH = "/decks/sporlastic";
export const SPORLASTIC_DECK_SLIDE_COUNT = 13;

/** AI mockup: Thetis splint shell with SPORLASTIC generative-design lattice plastic */
export const sporlasticGenerativeDesignMockup = {
  src: "/images/amazon/amazon-1-sporlastic-generative-design-final.jpg",
  alt: "Thetis Achilles splint with SPORLASTIC generative-design lattice shell",
  caption:
    "Concept: Thetis splint with SPORLASTIC generative-design shell — same pathway, premium manufacture",
} as const;

export const sporlasticPitchDayStack = {
  eyebrow: "Achilles rupture · SPORLASTIC",
  title: "SP AIR WALKER for the day. Thetis for the night.",
  intro:
    "SPORLASTIC already immobilises Achilles ruptures with the SP AIR WALKER range and adjustable heel wedges. Thetis adds the missing night-time product — lightweight, patented, and purpose-built for sleep, rest, and hygiene when the boot comes off.",
  products: [
    {
      name: "SP AIR WALKER PLUS",
      role: "Day · immobilisation",
      detail:
        "Lower-leg and foot brace with dual air chambers, removable liner, and heel wedge for defined plantarflexion — already indicated for Achilles tendon rupture.",
      image: "/images/sporlastic/sp-air-walker-plus.jpg",
      imageAlt: "SPORLASTIC SP AIR WALKER PLUS walking boot for Achilles tendon rupture",
      productUrl:
        "https://www.sporlastic.de/en/product/item/sp-air-walker-plus/",
    },
    {
      name: "Removable heel wedge",
      role: "Day · plantarflexion",
      detail:
        "SPORLASTIC already adjusts equinus position through the walker wedge system. Splint sales sit on the same ATR pathway — the same customer, the same rep visit.",
      image: "/images/catalogue-products/promedics-wedges.webp",
      imageAlt: "Heel wedges for walker boot plantarflexion",
      productUrl:
        "https://www.sporlastic.de/en/product/item/sp-air-walker-plus/",
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

/** Typical reimbursed PF night splint — dorsiflexion wedge (wrong direction for ATR) */
export const sporlasticPfNightSplintDorsiflexion = {
  src: "/images/sporlastic/pf-night-splint-dorsiflexion.png",
  alt: "Typical reimbursed plantar fasciitis night splint with dorsiflexion wedge",
  caption: "Listed Fußlagerungsorthese — holds the foot in dorsiflexion for plantar fasciitis stretch",
} as const;

export const sporlasticPitchGermanyReimbursement = {
  eyebrow: "Routes to market",
  title: "Germany already reimburses night splints — but not for Achilles rupture",
  intro:
    "Sanitätshäuser can prescribe a generic plantar fasciitis night splint alongside the SP AIR WALKER on separate Hilfsmittelverordnungen. The reimbursement route is open — the listed devices are not.",
  germanyLabel: "🇩🇪 GKV · Produktgruppe 23 Orthesen/Schienen",
  hilfsmittelGroup:
    "23.03.01 Fußorthesen zur Immobilisierung · Produktart 23.03.01.0 Fußlagerungsorthesen",
  hilfsmittelNote:
    "Manufacturers list dorsal night splints under these positions when bundling with walker boots. Examples from the Hilfsmittelverzeichnis:",
  wedgeNote: {
    label: "Important",
    headline: "They just reverse the wedge.",
    detail:
      "Same PG 23 code. Wrong angle for ATR. Still too bulky — sleep barely improves.",
  },
  listedCodes: [
    {
      code: "23.03.01.0007",
      product: "DARCO NightSplint®",
      detail: "Fußlagerungsorthese · Fasciitis plantaris / postoperative Ruhigstellung",
    },
    {
      code: "23.03.01.0009",
      product: "DARCO Body Armor® Night Splint",
      detail: "Dorsale Fußlagerungsorthese · plantare Faszie / Achillessehnenschwäche",
    },
    {
      code: "23.03.01.0019",
      product: "PROCARE® Plantar Fasciitis Night Splint",
      detail:
        "Marketed for simultaneous Verordnung with Aircast® walker — hygiene & wound healing, not ATR plantarflexion",
    },
    {
      code: "23.03.01.0023",
      product: "Universal Plantarfasziitis Orthese (UFO)",
      detail: "Generic dorsal night splint · plantar fasciitis indication",
    },
  ],
  limitations: [
    {
      label: "Wrong angle for ATR",
      detail:
        "Listed splints hold the foot in dorsiflexion to stretch the plantar fascia — the opposite of the ~30° plantarflexion Achilles rupture healing requires.",
    },
    {
      label: "Still too bulky to sleep",
      detail:
        "Patients swap the boot for a slightly lighter splint — but it remains a rigid dorsal shell with straps. Sleep quality barely improves.",
    },
    {
      label: "Workaround, not a category",
      detail:
        "Reps bundle an existing PG 23 code with the walker. No Hilfsmittel entry exists for a purpose-built ATR night splint — yet.",
    },
  ],
  closing:
    "SPORLASTIC could use the same reimbursement channel with the right device: lightweight, ~30° plantarflexion, and designed only for Achilles rupture rest and sleep.",
} as const;

export const sporlasticPitchProduct = {
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

export const sporlasticPitchManufacturing = {
  eyebrow: "Manufacturing fit",
  title: "Capabilities worth exploring together",
  intro:
    "Thetis brings patient demand, IP, and regulatory clearance. SPORLASTIC brings orthopaedic plastic design, textile depth, assembly capability, and an existing ATR pathway. We would welcome your team's view on where — if anywhere — this adds value.",
  points: [
    {
      label: "Plastic shell design",
      detail:
        "The splint depends on a rigid dorsal shell for plantarflexion lock — the same class of problem as walker shells, heel wedges, and brace hardware. Your experience in orthopaedic plastics — including lightweighting and generative design — could be relevant if you chose to refine the shell.",
    },
    {
      label: "Textiles & comfort",
      detail:
        "Liners, straps, and overnight skin contact sit alongside the shell. Your flat knit, intarsia, and latex-free fabric expertise could be relevant if you chose to refine the soft-goods side of the product.",
    },
    {
      label: "SP AIR WALKER pathway",
      detail:
        "You already immobilise ATR patients by day with plastic-and-textile products you manufacture in-house. A night splint might sit alongside that offer — we would need your read on channel and plant fit rather than assume it.",
    },
  ],
} as const;

export const sporlasticPitchRoutes = {
  eyebrow: "Why SPORLASTIC fits",
  title: "Manufacture it better. Sell it through the pathway you already own.",
  intro:
    "SPORLASTIC is part of the HAUBER Group — a fifth-generation family business with lean decision-making and deep textile know-how. Thetis brings a proven product; SPORLASTIC can manufacture, refine, and distribute it alongside SP AIR WALKER.",
  leadLabel: "🇩🇪 SPORLASTIC · manufacture + Sanitätsfachhandel",
  leadBody:
    "Your SP AIR WALKER range and heel wedge system already sit inside Achilles rupture recovery. Thetis turns that boot-led pathway into a complete day/night offer — manufactured under SPORLASTIC quality and sold through the channels you already trust.",
  otherRoutesTitle: "Why the fit is strong",
  otherRoutes: [
    {
      flag: "🧵",
      market: "Textile innovation",
      channel: "HAUBER Group expertise",
      detail:
        "Fashion and orthopaedics share the same textile interface at HAUBER. That competence maps directly onto splint liners, elastic strapping, and overnight comfort.",
    },
    {
      flag: "🥾",
      market: "Walker boot range",
      channel: "SP AIR WALKER PLUS",
      detail:
        "Dual air chambers, removable liner, and heel wedge adjustment — you already immobilise ATR patients by day. Thetis is the obvious night-time companion.",
    },
    {
      flag: "🏥",
      market: "Clinical collaboration",
      channel: "Physicians + Sanitätshaus",
      detail:
        "SPORLASTIC develops with doctors, therapists, and technicians — the same stakeholders who already prescribe walker boots for Achilles rupture.",
    },
  ],
} as const;

export const sporlasticPitchWhyNow = {
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

export const sporlasticPitchSalesChart = {
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
    yearLabel: "2027 (SPORLASTIC)",
    units: 5000,
    partnerLabel: "SPORLASTIC",
  },
} as const;

export const sporlasticPitchProductFacts = {
  title: "Product summary",
  items: [
    { label: "Product", detail: "Thetis Achilles Tendon Night Splint" },
    {
      label: "Indication",
      detail: "Rest and sleep during Achilles tendon rupture recovery",
    },
    { label: "Variants", detail: "4 SKUs — Small/Large × Left/Right" },
    { label: "Weight", detail: "~200 g (vs ~2.5 kg walking boot)" },
    { label: "Regulatory", detail: "Class I medical device · CE · UKCA" },
    {
      label: "IP",
      detail:
        "Patented plantarflexion mechanism — portfolio available under NDA",
    },
  ],
} as const;

export const sporlasticPitchRegulatory = {
  title: "Regulatory & quality",
  intro:
    "Class I device — cleared, documented, and registered across SPORLASTIC's core markets.",
  sections: splintRegulatorySections,
  footnote:
    "Full technical file and registration certificates available to qualified partners under NDA.",
} as const;

export const sporlasticPitchPartnershipOptions = {
  title: "Open to the structure that suits SPORLASTIC",
  intro:
    "We are not prescribing an outcome. Under NDA we can share technical files, samples, and regulatory documentation — and join a call before your Design Review if useful — so your team can assess fit and choose a route.",
  options: [
    {
      id: "license",
      label: "Option A",
      title: "Licence & manufacture",
      summary:
        "SPORLASTIC manufactures under its own quality systems, with access to Thetis IP and know-how on terms you define.",
      points: [
        "Royalty or per-unit licence — structure flexible",
        "Thetis supports clinical and product transition",
        "Potential to bundle with SP AIR WALKER if channel fit looks right",
      ],
    },
    {
      id: "buy",
      label: "Option B",
      title: "Acquire",
      summary:
        "SPORLASTIC acquires the splint as a portfolio addition — IP, regulatory assets, and customer base, with founder support through handover.",
      points: [
        "Full category ownership if that is your preferred model",
        "Single integration from manufacture to distribution",
        "Guy available through redesign, tooling, and launch",
      ],
    },
  ],
  closing:
    "Happy to arrange a video call ahead of your Design Review. Guy Solan · Thetis Medical",
} as const;
