import * as React from "react";
import HighlightedSpan from "../../components/highlighted-span.tsx";
import FootAndAnkle1 from "../../components/foot-and-ankle-1/index.tsx";

export const MyEmail = () => {
  return (
    <FootAndAnkle1
      heading1={
        <>
          Replace <HighlightedSpan>Plaster Casts</HighlightedSpan> with the{" "}
          <HighlightedSpan>Achilles Night Splint</HighlightedSpan> 🎯
        </>
      }
      heading2={
        <>
          1. <HighlightedSpan>Save Staff Time</HighlightedSpan> = Quick
          Application
          <br /> 2. Easy removal ={" "}
          <HighlightedSpan>Faster MRI Scans</HighlightedSpan>
          <br /> 3. <HighlightedSpan>Better Sleep</HighlightedSpan> = Happy
          Patients
        </>
      }
    />
  );
};

export default MyEmail;
