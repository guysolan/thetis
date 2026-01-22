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
import { CartIcon } from "../components/cart/CartIcon";

const contentWidth = "min-w-[min(50vw,700px)]";

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
import ReviewsLink from "../components/ReviewsLink.tsx";
import { useShopifyPrice } from "../hooks/use-shopify-price";
import type { Lang } from "../config/languages.ts";
import { BookOpen, Calendar, GraduationCap, Mail, Star } from "lucide-react";

interface DesktopNavProps {
  lang: Lang;
}

function DesktopNav({ lang = "en" }: DesktopNavProps) {
  const t = navigationContent[lang];
  // Get localized routes
  const articles = getArticleRoutesByLanguage(lang);
  const partnerLinks = getPartnerRoutesByLanguage(lang);
  const contactLinks = getContactRoutesByLanguage(lang);
  const courseLinks = getCourseRoutesByLanguage(lang).filter(
    (course) => !course.href.includes("/course/professionals"),
  );
  const recoveryPhases = getRecoveryPhaseRoutesByLanguage(lang);

  // Get dynamic URLs for the current language
  const splintRoute = getRouteBySlugAndLanguage("splint", lang);
  const buyNowRoute = getRouteBySlugAndLanguage("buy-now", lang);
  const wholesaleRoute = getRouteBySlugAndLanguage("order-wholesale", lang);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className={cn("justify-end", contentWidth)}>
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
              className={cn("flex flex-col gap-6 p-6", contentWidth)}
            >
              {/* Courses Row */}
              <div>
                <h4 className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100 text-sm uppercase tracking-wide">
                  Courses
                </h4>
                <div className="gap-4 grid grid-cols-2">
                  {courseLinks.map((course, index) => (
                    <CourseCard
                      key={course.href}
                      title={course.title}
                      description={course.description}
                      href={course.href}
                      variant={index === 0 ? "free" : "paid"}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="bg-neutral-200 dark:bg-neutral-700 w-full h-px" />

              {/* FAQs and Recovery Timeline Columns */}
              <div className="flex gap-6">
                {/* FAQs Column */}
                <div className="flex-1">
                  <h4 className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100 text-sm uppercase tracking-wide">
                    FAQs
                  </h4>
                  <div className="flex flex-col gap-1">
                    {articles.map((article) => (
                      <NavigationMenuLink key={article.href} asChild>
                        <a
                          href={article.href}
                          className="block hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md text-neutral-700 dark:text-neutral-300 text-sm transition-colors"
                        >
                          {article.title}
                        </a>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="bg-neutral-200 dark:bg-neutral-700 w-px" />

                {/* Recovery Timeline Column */}
                <div className="flex-1">
                  <h4 className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100 text-sm uppercase tracking-wide">
                    Recovery Timeline
                  </h4>
                  <div className="flex flex-col gap-1">
                    {recoveryPhases.map((phase) => (
                      <NavigationMenuLink key={phase.href} asChild>
                        <a
                          href={phase.href}
                          className="flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md text-neutral-700 dark:text-neutral-300 text-sm transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-primary shrink-0" />
                          <span className="line-clamp-1">{phase.title}</span>
                        </a>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </div>
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
                buttonVariants({ variant: "ghost", size: "md" }),
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
      <div className="pr-2 pl-1">
        <CartIcon />
      </div>
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

const CourseCard = ({
  title,
  description,
  href,
  variant = "paid",
}: {
  title: string;
  description: string;
  href: string;
  variant: "free" | "paid" | "premium";
}) => {
  return (
    <NavigationMenuLink asChild>
      <a
        className={cn(
          "flex flex-col p-4 border-2 rounded-xl h-full transition-all duration-300",
          variant === "free" &&
            "border-primary/30 dark:border-primary/40 bg-primary/10 dark:bg-primary/20 hover:border-primary/50 hover:bg-primary/20",
          variant === "paid" &&
            "border-primary/20 bg-white dark:bg-neutral-800 hover:border-primary/50 hover:bg-neutral-50",
          variant === "premium" &&
            "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/30 hover:border-amber-400 hover:bg-amber-50",
        )}
        href={href}
      >
        <div className="flex items-center gap-2 mb-2">
          {variant === "free" && (
            <div className="flex justify-center items-center bg-primary/20 dark:bg-primary/30 rounded-lg w-8 h-8">
              <Mail className="w-4 h-4 text-primary dark:text-primary/80" />
            </div>
          )}
          {variant === "paid" && (
            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-8 h-8">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
          )}
          {variant === "premium" && (
            <div className="flex justify-center items-center bg-amber-100 dark:bg-amber-900 rounded-lg w-8 h-8">
              <GraduationCap className="w-4 h-4 text-amber-700 dark:text-amber-300" />
            </div>
          )}
          <span
            className={cn(
              "px-2 py-0.5 rounded font-semibold text-xs",
              variant === "free" &&
                "bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary/80",
              variant === "paid" &&
                "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400",
              variant === "premium" &&
                "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300",
            )}
          >
            {variant === "free"
              ? "FREE"
              : variant === "premium"
              ? "COMING SOON"
              : "£29"}
          </span>
        </div>
        <h3 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs line-clamp-2">
          {description}
        </p>
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
  const { formattedPrice, isLoading } = useShopifyPrice();

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

          {/* Price display */}
          <div className="mb-2">
            {isLoading
              ? (
                <div className="bg-neutral-200 dark:bg-neutral-700 rounded w-20 h-7 animate-pulse" />
              )
              : (
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 text-2xl">
                    {formattedPrice}
                  </span>
                  <span className="font-medium text-primary dark:text-primary/80 text-sm">
                    + Free Shipping
                  </span>
                </div>
              )}
          </div>

          {/* Reviews snippet */}
          <ReviewsLink size="sm" variant="background" lang={lang} />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-3">
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
