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
import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useSelectAddresses } from '../api/selectAddresses';

interface Props {
  name?: string;
  label?: string;
  isClearable?: boolean;
}
const AddressSelect = (
  { name = "address_id", label, isClearable }: Props,
) => {
  const form = useFormContext();
  const { data: addresses } = useSelectAddresses();
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
                  <SelectValue placeholder="Select address" />
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
              {addresses.map((w) => (
                <SelectItem
                  key={`address_${w.id}`}
                  value={w.id?.toString() ?? ""}
                >
                  {w.name}
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

export default AddressSelect;
