import { useFormContext, useWatch, useController } from "react-hook-form";
import NumberFlow, { NumberFlowProps } from "@number-flow/react";
import { TableCell } from "@thetis/ui/table";
import { useState } from "react";
import Input from "./NumberInput";

interface NumberCellProps {
  name: string;
  step?: number;
  onChange?:
    | ((value: number) => void)
    | React.FormEventHandler<HTMLInputElement>;
  format?: Intl.NumberFormatOptions;
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

  return (
    <TableCell
      onClick={() => props.editable && !isFocused && setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
      style={{
        cursor: isFocused ? "default" : props.editable ? "pointer" : "default",
      }}
    >
      {isFocused && props.editable ? (
        <Input
          step={props.step}
          onChange={handleValueChange}
          value={numericValue}
        />
      ) : (
        <NumberFlow {...props} value={numericValue} />
      )}
    </TableCell>
  );
};

export default NumberFlowCell;
