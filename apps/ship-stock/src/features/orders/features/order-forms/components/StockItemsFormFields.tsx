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
import NumberCell from "./NumberCell";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import { ItemType, StockItemFormData, StockItemQuantities } from "../types";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import StockItemRowCells from "./StockItemRowCells";

interface StockItemsFormFieldsProps {
  name: string;
  fields: any[];
  items: Array<{ item_id: string; item_name: string; item_type: string }>;
  form: UseFormReturn<any>;
  getItemQuantities: (itemId: string) => StockItemQuantities;
  onCopy: (index: number) => void;
  onRemove: (index: number) => void;
  onToggleLock: (index: number) => void;
  isLocked?: (index: number) => boolean;
  allowedTypes?: ItemType[];
}

const StockItemsFormFields = ({
  name,
  fields,
  items,
  form,
  getItemQuantities,
  onCopy,
  onRemove,
  onToggleLock,
  isLocked = () => false,
  allowedTypes = [],
}: StockItemsFormFieldsProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {allowedTypes.length > 1 && <TableHead>Type</TableHead>}
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Tax</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Before</TableHead>
          <TableHead>After</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field, index) => (
          <StockItemRowCells
            key={field.id}
            index={index}
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
