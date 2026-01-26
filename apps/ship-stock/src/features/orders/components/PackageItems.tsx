import { useFormContext } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { Button } from "@thetis/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@thetis/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import Select from "@/components/Select";
import Input from "@/components/Input";
import { StockValidationAlert } from "./StockValidationAlert";
import EditCard from "@/components/EditCard";
import StockItems from "./StockItems";
import type { PricedItem } from "../schema";

interface PackageItem {
  item_type: "package";
  item_id?: string;
  quantity_change: number;
}

interface PackageItemsProps {
  name?: string;
  address_name?: string;
  showPrice?: boolean;
  readOnly?: boolean;
  title?: string;
}

const PackageItems = ({
  name = "order_items",
  address_name = "from_shipping_address_id",
  showPrice = true,
  readOnly = false,
  title = "Packages",
}: PackageItemsProps) => {
  const form = useFormContext();
  const { data: items } = useSelectItemsView();
  const formValues = form.watch(name) as PackageItem[];
  const unitOfMeasurement = form.watch("unit_of_measurement") || "metric";

  const addPackage = () => {
    const currentItems = form.getValues(name) || [];
    const newPackage = {
      item_type: "package",
      item_id: "",
      quantity_change: 1,
    };
    form.setValue(name, [...currentItems, newPackage], { shouldDirty: false });
  };

  const removePackage = (index: number) => {
    const currentItems = form.getValues(name) as PackageItem[];
    const packageId = currentItems[index].item_id;

    // Remove the package
    const newItems = currentItems.filter((_, i) => i !== index);

    // Also remove any items that were part of this package
    const allItems = form.getValues(name) as PricedItem[];
    const remainingItems = allItems.filter(
      (item) => item.package_item_id !== packageId,
    );

    form.setValue(name, remainingItems, { shouldDirty: false });
  };

  const getPackageDimensions = (packageItem: PackageItem) => {
    if (!items || !packageItem.item_id) return null;
    const selectedPackage = items.find(
      (item) => String(item.item_id) === String(packageItem.item_id),
    );
    if (!selectedPackage) return null;

    return (
      <div className="flex flex-row gap-x-4 text-sm">
        <div className="flex gap-2">
          <Badge variant="default">
            {selectedPackage.height} × {selectedPackage.width} ×{" "}
            {selectedPackage.depth}{" "}
            {unitOfMeasurement === "metric" ? "cm" : "in"}
          </Badge>
          <Badge variant="outline">
            {selectedPackage.weight}{" "}
            {unitOfMeasurement === "metric" ? "kg" : "lb"}
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {formValues?.map((packageItem, index) => {
        const selectedPackage = items?.find(
          (item) => String(item.item_id) === String(packageItem.item_id),
        );

        return (
          <EditCard
            key={`${packageItem.item_id || index}`}
            title={`Package ${index + 1}`}
            previewContent={
              <div className="space-y-2">
                {selectedPackage && (
                  <>
                    <div className="font-medium">
                      {selectedPackage.item_name}
                    </div>
                    {getPackageDimensions(packageItem)}
                  </>
                )}
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex justify-end">
                {formValues.length > 1 && !readOnly && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePackage(index)}
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </Button>
                )}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package</TableHead>
                    <TableHead className="w-32">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Select
                        name={`${name}.${index}.item_id`}
                        options={items
                          ?.filter((item) => item.item_type === "package")
                          .map((item) => ({
                            label: item.item_name,
                            value: String(item.item_id),
                          })) || []}
                        disabled={readOnly}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name={`${name}.${index}.quantity_change`}
                        type="number"
                        disabled={readOnly}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {packageItem?.item_id && (
                <div className="mt-4">
                  <StockItems
                    name={name as "order_items"}
                    title="Package Items"
                    allowedTypes={["product", "part", "service"]}
                    showPrice={showPrice}
                    readOnly={readOnly}
                    filter={(item: PricedItem) =>
                      item.package_item_id === packageItem.item_id}
                  />
                </div>
              )}
            </div>
          </EditCard>
        );
      })}

      {!readOnly && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addPackage}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add Package
        </Button>
      )}

      <StockValidationAlert
        itemsFieldName={name}
        addressFieldName={address_name}
      />
    </div>
  );
};

export default PackageItems;
