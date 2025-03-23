import countryData from "../../../components/blog/op-or-not/data.json";

export async function get() {
  // Filter out countries with no surgical rate data
  const countriesWithRate = countryData.filter((country) => {
    const years = Object.keys(country.surgical_rate || {})
      .filter((k) => !isNaN(parseInt(k)))
      .sort((a, b) => parseInt(b) - parseInt(a));

    return years.length > 0;
  });

  // Get latest surgical rate for each country
  const latestRates = countriesWithRate.map((country) => {
    const years = Object.keys(country.surgical_rate)
      .filter((k) => !isNaN(parseInt(k)))
      .sort((a, b) => parseInt(b) - parseInt(a));

    const latestYear = years[0];

    return {
      country: country.country,
      code: country.code,
      rate: country.surgical_rate[latestYear],
      year: latestYear,
    };
  });

  // Sort by surgical rate (descending)
  latestRates.sort((a, b) => b.rate - a.rate);

  // Format data for chart.js
  const chartData = {
    labels: latestRates.map((item) => item.country),
    values: latestRates.map((item) => item.rate),
    years: latestRates.map((item) => item.year),
  };

  return {
    body: JSON.stringify(chartData),
  };
}
