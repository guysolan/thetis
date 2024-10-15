import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelectWarehouseProducts } from "@/features/inventory/api/selectWarehouseProducts";
import { useSelectWarehouses } from '../../features/inventory/api/selectWarehouses';
import { useSelectWarehouseParts } from '../../features/inventory/api/selectWarehouseParts';
import { Badge } from '../../components/ui/badge';

const ProductsPage = () => {
    const {data:warehouses} = useSelectWarehouses();
  const { data: warehouseProducts } =
    useSelectWarehouseProducts();
  const { data: warehouseParts } =
    useSelectWarehouseParts();
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
                {warehouseParts?.filter(wp => wp.warehouse_id === warehouse.id).map((wp: any) => (
                  <TableRow key={`part-${wp.part_id}`}>
                    <TableCell>
                      <Badge variant="secondary">Part</Badge>
                    </TableCell>
                    <TableCell>{wp.part_name}</TableCell>
                    <TableCell>${wp.part_price.toFixed(2)}</TableCell>
                    <TableCell>{wp.part_quantity}</TableCell>
                    <TableCell>${(wp.part_value).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                {warehouseProducts?.filter(wp => wp.warehouse_id === warehouse.id).map((wp: any) => (
                  <TableRow key={`product-${wp.product_id}`}>
                    <TableCell>
                      <Badge variant="default">Product</Badge>
                    </TableCell>
                    <TableCell>{wp.product_name}</TableCell>
                    <TableCell>${wp.product_price.toFixed(2)}</TableCell>
                    <TableCell>{wp.product_quantity}</TableCell>
                    <TableCell>${(wp.product_value).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                {(!warehouseParts?.some(wp => wp.warehouse_id === warehouse.id) && 
                  !warehouseProducts?.some(wp => wp.warehouse_id === warehouse.id)) && (
                  <TableRow>
                    <TableCell colSpan={5}>No Items</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
          </section>
  );
};

export const Route = createFileRoute("/_dashboard/inventory")({
  component: ProductsPage,
});
