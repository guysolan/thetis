import { useShipmentForm } from "../../hooks/useShipmentForm";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import StockItems from "../../components/StockItems";
import { useFormContext, useWatch } from "react-hook-form";
import PackageStockItems from "../../components/PackageStockItems";
import { useEffect, useRef } from "react";

const ShipmentFormFields = () => {
  useShipmentForm();
  // useCompanyDefaults({ fieldName: "from_company_id" });

  const { control } = useFormContext();
  const form = useFormContext();

  // Use useWatch to prevent infinite loops
  const mode = useWatch({
    control,
    name: "mode",
    defaultValue: "package",
  });

  const toItems = useWatch({
    control,
    name: "to_items",
    defaultValue: [],
  });

  // Use ref to track previous state and prevent unnecessary updates
  const previousToItemsRef = useRef<string>("");

  useEffect(() => {
    if (mode === "direct" && toItems?.length > 0) {
      const toItemsString = JSON.stringify(toItems);

      // Only proceed if toItems actually changed
      if (toItemsString !== previousToItemsRef.current) {
        const currentFromItems = form.getValues("from_items");
        const reverseItems = toItems.map((item) => ({
          ...item,
          quantity_change: -item.quantity_change,
        }));

        // Only update if the items are actually different
        const hasChanged =
          JSON.stringify(currentFromItems) !== JSON.stringify(reverseItems);

        if (hasChanged) {
          form.setValue("from_items", reverseItems, { shouldDirty: true });
        }

        previousToItemsRef.current = toItemsString;
      }
    }
  }, [form, mode, toItems]);

  return (
    <>
      <StockValidationAlert />

      {mode === "package" && (
        <PackageStockItems itemsToUpdate={["from_items", "to_items"]} />
      )}

      <StockItems
        showPrice={true}
        showTax={true}
        allowedTypes={["product", "part"]}
        packageMode={mode === "package"}
        name="to_items"
        address_name="to_shipping_address_id"
      />

      <StockItems
        readOnly={true}
        allowedTypes={["product", "part"]}
        showPrice={false}
        showTax={false}
        packageMode={mode === "package"}
        address_name="from_shipping_address_id"
        name="from_items"
      />
    </>
  );
};

export default ShipmentFormFields;
