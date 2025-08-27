import { useFieldArray, useFormContext, UseFormReturn } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { Item } from "@/features/items/types";

interface StockItemsSummaryProps {
  name: string;
  addressName: string;
}
import { roundIfRequired } from "../utils/roundIfRequired";
import { useSelectItemsView } from "../../items/api/selectItemsView";
import { useStockQuantities } from "../hooks/useStockQuantities";
const StockItemsSummary = ({ name, addressName }: StockItemsSummaryProps) => {
  const { data: items } = useSelectItemsView();
  const form = useFormContext();
  const { fields } = useFieldArray({ name });
  const { getItemQuantities } = useStockQuantities(name, addressName);

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Before</TableHead>
          <TableHead>After</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field, index) => {
          const itemId = form.watch(`${name}.${index}.item_id`);
          const item = items.find((i) => String(i.item_id) === itemId);
          const quantities = getItemQuantities(itemId);
          const quantityChange = form.watch(`${name}.${index}.quantity_change`);

          return (
            <TableRow key={field.id}>
              <TableCell className="font-medium">
                {item?.item_name || "Not selected"}
              </TableCell>
              <TableCell>{roundIfRequired(quantityChange || 0)}</TableCell>
              <TableCell>{roundIfRequired(quantities?.before || 0)}</TableCell>
              <TableCell>{roundIfRequired(quantities?.after || 0)}</TableCell>
            </TableRow>
          );
        })}
        {fields.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-muted-foreground text-center"
            >
              No items added
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StockItemsSummary;
