"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@thetis/ui/button";
import { Calendar } from "@thetis/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@thetis/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

type DateRangePickerProps = {
  name: string;
  label?: string;
  className?: string;
};

const DateRangePicker = ({ name, label, className }: DateRangePickerProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Convert array to DateRange object for the calendar
        const dateRange = field.value
          ? {
            from: field.value[0]
              ? (() => {
                try {
                  const date = new Date(field.value[0]);
                  return isNaN(date.getTime()) ? undefined : date;
                } catch {
                  return undefined;
                }
              })()
              : undefined,
            to: field.value[1]
              ? (() => {
                try {
                  const date = new Date(field.value[1]);
                  return isNaN(date.getTime()) ? undefined : date;
                } catch {
                  return undefined;
                }
              })()
              : undefined,
          }
          : undefined;

        // Convert DateRange back to array on change
        const handleSelect = (
          range: { from?: Date; to?: Date } | undefined,
        ) => {
          if (!range) {
            field.onChange([]);
            return;
          }
          field.onChange([
            range.from?.toISOString() ?? null,
            range.to?.toISOString() ?? null,
          ]);
        };

        return (
          <FormItem className={cn("flex-grow w-full", className)}>
            <FormLabel className={label ? "not-sr-only" : "sr-only"}>
              {label ?? name}
            </FormLabel>
            <FormMessage />
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
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
                                    return format(dateRange.from, "LLL dd, y");
                                  } catch {
                                    return "Invalid date";
                                  }
                                })()} - {(() => {
                                  try {
                                    return format(dateRange.to, "LLL dd, y");
                                  } catch {
                                    return "Invalid date";
                                  }
                                })()}
                              </>
                            )
                            : (
                              (() => {
                                try {
                                  return format(dateRange.from, "LLL dd, y");
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
                </FormControl>
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
          </FormItem>
        );
      }}
    />
  );
};

export default DateRangePicker;
