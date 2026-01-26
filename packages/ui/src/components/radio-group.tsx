import * as React from "react"
import { RadioGroup } from "@base-ui/react/radio-group"
import { cn } from "../utils"
import { Circle } from "lucide-react"

const RadioGroupRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadioGroup.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroup.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroupRoot.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof RadioGroup.Radio>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroup.Radio
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-zinc-200 border-zinc-900 text-zinc-900 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:border-zinc-50 dark:text-zinc-50 dark:focus-visible:ring-zinc-300",
        className
      )}
      {...props}
    >
      <RadioGroup.Indicator className="flex justify-center items-center">
        <Circle className="w-3.5 h-3.5 fill-primary" />
      </RadioGroup.Indicator>
    </RadioGroup.Radio>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroupRoot as RadioGroup, RadioGroupItem }
