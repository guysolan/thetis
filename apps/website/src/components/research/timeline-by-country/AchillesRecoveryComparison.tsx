// AchillesRecoveryComparison.tsx
import React, { useState, useEffect } from "react";
import { CountrySelector } from "./CountrySelector";
import { TimelineStage } from "./TimelineStage";
import {
  countries,
  stages,
  journeyData,
  insights,
  potentialInaccuracies,
} from "./data";
import { EquipmentComparison } from "./EquipmentComparison";

export const AchillesRecoveryComparison: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["usa"]);

  // Add debugging for state changes
  useEffect(() => {
    console.log("Selected countries updated:", selectedCountries);
  }, [selectedCountries]);

  const handleCountrySelection = (countries: string[]) => {
    console.log("Selection handler called with:", countries);
    setSelectedCountries(countries);
  };

  return (
    <div>
      <h1 className="mb-6 font-bold text-3xl md:text-4xl">
        Achilles Rupture Recovery Around the World
      </h1>
      <p className="mb-8 text-lg">
        This visual guide compares the typical Achilles tendon rupture recovery
        journey across six countries, highlighting differences in treatment
        approaches, timelines, and equipment used.
      </p>

      {/* Country selector */}
      <CountrySelector
        countries={countries}
        selectedCountries={selectedCountries}
        onSelectionChange={handleCountrySelection}
      />

      {/* Timeline visualization */}
      <div className="relative mb-12">
        {/* Timeline line */}
        <div className="top-0 bottom-0 left-4 md:left-1/2 absolute bg-gray-300 w-0.5" />

        {/* Timeline stages */}
        <div className="space-y-12">
          {stages.map((stage, index) => (
            <TimelineStage
              key={stage.id}
              stage={stage}
              index={index}
              selectedCountries={selectedCountries}
              countries={countries}
              journeyData={journeyData}
            />
          ))}
        </div>
      </div>

      {/* Walking aids comparison */}
      <EquipmentComparison
        selectedCountries={selectedCountries}
        countries={countries}
      />

      {/* Key insights and potential inaccuracies */}
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-12">
        <div>
          <h2 className="mb-4 font-bold text-2xl">Key Insights</h2>
          <ul className="space-y-4">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-bold text-2xl">Potential Inaccuracies</h2>
          <ul className="space-y-4">
            {potentialInaccuracies.map((inaccuracy, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 text-amber-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </span>
                <span>{inaccuracy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
