import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet";
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelectWarehouseItems } from "@/features/inventory/api/selectWarehouseItems";
import { useSelectWarehouses } from '../../features/inventory/api/selectWarehouses';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { StockTakeForm } from '../../features/inventory/components/StockTakeForm';

const ItemsPage = () => {
    const {data:warehouses} = useSelectWarehouses();
  const { data: warehouseItems } =
    useSelectWarehouseItems();

  return (
    <section className="gap-4 grid lg:grid-cols-2 p-4">
      {warehouses?.map((warehouse: any) => (
        <Card key={warehouse.id} className="flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-semibold text-lg truncate">
              {warehouse.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Current Quantity</TableHead>
                  <TableHead>Current Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
           
                {warehouseItems?.filter(wp => wp.warehouse_id === warehouse.id).map((wp: any) => (
                  <TableRow key={`item-${wp.item_id}`}>
                    <TableCell>
                      <Badge className='capitalize' variant="default">{wp.item_type}</Badge>
                    </TableCell>
                    <TableCell>{wp.item_name}</TableCell>
                    <TableCell>${wp.item_price.toFixed(2)}</TableCell>
                    <TableCell>{wp.item_quantity}</TableCell>
                    <TableCell>${(wp.item_value).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
               
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Sheet trigger={<Button>New Stocktake</Button>} title='New Stocktake' description={`Update the stock for warehouse ${warehouse.name}`}>
            <StockTakeForm />
            </Sheet>
          </CardFooter>
        </Card>
      ))}
          </section>
  );
};

export const Route = createFileRoute("/_dashboard/inventory")({
  component: ItemsPage,
});
