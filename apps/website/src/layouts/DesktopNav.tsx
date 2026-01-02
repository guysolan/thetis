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

import { Badge } from "../components/ui/badge";
import { Button, buttonVariants } from "../components/ui/button";

const contentWidth = "min-w-[min(50vw,700px)]";

import {
  getArticleRoutesByLanguage,
  getContactRoutesByLanguage,
  getGuidePageRoutesByLanguage,
  getPartnerRoutesByLanguage,
  getProductRoutesByLanguage,
  getRouteBySlugAndLanguage,
  navigationContent,
} from "../content/routes.tsx";
import ReviewsLink from "../components/ReviewsLink.tsx";
import type { Lang } from "../config/languages.ts";

interface DesktopNavProps {
  lang: Lang;
}

function DesktopNav({ lang = "en" }: DesktopNavProps) {
  const t = navigationContent[lang];
  // Get localized routes
  const articles = getArticleRoutesByLanguage(lang);
  const partnerLinks = getPartnerRoutesByLanguage(lang);
  const contactLinks = getContactRoutesByLanguage(lang);
  const guideLinks = getGuidePageRoutesByLanguage(lang);

  // Get dynamic URLs for the current language
  const splintRoute = getRouteBySlugAndLanguage("splint", lang);
  const buyNowRoute = getRouteBySlugAndLanguage("buy-now", lang);
  const wholesaleRoute = getRouteBySlugAndLanguage("order-wholesale", lang);
  const guideRoute = getRouteBySlugAndLanguage("guide", lang);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className={cn("justify-end", contentWidth)}>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t.courses}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn("flex flex-col gap-4 p-6", contentWidth)}
            >
              <div className="mb-2">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                  {t.coursesTitle}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {t.coursesDescription}
                </p>
              </div>
              <div className="gap-4 grid grid-cols-2">
                {guideLinks.map((link) => (
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

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t.ourProducts}
            </NavigationMenuTrigger>
            <NavigationMenuContent className={cn("p-6", contentWidth)}>
              <ProductLink
                title={t.productTitle}
                description={t.productDescription}
                imageSrc="/images/night_splint_square_small.jpg"
                imageAlt="Achilles Tendon Rupture Splint"
                reviewCount={0}
                productUrl={splintRoute?.href || "/splint"}
                buyUrl={buyNowRoute?.href || "/buy-now"}
                wholesaleUrl={wholesaleRoute?.href || "/order-wholesale"}
                lang={lang}
              />
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t.patientGuides}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn("gap-4 grid grid-cols-2 p-4", contentWidth)}
            >
              {articles.map((article) => (
                <ListItem
                  key={article.href}
                  title={article.title}
                  href={article.href}
                  className="hover:bg-neutral-100 p-4 border border-neutral-200 rounded-lg"
                >
                  <p className="dark:text-neutral-200 text-sm line-clamp-2">
                    {article.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {article.tags?.map((tag) => {
                      return (
                        <Badge
                          key={`${article.href}-${tag.words}`}
                          className={`${tag.color} text-black bg-opacity-80 font-light text-xs`}
                        >
                          {tag.words}
                        </Badge>
                      );
                    })}
                  </div>
                </ListItem>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {t.professionals}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn("flex flex-col gap-2 p-6", contentWidth)}
            >
              <div className="gap-4 grid grid-cols-2">
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

          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "md" }),
                "font-normal ml-2",
              )}
            >
              {t.contact}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn("flex flex-col gap-2 p-6", contentWidth)}
            >
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1 gap-4">
                  {contactLinks
                    .filter((l) => l.variant === "default")
                    .map((link) => (
                      <LinkCard
                        key={link.href}
                        {...link}
                        variant={link.variant || "default"}
                      />
                    ))}
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  {contactLinks
                    .filter((l) => l.variant === "outline")
                    .map((link) => (
                      <LinkCard
                        key={link.href}
                        {...link}
                        variant={link.variant || "outline"}
                      />
                    ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <a
        href={buyNowRoute?.href || "/buy-now"}
        className={cn(buttonVariants({ variant: "default", size: "md" }))}
      >
        <span className="font-semibold text-nowrap">{t.buyNow}</span>
      </a>
    </>
  );
}

export { DesktopNav };

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <NavigationMenuLink key={title} asChild>
      <a
        ref={ref}
        className={cn(
          "block space-y-1 hover:bg-accent focus:bg-accent p-3 rounded-md outline-none no-underline leading-none transition-colors hover:text-accent-foreground focus:text-accent-foreground select-none",
          className,
        )}
        {...props}
      >
        <div className="font-medium dark:text-neutral-50 text-base line-clamp-2 leading-none">
          {title}
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 leading-snug">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";

type ProductCardProps = {
  title: string;
  description: string;
  imageUrl: ImageMetadata;
  href: string;
};

const ProductCard = React.forwardRef<
  React.ElementRef<typeof NavigationMenuLink>,
  ProductCardProps
>(({ title, description, imageUrl, href }, ref) => {
  return (
    <NavigationMenuLink
      ref={ref}
      className="group block relative rounded-lg outline-none w-full h-[280px] overflow-hidden no-underline transition-all duration-300 select-none"
      href={href}
    >
      <img
        src={imageUrl.src}
        alt={title}
        width={260}
        height={280}
        className="brightness-120 group-hover:brightness-100 w-full h-full object-cover transition-all duration-300"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-4">
        {/* Base gradient layer - always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/0" />

        {/* Hover gradient layer - transitions opacity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative">
          <div className="mb-2 font-medium text-white/90 group-hover:text-white text-xl group-hover:underline underline-offset-4 transition-colors duration-300">
            {title}
          </div>
          <p className="text-white/70 group-hover:text-white/80 text-sm leading-tight transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </NavigationMenuLink>
  );
});
ProductCard.displayName = "ProductCard";

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
          "flex flex-row items-center gap-2 p-4 border border-primary/20 rounded-lg w-full h-full transition-colors duration-300",
          variant === "default" &&
            "bg-gradient-to-tr from-primary/10 to-primary/20 text-primary hover:bg-primary/15 hover:text-primary-dark",
          variant === "outline" &&
            "border-neutral-300 bg-neutral-50 text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900",
        )}
        href={href}
      >
        {icon}
        <div className="w-full">
          <h3
            className={cn(
              "font-semibold text-base",
              variant === "default" && "text-primary",
              variant === "outline" && "text-neutral-800",
            )}
          >
            {title}
          </h3>
          <p className={cn("text-neutral-500 text-sm")}>{description}</p>
        </div>
      </a>
    </NavigationMenuLink>
  );
};

type ProductLinkProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reviewCount: number;
  productUrl: string;
  buyUrl: string;
  wholesaleUrl: string;
  lang: Lang;
};

const ProductLink = ({
  title,
  description,
  imageSrc,
  imageAlt,
  reviewCount,
  productUrl,
  buyUrl,
  wholesaleUrl,
  lang = "en",
}: ProductLinkProps) => {
  const t = navigationContent[lang];
  return (
    <div className="flex md:flex-row flex-col gap-6">
      {/* Product image - square and prominent */}
      <div className="group relative flex-shrink-0 w-[250px] h-[250px]">
        <a href={productUrl} className="block w-full h-full overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="shadow-md group-hover:shadow-lg border border-gray-100 dark:border-gray-800 rounded-xl w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-300">
            <span className="bg-white bg-opacity-80 group-hover:shadow-md px-4 py-2 rounded-md font-medium text-neutral-800 group-hover:text-primary group-hover:-rotate-1 scale-95 group-hover:scale-100 transition-all duration-300 transform">
              {t.learnMore}
            </span>
          </div>
        </a>
      </div>

      {/* Product info */}
      <div className="flex flex-col justify-between">
        <div>
          <h4 className="mb-2 font-semibold text-xl">{title}</h4>
          <p className="mb-2 text-neutral-600 dark:text-neutral-300">
            {description}
          </p>

          {/* Reviews snippet */}
          <ReviewsLink size="sm" variant="background" lang={lang} />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={buyUrl}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            {t.buyNow}
          </a>
          <a
            href={wholesaleUrl}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {t.orderWholesale}
          </a>
        </div>
      </div>
    </div>
  );
};
