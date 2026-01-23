import * as React from "react";
import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "../utils";

const AccordionRoot = Accordion.Root;

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ className, ...props }, ref) => (
  <Accordion.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const accordianTrigger =
  "flex flex-1 items-center text-left justify-between py-4 font-medium transition-all hover:underline [&[data-open]>svg]:rotate-180";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 justify-between items-center py-4 font-medium text-lg text-left hover:underline underline-offset-4 [&[data-open]>svg]:rotate-180 transition-all",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="w-4 h-4 transition-transform duration-200 shrink-0" />
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Panel>
>(({ className, children, ...props }, ref) => (
  <Accordion.Panel
    ref={ref}
    className={cn(
      "overflow-hidden text-md text-left transition-all data-[closed]:animate-accordion-up data-[open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="pt-0 pr-4 pb-4 font-medium">{children}</div>
  </Accordion.Panel>
));
AccordionContent.displayName = "AccordionContent";

export const NoAccordionLink = ({ title, href }) => {
  return (
    <h3 className={cn(accordianTrigger, "border-b")}>
      <a className="w-full h-full font-light text-lg" href={href}>
        {title}
      </a>
    </h3>
  );
};

export { AccordionRoot as Accordion, AccordionContent, AccordionItem, AccordionTrigger };
