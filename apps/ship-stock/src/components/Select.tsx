import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@thetis/ui/form";
import {
  Select as SelectWrap,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import { Button } from "@thetis/ui/button";
import { Info } from "lucide-react";
type SelectProps = {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
  className?: string;
  description?: string;
};
const Select = ({
  name,
  label,
  options,
  disabled,
  className,
  description,
}: SelectProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex-grow w-full", className)}>
          <FormLabel className={label ? "not-sr-only" : "sr-only"}>
            {label ?? name}
            {description && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    className="px-0 py-0"
                  >
                    <Info size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <FormDescription className="text-gray-500 text-sm">
                    {description}
                  </FormDescription>
                </PopoverContent>
              </Popover>
            )}
          </FormLabel>

          <FormMessage />
          <SelectWrap
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                ref={field.ref}
                name={field.name}
                className="capitalize"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((o) => (
                  <SelectItem
                    className="capitalize"
                    key={o.value}
                    value={o.value}
                  >
                    {o.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </SelectWrap>
        </FormItem>
      )}
    />
  );
};

export default Select;
