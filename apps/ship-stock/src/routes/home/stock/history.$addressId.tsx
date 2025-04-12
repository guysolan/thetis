import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import StockHistoryTable, {
  InventoryHistoryRecord,
} from "../../../features/stock-history/StockHistoryTable";
import { supabase } from "@/lib/supabase";
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
    .order("transaction_date", { ascending: false });

  if (error) {
    throw new Error(`Error fetching inventory history: ${error.message}`);
  }

  // Cast the data to ensure order_type is the correct type
  return data.map((record) => ({
    ...record,
    order_type: record.order_type as
      | "purchase"
      | "sale"
      | "shipment"
      | "stocktake",
    items: record.items.map((item) => ({
      ...item,
      address_id: item.address_id || record.address_id,
    })),
  })) as InventoryHistoryRecord[];
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

function StockHistoryPage() {
  const { inventoryHistory, locations } = Route.useLoaderData();
  const [activeTab, setActiveTab] = React.useState("all");
  const navigate = useNavigate();

  // Current address ID from the URL params
  const { addressId } = Route.useParams();

  // Format address for display with correct field names
  const formatAddressPreview = (location: Location) => {
    const parts: string[] = [];
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
