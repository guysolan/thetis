import type { APIRoute } from "astro";
import countryData from "../../../components/research/incidence/data.json";

// Population data (2023 estimates from World Bank)
// Note: For regional data (e.g., Ontario, England), using regional population
const populations: Record<string, number> = {
    "Sweden": 10500000,
    "Denmark": 5900000,
    "Finland": 5500000,
    "United Kingdom": 65000000, // England only
    "Canada": 40000000, // Ontario only
    "United States": 331900000, // Full US population for NEISS data
    "South Korea": 51000000,
    "Japan": 125000000,
};

export const GET: APIRoute = async () => {
    // Calculate total cases for each country
    const totalCases = countryData
        .filter((country) =>
            country.verified && country.incidence &&
            populations[country.country]
        )
        .map((country) => {
            if (!country.incidence) return null;

            // Get the latest year's incidence
            const years = Object.keys(country.incidence)
                .filter((key) => !isNaN(Number(key)))
                .sort((a, b) => Number(b) - Number(a));

            if (years.length === 0) return null;

            const latestYear = years[0];
            const latestIncidence = Number(country.incidence[latestYear]);
            const population = populations[country.country];

            if (isNaN(latestIncidence) || !population) return null;

            // Calculate total cases: (incidence per 100k * population) / 100000
            const totalCases = Math.round(
                (latestIncidence * population) / 100000,
            );

            return {
                country: country.country,
                totalCases,
                incidence: latestIncidence,
                population: population,
            };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .sort((a, b) => b.totalCases - a.totalCases);

    return new Response(
        JSON.stringify({
            labels: totalCases.map((d) => d.country),
            values: totalCases.map((d) => d.totalCases),
            metadata: totalCases.map((d) => ({
                country: d.country,
                incidence: d.incidence,
                population: d.population,
            })),
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
};
