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
};
const Select = ({ name, label, options }: SelectProps) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (    
                <FormItem>
                    <FormLabel className={label ? "not-sr-only" : "sr-only"}>
                        {label ?? name}
                    </FormLabel>
                    <SelectWrap onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
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
