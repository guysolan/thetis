import { useFormContext } from "react-hook-form";
import { TableCell, TableRow } from "@thetis/ui/table";
import { Button } from "@thetis/ui/button";
import { Copy, Trash, Lock, Unlock } from "lucide-react";
import Select from "@/components/Select";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import NumberCell from "./NumberCell";
import { ItemType, StockItemQuantities } from "../types";
import NumberFlow from "@number-flow/react";
import { useState } from "react";
import { cn } from "@thetis/ui/cn";
import { Separator } from "@thetis/ui/separator";

interface StockItemRowCellsProps {
  key: string;
  index: number;
  name: string;
  items: Array<{ item_id: string; item_name: string; item_type: string }>;
  getItemQuantities: (itemId: string) => StockItemQuantities;
  onCopy: (index: number) => void;
  onRemove: (index: number) => void;
  allowedTypes: ItemType[];
}

const StockItemRowCells = ({
  index,
  key,
  name,
  items,
  getItemQuantities,
  onCopy,
  onRemove,
  allowedTypes,
}: StockItemRowCellsProps) => {
  const form = useFormContext();
  const [editable, setEditable] = useState<boolean>(true);
  const currency = form.watch("currency");
  const itemId = form.watch(`${name}.${index}.item_id`);
  const quantities = getItemQuantities(itemId || "");
  const quantity = form.watch(`${name}.${index}.quantity_change`) || 0;
  const price = form.watch(`${name}.${index}.price`) || 0;
  const tax = form.watch(`${name}.${index}.tax`) || 0;
  const total = form.watch(`${name}.${index}.total`) || 0;

  const handleQuantityChange = (value: number) => {
    form.setValue(`${name}.${index}.quantity_change`, value);
    if (value && price) {
      const calculatedTotal = value * price * (1 + (tax || 0) / 100);
      form.setValue(
        `${name}.${index}.total`,
        Number(calculatedTotal.toFixed(2)),
      );
    }
  };

  const handlePriceChange = (value: number) => {
    form.setValue(`${name}.${index}.price`, value);
    if (quantity && value) {
      const calculatedTotal = quantity * value * (1 + (tax || 0) / 100);
      form.setValue(
        `${name}.${index}.total`,
        Number(calculatedTotal.toFixed(2)),
      );
    }
  };

  const handleTotalChange = (value: number) => {
    form.setValue(`${name}.${index}.total`, value);
    if (quantity && tax !== undefined) {
      const calculatedPrice = value / (quantity * (1 + tax / 100));
      form.setValue(
        `${name}.${index}.price`,
        Number(calculatedPrice.toFixed(2)),
      );
    }
  };

  const handleToggleLock = () => {
    setEditable(!editable);
  };

  return (
    <TableRow className={cn("border-b", !editable && "opacity-50")} key={key}>
      {allowedTypes.length > 1 && (
        <TableCell>
          <ItemTypeSelect
            name={`${name}.${index}.item_type`}
            disabled={!editable}
          />
        </TableCell>
      )}
      <TableCell>
        <Select
          name={`${name}.${index}.item_id`}
          options={
            items
              ?.filter((item) => item.item_type === form.watch("item_type"))
              .map((item) => ({
                label: item.item_name || "",
                value: String(item.item_id || ""),
              })) || []
          }
          disabled={!editable}
        />
      </TableCell>
      <NumberCell
        name={`${name}.${index}.quantity_change`}
        step={1}
        onChange={handleQuantityChange}
        editable={editable}
      />
      <NumberCell
        name={`${name}.${index}.price`}
        step={0.01}
        onChange={handlePriceChange}
        format={{ style: "currency", currency: currency }}
        editable={editable}
      />
      <NumberCell
        name={`${name}.${index}.tax`}
        step={0.01}
        suffix="%"
        editable={editable}
      />
      <NumberCell
        name={`${name}.${index}.total`}
        step={0.01}
        onChange={handleTotalChange}
        format={{ style: "currency", currency: currency }}
        editable={editable}
      />
      <TableCell>
        <NumberFlow value={quantities.before} />
      </TableCell>
      <TableCell>
        <NumberFlow value={quantities.after} />
      </TableCell>
      <TableCell>
        <div className="flex">
          <Button
            type="button"
            onClick={() => onCopy(index)}
            variant="ghost"
            className="px-2"
          >
            <Copy size={20} />
          </Button>
          <Button
            type="button"
            onClick={() => onRemove(index)}
            variant="ghost"
            className="px-2 text-red-600 hover:text-red-700"
          >
            <Trash size={20} />
          </Button>
          <Separator orientation="vertical" />
          <Button
            type="button"
            onClick={handleToggleLock}
            variant="ghost"
            className="opacity-100 px-2"
          >
            {editable ? <Lock size={20} /> : <Unlock size={20} />}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StockItemRowCells;
