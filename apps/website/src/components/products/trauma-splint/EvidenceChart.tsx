import { Bar } from "react-chartjs-2";
import { thetisColors } from "@thetis/ui/colors";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement);

const data = {
  labels: ["Plaster Cast", "Thetis splint"],
  datasets: [
    {
      label: "Mean Days",
      data: [8.7, 2.9], // Mean Days
      backgroundColor: [thetisColors[300], thetisColors[600]],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

const EvidenceChart = () => {
  console.log("Rendering EvidenceChart");

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-semibold text-3xl text-center">
        Comparison of Mean Days
      </h2>

      <div className="flex md:flex-row flex-col gap-4 md:gap-8 lg:gap-16 my-8">
        <div className="relative flex justify-center items-center">
          <Bar data={data} options={options} width={300} height={300} />
        </div>
        <ul className="flex flex-col justify-start items-start space-y-2 my-auto">
          {data.labels.map((label, index) => (
            <li key={index} className="flex justify-center items-center">
              <span
                className="inline-block border-neutral-300 mr-2 border rounded-md w-12 h-6"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              />
              {label}: {data.datasets[0].data[index]} days
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EvidenceChart;
