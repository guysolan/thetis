import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@thetis/ui/accordion";
import incidenceAndSurgeryData from "../../../data/incidence-and-surgery.json";

import isMobile from "ismobilejs";

// Simplified placeholder component to show when chart fails to render
const PlaceholderChart = () => (
  <div className="flex flex-col justify-center items-center bg-gray-50 p-4 border border-gray-200 rounded h-[300px]">
    <div className="font-medium text-gray-500 text-lg text-center">
      Chart data visualization
    </div>
    <p className="mt-2 text-gray-400 text-sm text-center">
      View interactive data on rising Achilles rupture incidence (1994-2021)
    </p>
    <div className="mt-4 text-blue-500 text-sm text-center">
      Average incidence increased from 8 to 41.7 per 100,000 people
    </div>
  </div>
);

// Create a mapping of countries to their sources
const countrySourceMap = incidenceAndSurgeryData.reduce((map, country) => {
  map[country.country] = country.source || "Source not specified";
  return map;
}, {});

const processData = () => {
  try {
    // Extract data points from the JSON
    const dataPoints = [];
    const yearsSet = new Set();

    incidenceAndSurgeryData.forEach((country) => {
      const countryName = country.country;
      const incidenceData = country.incidence;
      const source = country.source || "Source not specified";

      if (!incidenceData) return;

      Object.entries(incidenceData).forEach(([year, incidence]) => {
        if (isNaN(Number(year))) return; // Skip non-numeric years

        const numYear = Number(year);
        yearsSet.add(numYear);

        dataPoints.push({
          year: numYear,
          incidence: Number(incidence),
          country: countryName,
          source,
        });
      });
    });

    // Create all years from min to max
    const years = Array.from(yearsSet);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const allYears = Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => minYear + i,
    );

    // Group by year and calculate average
    const byYear = {};

    // Initialize all years with empty data
    allYears.forEach((year) => {
      byYear[year] = {
        totalIncidence: 0,
        count: 0,
        countries: [],
        hasData: false,
      };
    });

    // Fill in existing data
    dataPoints.forEach((item) => {
      byYear[item.year].totalIncidence += item.incidence;
      byYear[item.year].count += 1;
      byYear[item.year].countries.push({
        country: item.country,
        incidence: item.incidence,
        source: item.source,
      });
      byYear[item.year].hasData = true;
    });

    // Interpolate missing years
    allYears.forEach((year) => {
      if (!byYear[year].hasData) {
        // Find closest years with data before and after
        let prevYear = year - 1;
        let nextYear = year + 1;

        while (prevYear >= minYear && !byYear[prevYear].hasData) {
          prevYear--;
        }

        while (nextYear <= maxYear && !byYear[nextYear].hasData) {
          nextYear++;
        }

        // Simple linear interpolation if we have data on both sides
        if (prevYear >= minYear && nextYear <= maxYear) {
          const prevAvg = byYear[prevYear].totalIncidence /
            byYear[prevYear].count;
          const nextAvg = byYear[nextYear].totalIncidence /
            byYear[nextYear].count;
          const ratio = (year - prevYear) / (nextYear - prevYear);
          const interpolated = prevAvg + ratio * (nextAvg - prevAvg);

          byYear[year].totalIncidence = interpolated;
          byYear[year].count = 1;
          byYear[year].interpolated = true;
        }
      }
    });

    // Convert to chart data format
    return allYears.map((year) => {
      const yearData = byYear[year];
      const avgIncidence = yearData.count > 0
        ? parseFloat((yearData.totalIncidence / yearData.count).toFixed(1))
        : null;

      // Estimate world population for this year (in billions)
      const estimatedPopulation = 5.6 + (year - 1994) * 0.08; // Rough approximation

      // Calculate global cases in millions
      const globalCases = avgIncidence
        ? (avgIncidence * estimatedPopulation * 10000) / 1000000
        : null;

      return {
        year,
        avgIncidence,
        globalCases: globalCases ? parseFloat(globalCases.toFixed(2)) : null,
        countries: yearData.countries,
        interpolated: yearData.interpolated || false,
        hasData: yearData.hasData,
      };
    });
  } catch (error) {
    console.error("Error processing data:", error);
    return [];
  }
};

// Custom tooltip component with source information - Mobile-optimized
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const yearData = payload[0].payload;

    return (
      <div className="flex flex-col gap-y-1 bg-white shadow-md p-3 border border-gray-200 rounded max-w-[85vw] md:max-w-xs">
        <h4 className="mb-1 font-bold text-sm">{label}</h4>

        {yearData.interpolated
          ? (
            <p className="text-gray-500 text-xs italic">
              Interpolated data point
            </p>
          )
          : null}

        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            <span className="font-medium">{entry.name}:</span>
            {entry.name === "Estimated Global Cases"
              ? `${entry.value} million`
              : entry.value}
          </p>
        ))}

        {yearData.countries && yearData.countries.length > 0
          ? (
            <div className="mt-1">
              <p className="font-semibold text-xs">Source countries:</p>
              <ul className="max-h-20 overflow-y-auto text-xs leading-tight">
                {yearData.countries.map((country, i) => (
                  <li
                    key={i}
                    className="truncate"
                    title={`${country.country}: ${country.incidence} per 100,000`}
                  >
                    <strong>{country.country}:</strong> {country.incidence}
                  </li>
                ))}
              </ul>
            </div>
          )
          : null}
      </div>
    );
  }
  return null;
};

// Sources section component with accordion
const SourcesSection = () => (
  <div className="mt-4">
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="sources">
        <AccordionTrigger className="font-medium text-sm">
          Data Sources ({incidenceAndSurgeryData.length} countries)
        </AccordionTrigger>
        <AccordionContent>
          <ol className="space-y-2 pl-5 text-xs md:text-sm list-decimal">
            {incidenceAndSurgeryData.map((country, index) => (
              <li key={index}>
                <strong>{country.country}</strong> (
                {country.sample_size || "Sample size not specified"}):&nbsp;
                <a
                  href={country.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-words"
                >
                  {country.source}
                </a>
              </li>
            ))}
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default function IncidenceAreaChart() {
  const [chartData, setChartData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isPhoneDevice, setIsPhoneDevice] = useState(false);

  useEffect(() => {
    try {
      const processedData = processData();
      setChartData(processedData);
      setHasError(processedData.length === 0);

      // Check if we're on a phone using isMobile.phone
      const checkDevice = () => {
        const mobileDetect = isMobile(window.navigator.userAgent);
        setIsPhoneDevice(mobileDetect.phone);
      };

      // Initial check
      checkDevice();

      // Add event listener for resize to recheck
      // This is still useful as user might resize browser window on tablets
      window.addEventListener("resize", checkDevice);

      // Cleanup
      return () => window.removeEventListener("resize", checkDevice);
    } catch (error) {
      console.error("Failed to initialize chart:", error);
      setHasError(true);
    }
  }, []);

  return (
    <div className="space-y-4 px-2 md:px-0 w-full">
      <h3 className="font-medium text-lg md:text-xl text-center">
        Rising Incidence of Achilles Tendon Ruptures
      </h3>
      <p className="text-sm text-center">
        Average incidence rates per 100,000 people (1994-2021)
      </p>

      {hasError || chartData.length === 0
        ? <PlaceholderChart />
        : (
          <div className="bg-white shadow-sm p-2 md:p-4 rounded-sm w-full h-[400px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={isPhoneDevice
                  ? { top: 15, right: 15, left: 5, bottom: 60 }
                  : { top: 35, right: 75, left: 35, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="year"
                  label={isPhoneDevice ? null : {
                    value: "Year",
                    position: "insideBottomRight",
                    offset: -5,
                  }}
                  ticks={isPhoneDevice
                    ? [1994, 2000, 2010, 2021]
                    : chartData.map((d) => d.year)}
                  interval={isPhoneDevice ? "preserveStartEnd" : 0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: isPhoneDevice ? 10 : 12 }}
                />
                <YAxis
                  yAxisId="left"
                  label={isPhoneDevice ? null : {
                    value: "Incidence per 100,000",
                    angle: -90,
                    position: "insideLeft",
                    offset: 0,
                    style: { textAnchor: "middle" },
                  }}
                  domain={[0, "auto"]}
                  tick={{ fontSize: isPhoneDevice ? 10 : 12 }}
                  width={isPhoneDevice ? 30 : 60}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, "auto"]}
                  label={isPhoneDevice ? null : {
                    value: "Global Cases (millions)",
                    angle: 90,
                    position: "insideRight",
                    offset: -15,
                    style: { textAnchor: "middle" },
                  }}
                  tickFormatter={(value) => `${value}`}
                  tick={{ fontSize: isPhoneDevice ? 10 : 12 }}
                  width={isPhoneDevice ? 30 : 65}
                  hide={isPhoneDevice}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ fontSize: isPhoneDevice ? "10px" : "12px" }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="avgIncidence"
                  name="Average Incidence"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                  connectNulls
                  activeDot={{
                    r: isPhoneDevice ? 5 : 8,
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  strokeWidth={isPhoneDevice ? 1.5 : 2}
                />
                {!isPhoneDevice && (
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="globalCases"
                    name="Estimated Global Cases"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    connectNulls
                    activeDot={{
                      r: 6,
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                    unit=" million"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

      <p className="mx-auto px-4 max-w-2xl text-gray-600 text-xs md:text-sm text-center">
        Data from national health registries and research studies across{" "}
        {incidenceAndSurgeryData.length} countries.
        {isPhoneDevice
          ? ""
          : " Years without data points use interpolated values. Global estimates based on average incidence applied to world population."}
      </p>

      <SourcesSection />
    </div>
  );
}
