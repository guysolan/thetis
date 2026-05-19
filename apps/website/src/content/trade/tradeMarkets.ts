/**
 * B2B target markets: incidence and population-based annual cases.
 * Population ≈ recent national totals (millions); annual ruptures = pop × incidence / 100,000.
 */

export type TradeMarketRow = {
  id: string;
  region: string;
  /** Display string e.g. "~35" or "~18–20" */
  incidenceLabel: string;
  /** Midpoint per 100k for annual-case estimate */
  incidencePer100k: number;
  population: number;
};

/** ~50% gross margin vs local RRP on standard distributor terms (volume-dependent). */
export const tradeDistributorMarginPct = 50;

export function estimateAnnualRuptures(
  population: number,
  incidencePer100k: number,
): number {
  return Math.round((population * incidencePer100k) / 100_000);
}

export function formatAnnualRuptures(count: number): string {
  if (count >= 10_000) {
    return `~${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return `~${count.toLocaleString("en-GB")}`;
}

export const tradeTargetMarkets: TradeMarketRow[] = [
  {
    id: "nordics",
    region: "Nordics (SE, DK, FI)",
    incidenceLabel: "~35",
    incidencePer100k: 35,
    population: 22_000_000,
  },
  {
    id: "de",
    region: "Germany",
    incidenceLabel: "~25",
    incidencePer100k: 25,
    population: 84_000_000,
  },
  {
    id: "fr",
    region: "France",
    incidenceLabel: "~21",
    incidencePer100k: 21,
    population: 68_000_000,
  },
  {
    id: "es",
    region: "Spain",
    incidenceLabel: "~19",
    incidencePer100k: 19,
    population: 48_000_000,
  },
  {
    id: "it",
    region: "Italy",
    incidenceLabel: "~20",
    incidencePer100k: 20,
    population: 59_000_000,
  },
  {
    id: "pl",
    region: "Poland",
    incidenceLabel: "~16",
    incidencePer100k: 16.5,
    population: 38_000_000,
  },
];
