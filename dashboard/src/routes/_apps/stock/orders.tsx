import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import Sheet from '@/components/Sheet'
import { useSelectOrders } from '@/features/orders/order-history/api/selectOrders'
import { useSelectItemsView } from '@/features/items/api/selectItemsView'
import {Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

      <Tabs defaultValue="all" className="w-full">
        <TabsList className='my-2'>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="build">Builds</TabsTrigger>
          <TabsTrigger value="purchase">Purchase</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
        </TabsList>

        {["all", "sales", "build", "purchase", "shipments"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <OrderHistory 
              orders={orders?.filter(order => 
                tabValue === "all" ? true : order.order_type === tabValue
              )} 
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}

export const Route = createFileRoute('/_apps/stock/orders')({
  component: OrdersPage,
})
