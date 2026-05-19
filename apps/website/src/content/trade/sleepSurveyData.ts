/** Patient sleep survey (walking boot after Achilles rupture). */

export const sleepSurveyTotal = 195;

export const sleepSurveySegments = [
  {
    key: "didntSleepWell",
    label: "Didn't sleep well",
    count: 74,
    description: "Reported difficulty sleeping while wearing the walking boot",
  },
  {
    key: "tookOffBoot",
    label: "Took off the boot",
    count: 51,
    description: "Removed the boot completely at night",
  },
  {
    key: "customSplint",
    label: "Used custom splint",
    count: 3,
    description: "Used another night splint instead of the boot",
  },
  {
    key: "adjustedBoot",
    label: "Adjusted the boot at night",
    count: 18,
    description: "Loosened straps or repositioned the boot while asleep",
  },
  {
    key: "sleptFine",
    label: "Slept fine",
    count: 49,
    description: "No reported sleep difficulty in the boot",
  },
] as const;

export type SleepSurveySegmentKey = (typeof sleepSurveySegments)[number]["key"];

const struggledCount = sleepSurveySegments
  .filter((s) => s.key !== "sleptFine")
  .reduce((sum, s) => sum + s.count, 0);

const adjustedOrRemovedCount =
  sleepSurveySegments.find((s) => s.key === "tookOffBoot")!.count +
  sleepSurveySegments.find((s) => s.key === "adjustedBoot")!.count;

function pct(count: number) {
  return Math.round((count / sleepSurveyTotal) * 100);
}

export const sleepSurveyHeadlineStats = {
  struggledPct: pct(struggledCount),
  adjustedOrRemovedPct: pct(adjustedOrRemovedCount),
} as const;
