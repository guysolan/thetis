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
import ItemCard from './ItemCard';

const ItemCards = ({ itemType }: { itemType: ItemType }) => {
    const { data: itemsView } = useSelectItemsView();

    return (

        <section className="flex flex-col gap-4">
            {itemsView
                .filter((item) =>
                    item.item_type === itemType
                )
                .map((item: ItemView) => (
                    <ItemCard item={item} />
                ))}
        </section>
    );
};

export default ItemCards;