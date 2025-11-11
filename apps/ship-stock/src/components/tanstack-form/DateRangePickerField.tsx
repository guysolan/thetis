"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@thetis/ui/button";
import { Calendar } from "@thetis/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import { Field, FieldError, FieldLabel } from "@thetis/ui/field";
import { cn } from "@/lib/utils";
import { useField } from "@tanstack/react-form";

type DateRangePickerFieldProps<TFormData> = {
    name: keyof TFormData | string;
    label?: string;
    className?: string;
    form: any;
};

export function DateRangePickerField<TFormData>({
    name,
    label,
    className,
    form,
}: DateRangePickerFieldProps<TFormData>) {
    const field = useField({
        name: name as any,
        form,
    });

    // Convert array to DateRange object for the calendar
    const dateRange = field.state.value
        ? {
            from: field.state.value[0]
                ? (() => {
                    try {
                        const date = new Date(field.state.value[0]);
                        return isNaN(date.getTime()) ? undefined : date;
                    } catch {
                        return undefined;
                    }
                })()
                : undefined,
            to: field.state.value[1]
                ? (() => {
                    try {
                        const date = new Date(field.state.value[1]);
                        return isNaN(date.getTime()) ? undefined : date;
                    } catch {
                        return undefined;
                    }
                })()
                : undefined,
        }
        : undefined;

    // Convert DateRange back to array on change
    const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
        if (!range) {
            field.handleChange([null, null]);
            return;
        }
        field.handleChange([
            range.from?.toISOString() ?? null,
            range.to?.toISOString() ?? null,
        ]);
    };

    return (
        <Field
            data-invalid={field.state.meta.errors.length > 0}
            className={cn("flex-grow w-full", className)}
        >
            <FieldLabel htmlFor={field.name}>
                {label ?? String(name)}
            </FieldLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        type="button"
                        className={cn(
                            "flex justify-between items-center gap-2 pr-3 pl-3 w-full font-normal text-left",
                            !dateRange?.from && "text-muted-foreground",
                        )}
                    >
                        <span className="flex-1 text-left">
                            {dateRange?.from
                                ? (
                                    dateRange.to
                                        ? (
                                            <>
                                                {(() => {
                                                    try {
                                                        return format(
                                                            dateRange.from,
                                                            "LLL dd, y",
                                                        );
                                                    } catch {
                                                        return "Invalid date";
                                                    }
                                                })()} - {(() => {
                                                    try {
                                                        return format(
                                                            dateRange.to,
                                                            "LLL dd, y",
                                                        );
                                                    } catch {
                                                        return "Invalid date";
                                                    }
                                                })()}
                                            </>
                                        )
                                        : (
                                            (() => {
                                                try {
                                                    return format(
                                                        dateRange.from,
                                                        "LLL dd, y",
                                                    );
                                                } catch {
                                                    return "Invalid date";
                                                }
                                            })()
                                        )
                                )
                                : <span>Pick a date range</span>}
                        </span>
                        <CalendarIcon className="flex-shrink-0 ml-2 w-4 h-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={handleSelect}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
            <FieldError errors={field.state.meta.errors} />
        </Field>
    );
}
