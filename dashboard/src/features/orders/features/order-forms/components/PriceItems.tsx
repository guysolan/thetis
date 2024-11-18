import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ItemType } from "../types";
import PriceItemsFormFields from "./PriceItemsFormFields";
import PriceItemsSummary from "./PriceItemsSummary";
import PriceItemActions from "./PriceItemActions";
import { formatCurrency } from "../../../../../constants/currencies";
import { usePriceItems } from "../hooks/usePriceItems";
import PriceSummary from "./PriceSummary";

interface PriceItemsProps {
    showPrice?: boolean;
    title?: string;
    defaultIsExpanded?: boolean;
    allowedTypes?: ItemType[];
}

const PriceItems = ({
    showPrice = false,
    title = "Order Items",
    defaultIsExpanded = false,
    allowedTypes = [],
}: PriceItemsProps) => {
    const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);
    const {
        items,
        fields,
        form,
        copyRow,
        remove,
        itemTotal,
        grandTotal,
        handleAppend,
        getFilteredItemOptions,
    } = usePriceItems();

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <CardTitle className="font-medium text-base">
                    {title}
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
                            <PriceItemsFormFields
                                name="order_items"
                                fields={fields}
                                items={items}
                                form={form}
                                onCopy={copyRow}
                                grandTotal={grandTotal}
                                onRemove={remove}
                                showPrice={showPrice}
                                itemTotal={itemTotal}
                                getFilteredItemOptions={getFilteredItemOptions}
                                allowedTypes={allowedTypes}
                            />
                            <PriceItemActions
                                itemTypes={allowedTypes}
                                onAppend={handleAppend}
                            />

                            {isExpanded && (
                                <Button
                                    type="button"
                                    onClick={() => setIsExpanded(false)}
                                >
                                    Done
                                </Button>
                            )}
                            {showPrice && <PriceSummary />}
                        </div>
                    )
                    : (
                        <PriceItemsSummary
                            name="order_items"
                            fields={fields}
                            items={items}
                            form={form}
                            showPrice={showPrice}
                            itemTotal={itemTotal}
                        />
                    )}
            </CardContent>
        </Card>
    );
};

export default PriceItems;
