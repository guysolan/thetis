import * as React from "react";
import HighlightedSpan from "../../components/highlighted-span.tsx";
import FootAndAnkle2 from "../../components/foot-and-ankle-2/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle2
      heading1={
        <>
          "The <HighlightedSpan>Best Piece</HighlightedSpan> of Rehab Kit No-One
          Tells You About"
        </>
      }
      heading2={
        <>
          Introducing the <HighlightedSpan>Achilles Rupture</HighlightedSpan>{" "}
          Night Splint
        </>
      }
    />
  );
};

export default MyEmail;
