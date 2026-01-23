import * as React from "react";
import { Tabs } from "@base-ui/react/tabs";

import { cn } from "../utils";

const TabsRoot = Tabs.Root;

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tabs.List>
>(({ className, ...props }, ref) => (
  <Tabs.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-smp-1 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Tabs.Tab>
>(({ className, ...props }, ref) => (
  <Tabs.Tab
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-neutral-200 data-[selected]:text-neutral-950 data-[selected]:shadow dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[selected]:bg-neutral-950 dark:data-[selected]:text-neutral-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tabs.Panel>
>(({ className, ...props }, ref) => (
  <Tabs.Panel
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { TabsRoot as Tabs, TabsContent, TabsList, TabsTrigger };
