import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { useStockQuantities } from "../../hooks/useStockQuantities";
import StockItemsFormFields from "../../components/StockItemsFormFields";
import StockItemsSummary from "../../components/StockItemsSummary";
import StockItemActions from "../../components/StockItemActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
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
    readOnly?: boolean;
}

const StocktakeItems = ({
    name,
    address_name = "address_id",
    title,
    allowedTypes = [],
    readOnly = false,
}: StocktakeItemProps) => {
    const { data: items } = useSelectItemsView();
    const form = useFormContext();
    const { data: addresses } = useSelectAddresses();
    const { fields, append, remove } = useFieldArray({ name });
    const { getItemQuantities } = useStockQuantities(name, address_name);

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

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <CardTitle className="font-medium text-base">
                    {title ||
                        `Stock Changes ${
                            address?.name ? `(${address.name})` : ""
                        }`}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <StocktakeItemsFormFields
                    name={name}
                    fields={fields}
                    items={items || []}
                    form={form}
                    getItemQuantities={getItemQuantities}
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
