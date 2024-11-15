import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/Sheet";
import { AddressForm } from "./AddressForm";
import DeleteDialog from "@/components/DeleteDialog";
import { useSelectStockpiles } from "../api/selectStockpiles";
import StocktakeForm from "../../orders/order-forms/components/StockForm";
import useDeleteAddress from "../api/deleteAddress";

const AddressStock = () => {
    const { data: stockpiles } = useSelectStockpiles();
    const { mutate: deleteAddress } = useDeleteAddress();
    return (
        <ScrollArea className="h-[calc(100vh-12rem)]">
            <section className="gap-4 grid lg:grid-cols-2 pt-4">
                {stockpiles?.map((stockpile) => (
                    <Card
                        key={stockpile.stockpile_id}
                        className="flex flex-col"
                    >
                        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                            <CardTitle className="font-semibold text-lg truncate">
                                {stockpile.stockpile_name}
                            </CardTitle>
                            <Sheet
                                trigger={
                                    <Button variant="outline">Edit</Button>
                                }
                                title={`Edit ${stockpile.stockpile_name}`}
                                description={`Edit the details for stockpile ${stockpile.stockpile_name}`}
                                footer={
                                    <DeleteDialog
                                        deleteFunction={() =>
                                            deleteAddress(
                                                stockpile
                                                    .stockpile_id as number,
                                            )}
                                    />
                                }
                            >
                                <AddressForm
                                    operation="upsert"
                                    address={{
                                        id: stockpile.stockpile_id as number,
                                        name: stockpile.stockpile_name,
                                    }}
                                />
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
                                    {(stockpile.items as any)
                                        ?.filter((item: any) =>
                                            item.item_quantity > 0
                                        )
                                        ?.map((wp: any) => (
                                            <TableRow
                                                key={`item-${wp.item_id}`}
                                            >
                                                <TableCell>
                                                    <Badge
                                                        className="capitalize"
                                                        variant="default"
                                                    >
                                                        {wp.item_type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {wp.item_name}
                                                </TableCell>
                                                <TableCell>
                                                    {wp.item_quantity}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <Sheet
                                trigger={<Button>New Stocktake</Button>}
                                title="New Stocktake"
                                description={`Update the stock for stockpile ${stockpile.stockpile_name}`}
                            >
                                <StocktakeForm
                                    stockpileId={stockpile
                                        .stockpile_id as number}
                                />
                            </Sheet>
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </ScrollArea>
    );
};

export default AddressStock;
