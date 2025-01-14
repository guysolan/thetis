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
        <h3 className="flex flex-1 justify-between items-center py-4 pr-1 border-b font-medium transition-all">
          <a
            className="flex justify-between items-center w-full h-full font-light text-lg"
            href="/professionals"
          >
            Professionals
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </h3>
        <h3 className="flex flex-1 justify-between items-center py-4 pr-1 border-b font-medium transition-all">
          <a
            className="flex justify-between items-center w-full h-full font-light text-lg"
            href="/reviews"
          >
            Reviews
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </h3>

        <SheetFooter className="flex flex-col gap-y-4 mt-4">
          <SheetClose>
            <a
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "default",
                  size: "lg",
                }),
              )}
              href="/contact"
            >
              Contact Us
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
