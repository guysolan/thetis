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
import ItemsMiniTable from "../../items/components/ItemsMiniTable";
import StocktakeForm from "../../orders/features/order-forms/features/stocktake-form/StocktakeForm";
import { Stockpile } from "../types";
import Sheet from "../../../components/Sheet";
import AddressForm from "./AddressForm";
import { useSelectAddresses } from "../api/selectAddresses";
import InlineStocktakeForm from './InlineStocktakeForm';
import ActionPopover from '../../../components/ActionPopover';
import PopoverOption from '../../../components/PopoverOption';
import { Separator } from '../../../components/ui/separator';

interface Props {
    stockpile: Stockpile["Row"];
}

const StockpileCard = ({ stockpile }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const { data: addresses } = useSelectAddresses();
    const address = addresses?.find((a) => a.id === stockpile.stockpile_id);

    const toggleIsEditing = () => {
        setIsEditing(!isEditing);
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
                <ActionPopover

                    title="Edit Address"

                    editForm={<AddressForm
                        operation="upsert"
                        address={address}
                    />}>
                    <Separator />
                    <PopoverOption
                        onClick={toggleIsEditing}
                    >
                        <Pencil size={20} />
                        {isEditing ? "Cancel" : "Update Stock"}
                    </PopoverOption>
                </ActionPopover>
            </CardHeader>

            <CardContent>
                {/* <ItemsTable items={stockpile.items} /> */}
                {isEditing ? <StocktakeForm
                    onSuccess={() => setIsEditing(false)}
                    isInline={true}
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
                /> :
                    <span className="cursor-pointer" onClick={toggleIsEditing}>
                        <ItemsMiniTable items={stockpile?.items} />
                    </span>}
            </CardContent>
            <CardFooter>
                {isEditing && <Button variant='outline' onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>}
            </CardFooter>
        </Card>
    );
};

export default StockpileCard;
