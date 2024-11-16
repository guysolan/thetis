import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CompanyAddressSelect from "@/features/companies/components/CompanyAddressSelect";
import PriceItems from "../../components/PriceItems";
import LockCard from "../../../../components/LockCard";
import AddressSelect from "../../../../../stockpiles/components/AddressSelect";
import StockItems from "../../components/StockItems";
import { usePurchaseForm } from "./usePurchaseForm";
import DatePicker from "../../../../../../components/DatePicker";
import { currencyTypes } from "../../schema";
import Select from "../../../../../../components/Select";

const PurchaseFormFields = () => {
    usePurchaseForm();

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

            <CompanyAddressSelect title="Buyer" direction="to" />

            <CompanyAddressSelect title="Seller" direction="from" />

            <PriceItems
                title="Order Items"
                defaultIsExpanded={true}
                showPrice={true}
                allowedTypes={["part", "product"]}
            />

            <StockItems
                title="Produced Items"
                address_name="to_shipping_address_id"
                name="produced_items"
            />
        </>
    );
};

export default PurchaseFormFields;
