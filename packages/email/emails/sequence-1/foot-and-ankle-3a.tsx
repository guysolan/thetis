import * as React from "react";
import HighlightedSpan from "../../components/highlighted-span.tsx";
import { FootAndAnkle2 } from "../../components/foot-and-ankle-2/index.tsx";
export const MyEmail = () => {
  return (
    <FootAndAnkle2
      heading1={
        <>
          "I Wish My <HighlightedSpan>Surgeon</HighlightedSpan>
          <br /> Had Told Me About This" 🤯
        </>
      }
      heading2={
        <>
          Patient review of the{" "}
          <HighlightedSpan>Achilles Rupture</HighlightedSpan> Night Splint 💤
        </>
      }
    />
  );
};

export default MyEmail;
