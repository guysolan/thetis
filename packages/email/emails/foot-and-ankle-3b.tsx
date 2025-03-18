import * as React from "react";
import HighlightedSpan from "../components/highlighted-span.tsx";
import FootAndAnkle3 from "../components/foot-and-ankle-3/index.tsx";

export const MyEmail = ({ recipientName = "" }) => {
  return (
    <FootAndAnkle3
      quote={
        <>
          Setting a new standard in
          <HighlightedSpan>Achilles Tendon Rupture</HighlightedSpan>{" "}
          rehabilitation
        </>
      }
      author={<>Mr Robbie Ray</>}
      title={<>Foot and Ankle Surgeon</>}
    />
  );
};

export default MyEmail;
