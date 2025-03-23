import countryData from "../../data.json";

export async function get() {
  // Helper function to get the latest surgical rate
  function getLatestSurgicalRate(country) {
    if (!country.surgical_rate) return null;

    const years = Object.keys(country.surgical_rate)
      .filter((k) => !isNaN(parseInt(k)))
      .sort((a, b) => parseInt(b) - parseInt(a));

    if (years.length === 0) return null;

    return country.surgical_rate[years[0]];
  }

  // Helper function to get the latest incidence
  function getLatestIncidence(country) {
    if (!country.incidence) return null;

    const years = Object.keys(country.incidence)
      .filter((k) => !isNaN(parseInt(k)))
      .sort((a, b) => parseInt(b) - parseInt(a));

    if (years.length === 0) return null;

    return country.incidence[years[0]];
  }

  // Color palette for the scatter points
  const colorPalette = [
    "rgba(59, 130, 246, 0.7)", // blue
    "rgba(16, 185, 129, 0.7)", // green
    "rgba(245, 158, 11, 0.7)", // amber
    "rgba(236, 72, 153, 0.7)", // pink
    "rgba(139, 92, 246, 0.7)", // purple
    "rgba(6, 182, 212, 0.7)", // cyan
    "rgba(249, 115, 22, 0.7)", // orange
    "rgba(124, 58, 237, 0.7)", // violet
    "rgba(239, 68, 68, 0.7)", // red
    "rgba(52, 211, 153, 0.7)", // emerald
    "rgba(234, 179, 8, 0.7)", // yellow
    "rgba(168, 85, 247, 0.7)", // purple
  ];

  // Create dataset for each country with valid data
  const datasets = countryData
    .filter(
      (country) =>
        getLatestSurgicalRate(country) !== null &&
        getLatestIncidence(country) !== null,
    )
    .map((country, index) => {
      const surgicalRate = getLatestSurgicalRate(country);
      const incidence = getLatestIncidence(country);

      return {
        label: country.country,
        data: [{ x: incidence, y: surgicalRate }],
        backgroundColor: colorPalette[index % colorPalette.length],
      };
    });

  return {
    body: JSON.stringify(datasets),
  };
}
