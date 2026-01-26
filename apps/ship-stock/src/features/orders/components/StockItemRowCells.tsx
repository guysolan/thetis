import { useFormContext } from "react-hook-form";
import { defaultTax } from "../../../constants/tax";
import { TableCell, TableRow } from "@thetis/ui/table";
import { Button } from "@thetis/ui/button";
import { Copy, Lock, Trash, Unlock } from "lucide-react";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import NumberCell from "./NumberFlowCell";
import { ItemType, StockItemQuantities } from "../types";
import NumberFlow from "@number-flow/react";
import { useState } from "react";
import { cn } from "@thetis/ui/cn";
import { useSelectItemsByAddress } from "../../stockpiles/api/selectItemsByAddress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import calculateItemTotal from "../utils/calculateItemTotal";
import { Combobox } from "@/components/Combobox";
import { useSelectItemsView } from "../../items/api/selectItemsView";
import { Input } from "@thetis/ui/input";

interface StockItemRowCellsProps {
  showPrice: boolean;
  showTax: boolean;
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
  packageMode: boolean;
}

const StockItemRowCells = ({
  showPrice,
  showTax,
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
  packageMode,
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
  const isSale = form.watch("order_type") === "sale";
  const { data: itemsView } = useSelectItemsView();
  const { data: stockItems } = useSelectItemsByAddress();

  const findItem = (itemId: string) => {
    return itemsView?.find((item) => String(item.item_id) === String(itemId));
  };

  const findItemQuantity = (itemId: string) => {
    const itemInStock = stockItems?.find((item) => {
      const stockItemId = String(item.item_id).trim();
      const searchItemId = String(itemId).trim();
      return (
        stockItemId === searchItemId &&
        String(item.address_id) === String(address)
      );
    });
    return itemInStock?.item_quantity ?? 0;
  };

  const updateQuantities = (index: number, quantityChange: number) => {
    console.log(`${name}.${index}.item_id`);
    const itemId = form.watch(`${name}.${index}.item_id`);
    console.log(itemId);
    const quantityBefore = findItemQuantity(itemId);

    console.log(quantityBefore);
    const change = quantityChange ?? 1;
    const after = isSale ? quantityBefore - change : quantityBefore + change;

    form.setValue(`${name}.${index}.quantity_before`, quantityBefore);
    form.setValue(`${name}.${index}.quantity_change`, quantityChange);
    form.setValue(`${name}.${index}.quantity_after`, after);
  };

  const handleItemChange = (itemId: string) => {
    const item = findItem(itemId);
    const itemQuantity = findItemQuantity(itemId);
    const before = itemQuantity;
    const change = quantityChange ?? 1;
    const after = isSale ? itemQuantity - change : itemQuantity + change;
    const itemPrice = item?.item_price ?? 0;
    const itemTax = defaultTax;
    const itemTotal = calculateItemTotal(itemPrice, itemTax, change);
    const packageItemChangeId = form.watch(
      `${name}.${index}.package_item_change_id`,
    );

    form.setValue(`${name}.${index}.item_id`, itemId);
    form.setValue(`${name}.${index}.quantity_before`, before);
    form.setValue(`${name}.${index}.quantity_after`, after);
    form.setValue(`${name}.${index}.quantity_change`, change);
    form.setValue(`${name}.${index}.item_price`, itemPrice);
    form.setValue(`${name}.${index}.item_tax`, itemTax);
    form.setValue(`${name}.${index}.item_total`, itemTotal);
    if (packageItemChangeId) {
      form.setValue(
        `${name}.${index}.package_item_change_id`,
        packageItemChangeId,
      );
    }
    onUpdate?.();
  };

  const handleQuantityChange = (value: number, index: number) => {
    console.log(value);
    form.setValue(`${name}.${index}.quantity_change`, value);
    const calculatedTotal = (value || 0) * (price || 0) * (1 + (tax || 0));
    form.setValue(
      `${name}.${index}.item_total`,
      Number(calculatedTotal.toFixed(2)),
    );
    updateQuantities(index, value);
    onUpdate?.();
  };

  const handlePriceChange = (value: number) => {
    form.setValue(`${name}.${index}.item_price`, value);
    const calculatedTotal = (quantityChange || 0) * (value || 0) *
      (1 + (tax || 0));
    form.setValue(
      `${name}.${index}.item_total`,
      Number(calculatedTotal.toFixed(2)),
    );
  };

  const handleTaxChange = (value: number) => {
    form.setValue(`${name}.${index}.item_tax`, value);
    const calculatedTotal = (quantityChange || 0) * (price || 0) *
      (1 + (value || 0));
    form.setValue(
      `${name}.${index}.item_total`,
      Number(calculatedTotal.toFixed(2)),
    );
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

  const packageItemId = form.watch(`${name}.${index}.package_item_change_id`);

  const packageItems = form.watch("package_items");

  const handlePackageItemChange = (value: string) => {
    form.setValue(`${name}.${index}.package_item_change_id`, value);
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
      {packageMode && (
        <TableCell>
          <Select
            value={String(packageItemId)}
            onValueChange={handlePackageItemChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a package">
                {packageItemId && packageItems && packageItems.length > 0
                  ? (
                    (() => {
                      const selectedPackageIndex = packageItems.findIndex(
                        (item) =>
                          String(item.package_item_change_id) ===
                            String(packageItemId),
                      );
                      return selectedPackageIndex >= 0
                        ? `Package ${selectedPackageIndex + 1}`
                        : "Select a package";
                    })()
                  )
                  : (
                    "Select a package"
                  )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {packageItems.map((item, index) => (
                <SelectItem
                  key={`package-${index}-${item.package_item_change_id}`}
                  value={String(item.package_item_change_id)}
                >
                  Package {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>
      )}
      <TableCell className="w-1/4 truncate">
        <Combobox
          name={`${name}.${index}.item_id`}
          placeholder="Select an item..."
          searchPlaceholder="Search items..."
          emptyMessage="No items found"
          options={items
            ?.filter((item) =>
              item.item_type === itemType
            )
            .sort((a, b) => a.item_name.localeCompare(b.item_name))
            .map((item) => ({
              value: String(item.item_id),
              label: item.item_name,
            })) || []}
        />
      </TableCell>
      <TableCell>
        <Input
          value={form.watch(`${name}.${index}.lot_number`) || ""}
          onChange={(e) => {
            form.setValue(`${name}.${index}.lot_number`, e.target.value);
            onUpdate?.();
          }}
          placeholder="Enter LOT number"
        />
      </TableCell>
      <NumberCell
        name={`${name}.${index}.quantity_change`}
        step={1}
        onChange={(value) => handleQuantityChange(value, index)}
        editable={editable}
        format={{ style: "decimal" }}
      />
      {showPrice && (
        <NumberCell
          name={`${name}.${index}.item_price`}
          step={0.01}
          onChange={handlePriceChange}
          format={{ style: "currency", currency: currency }}
          editable={editable}
        />
      )}
      {showTax && (
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
          <NumberFlow
            className={quantityAfter < 0 ? "text-red-500" : ""}
            value={quantityAfter}
          />
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
