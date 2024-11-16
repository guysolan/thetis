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

type SelectProps = {
    name: string;
    label?: string;
    options: { label: string; value: string }[];
    disabled?: boolean;
};
const Select = ({ name, label, options, disabled }: SelectProps) => {
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
                            {options.map((o) => (
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
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default Select;
