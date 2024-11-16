import { useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShipmentForm } from "./useShipmentForm";
import CompanyAddressSelect from "../../../../../companies/components/CompanyAddressSelect";
import ShipmentItems from "./ShipmentItems";
import PackageDialog from "../../../../../items/components/PackageDialog";
import { StockValidationAlert } from "../../components/StockValidationAlert";
import StockItems from "../../components/StockItems";
import useCompanyDefaults from "../../../../../companies/hooks/useCompanyDefaults";

const ShipmentFormFields = () => {
    useShipmentForm();
    useCompanyDefaults({ fieldName: "from_company_id" });

    return (
        <>
            <CompanyAddressSelect direction="from" defaultExpanded={false} />
            <CompanyAddressSelect direction="to" />
            <Card>
                <CardHeader className="flex flex-row justify-between">
                    <CardTitle>Items to Ship</CardTitle>
                    <PackageDialog />
                </CardHeader>
                <CardContent>
                    <ShipmentItems />
                </CardContent>
            </Card>
            <StockValidationAlert />

            <StockItems
                address_name="from_shipping_address_id"
                name="from_items"
            />

            <StockItems
                name="to_items"
                address_name="to_shipping_address_id"
            />
        </>
    );
};

export default ShipmentFormFields;
