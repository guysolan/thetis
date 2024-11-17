import CompanyAddressSelect from "@/features/companies/components/CompanyAddressSelect";
import PriceItems from "../../components/PriceItems";
import StockItems from "../../components/StockItems";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import { useBuildForm } from "./useBuildForm";
import DatePicker from "../../../../../../components/DatePicker";
import Select from "../../../../../../components/Select";
import Input from "../../../../../../components/Input";
import { currencyTypes } from "../../schema";
import useCompanyDefaults from "../../../../../companies/hooks/useCompanyDefaults";
const BuildFormFields = () => {
    // Initialize the build form logic
    useBuildForm();
    useCompanyDefaults({ fieldName: "to_company_id" });

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

            <CompanyAddressSelect
                title="Buyer"
                direction="to"
                defaultExpanded={false}
            />

            <CompanyAddressSelect title="Seller" direction="from" />

            <StockItems
                defaultIsExpanded={true}
                name="produced_items"
                address_name="from_shipping_address_id"
                allowedTypes={["product"]}
            />
            <StockValidationAlert
                itemsFieldName="consumed_items"
                addressFieldName="from_shipping_address_id"
            />
            <StockItems
                name="consumed_items"
                address_name="from_shipping_address_id"
            />

            <PriceItems showPrice={true} />
        </>
    );
};

export default BuildFormFields;
