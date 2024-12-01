import { z } from "zod";
import { itemTypes } from "../../../items/types";

import { currencyKeys } from '../../../../constants/currencies';
// Add new package-related schemas
const packageItemSchema = z.object({
    item_id: z.string().min(1, "Please select an item"),
    item_type: z.literal("product"),
    quantity_change: z.coerce.number().min(1, "Quantity must be at least 1"),
    item_price: z.coerce.number().min(0, "Price cannot be negative"),
});

const packageOrderItemSchema = z.object({
    item_type: z.literal("package"),
    package_id: z.string().min(1, "Package is required"),
    package_quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    package_items: z.array(packageItemSchema)
        .min(1, "Package must contain at least one item")
});

export type PackageOrderItems = z.infer<typeof packageOrderItemSchema>;

// Common item schemas
const baseItemSchema = z.object({
    item_id: z.string().min(1, "Please select an item"),
    item_type: z.string(),
    quantity_change: z.coerce.number(),
});

const pricedItemSchema = baseItemSchema.extend({
    item_id:  z.coerce.number(),
    item_price: z.coerce.number().optional(),
    item_tax: z.coerce.number().optional(),
    item_total: z.coerce.number().optional(),
    quantity_change: z.coerce.number().optional(),
});

export type PricedItem = z.infer<typeof pricedItemSchema>;

// Base order item schema
const baseOrderItemSchema = baseItemSchema.extend({
    item_type: z.enum(["product", "part"]),
    quantity_before: z.coerce.number().optional(),
    quantity_after: z.coerce.number().optional(),
});

export const orderItemSchema = z.discriminatedUnion("item_type", [
    baseOrderItemSchema.extend({ item_type: z.literal("product") }),
    baseOrderItemSchema.extend({ item_type: z.literal("part") }),
    packageOrderItemSchema
]);

export const orderItemsSchema = z.object({
    order_items: z.array(orderItemSchema),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

const stockTakeItemSchema = baseItemSchema.extend({
    quantity_before: z.coerce.number(),
    quantity_after: z.coerce.number(),
});

// Common base schemas
const baseAddressSchema = z.object({
    from_company_id: z.string().min(1, "Company is required"),
    from_billing_address_id: z.string().min(1, "Billing address is required"),
    from_shipping_address_id: z.string().min(1, "Shipping address is required"),
    to_contact_id: z.string().min(1, "Contact is required").optional(),
    to_company_id: z.string().min(1, "Company is required"),
    to_billing_address_id: z.string().min(1, "Billing address is required"),
    to_shipping_address_id: z.string().min(1, "Shipping address is required"),
    from_contact_id: z.string().min(1, "Contact is required").optional(),
    company_id: z.string().min(1, "Company is required"),
});

const baseOrderSchema = z.object({
    order_date: z.date(),
    order_items: z.array(orderItemSchema).min(1, "At least one item is required"),
    currency: z.enum(currencyKeys as [string, ...string[]], {
        errorMap: () => ({ message: "Please select a valid currency" })
    }).default("GBP"),
    carriage: z.coerce.number().min(0, "Carriage must be 0 or greater").default(0),
});

// Base form schema combining address and order schemas
const baseFormSchema = baseAddressSchema.extend({
    ...baseOrderSchema.shape,
});

// Form schemas using composition
export const saleFormSchema = baseFormSchema.extend({
    order_type: z.literal("sale"),
    mode: z.enum(["package", "direct"]),
    consumed_items: z.array(pricedItemSchema),
});

export const shipmentFormSchema = baseFormSchema.extend({
    order_type: z.literal("shipment"),
    from_items: z.array(baseItemSchema),
    to_items: z.array(baseItemSchema),
});

export const buyFormSchema = baseFormSchema.extend({
    order_type: z.literal("purchase"),
    produced_items: z.array(pricedItemSchema),
    consumed_items: z.array(pricedItemSchema),
    order_items: z.array(pricedItemSchema),
    item_type: z.enum(["product", "part"]),

});

export const stockTakeFormSchema = z.object({
    address_id: z.coerce.number(),
    order_type: z.literal("stocktake"),
    order_items: z.array(stockTakeItemSchema),
    order_date: z.date(),
});

export type SaleFormData = z.infer<typeof saleFormSchema>;
export type BuyFormData = z.infer<typeof buyFormSchema>;
export type ShipmentFormData = z.infer<typeof shipmentFormSchema>;

export type OrderItemChange = {
    in_item_id: string;
    in_quantity_change: number;
    in_item_price: number;
    in_item_tax: number;
    in_address_id: string;
};



