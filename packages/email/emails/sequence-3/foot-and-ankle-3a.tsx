import * as React from "react";
import HighlightedSpan from "../../components/highlighted-span.tsx";
import FootAndAnkle1 from "../../components/foot-and-ankle-1/index.tsx";

export const MyEmail = () => {
  return (
    <FootAndAnkle1
      heading1={
        <>
          Me & My Dad Created an <HighlightedSpan>Splint</HighlightedSpan> for{" "}
          <HighlightedSpan>Achilles Ruptures</HighlightedSpan> ⛹️
        </>
      }
      heading2={<></>}
    />
  );
};

export default MyEmail;
