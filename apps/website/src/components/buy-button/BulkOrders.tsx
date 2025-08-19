import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@thetis/ui/cn";
import { getRouteBySlugAndLanguage } from "@/content/routes.tsx";
import type { Lang } from "@/config/languages.ts";

interface BulkOrdersProps {
  lang: Lang;
}

const content = {
  en: {
    text: "For Bulk Orders Click Here",
  },
  de: {
    text: "Für Großbestellungen klicken Sie hier",
  },
  fr: {
    text: "Pour les commandes en gros, cliquez ici",
  },
  es: {
    text: "Para pedidos en gran cantidad, haga clic aquí",
  },
  it: {
    text: "Per ordini in grande quantità, fare clic qui",
  },
};

const BulkOrders = ({ lang }: BulkOrdersProps) => {
  // Use the utility function to get the route with proper URL
  const route = getRouteBySlugAndLanguage("order-wholesale", lang);
  const href = route?.href || "/order-wholesale"; // fallback

  const currentContent = content[lang as keyof typeof content];

  return (
    <a
      className={cn(
        buttonVariants({ variant: "ghost", size: "lg" }),
        "flex flex-row items-center gap-2",
      )}
      href={href}
    >
      <span className="text-base underline underline-offset-2">
        {currentContent.text}
      </span>
      <ArrowRight size={20} />
    </a>
  );
};

export default BulkOrders;
