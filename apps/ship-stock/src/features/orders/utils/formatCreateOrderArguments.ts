import dayjs from "dayjs";
import { Currency } from "../../../constants/currencies";
import { ItemType } from "../types";
import { MultiOrderFormData } from "../features/multi-order-form/schema";

export type FormatOrderItemChanges = {
    item_id: string;
    quantity_change: number;
    item_price: number;
    item_tax: number;
    item_type?: ItemType;
    address_id: string;
};

export type CreateOrderType = {
    in_order_id: string | null;
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
    in_reason_for_export: string | null;
    in_shipment_number: string | null;
    in_airwaybill: string | null;
    in_mode_of_transport: string | null;
    in_incoterms: string | null;
    in_unit_of_measurement: string | null;
};
export const formatCreateOrderArguments = (
    orderItems: FormatOrderItemChanges[],
    formData: MultiOrderFormData,
): CreateOrderType => {
    return {
        in_order_id: formData.order_id ?? null,
        in_order_type: formData.order_type,
        in_order_date: formData.order_date?.toISOString() ??
            dayjs().toISOString(),
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
        in_reason_for_export: formData.reason_for_export ?? null,
        in_shipment_number: formData.shipment_number ?? null,
        in_airwaybill: formData.airwaybill ?? null,
        in_mode_of_transport: formData.mode_of_transport ?? null,
        in_incoterms: formData.incoterms ?? null,
        in_unit_of_measurement: formData.unit_of_measurement ?? null,
    };
};
