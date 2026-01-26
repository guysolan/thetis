"use client";

import * as React from "react";
import { cn } from "../utils";

export interface SectionHeaderProps {
  /** Badge text displayed above the title */
  badge?: string;
  /** Main title */
  title: string;
  /** Optional description below the title */
  description?: string;
  /** Text alignment */
  align?: "left" | "center";
  /** Badge icon */
  badgeIcon?: React.ReactNode;
  /** Additional className */
  className?: string;
}

function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  badgeIcon,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 bg-primary/10 mb-4 px-4 py-1.5 rounded-full font-medium text-primary text-sm uppercase tracking-wide"
          )}
        >
          {badgeIcon}
          {badge}
        </div>
      )}
      <h2 className="mb-4 font-bold text-foreground text-3xl md:text-4xl tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground text-lg",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

SectionHeader.displayName = "SectionHeader";

export { SectionHeader };

