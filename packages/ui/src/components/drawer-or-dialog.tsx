"use client";

import * as React from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Button } from "./button";
import { X } from "lucide-react";

interface DrawerDialogProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

interface DrawerDialogContentProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function DrawerDialog({ children, trigger }: DrawerDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {children}
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      {children}
    </Drawer>
  );
}

export function DrawerDialogContent({
  title,
  description,
  children,
  footer,
}: DrawerDialogContentProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <DialogContent>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    );
  }

  return (
    <DrawerContent className="px-2">
      <DrawerHeader>
        {title && <DrawerTitle>{title}</DrawerTitle>}
        {description && <DrawerDescription>{description}</DrawerDescription>}
        <DrawerClose className="top-4 right-4 absolute" asChild>
          <Button variant="ghost" size="icon">
            <X size={20} />
          </Button>
        </DrawerClose>
      </DrawerHeader>
      {children}
      {footer && <DrawerFooter>{footer}</DrawerFooter>}
    </DrawerContent>
  );
}
