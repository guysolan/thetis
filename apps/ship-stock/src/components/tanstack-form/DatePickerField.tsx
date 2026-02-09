import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@thetis/ui/button";
import { Calendar } from "@thetis/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import { Field, FieldError, FieldLabel } from "@thetis/ui/field";
import { cn } from "@/lib/utils";
import { useField } from "@tanstack/react-form";
import dayjs from "dayjs";

type DatePickerFieldProps<TFormData> = {
    name: keyof TFormData | string;
    label?: string;
    form: any;
};

export function DatePickerField<TFormData>({
    name,
    label,
    form,
}: DatePickerFieldProps<TFormData>) {
    const field = useField({
        name: name as any,
        form,
    });

    return (
        <Field data-invalid={field.state.meta.errors.length > 0}>
            <FieldLabel htmlFor={field.name}>
                {label ?? String(name)}
            </FieldLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        type="button"
                        aria-invalid={field.state.meta.errors.length > 0}
                        className={cn(
                            "h-9 w-full font-normal text-sm text-left justify-start px-3",
                            !field.state.value && "text-muted-foreground",
                        )}
                    >
                        {field.state.value
                            ? dayjs(field.state.value).format("DD MMM YYYY")
                            : <span>Pick a date</span>}
                        <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto" align="start">
                    <Calendar
                        mode="single"
                        selected={field.state.value}
                        onSelect={(date) => field.handleChange(date)}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <FieldError errors={field.state.meta.errors} />
        </Field>
    );
}
