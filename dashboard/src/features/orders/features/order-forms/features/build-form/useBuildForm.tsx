import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelectItemsByAddress } from "../../../../../stockpiles/api/selectItemsByAddress";
import { useSelectItemsView } from "../../../../../items/api/selectItemsView";
import { ItemChange, OrderItem } from "../../schema";

export const useBuildForm = () => {
    const { setValue, watch } = useFormContext();
    const { data: items } = useSelectItemsView();
    const { data: addressItems } = useSelectItemsByAddress();

    // Watch for changes in relevant form fields
    const producedItems = watch("produced_items");
    const selectedAddress = watch("from_shipping_address_id");

    useEffect(() => {
        if (!producedItems || !items || !addressItems) return;

        // If no address is selected, split items between services and consumed
        if (!selectedAddress) {
            const { serviceItems, nonServiceItems } = producedItems.reduce(
                (acc, item) => {
                    const product = items.find((p) =>
                        String(p.item_id) === String(item.item_id)
                    );
                    if (product?.item_type === "service") {
                        acc.serviceItems.push(item);
                    } else {
                        acc.nonServiceItems.push(item);
                    }
                    return acc;
                },
                { serviceItems: [], nonServiceItems: [] },
            );

            setValue("consumed_items", nonServiceItems);
            setValue("order_items", serviceItems);
            return;
        }

        // Get items available in selected address
        const addressStock = addressItems.filter(
            (w) => String(w.address_id) === String(selectedAddress),
        );

        // Calculate required quantities and check stock
        const { consumedItems, purchaseItems } = processOrderItems({
            producedItems,
            items,
            addressStock,
        });

        // Split purchaseItems between services and consumed
        const { serviceItems, nonServiceItems } = purchaseItems.reduce(
            (acc, item) => {
                const product = items.find((p) =>
                    String(p.item_id) === String(item.item_id)
                );
                if (product?.item_type === "service") {
                    acc.serviceItems.push(item);
                } else {
                    // Convert purchase item to consumed item format
                    acc.nonServiceItems.push({
                        item_id: item.item_id,
                        item_name: product?.item_name,
                        item_type: product?.item_type || "part",
                        quantity_change: -item.quantity_change, // Negative because it's consumed
                    });
                }
                return acc;
            },
            { serviceItems: [], nonServiceItems: [] },
        );

        // Combine all consumed items
        const allConsumedItems = [...consumedItems, ...nonServiceItems];

        // Update form with processed items
        setValue("consumed_items", allConsumedItems);
        setValue("order_items", serviceItems);
    }, [producedItems, items, addressItems, selectedAddress, setValue]);
};

interface ProcessOrderItemsParams {
    producedItems: ItemChange[];
    items: any[]; // Replace with proper type
    addressStock: any[]; // Replace with proper type
}

function processOrderItems(
    { producedItems, items, addressStock }: ProcessOrderItemsParams,
) {
    const consumedItems: ItemChange[] = [];
    const purchaseItems: OrderItem[] = [];

    producedItems.forEach((producedItem) => {
        const product = items.find((p) =>
            String(p.item_id) === String(producedItem.item_id)
        );
        if (!product || !product.components) return;

        // Process each component of the product
        product.components.forEach((component) => {
            const stockItem = addressStock.find(
                (w) => String(w.item_id) === String(component.component_id),
            );

            // Calculate required quantity without toFixed to avoid string conversion
            const requiredQuantity = Number(component.component_quantity) *
                Number(producedItem.quantity_change);

            // Get current stock quantity
            const currentStock = stockItem?.item_quantity ?? 0;

            if (!stockItem || currentStock < requiredQuantity) {
                // If we don't have enough stock, split between consumed and purchased
                if (currentStock > 0) {
                    // Consume what we have
                    consumedItems.push({
                        item_id: String(component.component_id),
                        item_name: component.component_name,
                        item_type: component?.component_type || "part",
                        quantity_change: -currentStock,
                    });
                }

                // Purchase what we're missing
                const quantityToPurchase = requiredQuantity - currentStock;
                const existingPurchaseItem = purchaseItems.find(
                    (item) =>
                        String(item.item_id) === String(component.component_id),
                );

                if (existingPurchaseItem) {
                    existingPurchaseItem.quantity_change += quantityToPurchase;
                } else {
                    purchaseItems.push({
                        item_id: String(component.component_id),
                        quantity_change: quantityToPurchase,
                        item_price: component?.component_price || 0,
                        item_tax: component?.component_tax || 0.2,
                        item_type: component?.component_type || "part",
                    });
                }
            } else {
                // We have enough stock, just consume it
                const existingConsumedItem = consumedItems.find(
                    (item) =>
                        String(item.item_id) === String(component.component_id),
                );

                if (existingConsumedItem) {
                    existingConsumedItem.quantity_change =
                        (existingConsumedItem.quantity_change ?? 0) -
                        requiredQuantity;
                } else {
                    consumedItems.push({
                        item_id: String(component.component_id),
                        item_name: component.component_name,
                        item_type: component?.component_type || "part",
                        quantity_change: -requiredQuantity,
                    });
                }
            }
        });
    });

    return { consumedItems, purchaseItems };
}