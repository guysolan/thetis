import { InsertItem, ItemComponentInsert } from "../types";
import { selectItemsViewQueryKey } from "./selectItemsView";
import { upsertItem } from "./upsertItem";
import { upsertItemComponents } from "./upsertItemComponents";

export const duplicateItem = async (
    copyItem: InsertItem,
    components: ItemComponentInsert[],
) => {
    const item = await upsertItem({...copyItem, name: `${copyItem.name} - Copy`});
    if (components.length > 0) {
        const itemComponents = components.map((component) => ({
            component_id: component.component_id,
            component_quantity: component.component_quantity,
            item_id: item.id,
        }));
        console.log(itemComponents);
        return await upsertItemComponents(itemComponents);
    }
    return item;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDuplicateItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            itemId,
            components,
        }: {
            itemId: InsertItem;
            components: ItemComponentInsert[];
        }) => duplicateItem(itemId, components),
        onError: () => {
            toast.error("Error duplicating item");
        },
        onSuccess: () => {
            toast.success("Item duplicated successfully");
        },
        onSettled: () => {
            queryClient.invalidateQueries(selectItemsViewQueryKey);
        },
    });
};
