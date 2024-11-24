import { Badge } from "@/components/ui/badge.tsx";
import { useSelectItemsView } from "@/features/items/api/selectItemsView.ts";
import { ItemType, ItemView } from "@/features/items/types.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import ItemActionsPopover from './ItemActionsPopover';

const ItemTable = ({ itemType }: { itemType: ItemType }) => {
    const { data: itemsView } = useSelectItemsView();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {itemsView
                    .filter((item) => item.item_type === itemType)
                    .map((item: ItemView) => (
                        <TableRow key={item.item_id}>
                            <TableCell>{item.item_name}</TableCell>
                            <TableCell>
                                <Badge>{item.item_type}</Badge>
                            </TableCell>
                            <TableCell>
                                ${Number(item.item_price ?? 0).toFixed(2)}
                                <span className="ml-1 text-muted-foreground text-sm">
                                    per unit
                                </span>
                            </TableCell>
                            <TableCell>
                                <ItemActionsPopover item={item} />
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default ItemTable;