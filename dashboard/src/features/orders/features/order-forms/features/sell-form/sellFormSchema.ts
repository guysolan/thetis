import * as z from "zod";

// Schema for direct items (like in sale form)
const directItemSchema = z.object({
    item_type: z.enum(["product", "part"]),
    item_id: z.string().min(1, "Item is required"),
    quantity_change: z.number().min(1, "Quantity must be at least 1"),
    item_price: z.number().min(0, "Price cannot be negative").optional(),
    item_tax: z.number().min(0, "Tax cannot be negative").optional()
});

// Schema for package items (existing)
const packageItemSchema = z.object({
    item_id: z.string().min(1, "Item is required"),
    item_type: z.literal("product"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price cannot be negative")
});

// Schema for package-based items
const packageOrderItemSchema = z.object({
    item_type: z.literal("package"),
    item_id: z.string().min(1, "Package is required"),
    quantity_change: z.number().min(1, "Quantity must be at least 1"),
    package_items: z.array(packageItemSchema)
        .min(1, "Package must contain at least one item")
});

export type PackageOrderItems = z.infer<typeof packageOrderItemSchema>

// Combined order items schema
const orderItemSchema = z.discriminatedUnion("item_type", [
    directItemSchema,
    packageOrderItemSchema
]);

// Main form schema
export const sellFormSchema = z.object({
    mode: z.enum(["direct", "package"]),
    order_items: z.array(orderItemSchema)
        .min(1, "At least one item is required"),
    // ... rest of the schema remains the same
});

// Type inference
export type SellFormSchema = z.infer<typeof sellFormSchema>;