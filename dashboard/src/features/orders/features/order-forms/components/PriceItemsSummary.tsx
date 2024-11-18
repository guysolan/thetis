import { UseFormReturn } from "react-hook-form";
import { Item } from "@/features/items/types";
import PriceSummary from "./PriceSummary";

interface PriceItemsSummaryProps {
    name: string;
    fields: any[];
    items: Item[];
    form: UseFormReturn<any>;
    showPrice?: boolean;
    itemTotal: (index: number) => string;
}

const PriceItemsSummary = ({
    name,
    fields,
    items,
    form,
    showPrice = false,
    itemTotal,
}: PriceItemsSummaryProps) => {
    return (
        <div className="space-y-2">
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="flex justify-between items-center"
                >
                    <span>
                        {items?.find(
                            (item) =>
                                String(item.item_id) ===
                                    form.watch(`${name}.${index}.item_id`),
                        )?.item_name}
                        {" x "}
                        {form.watch(`${name}.${index}.quantity_change`)}
                    </span>
                    {showPrice && (
                        <span className="font-medium">${itemTotal(index)}</span>
                    )}
                </div>
            ))}
            {showPrice && fields.length > 0 && (
                <div className="flex justify-between items-start pt-2 border-t">
                    <b>Total</b>
                    <PriceSummary />
                </div>
            )}
        </div>
    );
};

export default PriceItemsSummary;
