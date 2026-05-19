/**
 * Yearly average incidence across verified national registry data.
 * Same methodology as apps/achilles-rupture/.../Incidence.tsx (mean per year + linear interpolation).
 */
import countryData from "@/components/research/incidence/data.json";

type CountryRecord = {
  country: string;
  verified?: boolean;
  source?: string;
  incidence?: Record<string, number | string>;
};

export type IncidenceCountryPoint = {
  country: string;
  incidence: number;
  source: string;
};

export type IncidenceTrendYear = {
  year: number;
  avgIncidence: number | null;
  globalCasesMillion: number | null;
  countries: IncidenceCountryPoint[];
  interpolated: boolean;
  hasObservedData: boolean;
};

const registryCountries = (countryData as CountryRecord[]).filter(
  (c) => c.verified && c.incidence,
);

function buildIncidenceTrendSeries(): IncidenceTrendYear[] {
  const dataPoints: {
    year: number;
    incidence: number;
    country: string;
    source: string;
  }[] = [];
  const yearsSet = new Set<number>();

  registryCountries.forEach((country) => {
    const source = country.source || "Source not specified";
    Object.entries(country.incidence!).forEach(([year, incidence]) => {
      if (Number.isNaN(Number(year))) return;
      const numYear = Number(year);
      yearsSet.add(numYear);
      dataPoints.push({
        year: numYear,
        incidence: Number(incidence),
        country: country.country,
        source,
      });
    });
  });

  if (yearsSet.size === 0) return [];

  const years = Array.from(yearsSet);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const allYears = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  type YearBucket = {
    totalIncidence: number;
    count: number;
    countries: IncidenceCountryPoint[];
    hasObservedData: boolean;
    interpolated?: boolean;
  };

  const byYear: Record<number, YearBucket> = {};
  allYears.forEach((year) => {
    byYear[year] = {
      totalIncidence: 0,
      count: 0,
      countries: [],
      hasObservedData: false,
    };
  });

  dataPoints.forEach((item) => {
    byYear[item.year].totalIncidence += item.incidence;
    byYear[item.year].count += 1;
    byYear[item.year].countries.push({
      country: item.country,
      incidence: item.incidence,
      source: item.source,
    });
    byYear[item.year].hasObservedData = true;
  });

  allYears.forEach((year) => {
    if (!byYear[year].hasObservedData) {
      let prevYear = year - 1;
      let nextYear = year + 1;

      while (prevYear >= minYear && !byYear[prevYear].hasObservedData) prevYear--;
      while (nextYear <= maxYear && !byYear[nextYear].hasObservedData) nextYear++;

      if (prevYear >= minYear && nextYear <= maxYear) {
        const prevAvg = byYear[prevYear].totalIncidence / byYear[prevYear].count;
        const nextAvg = byYear[nextYear].totalIncidence / byYear[nextYear].count;
        const ratio = (year - prevYear) / (nextYear - prevYear);
        byYear[year].totalIncidence = prevAvg + ratio * (nextAvg - prevAvg);
        byYear[year].count = 1;
        byYear[year].interpolated = true;
      }
    }
  });

  return allYears.map((year) => {
    const yearData = byYear[year];
    const avgIncidence =
      yearData.count > 0
        ? parseFloat((yearData.totalIncidence / yearData.count).toFixed(1))
        : null;

    const estimatedPopulationBn = 5.6 + (year - 1994) * 0.08;
    const globalCasesMillion =
      avgIncidence != null
        ? parseFloat(
            ((avgIncidence * estimatedPopulationBn * 10_000) / 1_000_000).toFixed(2),
          )
        : null;

    return {
      year,
      avgIncidence,
      globalCasesMillion,
      countries: yearData.countries,
      interpolated: yearData.interpolated ?? false,
      hasObservedData: yearData.hasObservedData,
    };
  });
}

export const incidenceTrendChartData = buildIncidenceTrendSeries();

/** Trade chart display range (avoids sparse early years with heavy interpolation). */
export const TRADE_INCIDENCE_CHART_START_YEAR = 1997;

function smoothMovingAverage(values: number[], windowSize = 5): number[] {
  const half = Math.floor(windowSize / 2);
  return values.map((_, index) => {
    const start = Math.max(0, index - half);
    const end = Math.min(values.length, index + half + 1);
    const slice = values.slice(start, end);
    const mean = slice.reduce((sum, value) => sum + value, 0) / slice.length;
    return parseFloat(mean.toFixed(1));
  });
}

export type TradeIncidenceChartPoint = IncidenceTrendYear & {
  trendIncidence: number;
};

export const tradeIncidenceChartData: TradeIncidenceChartPoint[] = (() => {
  const filtered = incidenceTrendChartData.filter(
    (d) => d.year >= TRADE_INCIDENCE_CHART_START_YEAR && d.avgIncidence != null,
  ) as (IncidenceTrendYear & { avgIncidence: number })[];
  const smoothed = smoothMovingAverage(
    filtered.map((d) => d.avgIncidence),
    5,
  );
  return filtered.map((d, index) => ({
    ...d,
    trendIncidence: smoothed[index],
  }));
})();

const observedYears = incidenceTrendChartData.filter(
  (d) => d.avgIncidence != null && d.hasObservedData,
);
const firstObserved = observedYears[0];
const lastObserved = observedYears[observedYears.length - 1];

const seriesWithAvg = incidenceTrendChartData.filter((d) => d.avgIncidence != null);
const minAvgYear = seriesWithAvg.reduce(
  (min, d) => (d.avgIncidence! < min.avgIncidence! ? d : min),
  seriesWithAvg[0],
);
const maxAvgYear = seriesWithAvg.reduce(
  (max, d) => (d.avgIncidence! > max.avgIncidence! ? d : max),
  seriesWithAvg[0],
);

export const incidenceTrendSummary = {
  countryCount: registryCountries.length,
  yearRange: {
    start: TRADE_INCIDENCE_CHART_START_YEAR,
    end: tradeIncidenceChartData[tradeIncidenceChartData.length - 1]?.year ?? 2021,
  },
  observedStart: firstObserved
    ? { year: firstObserved.year, rate: firstObserved.avgIncidence! }
    : null,
  observedEnd: lastObserved
    ? { year: lastObserved.year, rate: lastObserved.avgIncidence! }
    : null,
  pooledLow: { year: minAvgYear?.year ?? 1995, rate: minAvgYear?.avgIncidence ?? 8 },
  pooledHigh: { year: maxAvgYear?.year ?? 2021, rate: maxAvgYear?.avgIncidence ?? 41.7 },
} as const;
