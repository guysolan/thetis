import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import type { TooltipProps } from "recharts";
import { useState, useEffect } from "react";
import isMobile from "ismobilejs";

// Calculate percentages from the 4.83:1 ratio
// Total is 4.83 + 1 = 5.83
// Men percentage: 4.83/5.83 ≈ 82.85%
// Women percentage: 1/5.83 ≈ 17.15%
const data = [
  { name: "Men", value: 82.85 },
  { name: "Women", value: 17.15 },
];

// Using colors consistent with Incidence.tsx chart
// Primary color from Incidence chart: #8884d8 (purple)
// Secondary color from Incidence chart: #82ca9d (green)
const COLORS = ["#8884d8", "#82ca9d"];

// Define the tooltip payload type
type GenderTooltipPayload = {
  name: string;
  value: number;
  color: string;
};

// Custom tooltip to match the style in Incidence.tsx
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0] as unknown as GenderTooltipPayload;
    return (
      <div className="bg-white shadow-md p-2 border border-gray-200 rounded max-w-xs">
        <p className="font-medium text-xs" style={{ color: data.color }}>
          {data.name}: {data.value.toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export default function GenderDistributionPieChart() {
  const [isPhoneDevice, setIsPhoneDevice] = useState(false);

  useEffect(() => {
    // Check if we're on a phone using isMobile.phone
    const checkDevice = () => {
      const mobileDetect = isMobile(window.navigator.userAgent);
      setIsPhoneDevice(mobileDetect.phone);
    };

    // Initial check
    checkDevice();

    // Add event listener for resize to recheck
    window.addEventListener("resize", checkDevice);

    // Cleanup
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <div style={{ width: "100%", height: 480 }} className="px-4 pt-8 pb-16">
      <h3 className="mb-2 font-semibold text-xl text-center">
        Gender Distribution in Achilles Tendon Ruptures
      </h3>
      <p className="mb-4 text-base text-center">Male to Female Ratio: 4.83:1</p>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={true}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
            outerRadius={isPhoneDevice ? 80 : 100}
            fill="#8884d8"
            dataKey="value"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={`gender-cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-8 text-gray-600 text-sm text-center">
        Based on analysis of global research showing 4.83:1 male to female ratio
        in Achilles tendon ruptures.
      </p>
    </div>
  );
}
