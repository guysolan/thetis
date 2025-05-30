import { useSellForm } from "../order-forms/features/sell-form/hooks/useSellForm";
import StockItems from "../order-forms/components/StockItems";
import { StockValidationAlert } from "../order-forms/components/StockValidationAlert";
import Select from "../../../../components/Select";
import useCompanyDefaults from "../../../companies/hooks/useCompanyDefaults";
import SellPackages from "../order-forms/features/sell-form/components/SellPackages";
import { useFormContext } from "react-hook-form";
import PackageStockItems from "../order-forms/components/PackageStockItems";
import { useMemo, useEffect } from "react";

const SellFormFields = () => {
  const { watch, setValue } = useFormContext();
  const mode = watch("mode");
  const orderItems = watch("order_items") || [];

  // Initialize hooks with proper dependencies
  useSellForm();
  useCompanyDefaults({ fieldName: "from_company_id" });

  // Ensure all order items have the correct item_type
  useEffect(() => {
    if (orderItems.length > 0) {
      const updatedItems = orderItems.map((item: any) => ({
        ...item,
        item_type: item.item_type || "product", // Default to product if not set
      }));
      setValue("order_items", updatedItems);
    }
  }, [orderItems, setValue]);

  // Memoize the package items section to prevent unnecessary re-renders
  const packageItemsSection = useMemo(() => {
    if (mode === "package") {
      return <PackageStockItems itemsToUpdate={["order_items"]} />;
    }
    return null;
  }, [mode]);

  return (
    <>
      {packageItemsSection}

      <StockItems
        title="Order Items"
        name="order_items"
        showPrice={true}
        showTax={true}
        allowedTypes={["product", "part"]}
        packageMode={mode === "package"}
        defaultItemType="product"
      />

      <StockValidationAlert
        itemsFieldName="order_items"
        addressFieldName="from_shipping_address_id"
      />
    </>
  );
};

export default SellFormFields;
