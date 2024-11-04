import React from 'react'
import {useMemo} from 'react'
import type {OrderView} from '../../types'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table'

const StockMovements = ({ orderItems }: { orderItems: OrderView['items'] }) => {
    const stockChanges = useMemo(() => {
        // First sum quantities by item_id
        const summedItems = orderItems.reduce((acc, item) => {
            const itemId = item.item_id;
            if (!acc[itemId]) {
                acc[itemId] = {...item, quantity: 0};
            }
            acc[itemId].quantity += Number(item?.quantity || 0);
            return acc;
        }, {} as Record<string, any>);

        // Convert to array and filter out zero quantities
        return Object.values(summedItems).filter(item => item.quantity !== 0);
    }, [orderItems]);
  return (
        <>
            <h3 className="mb-2 font-semibold">Financial Transactions</h3>
            <Table className="mb-6 text-left">
                <TableHeader>
                    <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Warehouse Name</TableHead>
                        <TableHead>Quantity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stockChanges
                        .map(item => (
                            <TableRow
                                className="text-left"
                                key={`${item.item_id}-${item.item_name}-financial`}
                            >
                                <TableCell>{item.item_name}</TableCell>
                                <TableCell>{item.warehouse_name}</TableCell>
                                <TableCell>
                                    {item.quantity}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>

  )
}

export default StockMovements