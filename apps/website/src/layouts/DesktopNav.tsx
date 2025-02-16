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
import { buttonVariants } from "../components/ui/button";
("use client");

const contentWidth = "min-w-[min(50vw,700px)]";

import { partnerLinks, productLinks, contactLinks } from "../content/pages.tsx";
import { ArrowRight, Star } from "lucide-react";

function DesktopNav() {
  return (
    <>
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
            <NavigationMenuTrigger>Patient Guides</NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn("grid grid-cols-2 p-4 gap-4", contentWidth)}
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
            <NavigationMenuTrigger>Professionals</NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn("p-6 flex flex-col gap-2", contentWidth)}
            >
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1 gap-4">
                  {partnerLinks
                    .filter((l) => l.variant === "default")
                    .map((link) => (
                      <LinkCard key={link.href} {...link} />
                    ))}
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  {partnerLinks
                    .filter((l) => l.variant === "outline")
                    .map((link) => (
                      <LinkCard key={link.href} {...link} />
                    ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <a href="/reviews">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Reviews
                <Star size={12} className="flex-shrink-0 ml-1" />
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "md" }),
                "font-normal ml-2",
              )}
            >
              Contact
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn("p-6 flex flex-col gap-2", contentWidth)}
            >
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1 gap-4">
                  {contactLinks
                    .filter((l) => l.variant === "default")
                    .map((link) => (
                      <LinkCard key={link.href} {...link} />
                    ))}
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  {contactLinks
                    .filter((l) => l.variant === "outline")
                    .map((link) => (
                      <LinkCard key={link.href} {...link} />
                    ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <a
        href="/buy-now"
        className={cn(buttonVariants({ variant: "default", size: "md" }))}
      >
        <span className="font-semibold text-nowrap">Buy Now</span>
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
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
          <div className="group-hover:text-white mb-2 font-medium text-white/90 text-xl group-hover:underline underline-offset-4 transition-colors duration-300">
            {title}
          </div>
          <p className="group-hover:text-white/80 text-white/70 text-sm leading-tight transition-colors duration-300">
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
          <p className={cn("text-sm text-neutral-500")}>{description}</p>
        </div>
      </a>
    </NavigationMenuLink>
  );
};
