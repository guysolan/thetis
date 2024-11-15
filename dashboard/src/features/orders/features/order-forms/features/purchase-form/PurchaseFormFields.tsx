import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyAddressSelect from "@/features/companies/components/CompanyAddressSelect";
import PriceItems from "../../components/PriceItems";
import LockCard from "../../../../components/LockCard";
import AddressSelect from "../../../../../stockpiles/components/AddressSelect";
import StockItems from "../../components/StockItems";
import { usePurchaseForm } from "./usePurchaseForm";

const PurchaseFormFields = () => {
    usePurchaseForm();

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Seller</CardTitle>
                </CardHeader>
                <CardContent>
                    <CompanyAddressSelect direction="from" />
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
