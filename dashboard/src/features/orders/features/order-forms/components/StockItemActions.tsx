import { Button } from "@/components/ui/button";
import { ItemType } from "../types";

interface StockItemActionsProps {
    allowedTypes: ItemType[];
    onAppend: (type: ItemType) => void;
}

const StockItemActions = ({
    allowedTypes,
    onAppend,
}: StockItemActionsProps) => {
    return (
        <div className="flex gap-2 p-2">
            {allowedTypes.map((type) => (
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => onAppend(type)}
                    className="capitalize"
                >
                    Add {type}
                </Button>
            ))}
        </div>
    );
};

export default StockItemActions;