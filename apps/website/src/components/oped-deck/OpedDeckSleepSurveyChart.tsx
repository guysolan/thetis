"use client";

import { useEffect, useRef, useState } from "react";
import SleepSurveyDonutChart from "@/components/trade/SleepSurveyDonutChart";
import { opedCannotSleepPct } from "@/features/oped-deck/opedDeckContent";

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
    <div ref={hostRef} className="flex justify-center w-full min-h-[320px]">
      {ready
        ? (
          <div className="flex flex-col items-center w-full">
            <SleepSurveyDonutChart
              centerLabel={{
                value: `${opedCannotSleepPct}%`,
                subtitle: "can't sleep",
              }}
              legendVariant="prominent"
              legendPosition="side"
            />
          </div>
        )
        : (
          <div
            className="bg-neutral-100/80 dark:bg-neutral-800/40 rounded-xl w-full max-w-3xl h-[320px] animate-pulse"
            aria-hidden="true"
          />
        )}
    </div>
  );
}
