import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { useSelectOrderById } from '@/features/orders/api/selectOrderById'
import { useSelectAddresses } from '@/features/stockpiles/api/selectAddresses'
import { useSelectItems } from '@/features/items/api/selectItems'
import { EditableOrderItemChange } from '@/features/orders/components/EditableOrderItemChange'
import { EditableItemChange } from '@/features/orders/components/EditableItemChange'
import { ComboboxOption } from '@/components/Combobox'
import { Card, CardContent, CardHeader, CardTitle } from '@thetis/ui/card'
import { Badge } from '@thetis/ui/badge'
import { Separator } from '@thetis/ui/separator'

export const Route = createFileRoute('/home/orders/$orderId/details')({
  component: RouteComponent,
})

function RouteComponent() {
  const { orderId } = Route.useParams()
  const { data: order } = useSelectOrderById(orderId)
  const { data: addresses } = useSelectAddresses()
  const { data: items } = useSelectItems()

  // Convert addresses to combobox options
  const addressOptions: ComboboxOption[] = React.useMemo(() => 
    addresses?.map(address => ({
      value: address.id.toString(),
      label: address.name || `${address.line_1}, ${address.city}` || 'Unnamed Address'
    })) || [], [addresses]
  )

  // Convert items to combobox options (for package items)
  const itemOptions: ComboboxOption[] = React.useMemo(() => 
    items?.map(item => ({
      value: item.id.toString(),
      label: item.name
    })) || [], [items]
  )

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Order Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Order #{order.id}</span>
            <Badge variant="outline">{order.order_type}</Badge>
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">Order Date</p>
              <p className="text-muted-foreground">{new Date(order.order_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-medium">Currency</p>
              <p className="text-muted-foreground">{order.currency || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium">Carriage</p>
              <p className="text-muted-foreground">{order.carriage}</p>
            </div>
            <div>
              <p className="font-medium">Payment Status</p>
              <p className="text-muted-foreground">{order.payment_status || 'N/A'}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Order Items */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Order Items</h2>
        {order.order_item_changes.map((orderItemChange, index) => (
          <div key={`${orderItemChange.order_id}-${orderItemChange.item_change_id}`} className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Item #{index + 1}</h3>
              <Badge variant="secondary">{orderItemChange.item_changes.items.type}</Badge>
            </div>
            
            {/* Item Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Item Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Name</p>
                    <p className="text-muted-foreground">{orderItemChange.item_changes.items.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">SKU</p>
                    <p className="text-muted-foreground">{orderItemChange.item_changes.items.sku || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Base Price</p>
                    <p className="text-muted-foreground">{orderItemChange.item_changes.items.price || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-medium">HS Code</p>
                    <p className="text-muted-foreground">{orderItemChange.item_changes.items.hs_code || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Order Item Change */}
              <div>
                <h4 className="text-md font-medium mb-3">Order Item Details</h4>
                <EditableOrderItemChange
                  orderItemChange={orderItemChange}
                  orderId={orderId}
                  itemOptions={itemOptions}
                />
              </div>

              {/* Item Change */}
              <div>
                <h4 className="text-md font-medium mb-3">Item Change Details</h4>
                <EditableItemChange
                  orderItemChange={orderItemChange}
                  orderId={orderId}
                  addressOptions={addressOptions}
                />
              </div>
            </div>

            {index < order.order_item_changes.length - 1 && <Separator className="my-6" />}
          </div>
        ))}
      </div>
    </div>
  )
}