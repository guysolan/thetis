import * as React from "react";
import HighlightedSpan from "../../components/highlighted-span";
import { FootAndAnkle1 } from "../../components/foot-and-ankle-1/index.tsx";

export const MyEmail = () => {
  return (
    <FootAndAnkle1
      heading1={
        <>
          Would you sleep in your{" "}
          <HighlightedSpan>Rain Boots? 😮</HighlightedSpan>
        </>
      }
      heading2={
        <>
          The <HighlightedSpan>Only</HighlightedSpan> Night Splint for Achilles
          Tendon Rupture
        </>
      }
    />
  );
};

export default MyEmail;
