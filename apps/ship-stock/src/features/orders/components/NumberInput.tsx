import { cn } from "@thetis/ui/cn";
import { Minus, Plus } from "lucide-react";
import * as React from "react";
import NumberFlow, { Format } from "@number-flow/react";

type Props = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  format?: Format;
  editing?: boolean;
  focus?: () => void;
  blur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onChange?: (value: number) => void;
  name?: string;
  id?: string;
};

export default function Input({
  value = 0,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  suffix,
  format,
  editing = false,
  focus,
  blur,
  onChange,
  name,
  id,
}: Props) {
  // Track input value for direct editing
  const [inputValue, setInputValue] = React.useState(value.toString());

  // Update internal state when prop value changes
  React.useEffect(() => {
    setInputValue(displayValue(value));
  }, [value, step]);

  const handleClick = (diff: number) => () => {
    // Use exact step value without floating point precision issues
    const newVal = Math.round((value + diff * step) * 1000000) / 1000000;
    const clampedVal = Math.min(Math.max(newVal, min), max);
    onChange?.(clampedVal);
  };

  // Format display value based on step precision
  const displayValue = (val: number) => {
    if (step < 1) {
      const decimalPlaces = Math.max(0, -Math.floor(Math.log10(step)));
      return val.toFixed(decimalPlaces);
    }
    return val.toString();
  };

  // Handle direct input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle blur to validate and update the value
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let newVal = Number.parseFloat(inputValue);

    // Handle invalid input
    if (Number.isNaN(newVal)) {
      setInputValue(displayValue(value));
      return;
    }

    // Clamp value to min/max
    newVal = Math.min(Math.max(newVal, min), max);

    // Update with valid value
    onChange?.(newVal);
    setInputValue(displayValue(newVal));

    // Call parent blur handler if provided
    if (blur) {
      blur(e as unknown as React.FocusEvent<HTMLDivElement>);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="flex items-center px-2"
        type="button"
        disabled={min != null && value <= min}
        onClick={handleClick(-1)}
      >
        <Minus size={16} />
      </button>

      <div className="min-w-12 text-center">
        {editing
          ? (
            <input
              type="text"
              id={id}
              name={name}
              className="bg-transparent focus:outline-none w-full text-center"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onFocus={focus}
              aria-label={name ? undefined : "Numeric value"}
            />
          )
          : (
            <div
              onClick={focus}
              className="cursor-pointer"
              onKeyUp={focus}
              onKeyDown={focus}
            >
              {format ? <NumberFlow value={value} format={format} /> : (
                displayValue(value)
              )}
              {suffix && <span>{suffix}</span>}
            </div>
          )}
      </div>

      <button
        type="button"
        className="flex items-center px-2"
        disabled={max != null && value >= max}
        onClick={handleClick(1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
