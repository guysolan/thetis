import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import * as React from "react";

import { Badge } from "@thetis/ui/badge";
import { articles } from "../data/articles.ts";
import { products } from "../data/products.ts";

("use client");

function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 grid lg:grid-cols-[.75fr_1fr] p-6 md:w-[400px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex flex-col justify-start bg-[url('/images/night-splint/achilles_rupture_night_splint_bed_thetis_medical.jpg')] from-muted/50 to-muted bg-opacity-50 bg-cover bg-center focus:shadow-md p-4 rounded-md w-full h-full no-underline select-none outline-none"
                    href="/night-splint"
                  >
                    <div className="mb-2 font-medium text-lg text-white">
                      Night Splint
                    </div>
                    <p className="text-muted-foreground text-sm text-white leading-tight">
                      Sleep comfortably while your achilles rupture heals.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {products.map((product) => (
                <ListItem
                  key={product.href}
                  href={product.href}
                  title={product.title}
                >
                  {product.description}
                </ListItem>
              ))}

              <ListItem href="/contact" title="Business">
                Wholeorder
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Patient Guides</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 grid md:grid-cols-3 p-4 w-[400px] md:w-[550px] lg:w-[700px]">
              {articles.map((article) => (
                <ListItem
                  key={article.href}
                  title={article.title}
                  href={article.href}
                >
                  <p className="line-clamp-2">{article.description}</p>

                  <div className="flex flex-wrap gap-x-1 pt-2">
                    {article.tags.map((tag) => {
                      return (
                        <Badge
                          key={article.href + "-" + tag.words}
                          className={
                            tag.color + " text-black bg-opacity-80 font-light"
                          }
                        >
                          {tag.words}
                        </Badge>
                      );
                    })}
                  </div>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/professionals">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Professionals
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
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="line-clamp-2 font-medium text-md leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
