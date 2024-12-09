import { cn } from "../lib/utils";
import { TableCell } from "@thetis/ui/table";
import { ReactNode } from "react";
const NumberCell = ({
  value,
  children,
  className,
}: { value: number; children?: ReactNode; className?: string }) => {
  const formattedValue = (val: number) => {
    if (typeof val !== "number") return 0;
    if (Number.isInteger(val)) return val;
    return value.toFixed(2);
  };
  return (
    <TableCell className={cn(value < 0 ? "text-red-500" : "", className)}>
      {children && children}
      {formattedValue(value)}
    </TableCell>
  );
};

export default NumberCell;
