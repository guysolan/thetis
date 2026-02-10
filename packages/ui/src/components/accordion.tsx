"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "../utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

type AccordionRootProps = AccordionPrimitive.Root.Props & {
  type?: "single" | "multiple";
  collapsible?: boolean;
};

function Accordion({
  className,
  type = "single",
  collapsible,
  ...props
}: AccordionRootProps) {
  // Base UI uses `multiple`; single = only one open, and closing is always allowed
  const multiple = type === "multiple";
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col w-full", className)}
      multiple={multiple}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 justify-between items-start disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto py-2.5 border border-transparent focus-visible:after:border-ring focus-visible:border-ring rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50 **:data-[slot=accordion-trigger-icon]:size-4 font-medium **:data-[slot=accordion-trigger-icon]:text-muted-foreground text-sm text-left hover:underline transition-all disabled:pointer-events-none",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="group-aria-expanded/accordion-trigger:hidden pointer-events-none shrink-0"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="hidden group-aria-expanded/accordion-trigger:inline pointer-events-none shrink-0"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-2.5 [&_a]:hover:text-foreground h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
