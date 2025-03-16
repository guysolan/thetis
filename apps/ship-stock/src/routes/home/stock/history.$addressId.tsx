import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import dayjs from "dayjs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@thetis/ui/table";
import { Badge } from "@thetis/ui/badge";
import PageTitle from "@/components/PageTitle";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { AlertCircle, AlertTriangle } from "lucide-react";

// Types for the inventory history data directly using the JSON structure
interface InventoryHistoryRecord {
  order_id: number;
  address_id: number;
  address_name: string;
  transaction_date: string;
  order_date: string;
  order_type: "purchase" | "sale" | "shipment" | "stocktake";
  from_company: string | null;
  to_company: string | null;
  payment_status:
    | "unpaid"
    | "paid"
    | "overdue"
    | "refunded"
    | "cancelled"
    | null;
  items: Array<{
    id: number;
    name: string;
    type: string;
    quantity: number; // Current running total
    change: number; // Change in this transaction
  }>;
}

// Function to fetch inventory history data from the location view
const fetchInventoryHistory = async (addressId: string) => {
  const { data, error } = await supabase
    .from("inventory_history_by_address")
    .select("*")
    .eq("address_id", addressId)
    .order("transaction_date", { ascending: true }); // Ascending for chronological processing

  if (error) {
    throw new Error(`Error fetching inventory history: ${error.message}`);
  }

  return data as InventoryHistoryRecord[];
};

const getInventoryHistoryQueryOptions = (addressId: string) => ({
  queryKey: ["inventoryHistory", addressId],
  queryFn: () => fetchInventoryHistory(addressId),
});

function StockHistoryPage() {
  const inventoryHistory = Route.useLoaderData();

  // Get unique items that have ever been at this address
  const uniqueItems = React.useMemo(() => {
    if (!inventoryHistory || inventoryHistory.length === 0) return [];

    const itemMap = new Map();

    // Process all items from all records
    inventoryHistory.forEach((record) => {
      if (!record.items) return;

      record.items.forEach((item) => {
        if (!itemMap.has(item.id)) {
          itemMap.set(item.id, {
            id: item.id,
            name: item.name,
            type: item.type,
          });
        }
      });
    });

    return Array.from(itemMap.values());
  }, [inventoryHistory]);

  // Group data by date for the timeline view
  const timelineData = React.useMemo(() => {
    if (!inventoryHistory || inventoryHistory.length === 0) return [];

    // First, group records by date
    const dateGroups = {};
    const runningTotals = {}; // Keep track of the latest known quantity for each item

    // Initialize running totals for all items
    uniqueItems.forEach((item) => {
      runningTotals[item.id] = 0;
    });

    // Process each record in chronological order
    inventoryHistory.forEach((record) => {
      if (!record.items) return;

      const dateKey = dayjs(record.transaction_date).format("YYYY-MM-DD");

      if (!dateGroups[dateKey]) {
        dateGroups[dateKey] = {
          date: record.transaction_date,
          formattedDate: dayjs(record.transaction_date).format("DD MMM YYYY"),
          items: {},
          itemsWithChanges: {}, // Track only items that changed on this date
          hasChanges: false,
          orders: new Set(),
        };
      }

      // Add order ID to the list of orders for this date
      dateGroups[dateKey].orders.add(record.order_id);

      // Process each item in this record
      record.items.forEach((item) => {
        // Update running total
        runningTotals[item.id] = item.quantity;

        // Store each item data for this date
        if (item.change !== 0) {
          // Only save items with changes in the "items with changes" collection
          dateGroups[dateKey].itemsWithChanges[item.id] = {
            quantity: item.quantity,
            quantity_change: item.change,
            hasChange: true,
            order_type: record.order_type,
            order_id: record.order_id,
            name: item.name,
            type: item.type,
          };

          // Mark this date as having changes
          dateGroups[dateKey].hasChanges = true;
        }

        // Always update the full items collection with latest quantities
        dateGroups[dateKey].items[item.id] = {
          quantity: item.quantity,
          quantity_change: item.change,
          hasChange: item.change !== 0,
          order_type: record.order_type,
          order_id: record.order_id,
          name: item.name,
          type: item.type,
        };
      });

      // Add all known items with their current running totals
      uniqueItems.forEach((uniqueItem) => {
        if (!dateGroups[dateKey].items[uniqueItem.id]) {
          dateGroups[dateKey].items[uniqueItem.id] = {
            quantity: runningTotals[uniqueItem.id],
            quantity_change: 0,
            hasChange: false,
            name: uniqueItem.name,
            type: uniqueItem.type,
          };
        }
      });
    });

    // Convert to array and sort by date (newest first for display)
    return Object.values(dateGroups)
      .map((group) => ({
        ...group,
        orders: Array.from(group.orders),
      }))
      .sort((a: any, b: any) => dayjs(b.date).diff(dayjs(a.date)));
  }, [inventoryHistory, uniqueItems]);

  // Filter timeline to only show dates with actual stock changes
  const stockChangeTimeline = React.useMemo(() => {
    return timelineData.filter((dateData: any) => dateData.hasChanges);
  }, [timelineData]);

  if (!inventoryHistory || inventoryHistory.length === 0) {
    return (
      <div className="p-4 text-center">
        No inventory history found for this address.
      </div>
    );
  }

  // Get address name from the first record
  const addressName = inventoryHistory[0]?.address_name || "Unknown Address";

  return (
    <div className="">
      <PageTitle title={`Inventory History: ${addressName}`} />

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>
            Stock levels at each point when inventory changed
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="left-0 z-10 sticky w-[150px]">
                Date
              </TableHead>
              {uniqueItems.map((item) => (
                <TableHead key={item.id} className="min-w-[120px] text-right">
                  {item.name}
                  <div className="font-normal text-gray-500 text-xs capitalize">
                    {item.type}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Current stock levels (most recent date) */}
            {stockChangeTimeline.length > 0 && (
              <TableRow className="font-bold">
                <TableCell className="left-0 z-10 sticky">
                  <div className="font-medium">Current</div>
                  <div className="text-gray-500 text-xs">
                    {dayjs(stockChangeTimeline[0].date).format("DD MMM YYYY")}
                  </div>
                </TableCell>
                {uniqueItems.map((item) => {
                  const itemData = stockChangeTimeline[0].items[item.id];
                  return (
                    <TableCell key={item.id} className="text-right">
                      <span
                        className={itemData?.quantity < 0 ? "text-red-500" : ""}
                      >
                        {itemData?.quantity.toFixed(2)}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            )}

            {/* Historical stock levels at each change point */}
            {stockChangeTimeline.map((dateData: any, index: number) => (
              <TableRow
                key={dateData.formattedDate}
                className={index === 0 ? "hidden" : ""}
              >
                <TableCell className="left-0 z-10 sticky">
                  <div className="font-medium">{dateData.formattedDate}</div>
                  <div className="text-gray-500 text-xs">
                    {dateData.orders.map((orderId) => {
                      const v_orderRecord = inventoryHistory.find(
                        (record) => record.order_id === orderId,
                      );

                      if (v_orderRecord?.order_type) {
                        return (
                          <Badge
                            key={orderId}
                            variant={getOrderTypeBadgeVariant(
                              v_orderRecord.order_type,
                            )}
                            className="mr-1 px-1 py-0 text-[10px]"
                          >
                            {v_orderRecord.order_type}
                            <span className="ml-1">#{orderId}</span>
                          </Badge>
                        );
                      }
                      return null;
                    })}
                  </div>
                </TableCell>
                {uniqueItems.map((item) => {
                  const itemData = dateData.items[item.id];
                  const itemWithChange = dateData.itemsWithChanges?.[item.id];

                  return (
                    <TableCell key={item.id} className="text-right">
                      <div>
                        <span className="flex justify-end items-center">
                          {itemData?.quantity < 0 && (
                            <AlertTriangle className="mr-1 w-4 h-4 text-red-500" />
                          )}
                          <span>{itemData?.quantity.toFixed(2)}</span>
                        </span>
                        {itemWithChange && (
                          <div
                            className={`text-xs font-medium ${itemWithChange.quantity_change < 0 ? "text-red-500" : "text-green-500"}`}
                          >
                            {itemWithChange.quantity_change > 0 ? "+" : ""}
                            {itemWithChange.quantity_change.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Helper function to determine badge variant based on order type
function getOrderTypeBadgeVariant(
  orderType: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (orderType) {
    case "purchase":
      return "default";
    case "sale":
      return "destructive";
    case "shipment":
      return "secondary";
    case "stocktake":
      return "outline";
    case "multiple":
      return "outline";
    default:
      return "default";
  }
}

export const Route = createFileRoute("/home/stock/history/$addressId")({
  component: StockHistoryPage,
  loader: async ({ params, context }) => {
    const { addressId } = params;
    return context.queryClient.ensureQueryData(
      getInventoryHistoryQueryOptions(addressId),
    );
  },
});
