import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyAddressSelect from "../../../../../companies/components/CompanyAddressSelect";
import PriceItems from "../../../../order-forms/components/PriceItems";
import { useSaleForm } from "./useSaleForm";
import StockItems from "../../components/StockItems";
import AddressSelect from "../../../../../stockpiles/components/AddressSelect";
import LockCard from "../../../../components/LockCard";
import { StockValidationAlert } from "../../components/StockValidationAlert";

const SaleFormFields = () => {
    useSaleForm();

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>From</CardTitle>
                </CardHeader>
                <CardContent>
                    <CompanyAddressSelect direction="from" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>To</CardTitle>
                </CardHeader>
                <CardContent>
                    <CompanyAddressSelect direction="to" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <StockValidationAlert
                        itemsFieldName="consumed_items"
                        addressFieldName="from_shipping_address_id"
                    />
                    <PriceItems showPrice={true} />
                </CardContent>
            </Card>
            <LockCard
                title={
                    <AddressSelect
                        label="From Address"
                        name="from_shipping_address_id"
                    />
                }
            >
                <StockItems
                    address_name="from_shipping_address_id"
                    name="consumed_items"
                />
            </LockCard>
        </>
    );
};

export default SaleFormFields;
