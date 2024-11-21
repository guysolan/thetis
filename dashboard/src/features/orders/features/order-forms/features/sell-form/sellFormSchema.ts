import * as z from "zod";

// Schema for individual items within a package
const packageItemSchema = z.object({
    item_id: z.string().min(1, "Item is required"),
    item_type: z.enum(["product", "part"], {
        errorMap: () => ({ message: "Must be either product or part" })
    }),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    item_price: z.number().min(0, "Price cannot be negative"),
    item_tax: z.number().min(0, "Tax cannot be negative")
});

// Schema for order items (packages)
const orderItemSchema = z.object({
    item_type: z.literal("package"),
    item_id: z.string().min(1, "Package is required"),
    quantity_change: z.number().min(1, "Quantity must be at least 1"),
    package_items: z.array(packageItemSchema)
        .min(1, "Package must contain at least one item")
});

// Main form schema
export const sellFormSchema = z.object({
    // Order items array (packages)
    order_items: z.array(orderItemSchema)
        .min(1, "At least one package is required"),
    
    // Date
    order_date: z.date({
        required_error: "Order date is required",
        invalid_type_error: "Invalid date format"
    }),

    // Currency and carriage
    currency: z.string().min(1, "Currency is required"),
    carriage: z.number().min(0, "Carriage cannot be negative").optional(),

    // Company and address fields
    from_company_id: z.string().min(1, "Seller company is required"),
    from_billing_address_id: z.string().min(1, "Seller billing address is required"),
    from_shipping_address_id: z.string().min(1, "Seller shipping address is required"),
    
    to_company_id: z.string().min(1, "Buyer company is required"),
    to_billing_address_id: z.string().min(1, "Buyer billing address is required"),
    to_shipping_address_id: z.string().min(1, "Buyer shipping address is required"),

    // Optional arrays
    consumed_items: z.array(z.any()).optional(),
    display_items: z.array(z.any()).optional(),

    // Order type
    order_type: z.literal("sale")
});

// Type inference
export type SellFormSchema = z.infer<typeof sellFormSchema>;