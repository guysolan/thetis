import CompanyAddressContact from "../../../../../../companies/components/CompanyAddressContact";
import PriceItems from "../../../components/PriceItems";
import { useSellForm } from "../hooks/useSellForm";
import StockItems from "../../../components/StockItems";
import { StockValidationAlert } from "../../../components/StockValidationAlert";
import DatePicker from "../../../../../../../components/DatePicker";
import Input from "../../../../../../../components/Input";
import Select from "../../../../../../../components/Select";
import useCompanyDefaults from "../../../../../../companies/hooks/useCompanyDefaults";
import { currencyKeys } from "../../../../../../../constants/currencies";
import SellPackages from './SellPackages';
import { Card } from '../../../../../../../components/ui/card';
import { useFormContext } from 'react-hook-form';
import PriceItemsSummary from '../../../components/PriceItemsSummary';
import StockItemsSummary from '../../../components/StockItemsSummary';

const SellFormFields = () => {
    const { watch, setValue } = useFormContext();
    const mode = watch("mode");
    useSellForm();
    useCompanyDefaults({ fieldName: "from_company_id" });

    return (
        <>
            <Card className="flex flex-col gap-4 p-4">

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
            </Card>
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
                <CompanyAddressContact
                    title="Seller"
                    direction="from"
                />

                <CompanyAddressContact
                    title="Buyer"
                    direction="to"
                />
            </div>

            <Select
                label="Package Items?"
                name="mode"
                options={[
                    { label: "Package Mode", value: "package" },
                    { label: "Direct Items", value: "direct" }
                ]}
            />
            {mode === "package" ? (
                <SellPackages />
            ) : (
                <PriceItems
                    title="Order Items"
                    showPrice={true}
                    defaultIsExpanded={true}
                    allowedTypes={["product", "part"]}
                />
            )}

            <StockValidationAlert
                itemsFieldName="consumed_items"
                addressFieldName="from_shipping_address_id"
            />
            <Card className='bg-slate-50 p-4'>

                <StockItemsSummary
                    addressName="from_shipping_address_id"
                    name="consumed_items"
                />
            </Card>

            {mode === 'package' &&
                <Card className='bg-slate-50 p-4'>

                    <PriceItemsSummary showPrice={true} />
                </Card>

            }
        </>
    );
};

export default SellFormFields;
