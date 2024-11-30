import CompanyAddressContact from "@/features/companies/components/CompanyAddressContact";
import PriceItems from "../../components/PriceItems";
import StockItems from "../../components/StockItems";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import { useBuyForm } from "./useBuyForm";
import DatePicker from "../../../../../../components/DatePicker";
import Select from "../../../../../../components/Select";
import { currencyKeys } from "../../../../../../constants/currencies";
import useCompanyDefaults from "../../../../../companies/hooks/useCompanyDefaults";
import { useFormContext } from "react-hook-form";
import OrderDetails from '../sell-form/components/OrderDetails';
const BuyFormFields = () => {
    // Initialize the build form logic
    const form = useFormContext();
    useBuyForm();
    useCompanyDefaults({ fieldName: "to_company_id" });

    const producedItems = form.watch("produced_items");
    const addToProducedItems = (newItem: any) =>
        form.setValue("produced_items", [...producedItems, newItem]);
    return (
        <>
            <OrderDetails />


            <CompanyAddressContact
                title="Buyer"
                direction="to"
                defaultExpanded={false}
            />

            <CompanyAddressContact title="Seller" direction="from" />

            <StockItems
                defaultIsExpanded={true}
                name="produced_items"
                address_name="from_shipping_address_id"
                allowedTypes={["part", "product"]}
                title="Requested Items"
            />
            <StockValidationAlert
                addItem={addToProducedItems}
                itemsFieldName="consumed_items"
                addressFieldName="from_shipping_address_id"
            />
            <StockItems
                name="consumed_items"
                address_name="from_shipping_address_id"
                readOnly={true}
                defaultIsExpanded={false}
                title="Stock Changes"
            />

            <PriceItems
                allowedTypes={["product", "part", "service"]}
                showPrice={true}
                title="Purchase Costs"
            />
        </>
    );
};

export default BuyFormFields;
