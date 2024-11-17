import { ItemChange, OrderItem } from "../schema";
// Type definitions for clarity
interface Component {
    component_id: string | number;
    component_name: string;
    component_type: "service" | "part";
    component_quantity: number;
    component_price?: number;
    component_tax?: number;
}

// Pure functions for processing
export const calculateRequiredQuantity = (
    componentQuantity: number,
    producedQuantity: number,
): number => {
    return parseFloat(String(componentQuantity)) *
        parseFloat(String(producedQuantity));
};

export const findStockLevel = (
    componentId: string | number,
    addressStock: any[],
    producedItems: ItemChange[] = [],
    items: any[] = [],
): number => {
    const stockItem = addressStock.find(
        (item) => String(item.item_id) === String(componentId),
    );

    // Calculate produced quantity including components from produced items
    const producedQuantity = producedItems.reduce((sum, producedItem) => {
        // Direct production of this component
        if (String(producedItem.item_id) === String(componentId)) {
            sum += producedItem.quantity_change || 0;
        }

        // Production from components of produced items
        const product = items?.find((p) =>
            String(p.item_id) === String(producedItem.item_id)
        );
        if (product?.components) {
            const matchingComponent = product.components.find(
                (c) => String(c.component_id) === String(componentId),
            );
            if (matchingComponent) {
                sum += calculateRequiredQuantity(
                    matchingComponent.component_quantity,
                    producedItem.quantity_change || 0,
                );
            }
        }
        return sum;
    }, 0);

    return (stockItem ? parseFloat(String(stockItem.item_quantity)) : 0) +
        producedQuantity;
};

export const createServiceItem = (
    component: Component,
    requiredQuantity: number,
): OrderItem => ({
    item_id: String(component.component_id),
    quantity_change: requiredQuantity,
    item_price: component.component_price || 0,
    item_tax: component.component_tax || 0.2,
    item_type: "service",
});

export const createConsumedItem = (
    component: Component,
    quantityToConsume: number,
): ItemChange => ({
    item_id: String(component.component_id),
    item_name: component.component_name,
    item_type: component.component_type || "part",
    quantity_change: -quantityToConsume,
});

export const createPurchaseItem = (
    component: Component,
    quantityToPurchase: number,
): OrderItem => ({
    item_id: String(component.component_id),
    quantity_change: quantityToPurchase,
    item_price: component.component_price || 0,
    item_tax: component.component_tax || 0.2,
    item_type: component.component_type || "part",
});

export const processComponent = (
    component: Component,
    producedQuantity: number,
    addressStock: any[],
    producedItems: ItemChange[],
) => {
    if (component.component_type === "service") {
        const serviceItem = createServiceItem(
            component,
            calculateRequiredQuantity(
                component.component_quantity,
                producedQuantity,
            ),
        );
        return {
            consumedItems: [],
            purchaseItems: [serviceItem],
        };
    }

    const requiredQuantity = calculateRequiredQuantity(
        component.component_quantity,
        producedQuantity,
    );
    const currentStock = findStockLevel(
        component.component_id,
        addressStock,
        producedItems,
    );

    if (currentStock >= requiredQuantity) {
        return {
            consumedItems: [createConsumedItem(component, requiredQuantity)],
            purchaseItems: [],
        };
    }

    const result = {
        consumedItems: currentStock > 0
            ? [createConsumedItem(component, currentStock)]
            : [],
        purchaseItems: [
            createPurchaseItem(component, requiredQuantity - currentStock),
        ],
    };

    return result;
};
