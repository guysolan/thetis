import { extractOrderItems } from "../order-forms/hooks/useOrderItems";
import { formatCreateOrderArguments } from "../order-forms/utils/formatCreateOrderArguments";
import { FormatOrderItemChanges } from "../order-forms/utils/formatCreateOrderArguments";
import { MultiOrderFormData } from "./schema";

export const processBuyFormData = (formData: MultiOrderFormData) => {
    let item_changes: unknown[] = [];
    if (formData.item_type === "part") {
        formData.consumed_items = [];
        formData.produced_items = [];
        item_changes = formData.order_items;
    } else {
        item_changes = [
            ...formData.consumed_items,
            // Positive order items to record the prices of items
            ...formData.order_items.map((item) => ({
                ...item,
                quantity_change: Math.abs(Number(item.quantity_change)),
            })),
            // Negative order items as the produced items need to be created
            ...formData.order_items.map((item) => ({
                ...item,
                quantity_change: -1 * Math.abs(Number(item.quantity_change)),
                item_price: 0,
                item_tax: 0,
            })),
            // Produced Items added
            ...formData.produced_items.map((item) => ({
                ...item,
                quantity_change: Math.abs(Number(item.quantity_change)),
                item_price: 0,
                item_tax: 0,
            })),
        ];
    }

    const orderItems = item_changes.map((ic: any) => ({
        item_id: ic.item_id,
        quantity_change: Number(ic.quantity_change),
        item_price: ic?.item_price ?? 0,
        item_tax: ic?.item_tax ?? 0,
        address_id: formData.to_shipping_address_id,
        item_type: ic.item_type,
    }));

    return orderItems;
};

export function processSellFormData(
    formData: MultiOrderFormData,
) {
    const orderItems = extractOrderItems(
        formData.order_items,
        formData.mode,
        formData.order_type,
    );
    const itemChanges: FormatOrderItemChanges[] = orderItems.map((i) => ({
        item_id: i.item_id,
        quantity_change: i.quantity_change,
        item_price: i.item_price ?? 0,
        item_tax: i.item_tax ?? 0,
        address_id: formData.from_shipping_address_id,
    }));
    return itemChanges;
}

export const processShipmentFormData = (formData: MultiOrderFormData) => {
    const fromItems = formData.from_items.map((item: any) => ({
        ...item,
        item_price: null,
        item_tax: null,
        address_id: formData.from_shipping_address_id,
    }));
    const orderItems = formData.order_items.map((item: any) => ({
        ...item,
        item_price: null,
        item_tax: null,
        address_id: formData.from_shipping_address_id,
    }));
    const toItems = formData.to_items.map((item: any) => ({
        ...item,
        item_price: null,
        item_tax: null,
        address_id: formData.to_shipping_address_id,
    }));

    return [...fromItems, ...toItems, ...orderItems];
};

export const processMultiOrderFormData = (formData: MultiOrderFormData) => {
    console.log(formData);
    let itemChanges: FormatOrderItemChanges[] = [];
    if (formData.order_type === "purchase") {
        itemChanges = processBuyFormData(formData);
    }
    if (formData.order_type === "sale") {
        itemChanges = processSellFormData(formData);
    }
    if (formData.order_type === "shipment") {
        itemChanges = processShipmentFormData(formData);
    }
    if (formData.order_type === "stocktake") {
        return formData;
    }
    console.log(itemChanges);
    const processedData = formatCreateOrderArguments(itemChanges, formData);
    console.log(processedData);
    return processedData;
};
