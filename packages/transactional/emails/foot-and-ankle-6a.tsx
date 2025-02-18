import * as React from "react";
import HighlightedSpan from "../components/highlighted-span.tsx";
import { FootAndAnkle5 } from "../components/foot-and-ankle-5/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle5
      heading1={
        <>
          {recipientName ? `${recipientName}, it's` : "It's"} your last chance
          to get the
          <HighlightedSpan>Achilles Rupture</HighlightedSpan> Night Splint 🎉
        </>
      }
      heading2={
        <>
          Get a Sample in the next
          <HighlightedSpan>24 hours</HighlightedSpan>
        </>
      }
    />
  );
};

export default MyEmail;
