import { z } from "zod";

export const orderItemSchema = z.object({
    item_id: z.string().min(1, "Please select an item"),
    quantity_change: z.coerce.number().min(1, "Quantity must be at least 1"),
    item_price: z.coerce.number().optional(),
    item_tax: z.coerce.number().optional(),
    item_type: z.enum(["product", "part", "service"]).optional(),
});

export const orderItemsSchema = z.object({
    order_items: z.array(orderItemSchema),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

const itemSchema = z.object({
    item_id: z.string(),
    item_name: z.string().optional(),
    quantity_change: z.coerce.number().multipleOf(0.01).optional(),
    quantity_after: z.coerce.number().multipleOf(0.01).optional(),
    item_type: z.string(),
});
const pricedItemSchema = z.object({
    item_type: z.string(),
    item_id: z.string(),
    item_name: z.string().optional(),
    quantity_change: z.coerce.number().multipleOf(0.01).optional(),
    item_price: z.coerce.number().multipleOf(0.01).optional(),
    item_tax: z.coerce.number().multipleOf(0.01).optional(),
    quantity_after: z.coerce.number().multipleOf(0.01).optional(),
});

export type ItemChange = z.infer<typeof pricedItemSchema>;

// Move schemas to a separate file: schemas.ts
export const saleFormSchema = z.object({
    warehouse_id: z.string().min(1, "Please select a warehouse"),
    order_type: z.enum(["sale"]), // Add validation for order_type
    order_items: z.array(orderItemSchema),
    consumed_items: z.array(pricedItemSchema),
});

// Move schemas to a separate file: schemas.ts
export const shipmentFormSchema = z.object({
    from_warehouse_id: z.string().min(1, "Please select a warehouse"),
    to_warehouse_id: z.string().min(1, "Please select a warehouse").optional(),
    order_type: z.enum(["shipment"]), // Add validation for order_type
    order_items: z.array(orderItemSchema),
    from_items: z.array(itemSchema),
    to_items: z.array(itemSchema),
});

export const purchaseFormSchema = z.object({
    warehouse_id: z.string().min(1, "Please select a warehouse"),
    order_type: z.enum(["purchase"]), // Add validation for order_type
    order_items: z.array(orderItemSchema),
});

// Move schemas to a separate file: schemas.ts
export const buildFormSchema = z.object({
    warehouse_id: z.string().min(1, "Please select a warehouse"),
    order_type: z.enum(["purchase", "sale"]), // Add validation for order_type
    order_items: z.array(orderItemSchema),
    produced_items: z.array(pricedItemSchema),
    consumed_items: z.array(pricedItemSchema),
});

export type SaleFormData = z.infer<typeof saleFormSchema>;
export type PurchaseFormData = z.infer<typeof purchaseFormSchema>;
export type BuildFormData = z.infer<typeof buildFormSchema>;
export type ShipmentFormData = z.infer<typeof shipmentFormSchema>;
