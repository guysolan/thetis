import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight, ExternalLink, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the type for the navigation items
type NavItem = {
  name: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  external?: boolean;
  isFeatured?: boolean;
  pages?: NavItem[];
};

type Jobs = {
  [key: string]: NavItem;
};

import { jobs } from "./content";
import { Logout } from "../auth/Logout";

const Navigation = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentSection = pathSegments[0] || "home";

  return (
    <nav className="flex flex-col bg-background">
      <div className="flex justify-between items-center p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home size={20} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight size={20} />
            </BreadcrumbSeparator>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  {index === pathSegments.length - 1
                    ? <BreadcrumbPage>{segment}</BreadcrumbPage>
                    : (
                      <BreadcrumbLink
                        href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                      >
                        {segment}
                      </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
                {index < pathSegments.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight size={20} />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <Logout />
      </div>

      {jobs[currentSection] && jobs[currentSection].pages && (
        <Tabs defaultValue={pathSegments[1] || ""} className="w-full">
          <TabsList className="justify-start bg-transparent p-0 border-b rounded-none w-full h-12">
            <div className="flex items-center max-w-screen-2xl h-12 container">
              {jobs[currentSection].pages.map((item) => (
                <TabsTrigger
                  key={item.name}
                  value={item.name.toLowerCase()}
                  asChild
                  className="relative gap-2 bg-transparent shadow-none data-[state=active]:shadow-none px-4 pt-1 pb-1 border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none h-12 font-semibold text-muted-foreground data-[state=active]:text-zinc-900 transition-none"
                >
                  <Link to={item.href} activeOptions={{ exact: true }}>
                    <span className="[&_svg]:w-4 [&_svg]:h-4">{item.icon}</span>
                    {item.name}
                  </Link>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </Tabs>
      )}
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { external?: boolean }
>(({ className, title, children, external, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className,
          )}
          {...props}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          <div className="flex items-center font-medium text-sm leading-none">
            {title}
            {external && (
              <ExternalLink className="group-hover:tranzinc-x-0.5 group-hover:-tranzinc-y-0.5 ml-1 w-3 h-3 transition-transform" />
            )}
          </div>
          <p className="group-hover:text-accent-foreground line-clamp-2 text-muted-foreground text-sm leading-snug transition-colors">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navigation;
