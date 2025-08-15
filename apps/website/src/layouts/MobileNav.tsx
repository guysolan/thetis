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

"client only";

import NavAccordion from "./NavAccordion";
import { ArrowRight } from "lucide-react";
import Thetis from "./Thetis.tsx";
import type { Lang } from "../config/languages.ts";

interface MobileNavProps {
  lang: Lang;
}

const content = {
  en: {
    menu: "Menu",
    close: "Close",
    buyNow: "Buy Now",
  },
  de: {
    menu: "Menü",
    close: "Schließen",
    buyNow: "Jetzt kaufen",
  },
  fr: {
    menu: "Menu",
    close: "Fermer",
    buyNow: "Acheter maintenant",
  },
  es: {
    menu: "Menú",
    close: "Cerrar",
    buyNow: "Comprar ahora",
  },
  it: {
    menu: "Menu",
    close: "Chiudi",
    buyNow: "Compra ora",
  },
};

export function MobileNav({ lang = "en" }: MobileNavProps) {
  const t = content[lang];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="font-light text-base">
          {t.menu}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 w-[90vw]">
        <SheetHeader className="flex flex-row justify-between items-center">
          <Thetis />
          <SheetClose
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            {t.close}
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
              <span className="font-semibold text-nowrap">{t.buyNow}</span>
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
