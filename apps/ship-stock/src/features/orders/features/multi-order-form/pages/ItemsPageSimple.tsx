import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import * as React from "react";
import InventoryImpact from "../../../components/InventoryImpact";
import { Badge } from "@thetis/ui/badge";
import { Button } from "@thetis/ui/button";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Layers,
  MoreHorizontal,
  Package,
  Plus,
  Trash,
} from "lucide-react";
import { Input } from "@thetis/ui/input";
import { useBuyForm } from "../../../hooks/useBuyForm";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@thetis/ui/dropdown-menu";
import { Combobox } from "@/components/Combobox";
import NumberCell from "../../../components/NumberFlowCell";
import { useSelectItemsByAddress } from "../../../../stockpiles/api/selectItemsByAddress";
import { useSelectInventoryHistory } from "../../../../stock-history/api/selectInventoryHistory";
import { getCurrentQuantity } from "../../../../stock-history/utils";
import { defaultTax } from "../../../../../constants/tax";
import calculateItemTotal from "../../../utils/calculateItemTotal";
import NumberFlow from "@number-flow/react";
import { cn } from "@thetis/ui/cn";
import PackageDimensions from "../../../components/PackageDimensions";
import AddPackageDialog from "../../../components/AddPackageDialog";

interface ItemsPageSimpleProps {
  originalQuantityChanges?: Record<string, number>;
}

export function ItemsPageSimple({ originalQuantityChanges = {} }: ItemsPageSimpleProps) {
  const form = useFormContext();
  const orderType = useWatch({ control: form.control, name: "order_type" });
  const { data: itemsView } = useSelectItemsView();

  const isShipment = orderType === "ship";
  const isBuild = orderType === "build";

  // Get last item change for generating unique IDs
  const { data: lastItemChange } = useQuery({
    queryKey: ["last-item-change"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("item_changes")
        .select("*")
        .order("id", { ascending: false })
        .limit(1)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const {
    fields: packageFields,
    append: appendPackage,
    remove: removePackage,
  } = useFieldArray({
    name: "package_items",
  });

  const availablePackages = itemsView?.filter(
    (item) => item.item_type === "package",
  ) || [];

  const [addPackageDialogOpen, setAddPackageDialogOpen] = React.useState(false);

  // Sync to_items to from_items for shipments
  React.useEffect(() => {
    if (!isShipment) return;

    const subscription = form.watch((value, { name: fieldName }) => {
      if (fieldName?.startsWith("to_items")) {
        const toItems = form.getValues("to_items") || [];
        const fromItems = toItems.map((item: any) => ({
          ...item,
          quantity_change: -Number(item.quantity_change || 0),
        }));
        form.setValue("from_items", fromItems, {
          shouldDirty: false,
          shouldValidate: false,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [isShipment, form]);

  // Determine which items array to use based on order type
  type ItemsToUpdate =
    | "order_items"
    | "produced_items"
    | "from_items"
    | "to_items";

  const getItemsConfig = (): {
    itemsName: ItemsToUpdate;
    addressName: string;
    fromItemsName?: string;
    fromAddressName?: string;
    packageItemsToUpdate: ItemsToUpdate[];
  } => {
    if (isShipment) {
      return {
        itemsName: "to_items",
        addressName: "to_shipping_address_id",
        fromItemsName: "from_items",
        fromAddressName: "from_shipping_address_id",
        packageItemsToUpdate: ["from_items", "to_items"],
      };
    } else if (isBuild) {
      return {
        itemsName: "produced_items",
        addressName: "from_shipping_address_id",
        packageItemsToUpdate: ["produced_items"],
      };
    } else if (orderType === "buy") {
      return {
        itemsName: "order_items",
        addressName: "to_shipping_address_id",
        packageItemsToUpdate: ["order_items"],
      };
    } else {
      return {
        itemsName: "order_items",
        addressName: "from_shipping_address_id",
        packageItemsToUpdate: ["order_items"],
      };
    }
  };

  const itemsConfig = getItemsConfig();

  const getOrderTypeLabel = () => {
    switch (orderType) {
      case "sell":
        return "Sell";
      case "build":
        return "Build";
      case "buy":
        return "Buy";
      case "ship":
        return "Ship";
      case "count":
        return "Count";
      default:
        return "Order";
    }
  };

  const getInstructions = () => {
    switch (orderType) {
      case "sell":
        return "Add packages or individual items you're selling.";
      case "build":
        return "Add packages or items to produce. Components will be calculated automatically.";
      case "buy":
        return "Add items you're buying. Stock will be added to the delivery address.";
      case "ship":
        return "Add items you're shipping between locations.";
      case "count":
        return "Count stock at a location.";
      default:
        return "Add items to this order.";
    }
  };

  // Package management functions
  const createPackageItems = (
    packageComponents: any[],
    packageId: string,
    packageItemChangeId: number,
  ) => {
    return packageComponents.map((component) => ({
      item_id: String(component.component_id),
      quantity_change: component.component_quantity,
      item_price: component.component_price,
      item_type: component.component_type,
      package_item_change_id: packageItemChangeId,
      item_tax: 0.2,
      item_total: component.component_price * component.component_quantity *
        1.2,
      quantity_before: 0,
      quantity_after: 0,
      lot_number: "",
    }));
  };

  const handleAddPackage = (packageId?: string) => {
    const lastId = lastItemChange?.id ?? 0;
    const packagesCount = packageFields.length;
    const newPackageItemChangeId = lastId + packagesCount + 1;

    appendPackage({
      package_id: packageId || "",
      package_item_change_id: newPackageItemChangeId,
    });

    // If a package was selected, add its items
    if (packageId) {
      const selectedPkg = availablePackages.find(
        (item) => String(item.item_id) === packageId,
      );

      if (selectedPkg?.components) {
        const newItems = createPackageItems(
          selectedPkg.components,
          packageId,
          newPackageItemChangeId,
        );

        itemsConfig.packageItemsToUpdate.forEach((fieldName) => {
          const currentItems = form.getValues(fieldName) || [];
          let itemsToAdd = newItems;
          if (fieldName === "from_items") {
            itemsToAdd = newItems.map((item) => ({
              ...item,
              quantity_change: -item.quantity_change,
            }));
          }
          form.setValue(fieldName, [...currentItems, ...itemsToAdd]);
        });
      }
    }
  };

  const handleRemovePackage = (index: number) => {
    const packageItemChangeId = form.getValues(
      `package_items.${index}.package_item_change_id`,
    );

    // Remove items belonging to this package from all target fields
    itemsConfig.packageItemsToUpdate.forEach((fieldName) => {
      const currentItems = form.getValues(fieldName) || [];
      const filtered = currentItems.filter(
        (item: any) => item.package_item_change_id !== packageItemChangeId,
      );
      form.setValue(fieldName, filtered);
    });

    removePackage(index);
  };

  const handleDuplicatePackage = (index: number) => {
    const currentPackage = form.getValues(`package_items.${index}`);
    const lastId = lastItemChange?.id ?? 0;
    const packagesCount = packageFields.length;
    const newPackageItemChangeId = lastId + packagesCount + 2;

    appendPackage({
      package_id: currentPackage.package_id,
      package_item_change_id: newPackageItemChangeId,
    });

    if (currentPackage.package_id) {
      const selectedPkg = availablePackages.find(
        (item) => String(item.item_id) === currentPackage.package_id,
      );

      if (selectedPkg?.components) {
        const newItems = createPackageItems(
          selectedPkg.components,
          currentPackage.package_id,
          newPackageItemChangeId,
        );

        itemsConfig.packageItemsToUpdate.forEach((fieldName) => {
          const currentItems = form.getValues(fieldName) || [];
          let itemsToAdd = newItems;
          if (fieldName === "from_items") {
            itemsToAdd = newItems.map((item) => ({
              ...item,
              quantity_change: -item.quantity_change,
            }));
          }
          form.setValue(fieldName, [...currentItems, ...itemsToAdd]);
        });
      }
    }
  };

  const handleUpdatePackage = (index: number, newPackageId: string) => {
    const packageItemChangeId = form.getValues(
      `package_items.${index}.package_item_change_id`,
    );

    form.setValue(`package_items.${index}.package_id`, newPackageId);

    const selectedPkg = availablePackages.find(
      (item) => String(item.item_id) === newPackageId,
    );

    itemsConfig.packageItemsToUpdate.forEach((fieldName) => {
      const currentItems = form.getValues(fieldName) || [];
      const itemsWithoutThisPackage = currentItems.filter(
        (item: any) => item.package_item_change_id !== packageItemChangeId,
      );

      if (selectedPkg?.components) {
        const newItems = createPackageItems(
          selectedPkg.components,
          newPackageId,
          packageItemChangeId,
        );

        let itemsToAdd = newItems;
        if (fieldName === "from_items") {
          itemsToAdd = newItems.map((item) => ({
            ...item,
            quantity_change: -item.quantity_change,
          }));
        }

        form.setValue(fieldName, [...itemsWithoutThisPackage, ...itemsToAdd]);
      } else {
        form.setValue(fieldName, itemsWithoutThisPackage);
      }
    });
  };

  // Add individual item
  const handleAddIndividualItem = (type: string = "product") => {
    const currentItems = form.getValues(itemsConfig.itemsName) || [];
    form.setValue(itemsConfig.itemsName, [
      ...currentItems,
      {
        item_type: type,
        item_id: "",
        // For stocktakes, default to 0 change; for other orders, default to 1
        quantity_change: isStocktake ? 0 : 1,
        item_price: 0,
        item_tax: isStocktake ? 0 : defaultTax,
        item_total: 0,
        quantity_before: 0,
        quantity_after: 0,
        lot_number: "",
        package_item_change_id: undefined,
      },
    ]);
  };

  // Calculate grand total
  const allItems = form.watch(itemsConfig.itemsName) || [];
  const grandTotal = allItems.reduce((sum: number, item: any) => {
    return sum + (item.item_total || 0);
  }, 0);
  const currency = form.watch("currency") || "USD";

  // Set mode to package by default
  React.useEffect(() => {
    form.setValue("mode", "package", { shouldDirty: false });
  }, [form]);

  const isStocktake = orderType === "count";
  const showPrice = !isBuild && !isStocktake;
  const showTax = !isBuild && !isStocktake;
  const showPackages = !isStocktake;

  // Group items by package
  const packageItemsMap = new Map<number, { item: any; index: number }[]>();
  const individualItems: { item: any; index: number }[] = [];

  allItems.forEach((item: any, index: number) => {
    if (item.package_item_change_id) {
      const existing = packageItemsMap.get(item.package_item_change_id) || [];
      existing.push({ item, index });
      packageItemsMap.set(item.package_item_change_id, existing);
    } else {
      individualItems.push({ item, index });
    }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-semibold text-lg">Items</h2>
            <Badge variant="outline" className="text-xs">
              {getOrderTypeLabel()}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{getInstructions()}</p>
        </div>

        {/* Add buttons in header */}
        <div className="flex gap-2">
          {showPackages && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAddPackageDialogOpen(true)}
            >
              <Package className="mr-2 w-4 h-4" />
              Add Package
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <Plus className="mr-2 w-4 h-4" />
                Add Item
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleAddIndividualItem("product")}
              >
                Add Product
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddIndividualItem("part")}>
                Add Part
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddIndividualItem("service")}
              >
                Add Service
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Package Groups - not shown for stocktakes */}
      {showPackages && packageFields.map((field, pkgIndex) => {
        const packageItemChangeId = form.watch(
          `package_items.${pkgIndex}.package_item_change_id`,
        );
        const selectedPackageId = form.watch(
          `package_items.${pkgIndex}.package_id`,
        );
        const selectedPackage = availablePackages.find(
          (item) => String(item.item_id) === selectedPackageId,
        );
        const pkgItems = packageItemsMap.get(packageItemChangeId) || [];
        const packageTotal = pkgItems.reduce(
          (sum, { item }) => sum + (item.item_total || 0),
          0,
        );

        return (
          <div
            key={field.id}
            className="bg-card border rounded-lg overflow-hidden"
          >
            {/* Package Header */}
            <div className="flex items-center gap-3 bg-primary/5 px-4 py-3 border-b">
              <Package className="w-5 h-5 text-primary" />
              {selectedPackage
                ? (
                  <>
                    <span className="font-semibold text-primary">
                      {selectedPackage.item_name}
                    </span>
                    <PackageDimensions selectedPackage={selectedPackage} />
                  </>
                )
                : (
                  <Select
                    value={selectedPackageId || ""}
                    onValueChange={(value) =>
                      handleUpdatePackage(pkgIndex, value)}
                  >
                    <SelectTrigger className="bg-background w-56 h-8">
                      <SelectValue placeholder="Select a package..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePackages.map((item) => (
                        <SelectItem
                          key={item.item_id}
                          value={String(item.item_id)}
                        >
                          {item.item_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

              <div className="flex items-center gap-3 ml-auto">
                {showPrice && pkgItems.length > 0 && (
                  <span className="font-semibold text-primary text-sm">
                    {new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: currency,
                    }).format(packageTotal)}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDuplicatePackage(pkgIndex)}
                    className="w-8 h-8"
                    title="Duplicate package"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePackage(pkgIndex)}
                    className="w-8 h-8 text-muted-foreground hover:text-destructive"
                    title="Remove package"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Package Items */}
            {(selectedPackage || pkgItems.length > 0) && (
              <div className="px-4 py-4">
                <Table className="border-none">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b">
                      <TableHead className="font-medium text-muted-foreground text-xs">
                        Item
                      </TableHead>
                      <TableHead className="w-28 font-medium text-muted-foreground text-xs">
                        Lot #
                      </TableHead>
                      <TableHead className="w-24 font-medium text-muted-foreground text-xs text-center">
                        Qty
                      </TableHead>
                      {showPrice && (
                        <TableHead className="w-28 font-medium text-muted-foreground text-xs text-center">
                          Price
                        </TableHead>
                      )}
                      {showTax && (
                        <TableHead className="w-24 font-medium text-muted-foreground text-xs text-center">
                          Tax
                        </TableHead>
                      )}
                      {showPrice && (
                        <TableHead className="w-28 font-medium text-muted-foreground text-xs text-center">
                          Total
                        </TableHead>
                      )}
                      <TableHead className="w-20 font-medium text-muted-foreground text-xs text-center">
                        Before
                      </TableHead>
                      <TableHead className="w-20 font-medium text-muted-foreground text-xs text-center">
                        After
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pkgItems.map(({ item, index: itemIndex }) => (
                      <ItemTableRow
                        key={`pkg-${pkgIndex}-item-${itemIndex}`}
                        fieldName={itemsConfig.itemsName}
                        index={itemIndex}
                        showPrice={showPrice}
                        showTax={showTax}
                      />
                    ))}
                  </TableBody>
                </Table>

                {/* Add item to package */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const currentItems =
                      form.getValues(itemsConfig.itemsName) || [];
                    form.setValue(itemsConfig.itemsName, [
                      ...currentItems,
                      {
                        item_type: "product",
                        item_id: "",
                        quantity_change: 1,
                        item_price: 0,
                        item_tax: defaultTax,
                        item_total: 0,
                        quantity_before: 0,
                        quantity_after: 0,
                        lot_number: "",
                        package_item_change_id: packageItemChangeId,
                      },
                    ]);
                  }}
                  className="mt-2 text-muted-foreground hover:text-foreground"
                >
                  <Plus className="mr-1 w-4 h-4" />
                  Add item to package
                </Button>
              </div>
            )}

            {!selectedPackage && pkgItems.length === 0 && (
              <div className="p-8 text-muted-foreground text-center">
                <p className="text-sm">
                  Select a package above to add its items
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Individual Items Section - no card wrapper for stocktakes */}
      {(individualItems.length > 0 || packageFields.length === 0 || isStocktake) && (
        isStocktake ? (
          <div className="py-4">
            {individualItems.length > 0
              ? (
                <Table className="[&_tr:first-child_th:last-child]:pr-0 [&_td:last-child]:pr-0 [&_td:first-child]:pl-0 [&_tr:first-child_th:first-child]:pl-0 border-collapse">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b">
                      {isStocktake && (
                        <TableHead className="w-24 font-medium text-muted-foreground text-xs">
                          Type
                        </TableHead>
                      )}
                      <TableHead className="font-medium text-muted-foreground text-xs">
                        Item
                      </TableHead>
                      <TableHead className="w-28 font-medium text-muted-foreground text-xs">
                        Lot #
                      </TableHead>
                      {isStocktake ? (
                        <>
                          <TableHead className="w-24 font-medium text-muted-foreground text-xs text-center">
                            Before
                          </TableHead>
                          <TableHead className="w-24 font-medium text-muted-foreground text-xs text-center">
                            Counted
                          </TableHead>
                          <TableHead className="w-24 font-medium text-muted-foreground text-xs text-center">
                            Change
                          </TableHead>
                        </>
                      ) : (
                        <>
                          <TableHead className="w-24 font-medium text-muted-foreground text-xs text-center">
                            Qty
                          </TableHead>
                          {showPrice && (
                            <TableHead className="w-28 font-medium text-muted-foreground text-xs text-center">
                              Price
                            </TableHead>
                          )}
                          {showTax && (
                            <TableHead className="w-24 font-medium text-muted-foreground text-xs text-center">
                              Tax
                            </TableHead>
                          )}
                          {showPrice && (
                            <TableHead className="w-28 font-medium text-muted-foreground text-xs text-center">
                              Total
                            </TableHead>
                          )}
                          <TableHead className="w-20 font-medium text-muted-foreground text-xs text-center">
                            Before
                          </TableHead>
                          <TableHead className="w-20 font-medium text-muted-foreground text-xs text-center">
                            After
                          </TableHead>
                        </>
                      )}
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {individualItems.map(({ item, index: itemIndex }) => {
                      // Get original quantity change from the saved order data
                      const originalKey = `${item.item_id}-${itemIndex}`;
                      const originalChange = originalQuantityChanges[originalKey] ?? 0;
                      return (
                        <ItemTableRow
                          key={`individual-${itemIndex}`}
                          fieldName={itemsConfig.itemsName}
                          index={itemIndex}
                          showPrice={showPrice}
                          showTax={showTax}
                          isStocktake={isStocktake}
                          originalQuantityChange={originalChange}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              )
              : (
                <p className="py-4 text-muted-foreground text-sm text-center">
                  No individual items yet. Use "Add Item" above to add items
                  outside of packages.
                </p>
              )}

            {/* Add individual item inline */}
            {individualItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="mr-1 w-4 h-4" />
                    Add item
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleAddIndividualItem("product")}
                  >
                    Product
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddIndividualItem("part")}
                  >
                    Part
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddIndividualItem("service")}
                  >
                    Service
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ) : (
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 bg-muted/30 px-4 py-3 border-b">
              <Layers className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Individual Items</span>
              <Badge variant="outline" className="font-normal text-xs">
                {individualItems.length}
              </Badge>
              {showPrice && individualItems.length > 0 && (
                <span className="ml-auto font-semibold text-sm">
                  {new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: currency,
                  }).format(individualItems.reduce((sum, { item }) =>
                    sum + (item.item_total || 0), 0))}
                </span>
              )}
            </div>
            <div className="px-4 py-4">
            {individualItems.length > 0
              ? (
                <Table className="[&_tr:first-child_th:last-child]:pr-0 [&_td:last-child]:pr-0 [&_td:first-child]:pl-0 [&_tr:first-child_th:first-child]:pl-0 border-collapse">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b">
                      <TableHead className="font-medium text-muted-foreground text-xs">
                        Item
                      </TableHead>
                      <TableHead className="w-28 font-medium text-muted-foreground text-xs">
                        Lot #
                      </TableHead>
                      <TableHead className="w-24 font-medium text-muted-foreground text-xs text-center">
                        Qty
                      </TableHead>
                      {showPrice && (
                        <TableHead className="w-28 font-medium text-muted-foreground text-xs text-center">
                          Price
                        </TableHead>
                      )}
                      {showTax && (
                        <TableHead className="w-24 font-medium text-muted-foreground text-xs text-center">
                          Tax
                        </TableHead>
                      )}
                      {showPrice && (
                        <TableHead className="w-28 font-medium text-muted-foreground text-xs text-center">
                          Total
                        </TableHead>
                      )}
                      <TableHead className="w-20 font-medium text-muted-foreground text-xs text-center">
                        Before
                      </TableHead>
                      <TableHead className="w-20 font-medium text-muted-foreground text-xs text-center">
                        After
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {individualItems.map(({ item, index: itemIndex }) => {
                      const originalKey = `${item.item_id}-${itemIndex}`;
                      const originalChange = originalQuantityChanges[originalKey] ?? 0;
                      return (
                        <ItemTableRow
                          key={`individual-${itemIndex}`}
                          fieldName={itemsConfig.itemsName}
                          index={itemIndex}
                          showPrice={showPrice}
                          showTax={showTax}
                          isStocktake={false}
                          originalQuantityChange={originalChange}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              )
              : (
                <p className="py-4 text-muted-foreground text-sm text-center">
                  No individual items yet. Use "Add Item" above to add items
                  outside of packages.
                </p>
              )}
            {individualItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="mr-1 w-4 h-4" />
                    Add item
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleAddIndividualItem("product")}
                  >
                    Product
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddIndividualItem("part")}
                  >
                    Part
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddIndividualItem("service")}
                  >
                    Service
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            </div>
          </div>
        )
      )}

      {/* Grand Total */}
      {showPrice && allItems.length > 0 && (
        <div className="flex justify-end items-center gap-2 py-2 border-t">
          <span className="text-muted-foreground text-sm">Total</span>
          <span className="font-medium text-sm">
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: currency,
            }).format(grandTotal)}
          </span>
        </div>
      )}

      {/* Build order specific: Inventory Impact */}
      {isBuild && <BuildInventoryImpact />}

      {/* Shipment: Source location impact (read-only) */}
      {isShipment && (
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 border-b">
            <h3 className="font-semibold">Source Location Impact</h3>
            <p className="text-muted-foreground text-sm">
              Items will be removed from the source location
            </p>
          </div>
          <div className="p-4">
            <SourceLocationSummary />
          </div>
        </div>
      )}

      {/* Add Package Dialog */}
      <AddPackageDialog
        open={addPackageDialogOpen}
        onOpenChange={setAddPackageDialogOpen}
        packages={availablePackages}
        onAdd={handleAddPackage}
      />
    </div>
  );
}

/** Individual item row in the table */
function ItemTableRow({
  fieldName,
  index,
  showPrice,
  showTax,
  isStocktake = false,
  originalQuantityChange = 0,
}: {
  fieldName: string;
  index: number;
  showPrice: boolean;
  showTax: boolean;
  isStocktake?: boolean;
  originalQuantityChange?: number;
}) {
  const form = useFormContext();
  const { data: itemsView } = useSelectItemsView();
  const { data: stockItems } = useSelectItemsByAddress();
  const { data: inventoryHistory } = useSelectInventoryHistory();

  const prefix = `${fieldName}.${index}`;
  const currency = form.watch("currency") || "USD";
  const address = form.watch("from_shipping_address_id");
  const isSale = form.watch("order_type") === "sell";

  const itemId = form.watch(`${prefix}.item_id`);
  const itemType = form.watch(`${prefix}.item_type`) || "product";
  const quantityChange = form.watch(`${prefix}.quantity_change`) || 0;
  const itemPrice = form.watch(`${prefix}.item_price`) || 0;
  const itemTax = form.watch(`${prefix}.item_tax`) || 0;
  const quantityBefore = form.watch(`${prefix}.quantity_before`) || 0;
  const quantityAfter = form.watch(`${prefix}.quantity_after`) || 0;

  const addressNum = address != null && String(address).trim() !== "" ? Number(address) : undefined;
  const orderDate = form.watch("order_date");

  // For stocktakes we use inventory_history (same as StockTable), as of order_date, disregarding future orders.
  // For other order types we use items_by_address.
  const findItemQuantity = (id: string, excludeThisOrder = false) => {
    if (isStocktake && inventoryHistory?.length) {
      const idNum = Number(id);
      if (Number.isNaN(idNum)) return 0;
      const currentStock = getCurrentQuantity(
        idNum,
        inventoryHistory,
        addressNum,
        orderDate ?? undefined,
      );
      if (excludeThisOrder && originalQuantityChange !== 0) {
        return currentStock - originalQuantityChange;
      }
      return currentStock;
    }
    const itemInStock = stockItems?.find((item) => {
      return (
        String(item.item_id).trim() === String(id).trim() &&
        String(item.address_id) === String(address)
      );
    });
    const currentStock = itemInStock?.item_quantity ?? 0;
    if (excludeThisOrder && isStocktake && originalQuantityChange !== 0) {
      return currentStock - originalQuantityChange;
    }
    return currentStock;
  };

  // Initialize quantity_before for stocktakes when component mounts with existing item
  React.useEffect(() => {
    if (isStocktake && itemId && (inventoryHistory?.length || stockItems)) {
      const before = findItemQuantity(itemId, true);
      const currentBefore = form.getValues(`${prefix}.quantity_before`);
      if (currentBefore !== before) {
        form.setValue(`${prefix}.quantity_before`, before);
        const existingChange = form.getValues(`${prefix}.quantity_change`) || 0;
        const after = before + existingChange;
        form.setValue(`${prefix}.quantity_after`, after);
      }
    }
  }, [isStocktake, itemId, inventoryHistory, stockItems, address, originalQuantityChange, form, prefix, orderDate]);

  const updateQuantities = (newQuantity: number) => {
    if (isStocktake) {
      // For stocktakes: before is current stock minus this order's original contribution
      const before = findItemQuantity(itemId, true);
      // After is what user entered (the counted value)
      // quantity_change is the difference
      const change = newQuantity - before;
      form.setValue(`${prefix}.quantity_before`, before);
      form.setValue(`${prefix}.quantity_after`, newQuantity);
      form.setValue(`${prefix}.quantity_change`, change);
    } else {
      const before = findItemQuantity(itemId);
      const after = isSale ? before - newQuantity : before + newQuantity;
      form.setValue(`${prefix}.quantity_before`, before);
      form.setValue(`${prefix}.quantity_after`, after);
    }
  };

  const handleItemChange = (newItemId: string) => {
    const item = itemsView?.find((i) =>
      String(i.item_id) === String(newItemId)
    );
    
    if (isStocktake) {
      // For stocktakes: before is current stock (excluding this order's contribution)
      const before = findItemQuantity(newItemId, true);
      // Default after to current stock (no change initially)
      const after = before;
      const change = 0;
      
      form.setValue(`${prefix}.item_id`, newItemId);
      form.setValue(`${prefix}.quantity_before`, before);
      form.setValue(`${prefix}.quantity_after`, after);
      form.setValue(`${prefix}.quantity_change`, change);
      form.setValue(`${prefix}.item_price`, 0);
      form.setValue(`${prefix}.item_tax`, 0);
      form.setValue(`${prefix}.item_total`, 0);
    } else {
      const itemQuantity = findItemQuantity(newItemId);
      const before = itemQuantity;
      const change = quantityChange || 1;
      const after = isSale ? itemQuantity - change : itemQuantity + change;
      const price = item?.item_price ?? 0;
      const tax = defaultTax;
      const total = calculateItemTotal(price, tax, change);

      form.setValue(`${prefix}.item_id`, newItemId);
      form.setValue(`${prefix}.quantity_before`, before);
      form.setValue(`${prefix}.quantity_after`, after);
      form.setValue(`${prefix}.quantity_change`, change);
      form.setValue(`${prefix}.item_price`, price);
      form.setValue(`${prefix}.item_tax`, tax);
      form.setValue(`${prefix}.item_total`, total);
    }
  };

  const handleQuantityChange = (value: number) => {
    if (isStocktake) {
      // For stocktakes, the value entered IS the "after" (counted) value
      updateQuantities(value);
    } else {
      form.setValue(`${prefix}.quantity_change`, value);
      const total = calculateItemTotal(itemPrice, itemTax, value);
      form.setValue(`${prefix}.item_total`, total);
      updateQuantities(value);
    }
  };

  // For stocktakes, handle "after" value change directly
  const handleAfterChange = (value: number) => {
    const before = quantityBefore;
    const change = value - before;
    form.setValue(`${prefix}.quantity_after`, value);
    form.setValue(`${prefix}.quantity_change`, change);
  };

  const handlePriceChange = (value: number) => {
    form.setValue(`${prefix}.item_price`, value);
    const total = calculateItemTotal(value, itemTax, quantityChange);
    form.setValue(`${prefix}.item_total`, total);
  };

  const handleTaxChange = (value: number) => {
    form.setValue(`${prefix}.item_tax`, value);
    const total = calculateItemTotal(itemPrice, value, quantityChange);
    form.setValue(`${prefix}.item_total`, total);
  };

  const handleRemove = () => {
    const currentItems = form.getValues(fieldName) || [];
    const newItems = currentItems.filter((_: any, i: number) => i !== index);
    form.setValue(fieldName, newItems);
  };

  const handleCopy = () => {
    const currentItems = form.getValues(fieldName) || [];
    const itemToCopy = currentItems[index];
    form.setValue(fieldName, [...currentItems, { ...itemToCopy }]);
  };

  const filteredItems =
    itemsView?.filter((item) => item.item_type === itemType) || [];

  const lotNumber = form.watch(`${prefix}.lot_number`) || "";

  // For stocktakes, render a different layout
  if (isStocktake) {
    return (
      <TableRow className="hover:bg-muted/50">
        <TableCell className="py-2">
          <Select
            value={itemType === "part" ? "part" : "product"}
            onValueChange={(value: "product" | "part") => {
              form.setValue(`${prefix}.item_type`, value);
              // Clear item selection if current item is not in the new type
              const currentId = form.getValues(`${prefix}.item_id`);
              const inNewType = itemsView?.some(
                (i) => String(i.item_id) === String(currentId) && i.item_type === value,
              );
              if (!inNewType && currentId) {
                form.setValue(`${prefix}.item_id`, "");
                form.setValue(`${prefix}.quantity_before`, 0);
                form.setValue(`${prefix}.quantity_after`, 0);
                form.setValue(`${prefix}.quantity_change`, 0);
              }
            }}
          >
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="part">Part</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell className="py-2">
          <Combobox
            name={`${prefix}.item_id`}
            placeholder="Select item..."
            searchPlaceholder="Search items..."
            emptyMessage="No items found"
            onChange={handleItemChange}
            options={filteredItems
              .sort((a, b) => a.item_name.localeCompare(b.item_name))
              .map((item) => ({
                value: String(item.item_id),
                label: item.item_name,
              }))}
          />
        </TableCell>
        <TableCell className="py-2">
          <Input
            value={lotNumber}
            onChange={(e) => form.setValue(`${prefix}.lot_number`, e.target.value)}
            placeholder="LOT #"
            className="h-8 text-sm"
          />
        </TableCell>
        <TableCell className="py-2 text-center">
          <NumberFlow
            value={quantityBefore}
            className="text-muted-foreground text-sm"
          />
        </TableCell>
        <NumberCell
          name={`${prefix}.quantity_after`}
          step={1}
          onChange={handleAfterChange}
          editable={true}
          format={{ style: "decimal" }}
        />
        <TableCell className="py-2 text-center">
          <NumberFlow
            className={cn(
              "text-sm font-medium",
              quantityChange > 0
                ? "text-green-600"
                : quantityChange < 0
                ? "text-red-500"
                : "text-muted-foreground",
            )}
            value={quantityChange}
            format={{ signDisplay: "always" }}
          />
        </TableCell>
        <TableCell className="py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopy}>
                <Copy className="mr-2 w-4 h-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleRemove}
                className="text-destructive"
              >
                <Trash className="mr-2 w-4 h-4" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="py-2">
        <Combobox
          name={`${prefix}.item_id`}
          placeholder="Select item..."
          searchPlaceholder="Search items..."
          emptyMessage="No items found"
          onChange={handleItemChange}
          options={filteredItems
            .sort((a, b) => a.item_name.localeCompare(b.item_name))
            .map((item) => ({
              value: String(item.item_id),
              label: item.item_name,
            }))}
        />
      </TableCell>
      <TableCell className="py-2">
        <Input
          value={lotNumber}
          onChange={(e) => form.setValue(`${prefix}.lot_number`, e.target.value)}
          placeholder="LOT #"
          className="h-8 text-sm"
        />
      </TableCell>
      <NumberCell
        name={`${prefix}.quantity_change`}
        step={1}
        onChange={handleQuantityChange}
        editable={true}
        format={{ style: "decimal" }}
      />
      {showPrice && (
        <NumberCell
          name={`${prefix}.item_price`}
          step={0.01}
          onChange={handlePriceChange}
          editable={true}
          format={{ style: "currency", currency: currency }}
        />
      )}
      {showTax && (
        <NumberCell
          name={`${prefix}.item_tax`}
          step={0.01}
          onChange={handleTaxChange}
          editable={true}
          format={{ style: "percent" }}
        />
      )}
      {showPrice && (
        <NumberCell
          name={`${prefix}.item_total`}
          step={0.01}
          editable={true}
          format={{ style: "currency", currency: currency }}
        />
      )}
      <TableCell className="py-2 text-center">
        <NumberFlow
          value={quantityBefore}
          className="text-muted-foreground text-sm"
        />
      </TableCell>
      <TableCell className="py-2 text-center">
        <NumberFlow
          className={cn(
            "text-sm",
            quantityAfter < 0
              ? "text-red-500 font-medium"
              : "text-muted-foreground",
          )}
          value={quantityAfter}
        />
      </TableCell>
      <TableCell className="py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleCopy}>
              <Copy className="mr-2 w-4 h-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleRemove}
              className="text-destructive"
            >
              <Trash className="mr-2 w-4 h-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

/** Wrapper that activates useBuyForm inside FormProvider context (build orders only) */
function BuildInventoryImpact() {
  useBuyForm();

  return (
    <InventoryImpact
      title="Inventory Impact"
      locations={[
        {
          label: "Services to purchase",
          fieldName: "order_items",
          addressName: "to_shipping_address_id",
          filter: "all",
          showCost: true,
          hideAddress: true,
        },
        {
          label: "Parts consumed from",
          fieldName: "consumed_items",
          addressName: "from_shipping_address_id",
          filter: "negative",
        },
        {
          label: "Produced at",
          fieldName: "consumed_items",
          addressName: "to_shipping_address_id",
          filter: "positive",
        },
      ]}
    />
  );
}

/** Summary of items being removed from source location for shipments */
function SourceLocationSummary() {
  const form = useFormContext();
  const fromItems = useWatch({ control: form.control, name: "from_items" }) ||
    [];
  const { data: itemsView } = useSelectItemsView();

  if (fromItems.length === 0) {
    return <p className="text-muted-foreground text-sm">No items selected</p>;
  }

  return (
    <div className="space-y-2">
      {fromItems.map((item: any, idx: number) => {
        const itemDetails = itemsView?.find(
          (i) => String(i.item_id) === String(item.item_id),
        );
        return (
          <div key={idx} className="flex justify-between py-1 text-sm">
            <span>{itemDetails?.item_name || "Unknown item"}</span>
            <span className="font-medium text-red-500">
              {item.quantity_change} units
            </span>
          </div>
        );
      })}
    </div>
  );
}
