import * as React from "react";
import HighlightedSpan from "../components/highlighted-span";
import { FootAndAnkle1 } from "../components/foot-and-ankle-1/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle1
      heading1={
        <>
          {recipientName ? `${recipientName}, ` : ""}"I can't sleep in this
          boot!" - <HighlightedSpan>80%</HighlightedSpan> of{" "}
          <HighlightedSpan>Achilles Rupture</HighlightedSpan> Patients 🤬
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
