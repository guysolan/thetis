import React from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type PopoverOptionProps = {
    children: React.ReactNode;
    variant?: "default" | "destructive";
    onClick?: () => void;
};
const PopoverOption = (
    { children, variant = "default", onClick }: PopoverOptionProps,
) => {
    return (
        <Button
            onClick={onClick}
            variant="ghost"
            className={cn(
                "w-full justify-start gap-2 px-2",
                variant === "destructive" && "text-red-500 hover:text-red-600",
            )}
        >
            {children}
        </Button>
    );
};

export default PopoverOption;
