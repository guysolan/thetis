import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import Sheet from '@/components/Sheet'
import { useSelectOrders } from '@/features/orders/api/selectOrders'
import { useSelectItemsView } from '@/features/items/api/selectItemsView'

import { OrderForm } from '@/features/orders/components/OrderForm'
import { OrderHistory } from '@/features/orders/components/OrderHistory'

const OrdersPage = () => {

  const { data: orders } = useSelectOrders()
  const { data: items } = useSelectItemsView()

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="mb-4 font-bold text-2xl">Order Creator</h1>
        <Sheet
          trigger={<Button>Create New Order</Button>}
          title="Create Order"
          description="Enter the details for your new Order."
        >
          {' '}
          <OrderForm items={items} />
        </Sheet>
      </div>
      <OrderHistory orders={orders} />
    </div>
  )
}

export const Route = createFileRoute('/_dashboard/orders')({
  component: OrdersPage,
})
