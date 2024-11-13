import { z } from "zod";

export const orderItemSchema = z.object({
    item_id: z.string().min(1, "Please select an item"),
    quantity_change: z.coerce.number().min(0, "Quantity must be at least 1"),
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
    from_address_id: z.string().min(1, "Please select a address"),
    to_address_id: z.string().min(1, "Please select a address"),
    order_type: z.enum(["sale"]), // Add validation for order_type
    order_items: z.array(orderItemSchema),
    order_date: z.date(),
    consumed_items: z.array(pricedItemSchema),
});

// Edit order Schema
export const editOrderSchema = z.object({
    order_type: z.enum(["sale", "shipment", "build", "purchase", "stocktake"]),
    order_date: z.date(),
});

// Move schemas to a separate file: schemas.ts
export const shipmentFormSchema = z.object({
    from_address_id: z.string().min(1, "Please select a address"),
    to_address_id: z.string().min(1, "Please select a address").optional(),
    order_type: z.enum(["shipment"]), // Add validation for order_type
    order_items: z.array(orderItemSchema),
    order_date: z.date(),
    from_items: z.array(itemSchema),
    to_items: z.array(itemSchema),
});

export const purchaseFormSchema = z.object({
    address_id: z.string().min(1, "Please select a address"),
    order_type: z.enum(["purchase"]), // Add validation for order_type
    order_items: z.array(orderItemSchema),
    order_date: z.date(),
});

// Move schemas to a separate file: schemas.ts
export const buildFormSchema = z.object({
    address_id: z.string().min(1, "Please select a address"),
    order_date: z.date(),
    order_type: z.enum(["build"]), // Add validation for order_type
    order_items: z.array(orderItemSchema),
    produced_items: z.array(pricedItemSchema),
    consumed_items: z.array(pricedItemSchema),
});

const changeQuantitySchema = z.array(
    z.object({
        quantity_change: z.coerce.number(),
        item_id: z.coerce.number(),
    }),
);

export const stockTakeFormSchema = z.object({
    address_id: z.coerce.number(),
    order_type: z.enum(["stocktake"]),
    ...orderItemsSchema.shape,
    change_quantity: changeQuantitySchema,
    order_date: z.date(),
});

export type SaleFormData = z.infer<typeof saleFormSchema>;
export type PurchaseFormData = z.infer<typeof purchaseFormSchema>;
export type BuildFormData = z.infer<typeof buildFormSchema>;
export type ShipmentFormData = z.infer<typeof shipmentFormSchema>;
