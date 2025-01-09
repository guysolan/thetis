import { cn } from "@thetis/ui/cn";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

type Props = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  onChange?: (value: number) => void;
};

export default function Input({
  value = 0,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  suffix,
  onChange,
}: Props) {
  const handleClick = (diff: number) => () => {
    const newVal = Math.min(Math.max(value + diff * step, min), max);
    onChange?.(newVal);
  };

  return (
    <div className="flex justify-center items-center w-20">
      <button
        className="flex items-center px-2"
        type="button"
        disabled={min != null && value <= min}
        onClick={handleClick(-1)}
      >
        <Minus size={16} />
      </button>

      <div className="min-w-8 text-center">
        {value}
        {suffix}
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
