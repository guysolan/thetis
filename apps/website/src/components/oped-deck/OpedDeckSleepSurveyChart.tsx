"use client";

import { useEffect, useRef, useState } from "react";
import SleepSurveyDonutChart from "@/components/trade/SleepSurveyDonutChart";
import { opedCannotSleepPct } from "@/features/oped-deck/opedDeckContent";
import { sleepSurveyTotal } from "@/content/trade/sleepSurveyData";

function isPanelVisible(element: HTMLElement | null) {
  const panel = element?.closest("[data-oped-slide]");
  return Boolean(panel && !panel.hasAttribute("hidden"));
}

export default function OpedDeckSleepSurveyChart() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setReady(isPanelVisible(hostRef.current));
    };

    sync();

    window.addEventListener("oped-deck-slide-change", sync);
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("oped-deck-slide-change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <div ref={hostRef} className="flex justify-center w-full min-h-[280px]">
      {ready ? (
        <div className="flex flex-col items-center w-full">
          <SleepSurveyDonutChart
            centerLabel={{
              value: `${opedCannotSleepPct}%`,
              subtitle: "can't sleep",
            }}
            hideLegend
          />
          <p className="mt-2 text-neutral-500 text-xs text-center">
            Patient survey · n={sleepSurveyTotal}
          </p>
        </div>
      ) : (
        <div
          className="w-full max-w-[360px] h-[280px] bg-neutral-100/80 dark:bg-neutral-800/40 rounded-xl animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
