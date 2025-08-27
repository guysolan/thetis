import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import type { OrderView } from "../../../types";
import type { Currency as CurrencyType } from '../../../../../constants/currencies';
import NumberFlow from '@number-flow/react';
/**
 * Processes order items for display in the financial transactions table
 * @param items - Array of order items from the OrderView
 * @returns Sorted and filtered array of order items
 */
const processOrderItems = (
    items: OrderView["items"],
    orderType: OrderView["order_type"],
) => {
    const sorted = items
        // Sort items by ID for consistent display order
        ?.sort((a, b) => a.item_id - b.item_id);
    if (orderType === "sale") return sorted;

    return sorted
        // Remove items with zero price to avoid displaying irrelevant entries
        ?.filter((item) => Number(item?.price) !== 0);
};

const FinancialTransactions = (
    { orderType, orderItems, currency }: {
        orderType: OrderView["order_type"];
        orderItems: OrderView["items"];
        currency: CurrencyType;
    },
) => {
    return (
        <Table className="text-left">
            <TableHeader>
                <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Tax</TableHead>
                    <TableHead className="w-1/6">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {processOrderItems(orderItems, orderType).map((item) => (
                    <TableRow
                        className="text-left"
                        key={`${item.item_id}-${item.item_name}`}
                    >
                        <TableCell>
                            {item.item_name}
                        </TableCell>
                        <TableCell>
                            {orderType === "sale"
                                ? item.quantity * -1
                                : item.quantity}
                        </TableCell>
                        <TableCell>
                            <NumberFlow
                                value={item.price}
                                format={{ style: "currency", currency: currency }}
                            />
                        </TableCell>
                        <TableCell>
                            {(item.tax * 100)?.toFixed(0) ??
                                0}%
                        </TableCell>

                        <TableCell>
                            <NumberFlow
                                value={item.total}
                                format={{ style: "currency", currency: currency }}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default FinancialTransactions;
