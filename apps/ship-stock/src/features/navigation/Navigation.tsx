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
    <nav className="flex flex-col bg-background">
      <div className="flex md:flex-row flex-col-reverse justify-between md:items-center gap-4 p-2 md:p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">
                <Home size={20} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight size={20} />
            </BreadcrumbSeparator>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  {index === pathSegments.length - 1 ? (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  ) : (
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
        <div className="flex justify-between justify-self-end items-center gap-2 w-full md:w-fit">
          <MyCompany />
          <Logout />
        </div>
      </div>

      <Tabs defaultValue={pathSegments[2] || ""} className="w-full">
        <TabsList className="justify-start bg-transparent p-0 border-b rounded-none w-full h-12">
          <div className="flex items-center gap-x-1 h-12">
            {Object.values(features).map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.href.split("/").pop() || ""}
                asChild
                className="relative gap-2 bg-transparent shadow-none data-[state=active]:shadow-none px-2 md:px-4 pt-1 pb-1 border-b-2 border-b-transparent data-[state=active]:border-b-primary rounded-none h-12 font-semibold text-muted-foreground data-[state=active]:text-zinc-900 transition-none"
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
    </nav>
  );
};

export default Navigation;
