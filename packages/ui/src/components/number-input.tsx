import NumberFlow from "@number-flow/react";
import { cn } from "../utils";
import { Minus, Plus } from "lucide-react";
import * as React from "react";
type Props = {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  name?: string;
};
export default function NumberInput({
  value = 0,
  min = -Infinity,
  max = Infinity,
  onChange,
}: Props) {
  const defaultValue = React.useRef(value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [animated, setAnimated] = React.useState(true);
  // Hide the caret during transitions so you can't see it shifting around:
  const [showCaret, setShowCaret] = React.useState(true);
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: el,
  }) => {
    setAnimated(false);
    let next = value;
    if (el.value === "") {
      next = defaultValue.current;
    } else {
      const num = parseInt(el.value);
      if (!isNaN(num) && min <= num && num <= max) next = num;
    }
    // Manually update the input.value in case the number stays the same e.g. 09 == 9
    el.value = String(next);
    onChange?.(next);
  };
  const handlePointerDown =
    (diff: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
      setAnimated(true);
      if (event.pointerType === "mouse") {
        event?.preventDefault();
        inputRef.current?.focus();
      }
      const newVal = Math.min(Math.max(value + diff, min), max);
      onChange?.(newVal);
    };
  return (
    <div className="flex items-stretch rounded-md ring ring-zinc-200 focus-within:ring-2 focus-within:ring-blue-500 dark:ring-zinc-800 font-semibold text-3xl transition-[box-shadow] group">
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="flex items-center pr-[.325em] pl-[.5em]"
        disabled={min != null && value <= min}
        onPointerDown={handlePointerDown(-1)}
      >
        <Minus className="size-4" absoluteStrokeWidth strokeWidth={3.5} />
      </button>
      <div className="relative justify-items-center items-center grid [grid-template-areas:'overlap'] *:[grid-area:overlap] text-center">
        <input
          name={name}
          ref={inputRef}
          className={cn(
            showCaret ? "caret-primary" : "caret-transparent",
            "spin-hide w-[1.5em] bg-transparent py-2 text-center font-[inherit] text-transparent outline-none",
          )}
          // Make sure to disable kerning, to match NumberFlow:
          style={{ fontKerning: "none" }}
          type="number"
          min={min}
          step={1}
          autoComplete="off"
          inputMode="numeric"
          max={max}
          value={value}
          onInput={handleInput}
        />
        <NumberFlow
          value={value}
          format={{ useGrouping: false }}
          aria-hidden="true"
          animated={animated}
          onAnimationsStart={() => setShowCaret(false)}
          onAnimationsFinish={() => setShowCaret(true)}
          className="pointer-events-none"
          willChange
        />
      </div>
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="flex items-center pr-[.5em] pl-[.325em]"
        disabled={max != null && value >= max}
        onPointerDown={handlePointerDown(1)}
      >
        <Plus className="size-4" absoluteStrokeWidth strokeWidth={3.5} />
      </button>
    </div>
  );
}
