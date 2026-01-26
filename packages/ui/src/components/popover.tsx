"use client";

import * as React from "react";
import { Popover } from "@base-ui/react/popover";

import { cn } from "../utils/cn";

const PopoverRoot = Popover.Root;

const PopoverTrigger = Popover.Trigger;

const PopoverAnchor = Popover.Anchor;

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Popover.Popup> & {
    align?: "start" | "center" | "end";
    sideOffset?: number;
  }
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <Popover.Portal>
    <Popover.Positioner sideOffset={sideOffset} alignment={align}>
      <Popover.Popup
        ref={ref}
        data-slot="popover-content"
        className={cn(
          "bg-white text-popover-foreground data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </Popover.Positioner>
  </Popover.Portal>
));
PopoverContent.displayName = "PopoverContent";

export { PopoverRoot as Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
