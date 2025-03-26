import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@thetis/ui/accordion";
import { Badge } from "@thetis/ui/badge";
import type { OrderType, OrderView } from "../types";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";
import OrderBreakdown from "../features/order-history/components/OrderBreakdown";
import EditOrderForm from "./EditOrderForm";

import ActionPopover from "@/components/ActionPopover";
import { useDeleteOrder } from "../api/deleteOrder";
import { DocumentLinks } from "./DocumentLinks";
import { Currency } from "../../../components/Currency";
import { MultiOrderForm } from "../features/multi-order-form/MultiOrderForm";
import { PaymentStatusSelect } from "./PaymentStatusSelect";

interface ExistingOrdersProps {
  orders: OrderView[];
}

export const OrderHistory: React.FC<ExistingOrdersProps> = ({ orders }) => {
  const { mutate: deleteOrder } = useDeleteOrder();
  return (
    <Accordion type="single" collapsible className="w-full">
      {orders.map((order) => (
        <AccordionItem
          key={order.order_id}
          value={`order-${order.order_id}-${order.order_type}-${order.order_date}`}
        >
          <AccordionTrigger className="flex-row-reverse gap-x-2 [&_h2]:hover:underline hover:no-underline">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col gap-1 text-left">
                <div className="flex flex-row items-center gap-2 font-medium text-lg">
                  <h2 className="dark:text-white underline-offset-2 text-nowrap">
                    Order {order.order_id}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Badge>{order.order_type}</Badge>
                  {!["stocktake", "shipment"].includes(order.order_type) && (
                    <PaymentStatusSelect
                      orderId={order.order_id}
                      currentStatus={order.payment_status || "unpaid"}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 text-neutral-600 dark:text-neutral-400 text-sm">
                  <span>
                    {dayjs(order.order_date as string).format("DD MMM YYYY")}
                  </span>

                  {order.from_company?.id && (
                    <span>
                      From: {order.from_company?.name}
                      {order.from_contact && ` (${order.from_contact?.name})`}
                    </span>
                  )}
                  {order.to_company?.id && (
                    <span>
                      To: {order.to_company?.name}
                      {order.to_contact && `(${order.to_contact?.name})`}
                    </span>
                  )}
                </div>
                {!["stocktake", "shipment"].includes(order.order_type) && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        <NumberFlow
                          value={order.total_value as number}
                          format={{
                            style: "currency",
                            currency: order.currency,
                          }}
                        />
                      </span>
                      {order?.carriage && (
                        <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                          <NumberFlow
                            value={order.carriage ?? 0}
                            format={{
                              style: "currency",
                              currency: order.currency,
                            }}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <ActionPopover
                  title={`Order ${order.order_id}`}
                  editForm={
                    <MultiOrderForm
                      order={order}
                      defaultOrderType={order.order_type as OrderType}
                    />
                  }
                  deleteFunction={() => deleteOrder(order.order_id)}
                >
                  <DocumentLinks
                    orderId={order.order_id.toString()}
                    orderType={order.order_type as OrderType}
                  />
                </ActionPopover>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <OrderBreakdown order={order} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
