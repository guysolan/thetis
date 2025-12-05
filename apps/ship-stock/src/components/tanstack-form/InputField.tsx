import { Field, FieldError, FieldLabel } from "@thetis/ui/field";
import { Input as InputWrap } from "@thetis/ui/input";
import { useField } from "@tanstack/react-form";
import { cn } from "@/lib/utils";

type InputFieldProps<TFormData> = {
    name: keyof TFormData | string;
    label?: string;
    type?: "text" | "number" | "email" | "password" | "tel";
    step?: string;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
    form: any;
};

export function InputField<TFormData>({
    name,
    label,
    type = "text",
    step,
    disabled = false,
    className,
    placeholder,
    form,
}: InputFieldProps<TFormData>) {
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
            <InputWrap
                id={field.name}
                disabled={disabled}
                type={type}
                step={step}
                placeholder={placeholder}
                value={field.state.value ?? ""}
                aria-invalid={field.state.meta.errors.length > 0}
                className={cn(
                    type === "number" &&
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    className,
                )}
                onChange={(e) => {
                    if (type === "number") {
                        field.handleChange(
                            e.target.value === ""
                                ? null
                                : Number(e.target.value),
                        );
                    } else {
                        field.handleChange(e.target.value);
                    }
                }}
                onBlur={field.handleBlur}
            />
            <FieldError errors={field.state.meta.errors} />
        </Field>
    );
}
