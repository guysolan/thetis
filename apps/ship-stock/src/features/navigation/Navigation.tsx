import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@thetis/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import { features } from "./content";
import MyCompany from "../companies/components/MyCompany";
import { Logout } from "../auth/Logout";

const Navigation = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="flex flex-col bg-background border-b border-border">
      {/* Top bar: breadcrumb left, user/company right (Supabase/Knock/Midday style) */}
      <div className="flex flex-row items-center justify-between gap-4 px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList className="items-center">
            <BreadcrumbItem>
              <BreadcrumbLink href="/home" className="flex items-center gap-1.5">
                <Home size={18} className="shrink-0" />
                <span className="hidden sm:inline">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight size={16} className="text-muted-foreground" />
            </BreadcrumbSeparator>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  {index === pathSegments.length - 1 ? (
                    <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      className="capitalize"
                      href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                    >
                      {segment}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < pathSegments.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex shrink-0 items-center gap-2">
          <MyCompany />
          <Logout />
        </div>
      </div>

      <Tabs defaultValue={pathSegments[2] || ""} className="w-full">
        <TabsList className="justify-start bg-transparent p-0 rounded-none w-full h-12 px-4">
          <div className="flex items-center gap-x-1 h-12">
            {Object.values(features).map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.slug}
                asChild
                className="relative inline-flex items-center gap-2 bg-transparent shadow-none data-[state=active]:shadow-none px-2 md:px-4 pt-1 pb-1 border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none h-12 font-semibold text-muted-foreground data-[state=active]:text-zinc-900 transition-none"
              >
                <Link
                  to={item.href}
                  activeOptions={{ exact: false }}
                  className="inline-flex items-center gap-2"
                >
                  <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      </Tabs>
    </nav>
  );
};

export default Navigation;
