import { Doughnut } from "react-chartjs-2";
import { thetisColors } from "@thetis/ui/colors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import HighlightedWord from "@/components/HighlightedWord";
import type { ChartData } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data: ChartData<"doughnut"> = {
  labels: [
    "Didn't Sleep Well",
    "Took off Boot",
    "Adjusted Boot at Night",
    "Other",
    "Slept OK",
  ],
  datasets: [
    {
      data: [32, 24, 16, 4, 20],
      backgroundColor: [
        thetisColors[300],
        thetisColors[600],
        thetisColors[500],
        thetisColors[400],
        "#ffffff",
      ],
      hoverOffset: 4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

// Add a media query to adjust the legend position on larger screens
const legendPositionStyle = `
  @media (min-width: 768px) {
    .chart-legend {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

export default function SleepingInBootDonutChart() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-semibold text-3xl text-center">
        <HighlightedWord>78%</HighlightedWord> of users need the Splint for
        better sleep!
      </h2>

      <div className="flex md:flex-row flex-col gap-4 md:gap-8 lg:gap-16 my-8">
        <div className="relative flex justify-center items-center">
          <Doughnut data={data} options={options} width={300} height={300} />
          <p className="top-1/2 left-1/2 absolute flex justify-center items-center p-8 w-16 h-16 font-semibold text-4xl text-center -translate-x-1/2 -translate-y-1/2 transform">
            78%
          </p>
        </div>
        <ul className="flex flex-col justify-start items-start space-y-2 my-auto">
          {data.labels.map((label, index) => (
            <li key={index} className="flex justify-center items-center">
              <span
                className="inline-block mr-2 border border-neutral-300 rounded-md w-12 h-6"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              />
              {label}: {data.datasets[0].data[index]}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
