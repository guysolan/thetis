import * as React from "react";
import HighlightedSpan from "../../components/highlighted-span.tsx";
import FootAndAnkle1 from "../../components/foot-and-ankle-1/index.tsx";

export const MyEmail = () => {
  return (
    <FootAndAnkle1
      heading1={
        <>
          New: <HighlightedSpan>Night Splint</HighlightedSpan> for{" "}
          <HighlightedSpan>Achilles Rupture</HighlightedSpan> 🌙
        </>
      }
      heading2={
        <>
          Finally, a <HighlightedSpan>Comfortable Solution</HighlightedSpan> for
          Achilles Tendon Rupture Recovery
        </>
      }
    />
  );
};

export default MyEmail;
