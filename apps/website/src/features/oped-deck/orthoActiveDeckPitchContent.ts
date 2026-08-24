export const ORTHO_ACTIVE_DECK_BASE_PATH = "/decks/orthoactive";
export const ORTHO_ACTIVE_DECK_SLIDE_COUNT = 9;

export const orthoActivePitchTitle = {
  eyebrow: "Ortho Active × Thetis Medical",
  title: "How this product actually sells",
  subtitle:
    "Not a pitch. Four ways volume moves — we want your read on Canada.",
} as const;

export const orthoActivePitchMix = {
  eyebrow: "The mix today",
  title: "Demand is proven. Most of it is still digital.",
  intro:
    "Global volume has grown every year. About 90% of that is patients finding the splint online. The other 10% is shops, hospitals, and a few institutions — and that is the harder part everywhere, Canada included.",
  stats: [
    { value: "5,000+", label: "Units in the field" },
    { value: "~90%", label: "Digital / D2C today" },
    { value: "~200", label: "Canada units / year" },
    { value: "2,600", label: "Global units in 2026" },
  ],
} as const;

export const orthoActivePitchSalesChart = {
  title: "Splints sold per year",
  subtitle:
    "History only — no partner forecast. Growth so far is almost all direct to patient.",
  history: [
    { year: "2022", units: 350 },
    { year: "2023", units: 900 },
    { year: "2024", units: 1650 },
    { year: "2025", units: 2100 },
    { year: "2026", units: 2600 },
  ],
} as const;

export const orthoActivePitchLevers = {
  eyebrow: "Discussion map",
  title: "Four levers",
  intro:
    "These are the things that already move volume. The rest of the deck walks each one. We are not picking a winner for you.",
  items: [
    {
      number: "1",
      title: "Digital marketing D2C",
      channel: "Shopify",
      detail:
        "thetismedical.com, Shopify, Amazon, SEO and content. This built the business.",
    },
    {
      number: "2",
      title: "Fliers and referral codes",
      channel: "Clinics & clinicians",
      detail:
        "Hospital flyers and clinician codes. Cheap, local, and already used in the UK.",
    },
    {
      number: "3",
      title: "Where we make it",
      channel: "UK · Romania · Asia",
      detail:
        "Three production routes. Real saving is maybe £20k a year — worth knowing, not a growth lever.",
    },
    {
      number: "4",
      title: "Reimbursement / national schemes",
      channel: "Not live yet",
      detail:
        "Germany listing, NHS supply chain, US reimbursement. Big unlock if price comes down — and a big effort.",
    },
  ],
} as const;

export const orthoActivePitchDigital = {
  eyebrow: "Lever 1",
  title: "Digital D2C — Shopify and search",
  intro:
    "Patients look for a night solution when the boot keeps them awake. When they find it, they buy it. That is most of the volume to date.",
  stats: [
    { value: "1.6m", label: "Annual search impressions" },
    { value: "24k", label: "Clicks to the site" },
    { value: "~2×", label: "Traffic growth per year" },
    { value: "4.1 / 5", label: "Global rating · 303 reviews" },
  ],
  channels: [
    {
      label: "Shopify",
      detail: "thetismedical.com checkout — the main D2C engine",
    },
    {
      label: "Amazon",
      detail: "Marketplace where patients already shop for recovery kit",
    },
    {
      label: "Content & SEO",
      detail: "Guides, courses, and achilles-rupture.com feed the same demand",
    },
  ],
} as const;

export const orthoActivePitchFliers = {
  eyebrow: "Lever 2",
  title: "Fliers and referral codes",
  intro:
    "A flyer in a fracture clinic, plus a visit, has produced local sales spikes in the UK. Clinician referral codes already exist — 20% on the sale if they want to use them.",
  tactics: [
    {
      label: "Patient flyers",
      detail:
        "Waiting-area and A&E leave-behinds. Patients take a code home and order when the boot fails them at night.",
    },
    {
      label: "Clinician codes",
      detail:
        "Referral / affiliate links for physios and surgeons exist. We have not used them.",
    },
    {
      label: "Hospital visits",
      detail:
        "In-person clinic visits paired with flyers. The spike is local and measurable after the visit.",
    },
  ],
  proof: {
    label: "This does work",
    headline: "We have never used a referral code. Fliers increase sales.",
    detail:
      "Leave a flyer in the clinic and volume at that site goes up. The code is optional. The paper is what moves it.",
  },
} as const;

export const orthoActivePitchPricing = {
  eyebrow: "Lever 3",
  title: "Where we make it",
  intro:
    "UK today. Romania and Asia are open as lower-cost routes. Moving production does not transform the P&L.",
  routes: [
    {
      label: "United Kingdom",
      status: "Current",
      detail:
        "Shells and soft goods made here now. Simple, close, and already in the quality system.",
    },
    {
      label: "Romania",
      status: "Available",
      detail:
        "EU labour and sewing at a lower unit cost, without leaving the European supply footprint.",
    },
    {
      label: "Asia",
      status: "Available",
      detail:
        "Lowest unit cost. Longer lead times, more freight, more coordination — the usual trade.",
    },
  ],
  saving: {
    label: "What it actually gives",
    headline: "Maybe £20k a year.",
    detail:
      "Real money, not a rounding error — and not enough to change the growth story. Reimbursement needs a different price; this is not how you get there.",
  },
} as const;

export const orthoActivePitchReimbursement = {
  eyebrow: "Lever 4",
  title: "We have not pulled this lever yet",
  intro:
    "Reimbursement and national schemes are how volume scales without patients finding us online. None of this is live as a Thetis channel today. The doors that look open:",
  paths: [
    {
      market: "Germany",
      name: "Hilfsmittel listing",
      detail:
        "Night positioning orthoses are already reimbursed — mostly the wrong dorsiflexion splints. A correct ATR code would let Sanitätshäuser supply it.",
    },
    {
      market: "United Kingdom",
      name: "NHS supply chain",
      detail:
        "Coming. Trust-level sales exist; a national catalogue / supply-chain listing is the step that would make hospital buy routine.",
    },
    {
      market: "United States",
      name: "Insurance / reimbursement",
      detail:
        "Not started. Coding, payer coverage, and clinic billing would have to be built from scratch.",
    },
  ],
  unlock: {
    label: "The catch",
    headline: "Getting price down is the big unlock — and a big effort.",
    detail:
      "Payers and supply chains do not buy at C$140. Listing, tenders, and a lower landed cost are the work. Worth it if someone wants to own that channel; not a side project.",
  },
} as const;

export const orthoActivePitchClinics = {
  eyebrow: "What already works",
  title: "Some clinics sell it well",
  intro:
    "Not a national pattern. Where a surgeon advocates for the splint, the clinic stocks it and patients get it. A few of those advocates:",
} as const;

export const orthoActivePitchClose = {
  eyebrow: "The options",
  title: "What do you think?",
  intro: "These are the options. We can talk through whichever is useful.",
} as const;
