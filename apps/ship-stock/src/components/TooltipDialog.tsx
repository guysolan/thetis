import React from "react";
import { Button } from "@thetis/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@thetis/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@thetis/ui/tooltip";
import { ReactNode } from "react";

interface TooltipDialogProps {
  icon: ReactNode;
  tooltipText: string;
  children: ReactNode;
}

const TooltipDialog = ({ icon, tooltipText, children }: TooltipDialogProps) => {
  const closeRef = React.useRef<HTMLButtonElement>(null);

  return (
    <TooltipProvider>
      <Dialog>
        <Tooltip>
          <TooltipTrigger type="button">
            <DialogTrigger type="button" asChild>
              <Button variant="outline" size="icon" type="button">
                {icon}
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tooltipText}</DialogTitle>
          </DialogHeader>
          {children}
          <DialogClose
            data-component="dialog"
            id="close-dialog"
            ref={closeRef}
            className="hidden"
          />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default TooltipDialog;
