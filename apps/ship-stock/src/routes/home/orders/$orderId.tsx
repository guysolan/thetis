import { createFileRoute } from "@tanstack/react-router";
import { MultiOrderForm } from "@/features/orders/features/multi-order-form/MultiOrderForm";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { selectOrderFormValuesById } from "../../../features/orders/features/order-history/api/selectOrderViewById";
import { MultiOrderFormData } from "@/features/orders/features/multi-order-form/schema";

const defaultNewOrder: MultiOrderFormData = {
  order_type: "sale",
  order_date: new Date().toISOString(),
  from_company_id: "",
  from_billing_address_id: "",
  from_shipping_address_id: "",
  to_company_id: "",
  to_billing_address_id: "",
  to_shipping_address_id: "",
  company_id: "",
  unit_of_measurement: "metric",
  currency: "GBP",
  carriage: 0,
  delivery_dates: [null, null],
  package_items: [],
  order_items: [],
  consumed_items: [],
  produced_items: [],
  from_items: [],
  to_items: [],
  reason_for_export: null,
  shipment_number: null,
  airwaybill: null,
  mode_of_transport: null,
  incoterms: null,
  mode: "direct",
  item_type: "product",
};

export const Route = createFileRoute("/home/orders/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const isNewOrder = orderId === "new";
  const { data: order } = useSuspenseQuery({
    queryKey: ["select-order", orderId],
    queryFn: () => {
      if (isNewOrder) {
        return { order_form_values: defaultNewOrder };
      }
      return selectOrderFormValuesById(orderId);
    },
  });
  return (
    <div className="mx-auto">
      <h1 className="mb-6 font-bold text-2xl">
        {isNewOrder ? "Create New Order" : "Edit Order"}
      </h1>
      <MultiOrderForm
        orderId={isNewOrder ? undefined : orderId}
        defaultOrderFormValues={
          order?.order_form_values
            ? {
                ...order.order_form_values,
                order_type: order.order_form_values.order_type || "sale",
              }
            : undefined
        }
        defaultOrderType="sale"
      />
    </div>
  );
}
