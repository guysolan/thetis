import * as React from "react";
import { Checkbox } from "@base-ui/react/checkbox";
import { cn } from "../utils";
import { Check } from "lucide-react";

const CheckboxRoot = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof Checkbox.Root>
>(({ className, ...props }, ref) => (
  <Checkbox.Root
    ref={ref}
    className={cn(
      "peer h-6 w-6 shrink-0 rounded-sm border border-zinc-800 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-zinc-900 data-[checked]:text-zinc-50 dark:border-zinc-50 dark:focus-visible:ring-zinc-300 dark:data-[checked]:bg-zinc-50 dark:data-[checked]:text-zinc-900",
      className,
    )}
    {...props}
  >
    <Checkbox.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="pb-[1px] w-6 h-6" />
    </Checkbox.Indicator>
  </Checkbox.Root>
));
CheckboxRoot.displayName = "Checkbox";

export { CheckboxRoot as Checkbox };
