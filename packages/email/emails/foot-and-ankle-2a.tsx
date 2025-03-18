import * as React from "react";
import HighlightedSpan from "../components/highlighted-span.tsx";
import { FootAndAnkle2 } from "../components/foot-and-ankle-2/index.tsx";
import PrimaryButton from "../components/primary-button.tsx";
export const MyEmail = () => {
  return (
    <FootAndAnkle2
      button={
        <PrimaryButton
          words={<>Read Full Review</>}
          href="https://thetismedical.com/single-review?reviewerName=Faustine"
        />
      }
      heading1={
        <>
          "I Wish My <HighlightedSpan>Surgeon</HighlightedSpan>
          <br /> Had Told Me About This" 😮
        </>
      }
      heading2={
        <>
          Patient discovers <HighlightedSpan>night splint</HighlightedSpan> that
          transformed her{" "}
          <HighlightedSpan>Achilles recovery comfortable</HighlightedSpan> 💤
        </>
      }
    />
  );
};

export default MyEmail;
