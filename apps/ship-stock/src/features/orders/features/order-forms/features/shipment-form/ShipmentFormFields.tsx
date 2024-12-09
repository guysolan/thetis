import { CardTitle } from "@thetis/ui/card";
import { useShipmentForm } from "./useShipmentForm";
import CompanyAddressContact from "../../../../../companies/components/CompanyAddressContact";
import ShipmentItems from "./ShipmentItems";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import StockItems from "../../components/StockItems";
import useCompanyDefaults from "../../../../../companies/hooks/useCompanyDefaults";
import OrderDetails from "../../components/OrderDetails";
import BuyerSeller from "../../../../../companies/components/BuyerSeller";

const ShipmentFormFields = () => {
  useShipmentForm();
  useCompanyDefaults({ fieldName: "from_company_id" });

  return (
    <>
      <OrderDetails />
      <BuyerSeller />
      <CompanyAddressContact direction="from" defaultExpanded={false} />
      <CompanyAddressContact direction="to" />
      <CardTitle>Items to Ship</CardTitle>
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
