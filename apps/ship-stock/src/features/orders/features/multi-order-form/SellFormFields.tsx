import { useSellForm } from "../order-forms/features/sell-form/hooks/useSellForm";
import StockItems from "../order-forms/components/StockItems";
import { StockValidationAlert } from "../order-forms/components/StockValidationAlert";
import Select from "../../../../components/Select";
import useCompanyDefaults from "../../../companies/hooks/useCompanyDefaults";
import SellPackages from "../order-forms/features/sell-form/components/SellPackages";
import { useFormContext } from "react-hook-form";
import PackageStockItems from "../order-forms/components/PackageStockItems";
import { useMemo } from "react";

const SellFormFields = () => {
  const { watch } = useFormContext();
  const mode = watch("mode");

  // Initialize hooks with proper dependencies
  useSellForm();
  useCompanyDefaults({ fieldName: "from_company_id" });

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
