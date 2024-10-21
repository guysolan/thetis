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

interface Props {
  name?: string;
  label?: string;
}
const SelectWarehouse = (
  { name = "warehouse_id", label = "Warehouse" }: Props,
) => {
  const form = useFormContext();
  const { data: warehouses } = useSelectWarehouses();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Warehouse" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {warehouses.map((w) => (
                <SelectItem key={w.warehouse_id} value={w.warehouse_id.toString()}>
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
