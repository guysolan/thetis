import React from 'react'
import { Badge } from '@/components/ui/badge'
import { BoxIcon } from 'lucide-react'
import { ItemView } from '../types'

const DimensionsBadge = ({ item }: { item: ItemView | undefined }) => {
    if (!item?.weight) return null;

    return (
        <Badge className='gap-x-2 space-x-2 px-3 py-1.5'>
            <BoxIcon size={16} />
            <span>{item?.height && item?.width && item?.depth ? `${item?.height} × ${item?.width} × ${item?.depth}` : "N/A"}</span>
        </Badge>
    )
}

export default DimensionsBadge