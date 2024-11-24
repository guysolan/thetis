import React from 'react'
import { ItemView } from '../types'
import ComponentsTable from './ComponentsTable'
import ItemComponentsForm from './ItemComponentsForm'
import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

const ItemComponents = ({ item }: { item: ItemView }) => {
    return (
        <> {["product", "package"].includes(item?.item_type ?? "") &&
            (
                <>
                    <ComponentsTable components={item.components} />
                    <Sheet
                        trigger={
                            <Button
                                size="lg"
                                className="gap-x-2 mt-4 w-full"
                                variant="secondary"
                            >
                                <Pencil size={16} />
                                Edit Components
                            </Button>
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
                    </Sheet>
                </>
            )}</>
    )
}

export default ItemComponents