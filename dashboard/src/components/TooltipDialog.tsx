import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipDialogProps {
    icon: ReactNode;
    tooltipText: string;
    children: ReactNode;
}

const TooltipDialog = ({ icon, tooltipText, children }: TooltipDialogProps) => {
    return (
        <TooltipProvider>
            <Dialog>
                <Tooltip>
                    <TooltipTrigger>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                type="button"
                            >
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
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
};

export default TooltipDialog;
