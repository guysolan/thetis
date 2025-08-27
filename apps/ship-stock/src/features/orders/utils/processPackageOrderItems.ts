import { ItemView } from "../../items/types";
import { OrderItem } from "../schema";

import {
    DisplayItem,
    OrderItemChange,
    ProcessedItems,
    ProcessOrderItemsParams,
} from "../types";

const processPackageComponents = (
    item: ItemView,
    orderItem: OrderItem,
    fromShippingAddressId: string,
    toShippingAddressId: string,
    processedComponents: Map<string, number>,
): { fromItems: OrderItemChange[]; toItems: OrderItemChange[] } => {
    console.log("Processing package components:", {
        item,
        orderItem,
        components: item.components,
    });

    const fromItems: OrderItemChange[] = [];
    const toItems: OrderItemChange[] = [];

    if (!item.components) {
        console.log("No components found for package");
        return { fromItems, toItems };
    }

    for (const component of item.components) {
        console.log("Processing component:", component);

        const componentQuantity = component.component_quantity *
            Number(orderItem.quantity_change);
        const componentId = String(component.component_id);
        const componentType = component.component_type;

        console.log("Component details:", {
            componentQuantity,
            componentId,
            componentType,
        });

        if (["package", "service"].includes(componentType)) {
            console.log("Skipping package/service component");
            continue;
        }

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

    console.log("Package components processed:", {
        fromItems,
        toItems,
        processedComponents: Array.from(processedComponents.entries()),
    });

    return { fromItems, toItems };
};

export const processPackageOrderItems = ({
    orderItems,
    items,
    fromStockLevels,
    fromShippingAddressId,
    toShippingAddressId,
}: ProcessOrderItemsParams): ProcessedItems => {
    console.log("Processing with:", {
        orderItems: orderItems,
        itemsCount: items?.length,
        fromStockLevels,
        addresses: { from: fromShippingAddressId, to: toShippingAddressId },
    });

    if (!orderItems?.length) {
        return { fromItems: [], toItems: [], displayItems: [] };
    }

    const fromItems: OrderItemChange[] = [];
    const toItems: OrderItemChange[] = [];
    const displayItems: DisplayItem[] = [];
    const processedComponents = new Map<string, number>();

    // Process each order item
    orderItems.forEach((orderItem) => {
        console.log("Processing order item:", orderItem);

        const item = items?.find((w) =>
            String(w.item_id) === String(orderItem.item_id)
        );
        console.log("Found matching item:", item);

        if (!item) return;

        if (item.item_type === "package") {
            console.log("Processing as package");
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
            console.log("Processing as single item");
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

    console.log("Before processing components:", {
        fromItems,
        toItems,
        processedComponents: Array.from(processedComponents.entries()),
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

    console.log("Final result:", { fromItems, toItems, displayItems });
    return { fromItems, toItems, displayItems };
};
