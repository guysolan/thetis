import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { Badge } from "@thetis/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import { Button } from "@thetis/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@thetis/ui/dropdown-menu";
import dayjs from "dayjs";
import {
  getOrderTypeBadgeVariant,
  getUniqueItems,
  filterItemsByType,
  getTableData,
  getAllItemsForAddress,
  getItemQuantityAtTime,
  getItemChangeAtTime,
} from "./utils";

export interface InventoryHistoryRecord {
  transaction_date: string;
  order_id: number;
  order_type: string;
  address_id?: number;
  items: {
    id: number;
    name: string;
    type: string;
    quantity: number;
    change: number;
    address_id?: number;
  }[];
}

interface StockHistoryTableProps {
  inventoryHistory: InventoryHistoryRecord[];
  addressId?: number;
}

export const StockHistoryTable: React.FC<StockHistoryTableProps> = ({
  inventoryHistory,
  addressId,
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [uniqueItems, setUniqueItems] = useState<
    Map<number, { id: number; name: string; type: string }>
  >(new Map());
  const [visibleItems, setVisibleItems] = useState<
    { id: number; name: string; type: string }[]
  >([]);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [tableData, setTableData] = useState<InventoryHistoryRecord[]>([]);

  // Initialize unique items
  useEffect(() => {
    // Get all items that have ever been in stock for this address
    const items = getAllItemsForAddress(inventoryHistory, addressId);
    const itemsMap = new Map<
      number,
      { id: number; name: string; type: string }
    >();

    items.forEach((item) => {
      itemsMap.set(item.id, item);
    });

    setUniqueItems(itemsMap);
  }, [inventoryHistory, addressId]);

  // Update visible items when tab changes
  useEffect(() => {
    const items = Array.from(uniqueItems.values());
    const filteredItems = filterItemsByType(items, activeTab);
    setVisibleItems(filteredItems);
  }, [uniqueItems, activeTab]);

  // Update table data when visible items change
  useEffect(() => {
    const data = getTableData(inventoryHistory, visibleItems, addressId);
    setTableData(data);
  }, [inventoryHistory, visibleItems, addressId]);

  const toggleColumn = (column: string) => {
    setHiddenColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column],
    );
  };

  const renderTable = () => {
    return (
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Type</TableHead>
              {visibleItems
                .filter((item) => !hiddenColumns.includes(item.name))
                .map((item) => (
                  <TableHead key={item.id}>{item.name}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((record, index) => (
              <TableRow key={`${record.order_id}-${index}`}>
                <TableCell>
                  {dayjs(record.transaction_date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {record.order_id === 0 ? "Current" : record.order_id}
                </TableCell>
                <TableCell>
                  <Badge variant={getOrderTypeBadgeVariant(record.order_type)}>
                    {record.order_type}
                  </Badge>
                </TableCell>
                {visibleItems
                  .filter((item) => !hiddenColumns.includes(item.name))
                  .map((item) => {
                    // For current stock record, use the item directly from the record
                    // For historical records, find the item in the record or get its quantity at that time
                    let itemData:
                      | {
                          id: number;
                          name: string;
                          type: string;
                          quantity: number;
                          change: number;
                          address_id?: number;
                        }
                      | undefined;

                    if (record.order_id === 0) {
                      // Current stock record
                      itemData = record.items.find((i) => i.id === item.id);
                    } else {
                      // Historical record
                      const quantity = getItemQuantityAtTime(
                        item.id,
                        inventoryHistory,
                        record.transaction_date,
                        addressId,
                      );

                      const change = getItemChangeAtTime(
                        item.id,
                        inventoryHistory,
                        record.transaction_date,
                        addressId,
                      );

                      if (quantity > 0 || change !== 0) {
                        itemData = {
                          id: item.id,
                          name: item.name,
                          type: item.type,
                          quantity,
                          change,
                          address_id: addressId,
                        };
                      }
                    }

                    return (
                      <TableCell key={item.id}>
                        {itemData ? (
                          <div>
                            <div>{itemData.quantity}</div>
                            {itemData.change !== 0 && (
                              <div
                                className={`text-xs ${
                                  itemData.change > 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {itemData.change > 0 ? "+" : ""}
                                {itemData.change}
                              </div>
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="parts">Parts</TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 w-4 h-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {visibleItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => toggleColumn(item.name)}
              >
                {hiddenColumns.includes(item.name) ? (
                  <EyeOff className="mr-2 w-4 h-4" />
                ) : (
                  <Eye className="mr-2 w-4 h-4" />
                )}
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {renderTable()}
    </div>
  );
};

export default StockHistoryTable;
