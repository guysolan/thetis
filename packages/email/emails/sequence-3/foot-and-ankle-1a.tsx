import * as React from "react";
import HighlightedSpan from "../../components/highlighted-span.tsx";
import { FootAndAnkle1 } from "../../components/foot-and-ankle-1/index.tsx";

export const MyEmail = () => {
  return (
    <FootAndAnkle1
      heading1={
        <>
          Boost Revenue 💰 with Each <HighlightedSpan>Achilles Rupture</HighlightedSpan> Patient
        </>
      }
      heading2={
        <>
          Our Achilles rupture night splint creates happier patients 😊 and generates additional
          clinic revenue 📈
        </>
      }
    />
  );
};

export default MyEmail;
