import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CompanyAddressSelect from "../../../../../companies/components/CompanyAddressSelect";
import PriceItems from "../../../../order-forms/components/PriceItems";
import { useSaleForm } from "./useSaleForm";
import StockItems from "../../components/StockItems";
import AddressSelect from "../../../../../stockpiles/components/AddressSelect";
import LockCard from "../../../../components/LockCard";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import DatePicker from "../../../../../../components/DatePicker";
import Input from "../../../../../../components/Input";

const SaleFormFields = () => {
    useSaleForm();

    return (
        <>
            <DatePicker name="order_date" label="Order Date" />
            <Input name="carriage" label="Shipping Cost" type="number" />
            <Card>
                <CardHeader>
                    <CardTitle>Seller</CardTitle>
                    <CardDescription>Probably your company</CardDescription>
                </CardHeader>
                <CardContent>
                    <CompanyAddressSelect
                        hideShipping={true}
                        direction="from"
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Buyer</CardTitle>
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
