import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@thetis/ui/chart";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import {
  tradeIncidenceChartData,
  incidenceTrendSummary,
  type TradeIncidenceChartPoint,
} from "@/content/trade/incidenceAverages";

const chartConfig = {
  avgIncidence: {
    label: "Yearly average",
    color: "hsl(161, 55%, 38%)",
  },
  trendIncidence: {
    label: "Smoothed trend",
    color: "hsl(161, 55%, 38%)",
  },
} satisfies ChartConfig;

const { pooledLow, pooledHigh, countryCount, yearRange } = incidenceTrendSummary;
const pointColor = "hsl(161, 55%, 38%)";

function IncidencePointShape(props: {
  cx?: number;
  cy?: number;
  payload?: TradeIncidenceChartPoint;
}) {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;

  if (payload.interpolated) {
    const size = 4;
    return (
      <g transform={`translate(${cx},${cy})`} aria-hidden>
        <line
          x1={-size}
          y1={-size}
          x2={size}
          y2={size}
          stroke={pointColor}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1={-size}
          y1={size}
          x2={size}
          y2={-size}
          stroke={pointColor}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </g>
    );
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill={pointColor}
      stroke="#fff"
      strokeWidth={1.5}
    />
  );
}

function IncidenceGrowthTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) {
    return null;
  }

  const yearData = payload[0].payload as TradeIncidenceChartPoint;
  const rate = yearData.avgIncidence;

  return (
    <div className="bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-700 rounded-lg min-w-[220px] max-w-[300px] overflow-hidden">
      <div className="bg-primary/10 px-3 py-2 border-neutral-200 dark:border-neutral-700 border-b">
        <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
          {yearData.year}
        </p>
        {yearData.interpolated ? (
          <p className="text-neutral-500 text-xs italic">Interpolated between registry years</p>
        ) : (
          <p className="text-neutral-500 text-xs">Registry year</p>
        )}
      </div>
      <div className="space-y-2 px-3 py-2.5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-neutral-500">Yearly average</span>
          <span className="font-semibold tabular-nums text-primary">
            {rate} <span className="font-normal text-neutral-500">/ 100k</span>
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-neutral-500">Smoothed trend</span>
          <span className="font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
            {yearData.trendIncidence}{" "}
            <span className="font-normal text-neutral-500">/ 100k</span>
          </span>
        </div>
        {yearData.globalCasesMillion != null ? (
          <div className="flex justify-between gap-4">
            <span className="text-neutral-500">Est. global cases</span>
            <span className="font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
              {yearData.globalCasesMillion}M
            </span>
          </div>
        ) : null}
        {yearData.countries.length > 0 ? (
          <div>
            <p className="mb-1 font-medium text-neutral-700 dark:text-neutral-300 text-xs">
              Registry data ({yearData.countries.length}{" "}
              {yearData.countries.length === 1 ? "country" : "countries"})
            </p>
            <ul className="space-y-0.5 max-h-24 overflow-y-auto text-neutral-600 dark:text-neutral-400 text-xs leading-snug">
              {yearData.countries.map((c) => (
                <li key={c.country}>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {c.country}:
                  </span>{" "}
                  {c.incidence} / 100k
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function TradeIncidenceGrowthChart() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="bg-white dark:bg-neutral-900 p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 rounded-xl w-full max-w-2xl">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[260px] sm:h-[300px] [&_.recharts-responsive-container]:!h-[260px] sm:[&_.recharts-responsive-container]:!h-[300px]"
        >
          <ComposedChart
            data={tradeIncidenceChartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200/80" />
            <XAxis
              dataKey="year"
              type="number"
              domain={[yearRange.start, yearRange.end]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickMargin={8}
              ticks={[1997, 2000, 2010, yearRange.end]}
              allowDecimals={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickMargin={4}
              width={36}
              domain={[0, "auto"]}
              tickFormatter={(v) => `${v}`}
            />
            <ChartTooltip content={<IncidenceGrowthTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey="trendIncidence"
              name="Smoothed trend"
              stroke="hsl(161, 55%, 38%)"
              strokeWidth={2.5}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
            <Scatter
              dataKey="avgIncidence"
              name="Yearly average"
              fill={pointColor}
              shape={(props) => (
                <IncidencePointShape
                  cx={props.cx}
                  cy={props.cy}
                  payload={props.payload as TradeIncidenceChartPoint}
                />
              )}
            />
          </ComposedChart>
        </ChartContainer>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-neutral-500 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block bg-primary rounded-full w-2 h-2"
              aria-hidden
            />
            Registry year
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative inline-block w-2.5 h-2.5" aria-hidden>
              <span className="top-1/2 left-0 absolute bg-primary w-full h-0.5 -translate-y-1/2 rotate-45" />
              <span className="top-1/2 left-0 absolute bg-primary w-full h-0.5 -translate-y-1/2 -rotate-45" />
            </span>
            Interpolated
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block bg-primary w-5 h-0.5" aria-hidden />
            5-year smoothed trend
          </span>
        </div>

        <div className="gap-3 grid sm:grid-cols-3 mt-4 pt-4 border-neutral-200 dark:border-neutral-700 border-t text-center sm:text-left">
          <div>
            <p className="font-semibold text-primary text-lg tabular-nums">
              {pooledLow.rate} → {pooledHigh.rate}
            </p>
            <p className="text-neutral-500 text-xs">per 100,000 (pooled average)</p>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg tabular-nums">
              {yearRange.start}–{yearRange.end}
            </p>
            <p className="text-neutral-500 text-xs">published registry span</p>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg tabular-nums">
              {countryCount}
            </p>
            <p className="text-neutral-500 text-xs">countries in analysis</p>
          </div>
        </div>
      </div>

      <p className="mt-3 px-2 max-w-2xl text-neutral-500 text-xs text-center leading-relaxed">
        Yearly pooled incidence (dots and ×) from verified national registries from{" "}
        {yearRange.start}; × marks interpolated years. Trend line is a 5-year moving average.
      </p>
    </div>
  );
}
