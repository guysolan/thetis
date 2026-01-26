import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const selectOrderFormValuesById = async (id: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      order_form_values,
      from_company_id,
      from_billing_address_id,
      from_shipping_address_id,
      to_company_id,
      to_billing_address_id,
      to_shipping_address_id,
      from_contact_id,
      to_contact_id,
      order_type,
      order_date,
      currency,
      carriage,
      reason_for_export,
      shipment_number,
      airwaybill,
      mode_of_transport,
      incoterms,
      unit_of_measurement,
      delivery_dates
    `)
    .eq("id", Number(id))
    .single();

  if (error) {
    throw error;
  }

  // Clean up orphaned items that reference non-existent packages
  const validPackageIds = new Set(
    (data.order_form_values?.package_items || []).map((pkg) =>
      pkg.package_item_change_id
    ),
  );

  const cleanFromItems = (data.order_form_values?.from_items || []).filter(
    (item) =>
      !item.package_item_change_id ||
      validPackageIds.has(item.package_item_change_id),
  );

  const cleanToItems = (data.order_form_values?.to_items || []).filter((item) =>
    !item.package_item_change_id ||
    validPackageIds.has(item.package_item_change_id)
  );

  // Merge the order_form_values with the main order fields to ensure all data is available
  const mergedFormValues = {
    ...data.order_form_values,
    // Clean up orphaned items
    from_items: cleanFromItems,
    to_items: cleanToItems,
    // Override with actual database values to ensure accuracy
    from_company_id: data.from_company_id?.toString() ||
      data.order_form_values?.from_company_id,
    from_billing_address_id: data.from_billing_address_id?.toString() ||
      data.order_form_values?.from_billing_address_id,
    from_shipping_address_id: data.from_shipping_address_id?.toString() ||
      data.order_form_values?.from_shipping_address_id,
    to_company_id: data.to_company_id?.toString() ||
      data.order_form_values?.to_company_id,
    to_billing_address_id: data.to_billing_address_id?.toString() ||
      data.order_form_values?.to_billing_address_id,
    to_shipping_address_id: data.to_shipping_address_id?.toString() ||
      data.order_form_values?.to_shipping_address_id,
    from_contact_id: data.from_contact_id?.toString() ||
      data.order_form_values?.from_contact_id,
    to_contact_id: data.to_contact_id?.toString() ||
      data.order_form_values?.to_contact_id,
    order_type: data.order_type || data.order_form_values?.order_type,
    order_date: data.order_date || data.order_form_values?.order_date,
    currency: data.currency || data.order_form_values?.currency,
    carriage: data.carriage ?? data.order_form_values?.carriage,
    reason_for_export: data.reason_for_export ||
      data.order_form_values?.reason_for_export,
    shipment_number: data.shipment_number ||
      data.order_form_values?.shipment_number,
    airwaybill: data.airwaybill || data.order_form_values?.airwaybill,
    mode_of_transport: data.mode_of_transport ||
      data.order_form_values?.mode_of_transport,
    incoterms: data.incoterms || data.order_form_values?.incoterms,
    unit_of_measurement: data.unit_of_measurement ||
      data.order_form_values?.unit_of_measurement,
    delivery_dates: data.delivery_dates ||
      data.order_form_values?.delivery_dates,
  };

  console.log("🔍 EDIT ORDER DEBUG - Raw DB data:", {
    database_values: {
      to_company_id: data.to_company_id,
      to_contact_id: data.to_contact_id,
      to_shipping_address_id: data.to_shipping_address_id,
      to_billing_address_id: data.to_billing_address_id,
    },
    form_values: data.order_form_values,
    merged_result: {
      to_company_id: mergedFormValues.to_company_id,
      to_contact_id: mergedFormValues.to_contact_id,
      to_shipping_address_id: mergedFormValues.to_shipping_address_id,
      to_billing_address_id: mergedFormValues.to_billing_address_id,
    },
  });

  return { order_form_values: mergedFormValues };
};

export const selectOrderViewById = async (id: string) => {
  const { data, error } = await supabase
    .from("orders_view")
    .select("*")
    .eq("order_id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const selectOrderViewByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["select-order-view", id],
    queryFn: () => selectOrderViewById(id),
  });
};

export const useSelectOrderViewById = (id: string) =>
  useSuspenseQuery(selectOrderViewByIdQueryOptions(id));
