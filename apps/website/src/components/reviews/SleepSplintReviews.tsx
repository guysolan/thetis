"use client";

import PartialStarRating from "@/components/reviews/PartialStarRating";
import VerifiedBadge from "@/components/reviews/VerifiedBadge";
import { getSplintReviewsHref } from "@/content/routes";
import masterReviewsData from "@/data/master-reviews.json";
import {
  formatReviewMeta,
  getSleepReviews,
  type MasterReview,
} from "@/features/reviews/productReviews";

const sleepReviews = getSleepReviews(
  masterReviewsData.reviews as MasterReview[],
  3,
);

function SleepReviewCard({ review }: { review: MasterReview }) {
  const body = review.excerpt ?? review.body ?? "";
  const meta = formatReviewMeta(review);
  const verifiedPurchase = review.style?.verified || review.verified === true;

  return (
    <article className="bg-white shadow-sm p-5 border border-neutral-200 rounded-xl h-full">
      <PartialStarRating
        rating={review.stars}
        size="sm"
        idPrefix={`sleep-review-${review.id}`}
      />
      {review.title && (
        <h3 className="mt-3 font-semibold text-neutral-900 text-base leading-snug">
          {review.title}
        </h3>
      )}
      <p className="mt-2 text-neutral-700 text-sm italic leading-relaxed">
        &ldquo;{body}&rdquo;
      </p>
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-neutral-100 border-t">
        <p className="font-medium text-neutral-900 text-sm">
          {review.name ?? "Customer"}
        </p>
        {verifiedPurchase && <VerifiedBadge label="Verified purchase" />}
      </div>
      {meta && <p className="mt-1 text-neutral-500 text-xs">{meta}</p>}
    </article>
  );
}

export default function SleepSplintReviews() {
  if (sleepReviews.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="gap-4 grid md:grid-cols-3">
        {sleepReviews.map((review) => (
          <SleepReviewCard key={review.id} review={review} />
        ))}
      </div>
      <p className="text-neutral-500 text-sm text-center">
        122+ reviews mention better sleep vs the boot.{" "}
        <a
          href={getSplintReviewsHref("en")}
          className="font-medium text-primary hover:underline underline-offset-2"
        >
          Read all reviews
        </a>
      </p>
    </div>
  );
}
