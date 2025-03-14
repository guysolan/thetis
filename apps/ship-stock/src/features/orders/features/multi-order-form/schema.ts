import { z } from "zod";
import { itemTypes } from "../../../items/types";
import { currencyKeys } from "../../../../constants/currencies";

const itemTypeSchema = z.enum([...itemTypes]);

// Base item schema that all other item schemas extend from
const baseItemSchema = z.object({
    item_id: z.string().min(1, "Please select an item"),
    item_type: itemTypeSchema,
    quantity_change: z.coerce.number(),
});

// Single schema for all priced items (consumed/produced)
const pricedItemSchema = baseItemSchema.extend({
    item_price: z.coerce.number().optional(),
    item_tax: z.coerce.number().optional(),
    item_total: z.coerce.number().optional(),
});

// Simplified package schemas
const packageItemSchema = pricedItemSchema.extend({
    item_type: z.literal("product"),
    quantity_change: z.coerce.number().min(1, "Quantity must be at least 1"),
});

const packageOrderItemSchema = z.object({
    item_type: z.literal("package"),
    package_id: z.string().min(1, "Package is required"),
    package_quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    package_items: z.array(packageItemSchema).min(
        1,
        "Package must contain at least one item",
    ),
});

// Combined order item schema
const orderItemSchema = z.discriminatedUnion("item_type", [
    baseItemSchema.extend({
        item_type: z.enum(["product", "part"]),
        quantity_before: z.coerce.number().optional(),
        quantity_after: z.coerce.number().optional(),
    }),
    packageOrderItemSchema,
    baseItemSchema.extend({
        item_type: z.literal("stocktake"),
        quantity_before: z.coerce.number(),
        quantity_after: z.coerce.number(),
    }),
]);

// Main form schema
export const multiOrderFormSchema = z.object({
    // Address fields
    from_company_id: z.string().min(1, "Company is required"),
    from_billing_address_id: z.string().min(1, "Billing address is required"),
    from_shipping_address_id: z.string().min(1, "Shipping address is required"),
    to_contact_id: z.string().min(1, "Contact is required").optional(),
    to_company_id: z.string().min(1, "Company is required"),
    to_billing_address_id: z.string().min(1, "Billing address is required"),
    to_shipping_address_id: z.string().min(1, "Shipping address is required"),
    from_contact_id: z.string().min(1, "Contact is required").optional(),
    company_id: z.string().min(1, "Company is required"),
    item_type: itemTypeSchema,

    // Order fields
    order_date: z.date(),
    order_type: z.enum(["sale", "shipment", "purchase", "stocktake"]),
    mode: z.enum(["package", "direct"]).optional(),
    currency: z.enum(currencyKeys as [string, ...string[]]).default("GBP"),
    carriage: z.coerce.number().min(0).default(0),

    // Additional
    reason_for_export: z.string().optional(),
    shipment_number: z.string().optional(),
    airwaybill: z.string().optional(),
    mode_of_transport: z.string().optional(),
    incoterms: z.string().optional(),
    unit_of_measurement: z.string().optional(),

    // Item arrays
    order_items: z.array(pricedItemSchema).min(1),
    consumed_items: z.array(pricedItemSchema).optional(),
    produced_items: z.array(pricedItemSchema).optional(),
    from_items: z.array(baseItemSchema).optional(),
    to_items: z.array(baseItemSchema).optional(),
}).superRefine((data, ctx) => {
    if (data.order_type === "sale" && !data.consumed_items) {
        ctx.addIssue({
            path: ["consumed_items"],
            message: "Consumed items are required for sale orders",
            code: "custom",
        });
    }
    if (
        data.order_type === "shipment" && (!data.from_items || !data.to_items)
    ) {
        ctx.addIssue({
            path: ["from_items"],
            message: "From items and to items are required for shipment orders",
            code: "custom",
        });
    }
    if (
        data.order_type === "purchase" &&
        (!data.produced_items || !data.consumed_items)
    ) {
        ctx.addIssue({
            path: ["produced_items"],
            message:
                "Produced and consumed items are required for purchase orders",
            code: "custom",
        });
    }
    if (
        data.order_type === "stocktake" &&
        !data.order_items.every((item) => item.item_type === "stocktake")
    ) {
        ctx.addIssue({
            path: ["order_items"],
            message: "All items must be stocktake items for stocktake orders",
            code: "custom",
        });
    }
});

// Single type export
export type MultiOrderFormData = z.infer<typeof multiOrderFormSchema>;
