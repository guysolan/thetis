"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "../utils";
import { X } from "lucide-react";

const DialogRoot = Dialog.Root;

const DialogTrigger = Dialog.Trigger;

const DialogPortal = Dialog.Portal;

const DialogClose = Dialog.Close;

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>
>(({ className, ...props }, ref) => (
  <Dialog.Backdrop
    ref={ref}
    className={cn(
      "z-50 fixed inset-0 bg-black/20 backdrop-blur-sm data-[closed]:animate-out data-[open]:animate-in data-[closed]:fade-out-0 data-[open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Popup>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <Dialog.Popup
      ref={ref}
      className={cn(
        "top-[50%] data-[closed]:slide-out-to-top-[48%] left-[50%] data-[closed]:slide-out-to-left-1/2 z-50 fixed gap-4 grid bg-white dark:bg-neutral-950 data-[open]:slide-in-from-left-1/2 data-[open]:slide-in-from-top-[48%] shadow-lg p-6 border dark:border-neutral-800 sm:rounded-lg w-full max-w-lg translate-x-[-50%] translate-y-[-50%] data-[closed]:animate-out data-[open]:animate-in duration-200 data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95",
        className,
      )}
      {...props}
    >
      {children}
      <DialogClose className="top-4 right-4 absolute data-[open]:bg-accent opacity-70 hover:opacity-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-ring ring-offset-background focus:ring-offset-2 data-[open]:text-muted-foreground transition-opacity disabled:pointer-events-none">
        <X className="w-4 h-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </Dialog.Popup>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 sm:text-left text-center",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      "font-semibold text-lg leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  DialogRoot as Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
