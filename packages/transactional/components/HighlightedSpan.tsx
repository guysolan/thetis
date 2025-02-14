import * as React from "react";

const HighlightedSpan = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-brand-100 px-2 py-1 border-2 border-brand-400 rounded-md text-brand-600">
      {children}
    </span>
  );
};

export default HighlightedSpan;
