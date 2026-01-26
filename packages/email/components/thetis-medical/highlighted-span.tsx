import * as React from "react";

const HighlightedSpan = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-emerald-600/15 px-1 rounded-md text-emerald-600 text-nowrap">
      {children}
    </span>
  );
};

export default HighlightedSpan;
