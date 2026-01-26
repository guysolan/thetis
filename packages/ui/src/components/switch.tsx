import * as React from "react"
import { Switch } from "@base-ui/react/switch"

import { cn } from "../utils"

const SwitchRoot = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof Switch.Root>
>(({ className, ...props }, ref) => (
  <Switch.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-zinc-900 data-[unchecked]:bg-zinc-200 dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950 dark:data-[checked]:bg-zinc-50 dark:data-[unchecked]:bg-zinc-800",
      className
    )}
    {...props}
    ref={ref}
  >
    <Switch.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[checked]:translate-x-4 data-[unchecked]:translate-x-0 dark:bg-zinc-950"
      )}
    />
  </Switch.Root>
))
SwitchRoot.displayName = "Switch"

export { SwitchRoot as Switch }
