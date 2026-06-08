export const BAUERFEIND_DECK_BASE_PATH = "/decks/bauerfeind";
export const BAUERFEIND_DECK_SLIDE_COUNT = 11;

export const bauerfeindPitchDayStack = {
  eyebrow: "Achilles rupture · Bauerfeind",
  title: "OrthoPrax for the day. Thetis for the night.",
  intro:
    "Bauerfeind already sells walker boots into Achilles rupture recovery. The OrthoPrax Air Walker Pro handles daytime immobilisation. Thetis adds the missing night-time product — and we are looking for one partner to manufacture and distribute it.",
  products: [
    {
      name: "OrthoPrax Air Walker Pro",
      role: "Day · immobilisation",
      detail:
        "Shell pneumatic walker boot with a dual-chamber air bladder, individually adjustable medial and lateral support, and a non-skid rocker bottom — already indicated for ankle sprains, stable fractures, and post-op foot and ankle care.",
      image: "/images/orthoprax.jpg",
      imageAlt:
        "Bauerfeind OrthoPrax Air Walker Pro shell pneumatic walker boot",
      productUrl:
        "https://www.bauerfeind.us/orthoprax-air-walker-pro-shell-pneumatic-walker-boot/",
    },
    {
      name: "Thetis Achilles Splint",
      role: "Night · rest & sleep",
      detail:
        "A patented ~200 g ATR-specific splint that maintains plantarflexion when the walking boot comes off at night, at rest, or during hygiene.",
      image: "/images/night_splint_bed_top_square.jpg",
      imageAlt: "Thetis Achilles rupture night splint in bed",
    },
  ],
} as const;

export const bauerfeindPitchRoutes = {
  eyebrow: "Why Bauerfeind fits",
  title: "One partner to manufacture and distribute the splint.",
  intro:
    "Thetis is not looking to split manufacturing and distribution across different companies. Bauerfeind can make the splint, sell it through existing channels, and pair it with the OrthoPrax walker boot pathway you already own.",
  leadLabel: "🇩🇪 Bauerfeind · manufacture + distribute",
  leadBody:
    "Your OrthoPrax Air Walker Pro already sits in the ATR recovery pathway. Thetis turns that boot-led offer into a complete day/night stack — manufactured under Bauerfeind quality standards and distributed through your existing medical and retail footprint.",
  otherRoutesTitle: "Why the fit is strong",
  otherRoutes: [
    {
      flag: "🏭",
      market: "Manufacturing",
      channel: "Made in Germany",
      detail:
        "Bauerfeind already manufactures medical-grade orthopaedic products to premium standards. Thetis needs a partner that can take the splint into production — not just resell it.",
    },
    {
      flag: "🥾",
      market: "OrthoPrax walker boot",
      channel: "Existing ATR pathway",
      detail:
        "The OrthoPrax Air Walker Pro is already prescribed for ankle sprains, stable fractures, and post-op foot and ankle care. Thetis is the natural night-time companion to that boot.",
    },
    {
      flag: "🌐",
      market: "Distribution",
      channel: "Medical + DTC reach",
      detail:
        "Bauerfeind already reaches clinicians, medical professionals, and patients directly. One partner can manufacture the splint and put it into those same channels alongside OrthoPrax.",
    },
  ],
} as const;

export const bauerfeindPitchWhyNow = {
  title: "Why now",
  intro:
    "Thetis is profitable and growing without outside funding. We now have enough sales evidence, surgeon support, clinical evidence, and patient demand to scale through a manufacturer-distributor partner.",
  growthPoints: [
    {
      label: "Steady unit growth",
      value: "350 -> 2,600 units (2022-2026), before manufacturer distribution",
    },
    {
      label: "90% direct to patient",
      value:
        "~90% sold direct to patients today — clear demand before partner-led manufacturing and wholesale scaling",
    },
    {
      label: "Proven pull-through",
      value:
        "Patients search online when clinics do not stock it: 1.6m annual impressions, 24k clicks, and traffic growing ~2x per year",
    },
  ],
} as const;

export const bauerfeindPitchSalesChart = {
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
    yearLabel: "2027 (Bauerfeind)",
    units: 5000,
    partnerLabel: "Bauerfeind",
  },
} as const;

export const bauerfeindPitchPartnershipOptions = {
  title: "Partnership with Bauerfeind",
  intro:
    "Thetis Medical is looking for one partner to both manufacture and distribute the Achilles night splint. Bauerfeind is a strong fit because you already make and sell walker boots — including the OrthoPrax Air Walker Pro — and can turn that pathway into a complete day/night recovery offer.",
  headline: "Manufacture the splint. Distribute it with OrthoPrax.",
  proposalTitle: "Proposal",
  proposal: [
    "Review clinical evidence, IP, regulatory files, and manufacturing under NDA",
    "Manufacture the splint under Bauerfeind quality and production standards",
    "Distribute through existing medical-professional, orthopaedic, and DTC channels",
    "Launch an Achilles recovery offer pairing OrthoPrax Air Walker Pro with the night splint",
  ],
  options: [
    {
      id: "license",
      label: "Option 1",
      title: "Licence",
      summary:
        "Bauerfeind licences Thetis IP and regulatory assets, then manufactures and distributes the splint under Bauerfeind branding alongside OrthoPrax.",
      points: [
        "Royalty or per-unit licence fee",
        "Know-how transfer and clinical support",
        "Fastest route to a boot + night splint bundle",
      ],
    },
    {
      id: "buy",
      label: "Option 2",
      title: "Acquire",
      summary:
        "Bauerfeind acquires the splint business as a strategic portfolio extension — IP, regulatory files, customer base, and manufacturing know-how.",
      points: [
        "Full ownership of category and margin",
        "Single integration across manufacture and distribution",
        "Founder support through handover, redesign, and launch",
      ],
    },
  ],
} as const;
