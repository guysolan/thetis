import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@thetis/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@thetis/ui/popover";
import { Button } from "@thetis/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@thetis/ui/command";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  name: string;
  label?: string;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
}

export const Combobox = ({
  name,
  label,
  options,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  disabled = false,
  className,
}: ComboboxProps) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={disabled}
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          field.onChange(currentValue === field.value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};