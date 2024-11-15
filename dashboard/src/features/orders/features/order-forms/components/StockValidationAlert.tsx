import { Alert, AlertDescription } from "@/components/ui/alert";
import { useStockValidation } from "../hooks/useStockValidation";

interface StockValidationAlertProps {
    itemsFieldName?: string;
    addressFieldName?: string;
}

export const StockValidationAlert = ({
    itemsFieldName,
    addressFieldName,
}: StockValidationAlertProps) => {
    const { hasNegativeStock, negativeStockItems } = useStockValidation({
        itemsFieldName,
        addressFieldName,
    });

    if (!hasNegativeStock) return null;

    return (
        <Alert variant="destructive">
            <AlertDescription>
                Cannot create order: The following items would have negative
                stock:
                {negativeStockItems.map((item, index) => (
                    <div key={index}>
                        • {item.name}: {item.quantity}
                    </div>
                ))}
            </AlertDescription>
        </Alert>
    );
};
