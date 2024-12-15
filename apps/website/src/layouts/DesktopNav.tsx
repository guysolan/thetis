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
import { articles } from "../data/articles.ts";
import nightSplintImage from "@/features/products/images/night-splint/night_splint_bed_side.jpg";
import traumaSplintImage from "@/features/products/images/trauma-splint/trauma_splint.jpg";

("use client");

function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-row gap-6 p-6 w-[600px]">
            <ProductCard
              title="Night Splint"
              description="Sleep comfortably while your achilles rupture heals."
              imageUrl={nightSplintImage}
              href="/night-splint"
            />
            <ProductCard
              title="Trauma Splint"
              description="Sleep comfortably while your achilles rupture heals."
              imageUrl={traumaSplintImage}
              href="/trauma-splint"
            />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <a href="/contact">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Wholesale
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/testimonials">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Testimonials
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Patient Guides</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 md:w-screen-md lg:w-screen-xl md:max-w-screen-md lg:max-w-screen-2xl">
            {articles.map((article) => (
              <ListItem
                key={article.href}
                title={article.title}
                href={article.href}
              >
                <p className="line-clamp-2 text-sm">{article.description}</p>

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
        <div className="line-clamp-2 font-medium text-base leading-none">
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
