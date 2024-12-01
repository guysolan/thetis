import NumberFlow, { Format } from "@number-flow/react";
import { cn } from "@thetis/ui/cn";
import clsx from "clsx/lite";
import { Minus, Plus } from "lucide-react";
import * as React from "react";
type Props = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  format: Format;
  onChange?: (value: number) => void;
  precision?: number;
  editing?: boolean;
  focus?: () => void;
  blur?: (e: React.FocusEvent<HTMLDivElement>) => void;
};
export default function Input({
  value = 0,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  suffix,
  onChange,
  format,
  precision = 10,
  editing = false,
  focus,
  blur,
}: Props) {
  const defaultValue = React.useRef(value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [animated, setAnimated] = React.useState(true);
  // Hide the caret during transitions so you can't see it shifting around:
  const [showCaret, setShowCaret] = React.useState(true);
  // Add state to track the raw input value
  const [inputValue, setInputValue] = React.useState(String(value));
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: el,
  }) => {
    setAnimated(false);
    const newValue = el.value;

    // Validate input format
    if (!/^\d*\.?\d*$/.test(newValue)) {
      return;
    }

    // Update the displayed input value
    setInputValue(newValue);

    // Only convert to number and call onChange when we have a valid number
    if (newValue !== "" && newValue !== ".") {
      const num = Number.parseFloat(newValue);
      if (Number.isFinite(num) && min <= num && num <= max) {
        onChange?.(num);
      }
    }
  };
  const handlePointerDown =
    (diff: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
      setAnimated(true);
      if (event.pointerType === "mouse") {
        event?.preventDefault();
        inputRef.current?.focus();
      }
      const newVal = Math.min(Math.max(value + diff * step, min), max);
      onChange?.(newVal);
      setInputValue(String(newVal));
    };
  return (
    <div className="flex justify-center items-center w-20 transition-[box-shadow] group">
      <button
        className={cn(
          "flex items-center pr-[.325em] pl-[.5em]",
          !editing && "opacity-0 pointer-events-none",
        )}
        type="button"
        tabIndex={-1}
        disabled={min != null && value <= min}
        onPointerDown={handlePointerDown(-1)}
      >
        <Minus size={16} />
      </button>
      {editing ? (
        <div className="relative justify-items-center items-center grid [grid-template-areas:'overlap'] *:[grid-area:overlap] text-center">
          <input
            ref={inputRef}
            className={clsx(
              showCaret ? "caret-primary" : "caret-transparent",
              "spin-hide w-[1.5em] bg-transparent text-primary text-center outline-none",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              "invalid:!m-0",
              "[&:invalid]:no-validate",
              "min-w-10",
            )}
            type="text"
            min={min}
            step={step}
            autoComplete="off"
            inputMode="decimal"
            max={max}
            value={inputValue}
            onInput={handleInput}
            onFocus={() => {
              focus?.();
              setShowCaret(true);
            }}
            onBlur={blur}
          />
          <NumberFlow
            value={value}
            format={{ useGrouping: false }}
            aria-hidden="true"
            animated={animated}
            onAnimationsStart={() => setShowCaret(false)}
            onAnimationsFinish={() => setShowCaret(true)}
            className="text-transparent pointer-events-none"
            willChange
            suffix={suffix}
          />
        </div>
      ) : (
        <NumberFlow format={format} value={value} suffix={suffix} />
      )}
      <button
        type="button"
        tabIndex={-1}
        className={cn(
          "flex items-center pr-[.5em] pl-[.325em]",
          !editing && "opacity-0 pointer-events-none",
        )}
        disabled={max != null && value >= max}
        onPointerDown={handlePointerDown(1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
