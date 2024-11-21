import React from 'react'
import { TableRow, TableCell } from '@/components/ui/table'
import { ItemView } from '../../items/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Pencil } from 'lucide-react'
import { Input } from '../../../components/ui/input'

const InlineStocktakeRow = ({ item }: { item: ItemView }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [itemQuantity, setItemQuantity] = React.useState(item.item_quantity);

    return (
        <TableRow
            key={`item-${item.item_id}`}
        >
            <TableCell>
                <Badge
                    className="capitalize"
                    variant="default"
                >
                    {item.item_type}
                </Badge>
            </TableCell>
            <TableCell>
                {item.item_name}
            </TableCell>
            <TableCell>
                {isEditing ? <Input onBlur={() => setIsEditing(false)} type='number' className='w-20' value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} /> : <span onClick={() => setIsEditing(true)} className='px-3 w-20'> {item.item_quantity}</span>}
            </TableCell>
            <TableCell>
                {isEditing ?
                    <Button onClick={() => setIsEditing(false)} variant='ghost' size='icon'>
                        <Check size={20} />
                    </Button> :
                    <Button size='icon' onClick={() => setIsEditing(true)} variant="ghost">
                        <Pencil size={20} />
                    </Button>}
            </TableCell>
        </TableRow>
    )
}

export default InlineStocktakeRow