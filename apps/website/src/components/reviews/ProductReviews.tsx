"use client";

import * as React from "react";
import * as FlagIcons from "country-flag-icons/react/3x2";
import PartialStarRating from "@/components/reviews/PartialStarRating";
import TestimonialRoleBadge from "@/components/reviews/TestimonialRoleBadge";
import VerifiedBadge from "@/components/reviews/VerifiedBadge";
import { Badge } from "@thetis/ui/badge";
import { Button } from "@thetis/ui/button";
import { Progress } from "@thetis/ui/progress";
import {
  formatGlobalRatingsLabel,
  GLOBAL_REVIEW_AVERAGE,
} from "@/features/reviews/productReviewStats";
import masterReviewsData from "@/data/master-reviews.json";
import {
  AUDIENCE_FILTERS,
  type AudienceFilter,
  countByAudience,
  filterReviews,
  formatReviewMeta,
  getDisplayStats,
  getSourceLabel,
  parseAudienceFromSearch,
  type MasterReview,
} from "@/features/reviews/productReviews";

const PAGE_SIZE = 10;
const DECK_PAGE_SIZE = 5;

interface ProductReviewsProps {
  variant?: "default" | "deck";
}

function CountryFlag({ code }: { code: string }) {
  const Flag = FlagIcons[code as keyof typeof FlagIcons] as
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | undefined;

  if (!Flag) return null;

  return (
    <Flag
      className="rounded-[2px] w-4 h-3"
      aria-label={`${code} flag`}
    />
  );
}

function SourceBadge({ review }: { review: MasterReview }) {
  const label = getSourceLabel(review);
  const isAmazon = review.source === "amazon";
  return (
    <Badge
      variant="outline"
      className={`text-xs ${
        isAmazon
          ? "border-amber-300 bg-amber-50 text-amber-900"
          : "border-primary/30 bg-primary/5 text-primary"
      }`}
    >
      {label}
    </Badge>
  );
}

function ReviewCard({
  review,
  compact = false,
}: {
  review: MasterReview;
  compact?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const displayName = review.name ?? "Customer";
  const body = review.body ?? "";
  const canExpand = body.length > (compact ? 180 : 320);
  const meta = formatReviewMeta(review);
  const verifiedPurchase = review.style?.verified || review.verified === true;
  const isTestimonial = review.category === "athlete" ||
    review.category === "clinician";
  const verifiedLabel = isTestimonial
    ? "Verified testimonial"
    : "Verified purchase";

  const toggleExpanded = () => {
    if (!review.hasText || !body) return;
    setExpanded((value) => !value);
  };

  return (
    <article
      className={`border-neutral-200 border-b last:border-b-0 transition-colors ${
        review.hasText && body
          ? "hover:bg-neutral-50/80 dark:hover:bg-neutral-800/30 cursor-pointer"
          : ""
      } ${compact ? "py-4" : "py-6"}`}
      onClick={toggleExpanded}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleExpanded();
        }
      }}
      role={review.hasText && body ? "button" : undefined}
      tabIndex={review.hasText && body ? 0 : undefined}
      aria-expanded={review.hasText && body ? expanded : undefined}
    >
      <div className="flex flex-wrap items-start gap-2 mb-2">
        <PartialStarRating
          rating={review.stars}
          size={compact ? "sm" : "sm"}
          idPrefix={`review-${review.id}`}
        />
        <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">
          {review.stars.toFixed(1)} out of 5 stars
        </span>
        {isTestimonial
          ? (
            <TestimonialRoleBadge
              role={review.category === "clinician" ? "clinician" : "athlete"}
              compact={compact}
            />
          )
          : <SourceBadge review={review} />}
        {verifiedPurchase && !isTestimonial && (
          <VerifiedBadge label="Verified purchase" />
        )}
      </div>

      {review.title && (
        <h3
          className={`font-semibold text-neutral-900 dark:text-neutral-100 ${
            compact ? "text-sm" : ""
          }`}
        >
          {review.title}
        </h3>
      )}

      {review.hasText && body && (
        <div className="mb-2">
          <p
            className={`text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed whitespace-pre-line ${
              expanded ? "" : compact ? "line-clamp-2" : "line-clamp-4"
            }`}
          >
            {body}
          </p>
          {canExpand && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setExpanded((value) => !value);
              }}
              className="mt-2 font-medium text-primary text-sm hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      {!review.hasText && (
        <p className="mb-2 text-neutral-500 text-sm italic">
          Rating only — no written review
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 text-neutral-600 text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium text-neutral-900 dark:text-neutral-100">
          {displayName}
          {isTestimonial && (
            <VerifiedBadge label={verifiedLabel} className="scale-90" />
          )}
        </span>
        {review.country && <CountryFlag code={review.country} />}
        {meta && <span>{meta}</span>}
        {review.style?.size && review.style?.side && (
          <span className="text-neutral-500">
            · {review.style.size} {review.style.side}
          </span>
        )}
        {review.category === "clinician" && review.description && (
          <span className="text-neutral-500">· {review.description}</span>
        )}
        {review.category === "athlete" && review.description && (
          <span className="text-neutral-500">· {review.description}</span>
        )}
      </div>
    </article>
  );
}

export default function ProductReviews({
  variant = "default",
}: ProductReviewsProps) {
  const isDeck = variant === "deck";
  const pageSize = isDeck ? DECK_PAGE_SIZE : PAGE_SIZE;

  const allReviews = masterReviewsData.reviews as MasterReview[];
  const [audienceFilter, setAudienceFilter] = React.useState<AudienceFilter>(
    () =>
      typeof window !== "undefined"
        ? parseAudienceFromSearch(window.location.search)
        : "patients",
  );
  const [starFilter, setStarFilter] = React.useState(0);
  const [visibleCount, setVisibleCount] = React.useState(pageSize);

  const audienceCounts = React.useMemo(
    () => countByAudience(allReviews),
    [allReviews],
  );

  const filteredReviews = React.useMemo(
    () => filterReviews(allReviews, audienceFilter, starFilter),
    [allReviews, audienceFilter, starFilter],
  );

  const sortedReviews = React.useMemo(
    () =>
      [...filteredReviews].sort((a, b) => {
        if (a.date && b.date) return b.date.localeCompare(a.date);
        if (a.hasText !== b.hasText) return a.hasText ? -1 : 1;
        return (b.stars ?? 0) - (a.stars ?? 0);
      }),
    [filteredReviews],
  );

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const { total, distribution, distributionPercent } = getDisplayStats(
    audienceFilter,
    filteredReviews,
    masterReviewsData.ratings,
    starFilter,
  );

  React.useEffect(() => {
    setVisibleCount(pageSize);
  }, [audienceFilter, starFilter, pageSize]);

  const summaryBlock = (
    <div>
      <div className="flex items-end gap-3 mb-2">
        <span className="font-bold text-neutral-900 dark:text-neutral-100 text-4xl leading-none">
          {GLOBAL_REVIEW_AVERAGE.toFixed(1)}
        </span>
        <div>
          <PartialStarRating
            rating={GLOBAL_REVIEW_AVERAGE}
            size="md"
            idPrefix="summary"
          />
          <p className="mt-1 text-neutral-600 dark:text-neutral-400 text-sm">
            {formatGlobalRatingsLabel()}
          </p>
        </div>
      </div>
    </div>
  );

  const distributionBlock = (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((stars) => {
        const percent = distributionPercent[stars] ?? 0;
        const active = starFilter === stars;
        return (
          <button
            key={stars}
            type="button"
            onClick={() =>
              setStarFilter((current) => (current === stars ? 0 : stars))}
            className={`flex items-center gap-3 w-full text-left rounded-md px-1 py-0.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40 ${
              starFilter > 0 && !active ? "opacity-45 hover:opacity-100" : ""
            }`}
          >
            <span className="min-w-[52px] font-medium text-primary text-xs hover:underline">
              {stars} star
            </span>
            <Progress value={percent} className="flex-1 h-2" />
            <span className="min-w-[40px] text-neutral-600 dark:text-neutral-400 text-xs text-right">
              {Math.round(percent)}%
            </span>
          </button>
        );
      })}
      {starFilter > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStarFilter(0)}
          className="w-full"
        >
          Clear star filter
        </Button>
      )}
    </div>
  );

  const filtersBlock = (
    <div className="flex flex-wrap gap-2 mt-4 mb-4">
      {AUDIENCE_FILTERS.map((filter) => {
        const count = audienceCounts[filter.id];
        const active = audienceFilter === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => setAudienceFilter(filter.id)}
            className={`px-3 py-1.5 border rounded-full text-xs font-medium transition-colors ${
              active
                ? "border-primary bg-primary text-white"
                : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-primary/40"
            }`}
          >
            {filter.label}
            <span
              className={`ml-1.5 ${
                active ? "text-white/80" : "text-neutral-500"
              }`}
            >
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );

  const reviewsList = (
    <>
      <div className="flex justify-between items-center mb-3 pb-3 border-neutral-200 dark:border-neutral-700 border-b">
        <p className="text-neutral-600 dark:text-neutral-400 text-xs">
          Showing {visibleReviews.length} of {total.toLocaleString()} review
          {total === 1 ? "" : "s"} from{" "}
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {AUDIENCE_FILTERS.find((f) => f.id === audienceFilter)?.label}
          </span>
        </p>
        {!isDeck && (
          <p className="text-neutral-500 text-xs">Click a review to expand</p>
        )}
      </div>

      <div>
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} compact={isDeck} />
        ))}
      </div>

      {visibleCount < sortedReviews.length && (
        <div className="pt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((count) => count + pageSize)}
            className="hover:bg-primary/5 border-primary/30"
          >
            See more reviews
          </Button>
        </div>
      )}

      {sortedReviews.length === 0 && (
        <p className="py-12 text-neutral-500 text-center">
          No reviews match these filters.
        </p>
      )}
    </>
  );

  if (isDeck) {
    return (
      <div className="w-full">
        <div className="flex items-end gap-3 mb-5">
          <span className="font-bold text-neutral-900 dark:text-neutral-100 text-5xl leading-none">
            {GLOBAL_REVIEW_AVERAGE.toFixed(1)}
          </span>
          <div>
            <PartialStarRating
              rating={GLOBAL_REVIEW_AVERAGE}
              size="sm"
              idPrefix="deck-header"
            />
            <p className="mt-1 text-neutral-600 dark:text-neutral-400 text-sm">
              {formatGlobalRatingsLabel()}
            </p>
          </div>
        </div>

        {distributionBlock}
        {filtersBlock}
        {reviewsList}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="gap-8 grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-6">
          {summaryBlock}
          {distributionBlock}
        </aside>

        <div>
          {filtersBlock}
          {reviewsList}
        </div>
      </div>
    </div>
  );
}
