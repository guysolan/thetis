import React from "react";
import type { OrderView } from "../../../types";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import NumberFlow from "@number-flow/react";
import type { Currency } from "../../../../../constants/currencies";

type ItemDetails = {
    item_name?: string;
    sku?: string;
    country_of_origin?: string;
    hs_code?: string;
    tax?: number;
};

type GroupedItem =
    & OrderView["items"][number]
    & ItemDetails
    & {
        totalQuantity: number;
        totalPrice: number;
    };

interface CombinedService {
    item_id: number;
    item_name: string;
    quantity: number;
    price: number;
    tax: number;
    total: number;
}

const Financials = ({
    order,
    currency,
}: {
    order: OrderView;
    currency: Currency;
}) => {
    const { data: items } = useSelectItemsView();

    // Filter and group product items (items with pricing and cost > 0)
    const filteredItems = order.items.filter(
        (item) =>
            item.quantity > 0 && item.item_type !== "service" &&
            (item.price ?? 0) > 0,
    );

    const groupedItems = filteredItems.reduce(
        (acc, orderItem) => {
            const itemDetails = items?.find(
                (item) => item.item_id === orderItem.item_id,
            );

            if (!acc[orderItem.item_id]) {
                const price = orderItem.price ?? 0;
                const quantity = orderItem.quantity;
                const taxRate = orderItem?.tax ?? 0;
                const totalPrice = quantity * price * (1 + taxRate);

                acc[orderItem.item_id] = {
                    ...orderItem,
                    ...itemDetails,
                    totalQuantity: quantity,
                    totalPrice,
                } as GroupedItem;
            } else {
                const price = orderItem.price ?? 0;
                const quantity = orderItem.quantity;
                const taxRate = orderItem?.tax ?? 0;
                const itemTotal = quantity * price * (1 + taxRate);

                acc[orderItem.item_id].totalQuantity += quantity;
                acc[orderItem.item_id].totalPrice += itemTotal;
            }
            return acc;
        },
        {} as Record<string, GroupedItem>,
    );

    const productItems = Object.values(groupedItems).filter(
        (item) => item.totalQuantity > 0,
    );

    // Filter and group service items (exclude services at from_address)
    const serviceItems = order.items.filter(
        (item) =>
            item.item_type === "service" &&
            item.quantity > 0 &&
            (item.address as any)?.id !== order.from_address?.id,
    );

    const combinedServices = serviceItems.reduce<CombinedService[]>(
        (acc, item) => {
            const existingService = acc.find(
                (service) => service.item_id === Number(item.item_id),
            );

            if (existingService) {
                existingService.quantity += item.quantity;
                existingService.total += item.total;
            } else {
                acc.push({
                    item_id: Number(item.item_id),
                    item_name: item.item_name,
                    quantity: item.quantity,
                    price: item.price,
                    tax: item.tax,
                    total: item.total,
                });
            }

            return acc;
        },
        [],
    );

    // Calculate totals
    const itemTotal = productItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
    );
    const servicesTotal = combinedServices.reduce(
        (sum, service) => sum + service.total,
        0,
    );
    const carriageAmount = order.carriage ?? 0;
    const grandTotal = itemTotal + servicesTotal + carriageAmount;

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    });

    const taxFormatter = new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return (
        <div className="mt-8">
            <h2 className="mb-4 font-semibold text-lg">Financials</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black">
                            Description
                        </TableHead>
                        <TableHead className="text-black text-right">
                            Quantity
                        </TableHead>
                        <TableHead className="text-black text-right">
                            Unit Price
                        </TableHead>
                        <TableHead className="text-black text-right">
                            Tax Rate
                        </TableHead>
                        <TableHead className="text-black text-right">
                            Total
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productItems.map((item) => (
                        <TableRow key={item.item_id}>
                            <TableCell className="text-black">
                                {item.item_name}
                            </TableCell>
                            <TableCell className="text-black text-right">
                                {item.totalQuantity}
                            </TableCell>
                            <TableCell className="text-black text-right">
                                <NumberFlow
                                    value={item.price ?? 0}
                                    format={{
                                        style: "currency",
                                        currency: currency,
                                    }}
                                />
                            </TableCell>
                            <TableCell className="text-black text-right">
                                {(item.tax ?? 0) * 100}%
                            </TableCell>
                            <TableCell className="text-black text-right">
                                <NumberFlow
                                    value={item.totalPrice}
                                    format={{
                                        style: "currency",
                                        currency: currency,
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    {combinedServices.map((service) => (
                        <TableRow key={service.item_id}>
                            <TableCell className="text-black">
                                {service.item_name}
                            </TableCell>
                            <TableCell className="text-black text-right">
                                {service.quantity}
                            </TableCell>
                            <TableCell className="text-black text-right">
                                {formatter.format(service.price)}
                            </TableCell>
                            <TableCell className="text-black text-right">
                                {taxFormatter.format(service.tax)}
                            </TableCell>
                            <TableCell className="text-black text-right">
                                {formatter.format(service.total)}
                            </TableCell>
                        </TableRow>
                    ))}
                    {carriageAmount > 0 && (
                        <TableRow className="border-t text-neutral-800">
                            <TableCell className="text-black">
                                Carriage
                            </TableCell>
                            <TableCell colSpan={3} />
                            <TableCell className="text-black text-right">
                                <NumberFlow
                                    value={carriageAmount}
                                    format={{
                                        style: "currency",
                                        currency: currency,
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow className="border-t">
                        <TableCell className="font-semibold text-black">
                            Total
                        </TableCell>
                        <TableCell colSpan={3} />
                        <TableCell className="font-semibold text-black text-right">
                            <NumberFlow
                                value={grandTotal}
                                format={{
                                    style: "currency",
                                    currency: currency,
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default Financials;
