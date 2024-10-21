import { TableCell } from "./ui/table";
import { ReactNode } from "react";
const NumberCell = (
    { value, children }: { value: number; children?: ReactNode },
) => {
    return (
        <TableCell
            className={value < 0 ? "text-red-500" : ""}
        >
            {children&&children}
            {Number.isInteger(value) ? value : value.toFixed(2)}
        </TableCell>
    );
};

export default NumberCell;
