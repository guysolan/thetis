import { useFormContext } from "react-hook-form";
import StockItems from "../../../components/StockItems";
import { StockValidationAlert } from "../../../components/StockValidationAlert";
import { Button } from "@thetis/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { PricedItem } from "../../../schema";
import EditCard from "@/components/EditCard";
import { Badge } from "@thetis/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const ShipmentPackages = () => {
  const form = useFormContext();
  const [packageCount, setPackageCount] = useState(1);
  const [packageIds, setPackageIds] = useState<bigint[]>([BigInt(Date.now())]);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, sku")
        .order("name");
      return data || [];
    },
  });

  const addPackage = () => {
    const currentItems = form.getValues("order_items") || [];
    const newPackageId = BigInt(Date.now());
    form.setValue("order_items", [
      ...currentItems,
      {
        item_type: "package",
        package_id: newPackageId,
        package_quantity: 1,
        package_items: [
          {
            item_type: "product",
            item_id: "",
            quantity_change: 1,
            item_price: 0,
            item_tax: 0,
          },
        ],
      },
    ]);
    setPackageCount(packageCount + 1);
    setPackageIds([...packageIds, newPackageId]);
  };

  const removePackage = (index: number) => {
    const currentItems = form.getValues("order_items");
    form.setValue(
      "order_items",
      currentItems.filter((_: PricedItem, i: number) => i !== index),
    );
    setPackageCount(packageCount - 1);
    setPackageIds(packageIds.filter((_, i) => i !== index));
  };

  const saveAsNewPackage = (index: number) => {
    const currentItems = form.getValues("order_items");
    const editedPackage = currentItems[index];
    const newPackageId = BigInt(Date.now());

    // Add the edited package as a new package
    form.setValue("order_items", [
      ...currentItems,
      {
        ...editedPackage,
        package_id: newPackageId,
        // Ensure all package items have the new package_id
        package_items: editedPackage.package_items.map((item: PricedItem) => ({
          ...item,
          package_item_id: newPackageId,
        })),
      },
    ]);

    // Remove the original package
    form.setValue(
      "order_items",
      currentItems.filter((_: PricedItem, i: number) => i !== index),
    );

    setPackageIds([...packageIds.filter((_, i) => i !== index), newPackageId]);
  };

  const getPackagePreview = (packageItems: PricedItem[]) => {
    if (!products) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {packageItems.map((item) => {
          const product = products.find((p) => p.id === item.item_id);
          if (!product) return null;

          return (
            <Badge key={item.item_id} variant="secondary">
              {product.name} ({item.quantity_change})
            </Badge>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: packageCount }).map((_, index) => {
        const packageItems =
          form.watch(`order_items.${index}.package_items`) || [];
        const packageId = packageIds[index];

        return (
          <EditCard
            key={packageId.toString()}
            title={`Package ${index + 1}`}
            previewContent={getPackagePreview(packageItems)}
            onDone={() => saveAsNewPackage(index)}
          >
            <div className="space-y-4">
              <StockItems
                name={`order_items.${index}.package_items`}
                address_name="from_shipping_address_id"
                allowedTypes={["product"]}
                title="Package Items"
                showPrice={true}
              />
              {packageCount > 1 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removePackage(index)}
                >
                  Remove Package
                </Button>
              )}
            </div>
          </EditCard>
        );
      })}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addPackage}
      >
        <Plus className="mr-2 w-4 h-4" />
        Add Package
      </Button>

      <StockValidationAlert
        itemsFieldName="order_items"
        addressFieldName="from_shipping_address_id"
      />
    </div>
  );
};

export default ShipmentPackages;
