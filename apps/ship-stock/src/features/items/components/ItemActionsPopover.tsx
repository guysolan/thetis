import { ItemView } from '../types'
import ActionPopover from '@/components/ActionPopover'
import { ItemForm } from './ItemForm'
import { useDeleteItem } from '../api/deleteItem';
import { useDuplicateItem } from '../api/duplicateItem';
import Sheet from '../../../components/Sheet';
import ItemComponentsForm from './ItemComponentsForm';
import { Shapes } from 'lucide-react';
import PopoverOption from '../../../components/PopoverOption';

const ItemActionsPopover = ({ item }: { item: ItemView }) => {
    const { mutate: duplicateItem } = useDuplicateItem();
    const { mutate: deleteItem } = useDeleteItem();
    return <ActionPopover
        title={item.item_name}
        editForm={<ItemForm item={item} />}
        deleteFunction={() =>
            deleteItem(item.item_id as number)}
        onDuplicate={() =>
            duplicateItem({
                itemId: {
                    price: item.item_price as number,
                    name: item.item_name,
                    type: item.item_type!,
                    weight: item.weight ?? 0,
                    height: item.height ?? 0,
                    width: item.width ?? 0,
                    depth: item.depth ?? 0,
                    country_of_origin: item.country_of_origin,
                    sku: item.sku,
                },
                // @ts-ignore
                components: item.components,
            })}
    >
        {['package', 'product'].includes(item.item_type ?? "") &&
            <Sheet
                trigger={
                    <PopoverOption>
                        <Shapes size={16} />
                        Edit Components
                    </PopoverOption>
                }
                title={item.item_name}
                description={`Make changes to the ${item.item_name} details here. Click save when you're done.`}
            >
                <ItemComponentsForm
                    itemId={item.item_id}
                    defaultValues={{
                        item_components: item.components.map((
                            ic,
                        ) => ({
                            component_quantity: (ic.component_quantity),
                            item_id: String(item.item_id),
                            component_id: String(ic.component_id),
                            component_type: ic.component_type,
                        })),
                    }}
                />
            </Sheet>}

    </ActionPopover>
}

export default ItemActionsPopover
