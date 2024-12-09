import { useShipmentForm } from "../order-forms/features/shipment-form/useShipmentForm";
import ShipmentItems from "../order-forms/features/shipment-form/ShipmentItems";
import { StockValidationAlert } from "../order-forms/components/StockValidationAlert";
import StockItems from "../order-forms/components/StockItems";
import useCompanyDefaults from "../../../companies/hooks/useCompanyDefaults";

const ShipmentFormFields = () => {
  useShipmentForm();
  // useCompanyDefaults({ fieldName: "from_company_id" });

  return (
    <>
      <ShipmentItems />
      <StockValidationAlert />

      <StockItems
        readOnly={true}
        address_name="from_shipping_address_id"
        name="from_items"
      />

      <StockItems
        readOnly={true}
        name="to_items"
        address_name="to_shipping_address_id"
      />
    </>
  );
};

export default ShipmentFormFields;
