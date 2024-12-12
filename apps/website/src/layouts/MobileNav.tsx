import Social from "@/components/icons/socials/Social.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  NoAccordionLink,
} from "../components/ui/accordion";
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
import { ChevronRight } from "lucide-react";

import { articles } from "../data/articles.ts";
import { products } from "../data/products.ts";
import { cn } from "../lib/utils";

("client only");

// import { amazonLink } from '@/services/getAmazonLink'
export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="font-light text-base">
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-8">
          <SheetTitle>Welcome</SheetTitle>
          <SheetDescription>
            At Thetis Medical, we are doing all we can to improve how patients
            experience Achilles tendon ruptures.
          </SheetDescription>
        </SheetHeader>
        <Accordion defaultValue="products" type="single" collapsible>
          <AccordionItem value="products" className="">
            <AccordionTrigger className="w-full text-left hover:no-underline">
              Products
            </AccordionTrigger>
            <AccordionContent>
              {products.map((product) => (
                <a
                  key={product.href}
                  href={product.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex justify-between items-center w-full h-12 px-4 transition-colors hover:bg-accent",
                  )}
                >
                  <span className="font-medium">{product.title}</span>
                  <ChevronRight size={16} />
                </a>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="patient-guides">
            <AccordionTrigger className="w-full text-left hover:no-underline">
              Patient Guides
            </AccordionTrigger>
            <AccordionContent className="p-0">
              {articles.map((article) => (
                <a
                  key={article.href}
                  href={article.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex justify-between items-center w-full h-12 px-4 transition-colors hover:bg-accent",
                  )}
                >
                  <span className="font-medium">{article.title}</span>
                  <ChevronRight size={16} />
                </a>
              ))}
            </AccordionContent>
          </AccordionItem>

          <NoAccordionLink href="/professionals" title="Professionals" />
          <NoAccordionLink href="/contact" title="Get in Touch" />
        </Accordion>

        <SheetFooter className="flex flex-col gap-y-4 mt-4">
          <SheetClose asChild>
            <a
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "default",
                  size: "lg",
                }),
              )}
              // href={amazonLink}
              target="_blank"
            >
              Buy Now
            </a>
          </SheetClose>
          <SheetClose>
            <a
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
              )}
              href="/contact"
            >
              Buy for Professionals
            </a>
          </SheetClose>
          <div className="flex flex-wrap gap-x-6 my-2">
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
