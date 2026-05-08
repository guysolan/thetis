"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@thetis/ui/navigation-menu";
import * as React from "react";

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
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "outline";
  plainIcon?: boolean;
}) => {
  return (
    <NavigationMenuLink
      href={href}
      className="group flex items-center gap-3 hover:bg-neutral-100/80 dark:hover:bg-white/[0.06] -mx-1 p-3 rounded-xl w-full max-w-sm transition-colors"
    >
      {icon && (
        <div className="flex justify-center items-center dark:bg-white/[0.08] dark:group-hover:bg-white/[0.12] rounded-lg w-12 h-12 text-neutral-600 dark:group-hover:text-neutral-100 dark:text-neutral-300 group-hover:text-neutral-900 transition-colors shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 py-0.5 min-w-0">
        <h3 className="font-semibold dark:text-neutral-100 group-hover:text-primary text-base leading-snug transition-colors neutral-900">
          {title}
        </h3>
        <p className="mt-0.5 text-neutral-500 dark:text-neutral-400 group-hover:text-primary text-text-sm line-clamp-2 leading-snug">
          {description}
        </p>
      </div>
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
      className="group/nav-menus z-10 relative flex justify-center items-center w-full min-w-0 max-w-full h-full min-h-0 overflow-visible shrink-0"
      closeDelay={200}
      sideOffset={4}
    >
      <NavigationMenuList className="flex flex-nowrap justify-center items-center gap-0.5 list-none">
        {/* Shop — our products + curated gear per condition */}
        {conditionShopLinks.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {(navT as Record<string, string>).shopMenu ?? "Shop"}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-3">
              <ul className="flex flex-col gap-0.5 w-full">
                {conditionShopLinks.map((link) => (
                  <li key={link.href}>
                    <LinkCard
                      title={link.title}
                      description={link.description}
                      href={link.href}
                      icon={link.icon}
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
            <NavigationMenuContent className="p-3">
              <ul className="flex flex-col gap-0.5 w-full">
                {conditionLearnLinks.map((link) => (
                  <li key={link.href}>
                    <LinkCard
                      title={link.title}
                      description={link.description}
                      href={link.href}
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
          <NavigationMenuContent className="p-3">
            <ul className="flex flex-col gap-0.5 w-full">
              {partnerLinks.map((link) => (
                <li key={link.href}>
                  <LinkCard {...link} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Contact - Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t.contact}</NavigationMenuTrigger>
          <NavigationMenuContent className="p-3">
            <ul className="flex flex-col gap-0.5 w-full">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <LinkCard {...link} />
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
