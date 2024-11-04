import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useSelectWarehouses } from "../api/selectWarehouses";
import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface Props {
  name?: string;
  label?: string;
  isClearable?: boolean;
}
const SelectWarehouse = (
  { name = "warehouse_id", label, isClearable }: Props,
) => {
  const form = useFormContext();
  const { data: warehouses } = useSelectWarehouses();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
            </FormLabel>
          )}
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <div className="flex flex-row items-center gap-2">
                <SelectTrigger>
                  <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
               {isClearable&& <Button
                  disabled={!field.value}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange(undefined);
                  }}
                  size="icon"
                  variant="outline"
                >
                  <X size={20} />
                </Button>}
              </div>
            </FormControl>
            <SelectContent>
              {warehouses.map((w) => (
                <SelectItem
                  key={w.warehouse_id}
                  value={w.warehouse_id?.toString() ?? ""}
                >
                  {w.warehouse_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectWarehouse;
