import StockItems from "../../components/StockItems";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import { useBuyForm } from "./useBuyForm";
import Select from "../../../../../../components/Select";
import useCompanyDefaults from "../../../../../companies/hooks/useCompanyDefaults";
import { useFormContext, useWatch } from "react-hook-form";
import OrderDetails from "../sell-form/components/OrderDetails";
import BuyerSeller from "../../../../../companies/components/BuyerSeller";
import PriceSummary from "../../components/PriceSummary";
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
      <OrderDetails />
      <BuyerSeller />
      <Select
        name="item_type"
        options={["product", "part"].map((type) => ({
          label: type,
          value: type,
        }))}
      />
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
      <PriceSummary />
    </>
  );
};

export default BuyFormFields;
