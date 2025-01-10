import { Minus, Plus } from "lucide-react";
import React from "react";

interface NumberInputProps {
  id: string;
  name: string;
  label: string;
  value?: number | undefined;
  onChange?: (value: number | undefined) => void;
  defaultValue?: number;
}

export function NumberInput({
  id,
  name,
  label,
  defaultValue = 0,
}: NumberInputProps) {
  const [value, setValue] = React.useState(defaultValue);

  const incrementValue = () => {
    setValue((prev) => prev + 1);
  };

  const decrementValue = () => {
    setValue((prev) => Math.max(0, prev - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue === "" ? undefined : parseInt(inputValue) || 0);
  };

  return (
    <div className="flex flex-row gap-4 w-full">
      <label
        htmlFor={id}
        className="block w-full font-semibold text-base text-neutral-700"
      >
        {label}
      </label>
      <div className="flex justify-center items-center border-gray-400 focus-within:border-primary bg-white border rounded-sm hover:ring-gray-400 hover:ring-1 focus-within:ring-primary focus-within:ring-1 w-full min-w-60 font-semibold text-3xl transition-all duration-100 delay-50 ease">
        <button
          type="button"
          className="flex items-center pr-[.325em] pl-[.5em]"
          onClick={decrementValue}
        >
          <Minus className="size-4" />
        </button>
        <input
          type="number"
          id={id}
          name={name}
          min="0"
          value={value}
          onChange={handleInputChange}
          className="border-0 hover:border-0 focus:border-0 bg-transparent py-2 hover:ring-0 focus:ring-0 w-[1.5em] min-w-16 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield] hover:outline-none focus:outline-none"
        />
        <button
          type="button"
          className="flex items-center pr-[.5em] pl-[.325em]"
          onClick={incrementValue}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
