import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Badge } from "@thetis/ui/badge";
import type { ItemView } from "@/features/items/types.ts";

import ItemDetails from "./ItemDetails";
import ItemComponents from "./ItemComponents";
import ActionPopover from "@/components/ActionPopover";
import { ItemForm } from "./ItemForm";
import { useDeleteItem } from "../api/deleteItem";
import { useDuplicateItem } from "../api/duplicateItem";
import Sheet from "../../../components/Sheet";
import ItemComponentsForm from "./ItemComponentsForm";
import { Shapes } from "lucide-react";
import PopoverOption from "../../../components/PopoverOption";
import React from "react";
import NumberFlow from "@number-flow/react";
import { defaultCurrency } from "../../../constants/currencies";
const ItemCard = ({ item }: { item: ItemView }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { mutate: duplicateItem } = useDuplicateItem();
  const { mutate: deleteItem } = useDeleteItem();
  return (
    <Card key={item.item_id} className="flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <div className="flex flex-col flex-wrap gap-4">
          <CardTitle className="flex flex-row flex-wrap gap-4 font-semibold text-left text-lg text-wrap truncate">
            {item.item_name}
            <Badge>{item.item_type}</Badge>
          </CardTitle>
          <div className="font-medium text-foreground text-md">
            <NumberFlow
              value={Number(item.item_price ?? 0)}
              format={{ style: "currency", currency: defaultCurrency }}
              suffix=" per unit"
            />
          </div>
        </div>
        <div className="flex flex-row flex-shrink gap-2">
          <ActionPopover
            title={item.item_name}
            editForm={<ItemForm item={item} />}
            deleteFunction={() => deleteItem(item.item_id as number)}
            onDuplicate={() =>
              duplicateItem({
                itemId: {
                  price: item.item_price as number,
                  name: item.item_name,
                  type: item.item_type!,
                  weight: item.weight ?? 0,
                  height: item.height ?? 0,
                  width: item.width ?? 0,
                  depth: item.depth ?? 0,
                  country_of_origin: item.country_of_origin,
                  sku: item.sku,
                },
                // @ts-ignore
                components: item.components,
              })
            }
          >
            <PopoverOption
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              <Shapes size={16} />
              {isEditing ? "Stop Editing" : "Edit Components"}
            </PopoverOption>
          </ActionPopover>
        </div>
      </CardHeader>
      <CardContent>
        <ItemDetails item={item} />
        <ItemComponents
          stopEditing={() => setIsEditing(false)}
          isEditing={isEditing}
          item={item}
        />
      </CardContent>
    </Card>
  );
};

export default ItemCard;
