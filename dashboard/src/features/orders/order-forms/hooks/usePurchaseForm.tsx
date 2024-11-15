import { useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useSelectItemsByAddress } from "../../../../stockpiles/api/selectItemsByAddress";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";
import { ItemChange, OrderItem, PurchaseFormData } from "../schema";
import { ItemType, ItemView } from "../../../../items/types";

export const usePurchaseForm = (
    control: Control<PurchaseFormData>,
    setValue: UseFormSetValue<PurchaseFormData>,
) => {
    const { data: items } = useSelectItemsView();
    const { data: addressItems } = useSelectItemsByAddress();

    const producedItems = useWatch({ control, name: "order_items" });
    const selectedAddress = useWatch({
        control,
        name: "from_shipping_address_id",
    });

    useEffect(() => {
        if (!producedItems || !items || !addressItems) return;

        if (!selectedAddress) {
            setValue("order_items", producedItems);
            return;
        }

        const addressStock = addressItems.filter(
            (w) => String(w.address_id) === selectedAddress,
        );

        const purchaseItems = processOrderItems({
            producedItems,
            // @ts-expect-error
            items,
            addressStock,
        });

        setValue("order_items", purchaseItems);
    }, [producedItems, items, addressItems, selectedAddress, setValue]);
};

interface ProcessOrderItemsParams {
    producedItems: OrderItem[];
    items: Array<{
        item_id: string;
        components?: Array<{
            component_id: string;
            component_name: string;
            component_quantity: number;
            component_type?: string;
            component_price?: number;
            component_tax?: number;
        }>;
    }>;
    addressStock: Array<{
        address_id: string;
        item_id: string;
        item_quantity: number;
    }>;
}

function processOrderItems(
    { producedItems, items, addressStock }: ProcessOrderItemsParams,
): OrderItem[] {
    const purchaseItems: OrderItem[] = [];

    producedItems.forEach((producedItem) => {
        const product = items.find((p) =>
            String(p.item_id) === String(producedItem.item_id)
        );
        if (!product || !product.components) return;

        product.components.forEach((component) => {
            const stockItem = addressStock.find(
                (w) => String(w.item_id) === String(component.component_id),
            );

            const requiredQuantity = Number(component.component_quantity) *
                Number(producedItem.quantity_change);

            const currentStock = stockItem?.item_quantity ?? 0;

            if (!stockItem || currentStock < requiredQuantity) {
                if (currentStock > 0) {
                    purchaseItems.push({
                        item_id: String(component.component_id),
                        quantity_change: -currentStock,
                        item_price: component?.component_price || 0,
                        item_tax: component?.component_tax || 0.2,
                        item_type: (component?.component_type ||
                            "part") as ItemType,
                    });
                }

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
                        item_type:
                            (component?.component_type || "part") as ItemType,
                    });
                }
            } else {
                const existingConsumedItem = purchaseItems.find(
                    (item) =>
                        String(item.item_id) === String(component.component_id),
                );

                if (existingConsumedItem) {
                    existingConsumedItem.quantity_change -= requiredQuantity;
                } else {
                    purchaseItems.push({
                        item_id: String(component.component_id),
                        quantity_change: -requiredQuantity,
                        item_price: component?.component_price || 0,
                        item_tax: component?.component_tax || 0.2,
                        item_type:
                            (component?.component_type || "part") as ItemType,
                    });
                }
            }
        });
    });

    return purchaseItems;
}
