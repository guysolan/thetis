"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    /** Disable dates after this date */
    maxDate?: Date;
    /** Disable dates before this date */
    minDate?: Date;
    /** Date format string (date-fns format) */
    dateFormat?: string;
}

function DatePicker({
    value,
    onChange,
    placeholder = "Pick a date",
    disabled = false,
    className,
    maxDate,
    minDate,
    dateFormat = "PPP",
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        "justify-start w-full h-11 font-normal text-left",
                        !value && "text-muted-foreground",
                        className,
                    )}
                >
                    <CalendarIcon className="mr-2 w-4 h-4" />
                    {value
                        ? format(value, dateFormat)
                        : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => {
                        onChange?.(date);
                        setOpen(false);
                    }}
                    disabled={(date) => {
                        if (maxDate && date > maxDate) return true;
                        if (minDate && date < minDate) return true;
                        return false;
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
