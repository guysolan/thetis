import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import Sheet from '@/components/Sheet'
import { useSelectOrders } from '@/features/orders/api/selectOrders'
import { useSelectItemsView } from '@/features/items/api/selectItemsView'

import { OrderForm } from '@/features/orders/components/OrderForm'
import { OrderHistory } from '@/features/orders/components/OrderHistory'
import PageTitle from '../../../components/PageTitle'

const OrdersPage = () => {
  const { data: orders } = useSelectOrders()
  const { data: items } = useSelectItemsView()

  return (
    <>
      <PageTitle title="Orders">
        <Sheet
          trigger={<Button>Create New Order</Button>}
          title="Create Order"
          description="Enter the details for your new Order."
        >
          <OrderForm items={items} />
        </Sheet>
      </PageTitle>

      <OrderHistory orders={orders} />
    </>
  )
}

export const Route = createFileRoute('/_apps/stock/orders')({
  component: OrdersPage,
})
