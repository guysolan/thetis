import CompanyAddressContact from "@/features/companies/components/CompanyAddressContact";
import PriceItems from "../../components/PriceItems";
import StockItems from "../../components/StockItems";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import { useBuyForm } from "./useBuyForm";
import DatePicker from "../../../../../../components/DatePicker";
import Select from "../../../../../../components/Select";
import { currencyTypes } from "../../schema";
import useCompanyDefaults from "../../../../../companies/hooks/useCompanyDefaults";
import { useFormContext } from "react-hook-form";
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
            <div className="flex flex-row gap-4">
                <DatePicker name="order_date" label="Order Date" />
                <Select
                    name="currency"
                    label="Currency"
                    options={currencyTypes.map((o) => ({ label: o, value: o }))}
                />
            </div>

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
