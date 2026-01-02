"use client";

import * as React from "react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "../utils";

export interface PricingCardProps {
  /** Title of the pricing tier */
  title: string;
  /** Description of what's included */
  description: string;
  /** Price to display (e.g., "Free", "£29", "£99") */
  price: string;
  /** Optional price suffix (e.g., "one-time", "/month") */
  priceSuffix?: string;
  /** Features list */
  features: string[];
  /** Variant styling - affects border and accent colors */
  variant?: "free" | "standard" | "premium";
  /** Optional badge text (e.g., "POPULAR", "BEST VALUE") */
  badge?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  href?: string;
  /** Whether CTA opens in new tab */
  external?: boolean;
  /** Icon component to display */
  icon?: React.ReactNode;
  /** Click handler for the card */
  onClick?: () => void;
  /** Additional className */
  className?: string;
  /** Whether to show the recommended/best value ribbon */
  showRibbon?: boolean;
  /** Custom ribbon text */
  ribbonText?: string;
}

function PricingCard({
  title,
  description,
  price,
  priceSuffix,
  features,
  variant = "standard",
  badge,
  ctaText = "Get Started",
  href,
  external = false,
  icon,
  onClick,
  className,
  showRibbon = false,
  ribbonText = "BEST VALUE",
}: PricingCardProps) {
  const Card = href ? "a" : "div";
  const cardProps = href
    ? {
        href,
        target: external ? "_blank" : undefined,
        rel: external ? "noopener noreferrer" : undefined,
      }
    : {};

  const variantStyles = {
    free: {
      border: "border-green-200 dark:border-green-800",
      bg: "bg-green-50/50 dark:bg-green-900/20",
      hoverBorder: "hover:border-green-400 dark:hover:border-green-600",
      iconBg: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-700 dark:text-green-300",
      badgeBg: "bg-green-100 dark:bg-green-900",
      badgeColor: "text-green-700 dark:text-green-300",
      checkColor: "text-green-600 dark:text-green-400",
    },
    standard: {
      border: "border-primary/30 dark:border-primary/40",
      bg: "bg-white dark:bg-neutral-800",
      hoverBorder: "hover:border-primary/60 dark:hover:border-primary",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      badgeBg: "bg-neutral-100 dark:bg-neutral-700",
      badgeColor: "text-neutral-600 dark:text-neutral-300",
      checkColor: "text-primary",
    },
    premium: {
      border: "border-primary dark:border-primary",
      bg: "bg-white dark:bg-neutral-800",
      hoverBorder: "hover:border-primary dark:hover:border-primary",
      iconBg: "bg-amber-100 dark:bg-amber-900",
      iconColor: "text-amber-700 dark:text-amber-300",
      badgeBg: "bg-amber-100 dark:bg-amber-900",
      badgeColor: "text-amber-700 dark:text-amber-300",
      checkColor: "text-primary",
    },
  };

  const styles = variantStyles[variant];

  return (
    <Card
      {...cardProps}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 h-full",
        styles.border,
        styles.bg,
        styles.hoverBorder,
        href && "cursor-pointer",
        className
      )}
    >
      {/* Ribbon for premium tier */}
      {showRibbon && (
        <div className="top-0 right-4 absolute bg-primary px-3 py-1 rounded-b-lg font-semibold text-white text-xs">
          {ribbonText}
        </div>
      )}

      {/* Header with icon and badge */}
      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <div
            className={cn(
              "flex justify-center items-center rounded-xl w-14 h-14 shrink-0",
              styles.iconBg
            )}
          >
            <div className={cn("w-7 h-7", styles.iconColor)}>{icon}</div>
          </div>
        )}
        <div>
          {badge && (
            <span
              className={cn(
                "inline-block mb-1 px-2 py-0.5 rounded font-semibold text-xs uppercase tracking-wide",
                styles.badgeBg,
                styles.badgeColor
              )}
            >
              {badge}
            </span>
          )}
          <h3 className="font-semibold text-foreground text-xl group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 text-muted-foreground text-sm">{description}</p>

      {/* Features list */}
      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-foreground text-sm"
          >
            <div
              className={cn(
                "flex justify-center items-center rounded-full w-5 h-5 shrink-0 mt-0.5",
                styles.iconBg
              )}
            >
              <Check className={cn("w-3 h-3", styles.checkColor)} />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mb-4">
        <span className="font-bold text-foreground text-3xl">{price}</span>
        {priceSuffix && (
          <span className="ml-1 text-muted-foreground text-sm">
            {priceSuffix}
          </span>
        )}
      </div>

      {/* CTA */}
      <div
        className={cn(
          "flex items-center font-medium text-sm transition-transform group-hover:translate-x-1",
          variant === "premium" ? "text-primary" : styles.iconColor
        )}
      >
        {ctaText}
        <ArrowRight className="ml-2 w-4 h-4" />
      </div>
    </Card>
  );
}

PricingCard.displayName = "PricingCard";

export { PricingCard };

