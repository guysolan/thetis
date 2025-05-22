import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import React from "react";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@thetis/ui/button";
import { Plus, Trash, Box, Weight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import { Badge } from "@thetis/ui/badge";

interface PackageStockItemsProps {
  itemsToUpdate: "order_items" | "produced_items";
}

const PackageStockItems = ({
  itemsToUpdate = "order_items",
}: PackageStockItemsProps) => {
  const { data: itemsView } = useSelectItemsView();
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "package_items",
  });

  const itemType = form.watch("item_type");

  const availablePackages = itemsView?.filter(
    (item) =>
      item.item_type === "package" &&
      item.components.some(
        (component) => component.component_type === itemType,
      ),
  );

  const addPackage = () => {
    append({ package_id: "" });
  };

  const updatePackageId = (newValue: string, index: number) => {
    // Get the current package ID before updating
    const currentPackageId = form.watch(`package_items.${index}.package_id`);

    // Update the package_id in the form
    form.setValue(`package_items.${index}.package_id`, newValue);

    // Get the selected package
    const newPackage = availablePackages?.find(
      (item) => item.item_id === Number(newValue),
    );

    // Get all form values
    const formValues = form.getValues();
    const orderItems = formValues.order_items || [];

    // Remove items with matching old package_item_id
    const newOrderItems = orderItems.filter(
      (item) => item.package_item_id !== currentPackageId,
    );

    // Add new components to the end
    newPackage?.components?.forEach((component) => {
      newOrderItems.push({
        item_id: String(component.component_id),
        quantity_change: component.component_quantity,
        price: component.component_price,
        item_type: component.component_type,
        package_item_id: newValue,
      });
    });

    // Update the entire order_items array
    form.setValue(itemsToUpdate, newOrderItems);
  };

  return (
    <div className="space-y-4 py-4">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field, index) => {
          const selectedPackageId = form.watch(
            `package_items.${index}.package_id`,
          );
          const selectedPackage = availablePackages?.find(
            (item) => String(item.item_id) === selectedPackageId,
          );

          // Get order items for this package
          const orderItems = form.watch(itemsToUpdate) || [];
          const packageItems = orderItems.filter(
            (item) => item.package_item_id === selectedPackageId,
          );

          return (
            <Card key={field.id} className="rounded-none">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
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
                  </CardTitle>
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
              </CardHeader>
              {selectedPackage && (
                <CardContent>
                  <div className="space-y-2">
                    {packageItems.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {packageItems.map((item) => {
                          const itemDetails = itemsView?.find(
                            (i) => String(i.item_id) === item.item_id,
                          );
                          return (
                            <Badge
                              key={item.item_id}
                              variant="secondary"
                              className="gap-x-1"
                            >
                              {itemDetails?.item_name} × {item.quantity_change}
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
              <CardFooter>
                {selectedPackage && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.height &&
                      selectedPackage.width &&
                      selectedPackage.depth && (
                        <Badge variant="default" className="gap-x-2">
                          <Box size={16} />
                          {selectedPackage.height} × {selectedPackage.width} ×{" "}
                          {selectedPackage.depth} cm
                        </Badge>
                      )}
                    {selectedPackage.weight && selectedPackage.weight > 0 && (
                      <Badge variant="default" className="gap-x-2">
                        <Weight size={16} />
                        {selectedPackage.weight} kg
                      </Badge>
                    )}
                  </div>
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
