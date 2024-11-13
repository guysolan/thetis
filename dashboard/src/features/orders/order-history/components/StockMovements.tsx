import React from 'react'
import {useMemo} from 'react'
import type {OrderView} from '../../types'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table'

const StockMovements = ({ orderItems }: { orderItems: OrderView['items'] }) => {
    const stockChanges = useMemo(() => {
        // Show each movement separately
        return orderItems.map(item => ({
            item_id: item.item_id,
            item_name: item.item_name,
            quantity: item.quantity,
            warehouse_name: item.address.name
        }));
    }, [orderItems]);

    return (
        <>
            <h3 className="mb-2 font-semibold">Stock Movements</h3>
            <Table className="mb-6 text-left">
                <TableHeader>
                    <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Quantity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stockChanges.map(item => (
                        <TableRow
                            className="text-left"
                            key={`${item.item_id}-${item.warehouse_name}-${item.quantity}`}
                        >
                            <TableCell>{item.item_name}</TableCell>
                            <TableCell>{item.warehouse_name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default StockMovements