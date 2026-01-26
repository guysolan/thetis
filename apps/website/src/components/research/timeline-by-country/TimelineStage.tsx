// TimelineStage.tsx
import React from "react";
import type { Country, JourneyDataPoint, Stage } from "./types";
import { SingleCountryView } from "./SingleCountryView";
import { ComparisonView } from "./ComparisonView";

interface TimelineStageProps {
  stage: Stage;
  index: number;
  selectedCountries: string[];
  countries: Country[];
  journeyData: JourneyDataPoint[];
}

export const TimelineStage: React.FC<TimelineStageProps> = ({
  stage,
  index,
  selectedCountries,
  countries,
  journeyData,
}) => {
  return (
    <div className="relative">
      {/* Timeline node */}
      <div className="left-4 md:left-1/2 absolute flex justify-center items-center bg-primary -ml-4 rounded-full w-8 h-8 text-white">
        {index + 1}
      </div>

      <div className="items-center md:gap-8 md:grid md:grid-cols-2 ml-12 md:ml-0">
        {/* Stage info (left side on desktop) */}
        <div
          className={`mb-4 md:mb-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"}`}
        >
          <h3 className="font-semibold text-primary text-xl">{stage.title}</h3>
          <p className="text-gray-600">{stage.description}</p>
          <span className="inline-block bg-gray-100 mt-1 px-3 py-1 rounded-full font-medium text-sm">
            {stage.timeframe}
          </span>
        </div>

        {/* Country-specific data (right side on desktop) */}
        <div
          className={`${index % 2 === 0 ? "md:order-2 md:pl-12" : "md:pr-12"}`}
        >
          {selectedCountries.length === 1 ? (
            // Single country view
            <SingleCountryView
              stage={stage}
              country={countries.find((c) => c.id === selectedCountries[0])!}
              journeyData={journeyData}
            />
          ) : (
            // Multi-country comparison view
            <ComparisonView
              stage={stage}
              selectedCountries={selectedCountries}
              countries={countries}
              journeyData={journeyData}
            />
          )}
        </div>
      </div>
    </div>
  );
};
