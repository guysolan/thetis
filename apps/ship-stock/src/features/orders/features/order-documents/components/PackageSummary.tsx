import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import { OrderView } from "../../../types";

const PackageSummary = ({ items }: { items: OrderView["items"] }) => {
    const packageItems = items.filter((item) => item.item_type === "package");
    if (!packageItems.length) return <></>;
    return (
        <div className="mb-8">
            <h3 className="mb-4 font-semibold">Package Summary</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Package</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Dimensions (cm)</TableHead>
                        <TableHead>Weight (kg)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.filter((item) => item.item_type === "package")
                        .map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.item_name}</TableCell>
                                <TableCell>{Math.abs(item.quantity)}</TableCell>
                                <TableCell>
                                    {item.height} x {item.width} x {item.depth}
                                </TableCell>
                                <TableCell>{item.weight}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PackageSummary;
