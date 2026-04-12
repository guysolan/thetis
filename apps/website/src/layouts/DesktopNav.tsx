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

import { BookOpen, ShoppingBag } from "lucide-react";

import {
  getConditionHubNavRoutes,
  getConditionShopNavRoutes,
  getContactRoutesByLanguage,
  getPartnerRoutesByLanguage,
  navigationContent,
} from "../content/routes.tsx";
import type { Lang } from "../config/languages.ts";

const megaMenuSurface =
  "shadow-xl shadow-neutral-900/8 dark:shadow-none ring-1 ring-black/[0.06] dark:ring-white/10";
const LinkCard = ({
  title,
  description,
  href,
  icon,
  variant = "default",
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  variant: "default" | "outline";
}) => {
  return (
    <NavigationMenuLink
      href={href}
      className={cn(
        "group flex items-start gap-3 p-4 rounded-lg w-full transition-all duration-200",
        "hover:shadow-md border",
        variant === "default" &&
          "bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/30",
        variant === "outline" &&
          "bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600",
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex justify-center items-center rounded-md w-10 h-10 transition-colors shrink-0",
            variant === "default" &&
              "bg-primary/10 text-primary group-hover:bg-primary/20",
            variant === "outline" &&
              "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-600",
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "mb-1.5 font-semibold text-md text-neutral-900 dark:text-neutral-100 leading-tight",
            variant === "default" && "text-primary",
            variant === "outline" && "text-neutral-900 dark:text-neutral-100",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm line-clamp-2 leading-tight",
            variant === "default" && "text-primary/70",
            variant === "outline" && "text-neutral-600 dark:text-neutral-400",
          )}
        >
          {description}
        </p>
      </div>
    </NavigationMenuLink>
  );
};

/** One row in the vertical Learn / Shop condition list (title only). */
function MegaMenuVerticalConditionLink({
  title,
  href,
  variant,
}: {
  title: string;
  href: string;
  variant: "default" | "outline";
}) {
  return (
    <NavigationMenuLink
      href={href}
      className={cn(
        "group flex items-center px-4 py-2.5 border rounded-lg w-full text-sm transition-all duration-200",
        variant === "default" &&
          "bg-gradient-to-br from-primary/12 via-primary/5 to-transparent dark:from-primary/18 dark:via-primary/8 dark:to-transparent hover:from-primary/18 hover:via-primary/8 border-primary/25 hover:border-primary/40",
        variant === "outline" &&
          "bg-white dark:bg-neutral-800/90 hover:bg-neutral-50 dark:hover:bg-neutral-800 border-neutral-200/90 dark:border-neutral-600/90 hover:border-neutral-300 dark:hover:border-neutral-500",
      )}
    >
      <span
        className={cn(
          "font-medium text-left leading-snug",
          variant === "default" && "text-primary",
          variant === "outline" &&
            "text-neutral-900 dark:text-neutral-100",
        )}
      >
        {title}
      </span>
    </NavigationMenuLink>
  );
}

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
    <NavigationMenu className="z-10 relative flex justify-center w-full min-w-0 max-w-full h-full min-h-0 overflow-visible shrink-0">
      <NavigationMenuList className="flex flex-wrap justify-center items-center gap-1">
        {/* Shop — our products + curated gear per condition */}
        {conditionShopLinks.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {(navT as Record<string, string>).shopMenu ?? "Shop"}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn(
                "p-0 border border-primary/10 dark:border-primary/20 rounded-2xl overflow-hidden",
                megaMenuSurface,
              )}
            >
              <div className="flex lg:flex-row flex-col">
                <div
                  className={cn(
                    "flex flex-col justify-center gap-4 px-6 py-6 lg:py-8 !pt-0 border-primary/15 lg:border-r border-b lg:border-b-0 lg:w-[200px] xl:w-[232px] color-gradient lg:shrink-0",
                    "text-left",
                  )}
                >
                  <div className="hidden lg:flex justify-center items-center bg-primary/20 rounded-xl w-12 h-12 text-primary">
                    <ShoppingBag className="w-6 h-6" aria-hidden />
                  </div>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm leading-snug">
                    {(navT as Record<string, string>).shopAsideTitle ?? ""}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                    {(navT as Record<string, string>).shopAsideBody ??
                      (navT as Record<string, string>).shopMenuDescription ??
                      ""}
                  </p>
                </div>
                <div className="flex-1 bg-neutral-50/90 dark:bg-neutral-950/50 p-5 lg:p-6 min-w-0 lg:min-w-[280px]">
                  <p className="lg:hidden mb-4 text-neutral-500 dark:text-neutral-400 text-xs">
                    {(navT as Record<string, string>).shopMenuDescription ??
                      ""}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {conditionShopLinks.map((link) => (
                      <li key={link.href}>
                        <MegaMenuVerticalConditionLink
                          title={link.title}
                          href={link.href}
                          variant={link.variant ?? "outline"}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
            <NavigationMenuContent
              className={cn(
                "p-0 border border-primary/10 dark:border-primary/20 rounded-2xl overflow-hidden",
                megaMenuSurface,
              )}
            >
              <div className="flex lg:flex-row flex-col">
                <div
                  className={cn(
                    "flex flex-col justify-center gap-3 px-6 py-6 lg:py-8 !pt-0 border-primary/15 lg:border-r border-b lg:border-b-0 lg:w-[200px] xl:w-[232px] color-gradient lg:shrink-0",
                    "text-left",
                  )}
                >
                  <div className="hidden lg:flex justify-center items-center bg-primary/20 rounded-xl w-12 h-12 text-primary">
                    <BookOpen className="w-6 h-6" aria-hidden />
                  </div>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm leading-snug">
                    {(navT as Record<string, string>).learnAsideTitle ?? ""}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                    {(navT as Record<string, string>).learnAsideBody ??
                      (navT as Record<string, string>).learnMenuDescription ??
                      ""}
                  </p>
                </div>
                <div className="flex-1 bg-neutral-50/90 dark:bg-neutral-950/50 p-5 lg:p-6 min-w-0 lg:min-w-[280px]">
                  <p className="lg:hidden mb-4 text-neutral-500 dark:text-neutral-400 text-xs">
                    {(navT as Record<string, string>).learnMenuDescription ??
                      ""}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {conditionLearnLinks.map((link) => (
                      <li key={link.href}>
                        <MegaMenuVerticalConditionLink
                          title={link.title}
                          href={link.href}
                          variant={link.variant ?? "default"}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* Professionals - Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t.professionals}</NavigationMenuTrigger>
          <NavigationMenuContent
            className={cn(
              "p-5 border border-primary/10 dark:border-primary/20 rounded-2xl",
              megaMenuSurface,
            )}
          >
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
              {partnerLinks.map((link) => (
                <LinkCard
                  key={link.href}
                  {...link}
                  variant={link.variant || "outline"}
                  icon={link.icon}
                />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Contact - Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t.contact}</NavigationMenuTrigger>
          <NavigationMenuContent
            className={cn(
              "p-5 border border-primary/10 dark:border-primary/20 rounded-2xl",
              megaMenuSurface,
            )}
          >
            <div className="flex sm:flex-row flex-col gap-4">
              <div className="flex flex-col flex-1 gap-3 min-w-0">
                {contactLinks
                  .filter((l) => l.variant === "default")
                  .map((link) => (
                    <LinkCard
                      key={link.href}
                      {...link}
                      variant={link.variant || "default"}
                      icon={link.icon}
                    />
                  ))}
              </div>
              <div className="flex flex-col flex-1 gap-3 min-w-0">
                {contactLinks
                  .filter((l) => l.variant === "outline")
                  .map((link) => (
                    <LinkCard
                      key={link.href}
                      {...link}
                      variant={link.variant || "outline"}
                      icon={link.icon}
                    />
                  ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export { DesktopNav };
