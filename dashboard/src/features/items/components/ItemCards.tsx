import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSelectItemsView } from "@/features/items/api/selectItemsView.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { ItemType, ItemView } from "@/features/items/types.ts";

import ItemDetails from './ItemDetails';
import ItemComponents from './ItemComponents';
import ItemActionsPopover from './ItemActionsPopover';

const ItemCards = ({ itemType }: { itemType: ItemType }) => {
    const { data: itemsView } = useSelectItemsView();

    return (

        <section className="flex flex-col gap-4">
            {itemsView
                .filter((item) =>
                    item.item_type === itemType
                )
                .map((item: ItemView) => (
                    <Card key={item.item_id} className="flex flex-col">
                        <CardHeader className="flex flex-row justify-between items-center space-y-0">
                            <div className="flex flex-col flex-wrap gap-4">
                                <CardTitle className="flex flex-row flex-wrap gap-4 font-semibold text-left text-lg text-wrap truncate">
                                    {item.item_name}
                                    <Badge>{item.item_type}</Badge>
                                </CardTitle>
                                <div className="font-medium text-foreground text-lg">
                                    ${Number(item.item_price ?? 0).toFixed(2)}
                                    <span className="ml-1 text-muted-foreground text-sm">
                                        per unit
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row flex-shrink gap-2">
                                <ItemActionsPopover item={item} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ItemDetails item={item} />
                            <ItemComponents item={item} />
                        </CardContent>
                    </Card>
                ))}
        </section>
    );
};

export default ItemCards;