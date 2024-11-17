import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelectItemsByAddress } from "../../../../../stockpiles/api/selectItemsByAddress";
import { useSelectItemsView } from "../../../../../items/api/selectItemsView";
import { ItemChange, OrderItem } from "../../schema";

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

    console.log("Stock calculation:", {
        componentId,
        baseStock: stockItem?.item_quantity || 0,
        producedQuantity,
        total: (stockItem ? parseFloat(String(stockItem.item_quantity)) : 0) +
            producedQuantity,
    });

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
    console.log("Processing component:", {
        component,
        producedQuantity,
        addressStockLength: addressStock.length,
    });

    if (component.component_type === "service") {
        const serviceItem = createServiceItem(
            component,
            calculateRequiredQuantity(
                component.component_quantity,
                producedQuantity,
            ),
        );
        console.log("Created service item:", serviceItem);
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

    console.log("Stock check:", {
        componentId: component.component_id,
        requiredQuantity,
        currentStock,
    });

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

// useBuildForm should do the following:
// 1. For every produced item,
// // a. Add the item quantity to the consumed items
// // // i. If the item is a part, add the item quantity, price, and tax to the order_items
// // b. For each component of the item
// // // i. If the component is a service, add it to the order_items
// // // ii. If the component is a part,
// // // // x. Subtract the component_qty x item_qty from the consumed items
// 2. Find the stock level of each item at the selected address
// 3. Set the form values for consumed quantities of before, during, and after for the consumed items at the address
// 4. Set the form values for the order items

export const useBuildForm = () => {
    const { setValue, watch } = useFormContext();
    const { data: items } = useSelectItemsView();
    const { data: addressItems } = useSelectItemsByAddress();

    const producedItems = watch("produced_items");
    const selectedAddress = watch("from_shipping_address_id");

    useEffect(() => {
        if (!producedItems || !items || !addressItems) return;

        // 1. Process all produced items and their components
        const { consumedItems, orderItems } = processOrderItems(
            producedItems,
            items,
        );

        // 2. Find stock levels at selected address
        const addressStock = addressItems.filter(
            (item) => String(item.address_id) === String(selectedAddress),
        );

        // 3. Calculate before, during, and after quantities
        const stockLevels = consumedItems.map((item) => {
            const currentStock = findStockLevel(
                item.item_id,
                addressStock,
                producedItems,
                items,
            );

            return {
                item_id: item.item_id,
                before_quantity: currentStock,
                during_quantity: item.quantity_change,
                after_quantity: currentStock + item.quantity_change,
            };
        });

        // 4. Set form values
        setValue("stock_levels", stockLevels);
        setValue("consumed_items", consumedItems);
        setValue("order_items", orderItems);
    }, [producedItems, items, addressItems, selectedAddress, setValue]);
};

const consolidateConsumedItems = (items: ItemChange[]): ItemChange[] => {
    const totals = items.reduce((acc, item) => {
        const key = item.item_id;
        if (!acc[key]) {
            acc[key] = { ...item };
        } else {
            acc[key].quantity_change += item.quantity_change;
        }
        return acc;
    }, {} as Record<string, ItemChange>);

    return Object.values(totals);
};

function processOrderItems(producedItems: ItemChange[], items: any[]) {
    const consumedItems: ItemChange[] = [];
    const orderItems: OrderItem[] = [];

    producedItems.forEach((producedItem) => {
        console.log("producedItem", producedItem);

        const itemInView = items.find((p) =>
            String(p.item_id) === String(producedItem.item_id)
        );
        if (!itemInView) return;

        // 1.a. Add the produced item to consumed items
        consumedItems.push({
            item_id: String(itemInView.item_id),
            item_name: itemInView.item_name,
            item_type: itemInView.item_type,
            quantity_change: producedItem.quantity_change,
        });

        // 1.a.i. If it's a part, add to order_items
        if (itemInView.item_type === "part") {
            orderItems.push({
                item_id: String(itemInView.item_id),
                quantity_change: producedItem.quantity_change,
                item_price: itemInView.item_price || 0,
                item_tax: itemInView.item_tax || 0.2,
                item_type: "part",
            });
        }

        // 1.b. Process each component
        (itemInView.components || []).forEach((component) => {
            const requiredQuantity = calculateRequiredQuantity(
                component.component_quantity,
                producedItem.quantity_change,
            );

            // 1.b.i. If component is a service, add to order_items
            if (component.component_type === "service") {
                orderItems.push({
                    item_id: String(component.component_id),
                    quantity_change: requiredQuantity,
                    item_price: component.component_price || 0,
                    item_tax: component.component_tax || 0.2,
                    item_type: "service",
                });
            } // 1.b.ii. If component is a part, subtract from consumed items
            else {
                consumedItems.push({
                    item_id: String(component.component_id),
                    item_name: component.component_name,
                    item_type: "part",
                    quantity_change: -requiredQuantity,
                });
            }
        });
    });

    console.log("consumedItems", consumedItems);

    // Consolidate consumed items with same item_id
    const consolidatedConsumedItems = consolidateConsumedItems(consumedItems);

    return { consumedItems: consolidatedConsumedItems, orderItems };
}
