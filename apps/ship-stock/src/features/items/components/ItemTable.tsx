import { Badge } from "@thetis/ui/badge";
import { useSelectItemsView } from "@/features/items/api/selectItemsView.ts";
import type { ItemType, ItemView } from "@/features/items/types.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";

import ItemActionsPopover from "./ItemActionsPopover";
import { defaultCurrency } from "../../../constants/currencies";
import NumberFlow from "@number-flow/react";

const ItemTable = ({ itemType }: { itemType: ItemType }) => {
  const { data: itemsView } = useSelectItemsView();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itemsView
          .filter((item) => item.item_type === itemType)
          .map((item: ItemView) => (
            <TableRow key={item.item_id}>
              <TableCell>{item.item_name}</TableCell>
              <TableCell>
                <Badge>{item.item_type}</Badge>
              </TableCell>
              <TableCell>
                <NumberFlow
                  value={Number(item.item_price ?? 0)}
                  format={{ style: "currency", currency: defaultCurrency }}
                  suffix=" per unit"
                />
              </TableCell>
              <TableCell>
                <ItemActionsPopover item={item} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ItemTable;
