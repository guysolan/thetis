import { useState } from "react";
import SizeCalculator from "./SizeCalculator";
import { content } from "./products/night-splint/content.ts";
import type { Lang } from "../config/languages.ts";

interface Props {
  lang: Lang;
}

// Component
const WhatSizeAmI = ({ lang = "en" }: Props) => {
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const t = content[lang]?.whatSizeAmI || content.en.whatSizeAmI;

  return (
    <div className="mx-auto py-4 border-t w-full max-w-md">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between items-center">
          <p className="font-semibold text-lg">{t.chooseOptions}</p>
          <button
            type="button"
            className="font-semibold text-md text-primary underline underline-offset-2 cursor-pointer"
            onClick={() => setIsCalculatorVisible(!isCalculatorVisible)}
          >
            {t.whatSize}
          </button>
        </div>

        {isCalculatorVisible && <SizeCalculator lang={lang} />}
      </div>
    </div>
  );
};

export default WhatSizeAmI;
