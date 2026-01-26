// types.ts
export type CountryCode = "us" | "ca" | "au" | "gb" | "de" | "fr";

export interface Country {
    id: string;
    name: string;
    flagCode: string;
}

export interface Stage {
    id: string;
    title: string;
    icon: string;
    description: string;
    timeframe: string;
}

export interface JourneyDataPoint {
    stageId: string;
    countryId: string;
    timing: string;
    clinicians: string;
    description?: string;
    equipment?: string;
}

export interface WalkingAid {
    countryId: string;
    crutches: string;
    kneeScooter: string;
    evenUp: string;
    nightSplint: string;
}

export interface TimelineComparison {
    stageId: string;
    countryId: string;
    daysToComplete: number;
}

export interface Equipment {
    countryId: string;
    boot: string;
    crutches: string;
    kneeScooter: string;
    evenUp: string;
    nightSplint: string;
}

export interface EquipmentTag {
    id: string;
    name: string;
    description: string;
    color: string; // For styling the tag
}

export interface EquipmentUsage {
    equipmentId: string;
    countryId: string;
    stageId: string;
    isCommon: boolean; // true if commonly used, false if occasionally used
}
