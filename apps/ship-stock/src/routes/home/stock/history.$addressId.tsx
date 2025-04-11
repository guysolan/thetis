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

// Simplified interface for inventory history
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
    quantity: number;
    change: number;
  }>;
  item_quantities: Record<string, number>;
  items_changed: number;
  net_change: number;
}

// Update Location interface to match the database schema
interface Location {
  id: number;
  name: string;
  line_1?: string;
  line_2?: string;
  city?: string;
  region?: string;
  code?: string;
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
    .order("transaction_date", { ascending: true });

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
    default:
      return "default";
  }
}

// Simplified StockHistoryTable component
const StockHistoryTable: React.FC<{
  inventoryHistory: InventoryHistoryRecord[];
  activeTab: string;
}> = ({ inventoryHistory, activeTab }) => {
  // Get unique items across all records
  const uniqueItems = React.useMemo(() => {
    const itemMap = new Map<
      number,
      { id: number; name: string; type: string }
    >();

    inventoryHistory.forEach((record) => {
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

  // Filter items based on active tab
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

  // Get current stock (most recent record)
  const currentStock =
    inventoryHistory.length > 0
      ? inventoryHistory[inventoryHistory.length - 1]
      : null;

  // Get the latest quantity for each item
  const getCurrentQuantity = (itemId: number) => {
    if (!currentStock) return 0;

    // Find the last entry for this item ID
    const itemEntries = currentStock.items.filter((item) => item.id === itemId);
    if (itemEntries.length === 0) return 0;

    // Return the quantity from the last entry
    return itemEntries[itemEntries.length - 1].quantity;
  };

  if (!inventoryHistory || inventoryHistory.length === 0) {
    return (
      <div className="p-4 text-center">
        No inventory history found for this address.
      </div>
    );
  }

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
                const quantity = getCurrentQuantity(item.id);
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
          {inventoryHistory.map((record) => (
            <TableRow
              key={`${record.order_id}-${record.transaction_date}`}
              className="hover:bg-gray-50"
            >
              <TableCell className="left-0 z-10 sticky bg-white p-4 border-neutral-300 border-r">
                <div className="font-medium">
                  {dayjs(record.transaction_date).format("DD MMM YYYY")}
                </div>
                <div className="text-gray-500 text-xs">
                  <Badge
                    variant={getOrderTypeBadgeVariant(record.order_type)}
                    className="mr-1 px-1 py-0 text-[10px]"
                  >
                    {record.order_type}
                    <span className="ml-1">#{record.order_id}</span>
                  </Badge>
                </div>
              </TableCell>
              {filteredItems.map((item) => {
                // Find the last entry for this item in this record
                const itemEntries = record.items.filter(
                  (i) => i.id === item.id,
                );
                const lastEntry =
                  itemEntries.length > 0
                    ? itemEntries[itemEntries.length - 1]
                    : null;

                return (
                  <TableCell key={item.id} className="p-4 text-right">
                    <div>
                      <span className="flex justify-end items-center">
                        {lastEntry && lastEntry.quantity < 0 && (
                          <AlertTriangle className="mr-1 w-4 h-4 text-red-500" />
                        )}
                        <span>
                          {lastEntry ? Math.round(lastEntry.quantity) : 0}
                        </span>
                      </span>
                      {lastEntry && lastEntry.change !== 0 && (
                        <div
                          className={`text-xs font-medium ${
                            lastEntry.change < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {lastEntry.change > 0 ? "+" : ""}
                          {Math.round(lastEntry.change)}
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
