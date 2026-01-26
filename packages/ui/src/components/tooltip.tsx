"use client"

import * as React from "react"
import { Tooltip } from "@base-ui/react/tooltip"

import { cn } from "../utils"

const TooltipProvider = Tooltip.Provider

const TooltipRoot = Tooltip.Root

const TooltipTrigger = Tooltip.Trigger

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tooltip.Popup> & {
    sideOffset?: number;
  }
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Tooltip.Portal>
    <Tooltip.Positioner sideOffset={sideOffset}>
      <Tooltip.Popup
        ref={ref}
        className={cn(
          "z-50 overflow-hidden rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-zinc-50 animate-in fade-in-0 zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 dark:bg-zinc-50 dark:text-zinc-900",
          className
        )}
        {...props}
      />
    </Tooltip.Positioner>
  </Tooltip.Portal>
))
TooltipContent.displayName = "TooltipContent"

export { TooltipRoot as Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
