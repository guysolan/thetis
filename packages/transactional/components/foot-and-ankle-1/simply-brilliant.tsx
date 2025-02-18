import React from "react";

const SimplyBrilliant = () => {
  return (
    <div className="mt-4 mb-4 p-2 rounded-lg font-medium text-gray-700 text-base md:text-lg text-center">
      <div className="flex justify-center gap-1 mb-2">
        <span className="text-yellow-400">⭐</span>
        <span className="text-yellow-400">⭐</span>
        <span className="text-yellow-400">⭐</span>
        <span className="text-yellow-400">⭐</span>
        <span className="text-yellow-400">⭐</span>
      </div>
      <p className="font-medium text-gray-700 text-base md:text-lg text-center">
        "Simply brilliant - and brilliantly simple"
        <br />
        <span className="block mt-2 font-normal text-sm md:text-base">
          - Clinical Director, London Foot and Ankle Centre
        </span>
      </p>
    </div>
  );
};

export default SimplyBrilliant;
