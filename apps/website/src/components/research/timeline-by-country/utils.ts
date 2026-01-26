// utils.ts
import type { Country, JourneyDataPoint, WalkingAid } from "./types";

export function getUnicodeFlagIcon(countryCode: string): string {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export function getCountryById(
    countryId: string,
    countries: Country[],
): Country | undefined {
    return countries.find((country) => country.id === countryId);
}

export function getJourneyDataForStageAndCountry(
    stageId: string,
    countryId: string,
    journeyData: JourneyDataPoint[],
): JourneyDataPoint | undefined {
    return journeyData.find(
        (data) => data.stageId === stageId && data.countryId === countryId,
    );
}

export function getWalkingAidForCountry(
    countryId: string,
    walkingAids: WalkingAid[],
): WalkingAid | undefined {
    return walkingAids.find((aid) => aid.countryId === countryId);
}

export function groupJourneyDataByProperty(
    stageId: string,
    selectedCountries: string[],
    journeyData: JourneyDataPoint[],
    property: "timing" | "equipment" | "description" | "clinicians",
): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    selectedCountries.forEach((countryId) => {
        const data = getJourneyDataForStageAndCountry(
            stageId,
            countryId,
            journeyData,
        );
        if (!data || !data[property]) return;

        const value = data[property] as string;
        if (!result[value]) {
            result[value] = [];
        }
        result[value].push(countryId);
    });

    return result;
}
