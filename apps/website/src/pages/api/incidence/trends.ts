import type { APIRoute } from "astro";
import countryData from "../../../components/research/incidence/data.json";

export const GET: APIRoute = async () => {
    // Filter for verified countries with multiple years of incidence data
    const trendData = countryData
        .filter((country) => country.verified && country.incidence)
        .map((country) => {
            // Get all years and their incidence values
            const dataPoints = Object.entries(country.incidence)
                .filter(([key]) => !isNaN(Number(key)))
                .map(([year, value]) => ({
                    x: Number(year),
                    y: Number(value),
                }))
                .sort((a, b) => a.x - b.x);

            return {
                label: country.country,
                data: dataPoints,
            };
        })
        .filter((country) => country.data.length > 1); // Only include countries with multiple data points

    return new Response(
        JSON.stringify(trendData),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
};
