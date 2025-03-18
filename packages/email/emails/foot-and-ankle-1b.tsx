import * as React from "react";
import HighlightedSpan from "../components/highlighted-span.tsx";
import { FootAndAnkle1 } from "../components/foot-and-ankle-1/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle1
      heading1={
        <>
          <HighlightedSpan>80%</HighlightedSpan> of{" "}
          <HighlightedSpan>Achilles Rupture</HighlightedSpan> patients: "I can't
          sleep in this 🤬 boot!"
        </>
      }
      heading2={
        <>
          Introducing a splint for <HighlightedSpan>Happier</HighlightedSpan>{" "}
          Achilles Rupture <HighlightedSpan>Patients</HighlightedSpan>
        </>
      }
    />
  );
};

export default MyEmail;
