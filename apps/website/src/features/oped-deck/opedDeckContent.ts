/** Top patient-reported reasons for poor sleep in a walking boot (Thetis survey themes). */

export const OPED_DECK_BASE_PATH = "/decks/oped";


export const opedSleepDiscomfortSegments = [
  {
    key: "uncomfortable",
    label: "Uncomfortable",
    count: 88,
    description: "Hard shell, straps, and bulk make rest positions difficult",
  },
  {
    key: "hot",
    label: "Too hot",
    count: 72,
    description: "Insulated boot traps heat through the night",
  },
  {
    key: "dirty",
    label: "Dirty",
    count: 65,
    description: "Boot worn all day then taken to bed - sweat and floor debris",
  },
] as const;

export const opedSleepDiscomfortTotal = opedSleepDiscomfortSegments.reduce(
  (sum, segment) => sum + segment.count,
  0,
);

export const opedVacopedIssues = [
  {
    id: "shower",
    title: "Cannot shower",
    summary:
      "VACOped is not designed for wet environments. Patients tape bags over the leg or skip proper washing for weeks.",
    icon: "shower",
  },
  {
    id: "sleep",
    title: "Cannot sleep",
    summary:
      "Heavy, hot, and awkward in bed. Many patients remove or loosen the boot at night - risking re-rupture.",
    icon: "moon",
  },
  {
    id: "wound",
    title: "Wound never aired",
    summary:
      "Skin and dressings stay sealed inside the liner all day and night. Odour, maceration, and infection risk rise.",
    icon: "wind",
  },
] as const;

/** Annual Achilles ruptures in key OPED markets (planning estimate). */
export const opedAnnualRuptures = {
  us: 75_000,
  uk: 15_000,
  de: 20_000,
  fr: 20_000,
  au: 5_000,
  ca: 10_000,
} as const;

export const opedAnnualRupturesTotal = Object.values(opedAnnualRuptures).reduce(
  (sum, n) => sum + n,
  0,
);

export const opedCannotSleepPct = 77;

export const opedSplintSales = {
  us: 1_400,
  uk: 400,
  ca: 200,
} as const;

/** Per-market rupture + sales data for penetration slide */
export const opedMarketBreakdown = [
  { market: "United States", flag: "🇺🇸", ruptures: 75_000, sales: 1_400 },
  { market: "United Kingdom", flag: "🇬🇧", ruptures: 15_000, sales: 400 },
  { market: "Germany", flag: "🇩🇪", ruptures: 20_000, sales: 0 },
  { market: "France", flag: "🇫🇷", ruptures: 20_000, sales: 0 },
  { market: "Canada", flag: "🇨🇦", ruptures: 10_000, sales: 200 },
  { market: "Australia", flag: "🇦🇺", ruptures: 5_000, sales: 0 },
] as const;

export const opedSplintSalesTotal = Object.values(opedSplintSales).reduce(
  (sum, n) => sum + n,
  0,
);

export const opedCannotSleepAnnual = Math.round(
  opedAnnualRupturesTotal * (opedCannotSleepPct / 100),
);

export const opedUnmetSleepNeed = opedCannotSleepAnnual - opedSplintSalesTotal;

function formatDeckCount(n: number): string {
  if (n >= 1_000_000) {
    return `~${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  }
  if (n >= 10_000) {
    return `~${Math.round(n / 1_000)}k`;
  }
  return n.toLocaleString("en-GB");
}

export const opedSleepMarketCopy = {
  annualRupturesLabel: formatDeckCount(opedAnnualRupturesTotal),
  cannotSleepLabel: formatDeckCount(opedCannotSleepAnnual),
  unmetNeedLabel: formatDeckCount(opedUnmetSleepNeed),
  splintSalesLabel: opedSplintSalesTotal.toLocaleString("en-GB"),
} as const;
