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
      {paragraph.map((item, i) => (
        <>
          {item.highlighted
            ? <HighlightedWord key={item.text + i}>{item.text}</HighlightedWord>
            : <span key={item.text + i}>{item.text}</span>}
        </>
      ))}
    </>
  );
};

export default HighlightedParagraph;
