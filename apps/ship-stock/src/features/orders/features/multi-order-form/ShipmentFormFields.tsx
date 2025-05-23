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

  // useEffect(() => {
  //   const fromItems = form.watch("from_items");

  //   const reverseItems = fromItems.map((item) => ({
  //     ...item,
  //     quantity_change: -item.quantity_change,
  //   }));

  //   form.setValue("to_items", reverseItems);
  // }, [form, form.watch("from_items")]);

  return (
    <>
      <StockValidationAlert />

      {mode === "package" && (
        <PackageStockItems itemsToUpdate={["from_items", "to_items"]} />
      )}

      <StockItems
        // readOnly={true}
        allowedTypes={["product", "part"]}
        showPrice={true}
        packageMode={mode === "package"}
        address_name="from_shipping_address_id"
        name="from_items"
      />

      <StockItems
        // readOnly={true}
        showPrice={true}
        allowedTypes={["product", "part"]}
        packageMode={mode === "package"}
        name="to_items"
        address_name="to_shipping_address_id"
      />
    </>
  );
};

export default ShipmentFormFields;
