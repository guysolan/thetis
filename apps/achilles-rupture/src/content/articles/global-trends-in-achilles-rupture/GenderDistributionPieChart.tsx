import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

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

// Custom tooltip to match the style in Incidence.tsx
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md p-2 border border-gray-200 rounded max-w-xs">
        <p className="font-medium text-xs" style={{ color: payload[0].color }}>
          {payload[0].name}: {payload[0].value.toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export default function GenderDistributionPieChart() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3 className="mb-2 font-medium text-xl text-center">
        Gender Distribution in Achilles Tendon Ruptures
      </h3>
      <p className="mb-4 text-sm text-center">Male to Female Ratio: 4.83:1</p>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span className="text-sm">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-2 text-gray-600 text-xs text-center">
        Based on analysis of global research showing 4.83:1 male to female ratio
        in Achilles tendon ruptures.
      </p>
    </div>
  );
}
