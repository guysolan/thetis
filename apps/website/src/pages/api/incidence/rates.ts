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

export const GET: APIRoute = async () => {
    // Get latest incidence for each country
    const latestRates = (countryData as unknown as CountryData[])
        .map((c) => ({
            country: c.country,
            rate: latestIncidence(c)?.value ?? 0,
        }))
        .filter((c) => c.rate > 0)
        .sort((a, b) => b.rate - a.rate);

    return new Response(
        JSON.stringify({
            labels: latestRates.map((r) => r.country),
            values: latestRates.map((r) => r.rate),
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
};
