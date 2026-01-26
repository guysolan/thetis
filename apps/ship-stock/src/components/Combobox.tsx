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
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
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
                                        "justify-between w-full",
                                        !field.value && "text-muted-foreground",
                                    )}
                                >
                                    <span className="truncate">
                                        {field.value
                                            ? options.find((option) =>
                                                option.value === field.value
                                            )?.label
                                            : placeholder}
                                    </span>
                                    <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-full">
                            <Command>
                                <CommandInput placeholder={searchPlaceholder} />
                                <CommandEmpty>{emptyMessage}</CommandEmpty>
                                <CommandList>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onSelect={() => {
                                                    field.onChange(
                                                        option.value ===
                                                                field.value
                                                            ? ""
                                                            : option.value,
                                                    );
                                                    setOpen(false);
                                                }}
                                                className="flex items-center"
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 w-4 h-4 shrink-0",
                                                        field.value ===
                                                                option.value
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                                <span
                                                    className="truncate"
                                                    title={option.label}
                                                >
                                                    {option.label}
                                                </span>
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
