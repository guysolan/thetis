"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import * as React from "react";

import { buttonVariants } from "../components/ui/button";
import { CartIcon } from "../components/cart/CartIcon";

const contentWidth = "w-full lg:min-w-[800px] max-w-[1000px]";

import {
  getArticleRoutesByLanguage,
  getContactRoutesByLanguage,
  getCourseRoutesByLanguage,
  getPartnerRoutesByLanguage,
  getProductRoutesByLanguage,
  getRecoveryPhaseRoutesByLanguage,
  getRouteBySlugAndLanguage,
  navigationContent,
} from "../content/routes.tsx";
import type { Lang } from "../config/languages.ts";

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
    <NavigationMenuLink asChild>
      <a
        className={cn(
          "group flex items-start gap-3 p-4 rounded-lg w-full transition-all duration-200",
          "hover:shadow-md border",
          variant === "default" &&
            "bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/30",
          variant === "outline" &&
            "bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600",
        )}
        href={href}
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
              "mb-1.5 font-semibold text-sm leading-tight",
              variant === "default" && "text-primary",
              variant === "outline" &&
                "text-neutral-900 dark:text-neutral-100",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-xs line-clamp-2 leading-relaxed",
              variant === "default" && "text-primary/70",
              variant === "outline" &&
                "text-neutral-600 dark:text-neutral-400",
            )}
          >
            {description}
          </p>
        </div>
      </a>
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
  const articleLinks = getArticleRoutesByLanguage(lang);
  const recoveryPhaseLinks = getRecoveryPhaseRoutesByLanguage(lang);

  // Get dynamic URLs for the current language
  const splintRoute = getRouteBySlugAndLanguage(
    "achilles-rupture-splint",
    lang,
  );
  const courseRoute = getRouteBySlugAndLanguage("course", lang);

  return (
    <>
      <NavigationMenu className="flex-1 max-w-full">
        <NavigationMenuList className="flex flex-wrap items-center gap-1">
          {/* Course - Direct Link */}
          {courseRoute && (
            <NavigationMenuItem>
              <NavigationMenuLink
                href={courseRoute.href}
                className={navigationMenuTriggerStyle()}
              >
                {courseRoute.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {/* Achilles Rupture Splint - Direct Link */}
          {splintRoute && (
            <NavigationMenuItem>
              <NavigationMenuLink
                href={splintRoute.href}
                className={navigationMenuTriggerStyle()}
              >
                {splintRoute.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {/* Learning Resources - Dropdown (FAQs + Timeline) */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t.patientGuides}
            </NavigationMenuTrigger>
            <NavigationMenuContent className={cn("p-5", contentWidth)}>
              <div className="flex sm:flex-row flex-col gap-4">
                <div className="flex flex-col flex-1 gap-2 min-w-0">
                  <h3 className="mb-2 font-semibold text-neutral-600 dark:text-neutral-400 text-sm">
                    FAQs
                  </h3>
                  {articleLinks.map((link) => (
                    <NavigationMenuLink key={link.href} asChild>
                      <a
                        href={link.href}
                        className="block py-1 text-neutral-700 hover:text-primary dark:hover:text-primary dark:text-neutral-300 text-base transition-colors"
                      >
                        {link.title}
                      </a>
                    </NavigationMenuLink>
                  ))}
                </div>
                <div className="flex flex-col flex-1 gap-2 min-w-0">
                  <h3 className="mb-2 font-semibold text-neutral-600 dark:text-neutral-400 text-sm">
                    Timeline of Recovery
                  </h3>
                  {recoveryPhaseLinks.map((link) => (
                    <NavigationMenuLink key={link.href} asChild>
                      <a
                        href={link.href}
                        className="block py-1 text-neutral-700 hover:text-primary dark:hover:text-primary dark:text-neutral-300 text-base transition-colors"
                      >
                        {link.title}
                      </a>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Professionals - Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t.professionals}
            </NavigationMenuTrigger>
            <NavigationMenuContent className={cn("p-5", contentWidth)}>
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
            <NavigationMenuTrigger>
              {t.contact}
            </NavigationMenuTrigger>
            <NavigationMenuContent className={cn("p-5", contentWidth)}>
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
      <div className="pr-2 pl-1">
        <CartIcon />
      </div>
    </>
  );
}

export { DesktopNav };
