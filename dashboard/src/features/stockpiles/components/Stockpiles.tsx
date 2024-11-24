import React from "react";

import { useSelectStockpiles } from "../api/selectStockpiles";
import StockpileCard from "./StockpileCard";

const Stockpiles = () => {
    const { data: stockpiles } = useSelectStockpiles();

    return (
        <section className="gap-4 grid lg:grid-cols-2">
            {stockpiles?.map((stockpile) => (
                <StockpileCard
                    key={stockpile.stockpile_id}
                    stockpile={stockpile}
                />
            ))}
        </section>
    );
};

export default Stockpiles;
