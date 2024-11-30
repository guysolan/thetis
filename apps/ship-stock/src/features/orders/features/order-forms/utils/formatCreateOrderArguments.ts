import { Currency } from '../../../../../constants/currencies';
import { ItemType } from "../types";
export type FormatOrderItemChanges = {
    item_id: string;
    quantity_change: number;
    item_price: number;
    item_tax: number;
    item_type?: ItemType;
    address_id: string;
};

export type CreateOrderType = {
    in_order_type: string;
    in_order_date: string;
    in_order_items: FormatOrderItemChanges[];
    in_from_company_id: string | null;
    in_to_company_id: string | null;
    in_from_billing_address_id: string | null;
    in_from_shipping_address_id: string | null;
    in_to_billing_address_id: string | null;
    in_to_shipping_address_id: string | null;
    in_to_contact_id: string | null;
    in_from_contact_id: string | null;
    in_currency: Currency;
    in_carriage: number;
    in_company_id: string;
};
export const formatCreateOrderArguments = (
    orderItems: FormatOrderItemChanges[],
    formData: any,
): CreateOrderType => {
    return {
        in_order_type: formData.order_type,
        in_order_date: formData.order_date.toISOString(),
        in_order_items: orderItems,
        in_from_company_id: formData.from_company_id ?? null,
        in_from_billing_address_id: formData.from_billing_address_id ?? null,
        in_from_shipping_address_id: formData.from_shipping_address_id ?? null,
        in_to_company_id: formData.to_company_id ?? null,
        in_to_billing_address_id: formData.to_billing_address_id ?? null,
        in_to_shipping_address_id: formData.to_shipping_address_id ?? null,
        in_to_contact_id: formData.to_contact_id ?? null,
        in_from_contact_id: formData.from_contact_id ?? null,
        in_currency: formData.currency ?? null,
        in_carriage: formData.carriage ?? 0,
        in_company_id: formData.company_id ?? null,
    };
};
