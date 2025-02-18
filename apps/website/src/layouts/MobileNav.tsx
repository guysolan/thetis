import Social from "@/components/icons/socials/Social.tsx";
import { Button } from "../components/ui/button";
import { buttonVariants } from "../components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

import { cn } from "../lib/utils";

("client only");

import NavAccordion from "./NavAccordion";
import { ArrowRight } from "lucide-react";
import Thetis from "./Thetis.tsx";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="font-light text-base">
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 w-[90vw]">
        <SheetHeader className="flex flex-row justify-between items-center">
          <Thetis />
          <SheetClose
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Close
          </SheetClose>
        </SheetHeader>
        <NavAccordion />

        <SheetFooter className="flex flex-col gap-y-4 mt-4">
          <SheetClose>
            <a
              href="/buy-now"
              className={cn(
                "w-full",
                buttonVariants({ variant: "default", size: "lg" }),
              )}
            >
              <span className="font-semibold text-nowrap">Buy Now</span>
            </a>
          </SheetClose>
          <div className="flex flex-wrap gap-x-6 mx-auto my-2">
            <Social mode="facebook" />
            <Social mode="instagram" />
            <Social mode="linkedin" />
            <Social mode="mail" />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
