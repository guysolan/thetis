import { z } from "zod";
import { itemTypes } from "../../../items/types";

export const currencyTypes = ["GBP", "USD", "EUR"] as const;

export const orderItemSchema = z.object({
    item_id: z.string().min(1, "Please select an item"),
    quantity_change: z.coerce.number().min(0, "Quantity must be at least 1"),
    item_price: z.coerce.number().optional(),
    item_tax: z.coerce.number().optional(),
    item_type: z.enum(itemTypes).optional(),
});

export const orderItemsSchema = z.object({
    order_items: z.array(orderItemSchema),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

const itemSchema = z.object({
    item_id: z.string(),
    item_name: z.string().optional(),
    quantity_change: z.coerce.number().multipleOf(0.01).optional(),
    quantity_before: z.coerce.number().multipleOf(0.01).optional(),
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
});

const baseOrderSchema = z.object({
    order_date: z.date(),
    order_items: z.array(orderItemSchema),
    currency: z.enum(currencyTypes).default("GBP"),
    carriage: z.coerce.number().default(0),
});

// Refactored form schemas using composition
export const saleFormSchema = baseAddressSchema.extend({
    order_type: z.enum(["sale"]),
    ...baseOrderSchema.shape,
    consumed_items: z.array(pricedItemSchema),
});

export const shipmentFormSchema = baseAddressSchema.extend({
    order_type: z.enum(["shipment"]),
    ...baseOrderSchema.shape,
    from_items: z.array(itemSchema),
    to_items: z.array(itemSchema),
});

export const purchaseFormSchema = baseAddressSchema.extend({
    order_type: z.enum(["purchase"]),
    ...baseOrderSchema.shape,
});

export const buildFormSchema = baseAddressSchema.extend({
    ...baseOrderSchema.shape,
    order_type: z.enum(["build"]),
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

export type OrderItemChange = {
    in_item_id: string;
    in_quantity_change: number;
    in_item_price: number;
    in_item_tax: number;
    in_address_id: string;
};