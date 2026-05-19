import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@thetis/ui/chart";
import { Cell, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import type { TooltipProps } from "recharts";
import { AlertTriangle } from "lucide-react";
import {
  type SleepSurveySegmentKey,
  sleepSurveySegments,
  sleepSurveyTotal,
} from "@/content/trade/sleepSurveyData";

const segmentFills: Record<SleepSurveySegmentKey, string> = {
  didntSleepWell: "hsl(161, 42%, 72%)",
  tookOffBoot: "hsl(38, 92%, 55%)",
  adjustedBoot: "hsl(32, 95%, 45%)",
  customSplint: "hsl(161, 58%, 30%)",
  sleptFine: "hsl(220, 14%, 88%)",
};

const warnSegmentKeys = new Set<SleepSurveySegmentKey>([
  "tookOffBoot",
  "adjustedBoot",
]);

const chartConfig = {
  didntSleepWell: {
    label: "Didn't sleep well",
    color: segmentFills.didntSleepWell,
  },
  tookOffBoot: {
    label: "Took off the boot",
    color: segmentFills.tookOffBoot,
  },
  adjustedBoot: {
    label: "Adjusted the boot at night",
    color: segmentFills.adjustedBoot,
  },
  customSplint: {
    label: "Used custom splint",
    color: segmentFills.customSplint,
  },
  sleptFine: {
    label: "Slept fine",
    color: segmentFills.sleptFine,
  },
} satisfies ChartConfig;

const chartData = sleepSurveySegments.map((segment) => ({
  segment: segment.key,
  label: segment.label,
  count: segment.count,
  fill: segmentFills[segment.key],
}));

function pct(count: number) {
  return Math.round((count / sleepSurveyTotal) * 100);
}

function SleepSurveyTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];
  const segmentKey = item.payload?.segment as SleepSurveySegmentKey | undefined;
  const segment = sleepSurveySegments.find((s) => s.key === segmentKey);
  if (!segment) {
    return null;
  }

  const count = Number(item.value);
  const percentOfTotal = pct(count);

  return (
    <div className="bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-700 rounded-lg min-w-[220px] max-w-[280px] overflow-hidden">
      <div
        className="px-3 py-2 border-neutral-200 dark:border-neutral-700 border-b"
        style={{ backgroundColor: segmentFills[segment.key] }}
      >
        <p className="font-semibold text-neutral-900 text-sm leading-snug">
          {segment.label}
        </p>
      </div>
      <div className="space-y-2 px-3 py-2.5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-neutral-500">Patients</span>
          <span className="font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
            {count}{" "}
            <span className="font-normal text-neutral-500">
              of {sleepSurveyTotal}
            </span>
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-neutral-500">Share of survey</span>
          <span className="font-semibold tabular-nums text-primary">
            {percentOfTotal}%
          </span>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
          {segment.description}
        </p>
      </div>
    </div>
  );
}

function ActiveSlice(props: PieSectorDataItem) {
  const { outerRadius = 100, ...rest } = props;
  return <Sector {...rest} outerRadius={Number(outerRadius) + 6} />;
}

export default function SleepSurveyDonutChart() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-[360px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[240px] [&_.recharts-responsive-container]:!h-[240px]"
        >
          <PieChart>
            <ChartTooltip
              content={<SleepSurveyTooltip />}
              cursor={false}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="segment"
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={96}
              paddingAngle={2}
              strokeWidth={2}
              stroke="#ffffff"
              activeShape={ActiveSlice}
            >
              {chartData.map((entry) => (
                <Cell key={entry.segment} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        <ul className="gap-x-4 gap-y-2 grid grid-cols-2 mt-4 px-1 text-xs">
          {sleepSurveySegments.map((segment) => {
            const isWarn = warnSegmentKeys.has(segment.key);
            return (
              <li key={segment.key} className="flex items-start gap-2">
                {isWarn
                  ? (
                    <AlertTriangle
                      className="mt-0.5 w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0"
                      aria-hidden
                    />
                  )
                  : (
                    <span
                      className="mt-1 rounded-sm w-2.5 h-2.5 shrink-0"
                      style={{ backgroundColor: segmentFills[segment.key] }}
                      aria-hidden
                    />
                  )}
                <span
                  className={isWarn
                    ? "text-amber-900/90 dark:text-amber-100/90 leading-snug"
                    : "text-neutral-700 dark:text-neutral-300 leading-snug"}
                >
                  <span
                    className={isWarn
                      ? "font-medium text-amber-800 dark:text-amber-300"
                      : "font-medium text-neutral-900 dark:text-neutral-100"}
                  >
                    {segment.label}
                  </span>
                  <span
                    className={isWarn
                      ? "text-amber-700/80 dark:text-amber-400/80"
                      : "text-neutral-500"}
                  >
                    {" "}
                    · {segment.count} ({pct(segment.count)}%)
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
