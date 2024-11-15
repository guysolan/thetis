import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input as InputWrap } from "./ui/input";
import { useFormContext } from "react-hook-form";

type InputProps = {
    name: string;
    label?: string;
    type?: "text" | "number" | "email" | "password";
    step?: string;
};
const Input = ({ name, label, type = "text", step }: InputProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={label ? "not-sr-only" : "sr-only"}>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <InputWrap
                            type={type}
                            step={step}
                            {...field}
                            onChange={(e) =>
                                type === "number"
                                    ? field.onChange(Number(e.target.value))
                                    : field.onChange(e.target.value)}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default Input;
