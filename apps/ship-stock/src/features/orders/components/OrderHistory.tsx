import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@thetis/ui/accordion";
import { Button } from "@thetis/ui/button";
import type { OrderType, OrderView } from "../types";
import dayjs from "dayjs";
import OrderBreakdown from "../features/order-history/components/OrderBreakdown";
import { StocktakeSummaryWithData } from "./StocktakeSummaryWithData";

import ActionPopover from "@/components/ActionPopover";
import { useDeleteOrder } from "../api/deleteOrder";
import { DocumentLinks } from "./DocumentLinks";
import { PaymentStatusSelect } from "./PaymentStatusSelect";
import { DeliveryStatusSelect } from "./DeliveryStatusSelect";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  ClipboardList,
  Edit,
  MapPin,
  Package,
  Send,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { Card } from "@thetis/ui/card";
import { cn } from "@/lib/utils";

interface ExistingOrdersProps {
  orders: OrderView[];
}

interface DeliveryDatesDisplayProps {
  deliveryDatesJson: string | null;
}

const DeliveryDatesDisplay: React.FC<DeliveryDatesDisplayProps> = ({
  deliveryDatesJson,
}) => {
  const parseDeliveryDates = (
    jsonString: string | null,
  ): [string | null, string | null] | null => {
    if (!jsonString) return null;

    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length === 2) {
        return [parsed[0] || null, parsed[1] || null];
      }
    } catch (error) {
      console.warn("Failed to parse delivery dates:", error);
    }

    return null;
  };

  const deliveryDates = parseDeliveryDates(deliveryDatesJson);

  if (!deliveryDates || (!deliveryDates[0] && !deliveryDates[1])) {
    return null;
  }

  const formatDate = (date: string) => dayjs(date).format("D MMM");

  const dateText = deliveryDates[0] && deliveryDates[1]
    ? `${formatDate(deliveryDates[0])} - ${formatDate(deliveryDates[1])}`
    : deliveryDates[0]
    ? `from ${formatDate(deliveryDates[0])}`
    : deliveryDates[1]
    ? `by ${formatDate(deliveryDates[1])}`
    : "";

  return (
    <div className="inline-flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full font-medium text-muted-foreground text-xs">
      <Calendar size={12} />
      <span>{dateText}</span>
    </div>
  );
};

const getOrderTypeIcon = (orderType: string) => {
  switch (orderType.toLowerCase()) {
    case "sell":
      return ShoppingCart;
    case "build":
      return Package;
    case "buy":
      return ShoppingBag;
    case "ship":
      return Send;
    case "count":
      return ClipboardList;
    default:
      return Package;
  }
};

export const OrderHistory: React.FC<ExistingOrdersProps> = ({ orders }) => {
  const { mutate: deleteOrder } = useDeleteOrder();

  return (
    <Accordion type="multiple" className="space-y-3">
      {orders?.map((order) => {
        const OrderTypeIcon = getOrderTypeIcon(order.order_type);

        return (
          <AccordionItem
            key={order.order_id}
            value={String(order.order_id)}
            className="border-0"
          >
            <Card className="overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-4 p-4">
                {/* Order Type Icon */}
                <div className="bg-primary/10 p-2.5 rounded-lg shrink-0">
                  <OrderTypeIcon size={20} className="text-primary" />
                </div>

                {/* Order Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-base">
                      {order.order_type === "count"
                        ? `Stocktake #${order.order_id}`
                        : `${order.order_type.charAt(0).toUpperCase() + order.order_type.slice(1)} #${order.order_id}`}
                    </h3>
                    <span className="text-muted-foreground text-sm">
                      {dayjs(order.order_date as string).format("DD MMM YYYY")}
                    </span>
                  </div>

                  {/* For count: location; for others: company names */}
                  <div className="flex items-center gap-3 mt-1 text-muted-foreground text-sm">
                    {order.order_type === "count" ? (
                      order.from_address?.name ? (
                        <span className="inline-flex items-center gap-1.5 truncate">
                          <MapPin size={14} className="shrink-0 text-muted-foreground" />
                          {order.from_address.name}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/70">No location</span>
                      )
                    ) : (
                      <>
                        {order.from_company?.name && (
                          <span className="truncate">{order.from_company.name}</span>
                        )}
                        {order.from_company?.name && order.to_company?.name && (
                          <span>→</span>
                        )}
                        {order.to_company?.name && (
                          <span className="truncate">{order.to_company.name}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Status badges - large screens only (inline) */}
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  {!["count", "ship"].includes(order.order_type) && (
                    <PaymentStatusSelect
                      orderId={order.order_id}
                      currentStatus={order.payment_status || "unpaid"}
                    />
                  )}
                  {!["count"].includes(order.order_type) && (
                    <DeliveryStatusSelect
                      orderId={order.order_id}
                      currentStatus={order.delivery_status || "pending"}
                    />
                  )}
                </div>

                {/* Actions: Triple dot + Chevron */}
                <div className="flex items-center shrink-0">
                  <ActionPopover
                    title={`Order ${order.order_id}`}
                    deleteFunction={() => deleteOrder(order.order_id)}
                  >
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="justify-start gap-2 w-full font-normal text-sm"
                    >
                      <Link
                        to="/home/orders/$orderId"
                        params={{ orderId: order.order_id.toString() }}
                      >
                        <Edit size={16} />
                        Edit Order
                      </Link>
                    </Button>
                    <DocumentLinks
                      orderId={order.order_id.toString()}
                      orderType={order.order_type as OrderType}
                    />
                  </ActionPopover>

                  <AccordionTrigger
                    className={cn(
                      "hover:bg-muted p-2 rounded-md transition-colors",
                      "hover:no-underline border-0",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
                    )}
                  >
                  </AccordionTrigger>
                </div>
              </div>

              {/* Badges - shown below header on md and smaller */}
              <div className="lg:hidden flex flex-wrap gap-2 px-4 pb-3">
                {!["count", "ship"].includes(order.order_type) && (
                  <PaymentStatusSelect
                    orderId={order.order_id}
                    currentStatus={order.payment_status || "unpaid"}
                  />
                )}
                {!["count"].includes(order.order_type) && (
                  <DeliveryStatusSelect
                    orderId={order.order_id}
                    currentStatus={order.delivery_status || "pending"}
                  />
                )}
                {order.order_type !== "count" && (
                  <DeliveryDatesDisplay
                    deliveryDatesJson={order.delivery_dates || null}
                  />
                )}
              </div>

              {/* Expanded Content */}
              <AccordionContent className="p-0">
                <div className="border-t">
                  {/* Extra info bar - location for count, contact + delivery dates for others */}
                  <div className="flex flex-wrap items-center gap-2 bg-muted/30 px-4 py-2 text-muted-foreground text-sm">
                    {order.order_type === "count" ? (
                      order.from_address?.name && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          <span>{order.from_address.name}</span>
                        </div>
                      )
                    ) : (
                      <>
                        {order.from_contact?.name && (
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{order.from_contact.name}</span>
                          </div>
                        )}
                        <DeliveryDatesDisplay
                          deliveryDatesJson={order.delivery_dates || null}
                        />
                      </>
                    )}
                  </div>

                  {/* Order breakdown: stocktake summary (before/counted/change) or full breakdown */}
                  <div className="p-4">
                    {order.order_type === "count" ? (
                      <StocktakeSummaryWithData order={order} />
                    ) : (
                      <OrderBreakdown order={order} />
                    )}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
