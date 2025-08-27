import StockItems from "../../components/StockItems";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import { useBuyForm } from "../../hooks/useBuyForm";
import useCompanyDefaults from "../../../companies/hooks/useCompanyDefaults";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useRef } from "react";
import PackageStockItems from "../../components/PackageStockItems";

const BuyFormFields = () => {
  const form = useFormContext();
  const { updateBuyForm } = useBuyForm();

  useCompanyDefaults({ fieldName: "to_company_id" });

  const itemType = useWatch({ control: form.control, name: "item_type" });
  const producedItems = form.watch("produced_items");
  const packageMode = form.watch("mode") === "package";

  const previousItemTypeRef = useRef<string | null>(null);

  // Initialize form with default values when itemType changes
  useEffect(() => {
    const previousItemType = previousItemTypeRef.current;
    if (itemType && itemType !== previousItemType) {
      form.setValue("order_items", []);
      form.setValue("consumed_items", []);
      form.setValue("produced_items", []);
      previousItemTypeRef.current = itemType;
    }
  }, [itemType, form]);

  const addToProducedItems = (newItem: any) =>
    form.setValue("produced_items", [...producedItems, newItem]);

  return (
    <>
      {packageMode && (
        <PackageStockItems
          itemsToUpdate={form.watch("item_type") === "product"
            ? ["produced_items"]
            : ["order_items"]}
        />
      )}
      {itemType === "part" && (
        <StockItems
          name="order_items"
          address_name="from_shipping_address_id"
          allowedTypes={[itemType]}
          title="Purchase Items"
          showPrice={true}
          packageMode={packageMode}
        />
      )}
      {itemType === "product" && (
        <>
          <StockItems
            onUpdate={updateBuyForm}
            name="produced_items"
            address_name="from_shipping_address_id"
            allowedTypes={[itemType]}
            title="Produced Items"
            showPrice={false}
            packageMode={packageMode}
          />
          <StockItems
            name="order_items"
            address_name="from_shipping_address_id"
            title="Purchase Items"
            showPrice={true}
            showQuantity={false}
            allowedTypes={["service"]}
          />

          <StockItems
            name="consumed_items"
            address_name="from_shipping_address_id"
            readOnly={true}
            title="Consumed Items"
          />
          <StockValidationAlert
            addItem={addToProducedItems}
            itemsFieldName="consumed_items"
            addressFieldName="from_shipping_address_id"
          />
        </>
      )}
    </>
  );
};

export default BuyFormFields;
