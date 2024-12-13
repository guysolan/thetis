// ProsConsSentence.tsx
import React, { useState, useEffect } from "react";
import { cn } from "@thetis/ui/cn";

interface ProsConsSentenceProps {
  sentence: string;
  keywords: string[];
  isPositive?: boolean;
  highlightDuration?: number;
}

export const ProsConsSentence: React.FC<ProsConsSentenceProps> = ({
  sentence,
  keywords,
  isPositive = true,
  highlightDuration = 1000,
}) => {
  const [currentHighlightIndex, setCurrentHighlightIndex] =
    useState<number>(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentHighlightIndex((prev) =>
        prev >= keywords.length - 1 ? 0 : prev + 1,
      );
    }, highlightDuration);

    return () => clearTimeout(timer);
  }, [currentHighlightIndex, keywords.length, highlightDuration]);

  const renderText = () => {
    let result = sentence;

    keywords.forEach((keyword, index) => {
      const highlightClass = cn(
        "transition-all duration-700 ease-in-out",
        isPositive ? "bg-green-500/50" : "bg-red-500/50",
      );
      const style =
        index === currentHighlightIndex
          ? `<span class="${highlightClass}">${keyword}</span>`
          : keyword;

      result = result.replace(keyword, style);
    });

    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className={cn("text-lg transition-all duration-700 ease-in-out")}>
      {renderText()}
    </div>
  );
};

// Usage example:
// const Example = () => {
//   const sentence = "Sleeping with an Achilles rupture doesn't need to be hard. " +
//     "We've designed a LIGHTWEIGHT, COMFORTABLE AND BREATHABLE splint for well-rested recovery.";
//   const keywords = ["LIGHTWEIGHT", "COMFORTABLE", "BREATHABLE"];
//
//   return <ProsConsSentence sentence={sentence} keywords={keywords} isPositive={true} />;
// };
