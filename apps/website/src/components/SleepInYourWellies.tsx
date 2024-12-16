// src/components/SleepInYourWellies.tsx
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
  const [displayText, setDisplayText] = useState(bootTerms[0].term);
  const [displayFlag, setDisplayFlag] = useState(bootTerms[0].flag);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const animateText = async () => {
      // Delete animation
      const currentTerm = bootTerms[currentIndex].term;
      const nextIndex = (currentIndex + 1) % bootTerms.length;
      const nextTerm = bootTerms[nextIndex].term;
      const nextFlag = bootTerms[nextIndex].flag;

      // Delete current text and flag
      for (let i = currentTerm.length; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, 75));
        setDisplayText(currentTerm.substring(0, i));
        if (i === 0) setDisplayFlag("");
      }

      // Type new text and add flag
      for (let i = 0; i <= nextTerm.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 75));
        setDisplayText(nextTerm.substring(0, i));
        if (i === nextTerm.length) setDisplayFlag(nextFlag);
      }

      setCurrentIndex(nextIndex);
    };

    const interval = setInterval(animateText, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="py-8 text-center">
      <h3 className="flex justify-center items-center gap-2 mb-2 text-4xl">
        <span className="font-medium">Would you sleep in your</span>{" "}
        <div className="inline-flex justify-center items-center min-w-[20px] font-semibold">
          <HighlightedWord>
            <div>
              {displayText}
              <span className="ml-2">{displayFlag}</span>
            </div>
          </HighlightedWord>
        </div>
        <span>?</span>
      </h3>
    </div>
  );
}
