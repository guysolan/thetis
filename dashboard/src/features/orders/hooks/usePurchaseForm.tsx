import { useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useSelectWarehouseItems } from "../../warehouses/api/selectWarehouseItems";
import { useSelectItemsView } from "../../items/api/selectItemsView";
import { ItemChange, OrderItem } from "../components/OrderForm";

export const usePurchaseForm = (
    control: Control<any>,
    setValue: UseFormSetValue<any>,
) => {
    const { data: items } = useSelectItemsView();
    const { data: warehouseItems } = useSelectWarehouseItems();

    // Watch for changes in relevant form fields
    const producedItems = useWatch({ control, name: "produced_items" });
    const selectedWarehouse = useWatch({ control, name: "warehouse_id" });

    useEffect(() => {
        if (!producedItems || !items || !warehouseItems) return;

        // If no warehouse is selected, treat all items as purchase items
        if (!selectedWarehouse) {
            setValue("consumed_items", []);
            setValue("order_items", producedItems);
            return;
        }

        // Get items available in selected warehouse
        const warehouseStock = warehouseItems.filter(
            (w) => String(w.warehouse_id) === String(selectedWarehouse),
        );

        // Calculate required quantities and check stock
        const { consumedItems, purchaseItems } = processOrderItems({
            producedItems,
            items,
            warehouseStock,
        });

        console.log(purchaseItems);

        // Update form with processed items
        setValue("consumed_items", consumedItems);
        setValue("order_items", purchaseItems);
    }, [producedItems, items, warehouseItems, selectedWarehouse, setValue]);
};

interface ProcessOrderItemsParams {
    producedItems: ItemChange[];
    items: any[]; // Replace with proper type
    warehouseStock: any[]; // Replace with proper type
}

function processOrderItems(
    { producedItems, items, warehouseStock }: ProcessOrderItemsParams,
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
            const stockItem = warehouseStock.find(
                (w) => String(w.item_id) === String(component.component_id),
            );

            const requiredQuantity = (Number(component.component_quantity) *
                Number(producedItem.quantity_change))?.toFixed(2);

            console.log(requiredQuantity, component.component_quantity, producedItem.quantity_change);
            if (!stockItem || stockItem.item_quantity < requiredQuantity) {
                // Check if component already exists in purchaseItems
                const existingPurchaseItem = purchaseItems.find(
                    (item) =>
                        String(item.item_id) === String(component.component_id),
                );

                if (existingPurchaseItem) {
                    // Update quantity if component already exists
                    existingPurchaseItem.quantity_change += Number(requiredQuantity);
                } else {
                    // Add new purchase item if it doesn't exist
                    purchaseItems.push({
                        item_id: String(component.component_id),
                        quantity_change: Number(requiredQuantity),
                        item_price: component?.component_price || 0,
                        item_tax: component?.component_tax || 0.2,
                        item_type: component?.component_type || "part",
                    });
                }
            } else {
                // Check if component already exists in consumedItems
                const existingConsumedItem = consumedItems.find(
                    (item) =>
                        String(item.item_id) === String(component.component_id),
                );

                if (existingConsumedItem) {
                    // Update quantities if component already exists
                    existingConsumedItem.quantity_change -= Number(requiredQuantity);
                    existingConsumedItem.quantity_after =
                        Number(existingConsumedItem.quantity_before) +
                       Number(existingConsumedItem.quantity_change);
                } else {
                    // Add new consumed item if it doesn't exist
                    consumedItems.push({
                        item_id: String(component.component_id),
                        item_name: component.component_name,
                        item_type: component?.component_type || "part",
                        quantity_change: Number(requiredQuantity),
                    });
                }
            }
        });
    });

    return { consumedItems, purchaseItems };
}
