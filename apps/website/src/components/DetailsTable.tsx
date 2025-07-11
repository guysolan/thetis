import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import type { SplintData } from "../types/splint";

const DetailsTable = ({ splint }: { splint: SplintData }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/3 font-semibold text-gray-700">
                        Specification
                    </TableHead>
                    <TableHead className="w-2/3 font-semibold text-gray-700">
                        Details
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium text-gray-600">
                        Brand
                    </TableCell>
                    <TableCell className="font-semibold">
                        {splint.brand}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-gray-600">
                        Size
                    </TableCell>
                    <TableCell className="font-semibold">
                        {splint.size}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-gray-600">
                        Side
                    </TableCell>
                    <TableCell className="font-semibold">
                        {splint.title.toLowerCase().includes("left")
                            ? "Left"
                            : "Right"}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-gray-600">
                        Color
                    </TableCell>
                    <TableCell className="font-semibold">
                        {splint.color}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-gray-600">
                        Condition
                    </TableCell>
                    <TableCell className="font-semibold">
                        {splint.condition}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-gray-600">
                        MPN
                    </TableCell>
                    <TableCell className="font-semibold">
                        {splint.mpn}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-gray-600">
                        GTIN
                    </TableCell>
                    <TableCell className="font-semibold">
                        {splint.gtin}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-gray-600">
                        Availability
                    </TableCell>
                    <TableCell className="font-semibold">
                        <span
                            className={[
                                "inline-flex items-center px-2 py-1 rounded-full text-sm font-medium",
                                splint.availability === "in_stock"
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : "bg-red-100 text-red-800 border border-red-200",
                            ].join(" ")}
                        >
                            {splint.availability === "in_stock"
                                ? "✓ In Stock"
                                : "Out of Stock"}
                        </span>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default DetailsTable;
