import { useFormContext } from "react-hook-form";
import { defaultTax } from "../../../../../constants/tax";
import { TableCell, TableRow } from "@thetis/ui/table";
import { Button } from "@thetis/ui/button";
import { Copy, Trash, Lock, Unlock } from "lucide-react";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import NumberCell from "./NumberFlowCell";
import { ItemType, StockItemQuantities } from "../types";
import NumberFlow from "@number-flow/react";
import { useState } from "react";
import { cn } from "@thetis/ui/cn";
import { useSelectItemsByAddress } from "../../../../stockpiles/api/selectItemsByAddress";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@thetis/ui/select";
import calculateItemTotal from "../../../utils/calculateItemTotal";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";

interface StockItemRowCellsProps {
  showPrice: boolean;
  showQuantity: boolean;
  key: string;
  index: number;
  name: string;
  items: Array<{ item_id: string; item_name: string; item_type: string }>;
  getItemQuantities: (itemId: string) => StockItemQuantities;
  onCopy: (index: number) => void;
  onRemove: (index: number) => void;
  allowedTypes: ItemType[];
  onUpdate?: () => void;
}

const StockItemRowCells = ({
  showPrice,
  showQuantity,
  index,
  key,
  name,
  items,
  getItemQuantities,
  onCopy,
  onRemove,
  allowedTypes,
  onUpdate,
}: StockItemRowCellsProps) => {
  const form = useFormContext();
  const [editable, setEditable] = useState<boolean>(true);
  const currency = form.watch("currency");
  const itemId = form.watch(`${name}.${index}.item_id`);
  const itemType = form.watch(`${name}.${index}.item_type`);
  const quantityChange = form.watch(`${name}.${index}.quantity_change`) || 0;
  const quantityBefore = form.watch(`${name}.${index}.quantity_before`) || 0;
  const quantityAfter = form.watch(`${name}.${index}.quantity_after`) || 0;
  const price = form.watch(`${name}.${index}.item_price`) || 0;
  const tax = form.watch(`${name}.${index}.item_tax`) || 0;
  const address = form.watch("from_shipping_address_id");

  const { data: itemsView } = useSelectItemsView();
  const { data: stockItems } = useSelectItemsByAddress();

  const findItem = (itemId: string) => {
    return itemsView?.find((item) => String(item.item_id) === String(itemId));
  };

  const findItemQuantity = (itemId: string) => {
    const itemInStock = stockItems?.find((item) => {
      return (
        String(item.item_id) === String(itemId) &&
        String(item.address_id) === String(address)
      );
    });
    return itemInStock?.item_quantity;
  };

  const handleItemChange = (itemId: string) => {
    const item = findItem(itemId);
    const itemQuantity = findItemQuantity(itemId);
    const before = itemQuantity;
    const change = quantityChange ?? 1;
    const after = itemQuantity + change;
    const itemPrice = item?.item_price ?? 1;
    const itemTotal = calculateItemTotal(itemPrice, defaultTax, change);
    form.setValue(`${name}.${index}.item_id`, itemId);
    form.setValue(`${name}.${index}.quantity_before`, before);
    form.setValue(`${name}.${index}.quantity_after`, after);
    form.setValue(`${name}.${index}.quantity_change`, change);
    form.setValue(`${name}.${index}.item_price`, item?.item_price);
    form.setValue(`${name}.${index}.item_tax`, defaultTax);
    form.setValue(`${name}.${index}.item_total`, itemTotal);
    onUpdate?.();
  };

  const handleQuantityChange = (value: number) => {
    form.setValue(`${name}.${index}.quantity_change`, value);
    if (value && price) {
      const calculatedTotal = value * price * (1 + (tax || 0) / 100);
      form.setValue(
        `${name}.${index}.item_total`,
        Number(calculatedTotal.toFixed(2)),
      );
    }
    form.setValue(`${name}.${index}.quantity_after`, quantityBefore + value);
    onUpdate?.();
  };

  const handlePriceChange = (value: number) => {
    form.setValue(`${name}.${index}.item_price`, value);
    if (quantityChange && value) {
      const calculatedTotal = quantityChange * value * (1 + (tax || 0) / 100);
      form.setValue(
        `${name}.${index}.item_total`,
        Number(calculatedTotal.toFixed(2)),
      );
    }
  };

  const handleTaxChange = (value: number) => {
    form.setValue(`${name}.${index}.item_tax`, value);
    if (quantityChange && value) {
      const calculatedTotal = quantityChange * price * (1 + (value || 0));
      form.setValue(
        `${name}.${index}.item_total`,
        Number(calculatedTotal.toFixed(2)),
      );
    }
  };

  const handleTotalChange = (value: number) => {
    form.setValue(`${name}.${index}.item_total`, value);
    if (quantityChange && tax !== undefined) {
      const calculatedPrice = value / (quantityChange * (1 + tax));
      form.setValue(`${name}.${index}.item_price`, Number(calculatedPrice));
    }
  };

  const handleToggleLock = () => {
    setEditable(!editable);
  };

  const handleItemTypeChange = (value: string) => {
    form.setValue(`${name}.${index}.item_type`, value);
    form.setValue(`${name}.${index}.item_id`, "");
    form.setValue(`${name}.${index}.quantity_before`, 0);
    form.setValue(`${name}.${index}.quantity_after`, 0);
    form.setValue(`${name}.${index}.quantity_change`, 0);
    form.setValue(`${name}.${index}.item_price`, 0);
    form.setValue(`${name}.${index}.item_tax`, 0);
    form.setValue(`${name}.${index}.item_total`, 0);
    onUpdate?.();
  };

  return (
    <TableRow className={cn("border-b", !editable && "opacity-50")} key={key}>
      {allowedTypes.length > 1 && (
        <TableCell>
          <Select value={itemType} onValueChange={handleItemTypeChange}>
            <SelectTrigger className="w-24 capitalize">
              <SelectValue placeholder="Select an item" />
            </SelectTrigger>
            <SelectContent>
              {allowedTypes.map((item) => (
                <SelectItem className="capitalize" key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>
      )}
      <TableCell className="truncate">
        <Select value={itemId} onValueChange={handleItemChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select an item" />
          </SelectTrigger>
          <SelectContent>
            {items
              ?.filter((item) => item.item_type === itemType)
              .map((item) => (
                <SelectItem key={item.item_id} value={String(item.item_id)}>
                  {item.item_name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </TableCell>
      <NumberCell
        name={`${name}.${index}.quantity_change`}
        step={1}
        onChange={handleQuantityChange}
        editable={editable}
        format={{ style: "decimal" }}
      />
      {showPrice && (
        <NumberCell
          name={`${name}.${index}.item_price`}
          step={0.000001}
          onChange={handlePriceChange}
          format={{ style: "currency", currency: currency }}
          editable={editable}
        />
      )}
      {showPrice && (
        <NumberCell
          name={`${name}.${index}.item_tax`}
          step={0.01}
          editable={editable}
          onChange={handleTaxChange}
          format={{ style: "percent" }}
        />
      )}
      {showPrice && (
        <NumberCell
          name={`${name}.${index}.item_total`}
          step={0.01}
          onChange={handleTotalChange}
          format={{ style: "currency", currency: currency }}
          editable={editable}
        />
      )}
      {showQuantity && (
        <TableCell className="text-center">
          <NumberFlow value={quantityBefore} />
        </TableCell>
      )}
      {showQuantity && (
        <TableCell className="text-center">
          <NumberFlow value={quantityAfter} />
        </TableCell>
      )}
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
