import * as React from "react";
import HighlightedSpan from "../components/highlighted-span.tsx";
import { FootAndAnkle4 } from "../components/foot-and-ankle-4/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle4
      quote={
        <>
          The
          <HighlightedSpan>Achilles Tendon Rupture</HighlightedSpan> Night
          Splint is the Best Piece of Rehab Kit
          <HighlightedSpan>No-One Tells You About</HighlightedSpan>{" "}
        </>
      }
      author={<>A Happy Customer</>}
    />
  );
};

export default MyEmail;
