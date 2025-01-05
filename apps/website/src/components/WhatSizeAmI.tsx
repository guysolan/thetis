import React, { useState } from "react";
import { Input } from "@thetis/ui/input";

// Constants
const sizeTypes = ["EU", "UK", "US Men", "US Women"] as const;
const sizeGuide = [
  { metric: "EU", threshold: 38, step: 1 },
  { metric: "UK", threshold: 8, step: 0.5 },
  { metric: "US Men", threshold: 9, step: 0.5 },
  { metric: "US Women", threshold: 10.5, step: 0.5 },
];

// Types
type SizeType = (typeof sizeTypes)[number];

// Custom Hook
const useSizeCalculator = (initialSizeType: SizeType) => {
  const [sizeType, setSizeType] = useState<SizeType>(initialSizeType);
  const [size, setSize] = useState<string>("");

  const isValidSize = (input: string): boolean => {
    const num = Number.parseFloat(input);
    if (Number.isNaN(num)) return false;

    const guide = sizeGuide.find((g) => g.metric === sizeType);
    return num % guide!.step === 0;
  };

  const getSizeCategory = (value: number): string => {
    const guide = sizeGuide.find((g) => g.metric === sizeType);
    return value < guide!.threshold ? "Small" : "Large";
  };

  return { sizeType, setSizeType, size, setSize, isValidSize, getSizeCategory };
};

// Component
const WhatSizeAmI = () => {
  const { sizeType, setSizeType, size, setSize, isValidSize, getSizeCategory } =
    useSizeCalculator("EU");
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
  };

  return (
    <div className="mx-auto p-4 border-t w-full max-w-md">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between items-center">
          <p className="font-semibold text-lg">Choose your Options</p>
          <button
            type="button"
            className="font-medium text-md text-primary underline underline-offset-2 cursor-pointer"
            onClick={() => setIsCalculatorVisible(!isCalculatorVisible)}
          >
            What Size am I?
          </button>
        </div>

        {isCalculatorVisible && (
          <div className="flex flex-row gap-4">
            <select
              className="border-neutral-200 bg-transparent px-3 py-2 border w-1/3 text-sm"
              value={sizeType}
              onChange={(e) => setSizeType(e.target.value as SizeType)}
            >
              {sizeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <input
              className="w-2/3"
              type="number"
              step={sizeGuide
                .find((g) => g.metric === sizeType)
                ?.step.toString()}
              value={size}
              onChange={handleSizeChange}
              placeholder={"Enter size"}
            />
          </div>
        )}

        {size && isValidSize(size) && (
          <div className="border-2 border-primary bg-primary/10 p-4 rounded-lg font-medium text-center text-lg">
            Your size is: {getSizeCategory(Number.parseFloat(size))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatSizeAmI;
