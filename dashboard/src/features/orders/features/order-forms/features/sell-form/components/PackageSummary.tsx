import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Badge } from '@/components/ui/badge'
import { BoxIcon } from 'lucide-react'
import { Weight } from 'lucide-react'
import { useSelectItemsView } from '../../../../../../items/api/selectItemsView'
import DimensionsBadge from '../../../../../../items/components/DimensionsBadge'
import WeightBadge from '../../../../../../items/components/WeightBadge'

const PackageSummary = ({ index }: { index: number }) => {
    const form = useFormContext();
    const selectedItem = form.watch(`order_items.${index}`);
    const { data: itemsView } = useSelectItemsView();
    const selectedItemView = itemsView?.find((item) => String(item.item_id) === String(selectedItem?.package_id));

    if (!selectedItemView) return <p>No item selected</p>;

    return (
        <div className='flex flex-col gap-y-2'>
            <p>{form.watch(`order_items.${index}.package_quantity`)} x {selectedItemView?.item_name}</p>
            <div className='flex flex-wrap gap-x-2'>
                <DimensionsBadge item={selectedItemView} />
                <WeightBadge item={selectedItemView} />
            </div>
        </div>
    )
}

export default PackageSummary