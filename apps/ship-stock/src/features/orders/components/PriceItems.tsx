import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import { Pencil } from "lucide-react";
import { ItemType } from "../features/order-forms/types";
import PriceItemsFormFields from "./PriceItemsFormFields";
import PriceItemsSummary from "./PriceItemsSummary";
import PriceItemActions from "./PriceItemActions";
import { usePriceItems } from "../hooks/usePriceItems";
import PriceSummary from "./PriceSummary";
import FormErrors from "../../../components/FormErrors";

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
                            showPrice={showPrice}
                        />
                    )}
            </CardContent>
            <CardFooter>
                <FormErrors
                    title="Price Items Errors"
                    fieldPrefix={"order_items"}
                    fields={[
                        "order_items",
                        ...(fields.map((field) => field.id)),
                    ]}
                />
            </CardFooter>
        </Card>
    );
};

export default PriceItems;
