import * as React from "react";
import { Dialog as Sheet } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const SheetRoot = Sheet.Root;

const SheetTrigger = Sheet.Trigger;

const SheetClose = Sheet.Close;

const SheetPortal = Sheet.Portal;

const SheetOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Sheet.Backdrop>
>(({ className, ...props }, ref) => (
  <Sheet.Backdrop
    className={cn(
      "z-50 fixed inset-0 bg-black/80 data-[closed]:animate-out data-[open]:animate-in data-[closed]:fade-out-0 data-[open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const sheetVariants = cva(
  "z-50 fixed gap-4 bg-white dark:bg-zinc-950 shadow-lg p-6 transition data-[closed]:animate-out data-[open]:animate-in data-[closed]:duration-300 data-[open]:duration-500 ease-in-out",
  {
    variants: {
      side: {
        top:
          "inset-x-0 top-0 border-b data-[closed]:slide-out-to-top data-[open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[closed]:slide-out-to-bottom data-[open]:slide-in-from-bottom",
        left:
          "inset-y-0 left-0 h-full w-5/6 md:w-3/4 border-r data-[closed]:slide-out-to-left data-[open]:slide-in-from-left",
        right:
          "inset-y-0 right-0 h-full w-5/6 md:w-3/4  border-l data-[closed]:slide-out-to-right data-[open]:slide-in-from-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof Sheet.Popup>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  HTMLDivElement,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <Sheet.Popup
      ref={ref}
      className={cn("pointer-events-auto", sheetVariants({ side }), className)}
      {...props}
    >
      <SheetClose className="top-4 right-4 absolute data-[open]:bg-zinc-100 dark:data-[open]:bg-zinc-800 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 ring-offset-white focus:ring-offset-2 dark:ring-offset-zinc-950 transition-opacity disabled:pointer-events-none">
        <X size={20} />
        <span className="sr-only">Close</span>
      </SheetClose>
      {children}
    </Sheet.Popup>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 sm:text-left text-center",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex sm:flex-row flex-col-reverse sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof Sheet.Title>
>(({ className, ...props }, ref) => (
  <Sheet.Title
    ref={ref}
    className={cn(
      "font-semibold text-zinc-950 dark:text-zinc-50 text-lg",
      className,
    )}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof Sheet.Description>
>(({ className, ...props }, ref) => (
  <Sheet.Description
    ref={ref}
    className={cn("text-zinc-500 dark:text-zinc-400 text-sm", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetRoot as Sheet,
  SheetTitle,
  SheetTrigger,
};
