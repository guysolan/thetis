import React, { useState } from "react";
import { Link, useLocation, useSearch } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, ChevronUp, Menu } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@thetis/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@thetis/ui/dropdown-menu";
import { Button } from "@thetis/ui/button";
import { features, getTabLabel } from "./content";
import TopBarStockNotice from "./TopBarStockNotice";

interface TopBarProps {
  onMenuClick?: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const [sectionMenuOpen, setSectionMenuOpen] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  // pathSegments: ["home", "stock", "reorder-plan"] etc.

  const currentSection = pathSegments[1]; // "stock", "orders", etc.
  const subSegments = pathSegments.slice(2); // everything after the section

  // Read the ?tab= search param if present
  let activeTab: string | undefined;
  try {
    const search = new URLSearchParams(location.search);
    activeTab = search.get("tab") ?? undefined;
  } catch {
    activeTab = undefined;
  }

  const currentFeature = Object.values(features).find((f) =>
    f.slug === currentSection
  );

  // Build breadcrumb segments: path segments + optional tab
  const allSegments = [...subSegments];
  // Only append tab when we're on the index of a section (no sub-segments)
  // e.g. /home/directory?tab=companies but NOT /home/orders/1266/details
  if (activeTab && subSegments.length === 0) {
    allSegments.push(activeTab);
  }

  return (
    <header className="top-0 z-10 sticky flex items-center gap-2 sm:gap-3 bg-background px-3 sm:px-4 border-border border-b min-h-12 shrink-0">
      <div className="flex flex-1 items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden w-8 h-8 shrink-0"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </Button>

        <Breadcrumb className="min-w-0 overflow-hidden">
          <BreadcrumbList>
            {/* Section selector (dropdown) */}
            <BreadcrumbItem>
              <DropdownMenu
                open={sectionMenuOpen}
                onOpenChange={setSectionMenuOpen}
              >
                <DropdownMenuTrigger className="flex items-center gap-1.5 h-8 font-medium hover:text-foreground text-sm transition-colors">
                  {currentFeature
                    ? (
                      <>
                        <span className="[&_svg]:size-4 shrink-0">
                          {currentFeature.icon}
                        </span>
                        <span>{currentFeature.name}</span>
                        {sectionMenuOpen
                          ? (
                            <ChevronUp
                              size={14}
                              className="text-muted-foreground shrink-0"
                            />
                          )
                          : (
                            <ChevronDown
                              size={14}
                              className="text-muted-foreground shrink-0"
                            />
                          )}
                      </>
                    )
                    : <span>Home</span>}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {Object.values(features).map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="flex items-center gap-2">
                        <span className="[&_svg]:size-4 shrink-0">
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>

            {/* Sub-segments (path + tab) */}
            {allSegments.map((segment, index) => (
              <React.Fragment key={`${segment}-${index}`}>
                <BreadcrumbSeparator>
                  <ChevronRight size={14} className="text-muted-foreground" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {index === allSegments.length - 1
                    ? (
                      <BreadcrumbPage className="text-sm capitalize">
                        {formatSegment(segment, currentSection)}
                      </BreadcrumbPage>
                    )
                    : (
                      <BreadcrumbLink
                        className="text-sm capitalize"
                        href={`/home/${currentSection}/${
                          subSegments.slice(0, index + 1).join("/")
                        }`}
                      >
                        {formatSegment(segment, currentSection)}
                      </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <TopBarStockNotice />
    </header>
  );
};

/** Format a URL segment into a readable label, resolving tab values via the shared config */
function formatSegment(segment: string, sectionSlug?: string): string {
  // Try to resolve as a tab label first
  if (sectionSlug) {
    const tabLabel = getTabLabel(sectionSlug, segment);
    if (tabLabel) return tabLabel;
  }
  const decoded = decodeURIComponent(segment);
  return decoded.replace(/-/g, " ");
}

export default TopBar;
