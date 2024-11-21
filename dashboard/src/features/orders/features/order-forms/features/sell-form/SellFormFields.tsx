import CompanyAddressContact from "../../../../../companies/components/CompanyAddressContact";
import PriceItems from "../../components/PriceItems";
import { useSellForm } from "./useSellForm";
import StockItems from "../../components/StockItems";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import DatePicker from "../../../../../../components/DatePicker";
import Input from "../../../../../../components/Input";
import Select from "../../../../../../components/Select";
import useCompanyDefaults from "../../../../../companies/hooks/useCompanyDefaults";
import { currencyKeys } from "../../../../../../constants/currencies";
import PricePackageItems from '../../components/PricePackageItems';

const SellFormFields = () => {
    useSellForm();
    useCompanyDefaults({ fieldName: "from_company_id" });

    return (
        <>
            <div className="flex flex-col gap-4">
                <DatePicker name="order_date" label="Order Date" />
                <div className="flex flex-row gap-4">
                    <Select
                        name="currency"
                        label="Currency"
                        options={currencyKeys.map((o) => ({
                            label: o,
                            value: o,
                        }))}
                    />
                    <Input
                        name="carriage"
                        label="Carriage"
                        type="number"
                        step="0.01"
                    />
                </div>
            </div>

            <CompanyAddressContact
                title="Seller"
                direction="from"
            />

            <CompanyAddressContact
                title="Buyer"
                direction="to"
            />

            <PricePackageItems
                title="Packages"
                showPrice={true}
                defaultIsExpanded={true}
                showPackageItems={true}
            />
            <StockValidationAlert
                itemsFieldName="consumed_items"
                addressFieldName="from_shipping_address_id"
            />

            <StockItems
                address_name="from_shipping_address_id"
                name="consumed_items"
            />
        </>
    );
};

export default SellFormFields;
