import { Field, FieldContent, FieldError, FieldLabel } from "@thetis/ui/field";
import {
    Select as SelectWrap,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@thetis/ui/select";
import { useField } from "@tanstack/react-form";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import { Button } from "@thetis/ui/button";

type SelectFieldProps<TFormData> = {
    name: keyof TFormData | string;
    label?: string;
    options: { label: string; value: string }[];
    disabled?: boolean;
    className?: string;
    description?: string;
    form: any;
};

export function SelectField<TFormData>({
    name,
    label,
    options,
    disabled,
    className,
    description,
    form,
}: SelectFieldProps<TFormData>) {
    const field = useField({
        name: name as any,
        form,
    });

    return (
        <Field
            data-invalid={field.state.meta.errors.length > 0}
            className={className}
        >
            <FieldLabel htmlFor={field.name}>
                {label ?? String(name)}
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
                            <p className="text-gray-500 text-sm">
                                {description}
                            </p>
                        </PopoverContent>
                    </Popover>
                )}
            </FieldLabel>
            <SelectWrap
                disabled={disabled}
                onValueChange={(value) => field.handleChange(value)}
                value={String(field.state.value ?? "")}
            >
                <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
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
            <FieldError errors={field.state.meta.errors} />
        </Field>
    );
}
