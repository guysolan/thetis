import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/Sheet";
import AddressForm from "./AddressForm";
import { useSelectStockpiles } from "../api/selectStockpiles";
import StocktakeForm from "../../orders/order-forms/components/StockForm";
import useDeleteAddress from "../api/deleteAddress";
import ActionPopover from "@/components/ActionPopover";
import ItemsTable from "../../items/components/ItemsTable";
import { ItemView } from "../../items/types";

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
                            <ActionPopover
                                title={stockpile.stockpile_name ??
                                    "Name Missing"}
                                description={`Edit the details for stockpile ${stockpile.stockpile_name}`}
                                editForm={
                                    <AddressForm
                                        operation="upsert"
                                        address={{
                                            id: stockpile
                                                .stockpile_id as number,
                                            name: stockpile.stockpile_name,
                                        }}
                                    />
                                }
                                deleteFunction={() =>
                                    deleteAddress(
                                        stockpile.stockpile_id as number,
                                    )}
                            />
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ItemsTable
                                items={stockpile.items as ItemView[]}
                            />
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
