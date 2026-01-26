import * as React from "react";
import HighlightedSpan from "../../components/highlighted-span.tsx";
import { FootAndAnkle1 } from "../../components/foot-and-ankle-1/index.tsx";

export const MyEmail = () => {
  return (
    <FootAndAnkle1
      heading1={
        <>
          <HighlightedSpan>Boost Your Clinic's Rating</HighlightedSpan> with{" "}
          <HighlightedSpan> 5⭐ Reviews</HighlightedSpan> from Achilles Patients
        </>
      }
      heading2={
        <>
          The Night Splint That Makes{" "}
          <HighlightedSpan>Patients Rave</HighlightedSpan> About Their{" "}
          <HighlightedSpan>Recovery Experience</HighlightedSpan>
        </>
      }
    />
  );
};

export default MyEmail;
