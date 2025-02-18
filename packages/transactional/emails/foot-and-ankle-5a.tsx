import * as React from "react";
import HighlightedSpan from "../components/highlighted-span.tsx";
import { FootAndAnkle5 } from "../components/foot-and-ankle-5/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle5
      heading1={
        <>
          {recipientName ? `${recipientName}, you` : "You"} could be the first
          US surgeon to get the
          <HighlightedSpan>Achilles Rupture</HighlightedSpan> Night Splint 🎉
        </>
      }
      heading2={
        <>
          Now
          <HighlightedSpan>FDA Approved</HighlightedSpan> and available in the{" "}
          <HighlightedSpan>USA 🇺🇸</HighlightedSpan>
        </>
      }
    />
  );
};

export default MyEmail;
