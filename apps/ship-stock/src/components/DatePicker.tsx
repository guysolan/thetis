import React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@thetis/ui/button";
import { Calendar } from "@thetis/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@thetis/ui/popover";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@thetis/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";

type DatePickerProps = {
    name: string;
    label?: string;
};

const DatePicker = ({ name, label }: DatePickerProps) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-grow w-full">
                    <FormLabel className={label ? "not-sr-only" : "sr-only"}>
                        {label ?? name}
                    </FormLabel>
                    <FormMessage />
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                    )}
                                >
                                    {field.value
                                        ? (
                                            dayjs(field.value).format(
                                                "DD MMM YYYY",
                                            )
                                        )
                                        : <span>Pick a date</span>}
                                    <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-auto" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </FormItem>
            )}
        />
    );
};

export default DatePicker;
