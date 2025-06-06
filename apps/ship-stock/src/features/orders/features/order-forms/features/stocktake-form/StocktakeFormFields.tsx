import DatePicker from "../../../../../../components/DatePicker";
import AddressSelect from "../../../../../stockpiles/components/AddressSelect";
import StocktakeItems from "./StocktakeItems";

const StocktakeFormFields = () => {
  return (
    <>
      <DatePicker name="order_date" label="Order Date" />
      <AddressSelect name="address_id" />
      <StocktakeItems
        address_name="address_id"
        defaultIsExpanded={true}
        allowedTypes={["part", "product"]}
        name="order_items"
      />
    </>
  );
};

export default StocktakeFormFields;
