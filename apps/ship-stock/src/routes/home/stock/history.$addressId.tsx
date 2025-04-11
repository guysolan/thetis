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
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@thetis/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@thetis/ui/command";
import { Check, LayoutList } from "lucide-react";
import { cn } from "@thetis/ui/cn";
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
    .order("transaction_date", { ascending: false });

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

// Interface for column data
interface ItemColumn {
  id: number;
  name: string;
  type: string;
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

  // Get current stock (first record since we're now getting data in descending order)
  const currentStock = inventoryHistory.length > 0 ? inventoryHistory[0] : null;

  // Get the latest quantity for each item by finding the last non-zero value
  const getCurrentQuantity = (itemId: number) => {
    if (!inventoryHistory.length) return 0;

    // Loop through history in reverse (newest to oldest) to find the most recent non-zero quantity
    for (const record of inventoryHistory) {
      const itemEntry = record.items.find((item) => item.id === itemId);
      if (itemEntry && itemEntry.quantity !== 0) {
        return itemEntry.quantity;
      }
    }

    return 0;
  };

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [openColumns, setOpenColumns] = React.useState(false);

  // Create columns dynamically based on filteredItems
  const columns = React.useMemo<ColumnDef<InventoryHistoryRecord>[]>(() => {
    const baseColumns = [
      {
        id: "date",
        header: () => <div className="font-bold">Date</div>,
        cell: ({ row }) => {
          const record = row.original;
          return (
            <div className="left-0 z-10 w-[150px]">
              <div className="font-medium">
                {record === currentStock
                  ? "Current"
                  : dayjs(record.transaction_date).format("DD MMM YYYY")}
              </div>
              <div className="text-gray-500 text-xs">
                {record !== currentStock && (
                  <Badge
                    variant={getOrderTypeBadgeVariant(record.order_type)}
                    className="mr-1 px-1 py-0 text-[10px]"
                  >
                    {record.order_type}
                    <span className="ml-1">#{record.order_id}</span>
                  </Badge>
                )}
              </div>
            </div>
          );
        },
      },
    ];

    // Create a column for each filtered item
    const itemColumns = filteredItems.map((item) => ({
      id: `item-${item.id}`,
      header: () => (
        <div className="min-w-[120px] text-right">
          <div className="font-medium">{item.name}</div>
          <div className="font-normal text-gray-500 text-xs capitalize">
            {item.type}
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const record = row.original;
        // For "Current" row, show calculated total
        if (record === currentStock) {
          const quantity = getCurrentQuantity(item.id);
          return (
            <div className="text-right">
              <span
                className={cn(
                  "font-semibold",
                  quantity < 0 ? "text-red-500" : "",
                )}
              >
                {Math.round(quantity)}
              </span>
            </div>
          );
        }

        // For history rows
        const itemEntry = record.items.find((i) => i.id === item.id);
        return (
          <div className="text-right">
            <div>
              <span className="flex justify-end items-center">
                {itemEntry && itemEntry.quantity < 0 && (
                  <AlertTriangle className="mr-1 w-4 h-4 text-red-500" />
                )}
                <span>{itemEntry ? Math.round(itemEntry.quantity) : 0}</span>
              </span>
              {itemEntry && itemEntry.change !== 0 && (
                <div
                  className={`text-xs font-medium ${
                    itemEntry.change < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {itemEntry.change > 0 ? "+" : ""}
                  {Math.round(itemEntry.change)}
                </div>
              )}
            </div>
          </div>
        );
      },
    }));

    return [...baseColumns, ...itemColumns];
  }, [filteredItems, currentStock, inventoryHistory]);

  // Memoize the data array to prevent recreating it on every render
  const tableData = React.useMemo(() => {
    if (!currentStock) {
      return inventoryHistory;
    }
    return [
      currentStock,
      ...inventoryHistory.filter((record) => record !== currentStock),
    ].filter(Boolean) as InventoryHistoryRecord[];
  }, [currentStock, inventoryHistory]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  if (!inventoryHistory || inventoryHistory.length === 0) {
    return (
      <div className="p-4 text-center">
        No inventory history found for this address.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Popover open={openColumns} onOpenChange={setOpenColumns}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openColumns}
              className="ml-auto"
            >
              <LayoutList className="mr-2 w-4 h-4" />
              {Object.keys(columnVisibility).length > 0
                ? `${Object.keys(columnVisibility).length} columns hidden`
                : "Toggle Columns"}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="bg-white p-0 w-3/4 md:w-[350px] lg:w-[450px]"
            align="end"
          >
            <Command className="border-none">
              <CommandEmpty>No columns found.</CommandEmpty>
              <CommandGroup heading="Toggle Item Columns">
                {table
                  .getAllColumns()
                  .filter(
                    (column) => column.getCanHide() && column.id !== "date",
                  )
                  .map((column) => {
                    const isVisible = column.getIsVisible();
                    // Get the item details for better display
                    const itemMatch = /item-(\d+)/.exec(column.id);
                    let columnLabel = column.id;
                    let itemType = "";

                    if (itemMatch) {
                      const itemId = Number.parseInt(itemMatch[1], 10);
                      const item = filteredItems.find((i) => i.id === itemId);
                      if (item) {
                        columnLabel = item.name;
                        itemType = item.type;
                      }
                    }

                    return (
                      <CommandItem
                        key={column.id}
                        onSelect={() => column.toggleVisibility(!isVisible)}
                        className="flex items-center hover:bg-slate-100 px-2 py-2 transition-colors cursor-pointer"
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isVisible
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50",
                          )}
                        >
                          {isVisible && <Check className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="font-medium">{columnLabel}</span>
                          {itemType && (
                            <span className="ml-2 text-muted-foreground text-xs capitalize">
                              ({itemType})
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-8 overflow-x-auto">
        <Table className="bg-white">
          <TableCaption className="pb-4">
            Stock levels at each point when inventory changed
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b-2">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      header.id === "date"
                        ? "left-0 z-10 sticky bg-white p-4 border-neutral-300 border-r w-[150px]"
                        : "p-4",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={
                  index === 0
                    ? "hover:bg-gray-50 font-bold"
                    : "hover:bg-gray-50"
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "p-4",
                      cell.column.id === "date"
                        ? "left-0 z-10 sticky bg-white border-neutral-300 border-r"
                        : "",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
