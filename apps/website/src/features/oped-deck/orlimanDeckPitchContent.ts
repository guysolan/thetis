import { splintRegulatorySections } from "@/content/trade/splintRegulatoryProfile";

export const ORLIMAN_DECK_BASE_PATH = "/decks/orliman";
export const ORLIMAN_DECK_SLIDE_COUNT = 11;

export const orlimanPitchDayStack = {
  eyebrow: "Achilles rupture · Orliman",
  title: "Orliman can own the Spanish and Portuguese-language recovery offer.",
  intro:
    "Thetis has the purpose-built Achilles night splint. Orliman has the orthopaedic brand, manufacturing credibility, and regional reach needed to make it feel local in Spain, Portugal, and Brazil.",
  products: [
    {
      role: "Orliman",
      name: "Trusted orthopaedic brand",
      detail:
        "A recognised Spanish orthopaedic manufacturer with 30+ years in braces, supports, and technical orthopaedic products.",
    },
    {
      role: "Market reach",
      name: "Spain, Portugal, Brazil",
      detail:
        "The markets where Thetis wants help are language-led and relationship-led. Orliman can make the product feel native to clinicians, orthopaedic retailers, and patients.",
    },
    {
      role: "Thetis",
      name: "Achilles night splint",
      detail:
        "A patented ~200 g ATR-specific splint that protects plantarflexion when the walking boot comes off at night, at rest, or during hygiene.",
    },
  ],
} as const;

/** Planning estimates using ~25–30 ATR ruptures per 100k person-years (OPED deck methodology). */
export const orlimanAnnualRuptures = {
  spain: 12_000,
  portugal: 2_500,
  brazil: 50_000,
} as const;

export const orlimanAnnualRupturesTotal = Object.values(
  orlimanAnnualRuptures,
).reduce((sum, n) => sum + n, 0);

export const orlimanPitchRoutes = {
  eyebrow: "Why Orliman fits",
  title:
    "We are not asking you to change your portfolio. We are asking you to use your reach.",
  intro:
    "The opportunity is not to replace an existing Orliman product. It is to add a branded Achilles rupture night product into the channels where Orliman already has trust.",
  leadLabel: "Orliman-branded ATR night splint",
  leadBody:
    "Thetis can provide the product, evidence, IP, regulatory file, and launch know-how. Orliman can provide local brand trust, clinician access, orthopaedic retail relationships, and Spanish / Portuguese market execution.",
  marketHeadline: "~65,000 ATR ruptures a year",
  marketIntro:
    "Across Spain, Portugal, and Brazil alone — before wider Spanish-speaking Latin America. Thetis reaches almost none of them today.",
  marketSource:
    "Planning estimate using ~25-30 ATR ruptures per 100k person-years.",
  otherRoutesTitle: "Launch markets",
  otherRoutes: [
    {
      flag: "🇪🇸",
      market: "Spain",
      channel: "Home market credibility",
      annualRuptures: orlimanAnnualRuptures.spain,
      detail:
        "A Spanish Orliman-branded product is easier for surgeons, orthopaedic shops, and patients to trust than an imported English-language DTC product.",
    },
    {
      flag: "🇵🇹",
      market: "Portugal",
      channel: "Neighbouring Iberian reach",
      annualRuptures: orlimanAnnualRuptures.portugal,
      detail:
        "Portugal is a natural extension for an Iberian orthopaedic partner: close geography, aligned product education, and a similar clinic-retail pathway.",
    },
    {
      flag: "🇧🇷",
      market: "Brazil",
      channel: "Portuguese-language scale",
      annualRuptures: orlimanAnnualRuptures.brazil,
      detail:
        "Brazil is the largest upside market in the ask. Thetis needs a partner that can translate evidence and demand into local orthopaedic access.",
    },
  ],
} as const;

export const orlimanPitchRegulatory = {
  title: "Regulatory & quality",
  intro:
    "Class I device documentation is ready for Orliman review: technical file, EU/UK MDR documentation, post-market surveillance, and launch support. Brazil / ANVISA route to be assessed with Orliman.",
  sections: splintRegulatorySections,
  footnote:
    "Full technical file, registration certificates, and market-by-market regulatory pack available to Orliman under NDA.",
} as const;

export const orlimanPitchWhyNow = {
  title: "Why now",
  intro:
    "Thetis is profitable and growing without outside funding. The next stage is best accelerated by partners that can localise the product into markets where patients and clinicians already ask for better night-time protection.",
  growthPoints: [
    {
      label: "Steady unit growth",
      value:
        "350 -> 2,600 units (2022-2026), before regional manufacturer distribution",
    },
    {
      label: "90% direct to patient",
      value:
        "~90% sold direct to patients today - demand exists before Orliman-led clinical, retail, and wholesale scaling",
    },
    {
      label: "Unserved regional demand",
      value:
        "~65,000 ATR ruptures a year across Spain, Portugal, and Brazil — with almost no Thetis distribution today",
    },
  ],
} as const;

export const orlimanPitchSalesChart = {
  title: "Splints sold per year",
  subtitle:
    "Growth achieved with ~90% of sales direct to patients, before partner-led regional distribution.",
  history: [
    { year: "2022", units: 350 },
    { year: "2023", units: 900 },
    { year: "2024", units: 1650 },
    { year: "2025", units: 2100 },
    { year: "2026", units: 2600 },
  ],
  projection: {
    year: "2027",
    yearLabel: "2027 (Orliman)",
    units: 5000,
    partnerLabel: "Orliman",
  },
} as const;

export const orlimanPitchPartnershipOptions = {
  title: "Partnership with Orliman",
  headline: "Sell the Thetis splint under the Orliman brand",
  intro:
    "We want Orliman to take our proven Achilles rupture night splint and sell it as an Orliman-branded product in Spain, Portugal, and Brazil — using the channels and trust you already have.",
  commercialTitle: "Why it is commercially simple",
  commercialPoints: [
    {
      label: "Patient RRP",
      value: "~€79.99 target EU patient price",
    },
    {
      label: "Simple range",
      value: "4 SKUs: small / large, left / right",
    },
    {
      label: "Add-on sale",
      value:
        "A lightweight orthopaedic retail and clinician-recommendation product, not a boot replacement",
    },
  ],
  orlimanTitle: "What we need from Orliman",
  orlimanPoints: [
    "Sell an Orliman-branded ATR night splint in Spain, Portugal, and Brazil",
    "Own the local positioning: Orliman packaging, clinician education, orthopaedic retail, and distributor activation",
  ],
  thetisTitle: "What Thetis provides",
  thetisPoints: [
    "Product know-how, clinical evidence, IP access, regulatory documentation, launch support, and Spanish instructions already prepared",
    "Spanish / Portuguese launch assets adapted to Orliman's preferred local wording and brand style",
  ],
  pilotTitle: "Low-risk pilot",
  pilotPoints: [
    "Start with Spain and Portugal for 6 months, then review Brazil expansion",
    "Agree an opening order, Orliman-branded materials, and a simple clinician education pack",
    "Review orders, clinician feedback, and retail pull-through before scaling",
  ],
} as const;
