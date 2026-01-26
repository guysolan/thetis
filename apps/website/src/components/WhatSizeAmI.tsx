import { useState } from "react";
import { content } from "./products/night-splint/content.ts";
import type { Lang } from "../config/languages.ts";

interface Props {
  lang: Lang;
}

const sizeThresholds = {
  EU: 42,
  UK: 8,
  "US Men": 9,
  "US Women": 10.5,
};

type Region = keyof typeof sizeThresholds;

const translatedContent = {
  en: {
    region: "Region:",
    shoeSize: "Your Shoe Size:",
    recommendedSize: "Recommended Size:",
    small: "Small",
    large: "Large",
  },
  de: {
    region: "Region:",
    shoeSize: "Ihre Schuhgröße:",
    recommendedSize: "Empfohlene Größe:",
    small: "Klein",
    large: "Groß",
  },
  fr: {
    region: "Région:",
    shoeSize: "Votre pointure:",
    recommendedSize: "Taille recommandée:",
    small: "Petit",
    large: "Grand",
  },
  es: {
    region: "Región:",
    shoeSize: "Su talla de zapato:",
    recommendedSize: "Talla recomendada:",
    small: "Pequeño",
    large: "Grande",
  },
  it: {
    region: "Regione:",
    shoeSize: "La tua taglia di scarpe:",
    recommendedSize: "Taglia consigliata:",
    small: "Piccolo",
    large: "Grande",
  },
};

// Component
const WhatSizeAmI = ({ lang = "en" }: Props) => {
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region>("UK");
  const [shoeSize, setShoeSize] = useState<string>("");

  const t = content[lang]?.whatSizeAmI || content.en.whatSizeAmI;
  const tc = translatedContent[lang] || translatedContent.en;

  const getRecommendedSize = (): string => {
    if (!shoeSize) return "";
    const size = parseFloat(shoeSize);
    if (isNaN(size)) return "";

    const threshold = sizeThresholds[selectedRegion];
    return size < threshold ? tc.small : tc.large;
  };

  const recommendedSize = getRecommendedSize();

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

        {isCalculatorVisible && (
          <div className="flex flex-col space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-sm">{tc.region}</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as Region)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                {Object.keys(sizeThresholds).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-sm">{tc.shoeSize}</label>
              <input
                type="number"
                step="0.5"
                value={shoeSize}
                onChange={(e) => setShoeSize(e.target.value)}
                placeholder="Enter your shoe size"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {recommendedSize && (
              <div className="bg-primary/10 mt-4 p-4 rounded-md">
                <p className="font-semibold text-center">
                  {tc.recommendedSize}{" "}
                  <span className="text-primary text-lg">
                    {recommendedSize}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatSizeAmI;
