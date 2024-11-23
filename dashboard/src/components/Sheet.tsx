import React from "react";
import {
    Sheet as SheetWrap,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

type SheetProps = {
    trigger: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
};
const Sheet = (
    { trigger, children, title, description, footer }: SheetProps,
) => {
    const closeRef = React.useRef<HTMLButtonElement>(null);

    return (
        <SheetWrap>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent className="bg-neutral-50">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    {description && (
                        <SheetDescription>
                            {description}
                        </SheetDescription>
                    )}
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-10rem)]">
                    {children}
                </ScrollArea>
                <SheetFooter>
                    {footer}
                </SheetFooter>
                <SheetClose
                    id="close-sheet"
                    ref={closeRef}
                    data-component="sheet"
                    className="hidden"
                />
            </SheetContent>
        </SheetWrap>
    );
};

export default Sheet;
