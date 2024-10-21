import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelectWarehouseItems } from "@/features/warehouses/api/selectWarehouseItems";
import { useSelectWarehouses } from "../../features/warehouses/api/selectWarehouses";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import PageTitle from "../../components/PageTitle";
import { WarehouseForm } from "../../features/warehouses/components/WarehouseForm";
import StocktakeForm from '../../features/warehouses/components/StocktakeForm';
import AmazonWarehouses from '../../features/warehouses/components/AmazonWarehouses';

const ItemsPage = () => {
  const { data: warehousesView } = useSelectWarehouses();


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
                trigger={<Button variant='outline'>Edit</Button>}
                title={`Edit ${warehouse.warehouse_name}`}
                description={`Edit the details for warehouse ${warehouse.warehouse_name}`}
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
                  {warehouse.items?.map((wp: any) => (
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
                description={`Update the stock for warehouse ${warehouse.name}`}
              >
                <StocktakeForm warehouseId={warehouse.warehouse_id} />
              </Sheet>
            </CardFooter>
          </Card>
        ))}
      </section>
        <AmazonWarehouses />

    </>
  );
};

export const Route = createFileRoute("/_dashboard/warehouses")({
  component: ItemsPage,
});
