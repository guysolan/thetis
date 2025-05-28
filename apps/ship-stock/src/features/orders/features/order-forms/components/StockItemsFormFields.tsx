import { UseFormReturn, FieldArrayWithId } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { Button } from "@thetis/ui/button";
import { Copy, Trash, Check, Lock, Unlock } from "lucide-react";
import Select from "@/components/Select";
import Input from "@/components/Input";
import NumberCell from "./NumberFlowCell";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import { ItemType, StockItemFormData, StockItemQuantities } from "../types";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import StockItemRowCells from "./StockItemRowCells";
import { ScrollArea } from "@thetis/ui/scroll-area";
import { ItemView } from "@/features/items/types";

interface StockItemsFormFieldsProps {
  name: string;
  fields: FieldArrayWithId[];
  items: ItemView[];
  getItemQuantities: (itemId: string) => StockItemQuantities;
  onCopy: (index: number) => void;
  onRemove: (index: number) => void;
  onToggleLock: (index: number) => void;
  isLocked?: (index: number) => boolean;
  allowedTypes?: ItemType[];
  showPrice?: boolean;
  showTax?: boolean;
  showQuantity?: boolean;
  onUpdate?: (vals?: unknown) => void;
  packageMode?: boolean;
}

const StockItemsFormFields = ({
  name,
  fields,
  items,
  getItemQuantities,
  onCopy,
  onRemove,
  showPrice = false,
  showTax = false,
  onUpdate,
  allowedTypes = [],
  showQuantity = true,
  packageMode = false,
}: StockItemsFormFieldsProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {allowedTypes.length > 1 && (
            <TableHead className="w-[10%]">Type</TableHead>
          )}
          {packageMode && (
            <TableHead
              className={`${showPrice ? "w-[10%]" : "w-[15%]"} text-left`}
            >
              Package
            </TableHead>
          )}
          <TableHead className={`${showPrice ? "w-[20%]" : "w-[30%]"}`}>
            Item
          </TableHead>
          <TableHead className="w-[15%]">Lot Number</TableHead>
          <TableHead
            className={`${showPrice ? "w-[10%]" : "w-[15%]"} text-center`}
          >
            Quantity
          </TableHead>
          {showPrice && (
            <TableHead className="w-[10%] text-center">Price</TableHead>
          )}
          {showTax && (
            <TableHead className="w-[10%] text-center">Tax</TableHead>
          )}
          {showPrice && (
            <TableHead className="w-[10%] text-center">Total</TableHead>
          )}
          {showQuantity && (
            <TableHead
              className={`${showPrice ? "w-[10%]" : "w-[15%]"} text-center`}
            >
              Before
            </TableHead>
          )}
          {showQuantity && (
            <TableHead
              className={`${showPrice ? "w-[10%]" : "w-[15%]"} text-center`}
            >
              After
            </TableHead>
          )}

          <TableHead
            className={`${showPrice ? "w-[10%]" : "w-[15%]"} text-center`}
          >
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field, index) => (
          <StockItemRowCells
            showQuantity={showQuantity}
            showPrice={showPrice}
            showTax={showTax}
            key={field.id}
            index={index}
            onUpdate={onUpdate}
            name={name}
            items={items}
            getItemQuantities={getItemQuantities}
            onCopy={onCopy}
            onRemove={onRemove}
            allowedTypes={allowedTypes}
            packageMode={packageMode}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default StockItemsFormFields;
