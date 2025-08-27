import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import React, { useEffect } from "react";
import { useSelectItemsView } from "../../items/api/selectItemsView";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@thetis/ui/button";
import { Box, Copy, Plus, Trash, Weight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import { Badge } from "@thetis/ui/badge";
import { Input } from "@thetis/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PackageDimensions from "./PackageDimensions";
import PackageItemsBadges from "./PackageItemsBadges";

type ItemsToUpdate =
  | "order_items"
  | "produced_items"
  | "from_items"
  | "to_items";

interface PackageComponent {
  component_id: number;
  component_quantity: number;
  component_price: number;
  component_type: string;
}

interface OrderItem {
  item_id: string;
  quantity_change: number;
  price: number;
  item_type: string;
  package_item_change_id: number;
}

interface PackageItem {
  package_id: string;
  package_item_change_id: number;
}

interface PackageStockItemsProps {
  itemsToUpdate: ItemsToUpdate[];
}

const usePackageManagement = (itemsToUpdate: ItemsToUpdate[]) => {
  const { data: lastItemChange } = useQuery({
    queryKey: ["last-item-change"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("item_changes")
        .select("*")
        .order("id", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
  });

  const form = useFormContext();

  const packageItems = form.watch("package_items");
  const packagesCount = packageItems.length;

  const { data: itemsView } = useSelectItemsView();

  const { fields, append, remove } = useFieldArray({
    name: "package_items",
  });

  const itemType = form.watch("item_type") ?? "product";

  const availablePackages = itemsView?.filter(
    (item) =>
      item.item_type === "package" &&
      (item.components as PackageComponent[]).some(
        (component) => component.component_type === itemType,
      ),
  );

  const createPackageItems = (
    packageComponents: PackageComponent[],
    packageId: string,
    packageItemChangeId: number,
  ): OrderItem[] => {
    return packageComponents.map((component) => ({
      item_id: String(component.component_id),
      quantity_change: component.component_quantity,
      price: component.component_price,
      item_type: component.component_type,
      package_item_change_id: packageItemChangeId,
    }));
  };

  const updatePackageItems = (
    packageId: string,
    packageItemChangeId: number,
    fieldName: ItemsToUpdate,
    shouldPreserveExisting: boolean = false,
  ) => {
    const selectedPkg = availablePackages?.find(
      (item) => String(item.item_id) === packageId,
    );

    if (!selectedPkg?.components) return [];

    const itemsFromPackage = createPackageItems(
      selectedPkg.components as PackageComponent[],
      packageId,
      packageItemChangeId,
    );

    const formValues = form.getValues();
    const currentItemsInThisField = formValues[fieldName] || [];

    const preservedItemsInField = shouldPreserveExisting
      ? currentItemsInThisField
      : currentItemsInThisField.filter(
        (item) => item.package_item_change_id !== packageItemChangeId,
      );

    let itemsToSetForField = itemsFromPackage;
    if (fieldName === "from_items") {
      itemsToSetForField = itemsFromPackage.map((item) => ({
        ...item,
        quantity_change: -item.quantity_change,
      }));
    }

    return [...preservedItemsInField, ...itemsToSetForField];
  };

  const updatePackage = (index: number, newPackageId?: string) => {
    const currentPackageId = form.watch(`package_items.${index}.package_id`);
    const packageItemChangeId = form.watch(
      `package_items.${index}.package_item_change_id`,
    );

    const targetPackageId = newPackageId || currentPackageId;

    if (newPackageId !== undefined) {
      form.setValue(`package_items.${index}.package_id`, newPackageId);
    }

    if (targetPackageId) {
      itemsToUpdate.forEach((fieldName: ItemsToUpdate) => {
        // Get current items in this field
        const formValues = form.getValues();
        const currentItemsInThisField = formValues[fieldName] || [];

        // Remove existing items for this specific package
        const itemsWithoutThisPackage = currentItemsInThisField.filter(
          (item) => item.package_item_change_id !== packageItemChangeId,
        );

        // Create new items for this package
        const selectedPkg = availablePackages?.find(
          (item) => String(item.item_id) === targetPackageId,
        );

        if (selectedPkg?.components) {
          const newItems = createPackageItems(
            selectedPkg.components as PackageComponent[],
            targetPackageId,
            packageItemChangeId,
          );

          let itemsToAdd = newItems;
          if (fieldName === "from_items") {
            itemsToAdd = newItems.map((item) => ({
              ...item,
              quantity_change: -item.quantity_change,
            }));
          }

          // Combine existing items (without this package) with new items
          const updatedItems = [...itemsWithoutThisPackage, ...itemsToAdd];
          form.setValue(fieldName, updatedItems);
        } else {
          // If no package selected, just remove items for this package
          form.setValue(fieldName, itemsWithoutThisPackage);
        }
      });
    }
  };

  const addPackage = () => {
    const lastId = lastItemChange?.id ?? 0;
    const newPackageItemChangeId = lastId + packagesCount + 1;
    append({
      package_id: "",
      package_item_change_id: newPackageItemChangeId,
    });
  };

  const duplicatePackage = (index: number) => {
    const currentPackage = form.getValues(`package_items.${index}`);
    const lastId = lastItemChange?.id ?? 0;
    const newPackageItemChangeId = lastId + packagesCount + 2;

    // Add the new package to package_items
    append({
      package_id: currentPackage.package_id,
      package_item_change_id: newPackageItemChangeId,
    });

    // If there's a selected package, create new items for it
    if (currentPackage.package_id) {
      const selectedPkg = availablePackages?.find(
        (item) => String(item.item_id) === currentPackage.package_id,
      );

      if (selectedPkg?.components) {
        const newItems = createPackageItems(
          selectedPkg.components as PackageComponent[],
          currentPackage.package_id,
          newPackageItemChangeId,
        );

        itemsToUpdate.forEach((fieldName: ItemsToUpdate) => {
          const formValues = form.getValues();
          const currentItemsInThisField = formValues[fieldName] || [];

          let itemsToAdd = newItems;
          if (fieldName === "from_items") {
            itemsToAdd = newItems.map((item) => ({
              ...item,
              quantity_change: -item.quantity_change,
            }));
          }

          // Keep existing items and add new ones
          const updatedItems = [...currentItemsInThisField, ...itemsToAdd];
          form.setValue(fieldName, updatedItems);
        });
      }
    }
  };

  return {
    fields,
    remove,
    addPackage,
    duplicatePackage,
    availablePackages,
    updatePackage,
  };
};

const PackageStockItems = ({
  itemsToUpdate = ["order_items"],
}: PackageStockItemsProps) => {
  const form = useFormContext();
  const {
    fields,
    remove,
    addPackage,
    duplicatePackage,
    availablePackages,
    updatePackage,
  } = usePackageManagement(itemsToUpdate);

  // Sync quantities between to_items and from_items
  useEffect(() => {
    const syncQuantities = () => {
      const toItems = form.watch("to_items") || [];
      const fromItems = form.watch("from_items") || [];

      // Only sync if both arrays have items and are for shipment orders
      if (toItems.length === 0 && fromItems.length === 0) return;

      // Create a map of package_item_change_id to quantity for to_items
      const toItemsMap = new Map(
        toItems.map((item) => [
          item.package_item_change_id,
          item.quantity_change,
        ]),
      );

      // Update from_items to match to_items quantities (with opposite sign)
      // Only update items that exist in both arrays to avoid erasing package items
      const updatedFromItems = fromItems.map((item) => {
        const toQuantity = toItemsMap.get(item.package_item_change_id);
        if (toQuantity !== undefined) {
          return {
            ...item,
            quantity_change: -Number(toQuantity),
          };
        }
        return item;
      });

      // Only set if there are actual changes to avoid unnecessary re-renders
      const currentFromItems = form.getValues("from_items") || [];
      if (
        JSON.stringify(currentFromItems) !== JSON.stringify(updatedFromItems)
      ) {
        form.setValue("from_items", updatedFromItems);
      }
    };

    // Only watch for changes in shipment-related fields
    const subscription = form.watch((value, { name }) => {
      if (name?.startsWith("to_items") || name?.startsWith("from_items")) {
        syncQuantities();
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const updatePackageId = (newValue: string, index: number) => {
    updatePackage(index, newValue);
  };

  return (
    <div className="space-y-4 py-4">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field, index) => {
          const selectedPackageId = form.watch(
            `package_items.${index}.package_id`,
          );
          const packageItemChangeId = form.watch(
            `package_items.${index}.package_item_change_id`,
          );
          const selectedPackage = availablePackages?.find(
            (item) => String(item.item_id) === selectedPackageId,
          );

          const orderItems = form.watch(itemsToUpdate[0]) || [];
          const packageItems = orderItems.filter(
            (item) => item.package_item_change_id === packageItemChangeId,
          );

          return (
            <Card key={field.id} className="rounded-none">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    Package {index + 1}
                  </CardTitle>
                  <div className="flex gap-1">
                    {selectedPackage && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicatePackage(index)}
                        className="-mt-2 -mr-2 w-8 h-8"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="-mt-2 -mr-2 w-8 h-8"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedPackageId}
                  onValueChange={(value) => updatePackageId(value, index)}
                >
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePackages?.map((item) => (
                      <SelectItem
                        className="capitalize"
                        key={item.item_id}
                        value={String(item.item_id)}
                      >
                        {item.item_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPackage && (
                  <PackageItemsBadges packageItems={packageItems} />
                )}
              </CardContent>
              <CardFooter>
                {selectedPackage && (
                  <PackageDimensions selectedPackage={selectedPackage} />
                )}
              </CardFooter>
            </Card>
          );
        })}

        <Card
          className="hover:border-primary/50 border-dashed rounded-none transition-colors cursor-pointer"
          onClick={addPackage}
        >
          <CardContent className="flex flex-col justify-center items-center h-full min-h-[200px] text-muted-foreground">
            <Plus className="mb-2 w-8 h-8" />
            <p className="font-medium text-sm">Add Package</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PackageStockItems;
