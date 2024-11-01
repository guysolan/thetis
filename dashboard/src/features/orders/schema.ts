import { z } from "zod";

export const orderItemSchema = z.object({
    item_id: z.string().min(1, "Please select an item"),
    quantity_change: z.number().min(1, "Quantity must be at least 1"),
    item_price: z.number().optional(),
    item_tax: z.number().optional(),
    item_type: z.enum(["product", "part", "service"]).optional(),
});

export const orderItemsSchema = z.object({
    order_items: z.array(orderItemSchema),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

const itemChangeSchema = z.object({
    item_type: z.string(),
    item_id: z.string(),
    item_name: z.string().optional(),
    quantity_change: z.number().multipleOf(0.01).optional(),
    item_price: z.number().multipleOf(0.01).optional(),
    item_tax: z.number().multipleOf(0.01).optional(),
    quantity_after: z.number().multipleOf(0.01).optional(),
});

export type ItemChange = z.infer<typeof itemChangeSchema>;

// Move schemas to a separate file: schemas.ts
export const formSchema = z.object({
    warehouse_id: z.string().min(1, "Please select a warehouse"),
    order_type: z.enum(["purchase", "sale"]), // Add validation for order_type
    order_items: z.array(orderItemSchema),
    produced_items: z.array(itemChangeSchema),
    consumed_items: z.array(itemChangeSchema),
    is_build: z.boolean().default(false),
});

export type OrderFormData = z.infer<typeof formSchema>;
