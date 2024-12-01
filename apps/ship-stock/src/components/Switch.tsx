import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@thetis/ui/form";
import { Switch as SwitchUI } from "@thetis/ui/switch";
import { useFormContext } from "react-hook-form";

type SwitchProps = {
  name: string;
  label?: string;
  disabled?: boolean;
};

const Switch = ({ name, label, disabled = false }: SwitchProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex justify-between items-center gap-2">
          <FormLabel className={label ? "not-sr-only" : "sr-only"}>
            {label}
          </FormLabel>
          <FormControl>
            <SwitchUI
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Switch;
