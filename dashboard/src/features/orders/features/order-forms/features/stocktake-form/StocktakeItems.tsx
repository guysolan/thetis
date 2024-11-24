import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { useStocktakeForm } from "../../hooks/useStocktakeForm";
import StockItemActions from "../../components/StockItemActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AddressName,
    ItemType,
    StockItemFormData,
    StockItemName,
} from "../../types";
import { useSelectAddresses } from "@/features/stockpiles/api/selectAddresses";
import StocktakeItemsFormFields from "./StocktakeItemsFormFields";

interface StocktakeItemProps {
    name: StockItemName;
    address_name?: AddressName;
    title?: string;
    allowedTypes?: ItemType[];
    defaultIsExpanded?: boolean;
    inCard?: boolean;
}

const StocktakeItems = ({
    name,
    address_name = "address_id",
    title,
    allowedTypes = [],
    inCard = false,
}: StocktakeItemProps) => {
    const { data: items } = useSelectItemsView();
    const form = useFormContext();
    const { data: addresses } = useSelectAddresses();
    const { fields, append, remove } = useFieldArray({ name });

    useStocktakeForm(name, address_name);

    const address = addresses?.find(
        (a) => String(a.id) === form.watch(address_name),
    );

    const handleAppend = (type: ItemType) => {
        append({
            item_type: type,
            item_id: "",
            quantity_change: 1,
        } as StockItemFormData);
    };

    if (inCard) {
        return (<>
            <StocktakeItemsFormFields
                name={name}
                fields={fields}
                items={items || []}
                form={form}
            />
            <StockItemActions
                allowedTypes={allowedTypes}
                onAppend={handleAppend}
            /></>)
    }
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <CardTitle className="font-medium text-base">
                    {title ||
                        `Stock Changes ${address?.name ? `(${address.name})` : ""
                        }`}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <StocktakeItemsFormFields
                    name={name}
                    fields={fields}
                    items={items || []}
                    form={form}
                />
                <StockItemActions
                    allowedTypes={allowedTypes}
                    onAppend={handleAppend}
                />
            </CardContent>
        </Card>
    );
};

export default StocktakeItems;
