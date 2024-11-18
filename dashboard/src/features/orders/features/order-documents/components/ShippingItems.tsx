import React from "react";
import { OrderView } from "../../../types";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "../../../../../constants/currencies";

const ShippingItems = (
    { orderItems }: { orderItems: OrderView["items"] },
) => {
    const { data: items } = useSelectItemsView();

    const invoiceItems = orderItems
        .filter((orderItem) => orderItem.quantity > 0)
        .map((orderItem) => {
            const itemDetails = items.find((item) =>
                item.item_id === orderItem.item_id
            );
            return {
                ...orderItem,
                ...itemDetails,
            };
        });

    return (
        <div className="mb-8">
            <h3 className="mb-4 font-semibold">Items</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Country of Origin</TableHead>
                        <TableHead>HS Code</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoiceItems.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.item_name}</TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell>{item.country_of_origin}</TableCell>
                            <TableCell>{item.hs_code}</TableCell>
                            <TableCell className="text-right">
                                {item.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                                {formatCurrency(item.item_price, "GBP")}
                            </TableCell>
                            <TableCell className="text-right">
                                {formatCurrency(
                                    item.quantity * item.item_price,
                                    "GBP",
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow className="font-semibold">
                        <TableCell colSpan={6} className="text-right">
                            Total:
                        </TableCell>
                        <TableCell className="text-right">
                            {formatCurrency(
                                invoiceItems
                                    .reduce(
                                        (sum, item) =>
                                            sum +
                                            (item.quantity * item.item_price),
                                        0,
                                    ),
                                "GBP",
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default ShippingItems;
