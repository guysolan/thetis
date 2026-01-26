import React from "react";

export type HighlightedWordContent = {
  highlighted: boolean;
  text: string;
};

const HighlightedWord = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-primary/10 dark:bg-primary/25 mr-1 pt-0 pr-0.5 pb-0.5 pl-1 border border-primary/25 dark:border-primary/50 rounded-lg font-semibold text-primary">
      {children}
    </span>
  );
};

export default HighlightedWord;
