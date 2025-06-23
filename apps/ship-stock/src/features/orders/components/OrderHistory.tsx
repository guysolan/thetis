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
  ShoppingCart,
  Truck,
  User,
  Wrench,
} from "lucide-react";
import { useState } from "react";

interface ExistingOrdersProps {
  orders: OrderView[];
}

interface DeliveryStatusProps {
  deliveryDatesJson: string | null;
}

const DeliveryStatus: React.FC<DeliveryStatusProps> = ({
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

  // Helper function to determine delivery status
  const getDeliveryStatus = (
    deliveryDates: [string | null, string | null] | null,
  ) => {
    if (!deliveryDates || (!deliveryDates[0] && !deliveryDates[1])) {
      return { status: "no-dates", icon: null, color: "", bgColor: "" };
    }

    const now = dayjs();
    const startDate = deliveryDates[0] ? dayjs(deliveryDates[0]) : null;
    const endDate = deliveryDates[1] ? dayjs(deliveryDates[1]) : null;

    // If we have an end date and we're past it, consider it delivered
    if (endDate && now.isAfter(endDate)) {
      return {
        status: "delivered",
        icon: CheckCircle,
        color: "text-green-700 dark:text-green-300",
        bgColor: "bg-green-100 dark:bg-green-900/30",
      };
    }

    // If we have a start date and we're within the delivery window
    if (
      startDate &&
      now.isAfter(startDate) &&
      (!endDate || now.isBefore(endDate))
    ) {
      return {
        status: "in-transit",
        icon: Truck,
        color: "text-blue-700 dark:text-blue-300",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
      };
    }

    // If we haven't reached the start date yet
    if (startDate && now.isBefore(startDate)) {
      return {
        status: "scheduled",
        icon: Clock,
        color: "text-orange-700 dark:text-orange-300",
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
      };
    }

    // If we're past the end date but no clear delivery status
    return {
      status: "overdue",
      icon: AlertCircle,
      color: "text-red-700 dark:text-red-300",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    };
  };

  const deliveryDates = parseDeliveryDates(deliveryDatesJson);

  if (!deliveryDates || (!deliveryDates[0] && !deliveryDates[1])) {
    return null;
  }

  const deliveryStatus = getDeliveryStatus(deliveryDates);
  const StatusIcon = deliveryStatus.icon;

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
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${deliveryStatus.bgColor} ${deliveryStatus.color}`}
    >
      {StatusIcon && <StatusIcon size={12} />}
      <span>{dateText}</span>
    </div>
  );
};

// Helper function to get order type icon
const getOrderTypeIcon = (orderType: string) => {
  switch (orderType.toLowerCase()) {
    case "sale":
      return ShoppingCart;
    case "purchase":
      return Package;
    case "shipment":
      return Send;
    case "build":
      return Wrench;
    case "stocktake":
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
          <div
            key={order.order_id}
            className="bg-white dark:bg-gray-900 shadow-sm hover:shadow-md p-6 border rounded-sm transition-shadow"
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
                    Order #{order.order_id}
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
                    className="flex justify-start items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 w-full text-sm"
                  >
                    <Link
                      to="/home/orders/$orderId"
                      params={{ orderId: order.order_id.toString() }}
                    >
                      <Edit size={20} />
                      Edit
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
              {!["stocktake", "shipment"].includes(order.order_type) && (
                <PaymentStatusSelect
                  orderId={order.order_id}
                  currentStatus={order.payment_status || "unpaid"}
                />
              )}
              <DeliveryStatus
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

            {/* Financial Information */}
            {!["stocktake", "shipment"].includes(order.order_type) && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-gray-500" />
                  <span className="font-semibold text-gray-900 dark:text-white text-lg">
                    <NumberFlow
                      value={order.total_value as number}
                      format={{
                        style: "currency",
                        currency: order.currency,
                      }}
                    />
                  </span>
                </div>
                {order?.carriage && order.carriage > 0 && (
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Carriage:{" "}
                      <NumberFlow
                        value={order.carriage}
                        format={{
                          style: "currency",
                          currency: order.currency,
                        }}
                      />
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Expanded Content */}
            {isExpanded && (
              <div className="mt-6 pt-6 border-gray-200 dark:border-gray-700 border-t">
                <OrderBreakdown order={order} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
