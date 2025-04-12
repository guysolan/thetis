import React from "react";
import dayjs from "dayjs";
import { Badge } from "@thetis/ui/badge";
import { Button } from "@thetis/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@thetis/ui/command";
import {
  Check,
  LayoutList,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@thetis/ui/cn";
import { Tabs, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";

// Simplified interface for inventory history
interface InventoryHistoryRecord {
  order_id: number;
  address_id: number;
  address_name: string;
  transaction_date: string;
  order_date: string;
  order_type: "purchase" | "sale" | "shipment" | "stocktake" | "current";
  from_company: string | null;
  to_company: string | null;
  items: Array<{
    id: number;
    name: string;
    type: string;
    quantity: number;
    change: number;
    address_id?: number;
  }>;
  item_quantities: Record<string, number>;
  items_changed: number;
  net_change: number;
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
    default:
      return "default";
  }
}

interface StockHistoryTableProps {
  inventoryHistory: InventoryHistoryRecord[];
  activeTab: string;
}

const StockHistoryTable: React.FC<StockHistoryTableProps> = ({
  inventoryHistory,
  activeTab,
}) => {
  // State for active tab
  const [activeTabState, setActiveTabState] = React.useState(activeTab);

  // Get unique items and filter based on active tab
  const uniqueItems = new Map<
    number,
    { id: number; name: string; type: string }
  >();

  inventoryHistory.forEach((record) => {
    record.items.forEach((item) => {
      if (!item.address_id || item.address_id === record.address_id) {
        if (!uniqueItems.has(item.id)) {
          uniqueItems.set(item.id, {
            id: item.id,
            name: item.name,
            type: item.type,
          });
        }
      }
    });
  });

  // Filter items based on type and active tab
  const filteredItems = Array.from(uniqueItems.values()).filter((item) => {
    const itemType = item.type.toLowerCase();
    if (itemType === "package" || itemType === "service") return false;
    if (activeTabState === "all") return true;
    if (activeTabState === "products") return itemType === "product";
    if (activeTabState === "parts") return itemType === "part";
    return true;
  });

  // State for column visibility
  const [hiddenColumns, setHiddenColumns] = React.useState<Set<number>>(
    new Set(),
  );
  const [openColumns, setOpenColumns] = React.useState(false);

  // Toggle column visibility
  const toggleColumnVisibility = (itemId: number) => {
    setHiddenColumns((prev) => {
      const newHiddenColumns = new Set(prev);
      if (newHiddenColumns.has(itemId)) {
        newHiddenColumns.delete(itemId);
      } else {
        newHiddenColumns.add(itemId);
      }
      return newHiddenColumns;
    });
  };

  // Get visible items (excluding hidden columns)
  const visibleItems = filteredItems.filter(
    (item) => !hiddenColumns.has(item.id),
  );

  // Get the latest quantity for each item
  const getCurrentQuantity = (itemId: number) => {
    if (!inventoryHistory.length) return 0;

    // Find the most recent record that mentions this item
    for (const record of inventoryHistory) {
      const itemEntry = record.items.find(
        (item) =>
          item.id === itemId &&
          (!item.address_id || item.address_id === record.address_id),
      );

      if (itemEntry) {
        // Return the quantity from the first (most recent) record mentioning this item
        return itemEntry.quantity;
      }
    }

    // If no record mentions this item, return 0
    return 0;
  };

  // Create current stock record
  const currentStockRecord = inventoryHistory.length
    ? ({
        ...inventoryHistory[0],
        items: visibleItems.map((item) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          quantity: getCurrentQuantity(item.id),
          change: 0,
          address_id: undefined,
        })),
        transaction_date: "Current",
        order_id: 0,
        order_type: "current",
      } as InventoryHistoryRecord)
    : null;

  // Combine current stock with history
  const tableData = currentStockRecord
    ? [currentStockRecord, ...inventoryHistory]
    : inventoryHistory;

  if (!inventoryHistory || inventoryHistory.length === 0) {
    return (
      <div className="p-4 text-center">
        No inventory history found for this address.
      </div>
    );
  }

  // Render cell content for an item
  const renderItemCell = (record: InventoryHistoryRecord, itemId: number) => {
    if (record.transaction_date === "Current") {
      const quantity = getCurrentQuantity(itemId);
      return (
        <div className="text-right">
          <span
            className={cn("font-semibold", quantity < 0 ? "text-red-500" : "")}
          >
            {Math.round(quantity)}
          </span>
        </div>
      );
    }

    const itemEntry = record.items.find(
      (i) =>
        i.id === itemId &&
        (!i.address_id || i.address_id === record.address_id),
    );

    return (
      <div className="text-right">
        <div className="flex justify-end items-center">
          <div className="flex items-center">
            {itemEntry && itemEntry.change !== 0 && (
              <Badge
                className={`text-xs font-medium flex px-1 py-0.5 items-center mr-2 ${
                  itemEntry.change < 0
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-500"
                }`}
              >
                {itemEntry.change > 0 ? (
                  <TrendingUp className="mx-0.5 w-3 h-3" />
                ) : (
                  <TrendingDown className="mx-0.5 w-3 h-3" />
                )}
                {Math.abs(Math.round(itemEntry.change))}
              </Badge>
            )}

            <span
              className={
                itemEntry && itemEntry.quantity < 0
                  ? "text-red-500 font-medium"
                  : ""
              }
            >
              {itemEntry ? Math.round(itemEntry.quantity) : 0}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Render date cell
  const renderDateCell = (record: InventoryHistoryRecord) => {
    return (
      <div className="left-0 z-10 w-[150px]">
        <div className="font-medium">
          {record.transaction_date === "Current"
            ? "Current"
            : dayjs(record.transaction_date).format("DD MMM YYYY")}
        </div>
        <div className="text-gray-500 text-xs">
          {record.transaction_date !== "Current" && (
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
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="bg-neutral-100 p-1 rounded-md">
          <Tabs
            defaultValue={activeTabState}
            className="w-full"
            onValueChange={setActiveTabState}
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="parts">Parts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Popover open={openColumns} onOpenChange={setOpenColumns}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openColumns}
              className="ml-auto"
            >
              <LayoutList className="mr-2 w-4 h-4" />
              {hiddenColumns.size > 0
                ? `${hiddenColumns.size} columns hidden`
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
                {filteredItems.map((item) => {
                  const isVisible = !hiddenColumns.has(item.id);

                  return (
                    <CommandItem
                      key={item.id}
                      onSelect={() => toggleColumnVisibility(item.id)}
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
                        <span className="font-medium">{item.name}</span>
                        {item.type && (
                          <span className="ml-2 text-muted-foreground text-xs capitalize">
                            ({item.type})
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
        <Table>
          <TableCaption className="pb-4 text-left">
            Stock levels at each point when inventory changed
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b-2">
              <TableHead className="left-0 z-10 sticky bg-white p-4 border-neutral-300 border-r w-[150px] text-left">
                <div className="font-bold">Date</div>
              </TableHead>
              {visibleItems.map((item) => (
                <TableHead key={item.id} className="p-4 text-right">
                  <div className="min-w-[120px]">
                    <div className="font-medium">{item.name}</div>
                    <div className="font-normal text-gray-500 text-xs capitalize">
                      {item.type}
                    </div>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((record, index) => (
              <TableRow
                key={`${record.order_id}-${record.transaction_date}`}
                className={
                  index === 0
                    ? "hover:bg-gray-50 font-bold"
                    : "hover:bg-gray-50"
                }
              >
                <TableCell className="left-0 z-10 sticky bg-white p-4 border-neutral-300 border-r">
                  {renderDateCell(record)}
                </TableCell>
                {visibleItems.map((item) => (
                  <TableCell key={item.id} className="p-4">
                    {renderItemCell(record, item.id)}
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

export default StockHistoryTable;
export type { InventoryHistoryRecord };
