import { useShipmentForm } from "../order-forms/features/shipment-form/useShipmentForm";
import ShipmentItems from "../order-forms/features/shipment-form/ShipmentItems";
import { StockValidationAlert } from "../order-forms/components/StockValidationAlert";
import StockItems from "../order-forms/components/StockItems";
import useCompanyDefaults from "../../../companies/hooks/useCompanyDefaults";
import { useFormContext } from "react-hook-form";
import PackageStockItems from "../order-forms/components/PackageStockItems";
import { useEffect } from "react";

const ShipmentFormFields = () => {
  useShipmentForm();
  // useCompanyDefaults({ fieldName: "from_company_id" });

  const form = useFormContext();
  const mode = form.watch("mode");

  useEffect(() => {
    if (mode === "direct") {
      const toItems = form.watch("to_items");

      // Only update if we have items and they're different from current from_items
      if (toItems?.length > 0) {
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
      }
    }
  }, [form, mode, form.watch("to_items")]);

  return (
    <>
      <StockValidationAlert />

      {mode === "package" && (
        <PackageStockItems itemsToUpdate={["from_items", "to_items"]} />
      )}

      <StockItems
        // readOnly={true}
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
