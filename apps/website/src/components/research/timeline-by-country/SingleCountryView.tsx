// SingleCountryView.tsx
import React from "react";
import type { Country, JourneyDataPoint, Stage } from "./types";
import { getJourneyDataForStageAndCountry, getUnicodeFlagIcon } from "./utils";
import { equipmentTags, equipmentUsage } from "./data";
import { EquipmentTags } from "./EquipmentTags";

interface SingleCountryViewProps {
  stage: Stage;
  country: Country;
  journeyData: JourneyDataPoint[];
}

export const SingleCountryView: React.FC<SingleCountryViewProps> = ({
  stage,
  country,
  journeyData,
}) => {
  const data = getJourneyDataForStageAndCountry(
    stage.id,
    country.id,
    journeyData,
  );

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="flag-icon">
          {getUnicodeFlagIcon(country.flagCode)}
        </span>
        <h4 className="font-medium">{country.name}</h4>
      </div>

      <div>
        <p className="font-medium text-primary">Timing:</p>
        <p className="mb-2">{data.timing}</p>

        {data.equipment && (
          <>
            <p className="font-medium text-primary">Equipment/Process:</p>
            <p className="mb-2">{data.equipment}</p>
            <EquipmentTags countryId={country.id} stageId={stage.id} />
          </>
        )}

        {data.description && (
          <>
            <p className="font-medium text-primary">Description:</p>
            <p>{data.description}</p>
          </>
        )}
      </div>
    </div>
  );
};
