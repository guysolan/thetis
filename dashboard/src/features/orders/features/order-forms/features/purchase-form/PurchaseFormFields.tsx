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

const PurchaseFormFields = () => {
    usePurchaseForm();

    return (
        <>
            <DatePicker name="order_date" label="Order Date" />

            <Card>
                <CardHeader>
                    <CardTitle>Buyer</CardTitle>
                    <CardDescription>Probably your company</CardDescription>
                </CardHeader>
                <CardContent>
                    <CompanyAddressSelect direction="to" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Seller</CardTitle>
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
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <PriceItems showPrice={true} />
                </CardContent>
            </Card>

            <LockCard
                title={
                    <AddressSelect
                        label="To Address"
                        name="to_shipping_address_id"
                    />
                }
            >
                <StockItems
                    address_name="to_shipping_address_id"
                    name="produced_items"
                />
            </LockCard>
        </>
    );
};

export default PurchaseFormFields;
