import React from 'react'
import { ItemView } from '../types'
import ComponentsTable from './ComponentsTable'
import ItemComponentsForm from './ItemComponentsForm'

const ItemComponents = ({ item, isEditing = false, stopEditing }: { item: ItemView, isEditing: boolean, stopEditing: () => void }) => {
    return (
        <> {["product", "package"].includes(item?.item_type ?? "") &&
            (
                <>
                    {!isEditing ? <ComponentsTable components={item.components} />
                        :
                        <ItemComponentsForm
                            onSuccess={stopEditing}
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
                        />}
                </>
            )}</>
    )
}

export default ItemComponents