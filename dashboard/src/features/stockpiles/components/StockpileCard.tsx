import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import ItemsTable from "../../items/components/ItemsTable";
import StocktakeForm from "../../orders/features/order-forms/features/stocktake-form/StocktakeForm";
import { Stockpile } from "../types";
import Sheet from "../../../components/Sheet";
import AddressForm from "./AddressForm";
import { useSelectAddresses } from "../api/selectAddresses";

interface Props {
    stockpile: Stockpile["Row"];
}

const StockpileCard = ({ stockpile }: Props) => {
    const { data: addresses } = useSelectAddresses();
    const address = addresses?.find((a) => a.id === stockpile.stockpile_id);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <div className="space-y-2 w-3/4">
                    <CardTitle>{stockpile.stockpile_name}</CardTitle>
                    <CardDescription>
                        {stockpile.stockpile_address}
                    </CardDescription>
                    <Badge>{stockpile.company_name}</Badge>
                </div>
                <Sheet
                    trigger={
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={toggleExpansion}
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                    }
                    title="Edit Address"
                >
                    <AddressForm
                        operation="upsert"
                        address={address}
                    />
                </Sheet>
            </CardHeader>

            <CardContent>
                <ItemsTable
                    items={stockpile.items?.filter((i) =>
                        ["product", "part"].includes(i.item_type)
                    ).filter((i) => i.quantity !== 0)}
                />
            </CardContent>
            <CardFooter>
                <Sheet
                    trigger={<Button variant="secondary">Update Stock</Button>}
                    title="Update Stock"
                >
                    <StocktakeForm
                        orderItems={stockpile?.items?.map((i) => ({
                            item_id: String(i.item_id),
                            quantity_before: i.item_quantity,
                            quantity_after: i.item_quantity < 0
                                ? 0
                                : i.item_quantity,
                            quantity_change: i.item_quantity < 0
                                ? -i.item_quantity
                                : 0,
                            item_type: i.item_type,
                        }))}
                        addressId={String(stockpile.stockpile_id)}
                    />
                </Sheet>
            </CardFooter>
        </Card>
    );
};

export default StockpileCard;
