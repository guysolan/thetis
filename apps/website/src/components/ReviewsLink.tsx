import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { content } from "./products/night-splint/content.ts";
import type { Lang } from "../config/languages.ts";
import PartialStarRating from "@/components/reviews/PartialStarRating";
import { getSplintReviewsHref } from "@/content/routes";
import { GLOBAL_REVIEW_AVERAGE } from "@/features/reviews/productReviewStats";

type ReviewsLinkProps = {
  variant?: "default" | "background";
  size?: "sm" | "md" | "lg";
  className?: string;
  lang: Lang;
  /** Defaults to splint product page #reviews (lang-aware). */
  href?: string;
  ariaLabel?: string;
};

const ReviewsLink = ({
  variant = "default",
  size = "sm",
  className,
  lang = "en",
  href = getSplintReviewsHref(lang),
  ariaLabel = "View all reviews",
}: ReviewsLinkProps) => {
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  }[size];

  const starSize = size === "lg" ? "lg" : size === "md" ? "md" : "sm";

  const t = content[lang]?.reviewsLink || content.en.reviewsLink;

  return (
    <a
      className={cn(
        "group flex items-center mb-4 py-1 rounded-md w-fit transition-all duration-200",
        variant === "background"
          ? "hover:bg-neutral-100 bg-neutral-50 px-2 border border-neutral-200 hover:border-primary dark:border-neutral-700 dark:hover:border-primary"
          : "hover:bg-transparent",
        className,
      )}
      href={href}
      role="button"
      aria-label={ariaLabel}
    >
      <div className="flex mr-2 transition-all duration-200">
        <PartialStarRating
          rating={GLOBAL_REVIEW_AVERAGE}
          size={starSize}
          idPrefix="reviews-link"
        />
      </div>
      <span
        className={cn(
          "text-neutral-600 dark:text-neutral-300 group-hover:text-primary text-sm group-hover:underline",
          size === "lg" && "text-md",
        )}
      >
        {t.basedOn}
      </span>
      <ArrowRight
        size={iconSize - 6}
        strokeWidth={1.5}
        className="ml-1 group-hover:text-primary group-hover:-rotate-45 transition-all duration-200"
      />
    </a>
  );
};

export default ReviewsLink;
