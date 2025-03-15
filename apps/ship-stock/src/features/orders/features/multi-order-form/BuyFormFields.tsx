import StockItems from "../order-forms/components/StockItems";
import { StockValidationAlert } from "../order-forms/components/StockValidationAlert";
import { useBuyForm } from "../order-forms/features/buy-form/useBuyForm";
import useCompanyDefaults from "../../../companies/hooks/useCompanyDefaults";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
const BuyFormFields = () => {
  const form = useFormContext();
  const { updateBuyForm } = useBuyForm();

  useCompanyDefaults({ fieldName: "to_company_id" });

  const itemType = useWatch({ control: form.control, name: "item_type" });

  useEffect(() => {
    form.setValue("order_items", [
      { item_type: itemType, item_id: "", quantity_change: 0 },
    ]);
    form.setValue("consumed_items", []);
    form.setValue("produced_items", []);
  }, [itemType]);

  const producedItems = form.watch("produced_items");
  const addToProducedItems = (newItem: any) =>
    form.setValue("produced_items", [...producedItems, newItem]);
  return (
    <>
      {itemType === "part" && (
        <StockItems
          name="order_items"
          address_name="from_shipping_address_id"
          allowedTypes={[itemType]}
          title="Purchase Items"
          showPrice={true}
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
