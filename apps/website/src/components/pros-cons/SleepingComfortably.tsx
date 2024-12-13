import { ProsConsSentence } from "./ProsConsSentence";

const SleepingComfortably = () => {
  const sentence =
    "Sleeping with an Achilles rupture doesn't need to be hard. " +
    "We've designed a LIGHTWEIGHT, COMFORTABLE AND BREATHABLE splint for well-rested recovery.";
  const keywords = ["LIGHTWEIGHT", "COMFORTABLE", "BREATHABLE"];

  return (
    <ProsConsSentence
      sentence={sentence}
      keywords={keywords}
      highlightColor="#4ade80" // Optional: custom color
      highlightDuration={1500} // Optional: custom duration in milliseconds
    />
  );
};

export default SleepingComfortably;
