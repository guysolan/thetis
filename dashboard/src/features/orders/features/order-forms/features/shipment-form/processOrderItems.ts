import { ItemView } from "../../../../../items/types";
import { OrderItem } from "../../schema";

import {
    DisplayItem,
    OrderItemChange,
    ProcessedItems,
    ProcessOrderItemsParams,
} from "../../types";

const processPackageComponents = (
    item: ItemView,
    orderItem: OrderItem,
    fromShippingAddressId: string,
    toShippingAddressId: string,
    processedComponents: Map<string, number>,
): { fromItems: OrderItemChange[]; toItems: OrderItemChange[] } => {
    const fromItems: OrderItemChange[] = [];
    const toItems: OrderItemChange[] = [];

    if (!item.components) return { fromItems, toItems };

    for (const component of item.components) {
        const componentQuantity = component.component_quantity *
            Number(orderItem.quantity_change);
        const componentId = String(component.component_id);
        const componentType = component.component_type;

        if (["package", "service"].includes(componentType)) continue;

        const currentTotal = processedComponents.get(componentId) || 0;
        processedComponents.set(componentId, currentTotal + componentQuantity);

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

    return { fromItems, toItems };
};

export const processOrderItems = ({
    orderItems,
    items,
    fromStockLevels,
    fromShippingAddressId,
    toShippingAddressId,
}: ProcessOrderItemsParams): ProcessedItems => {
    if (!orderItems?.length) {
        return { fromItems: [], toItems: [], displayItems: [] };
    }

    const fromItems: OrderItemChange[] = [];
    const toItems: OrderItemChange[] = [];
    const displayItems: DisplayItem[] = [];
    const processedComponents = new Map<string, number>();

    // Process each order item
    orderItems.forEach((orderItem) => {
        const item = items?.find((w) =>
            String(w.item_id) === String(orderItem.item_id)
        );
        if (!item) return;

        if (item.item_type === "package") {
            const { fromItems: packageFromItems, toItems: packageToItems } =
                processPackageComponents(
                    item,
                    orderItem,
                    fromShippingAddressId,
                    toShippingAddressId,
                    processedComponents,
                );
            fromItems.push(...packageFromItems);
            toItems.push(...packageToItems);
        } else {
            const quantityChange = Number(orderItem.quantity_change);

            fromItems.push({
                item_id: String(orderItem.item_id),
                quantity_change: -quantityChange,
                item_type: item.item_type,
                item_price: 0,
                item_tax: 0,
                address_id: String(fromShippingAddressId),
            });

            toItems.push({
                item_id: String(orderItem.item_id),
                quantity_change: quantityChange,
                item_type: item.item_type,
                item_price: 0,
                item_tax: 0,
                address_id: String(toShippingAddressId),
            });

            processedComponents.set(
                String(orderItem.item_id),
                (processedComponents.get(String(orderItem.item_id)) || 0) +
                    quantityChange,
            );
        }
    });

    // Update quantities and create display items
    processedComponents.forEach((totalQuantity, itemId) => {
        const item = items.find((w) => String(w.item_id) === itemId);
        if (!item) return;

        const currentStock = fromStockLevels[itemId] || 0;
        const quantityAfter = currentStock - totalQuantity;

        const fromItem = fromItems.find((item) =>
            String(item.item_id) === itemId
        );
        if (fromItem) {
            fromItem.quantity_after = quantityAfter;
            fromItem.item_name = item.item_name;
        }

        displayItems.push({
            item_id: itemId,
            item_name: item.item_name,
            quantity_change: totalQuantity,
            quantity_after: quantityAfter,
            item_type: item.item_type,
        });
    });

    return { fromItems, toItems, displayItems };
};
