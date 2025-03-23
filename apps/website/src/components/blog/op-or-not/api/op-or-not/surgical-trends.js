import countryData from "../../data.json";

export async function get() {
  // Select countries with contrasting trends for better visualization
  const selectedCountries = [
    "Sweden",
    "Finland",
    "United Kingdom",
    "Japan",
    "France",
    "Germany",
    "Australia",
  ];

  // Color palette for the lines
  const colorPalette = [
    { border: "rgba(59, 130, 246, 1)", background: "rgba(59, 130, 246, 0.1)" }, // blue
    { border: "rgba(16, 185, 129, 1)", background: "rgba(16, 185, 129, 0.1)" }, // green
    { border: "rgba(245, 158, 11, 1)", background: "rgba(245, 158, 11, 0.1)" }, // amber
    { border: "rgba(236, 72, 153, 1)", background: "rgba(236, 72, 153, 0.1)" }, // pink
    { border: "rgba(139, 92, 246, 1)", background: "rgba(139, 92, 246, 0.1)" }, // purple
    { border: "rgba(6, 182, 212, 1)", background: "rgba(6, 182, 212, 0.1)" }, // cyan
    { border: "rgba(249, 115, 22, 1)", background: "rgba(249, 115, 22, 0.1)" }, // orange
  ];

  // Create dataset for each selected country
  const datasets = selectedCountries
    .map((countryName, index) => {
      const country = countryData.find((c) => c.country === countryName);
      if (!country || !country.surgical_rate) return null;

      const years = Object.keys(country.surgical_rate)
        .filter((k) => !isNaN(parseInt(k)))
        .sort((a, b) => parseInt(a) - parseInt(b));

      // Skip countries with insufficient data points
      if (years.length < 2) return null;

      const dataPoints = years.map((year) => ({
        x: parseInt(year),
        y: country.surgical_rate[year],
      }));

      return {
        label: countryName,
        data: dataPoints,
        borderColor: colorPalette[index % colorPalette.length].border,
        backgroundColor: colorPalette[index % colorPalette.length].background,
        tension: 0.2,
      };
    })
    .filter((dataset) => dataset !== null);

  return {
    body: JSON.stringify(datasets),
  };
}
