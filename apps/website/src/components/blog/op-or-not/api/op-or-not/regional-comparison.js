import countryData from "../../data.json";

export async function get() {
  // Define regions and their member countries
  const regions = {
    "Northern Europe": ["Sweden", "Denmark", "Finland"],
    "Western Europe": ["United Kingdom", "France", "Germany"],
    "Southern Europe": ["Italy"],
    "North America": ["United States", "Canada"],
    "Asia-Pacific": ["Japan", "South Korea", "Australia", "New Zealand"],
  };

  // Helper function to get the latest surgical rate
  function getLatestSurgicalRate(country) {
    if (!country.surgical_rate) return null;

    const years = Object.keys(country.surgical_rate)
      .filter((k) => !isNaN(parseInt(k)))
      .sort((a, b) => parseInt(b) - parseInt(a));

    if (years.length === 0) return null;

    return country.surgical_rate[years[0]];
  }

  // Calculate average surgical rate by region
  const regionalData = Object.entries(regions).map(([region, countryNames]) => {
    const countriesInRegion = countryData.filter((c) =>
      countryNames.includes(c.country),
    );

    const validCountries = countriesInRegion.filter(
      (c) => getLatestSurgicalRate(c) !== null,
    );

    if (validCountries.length === 0) {
      return { region, average: 0, count: 0 };
    }

    const total = validCountries.reduce(
      (sum, country) => sum + getLatestSurgicalRate(country),
      0,
    );
    const average = total / validCountries.length;

    return {
      region,
      average,
      count: validCountries.length,
      countries: countryNames.join(", "),
    };
  });

  // Sort by average surgical rate (descending)
  regionalData.sort((a, b) => b.average - a.average);

  // Format data for chart.js
  const chartData = {
    regions: regionalData.map((item) => item.region),
    values: regionalData.map((item) => item.average),
    counts: regionalData.map((item) => item.count),
    countries: regionalData.map((item) => item.countries),
  };

  return {
    body: JSON.stringify(chartData),
  };
}
