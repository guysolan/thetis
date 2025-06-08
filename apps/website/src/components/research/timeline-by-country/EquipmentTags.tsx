import React from "react";
import { equipmentTags, equipmentUsage } from "./data";
import type { EquipmentTag } from "./types";

interface EquipmentTagsProps {
  countryId: string;
  stageId: string;
}

export const EquipmentTags: React.FC<EquipmentTagsProps> = ({
  countryId,
  stageId,
}) => {
  const countryEquipment = equipmentUsage.filter(
    (usage) => usage.countryId === countryId && usage.stageId === stageId,
  );

  if (countryEquipment.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {countryEquipment.map((usage) => {
        const equipment = equipmentTags.find((e) => e.id === usage.equipmentId);
        if (!equipment) return null;

        return (
          <EquipmentTag
            key={equipment.id}
            equipment={equipment}
            isCommon={usage.isCommon}
          />
        );
      })}
    </div>
  );
};

interface EquipmentTagProps {
  equipment: EquipmentTag;
  isCommon: boolean;
}

const EquipmentTag: React.FC<EquipmentTagProps> = ({ equipment, isCommon }) => {
  const baseClasses =
    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200";
  const commonClasses = "border border-primary/20";
  const rareClasses = "border border-dashed border-primary/20 opacity-75";

  return (
    <span
      className={`${baseClasses} ${isCommon ? commonClasses : rareClasses}`}
      style={{
        backgroundColor: `var(--color-${equipment.color}-50)`,
        color: `var(--color-${equipment.color}-900)`,
      }}
      title={`${equipment.description}${!isCommon ? " (Occasionally used)" : ""}`}
    >
      <span className="flex items-center gap-1">
        {isCommon ? (
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        ) : (
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
          </svg>
        )}
        {equipment.name}
      </span>
    </span>
  );
};
