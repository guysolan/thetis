import { Field, FieldContent, FieldError, FieldLabel } from "@thetis/ui/field";
import {
    Select as SelectWrap,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@thetis/ui/select";
import { useField } from "@tanstack/react-form";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@thetis/ui/cn";
import { buttonVariants } from "@thetis/ui/button";

type Option = {
    name: string;
    description: string;
};

type SelectFieldWithInfoProps<TFormData> = {
    name: keyof TFormData | string;
    label?: string;
    options: Option[];
    disabled?: boolean;
    className?: string;
    placeholder?: string;
    form: any;
};

export function SelectFieldWithInfo<TFormData>({
    name,
    label,
    options,
    disabled,
    className,
    placeholder,
    form,
}: SelectFieldWithInfoProps<TFormData>) {
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
            </FieldLabel>
            <div className="flex items-center gap-2">
                <SelectWrap
                    disabled={disabled}
                    onValueChange={(value) => field.handleChange(value)}
                    value={String(field.state.value ?? "")}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder ?? "Select"} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <div
                                key={option.name}
                                className="flex items-center"
                            >
                                <SelectItem value={option.name}>
                                    {option.name}
                                </SelectItem>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <InfoCircledIcon
                                            className={cn(
                                                buttonVariants({
                                                    size: "icon",
                                                    variant: "ghost",
                                                }),
                                                "opacity-70 ml-2 w-4 h-4 cursor-pointer",
                                            )}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="p-2 w-80"
                                        side="left"
                                        align="start"
                                    >
                                        {option.description}
                                    </PopoverContent>
                                </Popover>
                            </div>
                        ))}
                    </SelectContent>
                </SelectWrap>
            </div>
            <FieldError errors={field.state.meta.errors} />
        </Field>
    );
}
