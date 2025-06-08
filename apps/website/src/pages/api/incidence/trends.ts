import type { APIRoute } from "astro";
import countryData from "../../../components/research/incidence/data.json";
import type { CountryData } from "../../../components/research/incidence/types";

// Helper: get all years from incidence data
const getAllYears = (data: CountryData[]) => {
    const years = new Set<number>();
    data.forEach((country) => {
        if (country.incidence) {
            Object.keys(country.incidence)
                .filter((y) => !Number.isNaN(parseInt(y)))
                .forEach((y) => years.add(parseInt(y)));
        }
    });
    return Array.from(years).sort((a, b) => a - b);
};

// Helper: get incidence data for a country
const getCountryData = (country: CountryData) => {
    if (!country.incidence) return null;
    const years = Object.keys(country.incidence)
        .filter((y) => !Number.isNaN(parseInt(y)))
        .sort((a, b) => parseInt(a) - parseInt(b));
    if (!years.length) return null;

    return {
        label: country.country,
        data: years.map((year) => ({
            x: parseInt(year),
            y: Number(country.incidence[year]),
        })),
        borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
        fill: false,
        tension: 0.4,
    };
};

export const GET: APIRoute = async () => {
    // Get all years from the data
    const years = getAllYears(countryData as unknown as CountryData[]);

    // Get data for each country
    const datasets = (countryData as unknown as CountryData[])
        .map(getCountryData)
        .filter(Boolean);

    return new Response(JSON.stringify(datasets), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
