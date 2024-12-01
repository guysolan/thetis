import { useFormContext, useWatch, useController } from "react-hook-form";
import NumberFlow, { Format, NumberFlowProps } from "@number-flow/react";
import { TableCell } from "@thetis/ui/table";
import { useState } from "react";
import Input from "./NumberInput";
import { cn } from "@thetis/ui/cn";

interface NumberCellProps {
  name: string;
  step?: number;
  onChange?:
    | ((value: number) => void)
    | React.FormEventHandler<HTMLInputElement>;
  format: Format;
  suffix?: string;
  editable?: boolean;
}

const NumberFlowCell = (props: NumberCellProps) => {
  const { control, setValue } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  const numericValue = useWatch({ control, name: props.name });

  const handleValueChange = (value: number) => {
    setValue(props.name, value);
    props.onChange?.(value);
  };

  const focus = () => {
    if (props.editable) {
      setIsFocused(true);
    }
  };

  const blur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <TableCell
      onClick={focus}
      onBlur={blur}
      className={cn("text-center", isFocused && "cursor-default")}
    >
      <Input
        focus={focus}
        blur={blur}
        format={props.format}
        step={props.step}
        onChange={handleValueChange}
        value={numericValue}
        editing={props.editable && isFocused}
      />
    </TableCell>
  );
};

export default NumberFlowCell;
