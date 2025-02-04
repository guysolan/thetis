import { useState } from "react";
import SizeCalculator from "./SizeCalculator";

// Component
const WhatSizeAmI = () => {
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);

  return (
    <div className="mx-auto py-4 border-t w-full max-w-md">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between items-center">
          <p className="font-semibold text-lg">Choose your Options</p>
          <button
            type="button"
            className="font-semibold text-md text-primary underline underline-offset-2 cursor-pointer"
            onClick={() => setIsCalculatorVisible(!isCalculatorVisible)}
          >
            What Size am I?
          </button>
        </div>

        {isCalculatorVisible && <SizeCalculator />}
      </div>
    </div>
  );
};

export default WhatSizeAmI;
