import { createFileRoute } from '@tanstack/react-router'
import Sheet from '@/components/Sheet'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  selectWarehousesQueryOptions,
  useSelectWarehouses,
} from '@/features/warehouses/api/selectWarehouses'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/PageTitle'
import { WarehouseForm } from '@/features/warehouses/components/WarehouseForm'
import StocktakeForm from '@/features/orders/components/StockForm'
import AmazonWarehouses from '@/features/warehouses/components/AmazonWarehouses'
import DeleteDialog from '../../../components/DeleteDialog'
import useDeleteWarehouse from '../../../features/warehouses/api/deleteWarehouse'

const ItemsPage = () => {
  const { data: warehousesView } = useSelectWarehouses()

  const { mutate: deleteWarehouse } = useDeleteWarehouse()

  return (
    <>
      <PageTitle title="Warehouses">
        <Sheet
          trigger={<Button>New Warehouse</Button>}
          title="New Warehouse"
          description="Enter the details for your new Warehouse."
        >
          <WarehouseForm warehouse={null} />
        </Sheet>
      </PageTitle>
      <section className="gap-4 grid lg:grid-cols-2 pt-4">
        {warehousesView?.map((warehouse) => (
          <Card key={warehouse.warehouse_id} className="flex flex-col">
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-semibold text-lg truncate">
                {warehouse.warehouse_name}
              </CardTitle>
              <Sheet
                trigger={<Button variant="outline">Edit</Button>}
                title={`Edit ${warehouse.warehouse_name}`}
                description={`Edit the details for warehouse ${warehouse.warehouse_name}`}
                footer={
                  <DeleteDialog
                    deleteFunction={() =>
                      deleteWarehouse(warehouse.warehouse_id as number)
                    }
                  />
                }
              >
                <WarehouseForm warehouse={warehouse} />
              </Sheet>
            </CardHeader>
            <CardContent className="flex-grow">
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(warehouse.items as any)?.map((wp: any) => (
                    <TableRow key={`item-${wp.item_id}`}>
                      <TableCell>
                        <Badge className="capitalize" variant="default">
                          {wp.item_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{wp.item_name}</TableCell>
                      <TableCell>{wp.item_quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Sheet
                trigger={<Button>New Stocktake</Button>}
                title="New Stocktake"
                description={`Update the stock for warehouse ${warehouse.warehouse_name}`}
              >
                <StocktakeForm warehouseId={warehouse.warehouse_id as number} />
              </Sheet>
            </CardFooter>
          </Card>
        ))}
      </section>
      <AmazonWarehouses />
    </>
  )
}

export const Route = createFileRoute('/_apps/stock/warehouses')({
  component: ItemsPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(selectWarehousesQueryOptions())
  },
})
