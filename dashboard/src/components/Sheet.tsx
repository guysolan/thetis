import React from "react";
import {
    Sheet as SheetWrap,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type SheetProps = {
    trigger: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
};
const Sheet = ({ trigger, children, title, description }: SheetProps) => {
    return (
        <SheetWrap>
            <SheetTrigger asChild>
                    {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    {description&&<SheetDescription>
                        {description}
                </SheetDescription>}
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-10rem)]">
                    {children}
                </ScrollArea>
            </SheetContent>
        </SheetWrap>
    );
};

export default Sheet;
