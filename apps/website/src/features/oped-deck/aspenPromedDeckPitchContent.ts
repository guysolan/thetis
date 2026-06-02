export const ASPEN_PROMED_DECK_BASE_PATH = "/decks/aspen-promed";
export const ASPEN_PROMED_DECK_SLIDE_COUNT = 11;

export const aspenPromedPitchDayStack = {
  eyebrow: "Achilles rupture · Aspen / Promedics",
  title: "Promedics already has the boot. Thetis completes ATR care.",
  intro:
    "Promedics sells walker boots into the same pathway, including Airstep, FixStep, and Traverse. Thetis adds the missing night-time product that can help Aspen / Promedics become the default supplier for Achilles tendon rupture.",
  products: [
    {
      name: "Promedics walker boot pathway",
      role: "Day · immobilisation",
      detail:
        "Airstep, FixStep, and Traverse cover daytime immobilisation, weight-bearing, and clinic supply.",
      image: "/images/catalogue-products/promedics-walker.webp",
      imageAlt: "Promedics walker boot used in Achilles rupture recovery",
    },
    {
      name: "Achilles wedges",
      role: "Day · plantarflexion",
      detail:
        "Promedics already sells wedges with the boot pathway to position the foot for ATR recovery - splint sales can be compared exactly to wedge sales.",
      image: "/images/catalogue-products/promedics-wedges.webp",
      imageAlt: "Promedics Achilles wedges for walker boots",
    },
    {
      name: "Thetis Achilles Splint",
      role: "Night · rest & sleep",
      detail:
        "A patented ~200 g splint that maintains plantarflexion when the boot is off at night, at rest, or during hygiene.",
      image: "/images/night_splint_bed_top_square.jpg",
      imageAlt: "Thetis Achilles rupture night splint in bed",
    },
  ],
} as const;

export const aspenPromedPitchRoutes = {
  eyebrow: "Why Aspen / Promedics fits",
  title: "You have the contacts, distribution, and reach to scale this.",
  intro:
    "Aspen / Promedics already has the boot relationships, orthopaedic sales routes, hospital and clinic access, wholesale reach, and US/UK footprint. Thetis brings the proven product; you have the channels to scale it.",
  leadLabel: "🇬🇧 Aspen / Promedics · existing boot channel",
  leadBody:
    "Your Airstep, FixStep, and Achilles wedge range already sits inside ATR recovery. Thetis turns that boot-and-wedge pathway into a complete day/night offer.",
  otherRoutesTitle: "Why the fit is strong",
  otherRoutes: [
    {
      flag: "🌐",
      market: "Multichannel reach",
      channel: "UK Promedics + US Aspen",
      detail:
        "You already have the footprint: US Aspen plus UK Promedics, across hospitals, fracture clinics, orthopaedic teams, and wholesale. Put Thetis into those channels and sales can scale.",
    },
    {
      flag: "🥾",
      market: "Boot range",
      channel: "Airstep, FixStep, Traverse",
      detail:
        "Your walker range already handles daytime immobilisation and rehab. Thetis adds the night-time ATR product patients ask for.",
    },
    {
      flag: "📊",
      market: "Wedge benchmark",
      channel: "Same pathway volume",
      detail:
        "You already sell Achilles wedges on the boot-led ATR pathway. Splint sales can be compared exactly to wedge sales - the same customer and rep visit.",
    },
  ],
} as const;

export const aspenPromedPitchWhyNow = {
  title: "Why now",
  intro:
    "Thetis is profitable and growing without outside funding. We now have enough sales evidence, surgeon support, clinical evidence, and patient demand to scale through partners.",
  growthPoints: [
    {
      label: "Steady unit growth",
      value: "350 -> 2,600 units (2022-2026), before manufacturer distribution",
    },
    {
      label: "90% direct to patient",
      value:
        "~90% sold direct to patients today - clear demand before partner-led clinical and wholesale scaling",
    },
    {
      label: "Proven pull-through",
      value:
        "Patients search online when clinics do not stock it: 1.6m annual impressions, 24k clicks, and traffic growing ~2x per year",
    },
  ],
} as const;

export const aspenPromedPitchSalesChart = {
  title: "Splints sold per year",
  subtitle:
    "Growth achieved with ~90% of sales direct to patients, before partner-led distribution.",
  history: [
    { year: "2022", units: 350 },
    { year: "2023", units: 900 },
    { year: "2024", units: 1650 },
    { year: "2025", units: 2100 },
    { year: "2026", units: 2600 },
  ],
  projection: {
    year: "2027",
    yearLabel: "2027 (Aspen)",
    units: 5000,
    partnerLabel: "Aspen / Promedics",
  },
} as const;

export const aspenPromedPitchPartnershipOptions = {
  title: "Partnership with Aspen / Promedics",
  intro:
    "Thetis Medical is looking to partner with a boot manufacturer to scale the Achilles night splint. Aspen / Promedics is a preferred route because it already sells the boot-led pathway and can use the splint to become the default supplier for Achilles tendon rupture.",
  proposalTitle: "Proposal",
  proposal: [
    "Review clinical evidence, IP, regulatory files, and manufacturing under NDA",
    "Bundle the splint with Airstep, FixStep, Traverse, and Achilles wedges",
    "Use the existing multichannel orthopaedic sales footprint",
    "Launch an Achilles recovery pack built around boot + night splint",
  ],
  options: [
    {
      id: "license",
      label: "Option 1",
      title: "Licence",
      summary:
        "Aspen / Promedics licences Thetis IP and regulatory assets. Thetis supports the transition; the partner owns manufacturing, brand, and distribution.",
      points: [
        "Royalty or per-unit licence fee",
        "Know-how transfer and clinical support",
        "Fastest route to scale under partner branding",
      ],
    },
    {
      id: "buy",
      label: "Option 2",
      title: "Acquire",
      summary:
        "Aspen / Promedics acquires the splint business as a strategic portfolio extension - IP, regulatory files, customer base, and manufacturing know-how.",
      points: [
        "Full ownership of category and margin",
        "Single integration, no ongoing royalty",
        "Founder support through handover, redesign, and launch",
      ],
    },
  ],
} as const;
