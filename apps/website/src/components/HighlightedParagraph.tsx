import React from "react";
import HighlightedWord from "./HighlightedWord";

export type HighlightedParagraphProps = {
  highlighted: boolean;
  text: string;
}[];

const HighlightedParagraph = (
  { paragraph }: { paragraph: HighlightedParagraphProps },
) => {
  return (
    <>
      {paragraph.map((item) => (
        <>
          {item.highlighted
            ? <HighlightedWord key={item.text}>{item.text}</HighlightedWord>
            : <span key={item.text}>{item.text}</span>}
        </>
      ))}
    </>
  );
};

export default HighlightedParagraph;
