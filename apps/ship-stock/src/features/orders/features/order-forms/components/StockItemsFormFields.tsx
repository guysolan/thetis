import { UseFormReturn } from "react-hook-form";
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

interface StockItemsFormFieldsProps {
  name: string;
  fields: any[];
  items: Array<{ item_id: string; item_name: string; item_type: string }>;
  getItemQuantities: (itemId: string) => StockItemQuantities;
  onCopy: (index: number) => void;
  onRemove: (index: number) => void;
  onToggleLock: (index: number) => void;
  isLocked?: (index: number) => boolean;
  allowedTypes?: ItemType[];
  showPrice?: boolean;
  showQuantity?: boolean;
  onUpdate?: () => void;
}

const StockItemsFormFields = ({
  name,
  fields,
  items,
  getItemQuantities,
  onCopy,
  onRemove,
  showPrice = false,
  onUpdate,
  onToggleLock,
  isLocked = () => false,
  allowedTypes = [],
  showQuantity = true,
}: StockItemsFormFieldsProps) => {
  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          {allowedTypes.length > 1 && <TableHead>Type</TableHead>}
          <TableHead>Item</TableHead>
          <TableHead className="w-24 text-center">Quantity</TableHead>
          {showPrice && (
            <TableHead className="w-24 text-center">Price</TableHead>
          )}
          {showPrice && <TableHead className="w-24 text-center">Tax</TableHead>}
          {showPrice && (
            <TableHead className="w-24 text-center">Total</TableHead>
          )}
          {showQuantity && (
            <TableHead className="w-16 text-center">Before</TableHead>
          )}
          {showQuantity && (
            <TableHead className="w-16 text-center">After</TableHead>
          )}
          <TableHead className="w-32 text-center">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field, index) => (
          <StockItemRowCells
            showQuantity={showQuantity}
            showPrice={showPrice}
            key={field.id}
            index={index}
            onUpdate={onUpdate}
            name={name}
            items={items}
            getItemQuantities={getItemQuantities}
            onCopy={onCopy}
            onRemove={onRemove}
            allowedTypes={allowedTypes}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default StockItemsFormFields;
