import * as React from "react";
import HighlightedSpan from "../components/highlighted-span.tsx";
import FootAndAnkle3 from "../components/foot-and-ankle-3/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle3
      quote={
        <>
          When I tore my own <HighlightedSpan>Achilles tendon</HighlightedSpan>,
          the hardest part of the recovery was having to wear the hospital{" "}
          <HighlightedSpan>boot in bed</HighlightedSpan>...
        </>
      }
      author={<>Mr James Davis</>}
      title={<>President of the British Orthopaedic Foot and Ankle Society</>}
    />
  );
};

export default MyEmail;
