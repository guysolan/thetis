import { useState } from "react";
import type { Review } from "./types";
import { Badge } from "../ui/badge";

const renderStars = (count: number) => {
  return Array(count)
    .fill(null)
    .map((_, i) => (
      <svg
        key={`star-${i}`}
        className="w-4 h-4 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract image source
  const getImageSrc = () => {
    if (!review.image) return null;
    // Handle different types of image data
    if (typeof review.image === "string") return review.image;
    if (review.image.src) return review.image.src;
    return null;
  };

  return (
    <div
      className={`relative flex-shrink-0 border-2 shadow-md shadow-neutral-300 bg-white dark:bg-neutral-950 px-8 py-6 rounded-2xl ${
        review.is_pinned ? "border-primary/50" : ""
      }`}
    >
      <blockquote>
        <div className="flex justify-between items-center gap-2">
          <div className="flex gap-1 mb-2">{renderStars(5)}</div>
          <Badge
            className="capitalize"
            variant={review.type === "patient" ? "outline" : "default"}
          >
            {review.type}
          </Badge>
        </div>
        <p className="my-2 font-semibold text-neutral-800 text-lg">
          {review.title}
        </p>
        <div className="z-20 relative">
          <span className="font-normal text-neutral-900 text-base leading-[1.6] review-text">
            {isExpanded ? review.body : truncateText(review.body, 300)}
          </span>
          <br />
          {review.body.length > 300 && (
            <button
              type="button"
              className="mt-2 font-semibold text-primary text-sm hover:underline underline-offset-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        <div className="flex items-center gap-4 mt-6">
          {review.image && getImageSrc() && (
            <img
              src={getImageSrc() as string}
              alt={review.name}
              width={50}
              height={50}
              className="rounded-full w-16 h-16 object-cover object-top aspect-square"
            />
          )}
          <div className="z-20 relative flex flex-col">
            <span className="font-medium text-neutral-800 text-lg">
              {review.name}
            </span>
            <span className="mt-1 font-semibold text-neutral-500 text-base">
              {review.description ?? "Happy Customer"}
            </span>
            <span className="mt-1 text-neutral-400 text-sm">{review.date}</span>
          </div>
        </div>
      </blockquote>
    </div>
  );
}
