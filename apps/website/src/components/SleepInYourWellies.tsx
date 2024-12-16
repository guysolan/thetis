// src/components/WelliesHeading.tsx
import { useState, useEffect } from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import HighlightedWord from "./HighlightedWord";

const bootTerms = [
  {
    term: "Wellies",
    flag: getUnicodeFlagIcon("GB"),
    country: "United Kingdom",
  },
  { term: "Gummies", flag: getUnicodeFlagIcon("AU"), country: "Australia" },
  {
    term: "Rain Boots",
    flag: getUnicodeFlagIcon("US"),
    country: "United States",
  },
  { term: "Rubber Boots", flag: getUnicodeFlagIcon("CA"), country: "Canada" },
];

export default function SleepInYourWellies() {
  const [currentBoot, setCurrentBoot] = useState(bootTerms[0]);

  useEffect(() => {
    const rotateBoots = () => {
      setCurrentBoot((current) => {
        const currentIndex = bootTerms.findIndex(
          (b) => b.term === current.term,
        );
        const nextIndex = (currentIndex + 1) % bootTerms.length;
        return bootTerms[nextIndex];
      });
    };

    const interval = setInterval(rotateBoots, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 text-center">
      <h3 className="flex justify-center items-center gap-2 mb-2 font-bold text-3xl">
        Would you sleep in your{" "}
        <HighlightedWord>
          {currentBoot.term}
          <span className="ml-2">{currentBoot.flag}</span>
        </HighlightedWord>
        ?
      </h3>
    </div>
  );
}
