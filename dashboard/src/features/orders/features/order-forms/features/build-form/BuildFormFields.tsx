import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyAddressSelect from "@/features/companies/components/CompanyAddressSelect";
import PriceItems from "../../components/PriceItems";
import StockItems from "../../components/StockItems";
import LockCard from "../../../../components/LockCard";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import { useFormContext } from "react-hook-form";
import { useBuildForm } from "./useBuildForm";

const BuildFormFields = () => {
    const { watch } = useFormContext();
    const fromShippingAddressId = watch("from_shipping_address_id");

    // Initialize the build form logic
    useBuildForm();

    return (
        <>
            <CompanyAddressSelect direction="from" />

            <StockValidationAlert
                itemsFieldName="consumed_items"
                addressFieldName="from_shipping_address_id"
            />

            {fromShippingAddressId && (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle>Produced Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StockItems
                                name="produced_items"
                                address_name="from_shipping_address_id"
                            />
                        </CardContent>
                    </Card>
                    <LockCard title="Order Items">
                        <PriceItems showPrice={true} />
                    </LockCard>
                    <LockCard title="Consumed Items">
                        <StockItems
                            name="consumed_items"
                            address_name="from_shipping_address_id"
                        />
                    </LockCard>
                </>
            )}
        </>
    );
};

export default BuildFormFields;
