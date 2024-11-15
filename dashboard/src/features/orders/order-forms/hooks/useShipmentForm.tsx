import { useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "../../../stockpiles/api/selectItemsByAddress";
import { useSelectItemsView } from "../../../items/api/selectItemsView";
import { OrderItemChange } from "../../api/createOrder";
import { ItemView } from "../../../items/types";
import { OrderItem } from "../../types";

export const useShipmentForm = (
    control: Control<any>,
    setValue: UseFormSetValue<any>,
) => {
    const { data: items } = useSelectItemsView();
    const { data: stockpileItems } = useSelectItemsByAddress();

    const orderItems = useWatch({ control, name: "order_items" });
    const fromShippingAddressId = useWatch({
        control,
        name: "from_shipping_address_id",
    });
    const toShippingAddressId = useWatch({
        control,
        name: "to_shipping_address_id",
    });

    useEffect(() => {
        if (!orderItems?.length || !items || !fromShippingAddressId) {
            setValue("from_items", []);
            setValue("to_items", []);
            setValue("display_items", []);
            return;
        }

        const fromStockLevels = stockpileItems?.[fromShippingAddressId] || {};

        const { fromItems, toItems, displayItems } = processOrderItems({
            orderItems,
            items,
            fromStockLevels,
            fromShippingAddressId,
            toShippingAddressId,
        });

        setValue("from_items", fromItems);
        setValue("to_items", toItems);
        setValue("display_items", displayItems);
    }, [
        orderItems,
        items,
        stockpileItems,
        fromShippingAddressId,
        toShippingAddressId,
    ]);
};

interface DisplayItem {
    item_id: string;
    item_name: string;
    quantity_change: number;
    quantity_after?: number;
    item_type: string;
}

const processOrderItems = ({
    orderItems,
    items,
    fromStockLevels,
    fromShippingAddressId,
    toShippingAddressId,
}: {
    orderItems: OrderItem[];
    items: ItemView[];
    fromStockLevels: Record<string, number>;
    fromShippingAddressId: string;
    toShippingAddressId: string;
}) => {
    if (!orderItems?.length) {
        return { fromItems: [], toItems: [], displayItems: [] };
    }

    const fromItems: OrderItemChange[] = [];
    const toItems: OrderItemChange[] = [];
    const displayItems: DisplayItem[] = [];
    const processedComponents = new Map<string, number>();

    for (const orderItem of orderItems) {
        const item = items?.find(
            (w) => String(w.item_id) === String(orderItem.item_id),
        );

        if (!item) continue;

        if (item.item_type === "package") {
            const packageChange = {
                item_id: String(orderItem.item_id),
                quantity_change: 1,
                item_price: 0,
                item_tax: 0,
                item_type: orderItem.item_type,
                address_id: String(fromShippingAddressId),
                height: orderItem.height,
                width: orderItem.width,
                depth: orderItem.depth,
                weight: orderItem.weight,
            };

            fromItems.push({
                ...packageChange,
                quantity_change: -1,
            });

            toItems.push({
                ...packageChange,
                address_id: String(toShippingAddressId),
            });

            if (item.components) {
                for (const component of item.components) {
                    const componentQuantity = component.component_quantity *
                        Number(orderItem.quantity_change);
                    const componentId = String(component.component_id);

                    const currentTotal = processedComponents.get(componentId) ||
                        0;
                    processedComponents.set(
                        componentId,
                        currentTotal + componentQuantity,
                    );

                    const componentType = component.component_type;

                    if (["package", "service"].includes(componentType)) {
                        break;
                    }

                    fromItems.push({
                        item_id: componentId,
                        quantity_change: -componentQuantity,
                        item_type: componentType,
                        item_price: 0,
                        item_tax: 0,
                        address_id: String(fromShippingAddressId),
                    });

                    toItems.push({
                        item_id: componentId,
                        quantity_change: componentQuantity,
                        item_type: componentType,
                        item_price: 0,
                        item_tax: 0,
                        address_id: String(toShippingAddressId),
                    });
                }
            }
        } else {
            const quantityChange = Number(orderItem.quantity_change);

            fromItems.push({
                item_id: String(orderItem.item_id),
                quantity_change: -quantityChange,
                item_price: 0,
                item_tax: 0,
                item_type: item.item_type,
                address_id: String(fromShippingAddressId),
            });

            toItems.push({
                item_id: String(orderItem.item_id),
                quantity_change: quantityChange,
                item_price: 0,
                item_tax: 0,
                item_type: item.item_type,
                address_id: String(toShippingAddressId),
            });

            processedComponents.set(
                String(orderItem.item_id),
                (processedComponents.get(String(orderItem.item_id)) || 0) +
                    quantityChange,
            );
        }
    }

    for (const [itemId, totalQuantity] of processedComponents.entries()) {
        const item = items.find((w) => String(w.item_id) === itemId);
        if (item) {
            displayItems.push({
                item_id: itemId,
                item_name: item.item_name,
                quantity_change: totalQuantity,
                quantity_after: (fromStockLevels[itemId] || 0) - totalQuantity,
                item_type: item.item_type,
            });
        }
    }

    return { fromItems, toItems, displayItems };
};
