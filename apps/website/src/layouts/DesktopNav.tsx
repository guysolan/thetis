"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@thetis/ui/navigation-menu";
import { cn } from "@/lib/utils";
import * as React from "react";

import { ArrowRight } from "lucide-react";

import {
  getConditionHubNavRoutes,
  getConditionShopNavRoutes,
  getContactRoutesByLanguage,
  getPartnerRoutesByLanguage,
  navigationContent,
} from "../content/routes.tsx";
import type { Lang } from "../config/languages.ts";

const LinkCard = ({
  title,
  description,
  href,
  icon,
  variant = "default",
  plainIcon = false,
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  variant: "default" | "outline";
  /** No tile behind the icon (e.g. condition SVGs in Shop). */
  plainIcon?: boolean;
}) => {
  return (
    <NavigationMenuLink
      href={href}
      className={cn(
        "group relative flex items-start gap-4 p-4 rounded-xl w-full overflow-hidden transition-all duration-200",
        "border hover:shadow-lg",
        variant === "default" &&
          "bg-gradient-to-br from-primary/8 via-primary/4 to-transparent hover:from-primary/12 hover:via-primary/6 border-primary/20 hover:border-primary/35",
        variant === "outline" &&
          "bg-white dark:bg-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600",
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex justify-center items-center w-11 h-11 transition-all duration-200 shrink-0",
            plainIcon && "group-hover:scale-105",
            !plainIcon &&
              cn(
                "rounded-lg",
                variant === "default" &&
                  "bg-primary/12 text-primary group-hover:bg-primary/18 group-hover:scale-105",
                variant === "outline" &&
                  "bg-neutral-100 dark:bg-neutral-700/80 text-neutral-600 dark:text-neutral-300 group-hover:bg-neutral-200/80 dark:group-hover:bg-neutral-600/80 group-hover:scale-105",
              ),
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "mb-1 font-semibold text-[15px] leading-snug transition-colors",
            variant === "default" &&
              "text-primary group-hover:text-primary/90",
            variant === "outline" &&
              "text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-white",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm line-clamp-2 leading-relaxed",
            variant === "default" && "text-primary/65",
            variant === "outline" && "text-neutral-500 dark:text-neutral-400",
          )}
        >
          {description}
        </p>
      </div>
      <ArrowRight
        className={cn(
          "opacity-0 group-hover:opacity-60 mt-1 w-4 h-4 transition-all -translate-x-2 group-hover:translate-x-0 duration-200 shrink-0",
          variant === "default" && "text-primary",
          variant === "outline" && "text-neutral-400 dark:text-neutral-500",
        )}
      />
    </NavigationMenuLink>
  );
};

interface DesktopNavProps {
  lang: Lang;
}

function DesktopNav({ lang = "en" }: DesktopNavProps) {
  const t = navigationContent[lang];
  // Get localized routes
  const partnerLinks = getPartnerRoutesByLanguage(lang);
  const contactLinks = getContactRoutesByLanguage(lang);
  const conditionLearnLinks = getConditionHubNavRoutes(lang);
  const conditionShopLinks = getConditionShopNavRoutes(lang);
  const navT = t as Record<string, string>;

  return (
    <NavigationMenu
      className="z-10 relative flex justify-center w-full min-w-0 max-w-full h-full min-h-0 overflow-visible shrink-0"
      closeDelay={200}
      sideOffset={4}
    >
      <NavigationMenuList className="flex flex-wrap justify-center items-center gap-1">
        {/* Shop — our products + curated gear per condition */}
        {conditionShopLinks.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {(navT as Record<string, string>).shopMenu ?? "Shop"}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-5 rounded-2xl">
              <ul className="flex flex-col gap-3 w-full">
                {conditionShopLinks.map((link) => (
                  <li key={link.href}>
                    <LinkCard
                      title={link.title}
                      description={link.description}
                      href={link.href}
                      variant={link.variant ?? "outline"}
                      icon={link.icon}
                      plainIcon
                    />
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* Learn — course, FAQs, guides per condition */}
        {conditionLearnLinks.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {(navT as Record<string, string>).learnMenu ??
                navT.conditionsMenu ??
                "Learn"}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-5 rounded-2xl">
              <ul className="flex flex-col gap-3 w-full">
                {conditionLearnLinks.map((link) => (
                  <li key={link.href}>
                    <LinkCard
                      title={link.title}
                      description={link.description}
                      href={link.href}
                      variant={link.variant ?? "default"}
                      icon={link.icon}
                    />
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* Professionals - Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t.professionals}</NavigationMenuTrigger>
          <NavigationMenuContent className="p-5 rounded-2xl">
            <ul className="gap-3 grid grid-cols-1 w-full">
              {partnerLinks.map((link) => (
                <li key={link.href}>
                  <LinkCard
                    {...link}
                    variant={link.variant || "outline"}
                    icon={link.icon}
                  />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Contact - Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t.contact}</NavigationMenuTrigger>
          <NavigationMenuContent className="p-5 rounded-2xl">
            <ul className="gap-3 grid grid-cols-1 w-full">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <LinkCard
                    {...link}
                    variant={link.variant || "outline"}
                    icon={link.icon}
                  />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export { DesktopNav };
