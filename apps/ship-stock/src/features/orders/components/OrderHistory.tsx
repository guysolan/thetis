import { Badge } from "@thetis/ui/badge";
import { Button } from "@thetis/ui/button";
import type { OrderType, OrderView } from "../types";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";
import OrderBreakdown from "../features/order-history/components/OrderBreakdown";

import ActionPopover from "@/components/ActionPopover";
import { useDeleteOrder } from "../api/deleteOrder";
import { DocumentLinks } from "./DocumentLinks";
import { PaymentStatusSelect } from "./PaymentStatusSelect";
import { DeliveryStatusSelect } from "./DeliveryStatusSelect";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  DollarSign,
  Edit,
  Package,
  Send,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Truck,
  User,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@thetis/ui/card";

interface ExistingOrdersProps {
  orders: OrderView[];
}

interface DeliveryDatesDisplayProps {
  deliveryDatesJson: string | null;
}

const DeliveryDatesDisplay: React.FC<DeliveryDatesDisplayProps> = ({
  deliveryDatesJson,
}) => {
  // Parse the JSON string format: "[\"2025-05-22 22:00:00+00\",\"2025-05-26 22:00:00+00\"]"
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

  // Format dates as "D MMM" (e.g., "5 May")
  const formatDate = (date: string) => dayjs(date).format("D MMM");

  // Create concise date range text
  const dateText = deliveryDates[0] && deliveryDates[1]
    ? `${formatDate(deliveryDates[0])}-${formatDate(deliveryDates[1])}`
    : deliveryDates[0]
    ? `from ${formatDate(deliveryDates[0])}`
    : deliveryDates[1]
    ? `by ${formatDate(deliveryDates[1])}`
    : "";

  return (
    <div className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full font-medium text-gray-700 dark:text-gray-300 text-xs">
      <Calendar size={12} />
      <span>{dateText}</span>
    </div>
  );
};

// Helper function to get order type icon
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
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  const toggleExpanded = (orderId: number) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {orders?.map((order) => {
        const OrderTypeIcon = getOrderTypeIcon(order.order_type);
        const isExpanded = expandedOrders.has(order.order_id);

        return (
          <Card
            key={order.order_id}
            className="p-4 rounded-md"
          >
            {/* Header with Order Info and Actions */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                  <OrderTypeIcon
                    size={20}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {order.order_type.charAt(0).toUpperCase() +
                      order.order_type.slice(1)} #{order.order_id}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={14} className="text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {dayjs(order.order_date as string).format("DD MMM YYYY")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(order.order_id)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isExpanded
                    ? <ChevronUp size={16} />
                    : <ChevronDown size={16} />}
                </Button>

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
                      className="flex justify-start items-center gap-2 px-3 py-2 w-full"
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
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
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
              <DeliveryDatesDisplay
                deliveryDatesJson={order.delivery_dates || null}
              />
            </div>

            {/* Company Information */}
            <div className="space-y-2 mb-4">
              {order.from_company?.id && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <Building2 size={14} className="flex-shrink-0" />
                  <span>From: {order.from_company?.name}</span>
                  {order.from_contact && (
                    <div className="flex items-center gap-1 ml-2">
                      <User size={12} />
                      <span>({order.from_contact?.name})</span>
                    </div>
                  )}
                </div>
              )}
              {order.to_company?.id && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <Building2 size={14} className="flex-shrink-0" />
                  <span>To: {order.to_company?.name}</span>
                  {order.to_contact && (
                    <div className="flex items-center gap-1 ml-2">
                      <User size={12} />
                      <span>({order.to_contact?.name})</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="mt-6 pt-6 border-gray-200 dark:border-gray-700 border-t">
                <OrderBreakdown order={order} />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
