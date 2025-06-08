import type { APIRoute } from "astro";
import countryData from "../../../components/research/incidence/data.json";
import type { CountryData } from "../../../components/research/incidence/types";

// Helper: find the latest numeric incidence value for a country
const latestIncidence = (c: CountryData) => {
    if (!c.incidence) return null;
    const years = Object.keys(c.incidence)
        .filter((y) => !Number.isNaN(parseInt(y)))
        .sort((a, b) => parseInt(b) - parseInt(a));
    return years.length
        ? { year: years[0], value: Number(c.incidence[years[0]]) }
        : null;
};

// Population data in millions (2023 estimates)
const populations: Record<string, number> = {
    "United States": 339.996,
    "Canada": 38.25,
    "United Kingdom": 67.33,
    "Germany": 83.2,
    "France": 68.07,
    "Italy": 58.85,
    "Spain": 47.39,
    "Netherlands": 17.62,
    "Sweden": 10.42,
    "Denmark": 5.9,
    "Norway": 5.48,
    "Finland": 5.55,
    "Australia": 26.44,
    "New Zealand": 5.22,
    "Japan": 123.29,
    "South Korea": 51.74,
    "China": 1411.75,
    "India": 1425.78,
    "Singapore": 5.92,
    "Taiwan": 23.35,
};

export const GET: APIRoute = async ({ request }) => {
    // Get countries with valid incidence data
    const countriesWithData = (countryData as unknown as CountryData[])
        .map((c) => ({
            country: c.country,
            latest: latestIncidence(c),
        }))
        .filter((c) => c.latest !== null);

    // Calculate total cases for each country
    const totals = countriesWithData.map((c) => {
        const population = populations[c.country] * 1000000; // Convert to actual population
        const incidence = c.latest!.value;
        const totalCases = Math.round((incidence * population) / 100000); // Calculate total cases
        return {
            country: c.country,
            total: totalCases,
        };
    });

    // Sort by total cases (descending)
    totals.sort((a, b) => b.total - a.total);

    return new Response(
        JSON.stringify({
            labels: totals.map((t) => t.country),
            values: totals.map((t) => t.total),
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
};
