import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Weight } from 'lucide-react'
import { ItemView } from '../types'

const WeightBadge = ({ item }: { item: ItemView | undefined }) => {
    if (!item?.weight) return null;
    return (
        <Badge className='gap-x-2 space-x-2 px-3 py-1.5' variant="outline"><Weight size={16} />{item?.weight} kg</Badge>

    )
}

export default WeightBadge