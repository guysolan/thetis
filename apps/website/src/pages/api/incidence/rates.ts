import type { APIRoute } from "astro";
import countryData from "../../../components/research/incidence/data.json";

export const GET: APIRoute = async () => {
    // Filter for verified countries with incidence data
    const verifiedData = countryData
        .filter((country) => country.verified && country.incidence)
        .map((country) => {
            // Get the latest year's incidence
            const years = Object.keys(country.incidence)
                .filter((key) => !isNaN(Number(key)))
                .sort((a, b) => Number(b) - Number(a));

            const latestYear = years[0];
            const latestValue = country.incidence[latestYear];

            return {
                country: country.country,
                value: latestValue,
            };
        })
        .sort((a, b) => b.value - a.value);

    return new Response(
        JSON.stringify({
            labels: verifiedData.map((d) => d.country),
            values: verifiedData.map((d) => d.value),
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
};
