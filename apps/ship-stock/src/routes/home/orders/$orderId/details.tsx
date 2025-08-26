import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import {
    OrderWithDetails,
    useSelectOrderById,
} from "@/features/orders/api/selectOrderById";
import { useSelectAddresses } from "@/features/stockpiles/api/selectAddresses";
import { useSelectItems } from "@/features/items/api/selectItems";
import { EditableOrderItemChange } from "@/features/orders/components/EditableOrderItemChange";
import { EditableItemChange } from "@/features/orders/components/EditableItemChange";
import { EditableOrder } from "@/features/orders/components/EditableOrder";
import { ComboboxOption } from "@/components/Combobox";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Badge } from "@thetis/ui/badge";
import { Separator } from "@thetis/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@thetis/ui/accordion";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/home/orders/$orderId/details")({
    component: RouteComponent,
});

// Types for flow display
type FlowItem = {
    quantity: number;
    price: number;
    from?: string;
    to?: string;
    address?: string;
    isStandalone?: boolean;
};

// Helper function to create flow items
const createFlows = (
    orderItemChanges: OrderWithDetails["order_item_changes"],
): FlowItem[] => {
    const positiveChanges = orderItemChanges.filter(
        (change) => change.item_changes.quantity_change > 0,
    );
    const negativeChanges = orderItemChanges.filter(
        (change) => change.item_changes.quantity_change < 0,
    );

    const flows: FlowItem[] = [];

    if (positiveChanges.length > 0 && negativeChanges.length > 0) {
        negativeChanges.forEach((negChange) => {
            positiveChanges.forEach((posChange) => {
                flows.push({
                    quantity: Math.abs(negChange.item_changes.quantity_change),
                    price: negChange.price || posChange.price || 0,
                    from: negChange.item_changes.addresses?.name || "Unknown",
                    to: posChange.item_changes.addresses?.name || "Unknown",
                });
            });
        });
    } else {
        orderItemChanges.forEach((change) => {
            flows.push({
                quantity: change.item_changes.quantity_change,
                price: change.price || 0,
                address: change.item_changes.addresses?.name || "Unknown",
                isStandalone: true,
            });
        });
    }

    return flows;
};

// Helper function to render flow badge
const renderFlowBadge = (
    flow: FlowItem,
    currency: string,
    itemId: string,
    idx: number,
) => {
    if (flow.isStandalone) {
        return (
            <Badge variant="outline" className="text-xs">
                {flow.quantity > 0 ? "+" : ""}
                {flow.quantity} units @ {currency}
                {flow.price.toFixed(2)} • {flow.address}
            </Badge>
        );
    }

    return (
        <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline">
                {flow.quantity} units @ {flow.price.toFixed(2)} {currency}
            </Badge>
            <span className="font-medium text-muted-foreground">
                {flow.from}
            </span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">{flow.to}</span>
        </div>
    );
};

function RouteComponent() {
    const { orderId } = Route.useParams();
    const { data: order } = useSelectOrderById(orderId);
    
    // Type assertion to ensure we have the correct data structure
    if (order && !order.order_item_changes) {
        console.error('Received incorrect data structure - missing order_item_changes', order);
        throw new Error('Data structure mismatch: Expected OrderWithDetails but received different structure');
    }
    const { data: addresses } = useSelectAddresses();
    const { data: items } = useSelectItems();

    // Convert addresses to combobox options
    const addressOptions: ComboboxOption[] = React.useMemo(
        () =>
            addresses?.map((address) => ({
                value: address.id.toString(),
                label: address.name || `${address.line_1}, ${address.city}` ||
                    "Unnamed Address",
            })) || [],
        [addresses],
    );

    // Convert item_changes from this order to combobox options for package selection
    const packageItemOptions: ComboboxOption[] = React.useMemo(
        () => {
            if (!order) return [];

            // Get all item_changes from this order that could be packages
            // The package_item_change_id references item_changes.id, not items.id
            const itemChangeOptions = order.order_item_changes
                .map((orderItemChange) => ({
                    value: orderItemChange.item_change_id.toString(),
                    label: `${orderItemChange.item_changes.items.name} (${
                        orderItemChange.item_changes.quantity_change > 0
                            ? "+"
                            : ""
                    }${orderItemChange.item_changes.quantity_change} @ ${
                        orderItemChange.item_changes.addresses?.name ||
                        "Unknown Address"
                    })`,
                    itemChange: orderItemChange.item_changes,
                }))
                // Remove duplicates by item_change_id
                .filter((option, index, self) =>
                    index === self.findIndex((o) => o.value === option.value)
                );

            return itemChangeOptions;
        },
        [order],
    );

    // Group order item changes by item_id
    const groupedOrderItems = React.useMemo(() => {
        if (!order) return {};

        return order.order_item_changes.reduce((acc, orderItemChange) => {
            const itemId = orderItemChange.item_changes.items.id;
            if (!acc[itemId]) {
                acc[itemId] = {
                    item: orderItemChange.item_changes.items,
                    orderItemChanges: [],
                };
            }
            acc[itemId].orderItemChanges.push(orderItemChange);
            return acc;
        }, {} as Record<number, {
            item: typeof order.order_item_changes[0]["item_changes"]["items"];
            orderItemChanges: typeof order.order_item_changes;
        }>);
    }, [order]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6 mx-auto p-6 container">
            {/* Order Header */}
            <section className="flex items-center gap-2">
                <h1 className="font-bold text-2xl">Order #{order.id}</h1>
                <Badge variant="outline">{order.order_type}</Badge>
            </section>

            {/* Editable Order Information */}
            <EditableOrder order={order} />

            {/* Order Items */}
            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" className="space-y-4 w-full">
                        {Object.entries(groupedOrderItems).map(
                            ([itemId, { item, orderItemChanges }]) => {
                                const flows = createFlows(orderItemChanges);

                                return (
                                    <AccordionItem
                                        key={itemId}
                                        value={itemId}
                                        className=""
                                    >
                                        <AccordionTrigger className="px-4 py-4">
                                            <div className="flex justify-between items-center mr-4 w-full">
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {item.type}
                                                    </Badge>
                                                    <span className="font-semibold text-base">
                                                        {item.name}
                                                    </span>
                                                    {item.sku && (
                                                        <span className="text-muted-foreground text-sm">
                                                            ({item.sku})
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Flow display moved to right */}
                                                <div className="flex items-center gap-2">
                                                    {flows.map((flow, idx) => (
                                                        <div
                                                            key={`flow-${itemId}-${idx}-${flow.quantity}`}
                                                            className="flex items-center gap-2"
                                                        >
                                                            {renderFlowBadge(
                                                                flow,
                                                                order
                                                                    .currency ||
                                                                    "£",
                                                                itemId,
                                                                idx,
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-4 pb-4">
                                            <div className="space-y-6">
                                                {/* Item Information */}
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-base">
                                                            Item Information
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="gap-4 grid grid-cols-2 md:grid-cols-4 text-sm">
                                                            <div>
                                                                <p className="font-medium">
                                                                    Name
                                                                </p>
                                                                <p className="text-muted-foreground">
                                                                    {item.name}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">
                                                                    SKU
                                                                </p>
                                                                <p className="text-muted-foreground">
                                                                    {item.sku ||
                                                                        "N/A"}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">
                                                                    Base Price
                                                                </p>
                                                                <p className="text-muted-foreground">
                                                                    {item
                                                                        .price ||
                                                                        "N/A"}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">
                                                                    HS Code
                                                                </p>
                                                                <p className="text-muted-foreground">
                                                                    {item
                                                                        .hs_code ||
                                                                        "N/A"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                {/* Order Item Changes for this item */}
                                                {orderItemChanges.map((
                                                    orderItemChange,
                                                    changeIndex,
                                                ) => (
                                                    <div
                                                        key={`${orderItemChange.order_id}-${orderItemChange.item_change_id}`}
                                                        className="space-y-4"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-medium text-md">
                                                                Change
                                                                #{changeIndex +
                                                                    1}
                                                            </h4>
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                Qty:{" "}
                                                                {orderItemChange
                                                                    .item_changes
                                                                    .quantity_change}
                                                            </Badge>
                                                        </div>

                                                        <div className="gap-6 grid md:grid-cols-2">
                                                            {/* Order Item Change */}
                                                            <div>
                                                                <h5 className="mb-3 font-medium text-sm">
                                                                    Order Item
                                                                    Details
                                                                </h5>
                                                                <EditableOrderItemChange
                                                                    orderItemChange={orderItemChange}
                                                                    orderId={orderId}
                                                                    itemOptions={packageItemOptions}
                                                                />
                                                            </div>

                                                            {/* Item Change */}
                                                            <div>
                                                                <h5 className="mb-3 font-medium text-sm">
                                                                    Item Change
                                                                    Details
                                                                </h5>
                                                                <EditableItemChange
                                                                    orderItemChange={orderItemChange}
                                                                    orderId={orderId}
                                                                    addressOptions={addressOptions}
                                                                />
                                                            </div>
                                                        </div>

                                                        {changeIndex <
                                                                orderItemChanges
                                                                        .length -
                                                                    1 && (
                                                            <Separator className="my-4" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            },
                        )}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
