import * as React from "react";
import HighlightedSpan from "../components/highlighted-span.tsx";
import { FootAndAnkle2 } from "../components/foot-and-ankle-2/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle2
      heading1={<>Finally, the UK does something right</>}
      heading2={
        <>
          Introducing a splint for
          <HighlightedSpan>Happier</HighlightedSpan> Achilles Rupture{" "}
          <HighlightedSpan>Patients</HighlightedSpan>
        </>
      }
    />
  );
};

export default MyEmail;
