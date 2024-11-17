import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useSelectStockpiles } from "../api/selectStockpiles";
import useDeleteAddress from "../api/deleteAddress";
import StockpileCard from "./StockpileCard";

const Stockpiles = () => {
    const { data: stockpiles } = useSelectStockpiles();
    const { mutate: deleteAddress } = useDeleteAddress();

    return (
        <ScrollArea className="h-[calc(100vh-12rem)]">
            <section className="gap-4 grid lg:grid-cols-2 pt-4">
                {stockpiles?.map((stockpile) => (
                    <StockpileCard
                        key={stockpile.stockpile_id}
                        stockpile={stockpile}
                    />
                ))}
            </section>
        </ScrollArea>
    );
};

export default Stockpiles;
