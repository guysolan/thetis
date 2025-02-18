import * as React from "react";
import HighlightedSpan from "../components/highlighted-span";
import { FootAndAnkle1 } from "../components/foot-and-ankle-1/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle1
      heading1={
        <>
          {recipientName ? `${recipientName}, introducing` : "Introducing"} a
          Revolutionary
          <HighlightedSpan>Night Splint</HighlightedSpan> for{" "}
          <HighlightedSpan>Achilles Rupture</HighlightedSpan>
        </>
      }
      heading2={
        <>
          Finally, a <HighlightedSpan>Comfortable Solution</HighlightedSpan> for
          Achilles Tendon Recovery
        </>
      }
    />
  );
};

export default MyEmail;
