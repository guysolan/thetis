import { useSellForm } from "../../hooks/useSellForm";
import StockItems from "../../components/StockItems";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import useCompanyDefaults from "../../../companies/hooks/useCompanyDefaults";
import { useFormContext } from "react-hook-form";
import PackageStockItems from "../../components/PackageStockItems";
import { useEffect, useMemo } from "react";
import type { OrderItem } from "../../schema";

const SellFormFields = () => {
  const form = useFormContext();

  // Guard against null form in production
  if (!form?.control) {
    return <div>Loading sell form...</div>;
  }

  const { watch, setValue } = form;
  const mode = watch("mode");
  const orderItems = watch("order_items") || [];

  // Initialize hooks with proper dependencies
  useSellForm();
  useCompanyDefaults({ fieldName: "from_company_id" });

  // Ensure all order items have the correct item_type
  useEffect(() => {
    if (orderItems.length > 0) {
      // Only update items that don't have an item_type set
      const needsUpdate = orderItems.some((item: OrderItem) => !item.item_type);
      if (needsUpdate) {
        const updatedItems = orderItems.map((item: OrderItem) => ({
          ...item,
          item_type: item.item_type || "product", // Default to product if not set
        }));
        setValue("order_items", updatedItems);
      }
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
      />

      <StockValidationAlert
        itemsFieldName="order_items"
        addressFieldName="from_shipping_address_id"
      />
    </>
  );
};

export default SellFormFields;
