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
import { articles } from "../content/articles.tsx";

("use client");

const contentWidth = "min-w-[min(50vw,700px)]";

import { partnerLinks, productLinks } from "../content/pages.tsx";

function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList className={cn("justify-end", contentWidth)}>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent
            className={cn("flex flex-row gap-6 p-6", contentWidth)}
          >
            {productLinks.map((product) => (
              <ProductCard
                key={product.href}
                title={product.title}
                description={product.description}
                imageUrl={product.image as ImageMetadata}
                href={product.href}
              />
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Partners</NavigationMenuTrigger>
          <NavigationMenuContent
            className={cn("p-6 flex flex-col gap-2", contentWidth)}
          >
            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <LinkCard {...partnerLinks[0]} />
              </div>
              <div className="flex flex-col flex-1 gap-4">
                {partnerLinks.slice(1).map((link) => (
                  <LinkCard key={link.href} {...link} />
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <a href="/testimonials">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Testimonials
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Patient Guides</NavigationMenuTrigger>
          <NavigationMenuContent
            className={cn("grid grid-cols-2 p-4 gap-4", contentWidth)}
          >
            {articles.map((article) => (
              <ListItem
                key={article.href}
                title={article.title}
                href={article.href}
                className="border-neutral-200 hover:bg-neutral-100 p-4 border rounded-lg"
              >
                <p className="line-clamp-2 text-sm dark:text-neutral-200">
                  {article.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {article.tags.map((tag) => {
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
          <a href="/professionals">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Professionals
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className,
        )}
        {...props}
      >
        <div className="line-clamp-2 font-medium text-base dark:text-neutral-50 leading-none">
          {title}
        </div>
        <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
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
      className="block relative rounded-lg w-full h-[280px] no-underline transition-all duration-300 overflow-hidden select-none group outline-none"
      href={href}
    >
      <img
        src={imageUrl.src}
        alt={title}
        width={260}
        height={280}
        className="group-hover:brightness-100 brightness-120 w-full h-full transition-all duration-300 object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-4">
        {/* Base gradient layer - always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/0" />

        {/* Hover gradient layer - transitions opacity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative">
          <div className="group-hover:text-white mb-2 font-medium text-white/90 text-xl underline-offset-4 group-hover:underline transition-colors duration-300">
            {title}
          </div>
          <p className="group-hover:text-white/80 text-sm text-white/70 leading-tight transition-colors duration-300">
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
  icon: React.ReactNode;
  variant: "default" | "outline";
}) => {
  return (
    <NavigationMenuLink asChild>
      <a
        className={cn(
          "rounded-lg p-4 border-primary/20 border flex flex-row gap-2 items-center h-full w-full transition-colors duration-300",
          variant === "default" &&
            "bg-gradient-to-tr from-primary/10 to-primary/20 text-primary hover:bg-primary/15 hover:text-primary-dark",
          variant === "outline" &&
            "border-neutral-200 text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900",
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
          <p className={cn("text-sm text-neutral-500")}>{description}</p>
        </div>
      </a>
    </NavigationMenuLink>
  );
};
