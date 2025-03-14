// ComparisonView.tsx
import React from "react";
import type { Country, JourneyDataPoint, Stage } from "./types";
import {
  getCountryById,
  getUnicodeFlagIcon,
  groupJourneyDataByProperty,
} from "./utils";
import { equipmentTags, equipmentUsage } from "./data";
import { EquipmentTags } from "./EquipmentTags";

interface ComparisonViewProps {
  stage: Stage;
  selectedCountries: string[];
  countries: Country[];
  journeyData: JourneyDataPoint[];
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  stage,
  selectedCountries,
  countries,
  journeyData,
}) => {
  const timingGroups = groupJourneyDataByProperty(
    stage.id,
    selectedCountries,
    journeyData,
    "timing",
  );

  const equipmentGroups =
    stage.id !== "injury"
      ? groupJourneyDataByProperty(
          stage.id,
          selectedCountries,
          journeyData,
          "equipment",
        )
      : {};

  const clinicianGroups =
    stage.id !== "injury"
      ? groupJourneyDataByProperty(
          stage.id,
          selectedCountries,
          journeyData,
          "clinicians",
        )
      : {};
  const descriptionGroups =
    stage.id === "injury"
      ? groupJourneyDataByProperty(
          stage.id,
          selectedCountries,
          journeyData,
          "description",
        )
      : {};

  const ComparisonSection = ({
    title,
    icon,
    groups,
    isEquipmentSection = false,
  }: {
    title: string;
    icon: React.ReactNode;
    groups: Record<string, string[]>;
    isEquipmentSection?: boolean;
  }) => (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-primary">{icon}</span>
        <h4 className="font-semibold text-lg">{title}</h4>
      </div>
      <div className="space-y-4">
        {Object.entries(groups).map(([key, countryIds]) => (
          <div
            key={key}
            className="bg-white shadow-sm hover:shadow-md p-4 border border-gray-200 rounded-lg transition-shadow duration-200"
          >
            <p className="mb-3 text-gray-800">{key}</p>
            <div className="flex flex-wrap gap-2">
              {countryIds.map((countryId) => {
                const country = getCountryById(countryId, countries);
                return (
                  <div
                    key={countryId}
                    className={`flex items-center gap-2 ${isEquipmentSection ? "flex-col" : ""}`}
                  >
                    <div className="flex items-center gap-1.5 bg-primary/5 px-2 py-1 border border-primary/10 rounded-full text-sm">
                      <span className="text-base flag-icon">
                        {getUnicodeFlagIcon(country?.flagCode || "us")}
                      </span>
                      <span className="font-medium">{country?.name}</span>
                    </div>
                    {isEquipmentSection && (
                      <EquipmentTags countryId={countryId} stageId={stage.id} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EquipmentTags: React.FC<{ countryId: string; stageId: string }> = ({
    countryId,
    stageId,
  }) => {
    const countryEquipment = equipmentUsage.filter(
      (usage) => usage.countryId === countryId && usage.stageId === stageId,
    );

    if (countryEquipment.length === 0) return null;

    return (
      <div className="flex flex-wrap justify-center gap-1.5">
        {countryEquipment.map((usage) => {
          const equipment = equipmentTags.find(
            (e) => e.id === usage.equipmentId,
          );
          if (!equipment) return null;

          return (
            <span
              key={equipment.id}
              className={`
                inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                ${
                  usage.isCommon
                    ? "border border-primary/20"
                    : "border border-dashed border-primary/20 opacity-75"
                }
                transition-all duration-200
              `}
              style={{
                backgroundColor: `var(--color-${equipment.color}-50)`,
                color: `var(--color-${equipment.color}-900)`,
              }}
              title={`${equipment.description}${!usage.isCommon ? " (Occasionally used)" : ""}`}
            >
              {usage.isCommon ? (
                <svg
                  className="mr-1 w-2.5 h-2.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="8" />
                </svg>
              ) : (
                <svg
                  className="mr-1 w-2.5 h-2.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="6" strokeWidth="2" />
                </svg>
              )}
              {equipment.name}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <h3 className="font-bold text-xl">{stage.title}</h3>
      </div>

      {/* Timing Section */}
      {Object.keys(timingGroups).length > 0 && (
        <ComparisonSection
          title="Timeline"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
          groups={timingGroups}
        />
      )}

      {/* Equipment Section */}
      {Object.keys(equipmentGroups).length > 0 && (
        <ComparisonSection
          title="Equipment & Process"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h16" />
              <path d="M4 14h16" />
              <path d="M4 18h16" />
              <path d="M8 6h8" />
            </svg>
          }
          groups={equipmentGroups}
          isEquipmentSection={true}
        />
      )}

      {/* Clinicians Section */}
      {Object.keys(clinicianGroups).length > 0 && (
        <ComparisonSection
          title="Healthcare Providers"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          }
          groups={clinicianGroups}
        />
      )}

      {/* Description Section */}
      {Object.keys(descriptionGroups).length > 0 && (
        <ComparisonSection
          title="Details"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          }
          groups={descriptionGroups}
        />
      )}
    </div>
  );
};
