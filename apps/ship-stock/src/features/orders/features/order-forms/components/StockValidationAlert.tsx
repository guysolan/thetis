import { Alert, AlertDescription } from "@thetis/ui/alert";
import { useStockValidation } from "../hooks/useStockValidation";
import { Button } from "@thetis/ui/button";
import { roundIfRequired } from "../utils/roundIfRequired";

interface StockValidationAlertProps {
    itemsFieldName?: string;
    addressFieldName?: string;
    addItem?: (newItem: any) => void;
}

export const StockValidationAlert = ({
    addItem,
    itemsFieldName,
    addressFieldName,
}: StockValidationAlertProps) => {
    const { hasNegativeStock, negativeStockItems } = useStockValidation({
        itemsFieldName,
        addressFieldName,
    });

    const filteredNegativeItems = negativeStockItems.filter(
        item => item.item_type === 'product' || item.item_type === 'part'
    );

    if (!hasNegativeStock || filteredNegativeItems.length === 0) return null;

    return (
        <Alert variant="destructive">
            <AlertDescription>
                Cannot create order: The following items would have negative
                stock:
                <ul>
                    {filteredNegativeItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center py-2 pl-4 md:pl-8"
                        >
                            <span className="">
                                {item.item_name}:{" "}
                                {roundIfRequired(item.item_quantity)}
                            </span>
                            {addItem && (
                                <Button
                                    variant="link"
                                    size="sm"
                                    type="button"
                                    className="text-inherit"
                                    onClick={() => {
                                        addItem({
                                            item_type: item.item_type,
                                            item_id: item.item_id,
                                            item_name: item.item_name,
                                            quantity_change: Math.ceil(
                                                -item.item_quantity,
                                            ),
                                            item_price: item.item_price,
                                            item_tax: item.item_tax,
                                        });
                                    }}
                                >
                                    Add Item
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
};
