import React from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

type ReviewsLinkProps = {
  variant?: "default" | "background";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const ReviewsLink = ({
  variant = "default",
  size = "sm",
  className,
}: ReviewsLinkProps) => {
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  }[size];

  return (
    <a
      className={cn(
        "group flex items-center mb-4 py-1 rounded-md transition-all duration-200 w-fit",
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
        {[...Array(5)].map((_, i) => (
          <Star
            key={`star-rating-${i}`}
            size={iconSize}
            className={`fill-yellow-400 stroke-amber-500 text-yellow-400 ${i % 2 === 0 ? "group-hover:rotate-12" : "group-hover:-rotate-12"} transition-transform duration-300`}
          />
        ))}
      </div>
      <span
        className={cn(
          "text-neutral-600 dark:text-neutral-300 group-hover:text-primary text-sm group-hover:underline",
          size === "lg" && "text-md",
        )}
      >
        Based on {184} reviews
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
