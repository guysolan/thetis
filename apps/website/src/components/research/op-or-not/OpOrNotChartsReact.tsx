"use client";

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import {
  Percent,
  Users,
  Activity,
  Scissors,
  Calendar,
  BarChart as ChartIcon,
} from "lucide-react";
import countryData from "./data.json";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

// Helper function to get latest year's data
function getLatestYearData(data: Record<string, number | string>) {
  const years = Object.keys(data)
    .filter((k) => !Number.isNaN(Number(k)))
    .map(Number)
    .sort((a, b) => b - a);
  return years[0]
    ? { year: years[0], value: Number(data[years[0].toString()]) }
    : null;
}

// Helper function for linear regression and projection
function projectTo2025(years: number[], values: number[]): number {
  const n = years.length;
  const sumX = years.reduce((a, b) => a + b, 0);
  const sumY = values.reduce((a, b) => a + b, 0);
  const sumXY = years.reduce((sum, x, i) => sum + x * values[i], 0);
  const sumXX = years.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Clamp the projected value between 0 and 100
  const projectedValue = slope * 2025 + intercept;
  return Math.min(Math.max(projectedValue, 0), 100);
}

// Updated color helper with more distinct colors
const getMutedColor = (index: number) => {
  const colors = [
    "hsl(142, 50%, 45%)", // emerald
    "hsl(212, 50%, 45%)", // blue
    "hsl(332, 50%, 45%)", // pink
    "hsl(272, 50%, 45%)", // purple
    "hsl(182, 50%, 45%)", // cyan
    "hsl(32, 50%, 45%)", // orange
    "hsl(92, 50%, 45%)", // lime
    "hsl(242, 50%, 45%)", // indigo
    "hsl(2, 50%, 45%)", // red
    "hsl(152, 50%, 45%)", // teal
    "hsl(302, 50%, 45%)", // magenta
    "hsl(62, 50%, 45%)", // yellow
    "hsl(212, 50%, 45%)", // blue
  ];
  return colors[index % colors.length];
};

// Country populations (millions) - approximate for calculation
const countryPopulations: Record<string, number> = {
  Sweden: 10.4,
  Denmark: 5.9,
  Finland: 5.5,
  "United Kingdom": 67.2,
  "South Korea": 51.7,
  "New Zealand": 5.1,
  Canada: 38.2,
  France: 67.4,
  Italy: 59.1,
  Germany: 83.2,
  Japan: 125.7,
  "United States": 331.9,
  Australia: 25.7,
};

// Update scatter plot data to include both surgical and incidence totals
const scatterData = countryData
  .map((country) => {
    // Proper type casting with unknown as intermediate step
    const surgicalRate = country.surgical_rate as unknown as Record<
      string,
      number | string
    >;
    const incidence = country.incidence as unknown as Record<
      string,
      number | string
    >;

    const latestSurgical = getLatestYearData(surgicalRate);
    const latestIncidence = getLatestYearData(incidence);
    const population = countryPopulations[country.country] || 0;

    if (latestSurgical && latestIncidence) {
      const annualRuptures = latestIncidence.value * population * 10;
      const annualSurgeries = (annualRuptures * latestSurgical.value) / 100;

      return {
        name: country.country,
        incidence: latestIncidence.value,
        surgicalRate: latestSurgical.value,
        size: Math.sqrt(annualRuptures) / 3,
        annualRuptures: Math.round(annualRuptures),
        annualSurgeries: Math.round(annualSurgeries),
      };
    }
    return null;
  })
  .filter((data): data is NonNullable<typeof data> => data !== null);

// Prepare surgical trends data
const surgicalTrendsData = countryData.map((country) => {
  // Proper type casting with unknown as intermediate step
  const surgicalRate = country.surgical_rate as unknown as Record<
    string,
    number | string
  >;

  // Get only numeric years from the data
  const years = Object.keys(surgicalRate)
    .filter((k) => !Number.isNaN(Number(k)))
    .map(Number)
    .sort((a, b) => a - b);

  const values = years.map((year) => Number(surgicalRate[year.toString()]));
  const projection2025 = projectTo2025(years, values);

  // Create data points only for years that exist in the data + 2025 projection
  return {
    country: country.country,
    data: [
      ...years.map((year) => ({
        year,
        rate: Number(surgicalRate[year.toString()]),
        isActualDataPoint: true, // Flag to identify real data points from data.json
      })),
      {
        year: 2025,
        rate: projection2025,
        projected: true,
      },
    ],
  };
});

// Update the green color to be more blue-tinted
const chartGreen = "hsl(162, 46%, 75%)";

export function OpOrNotCharts() {
  return (
    <div className="space-y-4 sm:space-y-8 w-full">
      {/* Scatter Plot */}
      <div className="bg-white shadow-sm p-3 sm:p-6 border border-gray-100 rounded-lg w-full">
        <h3 className="mb-2 sm:mb-4 font-semibold text-lg">
          Surgical Rates vs Incidence
        </h3>
        <div className="w-full h-[350px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 5, bottom: 20, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="incidence"
                name="Incidence"
                label={{ value: "Incidence per 100,000", position: "bottom" }}
              />
              <YAxis
                type="number"
                dataKey="surgicalRate"
                name="Surgical Rate"
                domain={[0, 100]}
                label={{
                  value: "Surgical Rate (%)",
                  angle: -90,
                  position: "left",
                }}
              />
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.[0]?.payload) return null;
                  const data = payload[0].payload;
                  const countryCode =
                    countryData.find((c) => c.country === data.name)?.code ||
                    "";
                  return (
                    <div className="bg-white shadow-sm p-3 border border-gray-200 rounded-lg">
                      <p className="font-semibold">
                        {countryCode && (
                          <span className="mr-1">
                            {getUnicodeFlagIcon(countryCode)}
                          </span>
                        )}
                        {data.name}
                      </p>
                      <p className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Incidence: {data.incidence.toFixed(1)} per 100,000
                      </p>
                      <p className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        Surgical Rate: {data.surgicalRate.toFixed(1)}%
                      </p>
                      <p className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Annual Ruptures: {data.annualRuptures.toLocaleString()}
                      </p>
                      <p className="flex items-center gap-2">
                        <Scissors className="w-4 h-4" />
                        Annual Surgeries:{" "}
                        {data.annualSurgeries.toLocaleString()}
                      </p>
                    </div>
                  );
                }}
              />

              <Scatter
                name="Countries"
                data={scatterData}
                fill={chartGreen}
                fillOpacity={1}
              >
                {scatterData.map((entry) => (
                  <Cell key={entry.name} r={entry.size} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Surgical Trends with 2025 Projections */}
      <div className="bg-white shadow-sm p-3 sm:p-6 border border-gray-100 rounded-lg w-full">
        <h3 className="mb-2 sm:mb-4 font-semibold text-lg">
          Surgical Treatment Trends with 2025 Projections
        </h3>
        <div className="w-full h-[350px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 20, right: 5, bottom: 40, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" type="number" domain={[1990, 2025]} />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                label={{
                  value: "Surgical Rate (%)",
                  angle: -90,
                  position: "left",
                }}
              />
              <Tooltip
                content={({ payload, label }) => {
                  if (!payload?.length) return null;
                  const year = Number(label);

                  // Collect country entries that have actual data for this year
                  const validEntries = payload.filter((entry) => {
                    // Find the actual data point in the original country data
                    const countryData = surgicalTrendsData.find(
                      (c) => c.country === entry.name,
                    );
                    if (!countryData) return false;

                    // For 2025, show only projections
                    if (year === 2025) return entry.payload.projected;

                    // For other years, check if there's actual data for this year
                    const dataPoint = countryData.data.find(
                      (d) => d.year === year && "isActualDataPoint" in d,
                    );
                    return !!dataPoint;
                  });

                  // If no valid entries, show nothing
                  if (validEntries.length === 0) return null;

                  return (
                    <div className="bg-white shadow-sm p-3 border border-gray-200 rounded-lg">
                      <p className="flex items-center gap-2 font-semibold">
                        <Calendar className="w-4 h-4" />
                        Year: {label}
                      </p>
                      {validEntries.map((entry, index) => {
                        // Find the actual data point with the correct value from the original data
                        const countryData = surgicalTrendsData.find(
                          (c) => c.country === entry.name,
                        );
                        // Get the exact data point for this year
                        const dataPoint = countryData?.data.find(
                          (d) => d.year === year,
                        );
                        // Use the actual rate from the data point instead of entry.value
                        const value = dataPoint?.rate || 0;
                        const countryCode = countryData.country.code || "";

                        return (
                          <p
                            key={`${entry.name}-${index}`}
                            className="flex items-center gap-2"
                            style={{ color: entry.color }}
                          >
                            <Percent className="w-4 h-4" />
                            {countryCode && (
                              <span className="mr-1">
                                {getUnicodeFlagIcon(countryCode)}
                              </span>
                            )}
                            {entry.name}:{" "}
                            {value <= 0.1
                              ? "Negligible"
                              : `${value.toFixed(1)}%`}
                            {"projected" in (dataPoint || {}) && " (Projected)"}
                          </p>
                        );
                      })}
                    </div>
                  );
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
              {surgicalTrendsData.map((country, index) => (
                <Line
                  key={country.country}
                  data={country.data}
                  dataKey="rate"
                  name={country.country}
                  stroke={getMutedColor(index)}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-sm p-3 sm:p-6 border border-gray-100 rounded-lg w-full">
        <h3 className="mb-2 sm:mb-4 font-semibold text-lg">
          Latest Surgical Rates by Region
        </h3>
        <div className="w-full h-[350px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              margin={{ top: 20, right: 5, bottom: 60, left: 5 }}
              data={scatterData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                tickFormatter={(value) => {
                  const countryCode =
                    countryData.find((c) => c.country === value)?.code || "";
                  return countryCode
                    ? `${getUnicodeFlagIcon(countryCode)} ${value}`
                    : value;
                }}
              />
              <YAxis
                domain={[0, 100]}
                label={{
                  value: "Surgical Rate (%)",
                  angle: -90,
                  position: "left",
                }}
              />
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const data = payload[0].payload;
                  const countryCode =
                    countryData.find((c) => c.country === data.name)?.code ||
                    "";
                  return (
                    <div className="bg-white shadow-sm p-3 border border-gray-200 rounded-lg">
                      <p className="flex items-center gap-2 font-semibold">
                        <Users className="w-4 h-4" />
                        {countryCode && (
                          <span className="mr-1">
                            {getUnicodeFlagIcon(countryCode)}
                          </span>
                        )}
                        {data.name}
                      </p>
                      <p className="flex items-center gap-2">
                        <ChartIcon className="w-4 h-4" />
                        Surgical Rate: {data.surgicalRate.toFixed(1)}%
                      </p>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="surgicalRate"
                fill={chartGreen}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
