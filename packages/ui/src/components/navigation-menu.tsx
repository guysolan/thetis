import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "../utils";

type NavigationMenuRootProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Root
>;
type NavigationMenuPositionerProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Positioner
>;

/** Matches site mega menus (Learn / Shop); popup must not cap below this. */
const navigationMenuViewportWidth = "md:min-w-[600px] lg:min-w-[800px]";

const NavigationMenu = React.forwardRef<
  HTMLElement,
  & NavigationMenuRootProps
  & Pick<
    NavigationMenuPositionerProps,
    "align" | "side" | "sideOffset" | "alignOffset"
  >
>(function NavigationMenu(
  {
    align = "start",
    side = "bottom",
    sideOffset = 8,
    alignOffset = 0,
    className,
    children,
    ...rootProps
  },
  ref,
) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      data-slot="navigation-menu"
      className={cn(
        "group/navigation-menu z-10 relative flex flex-1 justify-center items-center min-w-0 max-w-full h-full",
        className,
      )}
      {...rootProps}
    >
      {children}
      <NavigationMenuPositioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      />
    </NavigationMenuPrimitive.Root>
  );
});
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(function NavigationMenuList({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 justify-center items-center gap-0 list-none",
        className,
      )}
      {...props}
    />
  );
});
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(function NavigationMenuItem({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Item
      ref={ref}
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger inline-flex justify-center items-center bg-background data-open:bg-accent/50 data-popup-open:bg-accent/50 hover:bg-accent focus:bg-accent dark:data-open:bg-accent/50 dark:data-popup-open:bg-accent/50 disabled:opacity-50 px-4 py-2 rounded-md outline-none w-max h-10 font-medium text-neutral-900 dark:text-neutral-50 text-base transition-colors hover:text-accent-foreground focus:text-accent-foreground dark:hover:text-accent-foreground disabled:pointer-events-none",
);

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(function NavigationMenuTrigger({ className, children, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="top-px relative ml-1 size-3 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180 transition duration-200"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(function NavigationMenuContent({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      data-slot="navigation-menu-content"
      className={cn(
        "data-ending-style:opacity-0 data-starting-style:opacity-0 p-1 outline-none w-auto h-full transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "data-ending-style:data-[activation-direction=left]:translate-x-[50%] data-ending-style:data-[activation-direction=right]:translate-x-[-50%] data-starting-style:data-[activation-direction=left]:translate-x-[-50%] data-starting-style:data-[activation-direction=right]:translate-x-[50%]",
        "[&_[data-slot=navigation-menu-link]]:focus:outline-none [&_[data-slot=navigation-menu-link]]:focus:ring-0",
        className,
      )}
      {...props}
    />
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuPositioner = React.forwardRef<
  HTMLDivElement,
  NavigationMenuPositionerProps
>(function NavigationMenuPositioner(
  {
    className,
    side = "bottom",
    sideOffset = 8,
    align = "start",
    alignOffset = 0,
    ...props
  },
  ref,
) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={cn(
          "data-[side=bottom]:before:top-[-10px] z-50 isolate data-[side=bottom]:before:absolute data-[side=bottom]:before:inset-x-0 w-[var(--positioner-width)] max-w-[var(--available-width)] h-[var(--positioner-height)] data-[side=bottom]:before:h-[10px] transition-[top,left,right,bottom] data-instant:transition-none duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
          className,
        )}
        {...props}
      >
        <NavigationMenuPrimitive.Popup
          className={cn(
            "relative bg-white dark:bg-neutral-900 data-ending-style:opacity-0 data-starting-style:opacity-0 shadow-xl rounded-lg outline-none ring-1 ring-black/[0.06] dark:ring-white/10 w-[var(--popup-width)] max-w-[min(var(--available-width),100vw)] h-[var(--popup-height)] text-neutral-900 dark:text-neutral-50 origin-[var(--transform-origin)] data-ending-style:scale-90 data-starting-style:scale-90 transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] data-ending-style:duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
            navigationMenuViewportWidth,
          )}
        >
          <NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden text-popover-foreground" />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
});
NavigationMenuPositioner.displayName = "NavigationMenuPositioner";

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(function NavigationMenuLink({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      data-slot="navigation-menu-link"
      className={cn(
        "flex items-center gap-2 rounded-lg p-2 text-sm outline-none transition-all hover:bg-accent focus:bg-accent focus-visible:outline focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-active:bg-accent/50 data-active:hover:bg-accent data-active:focus:bg-accent [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

const NavigationMenuIndicator = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Icon>
>(function NavigationMenuIndicator({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Icon
      ref={ref}
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex justify-center items-end opacity-0 data-popup-open:opacity-100 h-1.5 overflow-hidden transition-opacity data-popup-open:animate-in data-popup-open:fade-in",
        className,
      )}
      {...props}
    >
      <div className="top-[60%] relative shadow-md bg-border rounded-tl-sm size-2 rotate-45" />
    </NavigationMenuPrimitive.Icon>
  );
});
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  navigationMenuViewportWidth,
};
