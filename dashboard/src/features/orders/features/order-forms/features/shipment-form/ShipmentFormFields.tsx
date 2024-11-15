import { useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShipmentForm } from "./useShipmentForm";
import CompanyAddressSelect from "../../../../../companies/components/CompanyAddressSelect";
import ShipmentItems from "./ShipmentItems";
import PackageDialog from "../../../../../items/components/PackageDialog";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import StockItems from "../../components/StockItems";
import LockCard from "../../../../components/LockCard";
import AddressSelect from "@/features/stockpiles/components/AddressSelect";

const ShipmentFormFields = () => {
    useShipmentForm();

    const fromShippingAddressId = useWatch({
        name: "from_shipping_address_id",
    });
    const toShippingAddressId = useWatch({ name: "to_shipping_address_id" });

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
            {fromShippingAddressId && (
                <>
                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <CardTitle>Items to Ship</CardTitle>
                            <PackageDialog />
                        </CardHeader>
                        <CardContent>
                            <StockValidationAlert />
                            <ShipmentItems />
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
                            name="from_items"
                        />
                    </LockCard>
                    {toShippingAddressId && (
                        <LockCard
                            title={
                                <AddressSelect
                                    label="To Address"
                                    name="to_shipping_address_id"
                                />
                            }
                        >
                            <StockItems
                                name="to_items"
                                address_name="to_shipping_address_id"
                            />
                        </LockCard>
                    )}
                </>
            )}
        </>
    );
};

export default ShipmentFormFields;
