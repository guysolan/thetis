import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select as SelectWrap,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
type SelectProps = {
    name: string;
    label?: string;
    options: { label: string; value: string }[];
    disabled?: boolean;
    className?: string;
};
const Select = ({ name, label, options, disabled, className }: SelectProps) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("flex-grow w-full", className)}>
                    <FormLabel className={label ? "not-sr-only" : "sr-only"}>
                        {label ?? name}
                    </FormLabel>
                    <FormMessage />
                    <SelectWrap
                        disabled={disabled}
                        onValueChange={field.onChange}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="capitalize">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.sort((a, b) =>
                                a.label.localeCompare(b.label)
                            ).map((o) => (
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
                </FormItem>
            )}
        />
    );
};

export default Select;
