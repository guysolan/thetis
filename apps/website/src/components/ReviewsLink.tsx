import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { content } from "./products/night-splint/content.ts";
import type { Lang } from "../config/languages.ts";

type ReviewsLinkProps = {
  variant?: "default" | "background";
  size?: "sm" | "md" | "lg";
  className?: string;
  lang: Lang;
};

const ReviewsLink = ({
  variant = "default",
  size = "sm",
  className,
  lang = "en",
}: ReviewsLinkProps) => {
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  }[size];

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
      href="/reviews"
      role="button"
      aria-label="View all reviews"
    >
      <div className="flex mr-2 transition-all duration-200">
        {/* Full Star 1 */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          className="group-hover:rotate-12 transition-transform duration-300"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#facc15"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {/* Full Star 2 */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          className="group-hover:-rotate-12 transition-transform duration-300"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#facc15"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {/* Full Star 3 */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          className="group-hover:rotate-12 transition-transform duration-300"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#facc15"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {/* Full Star 4 */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          className="group-hover:-rotate-12 transition-transform duration-300"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#facc15"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {/* Partial Star (5/8 yellow, 3/8 grey) */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          className="group-hover:rotate-12 transition-transform duration-300"
        >
          <defs>
            <clipPath id="yellowPart">
              <rect x="0" y="0" width="15" height="24" />
            </clipPath>
            <clipPath id="greyPart">
              <rect x="15" y="0" width="9" height="24" />
            </clipPath>
          </defs>
          {/* Yellow part (first 5/8) */}
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#facc15"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            clipPath="url(#yellowPart)"
          />
          {/* Grey part (last 3/8) */}
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#d1d5db"
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            clipPath="url(#greyPart)"
          />
        </svg>
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
