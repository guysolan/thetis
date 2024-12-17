import { useFormContext } from "react-hook-form";
import {
  FormControl,
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
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@thetis/ui/cn";
import { buttonVariants } from "@thetis/ui/button";

type Option = {
  name: string;
  description: string;
};

type ReasonForExportSelectProps = {
  name: string;
  label?: string;
  options: Option[];
  disabled?: boolean;
  className?: string;
};

export function SelectWithInfo({
  name,
  label,
  options,
  disabled,
  className,
}: ReasonForExportSelectProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={label ? "not-sr-only" : "sr-only"}>
            {label ?? name}
          </FormLabel>
          <FormMessage />
          <div className="flex items-center gap-2">
            <SelectWrap
              disabled={disabled}
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason for export" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <div key={option.name} className="flex items-center">
                    <SelectItem value={option.name}>{option.name}</SelectItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <InfoCircledIcon
                          className={cn(
                            buttonVariants({ size: "icon", variant: "ghost" }),
                            "opacity-70 ml-2 w-4 h-4 cursor-pointer",
                          )}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="p-2 w-80">
                        {option.description}
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </SelectContent>
            </SelectWrap>
          </div>
        </FormItem>
      )}
    />
  );
}
