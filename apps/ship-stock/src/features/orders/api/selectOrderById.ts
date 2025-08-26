import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export interface OrderWithDetails {
  id: number;
  order_type: string;
  order_date: string;
  carriage: number;
  from_company_id: number | null;
  to_company_id: number | null;
  from_billing_address_id: number | null;
  from_shipping_address_id: number | null;
  to_billing_address_id: number | null;
  to_shipping_address_id: number | null;
  from_contact_id: number | null;
  to_contact_id: number | null;
  currency: string | null;
  company_id: number | null;
  reason_for_export: string | null;
  mode_of_transport: string | null;
  incoterms: string | null;
  unit_of_measurement: string | null;
  shipment_number: string | null;
  airwaybill: string | null;
  delivery_dates: string | null;
  payment_status: string | null;
  order_form_values: any | null;
  reference_number: string | null;
  order_item_changes: OrderItemChangeWithDetails[];
}

export interface OrderItemChangeWithDetails {
  order_id: number;
  item_change_id: number;
  price: number | null;
  tax: number | null;
  lot_number: string | null;
  package_item_change_id: number | null;
  item_changes: {
    id: number;
    item_id: number;
    quantity_change: number;
    address_id: number | null;
    items: {
      id: number;
      name: string;
      price: number | null;
      type: string;
      hs_code: string | null;
      sku: string | null;
      country_of_origin: string | null;
      height: number | null;
      width: number | null;
      depth: number | null;
      weight: number | null;
      company_id: number | null;
    };
    addresses: {
      id: number;
      name: string | null;
      line_1: string | null;
      line_2: string | null;
      city: string | null;
      region: string | null;
      code: string | null;
      country: string | null;
      is_active: boolean | null;
      holds_stock: boolean | null;
      company_id: number | null;
      is_default_shipping: boolean | null;
      is_default_billing: boolean | null;
    } | null;
  };
}

export const selectOrderById = async (id: string): Promise<OrderWithDetails> => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_item_changes (
        *,
        item_changes (
          *,
          items (*),
          addresses (*)
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data as OrderWithDetails;
};

export const selectOrderByIdQueryKey = (id: string) => ({
  queryKey: ["select-order-by-id", id],
});

export const selectOrderByIdQueryOptions = (id: string) => {
  return queryOptions({
    ...selectOrderByIdQueryKey(id),
    queryFn: () => selectOrderById(id),
  });
};

export const useSelectOrderById = (id: string) =>
  useSuspenseQuery(selectOrderByIdQueryOptions(id));