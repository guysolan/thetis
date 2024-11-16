import { Button } from "@/components/ui/button";
import { ItemType } from "@/features/items/types";

interface PriceItemActionsProps {
    onAppend: (type: string) => void;
    itemTypes: ItemType[];
}

const PriceItemActions = ({ itemTypes, onAppend }: PriceItemActionsProps) => {
    return (
        <div className="flex gap-2 p-2">
            {itemTypes.map((type) => (
                <Button
                    key={type}
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => onAppend(type)}
                >
                    Add {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
            ))}
        </div>
    );
};

export default PriceItemActions;
