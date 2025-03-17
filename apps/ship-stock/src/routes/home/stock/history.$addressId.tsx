import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { Tabs, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import PageTitle from "@/components/PageTitle";
import { supabase } from "@/lib/supabase";
import { AlertTriangle } from "lucide-react";

// Updated interface to match the new SQL view structure
interface InventoryHistoryRecord {
  order_id: number;
  address_id: number;
  address_name: string;
  transaction_date: string;
  order_date: string;
  order_type: "purchase" | "sale" | "shipment" | "stocktake";
  from_company: string | null;
  to_company: string | null;
  items: Array<{
    id: number;
    name: string;
    type: string;
    quantity: number; // Current running total
    change: number; // Change in this transaction
  }>;
  item_quantities: Record<string, number>;
  items_changed: number;
  net_change: number;
}

interface StockItem {
  id: number;
  name: string;
  type: string;
}

interface TimelineDataPoint {
  date: string;
  formattedDate: string;
  items: Record<number, any>;
  itemsWithChanges: Record<number, any>;
  orders: number[];
  orderDetails: Array<{
    id: number;
    type: string;
    net_change: number;
    items_changed: number;
  }>;
  allItemTotals: Record<number, number>;
  hasItemsChanged: boolean;
}

// Update Location interface to match the database schema
interface Location {
  id: number;
  name: string;
  line_1?: string;
  line_2?: string;
  city?: string;
  region?: string; // instead of state
  code?: string; // instead of postal_code
  country?: string;
  is_active?: boolean;
  holds_stock?: boolean;
  company_id?: number;
  is_default_shipping?: boolean;
  is_default_billing?: boolean;
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

// Function to fetch all locations with correct field names
const fetchLocations = async () => {
  const { data, error } = await supabase
    .from("addresses")
    .select(
      "id, name, line_1, line_2, city, region, code, country, holds_stock",
    )
    .eq("is_active", true)
    .eq("holds_stock", true)
    .order("name");

  if (error) {
    throw new Error(`Error fetching locations: ${error.message}`);
  }

  return data;
};

const getLocationsQueryOptions = () => ({
  queryKey: ["locations"],
  queryFn: fetchLocations,
});

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

// Extract this as a standalone component
const StockHistoryTable: React.FC<{
  inventoryHistory: InventoryHistoryRecord[];
  activeTab: string;
}> = ({ inventoryHistory, activeTab }) => {
  // Get unique items that have ever been at this address
  const uniqueItems = React.useMemo(() => {
    if (!inventoryHistory || inventoryHistory.length === 0) return [];

    const itemMap = new Map<number, StockItem>();

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

  // Group orders by date and maintain running totals for all items
  const timelineData = React.useMemo(() => {
    if (!inventoryHistory || inventoryHistory.length === 0) return [];

    // Group orders by date
    const dateGroups: Record<string, any> = {};
    const runningTotals: Record<number, number> = {}; // Keep running total for each item

    // Initialize running totals
    uniqueItems.forEach((item) => {
      runningTotals[item.id] = 0;
    });

    // Process each order record chronologically
    inventoryHistory.forEach((record) => {
      if (!record.items || record.items.length === 0) return;

      const dateKey = dayjs(record.transaction_date).format("YYYY-MM-DD");

      if (!dateGroups[dateKey]) {
        dateGroups[dateKey] = {
          date: record.transaction_date,
          formattedDate: dayjs(record.transaction_date).format("DD MMM YYYY"),
          items: {},
          itemsWithChanges: {}, // Track only items that changed on this date
          orders: new Set(),
          orderDetails: [], // Store complete order information
          allItemTotals: {}, // Store running totals for ALL items on this date
          // Track if any order on this date has items_changed > 0
          hasItemsChanged: false,
        };
      }

      // Add order ID to the list of orders for this date
      dateGroups[dateKey].orders.add(record.order_id);
      dateGroups[dateKey].orderDetails.push({
        id: record.order_id,
        type: record.order_type,
        net_change: record.net_change,
        items_changed: record.items_changed,
      });

      // Track if any order on this date has items that changed
      if (record.items_changed > 0) {
        dateGroups[dateKey].hasItemsChanged = true;
      }

      // Update running totals for items in this order
      record.items.forEach((item) => {
        runningTotals[item.id] = item.quantity;

        // Store each item's current quantity
        dateGroups[dateKey].items[item.id] = {
          quantity: item.quantity,
          quantity_change: 0,
          hasChange: false,
          order_type: record.order_type,
          order_id: record.order_id,
          name: item.name,
          type: item.type,
        };

        // If this item changed in this order, add to changes
        if (item.change !== 0) {
          // Create or update item in itemsWithChanges
          if (!dateGroups[dateKey].itemsWithChanges[item.id]) {
            dateGroups[dateKey].itemsWithChanges[item.id] = {
              quantity: item.quantity,
              quantity_change: item.change,
              hasChange: true,
              order_type: record.order_type,
              order_id: record.order_id,
              name: item.name,
              type: item.type,
            };
          } else {
            // Add this change to existing aggregate
            dateGroups[dateKey].itemsWithChanges[item.id].quantity_change +=
              item.change;
          }
        }
      });

      // Store current running totals for ALL items on this date
      uniqueItems.forEach((item) => {
        dateGroups[dateKey].allItemTotals[item.id] = runningTotals[item.id];
      });
    });

    // Convert to array and sort by date (newest first for display)
    return Object.values(dateGroups)
      .map((group) => ({
        ...group,
        orders: Array.from(group.orders),
      }))
      .sort((a: any, b: any) =>
        dayjs(b.date).diff(dayjs(a.date)),
      ) as TimelineDataPoint[];
  }, [inventoryHistory, uniqueItems]);

  // Filter timeline to only show dates with actual stock changes
  const stockChangeTimeline = React.useMemo(() => {
    return timelineData.filter((dateData) => dateData.hasItemsChanged);
  }, [timelineData]);

  // Filter uniqueItems based on the active tab
  const filteredItems = React.useMemo(() => {
    if (activeTab === "all") return uniqueItems;
    if (activeTab === "products")
      return uniqueItems.filter(
        (item) => item.type.toLowerCase() === "product",
      );
    if (activeTab === "parts")
      return uniqueItems.filter((item) => item.type.toLowerCase() === "part");
    return uniqueItems;
  }, [uniqueItems, activeTab]);

  if (!inventoryHistory || inventoryHistory.length === 0) {
    return (
      <div className="p-4 text-center">
        No inventory history found for this address.
      </div>
    );
  }

  // Get the most recent record for current stock
  const currentStock =
    inventoryHistory.length > 0
      ? inventoryHistory[inventoryHistory.length - 1]
      : null;

  return (
    <div className="mb-8 overflow-x-auto">
      <Table className="bg-white">
        <TableCaption className="pb-4">
          Stock levels at each point when inventory changed
        </TableCaption>
        <TableHeader>
          <TableRow className="border-b-2">
            <TableHead className="left-0 z-10 sticky bg-white p-4 border-neutral-300 border-r w-[150px]">
              Date
            </TableHead>
            {filteredItems.map((item) => (
              <TableHead key={item.id} className="p-4 min-w-[120px] text-right">
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
          {currentStock && (
            <TableRow className="hover:bg-gray-50 font-bold">
              <TableCell className="left-0 z-10 sticky bg-white p-4 border-neutral-300 border-r">
                <div className="font-medium">Current</div>
                <div className="text-gray-500 text-xs">
                  {dayjs(currentStock.transaction_date).format("DD MMM YYYY")}
                </div>
              </TableCell>
              {filteredItems.map((item) => {
                // Use the proper running total from the most recent date
                const mostRecentDate = stockChangeTimeline[0];
                const quantity = mostRecentDate.allItemTotals[item.id] || 0;

                return (
                  <TableCell key={item.id} className="p-4 text-right">
                    <span className={quantity < 0 ? "text-red-500" : ""}>
                      {Math.round(quantity)}
                    </span>
                  </TableCell>
                );
              })}
            </TableRow>
          )}

          {/* Historical stock levels at each change point */}
          {stockChangeTimeline.map((dateData) => (
            <TableRow key={dateData.formattedDate} className="hover:bg-gray-50">
              <TableCell className="left-0 z-10 sticky bg-white p-4 border-neutral-300 border-r">
                <div className="font-medium">{dateData.formattedDate}</div>
                <div className="text-gray-500 text-xs">
                  {dateData.orderDetails.map((order) => (
                    <Badge
                      key={order.id}
                      variant={getOrderTypeBadgeVariant(order.type)}
                      className="mr-1 px-1 py-0 text-[10px]"
                    >
                      {order.type}
                      <span className="ml-1">#{order.id}</span>
                    </Badge>
                  ))}
                </div>
              </TableCell>
              {filteredItems.map((item) => {
                // Always use the running total for this date for this item
                const quantity = dateData.allItemTotals[item.id] || 0;
                const itemWithChange = dateData.itemsWithChanges?.[item.id];

                return (
                  <TableCell key={item.id} className="p-4 text-right">
                    <div>
                      <span className="flex justify-end items-center">
                        {quantity < 0 && (
                          <AlertTriangle className="mr-1 w-4 h-4 text-red-500" />
                        )}
                        <span>{Math.round(quantity)}</span>
                      </span>
                      {itemWithChange && (
                        <div
                          className={`text-xs font-medium ${
                            itemWithChange.quantity_change < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {itemWithChange.quantity_change > 0 ? "+" : ""}
                          {Math.round(itemWithChange.quantity_change)}
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
  );
};

function StockHistoryPage() {
  const { inventoryHistory, locations } = Route.useLoaderData();
  const [activeTab, setActiveTab] = React.useState("all");
  const navigate = useNavigate();

  // Current address ID from the URL params
  const { addressId } = Route.useParams();

  // Format address for display with correct field names
  const formatAddressPreview = (location: Location) => {
    const parts = [];
    if (location.line_1) parts.push(location.line_1);
    if (location.city) parts.push(location.city);
    if (location.region) parts.push(location.region);

    return parts.length > 0
      ? `${location.name} - ${parts.join(", ")}`
      : location.name;
  };

  // Get current selected location from locations array
  const currentLocation = locations.find(
    (location) => location.id.toString() === addressId,
  );

  // Handle location change
  const handleLocationChange = (value: string) => {
    navigate({
      to: "/home/stock/history/$addressId",
      params: { addressId: value },
    });
  };

  return (
    <div className="mx-auto">
      <div className="flex md:flex-row-reverse flex-col justify-between items-center gap-4 mb-4">
        <div className="w-full md:w-auto">
          <Select value={addressId} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full md:w-[320px]">
              <SelectValue>
                {currentLocation
                  ? formatAddressPreview(currentLocation)
                  : "Select location"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem
                  key={location.id}
                  value={location.id.toString()}
                  className="py-2"
                >
                  <div>
                    <div className="font-medium">{location.name}</div>
                    {(location.line_1 || location.city) && (
                      <div className="mt-0.5 text-gray-500 text-xs truncate">
                        {[
                          location.line_1,
                          location.city,
                          location.region,
                          location.code,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="parts">Parts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {!inventoryHistory || inventoryHistory.length === 0 ? (
        <div className="bg-white p-4 border rounded-lg text-center">
          <p className="text-gray-500 text-lg">
            No inventory history found for this address.
          </p>
        </div>
      ) : (
        <StockHistoryTable
          inventoryHistory={inventoryHistory}
          activeTab={activeTab}
        />
      )}
    </div>
  );
}

export const Route = createFileRoute("/home/stock/history/$addressId")({
  component: StockHistoryPage,
  loader: async ({ params, context }) => {
    const { addressId } = params;

    // Fetch both inventory history and locations in parallel
    const [inventoryHistory, locations] = await Promise.all([
      context.queryClient.ensureQueryData(
        getInventoryHistoryQueryOptions(addressId),
      ),
      context.queryClient.ensureQueryData(getLocationsQueryOptions()),
    ]);

    return {
      inventoryHistory,
      locations,
    };
  },
});
