import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { useStockQuantities } from "../hooks/useStockQuantities";
import StockItemsFormFields from "./StockItemsFormFields";
import StockItemsSummary from "./StockItemsSummary";
import StockItemActions from "./StockItemActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {
    AddressName,
    ItemType,
    StockItemFormData,
    StockItemName,
} from "../types";
import { useSelectAddresses } from "@/features/stockpiles/api/selectAddresses";

interface StockItemProps {
    name: StockItemName;
    address_name?: AddressName;
    title?: string;
    allowedTypes?: ItemType[];
    defaultIsExpanded?: boolean;
}

const StockItems = ({
    name,
    address_name = "from_shipping_address_id",
    title,
    allowedTypes = [],
    defaultIsExpanded = false,
}: StockItemProps) => {
    const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);
    const { data: items } = useSelectItemsView();
    const form = useFormContext();
    const { data: addresses } = useSelectAddresses();
    const { fields, append, remove } = useFieldArray({ name });
    const { getItemQuantities } = useStockQuantities(name, address_name);

    const address = addresses?.find(
        (a) => String(a.id) === form.watch(address_name),
    );

    const copyRow = (index: number) => {
        const rowToCopy = form.getValues(`${name}.${index}`);
        append({ ...rowToCopy });
    };

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
                        `Stock ${
                            name.includes("consumed") ? "Consumed" : "Produced"
                        } ${address?.name ? `(${address.name})` : ""}`}
                </CardTitle>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {isExpanded
                    ? (
                        <div className="space-y-4">
                            <StockItemsFormFields
                                name={name}
                                fields={fields}
                                items={items || []}
                                form={form}
                                getItemQuantities={getItemQuantities}
                                onCopy={copyRow}
                                onRemove={remove}
                            />
                            <StockItemActions
                                allowedTypes={allowedTypes}
                                onAppend={handleAppend}
                            />
                        </div>
                    )
                    : (
                        <StockItemsSummary
                            name={name}
                            fields={fields}
                            items={items || []}
                            form={form}
                            getItemQuantities={getItemQuantities}
                        />
                    )}
            </CardContent>
        </Card>
    );
};

export default StockItems;