import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@thetis/ui/form";
import { Input as InputWrap } from "@thetis/ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type InputProps = {
    name: string;
    label?: string;
    type?: "text" | "number" | "email" | "password" | "tel";
    step?: string;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
};
const Input = (
    {
        name,
        label,
        type = "text",
        step,
        disabled = false,
        className,
        placeholder,
    }: InputProps,
) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-grow w-full">
                    <FormLabel className={label ? "not-sr-only" : "sr-only"}>
                        {label}
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                        <InputWrap
                            disabled={disabled}
                            type={type}
                            step={step}
                            placeholder={placeholder}
                            {...field}
                            value={field.value ?? ""}
                            className={cn(
                                type === "number" &&
                                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                                className,
                            )}
                            onChange={(e) =>
                                type === "number"
                                    ? field.onChange(
                                        e.target.value === ""
                                            ? null
                                            : Number(e.target.value),
                                    )
                                    : field.onChange(e.target.value)}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default Input;
